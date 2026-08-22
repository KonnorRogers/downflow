# Dropdown Item

`<wa-dropdown-item>`

Stable [Actions](https://webawesome.com/docs/components/?category=actions) [Since 3.0](https://webawesome.com/docs/resources/changelog#wa_300)

Dropdown items represent selectable entries within a dropdown menu, including standard actions, checkable items, and submenu triggers.

This component must be used as a child of [`<wa-dropdown>`](https://webawesome.com/docs/components/dropdown). Please see the [Dropdown docs](https://webawesome.com/docs/components/dropdown) to see examples of this component in action.

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/dropdown-item/dropdown-item.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/dropdown-item/dropdown-item.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/dropdown-item/dropdown-item.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaDropdownItem from '@awesome.me/webawesome/dist/react/dropdown-item/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The dropdown item's label.
- `icon` — An optional icon to display before the label.
- `details` — Additional content or details to display after the label.
- `submenu` — Submenu items, typically `<wa-dropdown-item>` elements, to create a nested menu.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | The type of menu item to render. | `'danger' \| 'default'` | `'default'` |
| `value` | `value` | An optional value for the menu item. This is useful for determining which item was selected when listening to the dropdown's `wa-select` event. | `string` | — |
| `type` | `type` | Set to `checkbox` to make the item a checkbox. | `'normal' \| 'checkbox'` | `'normal'` |
| `checked` | `checked` | Set to true to check the dropdown item. Only valid when `type` is `checkbox`. | `boolean` | `false` |
| `disabled` | `disabled` | Disables the dropdown item. | `boolean` | `false` |
| `submenuOpen` | `submenuOpen` | Whether the submenu is currently open. | `boolean` | `false` |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `openSubmenu()` | Opens the submenu. | — |
| `closeSubmenu()` | Closes the submenu. | — |

## Events

| Name | Description |
| --- | --- |
| `blur` | Emitted when the dropdown item loses focus. |
| `focus` | Emitted when the dropdown item gains focus. |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`checkmark\` | \`\` The submenu indicator icon (a element). | \`::part(submenu-icon)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)