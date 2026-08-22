# Tab

`<wa-tab>`

Stable [Navigation](https://webawesome.com/docs/components/?category=navigation) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Tabs label and activate an individual panel inside a tab group.

This component must be used as a child of [`<wa-tab-group>`](https://webawesome.com/docs/components/tab-group). Please see the [Tab Group docs](https://webawesome.com/docs/components/tab-group) to see examples of this component in action.

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/tab/tab.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/tab/tab.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/tab/tab.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaTab from '@awesome.me/webawesome/dist/react/tab/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The tab's label.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `panel` | `panel` | The name of the tab panel this tab is associated with. The panel must be located in the same tab group. | `string` | `''` |
| `disabled` | `disabled` | Disables the tab and prevents selection. | `boolean` | `false` |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The component's base wrapper. | \`::part(base)\` |