/**
 * The base class for creating oil controllers.
 */
export class Controller {
    /**
     * @type {string[]}
     */
    static targets: string[];
    /**
     * @type {string | null | undefined}
     */
    static controllerName: string | null | undefined;
    static __finalized__: boolean;
    /**
     * @param {object} options
     * @param {HTMLElement} options.element
     * @param {import("./application.js").Application} options.application
     * @param {string} options.controllerName
     */
    constructor({ element, application, controllerName }: {
        element: HTMLElement;
        application: import("./application.js").Application;
        controllerName: string;
    });
    /**
     * @type {Element}
     */
    element: Element;
    /**
     * @type {import("./application.js").Application}
     */
    application: import("./application.js").Application;
    /**
     * @type {string}
     */
    controllerName: string;
    /**
     * @type {boolean}
     */
    isConnected: boolean;
    _contextRef: import("@vue/reactivity").Ref<{}, {}>;
    set context(obj: {});
    get context(): {};
    /**
     * @returns {HTMLFormElement | null}
     */
    get form(): HTMLFormElement | null;
    get formData(): FormData | null;
    initialize(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
