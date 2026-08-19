# Input

`<wa-input>`

Stable [Forms](https://webawesome.com/docs/components/?category=forms) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Inputs collect single-line data from the user, such as text, numbers, email addresses, and passwords. They support labels, hints, validation, and prefix or suffix slots.

```html
<wa-input></wa-input>
```

This component works with standard `<form>` elements. Please refer to the section on [form controls](https://webawesome.com/docs/form-controls) to learn more about form submission and client-side validation.

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/input/input.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/input/input.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/input/input.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaInput from '@awesome.me/webawesome/dist/react/input/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `label` — The input's label. Alternatively, you can use the `label` attribute.
- `start` — An element, such as `<wa-icon>`, placed at the start of the input control.
- `end` — An element, such as `<wa-icon>`, placed at the end of the input control.
- `clear-icon` — An icon to use in lieu of the default clear icon.
- `show-password-icon` — An icon to use in lieu of the default show password icon.
- `hide-password-icon` — An icon to use in lieu of the default hide password icon.
- `hint` — Text that describes how to use the input. Alternatively, you can use the `hint` attribute.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `validators` | — | Validators are static because they have `observedAttributes`, essentially attributes to "watch" for changes. Whenever these attributes change, we want to be notified and update the validator. | `Validator[]` | `[]` |
| `type` | `type` | The type of input. Works the same as a native `<input>` element, but only a subset of types are supported. Defaults to `text`. | `\| 'date' \| 'datetime-local' \| 'email' \| 'number' \| 'password' \| 'search' \| 'tel' \| 'text' \| 'time' \| 'url'` | `'text'` |
| `value` | — | The current value of the input, submitted as a name/value pair with form data. | — | — |
| `defaultValue` | `value` | The default value of the form control. Primarily used for resetting the form control. | `string \| null` | — |
| `size` | `size` | The input's size. | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'small' \| 'medium' \| 'large'` | `'m'` |
| `appearance` | `appearance` | The input's visual appearance. | `'filled' \| 'outlined' \| 'filled-outlined'` | `'outlined'` |
| `pill` | `pill` | Draws a pill-style input with rounded edges. | `boolean` | `false` |
| `label` | `label` | The input's label. If you need to display HTML, use the `label` slot instead. | `string` | `''` |
| `hint` | `hint` | The input's hint. If you need to display HTML, use the `hint` slot instead. | `string` | `''` |
| `withClear` | `with-clear` | Adds a clear button when the input is not empty. | `boolean` | `false` |
| `placeholder` | `placeholder` | Placeholder text to show as a hint when the input is empty. | `string` | `''` |
| `readonly` | `readonly` | Makes the input readonly. | `boolean` | `false` |
| `passwordToggle` | `password-toggle` | Adds a button to toggle the password's visibility. Only applies to password types. | `boolean` | `false` |
| `passwordVisible` | `password-visible` | Determines whether or not the password is currently visible. Only applies to password input types. | `boolean` | `false` |
| `withoutSpinButtons` | `without-spin-buttons` | Hides the browser's built-in increment/decrement spin buttons for number inputs. | `boolean` | `false` |
| `required` | `required` | Makes the input a required field. | `boolean` | `false` |
| `pattern` | `pattern` | A regular expression pattern to validate input against. | `string` | — |
| `minlength` | `minlength` | The minimum length of input that will be considered valid. | `number` | — |
| `maxlength` | `maxlength` | The maximum length of input that will be considered valid. | `number` | — |
| `min` | `min` | The input's minimum value. Only applies to date and number input types. | `number \| string` | — |
| `max` | `max` | The input's maximum value. Only applies to date and number input types. | `number \| string` | — |
| `step` | `step` | Specifies the granularity that the value must adhere to, or the special value `any` which means no stepping is implied, allowing any numeric value. Only applies to date and number input types. | `number \| 'any'` | — |
| `autocapitalize` | `autocapitalize` | Controls whether and how text input is automatically capitalized as it is entered by the user. | `'off' \| 'none' \| 'on' \| 'sentences' \| 'words' \| 'characters'` | — |
| `autocorrect` | `autocorrect` | Indicates whether the browser's autocorrect feature is on or off. When set as an attribute, use `"off"` or `"on"`. When set as a property, use `true` or `false`. | `boolean` | — |
| `autocomplete` | `autocomplete` | Specifies what permission the browser has to provide assistance in filling out form field values. Refer to [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values. | `string` | — |
| `autofocus` | `autofocus` | Indicates that the input should receive focus on page load. | `boolean` | — |
| `enterkeyhint` | `enterkeyhint` | Used to customize the label or icon of the Enter key on virtual keyboards. | `'enter' \| 'done' \| 'go' \| 'next' \| 'previous' \| 'search' \| 'send'` | — |
| `spellcheck` | `spellcheck` | Enables spell checking on the input. | `boolean` | `true` |
| `inputmode` | `inputmode` | Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual keyboard on supportive devices. | `'none' \| 'text' \| 'decimal' \| 'numeric' \| 'tel' \| 'search' \| 'email' \| 'url'` | — |
| `withLabel` | `with-label` | Only required for SSR. Set to `true` if you're slotting in a `label` element so the server-rendered markup includes the label before the component hydrates on the client. | `boolean` | `false` |
| `withHint` | `with-hint` | Only required for SSR. Set to `true` if you're slotting in a `hint` element so the server-rendered markup includes the hint before the component hydrates on the client. | `boolean` | `false` |
| `name` | `name` | The name of the input, submitted as a name/value pair with form data. | `string \| null` | `null` |
| `disabled` | `disabled` | Disables the form control. | `boolean` | `false` |
| `form` | — | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | `HTMLFormElement \| null` | — |
| `validationTarget` | — | Override this to change where constraint validation popups are anchored. | `undefined \| HTMLElement` | — |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Sets focus on the input. | `options: FocusOptions` |
| `blur()` | Removes focus from the input. | — |
| `select()` | Selects all the text in the input. | — |
| `setSelectionRange()` | Sets the start and end positions of the text selection (0-based). | `selectionStart: number, selectionEnd: number, selectionDirection: 'forward' \\| 'backward' \\| 'none'` |
| `setRangeText()` | Replaces a range of text with a new string. | `replacement: string, start: number, end: number, selectMode: 'select' \\| 'start' \\| 'end' \\| 'preserve'` |
| `showPicker()` | Displays the browser picker for an input element (only works if the browser supports it for the input type). | — |
| `stepUp()` | Increments the value of a numeric input type by the value of the step attribute. | — |
| `stepDown()` | Decrements the value of a numeric input type by the value of the step attribute. | — |
| `setCustomValidity()` | Do not use this when creating a "Validator". This is intended for end users of components. We track manually defined custom errors so we don't clear them on accident in our validators. | `message: string` |
| `formStateRestoreCallback()` | Called when the browser is trying to restore element’s state to state in which case reason is "restore", or when the browser is trying to fulfill autofill on behalf of user in which case reason is "autocomplete". In the case of "restore", state is a string, File, or FormData object previously set as the second argument to setFormValue. | `state: string \\| File \\| FormData \\| null, reason: 'autocomplete' \\| 'restore'` |
| `resetValidity()` | Reset validity is a way of removing manual custom errors and native validation. | — |

## Events

| Name | Description |
| --- | --- |
| `input` | Emitted when the control receives input. |
| `change` | Emitted when an alteration to the control's value is committed by the user. |
| `blur` | Emitted when the control loses focus. |
| `focus` | Emitted when the control gains focus. |
| `wa-clear` | Emitted when the clear button is activated. |
| `wa-invalid` | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |

## Custom States

| Name | Description | CSS selector |
| --- | --- | --- |
| `blank` | The input is empty. | `:state(blank)` |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The wrapper being rendered as an input | \`::part(base)\` |
| \`clear-button\` | The clear button. | \`::part(clear-button)\` |
| \`end\` | \`end\` The container that wraps the slot. | \`::part(end)\` |
| \`hint\` | The hint's wrapper. | \`::part(hint)\` |
| \`input\` | \`\` The internal control. | \`::part(input)\` |
| \`label\` | The label | \`::part(label)\` |
| \`password-toggle-button\` | The password toggle button. | \`::part(password-toggle-button)\` |
| \`start\` | \`start\` The container that wraps the slot. | \`::part(start)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)

## Examples

### Labels

Use the `label` attribute to give the input an accessible label. For labels that contain HTML, use the `label` slot instead.

```html
<wa-input label="What is your name?"></wa-input>
```

### Hint

Add descriptive hint to an input with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html
<wa-input label="Nickname" hint="What would you like people to call you?"></wa-input>
```

### Placeholders

Use the `placeholder` attribute to add a placeholder.

```html
<wa-input placeholder="Type something"></wa-input>
```

### Clearable

Add the `with-clear` attribute to add a clear button when the input has content.

```html
<wa-input placeholder="Clearable" with-clear></wa-input>
```

### Toggle Password

Add the `password-toggle` attribute to add a toggle button that will show the password when activated.

```html
<wa-input type="password" placeholder="Password Toggle" password-toggle></wa-input>
```

### Appearance

Use the `appearance` attribute to change the input's visual appearance.

```html
<wa-input placeholder="Type something" appearance="filled"></wa-input><br />
<wa-input placeholder="Type something" appearance="filled-outlined"></wa-input><br />
<wa-input placeholder="Type something" appearance="outlined"></wa-input>
```

### Disabled

Use the `disabled` attribute to disable an input.

```html
<wa-input placeholder="Disabled" disabled></wa-input>
```

### Sizes

Use the `size` attribute to change an input's size.

```html
<wa-input placeholder="Extra Small" size="xs"></wa-input>
<br />
<wa-input placeholder="Small" size="s"></wa-input>
<br />
<wa-input placeholder="Medium" size="m"></wa-input>
<br />
<wa-input placeholder="Large" size="l"></wa-input>
<br />
<wa-input placeholder="Extra Large" size="xl"></wa-input>
```

### Pill

Use the `pill` attribute to give inputs rounded edges.

```html
<wa-input placeholder="Extra Small" size="xs" pill></wa-input>
<br />
<wa-input placeholder="Small" size="s" pill></wa-input>
<br />
<wa-input placeholder="Medium" size="m" pill></wa-input>
<br />
<wa-input placeholder="Large" size="l" pill></wa-input>
<br />
<wa-input placeholder="Extra Large" size="xl" pill></wa-input>
```

### Input Types

The `type` attribute controls the type of input the browser renders.

```html
<wa-input type="email" placeholder="Email"></wa-input>
<br />
<wa-input type="number" placeholder="Number"></wa-input>
<br />
<wa-input type="date" placeholder="Date"></wa-input>
```

### Start & End Decorations

Use the `start` and `end` slots to add presentational elements like [`<wa-icon>`](https://webawesome.com/docs/components/icon) within the input.

```html
<wa-input placeholder="Small" size="s">
  <wa-icon name="house" slot="start"></wa-icon>
  <wa-icon name="comment" slot="end"></wa-icon>
</wa-input>
<br />
<wa-input placeholder="Medium" size="m">
  <wa-icon name="house" slot="start"></wa-icon>
  <wa-icon name="comment" slot="end"></wa-icon>
</wa-input>
<br />
<wa-input placeholder="Large" size="l">
  <wa-icon name="house" slot="start"></wa-icon>
  <wa-icon name="comment" slot="end"></wa-icon>
</wa-input>
```

### Customizing Label Position

Use [CSS parts](#css-parts) to customize the way form controls are drawn. This example uses CSS grid to position the label to the left of the control, but the possible orientations are nearly endless. The same technique works for inputs, textareas, radio groups, and similar form controls.

```html
<div class="label-on-left">
  <wa-input label="Name" hint="Enter your name"></wa-input>
  <wa-input label="Email" type="email" hint="Enter your email"></wa-input>
  <wa-textarea label="Bio" hint="Tell us something about yourself"></wa-textarea>
</div>

<style>
  .label-on-left {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--wa-space-l);
    align-items: center;

    wa-input,
    wa-textarea {
      grid-column: 1 / -1;
      grid-row-end: span 2;
      display: grid;
      grid-template-columns: subgrid;
      gap: 0 var(--wa-space-l);
      align-items: center;
    }

    ::part(label) {
      text-align: right;
    }

    ::part(hint) {
      grid-column: 2;
    }
  }
</style>
```
