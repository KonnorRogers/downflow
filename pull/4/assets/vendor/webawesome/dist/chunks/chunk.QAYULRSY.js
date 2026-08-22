/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaLazyChangeEvent
} from "./chunk.ZSEFTQAO.js";
import {
  WaLazyLoadEvent
} from "./chunk.26QE47KB.js";
import {
  WaExpandEvent
} from "./chunk.FYKN76UA.js";
import {
  WaCollapseEvent
} from "./chunk.U36KZLSQ.js";
import {
  WaAfterCollapseEvent
} from "./chunk.AG44H7MD.js";
import {
  WaAfterExpandEvent
} from "./chunk.Q6XMGFWJ.js";
import {
  tree_item_styles_default
} from "./chunk.VT2OVZ4B.js";
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
  __decorateClass
} from "./chunk.7VGCIHDG.js";

// src/components/tree-item/tree-item.ts
import { consume, createContext, provide } from "@lit/context";
import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import { when } from "lit/directives/when.js";
var treeItemContext = createContext("wa-tree-item");
var WaTreeItem = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.indeterminate = false;
    this.isLeaf = false;
    this.loading = false;
    this.selectable = false;
    this.expanded = false;
    this.selected = false;
    this.disabled = false;
    this.lazy = false;
    this._treeItemContext = { depth: 0, expanded: this.expanded };
    this._parentTreeContext = null;
    this.animationGeneration = 0;
    this.tabIndex = -1;
    this.role = "treeitem";
  }
  static isTreeItem(node) {
    const el = node;
    return el && (el.role === "treeitem" || el.getAttribute?.("role") === "treeitem");
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "treeitem");
    this.setAttribute("tabIndex", this.tabIndex.toString());
    if (this.isNestedItem()) {
      this.setAttribute("slot", "children");
      if (!this._parentTreeContext?.expanded) {
        this.expanded = false;
      }
    }
    if (this._parentTreeContext) {
      this._treeItemContext = { depth: this._parentTreeContext.depth + 1, expanded: this.expanded };
    }
    this.updateIndentation();
  }
  firstUpdated() {
    this.childrenContainer.hidden = !this.expanded;
    this.childrenContainer.style.height = this.expanded ? "auto" : "0";
    this.isLeaf = !this.lazy && this.getChildrenItems().length === 0;
    this.handleExpandedChange();
  }
  async animateCollapse(generation) {
    this.dispatchEvent(new WaCollapseEvent());
    const duration = parseDuration(getComputedStyle(this.childrenContainer).getPropertyValue("--hide-duration"));
    await animate(
      this.childrenContainer,
      [
        // We can't animate from 'auto', so use the scroll height for now
        { height: `${this.childrenContainer.scrollHeight}px`, opacity: "1", overflow: "hidden" },
        { height: "0", opacity: "0", overflow: "hidden" }
      ],
      { duration, easing: "cubic-bezier(0.4, 0.0, 0.2, 1)" }
    );
    if (this.animationGeneration !== generation) {
      return;
    }
    this.childrenContainer.hidden = true;
    this.dispatchEvent(new WaAfterCollapseEvent());
  }
  // Checks whether the item is nested into an item
  isNestedItem() {
    if (this._parentTreeContext !== null) {
      return true;
    }
    const parent = this.parentElement;
    return !!parent && WaTreeItem.isTreeItem(parent);
  }
  /** Counts the nesting depth and sets the private --indent property on the host for indentation. */
  updateIndentation() {
    const depth = Math.max(this._treeItemContext?.depth || 0, this.getDepth());
    this.setStyleProperty("--indent", `calc(${depth} * var(--indent-size, 2em))`);
  }
  getDepth() {
    let depth = 0;
    let node = this.parentElement;
    while (node) {
      if (WaTreeItem.isTreeItem(node)) {
        depth++;
      }
      node = node.parentElement;
    }
    return depth;
  }
  handleChildrenSlotChange() {
    this.loading = false;
    this.isLeaf = !this.lazy && this.getChildrenItems().length === 0;
  }
  willUpdate(changedProperties) {
    if (changedProperties.has("selected") && !changedProperties.has("indeterminate")) {
      this.indeterminate = false;
    }
    super.willUpdate(changedProperties);
  }
  async animateExpand(generation) {
    this.dispatchEvent(new WaExpandEvent());
    this.childrenContainer.hidden = false;
    const duration = parseDuration(getComputedStyle(this.childrenContainer).getPropertyValue("--show-duration"));
    await animate(
      this.childrenContainer,
      [
        { height: "0", opacity: "0", overflow: "hidden" },
        { height: `${this.childrenContainer.scrollHeight}px`, opacity: "1", overflow: "hidden" }
      ],
      {
        duration,
        easing: "cubic-bezier(0.4, 0.0, 0.2, 1)"
      }
    );
    if (this.animationGeneration !== generation) {
      return;
    }
    this.childrenContainer.style.height = "auto";
    this.dispatchEvent(new WaAfterExpandEvent());
  }
  handleLoadingChange() {
    this.setAttribute("aria-busy", this.loading ? "true" : "false");
    if (!this.loading) {
      this.animateExpand(this.animationGeneration);
    }
  }
  handleDisabledChange() {
    this.customStates.set("disabled", this.disabled);
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleExpandedState() {
    this.customStates.set("expanded", this.expanded);
  }
  handleIndeterminateStateChange() {
    this.customStates.set("indeterminate", this.indeterminate);
  }
  handleSelectedChange() {
    this.customStates.set("selected", this.selected);
    this.setAttribute("aria-selected", this.selected ? "true" : "false");
  }
  handleExpandedChange() {
    if (!this.isLeaf) {
      this.setAttribute("aria-expanded", this.expanded ? "true" : "false");
    } else {
      this.removeAttribute("aria-expanded");
    }
  }
  handleExpandAnimation() {
    this.animationGeneration++;
    const generation = this.animationGeneration;
    if (this.expanded) {
      if (this.lazy) {
        this.loading = true;
        this.dispatchEvent(new WaLazyLoadEvent());
      } else {
        this.animateExpand(generation);
      }
    } else {
      this.animateCollapse(generation);
    }
  }
  handleLazyChange() {
    this.dispatchEvent(new WaLazyChangeEvent());
  }
  /** Gets all the nested tree items in this node. */
  getChildrenItems({ includeDisabled = true } = {}) {
    return this.childrenSlot ? [...this.childrenSlot.assignedElements({ flatten: true })].filter(
      (item) => WaTreeItem.isTreeItem(item) && (includeDisabled || !item.disabled)
    ) : [];
  }
  render() {
    const isRtl = this.localize.dir() === "rtl";
    const showExpandButton = !this.loading && (!this.isLeaf || this.lazy);
    return html`
      <div
        part="base"
        class="${classMap({
      "tree-item": true,
      "tree-item-expanded": this.expanded,
      "tree-item-selected": this.selected,
      "tree-item-leaf": this.isLeaf,
      "tree-item-loading": this.loading,
      "tree-item-has-expand-button": showExpandButton
    })}"
      >
        <div class="item" part="item">
          <div class="indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${classMap({
      "expand-button": true,
      "expand-button-visible": showExpandButton
    })}
            aria-hidden="true"
          >
            <slot class="expand-icon-slot" name="expand-icon">
              ${when(
      this.loading,
      () => html` <wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner> `,
      () => html`
                  <wa-icon name=${isRtl ? "chevron-left" : "chevron-right"} library="system" variant="solid"></wa-icon>
                `
    )}
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <wa-icon name=${isRtl ? "chevron-left" : "chevron-right"} library="system" variant="solid"></wa-icon>
            </slot>
          </div>

          ${when(
      this.selectable,
      () => html`
              <wa-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="checkbox"
                ?disabled="${this.disabled}"
                ?checked="${live(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></wa-checkbox>
            `
    )}

          <slot class="label" part="label"></slot>
        </div>

        <div class="children" part="children" role="group" ?hidden=${!this.expanded && !this.isConnected}>
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `;
  }
};
WaTreeItem.css = tree_item_styles_default;
__decorateClass([
  state()
], WaTreeItem.prototype, "indeterminate", 2);
__decorateClass([
  state()
], WaTreeItem.prototype, "isLeaf", 2);
__decorateClass([
  state()
], WaTreeItem.prototype, "loading", 2);
__decorateClass([
  state()
], WaTreeItem.prototype, "selectable", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaTreeItem.prototype, "expanded", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaTreeItem.prototype, "selected", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaTreeItem.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], WaTreeItem.prototype, "lazy", 2);
__decorateClass([
  provide({ context: treeItemContext })
], WaTreeItem.prototype, "_treeItemContext", 2);
__decorateClass([
  consume({ context: treeItemContext, subscribe: false })
], WaTreeItem.prototype, "_parentTreeContext", 2);
__decorateClass([
  query("slot:not([name])")
], WaTreeItem.prototype, "defaultSlot", 2);
__decorateClass([
  query("slot[name=children]")
], WaTreeItem.prototype, "childrenSlot", 2);
__decorateClass([
  query(".item")
], WaTreeItem.prototype, "itemElement", 2);
__decorateClass([
  query(".children")
], WaTreeItem.prototype, "childrenContainer", 2);
__decorateClass([
  query(".expand-button slot")
], WaTreeItem.prototype, "expandButtonSlot", 2);
__decorateClass([
  property({ reflect: true, type: Number, attribute: "tabindex" })
], WaTreeItem.prototype, "tabIndex", 2);
__decorateClass([
  property({ reflect: true })
], WaTreeItem.prototype, "role", 2);
__decorateClass([
  watch("loading", { waitUntilFirstUpdate: true })
], WaTreeItem.prototype, "handleLoadingChange", 1);
__decorateClass([
  watch("disabled")
], WaTreeItem.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("expanded")
], WaTreeItem.prototype, "handleExpandedState", 1);
__decorateClass([
  watch("indeterminate")
], WaTreeItem.prototype, "handleIndeterminateStateChange", 1);
__decorateClass([
  watch("selected")
], WaTreeItem.prototype, "handleSelectedChange", 1);
__decorateClass([
  watch("expanded", { waitUntilFirstUpdate: true })
], WaTreeItem.prototype, "handleExpandedChange", 1);
__decorateClass([
  watch("expanded", { waitUntilFirstUpdate: true })
], WaTreeItem.prototype, "handleExpandAnimation", 1);
__decorateClass([
  watch("lazy", { waitUntilFirstUpdate: true })
], WaTreeItem.prototype, "handleLazyChange", 1);
WaTreeItem = __decorateClass([
  customElement("wa-tree-item")
], WaTreeItem);
WaTreeItem.disableWarning?.("change-in-update");

export {
  treeItemContext,
  WaTreeItem
};
