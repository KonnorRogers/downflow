import "../css/index.css"
import { DriveShaft } from "driveshaft";
import { Application, Controller } from "downflow";
import { ScrollSpyController } from "./scroll_spy_controller.js";
// pagefind
import '@pagefind/component-ui';
const driveShaft = new DriveShaft()
driveShaft.start();
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
  return root.querySelector("wa-page").shadowRoot.querySelector("[part~='menu']")
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
  const currentPage = document.querySelector("wa-page")

  updateMenu()
  customElements.whenDefined("wa-page").then(() => {
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
})

setTimeout(() => document.documentElement.classList.add("js-loaded"), 50);

const els = new Set()
const tags = new Set()
document.querySelectorAll("*").forEach((el) => {
  if (el.localName.startsWith("wa-")) {
    els.add(el)
    tags.add(el.localName)
  }
})

const withTimeout = (promise, ms = 100) =>
  Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms))]);

;(async () => {
  await Promise.allSettled([...tags].map((tag) => withTimeout(customElements.whenDefined(tag))));
  await Promise.allSettled([...els].map((el) => withTimeout(el.updateComplete)));

  document.querySelector("main").classList.remove("wa-cloak")
})();
