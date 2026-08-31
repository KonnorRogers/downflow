import { ActionParser } from "../internal/action-parser.js";
import { Controller } from "./controller.js";

import { reactive, ref, isRef, effectScope, effect } from "@vue/reactivity";
import { EffectScheduler } from "./effect-scheduler.js";

export { Controller };

/**
 * @typedef {Object} EffectPlugin
 * @property {string} name
 * @property {(el: Element) => any} run
 * @property {(attributeName: string) => boolean} match
 */

/**
 * @typedef {object} RegistryOptions
 * @property {Element | ShadowRoot} [RegistryOptions.rootElement=document.documentElement]
 */

/**
 * @param {Object} obj
 * @param {...any} args
 */
function dig(obj, ...args) {
  let current = obj;
  for (const key of args) {
    if (current == null) return undefined;
    // @ts-expect-error
    current = current[key];
  }
  return current;
}

/**
 * If there are still more keys to walk, and the current key is undefined, make it an object.
 * `dig_p` after `mkdir_p` ;)
 * @param {Object} obj
 * @param {...any} args
 */
function dig_p(obj, ...args) {
  let current = obj;
  for (const key of args) {
    if (current == null) {
      return null;
    }

    // @ts-expect-error
    if (current[key] == null) {
      // @ts-expect-error
      current[key] = {};
    }

    // @ts-expect-error
    current = current[key];
  }
  return current;
}

export class Application {
  /**
   * Starts the registry and listens.
   * @param {RegistryOptions} options
   */
  static start(options = {}) {
    return new this(options).start();
  }

