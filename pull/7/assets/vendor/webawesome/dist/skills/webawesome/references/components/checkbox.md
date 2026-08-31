# Checkbox

`<wa-checkbox>`

Stable [Forms](https://webawesome.com/docs/components/?category=forms) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Checkboxes let users toggle an option on or off, or select multiple items from a list. They also support an indeterminate state for partial selections in groups.

```html
<wa-checkbox>Checkbox</wa-checkbox>
```

This component works with standard `<form>` elements. Please refer to the section on [form controls](https://webawesome.com/docs/form-controls) to learn more about form submission and client-side validation.

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/checkbox/checkbox.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/checkbox/checkbox.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaCheckbox from '@awesome.me/webawesome/dist/react/checkbox/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The checkbox's label.
- `hint` — Text that describes how to use the checkbox. Alternatively, you can use the `hint` attribute.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `validators` | — | Validators are static because they have `observedAttributes`, essentially attributes to "watch" for changes. Whenever these attributes change, we want to be notified and update the validator. | `Validator[]` | `[]` |
| `value` | `value` | The value of the checkbox, submitted as a name/value pair with form data. | `string \| null` | — |
| `size` | `size` | The checkbox's size. | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'small' \| 'medium' \| 'large'` | `'m'` |
| `disabled` | `disabled` | Disables the checkbox. | `boolean` | `false` |
| `indeterminate` | `indeterminate` | Draws the checkbox in an indeterminate state. This is usually applied to checkboxes that represents a "select all/none" behavior when associated checkboxes have a mix of checked and unchecked states. | `boolean` | `false` |
| `checked` | — | Draws the checkbox in a checked state. | — | — |
| `defaultChecked` | `checked` | The default value of the form control. Primarily used for resetting the form control. | `boolean` | — |
| `required` | `required` | Makes the checkbox a required field. | `boolean` | `false` |
| `hint` | `hint` | The checkbox's hint. If you need to display HTML, use the `hint` slot instead. | `string` | `''` |
| `name` | `name` | The name of the input, submitted as a name/value pair with form data. | `string \| null` | `null` |
| `form` | — | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | `HTMLFormElement \| null` | — |
| `validationTarget` | — | Override this to change where constraint validation popups are anchored. | `undefined \| HTMLElement` | — |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `click()` | Simulates a click on the checkbox. | — |
| `focus()` | Sets focus on the checkbox. | `options: FocusOptions` |
| `blur()` | Removes focus from the checkbox. | — |
| `setCustomValidity()` | Do not use this when creating a "Validator". This is intended for end users of components. We track manually defined custom errors so we don't clear them on accident in our validators. | `message: string` |
| `formStateRestoreCallback()` | Called when the browser is trying to restore element’s state to state in which case reason is "restore", or when the browser is trying to fulfill autofill on behalf of user in which case reason is "autocomplete". In the case of "restore", state is a string, File, or FormData object previously set as the second argument to setFormValue. | `state: string \\| File \\| FormData \\| null, reason: 'autocomplete' \\| 'restore'` |
| `resetValidity()` | Reset validity is a way of removing manual custom errors and native validation. | — |

## Events

| Name | Description |
| --- | --- |
| `change` | Emitted when the checked state changes. |
| `blur` | Emitted when the checkbox loses focus. |
| `focus` | Emitted when the checkbox gains focus. |
| `input` | Emitted when the checkbox receives input. |
| `wa-invalid` | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--checked-icon-color\` | The color of the checked and indeterminate icons. |
| \`--checked-icon-scale\` | The size of the checked and indeterminate icons relative to the checkbox. |

## Custom States

| Name | Description | CSS selector |
| --- | --- | --- |
| `checked` | Applied when the checkbox is checked. | `:state(checked)` |
| `disabled` | Applied when the checkbox is disabled. | `:state(disabled)` |
| `indeterminate` | Applied when the checkbox is in an indeterminate state. | `:state(indeterminate)` |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The component's label . | \`::part(base)\` |
| \`checked-icon\` | \`\` The indeterminate icon, a element. | \`::part(indeterminate-icon)\` |
| \`label\` | The container that wraps the checkbox's label. | \`::part(label)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)

## Examples

### Checked

Use the `checked` attribute to activate the checkbox.

```html
<wa-checkbox checked>Checked</wa-checkbox>
```

The `checked` attribute is the initial value and does not reflect changes, consistent with native checkboxes. To toggle the checked state with JavaScript, use the `checked` property instead. To target checked checkboxes with CSS, use the `:state(checked)` selector.

### Indeterminate

Use the `indeterminate` attribute to make the checkbox indeterminate.

```html
<wa-checkbox indeterminate>Indeterminate</wa-checkbox>
```

### Disabled

Use the `disabled` attribute to disable the checkbox.

```html
<wa-checkbox disabled>Disabled</wa-checkbox>
```

### Sizes

Use the `size` attribute to change a checkbox's size.

```html
<wa-checkbox size="xs">Extra Small</wa-checkbox>
<br />
<wa-checkbox size="s">Small</wa-checkbox>
<br />
<wa-checkbox size="m">Medium</wa-checkbox>
<br />
<wa-checkbox size="l">Large</wa-checkbox>
<br />
<wa-checkbox size="xl">Extra Large</wa-checkbox>
```

### Hint

Add descriptive hint to a switch with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html
<wa-checkbox hint="What should the user know about the checkbox?">Label</wa-checkbox>
```

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html
<form class="custom-validity">
  <wa-checkbox>Check me</wa-checkbox>
  <br />
  <wa-button appearance="filled" type="submit" variant="neutral" style="margin-top: 1rem;">Submit</wa-button>
</form>
<script>
  const form = document.querySelector('.custom-validity');
  const checkbox = form.querySelector('wa-checkbox');
  const errorMessage = `Don't forget to check me!`;

  // Set initial validity as soon as the element is defined
  customElements.whenDefined('wa-checkbox').then(async () => {
    await checkbox.updateComplete;
    checkbox.setCustomValidity(errorMessage);
  });

  // Update validity on change
  checkbox.addEventListener('change', () => {
    checkbox.setCustomValidity(checkbox.checked ? '' : errorMessage);
  });

  // Handle submit
  customElements.whenDefined('wa-checkbox').then(() => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('All fields are valid!');
    });
  });
</script>
```
