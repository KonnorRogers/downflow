// eleventy.config.js
import { version } from "../internal/version.js"

import litPlugin from '@lit-labs/eleventy-plugin-lit';
import * as fs from 'node:fs';
import * as path from "node:path"

import * as url from 'url';
import { shikiPlugin } from './plugins/shiki.js';
import { pagefindPlugin } from './plugins/pagefind.js';
import { jsBundlePlugin } from './plugins/js-bundle.js';
import { titleize } from './helpers.js';
import { codeBlocks } from './plugins/code-blocks.js';
import { tableOfContents } from './plugins/table-of-contents.js';
import clean from "eleventy-plugin-clean";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const root = path.resolve(__dirname, '..')
const webawesomeDir = path.join(root, 'node_modules/@awesome.me/webawesome');
const webawesomeComponentsDir = path.join(webawesomeDir, 'dist', 'components');
const webawesomeComponents = fs.readdirSync(webawesomeComponentsDir).map(componentName => {
  return path.join(webawesomeComponentsDir, componentName, componentName + '.js');
});

const downflowBundle = path.join(root, 'bundles', 'all.js');

export const config = {
  markdownTemplateEngine: 'njk',
  htmlTemplateEngine: 'njk',
  dir: {
    input: 'docs/pages',
    includes: '_includes',
    layouts: '_layouts',
  },
  templateFormats: ['njk', 'md', 'html'],
};

/** Regex to strip leading numbers */
const LEADING_NUMBERS_REGEX = /^\d+-/

function stripLeadingNumbers (str) {
  return str.replace(LEADING_NUMBERS_REGEX, "")
}

function sortByFilePathStem (a, b) {
  return a.page.filePathStem.localeCompare(b.page.filePathStem, "en")
}

function getCategoryForFile(file) {
  return stripLeadingNumbers(path.basename(path.dirname(file)))
}

function getSortedCategoryForFile(file) {
  return path.basename(path.dirname(file))
}

function processItem (item) {
  const file = item.page.filePathStem
  const parsedFile = path.parse(file)
  const baseName = parsedFile.base

  const slug = stripLeadingNumbers(baseName)

  const title = titleize(slug)

  item.data.layout = "doc.njk"

  const url = item.url.split("/").map(stripLeadingNumbers).join("/")
  const outputPath = item.outputPath.split("/").map(stripLeadingNumbers).join("/")

  if (item.data.category == null) {
    item.data.category = getCategoryForFile(file)
  }

  const category = item.data.category

  if (item.data.title == null) {
    item.data.title = title
  }

  if (item.data.permalink == null) {
    item.url = url
    item.data.url = url
    item.page.url = url

    item.outputPath = outputPath
    item.data.outputPath = outputPath
    item.page.outputPath = outputPath
  }

  const notIndexPage = parsedFile.base !== "index"

  return { notIndexPage, category }
}

