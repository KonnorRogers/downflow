# Rating

`<wa-rating>`

Stable [Forms](https://webawesome.com/docs/components/?category=forms) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Ratings display a numeric score as a row of selectable symbols, typically stars. Use them to capture quick feedback or show an average rating for a product or piece of content.

```html
<wa-rating label="Rating"></wa-rating>
```

This component works with standard `<form>` elements. Please refer to the section on [form controls](https://webawesome.com/docs/form-controls) to learn more about form submission and client-side validation.

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/rating/rating.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/rating/rating.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/rating/rating.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaRating from '@awesome.me/webawesome/dist/react/rating/index.js';
```

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `validators` | — | Validators are static because they have `observedAttributes`, essentially attributes to "watch" for changes. Whenever these attributes change, we want to be notified and update the validator. | `Validator[]` | `[]` |
| `name` | `name` | The name of the rating, submitted as a name/value pair with form data. | `string \| null` | `null` |
| `label` | `label` | A label that describes the rating to assistive devices. | `string` | `''` |
| `value` | `value` | The current rating. | `number` | `0` |
| `defaultValue` | `default-value` | The default value of the form control. Used to reset the rating to its initial value. | `number` | `0` |
| `max` | `max` | The highest rating to show. | `number` | `5` |
| `precision` | `precision` | The precision at which the rating will increase and decrease. For example, to allow half-star ratings, set this attribute to `0.5`. | `number` | `1` |
| `readonly` | `readonly` | Makes the rating readonly. | `boolean` | `false` |
| `disabled` | `disabled` | Disables the rating. | `boolean` | `false` |
| `required` | `required` | Makes the rating a required field. | `boolean` | `false` |
| `getSymbol` | `getSymbol` | A function that customizes the symbol to be rendered. The first and only argument is the rating's current value. The function should return a string containing trusted HTML of the symbol to render at the specified value. Works well with `<wa-icon>` elements. | `(value: number, isSelected: boolean) => string` | — |
| `size` | `size` | The component's size. | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'small' \| 'medium' \| 'large'` | `'m'` |
| `form` | — | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | `HTMLFormElement \| null` | — |
| `validationTarget` | — | Override this to change where constraint validation popups are anchored. | `undefined \| HTMLElement` | — |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `setCustomValidity()` | Do not use this when creating a "Validator". This is intended for end users of components. We track manually defined custom errors so we don't clear them on accident in our validators. | `message: string` |
| `formStateRestoreCallback()` | Called when the browser is trying to restore element’s state to state in which case reason is "restore", or when the browser is trying to fulfill autofill on behalf of user in which case reason is "autocomplete". In the case of "restore", state is a string, File, or FormData object previously set as the second argument to setFormValue. | `state: string \\| File \\| FormData \\| null, reason: 'autocomplete' \\| 'restore'` |
| `resetValidity()` | Reset validity is a way of removing manual custom errors and native validation. | — |

## Events

| Name | Description |
| --- | --- |
| `change` | Emitted when the rating's value changes. |
| `wa-hover` | Emitted when the user hovers over a value. The `phase` property indicates when hovering starts, moves to a new value, or ends. The `value` property tells what the rating's value would be if the user were to commit to the hovered value. |
| `wa-invalid` | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--symbol-color\` | The inactive color for symbols. |
| \`--symbol-color-active\` | The active color for symbols. |
| \`--symbol-spacing\` | The spacing to use around symbols. |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The component's base wrapper. | \`::part(base)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)

## Examples

### Labels

Ratings are commonly identified contextually, so labels aren't displayed. However, you should always provide one for assistive devices using the `label` attribute.

```html
<wa-rating label="Rate this component"></wa-rating>
```

### Maximum Value

Ratings are 0-5 by default. To change the maximum possible value, use the `max` attribute.

```html
<wa-rating label="Rating" max="3"></wa-rating>
```

### Precision

Use the `precision` attribute to let users select fractional ratings.

```html
<wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
```

### Sizing

Use the `size` attribute to adjust the size of the rating.

```html
<wa-rating label="Rating" size="xs"></wa-rating><br />
<wa-rating label="Rating" size="s"></wa-rating><br />
<wa-rating label="Rating" size="m"></wa-rating><br />
<wa-rating label="Rating" size="l"></wa-rating><br />
<wa-rating label="Rating" size="xl"></wa-rating>
```

For more granular sizing, you can use the `font-size` property.

```html
<wa-rating label="Rating" style="font-size: 2rem;"></wa-rating>
```

### Readonly

Use the `readonly` attribute to display a rating that users can't change.

```html
<wa-rating label="Rating" readonly value="3"></wa-rating>
```

### Disabled

Use the `disabled` attribute to disable the rating.

```html
<wa-rating label="Rating" disabled value="3"></wa-rating>
```

### Detecting Hover

Use the `wa-hover` event to detect when the user hovers over (or touch and drag) the rating. This lets you hook into values as the user interacts with the rating, but before they select a value.

The event has a payload with `phase` and `value` properties. The `phase` property tells when hovering starts, moves to a new value, and ends. The `value` property tells what the rating's value would be if the user were to commit to the hovered value.

```html
<div class="detect-hover">
  <wa-rating label="Rating"></wa-rating>
  <span></span>
</div>

<script>
  const rating = document.querySelector('.detect-hover > wa-rating');
  const span = rating.nextElementSibling;
  const terms = ['No rating', 'Terrible', 'Bad', 'OK', 'Good', 'Excellent'];

  rating.addEventListener('wa-hover', event => {
    span.textContent = terms[event.detail.value];

    // Clear feedback when hovering stops
    if (event.detail.phase === 'end') {
      span.textContent = '';
    }
  });
</script>

<style>
  .detect-hover span {
    position: relative;
    top: -4px;
    left: 8px;
    border-radius: var(--wa-border-radius-m);
    background: var(--wa-color-neutral-fill-loud);
    color: var(--wa-color-neutral-on-loud);
    text-align: center;
    padding: 4px 6px;
  }

  .detect-hover span:empty {
    display: none;
  }
</style>
```

### Custom Icons

You can provide custom icons by passing a function to the `getSymbol` property.

```html
<wa-rating label="Rating" class="rating-hearts" style="--symbol-color-active: #ff4136;"></wa-rating>

<script type="module">
  const rating = document.querySelector('.rating-hearts');

  await customElements.whenDefined('wa-rating');
  await rating.updateComplete;

  rating.getSymbol = () => '<wa-icon name="heart" variant="solid"></wa-icon>';
</script>
```

### Value-Based Icons

You can also use the `getSymbol` property to render different icons based on value and/or whether the icon is currently selected.

```html
<wa-rating label="Rating" class="rating-emojis"></wa-rating>

<script type="module">
  const rating = document.querySelector('.rating-emojis');

  await customElements.whenDefined('wa-rating');
  await rating.updateComplete;

  rating.getSymbol = (value, isSelected) => {
    const icons = ['face-angry', 'face-frown', 'face-meh', 'face-smile', 'face-laugh'];
    return `<wa-icon name="${icons[value - 1]}"></wa-icon>`;
  };
</script>
```

### Required

Use the `required` attribute to make the rating mandatory. The form will not submit if the user hasn't selected a value.

```html
<form class="rating-required">
  <wa-rating label="Rating" required></wa-rating>
  <br /><br />
  <wa-button appearance="filled" type="submit">Submit</wa-button>
</form>

<script type="module">
  const form = document.querySelector('.rating-required');

  await Promise.all([customElements.whenDefined('wa-button'), customElements.whenDefined('wa-rating')]).then(() => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('All fields are valid!');
    });
  });
