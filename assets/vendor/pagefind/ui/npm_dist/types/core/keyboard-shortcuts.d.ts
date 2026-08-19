export interface KeyBinding {
    mod: boolean;
    ctrl: boolean;
    shift: boolean;
    alt: boolean;
    meta: boolean;
    key: string;
}
export declare function detectMac(): boolean;
export declare function parseKeyBinding(bindingStr: string): KeyBinding;
export declare function keyBindingMatches(binding: KeyBinding, event: KeyboardEvent): boolean;
export declare function getShortcutDisplay(binding: KeyBinding): {
    keys: string[];
    aria: string;
};
