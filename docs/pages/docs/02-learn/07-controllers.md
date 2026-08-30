---
---

If you're familiar with Stimulus, you know what a controller is. For the uninitiated, a Controller is a way to attach behavior to an element.

Controllers are implemented via a `MutationObserver` under the hood.

Unlike Stimulus, controllers are intended to be something you reach for when you need more control, and not the default way of adding behavior.

To make your own controller, extend the `Controller` class from `downflow`, add a `controllerName`, register it in the `application`, and then add a `flow-controller` attribute. Like so:

```html
<script type="module">
  import { Application, Controller } from "downflow"

  class CounterController extends Controller {
    static controllerName = "counter"

    initialize () {
      this.context = {
        count: 0
      }
    }

    increment () {
      this.context.count++;
    }

    decrement () {
      this.context.count--;
    }
  }

  const application = Application.start()
  application.register(CounterController)
</script>

<!-- Creates a CounterController instance -->
<div flow-controller="counter">
  <button flow-action="click->counter#decrement">-</button>
  <span flow-text="counter#count">0</span>
  <button flow-action="click->counter#increment">+</button>
</div>
```

Controllers have some additional APIs not covered above.

## API

```js
class CounterController extends Controller {
  initialize () {
    this.application // application that registered the controller
    this.element // the element the controller is attached to

    /*
     * if the element is attached to a form, or has a parent attached to a form, or is nested in a form, it
     * will return the form. If no form found, will return null.
     */
    this.form

    this.formData // FormData from the form above.

    this.context // deep reactive state of the controller.
  }

  /** Called when the controller connects */
  connectedCallback () {}
  /** Called when the controller disconnects */
  disconnectedCallback () {}
}
```

There are also `targets` which have their own lifecycle which you can read about in the next section.
