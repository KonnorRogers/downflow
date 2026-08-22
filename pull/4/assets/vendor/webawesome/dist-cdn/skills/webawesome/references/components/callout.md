# Callout

`<wa-callout>`

Stable [Feedback](https://webawesome.com/docs/components/?category=feedback) [Since 3.0](https://webawesome.com/docs/resources/changelog#wa_300)

Callouts display important messages inline with surrounding content. Use them to highlight tips, warnings, errors, or other information users should not miss.

```html
<wa-callout>
  <wa-icon slot="icon" name="circle-info"></wa-icon>
  This is a standard callout. You can customize its content and even the icon.
</wa-callout>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/callout/callout.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/callout/callout.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/callout/callout.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaCallout from '@awesome.me/webawesome/dist/react/callout/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The callout's main content.
- `icon` — An icon to show in the callout. Works best with `<wa-icon>`.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | The callout's theme variant. Defaults to `brand` if not within another element with a variant. | `'brand' \| 'neutral' \| 'success' \| 'warning' \| 'danger'` | `'brand'` |
| `appearance` | `appearance` | The callout's visual appearance. | `'accent' \| 'filled' \| 'outlined' \| 'plain' \| 'filled-outlined'` | — |
| `size` | `size` | The callout's size. | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'small' \| 'medium' \| 'large'` | `'m'` |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`icon\` | The container that wraps the optional icon. | \`::part(icon)\` |
| \`message\` | The container that wraps the callout's main content. | \`::part(message)\` |

## Examples

### Variants

Set the `variant` attribute to change the callout's variant.

```html
<wa-callout variant="brand">
  <wa-icon slot="icon" name="circle-info"></wa-icon>
  <strong>This is super informative</strong><br />
  You can tell by how pretty the callout is.
</wa-callout>

<br />

<wa-callout variant="success">
  <wa-icon slot="icon" name="circle-check"></wa-icon>
  <strong>Your changes have been saved</strong><br />
  You can safely exit the app now.
</wa-callout>

<br />

<wa-callout variant="neutral">
  <wa-icon slot="icon" name="gear"></wa-icon>
  <strong>Your settings have been updated</strong><br />
  Settings will take effect on next login.
</wa-callout>

<br />

<wa-callout variant="warning">
  <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
  <strong>Your session has ended</strong><br />
  Please login again to continue.
</wa-callout>

<br />

<wa-callout variant="danger">
  <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
  <strong>Your account has been deleted</strong><br />
  We're very sorry to see you go!
</wa-callout>
```

### Appearance

Use the `appearance` attribute to change the callout's visual appearance (the default is `filled-outlined`).

```html
<wa-callout variant="brand" appearance="accent">
  <wa-icon slot="icon" name="square-check"></wa-icon>
  This <strong>accent</strong> callout draws attention
</wa-callout>

<br />

<wa-callout variant="brand" appearance="filled-outlined">
  <wa-icon slot="icon" name="fill-drip"></wa-icon>
  This callout is both <strong>filled</strong> and <strong>outlined</strong>
</wa-callout>

<br />

<wa-callout variant="brand" appearance="filled">
  <wa-icon slot="icon" name="fill"></wa-icon>
  This callout is only <strong>filled</strong>
</wa-callout>

<br />

<wa-callout variant="brand" appearance="outlined">
  <wa-icon slot="icon" name="lines-leaning"></wa-icon>
  Here's an <strong>outlined</strong> callout
</wa-callout>

<br />

<wa-callout variant="brand" appearance="plain">
  <wa-icon slot="icon" name="font"></wa-icon>
  No bells and whistles on this <strong>plain</strong> callout
</wa-callout>
```

### Sizes

Use the `size` attribute to change a callout's size.

```html
<wa-callout size="xs">
  <wa-icon slot="icon" name="circle-info"></wa-icon>
  Extra-small callout for minimal emphasis.
</wa-callout>

<br />

<wa-callout size="s">
  <wa-icon slot="icon" name="circle-info"></wa-icon>
  Small callout for a bit of emphasis.
</wa-callout>

<br />

<wa-callout size="m">
  <wa-icon slot="icon" name="circle-info"></wa-icon>
  Medium callout, the default size.
</wa-callout>

<br />

<wa-callout size="l">
  <wa-icon slot="icon" name="circle-info"></wa-icon>
  Large callout for more emphasis.
</wa-callout>

<br />

<wa-callout size="xl">
  <wa-icon slot="icon" name="circle-info"></wa-icon>
  Extra-large callout for maximum emphasis.
</wa-callout>
```

### Without Icons

Icons are optional. Simply omit the `icon` slot if you don't want them.

```html
<wa-callout variant="brand"> Nothing fancy here, just a simple callout. </wa-callout>
```

### Styling

You can customize the callout's appearance mostly by setting regular CSS properties. `background`, `border`, `border-radius`, `color`, `padding`, `margin`, etc. work as expected.
