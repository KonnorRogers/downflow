import { parse } from "node-html-parser"
import chalk from "chalk"

export function tableOfContents () {
  return function (eleventyConfig) {
    // Can be sync or async
    eleventyConfig.addTransform("table-of-contents", async function (content) {
      if (!(this.page.outputPath || "").endsWith(".html")) {
	return content
      }

      const doc = parse(content, {
        blockTextElements: {
          code: true
        }
      })

      /**
       * Build a flat tree of h2's
       */
      const tree = new Map()

      const headerRegex = /^h\d$/

      const currentHeadingParents = {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
      }

      let currentHeadingLevel = 1

      TreeWalker.walkChildren(doc.querySelector("main"), (el) => {
        if (!el.localName.match(headerRegex)) {
          return
        }

        const headingLevel = Number(el.localName[1])

        // an inputPath may not be defined for virtual files??? IDK.
        const errorPath = this.page.inputPath || this.page.outputPath

        const parentEl = currentHeadingParents[headingLevel - 1]

        if (!el.id) {
          const str = textToId(el.textContent)

          if (doc.querySelector(`#${str}`)) {
            console.error(chalk.red(`An element with id of "${str}" already exists at: ` + errorPath))
            return
          }

          el.id = str
        }

        if (headingLevel === 1) {
          if (currentHeadingParents[1]) {

            // Is there a better way to surface errors here?? Should we throw on full builds??
            console.error(chalk.red("Multiple h1 elements detected on: " + errorPath))
            return
          }

          currentHeadingParents[1] = el
        }

        if (!parentEl && headingLevel !== 1) {
          // Is there a better way to surface errors here?? Should we throw on full builds??
          console.error(chalk.red(`No parent h${headingLevel - 1} detected for <h${headingLevel}>${el.textContent}</h${headingLevel}> at: ${errorPath}`))
          return
        }

        // Only add a parent for h3+, h2 we don't need to track the parent.
        const obj = {
          element: el,
          headingLevel: headingLevel,
          parentElement: headingLevel === 1 ? null : parentEl,
          text: el.textContent,
          href: `#${el.id}`,
          children: [],
        }

        currentHeadingLevel = headingLevel

        // Reset any lower heading levels.
        for (let i = currentHeadingLevel; i < 6; i++) {
          if (i === 1) { continue }

          currentHeadingParents[i] = null
        }

        currentHeadingParents[currentHeadingLevel] = el

        tree.set(el, obj)
        if (headingLevel > 1) {
          const parentObj = tree.get(parentEl)
          parentObj.children.push(obj)
        }
      })

      const toc = doc.querySelector("#table-of-contents")

      if (!toc) {
        return content
      }


      const obj = [...tree.values()].find(({headingLevel}) => headingLevel === 1)
      let html = `<h2 style="font-size: 100%; margin-block: var(--wa-space-s);"><a href="${obj.href}">${obj.text}</a></h2>`

      const ary = [...tree.values()].filter(({headingLevel}) => headingLevel === 2)
      html += buildTOC(ary)
      toc.innerHTML = html

      return doc.toString()
    })
  }
}

function buildTOC(ary) {
  let html = '<ol>\n'
  for (const obj of ary) {
    // Wrapped in a span so we can style it without styling the `<a>`
    html += `<li><span data-level="${obj.headingLevel - 2}"><a href="${obj.href}">${obj.text}</a></span>\n`
    if (obj.children?.length > 0) {
      html += buildTOC(obj.children)
    }
    html += `</li>\n`
  }
  html += `</ol>`
  return html
}

class TreeWalker {
  /**
   * Walks all nodes from a given root element via `el.children` recursively.
   * @param {Element} el
   * @param {(node: Element) => unknown} callback
   */
  static walkChildren (el, callback) {
    callback(el)
    if (el.children?.length > 0) {
      for (const child of el.children) {
        this.walkChildren(child, callback)
      }
    }
  }
}

/**
 * https://gomakethings.com/articles/how-to-generate-an-id-from-element-text/#a-more-surgical-approach
 */
function textToId(text) {
  let str = text
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens

  // if it starts with a digit, add an underscore.
  if (str.match(/^\d/)) {
    str = "_" + str
  }

  return str
}
