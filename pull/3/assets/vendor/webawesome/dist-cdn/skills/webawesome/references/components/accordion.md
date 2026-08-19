# Accordion

`<wa-accordion>`

Experimental [Layout](https://webawesome.com/docs/components/?category=layout) [Since 3.7](https://webawesome.com/docs/resources/changelog#wa_370)

Accordions are a vertically stacked set of interactive headings that each contain a title, representing a section of content.

Accordions use [accordion items](https://webawesome.com/docs/components/accordion-item) to create a vertically stacked set of expandable sections.

```html
<wa-accordion>
  <wa-accordion-item label="What is Web Awesome?">
    Web Awesome is a comprehensive library of web components you can use to build beautiful, accessible web
    applications. It's built on open web standards and works with any framework.
  </wa-accordion-item>
  <wa-accordion-item label="Is it free to use?">
    The core Web Awesome library is completely free and open source. A Pro tier is also available with additional
    components and features.
  </wa-accordion-item>
  <wa-accordion-item label="Does it work with my framework?">
    Yes! Web Awesome components are built as native web components, so they work with any framework including React,
    Vue, Angular, Svelte, or plain HTML.
  </wa-accordion-item>
</wa-accordion>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/accordion/accordion.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/accordion/accordion.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/accordion/accordion.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaAccordion from '@awesome.me/webawesome/dist/react/accordion/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — One or more `<wa-accordion-item>` elements.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `mode` | `mode` | Controls how items can be expanded. `multiple` (the default) allows any number of items to be open at once. `single` allows only one item to be open at a time; opening a new item collapses the previously open one, and clicking an open item does not collapse it. `single-collapsible` is the same as `single` except that clicking the open item collapses it, so zero open items is a valid state. | `'single' \| 'single-collapsible' \| 'multiple'` | `'multiple'` |
| `iconPlacement` | `icon-placement` | The location of the expand/collapse icon in child items. | `'start' \| 'end'` | `'end'` |
| `headingLevel` | `heading-level` | The heading level for child item triggers (1–6), or "none" to omit the heading wrapper. Defaults to 3. | `string` | `'3'` |
| `appearance` | `appearance` | The accordion's visual appearance. | `'filled' \| 'outlined' \| 'filled-outlined' \| 'plain'` | `'outlined'` |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `expandAll()` | Expands all accordion items. No-op when `mode` is `single` or `single-collapsible`. | — |
| `collapseAll()` | Collapses all accordion items. | — |

## Events

| Name | Description |
| --- | --- |
| `wa-expand` | Emitted before an item expands. Cancelable. |
| `wa-after-expand` | Emitted after an item finishes expanding. |
| `wa-collapse` | Emitted before an item collapses. Cancelable. |
| `wa-after-collapse` | Emitted after an item finishes collapsing. |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-accordion-item>`](https://webawesome.com/docs/components/accordion-item)
-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)

## Examples

### Expanded Initially

Use the `expanded` attribute on an accordion item to expand it by default.

```html
<wa-accordion>
  <wa-accordion-item label="Already open" expanded>
    This item is expanded by default. Click the header to collapse it.
  </wa-accordion-item>
  <wa-accordion-item label="Click to open">
    This item starts collapsed. Click the header to expand it.
  </wa-accordion-item>
</wa-accordion>
```

### Disabled Items

Use the `disabled` attribute on an accordion item to prevent it from being toggled.

```html
<wa-accordion>
  <wa-accordion-item label="Active item" expanded>
    This item can be expanded and collapsed normally.
  </wa-accordion-item>
  <wa-accordion-item label="Disabled item" disabled> This item is disabled and cannot be toggled. </wa-accordion-item>
</wa-accordion>
```

### Without a Heading

The [W3C accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/) recommends wrapping each accordion trigger in a heading element so screen reader users can navigate the page outline and locate accordion sections using heading navigation. Each accordion item uses an `<h3>` by default for this reason.

But if an accordion lives outside the document outline, for example, inside a nav or another component that has its own structure, set `heading-level="none"` on the accordion to omit the heading wrapper and render the button directly.

```html
<wa-accordion heading-level="none">
  <wa-accordion-item label="Settings"> Adjust your preferences here. </wa-accordion-item>
  <wa-accordion-item label="Notifications"> Manage how and when you receive notifications. </wa-accordion-item>
</wa-accordion>
```

### Heading Level

The default heading level is `3`. Use `heading-level` on the accordion to match the level to your page's hierarchy. Values outside 1–6 fall back to `3`. The heading level is a semantic choice only — the accordion inherits the surrounding font, so the visual appearance is identical at every level.

```html
<wa-accordion heading-level="2">
  <wa-accordion-item label="Section one"> This trigger is wrapped in an <code>&lt;h2&gt;</code>. </wa-accordion-item>
  <wa-accordion-item label="Section two">
    Match the level to where this accordion sits in your document outline.
  </wa-accordion-item>
</wa-accordion>
```

### Sizing

The accordion's text and expand/collapse icon scale with `font-size`. Setting `font-size` on a `<wa-accordion>` proportionally resizes the type and icon together.

```html
<wa-accordion style="font-size: 0.875rem;">
  <wa-accordion-item label="Small accordion"> Text and icon scale down together. </wa-accordion-item>
  <wa-accordion-item label="Another item">Content here.</wa-accordion-item>
</wa-accordion>

<br />

<wa-accordion>
  <wa-accordion-item label="Default accordion"> The default size. </wa-accordion-item>
  <wa-accordion-item label="Another item">Content here.</wa-accordion-item>
</wa-accordion>

<br />

<wa-accordion style="font-size: 1.25rem;">
  <wa-accordion-item label="Large accordion"> Everything scales up together. </wa-accordion-item>
  <wa-accordion-item label="Another item">Content here.</wa-accordion-item>
</wa-accordion>
```

### Appearance

Use the `appearance` attribute to change the accordion's visual appearance.

```html
<div class="wa-stack">
  <wa-accordion>
    <wa-accordion-item label="Outlined (default)">
      This is the default outlined appearance. It has a subtle border that helps it stand out without being too flashy.
    </wa-accordion-item>
    <wa-accordion-item label="Another item">More content here.</wa-accordion-item>
  </wa-accordion>

  <wa-accordion appearance="filled-outlined">
    <wa-accordion-item label="Filled-outlined">
      The filled-outlined appearance combines a filled header with an outlined body. It gives the summary a bit more
      visual weight while keeping the content area clean.
    </wa-accordion-item>
    <wa-accordion-item label="Another item">More content here.</wa-accordion-item>
  </wa-accordion>

  <wa-accordion appearance="filled">
    <wa-accordion-item label="Filled">
      The filled appearance adds a background color to the entire component. Use this when you want the details to
      really pop on the page.
    </wa-accordion-item>
    <wa-accordion-item label="Another item">More content here.</wa-accordion-item>
  </wa-accordion>

  <wa-accordion appearance="plain">
    <wa-accordion-item label="Plain">
      No bells and whistles on this one. The plain appearance strips away borders and backgrounds for a minimalist look.
    </wa-accordion-item>
    <wa-accordion-item label="Another item">More content here.</wa-accordion-item>
  </wa-accordion>
</div>
```

### Mode

Use the `mode` attribute to control how items can be expanded:

-   `multiple` (default): any number of items can be open at once, and each item toggles independently.
-   `single`: only one item can be open at a time. Opening a new item collapses the previously open one, and clicking the open item is a no-op — once an item is open, it stays open until another is opened.
-   `single-collapsible`: at most one item can be open at a time. Same as `single`, except clicking the open item closes it, so zero open items is a valid state.

```html
<wa-accordion mode="single">
  <wa-accordion-item label="Section one" expanded>
    Opening another section will automatically collapse this one. Only one section can be open at a time.
  </wa-accordion-item>
  <wa-accordion-item label="Section two">
    Try opening this section to see section one collapse automatically.
  </wa-accordion-item>
  <wa-accordion-item label="Section three">
    Clicking an already-open section won't close it — open another instead.
  </wa-accordion-item>
</wa-accordion>
```

Use `single-collapsible` when you want the same one-at-a-time constraint but still want users to be able to close every section.

```html
<wa-accordion mode="single-collapsible">
  <wa-accordion-item label="Filters">
    Opening another section will collapse this one, and clicking the open section closes it.
  </wa-accordion-item>
  <wa-accordion-item label="Sort"> Try opening and closing each section in turn. </wa-accordion-item>
  <wa-accordion-item label="Display"> Zero open sections is a valid state in this mode. </wa-accordion-item>
</wa-accordion>
```

### Icon Placement

The expand/collapse icon appears at the end of each header by default. Set `icon-placement="start"` to move it to the beginning, a common pattern for sidebars and tree style navigation.

```html
<wa-accordion icon-placement="start">
  <wa-accordion-item label="Start">Icon is at the start of the header.</wa-accordion-item>
  <wa-accordion-item label="Another item">More content here.</wa-accordion-item>
</wa-accordion>
```

### Custom Icon

Use the `icon` slot on an accordion item to replace the default expand/collapse icon with any icon you like.

By default the icon rotates as the item expands. You can target the `icon` part with `::part(icon)` to customize the rotation, or set `rotate: none` to prevent the animation and swap the icon instead. Because `expanded` reflects an attribute, `[expanded]::part(icon)` lets you style each state.

```html
<wa-accordion>
  <wa-accordion-item label="Rotate a custom icon" class="circle-plus">
    <wa-icon slot="icon" name="circle-plus" variant="regular"></wa-icon>
    Replace the default chevron and customize how it rotates.
  </wa-accordion-item>
  <wa-accordion-item label="Swap the icon instead" class="plus-minus">
    <wa-icon slot="icon" name="square-plus" variant="regular" data-when="collapsed"></wa-icon>
    <wa-icon slot="icon" name="square-minus" variant="regular" data-when="expanded"></wa-icon>
    Prevent the rotation and swap + for − when the item expands.
  </wa-accordion-item>
</wa-accordion>

<style>
  /* Customize the rotation when expanded */
  wa-accordion-item.circle-plus[expanded]::part(icon) {
    rotate: 225deg;
  }

  /* Prevent the default rotation animation… */
  wa-accordion-item.plus-minus::part(icon) {
    rotate: none;
  }

  /* …and swap the icon based on the expanded state */
  wa-accordion-item.plus-minus [data-when='expanded'] {
    display: none;
  }
  wa-accordion-item.plus-minus[expanded] [data-when='collapsed'] {
    display: none;
  }
  wa-accordion-item.plus-minus[expanded] [data-when='expanded'] {
    display: inline-flex;
  }
</style>
```

### HTML in the Label

To place HTML in an accordion item's header, use the `label` slot instead of the `label` attribute. This lets you add icons, badges, or other elements alongside the label text.

```html
<wa-accordion>
  <wa-accordion-item>
    <div slot="label" class="wa-split">
      <span>Tasks</span>
      <wa-badge appearance="filled" variant="success" style="font-size: var(--wa-font-size-xs);">3 ready</wa-badge>
    </div>
    All three tasks are ready to be reviewed.
  </wa-accordion-item>
  <wa-accordion-item>
    <div slot="label" class="wa-split">
      <span>Issues</span>
      <wa-badge appearance="filled" variant="danger" style="font-size: var(--wa-font-size-xs);">2 open</wa-badge>
    </div>
    There are two open issues that need your attention.
  </wa-accordion-item>
</wa-accordion>
```

### Expand & Collapse All

Use the `expandAll()` and `collapseAll()` methods to programmatically control all items at once. Note that `expandAll()` is a no-op when `mode` is `single` or `single-collapsible`.

```html
<div>
  <wa-accordion id="accordion-methods">
    <wa-accordion-item label="Section one">Content for the first section.</wa-accordion-item>
    <wa-accordion-item label="Section two">Content for the second section.</wa-accordion-item>
    <wa-accordion-item label="Section three">Content for the third section.</wa-accordion-item>
  </wa-accordion>

  <wa-divider></wa-divider>

  <div class="wa-cluster">
    <wa-button appearance="filled" id="expand-all">Expand All</wa-button>
    <wa-button appearance="filled" id="collapse-all">Collapse All</wa-button>
  </div>
</div>

<script>
  const accordion = document.querySelector('#accordion-methods');

  document.querySelector('#expand-all').addEventListener('click', () => accordion.expandAll());
  document.querySelector('#collapse-all').addEventListener('click', () => accordion.collapseAll());
</script>
```

### Nested Accordions

Place a `<wa-accordion>` inside an accordion item's default slot to nest one accordion inside another. Each accordion manages its own items independently, so toggling an inner item won't affect outer items, and properties like `mode` apply only to direct children.

```html
<wa-accordion>
  <wa-accordion-item label="Fruits" expanded>
    <wa-accordion mode="single">
      <wa-accordion-item label="Apples">Crisp, sweet, and great for pies.</wa-accordion-item>
      <wa-accordion-item label="Oranges">Juicy and packed with vitamin C.</wa-accordion-item>
      <wa-accordion-item label="Bananas">Soft, sweet, and easy to peel.</wa-accordion-item>
    </wa-accordion>
  </wa-accordion-item>
  <wa-accordion-item label="Vegetables">
    <wa-accordion mode="single">
      <wa-accordion-item label="Carrots">Crunchy and rich in beta carotene.</wa-accordion-item>
      <wa-accordion-item label="Broccoli">A nutrient-dense cruciferous vegetable.</wa-accordion-item>
    </wa-accordion>
  </wa-accordion-item>
</wa-accordion>
```

### Preventing Expand or Collapse

Listen for the `wa-expand` or `wa-collapse` events and call `event.preventDefault()` to stop the action from completing. The `event.detail.item` property tells you which accordion item triggered the event.

```html
<wa-accordion id="accordion-prevent">
  <wa-accordion-item label="Locked open" expanded>
    This item is locked open — the <code>wa-collapse</code> event is being intercepted and prevented.
  </wa-accordion-item>
  <wa-accordion-item label="Works normally"> This item can be toggled normally. </wa-accordion-item>
</wa-accordion>

<script>
  const accordion = document.querySelector('#accordion-prevent');
  const lockedItem = accordion.querySelector('wa-accordion-item');

  accordion.addEventListener('wa-collapse', event => {
    if (event.detail.item === lockedItem) {
      event.preventDefault();
    }
  });
</script>
```
