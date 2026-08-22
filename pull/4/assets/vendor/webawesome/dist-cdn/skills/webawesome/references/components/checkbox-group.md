# Checkbox Group

`<wa-checkbox-group>`

Stable [Forms](https://webawesome.com/docs/components/?category=forms) [Since 3.9](https://webawesome.com/docs/resources/changelog#wa_390)

Checkbox groups wrap a set of related checkboxes or switches so they share a label, hint, and grouping semantics.

Checkboxes in a group remain independent form controls with their own `name`, `value`, and validation. The group exists to provide a shared label, hint, and accessible grouping.

```html
<wa-checkbox-group label="Interests">
  <wa-checkbox name="design">Design</wa-checkbox>
  <wa-checkbox name="development">Development</wa-checkbox>
  <wa-checkbox name="marketing">Marketing</wa-checkbox>
</wa-checkbox-group>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/checkbox-group/checkbox-group.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/checkbox-group/checkbox-group.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/checkbox-group/checkbox-group.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaCheckboxGroup from '@awesome.me/webawesome/dist/react/checkbox-group/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The default slot where `<wa-checkbox>` or `<wa-switch>` elements are placed.
- `label` — The checkbox group's label. Required for proper accessibility. Alternatively, you can use the `label` attribute.
- `hint` — Text that describes how to use the checkbox group. Alternatively, you can use the `hint` attribute.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `label` | `label` | The checkbox group's label. Required for proper accessibility. If you need to display HTML, use the `label` slot instead. | `string` | `''` |
| `hint` | `hint` | The checkbox group's hint. If you need to display HTML, use the `hint` slot instead. | `string` | `''` |
| `orientation` | `orientation` | The orientation in which to show grouped checkboxes. | `'horizontal' \| 'vertical'` | `'vertical'` |
| `size` | `size` | The group's size. When present, this size will be applied to all `<wa-checkbox>` and `<wa-switch>` items inside. | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'small' \| 'medium' \| 'large'` | — |
| `required` | `required` | Indicates that at least one option should be selected. This only adds a visual indicator to the label. To enforce the requirement, use the `required` attribute on the individual checkboxes and/or their `setCustomValidity()` method. | `boolean` | `false` |
| `withLabel` | `with-label` | Only required for SSR. Set to `true` if you're slotting in a `label` element so the server-rendered markup includes the label before the component hydrates on the client. | `boolean` | `false` |
| `withHint` | `with-hint` | Only required for SSR. Set to `true` if you're slotting in a `hint` element so the server-rendered markup includes the hint before the component hydrates on the client. | `boolean` | `false` |

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--gap\` | \`0.5em\` The gap between grouped checkboxes. Default |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`form-control\` | The form control that wraps the label, group, and hint. | \`::part(form-control)\` |
| \`form-control-input\` | \`role="group"\` The element that wraps the grouped checkboxes, exposed as a . | \`::part(form-control-input)\` |
| \`form-control-label\` | The label's wrapper. | \`::part(form-control-label)\` |
| \`hint\` | The hint's wrapper. | \`::part(hint)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-checkbox>`](https://webawesome.com/docs/components/checkbox)
-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)

## Examples

### Labels

Use the `label` attribute to give the group an accessible label. For labels that contain HTML, use the `label` slot instead.

```html
<wa-checkbox-group label="Toppings">
  <wa-checkbox name="pepperoni">Pepperoni</wa-checkbox>
  <wa-checkbox name="mushrooms">Mushrooms</wa-checkbox>
  <wa-checkbox name="onions">Onions</wa-checkbox>
  <wa-checkbox name="peppers">Peppers</wa-checkbox>
  <wa-checkbox name="sausage">Sausage</wa-checkbox>
  <wa-checkbox name="extra-cheese">Extra cheese</wa-checkbox>
</wa-checkbox-group>
```

### Hint

Add a descriptive hint to a checkbox group with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html
<wa-checkbox-group label="Workdays" hint="Choose as many as you like.">
  <wa-checkbox name="monday">Monday</wa-checkbox>
  <wa-checkbox name="wednesday">Wednesday</wa-checkbox>
  <wa-checkbox name="friday">Friday</wa-checkbox>
</wa-checkbox-group>
```

### Orientation

Checkbox groups stack vertically by default. Set the `orientation` attribute to `horizontal` to lay them out in a row.

```html
<wa-checkbox-group label="Sizes" orientation="horizontal">
  <wa-checkbox name="small">Small</wa-checkbox>
  <wa-checkbox name="medium">Medium</wa-checkbox>
  <wa-checkbox name="large">Large</wa-checkbox>
</wa-checkbox-group>
```

### Sizes

The size of grouped checkboxes and switches is determined by the checkbox group's `size` attribute. Any `size` set on individual items will be overridden.

```html
<div>
  <wa-checkbox-group id="checkbox-group-size" label="Options" hint="Use the select below to change the size." size="m">
    <wa-checkbox>Option 1</wa-checkbox>
    <wa-checkbox>Option 2</wa-checkbox>
    <wa-checkbox>Option 3</wa-checkbox>
  </wa-checkbox-group>

  <wa-divider></wa-divider>

  <wa-select label="Size" value="m" style="max-width: 200px;">
    <wa-option value="xs">Extra small</wa-option>
    <wa-option value="s">Small</wa-option>
    <wa-option value="m">Medium</wa-option>
    <wa-option value="l">Large</wa-option>
    <wa-option value="xl">Extra large</wa-option>
  </wa-select>
</div>

<script>
  const checkboxGroup = document.getElementById('checkbox-group-size');
  const sizeSelect = checkboxGroup.parentElement.querySelector('wa-select');

  sizeSelect.addEventListener('change', () => (checkboxGroup.size = sizeSelect.value));
</script>
```

### Disabling

A checkbox group itself can't be disabled. Add the `disabled` attribute to individual checkboxes to disable them.

```html
<wa-checkbox-group label="Add-ons">
  <wa-checkbox name="insurance" disabled>Insurance</wa-checkbox>
  <wa-checkbox name="gift-wrap" disabled>Gift wrap</wa-checkbox>
  <wa-checkbox name="express-shipping">Express shipping</wa-checkbox>
  <wa-checkbox name="extended-warranty">Extended warranty</wa-checkbox>
</wa-checkbox-group>
```

### Switches

A checkbox group also works with [switches](https://webawesome.com/docs/components/switch).

```html
<wa-checkbox-group label="Notifications" hint="Pick at least one channel.">
  <wa-switch name="email">Email</wa-switch>
  <wa-switch name="sms">SMS</wa-switch>
  <wa-switch name="push">Push</wa-switch>
</wa-checkbox-group>
```

### Required

The `required` attribute adds a visual indicator to the group's label. Because each checkbox is an independent control, the checkbox group doesn't enforce the requirement. Set the `required` property on the checkbox or call its `setCustomValidity()` method to control validation.

```html
<form>
  <wa-checkbox-group label="Accept terms" required>
    <wa-checkbox name="terms" required>I agree to the terms and conditions</wa-checkbox>
  </wa-checkbox-group>
  <br />
  <wa-button type="submit" appearance="filled">Submit</wa-button>
</form>
```
