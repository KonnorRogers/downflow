/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaRemoveEvent
} from "./chunk.HPULLNVR.js";
import {
  tag_styles_default
} from "./chunk.4AHPL3WP.js";
import {
  warnDeprecatedSize
} from "./chunk.RPQJAXXR.js";
import {
  size_styles_default
} from "./chunk.G5ZZIGWB.js";
import {
  variants_styles_default
} from "./chunk.XNTP7DEQ.js";
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
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// src/components/tag/tag.ts
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
var WaTag = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.variant = "neutral";
    this.appearance = "filled-outlined";
    this.size = "m";
    this.pill = false;
    this.withRemove = false;
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  handleRemoveClick() {
    this.dispatchEvent(new WaRemoveEvent());
  }
  render() {
    return html`
      <slot part="content" class="content"></slot>

      ${this.withRemove ? html`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          ` : ""}
    `;
  }
};
WaTag.css = [tag_styles_default, variants_styles_default, size_styles_default];
__decorateClass([
  property({ reflect: true })
], WaTag.prototype, "variant", 2);
__decorateClass([
  property({ reflect: true })
], WaTag.prototype, "appearance", 2);
__decorateClass([
  property({ reflect: true })
], WaTag.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaTag.prototype, "handleSizeChange", 1);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaTag.prototype, "pill", 2);
__decorateClass([
  property({ attribute: "with-remove", type: Boolean })
], WaTag.prototype, "withRemove", 2);
WaTag = __decorateClass([
  customElement("wa-tag")
], WaTag);

export {
  WaTag
};
