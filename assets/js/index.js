// import { DriveShaft } from "driveshaft";
import { Application, Controller } from "downflow";
import { ScrollSpyController } from "./scroll_spy_controller.js";
// pagefind
import "/assets/vendor/pagefind/ui/npm_dist/mjs/component-ui.mjs";
// const driveShaft = new DriveShaft()
// driveShaft.start();
const application = new Application()
application.context = window?.application?.context || {};
window.application = application
application.start()

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
  console.log({scrollPosition})

  if (scrollPosition) {
    scrollPosition = JSON.parse(scrollPosition)
    console.log({scrollPosition})
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
  console.log("storing scroll position")
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
  currentPage.updateComplete.then(() => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        updateMenu()
        document.documentElement.classList.add("js-loaded");
      })
    }, 50)
  })
}

;["pageshow", "DOMContentLoaded", "driveshaft:after-replace"].forEach((eventName) => {
  window.addEventListener(eventName, restoreScrollPosition)
})

setTimeout(() => document.documentElement.classList.add("js-loaded"), 50);
