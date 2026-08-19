import { PagefindElement } from "./base-element";
import { Instance } from "../core/instance";
export declare class PagefindSummary extends PagefindElement {
    static get observedAttributes(): string[];
    containerEl: HTMLElement | null;
    term: string;
    defaultMessage: string;
    constructor();
    init(): void;
    render(): void;
    reconcileAria(): void;
    register(instance: Instance): void;
    update(): void;
}
