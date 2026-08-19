import Component from '../../components/animation/animation.js';
import { type EventName } from '@lit/react';
import type { WaCancelEvent, WaFinishEvent, WaStartEvent } from '../../events/events.js';
export type { WaCancelEvent, WaFinishEvent, WaStartEvent } from '../../events/events.js';
/**
 * @summary Animate elements declaratively with nearly 100 baked-in presets, or roll your own with custom keyframes.
 *  Powered by the Web Animations API.
 * @documentation https://webawesome.com/docs/components/animation
 * @status stable
 * @since 2.0
 *
 * @event wa-cancel - Emitted when the animation is canceled.
 * @event wa-finish - Emitted when the animation finishes.
 * @event wa-start - Emitted when the animation starts or restarts.
 *
 * @slot - The element to animate. Avoid slotting in more than one element, as subsequent ones will be ignored. To
 *  animate multiple elements, either wrap them in a single container or use multiple `<wa-animation>` elements.
 *
 * @ssr - `<wa-animation>` renders during SSR without causing layout shift, but won't play its animation until the component hydrates on the client. Playback is driven by the Web Animations API, which is only available in the browser.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaCancel: EventName<WaCancelEvent>;
    onWaFinish: EventName<WaFinishEvent>;
    onWaStart: EventName<WaStartEvent>;
}>;
export default reactWrapper;
