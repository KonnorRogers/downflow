import { PagefindElement } from "./base-element";
import { Instance } from "../core/instance";
import type { PagefindRawResult, PagefindResultData } from "../types";
type TemplateResult = Element | Element[] | string;
interface ResultRenderOptions {
    showImages: boolean;
    showSubResults: boolean;
    maxSubResults: number;
    linkTarget: string | null;
}
interface ResultOptions {
    result: PagefindRawResult;
    index: number;
    placeholderNodes: Node[];
    resultFn: (result: PagefindResultData, options: ResultRenderOptions) => TemplateResult;
    intersectionEl: Element | null;
    showImages: boolean;
    showSubResults: boolean;
    maxSubResults: number;
    linkTarget: string | null;
    onLoad?: () => void;
}
declare class Result {
    rawResult: PagefindRawResult;
    private index;
    placeholderNodes: Node[];
    resultFn: (result: PagefindResultData, options: ResultRenderOptions) => TemplateResult;
    intersectionEl: Element | null;
    showImages: boolean;
    showSubResults: boolean;
    maxSubResults: number;
    linkTarget: string | null;
    result: PagefindResultData | null;
    onLoad?: () => void;
    private loading;
    private observer;
    constructor(opts: ResultOptions);
    setupObserver(): void;
    load(): Promise<void>;
    cleanup(): void;
}
export declare class PagefindResults extends PagefindElement {
    static get observedAttributes(): string[];
    containerEl: HTMLUListElement | null;
    intersectionEl: Element | null;
    results: Result[];
    showImages: boolean;
    hideSubResults: boolean;
    maxSubResults: number;
    maxResults: number;
    linkTarget: string | null;
    resultTemplate: ((result: PagefindResultData) => TemplateResult) | null;
    private compiledResultTemplate;
    private compiledPlaceholderTemplate;
    selectedIndex: number;
    private selectedAnchor;
    private loadingAnnouncementTimeout;
    constructor();
    init(): void;
    private checkForTemplates;
    private buildTemplateData;
    /**
     * Returns the internal render function used by the Result class.
     * Priority: JS function > script template > default template
     */
    private getResultRenderer;
    private getPlaceholder;
    render(): void;
    appendResults(nodes: Node[]): void;
    register(instance: Instance): void;
    /**
     * Find the next or previous anchor relative to the given one using DOM
     * traversal. Returns the neighbor anchor and the index of the Result it
     * belongs to, or null if there is no neighbor in that direction.
     */
    private findNeighborAnchor;
    /**
     * Given a node inside the results container, walk up to the direct child
     * of containerEl and read its data-pf-result-index attribute.
     */
    private resultIndexForNode;
    private setupKeyboardHandlers;
    private scrollToCenter;
    private preloadAhead;
    private scheduleLoadingAnnouncement;
    private clearLoadingAnnouncement;
    clearSelection(): void;
    cleanup(): void;
    update(): void;
}
export {};
