# Color Picker

`<wa-color-picker>`

Stable [Forms](https://webawesome.com/docs/components/?category=forms) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Color pickers let users choose a color from a visual palette or by entering a value. They support HEX, RGB, HSL, and HSV formats with optional alpha channel and swatch presets.

```html
<wa-color-picker label="Select a color"></wa-color-picker>
```

This component works with standard `<form>` elements. Please refer to the section on [form controls](https://webawesome.com/docs/form-controls) to learn more about form submission and client-side validation.

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/color-picker/color-picker.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/color-picker/color-picker.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/color-picker/color-picker.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaColorPicker from '@awesome.me/webawesome/dist/react/color-picker/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `label` — The color picker's form label. Alternatively, you can use the `label` attribute.
- `hint` — The color picker's form hint. Alternatively, you can use the `hint` attribute.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `validators` | — | Validators are static because they have `observedAttributes`, essentially attributes to "watch" for changes. Whenever these attributes change, we want to be notified and update the validator. | `Validator[]` | `[]` |
| `validationTarget` | — | Override this to change where constraint validation popups are anchored. | `undefined \| HTMLElement` | — |
| `value` | — | The current value of the color picker. The value's format will vary based the `format` attribute. To get the value in a specific format, use the `getFormattedValue()` method. The value is submitted as a name/value pair with form data. | — | — |
| `defaultValue` | `value` | The default value of the form control. Primarily used for resetting the form control. | `string \| null` | — |
| `withLabel` | `with-label` | Only required for SSR. Set to `true` if you're slotting in a `label` element so the server-rendered markup includes the label before the component hydrates on the client. | `boolean` | `false` |
| `withHint` | `with-hint` | Only required for SSR. Set to `true` if you're slotting in a `hint` element so the server-rendered markup includes the hint before the component hydrates on the client. | `boolean` | `false` |
| `label` | `label` | The color picker's label. This will not be displayed, but it will be announced by assistive devices. If you need to display HTML, you can use the `label` slot` instead. | `string` | `''` |
| `hint` | `hint` | The color picker's hint. If you need to display HTML, use the `hint` slot instead. | `string` | `''` |
| `format` | `format` | The format to use. If opacity is enabled, these will translate to HEXA, RGBA, HSLA, and HSVA respectively. The color picker will accept user input in any format (including CSS color names) and convert it to the desired format. | `'hex' \| 'rgb' \| 'hsl' \| 'hsv'` | `'hex'` |
| `size` | `size` | Determines the size of the color picker's trigger | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'small' \| 'medium' \| 'large'` | `'m'` |
| `placement` | `placement` | The preferred placement of the color picker's popup. Note that the actual placement will vary as configured to keep the panel inside of the viewport. | `\| 'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'right' \| 'right-start' \| 'right-end' \| 'left' \| 'left-start' \| 'left-end'` | `'bottom-start'` |
| `withoutFormatToggle` | `without-format-toggle` | Removes the button that lets users toggle between format. | `boolean` | `false` |
| `name` | `name` | The name of the form control, submitted as a name/value pair with form data. | `string \| null` | `null` |
| `disabled` | `disabled` | Disables the color picker. | `boolean` | `false` |
| `open` | `open` | Indicates whether or not the popup is open. You can toggle this attribute to show and hide the popup, or you can use the `show()` and `hide()` methods and this attribute will reflect the popup's open state. | `boolean` | `false` |
| `opacity` | `opacity` | Shows the opacity slider. Enabling this will cause the formatted value to be HEXA, RGBA, or HSLA. | `boolean` | `false` |
| `uppercase` | `uppercase` | By default, values are lowercase. With this attribute, values will be uppercase instead. | `boolean` | `false` |
| `swatches` | `swatches` | One or more predefined color swatches to display as presets in the color picker. Can include any format the color picker can parse, including HEX(A), RGB(A), HSL(A), HSV(A), and CSS color names. Each color must be separated by a semicolon (`;`). Alternatively, you can pass an array of color values or an array of `{ color, label }` objects to this property using JavaScript. When using objects with labels, the label will be used for the swatch's accessible name instead of the raw color value. | `string \| string[] \| WaColorPickerSwatch[]` | `''` |
| `required` | `required` | Makes the color picker a required field. | `boolean` | `false` |
| `form` | — | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | `HTMLFormElement \| null` | — |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `getHexString()` | Generates a hex string from HSV values. Hue must be 0-360. All other arguments must be 0-100. | `hue: number, saturation: number, brightness: number, alpha: unknown` |
| `focus()` | Sets focus on the color picker. | `options: FocusOptions` |
| `blur()` | Removes focus from the color picker. | — |
| `getFormattedValue()` | Returns the current value as a string in the specified format. | `format: 'hex' \\| 'hexa' \\| 'rgb' \\| 'rgba' \\| 'hsl' \\| 'hsla' \\| 'hsv' \\| 'hsva'` |
| `reportValidity()` | Checks for validity and shows the browser's validation message if the control is invalid. | — |
| `show()` | Shows the color picker panel. | — |
| `hide()` | Hides the color picker panel | — |
| `setCustomValidity()` | Do not use this when creating a "Validator". This is intended for end users of components. We track manually defined custom errors so we don't clear them on accident in our validators. | `message: string` |
| `formStateRestoreCallback()` | Called when the browser is trying to restore element’s state to state in which case reason is "restore", or when the browser is trying to fulfill autofill on behalf of user in which case reason is "autocomplete". In the case of "restore", state is a string, File, or FormData object previously set as the second argument to setFormValue. | `state: string \\| File \\| FormData \\| null, reason: 'autocomplete' \\| 'restore'` |
| `resetValidity()` | Reset validity is a way of removing manual custom errors and native validation. | — |

## Events

| Name | Description |
| --- | --- |
| `change` | Emitted when the color picker's value changes. |
| `input` | Emitted when the color picker receives input. |
| `wa-show` | — |
| `wa-after-show` | — |
| `wa-hide` | — |
| `wa-after-hide` | — |
| `blur` | Emitted when the color picker loses focus. |
| `focus` | Emitted when the color picker receives focus. |
| `wa-invalid` | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--grid-handle-size\` | The size of the color grid's handle. |
| \`--grid-height\` | The height of the color grid. |
| \`--grid-width\` | The width of the color grid. |
| \`--slider-handle-size\` | The diameter of the slider's handle. |
| \`--slider-height\` | The height of the hue and alpha sliders. |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The component's base wrapper. | \`::part(base)\` |
| \`eyedropper-button\` | The eye dropper button. | \`::part(eyedropper-button)\` |
| \`eyedropper-button\_\_base\` | \`button\` The eye dropper 's exported button part. | \`::part(eyedropper-button\_\_base)\` |
| \`eyedropper-button\_\_caret\` | \`caret\` The eye dropper button's exported part. | \`::part(eyedropper-button\_\_caret)\` |
| \`eyedropper-button\_\_end\` | \`end\` The eye dropper button's exported part. | \`::part(eyedropper-button\_\_end)\` |
| \`eyedropper-button\_\_label\` | \`label\` The eye dropper button's exported part. | \`::part(eyedropper-button\_\_label)\` |
| \`eyedropper-button\_\_start\` | \`start\` The eye dropper button's exported part. | \`::part(eyedropper-button\_\_start)\` |
| \`format-button\` | The format button. | \`::part(format-button)\` |
| \`format-button\_\_base\` | \`button\` The format 's exported button part. | \`::part(format-button\_\_base)\` |
| \`format-button\_\_caret\` | \`caret\` The format button's exported part. | \`::part(format-button\_\_caret)\` |
| \`format-button\_\_end\` | \`end\` The format button's exported part. | \`::part(format-button\_\_end)\` |
| \`format-button\_\_label\` | \`label\` The format button's exported part. | \`::part(format-button\_\_label)\` |
| \`format-button\_\_start\` | \`start\` The format button's exported part. | \`::part(format-button\_\_start)\` |
| \`grid\` | The color grid. | \`::part(grid)\` |
| \`grid-handle\` | The color grid's handle. | \`::part(grid-handle)\` |
| \`hue-slider\` | The hue slider. | \`::part(hue-slider)\` |
| \`hue-slider-handle\` | The hue slider's handle. | \`::part(hue-slider-handle)\` |
| \`input\` | The text input. | \`::part(input)\` |
| \`opacity-slider\` | The opacity slider. | \`::part(opacity-slider)\` |
| \`opacity-slider-handle\` | The opacity slider's handle. | \`::part(opacity-slider-handle)\` |
| \`preview\` | The preview color. | \`::part(preview)\` |
| \`slider\` | Hue and opacity sliders. | \`::part(slider)\` |
| \`slider-handle\` | Hue and opacity slider handles. | \`::part(slider-handle)\` |
| \`swatch\` | Each individual swatch. | \`::part(swatch)\` |
| \`swatches\` | The container that holds the swatches. | \`::part(swatches)\` |
| \`trigger\` | The color picker's dropdown trigger. | \`::part(trigger)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-button>`](https://webawesome.com/docs/components/button)
-   [`<wa-button-group>`](https://webawesome.com/docs/components/button-group)
-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)
-   [`<wa-input>`](https://webawesome.com/docs/components/input)
-   [`<wa-popup>`](https://webawesome.com/docs/components/popup)
-   [`<wa-spinner>`](https://webawesome.com/docs/components/spinner)
-   [`<wa-visually-hidden>`](https://webawesome.com/docs/components/visually-hidden)

## Examples

### Initial Value

Use the `value` attribute to set an initial value for the color picker.

```html
<wa-color-picker value="#4a90e2" label="Select a color"></wa-color-picker>
```

### Opacity

Use the `opacity` attribute to enable the opacity slider. When this is enabled, the value will be displayed as HEXA, RGBA, HSLA, or HSVA based on `format`.

```html
<wa-color-picker value="#f5a623ff" opacity label="Select a color"></wa-color-picker>
```

### Formats

Set the color picker's format with the `format` attribute. Valid options include `hex`, `rgb`, `hsl`, and `hsv`. Note that the color picker's input will accept any parsable format (including CSS color names) regardless of this option.

To prevent users from toggling the format themselves, add the `without-format-toggle` attribute.

```html
<div class="wa-grid" style="--min-column-size: 12ch;">
  <wa-color-picker format="hex" value="#4a90e2" label="Pick a hex color"></wa-color-picker>
  <wa-color-picker format="rgb" value="rgb(80, 227, 194)" label="Pick an RGB color"></wa-color-picker>
  <wa-color-picker format="hsl" value="hsl(290, 87%, 47%)" label="Pick an HSL color"></wa-color-picker>
  <wa-color-picker format="hsv" value="hsv(55, 89%, 97%)" label="Pick an HSV color"></wa-color-picker>
</div>
```

### Swatches

Use the `swatches` attribute to add convenient presets to the color picker. Any format the color picker can parse is acceptable (including [CSS color names](https://www.w3schools.com/colors/colors_names.asp)), but each value must be separated by a semicolon (`;`). Alternatively, you can pass an array of color values to this property using JavaScript.

```html
<wa-color-picker
  label="Select a color"
  swatches="
    #d0021b; #f5a623; #f8e71c; #8b572a; #7ed321; #417505; #bd10e0; #9013fe;
    #4a90e2; #50e3c2; #b8e986; #000; #444; #888; #ccc; #fff;
  "
></wa-color-picker>
```

You can also pass an array of objects with `color` and `label` properties using JavaScript. When labels are provided, they will be used as the accessible name for each swatch instead of the raw color value.

```html
<wa-color-picker id="labeled-swatches" label="Select a color"></wa-color-picker>

<script>
  const colorPicker = document.getElementById('labeled-swatches');
  await customElements.whenDefined("wa-color-picker")
  await colorPicker.updateComplete
  colorPicker.swatches = [
    { color: '#d0021b', label: 'Red' },
    { color: '#f5a623', label: 'Orange' },
    { color: '#f8e71c', label: 'Yellow' },
    { color: '#7ed321', label: 'Green' },
    { color: '#4a90e2', label: 'Blue' },
    { color: '#bd10e0', label: 'Purple' },
    { color: '#000', label: 'Black' },
    { color: '#fff', label: 'White' },
  ];
</script>
```

### Placement

The preferred placement of the dropdown can be set with the `placement` attribute. Note that the actual position may vary to ensure the panel remains in the viewport.

```html
<div class="wa-gap-m wa-align-items-baseline">
  <wa-color-picker placement="top-start" label="Select a color"></wa-color-picker>
  <wa-color-picker placement="bottom-end" label="Select a color"></wa-color-picker>
  <wa-color-picker placement="right" label="Select a color"></wa-color-picker>
  <wa-color-picker placement="left" label="Select a color"></wa-color-picker>
</div>
```

### Sizes

Use the `size` attribute to change the color picker's trigger size.

```html
<div class="wa-gap-m wa-align-items-baseline">
  <wa-color-picker size="xs" label="Select a color"></wa-color-picker>
  <wa-color-picker size="s" label="Select a color"></wa-color-picker>
  <wa-color-picker size="m" label="Select a color"></wa-color-picker>
  <wa-color-picker size="l" label="Select a color"></wa-color-picker>
  <wa-color-picker size="xl" label="Select a color"></wa-color-picker>
</div>
```

### Disabled

The color picker can be rendered as disabled.

```html
<wa-color-picker disabled label="Select a color"></wa-color-picker>
```

### Hint

Add descriptive hint to a color picker with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html
<wa-color-picker label="Select a color" hint="Choose a color with appropriate contrast!"></wa-color-picker>
```
