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
    color: #000;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    border-bottom: .1em solid #000;
  }

  .side-by-side {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    max-width: 1000px;
    margin: 0 auto;
  }
</style>


<script type="module">
    import { Application, Controller, reactive } from "downflow"

    const application = Application.start()

    class HelloController extends Controller {
      static controllerName = "hello"
      static targets = [ "output" ]

      greet () {
        const formData = new FormData(this.form)
        this.outputTarget.textContent = `Hello, ${formData.get("name")}`
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
import { Controller, reactive } from "downflow"

class HelloController extends Controller {
  static controllerName = "hello"
  static targets = [ "name" ]

  initialize() {
    this.state = {
      greeting: reactive("")
    }
  }

  greet () {
    this.state.greeting.update(() => {
      return `Hello, ${this.nameTarget.value}`
    })
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

  <div class="hello-output" flow-target="hello.output" flow-text="hello#state.greeting"></div>
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
  <div flow-text="#form.name"></div>
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
  <div class="hello-output" flow-text="#form.name"></div>
</form>

</div>
