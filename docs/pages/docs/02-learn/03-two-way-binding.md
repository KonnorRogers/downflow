`flow-bind` writes a form control's value into your own state as someone types. No `flow-action`, no listener, no form even required.

```html
<input flow-bind="name">
```

Every keystroke writes to `application.context.name`.

## Show it somewhere

`flow-bind` only writes. Pair it with `flow-text` to show the value back.

```html
<input flow-bind="name">
<p flow-text="name"></p>
```

## Nested keys

Use a dotted path and downflow creates the objects in between as needed.

```html
<input flow-bind="address.city">
```

Writes to `application.context.address.city`, creating `application.context.address` first if it isn't there yet.

## The attribute form

`flow-bind:name` does the same thing as `flow-bind="name"`. Pick whichever reads better.

Do note, if one of the properties you want to bind to has an uppercase, then you need to use `flow-bind="name"` because HTML attributes are always read as lower cased by the parser.

```html
<input flow-bind:name>
<input flow-bind:address.city>
```

## Binding into a controller

`flow-bind` follows the same `flow-context` as `flow-text`. Put it inside an element scoped to a controller and it writes there instead of `application.context`.

```html
<div flow-controller="settings" flow-context="settings">
  <input flow-bind="theme">
</div>
```

Writes to the `settings` controller's `context.theme`.

## Overriding where it writes

Add `:$context` after the key to send a binding somewhere other than the current `flow-context`, without changing the attribute on a parent element.

```html
<div flow-controller="settings" flow-context="settings">
  <!-- still goes to settings' context -->
  <input flow-bind="theme">
  <!-- opts out, writes to application.context.theme instead -->
  <input flow-bind="theme:$context">
  <!-- targets a different controller entirely -->
  <input flow-bind="theme:other-controller">
</div>
```

The attribute form takes the override as its value: `flow-bind:theme="$context"`.
