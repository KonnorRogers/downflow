import Component from '../../components/time-input/time-input.js';
import { type EventName } from '@lit/react';
import type { WaAfterHideEvent, WaAfterShowEvent, WaClearEvent, WaHideEvent, WaInvalidEvent, WaShowEvent } from '../../events/events.js';
export type { WaAfterHideEvent, WaAfterShowEvent, WaClearEvent, WaHideEvent, WaInvalidEvent, WaShowEvent, } from '../../events/events.js';
/**
 * @summary Time pickers let users enter a time through a segmented field or select one visually from a popup column
 *  picker. They support 12- and 24-hour formats, optional seconds, and locale-aware segment order.
 * @documentation https://webawesome.com/docs/components/time-input
 * @status experimental
 * @since 3.8
 *
 * @dependency wa-icon
 * @dependency wa-popup
 *
 * @slot label - The time picker's label. Alternatively, use the `label` attribute.
 * @slot hint - Text that describes how to use the time picker. Alternatively, use the `hint` attribute.
 * @slot start - An element placed at the start of the input.
 * @slot end - An element placed at the end of the input.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot expand-icon - The icon to show on the popup toggle button. Defaults to a clock icon.
 * @slot footer - Content shown below the column picker in the popup. Replaces the default Now button when present.
 *
 * @event change - Emitted when the committed value changes.
 * @event input - Emitted as the user types into a segment or interacts with the popup columns.
 * @event focus - Emitted when the control receives focus.
 * @event blur - Emitted when the control loses focus.
 * @event wa-clear - Emitted when the clear button is activated.
 * @event wa-show - Emitted when the popup is about to open. Cancelable.
 * @event wa-after-show - Emitted after the popup opens and animations complete.
 * @event wa-hide - Emitted when the popup is about to close. Cancelable.
 * @event wa-after-hide - Emitted after the popup closes and animations complete.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and hint.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart hint - The hint's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart input-wrapper - The container around the start slot, segmented input, clear button, and expand button.
 * @csspart start - The container that wraps the `start` slot.
 * @csspart end - The container that wraps the `end` slot.
 * @csspart input - The segmented input group.
 * @csspart segment - Each editable segment (hour/minute/second/AM-PM spinbutton). Use `[part~="segment"]` to style all.
 * @csspart segment-literal - Inert literal text between segments (separators).
 * @csspart clear-button - The clear button.
 * @csspart expand-button - The popup toggle button.
 * @csspart expand-icon - The expand icon wrapper.
 * @csspart popup - The popup container.
 * @csspart columns - The row of column listboxes inside the popup.
 * @csspart column - Each column listbox.
 * @csspart column-item - Each option inside a column.
 * @csspart column-item-selected - The currently selected option inside a column.
 * @csspart now-button - The default "Now" button rendered in the popup footer when `with-now` is set.
 *
 * @cssproperty [--show-duration=var(--wa-transition-fast)] - The duration of the show animation.
 * @cssproperty [--hide-duration=var(--wa-transition-fast)] - The duration of the hide animation.
 * @cssproperty [--column-item-height=2.25em] - Height of each option inside a popup column.
 * @cssproperty [--column-width=3em] - Width of each popup column.
 *
 * @cssstate blank - The time picker has no committed value.
 * @cssstate open - The popup is open.
 * @cssstate disabled - The time picker is disabled.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaClear: EventName<WaClearEvent>;
    onWaShow: EventName<WaShowEvent>;
    onWaAfterShow: EventName<WaAfterShowEvent>;
    onWaHide: EventName<WaHideEvent>;
    onWaAfterHide: EventName<WaAfterHideEvent>;
    onWaInvalid: EventName<WaInvalidEvent>;
}>;
export default reactWrapper;
