import "../css/index.css";

import { Application, Controller } from "downflow";
import { ScrollSpyController } from "./scroll_spy_controller.js";

// Always first.
import '@lit-labs/ssr-client/lit-element-hydrate-support.js';

// Web Awesome components
// import "@awesome.me/webawesome/dist/components/accordion-item/accordion-item.js";
// import "@awesome.me/webawesome/dist/components/accordion/accordion.js";
// import "@awesome.me/webawesome/dist/components/animated-image/animated-image.js";
// import "@awesome.me/webawesome/dist/components/animation/animation.js";
// import "@awesome.me/webawesome/dist/components/avatar/avatar.js";
// import "@awesome.me/webawesome/dist/components/badge/badge.js";
// import "@awesome.me/webawesome/dist/components/breadcrumb-item/breadcrumb-item.js";
// import "@awesome.me/webawesome/dist/components/breadcrumb/breadcrumb.js";
// import "@awesome.me/webawesome/dist/components/button-group/button-group.js";
import "@awesome.me/webawesome/dist/components/button/button.js";
import "@awesome.me/webawesome/dist/components/callout/callout.js";
import "@awesome.me/webawesome/dist/components/card/card.js";
// import "@awesome.me/webawesome/dist/components/carousel-item/carousel-item.js";
// import "@awesome.me/webawesome/dist/components/carousel/carousel.js";
// import "@awesome.me/webawesome/dist/components/checkbox-group/checkbox-group.js";
import "@awesome.me/webawesome/dist/components/checkbox/checkbox.js";
// import "@awesome.me/webawesome/dist/components/color-picker/color-picker.js";
// import "@awesome.me/webawesome/dist/components/comparison/comparison.js";
import "@awesome.me/webawesome/dist/components/copy-button/copy-button.js";
import "@awesome.me/webawesome/dist/components/details/details.js";
import "@awesome.me/webawesome/dist/components/dialog/dialog.js";
import "@awesome.me/webawesome/dist/components/divider/divider.js";
import "@awesome.me/webawesome/dist/components/drawer/drawer.js";
import "@awesome.me/webawesome/dist/components/dropdown-item/dropdown-item.js";
import "@awesome.me/webawesome/dist/components/dropdown/dropdown.js";
// import "@awesome.me/webawesome/dist/components/format-bytes/format-bytes.js";
// import "@awesome.me/webawesome/dist/components/format-date/format-date.js";
import "@awesome.me/webawesome/dist/components/format-number/format-number.js";
import "@awesome.me/webawesome/dist/components/icon/icon.js";
import "@awesome.me/webawesome/dist/components/include/include.js";
import "@awesome.me/webawesome/dist/components/input/input.js";
// import "@awesome.me/webawesome/dist/components/intersection-observer/intersection-observer.js";
// import "@awesome.me/webawesome/dist/components/known-date/known-date.js";
// import "@awesome.me/webawesome/dist/components/markdown/markdown.js";
// import "@awesome.me/webawesome/dist/components/mutation-observer/mutation-observer.js";
import "@awesome.me/webawesome/dist/components/number-input/number-input.js";
import "@awesome.me/webawesome/dist/components/option/option.js";
import "@awesome.me/webawesome/dist/components/page/page.js";
import "@awesome.me/webawesome/dist/components/popover/popover.js";
import "@awesome.me/webawesome/dist/components/popup/popup.js";
// import "@awesome.me/webawesome/dist/components/progress-bar/progress-bar.js";
// import "@awesome.me/webawesome/dist/components/progress-ring/progress-ring.js";
// import "@awesome.me/webawesome/dist/components/qr-code/qr-code.js";
import "@awesome.me/webawesome/dist/components/radio-group/radio-group.js";
import "@awesome.me/webawesome/dist/components/radio/radio.js";
// import "@awesome.me/webawesome/dist/components/random-content/random-content.js";
// import "@awesome.me/webawesome/dist/components/rating/rating.js";
// import "@awesome.me/webawesome/dist/components/relative-time/relative-time.js";
// import "@awesome.me/webawesome/dist/components/resize-observer/resize-observer.js";
// import "@awesome.me/webawesome/dist/components/scroller/scroller.js";
// import "@awesome.me/webawesome/dist/components/select/select.js";
// import "@awesome.me/webawesome/dist/components/skeleton/skeleton.js";
// import "@awesome.me/webawesome/dist/components/slider/slider.js";
// import "@awesome.me/webawesome/dist/components/spinner/spinner.js";
// import "@awesome.me/webawesome/dist/components/split-panel/split-panel.js";
import "@awesome.me/webawesome/dist/components/switch/switch.js";
import "@awesome.me/webawesome/dist/components/tab-group/tab-group.js";
import "@awesome.me/webawesome/dist/components/tab-panel/tab-panel.js";
import "@awesome.me/webawesome/dist/components/tab/tab.js";
import "@awesome.me/webawesome/dist/components/tag/tag.js";
// import "@awesome.me/webawesome/dist/components/textarea/textarea.js";
// import "@awesome.me/webawesome/dist/components/time-input/time-input.js";
import "@awesome.me/webawesome/dist/components/tooltip/tooltip.js";
// import "@awesome.me/webawesome/dist/components/tree-item/tree-item.js";
// import "@awesome.me/webawesome/dist/components/tree/tree.js";
import "@awesome.me/webawesome/dist/components/zoomable-frame/zoomable-frame.js";

