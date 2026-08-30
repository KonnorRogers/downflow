import Component from '../../components/progress-bar/progress-bar.js';
/**
 * @summary Progress bars show how far along an ongoing operation is as a horizontal fill. Use them for file uploads,
 *  multi-step flows, or any task with measurable progress.
 * @documentation https://webawesome.com/docs/components/progress-bar
 * @status stable
 * @since 2.0
 *
 * @slot - A label to show inside the progress indicator.
 *
 * @csspart base - The component's base wrapper.
 * @csspart indicator - The progress bar's indicator.
 * @csspart label - The progress bar's label.
 *
 * @cssproperty [--track-height=1rem] - The color of the track.
 * @cssproperty [--track-color=var(--wa-color-neutral-fill-normal)] - The color of the track.
 * @cssproperty [--indicator-color=var(--wa-color-brand-fill-loud)] - The color of the indicator.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {}>;
export default reactWrapper;
