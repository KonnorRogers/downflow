import { PagefindElement } from "./base-element";
import { Instance } from "../core/instance";
export declare class PagefindInput extends PagefindElement {
    static get observedAttributes(): string[];
    inputEl: HTMLInputElement | null;
    clearEl: HTMLButtonElement | null;
    searchID: number;
    placeholder: string;
    debounce: number;
    autofocus: boolean;
    constructor();
    readAttributes(): void;
    init(): void;
    render(): void;
    setupEventHandlers(): void;
    updateState(term: string): void;
    register(instance: Instance): void;
    update(): void;
    focus(): void;
}
