import { ActionParser } from "../internal/action-parser.js";
import { Controller } from "./controller.js";

import {reactive, ref, isRef, effectScope, effect} from "@vue/reactivity"
import { EffectScheduler } from "./effect-scheduler.js";

export { Controller };

/**
 * @typedef {object} RegistryOptions
 * @property {HTMLElement | ShadowRoot} [RegistryOptions.rootElement=document.documentElement]
 * @property {string} [RegistryOptions.controllerAttribute="flow-controller"]
 * @property {string} [RegistryOptions.targetAttribute="flow-target"]
 * @property {string} [RegistryOptions.textAttribute="flow-text"]
 * @property {string} [RegistryOptions.actionAttribute="flow-action"]
 * @property {string} [RegistryOptions.scopeAttribute="flow-scope"]
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

    if (!(options.rootElement instanceof HTMLElement)) {
      throw new Error(
        `The rootElement must an HTMLElement. Was given ${options.rootElement}`,
      );
    }

    /**
     * The root element which is where query selectors will be scoped from.
     * @type {HTMLElement | ShadowRoot}
     */
    this.rootElement = options.rootElement;

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
     * A weakmap of all controller instances attach to a particular element
     * @type {Map<HTMLElement, Map<string, Controller>>}
     */
    this._controllerInstanceMap = new Map();

    /**
     * A weakmap to track if a target has connected or not for a particular controller.
     * @type {WeakMap<Element | HTMLElement, Map<Controller, boolean>>}
     */
    this._targetConnectionMap = new WeakMap();

    /**
     * String keyed cached so we can cache parse results.
     * @type {Map<string, import("../internal/action-parser.js").ParsedAction>}
     */
    this._actionCache = new Map();

    /**
     * If the registry has started listening for new elements.
     * @type {boolean}
     */
    this.started = false;

    /**
     * The attribute to use for finding a controller. Defaults to "flow-controller".
     * @type {string}
     */
    this.controllerAttribute = options.controllerAttribute || "flow-controller";

    /**
     * The attribute to use for finding targets. Defaults to "flow-target".
     * @type {string}
     */
    this.targetAttribute = options.targetAttribute || "flow-target";

    /**
     * The attribute to use for finding text updates. Defaults to "flow-text".
     * @type {string}
     */
    this.textAttribute = options.textAttribute || "flow-text";

    /**
     * The attribute to use for finding actions. Defaults to "flow-action".
     * @type {string}
     */
    this.actionAttribute = options.actionAttribute || "flow-action";

    /**
     * The attribute to use for finding scopes. Scopes are the "data" you're trying to read. Defaults to "flow-scope".
     * @type {string}
     */
    this.scopeAttribute = options.scopeAttribute || "flow-scope";

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

    this._watchedAttributes = [
      this.controllerAttribute,
      this.targetAttribute,
      this.textAttribute,
      this.actionAttribute,
    ];

    this._contextRef = ref({})

    this.forms = document.forms
    this.stores = {};

    /**
     * @type {Record<string, (evt: Event) => unknown>}
     */
    this.functions = {}

    this.effectScheduler = new EffectScheduler()

    this._bindingScopes = new Map()
    this._formState = new WeakMap()

    // TODO: should be keyed so we only need to update places that rely on this context.
    /**
    * @param {Event} evt
    */

    /**
     * @type (options: {str: string, context: Object}) => string
     */
    this.componentRenderer = (options) => options.str

    this.formEvents = ["change", "input"]

    this.eventUpdateContext = (e) => {
      const target = e.target

      if (!target) { return }
      if (!target.name) { return }

      const form = target?.form

      if (!form) { return }
      this._stateForForm(target.form)[target.name] = this._readFormControl(target) // reactive WRITE
    }

    this.formEvents.forEach((evt) => {
      this.rootElement.addEventListener(evt, this.eventUpdateContext, { signal: this.abortController?.signal })
    })
  }

  get context() {
    return this._contextRef.value
  }

  set context(ctx) {
    if (isRef(ctx)) {
      this._contextRef.value = ctx.value;
      return
    }

    this._contextRef.value = ctx
  }

  // in the Application:
  /**
   * @param {Element} el
   */
  _bindText(el) {
    const scope = effectScope();
    scope.run(() => {
      const runner = effect(() => {
        const value = this.resolveContextForElement(el, this.textAttribute); // reactive READ -> tracked
        const text = value == null ? "" : String(value);
        if (el.textContent !== text) { el.textContent = text };
      }, { scheduler: () => this.effectScheduler.schedule(runner) });
    });
    this._bindingScopes.set(el, scope); // Map<Element, EffectScope>
  }

  /**
   * @param {Element} el
   */
  _downgradeBindings(el) {
    const scope = this._bindingScopes.get(el);
    if (scope) {
      scope.stop();
      this._bindingScopes.delete(el);
    }
  }

  /**
    * @param {HTMLFormElement} form
   */
  _stateForForm(form) {
    let state = this._formState.get(form)
    if (!state) {
      state = reactive({})
      this._formState.set(form, state)
      for (const _el of form.elements) {
        const el = /** @type {Element & {name: string | null | undefined}} */(_el)
        if (el.name) {
          state[el.name] = this._readFormControl(el) // seed initial values
        }
      }
    }
    return state
  }

  /**
   * @param {Element} el
   */
  _readFormControl(el) {
    if (el.localName === "input") {
      const element = /** @type {HTMLInputElement} */(el)
      if (element.type === "checkbox") {
        return element.checked
      }

      if (element.type === "radio") {
        const elements = element.form?.elements

        if (!elements) { return null }

        return /** @type {HTMLInputElement} */ (Array.from(elements).find((el) => {
          return /** @type {HTMLInputElement} */ (el).name === element.name && /** @type {HTMLInputElement} */ (el).checked === true
        }))?.value ?? null
      }

    }
    if (el.localName === "select") {
      const element = /** @type {HTMLSelectElement} */ (el)
      return Array.from(element.selectedOptions, o => o.value)
    }

    return /** @type {HTMLInputElement} */ (el).value
  }


  /**
   * @param {string | null | undefined} [key]
   */
  updateContext(key) {
    /** @type {Array<Element> | NodeListOf<Element>} */
    let els = [];

    if (key) {
      const query = `[${this.textAttribute}='${key}']`;
      els = this.rootElement.querySelectorAll(query);
    } else {
      const query = `[${this.textAttribute}]`;
      els = this.rootElement.querySelectorAll(query);
    }

    for (const el of els) {
      this._bindText(el)
    }
  }

  /**
   * @param {Element} el
   * @param {string} attr
   */
  resolveContextForElement (el, attr) {
    let key = el.getAttribute(attr);

    if (!key) {
      return null;
    }

    const scope = el.getAttribute(this.scopeAttribute)
    let context = /** @type {Controller["state"] | Application["context"]} */(this.context)

    if (scope && scope !== "$form") {
      let controllerName = scope

      if (!controllerName) { return null }

      const closestControllerEl = el.closest(`[${this.controllerAttribute}~="${controllerName}"]`)
      const controller = this.getController(/** @type {HTMLElement} */(closestControllerEl), controllerName)

      if (!controller) {
        return null
      }

      context = controller.state
    }

    const keys = key.split(/\./g);

    let value = null

    if (scope === "$form") {
      const formAttr = el.getAttribute("form")
      const rootNode = /** @type {HTMLElement} */ ((el.getRootNode() || document))
      const form = /** @type {HTMLFormElement | null} */(formAttr ? rootNode.querySelector(`form#${formAttr}`) : el.closest("form"))

      console.log({ form, formAttr, rootNode })
      if (form) {
        value = this._stateForForm(form)[keys.join("")] // reactive READ -> tracked
      }
    } else {
      value = dig(context, ...keys);
    }

    return value
  }

  /**
   * Starts the registry and listens.
   * @param {RegistryOptions} options
   */
  start(options = {}) {
    /**
     * Used to stop all events added during this when you call "stop"
     */
    this.abortController = new AbortController()

    this.rootElement =
      options.rootElement || document.documentElement || this.rootElement;

    if (options.controllerAttribute) {
      this.controllerAttribute = options.controllerAttribute;
    }

    if (options.targetAttribute) {
      this.targetAttribute = options.targetAttribute;
    }

    if (options.textAttribute) {
      this.textAttribute = options.textAttribute;
    }

    if (options.actionAttribute) {
      this.actionAttribute = options.actionAttribute;
    }

    this._watchedAttributes = [
      this.controllerAttribute,
      this.targetAttribute,
      this.textAttribute,
      this.actionAttribute,
    ];

    if (!this.started) {
      this._observe();
      this.started = true;
    }
    this._upgradeAllElements(this.rootElement);
    this.updateContext()
    return this;
  }

  /**
   * Takes records, and then disconnects the observer.
   */
  stop() {
    if (this.started) {
      this.started = false;
      const mutations = this.observer?.takeRecords();

      if (mutations) {
        this.handleMutations(mutations);
      }

      this.observer?.disconnect();
      this._actionListenerMap.clear();
      this.abortController?.abort("application stopped")
    }
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
    this._upgradeControllers(name);
  }

  /**
   * Finds a map of controllers based on the element and controllerName.
   * @param {HTMLElement} element
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
      attributeFilter: [
        this.controllerAttribute,
        this.targetAttribute,
        this.textAttribute,
        this.actionAttribute
      ],
      attributeOldValue: true,
    });
  }

  /**
   * @param {MutationRecord[]} mutations
   */
  handleMutations = (mutations) => {
    for (const m of mutations) {
      if (m.type === "attributes") {
        if (m.attributeName == null) continue;

        if (m.attributeName === this.controllerAttribute) {
          this._handleControllerAttributeMutation(m);
        } else if (m.attributeName === this.targetAttribute) {
          this._handleTargetAttributeMutation(m);
        } else if (m.attributeName === this.actionAttribute) {
          this._handleActionAttributeMutation(m);
        } else {
        }

        continue
      }
      // childList
      else {
        m.removedNodes.forEach((node) => {
          this._downgradeAllElements(/** @type {HTMLElement} */(node));
        });
        m.addedNodes.forEach((node) => {
          this._upgradeAllElements(/** @type {HTMLElement} */(node));
        });
      }
    }
  };

  /**
   * @param {string} controllerName
   * @param {HTMLElement | ShadowRoot} [rootElement]
   */
  _upgradeControllers(controllerName, rootElement) {
    const root = rootElement || this.rootElement;

    let matches = root.querySelectorAll(this._controllerQuery(controllerName));

    matches.forEach((match) => {
      this._createControllerInstance(
        controllerName,
        /** @type {HTMLElement} */(match),
      );
    });
  }

  /**
   * @param {HTMLElement | ShadowRoot} element
   */
  _upgradeAllElements = (element) => {
    if (!("querySelectorAll" in element)) {
      return;
    }

    this._upgradeElement(element);

    // const query = this._watchedAttributes.map((attr) => {
    //   return `[${attr}]`
    // }).join(", ")

    element.querySelectorAll("*").forEach((el) => {
      this._upgradeElement(/** @type {HTMLElement} */(el));
    });
  };

  /**
   * @param {HTMLElement | ShadowRoot} element
   */
  _upgradeElement(element) {
    if (!("getAttribute" in element)) {
      return;
    }

    const controllers = element.getAttribute(this.controllerAttribute);

    if (controllers) {
      this._attributeToControllers(controllers).forEach((controllerName) => {
        this._createControllerInstance(controllerName, element);
      });
    }

    const eventAttr = element.getAttribute(this.actionAttribute);
    if (eventAttr) {
      const parsedActions = this._parseActionsFromActionAttribute(eventAttr);

      parsedActions.forEach((parsedAction) => {
        this.addParsedActionToElement(parsedAction, element);
      });
    }
  }

  /**
   * @param {HTMLElement} element
   */
  _downgradeAllElements = (element) => {
    if (element.nodeType !== 1) return;

    this._downgradeTargets(element);
    this._downgradeElement(element);
    this._downgradeBindings(element);

    [...new Set(Array.from(element.querySelectorAll("*")))].forEach((el) => {
      this._removeActionsForElement(el)
      this._downgradeTargets(el);
      this._downgradeElement(/** @type {HTMLElement} */(el));
      this._downgradeBindings(element);
    });
  };

  /**
   * @param {HTMLElement} element
   * @param {string} [controllerName] - if a controllerName is given, only downgrade that specific controller.
   */
  _downgradeElement = (element, controllerName) => {
    if (element.nodeType !== 1) return;

    let map = this._controllerInstanceMap.get(element);

    if (!map) {
      return;
    }

    // Downgrade every controller
    let instances = new Map();

    if (controllerName) {
      const inst = map.get(controllerName);
      if (inst) instances.set(controllerName, inst);
    } else {
      instances = map;
    }

    map.forEach((inst) => {
      if (!inst.isConnected) return;

      /** @type {typeof Controller} */ (inst.constructor).targets.forEach(
        (targetName) => {
          // @ts-expect-error
          /** @type {HTMLElement[]} */ (inst[`${targetName}Targets`]).forEach(
          (target) => {
            this._downgradeTargets(target);
          },
        );
        },
      );

      if (inst.disconnectedCallback) {
        inst.disconnectedCallback();
        inst.isConnected = false;
      }
    });
  };

  /**
   * @param {MutationRecord} mutation
   */
  _handleActionAttributeMutation(mutation) {
    if (mutation.attributeName !== this.actionAttribute) return;

    const target = /** @type {HTMLElement} */ (mutation.target);
    const listeners = this._actionListenerMap.get(target) ?? new Map();

    const attr = target.getAttribute(this.actionAttribute) || "";

    /** @type {Map<string, import("../internal/action-parser.js").ParsedAction>} */
    const desired = new Map();
    this._parseActionsFromActionAttribute(attr).forEach((pa) => desired.set(pa.source, pa));

    // Remove attached actions that are no longer declared.
    for (const [source, record] of listeners) {
      if (!desired.has(source)) {
        record.target.removeEventListener(record.eventName, record.fn, record.options);
        listeners.delete(source);
      }
    }

    // Add declared actions that aren't attached yet.
    for (const [source, parsedAction] of desired) {
      if (!listeners.has(source)) {
        this.addParsedActionToElement(parsedAction, target);
      }
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
   * @param {HTMLElement} target
   * @param {string} targetName
   * @param {Controller} controller
   */
  _downgradeTargetForAttribute(target, targetName, controller) {
    const targetMap = this._targetConnectionMap.get(target);

    if (!targetMap) return;

    if (!targetMap.get(controller)) return;

    this._disconnectTarget(controller, targetName, target);
  }

  /**
   * @param {string} controllerName
   * @param {HTMLElement} el
   */
  _createControllerInstance(controllerName, el) {
    let controllerInstanceMap = this._controllerInstanceMap.get(el);

    if (!controllerInstanceMap) {
      controllerInstanceMap = new Map();
      this._controllerInstanceMap.set(el, controllerInstanceMap);
    }

    let inst = this.getController(el, controllerName);

    let hasController = el
      .getAttribute(this.controllerAttribute)
      ?.includes(controllerName);

    if (!inst) {
      let Constructor = this._getConstructor(controllerName);

      if (!Constructor) return;

      inst = new Constructor({
        element: el,
        application: this,
        controllerName,
      });

      inst.initialize();
      controllerInstanceMap.set(controllerName, inst);
    }

    if (!inst.isConnected) {
      inst.isConnected = true;

      inst.connectedCallback();

      // Find children targets and upgrade them
      queueMicrotask(() => {
        if (inst) {
          this._upgradeTargets(inst);
        }
      });
    }

    // Attribute was removed
    if (!hasController) {
      inst.disconnectedCallback();

      inst.isConnected = false;
    }
  }

  /**
   * Takes an attribute and turns it into an array of controller names.
   * @param {string} str
   * @return {Array<string>}
   */
  _attributeToControllers(str) {
    return str?.split(/\s+/) || [];
  }

  /**
   * @param {MutationRecord} m
   */
  _handleControllerAttributeMutation(m) {
    if (!m.attributeName) return;

    const target = /** @type {HTMLElement} */ (m.target);
    const attribute = target.getAttribute(m.attributeName);

    // If we remove the attribute, we can just remove all controllers.
    if (!attribute) {
      this._downgradeElement(/** @type {HTMLElement} */(target));
      return;
    }

    let controllersToConnect = this._attributeToControllers(attribute);

    if (m.oldValue && attribute !== m.oldValue) {
      // We need to do some diff logic here to figure out what controllers to disconnect
      const oldControllers = this._attributeToControllers(m.oldValue);

      // We could make turn these into Set and compare that way, but for such small arrays, feels wasteful.
      // Disconnect any controllers not found in the new attributes.
      oldControllers.forEach((controllerName) => {
        if (controllersToConnect.includes(controllerName)) return;

        this._downgradeElement(target, controllerName);
      });
    }

    controllersToConnect.forEach((controllerName) => {
      this._createControllerInstance(controllerName, target);
    });
  }

  /**
   * @param {MutationRecord} mutation
   */
  _handleTargetAttributeMutation(mutation) {
    if (!mutation.attributeName) return;

    if (mutation.attributeName !== this.targetAttribute) {
      return;
    }

    /**
     * @type {HTMLElement}
     */
    // @ts-expect-error
    const target = mutation.target;

    const targetAttr = target.getAttribute(this.targetAttribute);

    /**
     * @type {string[]}
     */
    let oldControllers = [];

    if (mutation.oldValue) {
      oldControllers = this._parseControllersFromTargetAttribute(
        mutation.oldValue,
      );
    }

    /**
     * @type {string[]}
     */
    let currentControllers = [];

    if (targetAttr) {
      currentControllers =
        this._parseControllersFromTargetAttribute(targetAttr);
    }

    const controllersToFind = oldControllers.filter(
      (controllerName) => !currentControllers.includes(controllerName),
    );

    controllersToFind.forEach((controllerName) => {
      /** Have to check parentElement because closest could return a controller at same level as target. */
      const closestController = target?.parentElement?.closest(
        this._controllerQuery(controllerName),
      );

      if (!closestController) {
        return;
      }

      const controller = this.getController(
        /** @type {HTMLElement} */(closestController),
        controllerName,
      );

      if (!controller) return;

      this._upgradeTargets(controller);

      const oldVal = mutation.oldValue;

      if (!oldVal) return;

      const targetNames =
        this._parseControllersAndTargetsFromTargetAttribute(oldVal)[
        controller.controllerName
        ];

      targetNames.forEach((targetName) => {
        this._downgradeTargetForAttribute(target, targetName, controller);
      });
    });
  }

  /**
   * @param {HTMLElement | Element} target
   */
  _downgradeTargets(target) {
    let controllerMap = this._targetConnectionMap.get(target);

    if (!controllerMap) return;

    const targetAttr = target.getAttribute(this.targetAttribute);

    /** @type {Record<string, Array<string>>} */
    let controllersAndTargetsObj = {};

    if (targetAttr) {
      controllersAndTargetsObj =
        this._parseControllersAndTargetsFromTargetAttribute(targetAttr);
    }

    for (const [controller, connected] of controllerMap) {
      if (!connected) continue;
      const targetNames = controllersAndTargetsObj[controller.controllerName];


      targetNames?.forEach((targetName) => {
        if (!target.isConnected) {
          this._disconnectTarget(controller, targetName, target);
          return;
        }

        if (!targetAttr) {
          this._disconnectTarget(controller, targetName, target);
          return;
        }

        // This preserves scope.
        if (
          target.parentElement?.closest(
            this._controllerQuery(controller.controllerName),
          ) !== controller.element
        ) {
          this._disconnectTarget(controller, targetName, target);
          return;
        }
      });
    }
  }

  /**
   * Finds all `[flow~=<controller>.<target>]`
   * @param {string} controllerName -
   * @param {string} targetName
   * @return {string}
   */
  _targetQuery(controllerName, targetName) {
    // Because we scope, we need to make sure the parent is not the same controller.
    return `[${this.targetAttribute}~='${controllerName}.${targetName}']`;
  }

  /**
   * @param {string} controllerName
   * @return {string}
   */
  _controllerQuery(controllerName) {
    return `[${this.controllerAttribute}~='${controllerName}']`;
  }

  /**
   * @param {Controller} controller
   */
  _upgradeTargets(controller) {
    /** @type {typeof Controller} */ (controller.constructor).targets.forEach(
    (targetName) => {
      const { element, controllerName } = controller;
      const query = this._targetQuery(controllerName, targetName);

      element.querySelectorAll(query).forEach((target) => {
        // This preserves scope.
        if (
          target.parentElement?.closest(
            this._controllerQuery(controllerName),
          ) !== element
        ) {
          return;
        }

        let targetMap = this._targetConnectionMap.get(target);

        if (!targetMap) {
          targetMap = new Map();
          this._targetConnectionMap.set(target, targetMap);
        }

        const isConnected = targetMap.get(controller);

        if (isConnected) return;

        targetMap.set(controller, true);

        /** @type {(target: Element) => void} */
        // @ts-expect-error
        const targetConnectedFn = controller[`${targetName}TargetConnected`];

        if (typeof targetConnectedFn === "function") {
          targetConnectedFn(target);
        }
      });
    },
  );
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
  _parseActionsFromActionAttribute(str) {
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
   * @param {string} str
   * @return {Record<string, Array<string>>}
   */
  _parseControllersAndTargetsFromTargetAttribute(str) {
    /**
     * @type {Record<string, Array<string>>}
     */
    const finalObj = {};

    str.split(/\s+/).forEach((targetString) => {
      const splitStr = targetString.split(/\./);

      const controllerName = splitStr[0];
      const targetName = splitStr[1];

      if (!finalObj[controllerName]) {
        finalObj[controllerName] = [];
      }

      finalObj[controllerName].push(targetName);
    });

    return finalObj;
  }

  /**
   * @param {import("../internal/action-parser.js").ParsedAction} parsedAction
   * @param {HTMLElement} element
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

    const _controllerName = /** @type {any} */ (controllerName)
    if (_controllerName instanceof Error) { return }

    if (!eventName) { return }

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
        let closestControllerElement = null;

        closestControllerElement = element?.closest?.(
          self._controllerQuery(controllerName),
        );

        if (!closestControllerElement) {
          // TODO: Should we throw an error if no controller found? Maybe in debug logs?
          return;
        }


        controller = self.getController(
          /** @type {HTMLElement} */(closestControllerElement),
          controllerName,
        );
      } else {
        controller = self.functions
        console.log({ controller })
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

      if (shouldCallFunction) {
        // @ts-expect-error
        controller[controllerFunction].call(controller, evt);
      }
    };

    let target = element
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

    target.addEventListener(eventName, fn, { ...options, signal: this.abortController?.signal });

    let listeners = this._actionListenerMap.get(element);
    if (!listeners) {
      listeners = new Map();
      this._actionListenerMap.set(element, listeners);
    }

    // Idempotent: if this exact action is somehow already bound, drop the old one.
    const existing = listeners.get(parsedAction.source);
    if (existing) {
      existing.target.removeEventListener(existing.eventName, existing.fn, existing.options);
    }

    listeners.set(parsedAction.source, { target, eventName, fn, options });
  }

  /**
  * @param {Controller} controller
  * @param {string} targetName
  * @param {HTMLElement | Element} target
  */
  _disconnectTarget(controller, targetName, target) {
    /** @type {(target: Element) => void} */
    // @ts-expect-error
    const targetDisconnectedFn = controller[`${targetName}TargetDisconnected`];

    if (typeof targetDisconnectedFn === "function") {
      targetDisconnectedFn(target);
      this._targetConnectionMap.delete(target)
    }
  }
}

