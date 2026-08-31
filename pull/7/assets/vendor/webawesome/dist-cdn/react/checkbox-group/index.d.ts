import Component from '../../components/checkbox-group/checkbox-group.js';
/**
 * @summary Checkbox groups wrap a set of related checkboxes or switches so they share a label, hint, and grouping
 *  semantics.
 * @documentation https://webawesome.com/docs/components/checkbox-group
 * @status stable
 * @since 3.9
 *
 * @dependency wa-checkbox
 *
 * @slot - The default slot where `<wa-checkbox>` or `<wa-switch>` elements are placed.
 * @slot label - The checkbox group's label. Required for proper accessibility. Alternatively, you can use the `label`
 *  attribute.
 * @slot hint - Text that describes how to use the checkbox group. Alternatively, you can use the `hint` attribute.
 *
 * @csspart form-control - The form control that wraps the label, group, and hint.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The element that wraps the grouped checkboxes, exposed as a `role="group"`.
 * @csspart hint - The hint's wrapper.
 *
 * @cssproperty [--gap=0.5em] - The gap between grouped checkboxes.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {}>;
export default reactWrapper;
