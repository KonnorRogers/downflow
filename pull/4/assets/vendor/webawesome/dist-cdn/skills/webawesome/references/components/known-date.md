# Known Date

`<wa-known-date>`

Experimental [Forms](https://webawesome.com/docs/components/?category=forms) [Since 3.8](https://webawesome.com/docs/resources/changelog#wa_380)

Known dates let users enter dates they already know - birthdays, expirations, document dates - through three separate day, month, and year fields shown in the locale's natural order.

Known Date collects a date the user already knows — a birthday, a passport issue date, an expiration — through three separate fields for day, month, and year. It follows the [UK Government Design System date input pattern](https://design-system.service.gov.uk/components/date-input/): a labeled `<fieldset>` wraps three plain `<input>` elements, the user types each part themselves, and the host submits a single canonical ISO date.

```html
<wa-known-date label="When was your passport issued?"></wa-known-date>
```

For dates the user needs help finding (scheduling, ranges, browsing), use [`<wa-date-input>`](https://webawesome.com/docs/components/date-input) instead. Known Date is intentionally simple: no popup calendar, no auto-advance between fields, and no clever parsing.

## Form Submission

The hidden form value is canonical ISO 8601 (`YYYY-MM-DD`), regardless of the locale used to render the fields:

-   A complete, real calendar date is submitted as `YYYY-MM-DD`.
-   A partial entry (one or two fields filled) submits no value — the form data omits the entry entirely.
-   An invalid combination such as 30 February submits no value.

```html
<form id="kd-form-demo">
  <wa-known-date name="dob" label="Date of birth" required value="2007-03-27"></wa-known-date>
  <br />
  <wa-button type="submit" appearance="filled" variant="neutral">Submit</wa-button>
</form>

<pre id="kd-form-demo-output"></pre>

<style>
  #kd-form-demo-output {
    margin-block-start: 1rem;
    margin-block-end: 0;
    padding: 0.75rem;
    background: var(--wa-color-surface-lowered);
    border-radius: var(--wa-border-radius-m);
    font-size: 0.875em;
  }

  #kd-form-demo-output:empty {
    display: none;
  }
</style>

<script>
  const form = document.getElementById('kd-form-demo');
  const output = document.getElementById('kd-form-demo-output');

  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const entries = Object.fromEntries(data.entries());
    const formatted = JSON.stringify(entries, null, 2);
    output.textContent = 'Submitted FormData:\n' + formatted;
  });
</script>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/known-date/known-date.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/known-date/known-date.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/known-date/known-date.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaKnownDate from '@awesome.me/webawesome/dist/react/known-date/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `label` — The known date's group label. Alternatively, use the `label` attribute.
- `hint` — Text that describes how to use the known date. Alternatively, use the `hint` attribute.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `validators` | — | Validators are static because they have `observedAttributes`, essentially attributes to "watch" for changes. Whenever these attributes change, we want to be notified and update the validator. | `Validator[]` | `[]` |
| `valueInput` | — | Hidden mirror used for native constraint validation (min/max/required + valid-date roundtrip). | `HTMLInputElement` | — |
| `parts` | — | The three field strings. Stored verbatim so user-typed digits round-trip faithfully. | `DateParts` | `{ ...EMPTY_PARTS }` |
| `name` | `name` | The name submitted with form data. | `string \| null` | `''` |
| `value` | — | The committed value as an ISO `YYYY-MM-DD` string. The setter also accepts a `Date` or `null`. Reading returns an empty string when the value is blank or any field is only partially filled. | `string` | — |
| `defaultValue` | `value` | The default value used for form reset. | `string` | — |
| `disabled` | `disabled` | Disables the known date. | `boolean` | `false` |
| `required` | `required` | Makes the known date required for form submission. | `boolean` | `false` |
| `readonly` | `readonly` | Makes the fields non-editable. | `boolean` | `false` |
| `size` | `size` | The known date's size. | `WaKnownDateSize \| 'small' \| 'medium' \| 'large'` | `'m'` |
| `appearance` | `appearance` | The known date's visual appearance. | `WaKnownDateAppearance` | `'outlined'` |
| `pill` | `pill` | Draws pill-style fields with rounded edges. | `boolean` | `false` |
| `label` | `label` | The known date's label. If you need to display HTML, use the `label` slot instead. | `string` | `''` |
| `hint` | `hint` | The known date's hint. If you need to display HTML, use the `hint` slot instead. | `string` | `''` |
| `autocomplete` | `autocomplete` | Browser autofill family. When set to `bday`, the three fields receive `bday-day`, `bday-month`, and `bday-year` respectively. The field-agnostic directives `off` and `on` are applied to all three fields. Any other value is forwarded only to the year field. | `string` | `''` |
| `min` | `min` | Earliest selectable date as `YYYY-MM-DD`. | `string` | `''` |
| `max` | `max` | Latest selectable date as `YYYY-MM-DD`. | `string` | `''` |
| `locale` | `locale` | BCP-47 locale override. When empty, the inherited `lang` attribute is used. | `string` | `''` |
| `withLabel` | `with-label` | Only required for SSR. Set to `true` if you're slotting in a `label` element. | `boolean` | `false` |
| `withHint` | `with-hint` | Only required for SSR. Set to `true` if you're slotting in a `hint` element. | `boolean` | `false` |
| `valueAsDate` | — | The committed value as a `Date`, or `null` when the value is empty/invalid. | `Date \| null` | — |
| `validationTarget` | — | Anchor native validation popups on a real visible input. The hidden mirror handles form data, but anchoring a popup on `display: none` content would render it at offset (0, 0). | `undefined \| HTMLElement` | — |
| `form` | — | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | `HTMLFormElement \| null` | — |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Focuses the first empty field, or the first field when all are filled. | `options: FocusOptions` |
| `blur()` | Removes focus from the known date. | — |
| `formStateRestoreCallback()` | Called when the browser is trying to restore element’s state to state in which case reason is "restore", or when the browser is trying to fulfill autofill on behalf of user in which case reason is "autocomplete". In the case of "restore", state is a string, File, or FormData object previously set as the second argument to setFormValue. | `state: string \\| File \\| FormData \\| null` |
| `setCustomValidity()` | Do not use this when creating a "Validator". This is intended for end users of components. We track manually defined custom errors so we don't clear them on accident in our validators. | `message: string` |
| `resetValidity()` | Reset validity is a way of removing manual custom errors and native validation. | — |

## Events

| Name | Description |
| --- | --- |
| `input` | Emitted as the user types in any field. |
| `change` | Emitted when the committed value transitions to a new ISO date. |
| `blur` | Emitted when the control loses focus. |
| `focus` | Emitted when the control gains focus. |
| `wa-invalid` | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |

## Custom States

| Name | Description | CSS selector |
| --- | --- | --- |
| `blank` | The known date has no committed value. | `:state(blank)` |
| `disabled` | The known date is disabled. | `:state(disabled)` |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The component's outer wrapper (alias of the fields row). | \`::part(base)\` |
| \`field\` | Each field block (label + input). | \`::part(field)\` |
| \`field-day\` | Added to the day field block. | \`::part(field-day)\` |
| \`field-input\` | \`\` The native inside a field. | \`::part(field-input)\` |
| \`field-label\` | The text label above each field's input. | \`::part(field-label)\` |
| \`field-month\` | Added to the month field block. | \`::part(field-month)\` |
| \`field-year\` | Added to the year field block. | \`::part(field-year)\` |
| \`fields\` | The flex row holding the three field blocks. | \`::part(fields)\` |
| \`fieldset\` | \`

\` The element grouping the three fields (or a role="group" div). | \`::part(fieldset)\` |
| \`form-control\` | The form control's outer wrapper. | \`::part(form-control)\` |
| \`form-control-input\` | Alias on the fields row matching other form controls. | \`::part(form-control-input)\` |
| \`form-control-label\` | The wrapper inside the legend that styles the visible label text. | \`::part(form-control-label)\` |
| \`hint\` | The hint's wrapper. | \`::part(hint)\` |
| \`label\` | Alias on the legend's inner label wrapper. | \`::part(label)\` |
| \`legend\` | \`\` The element (when a label is present). | \`::part(legend)\` |

## Examples

### Initial Value

Set the `value` attribute to an ISO date to pre-fill the three fields.

```html
<wa-known-date label="Date of birth" value="1990-04-15"></wa-known-date>
```

### Hint

Use the `hint` attribute (or slot) to show an example value. The hint is associated with each field via `aria-describedby`, so screen readers announce it when any field receives focus.

```html
<wa-known-date label="When was your passport issued?" hint="For example, 27 3 2007"></wa-known-date>
```

### Locale-Aware Field Order

The three fields render in the natural order for the inherited `lang` (or the explicit `locale` attribute). The labels stay the same; only the position changes.

```html
<wa-known-date label="UK order" lang="en-GB"></wa-known-date>
<br />
<wa-known-date label="US order" lang="en-US"></wa-known-date>
<br />
<wa-known-date label="Japanese order" lang="ja-JP"></wa-known-date>
```

### Min & Max

Constrain the accepted range with `min` and `max`. Values outside the range are reported as invalid.

```html
<wa-known-date label="Birthday" min="1900-01-01" max="2099-12-31"></wa-known-date>
```

### Required

Set `required` to make the date input required for form submission. Like other form controls, validation surfaces through the browser's native constraint validation flow: submitting a form with an empty or partially filled date input prevents submission and shows the browser's validation message. No error appears while the user is simply filling in or tabbing between the fields.

```html
<form>
  <wa-known-date label="Date of birth" required></wa-known-date>
  <br />
  <wa-button type="submit" appearance="filled" variant="neutral">Submit</wa-button>
</form>
```

### Disabled & Readonly

```html
<wa-known-date label="Disabled" value="2007-03-27" disabled></wa-known-date>
<br />
<wa-known-date label="Readonly" value="2007-03-27" readonly></wa-known-date>
```

### Autocomplete

Set `autocomplete="bday"` to enable browser autofill for birthdays. The host expands the family into per-field tokens (`bday-day`, `bday-month`, `bday-year`).

```html
<wa-known-date label="Date of birth" autocomplete="bday"></wa-known-date>
```

### Sizes

```html
<wa-known-date label="Extra small" size="xs"></wa-known-date>
<br />
<wa-known-date label="Small" size="s"></wa-known-date>
<br />
<wa-known-date label="Medium (default)" size="m"></wa-known-date>
<br />
<wa-known-date label="Large" size="l"></wa-known-date>
<br />
<wa-known-date label="Extra large" size="xl"></wa-known-date>
```

### Appearances

```html
<wa-known-date label="Outlined (default)" appearance="outlined"></wa-known-date>
<br />
<wa-known-date label="Filled" appearance="filled"></wa-known-date>
<br />
<wa-known-date label="Filled outlined" appearance="filled-outlined"></wa-known-date>
```

### Pill

Use the `pill` attribute to give each field rounded edges.

```html
<wa-known-date label="Pill" pill></wa-known-date>
```
