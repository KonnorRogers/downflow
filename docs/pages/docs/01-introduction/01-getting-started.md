## Install

{% npm "npm install downflow" %}

### Using a CDN

If you prefer to use a CDN like `jsdelivr`, downflow bundles everything into a single file at `bundles/all.js`.

```html
<script type="module">
  import { Controller, Application } from 'https://cdn.jsdelivr.net/npm/downflow@{{ version }}/+esm'
  const application = Application.start()
</script>
```

## Start the app

```js
import { Application } from "downflow";

const application = Application.start();
```

Downflow will now start watching your page via a `MutationObserver` and any `flow-*` attributes added will be automatically upgraded.

## Adding state

State lives on `application.context`. Under the hood, it is a deeply reactive proxy object using `@vue/reactivity`. This is *generally* an implementation detail, but useful to know if you are using a library that compares object equality.

## The canonical counter

<wa-tab-group>

<wa-tab name="code">Code</wa-tab>
<wa-tab-panel name="code">

```html
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
```

</wa-tab-panel>




</wa-tab-group>

## Reading from a form, live

Downflow also reads form values without any wiring at all. Give an input a `name`, put a `flow-text` (or `flow-attr`, or `flow-prop`) nearby with `flow-context="$form"`, and it updates as someone types.

```html
<form>
  <label>
    <div>Give us your name!</div>
    <input name="name" />
  </label>
  Your name is: <span flow-context="$form" flow-text="name"></span>
</form>
```

## Next

- [Bindings]({{ "/docs/learn/bindings/" | url }}) covers `flow-text`, `flow-attr`, `flow-prop`, and where the values they show come from.
- [Actions]({{ "/docs/learn/actions/" | url }}) covers everything `flow-action` can do: key modifiers, `@window`, listener options.
- [Forms]({{ "/docs/learn/forms/" | url }}) covers the `$form` live binding above in full.
