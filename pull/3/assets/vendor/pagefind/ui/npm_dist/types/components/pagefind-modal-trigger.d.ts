import { PagefindElement } from "./base-element";
import { Instance } from "../core/instance";
export declare class PagefindModalTrigger extends PagefindElement {
    static get observedAttributes(): string[];
    buttonEl: HTMLButtonElement | null;
    private _userPlaceholder;
    shortcut: string;
    hideShortcut: boolean;
    compact: boolean;
    private _keydownHandler;
    private _keyBinding;
    constructor();
    get placeholder(): string;
    init(): void;
    private readAttributes;
    render(): void;
    private setupKeyboardShortcut;
    openModal(): void;
    handleModalClose(): void;
    register(instance: Instance): void;
    reconcileAria(): void;
    cleanup(): void;
    update(): void;
}
