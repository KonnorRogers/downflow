/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  __decorateClass,
  __privateAdd,
  __privateGet,
  __privateSet
} from "./chunk.7VGCIHDG.js";

// src/styles/component/host.styles.ts
import { css } from "lit";
var host_styles_default = css`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden],
  :host([hidden]) {
    display: none !important;
  }
`;

// src/internal/webawesome-element.ts
import { LitElement, isServer } from "lit";
import { property } from "lit/decorators.js";
var HAS_ENDING_COLON = /;\s+$/;
function camelToKebab(str) {
  return str.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}
function buildStyleAttribute(options) {
  const { property: property2, value, element } = options;
  if (value) {
    let style = element.getAttribute("style") || "";
    if (style) {
      if (!style.match(HAS_ENDING_COLON)) {
        style += ";";
      }
      style += " ";
    }
    const str = `${property2}: ${value}`;
    if (style.includes(str)) {
      return;
    }
    return `${style}${str};`;
  }
  return null;
}
var _hasRecordedInitialProperties;
var WebAwesomeElement = class extends LitElement {
  constructor() {
    super();
    __privateAdd(this, _hasRecordedInitialProperties, false);
    this.initialReflectedProperties = /* @__PURE__ */ new Map();
    this.didSSR = isServer || Boolean(this.shadowRoot);
    /**
     * @internal Methods for setting and checking custom states.
     */
    this.customStates = {
      /** Adds or removes the specified custom state. */
      set: (customState, active) => {
        if (!Boolean(this.internals?.states)) return;
        try {
          if (active) {
            this.internals.states.add(customState);
          } else {
            this.internals.states.delete(customState);
          }
        } catch (e) {
          if (String(e).includes("must start with '--'")) {
            console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");
          } else {
            throw e;
          }
        }
      },
      /** Determines whether or not the element currently has the specified state. */
      has: (customState) => {
        if (!Boolean(this.internals?.states)) return false;
        try {
          return this.internals.states.has(customState);
        } catch {
          return false;
        }
      }
    };
    try {
      this.internals = this.attachInternals();
    } catch {
      console.error("Element internals are not supported in your browser. Consider using a polyfill");
    }
    this.customStates.set("wa-defined", true);
    let Self = this.constructor;
    for (let [property2, spec] of Self.elementProperties) {
      if (spec.default === "inherit" && spec.initial !== void 0 && typeof property2 === "string") {
        this.customStates.set(`initial-${property2}-${spec.initial}`, true);
      }
    }
  }
  /** Prepends host styles to the component's styles. */
  static get styles() {
    const styles = Array.isArray(this.css) ? this.css : this.css ? [this.css] : [];
    return [host_styles_default, ...styles];
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.didSSR) {
      this.shadowRoot?.prepend(
        document.createComment(
          ` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-", "")} `
        )
      );
    }
    if (this.didSSR) {
      this.updateComplete.then(() => {
        this.shadowRoot?.prepend(
          document.createComment(
            ` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-", "")} `
          )
        );
      });
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (!__privateGet(this, _hasRecordedInitialProperties)) {
      this.constructor.elementProperties.forEach(
        (obj, prop) => {
          if (obj.reflect && this[prop] != null) {
            this.initialReflectedProperties.set(prop, this[prop]);
          }
        }
      );
      __privateSet(this, _hasRecordedInitialProperties, true);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    this.initialReflectedProperties.forEach((value, prop) => {
      if (changedProperties.has(prop) && this[prop] == null) {
        this[prop] = value;
      }
    });
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (this.didSSR) {
      this.shadowRoot?.querySelectorAll("slot").forEach((slotElement) => {
        slotElement.dispatchEvent(new Event("slotchange", { bubbles: true, composed: false, cancelable: false }));
      });
    }
  }
  update(changedProperties) {
    try {
      super.update(changedProperties);
    } catch (e) {
      if (this.didSSR && !this.hasUpdated) {
        const event = new Event("lit-hydration-error", { bubbles: true, composed: true, cancelable: false });
        event.error = e;
        this.dispatchEvent(event);
      }
      throw e;
    }
  }
  /**
   * @internal
   * Internal way to set styles across both client and server
   */
  setStyle(property2, value) {
    if (!this.style) {
      const str = buildStyleAttribute({
        // because this is going to be serialized to an HTML style attribute, need to transform the casing.
        property: camelToKebab(property2),
        value,
        element: this
      });
      if (str) {
        this.setAttribute("style", str);
      }
      return;
    }
    this.style[property2] = value;
  }
  /**
   * @internal
   * Internal way to set a CSS custom property across both client and server.
   */
  setStyleProperty(property2, value) {
    if (!this.style) {
      const str = buildStyleAttribute({
        // because this is going to be serialized to an HTML style attribute, need to transform the casing.
        property: property2,
        value,
        element: this
      });
      if (str) {
        this.setAttribute("style", str);
      }
      return;
    }
    this.style.setProperty(property2, value);
  }
  /**
   * @internal Given a native event, this function cancels it and dispatches it again from the host element using the desired
   * event options.
   */
  relayNativeEvent(event, eventOptions) {
    event.stopImmediatePropagation();
    this.dispatchEvent(
      new event.constructor(event.type, {
        ...event,
        ...eventOptions
      })
    );
  }
};
_hasRecordedInitialProperties = new WeakMap();
__decorateClass([
  property()
], WebAwesomeElement.prototype, "dir", 2);
__decorateClass([
  property()
], WebAwesomeElement.prototype, "lang", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "did-ssr" })
], WebAwesomeElement.prototype, "didSSR", 2);

export {
  host_styles_default,
  WebAwesomeElement
};
