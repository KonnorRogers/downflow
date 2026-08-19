---
layout: default.njk
---

<style>
  .hello-output {
    display: block;
    width: 100%;
    margin: 1em 0 0 0;
    padding: 1.1em .25em;
    font-size: 1.25em;
    line-height: 0;
    color: light-dark(#000, white);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    border-bottom: .1em solid light-dark(#000, white);
  }

  .side-by-side {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    max-width: 1000px;
    margin: 0 auto;
    & > * {
      margin: 0;
    }
  }
</style>


<script type="module">
  import { Controller } from "downflow"
  application.register(class extends Controller {
    initialize () {
      this.context = {email: "foo"}
      console.log("HELLO WORLD")
    }
  }, "foo")

  class HelloController extends Controller {
    static controllerName = "hello"
    static targets = [ "output" ]

    outputTargetConnected () {
      console.log("output target connected")
    }
    greet () {
      const formData = this.formData
      console.log("hello")
      if (formData) {
        const name = formData.get("name")
        this.outputTarget.textContent = name ? `Hello, ${name}` : ''
      }
    }
  }

  application.register(HelloController)
</script>

<div class="side-by-side">


```html
<form flow-controller="hello">
  <input name="name">

  <button type="button" flow-action="click->hello#greet">
    Greet
  </button>

  <div flow-target="hello.output"></div>
</form>
```

```js
import { Controller } from "downflow"

class HelloController extends Controller {
  static controllerName = "hello"
  static targets = [ "name" ]

  initialize() {
    this.context = {
      greeting: ""
    }
  }

  greet () {
    this.context.greeting = this.nameTarget.value ? `Hello, ${this.nameTarget.value}` : ''
  }
}
```

</div>

<form flow-controller="hello" style="
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(0, 1fr);
  place-items: end;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
">
  <div style="display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, auto); gap: 4px;">
    <input name="name">

    <button type="button" flow-action="click->hello#greet">
      Greet
    </button>
  </div>

  <div class="hello-output" flow-target="hello.output"></div>
</form>

<br><br><br>

## Live Bindings from forms

<div>

```html
<form>
  <label>
    <div>Give us your name!</div>
    <input name="name">
  </label>
  <div flow-context="$form" flow-text="name"></div>
</form>
```

<form style="
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(0, 1fr);
  place-items: end;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
">
  <label>
    <div>Give us your name!</div>
    <input name="name">
  </label>
  <div class="hello-output" flow-context="$form" flow-text="name"></div>
</form>

</div>


<br><br><br><br>

<form id="foo">
    <input name="email" value="bar">
</form>

<span>Your email is: <output flow-context="$form" form="foo" flow-text="email"></output></span>
