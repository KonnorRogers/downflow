# Animation

`<wa-animation>`

Stable [Helpers](https://webawesome.com/docs/components/?category=helpers) [Since 2.0](https://webawesome.com/docs/resources/changelog#wa_200)

Animate elements declaratively with nearly 100 baked-in presets, or roll your own with custom keyframes. Powered by the Web Animations API.

To animate an element, wrap it in `<wa-animation>` and set an animation `name`. The animation will not start until you add the `play` attribute. Refer to the [properties table](#attributes-and-properties) for a list of all animation options.

```html
<div class="animation-overview">
  <wa-animation name="bounce" duration="2000" play><div class="box"></div></wa-animation>
  <wa-animation name="jello" duration="2000" play><div class="box"></div></wa-animation>
  <wa-animation name="heartBeat" duration="2000" play><div class="box"></div></wa-animation>
  <wa-animation name="flip" duration="2000" play><div class="box"></div></wa-animation>
</div>

<style>
  .animation-overview .box {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: var(--wa-color-brand-fill-loud);
    margin: 1.5rem;
  }
</style>
```

The animation will only be applied to the first child element found in `<wa-animation>`.

## Importing

If you're using the autoloader or a hosted project, components load on demand — no manual import needed. To cherry-pick a component manually, use one of the following snippets.

\*\*CDN\*\*

Import this component directly from the CDN:

```js
import 'https://ka-f.webawesome.com/webawesome@3.10.0/components/animation/animation.js';
```

\*\*npm\*\*

After installing Web Awesome via npm, import this component:

```js
import '@awesome.me/webawesome/dist/components/animation/animation.js';
```

\*\*Self-Hosted\*\*

If you're self-hosting Web Awesome, import this component from your server:

```js
import './webawesome/dist/components/animation/animation.js';
```

\*\*React\*\*

To import this component for React 18 or below, use the following code:

```js
import WaAnimation from '@awesome.me/webawesome/dist/react/animation/index.js';
```

## Slots

Valid slot names for this component (use exactly these — any other `slot` value is
silently ignored and the element falls back to the default slot):

- `(default)` — The element to animate. Avoid slotting in more than one element, as subsequent ones will be ignored. To animate multiple elements, either wrap them in a single container or use multiple `<wa-animation>` elements.

## Attributes & Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `name` | `name` | The name of the built-in animation to use. For custom animations, use the `keyframes` prop. | `string` | `'none'` |
| `play` | `play` | Plays the animation. When omitted, the animation will be paused. This attribute will be automatically removed when the animation finishes or gets canceled. | `boolean` | `false` |
| `delay` | `delay` | The number of milliseconds to delay the start of the animation. | `number` | `0` |
| `direction` | `direction` | Determines the direction of playback as well as the behavior when reaching the end of an iteration. [Learn more](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction) | `PlaybackDirection` | `'normal'` |
| `duration` | `duration` | The number of milliseconds each iteration of the animation takes to complete. | `number` | `1000` |
| `easing` | `easing` | The easing function to use for the animation. This can be a Web Awesome easing function or a custom easing function such as `cubic-bezier(0, 1, .76, 1.14)`. | `string` | `'linear'` |
| `endDelay` | `end-delay` | The number of milliseconds to delay after the active period of an animation sequence. | `number` | `0` |
| `fill` | `fill` | Sets how the animation applies styles to its target before and after its execution. | `FillMode` | `'auto'` |
| `iterations` | `iterations` | The number of iterations to run before the animation completes. Defaults to `Infinity`, which loops. | `number` | `Infinity` |
| `iterationStart` | `iteration-start` | The offset at which to start the animation, usually between 0 (start) and 1 (end). | `number` | `0` |
| `keyframes` | — | The keyframes to use for the animation. If this is set, `name` will be ignored. | `Keyframe[] \| undefined` | — |
| `playbackRate` | `playback-rate` | Sets the animation's playback rate. The default is `1`, which plays the animation at a normal speed. Setting this to `2`, for example, will double the animation's speed. A negative value can be used to reverse the animation. This value can be changed without causing the animation to restart. | `number` | `1` |
| `currentTime` | — | Gets and sets the current animation time. | `CSSNumberish` | — |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `cancel()` | Clears all keyframe effects caused by this animation and aborts its playback. | — |
| `finish()` | Sets the playback time to the end of the animation corresponding to the current playback direction. | — |

## Events

| Name | Description |
| --- | --- |
| `wa-cancel` | Emitted when the animation is canceled. |
| `wa-finish` | Emitted when the animation finishes. |
| `wa-start` | Emitted when the animation starts or restarts. |

## SSR

Learn more about [Server-Side Rendering (SSR)](https://webawesome.com/docs/ssr).

`<wa-animation>` renders during SSR without causing layout shift, but won't play its animation until the component hydrates on the client. Playback is driven by the Web Animations API, which is only available in the browser.

## Examples

### Animations & Easings

This example demonstrates all of the baked-in animations and easings. Animations are based on those found in the popular [Animate.css](https://animate.style/) library.

```html
<div class="animation-sandbox">
  <wa-animation name="bounce" easing="ease-in-out" duration="2000" play>
    <div class="box"></div>
  </wa-animation>

  <wa-divider></wa-divider>

  <div class="controls">
    <wa-select label="Animation" value="bounce"></wa-select>
    <wa-select label="Easing" value="linear"></wa-select>
    <wa-input label="Playback Rate" type="number" min="0" max="2" step=".25" value="1"></wa-input>
  </div>
</div>

<script type="module">
  import { getAnimationNames, getEasingNames } from '/dist/webawesome.js';

  const container = document.querySelector('.animation-sandbox');
  const animation = container.querySelector('wa-animation');
  const animationName = container.querySelector('.controls wa-select:nth-child(1)');
  const easingName = container.querySelector('.controls wa-select:nth-child(2)');
  const playbackRate = container.querySelector('wa-input[type="number"]');
  const animations = getAnimationNames();
  const easings = getEasingNames();

  animations.map(name => {
    const option = Object.assign(document.createElement('wa-option'), {
      textContent: name,
      value: name,
    });
    animationName.appendChild(option);
  });

  easings.map(name => {
    const option = Object.assign(document.createElement('wa-option'), {
      textContent: name,
      value: name,
    });
    easingName.appendChild(option);
  });

  animationName.addEventListener('change', () => (animation.name = animationName.value));
  easingName.addEventListener('change', () => (animation.easing = easingName.value));
  playbackRate.addEventListener('input', () => (animation.playbackRate = playbackRate.value));
</script>

<style>
  .animation-sandbox .box {
    width: 100px;
    height: 100px;
    background-color: var(--wa-color-brand-fill-loud);
  }

  .animation-sandbox .controls {
    max-width: 300px;
    margin-top: 2rem;
  }

  .animation-sandbox .controls wa-select {
    margin-bottom: 1rem;
  }
</style>
```

```html
<div class="animation-sandbox-combobox">
  <wa-animation name="bounce" easing="ease-in-out" duration="2000" play>
    <div class="box"></div>
  </wa-animation>

  <wa-divider></wa-divider>

  <div class="controls">
    <wa-combobox label="Animation" placeholder="Select animation..."></wa-combobox>
    <wa-combobox label="Easing" placeholder="Select easing..."></wa-combobox>
    <wa-input label="Playback Rate" type="number" min="0" max="2" step=".25" value="1"></wa-input>
  </div>
</div>

<script type="module">
  import { getAnimationNames, getEasingNames } from '/dist/webawesome.js';

  await customElements.whenDefined('wa-combobox');
  await customElements.whenDefined('wa-option');

  const container = document.querySelector('.animation-sandbox-combobox');
  const animation = container.querySelector('wa-animation');
  const animationName = container.querySelector('.controls wa-combobox:nth-child(1)');
  const easingName = container.querySelector('.controls wa-combobox:nth-child(2)');
  const playbackRate = container.querySelector('wa-input[type="number"]');
  const animations = getAnimationNames();
  const easings = getEasingNames();

  animations.forEach(name => {
    const option = document.createElement('wa-option');
    option.value = name;
    option.textContent = name;
    animationName.append(option);
  });

  easings.forEach(name => {
    const option = document.createElement('wa-option');
    option.value = name;
    option.textContent = name;
    easingName.append(option);
  });

  await Promise.all([animationName.updateComplete, easingName.updateComplete]);

  animationName.value = 'bounce';
  easingName.value = 'ease-in-out';

  animationName.addEventListener('change', () => (animation.name = animationName.value));
  easingName.addEventListener('change', () => (animation.easing = easingName.value));
  playbackRate.addEventListener('input', () => (animation.playbackRate = playbackRate.value));
</script>

<style>
  .animation-sandbox-combobox .box {
    width: 100px;
    height: 100px;
    background-color: var(--wa-color-brand-fill-loud);
  }

  .animation-sandbox-combobox .controls {
    max-width: 300px;
    margin-top: 2rem;
  }

  .animation-sandbox-combobox .controls wa-combobox {
    margin-bottom: 1rem;
  }
</style>
```

### Using Intersection Observer

Use an [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to control the animation when an element enters or exits the viewport. For example, scroll the box below in and out of your screen. The animation stops when the box exits the viewport and restarts each time it enters the viewport.

```html
<div class="animation-scroll">
  <wa-animation name="jackInTheBox" duration="2000" iterations="1"><div class="box"></div></wa-animation>
</div>

<script>
  const container = document.querySelector('.animation-scroll');
  const animation = container.querySelector('wa-animation');
  const box = animation.querySelector('.box');

  // Watch for the box to enter and exit the viewport. Note that we're observing the box, not the animation element!
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      // Start the animation when the box enters the viewport
      animation.play = true;
    } else {
      animation.play = false;
      animation.currentTime = 0;
    }
  });
  observer.observe(box);
</script>

<style>
  .animation-scroll .box {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: var(--wa-color-brand-fill-loud);
  }
</style>
```

### Custom Keyframe Formats

Supply your own [keyframe formats](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats) to build custom animations.

```html
<div class="animation-keyframes">
  <wa-animation easing="ease-in-out" duration="2000" play>
    <div class="box"></div>
  </wa-animation>
</div>

<script>
  const animation = document.querySelector('.animation-keyframes wa-animation');
  animation.keyframes = [
    {
      offset: 0,
      easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      fillMode: 'both',
      transformOrigin: 'center center',
      transform: 'rotate(0)',
    },
    {
      offset: 1,
      easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      fillMode: 'both',
      transformOrigin: 'center center',
      transform: 'rotate(90deg)',
    },
  ];
</script>

<style>
  .animation-keyframes .box {
    width: 100px;
    height: 100px;
    background-color: var(--wa-color-brand-fill-loud);
  }
</style>
```

### Playing Animations on Demand

Animations won't play until you apply the `play` attribute. You can omit it initially, then apply it on demand such as after a user interaction. In this example, the button will animate once every time the button is clicked.

```html
<div class="animation-form">
  <wa-animation name="rubberBand" duration="1000" iterations="1">
    <wa-button appearance="filled" variant="brand">Click me</wa-button>
  </wa-animation>
</div>

<script>
  const container = document.querySelector('.animation-form');
  const animation = container.querySelector('wa-animation');
  const button = container.querySelector('wa-button');

  button.addEventListener('click', () => {
    animation.play = true;
  });
</script>
```
