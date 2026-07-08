export const globalBus = new EventTarget()
/**
 * @template [T=unknown]
 * @param {T} val
 */
export function reactive (val) {
  return new State(val, globalBus)
}

/**
 * @template [T=unknown]
 * @typedef {Object} UpdateObject
 * @property {string | undefined | null} key
 * @property {T} oldValue
 * @property {T} newValue
 */

class StateChangeEvent extends Event {
  /**
   * @param {string} name
   * @param {EventInit & { key?: null | string, oldValue: unknown, newValue: unknown }} [init]
   */
  constructor(name, init) {
    super(name, init)

    if (init) {
      this.oldValue = init.oldValue
      this.newValue = init.newValue
      this.key = init.key
    }
  }
}


/**
 * @template [T=unknown]
 */
class State {
  /**
    * @param {T} value
    * @param {EventTarget} eventTarget
    */
  constructor (value, eventTarget) {
    /**
     * @type {T}
     */
    this._value = value
    this.eventTarget = eventTarget
  }

  valueOf () {
    return this.value
  }

  get value () {
    return this._value
  }

  /**
    * @param {T} newValue
    */
  set value (newValue) {
    const oldValue = this._value
    const shouldUpdate = oldValue !== newValue

    this._value = newValue

    if (shouldUpdate) {
      this.requestUpdate({key: null, newValue, oldValue})
    }
  }

  /**
   * @param {UpdateObject<T>} updateObject - paramDescription
   */
  requestUpdate (updateObject) {
    const evt = new StateChangeEvent("flow:change", updateObject)
    this.eventTarget.dispatchEvent(evt)
  }

  /**
    * @param {T} newValue
    */
  set (newValue) {
    this.value = newValue
  }

  /**
    * @param {(oldValue: T) => T} callback
    * @param {boolean} force
    */
  update (callback, force = false) {
    const oldValue = this._value
    const newValue = callback(this._value)
    this._value = newValue

    if (oldValue !== newValue || force) {
      this.requestUpdate({key: null, newValue, oldValue})
    }
  }
}
