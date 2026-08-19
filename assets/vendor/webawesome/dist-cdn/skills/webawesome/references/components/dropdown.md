# Dropdown

`<wa-dropdown>`

Stable [Actions](https://webawesome.com/docs/components/?category=actions) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Dropdowns display a list of options triggered by a button or other element. They support keyboard navigation, submenus, and checkable items for building menus and context actions.

Dropdowns consist of a trigger and a panel. By default, activating the trigger will expose the panel and interacting outside of the panel will close it.

Dropdowns are designed to work well with [dropdown items](https://webawesome.com/docs/components/dropdown-item) to provide a list of options the user can select from. However, dropdowns can also be used in lower-level applications. The API gives you complete control over showing, hiding, and positioning the panel.

```html
<wa-dropdown>
  <wa-button appearance="filled" slot="trigger" with-caret>Dropdown</wa-button>

  <wa-dropdown-item>
    <wa-icon slot="icon" name="scissors"></wa-icon>
    Cut
  </wa-dropdown-item>
  <wa-dropdown-item>
    <wa-icon slot="icon" name="copy"></wa-icon>
    Copy
  </wa-dropdown-item>
  <wa-dropdown-item>
    <wa-icon slot="icon" name="paste"></wa-icon>
    Paste
  </wa-dropdown-item>
  <wa-divider></wa-divider>
  <wa-dropdown-item>
    Show images
    <wa-dropdown-item slot="submenu" value="show-all-images">Show All Images</wa-dropdown-item>
    <wa-dropdown-item slot="submenu" value="show-thumbnails">Show Thumbnails</wa-dropdown-item>
  </wa-dropdown-item>
  <wa-divider></wa-divider>
  <wa-dropdown-item type="checkbox" checked>Emoji Shortcuts</wa-dropdown-item>
  <wa-dropdown-item type="checkbox" checked>Word Wrap</wa-dropdown-item>
  <wa-divider></wa-divider>
  <wa-dropdown-item variant="danger">
    <wa-icon slot="icon" name="trash"></wa-icon>
    Delete
  </wa-dropdown-item>
</wa-dropdown>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/dropdown/dropdown.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/dropdown/dropdown.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/dropdown/dropdown.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaDropdown from '@awesome.me/webawesome/dist/react/dropdown/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The dropdown's items, typically `<wa-dropdown-item>` elements.
- `trigger` — The element that triggers the dropdown, such as a `<wa-button>` or `<button>`.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `open` | `open` | Opens or closes the dropdown. | `boolean` | `false` |
| `size` | `size` | The dropdown's size. | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'small' \| 'medium' \| 'large'` | `'m'` |
| `placement` | `placement` | The placement of the dropdown menu in reference to the trigger. The menu will shift to a more optimal location if the preferred placement doesn't have enough room. | `\| 'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'right' \| 'right-start' \| 'right-end' \| 'left' \| 'left-start' \| 'left-end'` | `'bottom-start'` |
| `distance` | `distance` | The distance of the dropdown menu from its trigger. | `number` | `0` |
| `skidding` | `skidding` | The offset of the dropdown menu along its trigger. | `number` | `0` |

## Events

| Name | Description |
| --- | --- |
| `wa-show` | Emitted when the dropdown is about to show. |
| `wa-after-show` | Emitted after the dropdown has been shown. |
| `wa-hide` | Emitted when the dropdown is about to hide. |
| `wa-after-hide` | Emitted after the dropdown has been hidden. |
| `wa-select` | Emitted when an item in the dropdown is selected. |

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--hide-duration\` | The duration of the hide animation. |
| \`--show-duration\` | The duration of the show animation. |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The component's host element. | \`::part(base)\` |
| \`menu\` | The dropdown menu container. | \`::part(menu)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-dropdown-item>`](https://webawesome.com/docs/components/dropdown-item)
-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)
-   [`<wa-popup>`](https://webawesome.com/docs/components/popup)

## Examples

### Getting the Selected Item

When an item is selected, the `wa-select` event will be emitted by the dropdown. You can inspect `event.detail.item` to get a reference to the selected item. If you've provided a value for each [dropdown item](https://webawesome.com/docs/components/dropdown-item), it will be available in `event.detail.item.value`.

```html
<div class="dropdown-selection">
  <wa-dropdown>
    <wa-button appearance="filled" slot="trigger" with-caret>View</wa-button>
    <wa-dropdown-item value="full-screen">Enter full screen</wa-dropdown-item>
    <wa-dropdown-item value="actual">Actual size</wa-dropdown-item>
    <wa-dropdown-item value="zoom-in">Zoom in</wa-dropdown-item>
    <wa-dropdown-item value="zoom-out">Zoom out</wa-dropdown-item>
  </wa-dropdown>
</div>

<script>
  const container = document.querySelector('.dropdown-selection');
  const dropdown = container.querySelector('wa-dropdown');

  dropdown.addEventListener('wa-select', event => {
    console.log(event.detail.item.value);
  });
</script>
```

To keep the dropdown open after selection, call `event.preventDefault()` in the `wa-select` event's callback.

### Showing Icons

Use the `icon` slot to add icons to [dropdown items](https://webawesome.com/docs/components/dropdown-item). This works best with [icon](https://webawesome.com/docs/components/icon) elements.

```html
<wa-dropdown>
  <wa-button appearance="filled" slot="trigger" with-caret>Edit</wa-button>

  <wa-dropdown-item value="cut">
    <wa-icon slot="icon" name="scissors"></wa-icon>
    Cut
  </wa-dropdown-item>

  <wa-dropdown-item value="copy">
    <wa-icon slot="icon" name="copy"></wa-icon>
    Copy
  </wa-dropdown-item>

  <wa-dropdown-item value="paste">
    <wa-icon slot="icon" name="paste"></wa-icon>
    Paste
  </wa-dropdown-item>

  <wa-dropdown-item value="delete" variant="danger">
    <wa-icon slot="icon" name="trash"></wa-icon>
    Delete
  </wa-dropdown-item>
</wa-dropdown>
```

### Showing Labels & Dividers

Use any heading, e.g. `<h1>`–`<h6>` to add labels and the [`<wa-divider>`](https://webawesome.com/docs/components/divider) element for separators.

```html
<wa-dropdown>
  <wa-button appearance="filled" slot="trigger" with-caret>Device</wa-button>

  <h3>Type</h3>
  <wa-dropdown-item value="phone">Phone</wa-dropdown-item>
  <wa-dropdown-item value="tablet">Tablet</wa-dropdown-item>
  <wa-dropdown-item value="desktop">Desktop</wa-dropdown-item>

  <wa-divider></wa-divider>

  <wa-dropdown-item value="more">More options…</wa-dropdown-item>
</wa-dropdown>
```

### Showing Details

Use the `details` slot to display details, such as keyboard shortcuts, inside [dropdown items](https://webawesome.com/docs/components/dropdown-item).

```html
<wa-dropdown>
  <wa-button appearance="filled" slot="trigger" with-caret>Message</wa-button>

  <wa-dropdown-item value="reply">
    Reply
    <span slot="details">⌘R</span>
  </wa-dropdown-item>

  <wa-dropdown-item value="forward">
    Forward
    <span slot="details">⌘F</span>
  </wa-dropdown-item>

  <wa-dropdown-item value="move">
    Move
    <span slot="details">⌘M</span>
  </wa-dropdown-item>

  <wa-divider></wa-divider>

  <wa-dropdown-item value="archive">
    Archive
    <span slot="details">⌘A</span>
  </wa-dropdown-item>

  <wa-dropdown-item value="delete" variant="danger">
    Delete
    <span slot="details">Del</span>
  </wa-dropdown-item>
</wa-dropdown>
```

### Checkable Items

You can turn a [dropdown item](https://webawesome.com/docs/components/dropdown-item) into a checkable option by setting `type="checkbox"`. Add the `checked` attribute to make it checked initially. When clicked, the item's checked state will toggle and the dropdown will close. You can cancel the `wa-select` event if you want to keep it open instead.

```html
<div class="dropdown-checkboxes">
  <wa-dropdown>
    <wa-button appearance="filled" slot="trigger" with-caret>View</wa-button>

    <wa-dropdown-item type="checkbox" value="canvas" checked>Show canvas</wa-dropdown-item>
    <wa-dropdown-item type="checkbox" value="grid" checked>Show grid</wa-dropdown-item>
    <wa-dropdown-item type="checkbox" value="source">Show source</wa-dropdown-item>

    <wa-divider></wa-divider>

    <wa-dropdown-item value="preferences">Preferences…</wa-dropdown-item>
  </wa-dropdown>
</div>

<script>
  const container = document.querySelector('.dropdown-checkboxes');
  const dropdown = container.querySelector('wa-dropdown');

  dropdown.addEventListener('wa-select', event => {
    if (event.detail.item.type === 'checkbox') {
      // Checkbox
      console.log(event.detail.item.value, event.detail.item.checked ? 'checked' : 'unchecked');
    } else {
      // Not a checkbox
      console.log(event.detail.item.value);
    }
  });
</script>
```

When a checkable option exists anywhere in the dropdown, all items will receive additional padding so they align properly.

### Destructive Items

Add `variant="danger"` to any [dropdown item](https://webawesome.com/docs/components/dropdown-item) to highlight that it's a dangerous action.

```html
<wa-dropdown>
  <wa-button appearance="filled" slot="trigger" with-caret>Project</wa-button>

  <wa-dropdown-item value="share">
    <wa-icon slot="icon" name="share"></wa-icon>
    Share
  </wa-dropdown-item>

  <wa-dropdown-item value="preferences">
    <wa-icon slot="icon" name="gear"></wa-icon>
    Preferences
  </wa-dropdown-item>

  <wa-divider></wa-divider>

  <h3>Danger zone</h3>

  <wa-dropdown-item value="archive">
    <wa-icon slot="icon" name="archive"></wa-icon>
    Archive
  </wa-dropdown-item>

  <wa-dropdown-item value="delete" variant="danger">
    <wa-icon slot="icon" name="trash"></wa-icon>
    Delete
  </wa-dropdown-item>
</wa-dropdown>
```

### Placement

The preferred placement of the dropdown can be set with the `placement` attribute. Note that the actual position may vary to ensure the panel remains in the viewport.

```html
<wa-dropdown placement="right-start">
  <wa-button appearance="filled" slot="trigger">
    File formats
    <wa-icon slot="end" name="chevron-right"></wa-icon>
  </wa-button>

  <wa-dropdown-item value="pdf">PDF Document</wa-dropdown-item>
  <wa-dropdown-item value="docx">Word Document</wa-dropdown-item>
  <wa-dropdown-item value="xlsx">Excel Spreadsheet</wa-dropdown-item>
  <wa-dropdown-item value="pptx">PowerPoint Presentation</wa-dropdown-item>
  <wa-dropdown-item value="txt">Plain Text</wa-dropdown-item>
  <wa-dropdown-item value="json">JSON File</wa-dropdown-item>
</wa-dropdown>
```

### Distance

The distance from the panel to the trigger can be customized using the `distance` attribute. This value is specified in pixels.

```html
<wa-dropdown distance="30">
  <wa-button appearance="filled" slot="trigger" with-caret>Edit</wa-button>

  <wa-dropdown-item>Cut</wa-dropdown-item>
  <wa-dropdown-item>Copy</wa-dropdown-item>
  <wa-dropdown-item>Paste</wa-dropdown-item>

  <wa-divider></wa-divider>

  <wa-dropdown-item>Find</wa-dropdown-item>
  <wa-dropdown-item>Replace</wa-dropdown-item>
</wa-dropdown>
```

### Offset

The offset of the panel along the trigger can be customized using the `skidding` attribute. This value is specified in pixels.

```html
<wa-dropdown skidding="30">
  <wa-button appearance="filled" slot="trigger" with-caret>Edit</wa-button>

  <wa-dropdown-item>Cut</wa-dropdown-item>
  <wa-dropdown-item>Copy</wa-dropdown-item>
  <wa-dropdown-item>Paste</wa-dropdown-item>

  <wa-divider></wa-divider>

  <wa-dropdown-item>Find</wa-dropdown-item>
  <wa-dropdown-item>Replace</wa-dropdown-item>
</wa-dropdown>
```

### Submenus

To create submenus, nest [dropdown items](https://webawesome.com/docs/components/dropdown-item) inside of a dropdown item and assign `slot="submenu"` to each one. You can also add [dividers](https://webawesome.com/docs/components/divider) as needed.

```html
<div class="dropdown-submenus">
  <wa-dropdown>
    <wa-button appearance="filled" slot="trigger" with-caret>Export</wa-button>

    <wa-dropdown-item>
      Documents
      <wa-dropdown-item slot="submenu" value="pdf">PDF</wa-dropdown-item>
      <wa-dropdown-item slot="submenu" value="docx">Word Document</wa-dropdown-item>
    </wa-dropdown-item>

    <wa-dropdown-item>
      Spreadsheets
      <wa-dropdown-item slot="submenu">
        Excel Formats
        <wa-dropdown-item slot="submenu" value="xlsx">Excel (.xlsx)</wa-dropdown-item>
        <wa-dropdown-item slot="submenu" value="xls">Excel 97-2003 (.xls)</wa-dropdown-item>
        <wa-dropdown-item slot="submenu" value="csv">CSV (.csv)</wa-dropdown-item>
      </wa-dropdown-item>

      <wa-dropdown-item slot="submenu">
        Other Formats
        <wa-dropdown-item slot="submenu" value="ods">OpenDocument (.ods)</wa-dropdown-item>
        <wa-dropdown-item slot="submenu" value="tsv">Tab-separated (.tsv)</wa-dropdown-item>
        <wa-dropdown-item slot="submenu" value="json">JSON (.json)</wa-dropdown-item>
      </wa-dropdown-item>

      <wa-dropdown-item slot="submenu" value="numbers">Apple Numbers</wa-dropdown-item>
    </wa-dropdown-item>

    <wa-divider></wa-divider>

    <wa-dropdown-item>
      Options
      <wa-dropdown-item slot="submenu" type="checkbox" value="compress">Compress files</wa-dropdown-item>
      <wa-dropdown-item slot="submenu" type="checkbox" checked value="metadata">Include metadata</wa-dropdown-item>
      <wa-dropdown-item slot="submenu" type="checkbox" value="password">Password protect</wa-dropdown-item>
    </wa-dropdown-item>
  </wa-dropdown>
</div>

<script>
  const container = document.querySelector('.dropdown-submenus');
  const dropdown = container.querySelector('wa-dropdown');

  dropdown.addEventListener('wa-select', event => {
    console.log(event.detail.item.value);
  });
</script>
```

Dropdown items that have a submenu will not dispatch the `wa-select` event. However, items inside the submenu will, unless they also have a submenu.

As a UX best practice, avoid using more than one level of submenu when possible.

### Disabling Items

Add the `disabled` attribute to any [dropdown item](https://webawesome.com/docs/components/dropdown-item) to disable it.

```html
<wa-dropdown>
  <wa-button appearance="filled" slot="trigger" with-caret>Payment method</wa-button>

  <wa-dropdown-item value="cash">Cash</wa-dropdown-item>
  <wa-dropdown-item value="check" disabled>Personal check</wa-dropdown-item>
  <wa-dropdown-item value="credit">Credit card</wa-dropdown-item>
  <wa-dropdown-item value="gift-card">Gift card</wa-dropdown-item>
</wa-dropdown>
```
