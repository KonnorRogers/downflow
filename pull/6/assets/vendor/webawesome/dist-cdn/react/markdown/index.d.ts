import Component from '../../components/markdown/markdown.js';
/**
 * @summary Markdown elements render markdown content as HTML directly in the browser, making it easy to display
 *  user-generated content or documentation without a server-side build step.
 * @documentation https://webawesome.com/docs/components/markdown
 * @status experimental
 * @since 3.4
 *
 * @ssr - `<wa-markdown>` parses the content of its children at runtime, which requires a DOM. It can't render during SSR — use it on the client only.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {}>;
export default reactWrapper;
