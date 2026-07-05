import { Controller } from "./controller.js"

export { Controller }

/**
 * @typedef {object} RegistryOptions
 * @property {HTMLElement | ShadowRoot} [RegistryOptions.rootElement=document.documentElement]
 * @property {string} [RegistryOptions.controllerAttribute="flow-controller"]
 * @property {string} [RegistryOptions.targetAttribute="flow-target"]
 * @property {string} [RegistryOptions.textAttribute="flow-text"]
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
  static start (options = {}) {
    return new this(options).start()
  }

  /**
   * @param {RegistryOptions} options
   */
  constructor(options = {}){
    if (!options.rootElement) {
      options.rootElement = document.documentElement
    }

    if(!(options.rootElement instanceof HTMLElement)) {
      throw new Error(`The rootElement must an HTMLElement. Was given ${options.rootElement}`);
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
     * A weakmap of all controller instances attach to a particular element
     * @type {WeakMap<HTMLElement, Map<string, Controller>>}
     */
    this._controllerInstanceMap = new Map();

    /**
     * A weakmap to track if a target has connected or not for a particular controller.
     * @type {WeakMap<Element | HTMLElement, Map<Controller, boolean>>}
     */
    this._targetConnectionMap = new Map();

    /**
     * If the registry has started listening for new elements.
     * @type {boolean}
     */
    this.started = false

    /**
     * The attribute to use for finding a controller. Defaults to "lite-controller".
     * @type {string}
     */
    this.controllerAttribute = options.controllerAttribute || "flow-controller"

    /**
     * The attribute to use for finding targets. Defaults to "lite-target".
     * @type {string}
     */
    this.targetAttribute = options.targetAttribute || "flow-target"

    this.textAttribute = options.textAttribute || "flow-text"

    this.stores = {}
    this.context = {}
  }

  /**
   * @param {string | null | undefined} [key]
   */
  updateContext (key) {
    /** @type {Array<Element> | NodeListOf<Element>} */
    let els = []

    if (key) {
      els = document.querySelectorAll(`[flow-text='${key}']`)
    } else {
      els = document.querySelectorAll("[flow-text]")
    }

    els.forEach((el) => {
      const key = el.getAttribute("flow-text")
      if (!key) { return }

      const keys = key.split(/\./g)
      const value = dig(el, ...keys)
      if (el.textContent !== value) {
        if (!value) {
          el.textContent = ""
        }

        if (typeof value === "string") {
          el.textContent = value
        }
      }
    })
  }

  /**
   * Starts the registry and listens.
   * @param {RegistryOptions} options
   */
  start (options = {}) {
    this.rootElement = options.rootElement || document.documentElement

    if (options.controllerAttribute) {
      this.controllerAttribute = options.controllerAttribute
    }

    if (options.targetAttribute) {
      this.targetAttribute = options.targetAttribute
    }

    if (!this.started) {
      this._observe();
      this.started = true
    }
    return this
  }

  /**
   * Takes records, and then disconnects the observer.
   */
  stop () {
    if (this.started) {
      this.started = false
      const mutations = this.observer?.takeRecords()

      if (mutations) {
        this.handleMutations(mutations)
      }

      this.observer?.disconnect()
    }
    return this
  }

  /**
   * Registers a new controller to listen for.
   * @param {typeof Controller} Constructor
   * @param {string} [controllerName] - Use this to override the registration name.
   */
  register(Constructor, controllerName) {
    const name = Constructor.controllerName || controllerName
    if (!name) {
      console.error(`No "controllerName" given for ${Constructor}.`)
      return
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
    if(!map) return;
    return map.get(controllerName);
  }

  /**
   * @param {string} controllerName
   * @return {undefined | null | typeof Controller}
   */
  _getConstructor (controllerName) {
    return this._controllerConstructorMap.get(controllerName);
  }

  _observe () {
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
      ],
      attributeOldValue: true
    });
  }

  /**
   * @param {MutationRecord[]} mutations
   */
  handleMutations = (mutations) => {
    for (const m of mutations) {
      if(m.type === 'attributes') {
        if (m.attributeName == null) continue;

        if (m.attributeName === this.controllerAttribute) {
          this._handleControllerAttributeMutation(m)
          continue
        } else if (m.attributeName === this.targetAttribute) {
          this._handleTargetAttributeMutation(m)
        }
      }
      // childList
      else {
        m.removedNodes.forEach((node) => {
          this._downgradeAllElements(/** @type {HTMLElement} */ (node))
        })
        m.addedNodes.forEach((node) => {
          this._upgradeAllElements(/** @type {HTMLElement} */ (node))
        })
      }
    }
  }

  /**
   * @param {string} controllerName
   * @param {HTMLElement | ShadowRoot} [rootElement]
   */
  _upgradeControllers(controllerName, rootElement) {
    const root = rootElement || this.rootElement;

    let matches = root.querySelectorAll(this._controllerQuery(controllerName));

    matches.forEach((match) => {
      this._createControllerInstance(controllerName, /** @type {HTMLElement} */ (match));
    })
  }

  /**
   * @param {HTMLElement} element
   */
  _upgradeAllElements = (element) => {
    if(element.nodeType !== 1) return;

    this._upgradeElement(element)

    element.querySelectorAll("*").forEach((el) => {
      this._upgradeElement(/** @type {HTMLElement} */ (el))
    })
  }

  /**
   * @param {HTMLElement} element
   */
  _upgradeElement(element) {
    if(element.nodeType !== 1) return;

    const controllers = element.getAttribute(this.controllerAttribute)

    if (controllers) {
      this._attributeToControllers(controllers).forEach((controllerName) => {
        this._createControllerInstance(controllerName, element);
      })
    }
  }

  /**
   * @param {HTMLElement} element
   */
  _downgradeAllElements = (element) => {
    if(element.nodeType !== 1) return;

    // this._downgradeTargetFromElement(element)
    this._downgradeTargets(element)
    this._downgradeElement(element);

    ;[...new Set(Array.from(element.querySelectorAll("*")))].forEach((el) => {
      this._downgradeTargets(element)
      this._downgradeElement(/** @type {HTMLElement} */ (el))
    })
  }

  /**
   * @param {HTMLElement} element
   * @param {string} [controllerName] - if a controllerName is given, only downgrade that specific controller.
   */
  _downgradeElement = (element, controllerName) => {
    if(element.nodeType !== 1) return;

    let map = this._controllerInstanceMap.get(element);

    if(!map) {
      return
    }

    // Downgrade every controller
    let instances = new Map()

    if (controllerName) {
      const inst = map.get(controllerName)
      if (inst) instances.set(controllerName, inst)
    } else {
      instances = map
    }

    map.forEach((inst) => {
      if (!inst.isConnected) return

      ;/** @type {typeof Controller} */ (inst.constructor).targets.forEach((targetName) => {
        // @ts-expect-error
        ;/** @type {HTMLElement[]} */ (inst[`${targetName}Targets`]).forEach((target) => {
          this._downgradeTargets(target)
        })
      })

      if (inst.disconnectedCallback) {
        inst.disconnectedCallback();
        inst.isConnected = false
      }
    });
  }

  /**
   * @param {HTMLElement} target
   * @param {string} targetName
   * @param {Controller} controller
   */
  _downgradeTargetForAttribute (target, targetName, controller) {
    const targetMap = this._targetConnectionMap.get(target)

    if (!targetMap) return

    if (!targetMap.get(controller)) return

    disconnectTarget(controller, targetName, target)
    // this._targetConnectionMap.delete(target)
  }

  /**
   * @param {string} controllerName
   * @param {HTMLElement} el
   */
  _createControllerInstance(controllerName, el) {
    let controllerInstanceMap = this._controllerInstanceMap.get(el);

    if(!controllerInstanceMap) {
      controllerInstanceMap = new Map();
      this._controllerInstanceMap.set(el, controllerInstanceMap);
    }

    let inst = this.getController(el, controllerName);

    let hasController = el.getAttribute(this.controllerAttribute)?.includes(controllerName);

    if(!inst) {
      let Constructor = this._getConstructor(controllerName);

      if (!Constructor) return

      inst = new Constructor({ element: el, application: this, controllerName });

      inst.initialize()
      controllerInstanceMap.set(controllerName, inst);
    }

    if (!inst.isConnected) {
      inst.isConnected = true

      inst.connectedCallback();

      // Find children targets and upgrade them
      setTimeout(() => {
        if (inst) {
          this._upgradeTargets(inst)
        }
      })
    }

    // Attribute was removed
    if(!hasController) {
      inst.disconnectedCallback();

      inst.isConnected = false
    }
  }

  /**
   * Takes an attribute and turns it into an array of controller names.
   * @param {string} str
   * @return {Array<string>}
   */
  _attributeToControllers (str) {
    return str?.split(/\s+/) || []
  }

  /**
   * @param {MutationRecord} m
   */
  _handleControllerAttributeMutation (m) {
    if (!m.attributeName) return

    const target = /** @type {HTMLElement} */ (m.target)
    const attribute = target.getAttribute(m.attributeName)

    // If we remove the attribute, we can just remove all controllers.
    if (!attribute) {
      this._downgradeElement(/** @type {HTMLElement} */ (target))
      return
    }

    let controllersToConnect = this._attributeToControllers(attribute)

    if (m.oldValue && attribute !== m.oldValue) {
      // We need to do some diff logic here to figure out what controllers to disconnect
      const oldControllers = this._attributeToControllers(m.oldValue)

      // We could make turn these into Set and compare that way, but for such small arrays, feels wasteful.
      // Disconnect any controllers not found in the new attributes.
      oldControllers.forEach((controllerName) => {
        if (controllersToConnect.includes(controllerName)) return

        this._downgradeElement(target, controllerName)
      })
    }

    controllersToConnect.forEach((controllerName) => {
      this._createControllerInstance(controllerName, target);
    })
  }

  /**
   * @param {MutationRecord} mutation
   */
  _handleTargetAttributeMutation (mutation) {
    if (!mutation.attributeName) return

    if (mutation.attributeName !== this.targetAttribute) {
      return
    }

    /**
     * @type {HTMLElement}
     */
    // @ts-expect-error
    const target = mutation.target

    const targetAttr = target.getAttribute(this.targetAttribute)

    /**
     * @type {string[]}
     */
    let oldControllers = []

    if (mutation.oldValue) {
      oldControllers = this._parseControllersFromTargetAttribute(mutation.oldValue)
    }

    /**
     * @type {string[]}
     */
    let currentControllers = []

    if (targetAttr) {
      currentControllers = this._parseControllersFromTargetAttribute(targetAttr)
    }

    const controllersToFind = oldControllers.filter((controllerName) => !currentControllers.includes(controllerName))

    controllersToFind.forEach((controllerName) => {
      /** Have to check parentElement because closest could return a controller at same level as target. */
      const closestController = target?.parentElement?.closest(this._controllerQuery(controllerName))

      if (!closestController) {
        return
      }

      const controller = this.getController(/** @type {HTMLElement} */ (closestController), controllerName)

      if (!controller) return

      this._upgradeTargets(controller)

      const oldVal = mutation.oldValue

      if (!oldVal) return

      const targetNames = this._parseControllersAndTargetsFromTargetAttribute(oldVal)[controller.controllerName]

      targetNames.forEach((targetName) => {
        this._downgradeTargetForAttribute(target, targetName, controller)
      })
    })

  }

  /**
   * @param {HTMLElement | Element} target
   */
  _downgradeTargets (target) {
    let controllerMap = this._targetConnectionMap.get(target)

    if (!controllerMap) return

    const targetAttr = target.getAttribute(this.targetAttribute)

    /** @type {Record<string, Array<string>>} */
    let controllersAndTargetsObj = {}

    if (targetAttr) {
      controllersAndTargetsObj = this._parseControllersAndTargetsFromTargetAttribute(targetAttr)
    }

    for (const [controller, connected] of controllerMap) {
      if (!connected) continue
      const targetNames = controllersAndTargetsObj[controller.controllerName]

      targetNames?.forEach((targetName) => {
        if (!target.isConnected) {
          disconnectTarget(controller, targetName, target)
          return
        }

        if (!targetAttr) {
          disconnectTarget(controller, targetName, target)
          return
        }

        // This preserves scope.
        if (target.parentElement?.closest(this._controllerQuery(controller.controllerName)) !== controller.element) {
          disconnectTarget(controller, targetName, target)
          return
        }
      })
    }
  }

  /**
    * Finds all `[lite-target~=<controller>.<target>]`
    * @param {string} controllerName -
    * @param {string} targetName
    * @return {string}
    */
  _targetQuery (controllerName, targetName) {
    // Because we scope, we need to make sure the parent is not the same controller.
    return `[${this.targetAttribute}~='${controllerName}.${targetName}']`
  }

  /**
   * @param {string} controllerName
   * @return {string}
   */
  _controllerQuery(controllerName) {
    return `[${this.controllerAttribute}~='${controllerName}']`
  }

  /**
   * @param {Controller} controller
   */
  _upgradeTargets(controller) {
    /** @type {typeof Controller} */ (controller.constructor).targets.forEach((targetName) => {
      const { element, controllerName } = controller
      const query = this._targetQuery(controllerName, targetName)

      element.querySelectorAll(query).forEach((target) => {
        // This preserves scope.
        if (target.parentElement?.closest(this._controllerQuery(controllerName)) !== element) {
          return
        }

        let targetMap = this._targetConnectionMap.get(target)

        if (!targetMap) {
          targetMap = new Map()
          this._targetConnectionMap.set(target, targetMap)
        }

        const isConnected = targetMap.get(controller)

        if (isConnected) return

        targetMap.set(controller, true)

        /** @type {(target: Element) => void} */
        // @ts-expect-error
        const targetConnectedFn = controller[`${targetName}TargetConnected`]

        if (typeof targetConnectedFn === "function") {
          targetConnectedFn(target)
        }
      })
    })
  }

  /**
   * @param {string} str
   * @return {Array<string>}
   */
  _parseControllersFromTargetAttribute (str) {
    /**
     * @type {Array<string>}
     */
    const ary = []

    str.split(/\s+/).forEach((targetString) => {
      const splitStr = targetString.split(/\./)

      const controllerName = splitStr[0]
      ary.push(controllerName)
    })

    return ary
  }

  /**
   * @param {string} str
   * @return {Record<string, Array<string>>}
   */
  _parseControllersAndTargetsFromTargetAttribute (str) {
    /**
     * @type {Record<string, Array<string>>}
     */
    const finalObj = {}

    str.split(/\s+/).forEach((targetString) => {
      const splitStr = targetString.split(/\./)

      const controllerName = splitStr[0]
      const targetName = splitStr[1]

      if (!finalObj[controllerName]) {
        finalObj[controllerName] = []
      }

      finalObj[controllerName].push(targetName)
    })

    return finalObj
  }
}

/**
  * @param {Controller} controller
  * @param {string} targetName
  * @param {HTMLElement | Element} target
  */
function disconnectTarget (controller, targetName, target) {
  /** @type {(target: Element) => void} */
  // @ts-expect-error
  const targetDisconnectedFn = controller[`${targetName}TargetDisconnected`]

  if (typeof targetDisconnectedFn === "function") {
    targetDisconnectedFn(target)
  }
}
