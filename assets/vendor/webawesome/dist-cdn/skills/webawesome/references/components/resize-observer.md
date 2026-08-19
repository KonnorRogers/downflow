# Resize Observer

`<wa-resize-observer>`

Stable [Helpers](https://webawesome.com/docs/components/?category=helpers) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Resize observers watch their slotted elements for size changes and emit an event when they occur. Provides a thin, declarative interface to the browser's ResizeObserver API.

The resize observer will report changes to the dimensions of the elements it wraps through the `wa-resize` event. When emitted, a collection of [`ResizeObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry) objects will be attached to `event.detail` that contains the target element and information about its dimensions.

```html
<div class="resize-observer-overview">
  <wa-resize-observer>
    <div>Resize this box and watch the console 👉</div>
  </wa-resize-observer>
</div>

<script>
  const container = document.querySelector('.resize-observer-overview');
  const resizeObserver = container.querySelector('wa-resize-observer');

  resizeObserver.addEventListener('wa-resize', event => {
    console.log(event.detail);
  });
</script>

<style>
  .resize-observer-overview div {
    display: flex;
    border: solid 2px var(--wa-color-surface-border);
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4rem 2rem;
  }
</style>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/resize-observer/resize-observer.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/resize-observer/resize-observer.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/resize-observer/resize-observer.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaResizeObserver from '@awesome.me/webawesome/dist/react/resize-observer/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — One or more elements to watch for resizing.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `disabled` | `disabled` | Disables the observer. | `boolean` | `false` |

## Events

| Name | Description |
| --- | --- |
| `wa-resize` | Emitted when the element is resized. |