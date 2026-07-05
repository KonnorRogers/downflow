---
layout: default.njk
---

<script type="module">
    import { Application, Controller } from "flow-state/exports/application.js"

    const application = Application.start()
    application.register("counter", CounterController)

    application.context.count = 0

    class CounterController extends Controller {
        increment () {
            this.context.count += 1
            this.application.updateContext()
        }
        decrement () {
            this.context.count -= 1
            this.application.updateContext()
        }
    }
</script>

<div flow-controller="counter">
    <button flow-action="click->counter#decrement">-</button>
    <span flow-text="count"></span>
    <button flow-action="click->counter#increment">+</button>
</div>
