// eleventy.config.js
import litPlugin from '@lit-labs/eleventy-plugin-lit';
import * as fs from 'node:fs';
import * as path from "node:path"

import * as url from 'url';
import { shikiPlugin } from './plugins/shiki.js';
import { pagefindPlugin } from './plugins/pagefind.js';
import { titleize } from './helpers.js';
import { codeBlocks } from './plugins/code-blocks.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const root = path.resolve(__dirname, '..')
const webawesomeDir = path.join(root, 'node_modules/@awesome.me/webawesome');
const webawesomeComponentsDir = path.join(webawesomeDir, 'dist', 'components');
const webawesomeComponents = fs.readdirSync(webawesomeComponentsDir).map(componentName => {
  return path.join(webawesomeComponentsDir, componentName, componentName + '.js');
});

const vueReactivityDir = path.join(root, 'node_modules/@vue/reactivity');
const pagefindUiDir = path.join(root, 'node_modules/@pagefind/component-ui');
// const driveshiftDir = path.join(root, 'node_modules/driveshaft')
const driveshiftDir = path.join(path.resolve(root, '..'), 'driveshaft')
// const vueReactivityFiles = fs.readdirSync(vueReacti, {recursive: true})

const flowStateDirectories = [
  'exports',
  'internal'
]

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

function processItem (item) {
  const file = item.page.filePathStem
  const parsedFile = path.parse(file)
  const baseName = parsedFile.base

  const slug = stripLeadingNumbers(baseName)

  const title = titleize(slug)

  item.data.layout = "doc.njk"

  const url = item.url.split("/").map(stripLeadingNumbers).join("/")
  const outputPath = item.outputPath.split("/").map(stripLeadingNumbers).join("/")

  if (item.data.title == null) {
    // item.title = title
    item.data.title = title
    // item.page.title = title
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

  return { notIndexPage }
}

export default async function (eleventyConfig) {
  const assetsDir = path.join(__dirname, "assets")

  eleventyConfig.addPassthroughCopy({
    [assetsDir]: "assets",
    [webawesomeDir]: 'assets/vendor/webawesome',
    [vueReactivityDir]: 'assets/vendor/vue/reactivity',
    [pagefindUiDir]: 'assets/vendor/pagefind/ui',
    [driveshiftDir]: 'assets/vendor/driveshaft'
  });

  flowStateDirectories.forEach((dir) => {
    const resolvedDir = path.join(root, dir)
    eleventyConfig.addPassthroughCopy({
      [resolvedDir]: path.join('assets/vendor/downflow', dir),
    })

    eleventyConfig.addWatchTarget(resolvedDir)
  })

  const docFileGlob = eleventyConfig.directories.input.replace(/^.\//, "") + "docs/**/*.*"

  eleventyConfig.addCollection("docs", async (api) => {
    const collection = api
      .getFilteredByGlob(docFileGlob)
      .filter((item) => {
        return processItem(item).notIndexPage
      })
      .sort(sortByFilePathStem)

    return collection
  });


  let categories = new Set()

  fs.globSync(docFileGlob).forEach((file) => {
      categories.add(stripLeadingNumbers(path.basename(path.dirname(file))))
  })

  categories = Array.from(categories)
  for (const category of categories) {
    eleventyConfig.addCollection(category, (api) => {
      return api
        .getFilteredByGlob(docFileGlob)
        .filter((item) => {
          const dir = path.basename(path.dirname(item.page.filePathStem))
          return stripLeadingNumbers(dir) === category && processItem(item).notIndexPage
        })
        .sort(sortByFilePathStem)
    })
  }

  eleventyConfig.addGlobalData("docCategories", categories)


  eleventyConfig.addGlobalData("layout", "default.njk");
  eleventyConfig.ignores.add("**/.keep");
  eleventyConfig.addFilter("titleize", titleize)
  eleventyConfig.addPlugin(shikiPlugin({ theme: "nord" }));
  eleventyConfig.addPlugin(pagefindPlugin({
    pageFindOptions: {
      rootSelector: "main",
    }
  }))
  eleventyConfig.addPlugin(codeBlocks())


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

