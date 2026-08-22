import Component from '../../components/spinner/spinner.js';
/**
 * @summary Spinners indicate that an operation is in progress when the duration is unknown. Use them for loading states
 *  where a determinate progress bar isn't practical.
 * @documentation https://webawesome.com/docs/components/spinner
 * @status stable
 * @since 2.0
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --track-width - The width of the track.
 * @cssproperty --track-color - The color of the track.
 * @cssproperty --indicator-color - The color of the spinner's indicator.
 * @cssproperty --speed - The time it takes for the spinner to complete one animation cycle.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {}>;
export default reactWrapper;
