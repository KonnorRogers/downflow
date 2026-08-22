export { Controller };
export class Application {
    /**
     * Starts the registry and listens.
     * @param {RegistryOptions} options
     */
    static start(options?: RegistryOptions): Application;
    /**
     * @param {RegistryOptions} options
     */
    constructor(options?: RegistryOptions);
    /**
     * The root element which is where query selectors will be scoped from.
     * @type {Element | ShadowRoot}
     */
    rootElement: Element | ShadowRoot;
    /**
     * @param {MutationRecord[]} _mutations
     */
    handleMutations(_mutations: MutationRecord[]): void;
    /**
     * Bookkeeping of controllers to be tracked in the effect bindings.
     */
    /**
     * @type {WeakMap<Controller, number>}
     */
    _controllerIds: WeakMap<Controller, number>;
    /** @type {number} */
    _controllerSequentialId: number;
    /**
     * A map of all Controller constructors
     * @type {Map<string, typeof Controller>}
     */
    _controllerConstructorMap: Map<string, typeof Controller>;
    /**
     * Action listeners attached per element, so they can be removed on downgrade.
     * Keyed by the element the action was declared on — even when the listener
     * target is window/document — so removal cleans those up too. Inner map is
     * keyed by the raw action source string for cheap diffing.
     * @type {Map<Element, Map<string, { target: EventTarget, eventName: string, fn: EventListener, options: AddEventListenerOptions }>>}
     */
    _actionListenerMap: Map<Element, Map<string, {
        target: EventTarget;
        eventName: string;
        fn: EventListener;
        options: AddEventListenerOptions;
    }>>;
    /**
     * A Map of all controller instances attached to a particular element
     * @type {Map<Element, Map<string, Controller>>}
     */
    _controllerInstanceMap: Map<Element, Map<string, Controller>>;
    /**
     * A Map to track if a target has connected or not for a particular controller.
     * @type {Map<Controller, Map<string, Set<Element>>>}
     */
    _targetConnectionMap: Map<Controller, Map<string, Set<Element>>>;
    /**
     * last-seen text|attr|prop signature
     * @type {Map<Element, string>}
     */
    _bindingSignatures: Map<Element, string>;
    /**
     * If the registry has started listening for new elements.
     * @type {boolean}
     */
    started: boolean;
    /** @type {number} */
    _pauseCount: number;
    /**
     * The attribute to use for finding a controller. Defaults to "flow-controller".
     * @type {(node: Element) => string | null | undefined}
     */
    getControllerBinding: (node: Element) => string | null | undefined;
    /**
     * The attribute to use for finding a controller. Defaults to "flow-target".
     * @type {(node: Element) => string[] | null | undefined}
     */
    getTargetBinding: (node: Element) => string[] | null | undefined;
    /**
     * The attribute to use for finding text updates. Defaults to "flow-text".
     * @type {(node: Element) => string | null | undefined}
     */
    getTextBinding: (node: Element) => string | null | undefined;
    /**
     * Always returns a string. If no text binding found, returns null.
     * @param {Element} el
     * @returns {string | null}
     */
    parseTextBinding: (el: Element) => string | null;
    /**
     * The attribute to use for finding actions. Defaults to "flow-action".
     * @type {(node: Element) => string | null | undefined}
     */
    getActionBinding: (node: Element) => string | null | undefined;
    /**
     * The attribute to use for finding contexts. contexts are the "data" you're trying to read. Defaults to "flow-context".
     * @type {(node: Element) => null | undefined | string}
     */
    getContextBinding: (node: Element) => null | undefined | string;
    /**
     * @type {(node: Element) => null | undefined | string}
     */
    getAttributeBinding: (node: Element) => null | undefined | string;
    /**
     * The attribute to use for binding properties. Defaults to "flow-prop".
     * @type {(node: Element) => null | undefined | string}
     */
    getPropertyBinding: (node: Element) => null | undefined | string;
    modifierSchema: {
        ctrl: string;
        alt: string;
        meta: string;
        shift: string;
    };
    /**
     * @type {Record<string, string | RegExp>}
     */
    keymapSchema: Record<string, string | RegExp>;
    /**
     * @type {Record<string, (el: Element) => unknown>}
     */
    twoWayBindingSchema: Record<string, (el: Element) => unknown>;
    _contextRef: import("@vue/reactivity").Ref<{}, {}>;
    forms: HTMLCollectionOf<HTMLFormElement>;
    effectScheduler: EffectScheduler;
    _bindingScopes: Map<any, any>;
    _formState: WeakMap<WeakKey, any>;
    /**
     * These are events to listen for that affect 2 way binding.
     */
    formEvents: string[];
    /**
     * @param {Event} e
     */
    eventUpdateContext: (e: Event) => void;
    filters: {};
    /**
     * @param {Element} el
     */
    updateBindingsForElement(el: Element): void;
    set context(ctx: {});
    get context(): {};
    /**
     * Flushes changes and pauses the observer.
     * @param {() => void} fn
     */
    flushChanges(fn: () => void): void;
    /**
     * The attribute to use for finding a controller. Defaults to "flow-target".
     * @param {Element} node
     * @returns {{controllerName: string, target: string}[]}
     */
    parseTargetBinding(node: Element): {
        controllerName: string;
        target: string;
    }[];
    /**
     * @param {HTMLFormElement} form
     */
    _stateForForm(form: HTMLFormElement): any;
    /**
     * @param {Element} el
     */
    _readFormControl(el: Element): unknown;
    /**
     * Search upwards from current node to find closest controller for a given name.
     * @param {Element} root
     * @param {string} controllerName
     */
    getClosestController(root: Element, controllerName: string): Controller | null | undefined;
    /**
     * Search upwards from current node to find closest controller for a given name. This *excludes* the root element.
     * @param {Element} root
     * @param {string} controllerName
     */
    getClosestParentController(root: Element, controllerName: string): null;
    /**
     * Search upwards from current node to find closest controller for a given name.
     * @param {Element} root
     * @param {string} controllerName
     * @returns {Element | null | undefined}
     */
    getClosestControllerElement(root: Element, controllerName: string): Element | null | undefined;
    /**
     * Search upwards from current node to find closest context for a given name.
     * @param {Element} root
     * @returns {string | undefined | null}
     */
    getClosestContextString(root: Element): string | undefined | null;
    /**
     * @param {Element} el
     * @param {string | null} key
     */
    resolveValue(el: Element, key: string | null): Object | null | undefined;
    /**
     * Starts the registry and listens.
     * @param {RegistryOptions} options
     */
    start(options?: RegistryOptions): this;
    abortController: AbortController | undefined;
    /**
     * Takes records, and then disconnects the observer.
     */
    stop(): this;
    _reconcileQueued: boolean | undefined;
    /**
     * Registers a new controller to listen for.
     * @param {typeof Controller} Constructor
     * @param {string} [controllerName] - Use this to override the registration name.
     */
    register(Constructor: typeof Controller, controllerName?: string | undefined): void;
    /**
     * Registers a new controller to listen for.
     * @param {{controllerName: string} | string} strOrObj
     */
    unregister(strOrObj: {
        controllerName: string;
    } | string): void;
    /**
     * Finds a map of controllers based on the element and controllerName.
     * @param {Element} element
     * @param {string} controllerName
     * @return {null | undefined | Controller}
     */
    getController(element: Element, controllerName: string): null | undefined | Controller;
    /**
     * @param {string} controllerName
     * @return {undefined | null | typeof Controller}
     */
    _getConstructor(controllerName: string): undefined | null | typeof Controller;
    _observe(): void;
    observer: MutationObserver | undefined;
    reconcile(root?: Element | ShadowRoot): void;
    /**
     * @param {Element} el
     */
    _reconcileControllers(el: Element): void;
    /**
     * @param {Element | ShadowRoot} rootNode
     * @param {(node: Element, treeWalker: TreeWalker) => unknown} callback
     */
    walkParentElements(rootNode: Element | ShadowRoot, callback: (node: Element, treeWalker: TreeWalker) => unknown): void;
    /**
     * @param {Element | ShadowRoot} rootNode
     * @param {(node: Element, treeWalker: TreeWalker) => unknown} callback
     */
    walkElements(rootNode: Element | ShadowRoot, callback: (node: Element, treeWalker: TreeWalker) => unknown): void;
    /**
     * Fires disconnect lifecycle but KEEPS the instance for potential re-append.
     * @param {Element} element
     * @param {string} [controllerName]
     */
    _disconnectElement(element: Element, controllerName?: string | undefined): {
        map: Map<string, Controller>;
        disconnectedControllers: {
            controller: Controller;
            name: string;
        }[];
    } | undefined;
    /**
     * Fully destroys the controller — attribute removed or app stopped.
     * @param {Element} element
     * @param {string} [controllerName]
     */
    _destroyElement(element: Element, controllerName?: string | undefined): void;
    /**
     * @param {Element} element
     */
    _removeActionsForElement(element: Element): void;
    /**
     * @param {string} controllerName
     * @param {Element} el
     */
    _createControllerInstance(controllerName: string, el: Element): void;
    /** @param {Element} el */
    _reconcileActions(el: Element): void;
    /**
     * Takes an attribute and turns it into an array of controller names.
     * @param {string} str
     * @return {Array<string>}
     */
    parseControllerNamesFromString(str: string): Array<string>;
    /**
     * @param {Controller} controller
     * @param {string} targetName
     */
    targetsForController(controller: Controller, targetName: string): Element[];
    /**
     * @param {string} str
     * @return {Array<string>}
     */
    _parseControllersFromTargetAttribute(str: string): Array<string>;
    /**
     * @param {string} str
     * @return {Array<import("../internal/action-parser.js").ParsedAction>}
     */
    _parseActionsFromString(str: string): Array<import("../internal/action-parser.js").ParsedAction>;
    /**
     * @param {import("../internal/action-parser.js").ParsedAction} parsedAction
     * @param {Element} element
     */
    addParsedActionToElement(parsedAction: import("../internal/action-parser.js").ParsedAction, element: Element): void;
    /** @param {Controller} controller */
    _reconcileTargets(controller: Controller): void;
    /**
     * @param {Controller} controller
     * @param {string} targetName
     * @param {Element} target
     */
    _fireTargetConnected(controller: Controller, targetName: string, target: Element): void;
    /**
     * @param {Controller} controller
     * @param {string} targetName
     * @param {Element} target
     */
    _fireTargetDisconnected(controller: Controller, targetName: string, target: Element): void;
    /**
     * @param {Controller} controller
     */
    _disconnectAllTargets(controller: Controller): void;
    /**
     * @param {Element} el
     */
    _effectText(el: Element): void;
    /**
     * @param {Element} el
     */
    _effectAttributes(el: Element): void;
    /**
     * @param {Element} el
     * @param {string | null | undefined} [contextStr]
     */
    resolveContext(el: Element, contextStr?: string | null | undefined): any;
    /**
     * @param {Element} el
     */
    _effectProperties(el: Element): void;
    /**
     * @param {Element} el
     */
    parseBindings(el: Element): {
        contextString: string | null | undefined;
        property: string;
    }[];
    /** @param {Element} el */
    _reconcileBindings(el: Element): void;
    /** @param {Element} el */
    _downgradeBindings(el: Element): void;
    /**
     * @param {Controller} controller
     */
    _idForController(controller: Controller): number;
}
export type RegistryOptions = {
    rootElement?: Element | ShadowRoot | undefined;
};
import { Controller } from "./controller.js";
import { EffectScheduler } from "./effect-scheduler.js";
