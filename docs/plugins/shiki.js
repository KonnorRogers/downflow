import { createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  themes: [],
  langs: [
    "shell"
    // "html",
    // "javascript"
  ],
})

let markdownLibrary = null

export function shikiPlugin(options) {
  return async function (eleventyConfig) {
    // empty call to notify 11ty that we use this feature
    // eslint-disable-next-line no-empty-function
    eleventyConfig.amendLibrary('md', (mdLib) => {
      markdownLibrary = mdLib
    });


    const loaded = new Set(highlighter.getLoadedLanguages())

    eleventyConfig.on('eleventy.before', async () => {
      await highlighter.loadTheme(options.theme)

      eleventyConfig.amendLibrary('md', (mdLib) => {
        markdownLibrary = mdLib
        mdLib.set({
          highlight: (code, lang) => highlighter.codeToHtml(code, {
            lang,
            theme: options.theme,
            transformers: [
              {
                pre (node) {
                  this.addClassToHast(node, `language-${lang}`)
                  node.properties['data-lang'] = lang
                }
              }
            ]
          }),
        })
      });
    });

    eleventyConfig.addPreprocessor("shiki-langs", "md,markdown", async (_data, content) => {
      const newLangs = []

      for (const token of markdownLibrary.parse(content, {})) {
        if (token.type == 'fence') {
          const lang = token.info.trim().split(/\s+/)[0]?.toLowerCase()
          if (lang && !loaded.has(lang)) {
            loaded.add(lang) // dedupe within this file
            newLangs.push(lang)
          }
        }
      }

      if (newLangs.length >= 1) {
        await Promise.allSettled(newLangs.map((lang) => {
          highlighter.loadLanguage(lang)
        }))
      }
      return undefined
    })
  }
};
