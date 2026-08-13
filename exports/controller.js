import { ref, isRef, reactive } from "@vue/reactivity"

/**
 * The base class for creating oil controllers.
 */
export class Controller {
  /**
   * @type {string[]}
   */
  static targets = [];

  /**
   * @type {string | null | undefined}
   */
  static controllerName;

  static __finalized__ = false;

  /**
   * @param {object} options
   * @param {HTMLElement} options.element
   * @param {import("./application.js").Application} options.application
   * @param {string} options.controllerName
   */
  constructor({ element, application, controllerName }) {
    const ctor = /** @type {typeof Controller} */ (this.constructor);
    if (!ctor.__finalized__) {
      ctor.__finalized__ = true;
      ctor.targets.forEach((targetName) => {
        // Make sure target calls are accessible in the constructor.
        Object.defineProperties(ctor.prototype, {
          [`${targetName}Targets`]: {
            get() {
              const targets = this.application.targetsForController(this, targetName)
              return targets
            },
          },
          [`has${capitalize(targetName)}Target`]: {
            get() {
              return Boolean(this[`${targetName}Target`]);
            },
          },
          [`${targetName}Target`]: {
            get() {
              return this[`${targetName}Targets`]?.[0] || null;
            },
          },
        });
      });
    }

    /**
     * @type {Element}
     */
    this.element = element;

    /**
     * @type {import("./application.js").Application}
     */
    this.application = application;

    /**
     * @type {string}
     */
    this.controllerName = controllerName;

    /**
     * @type {boolean}
     */
    this.isConnected = false;

    this._contextRef = ref({})
  }

  get context () {
    return this._contextRef.value
  }

  set context (obj) {
    if (isRef(obj)) {
      this._contextRef.value = obj.value;
      return
    }

    this._contextRef.value = obj
  }

  /**
   * @returns {HTMLFormElement | null}
   */
  get form () {
    // @ts-expect-error this will only work when attached to an element that is a form control IE: button, input, etc.
    let form = this.element.form
    if (form) { return form }

    const formAttr = this.element?.getAttribute?.("form")

    if (formAttr) {
      return this.element.querySelector(`#${formAttr}`)
    }

    return this.element.closest("form") || null
  }

  get formData () {
    const form = this.form

    if (!form) { return null }

    return new FormData(form)
  }

  initialize() {}
  connectedCallback() {}
  disconnectedCallback() {}
}

/**
 * @param {string} str
 * @return {string}
 */
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1, str.length);
}
