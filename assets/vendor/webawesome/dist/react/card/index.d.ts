import Component from '../../components/card/card.js';
/**
 * @summary Cards group related content and actions inside a bordered container. Use them to present products, articles,
 *  user profiles, or any self-contained unit of information.
 * @documentation https://webawesome.com/docs/components/card
 * @status stable
 * @since 2.0
 *
 * @slot - The card's main content.
 * @slot header - An optional header for the card.
 * @slot footer - An optional footer for the card.
 * @slot media - An optional media section to render at the start of the card.
 * @slot actions - An optional actions section to render at the end for the horizontal card.
 * @slot header-actions - An optional actions section to render in the header of the vertical card.
 * @slot footer-actions - An optional actions section to render in the footer of the vertical card.
 *
 * @csspart media - The container that wraps the card's media.
 * @csspart header - The container that wraps the card's header.
 * @csspart body - The container that wraps the card's main content.
 * @csspart footer - The container that wraps the card's footer.
 *
 * @cssproperty [--spacing=var(--wa-space-l)] - The amount of space around and between sections of the card. Expects a single value.
 *
 * @ssr - If you use the header, media, or footer slots, set the matching `with-header`, `with-media`, or `with-footer` attribute — otherwise only the card's body will render during SSR. This works around the lack of a `:has-slotted` CSS pseudo-class, which would normally let us style borders based on slotted content.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {}>;
export default reactWrapper;
