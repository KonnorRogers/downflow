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
</style>


<script type="module">
    import { Application, Controller, reactive } from "downflow"

    const application = Application.start()

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

    application.register(HelloController)
</script>

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem;">


```html
<div flow-controller="hello">
  <input flow-target="hello.name">

  <button flow-action="click->hello#greet">
    Greet
  </button>

  <div flow-text="hello#state.greeting"></div>
</div>
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

<div flow-controller="hello" style="
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(0, 1fr);
  place-items: end;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
">
  <div style="display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, auto); gap: 4px;">
    <input flow-target="hello.name" type="text">

    <button flow-action="click->hello#greet">
      Greet
    </button>
  </div>

  <div class="hello-output" flow-text="hello#state.greeting"></div>
</div>
