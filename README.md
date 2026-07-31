# `downflow`

## WIP: Come back later

## Purpose

Some amalgamation between Stimulus and Alpine, with less focus on component level state, and instead looking to (ab)use "app level" state.

I eventually want to look into how you can hook up component-like rendering as well, possibly using `<template>` tags, but baby steps...

The basic idea is: "You have HTML from a server, you know the app state from the server, there's no reason you shouldn't be able to use that and be able to update all the places that need it"

Right now im affectionately calling it "downflow", with the idea being data "flows" down.

## A basic counter

The most important question of a "reactivity" / "templating" library is "What does your counter example look like?"

So here's downflow's counter.

```html
<div flow-controller="counter">
    <button flow-action="click->counter#decrement">-</button>
    <span flow-text="#context.count">0</span>
    <button flow-action="click->counter#increment">+</button>
</div>
<script type="module">
    import { Application, Controller, reactive } from "downflow"

    const application = Application.start()

    application.context = {
        count: reactive(0)
    }

    class CounterController extends Controller {
        static controllerName = "counter"

        increment () {
            application.context.count.update(oldVal => oldVal + 1)
        }
        decrement () {
            application.context.count.update(oldVal => oldVal - 1)
        }
    }

    application.register(CounterController)
</script>
```

### Live bindings

We can do other fun things like "live bindings"

So if we have a form, we can access a value on the form like so and have a "live render" of what a user is typing.

```html
<form>
  <label>
    <div>Give us your name!</div>
    <input name="name">
  </label>
  Your name is: <span flow-text="#form.name"></span>
</form>
```

We can also disconnect the form and reference it by its id, similar to form controls.

```html
<form id="my-form">
  <label>
    <div>Give us your name!</div>
    <input name="name">
  </label>
</form>

<!-- lots of DOM stuff -->
<div>Your name is: <span form="my-form" flow-text="#form.name"></span></div>
```

## Reference

### Implemented

- `flow-controller="<controller_name>"` - mixins (Stimulus Controllers)
- `flow-action="<event>"` - events
- `flow-text="<state>"` - sets `element.textContent`

#### State

There are 3 keywords for state.

We have `#form`, `#context`, and `#state`

- `#form` is either the form with `id` on the element. IE: `<div flow-text="#form" id="my-form">` would look for `<form id="my-form"`. If no form attribute is on the element, the closest `<form>` element is used.
- `#context` is the global app context.
- `<controller_name>#state` requires a prefix of the controller you plan to use. IE: `<div flow-text="hello#state.foo">` would pull `state.foo` from your instance of a `HelloController`.

```js
import { Controller, reactive }
class HelloController extends Controller {
    initialize () {
        this.state = {
            foo: reactive("bar") // <-- used by `flow-text="hello#state.foo"`
                                                       //   ^ controller name. Will use the closest controller parent defined in the DOM.
        }
    }
}
```

#### Reactivity

```js
import { Application, Controller, reactive } from "downflow"

const application = Application.start()

application.context = {
    count: reactive(0)
}
```

```html
<form>
    <input name="email">
    <span>Your email is: <output flow-text="#form.email"></output></span>
</form>
<!-- Live reactivity from the host "form" -->


<!-- this also works -->
<form id="foo">
    <input name="email">
</form>

<span>Your email is: <output form="foo" flow-text="#form.email"></output></span>
```

### Not implemented

- `flow-prop="<property>:<value>"` - sets a given property
- `flow-attr="<attribute>:<value>"` - sets a given attribute
- `flow-component="<name>"` - "stamps" a component for re-rendering.
- `flow-render="<component-name>"` - Renders a component with a given name
- `flow-for="<item> in <items>"` - Renders a list of items


```html
<template flow-component="bar">
    <div id="$id">
        <!-- # automatically inherits the "scope" of whatever is passed to the component. So this would be "post.id", "post.comment", "post.url" etc. -->
        <span flow-text="$comment"></span>
        <form flow-prop:action="$url">
            <textarea></textarea>
            <button>Leave a reply</button>
        </form>
    </div>
</template>

<div
    flow-for="post in my-controller#posts"
    flow-render="bar"
    flow-key="$id"
>
</div>
```


Coming Soon™️

## Things left to decide

Right now reactivity is very naive. We can either move to signals, or use Vue's reactivity model. I haven't decided which. Right now, reactivity is a crude hammer under the hood that kind of just "updates everything".

## Internal Structure

`exports/` is publicly available files
`internal/` is...well...internal.

`exports` and `internal` should **NOT** write their own `.d.ts` that are co-located.

`types/` is where you place your handwritten `.d.ts` files.
