# Tooltip

`<wa-tooltip>`

Stable [Feedback](https://webawesome.com/docs/components/?category=feedback) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Tooltips display brief contextual information when the user hovers, focuses, or taps a target element.

A tooltip's target is based on the `for` attribute which points to an element id.

```html
<wa-tooltip for="my-button">This is a tooltip</wa-tooltip>
<wa-button appearance="filled" id="my-button">Hover Me</wa-button>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/tooltip/tooltip.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/tooltip/tooltip.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaTooltip from '@awesome.me/webawesome/dist/react/tooltip/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The tooltip's default slot where any content should live. Interactive content should be avoided.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `placement` | `placement` | The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip inside of the viewport. | `\| 'top' \| 'top-start' \| 'top-end' \| 'right' \| 'right-start' \| 'right-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end'` | `'top'` |
| `disabled` | `disabled` | Disables the tooltip so it won't show when triggered. | `boolean` | `false` |
| `distance` | `distance` | The distance in pixels from which to offset the tooltip away from its target. | `number` | `8` |
| `open` | `open` | Indicates whether or not the tooltip is open. You can use this in lieu of the show/hide methods. | `boolean` | `false` |
| `skidding` | `skidding` | The distance in pixels from which to offset the tooltip along its target. | `number` | `0` |
| `showDelay` | `show-delay` | The amount of time to wait before showing the tooltip when the user mouses in. | `number` | `150` |
| `hideDelay` | `hide-delay` | The amount of time to wait before hiding the tooltip when the user mouses out. | `number` | `0` |
| `trigger` | `trigger` | Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple options can be passed by separating them with a space. When manual is used, the tooltip must be activated programmatically. | `string` | `'hover focus'` |
| `withoutArrow` | `without-arrow` | Removes the arrow from the tooltip. | `boolean` | `false` |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `show()` | Shows the tooltip. | — |
| `hide()` | Hides the tooltip | — |

## Events

| Name | Description |
| --- | --- |
| `wa-show` | Emitted when the tooltip begins to show. |
| `wa-after-show` | Emitted after the tooltip has shown and all animations are complete. |
| `wa-hide` | Emitted when the tooltip begins to hide. |
| `wa-after-hide` | Emitted after the tooltip has hidden and all animations are complete. |

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--max-width\` | The maximum width of the tooltip before its content will wrap. |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | \`\` The component's base wrapper, an element. | \`::part(base)\` |
| \`base\_\_arrow\` | \`arrow\` The popup's exported part. Use this to target the tooltip's arrow. | \`::part(base\_\_arrow)\` |
| \`base\_\_popup\` | \`popup\` The 's exported popup part. Use this to target the tooltip's popup container. | \`::part(base\_\_popup)\` |
| \`body\` | The tooltip's body where its content is rendered. | \`::part(body)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-popup>`](https://webawesome.com/docs/components/popup)

## Examples

### Placement

Use the `placement` attribute to set the preferred placement of the tooltip.

```html
<div class="tooltip-placement-example">
  <div class="tooltip-placement-example-row">
    <wa-button appearance="filled" id="tooltip-top-start"></wa-button>
    <wa-button appearance="filled" id="tooltip-top"></wa-button>
    <wa-button appearance="filled" id="tooltip-top-end"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button appearance="filled" id="tooltip-left-start"></wa-button>
    <wa-button appearance="filled" id="tooltip-right-start"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button appearance="filled" id="tooltip-left"></wa-button>
    <wa-button appearance="filled" id="tooltip-right"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button appearance="filled" id="tooltip-left-end"></wa-button>
    <wa-button appearance="filled" id="tooltip-right-end"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button appearance="filled" id="tooltip-bottom-start"></wa-button>
    <wa-button appearance="filled" id="tooltip-bottom"></wa-button>
    <wa-button appearance="filled" id="tooltip-bottom-end"></wa-button>
  </div>
</div>

<wa-tooltip for="tooltip-top-start" placement="top-start">top-start</wa-tooltip>
<wa-tooltip for="tooltip-top" placement="top">top</wa-tooltip>
<wa-tooltip for="tooltip-top-end" placement="top-end">top-end</wa-tooltip>
<wa-tooltip for="tooltip-left-start" placement="left-start">left-start</wa-tooltip>
<wa-tooltip for="tooltip-right-start" placement="right-start">right-start</wa-tooltip>
<wa-tooltip for="tooltip-left" placement="left">left</wa-tooltip>
<wa-tooltip for="tooltip-right" placement="right">right</wa-tooltip>
<wa-tooltip for="tooltip-left-end" placement="left-end">left-end</wa-tooltip>
<wa-tooltip for="tooltip-right-end" placement="right-end">right-end</wa-tooltip>
<wa-tooltip for="tooltip-bottom-start" placement="bottom-start">bottom-start</wa-tooltip>
<wa-tooltip for="tooltip-bottom" placement="bottom">bottom</wa-tooltip>
<wa-tooltip for="tooltip-bottom-end" placement="bottom-end">bottom-end</wa-tooltip>

<style>
  .tooltip-placement-example {
    width: 250px;
    margin: 1rem;
  }

  .tooltip-placement-example wa-button {
    width: 2.5rem;
  }

  .tooltip-placement-example-row {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .tooltip-placement-example-row:nth-child(1),
  .tooltip-placement-example-row:nth-child(5) {
    justify-content: center;
  }
</style>
```

### Click Trigger

Set the `trigger` attribute to `click` to toggle the tooltip on click instead of hover.

```html
<wa-button appearance="filled" id="toggle-button">Click to Toggle</wa-button>
<wa-tooltip for="toggle-button" trigger="click">Click again to dismiss</wa-tooltip>
```

### Manual Trigger

Tooltips can be controller programmatically by setting the `trigger` attribute to `manual`. Use the `open` attribute to control when the tooltip is shown.

```html
<div class="manual-trigger-example">
  <wa-tooltip for="manual-trigger-tooltip" trigger="manual" class="manual-tooltip">This is an avatar!</wa-tooltip>
  <wa-avatar id="manual-trigger-tooltip" label="User"></wa-avatar>

  <wa-divider></wa-divider>

  <wa-button appearance="filled" class="manual-toggle">Toggle Manually</wa-button>
</div>

<script>
  const tooltip = document.querySelector('.manual-tooltip');
  const toggle = document.querySelector('.manual-toggle');

  toggle.addEventListener('click', () => (tooltip.open = !tooltip.open));
</script>
```

### Removing Arrows

You can control the size of tooltip arrows by overriding the `--wa-tooltip-arrow-size` design token. To remove the arrow, use the `without-arrow` attribute.

```html
<wa-button appearance="filled" id="no-arrow">No Arrow</wa-button>
<wa-tooltip for="no-arrow" without-arrow>This is a tooltip with no arrow</wa-tooltip>
```

To override it globally, set it in a root block in your stylesheet after the Web Awesome stylesheet is loaded.

```css
:root {
  --wa-tooltip-arrow-size: 0;
}
```

### HTML in Tooltips

Use the default slot to create tooltips with HTML content. Tooltips are designed only for text and presentational elements. Avoid placing interactive content, such as buttons, links, and form controls, in a tooltip.

```html
<wa-button appearance="filled" id="rich-tooltip">Hover me</wa-button>
<wa-tooltip for="rich-tooltip">
  <div>I'm not <strong>just</strong> a tooltip, I'm a <em>tooltip</em> with HTML!</div>
</wa-tooltip>
```

### Setting a Maximum Width

Use the `--max-width` custom property to change the width the tooltip can grow to before wrapping occurs.

```html
<wa-tooltip for="wrapping-tooltip" style="--max-width: 80px;">
  This tooltip will wrap after only 80 pixels.
</wa-tooltip>
<wa-button appearance="filled" id="wrapping-tooltip">Hover me</wa-button>
```
