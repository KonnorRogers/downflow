import Component from '../../components/accordion/accordion.js';
import { type EventName } from '@lit/react';
import type { WaAfterCollapseEvent, WaAfterExpandEvent, WaCollapseEvent, WaExpandEvent } from '../../events/events.js';
export type { WaAfterCollapseEvent, WaAfterExpandEvent, WaCollapseEvent, WaExpandEvent } from '../../events/events.js';
/**
 * @summary Accordions are a vertically stacked set of interactive headings that each contain a title, representing a section of content.
 * @documentation https://webawesome.com/docs/components/accordion
 * @status experimental
 * @since 3.7
 *
 * @dependency wa-accordion-item
 *
 * @slot - One or more `<wa-accordion-item>` elements.
 *
 * @event {{ item: WaAccordionItem }} wa-expand - Emitted before an item expands. Cancelable.
 * @event {{ item: WaAccordionItem }} wa-after-expand - Emitted after an item finishes expanding.
 * @event {{ item: WaAccordionItem }} wa-collapse - Emitted before an item collapses. Cancelable.
 * @event {{ item: WaAccordionItem }} wa-after-collapse - Emitted after an item finishes collapsing.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaExpand: EventName<WaExpandEvent>;
    onWaAfterExpand: EventName<WaAfterExpandEvent>;
    onWaCollapse: EventName<WaCollapseEvent>;
    onWaAfterCollapse: EventName<WaAfterCollapseEvent>;
}>;
export default reactWrapper;
