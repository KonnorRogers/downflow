/**
 * @typedef {object} ParsedAction
 * @property {string | null} controllerName - The name of the controller
 * @property {string | null} controllerFunction - The function to call
 * @property {string | null} eventName - The name of the event to trigger on
 * @property {string | null} eventModifier - The name of the event to trigger on
 * @property {Array<string>} additionalEventModifiers - additional event modifiers such as "ctrl", "alt", "shift", etc.
 * @property {Array<string>} actionOptions - Additional options IE: capture, passive, etc. https://stimulus.hotwired.dev/reference/actions#options.
 * @property {undefined | null | string} globalTarget - The target, IE: `@window`, `@document`.
 * @property {string} source - the original string passed in
 * @property {string[]} errors - If there was an error parsing, it'll live here.
 */
/**
 * @typedef {object} EventTokens
 * @property {string} eventName - The name of the event
 * @property {string | null} eventModifier - IE: "a", "b", "c", etc.
 * @property {Array<string>} additionalEventModifiers - IE: "ctrl+", "shift+"
 */
/**
 * The class in charge of parsing an action
 */
export class ActionParser {
    /**
     * At minimum, an action needs an eventName, controllerFunction, and controllerName
     */
    static NoEventNameError: string;
    static NoControllerFunctionError: string;
    static NoControllerNameError: string;
    /**
     * @param {string} input
     */
    constructor(input: string);
    /**
     * @type {string}
     */
    input: string;
    /**
     * @return {ParsedAction}
     */
    parse(): ParsedAction;
    /**
     * Finds all `actionOptions`, IE: ":!passive", ":!capture", etc
     * @param {StringScanner} scanner
     * @return {Array<string>}
     */
    findActionOptions(scanner: StringScanner): Array<string>;
    /**
     * Finds an `actionOption`, IE: ":!passive", ":!capture", etc
     * @param {StringScanner} scanner
     * @return {string}
     */
    findActionOption(scanner: StringScanner): string;
    /**
     * Finds the `controllerFunction`, IE: "doThing", "doOtherThing", etc
     * @param {StringScanner} scanner
     * @return {string}
     */
    findControllerFunction(scanner: StringScanner): string;
    /**
     * Finds the `controllerName`, IE: "my-controller"
     * @param {StringScanner} scanner
     * @return {Error | string | null}
     */
    findControllerName(scanner: StringScanner): Error | string | null;
    /**
     * Finds the `globalTarget`. Either `@window` or `@document` usually.
     * @param {StringScanner} scanner
     * @return {string | null}
     */
    findGlobalTarget(scanner: StringScanner): string | null;
    /**
     * Finds the `eventName`, IE: "click", "scroll", etc
     * @param {StringScanner} scanner
     * @return {EventTokens}
     */
    parseEvent(scanner: StringScanner): EventTokens;
}
export type ParsedAction = {
    /**
     * - The name of the controller
     */
    controllerName: string | null;
    /**
     * - The function to call
     */
    controllerFunction: string | null;
    /**
     * - The name of the event to trigger on
     */
    eventName: string | null;
    /**
     * - The name of the event to trigger on
     */
    eventModifier: string | null;
    /**
     * - additional event modifiers such as "ctrl", "alt", "shift", etc.
     */
    additionalEventModifiers: Array<string>;
    /**
     * - Additional options IE: capture, passive, etc. https://stimulus.hotwired.dev/reference/actions#options.
     */
    actionOptions: Array<string>;
    /**
     * - The target, IE: `@window`, `@document`.
     */
    globalTarget: undefined | null | string;
    /**
     * - the original string passed in
     */
    source: string;
    /**
     * - If there was an error parsing, it'll live here.
     */
    errors: string[];
};
export type EventTokens = {
    /**
     * - The name of the event
     */
    eventName: string;
    /**
     * - IE: "a", "b", "c", etc.
     */
    eventModifier: string | null;
    /**
     * - IE: "ctrl+", "shift+"
     */
    additionalEventModifiers: Array<string>;
};
import { StringScanner } from "./string-scanner.js";
