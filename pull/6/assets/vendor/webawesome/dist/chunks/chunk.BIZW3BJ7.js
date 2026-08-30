/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  qr_code_styles_default
} from "./chunk.IQFC2JOL.js";
import {
  WebAwesomeElement
} from "./chunk.AOKMSJXD.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// src/components/qr-code/qr-code.ts
import { QrCreator } from "@konnorr/qr-creator";
import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
var WaQrCode = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.value = "";
    this.label = "";
    this.size = 128;
    this.fill = "";
    this.background = "";
    this.radius = 0;
    this.errorCorrection = "H";
    this.image = null;
    this.imageBackground = null;
    this.imageCoverage = null;
    this.imagePadding = null;
    this.computedStyle = null;
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    this.generate();
  }
  generate() {
    if (!this.hasUpdated) {
      return;
    }
    this.canvas.style.maxWidth = `${this.size}px`;
    this.canvas.style.maxHeight = `${this.size}px`;
    this.computedStyle || (this.computedStyle = getComputedStyle(this));
    const computedStyle = this.computedStyle;
    const span = this.shadowRoot?.querySelector("span");
    if (span) {
      this.spanComputedStyle || (this.spanComputedStyle = getComputedStyle(span));
    }
    QrCreator.render(
      {
        text: this.value,
        radius: this.radius,
        ecLevel: this.errorCorrection,
        // Use the deprecated `fill` attribute if set, otherwise use the current text color
        fill: this.fill || computedStyle.color,
        // Use the deprecated `background` attribute if set, otherwise use transparent (the host has the bg color now)
        background: this.background || null,
        // We draw the canvas larger and scale its container down to avoid blurring on high-density displays
        size: this.size * 2,
        image: this.image,
        imageEcCover: this.imageCoverage,
        imagePadding: this.imagePadding,
        imageBackground: this.imageBackground || this.background,
        // @ts-expect-error
        cornerFill: this.spanComputedStyle?.color
      },
      this.canvas
    );
  }
  render() {
    return html`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${this.label?.length > 0 ? this.label : this.value}
        style=${styleMap({
      maxWidth: `${this.size}px`,
      maxHeight: `${this.size}px`,
      minWidth: `${this.size}px`,
      minHeight: `${this.size}px`
    })}
        @transitionend=${(event) => {
      if (event.propertyName === "color") {
        this.generate();
      }
    }}
      >
        <span style="color: var(--corner-color);"></span>
      </canvas>
    `;
  }
};
WaQrCode.css = qr_code_styles_default;
__decorateClass([
  query("canvas")
], WaQrCode.prototype, "canvas", 2);
__decorateClass([
  property()
], WaQrCode.prototype, "value", 2);
__decorateClass([
  property()
], WaQrCode.prototype, "label", 2);
__decorateClass([
  property({ type: Number })
], WaQrCode.prototype, "size", 2);
__decorateClass([
  property()
], WaQrCode.prototype, "fill", 2);
__decorateClass([
  property()
], WaQrCode.prototype, "background", 2);
__decorateClass([
  property({ type: Number })
], WaQrCode.prototype, "radius", 2);
__decorateClass([
  property({ attribute: "error-correction" })
], WaQrCode.prototype, "errorCorrection", 2);
__decorateClass([
  property()
], WaQrCode.prototype, "image", 2);
__decorateClass([
  property({ attribute: "image-background" })
], WaQrCode.prototype, "imageBackground", 2);
__decorateClass([
  property({ attribute: "image-coverage", type: Number })
], WaQrCode.prototype, "imageCoverage", 2);
__decorateClass([
  property({ attribute: "image-padding", type: Number })
], WaQrCode.prototype, "imagePadding", 2);
WaQrCode = __decorateClass([
  customElement("wa-qr-code")
], WaQrCode);

export {
  WaQrCode
};
