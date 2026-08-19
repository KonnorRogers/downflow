# Comparison

`<wa-comparison>`

Stable [Media](https://webawesome.com/docs/components/?category=media) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Comparisons show the visual differences between two pieces of similar content using a draggable divider. Use them for before/after images, design revisions, or side-by-side previews.

This is especially useful for comparing images, but can be used for comparing any type of content (for an example of using it to compare entire UIs, check out our [theme page](https://webawesome.com/docs/themes)). For best results, use content that shares the same dimensions. The slider can be controlled by dragging or pressing the left and right arrow keys. (Tip: press shift + arrows to move the slider in larger intervals, or home + end to jump to the beginning or end.)

```html
<wa-comparison>
  <img
    slot="before"
    src="https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80&sat=-100&bri=-5"
    alt="Grayscale version of kittens in a basket looking around."
  />
  <img
    slot="after"
    src="https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
    alt="Color version of kittens in a basket looking around."
  />
</wa-comparison>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/comparison/comparison.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/comparison/comparison.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/comparison/comparison.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaComparison from '@awesome.me/webawesome/dist/react/comparison/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `before` — The before content, often an `<img>` or `<svg>` element.
- `after` — The after content, often an `<img>` or `<svg>` element.
- `handle` — The icon used inside the handle.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `position` | `position` | The position of the divider as a percentage. | `number` | `50` |

## Events

| Name | Description |
| --- | --- |
| `change` | Emitted when the position changes. |

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--divider-width\` | The width of the dividing line. |
| \`--handle-size\` | The size of the compare handle. |

## Custom States

| Name | Description | CSS selector |
| --- | --- | --- |
| `dragging` | Applied when the comparison is being dragged. | `:state(dragging)` |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`after\` | The container that wraps the after content. | \`::part(after)\` |
| \`base\` | The container that wraps the before and after content. | \`::part(base)\` |
| \`before\` | The container that wraps the before content. | \`::part(before)\` |
| \`divider\` | The divider that separates the before and after content. | \`::part(divider)\` |
| \`handle\` | The handle that the user drags to expose the after content. | \`::part(handle)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)

## Examples

### Initial Position

Use the `position` attribute to set the initial position of the slider. This is a percentage from `0` to `100`.

```html
<wa-comparison position="25">
  <img
    slot="before"
    src="https://images.unsplash.com/photo-1520903074185-8eca362b3dce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
    alt="A person sitting on bricks wearing untied boots."
  />
  <img
    slot="after"
    src="https://images.unsplash.com/photo-1520640023173-50a135e35804?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
    alt="A person sitting on a yellow curb tying shoelaces on a boot."
  />
</wa-comparison>
```
