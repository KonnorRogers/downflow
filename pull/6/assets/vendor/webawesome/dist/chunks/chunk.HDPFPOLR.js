/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  markdown_styles_default
} from "./chunk.SJQAU36I.js";
import {
  WebAwesomeElement
} from "./chunk.AOKMSJXD.js";
import {
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// src/components/markdown/markdown.ts
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Marked } from "marked";
var sharedMarked = new Marked();
var connectedInstances = /* @__PURE__ */ new Set();
var WaMarkdown = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.renderGeneration = 0;
    this.suppressSlotChange = false;
    this.tabSize = 4;
  }
  /** Returns the shared Marked instance used by all `<wa-markdown>` components. */
  static getMarked() {
    return sharedMarked;
  }
  /** Re-renders all connected `<wa-markdown>` instances. Call this after changing the Marked configuration. */
  static updateAll() {
    for (const instance of connectedInstances) {
      instance.renderMarkdown();
    }
  }
  /** A reference to the shared Marked instance for convenience. Equivalent to `WaMarkdown.getMarked()`. */
  get marked() {
    return sharedMarked;
  }
  connectedCallback() {
    super.connectedCallback();
    connectedInstances.add(this);
  }
  disconnectedCallback() {
    connectedInstances.delete(this);
    super.disconnectedCallback();
  }
  /**
   * Normalizes whitespace in the given text by converting leading tabs to spaces, trimming leading/trailing blank
   * lines, and removing the common indentation prefix from all lines.
   */
  dedent(text) {
    const normalized = text.replace(/\r\n/g, "\n");
    const lines = normalized.split("\n").map((line) => {
      let expanded = "";
      let column = 0;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === "	") {
          const spacesToNextStop = this.tabSize - column % this.tabSize;
          expanded += " ".repeat(spacesToNextStop);
          column += spacesToNextStop;
        } else if (char === " ") {
          expanded += " ";
          column++;
        } else {
          expanded += line.slice(i);
          break;
        }
      }
      return expanded;
    });
    let start = 0;
    while (start < lines.length && lines[start].trim() === "") {
      start++;
    }
    let end = lines.length - 1;
    while (end >= start && lines[end].trim() === "") {
      end--;
    }
    const trimmedLines = lines.slice(start, end + 1);
    if (trimmedLines.length === 0) {
      return "";
    }
    let minIndent = Infinity;
    for (const line of trimmedLines) {
      if (line.trim() === "") continue;
      const match = line.match(/^( *)/);
      const leadingSpaces = match ? match[1].length : 0;
      minIndent = Math.min(minIndent, leadingSpaces);
    }
    if (minIndent === Infinity) {
      minIndent = 0;
    }
    const dedentedLines = trimmedLines.map((line) => {
      if (line.trim() === "") return "";
      return line.slice(minIndent);
    });
    return dedentedLines.join("\n");
  }
  /** Finds the `<script type="text/markdown">` source element inside this component. */
  getSourceScript() {
    return this.querySelector('script[type="text/markdown"]');
  }
  /** Reads the script content, normalizes whitespace, parses markdown, and injects the result. */
  renderMarkdown() {
    const script = this.getSourceScript();
    if (!script) {
      console.warn(
        'No <script type="text/markdown"> found. Provide markdown content inside a <script type="text/markdown"> element.',
        this
      );
      return;
    }
    const generation = ++this.renderGeneration;
    const raw = script.textContent ?? "";
    const dedented = this.dedent(raw);
    let result;
    try {
      result = sharedMarked.parse(dedented);
    } catch (error) {
      console.error("Failed to parse markdown content.", error, this);
      return;
    }
    const inject = (renderedHtml) => {
      if (generation !== this.renderGeneration) return;
      this.suppressSlotChange = true;
      for (const child of [...this.childNodes]) {
        if (child !== script) {
          child.remove();
        }
      }
      const fragment = document.createRange().createContextualFragment(renderedHtml);
      this.appendChild(fragment);
      queueMicrotask(() => {
        this.suppressSlotChange = false;
      });
    };
    if (typeof result === "string") {
      inject(result);
    } else {
      result.then(inject).catch((error) => {
        console.error("Failed to parse markdown content.", error, this);
      });
    }
  }
  handleSlotChange() {
    if (this.suppressSlotChange) return;
    if (this.didSSR && !this.hasUpdated) {
      return;
    }
    this.renderMarkdown();
  }
  render() {
    return html`<slot @slotchange=${this.handleSlotChange}></slot>`;
  }
};
WaMarkdown.css = markdown_styles_default;
__decorateClass([
  property({ type: Number, attribute: "tab-size" })
], WaMarkdown.prototype, "tabSize", 2);
WaMarkdown = __decorateClass([
  customElement("wa-markdown")
], WaMarkdown);

export {
  WaMarkdown
};
