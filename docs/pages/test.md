---
layout: default.njk
---

<script type="module">
  import { Application, Controller } from "downflow"

  const application = Application.start()

  window.application = application
  application.register(
    class Example extends Controller {
      static controllerName = "example";

      initialize () {
        this.state = {foo: "bar"}
      }

      handleClick() {
        console.log("Hello World.")
      }
    },
  );
</script>

<div flow-controller="example" flow-action="click@document->example#handleClick">Hello World.</div>

<div flow-controller="example" flow-scope="example" flow-text="foo">Hello World.</div>
