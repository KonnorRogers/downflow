import { parse } from "node-html-parser"
import * as crypto from "node:crypto"

export function codeBlocks () {
  return function (eleventyConfig) {
    // Can be sync or async
    eleventyConfig.addTransform("code-blocks", async function (content) {
      const doc = parse(content, {
        blockTextElements: {
          code: true
        }
      })
      doc.querySelectorAll(".shiki").forEach((el) => {
        const pre = el;
        const code = pre.querySelector("code")
        let preId = pre.getAttribute('id') || `code-block-${crypto.randomUUID().slice(0, 16)}`;
        let codeId = code.getAttribute('id') || `${preId}-inner`;

        if (!code.getAttribute('id')) {
          code.setAttribute('id', codeId);
        }
        if (!pre.getAttribute('id')) {
          pre.setAttribute('id', preId);
        }

        // Add a copy button
        const lang = el.getAttribute("data-lang")
        el.replaceWith(`
          <div class="code-block">
            <div class="code-block-actions">
              <div class="code-block-lang">${lang}</div>
              <div class="code-block-copy">
                <wa-copy-button from="${codeId}"></wa-copy-button>
              </div>
            </div>
            ${el.outerHTML}
          </div>
        `)
      })

      return doc.toString()
    });
  }
}
