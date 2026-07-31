import { bundledLanguages, bundledThemes, createHighlighter } from 'shiki'

export function shikiPlugin(options) {
  return function (eleventyConfig) {
    // empty call to notify 11ty that we use this feature
    // eslint-disable-next-line no-empty-function
    eleventyConfig.amendLibrary('md', () => {});

    eleventyConfig.on('eleventy.before', async () => {
      const highlighter = await createHighlighter({
        themes: Object.keys(bundledThemes),
        langs: Object.keys(bundledLanguages),
      })

      eleventyConfig.amendLibrary('md', (mdLib) =>
        mdLib.set({
          highlight: (code, lang) => highlighter.codeToHtml(code, { lang, theme: options.theme }),
        })
      );
    });
  }
};
