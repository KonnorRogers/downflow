import { Instance } from "../core/instance";
export interface ErrorInfo {
    message: string;
    details?: string;
}
/**
 * Base class for all Pagefind web components
 */
export declare class PagefindElement extends HTMLElement {
    instance: Instance | null;
    protected _initialized: boolean;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    protected kebabToCamel(str: string): string;
    protected ensureId(prefix?: string): string;
    init(): void;
    reconcileAria(): void;
    register(_instance: Instance): void;
    cleanup(): void;
    update(): void;
    showError(error: ErrorInfo): void;
    protected escapeHtml(text: string): string;
}
