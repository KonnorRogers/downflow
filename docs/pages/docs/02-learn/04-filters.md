---
---

A filter transforms a value on its way to the page. Register one on `application.filters`, then pipe a `flow-text` key through it with `|`.

```js
application.filters = {
  displayName(str) {
    return `Hello ${str || "stranger"}`;
  },
};
```

```html
<form>
  <input name="name" />
  <p flow-text="$form.name | displayName"></p>
</form>
```

Type into the input and the paragraph shows `Hello <name>`, or `Hello stranger` when it's empty.

## Filters are for flow-text

`flow-attr` and `flow-prop` don't run filters. If you need a computed attribute or property, put a getter on your context instead. It re-reads the same way any other value does.

```js
application.context = {
  name: "",
  get displayName() {
    return `Hello ${application.context.name || "stranger"}`;
  },
};
```

```html
<span flow-text="displayName"></span>
```

## A typo fails quietly

Pipe to a filter name that doesn't exist and downflow just skips it, no error. If a value on the page isn't changing the way you expect, check the filter name first.
