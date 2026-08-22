# Format Bytes

`<wa-format-bytes>`

Stable [Helpers](https://webawesome.com/docs/components/?category=helpers) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Formats a number of bytes as a human-readable string with the appropriate unit, such as kB, MB, or GB. Supports both byte and bit units with configurable locale.

```html
<div class="format-bytes-overview">
  The file is <wa-format-bytes value="1000"></wa-format-bytes> in size.

  <wa-divider></wa-divider>

  <wa-input type="number" value="1000" label="Number to Format" style="max-width: 180px;"></wa-input>
</div>

<script>
  const container = document.querySelector('.format-bytes-overview');
  const formatter = container.querySelector('wa-format-bytes');
  const input = container.querySelector('wa-input');

  input.addEventListener('input', () => (formatter.value = input.value || 0));
</script>
```

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/format-bytes/format-bytes.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/format-bytes/format-bytes.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/format-bytes/format-bytes.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaFormatBytes from '@awesome.me/webawesome/dist/react/format-bytes/index.js';
```

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `value` | `value` | The number to format in bytes. | `number` | `0` |
| `unit` | `unit` | The type of unit to display. | `'byte' \| 'bit'` | `'byte'` |
| `display` | `display` | Determines how to display the result, e.g. "100 bytes", "100 b", or "100b". | `'long' \| 'short' \| 'narrow'` | `'short'` |

## Examples

### Formatting Bytes

Set the `value` attribute to a number to get the value in bytes.

```html
<wa-format-bytes value="12"></wa-format-bytes><br />
<wa-format-bytes value="1200"></wa-format-bytes><br />
<wa-format-bytes value="1200000"></wa-format-bytes><br />
<wa-format-bytes value="1200000000"></wa-format-bytes>
```

### Formatting Bits

To get the value in bits, set the `unit` attribute to `bit`.

```html
<wa-format-bytes value="12" unit="bit"></wa-format-bytes><br />
<wa-format-bytes value="1200" unit="bit"></wa-format-bytes><br />
<wa-format-bytes value="1200000" unit="bit"></wa-format-bytes><br />
<wa-format-bytes value="1200000000" unit="bit"></wa-format-bytes>
```

### Localization

Use the `lang` attribute to set the number formatting locale.

```html
<wa-format-bytes value="12" lang="de"></wa-format-bytes><br />
<wa-format-bytes value="1200" lang="de"></wa-format-bytes><br />
<wa-format-bytes value="1200000" lang="de"></wa-format-bytes><br />
<wa-format-bytes value="1200000000" lang="de"></wa-format-bytes>
```
