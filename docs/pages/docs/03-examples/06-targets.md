
<script type="module">
    import {Controller} from "downflow"
  application.context.count = 0
  application.register(
    class Example extends Controller {
      static targets = ["item"];
      static controllerName = "example-1";

      itemTargetConnected() {
        application.context.count += 1
      }

      itemTargetDisconnected() {
        console.log("disconnected - " + this.constructor.controllerName)
      }
    },
  );

  application.register(
    class Example2 extends Controller {
      static targets = ["item"];
      static controllerName = "example-2";

      itemTargetConnected() {
        application.context.count += 1
      }

      itemTargetDisconnected() {
        console.log("disconnected - " + this.constructor.controllerName)
      }
    },
  );
</script>

<span>Connected callbacks: <span flow-text="count"></span></span>

<div flow-controller="example-1 example-2">
    <div flow-target="example-1.item">Item 1</div>
    <div flow-target="example-1.item example-2.item">Item 2</div>
    <div flow-target="example-1.item example-2.item">Item 3</div>
    <div id="nested-example" flow-controller="example-1">
        <div
            id="nested-1"
            class="nested"
            flow-target="example-1.item example-2.item"
        >
            Nested 1
        </div>
        <div
            id="nested-2"
            class="nested"
            flow-target="example-1.item example-2.item"
        >
            Nested 2
        </div>
    </div>
</div>
