// eleventy.config.js
import litPlugin from '@lit-labs/eleventy-plugin-lit';
import * as fs from 'node:fs';
import * as path from "node:path"

import * as url from 'url';
import { shikiPlugin } from './plugins/shiki.js';
import { titleize } from './helpers.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const root = path.resolve(__dirname, '..')
const webawesomeDir = path.join(root, 'node_modules/@awesome.me/webawesome');
const webawesomeComponentsDir = path.join(webawesomeDir, 'dist', 'components');
const webawesomeComponents = fs.readdirSync(webawesomeComponentsDir).map(componentName => {
  return path.join(webawesomeComponentsDir, componentName, componentName + '.js');
});

const vueReactivityDir = path.join(root, 'node_modules/@vue/reactivity');
// const vueReactivityFiles = fs.readdirSync(vueReactivityDir, {recursive: true})

const flowStateDirectories = [
  'exports',
  'internal'
]

export const config = {
  markdownTemplateEngine: 'njk',
  dir: {
    input: 'docs/pages',
    includes: '_includes',
    layouts: '_layouts',
  },
  templateFormats: ['njk', 'md', 'html'],
};

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(litPlugin, {
    mode: 'worker',
    componentModules: webawesomeComponents,
  });
  eleventyConfig.addPassthroughCopy({
    [webawesomeDir]: 'webawesome',
    [vueReactivityDir]: 'vue/reactivity'
  });

  flowStateDirectories.forEach((dir) => {
    const resolvedDir = path.join(root, dir)
    eleventyConfig.addPassthroughCopy({
      [resolvedDir]: path.join('downflow', dir),
    })

    eleventyConfig.addWatchTarget(resolvedDir)
  })

  eleventyConfig.addPlugin(shikiPlugin({ theme: "nord" }));

  eleventyConfig.addGlobalData("layout", "default.njk");

  eleventyConfig.ignores.add("**/.keep");

  const docFileGlob = eleventyConfig.directories.input.replace(/^.\//, "") + "docs/**/*.*"

  const categories = new Set()
  const filesForCategory = new Map()
  /** Regex to strip leading numbers */
  const LEADING_NUMBERS_REGEX = /^\d+-/

  function stripLeadingNumbers (str) {
    return str.replace(LEADING_NUMBERS_REGEX, "")
  }

  const outputPath = eleventyConfig.directories.output
  console.log({outputPath})
  eleventyConfig.addCollection("docs", async (api) => {
    const collection = api
      .getFilteredByGlob(docFileGlob)
      .filter((item) => {
        const file = item.page.filePathStem
        const parsedFile = path.parse(file)
        const baseName = parsedFile.base

        const slug = stripLeadingNumbers(baseName)

        const directoryName = path.basename(path.dirname(file) )
        const category = stripLeadingNumbers(directoryName)

        const title = titleize(slug)

        item.data.layout = "doc.njk"

        if (!item.data.title) {
          item.title = title
          item.data.title = title
          item.page.title = title
        }

        const url = item.url.split("/").map(stripLeadingNumbers).join("/")
        const outputPath = item.outputPath.split("/").map(stripLeadingNumbers).join("/")

        // item.data.title ??= title
        if (item.data.permalink == null) {
          item.url = url
          item.data.url = url
          item.page.url = url

          item.outputPath = outputPath
          item.data.outputPath = outputPath
          item.page.outputPath = outputPath
        }

        // item.page.title ??= title
        // item.data.title ??= title
        // item.title ??= title

        // item.fileSlug ??= slug
        // item.data.fileSlug ??= slug
        // item.page.fileSlug ??= slug

        if (!categories.has(category)) {
          categories.add(category)
        }

        if (!filesForCategory.has(category)) {
          filesForCategory.set(category, [])
        }

        const files = filesForCategory.get(category)
        const notIndexPage = path.parse(item.page.filePathStem).base !== "index"

        if (notIndexPage) {
          files.push(item)
        }

        return notIndexPage
      })
      .sort((a, b) => a.page.filePathStem.localeCompare(b.page.filePathStem, "en"))



    // categories.forEach((category) => {
    //   eleventyConfig.addCollection(category, () => {
    //     const files = filesForCategory.get(category) || []
    //     return files
    //   })
    // })

    setTimeout(() => {
      // console.log(collection[0])
    })

    return collection
  });
}

