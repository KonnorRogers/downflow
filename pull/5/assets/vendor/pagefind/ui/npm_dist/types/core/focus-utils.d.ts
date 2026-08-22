/**
 * Given registered components and a starting element, find which component
 * contains the next tabbable element in tab order.
 */
export declare function findNextComponentInTabOrder(fromElement: Element, components: HTMLElement[]): HTMLElement | null;
/**
 * Given registered components and a starting element, find which component
 * contains the previous tabbable element in tab order.
 */
export declare function findPreviousComponentInTabOrder(fromElement: Element, components: HTMLElement[]): HTMLElement | null;
