export type AnnouncerPriority = "polite" | "assertive";
/**
 * Global ARIA live region announcer.
 *
 * Creates two pre-rendered live regions (polite + assertive) at document root,
 * double-buffered for reliable successive announcements.
 */
export declare class Announcer {
    private regions;
    private politeIndex;
    private assertiveIndex;
    private clearTimeoutId;
    private containerId;
    private idGenerator;
    constructor(idGenerator: (prefix: string) => string);
    private createRegions;
    /**
     * Announce a message to screen readers.
     */
    announce(message: string, priority?: AnnouncerPriority): void;
    /**
     * Clear all live regions immediately.
     */
    clear(): void;
    /**
     * Remove announcer from DOM.
     */
    destroy(): void;
}
