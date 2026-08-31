`flow-action` attaches an event listener and calls a function when it fires.

By default, the function is called on `application.context`.

```html
<script type="module">
  import { Application } from "downflow"
  const application = Application.start()

  application.context = {
    count: 0,
    increment() {
      this.count++;
    },
  };
</script>

<button flow-action="click#increment">+</button>
```

Read that as: on `click`, call `increment` on the `application.context`.

## With a controller

We haven't discussed controllers too much yet, but controllers are like "mixins" to add behaviors to elements.

You can read more about controllers here: <a href="{{ "/learn/controllers" | url }}">Controllers</a>

To call a function on a controller, add `->` and the controller name. Like so:

```html
<div flow-controller="counter">
  <button flow-action="click->counter#increment">+</button>
</div>
```

Just like all the other bindings in downflow, `flow-action` inherits the closest `context`, unless opted out of.

If you need to opt out of the context, you can do so by doing:

```html
flow-action="click->$context#doThing"
```

There are 2 "keywords" in downflow.

`$context` and `$form`. Everything else is bare names.

## Nested functions

The function name can be chained on a controller or on `application.context`.

```html
<button flow-action="click#modal.close">Close</button>
```

Calls `application.context.modal.close()`.

## Key modifiers

Add `.modifier` to a keyboard event to only fire on a specific key.

```html
<input flow-action="keydown.esc->modal#close">
```

Built in names: `enter`, `tab`, `esc`, `space`, `up`, `down`, `left`, `right`, `home`, `end`, `page_up`, `page_down`. Alphanumeric keys also work.

Stack modifier keys with `+`. The last one is the key to watch for; the rest must be held down at the same time.

```html
<input flow-action="keydown.shift+ctrl+esc->modal#close">
```

Means `ctrl+shift` must be held and `esc` must be pressed.

## Global listeners

By default the listener goes on the element itself. To attach the listener to the `window` or `document`, add an `@` suffix.

These events will get cleaned up when the element is disconnected from the DOM.

```html
<div flow-action="click@document->menu#close">...</div>
<div flow-action="resize@window->gallery#layout">...</div>
```

## Listener options

Append `:option` to set native `addEventListener` options. Stack as many as you need. Put `!` in front to turn one off.

```html
<div flow-action="scroll->gallery#layout:!passive">...</div>
<div flow-action="click->gallery#open:capture:!passive">...</div>
```

## Multiple actions

For multiple actions, space separate your actions.

```html
<input flow-action="focus->form#highlight blur->form#unhighlight">
```

## Cleanup

Downflow adds and removes these listeners for you. Change the `flow-action` attribute, or remove the element from the page, and the old listener goes with it.
