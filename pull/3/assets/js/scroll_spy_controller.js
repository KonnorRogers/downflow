// import { Controller } from "downflow"

// export class ScrollSpyController extends Controller {
//   static controllerName = "scroll-spy"

//   connectedCallback () {
//     const scrollMarginTop = getComputedStyle(this.element).getPropertyValue("scroll-margin-top")
//     this.observer = new IntersectionObserver(this.handleIntersect, {
//       rootMargin: `${scrollMarginTop} 0px 0px 0px` ,
//       threshold: 0.2,
//     });

//     this.linkMap = new WeakMap();
//     this.visibleSet = new WeakSet();

//     this.observeLinks()
//     this.updateActiveLinks()

//     this.selector = ["1","2","3","4","5","6"].map((str) => "h" + str + "[id]").join(",")
//     document.querySelectorAll(this.selector).forEach((header) => {
//       this.observer.observe(header);
//     });

//     this.observeLinks()
//     this.updateActiveLinks()
//   }

//   disconnect () {
//     this.observer.disconnect()
//   }

//   get links () {
//     return [...document.querySelectorAll('#table-of-contents ol a')];
//   }

//   handleIntersect = (entries) => {
//     entries.forEach(entry => {
//       // Remember which targets are visible
//       if (entry.isIntersecting) {
//         this.visibleSet.add(entry.target);
//       } else {
//         this.visibleSet.delete(entry.target);
//       }
//     });

//     this.updateActiveLinks();
//   }

//   updateActiveLinks = () => {
//     const links = this.links;
//     // Find the first visible target and activate the respective link
//     links.find(link => {
//       const target = this.linkMap.get(link);

//       if (target && this.visibleSet.has(target)) {
//         links.forEach(el => {
//           if (el === link) {
//             el.setAttribute('aria-current', "true")
//           } else {
//             el.removeAttribute("aria-current")
//           }
//         });
//         return true;
//       }

//       return false;
//     });
//   }

//   observeLinks = () => {
//     this.links.forEach(link => {
//       const hash = link.hash.slice(1);
//       const target = hash ? document.querySelector(`main #${hash}`) : null;

//       if (target) {
//         this.linkMap.set(link, target);
//         this.observer.observe(target);
//       }
//     });
//   }
// }

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
    this.update()
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
