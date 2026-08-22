You've got a server rendering HTML. You've got some state. You want a button that increments a number, or a span that echoes what someone typed into a form, without reaching for a framework. That's what downflow is for.

## Install

```
npm install downflow
```

Downflow ships as plain ES modules. No bundler, no build step. Drop a `<script type="module">` on the page and import it.

## Start the app

```html
<script type="module">
  import { Application } from "downflow";

  const application = Application.start();
</script>
```

`Application.start()` creates an app and turns it on. From this point downflow watches your page. Add a `flow-*` attribute anywhere, even later, even inside content you swap in after a fetch, and downflow picks it up.

## Give it some state

State lives on `application.context`. It's a plain object.

```js
application.context = {
  count: 0,
};
```

## Put a value on the page

`flow-text` sets an element's text to a value from your state.

```html
<span flow-text="count">0</span>
```

The `0` inside the span is just a placeholder for anyone reading the raw HTML. Downflow overwrites it as soon as it runs.

## Wire up an event

`flow-action` attaches an event listener and calls a function when it fires. Write the function straight on your context, and reference it with `#`.

```js
application.context = {
  count: 0,
  increment() {
    this.count++;
  },
};
```

```html
<button flow-action="click#increment">+</button>
```

`this` inside `increment` is `application.context`, so `this.count++` updates the same state your `flow-text` is reading.

## Put it together

```html
<script type="module">
  import { Application } from "downflow";

  const application = Application.start();

  application.context = {
    count: 0,
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  };
</script>

<div>
  <button flow-action="click#decrement">-</button>
  <span flow-text="count">0</span>
  <button flow-action="click#increment">+</button>
</div>
```

Click a button. The span updates. No render function, no virtual DOM diff, no template to compile. Downflow just keeps the attribute and the state in sync.

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

- [Bindings](/docs/learn/bindings/) covers `flow-text`, `flow-attr`, `flow-prop`, and where the values they show come from.
- [Actions](/docs/learn/actions/) covers everything `flow-action` can do: key modifiers, `@window`, listener options.
- [Forms](/docs/learn/forms/) covers the `$form` live binding above in full.
