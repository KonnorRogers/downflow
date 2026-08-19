# Tab Panel

`<wa-tab-panel>`

Stable [Navigation](https://webawesome.com/docs/components/?category=navigation) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Tab panels hold the content shown for a single tab inside a tab group.

This component must be used as a child of [`<wa-tab-group>`](https://webawesome.com/docs/components/tab-group). Please see the [Tab Group docs](https://webawesome.com/docs/components/tab-group) to see examples of this component in action.

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/tab-panel/tab-panel.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/tab-panel/tab-panel.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/tab-panel/tab-panel.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaTabPanel from '@awesome.me/webawesome/dist/react/tab-panel/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The tab panel's content.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `name` | `name` | The tab panel's name. | `string` | `''` |
| `active` | `active` | When true, the tab panel will be shown. | `boolean` | `false` |

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--padding\` | The tab panel's padding. |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`base\` | The component's base wrapper. | \`::part(base)\` |