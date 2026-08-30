# Tag

`<wa-tag>`

Stable [Feedback](https://webawesome.com/docs/components/?category=feedback) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Tags label, categorize, or represent selections with a compact visual marker. Use them for status indicators, filters, or removable chips.

```html
<wa-tag variant="brand">Brand</wa-tag>
<wa-tag variant="success">Success</wa-tag>
<wa-tag variant="neutral">Neutral</wa-tag>
<wa-tag variant="warning">Warning</wa-tag>
<wa-tag variant="danger">Danger</wa-tag>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/tag/tag.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/tag/tag.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/tag/tag.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaTag from '@awesome.me/webawesome/dist/react/tag/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The tag's content.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | The tag's theme variant. Defaults to `neutral` if not within another element with a variant. | `'brand' \| 'neutral' \| 'success' \| 'warning' \| 'danger'` | `'neutral'` |
| `appearance` | `appearance` | The tag's visual appearance. | `'accent' \| 'filled' \| 'outlined' \| 'filled-outlined'` | `'filled-outlined'` |
| `size` | `size` | The tag's size. | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'small' \| 'medium' \| 'large'` | `'m'` |
| `pill` | `pill` | Draws a pill-style tag with rounded edges. | `boolean` | `false` |
| `withRemove` | `with-remove` | Makes the tag removable and shows a remove button. | `boolean` | `false` |

## Events

| Name | Description |
| --- | --- |
| `wa-remove` | Emitted when the remove button is activated. |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The component's base wrapper. | \`::part(base)\` |
| \`content\` | The tag's content. | \`::part(content)\` |
| \`remove-button\` | \`\` The tag's remove button, a . | \`::part(remove-button)\` |
| \`remove-button\_\_base\` | \`base\` The remove button's exported part. | \`::part(remove-button\_\_base)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-button>`](https://webawesome.com/docs/components/button)
-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)
-   [`<wa-spinner>`](https://webawesome.com/docs/components/spinner)

## Examples

### Appearance

Use the `size` attribute to change a tag's visual appearance. The default appearance is `filled-outlined`.

```html
<div class="wa-stack">
  <p>
    <wa-tag variant="brand" appearance="accent">Accent</wa-tag>
    <wa-tag variant="brand" appearance="filled-outlined">Filled-Outlined</wa-tag>
    <wa-tag variant="brand" appearance="filled">Filled</wa-tag>
    <wa-tag variant="brand" appearance="outlined">Outlined</wa-tag>
  </p>
  <p>
    <wa-tag variant="success" appearance="accent">Accent</wa-tag>
    <wa-tag variant="success" appearance="filled-outlined">Filled-Outlined</wa-tag>
    <wa-tag variant="success" appearance="filled">Filled</wa-tag>
    <wa-tag variant="success" appearance="outlined">Outlined</wa-tag>
  </p>

  <p>
    <wa-tag variant="neutral" appearance="accent">Accent</wa-tag>
    <wa-tag variant="neutral" appearance="filled-outlined">Filled-Outlined</wa-tag>
    <wa-tag variant="neutral" appearance="filled">Filled</wa-tag>
    <wa-tag variant="neutral" appearance="outlined">Outlined</wa-tag>
  </p>

  <p>
    <wa-tag variant="warning" appearance="accent">Accent</wa-tag>
    <wa-tag variant="warning" appearance="filled-outlined">Filled-Outlined</wa-tag>
    <wa-tag variant="warning" appearance="filled">Filled</wa-tag>
    <wa-tag variant="warning" appearance="outlined">Outlined</wa-tag>
  </p>

  <p>
    <wa-tag variant="danger" appearance="accent">Accent</wa-tag>
    <wa-tag variant="danger" appearance="filled-outlined">Filled-Outlined</wa-tag>
    <wa-tag variant="danger" appearance="filled">Filled</wa-tag>
    <wa-tag variant="danger" appearance="outlined">Outlined</wa-tag>
  </p>
</div>
```

### Sizes

Use the `size` attribute to change a tag's size.

```html
<wa-tag size="xs">Extra Small</wa-tag>
<wa-tag size="s">Small</wa-tag>
<wa-tag size="m">Medium</wa-tag>
<wa-tag size="l">Large</wa-tag>
<wa-tag size="xl">Extra Large</wa-tag>
```

### Pill

Use the `pill` attribute to give tabs rounded edges.

```html
<wa-tag size="xs" pill>Extra Small</wa-tag>
<wa-tag size="s" pill>Small</wa-tag>
<wa-tag size="m" pill>Medium</wa-tag>
<wa-tag size="l" pill>Large</wa-tag>
<wa-tag size="xl" pill>Extra Large</wa-tag>
```

### Removable

Use the `with-remove` attribute to add a remove button to the tag.

```html
<div class="tags-removable">
  <wa-tag size="xs" with-remove>Extra Small</wa-tag>
  <wa-tag size="s" with-remove>Small</wa-tag>
  <wa-tag size="m" with-remove>Medium</wa-tag>
  <wa-tag size="l" with-remove>Large</wa-tag>
  <wa-tag size="xl" with-remove>Extra Large</wa-tag>
</div>

<script>
  const div = document.querySelector('.tags-removable');

  div.addEventListener('wa-remove', event => {
    const tag = event.target;
    tag.style.opacity = '0';
    setTimeout(() => (tag.style.opacity = '1'), 2000);
  });
</script>

<style>
  .tags-removable wa-tag {
    transition: opacity var(--wa-transition-normal);
  }
</style>
```
