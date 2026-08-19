# Radio Group

`<wa-radio-group>`

Stable [Forms](https://webawesome.com/docs/components/?category=forms) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Radio groups wrap a set of radios so they function as a single form control with one shared value. They handle keyboard navigation, labeling, and validation for the group as a whole.

```html
<wa-radio-group label="Select an option" name="a" value="1">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2">Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/radio-group/radio-group.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/radio-group/radio-group.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/radio-group/radio-group.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaRadioGroup from '@awesome.me/webawesome/dist/react/radio-group/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The default slot where `<wa-radio>` elements are placed.
- `label` — The radio group's label. Required for proper accessibility. Alternatively, you can use the `label` attribute.
- `hint` — Text that describes how to use the radio group. Alternatively, you can use the `hint` attribute.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `validators` | — | Validators are static because they have `observedAttributes`, essentially attributes to "watch" for changes. Whenever these attributes change, we want to be notified and update the validator. | `Validator[]` | `[]` |
| `label` | `label` | The radio group's label. Required for proper accessibility. If you need to display HTML, use the `label` slot instead. | `string` | `''` |
| `hint` | `hint` | The radio groups's hint. If you need to display HTML, use the `hint` slot instead. | `string` | `''` |
| `name` | `name` | The name of the radio group, submitted as a name/value pair with form data. | `string \| null` | `null` |
| `disabled` | `disabled` | Disables the radio group and all child radios. | `boolean` | `false` |
| `orientation` | `orientation` | The orientation in which to show radio items. | `'horizontal' \| 'vertical'` | `'vertical'` |
| `value` | — | The current value of the radio group, submitted as a name/value pair with form data. | — | — |
| `defaultValue` | `value` | The default value of the form control. Primarily used for resetting the form control. | `string \| null` | — |
| `size` | `size` | The radio group's size. When present, this size will be applied to all `<wa-radio>` items inside. | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'small' \| 'medium' \| 'large'` | — |
| `required` | `required` | Ensures a child radio is checked before allowing the containing form to submit. | `boolean` | `false` |
| `withLabel` | `with-label` | Only required for SSR. Set to `true` if you're slotting in a `label` element so the server-rendered markup includes the label before the component hydrates on the client. | `boolean` | `false` |
| `withHint` | `with-hint` | Only required for SSR. Set to `true` if you're slotting in a `hint` element so the server-rendered markup includes the hint before the component hydrates on the client. | `boolean` | `false` |
| `validationTarget` | — | We use the first available radio as the validationTarget similar to native HTML that shows the validation popup on the first radio element. | `undefined \| HTMLElement` | — |
| `form` | — | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | `HTMLFormElement \| null` | — |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Sets focus on the radio group. | `options: FocusOptions` |
| `setCustomValidity()` | Do not use this when creating a "Validator". This is intended for end users of components. We track manually defined custom errors so we don't clear them on accident in our validators. | `message: string` |
| `formStateRestoreCallback()` | Called when the browser is trying to restore element’s state to state in which case reason is "restore", or when the browser is trying to fulfill autofill on behalf of user in which case reason is "autocomplete". In the case of "restore", state is a string, File, or FormData object previously set as the second argument to setFormValue. | `state: string \\| File \\| FormData \\| null, reason: 'autocomplete' \\| 'restore'` |
| `resetValidity()` | Reset validity is a way of removing manual custom errors and native validation. | — |

## Events

| Name | Description |
| --- | --- |
| `input` | Emitted when the radio group receives user input. |
| `change` | Emitted when the radio group's selected value changes. |
| `wa-invalid` | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`form-control\` | The form control that wraps the label, input, and hint. | \`::part(form-control)\` |
| \`form-control-input\` | The input's wrapper. | \`::part(form-control-input)\` |
| \`form-control-label\` | The label's wrapper. | \`::part(form-control-label)\` |
| \`hint\` | The hint's wrapper. | \`::part(hint)\` |
| \`radios\` | The wrapper than surrounds radio items, styled as a flex container by default. | \`::part(radios)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)
-   [`<wa-radio>`](https://webawesome.com/docs/components/radio)

## Examples

### Checked

Use the `value` attribute on the radio group to set the checked radio.

```html
<wa-radio-group label="Select an option" name="a" value="2">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2">Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

To target checked radios with CSS, use the `:state(checked)` selector.

### Hint

Add descriptive hint to a radio group with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html
<wa-radio-group label="Select an option" hint="Choose the most appropriate option." name="a" value="1">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2">Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

### Radio Buttons

Set the `appearance` attribute to `button` on all radios to render a radio button group.

```html
<wa-radio-group
  label="Horizontal options"
  hint="Select an option that makes you proud."
  orientation="horizontal"
  name="a"
  value="1"
>
  <wa-radio appearance="button" value="1">Option 1</wa-radio>
  <wa-radio appearance="button" value="2">Option 2</wa-radio>
  <wa-radio appearance="button" value="3">Option 3</wa-radio>
</wa-radio-group>

<br />

<wa-radio-group
  label="Vertical options"
  hint="Select an option that makes you proud."
  orientation="vertical"
  name="a"
  value="1"
  style="max-width: 300px;"
>
  <wa-radio appearance="button" value="1">Option 1</wa-radio>
  <wa-radio appearance="button" value="2">Option 2</wa-radio>
  <wa-radio appearance="button" value="3">Option 3</wa-radio>
</wa-radio-group>
```

### Disabling

To disable the entire radio group, add the `disabled` attribute to the radio group.

```html
<wa-radio-group label="Select an option" disabled>
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2" disabled>Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

To disable individual options, add the `disabled` attribute to the respective options.

```html
<wa-radio-group label="Select an option">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2" disabled>Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

### Orientation

The default orientation for radio items is `vertical`. Set the `orientation` to `horizontal` to items on the same row.

```html
<wa-radio-group
  label="Select an option"
  hint="Choose the most appropriate option."
  orientation="horizontal"
  name="a"
  value="1"
>
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2">Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

### Sizing Options

The size of radios will be determined by the Radio Group's `size` attribute.

```html
<wa-radio-group label="Extra small options" size="xs" value="1">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2">Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
<br />
<wa-radio-group label="Small options" size="s" value="1">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2">Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
<br />
<wa-radio-group label="Medium options" size="m" value="2">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2">Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
<br />
<wa-radio-group label="Large options" size="l" value="3">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2">Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
<br />
<wa-radio-group label="Extra large options" size="xl" value="3">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2">Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

If you need to have radios of varying sizes, place the `size` attribute on individual radio items instead.

```html
<wa-radio-group label="Mixed options" value="medium">
  <wa-radio value="1" size="xs">Extra Small</wa-radio>
  <wa-radio value="2" size="s">Small</wa-radio>
  <wa-radio value="3" size="m">Medium</wa-radio>
  <wa-radio value="4" size="l">Large</wa-radio>
  <wa-radio value="5" size="xl">Extra Large</wa-radio>
</wa-radio-group>
```

### Validation

Setting the `required` attribute to make selecting an option mandatory. If a value has not been selected, it will prevent the form from submitting and display an error message.

```html
<form class="validation">
  <wa-radio-group label="Select an option" name="a" required>
    <wa-radio value="1">Option 1</wa-radio>
    <wa-radio value="2">Option 2</wa-radio>
    <wa-radio value="3">Option 3</wa-radio>
  </wa-radio-group>
  <br />
  <wa-button appearance="filled" type="submit" variant="neutral">Submit</wa-button>
</form>

<script>
  const form = document.querySelector('.validation');

  // Handle form submit
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('All fields are valid!');
  });
</script>
```

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html
<form class="custom-validity">
  <wa-radio-group label="Select an option" name="a" value="1">
    <wa-radio value="1">Not me</wa-radio>
    <wa-radio value="2">Me neither</wa-radio>
    <wa-radio value="3">Choose me</wa-radio>
  </wa-radio-group>
  <br />
  <wa-button appearance="filled" type="submit" variant="neutral">Submit</wa-button>
</form>

<script>
  const form = document.querySelector('.custom-validity');
  const radioGroup = form.querySelector('wa-radio-group');
  const errorMessage = 'You must choose the last option';

  // Set initial validity as soon as the element is defined
  customElements.whenDefined('wa-radio-group').then(() => {
    radioGroup.setCustomValidity(errorMessage);
  });

  // Update validity when a selection is made
  form.addEventListener('change', () => {
    const isValid = radioGroup.value === '3';
    radioGroup.setCustomValidity(isValid ? '' : errorMessage);
  });

  // Handle form submit
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('All fields are valid!');
  });
</script>
```
