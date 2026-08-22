# Component Groups

**Full documentation:** https://webawesome.com/docs/tokens/component-groups

Design Tokens Component Groups

Component tokens let you style groups of related components at once. Rather than overriding individual component styles, these tokens propagate the style across every component that shares a given visual quality.

## Form Controls

Components such as [input](https://webawesome.com/docs/components/input), [select](https://webawesome.com/docs/components/select), [textarea](https://webawesome.com/docs/components/textarea), [checkbox](https://webawesome.com/docs/components/checkbox), and others share styles defined with the `--wa-form-control-*` prefix.

Not every form control uses all of these custom properties. For example, [radio](https://webawesome.com/docs/components/radio) defines its own height and border radius to achieve its familiar shape but shares many other styles with other components for a cohesive look and feel. Similarly, [button](https://webawesome.com/docs/components/button) defines many of its own styles but matches the height and border width of other form controls.

| Custom Property | Description |
| --- | --- |
| \`--wa-form-control-background-color\` | Background color of form control inputs |
| \`--wa-form-control-border-color\` | Border color of form control inputs |
| \`--wa-form-control-border-style\` | Border line style of form control inputs |
| \`--wa-form-control-border-width\` | Border thickness of form control inputs |
| \`--wa-form-control-border-radius\` | Corner rounding of form control inputs |
| \`--wa-form-control-activated-color\` | Accent color when a control is active, checked, or selected |
| \`--wa-form-control-label-color\` | Text color of form control labels |
| \`--wa-form-control-label-font-weight\` | Font weight of form control labels |
| \`--wa-form-control-label-line-height\` | Line height of form control labels |
| \`--wa-form-control-value-color\` | Text color of the user-entered or selected value |
| \`--wa-form-control-value-font-weight\` | Font weight of the user-entered or selected value |
| \`--wa-form-control-value-line-height\` | Line height of the user-entered or selected value |
| \`--wa-form-control-hint-color\` | Text color of the hint text below a form control |
| \`--wa-form-control-hint-font-weight\` | Font weight of hint text |
| \`--wa-form-control-hint-line-height\` | Line height of hint text |
| \`--wa-form-control-placeholder-color\` | Text color of input placeholder text |
| \`--wa-form-control-required-content\` | Content appended to labels of required fields |
| \`--wa-form-control-required-content-color\` | Color of the required field indicator |
| \`--wa-form-control-required-content-offset\` | Inline spacing between the label text and required indicator |
| \`--wa-form-control-padding-block\` | Block (top/bottom) padding inside form control inputs |
| \`--wa-form-control-padding-inline\` | Inline (left/right) padding inside form control inputs |
| \`--wa-form-control-height\` | Computed height of single-line form controls; derived from padding and line height |
| \`--wa-form-control-toggle-size\` | Size of toggle controls (checkboxes, radios, switches) |

```html
<form class="wa-stack">
  <wa-input label="Input" placeholder="Placeholder"></wa-input>
  <wa-select label="Select" value="option-1">
    <wa-option value="option-1">Option 1</wa-option>
    <wa-option value="option-2">Option 2</wa-option>
    <wa-option value="option-3">Option 3</wa-option>
  </wa-select>
  <wa-textarea label="Textarea" placeholder="Placeholder"></wa-textarea>
  <wa-radio-group label="Radio group" name="a" value="1">
    <wa-radio value="1">Option 1</wa-radio>
    <wa-radio value="2">Option 2</wa-radio>
    <wa-radio value="3">Option 3</wa-radio>
  </wa-radio-group>
  <wa-checkbox>Checkbox</wa-checkbox>
  <wa-switch>Switch</wa-switch>
  <wa-slider label="Range"></wa-slider>
  <wa-button>Button</wa-button>
</form>
```

## Buttons

In addition to sharing styles with form controls, [buttons](https://webawesome.com/docs/components/button) have their own subset of unique tokens.

| Custom Property | Description |
| --- | --- |
| \`--wa-button-transform-hover\` | A transform function to apply to buttons on mouseover/hover |
| \`--wa-button-transform-active\` | A transform function to apply to buttons when pressed/active |

## Panels

Panel tokens apply to components with larger, contained surface areas, like [callout](https://webawesome.com/docs/components/callout), [card](https://webawesome.com/docs/components/card), [details](https://webawesome.com/docs/components/details), and [dialog](https://webawesome.com/docs/components/dialog).

| Custom Property | Description |
| --- | --- |
| \`--wa-panel-border-style\` | Border line style for panel components |
| \`--wa-panel-border-width\` | Border thickness for panel components |
| \`--wa-panel-border-radius\` | Corner rounding for panel components |

```html
<div class="wa-stack">
  <wa-callout>
    <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
    This is a simple callout with an icon.
  </wa-callout>
  <wa-card>Here's a basic, no-nonsense card.</wa-card>
  <wa-details summary="Details">
    <code>wa-details</code>, at your service.
  </wa-details>
</div>
```

## Tooltips

Tooltip tokens apply to the [tooltip](https://webawesome.com/docs/components/tooltip) component and built-in tooltips in other components like [slider](https://webawesome.com/docs/components/slider) and [copy button](https://webawesome.com/docs/components/copy-button).

| Custom Property | Description |
| --- | --- |
| \`--wa-tooltip-arrow-size\` | Size of the tooltip arrow/caret |
| \`--wa-tooltip-background-color\` | Background color of the tooltip body |
| \`--wa-tooltip-border-color\` | Border color of the tooltip |
| \`--wa-tooltip-border-style\` | Border line style of the tooltip |
| \`--wa-tooltip-border-width\` | Border thickness of the tooltip |
| \`--wa-tooltip-border-radius\` | Corner rounding of the tooltip |
| \`--wa-tooltip-content-color\` | Text color of tooltip content |
| \`--wa-tooltip-font-size\` | Font size of tooltip text |
| \`--wa-tooltip-line-height\` | Line height of tooltip text |

```html
<wa-button id="tooltip-demo" appearance="plain">
  <wa-icon label="Target" name="bullseye"></wa-icon>
</wa-button>
<wa-tooltip for="tooltip-demo" open trigger="manual">This is a tooltip</wa-tooltip>
```