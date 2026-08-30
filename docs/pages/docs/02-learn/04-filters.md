---
---

A filter transforms a value on its way to the page. Register one on `application.filters`, then pipe `flow-text` through your filter with `|`.

{% set html %}
<script type="module">
  import { Application } from "downflow"

  const application = new Application()
  application.filters = {
    displayName(str) {
      return `Hello ${str || "stranger"}`;
    }
  };
  application.start()
</script>
<form>
  <input name="name">
  <p flow-text="$form.name | displayName"></p>
</form>
{% endset %}

```html
{{ html | trim | safe }}
```

{{ frame(html) }}

Type into the input and the paragraph shows `Hello <name>`, or `Hello stranger` when it's empty.

## Filters are for flow-text

`flow-attr` and `flow-prop` don't run filters. If you need a computed attribute or property, put a getter on your context instead. It will still be reactive just like any other property, as long as it is reading from another reactive property in the context.

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

## What happens if a filter doesn't exist?

Much like properties, if a filter doesn't exist, downflow just skips it. If a value on the page isn't changing the way you expect, check the filter exists first.
