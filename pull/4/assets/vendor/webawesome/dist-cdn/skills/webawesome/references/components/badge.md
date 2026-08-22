# Badge

`<wa-badge>`

Stable [Feedback](https://webawesome.com/docs/components/?category=feedback) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Badges draw attention to adjacent content by displaying a status, count, or label. Use them to highlight notifications, categorize items, or flag new activity.

```html
<wa-badge>Badge</wa-badge>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/badge/badge.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/badge/badge.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/badge/badge.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaBadge from '@awesome.me/webawesome/dist/react/badge/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The badge's content.
- `start` — An element, such as `<wa-icon>`, placed before the label.
- `end` — An element, such as `<wa-icon>`, placed after the label.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | The badge's theme variant. Defaults to `brand` if not within another element with a variant. | `'brand' \| 'neutral' \| 'success' \| 'warning' \| 'danger'` | `'brand'` |
| `appearance` | `appearance` | The badge's visual appearance. | `'accent' \| 'filled' \| 'outlined' \| 'filled-outlined'` | `'accent'` |
| `pill` | `pill` | Draws a pill-style badge with rounded edges. | `boolean` | `false` |
| `attention` | `attention` | Adds an animation to draw attention to the badge. | `'none' \| 'pulse' \| 'bounce'` | `'none'` |

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--pulse-color\` | \`attention="pulse"\` The color of the badge's pulse effect when using . |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The component's base wrapper. | \`::part(base)\` |
| \`end\` | \`end\` The container that wraps the slot. | \`::part(end)\` |
| \`start\` | \`start\` The container that wraps the slot. | \`::part(start)\` |

## Examples

### Variants

Set the `variant` attribute to change the badge's variant.

```html
<wa-badge variant="brand">Brand</wa-badge>
<wa-badge variant="success">Success</wa-badge>
<wa-badge variant="neutral">Neutral</wa-badge>
<wa-badge variant="warning">Warning</wa-badge>
<wa-badge variant="danger">Danger</wa-badge>
```

### Appearance

Use the `appearance` attribute to change the badge's visual appearance.

```html
<div style="margin-block-end: 1rem;">
  <wa-badge appearance="accent" variant="neutral">Accent</wa-badge>
  <wa-badge appearance="filled-outlined" variant="neutral">Filled-Outlined</wa-badge>
  <wa-badge appearance="filled" variant="neutral">Filled</wa-badge>
  <wa-badge appearance="outlined" variant="neutral">Outlined</wa-badge>
</div>
<div style="margin-block-end: 1rem;">
  <wa-badge appearance="accent" variant="brand">Accent</wa-badge>
  <wa-badge appearance="filled-outlined" variant="brand">Filled-Outlined</wa-badge>
  <wa-badge appearance="filled" variant="brand">Filled</wa-badge>
  <wa-badge appearance="outlined" variant="brand">Outlined</wa-badge>
</div>
<div style="margin-block-end: 1rem;">
  <wa-badge appearance="accent" variant="success">Accent</wa-badge>
  <wa-badge appearance="filled-outlined" variant="success">Filled-Outlined</wa-badge>
  <wa-badge appearance="filled" variant="success">Filled</wa-badge>
  <wa-badge appearance="outlined" variant="success">Outlined</wa-badge>
</div>
<div style="margin-block-end: 1rem;">
  <wa-badge appearance="accent" variant="warning">Accent</wa-badge>
  <wa-badge appearance="filled-outlined" variant="warning">Filled-Outlined</wa-badge>
  <wa-badge appearance="filled" variant="warning">Filled</wa-badge>
  <wa-badge appearance="outlined" variant="warning">Outlined</wa-badge>
</div>
<div>
  <wa-badge appearance="accent" variant="danger">Accent</wa-badge>
  <wa-badge appearance="filled-outlined" variant="danger">Filled-Outlined</wa-badge>
  <wa-badge appearance="filled" variant="danger">Filled</wa-badge>
  <wa-badge appearance="outlined" variant="danger">Outlined</wa-badge>
</div>
```

### Size

Badges are sized relative to the current font size. You can set `font-size` on any badge (or an ancestor element) to change it.

```html
<wa-badge variant="brand" style="font-size: var(--wa-font-size-xs);">Brand</wa-badge>
<wa-badge variant="brand" style="font-size: var(--wa-font-size-s);">Brand</wa-badge>
<wa-badge variant="brand" style="font-size: var(--wa-font-size-m);">Brand</wa-badge>
<wa-badge variant="brand" style="font-size: var(--wa-font-size-l);">Brand</wa-badge>
<wa-badge variant="brand" style="font-size: var(--wa-font-size-xl);">Brand</wa-badge>
```

### Pill Badges

Use the `pill` attribute to give badges rounded edges.

```html
<wa-badge variant="brand" pill>Brand</wa-badge>
<wa-badge variant="success" pill>Success</wa-badge>
<wa-badge variant="neutral" pill>Neutral</wa-badge>
<wa-badge variant="warning" pill>Warning</wa-badge>
<wa-badge variant="danger" pill>Danger</wa-badge>
```

### Drawing Attention

Use the `attention` attribute to draw attention to the badge with a subtle animation. Supported effects are `bounce`, `pulse` and `none`.

```html
<div class="badge-attention">
  <wa-badge variant="brand" attention="pulse" pill>1</wa-badge>
  <wa-badge variant="success" attention="pulse" pill>1</wa-badge>
  <wa-badge variant="neutral" attention="pulse" pill>1</wa-badge>
  <wa-badge variant="warning" attention="pulse" pill>1</wa-badge>
  <wa-badge variant="danger" attention="pulse" pill>1</wa-badge>
</div>

<div class="badge-attention">
  <wa-badge variant="brand" attention="bounce" pill>1</wa-badge>
  <wa-badge variant="success" attention="bounce" pill>1</wa-badge>
  <wa-badge variant="neutral" attention="bounce" pill>1</wa-badge>
  <wa-badge variant="warning" attention="bounce" pill>1</wa-badge>
  <wa-badge variant="danger" attention="bounce" pill>1</wa-badge>
</div>

<style>
  .badge-attention {
    margin-block-end: var(--wa-space-m);

    wa-badge:not(:last-of-type) {
      margin-right: 1rem;
    }
  }
</style>
```

### Start & End Decorations

Use the `start` and `end` slots to add presentational elements like [`<wa-icon>`](https://webawesome.com/docs/components/icon) alongside the badge's label.

```html
<wa-badge>
  <wa-icon slot="start" name="seedling"></wa-icon>
  Start
</wa-badge>
<wa-badge>
  <wa-icon slot="end" name="tree"></wa-icon>
  End
</wa-badge>
<wa-badge>
  <wa-icon slot="start" name="cow"></wa-icon>
  <wa-icon slot="end" name="meteor"></wa-icon>
  Both
</wa-badge>
```

### With Buttons

One of the most common use cases for badges is attaching them to buttons. To make this easier, badges will be automatically positioned at the top-right when they're a child of a button.

```html
<wa-button appearance="filled">
  Requests
  <wa-badge pill>30</wa-badge>
</wa-button>

<wa-button appearance="filled" style="margin-inline-start: 1rem;">
  Warnings
  <wa-badge variant="warning" pill>8</wa-badge>
</wa-button>

<wa-button appearance="filled" style="margin-inline-start: 1rem;">
  Errors
  <wa-badge variant="danger" pill>6</wa-badge>
</wa-button>
```
