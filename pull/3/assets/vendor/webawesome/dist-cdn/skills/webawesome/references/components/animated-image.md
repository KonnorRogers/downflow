# Animated Image

`<wa-animated-image>`

Stable [Media](https://webawesome.com/docs/components/?category=media) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Animated images display GIFs and WEBPs with controls to play and pause them on demand. Use them when you want motion but need to give users control over when it plays.

```html
<wa-animated-image
  src="https://shoelace.style/assets/images/walk.gif"
  alt="Animation of untied shoes walking on pavement"
></wa-animated-image>
```

This component uses `<canvas>` to draw freeze frames, so images are subject to [cross-origin restrictions](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image).

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/animated-image/animated-image.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/animated-image/animated-image.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/animated-image/animated-image.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaAnimatedImage from '@awesome.me/webawesome/dist/react/animated-image/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `play-icon` — Optional play icon to use instead of the default. Works best with `<wa-icon>`.
- `pause-icon` — Optional pause icon to use instead of the default. Works best with `<wa-icon>`.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `src` | `src` | The path to the image to load. | `string` | — |
| `alt` | `alt` | A description of the image used by assistive devices. | `string` | — |
| `play` | `play` | Plays the animation. When this attribute is remove, the animation will pause. | `boolean` | — |

## Events

| Name | Description |
| --- | --- |
| `wa-load` | Emitted when the image loads successfully. |
| `wa-error` | Emitted when the image fails to load. |

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--control-box-size\` | The size of the icon box. |
| \`--icon-size\` | The size of the play/pause icons. |

## CSS Parts

| Name | Description | CSS selector |
| --- | --- | --- |
| \`control-box\` | The container that surrounds the pause/play icons and provides their background. | \`::part(control-box)\` |

## Dependencies

This component automatically imports the following elements. Sub-dependencies, if any exist, will also be included in this list.

-   [`<wa-icon>`](https://webawesome.com/docs/components/icon)

## SSR

Learn more about [Server-Side Rendering (SSR)](https://webawesome.com/docs/ssr).

Due to browser limitations, `<wa-animated-image>` can't render during SSR. As a fallback you can use a `<video>` tag, but its controls won't work, and the gif or webp will always auto-play.

## Examples

### WEBP Images

Both GIF and WEBP images are supported.

```html
<wa-animated-image
  src="https://shoelace.style/assets/images/tie.webp"
  alt="Animation of a shoe being tied"
></wa-animated-image>
```

### Setting a Width & Height

To set a custom size, apply a width and/or height to the host element.

```html
<wa-animated-image
  src="https://shoelace.style/assets/images/walk.gif"
  alt="Animation of untied shoes walking on pavement"
  style="width: 150px; height: 200px;"
>
</wa-animated-image>
```

### Customizing the Control Box

You can change the appearance and location of the control box by targeting the `control-box` part in your styles.

```html
<wa-animated-image
  src="https://shoelace.style/assets/images/walk.gif"
  alt="Animation of untied shoes walking on pavement"
  class="animated-image-custom-control-box"
></wa-animated-image>

<style>
  .animated-image-custom-control-box::part(control-box) {
    top: auto;
    right: auto;
    bottom: 1rem;
    left: 1rem;
    background-color: deeppink;
    border: none;
    color: pink;
  }
</style>
```
