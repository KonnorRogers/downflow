/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  card_styles_default
} from "./chunk.ATI2KDM5.js";
import {
  HasSlotController
} from "./chunk.RWNXKUCF.js";
import {
  size_styles_default
} from "./chunk.G5ZZIGWB.js";
import {
  WebAwesomeElement
} from "./chunk.AOKMSJXD.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// src/components/card/card.ts
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
var WaCard = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(
      this,
      "footer",
      "header",
      "media",
      "header-actions",
      "footer-actions",
      "actions"
    );
    this.appearance = "outlined";
    this.withHeader = false;
    this.withMedia = false;
    this.withFooter = false;
    this.withHeaderActions = false;
    this.withFooterActions = false;
    this.orientation = "vertical";
  }
  willUpdate(changedProperties) {
    this.withHeader = this.hasSlotController.test("header", "withHeader");
    this.withMedia = this.hasSlotController.test("media", "withMedia");
    this.withFooter = this.hasSlotController.test("footer", "withFooter");
    super.willUpdate(changedProperties);
  }
  render() {
    if (this.orientation === "horizontal") {
      return html`
        <slot name="media" part="media" class="media"></slot>
        <div part="body" class="body"><slot></slot></div>
        <slot name="actions" part="actions" class="actions"></slot>
      `;
    }
    const hasHeaderActions = this.hasSlotController.test("header-actions", "withHeaderActions");
    const hasFooterActions = this.hasSlotController.test("footer-actions", "withFooterActions");
    return html`
      <slot name="media" part="media" class="media"></slot>

      <header
        part="header"
        class=${classMap({
      header: true,
      "has-actions": hasHeaderActions
    })}
      >
        <slot name="header"></slot>
        <slot name="header-actions"></slot>
      </header>

      <div part="body" class="body"><slot></slot></div>

      <footer
        part="footer"
        class=${classMap({
      footer: true,
      "has-actions": hasFooterActions
    })}
      >
        <slot name="footer"></slot>
        <slot name="footer-actions"></slot>
      </footer>
    `;
  }
};
WaCard.css = [size_styles_default, card_styles_default];
__decorateClass([
  property({ reflect: true })
], WaCard.prototype, "appearance", 2);
__decorateClass([
  property({ attribute: "with-header", type: Boolean, reflect: true })
], WaCard.prototype, "withHeader", 2);
__decorateClass([
  property({ attribute: "with-media", type: Boolean, reflect: true })
], WaCard.prototype, "withMedia", 2);
__decorateClass([
  property({ attribute: "with-footer", type: Boolean, reflect: true })
], WaCard.prototype, "withFooter", 2);
__decorateClass([
  property({ attribute: "with-header-actions", type: Boolean, reflect: true })
], WaCard.prototype, "withHeaderActions", 2);
__decorateClass([
  property({ attribute: "with-footer-actions", type: Boolean, reflect: true })
], WaCard.prototype, "withFooterActions", 2);
__decorateClass([
  property({ reflect: true })
], WaCard.prototype, "orientation", 2);
WaCard = __decorateClass([
  customElement("wa-card")
], WaCard);
WaCard.disableWarning?.("change-in-update");

export {
  WaCard
};
