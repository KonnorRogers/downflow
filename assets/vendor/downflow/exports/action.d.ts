/**
 * Takes a {ParsedAction} object and properly binds and attaches.
 * @template {import("../internal/action-parser.js").ParsedAction} T
 */
export class Action<T extends import("../internal/action-parser.js").ParsedAction> {
    /**
     * @param {T} parsedAction
     */
    constructor(parsedAction: T);
    parsedAction: T;
}
