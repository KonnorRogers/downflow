Every named input already has live state behind it. `$form` is how you read it.

```html
<form>
  <label>
    <div>Give us your name!</div>
    <input name="name">
  </label>
  Your name is: <span flow-context="$form" flow-text="name"></span>
</form>
```

Type into the input and the span updates as you go. No JavaScript, no `flow-bind`, nothing wired up by hand. Any input, select, or textarea with a `name` inside a `<form>` feeds this automatically.

## Which form

`$form` looks at the closest `<form>` ancestor. If your element sits outside the form, point at it the same way native HTML controls do, with a `form` attribute holding the form's `id`.

```html
<form id="my-form">
  <label>
    <div>Give us your name!</div>
    <input name="name">
  </label>
</form>

<div>
  Your name is:
  <span form="my-form" flow-context="$form" flow-text="name"></span>
</div>
```

## Reading a value without setting flow-context

You can skip `flow-context="$form"` entirely and prefix the key instead. Useful when the element is already using a different context for other bindings.

```html
<form>
  <input name="email">
  <span>Your email is: <output flow-text="$form.email"></output></span>
</form>
```

## Each form is its own state

Two forms on the same page keep separate values, even if their fields share a name. Nothing to namespace by hand.

## Starting values

The state seeds itself from whatever is already in the input when downflow first sees it, so a form pre-filled by your server shows the right value immediately, before anyone types anything.

## This is read only

`$form` gives you a live view of the form. It doesn't let you write into it from your own state, and it doesn't write into `application.context`. To push a value from a form control into your own state, see [Two-Way Binding]({{ "/docs/learn/two-way-binding/" | url }}).
