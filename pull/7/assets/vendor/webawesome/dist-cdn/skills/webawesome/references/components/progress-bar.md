# Progress Bar

`<wa-progress-bar>`

Stable [Feedback](https://webawesome.com/docs/components/?category=feedback) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Progress bars show how far along an ongoing operation is as a horizontal fill. Use them for file uploads, multi-step flows, or any task with measurable progress.

```html
<wa-progress-bar value="40"></wa-progress-bar>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/progress-bar/progress-bar.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/progress-bar/progress-bar.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/progress-bar/progress-bar.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaProgressBar from '@awesome.me/webawesome/dist/react/progress-bar/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — A label to show inside the progress indicator.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `value` | `value` | The current progress as a percentage, 0 to 100. | `number` | `0` |
| `indeterminate` | `indeterminate` | When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. | `boolean` | `false` |
| `label` | `label` | A custom label for assistive devices. | `string` | `''` |

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--indicator-color\` | \`var(--wa-color-brand-fill-loud)\` The color of the indicator. Default |
| \`--track-color\` | \`var(--wa-color-neutral-fill-normal)\` The color of the track. Default |
| \`--track-height\` | \`1rem\` The color of the track. Default |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The component's base wrapper. | \`::part(base)\` |
| \`indicator\` | The progress bar's indicator. | \`::part(indicator)\` |
| \`label\` | The progress bar's label. | \`::part(label)\` |

## Examples

### Labels

Use the `label` attribute to label the progress bar and tell assistive devices how to announce it.

```html
<wa-progress-bar value="50" label="Upload progress"></wa-progress-bar>
```

### Custom Height

Use the `--track-height` custom property to set the progress bar's height.

```html
<wa-progress-bar value="50" style="--track-height: 6px;"></wa-progress-bar>
```

### Showing Values

Use the default slot to show a value.

```html
<div class="wa-stack">
  <wa-progress-bar value="50" id="progress-bar-demo">50%</wa-progress-bar>

  <wa-divider></wa-divider>

  <div class="wa-cluster">
    <wa-button pill appearance="filled">
      <wa-icon name="minus" label="Decrease"></wa-icon>
    </wa-button>
    <wa-button pill appearance="filled">
      <wa-icon name="plus" label="Increase"></wa-icon>
    </wa-button>
  </div>
</div>

<script>
  const progressBar = document.querySelector('#progress-bar-demo');
  const subtractButton = document.querySelector('wa-button:has(wa-icon[name="minus"])');
  const addButton = document.querySelector('wa-button:has(wa-icon[name="plus"])');

  addButton.addEventListener('click', () => {
    const value = Math.min(100, progressBar.value + 10);
    progressBar.value = value;
    progressBar.textContent = `${value}%`;
  });

  subtractButton.addEventListener('click', () => {
    const value = Math.max(0, progressBar.value - 10);
    progressBar.value = value;
    progressBar.textContent = `${value}%`;
  });
</script>
```

### Indeterminate

The `indeterminate` attribute can be used to inform the user that the operation is pending, but its status cannot currently be determined. In this state, `value` is ignored and the label, if present, will not be shown.

```html
<wa-progress-bar indeterminate></wa-progress-bar>
```
