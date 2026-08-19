import type { AnnouncerPriority, PagefindSearchResult, PagefindResultData, PagefindSubResult, FilterCounts, FilterSelection, InstanceOptions, MergeIndexConfig, InstanceEvent, TextDirection, ComponentCapabilities, Shortcut, HookCallback } from "../types";
export interface PagefindComponent extends HTMLElement {
    instance: Instance | null;
    componentType?: string;
    componentSubtype?: string | null;
    capabilities?: ComponentCapabilities;
    inputEl?: HTMLInputElement | null;
    reconcileAria?: () => void;
    register?: (instance: Instance) => void;
    render?: () => void;
}
export declare class Instance {
    private __pagefind__;
    private __loadPromise__;
    private __searchID__;
    private __hooks__;
    private _translations;
    private _userTranslations;
    private _direction;
    private _languageSet;
    private _announcer;
    components: PagefindComponent[];
    componentsByType: Record<string, PagefindComponent[]>;
    searchTerm: string;
    searchFilters: FilterSelection;
    searchResult: PagefindSearchResult;
    availableFilters: FilterCounts | null;
    totalFilters: FilterCounts | null;
    activeShortcuts: Shortcut[];
    faceted: boolean;
    name: string;
    private generatedIds;
    options: {
        bundlePath: string;
        mergeIndex: MergeIndexConfig[];
    };
    pagefindOptions: Record<string, unknown>;
    constructor(name: string, opts?: InstanceOptions);
    generateId(prefix: string, length?: number): string;
    add(component: PagefindComponent): void;
    registerInput(component: PagefindComponent, capabilities?: ComponentCapabilities): void;
    registerResults(component: PagefindComponent, capabilities?: ComponentCapabilities): void;
    registerSummary(component: PagefindComponent, capabilities?: ComponentCapabilities): void;
    registerFilter(component: PagefindComponent, capabilities?: ComponentCapabilities): void;
    registerSort(component: PagefindComponent, capabilities?: ComponentCapabilities): void;
    registerUtility(component: PagefindComponent, subtype?: string | null, capabilities?: ComponentCapabilities): void;
    private _registerComponent;
    getInputs(requiredCapability?: string | null): PagefindComponent[];
    getResults(requiredCapability?: string | null): PagefindComponent[];
    getSummaries(requiredCapability?: string | null): PagefindComponent[];
    getFilters(requiredCapability?: string | null): PagefindComponent[];
    getSorts(requiredCapability?: string | null): PagefindComponent[];
    getUtilities(subtype?: string | null, requiredCapability?: string | null): PagefindComponent[];
    /**
     * Check if any component has registered announcement capability.
     * Used to determine if Instance should handle announcements as a fallback.
     */
    hasAnnouncementCapability(): boolean;
    /**
     * Register an active shortcut. Triggers hints to re-render.
     */
    registerShortcut(shortcut: Omit<Shortcut, "owner">, owner: Element): void;
    /**
     * Deregister a shortcut by owner + label.
     */
    deregisterShortcut(label: string, owner: Element): void;
    /**
     * Deregister all shortcuts from an owner.
     */
    deregisterAllShortcuts(owner: Element): void;
    /**
     * Get currently active shortcuts.
     */
    getActiveShortcuts(): Shortcut[];
    /**
     * Notify keyboard-hints utilities to re-render
     * due to shortcuts changing
     */
    notifyShortcutsChanged(): void;
    /**
     * Focus the first result in the next keyboard-navigable results component.
     */
    focusNextResults(fromElement: Element): boolean;
    /**
     * Focus the previous keyboard-navigable input component.
     */
    focusPreviousInput(fromElement: Element): boolean;
    /**
     * Focus previous keyboard-navigable input and append a character.
     */
    focusInputAndType(fromElement: Element, char: string): void;
    /**
     * Focus previous keyboard-navigable input and delete last character.
     */
    focusInputAndDelete(fromElement: Element): void;
    /**
     * Trigger ARIA reconciliation on all registered components.
     */
    reconcileAria(): void;
    /**
     * Get current text direction.
     */
    get direction(): TextDirection;
    /**
     * Set the language for translations.
     */
    setLanguage(langCode?: string): void;
    /**
     * Set user translation overrides.
     */
    setTranslations(overrides: Record<string, string>): void;
    /**
     * Get a translated string.
     */
    translate(key: string, replacements?: Record<string, string | number>): string;
    /**
     * Announce a message to screen readers using a translation key.
     */
    announce(key: string, replacements?: Record<string, string | number>, priority?: AnnouncerPriority): void;
    /**
     * Announce a raw message to screen readers (bypasses translation system).
     */
    announceRaw(message: string, priority?: AnnouncerPriority): void;
    /**
     * Clear any pending announcements.
     */
    clearAnnouncements(): void;
    on(event: InstanceEvent, callback: HookCallback, owner?: Element | null): void;
    triggerLoad(): Promise<void>;
    triggerSearch(term: string): void;
    triggerSearchWithFilters(term: string, filters: FilterSelection): void;
    triggerFilters(filters: FilterSelection): void;
    triggerFilter(filter: string, values: string[]): void;
    __dispatch__(e: InstanceEvent, ...args: unknown[]): void;
    __clear__(): Promise<void>;
    __search__(term: string, filters: FilterSelection): Promise<void>;
    __load__(): Promise<void>;
    private __doLoad__;
    /**
     * Thin sub-results to the top N by relevance (location count).
     * Preserves original order while keeping only the most relevant entries.
     */
    thinSubResults(results: PagefindSubResult[], limit?: number): PagefindSubResult[];
    /**
     * Get sub-results for display, excluding the root result and thinning to limit.
     */
    getDisplaySubResults(result: PagefindResultData, limit?: number): PagefindSubResult[];
}