  /**
   * @param {RegistryOptions} options
   */
  constructor(options = {}) {
    if (!options.rootElement) {
      options.rootElement = document.documentElement;
    }

    if (!(options.rootElement instanceof Element)) {
      throw new Error(
        `The rootElement must an Element. Was given ${options.rootElement}`,
      );
    }

    /**
     * The root element which is where query selectors will be scoped from.
     * @type {Element | ShadowRoot}
     */
    this.rootElement = options.rootElement;

    this.handleMutations = this.handleMutations.bind(this);

    /**
     * Bookkeeping of controllers to be tracked in the effect bindings.
     */

    /**
     * @type {WeakMap<Controller, number>}
     */
    this._controllerIds = new WeakMap();

    /** @type {number} */
    this._controllerSequentialId = 0;

    /**
     * A map of all Controller constructors
     * @type {Map<string, typeof Controller>}
     */
    this._controllerConstructorMap = new Map();

    /**
     * Action listeners attached per element, so they can be removed on downgrade.
     * Keyed by the element the action was declared on — even when the listener
     * target is window/document — so removal cleans those up too. Inner map is
     * keyed by the raw action source string for cheap diffing.
     * @type {Map<Element, Map<string, { target: EventTarget, eventName: string, fn: EventListener, options: AddEventListenerOptions }>>}
     */
    this._actionListenerMap = new Map();

    /**
     * A Map of all controller instances attached to a particular element
     * @type {Map<Element, Map<string, Controller>>}
     */
    this._controllerInstanceMap = new Map();

    /**
     * A Map to track if a target has connected or not for a particular controller.
     * @type {Map<Controller, Map<string, Set<Element>>>}
     */
    this._targetConnectionMap = new Map();

    /**
     * last-seen text|attr|prop signature
     * @type {Map<Element, string>}
     */
    this._bindingSignatures = new Map();

    /**
     * If the registry has started listening for new elements.
     * @type {boolean}
     */
    this.started = false;

    /** @type {number} */
    this._pauseCount = 0;

    /**
     * The attribute to use for finding a controller. Defaults to "flow-controller".
     * @type {(node: Element) => string | null | undefined}
     */
    this.getControllerBinding = (node) => {
      return node.getAttribute?.("flow-controller");
    };

    /**
     * The attribute to use for finding a controller. Defaults to "flow-target".
     * @type {(node: Element) => string[] | null | undefined}
     */
    this.getTargetBinding = (node) => {
      return node.getAttribute?.(`flow-target`)?.split(/\s+/);
    };

    /**
     * The attribute to use for finding text updates. Defaults to "flow-text".
     * @type {(node: Element) => string | null | undefined}
     */
    this.getTextBinding = (node) => {
      return node.getAttribute?.("flow-text");
    };

    /**
     * Always returns a string. If no text binding found, returns null.
     * @param {Element} el
     * @returns {string | null}
     */
    this.parseTextBinding = (el) => {
      const binding = this.getTextBinding(el);

      if (!binding) {
        return null;
      }

      /**
       * @type {string[]}
       */
      const filters = [];
      let key = binding.trim();
      binding.split("|").forEach((str, index) => {
        if (index === 0) {
          key = str.trim();
        } else {
          filters.push(str);
        }
      });

      let value = this.resolveValue(el, key);
      filters.forEach((key) => {
        // @ts-expect-error
        const callback = this.filters[key.trim()];
        if (typeof callback === "function") {
          value = callback(value);
          return;
        }
      });

      return value == null ? "" : String(value);
    };

    /**
     * The attribute to use for finding actions. Defaults to "flow-action".
     * @type {(node: Element) => string | null | undefined}
     */
    this.getActionBinding = (node) => {
      return node.getAttribute?.("flow-action");
    };

    /**
     * The attribute to use for finding contexts. contexts are the "data" you're trying to read. Defaults to "flow-context".
     * @type {(node: Element) => null | undefined | string}
     */
    this.getContextBinding = (node) => {
      return node.getAttribute?.("flow-context");
    };

    /**
     * @type {(node: Element) => null | undefined | string}
     */
    this.getAttributeBinding = (node) => {
      return node.getAttribute?.("flow-attr");
    };

    /**
     * The attribute to use for binding properties. Defaults to "flow-prop".
     * @type {(node: Element) => null | undefined | string}
     */
    this.getPropertyBinding = (node) => {
      return node.getAttribute?.("flow-prop");
    };

    this.modifierSchema = /** @const */ {
      ctrl: "ctrlKey",
      alt: "altKey",
      meta: "metaKey",
      shift: "shiftKey",
    };

    /**
     * @type {Record<string, string | RegExp>}
     */
    this.keymapSchema = {
      enter: "Enter",
      tab: `Tab`,
      esc: `Escape`,
      space: ` `,
      up: `ArrowUp`,
      down: `ArrowDown`,
      left: `ArrowLeft`,
      right: `ArrowRight`,
      home: `Home`,
      end: `End`,
      page_up: `PageUp`,
      page_down: `PageDown`,
      [`[a-z]`]: /[a-z]/,
      [`[0-9]`]: /[0-9]/,
    };

    /**
     * @type {Record<string, (el: Element) => unknown>}
     */
    this.twoWayBindingSchema = {
      "input[type='checkbox']": (element) => {
        return /** @type {HTMLInputElement} */ (element).checked;
      },
      "input[type='radio']": (element) => {
        const elements = /** @type {HTMLInputElement} */ (element).form
          ?.elements;

        if (!elements) {
          return null;
        }

        return (
          /** @type {HTMLInputElement} */ (
            Array.from(elements).find((el) => {
              return (
                /** @type {HTMLInputElement} */ (el).name ===
                  /** @type {HTMLInputElement} */ (element).name &&
                /** @type {HTMLInputElement} */ (el).checked === true
              );
            })
          )?.value ?? null
        );
      },
      input: (element) => {
        return /** @type {HTMLInputElement} */ (element).value;
      },
      select: /** @param {Element} el */ (el) => {
        const element = /** @type {HTMLSelectElement} */ (el);
        return Array.from(element.selectedOptions, (o) => o.value);
      },
      default: (element) => {
        return /** @type {HTMLInputElement} */ (element).value;
      },
    };

    this._contextRef = ref({});

    this.forms = document.forms;

    this.effectScheduler = new EffectScheduler((fn) => this.flushChanges(fn));

    /**
     * @type {Map<Element, import("@vue/reactivity").EffectScope>}
     */
    this._bindingScopes = new Map();

    this._formState = new WeakMap();

    /**
     * These are events to listen for that affect 2 way binding.
     */
    this.formEvents = ["change", "input"];

    /**
     * @param {Event} e
     */
    this.eventUpdateContext = (e) => {
      // this is a lie, but its just for type checking satisfaction.
      const target = /** @type {HTMLInputElement | null} */ (e.target);

      if (!target) {
        return;
      }

      this.updateBindingsForElement(target);
    };

    /**
     * Object of filters. Filters are used to transform values.
     */
    this.filters = {};

    /**
     * @type {EffectPlugin[]}
     */
    this._effects = [
      {
        name: "__downflow__text",
        run: (el) => this._effectText(el),
        match (attributeName) {
          return Boolean(attributeName.match(/flow-text/))
        }
      },
      {
        name: "__downflow__properties",
        run: (el) => this._effectProperties(el),
        match (attributeName) {
          return Boolean(attributeName.match(/flow-prop/))
        }
      },
      {
        name: "__downflow__attributes",
        run: (el) => this._effectAttributes(el),
        match (attributeName) {
          return Boolean(attributeName.match(/flow-attr/))
        }
      }
    ]
  }

