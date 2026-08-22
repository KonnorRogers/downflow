Three attributes put state on the page: `flow-text`, `flow-attr`, and `flow-prop`. A fourth, `flow-context`, decides which state they read from. This page covers all four.

## flow-text

Sets an element's `textContent`.

```html
<span flow-text="count">0</span>
```

## flow-attr

Sets a DOM attribute. The value is `attribute:key`.

```html
<input flow-attr="value:foo" />
```

Reads `foo` off your state and sets it as the `value` attribute. If `foo` is `null` or `undefined`, downflow removes the attribute instead of writing `"null"` onto the page.

Attributes are always strings. Set a boolean off with `flow-attr` and you get the string `"false"` sitting in the DOM, which HTML still treats as present. For real booleans, use `flow-prop`.

## flow-prop

Sets a JavaScript property on the element instead of an attribute. Same syntax, `property:key`.

```html
<input flow-prop="value:foo" />
```

The difference matters for things like `checked` or `disabled`, where you want the actual property, not a string on the tag.

## Nested keys

Any of the three accept a dotted path.

```html
<span flow-text="user.name"></span>
```

Downflow walks `user`, then `name`. If a step along the way is missing, you get an empty binding, not an error.

## Where the value comes from: flow-context

By default, `flow-text`, `flow-attr`, and `flow-prop` read from `application.context`. Add `flow-context` to read from somewhere else instead.

```html
<div flow-controller="counter">
  <span flow-context="counter" flow-text="count"></span>
</div>
```

`flow-context` takes one of:

- `$form`: the closest `<form>` ancestor, or a form referenced by a `form="id"` attribute. See [Forms](/docs/learn/forms/).
- `$context`: `application.context`, no matter what.
- a controller name: the closest ancestor with that name in its `flow-controller` attribute, reading that controller's own `context`.

`flow-context` is inherited. Set it once on a parent and every `flow-text`, `flow-attr`, and `flow-prop` underneath uses it, until something closer overrides it.

```html
<div flow-controller="foo" flow-context="foo">
  <span flow-text="bar"></span>
  <!-- reads foo's context -->
  <span flow-context="$context" flow-text="bar"></span>
  <!-- opts back out, reads application.context -->
</div>
```

## Reaching past the ambient context

Sometimes you want one binding to ignore the `flow-context` around it. Prefix the key instead of changing the attribute:

```html
<span flow-context="foo" flow-text="$context.bar"></span>
<!-- reads application.context.bar, not foo's -->

<span flow-text="counter#count"></span>
<!-- reads the "counter" controller's context.count directly -->
```

`$form.key` and `$context.key` work the same way for reaching the form or the app root. `controllerName#key` reaches straight into a named controller.

## Negation

A key can start with `!` to flip a boolean. Stack them if you really want to (`!!` flips it back).

```html
<div flow-attr="hidden:!isOpen"></div>
```

## Filters

`flow-text` (and only `flow-text`) can pipe its value through a named filter before it hits the page. See [Filters](/docs/learn/filters/).

```html
<span flow-text="name | displayName"></span>
```

## Try it

```html
<script type="module">
  window.application.context = {
    ...window.application.context,
    foo: "bar",
  };
</script>

<div>
  <input flow-attr="value:foo" />
  <br />
  <input flow-prop="value:foo" />
</div>
```
