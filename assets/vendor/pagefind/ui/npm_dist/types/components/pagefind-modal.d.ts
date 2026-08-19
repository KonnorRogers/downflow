import { PagefindElement } from "./base-element";
import { Instance } from "../core/instance";
export declare class PagefindModal extends PagefindElement {
    static get observedAttributes(): string[];
    dialogEl: HTMLDialogElement | null;
    resetOnClose: boolean;
    private _isOpen;
    private _closeHandler;
    constructor();
    init(): void;
    render(): void;
    private setupEventHandlers;
    open(): void;
    close(): void;
    private handleClose;
    get isOpen(): boolean;
    register(instance: Instance): void;
    reconcileAria(): void;
    cleanup(): void;
    update(): void;
}
