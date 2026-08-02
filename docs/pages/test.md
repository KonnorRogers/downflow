---
layout: default.njk
---

<script type="module">
  import { Application, Controller } from "downflow"

  const application = Application.start()

  application.register(
    class Example extends Controller {
      static controllerName = "example";

      handleClick() {
        console.log("Hello World.")
      }
    },
  );
</script>

<div flow-controller="example" flow-action="click@document->example#handleClick">Hello World.</div>