  // This function is purposely *not* run as part of an effect.
  /**
   * @param {Element} el
   */
  updateBindingsForElement(el) {
    const bindings = this.parseBindings(el);

    bindings.forEach((binding) => {
      const context = this.resolveContext(el, binding.contextString);
      const keys = binding.property.split(".");
      const finalKey = keys.pop();
      const obj = dig_p(context, ...keys);

      if (finalKey && obj) {
        // @ts-expect-error
        obj[finalKey] = this._readFormControl(el);
      }
    });

    // Bindings for `$form`
    // @ts-expect-error
    const name = el.name;
    if (!name) {
      return;
    }

    // @ts-expect-error
    const form = el?.form;

    if (!form) {
      return;
    }

    this._stateForForm(form)[name] = this._readFormControl(el); // reactive WRITE
  }

  get context() {
    return this._contextRef.value;
  }

  set context(ctx) {
    if (isRef(ctx)) {
      this._contextRef.value = ctx.value;
      return;
    }

    this._contextRef.value = ctx;
  }

  /**
   * Flushes changes and pauses the observer.
   * @param {() => void} fn
   */
  flushChanges(fn) {
    if (this._pauseCount === 0) {
      this.observer?.disconnect();
    }

    this._pauseCount++;

    try {
      fn();
    } finally {
      this._pauseCount--;
      if (this._pauseCount === 0 && this.started) {
        this.observer?.takeRecords(); // drop records our own writes generated
        this._observe(); // re-attach
      }
    }
  }

  /**
   * The attribute to use for finding a controller. Defaults to "flow-target".
   * @param {Element} node
   * @returns {{controllerName: string, target: string}[]}
   */
  parseTargetBinding(node) {
    const binding = this.getTargetBinding(node);

    if (!binding) {
      return [];
    }

    /** @type {{controllerName: string, target: string}[]} */
    const controllers = [];

    binding.forEach((str) => {
      if (str.includes(".")) {
        const parsedStr = str.split(".");

        if (parsedStr[0] && parsedStr[1]) {
          controllers.push({
            controllerName: parsedStr[0],
            target: parsedStr[1],
          });
        }
      }
    });

    return controllers;
  }

  /**
   * @param {HTMLFormElement} form
   */
  _stateForForm(form) {
    let state = this._formState.get(form);
    if (!state) {
      state = reactive({});
      this._formState.set(form, state);
      for (const _el of form.elements) {
        const el = /** @type {Element & {name: string | null | undefined}} */ (
          _el
        );
        if (el.name) {
          state[el.name] = this._readFormControl(el); // seed initial values
        }
      }
    }
    return state;
  }

  /**
   * @param {Element} el
   */
  _readFormControl(el) {
    for (const [key, fn] of Object.entries(this.twoWayBindingSchema)) {
      if (el.matches(key)) {
        return fn(el);
      }
    }

    return this.twoWayBindingSchema.default(el);
  }

  /**
   * Search upwards from current node to find closest controller for a given name.
   * @param {Element} root
   * @param {string} controllerName
   */
  getClosestController(root, controllerName) {
    /** @type {Controller | null | undefined} */
    let controller = null;

    this.walkParentElements(root, (el) => {
      controller = this.getController(el, controllerName);

      // end the walk early.
      if (controller) {
        return true;
      }
    });

    return /** @type {Controller | null | undefined} */ (controller);
  }

  /**
   * Search upwards from current node to find closest controller for a given name. This *excludes* the root element.
   * @param {Element} root
   * @param {string} controllerName
   */
  getClosestParentController(root, controllerName) {
    /** @type {Controller | null | undefined} */
    let controller = null;

    this.walkParentElements(root, (el) => {
      if (root === el) {
        return;
      }

      controller = this.getController(el, controllerName);

      // end the walk early.
      if (controller) {
        return true;
      }
    });

    return controller;
  }

  /**
   * Search upwards from current node to find closest controller for a given name.
   * @param {Element} root
   * @param {string} controllerName
   * @returns {Element | null | undefined}
   */
  getClosestControllerElement(root, controllerName) {
    /** @type {Controller | undefined | null} */
    let controller = null;

    /**
     * @type {Element | null}
     */
    let element = null;

    this.walkParentElements(root, (el) => {
      /** Don't skip root because the closest controller could be the current controller. */
      controller = this.getController(el, controllerName);

      // end the walk early.
      if (controller) {
        element = el;
        return true;
      }
    });

    return element;
  }

  /**
   * Search upwards from current node to find closest context for a given name.
   * @param {Element} root
   * @returns {string | undefined | null}
   */
  getClosestContextString(root) {
    /** @type {string | null | undefined} */
    let contextString = null;

    this.walkParentElements(root, (el) => {
      contextString = this.getContextBinding(el);

      if (contextString) {
        // end the walk early.
        return true;
      }
    });

    return contextString;
  }