</script>
```

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html
<form class="rating-custom-validity">
  <wa-rating label="Rating"></wa-rating>
  <br /><br />
  <wa-button appearance="filled" type="submit">Submit</wa-button>
</form>

<script type="module">
  const form = document.querySelector('.rating-custom-validity');
  const rating = form.querySelector('wa-rating');
  const errorMessage = 'Please rate at least 3 stars!';

  customElements.whenDefined('wa-rating').then(async () => {
    await rating.updateComplete;
    rating.setCustomValidity(errorMessage);
  });

  rating.addEventListener('change', () => {
    rating.setCustomValidity(rating.value >= 3 ? '' : errorMessage);
  });

  await Promise.all([customElements.whenDefined('wa-button'), customElements.whenDefined('wa-rating')]).then(() => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('All fields are valid!');
    });
  });
</script>
```

### Form Submission

Ratings can be used in forms just like native form controls. The rating's `name` and `value` will be included in the form data when submitted.

```html
<form class="rating-form-submission" action="about:blank" method="get" target="_blank">
  <label style="display: block; margin-bottom: 0.5rem;">How would you rate your experience?</label>
  <wa-rating name="rating" label="Rating" required></wa-rating>
  <br /><br />
  <wa-button type="submit">Submit</wa-button>
  <wa-button appearance="filled" type="reset" variant="neutral">Reset</wa-button>
</form>
```