// pagefind
import '@pagefind/component-ui';
// import { DriveShaft } from "driveshaft";
// const driveShaft = new DriveShaft()
// driveShaft.start();
const application = new Application()

application.context = window?.application?.context
window.application = application
application.start()


class QuickSearchButton extends HTMLElement {
  constructor() {
    super()
    const instance = window.PagefindComponents.getInstanceManager().getInstance('default');
    instance.registerUtility(this, 'modal-trigger');
    this.addEventListener('click', () => instance.getUtilities('modal')[0]?.open());
  }
  handleModalClose() { this.buttonEl?.focus(); }
}

customElements.define('quick-search-button', QuickSearchButton);

class ColorSwitcherController extends Controller {
  static controllerName = "color-switcher"

  connectedCallback () {
    document.addEventListener("keydown", this.handleShortcut)
  }

  disconnectedCallback () {
    document.removeEventListener("keydown", this.handleShortcut)
  }

  handleShortcut = (event) => {
    if (
      event.key === '\\' &&
      !event.composedPath().some(el => {
        return (
          ['input', 'textarea'].includes(el?.tagName?.toLowerCase()) ||
          el.hasAttribute?.("contenteditable") ||
          el.getAttribute?.("role") === "textbox"
        )
      })
    ) {
      event.preventDefault();
      window.application.context.color.toggleMode()
    }
  }
}

application.register(ColorSwitcherController)
application.register(ScrollSpyController)

function getMenu(root = document) {
  return root?.querySelector("wa-page")?.shadowRoot?.querySelector("[part~='menu']")
}

function updateMenu(root = document) {
  const menu = getMenu(root)
  if (!menu) { return }
  let scrollPosition = sessionStorage.getItem(menuKey)

  if (scrollPosition) {
    scrollPosition = JSON.parse(scrollPosition)
    menu.scrollTop = scrollPosition.scrollTop
    menu.scrollLeft = scrollPosition.scrollLeft
  }
}

function updatePage (body) {
  const currentPage = document.querySelector("wa-page")
  const newPage = body.querySelector("wa-page")

  if (currentPage && newPage) {
    driveShaft.replacer.syncAttributes(currentPage, newPage)
  }
  newPage.view = "desktop"
}


const menuKey = "scroll:menu"
function storeScrollPosition (e) {
  const menu = getMenu()
  if (!menu) { return }

  const scrollPosition = {
    scrollTop: menu.scrollTop,
    scrollLeft: menu.scrollLeft
  }
  sessionStorage.setItem(menuKey, JSON.stringify(scrollPosition))
}


;["navigate", "pagehide", "driveshaft:navigation-start"].forEach((eventName) => {
  window.addEventListener(eventName, storeScrollPosition)
})

function handleBodySwap (e) {
  const newBody = e.newBody

  // close any modals
  document.querySelectorAll("dialog.pf-modal[open]").forEach((d) => d.close());
  const instanceManager = window.PagefindComponents?.getInstanceManager?.()

  if (instanceManager) {
    // clear all instances
    // https://github.com/Pagefind/pagefind/issues/1273
    // if not...it'll be unresponsive.
    instanceManager.instances.clear();
  }

  document.documentElement.classList.remove("js-loaded");

  updateMenu(newBody)
  updatePage(newBody)

  const { light, dark, mode } = application.context.color
  application.reconcile()
}

document.addEventListener("driveshaft:before-replace", handleBodySwap)

function restoreScrollPosition (e) {
  updateMenu()
  customElements.whenDefined("wa-page").then(() => {
    const currentPage = document.querySelector("wa-page")
    if (!currentPage) { return }
    currentPage.updateComplete.then(() => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          updateMenu()
          document.documentElement.classList.add("js-loaded");
        })
      }, 50)
    })
  })
}

;["pageshow", "DOMContentLoaded", "driveshaft:after-replace"].forEach((eventName) => {
  window.addEventListener(eventName, restoreScrollPosition)
  // removeCloak()
})

setTimeout(() => document.documentElement.classList.add("js-loaded"), 50);

// function withTimeout (promise, ms = 100) {
//   return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms))]);
// }
// async function removeCloak () {
//   const els = new Set()
//   const tags = new Set()
//   document.querySelectorAll("*").forEach((el) => {
//     if (el.localName.startsWith("wa-")) {
//       els.add(el)
//       tags.add(el.localName)
//     }
//   })

//   await Promise.allSettled([...tags].map((tag) => withTimeout(customElements.whenDefined(tag))));
//   await Promise.allSettled([...els].map((el) => withTimeout(el.updateComplete)));
//   document.querySelector("main")?.classList?.remove?.("wa-cloak")
// }

// removeCloak()
