# Mutation Observer

`<wa-mutation-observer>`

Stable [Helpers](https://webawesome.com/docs/components/?category=helpers) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Mutation observers watch for changes to an element's DOM tree and emit an event when they occur. Provides a thin, declarative interface to the browser's MutationObserver API.

The mutation observer will report changes to the content it wraps through the `wa-mutation` event. When emitted, a collection of [MutationRecord](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord) objects will be attached to `event.detail` that contains information about how it changed.

```html
<div class="mutation-overview">
  <wa-mutation-observer attr="variant">
    <wa-button appearance="filled" variant="brand">Click to mutate</wa-button>
  </wa-mutation-observer>

  <br />
  👆 Click the button and watch the console

  <script>
    const container = document.querySelector('.mutation-overview');
    const mutationObserver = container.querySelector('wa-mutation-observer');
    const button = container.querySelector('wa-button');
    const variants = ['brand', 'success', 'neutral', 'warning', 'danger'];
    let clicks = 0;

    // Change the button's variant attribute
    button.addEventListener('click', () => {
      clicks++;
      button.setAttribute('variant', variants[clicks % variants.length]);
    });

    // Log mutations
    mutationObserver.addEventListener('wa-mutation', event => {
      console.log(event.detail);
    });
  </script>

  <style>
    .mutation-overview wa-button {
      margin-bottom: 1rem;
    }
  </style>
</div>
```

When you create a mutation observer, you must indicate what changes it should respond to by including at least one of `attr`, `child-list`, or `char-data`. If you don't specify at least one of these attributes, no mutation events will be emitted.

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/mutation-observer/mutation-observer.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/mutation-observer/mutation-observer.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/mutation-observer/mutation-observer.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaMutationObserver from '@awesome.me/webawesome/dist/react/mutation-observer/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The content to watch for mutations.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `attr` | `attr` | Watches for changes to attributes. To watch only specific attributes, separate them by a space, e.g. `attr="class id title"`. To watch all attributes, use `*`. | `string` | — |
| `attrOldValue` | `attr-old-value` | Indicates whether or not the attribute's previous value should be recorded when monitoring changes. | `boolean` | `false` |
| `charData` | `char-data` | Watches for changes to the character data contained within the node. | `boolean` | `false` |
| `charDataOldValue` | `char-data-old-value` | Indicates whether or not the previous value of the node's text should be recorded. | `boolean` | `false` |
| `childList` | `child-list` | Watches for the addition or removal of new child nodes. | `boolean` | `false` |
| `disabled` | `disabled` | Disables the observer. | `boolean` | `false` |

## Events

| Name | Description |
| --- | --- |
| `wa-mutation` | Emitted when a mutation occurs. |

## Examples

### Child List

Use the `child-list` attribute to watch for new child elements that are added or removed.

```html
<div class="mutation-child-list">
  <wa-mutation-observer child-list>
    <div class="buttons">
      <wa-button appearance="filled" variant="brand">Add button</wa-button>
    </div>
  </wa-mutation-observer>

  👆 Add and remove buttons and watch the console

  <script>
    const container = document.querySelector('.mutation-child-list');
    const mutationObserver = container.querySelector('wa-mutation-observer');
    const buttons = container.querySelector('.buttons');
    const button = container.querySelector('wa-button[variant="brand"]');
    let i = 0;

    // Add a button
    button.addEventListener('click', () => {
      const button = document.createElement('wa-button');
      button.textContent = ++i;
      buttons.append(button);
    });

    // Remove a button
    buttons.addEventListener('click', event => {
      const target = event.target.closest('wa-button:not([variant="brand"])');
      event.stopPropagation();

      if (target) {
        target.remove();
      }
    });

    // Log mutations
    mutationObserver.addEventListener('wa-mutation', event => {
      console.log(event.detail);
    });
  </script>

  <style>
    .mutation-child-list .buttons {
      display: flex;
      gap: 0.25rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }
  </style>
</div>
```
