import * as pagefind from "pagefind";
import * as path from "node:path"

export function pagefindPlugin(options) {
  const pageFindPath = options?.outputPath || path.join("assets", "search", "pagefind")

  const pageFindOptions = options?.pageFindOptions || {}

  return async function (eleventyConfig) {
    // Create a Pagefind search index to work with
    const { index } = await pagefind.createIndex(pageFindOptions);

	  // Can be sync or async
    eleventyConfig.addTransform("pagefind-index", async function (content) {
      // Index HTML content, giving it a specific URL
      await index.addHTMLFile({
      	  url: this.page.url,
      	  content
      });
      // No changes made, return as-is
      return content;
    });

    eleventyConfig.on("eleventy.after", async function ({ directories }) {
      const finalFile = path.join(directories.output, pageFindPath)
      // Or, write the index to disk
      await index.writeFiles({
          outputPath: finalFile
      });
    })
  }
}

