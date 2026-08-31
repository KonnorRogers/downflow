## Install

{% npm "npm install downflow" %}

### Using a CDN

If you prefer to use a CDN like `jsdelivr`, downflow bundles everything into a single file at `bundles/all.js`.

```html
<script type="module">
  import { Controller, Application } from 'https://cdn.jsdelivr.net/npm/downflow@{{ version }}/bundles/all.js/+esm'
  const application = Application.start()
</script>
```

## Start the app

```js
import { Application } from "downflow";

const application = Application.start();
```

Downflow will now start watching your page via a `MutationObserver` and any `flow-*` attributes added will be automatically upgraded.

But this by itself doesn't really do anything. Lets get into how we can start doing the fun things with downflow!

## Adding state

State lives on `application.context`. Under the hood, it is a deeply reactive proxy object using `@vue/reactivity`. This is *generally* an implementation detail, but useful to know if you are using a library that compares object equality.

## The canonical counter

What reactive state tutorial is complete without a counter?

The below is how you could setup a counter. `application.context` can also have functions attached and those functions can modify state.

{%- set html -%}
<script type="module">
  import { Application } from "downflow";

  const application = Application.start();

  application.context = {
    count: 0,
    increment() {
      application.context.count++;
    },
    decrement() {
      application.context.count--;
    },
  };
</script>

<div>
  <button flow-action="click#decrement">-</button>
  <span flow-text="count">0</span>
  <button flow-action="click#increment">+</button>
</div>
{%- endset -%}

{{ frame(html) }}

<br>

```html
{{ html | trim | safe }}
```

The above code introduces a few concepts, so we'll walk through them.

- `flow-action` is used to handle events. It is a DSL for reacting to various events. You can listen for multiple events with a space separated list.
- `flow-text` reads the closest `context` and sets the `textContent` property of the element its attached to.

## Further Reading

- [Actions]({{ "/docs/learn/actions/" | url }}) covers everything `flow-action` can do: key modifiers, `@window`, listener options, and more.
- [Forms]({{ "/docs/learn/forms/" | url }}) covers the `$form` live binding.
- [Attributes]({{ "/docs/references/attributes/" | url }}) covers all attributes available in downflow.
