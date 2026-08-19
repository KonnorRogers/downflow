import { createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  themes: [],
  langs: [
    "html",
    "javascript"
  ],
})

export function shikiPlugin(options) {
  return async function (eleventyConfig) {
    // empty call to notify 11ty that we use this feature
    // eslint-disable-next-line no-empty-function
    eleventyConfig.amendLibrary('md', () => {});

    eleventyConfig.on('eleventy.before', async () => {

      await highlighter.loadTheme(options.theme)

      eleventyConfig.amendLibrary('md', (mdLib) =>
        mdLib.set({
          highlight: (code, lang) => highlighter.codeToHtml(code, { lang, theme: options.theme }),
        })
      );
    });
  }
};
