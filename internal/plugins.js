/**
 * @typedef {EffectPlugin | BindingPlugin} Plugin
 */

/**
 * @typedef {Object} BindingPlugin
 * @property {string} name
 * @property {"binding"} type
 * @property {(el: Element) => any} [parseElement]
 * @property {(value: any) => any} [run]
 * @property {(el: Element, attributeName: string) => boolean} match
 */

/**
 * @typedef {Object} EffectPlugin
 * @property {string} name
 * @property {(el: Element) => any} run
 * @property {"effect"} type
 * @property {(el: Element, attributeName: string) => boolean} match
 */

