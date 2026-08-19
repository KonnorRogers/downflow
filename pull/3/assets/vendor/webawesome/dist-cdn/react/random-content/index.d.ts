import Component from '../../components/random-content/random-content.js';
import { type EventName } from '@lit/react';
import type { WaContentChangeEvent } from '../../events/events.js';
export type { WaContentChangeEvent } from '../../events/events.js';
/**
 * @summary Selects one or more child elements at random and displays them, hiding the rest.
 * @documentation https://webawesome.com/docs/components/random-content
 * @status experimental
 * @since 3.9
 *
 * @slot - The pool of children to choose from. Only direct element children are eligible; unselected
 *  children are hidden with the `hidden` attribute.
 *
 * @event {{ items: Element[] }} wa-content-change - Emitted whenever the displayed selection changes,
 *  including on first render, on `randomize()`, and on each autoplay tick.
 *
 * @cssproperty --animation-duration - Duration of the entrance animation. Default is `300ms`.
 * @cssproperty --animation-easing - Easing function for the entrance animation. Default is `ease`.
 * @cssproperty --animation-translate - Translation distance for directional animations (`fade-up`, `fade-down`, `fade-left`, `fade-right`). Default is `0.5em`.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaContentChange: EventName<WaContentChangeEvent>;
}>;
export default reactWrapper;
