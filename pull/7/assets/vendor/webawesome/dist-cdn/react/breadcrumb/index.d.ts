import Component from '../../components/breadcrumb/breadcrumb.js';
/**
 * @summary Breadcrumbs display a trail of links that show users where they are in a site's hierarchy. They help users
 *  understand the current location and navigate back to parent pages.
 * @documentation https://webawesome.com/docs/components/breadcrumb
 * @status stable
 * @since 2.0
 *
 * @slot - One or more breadcrumb items to display.
 * @slot separator - The separator to use between breadcrumb items. Works best with `<wa-icon>`.
 *
 * @dependency wa-icon
 *
 * @csspart base - The component's base wrapper.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {}>;
export default reactWrapper;
