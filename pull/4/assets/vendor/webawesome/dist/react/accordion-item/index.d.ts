import Component from '../../components/accordion-item/accordion-item.js';
/**
 * @summary Accordion items are used inside `<wa-accordion>` to create expandable sections with accessible headers.
 * @documentation https://webawesome.com/docs/components/accordion
 * @status experimental
 * @since 1.0
 *
 * @dependency wa-icon
 *
 * @slot - The accordion item's body content.
 * @slot label - The accordion item's label. Alternatively, use the `label` attribute.
 * @slot icon - Optional expand/collapse icon. Works best with `<wa-icon>`.
 *
 * @csspart base - The component's base wrapper.
 * @csspart heading - The heading element wrapping the trigger button. Omitted when `heading-level="none"`.
 * @csspart button - The trigger button that toggles the panel.
 * @csspart label - The container that wraps the label.
 * @csspart icon - The container that wraps the expand/collapse icon.
 * @csspart panel - The panel that contains the item's content.
 * @csspart content - The content slot inside the panel.
 *
 * @cssproperty [--spacing=var(--wa-space-m)] - The amount of space around and between the item's header and content.
 * @cssproperty [--show-duration=var(--wa-transition-normal)] - The duration of the expand animation.
 * @cssproperty [--hide-duration=var(--wa-transition-normal)] - The duration of the collapse animation.
 * @cssproperty [--easing=var(--wa-transition-easing)] - The easing of the expand/collapse animation.
 *
 * @cssstate animating - Applied while the panel is animating.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {}>;
export default reactWrapper;
