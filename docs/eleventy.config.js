// eleventy.config.js
import litPlugin from '@lit-labs/eleventy-plugin-lit';
import * as fs from 'node:fs';
import * as path from "node:path"

import * as url from 'url';
import { shikiPlugin } from './plugins/shiki.js';
import { humanize, neighborsInCategory, parseDocPath } from './pagination-helpers.js';

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

  const docFileGlob = eleventyConfig.directories.input + "**/*[0-9]*-*.(html|md)"
  // --- Collections -----------------------------------------------------
  eleventyConfig.addCollection("docs", (api) =>
    api
      .getFilteredByGlob(docFileGlob)
      .filter((item) => {
        // console.log(item)
        return parseDocPath(item.page.filePathStem)?.isIndex === false
      })
      .sort((a, b) => a.page.filePathStem.localeCompare(b.page.filePathStem, "en"))
  );

  eleventyConfig.addCollection("docsByCategory", (api) => {
    const byCat = new Map();
    for (const item of api.getFilteredByGlob(docFileGlob)) {
      // console.log({item})
      const meta = parseDocPath(item.page.filePathStem);
      if (!meta || meta.isIndex) continue;
      if (!byCat.has(meta.categorySlug)) {
        byCat.set(meta.categorySlug, {
          slug: meta.categorySlug, order: meta.categoryOrder,
          title: humanize(meta.categorySlug), pages: [],
        });
      }
      byCat.get(meta.categorySlug).pages.push(item);
    }
    return [...byCat.values()]
      .sort((a, b) => a.order - b.order)
      .map((cat) => {
        cat.pages.sort((a, b) => a.page.filePathStem.localeCompare(b.page.filePathStem, "en"));
        return cat;
      });
  });

  // --- Per-page computed data  ----------------
  eleventyConfig.addGlobalData("eleventyComputed", {
    category: (data) => parseDocPath(data.page.filePathStem)?.categorySlug ?? null,
    categoryTitle: (data) => {
      const m = parseDocPath(data.page.filePathStem);
      return m ? humanize(m.categorySlug) : null;
    },
    order: (data) => parseDocPath(data.page.filePathStem)?.fileOrder ?? null,
    prevDoc: (data) => neighborsInCategory(data).prev,
    nextDoc: (data) => neighborsInCategory(data).next,

    // OPTIONAL: strip number prefixes from URLs. Remove to keep the numbers.
    permalink: (data) => {
      if (data.permalink) return data.permalink;
      const m = parseDocPath(data.page.filePathStem);
      if (!m) return undefined;
      return m.isIndex ? `/${m.categorySlug}/` : `/${m.categorySlug}/${m.fileSlug}/`;
    },
    layout: (data) => {
      if (data.layout) return data.layout;
      const m = parseDocPath(data.page.filePathStem);
      return m && !m.isIndex ? "layouts/doc.njk" : undefined;
    },
  });
}