export default async function (eleventyConfig) {
  const assetsDir = path.join(__dirname, "assets")


  const passthroughCopy = {
    [assetsDir]: "assets",
    [webawesomeDir]: 'assets/vendor/webawesome',
    [downflowBundle]: 'assets/downflow.js'
  }

  eleventyConfig.addPassthroughCopy(passthroughCopy);

  const docFileGlob = eleventyConfig.directories.input.replace(/^.\//, "") + "docs/**/*.*"

  eleventyConfig.addCollection("docs", async (api) => {
    const categories = new Set()

    const collection = api
      .getFilteredByGlob(docFileGlob)
      .filter((item) => {
        const {notIndexPage, category} = processItem(item)

        if (notIndexPage && category) {
          categories.add(category)
        }

        return notIndexPage
      })
      .sort(sortByFilePathStem)

    // Add pagination data.
    for (const category of categories) {
      const collectionForCategory = getCollectionForCategory(category, collection)

      collectionForCategory.forEach((item, i) => {
        const paginationObject = {}
        paginationObject.previous_page = collectionForCategory[i - 1]
        paginationObject.next_page = collectionForCategory[i + 1]
        item.data.konnors_pagination = paginationObject
      })
    }

    return collection
  });

  function getCollectionForCategory (category, collection = eleventyConfig.collections.docs) {
    return collection.filter((item) => {
      return item.data.category === category
    })
  }

  function docCategories (collection) {
    const categories = new Set()

    collection.forEach((item) => {
      const file = item.page.filePathStem
      const category = getSortedCategoryForFile(file)
      if (category) { categories.add(category) }
    })

    const sortedCategories = [...categories]
      .sort((a, b) => a.localeCompare(b, "en"))
      .map((category) => {
        return stripLeadingNumbers(category)
      })
    return sortedCategories
  }


  // eleventyConfig.dataFilterSelectors.add("*");
  eleventyConfig.addGlobalData("version", version)
  eleventyConfig.addGlobalData("docCategories", () => docCategories)
  eleventyConfig.addGlobalData("getCollectionForCategory", () => getCollectionForCategory);
  eleventyConfig.addGlobalData("layout", "default.njk");
  eleventyConfig.ignores.add("**/.keep");

  // Filters
  eleventyConfig.addFilter("titleize", titleize)
  eleventyConfig.addFilter("stripExtension", (str) => {
    return str.split(/\./)[0]
  })
  let markdownLibrary;
  eleventyConfig.amendLibrary("md", (lib) => { markdownLibrary = lib; });

  const shell = (code) => markdownLibrary.render("```shell\n" + code + "\n```").trim();

  function getMatch(content) {
    if (content.match(/^npm install/)) {
      const lines = content.split(/\n/)
      const pnpm = lines.map((str) => str.replaceAll(/^npm install/g, "pnpm add")).join("\n");
      const yarn = lines.map((str) => str.replaceAll(/^npm install/g, "yarn add")).join("\n");
      return { pnpm, yarn };
    }
    return null;
  }
  const toPNPM = (c) => getMatch(c)?.pnpm ?? c;
  const toYarn  = (c) => getMatch(c)?.yarn ?? c;

  eleventyConfig.addShortcode("npm", function (content) {
    return [
      `<wa-tab-group class="npm-block" active="npm" flow-prop="active:packageManager" flow-action="wa-tab-show#setPackageManager">`,
      `<wa-tab panel="npm">npm</wa-tab>`,
      `<wa-tab panel="pnpm">pnpm</wa-tab>`,
      `<wa-tab panel="yarn">yarn</wa-tab>`,
      `<wa-tab-panel name="npm">${shell(content)}</wa-tab-panel>`,
      `<wa-tab-panel name="pnpm">${shell(toPNPM(content))}</wa-tab-panel>`,
      `<wa-tab-panel name="yarn">${shell(toYarn(content))}</wa-tab-panel>`,
      `</wa-tab-group>`,
    ].join("\n");
  });

	eleventyConfig.addPreprocessor("macro-inject", ".njk,.md,.html", (data, content) => {
		return `{%- from "macros.njk" import frame -%}\n` + content;
	});


  // eleventyConfig.addShortcode("npmTabs", npmTabs);

  // Plugins
  eleventyConfig.addPlugin(clean);
  eleventyConfig.addPlugin(shikiPlugin({ theme: "nord" }));
  eleventyConfig.addPlugin(codeBlocks())
  eleventyConfig.addPlugin(tableOfContents())
  eleventyConfig.addPlugin(pagefindPlugin({
    pageFindOptions: {
      rootSelector: "main",
    }
  }))
  eleventyConfig.addPlugin(jsBundlePlugin())


  // Make sure lit plugin comes *after* any transform blocks. Make this last.
  eleventyConfig.addPlugin(litPlugin, {
    mode: 'worker',
    componentModules: webawesomeComponents,
  });

  eleventyConfig.setServerOptions({
    // Disable automatic browser refreshing
    // liveReload: false,

    // Optional: Also disable DOM diffing updates if necessary
    // domDiff: false
  });
}

