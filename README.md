# `downflow`

Reactive DOM updates in a way that doesn't drive a steamroller through the DOM

## Documentation

<https://konnorrogers.github.io/downflow>

## Inspiration

<https://bsky.app/profile/lea.verou.me/post/3lx34db4osc23>

![Image of Lea's Bluesky post that is linked above](./docs/assets/images/inspiration.png)

## Purpose

Some amalgamation between Stimulus, Alpine and petite-vue, with less focus on components, and more focus on composition and shared state.

I eventually want to look into how you can hook up component-like rendering as well, possibly using `<template>` tags, but baby steps...

The basic idea is: "You have HTML from a server, you know the app state from the server, there's no reason you shouldn't be able to use that and be able to update all the places that need it"

Right now im affectionately calling it "downflow", with the idea being data "flows" down.

## A basic counter

The most important question of a "reactivity" / "templating" library is "What does your counter example look like?"

So here's downflow's counter.

```html
<script type="module">
  import { Application, Controller } from "downflow";

  const application = Application.start();

  application.context = {
    count: 0,
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  };
</script>
<div>
  <button flow-action="click->#decrement">-</button>
  <span flow-text="count">0</span>
  <button flow-action="click->#increment">+</button>
</div>
```

### Live bindings

We can do other fun things like "live bindings"

So if we have a form, we can access a value on the form like so and have a "live render" of what a user is typing.

```html
<form>
  <label>
    <div>Give us your name!</div>
    <input name="name" />
  </label>
  Your name is: <span flow-context="$form" flow-text="name"></span>
</form>
```

We can also disconnect the form and reference it by its id, similar to form controls.

```html
<form id="my-form">
  <label>
    <div>Give us your name!</div>
    <input name="name" />
  </label>
</form>

<!-- lots of DOM stuff -->

<div>
  Your name is:
  <span form="my-form" flow-context="$form" flow-text="name"></span>
</div>
```

### Attribute bindings

We can bind more than just textContent. We can bind attributes like so:

```html
<form>
  <input name="email" />
  <input readonly flow-context="$form" flow-attr="value:email" />
</form>
```

### Property bindings

Similar to attributes, we can also bind properties.

```html
<form>
  <input name="email" />
  <input readonly flow-context="$form" flow-prop="value:email" />
</form>
```

## Reference

### Implemented

- `flow-controller="<controller_name>"` - attaches a controller, same idea as a Stimulus controller
- `flow-action="<event>"` - events
- `flow-text="<state>"` - sets `element.textContent`
- `flow-prop="<property>:<value>"` - sets a given property
- `flow-attr="<attribute>:<value>"` - sets a given attribute
- `flow-target="<controller_name>.<target_name>"` - names an element so a controller can find it
- `flow-bind="<state>"` - writes a form control's value straight into your state, live

Coming Soon™️

## Internal Structure

`exports/` is publicly available files
`internal/` is...well...internal.

`exports` and `internal` should **NOT** write their own `.d.ts` that are co-located.

`types/` is where you place your handwritten `.d.ts` files.
