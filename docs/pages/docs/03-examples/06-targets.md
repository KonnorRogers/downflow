
<script type="module">
    import {Controller} from "downflow"
  application.register(
    class Example extends Controller {
      static targets = ["item"];
      static controllerName = "example-1";

      itemTargetConnected() {
      }

      itemTargetDisconnected() {
      }
    },
  );

  application.register(
    class Example2 extends Controller {
      static targets = ["item"];
      static controllerName = "example-2";

      itemTargetConnected() {
      }

      itemTargetDisconnected() {
      }
    },
  );
</script>

<div flow-controller="example-1 example-2">
    <div flow-target="example-1.item"></div>
    <div flow-target="example-1.item example-2.item"></div>
    <div flow-target="example-1.item example-2.item"></div>
    <div id="nested-example" flow-controller="example-1">
        <div
            id="nested-1"
            class="nested"
            flow-target="example-1.item example-2.item"
        ></div>
        <div
            id="nested-2"
            class="nested"
            flow-target="example-1.item example-2.item"
        ></div>
    </div>
</div>
