/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaAccordionItemCollapsedEvent
} from "./chunk.4MQTK254.js";
import {
  WaAccordionItemExpandedEvent
} from "./chunk.M7O5VY4E.js";
import {
  WaAccordionItemTriggerEvent
} from "./chunk.NSSMHWNA.js";
import {
  waitForEvent
} from "./chunk.F25QOBDY.js";
import {
  animate,
  parseDuration
} from "./chunk.L6CIKOFQ.js";
import {
  watch
} from "./chunk.PZAN6FPN.js";
import {
  WebAwesomeElement
} from "./chunk.AOKMSJXD.js";
import {
  LocalizeController
} from "./chunk.CDGKIW7Y.js";
import {
  accordion_item_styles_default
} from "./chunk.QAR32T43.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// src/components/accordion-item/accordion-item.ts
import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
var WaAccordionItem = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.animationGeneration = 0;
    this.localize = new LocalizeController(this);
    this.isAnimating = false;
    this.label = "";
    this.expanded = false;
    this.disabled = false;
    this.headingLevel = "3";
    this.isTabbable = true;
    this.iconPlacement = "end";
    this.appearance = "outlined";
  }
  firstUpdated() {
    this.body.style.height = this.expanded ? "auto" : "0";
  }
  updated() {
    this.customStates.set("animating", this.isAnimating);
  }
  handleTriggerClick() {
    if (this.disabled) return;
    this.dispatchEvent(new WaAccordionItemTriggerEvent({ item: this }));
  }
  handleTriggerKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.handleTriggerClick();
    }
  }
  async handleExpandedChange() {
    this.animationGeneration++;
    const generation = this.animationGeneration;
    if (this.expanded) {
      this.isAnimating = true;
      const duration = parseDuration(getComputedStyle(this.body).getPropertyValue("--show-duration") || "200ms");
      const easing = getComputedStyle(this.body).getPropertyValue("--easing") || "ease";
      await animate(
        this.body,
        [
          { height: "0", opacity: "0" },
          { height: `${this.body.scrollHeight}px`, opacity: "1" }
        ],
        { duration, easing }
      );
      if (this.animationGeneration !== generation) return;
      this.body.style.height = "auto";
      this.isAnimating = false;
      this.dispatchEvent(new WaAccordionItemExpandedEvent());
    } else {
      this.isAnimating = true;
      const duration = parseDuration(getComputedStyle(this.body).getPropertyValue("--hide-duration") || "200ms");
      const easing = getComputedStyle(this.body).getPropertyValue("--easing") || "ease";
      await animate(
        this.body,
        [
          { height: `${this.body.scrollHeight}px`, opacity: "1" },
          { height: "0", opacity: "0" }
        ],
        { duration, easing }
      );
      if (this.animationGeneration !== generation) return;
      this.body.style.height = "0";
      this.isAnimating = false;
      this.dispatchEvent(new WaAccordionItemCollapsedEvent());
    }
  }
  /** Expands the accordion item with animation. */
  async expand() {
    if (this.expanded || this.disabled) return;
    this.expanded = true;
    return waitForEvent(this, "wa-accordion-item-expanded");
  }
  /** Collapses the accordion item with animation. */
  async collapse() {
    if (!this.expanded || this.disabled) return;
    this.expanded = false;
    return waitForEvent(this, "wa-accordion-item-collapsed");
  }
  /** Toggles the accordion item's expanded state. */
  async toggle() {
    return this.expanded ? this.collapse() : this.expand();
  }
  /** Focuses the accordion item's trigger button. */
  focus(options) {
    this.triggerButton?.focus(options);
  }
  renderHeadingWrapper(content) {
    const level = parseInt(this.headingLevel, 10);
    switch (level >= 1 && level <= 6 ? level : 3) {
      case 1:
        return html`<h1 part="heading">${content}</h1>`;
      case 2:
        return html`<h2 part="heading">${content}</h2>`;
      case 4:
        return html`<h4 part="heading">${content}</h4>`;
      case 5:
        return html`<h5 part="heading">${content}</h5>`;
      case 6:
        return html`<h6 part="heading">${content}</h6>`;
      default:
        return html`<h3 part="heading">${content}</h3>`;
    }
  }
  render() {
    const isRtl = !this.hasUpdated ? this.dir === "rtl" : this.localize.dir() === "rtl";
    const button = html`
      <button
        part="button"
        type="button"
        id="trigger"
        aria-expanded=${this.expanded ? "true" : "false"}
        aria-controls="panel"
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled || !this.isTabbable ? "-1" : "0"}
        @click=${this.handleTriggerClick}
        @keydown=${this.handleTriggerKeyDown}
      >
        <slot name="label" part="label">${this.label}</slot>
        <span part="icon">
          <slot name="icon">
            <wa-icon library="system" variant="solid" name=${isRtl ? "chevron-left" : "chevron-right"}></wa-icon>
          </slot>
        </span>
      </button>
    `;
    return html`
      <div part="base">
        ${this.headingLevel === "none" ? button : this.renderHeadingWrapper(button)}
        <div
          part="panel"
          id="panel"
          class=${classMap({ body: true, animating: this.isAnimating })}
          role="region"
          aria-labelledby="trigger"
        >
          <slot part="content" class="content"></slot>
        </div>
      </div>
    `;
  }
};
WaAccordionItem.css = accordion_item_styles_default;
__decorateClass([
  query(".body")
], WaAccordionItem.prototype, "body", 2);
__decorateClass([
  query('[part~="button"]')
], WaAccordionItem.prototype, "triggerButton", 2);
__decorateClass([
  state()
], WaAccordionItem.prototype, "isAnimating", 2);
__decorateClass([
  property()
], WaAccordionItem.prototype, "label", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaAccordionItem.prototype, "expanded", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaAccordionItem.prototype, "disabled", 2);
__decorateClass([
  property({ attribute: "heading-level", reflect: true })
], WaAccordionItem.prototype, "headingLevel", 2);
__decorateClass([
  property({ type: Boolean, attribute: false })
], WaAccordionItem.prototype, "isTabbable", 2);
__decorateClass([
  property({ attribute: "icon-placement", reflect: true })
], WaAccordionItem.prototype, "iconPlacement", 2);
__decorateClass([
  property({ reflect: true })
], WaAccordionItem.prototype, "appearance", 2);
__decorateClass([
  watch("expanded", { waitUntilFirstUpdate: true })
], WaAccordionItem.prototype, "handleExpandedChange", 1);
WaAccordionItem = __decorateClass([
  customElement("wa-accordion-item")
], WaAccordionItem);

export {
  WaAccordionItem
};
