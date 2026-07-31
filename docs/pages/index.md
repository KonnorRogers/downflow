---
layout: default.njk
---

<script type="module">
    import { Application, Controller, reactive } from "downflow/exports/application.js"

    const application = Application.start()

    application.context = {
        count: reactive(0)
    }

    function increment() {
        application.context.count.update(oldVal => oldVal + 1)
    }

    function decrement() {
        application.context.count.update(oldVal => oldVal - 1)
    }

    class CounterController extends Controller {
        static controllerName = "counter"

        increment () {
            increment()
        }
        decrement () {
            decrement()
        }
    }

    class FooController extends Controller {
        static controllerName = "foo"

        initialize () {
            this.state = {
                bar: reactive("baz")
            }
        }
    }

    application.register(CounterController)
    application.register(FooController)
</script>

<div flow-controller="counter">
    <button flow-action="click->counter#decrement">-</button>
    <span flow-text="#context.count">0</span>
    <button flow-action="click->counter#increment">+</button>
</div>

<div>
    <button flow-action="click->counter#decrement">-</button>
    <span flow-text="#context.count">0</span>
    <button flow-action="click->counter#increment">+</button>
</div>

<br><br>

<form>
    <input name="email" value="foo@gmail.com">
    <output flow-text="#form.email"></output>
</form>

<form>
    <div data-controller="foo">
        <div flow-text="foo#state.bar"></div>
    </div>
</form>
