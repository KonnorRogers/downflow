<script type="module">
    import { Application, Controller } from "downflow"

    const application = Application.start()

    application.context = {
        count: 0,
        increment () {
            this.count++
        },
        decrement () {
            this.count--
        }
    }

    class CounterController extends Controller {
        static controllerName = "counter"

        increment () {
            application.context.count++
        }
        decrement () {
            application.context.count--
        }
    }

    class FooController extends Controller {
        static controllerName = "foo"

        initialize () {
            this.context = {
                bar: "baz"
            }
        }
    }

    application.register(CounterController)
    application.register(FooController)
</script>

<div flow-controller="counter">
    <button flow-action="click->counter#decrement">-</button>
    <span flow-text="count">0</span>
    <button flow-action="click->counter#increment">+</button>
</div>

<div>
    <button flow-action="click#decrement">-</button>
    <span flow-text="count">0</span>
    <button flow-action="click#increment">+</button>
</div>

<br><br>

<form>
    <input name="email" value="foo@gmail.com">
    <output flow-context="$form" flow-text="email"></output>
</form>

<form>
    <div data-controller="foo">
        <div flow-context="foo" flow-text="bar"></div>
    </div>
</form>
