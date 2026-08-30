import Component from '../../components/include/include.js';
import { type EventName } from '@lit/react';
import type { WaIncludeErrorEvent, WaLoadEvent } from '../../events/events.js';
export type { WaIncludeErrorEvent, WaLoadEvent } from '../../events/events.js';
/**
 * @summary Fetches an external HTML file and embeds its contents inline on the page. Useful for reusing shared markup
 *  like headers, footers, and partials across multiple pages.
 * @documentation https://webawesome.com/docs/components/include
 * @status stable
 * @since 2.0
 *
 * @event wa-load - Emitted when the included file is loaded.
 * @event {{ status: number }} wa-include-error - Emitted when the included file fails to load due to an error.
 *
 * @ssr - `<wa-include>` fetches its content asynchronously (like `<wa-icon>`), so the rendered output isn't available during SSR.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaLoad: EventName<WaLoadEvent>;
    onWaIncludeError: EventName<WaIncludeErrorEvent>;
}>;
export default reactWrapper;
