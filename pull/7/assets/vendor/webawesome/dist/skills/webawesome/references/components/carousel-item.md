# Carousel Item

`<wa-carousel-item>`

Experimental [Media](https://webawesome.com/docs/components/?category=media) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Carousel items represent individual slides within a carousel.

This component must be used as a child of [`<wa-carousel>`](https://webawesome.com/docs/components/carousel). Please see the [Carousel docs](https://webawesome.com/docs/components/carousel) to see examples of this component in action.

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/carousel-item/carousel-item.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/carousel-item/carousel-item.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/carousel-item/carousel-item.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaCarouselItem from '@awesome.me/webawesome/dist/react/carousel-item/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The carousel item's content..

## CSS Custom Properties

| Name | Description |
| --- | --- |
| \`--aspect-ratio\` | The slide's aspect ratio. Inherited from the carousel by default. |