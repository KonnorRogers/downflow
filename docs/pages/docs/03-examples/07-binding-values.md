---
---

<script type="module">
    window.application.context = {
        ...application.context,
        get displayName () {
            const name = application.context.name || "stranger"
            return `Hello ${name}`
        }
    }


    window.application.filters = {
      displayName (str) {
        return `Hello ${str || "stranger"}`
      }
    }
</script>

    <form>
        <input name="name">
        <p flow-text="$form.name | displayName"></p>
    </form>


    <form>
        <input flow-bind="name">
        <p flow-text="displayName"></p>
    </form>

`flow-bind` can be used a few ways.

```html
<input flow-bind="name">
```

Binds to your top-level `application.context.name`.

If you do:

```html
<div flow-controller="foo">
    <input flow-bind="foo.name">
</div>
```

It will bind to the controller at `foo.context.name`

If you use a `flow-context`, it will read from the context *unless* you opt out of it.

```html
<div flow-controller="foo bar">
    <input flow-context="foo" flow-bind="name"> <!-- this is bound to foo.context.name -->
    <input flow-context="foo" flow-bind="$context.name"> <!-- this is bound to application.context.name -->
    <input flow-context="foo" flow-bind="bar.name"> <!-- this is bound to bar.context.name -->
</div>
```


