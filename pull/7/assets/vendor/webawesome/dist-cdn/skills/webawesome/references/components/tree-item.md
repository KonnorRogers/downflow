# Tree Item

`<wa-tree-item>`

Stable [Navigation](https://webawesome.com/docs/components/?category=navigation) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Tree items represent a single hierarchical node inside a tree, and can contain nested items that expand and collapse.

This component must be used as a child of [`<wa-tree>`](https://webawesome.com/docs/components/tree). Please see the [Tree docs](https://webawesome.com/docs/components/tree) to see examples of this component in action.

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/tree-item/tree-item.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/tree-item/tree-item.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/tree-item/tree-item.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaTreeItem from '@awesome.me/webawesome/dist/react/tree-item/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The default slot.
- `expand-icon` — The icon to show when the tree item is expanded.
- `collapse-icon` — The icon to show when the tree item is collapsed.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `expanded` | `expanded` | Expands the tree item. | `boolean` | `false` |
| `selected` | `selected` | Draws the tree item in a selected state. | `boolean` | `false` |
| `disabled` | `disabled` | Disables the tree item. | `boolean` | `false` |
| `lazy` | `lazy` | Enables lazy loading behavior. | `boolean` | `false` |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `getChildrenItems()` | Gets all the nested tree items in this node. | `{ includeDisabled = true }: { includeDisabled?: boolean }` |

## Events

| Name | Description |
| --- | --- |
| `wa-expand` | Emitted when the tree item expands. |
| `wa-after-expand` | Emitted after the tree item expands and all animations are complete. |
| `wa-collapse` | Emitted when the tree item collapses. |
| `wa-after-collapse` | Emitted after the tree item collapses and all animations are complete. |
| `wa-lazy-change` | Emitted when the tree item's lazy state changes. |
| `wa-lazy-load` | Emitted when a lazy item is selected. Use this event to asynchronously load data and append items to the tree before expanding. After appending new items, remove the `lazy` attribute to remove the loading state and update the tree. |

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--hide-duration\` | \`var(--wa-transition-normal)\` The animation duration when collapsing tree items. Default |
| \`--show-duration\` | \`var(--wa-transition-normal)\` The animation duration when expanding tree items. Default |

## Custom States

| Name | Description | CSS selector |
| --- | --- | --- |
| `disabled` | Applied when the tree item is disabled. | `:state(disabled)` |
| `expanded` | Applied when the tree item is expanded. | `:state(expanded)` |
| `indeterminate` | Applied when the selection is indeterminate. | `:state(indeterminate)` |
| `selected` | Applied when the tree item is selected. | `:state(selected)` |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The component's base wrapper. | \`::part(base)\` |
| \`checkbox\` | The checkbox that shows when using multiselect. | \`::part(checkbox)\` |
| \`checkbox\_\_base\` | \`base\` The checkbox's exported part. | \`::part(checkbox\_\_base)\` |
| \`checkbox\_\_checked-icon\` | \`checked-icon\` The checkbox's exported part. | \`::part(checkbox\_\_checked-icon)\` |
| \`checkbox\_\_control\` | \`control\` The checkbox's exported part. | \`::part(checkbox\_\_control)\` |
| \`checkbox\_\_indeterminate-icon\` | \`indeterminate-icon\` The checkbox's exported part. | \`::part(checkbox\_\_indeterminate-icon)\` |
| \`checkbox\_\_label\` | \`label\` The checkbox's exported part. | \`::part(checkbox\_\_label)\` |
| \`children\` | The container that wraps the tree item's nested children. | \`::part(children)\` |
| \`expand-button\` | The container that wraps the tree item's expand button and spinner. | \`::part(expand-button)\` |
| \`indentation\` | The tree item's indentation container. | \`::part(indentation)\` |
| \`item\` | The tree item's container. This element wraps everything except slotted tree item children. | \`::part(item)\` |
| \`label\` | The tree item's label. | \`::part(label)\` |
| \`spinner\` | The spinner that shows when a lazy tree item is in the loading state. | \`::part(spinner)\` |
| \`spinner\_\_base\` | The spinner's base part. | \`::part(spinner\_\_base)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-checkbox>`](https://webawesome.com/docs/components/checkbox)
-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)
-   [`<wa-spinner>`](https://webawesome.com/docs/components/spinner)