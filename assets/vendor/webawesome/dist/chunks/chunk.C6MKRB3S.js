/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  callout_styles_default
} from "./chunk.LCEGCF5S.js";
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
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// src/components/callout/callout.ts
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
var WaCallout = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.variant = "brand";
    this.size = "m";
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  render() {
    return html`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `;
  }
};
WaCallout.css = [callout_styles_default, variants_styles_default, size_styles_default];
__decorateClass([
  property({ reflect: true })
], WaCallout.prototype, "variant", 2);
__decorateClass([
  property({ reflect: true })
], WaCallout.prototype, "appearance", 2);
__decorateClass([
  property({ reflect: true })
], WaCallout.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaCallout.prototype, "handleSizeChange", 1);
WaCallout = __decorateClass([
  customElement("wa-callout")
], WaCallout);

export {
  WaCallout
};