  /**
   * @param {Element} el
   * @param {string | null} key
   */
  resolveValue(el, key) {
    if (!key) {
      return null;
    }

    let negativeLength = 0;

    // Handle cases of things like `!context.foo`
    if (key.startsWith("!")) {
      const negatives = key.match(/^\!+/g)?.[0];
      if (negatives) {
        negativeLength = negatives.length;
      }
    }

    key = key.slice(negativeLength);

    /**
     * @type {string | null}
     */
    let contextString = null;

    if (key.includes("#")) {
      const splitKeys = key.split(/#/);
      const controllerName = splitKeys[0];
      key = splitKeys.slice(1).join("");
      contextString = controllerName;
    }

    const keys = key.split(/\./g);

    const firstKey = keys[0];

    if (firstKey === "$form" || firstKey === "$context") {
      contextString = firstKey;
      keys.shift();
    }

    const context = this.resolveContext(el, contextString);

    let value = dig(context, ...keys);

    if (isRef(value)) {
      value = value.value;
    }

    // Marshal the negatives
    for (let i = 0; i < negativeLength; i++) {
      value = !value;
    }

    return value;
  }

  /**
   * Starts the registry and listens.
   * @param {RegistryOptions} options
   */
  start(options = {}) {
    this.abortController = new AbortController();
    this.rootElement =
      options.rootElement || document.documentElement || this.rootElement;

    // move the form listeners here — in the constructor abortController is undefined,
    // so they were never tied to the signal and leaked across stop/start.
    this.formEvents.forEach((evt) => {
      this.rootElement.addEventListener(evt, this.eventUpdateContext, {
        signal: this.abortController?.signal,
      });
    });

    if (!this.started) {
      this._observe();
      this.started = true;
    }
    this.reconcile();
    return this;
  }

  /**
   * Takes records, and then disconnects the observer.
   */
  stop() {
    if (!this.started) return this;
    this.started = false;
    this._reconcileQueued = false;

    this.observer?.disconnect();

    for (const el of [...this._controllerInstanceMap.keys()]) {
      this._destroyElement(el);
    }

    for (const el of [...this._actionListenerMap.keys()]) {
      this._removeActionsForElement(el);
    }

    for (const el of [...this._bindingScopes.keys()]) {
      this._deleteCachedScopes(el);
    }

    this.abortController?.abort("application stopped");

    this._controllerInstanceMap.clear();
    this._actionListenerMap.clear();
    this._targetConnectionMap.clear();
    this._bindingSignatures.clear();
    return this;
  }

  /**
   * Registers a new controller to listen for.
   * @param {typeof Controller} Constructor
   * @param {string} [controllerName] - Use this to override the registration name.
   */
  register(Constructor, controllerName) {
    const name = controllerName || Constructor.controllerName;
    if (!name) {
      console.error(`No "controllerName" given for ${Constructor}.`);
      return;
    }

    this._controllerConstructorMap.set(name, Constructor);

    if (this.started) {
      this.reconcile();
    }
  }

  /**
   * Registers a new controller to listen for.
   * @param {{controllerName: string} | string} strOrObj
   */
  unregister(strOrObj) {
    if (typeof strOrObj === "object") {
      this._controllerConstructorMap.delete(strOrObj.controllerName);
      return;
    }
    this._controllerConstructorMap.delete(strOrObj);
  }

  /**
   * Finds a map of controllers based on the element and controllerName.
   * @param {Element} element
   * @param {string} controllerName
   * @return {null | undefined | Controller}
   */
  getController(element, controllerName) {
    let map = this._controllerInstanceMap.get(element);
    if (!map) return;
    return map.get(controllerName);
  }

  /**
   * @param {string} controllerName
   * @return {undefined | null | typeof Controller}
   */
  _getConstructor(controllerName) {
    return this._controllerConstructorMap.get(controllerName);
  }

  _observe() {
    let root = this.rootElement;

    if (!this.observer) {
      this.observer = new MutationObserver(this.handleMutations);
    }

    this.observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true,
    });
  }

  /**
   * @param {MutationRecord[]} _mutations
   */
  handleMutations(_mutations) {
    if (this._reconcileQueued) return;
    this._reconcileQueued = true;
    queueMicrotask(() => {
      this._reconcileQueued = false;
      if (this.started) {
        this.reconcile();
      }
    });
  }

  reconcile(root = this.rootElement) {
    const seen = new Set();

    this.flushChanges(() => {
      // Walk the DOM. Find any changes and upgrade / downgrade accordingly.
      this.walkElements(root, (el) => {
        seen.add(el);
        this.updateBindingsForElement(el);
        this._reconcileControllers(el); // desired flow-controller names vs connected
        this._reconcileActions(el); // desired action sources vs listener map
        this._reconcileBindings(el); // rebind only if a binding changed
      });

      // Find detached elements
      for (const el of [...this._controllerInstanceMap.keys()]) {
        if (!seen.has(el)) {
          // Don't fully delete this controller so we can re-use it.
          this._disconnectElement(el);
        }
      }

      for (const el of [...this._actionListenerMap.keys()]) {
        if (!seen.has(el)) {
          this._removeActionsForElement(el);
        }
      }

      for (const el of [...this._bindingScopes.keys()]) {
        if (!seen.has(el)) {
          this._deleteCachedScopes(el);
        }
      }

      // Controllers are stable, time to handle targets
      for (const map of this._controllerInstanceMap.values()) {
        for (const controller of map.values()) {
          if (controller.isConnected) {
            this._reconcileTargets(controller);
          }
        }
      }
    });
  }

  /**
   * @param {Element} el
   */
  _reconcileControllers(el) {
    const binding = this.getControllerBinding(el);
    const desired = new Set(
      binding ? this.parseControllerNamesFromString(binding) : [],
    );

    for (const name of desired) {
      this._createControllerInstance(name, el); // idempotent: creates + connects
    }

    const map = this._controllerInstanceMap.get(el);
    if (!map) return;
    const names = [];
    for (const name of map.keys()) {
      if (!desired.has(name)) {
        names.push(name);
      }
    }

    for (const name of names) {
      this._destroyElement(el, name);
    }
  }

  /**
   * @param {Element | ShadowRoot} rootNode
   * @param {(node: Element, treeWalker: TreeWalker) => unknown} callback
   */
  walkParentElements(rootNode, callback) {
    // need to set to `this.rootElement`, otherwise we can never walk upwards.
    const treeWalker = document.createTreeWalker(
      this.rootElement,
      NodeFilter.SHOW_ELEMENT,
    );

    treeWalker.currentNode = rootNode;
    /** @type {null | Node} */
    let node = treeWalker.currentNode;

    while (node) {
      let el = /** @type {Element} */ (node);

      const retVal = callback(el, treeWalker);

      // If true, return early so we don't keep walking.
      if (retVal === true) {
        return;
      }

      node = treeWalker.parentNode();
    }
  }

  /**
   * @param {Element | ShadowRoot} rootNode
   * @param {(node: Element, treeWalker: TreeWalker) => unknown} callback
   */
  walkElements(rootNode, callback) {
    const treeWalker = document.createTreeWalker(
      rootNode,
      NodeFilter.SHOW_ELEMENT,
    );

    /** @type {null | Node} */
    let node = treeWalker.currentNode;

    while (node) {
      let el = /** @type {Element} */ (node);
      callback(el, treeWalker);
      node = treeWalker.nextNode();
    }
  }

  /**
   * Fires disconnect lifecycle but KEEPS the instance for potential re-append.
   * @param {Element} element
   * @param {string} [controllerName]
   */
  _disconnectElement(element, controllerName) {
    const map = this._controllerInstanceMap.get(element);
    if (!map) return;
    const names = controllerName ? [controllerName] : [...map.keys()];
    const ary = [];
    for (const name of names) {
      const inst = map.get(name);
      if (!inst || !inst.isConnected) continue;
      this._disconnectAllTargets(inst);
      inst.disconnectedCallback?.();
      inst.isConnected = false;
      // NOTE: instance stays in the map; targets map entry stays too
      ary.push({ controller: inst, name });
    }

    return { map: map, disconnectedControllers: ary };
  }

  /**
   * Fully destroys the controller - attribute removed or app stopped.
   * @param {Element} element
   * @param {string} [controllerName]
   */
  _destroyElement(element, controllerName) {
    const retVal = this._disconnectElement(element, controllerName);
    if (!retVal) {
      return;
    }
    const { map, disconnectedControllers } = retVal;

    for (const { controller, name } of disconnectedControllers) {
      this._targetConnectionMap.delete(controller);
      map.delete(name);
    }

    if (map.size === 0) {
      this._controllerInstanceMap.delete(element);
    }
  }

  /**
   * @param {Element} element
   */
  _removeActionsForElement(element) {
    const listeners = this._actionListenerMap.get(element);
    if (!listeners) return;

    listeners.forEach(({ target, eventName, fn, options }) => {
      target?.removeEventListener?.(eventName, fn, options);
    });

    this._actionListenerMap.delete(element);
  }

  /**
   * @param {string} controllerName
   * @param {Element} el
   */
  _createControllerInstance(controllerName, el) {
    let map = this._controllerInstanceMap.get(el);
    if (!map) {
      map = new Map();
      this._controllerInstanceMap.set(el, map);
    }

    let inst = map.get(controllerName);
    if (!inst) {
      const Constructor = this._getConstructor(controllerName);
      if (!Constructor) {
        return;
      }
      inst = new Constructor({
        element: /** @type {HTMLElement} */ (el),
        application: this,
        controllerName,
      });
      inst.initialize();
      map.set(controllerName, inst);
    }

    if (!inst.isConnected) {
      inst.isConnected = true;
      inst.connectedCallback?.();
    }
  }
  /** @param {Element} el */
  _reconcileActions(el) {
    const attr = this.getActionBinding(el);
    const desired = new Set();

    if (attr) {
      for (const parsed of this._parseActionsFromString(attr)) {
        desired.add(parsed.source);
        if (!this._actionListenerMap.get(el)?.has(parsed.source)) {
          this.addParsedActionToElement(parsed, el);
        }
      }
    }

    const listeners = this._actionListenerMap.get(el);

    if (!listeners) {
      return;
    }

    for (const source of [...listeners.keys()]) {
      if (desired.has(source)) {
        continue;
      }
      const rec = listeners.get(source);
      rec?.target?.removeEventListener?.(rec.eventName, rec.fn, rec.options);
      listeners.delete(source);
    }

    if (listeners.size === 0) {
      this._actionListenerMap.delete(el);
    }
  }

  /**
   * Takes an attribute and turns it into an array of controller names.
   * @param {string} str
   * @return {Array<string>}
   */
  parseControllerNamesFromString(str) {
    return str?.split(/\s+/) || [];
  }

  /**
   * @param {Controller} controller
   * @param {string} targetName
   */
  targetsForController(controller, targetName) {
    const { element, controllerName } = controller;

    /**
     * @type {Element[]}
     */
    const targets = [];

    this.walkElements(element, (node) => {
      // skip ourselves.
      if (element === node) {
        return;
      }

      const parsedBindings = this.parseTargetBinding(node);

      if (parsedBindings.length <= 0) {
        return;
      }

      parsedBindings.forEach((binding) => {
        if (binding.controllerName !== controllerName) {
          return;
        }
        if (binding.target !== targetName) {
          return;
        }

        if (
          this.getClosestParentController(node, controllerName) !== controller
        ) {
          return;
        }

        targets.push(node);
      });
    });

    return targets;
  }

  /**
   * @param {string} str
   * @return {Array<string>}
   */
  _parseControllersFromTargetAttribute(str) {
    /**
     * @type {Array<string>}
     */
    const ary = [];

    str.split(/\s+/).forEach((targetString) => {
      const splitStr = targetString.split(/\./);

      const controllerName = splitStr[0];
      ary.push(controllerName);
    });

    return ary;
  }

  /**
   * @param {string} str
   * @return {Array<import("../internal/action-parser.js").ParsedAction>}
   */
  _parseActionsFromString(str) {
    /** @type {Array<import("../internal/action-parser.js").ParsedAction>} */
    const parsedActions = [];

    str
      .trim()
      .split(/\s+/)
      .forEach((str) => {
        str = str.trim();
        if (str) {
          const parsedAction = new ActionParser(str).parse();
          if (parsedAction.errors.length > 0) {
            return;
          }

          parsedActions.push(parsedAction);
        }
      });

    return parsedActions;
  }

  /**
   * @param {import("../internal/action-parser.js").ParsedAction} parsedAction
   * @param {Element} element
   */
  addParsedActionToElement(parsedAction, element) {
    if (parsedAction.errors.length > 0) {
      return;
    }

    const {
      controllerFunction,
      controllerName,
      eventName,
      globalTarget,
      eventModifier,
      additionalEventModifiers,
      actionOptions,
    } = parsedAction;

    const _controllerName = /** @type {any} */ (controllerName);
    if (_controllerName instanceof Error) {
      return;
    }

    if (!eventName) {
      return;
    }

    const keymapSchema = this.keymapSchema;
    const modifierSchema = this.modifierSchema;
    const self = this;

    /**
     * @param {Event} evt
     */
    const fn = function (evt) {
      let shouldCallFunction = true;
      let controller = null;

      if (controllerName) {
        // The controller may not always be at the element level. We need to search for its closest parent controller, we use closest on the target *IN CASE* the controller is defined on the current element.
        controller = self.getClosestController(element, controllerName);
      } else {
        controller = self.resolveContext(element);
      }

      // This will need to check the keymapSchema to see if it should fire.
      if (eventModifier && evt instanceof KeyboardEvent) {
        // Make it false so we have to override it in the loop.
        shouldCallFunction = false;
        for (const [key, value] of Object.entries(keymapSchema)) {
          const keyRegex = new RegExp(key);

          if (eventModifier.match(keyRegex)) {
            // Now we know they want this key.
            if (evt.key.match(value)) {
              if (additionalEventModifiers.length > 0) {
                shouldCallFunction = additionalEventModifiers.every(
                  (modifier) => {
                    const evtKey = /** @type {keyof typeof evt} */ (
                      modifierSchema[
                        /** @type {keyof typeof modifierSchema} */ (modifier)
                      ]
                    );

                    return evt[evtKey] === true;
                  },
                );

                if (shouldCallFunction) {
                  break;
                }
              } else {
                shouldCallFunction = true;
                break;
              }
            }
          }
        }
      }

      if (shouldCallFunction && controllerFunction) {
        // controller function may contain `.`, so dig for the keys.
        if (controller) {
          let keys = controllerFunction.split(".");
          let context = controller;

          let fnString = controllerFunction;

          if (keys.length > 1) {
            // @ts-expect-error
            fnString = keys.pop();

            context = dig(controller, ...keys);
          }

          if (
            typeof context === "object" &&
            typeof context[fnString] === "function"
          ) {
            context[fnString].call(controller, evt);
          }
        }
      }
    };

    let target = element;
    if (globalTarget) {
      // @ts-expect-error
      target = globalThis[globalTarget];

      if (!target) {
        throw Error(`${target} does not exist on "globalThis"`);
      }

      if (typeof target.addEventListener !== "function") {
        throw Error(`${target} does not have an "addEventListener" function`);
      }
    }

    /**
     * @type {Record<string, boolean>}
     */
    const options = {};
    actionOptions.forEach((option) => {
      if (option.startsWith("!")) {
        options[option.slice(1)] = false;
        return;
      }

      options[option] = true;
    });

    target.addEventListener(eventName, fn, {
      ...options,
      signal: this.abortController?.signal,
    });

    let listeners = this._actionListenerMap.get(element);
    if (!listeners) {
      listeners = new Map();
      this._actionListenerMap.set(element, listeners);
    }

    // Idempotent: if this exact action is somehow already bound, drop the old one.
    const existing = listeners.get(parsedAction.source);
    if (existing) {
      existing.target.removeEventListener(
        existing.eventName,
        existing.fn,
        existing.options,
      );
    }

    listeners.set(parsedAction.source, { target, eventName, fn, options });
  }

  /** @param {Controller} controller */
  _reconcileTargets(controller) {
    const Ctor = /** @type {typeof Controller} */ (controller.constructor);

    let byName = this._targetConnectionMap.get(controller);
    if (!byName) {
      byName = new Map();
      this._targetConnectionMap.set(controller, byName);
    }

    Ctor.targets.forEach((targetName) => {
      let connected = byName.get(targetName);
      if (!connected) {
        connected = new Set();
        byName.set(targetName, connected);
      }

      const desired = new Set(
        this.targetsForController(controller, targetName),
      );

      for (const el of desired) {
        if (connected.has(el)) continue;
        connected.add(el);
        this._fireTargetConnected(controller, targetName, el);
      }
      for (const el of connected) {
        if (desired.has(el)) continue;
        connected.delete(el);
        this._fireTargetDisconnected(controller, targetName, el);
      }
    });
  }

  /**
   * @param {Controller} controller
   * @param {string} targetName
   * @param {Element} target
   */
  _fireTargetConnected(controller, targetName, target) {
    const fn = /** @type {any} */ (controller)[`${targetName}TargetConnected`];
    if (typeof fn === "function") fn.call(controller, target);
  }

  /**
   * @param {Controller} controller
   * @param {string} targetName
   * @param {Element} target
   */
  _fireTargetDisconnected(controller, targetName, target) {
    const fn = /** @type {any} */ (controller)[
      `${targetName}TargetDisconnected`
    ];
    if (typeof fn === "function") fn.call(controller, target);
  }

  /**
   * @param {Controller} controller
   */
  _disconnectAllTargets(controller) {
    const byName = this._targetConnectionMap.get(controller);
    if (!byName) return;
    for (const [targetName, set] of byName) {
      for (const target of set) {
        this._fireTargetDisconnected(controller, targetName, target);
      }
      set.clear();
    }
  }

  /**
   * @param {(...args: any[]) => any} callback
   */
  _runEffect (callback) {
    const runner = effect(
      callback,
      { scheduler: () => this.effectScheduler.schedule(runner) },
    );
  }

  /**
   * @param {Element} el
   */
  _runEffects (el) {
    this._runEffect(() => {
      this._effects.forEach((effect) => {
        effect.run(el)
      })
    })
  }

  /**
   * @param {Element} el
   */
  _effectText(el) {
    let text = this.parseTextBinding(el);

    /**
      * Should only be null if no binding found.
      */
    if (text == null) {
      return;
    }

    if (el.textContent !== text) {
      el.textContent = text;
    }
  }

  /**
   * @param {Element} el
   */
  _effectAttributes(el) {
    const attributeText = this.getAttributeBinding(el);
    if (!attributeText) return;
    const [attr, key] = attributeText.split(":");
    const value = this.resolveValue(el, key);
    if (value == null) {
      el.removeAttribute(attr);
      return;
    }
    el.setAttribute(attr, String(value));
  }

  /**
   * @param {Element} el
   * @param {string | null | undefined} [contextStr]
   */
  resolveContext(el, contextStr) {
    let context =
      /** @type {Controller["context"] | Application["context"]} */ (
        this.context
      );

    const keywords = ["$form", "$context"];

    if (!contextStr) {
      contextStr = this.getClosestContextString(el);
    }

    if (contextStr && !keywords.includes(contextStr)) {
      let controllerName = contextStr;

      if (!controllerName) {
        return null;
      }

      const controller = this.getClosestController(el, controllerName);

      if (!controller) {
        return null;
      }

      context = controller.context;
    }

    if (contextStr === "$form") {
      const formAttr = el.getAttribute("form");
      const rootNode = /** @type {Element} */ (el.getRootNode() || document);
      const form = /** @type {HTMLFormElement | null} */ (
        formAttr
          ? rootNode.querySelector(`form#${formAttr}`)
          : el.closest("form")
      );

      if (form) {
        return this._stateForForm(form);
      }
    } else {
      return context;
    }
  }

  /**
   * @param {Element} el
   */
  _effectProperties(el) {
    const propertyText = this.getPropertyBinding(el);
    if (!propertyText) { return };
    const [prop, key] = propertyText.split(":");
    const value = this.resolveValue(el, key);
    // @ts-expect-error
    el[prop] = value;
  }

  /**
   * @param {Element} el
   */
  parseBindings(el) {
    // There are a few ways to define bindings. We can do
    // - `flow-bind="name"`
    // - `flow-bind:name`
    // - `flow-bind:name="my-controller"
    // - `flow-bind:name="$context"
    // - `flow-bind="name:$context"`
    // - `flow-bind="myName:my-controller"`
    // So we need to be sure we support all the above syntaxes.

    // Start with `flow-bind` attribute. I don't *think* we need to support multiple instances? if we ever do, we can add a `;` delimiter.

    /**
     * @type {{contextString: string | null | undefined, property: string}[]}
     */
    const bindings = [];

    const str = el.getAttribute("flow-bind");

    if (str) {
      const [property, contextString] = str.split(":");
      bindings.push({ property, contextString });
    }

    // Now we parse the attributes array.
    [...el.attributes].forEach((attr) => {
      if (attr.name.startsWith("flow-bind:")) {
        // This covers `flow-bind:foo="$context"` for example.
        const [_, property] = attr.name.split(":");
        const contextString = attr.value;
        bindings.push({ property, contextString });
      }
    });

    return bindings;
  }


  /**
   * @param {Element} el
   */
  _generateSignature (el) {
    let signature = ""
    // not sure if this is the best way to "diff" an element, but this allows custom plugins.
    for (const attr of el.attributes) {
      for (const effect of this._effects) {
        if (effect.match(attr.name)) {
          if (signature.length > 0) {
            signature += ">> "
          }
          signature += attr.name + ">> " + attr.value
          break
        }
      }
    }

    if (signature.length === 0) {
      return null
    }

    const context = this.getClosestContextString(el) ?? "";

    // resolve the controller *instance* the string points at in case the underlying controller changes.
    // keywords ($form/$context) don't resolve to a controller, so they stay as a blank stirng.
    let controllerId = "";
    if (context && context !== "$form" && context !== "$context") {
      const controller = this.getClosestController(el, context);
      if (controller) {
        controllerId = this._idForController(controller).toString();
        if (controllerId) {
          signature = signature + `>> controller >> ${controllerId}`;
        }
      }
    }

    return signature
  }

  /** @param {Element} el */
  _reconcileBindings(el) {
    const signature = this._generateSignature(el)

    if (!signature) {
      this._deleteCachedScopes(el);
      return;
    }

    /**
     * Copy it all into a single string for diff porpoises.
     */
    if (this._bindingSignatures.get(el) === signature) {
      return;
    }

    this._deleteCachedScopes(el); // stop the old scope. This doesn't remove anything, this allows us to create a new effect scope to be able to listen for changes.

    const scope = effectScope();
    this.flushChanges(() => {
      scope.run(() => {
        this._runEffects(el)
      });
    });
    this._bindingScopes.set(el, scope);
    this._bindingSignatures.set(el, signature);
  }

  /**
    * Deletes stored scopes for an element.
    * @param {Element} el
    */
  _deleteCachedScopes(el) {
    const scope = this._bindingScopes.get(el);
    if (scope) {
      scope.stop();
      this._bindingScopes.delete(el);
    }
    this._bindingSignatures.delete(el);
  }

  /**
   * @param {Controller} controller
   */
  _idForController(controller) {
    let id = this._controllerIds.get(controller);
    if (id == null) {
      this._controllerSequentialId++;
      id = this._controllerSequentialId;
      this._controllerIds.set(controller, id);
    }
    return id;
  }
}
