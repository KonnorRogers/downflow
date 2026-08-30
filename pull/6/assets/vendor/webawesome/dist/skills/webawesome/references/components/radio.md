# Radio

`<wa-radio>`

Stable [Forms](https://webawesome.com/docs/components/?category=forms) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Radios represent a single option within a mutually exclusive set. Use them inside a radio group when users must pick exactly one choice from a small list.

This component must be used as a child of [`<wa-radio-group>`](https://webawesome.com/docs/components/radio-group). Please see the [Radio Group docs](https://webawesome.com/docs/components/radio-group) to see examples of this component in action.

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/radio/radio.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/radio/radio.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/radio/radio.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaRadio from '@awesome.me/webawesome/dist/react/radio/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The radio's label.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `value` | `value` | The radio's value. When selected, the radio group will receive this value. | `string` | — |
| `appearance` | `appearance` | The radio's visual appearance. | `'default' \| 'button'` | `'default'` |
| `size` | `size` | The radio's size. When used inside a radio group, the size will be determined by the radio group's size, which will override this attribute. | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'small' \| 'medium' \| 'large'` | — |
| `disabled` | `disabled` | Disables the radio. | `boolean` | `false` |
| `validators` | — | Validators are static because they have `observedAttributes`, essentially attributes to "watch" for changes. Whenever these attributes change, we want to be notified and update the validator. | `Validator[]` | `[]` |
| `name` | `name` | The name of the input, submitted as a name/value pair with form data. | `string \| null` | `null` |
| `form` | — | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | `HTMLFormElement \| null` | — |
| `validationTarget` | — | Override this to change where constraint validation popups are anchored. | `undefined \| HTMLElement` | — |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `setCustomValidity()` | Do not use this when creating a "Validator". This is intended for end users of components. We track manually defined custom errors so we don't clear them on accident in our validators. | `message: string` |
| `formStateRestoreCallback()` | Called when the browser is trying to restore element’s state to state in which case reason is "restore", or when the browser is trying to fulfill autofill on behalf of user in which case reason is "autocomplete". In the case of "restore", state is a string, File, or FormData object previously set as the second argument to setFormValue. | `state: string \\| File \\| FormData \\| null, reason: 'autocomplete' \\| 'restore'` |
| `resetValidity()` | Reset validity is a way of removing manual custom errors and native validation. | — |

## Events

| Name | Description |
| --- | --- |
| `blur` | Emitted when the control loses focus. |
| `focus` | Emitted when the control gains focus. |

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--checked-icon-color\` | The color of the checked icon. |
| \`--checked-icon-scale\` | The size of the checked icon relative to the radio. |

## Custom States

| Name | Description | CSS selector |
| --- | --- | --- |
| `checked` | Applied when the control is checked. | `:state(checked)` |
| `disabled` | Applied when the control is disabled. | `:state(disabled)` |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`checked-icon\` | The checked icon. | \`::part(checked-icon)\` |
| \`control\` | The circular container that wraps the radio's checked state. | \`::part(control)\` |
| \`label\` | The container that wraps the radio's label. | \`::part(label)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)