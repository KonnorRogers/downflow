/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  textarea_styles_default
} from "./chunk.WRLWYRIB.js";
import {
  visually_hidden_styles_default
} from "./chunk.2ZAJEMB4.js";
import {
  form_control_styles_default
} from "./chunk.5LXXXELE.js";
import {
  MirrorValidator
} from "./chunk.R7QX4M6R.js";
import {
  WebAwesomeFormAssociatedElement
} from "./chunk.KBXNFZQL.js";
import {
  warnDeprecatedSize
} from "./chunk.RPQJAXXR.js";
import {
  HasSlotController
} from "./chunk.RWNXKUCF.js";
import {
  size_styles_default
} from "./chunk.G5ZZIGWB.js";
import {
  watch
} from "./chunk.PZAN6FPN.js";
import {
  LocalizeController
} from "./chunk.CDGKIW7Y.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// src/components/textarea/textarea.ts
import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
var WaTextarea = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.assumeInteractionOn = ["blur", "input"];
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.localize = new LocalizeController(this);
    this.announcedCountText = "";
    this.title = "";
    this.name = null;
    this._value = null;
    this.defaultValue = this.getAttribute("value") ?? "";
    this.size = "m";
    this.appearance = "outlined";
    this.label = "";
    this.hint = "";
    this.placeholder = "";
    this.rows = 4;
    this.resize = "vertical";
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.spellcheck = true;
    this.withLabel = false;
    this.withHint = false;
    this.withCount = false;
    this.lastObservedWidth = 0;
  }
  static get validators() {
    return [...super.validators, MirrorValidator()];
  }
  /** The current value of the input, submitted as a name/value pair with form data. */
  get value() {
    if (this.valueHasChanged) {
      return this._value;
    }
    return this._value ?? this.defaultValue;
  }
  set value(val) {
    if (this._value === val) {
      return;
    }
    this.valueHasChanged = true;
    this._value = val;
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this.setTextareaDimensions();
      this.updateResizeObserver();
      if (this.didSSR && this.input && this.value !== this.input.value) {
        const value = this.input.value;
        this.value = value;
      }
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.countAnnounceTimeout);
    this.resizeObserver?.disconnect();
    this.resizeObserver = void 0;
  }
  /**
   * @internal
   */
  updateFormValue(value) {
    if (value == null) {
      this.setValue("", null);
      return;
    }
    super.updateFormValue(value);
  }
  /** Creates or destroys the resize observer based on the current resize mode. */
  updateResizeObserver() {
    const needsObserver = this.resize !== "none";
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = void 0;
    }
    if (needsObserver && this.input) {
      if (this.resize === "auto") {
        this.resizeObserver = new ResizeObserver((entries) => {
          const width = entries[0]?.contentRect.width ?? 0;
          if (width !== this.lastObservedWidth) {
            this.lastObservedWidth = width;
            requestAnimationFrame(() => this.setTextareaDimensions());
          }
        });
        this.resizeObserver.observe(this);
      } else {
        this.resizeObserver = new ResizeObserver(() => this.setTextareaDimensions());
        this.resizeObserver.observe(this.input);
      }
    }
  }
  handleBlur() {
    this.checkValidity();
  }
  handleChange(event) {
    this.valueHasChanged = true;
    this.value = this.input.value;
    this.setTextareaDimensions();
    this.checkValidity();
    this.relayNativeEvent(event, { bubbles: true, composed: true });
  }
  handleInput(event) {
    this.valueHasChanged = true;
    this.value = this.input.value;
    this.relayNativeEvent(event, { bubbles: true, composed: true });
    this.scheduleCountAnnouncement();
  }
  scheduleCountAnnouncement() {
    clearTimeout(this.countAnnounceTimeout);
    this.countAnnounceTimeout = setTimeout(() => {
      const currentLength = (this.value ?? "").length;
      this.announcedCountText = this.maxlength != null ? this.localize.term("numCharactersRemaining", this.maxlength - currentLength) : this.localize.term("numCharacters", currentLength);
    }, 1e3);
  }
  setTextareaDimensions() {
    if (this.resize === "none") {
      this.base.style.width = ``;
      this.base.style.height = ``;
      return;
    }
    if (this.resize === "auto") {
      this.sizeAdjuster.style.height = `${this.input.clientHeight}px`;
      this.input.style.height = "auto";
      const newHeight = this.input.scrollHeight;
      this.input.style.height = `${newHeight}px`;
      this.sizeAdjuster.style.height = `${newHeight}px`;
      this.base.style.width = ``;
      this.base.style.height = ``;
      return;
    }
    if (this.input.style.width) {
      const width = Number(this.input.style.width.split(/px/)[0]) + 2;
      this.base.style.width = `${width}px`;
    }
    if (this.input.style.height) {
      const height = Number(this.input.style.height.split(/px/)[0]) + 2;
      this.base.style.height = `${height}px`;
    }
  }
  handleRowsChange() {
    this.setTextareaDimensions();
  }
  async handleValueChange() {
    await this.updateComplete;
    this.checkValidity();
    this.setTextareaDimensions();
  }
  updated(changedProperties) {
    if (changedProperties.has("resize")) {
      this.setTextareaDimensions();
      this.updateResizeObserver();
    }
    super.updated(changedProperties);
    if (changedProperties.has("value")) {
      this.customStates.set("blank", !this.value);
    }
  }
  /** Sets focus on the textarea. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the textarea. */
  blur() {
    this.input.blur();
  }
  /** Selects all the text in the textarea. */
  select() {
    this.input.select();
  }
  /** Gets or sets the textarea's scroll position. */
  scrollPosition(position) {
    if (position) {
      if (typeof position.top === "number") this.input.scrollTop = position.top;
      if (typeof position.left === "number") this.input.scrollLeft = position.left;
      return void 0;
    }
    return {
      top: this.input.scrollTop,
      left: this.input.scrollTop
    };
  }
  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  /** Replaces a range of text with a new string. */
  setRangeText(replacement, start, end, selectMode = "preserve") {
    const selectionStart = start ?? this.input.selectionStart;
    const selectionEnd = end ?? this.input.selectionEnd;
    this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.setTextareaDimensions();
    }
  }
  formResetCallback() {
    this._value = null;
    if (this.input) {
      this.input.value = this.value || "";
    }
    super.formResetCallback();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label", "withLabel");
    const hasHintSlot = this.hasSlotController.test("hint", "withHint");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    const currentLength = (this.value ?? "").length;
    const countText = this.maxlength != null ? this.localize.term("numCharactersRemaining", this.maxlength - currentLength) : this.localize.term("numCharacters", currentLength);
    return html`
      <label
        part="form-control-label label"
        class=${classMap({
      label: true,
      "has-label": hasLabel
    })}
        for="input"
        aria-hidden=${hasLabel ? "false" : "true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="textarea">
        <textarea
          part="textarea"
          id="input"
          class="control"
          title=${this.title}
          name=${ifDefined(this.name)}
          .value=${live(this.value)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${ifDefined(this.placeholder)}
          rows=${ifDefined(this.rows)}
          minlength=${ifDefined(this.minlength)}
          maxlength=${ifDefined(this.maxlength)}
          autocapitalize=${ifDefined(this.autocapitalize)}
          autocorrect=${ifDefined(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${ifDefined(this.spellcheck)}
          enterkeyhint=${ifDefined(this.enterkeyhint)}
          inputmode=${ifDefined(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        ></textarea>

        <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
        <div part="textarea-adjuster" class="size-adjuster" ?hidden=${this.resize !== "auto"}></div>
      </div>

      <div
        class=${classMap({
      footer: true,
      "has-count": this.withCount
    })}
      >
        <slot
          id="hint"
          name="hint"
          part="hint"
          aria-hidden=${hasHint ? "false" : "true"}
          class=${classMap({
      "has-slotted": hasHint
    })}
          >${this.hint}</slot
        >

        ${this.withCount ? html`
              <div part="count" class="count" aria-hidden="true">${countText}</div>
              <div class="wa-visually-hidden-force" aria-live="polite">${this.announcedCountText}</div>
            ` : ""}
      </div>
    `;
  }
};
WaTextarea.css = [textarea_styles_default, form_control_styles_default, size_styles_default, visually_hidden_styles_default];
__decorateClass([
  state()
], WaTextarea.prototype, "announcedCountText", 2);
__decorateClass([
  query(".control")
], WaTextarea.prototype, "input", 2);
__decorateClass([
  query('[part~="base"]')
], WaTextarea.prototype, "base", 2);
__decorateClass([
  query(".size-adjuster")
], WaTextarea.prototype, "sizeAdjuster", 2);
__decorateClass([
  property()
], WaTextarea.prototype, "title", 2);
__decorateClass([
  property({ reflect: true })
], WaTextarea.prototype, "name", 2);
__decorateClass([
  state()
], WaTextarea.prototype, "value", 1);
__decorateClass([
  property({ attribute: "value", reflect: true })
], WaTextarea.prototype, "defaultValue", 2);
__decorateClass([
  property({ reflect: true })
], WaTextarea.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaTextarea.prototype, "handleSizeChange", 1);
__decorateClass([
  property({ reflect: true })
], WaTextarea.prototype, "appearance", 2);
__decorateClass([
  property()
], WaTextarea.prototype, "label", 2);
__decorateClass([
  property({ attribute: "hint" })
], WaTextarea.prototype, "hint", 2);
__decorateClass([
  property()
], WaTextarea.prototype, "placeholder", 2);
__decorateClass([
  property({ type: Number })
], WaTextarea.prototype, "rows", 2);
__decorateClass([
  property({ reflect: true })
], WaTextarea.prototype, "resize", 2);
__decorateClass([
  property({ type: Boolean })
], WaTextarea.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaTextarea.prototype, "readonly", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaTextarea.prototype, "required", 2);
__decorateClass([
  property({ type: Number })
], WaTextarea.prototype, "minlength", 2);
__decorateClass([
  property({ type: Number })
], WaTextarea.prototype, "maxlength", 2);
__decorateClass([
  property()
], WaTextarea.prototype, "autocapitalize", 2);
__decorateClass([
  property({
    type: Boolean,
    converter: {
      fromAttribute: (value) => !value || value === "off" ? false : true,
      toAttribute: (value) => value ? "on" : "off"
    }
  })
], WaTextarea.prototype, "autocorrect", 2);
__decorateClass([
  property()
], WaTextarea.prototype, "autocomplete", 2);
__decorateClass([
  property({ type: Boolean })
], WaTextarea.prototype, "autofocus", 2);
__decorateClass([
  property()
], WaTextarea.prototype, "enterkeyhint", 2);
__decorateClass([
  property({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], WaTextarea.prototype, "spellcheck", 2);
__decorateClass([
  property()
], WaTextarea.prototype, "inputmode", 2);
__decorateClass([
  property({ attribute: "with-label", type: Boolean })
], WaTextarea.prototype, "withLabel", 2);
__decorateClass([
  property({ attribute: "with-hint", type: Boolean })
], WaTextarea.prototype, "withHint", 2);
__decorateClass([
  property({ attribute: "with-count", type: Boolean, reflect: true })
], WaTextarea.prototype, "withCount", 2);
__decorateClass([
  watch("rows", { waitUntilFirstUpdate: true })
], WaTextarea.prototype, "handleRowsChange", 1);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], WaTextarea.prototype, "handleValueChange", 1);
WaTextarea = __decorateClass([
  customElement("wa-textarea")
], WaTextarea);
WaTextarea.disableWarning?.("change-in-update");

export {
  WaTextarea
};
