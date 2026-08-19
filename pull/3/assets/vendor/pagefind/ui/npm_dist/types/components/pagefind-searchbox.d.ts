import { PagefindElement } from "./base-element";
import { Instance } from "../core/instance";
import type { PagefindRawResult, PagefindResultData } from "../types";
type TemplateResult = Element | Element[] | string;
interface SearchboxResultOptions {
    rawResult: PagefindRawResult;
    placeholderEl: Element;
    renderFn: (result: PagefindResultData) => TemplateResult;
    intersectionRoot: Element | null;
    index: number;
    onLoad?: () => void;
}
declare class SearchboxResult {
    rawResult: PagefindRawResult;
    placeholderEl: Element;
    renderFn: (result: PagefindResultData) => TemplateResult;
    intersectionRoot: Element | null;
    onLoad?: () => void;
    data: PagefindResultData | null;
    cachedOptions: Element[] | null;
    private index;
    private loading;
    private retryDelay;
    private observer;
    constructor(opts: SearchboxResultOptions);
    setupObserver(): void;
    load(): Promise<void>;
    cacheOptions(): void;
    cleanup(): void;
}
export declare class PagefindSearchbox extends PagefindElement {
    static get observedAttributes(): string[];
    containerEl: HTMLElement | null;
    inputEl: HTMLInputElement | null;
    dropdownEl: HTMLElement | null;
    resultsEl: HTMLElement | null;
    statusEl: HTMLElement | null;
    footerEl: HTMLElement | null;
    isOpen: boolean;
    isLoading: boolean;
    results: SearchboxResult[];
    activeIndex: number;
    activeOptionOffset: number;
    searchID: number;
    searchTerm: string;
    private pendingNavigation;
    private loadingAnnouncementTimeout;
    private selectedEl;
    private _userPlaceholder;
    debounce: number;
    autofocus: boolean;
    showSubResults: boolean;
    maxResults: number;
    showKeyboardHints: boolean;
    shortcut: string;
    hideShortcut: boolean;
    resultTemplate: ((result: PagefindResultData) => TemplateResult) | null;
    private compiledResultTemplate;
    private compiledPlaceholderTemplate;
    private _documentClickHandler;
    private _shortcutKeyHandler;
    private _keyBinding;
    private _shortcutEl;
    constructor();
    get placeholder(): string;
    private readAttributes;
    init(): void;
    private checkForTemplates;
    private getPlaceholder;
    render(): void;
    private renderFooterHints;
    private setupEventHandlers;
    private setupOutsideClickHandler;
    private setupShortcutHandler;
    private openDropdown;
    private closeDropdown;
    private showLoadingState;
    private showEmptyState;
    private getOptionsForResult;
    private moveSelection;
    private preloadAhead;
    private scheduleLoadingAnnouncement;
    private clearLoadingAnnouncement;
    private handleResultLoaded;
    private updateSelectionUI;
    private scrollToCenter;
    private getResultAndOffsetFromElement;
    private activateCurrentSelection;
    private handleResults;
    private buildTemplateData;
    /**
     * Returns the render function for results.
     * Priority: JS function > script template > default template
     */
    private getResultRenderer;
    private rerenderLoadedResults;
    private announceResults;
    register(instance: Instance): void;
    cleanup(): void;
    update(): void;
    focus(): void;
}
export {};
