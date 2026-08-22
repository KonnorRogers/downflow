`flow-action` attaches an event listener and calls a function when it fires.

```html
<button flow-action="click->counter#increment">+</button>
```

Read that as: on `click`, call `increment` on the `counter` controller.

## Without a controller

Drop the controller name and the function is called on `application.context` instead.

```html
<button flow-action="click#increment">+</button>
```

```js
application.context = {
  count: 0,
  increment() {
    this.count++;
  },
};
```

This is the one place downflow doesn't use the `flow-context` sitting on the element. `flow-action` either names a controller explicitly with `->name#fn`, or it calls `application.context`. It never inherits an ambient `flow-context` the way `flow-text` does.

## Nested functions

The function name can be dotted, on a controller or on `application.context`.

```html
<button flow-action="click#modal.close">Close</button>
```

Calls `application.context.modal.close()`.

## Key modifiers

Add `.modifier` to a keyboard event to only fire on a specific key.

```html
<input flow-action="keydown.esc->modal#close" />
```

Built in names: `enter`, `tab`, `esc`, `space`, `up`, `down`, `left`, `right`, `home`, `end`, `page_up`, `page_down`. A single letter or digit works too, `.a`, `.9`.

Stack modifier keys with `+`. The last one is the key to watch for; the rest must be held down at the same time.

```html
<input flow-action="keydown.shift+ctrl+esc->modal#close" />
```

## Listening somewhere else

By default the listener goes on the element itself. Send it to `window` or `document` with `@`.

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

Space separate them.

```html
<input flow-action="focus->form#highlight blur->form#unhighlight" />
```

## Cleanup

Downflow adds and removes these listeners for you. Change the `flow-action` attribute, or remove the element from the page, and the old listener goes with it. Nothing to clean up by hand.
