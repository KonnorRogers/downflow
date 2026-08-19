# Include

`<wa-include>`

Stable [Helpers](https://webawesome.com/docs/components/?category=helpers) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Fetches an external HTML file and embeds its contents inline on the page. Useful for reusing shared markup like headers, footers, and partials across multiple pages.

Included files are asynchronously requested using `window.fetch()`. Requests are cached, so the same file can be included multiple times, but only one request will be made.

The included content will be inserted into the `<wa-include>` element's default slot so it can be easily accessed and styled through the light DOM.

```html
<wa-include src="https://shoelace.style/assets/examples/include.html"></wa-include>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/include/include.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/include/include.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/include/include.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaInclude from '@awesome.me/webawesome/dist/react/include/index.js';
```

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `src` | `src` | The location of the HTML file to include. Be sure you trust the content you are including as it will be executed as code and can result in XSS attacks. | `string` | — |
| `mode` | `mode` | The fetch mode to use. | `'cors' \| 'no-cors' \| 'same-origin'` | `'cors'` |
| `allowScripts` | `allow-scripts` | Allows included scripts to be executed. Be sure you trust the content you are including as it will be executed as code and can result in XSS attacks. | `boolean` | `false` |

## Events

| Name | Description |
| --- | --- |
| `wa-load` | Emitted when the included file is loaded. |
| `wa-include-error` | Emitted when the included file fails to load due to an error. |

## SSR

Learn more about [Server-Side Rendering (SSR)](https://webawesome.com/docs/ssr).

`<wa-include>` fetches its content asynchronously (like [`<wa-icon>`](https://webawesome.com/docs/components/icon)), so the rendered output isn't available during SSR.

## Examples

### Listening for Events

When an include file loads successfully, the `wa-load` event will be emitted. You can listen for this event to add custom loading logic to your includes.

If the request fails, the `wa-include-error` event will be emitted. In this case, `event.detail.status` will contain the resulting HTTP status code of the request, e.g. 404 (not found).

```html
<wa-include src="https://shoelace.style/assets/examples/include.html"></wa-include>

<script>
  const include = document.querySelector('wa-include');

  include.addEventListener('wa-load', event => {
    if (event.eventPhase === Event.AT_TARGET) {
      console.log('Success');
    }
  });

  include.addEventListener('wa-include-error', event => {
    if (event.eventPhase === Event.AT_TARGET) {
      console.log('Error', event.detail.status);
    }
  });
</script>
```
