# Tab Group

`<wa-tab-group>`

Stable [Navigation](https://webawesome.com/docs/components/?category=navigation) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Tab groups organize related content into a single container that displays one panel at a time, with tabs for switching between them.

Tab groups make use of [tabs](https://webawesome.com/docs/components/tab) and [tab panels](https://webawesome.com/docs/components/tab-panel). Each panel should have a name that's unique within the tab group, and tabs should have a `panel` attribute that points to the respective panel's name.

```html
<wa-tab-group>
  <wa-tab panel="general">General</wa-tab>
  <wa-tab panel="custom">Custom</wa-tab>
  <wa-tab panel="advanced">Advanced</wa-tab>
  <wa-tab panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general" active>This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/tab-group/tab-group.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/tab-group/tab-group.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/tab-group/tab-group.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaTabGroup from '@awesome.me/webawesome/dist/react/tab-group/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — Used for grouping tab panels in the tab group. Must be `<wa-tab-panel>` elements.
- `nav` — Used for grouping tabs in the tab group. Must be `<wa-tab>` elements. Note that `<wa-tab>` will set this slot on itself automatically.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `defaultSlot` | — | Default slot for `<wa-tab-panel>` children (inside the `body` part container). | `HTMLSlotElement` | — |
| `active` | `active` | Sets the active tab. | `string` | `''` |
| `placement` | `placement` | The placement of the tabs. | `'top' \| 'bottom' \| 'start' \| 'end'` | `'top'` |
| `activation` | `activation` | When set to auto, navigating tabs with the arrow keys will instantly show the corresponding tab panel. When set to manual, the tab will receive focus but will not show until the user presses spacebar or enter. | `'auto' \| 'manual'` | `'auto'` |
| `withoutScrollControls` | `without-scroll-controls` | Disables the scroll arrows that appear when tabs overflow. | `boolean` | `false` |

## Events

| Name | Description |
| --- | --- |
| `wa-tab-show` | Emitted when a tab is shown. |
| `wa-tab-hide` | Emitted when a tab is hidden. |

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--indicator-color\` | The color of the active tab indicator. |
| \`--track-color\` | The color of the indicator's track (the line that separates tabs from panels). |
| \`--track-width\` | The width of the indicator's track (the line that separates tabs from panels). |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The component's base wrapper. | \`::part(base)\` |
| \`body\` | The tab group's body where tab panels are slotted in. | \`::part(body)\` |
| \`nav\` | The tab group's navigation container where tabs are slotted in. | \`::part(nav)\` |
| \`scroll-button\` | \`\` The previous/next scroll buttons that show when tabs are scrollable, a . | \`::part(scroll-button)\` |
| \`scroll-button\_\_base\` | \`base\` The scroll button's exported part. | \`::part(scroll-button\_\_base)\` |
| \`scroll-button-end\` | The ending scroll button. | \`::part(scroll-button-end)\` |
| \`scroll-button-start\` | The starting scroll button. | \`::part(scroll-button-start)\` |
| \`tabs\` | The container that wraps the tabs. | \`::part(tabs)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-button>`](https://webawesome.com/docs/components/button)
-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)
-   [`<wa-spinner>`](https://webawesome.com/docs/components/spinner)
-   [`<wa-tab>`](https://webawesome.com/docs/components/tab)
-   [`<wa-tab-panel>`](https://webawesome.com/docs/components/tab-panel)

## SSR

Learn more about [Server-Side Rendering (SSR)](https://webawesome.com/docs/ssr).

During SSR, `<wa-tab-group>` can't access its children to determine which tab is active. To render the correct panel, manually set the `active` attribute on the matching [`<wa-tab>`](https://webawesome.com/docs/components/tab) and [`<wa-tab-panel>`](https://webawesome.com/docs/components/tab-panel).

## Examples

### Setting the Active Tab

To make a tab active, set the `active` attribute to the name of the appropriate panel.

```html
<wa-tab-group active="advanced">
  <wa-tab panel="general">General</wa-tab>
  <wa-tab panel="custom">Custom</wa-tab>
  <wa-tab panel="advanced">Advanced</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
</wa-tab-group>
```

### Tabs on Bottom

Tabs can be shown on the bottom by setting `placement` to `bottom`.

```html
<wa-tab-group placement="bottom">
  <wa-tab panel="general">General</wa-tab>
  <wa-tab panel="custom">Custom</wa-tab>
  <wa-tab panel="advanced">Advanced</wa-tab>
  <wa-tab panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>
```

### Tabs on Start

Tabs can be shown on the starting side by setting `placement` to `start`.

```html
<wa-tab-group placement="start">
  <wa-tab panel="general">General</wa-tab>
  <wa-tab panel="custom">Custom</wa-tab>
  <wa-tab panel="advanced">Advanced</wa-tab>
  <wa-tab panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>
```

### Tabs on End

Tabs can be shown on the ending side by setting `placement` to `end`.

```html
<wa-tab-group placement="end">
  <wa-tab panel="general">General</wa-tab>
  <wa-tab panel="custom">Custom</wa-tab>
  <wa-tab panel="advanced">Advanced</wa-tab>
  <wa-tab panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>
```

### Closable Tabs

You can make a tab closable by adding a close button next to the tab and inside the `nav` slot. You can position the button to your liking with CSS and handle close/restore behaviors by removing/appending the tab as desired. Note the use of `tabindex="-1"`, which prevents the close button from interfering with the tab order. The close button is still recognizable to the virtual cursor in screen readers.

```html
<wa-tab-group class="tabs-closable">
  <wa-tab panel="general">General</wa-tab>
  <wa-tab panel="closable">Closable</wa-tab>
  <wa-button slot="nav" tabindex="-1" appearance="plain" size="s">
    <wa-icon name="xmark" label="Close the closable tab"></wa-icon>
  </wa-button>
  <wa-tab panel="closable-2">Advanced</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="closable">This is the closable tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
</wa-tab-group>

<br />

<wa-button disabled>Restore tab</wa-button>

<style>
  .tabs-closable wa-button {
    position: relative;
    left: -1.5em;
    top: 0.675em;
  }
</style>

<script>
  const tabGroup = document.querySelector('.tabs-closable');
  const generalTab = tabGroup.querySelectorAll('wa-tab')[0];
  const closableTab = tabGroup.querySelectorAll('wa-tab')[1];
  const closeButton = tabGroup.querySelector('wa-button');
  const restoreButton = tabGroup.nextElementSibling.nextElementSibling;

  // Remove the tab when the close button is clicked
  closeButton.addEventListener('click', () => {
    closableTab.remove();
    closeButton.remove();
    restoreButton.disabled = false;
  });

  // Restore the tab
  restoreButton.addEventListener('click', () => {
    restoreButton.disabled = true;
    generalTab.insertAdjacentElement('afterend', closeButton);
    generalTab.insertAdjacentElement('afterend', closableTab);
  });
</script>
```

### Scrolling Tabs

When there are more tabs than horizontal space allows, the nav will be scrollable.

```html
<wa-tab-group>
  <wa-tab panel="tab-1">Tab 1</wa-tab>
  <wa-tab panel="tab-2">Tab 2</wa-tab>
  <wa-tab panel="tab-3">Tab 3</wa-tab>
  <wa-tab panel="tab-4">Tab 4</wa-tab>
  <wa-tab panel="tab-5">Tab 5</wa-tab>
  <wa-tab panel="tab-6">Tab 6</wa-tab>
  <wa-tab panel="tab-7">Tab 7</wa-tab>
  <wa-tab panel="tab-8">Tab 8</wa-tab>
  <wa-tab panel="tab-9">Tab 9</wa-tab>
  <wa-tab panel="tab-10">Tab 10</wa-tab>
  <wa-tab panel="tab-11">Tab 11</wa-tab>
  <wa-tab panel="tab-12">Tab 12</wa-tab>
  <wa-tab panel="tab-13">Tab 13</wa-tab>
  <wa-tab panel="tab-14">Tab 14</wa-tab>
  <wa-tab panel="tab-15">Tab 15</wa-tab>
  <wa-tab panel="tab-16">Tab 16</wa-tab>
  <wa-tab panel="tab-17">Tab 17</wa-tab>
  <wa-tab panel="tab-18">Tab 18</wa-tab>
  <wa-tab panel="tab-19">Tab 19</wa-tab>
  <wa-tab panel="tab-20">Tab 20</wa-tab>

  <wa-tab-panel name="tab-1">Tab panel 1</wa-tab-panel>
  <wa-tab-panel name="tab-2">Tab panel 2</wa-tab-panel>
  <wa-tab-panel name="tab-3">Tab panel 3</wa-tab-panel>
  <wa-tab-panel name="tab-4">Tab panel 4</wa-tab-panel>
  <wa-tab-panel name="tab-5">Tab panel 5</wa-tab-panel>
  <wa-tab-panel name="tab-6">Tab panel 6</wa-tab-panel>
  <wa-tab-panel name="tab-7">Tab panel 7</wa-tab-panel>
  <wa-tab-panel name="tab-8">Tab panel 8</wa-tab-panel>
  <wa-tab-panel name="tab-9">Tab panel 9</wa-tab-panel>
  <wa-tab-panel name="tab-10">Tab panel 10</wa-tab-panel>
  <wa-tab-panel name="tab-11">Tab panel 11</wa-tab-panel>
  <wa-tab-panel name="tab-12">Tab panel 12</wa-tab-panel>
  <wa-tab-panel name="tab-13">Tab panel 13</wa-tab-panel>
  <wa-tab-panel name="tab-14">Tab panel 14</wa-tab-panel>
  <wa-tab-panel name="tab-15">Tab panel 15</wa-tab-panel>
  <wa-tab-panel name="tab-16">Tab panel 16</wa-tab-panel>
  <wa-tab-panel name="tab-17">Tab panel 17</wa-tab-panel>
  <wa-tab-panel name="tab-18">Tab panel 18</wa-tab-panel>
  <wa-tab-panel name="tab-19">Tab panel 19</wa-tab-panel>
  <wa-tab-panel name="tab-20">Tab panel 20</wa-tab-panel>
</wa-tab-group>
```

### Manual Activation

When focused, keyboard users can press Left or Right to select the desired tab. By default, the corresponding tab panel will be shown immediately (automatic activation). You can change this behavior by setting `activation="manual"` which will require the user to press Space or Enter before showing the tab panel (manual activation).

```html
<wa-tab-group activation="manual">
  <wa-tab panel="general">General</wa-tab>
  <wa-tab panel="custom">Custom</wa-tab>
  <wa-tab panel="advanced">Advanced</wa-tab>
  <wa-tab panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>
```
