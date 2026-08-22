# Slider

`<wa-slider>`

Stable [Forms](https://webawesome.com/docs/components/?category=forms) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Sliders let users choose a numeric value within a defined range by dragging a thumb along a track.

```html
<wa-slider
  label="Number of users"
  hint="Limit six per team"
  name="value"
  value="3"
  min="0"
  max="6"
  with-markers
  with-tooltip
>
  <span slot="reference">Less</span>
  <span slot="reference">More</span>
</wa-slider>
```

This component works with standard `<form>` elements. Please refer to the section on [form controls](https://webawesome.com/docs/form-controls) to learn more about form submission and client-side validation.

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/slider/slider.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/slider/slider.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/slider/slider.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaSlider from '@awesome.me/webawesome/dist/react/slider/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `label` — The slider label. Alternatively, you can use the `label` attribute.
- `hint` — Text that describes how to use the input. Alternatively, you can use the `hint` attribute. instead.
- `reference` — One or more reference labels to show visually below the slider.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `validators` | — | Validators are static because they have `observedAttributes`, essentially attributes to "watch" for changes. Whenever these attributes change, we want to be notified and update the validator. | `Validator[]` | `[]` |
| `validationTarget` | — | Override validation target to point to the focusable element | `undefined \| HTMLElement` | — |
| `label` | `label` | The slider's label. If you need to provide HTML in the label, use the `label` slot instead. | `string` | `''` |
| `hint` | `hint` | The slider hint. If you need to display HTML, use the hint slot instead. | `string` | `''` |
| `name` | `name` | The name of the slider. This will be submitted with the form as a name/value pair. | `string \| null` | `null` |
| `minValue` | `min-value` | The minimum value of a range selection. Used only when range attribute is set. | `number` | `0` |
| `maxValue` | `max-value` | The maximum value of a range selection. Used only when range attribute is set. | `number` | `50` |
| `defaultValue` | `value` | The default value of the form control. Primarily used for resetting the form control. | `number` | — |
| `value` | — | The current value of the slider, submitted as a name/value pair with form data. | `number` | — |
| `range` | `range` | Converts the slider to a range slider with two thumbs. | `boolean` | `false` |
| `isRange` | — | Get if this is a range slider | `boolean` | — |
| `disabled` | `disabled` | Disables the slider. | `boolean` | `false` |
| `readonly` | `readonly` | Makes the slider a read-only field. | `boolean` | `false` |
| `orientation` | `orientation` | The orientation of the slider. | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `size` | `size` | The slider's size. | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'small' \| 'medium' \| 'large'` | `'m'` |
| `indicatorOffset` | `indicator-offset` | The starting value from which to draw the slider's fill, which is based on its current value. | `number` | — |
| `min` | `min` | The minimum value allowed. | `number` | `0` |
| `max` | `max` | The maximum value allowed. | `number` | `100` |
| `step` | `step` | The granularity the value must adhere to when incrementing and decrementing. | `number` | `1` |
| `autofocus` | `autofocus` | Tells the browser to focus the slider when the page loads or a dialog is shown. | `boolean` | — |
| `tooltipDistance` | `tooltip-distance` | The distance of the tooltip from the slider's thumb. | `number` | `8` |
| `tooltipPlacement` | `tooltip-placement` | The placement of the tooltip in reference to the slider's thumb. | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` |
| `withMarkers` | `with-markers` | Draws markers at each step along the slider. | `boolean` | `false` |
| `withTooltip` | `with-tooltip` | Draws a tooltip above the thumb when the control has focus or is dragged. | `boolean` | `false` |
| `withLabel` | `with-label` | Only required for SSR. Set to `true` if you're slotting in a `label` element so the server-rendered markup includes the label before the component hydrates on the client. | `boolean` | `false` |
| `withHint` | `with-hint` | Only required for SSR. Set to `true` if you're slotting in a `hint` element so the server-rendered markup includes the hint before the component hydrates on the client. | `boolean` | `false` |
| `valueFormatter` | — | A custom formatting function to apply to the value. This will be shown in the tooltip and announced by screen readers. Must be set with JavaScript. Property only. | `(value: number) => string` | — |
| `form` | — | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | `HTMLFormElement \| null` | — |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Sets focus to the slider. | — |
| `blur()` | Removes focus from the slider. | — |
| `stepDown()` | Decreases the slider's value by `step`. This is a programmatic change, so `input` and `change` events will not be emitted when this is called. | — |
| `stepUp()` | Increases the slider's value by `step`. This is a programmatic change, so `input` and `change` events will not be emitted when this is called. | — |
| `setCustomValidity()` | Do not use this when creating a "Validator". This is intended for end users of components. We track manually defined custom errors so we don't clear them on accident in our validators. | `message: string` |
| `formStateRestoreCallback()` | Called when the browser is trying to restore element’s state to state in which case reason is "restore", or when the browser is trying to fulfill autofill on behalf of user in which case reason is "autocomplete". In the case of "restore", state is a string, File, or FormData object previously set as the second argument to setFormValue. | `state: string \\| File \\| FormData \\| null, reason: 'autocomplete' \\| 'restore'` |
| `resetValidity()` | Reset validity is a way of removing manual custom errors and native validation. | — |

## Events

| Name | Description |
| --- | --- |
| `change` | Emitted when an alteration to the control's value is committed by the user. |
| `blur` | Emitted when the control loses focus. |
| `focus` | Emitted when the control gains focus. |
| `input` | Emitted when the control receives input. |
| `wa-invalid` | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--marker-height\` | \`0.1875em\` The height of each individual marker. Default |
| \`--marker-width\` | \`0.1875em\` The width of each individual marker. Default |
| \`--thumb-height\` | \`1.25em\` The height of the thumb. Default |
| \`--thumb-width\` | \`1.25em\` The width of the thumb. Default |
| \`--track-size\` | \`0.75em\` The height or width of the slider's track. Default |

## Custom States

| Name | Description | CSS selector |
| --- | --- | --- |
| `disabled` | Applied when the slider is disabled. | `:state(disabled)` |
| `dragging` | Applied when the slider is being dragged. | `:state(dragging)` |
| `focused` | Applied when the slider has focus. | `:state(focused)` |
| `user-valid` | Applied when the slider is valid and the user has sufficiently interacted with it. | `:state(user-valid)` |
| `user-invalid` | Applied when the slider is invalid and the user has sufficiently interacted with it. | `:state(user-invalid)` |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`hint\` | The element that contains the slider's description. | \`::part(hint)\` |
| \`indicator\` | The colored indicator that shows from the start of the slider to the current value. | \`::part(indicator)\` |
| \`label\` | The element that contains the sliders's label. | \`::part(label)\` |
| \`marker\` | \`with-markers\` The individual markers that are shown when is used. | \`::part(marker)\` |
| \`markers\` | \`with-markers\` The container that holds all the markers when is used. | \`::part(markers)\` |
| \`references\` | The container that holds references that get slotted in. | \`::part(references)\` |
| \`slider\` | \`role="slider"\` The focusable element with . Contains the track and reference slot. | \`::part(slider)\` |
| \`thumb\` | The slider's thumb. | \`::part(thumb)\` |
| \`thumb-max\` | The max value thumb in a range slider. | \`::part(thumb-max)\` |
| \`thumb-min\` | The min value thumb in a range slider. | \`::part(thumb-min)\` |
| \`tooltip\` | \`\` The tooltip, a element. | \`::part(tooltip)\` |
| \`tooltip\_\_arrow\` | \`arrow\` The tooltip's part. | \`::part(tooltip\_\_arrow)\` |
| \`tooltip\_\_content\` | \`content\` The tooltip's part. | \`::part(tooltip\_\_content)\` |
| \`tooltip\_\_tooltip\` | \`tooltip\` The 's tooltip part. | \`::part(tooltip\_\_tooltip)\` |
| \`track\` | The slider's track. | \`::part(track)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-popup>`](https://webawesome.com/docs/components/popup)
-   [`<wa-tooltip>`](https://webawesome.com/docs/components/tooltip)

## Examples

### Labels

Use the `label` attribute to give the slider an accessible label. For labels that contain HTML, use the `label` slot instead.

```html
<wa-slider label="Volume" min="0" max="100"></wa-slider>
```

### Hint

Add descriptive hint to a slider with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html
<wa-slider label="Volume" hint="Controls the volume of the current song." min="0" max="100" value="50"></wa-slider>
```

### Showing Tooltips

Use the `with-tooltip` attribute to display a tooltip with the current value when the slider is focused or being dragged.

```html
<wa-slider label="Quality" name="quality" min="0" max="100" value="50" with-tooltip></wa-slider>
```

### Setting Min, Max, & Step

Use the `min` and `max` attributes to define the slider's range, and the `step` attribute to control the increment between values.

```html
<wa-slider label="Between zero and one" min="0" max="1" step="0.1" value="0.5" with-tooltip></wa-slider>
```

### Showing Markers

Use the `with-markers` attribute to display visual indicators at each step increment. This works best with sliders that have a smaller range of values.

```html
<wa-slider label="Size" name="size" min="0" max="8" value="4" with-markers></wa-slider>
```

### Adding References

Use the `reference` slot to add contextual labels below the slider. References are automatically spaced using `space-between`, making them easy to align with the start, center, and end positions.

```html
<wa-slider
  label="Speed"
  name="speed"
  min="1"
  max="5"
  value="3"
  with-markers
  hint="Controls the speed of the thing you're currently doing."
>
  <span slot="reference">Slow</span>
  <span slot="reference">Medium</span>
  <span slot="reference">Fast</span>
</wa-slider>
```

If you want to show a reference next to a specific marker, you can add `position: absolute` to it and set the `left`, `right`, `top`, or `bottom` property to a percentage that corresponds to the marker's position.

### Formatting the Value

Customize how values are displayed in tooltips and announced to screen readers using the `valueFormatter` property. Set it to a function that accepts a number and returns a formatted string. The [`Intl.NumberFormat API`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) is particularly useful for this.

```html
<!-- Percent -->
<wa-slider
  id="slider__percent"
  label="Percentage"
  name="percentage"
  value="0.5"
  min="0"
  max="1"
  step=".01"
  with-tooltip
></wa-slider
><br />

<script>
  const slider = document.getElementById('slider__percent');
  const formatter = new Intl.NumberFormat('en-US', { style: 'percent' });

  customElements.whenDefined('wa-slider').then(() => {
    slider.valueFormatter = value => formatter.format(value);
  });
</script>

<!-- Duration -->
<wa-slider id="slider__duration" label="Duration" name="duration" value="12" min="0" max="24" with-tooltip></wa-slider
><br />

<script>
  const slider = document.getElementById('slider__duration');
  const formatter = new Intl.NumberFormat('en-US', { style: 'unit', unit: 'hour', unitDisplay: 'long' });

  customElements.whenDefined('wa-slider').then(() => {
    slider.valueFormatter = value => formatter.format(value);
  });
</script>

<!-- Currency -->
<wa-slider id="slider__currency" label="Currency" name="currency" min="0" max="100" value="50" with-tooltip></wa-slider>

<script>
  const slider = document.getElementById('slider__currency');
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0,
  });

  customElements.whenDefined('wa-slider').then(() => {
    slider.valueFormatter = value => formatter.format(value);
  });
</script>
```

### Range Selection

Use the `range` attribute to enable dual-thumb selection for choosing a range of values. Set the initial thumb positions with the `min-value` and `max-value` attributes.

```html
<wa-slider
  label="Price Range"
  hint="Select minimum and maximum price"
  name="price"
  range
  min="0"
  max="100"
  min-value="20"
  max-value="80"
  with-tooltip
  id="slider__range"
>
  <span slot="reference">$0</span>
  <span slot="reference">$50</span>
  <span slot="reference">$100</span>
</wa-slider>

<script>
  const slider = document.getElementById('slider__range');
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  customElements.whenDefined('wa-slider').then(() => {
    slider.valueFormatter = value => formatter.format(value);
  });
</script>
```

For range sliders, the `minValue` and `maxValue` properties represent the current positions of the thumbs. When the form is submitted, both values will be included as separate entries with the same name.

```ts
const slider = document.querySelector('wa-slider[range]');

// Get the current values
console.log(`Min value: ${slider.minValue}, Max value: ${slider.maxValue}`);

// Set the values programmatically
slider.minValue = 30;
slider.maxValue = 70;
```

### Vertical Sliders

Set the `orientation` attribute to `vertical` to create a vertical slider. Vertical sliders automatically center themselves and fill the available vertical space.

```html
<div style="display: flex; gap: 1rem;">
  <wa-slider orientation="vertical" label="Volume" name="volume" value="65" style="width: 80px"></wa-slider>

  <wa-slider orientation="vertical" label="Bass" name="bass" value="50" style="width: 80px"></wa-slider>

  <wa-slider orientation="vertical" label="Treble" name="treble" value="40" style="width: 80px"></wa-slider>
</div>
```

Range sliders can also be vertical.

```html
<div style="height: 300px; display: flex; align-items: center; gap: 2rem;">
  <wa-slider
    label="Temperature Range"
    orientation="vertical"
    range
    min="0"
    max="100"
    min-value="30"
    max-value="70"
    with-tooltip
    tooltip-placement="right"
    id="slider__vertical-range"
  >
  </wa-slider>
</div>

<script>
  const slider = document.getElementById('slider__vertical-range');
  slider.valueFormatter = value => {
    return new Intl.NumberFormat('en', {
      style: 'unit',
      unit: 'fahrenheit',
      unitDisplay: 'short',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(value);
  };
</script>
```

### Size

Control the slider's size using the `size` attribute. Valid options include `xs`, `s`, `m`, `l`, and `xl`.

```html
<wa-slider size="xs" value="50" label="Extra Small"></wa-slider><br />
<wa-slider size="s" value="50" label="Small"></wa-slider><br />
<wa-slider size="m" value="50" label="Medium"></wa-slider><br />
<wa-slider size="l" value="50" label="Large"></wa-slider><br />
<wa-slider size="xl" value="50" label="Extra Large"></wa-slider>
```

### Indicator Offset

By default, the filled indicator extends from the minimum value to the current position. Use the `indicator-offset` attribute to change the starting point of this visual indicator.

```html
<wa-slider
  label="User Friendliness"
  hint="Did you find our product easy to use?"
  name="value"
  value="0"
  min="-5"
  max="5"
  indicator-offset="0"
  with-markers
  with-tooltip
>
  <span slot="reference">Easy</span>
  <span slot="reference">Moderate</span>
  <span slot="reference">Difficult</span>
</wa-slider>
```

### Disabled

Use the `disabled` attribute to disable a slider.

```html
<wa-slider label="Disabled" value="50" disabled></wa-slider>
```
