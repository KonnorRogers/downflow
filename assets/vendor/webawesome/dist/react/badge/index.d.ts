import Component from '../../components/badge/badge.js';
/**
 * @summary Badges draw attention to adjacent content by displaying a status, count, or label. Use them to highlight
 *  notifications, categorize items, or flag new activity.
 * @documentation https://webawesome.com/docs/components/badge
 * @status stable
 * @since 2.0
 *
 * @slot - The badge's content.
 * @slot start - An element, such as `<wa-icon>`, placed before the label.
 * @slot end - An element, such as `<wa-icon>`, placed after the label.
 *
 * @csspart base - The component's base wrapper.
 * @csspart start - The container that wraps the `start` slot.
 * @csspart end - The container that wraps the `end` slot.
 *
 * @cssproperty --pulse-color - The color of the badge's pulse effect when using `attention="pulse"`.
 *
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {}>;
export default reactWrapper;
