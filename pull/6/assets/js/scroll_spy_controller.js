import { Controller } from "downflow"

export class ScrollSpyController extends Controller {
  static controllerName = "scroll-spy"

  connectedCallback () {
    // Pair each TOC link with the heading it points to, in document order.
    this.entries = this.links.flatMap((link) => {
      const id = decodeURIComponent(link.hash.slice(1))
      const heading = id && document.getElementById(id)
      return heading ? [{ link, heading }] : []
    })

    this.frame = null
    window.addEventListener("scroll", this.requestUpdate, { passive: true })
    window.addEventListener("resize", this.requestUpdate, { passive: true })
    this.requestUpdate()
  }

  disconnectedCallback () {
    window.removeEventListener("scroll", this.requestUpdate)
    window.removeEventListener("resize", this.requestUpdate)
    cancelAnimationFrame(this.frame)
  }

  get links () {
    return [...document.querySelectorAll("#table-of-contents ol a")]
  }

  get computedStyle () {
    if (this._computedStyle == null) {
      this._computedStyle = getComputedStyle(this.element)
    }
    return this._computedStyle
  }

  // Distance from the top of the viewport that counts as "you're reading here".
  // Mirrors the heading's scroll-margin-top so it lines up with anchor jumps.
  get readingLine () {
    const line = (parseFloat(this.computedStyle.scrollMarginTop) || 0) + 20
    return line
  }

  // rAF-throttle so scrolling stays cheap.
  requestUpdate = () => {
    cancelAnimationFrame(this.frame)
    this.frame = requestAnimationFrame(this.update)
  }

  update = () => {
    if (!this.entries.length) return

    const viewportBottom = window.scrollY + window.innerHeight
    const pageBottom = document.documentElement.scrollHeight
    const atBottom = Math.ceil(viewportBottom) >= pageBottom - 1

    const line = this.readingLine

    // At the bottom, the last heading usually can't scroll up to the reading
    // line, so pin it explicitly instead of getting stuck on an earlier one.
    // Otherwise the active section is the last heading we've scrolled past.
    let active = this.entries[0]

    if (atBottom) {
      active = this.entries[this.entries.length - 1]
    } else {
      for (const entry of this.entries) {
        if (entry.heading.getBoundingClientRect().top <= line + 1) {
          active = entry
        }
      }
    }

    this.setActive(active.link)
  }

  setActive (link) {
    if (link === this.activeLink) return
    this.activeLink = link
    this.entries.forEach(({ link: el }) => {
      if (el === link) {
        el.setAttribute("aria-current", "true")
      } else {
        el.removeAttribute("aria-current")
      }
    })
  }
}
