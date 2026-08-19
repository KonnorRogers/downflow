---
layout: default.njk
---

<script type="module">
  import { Application, Controller } from "downflow"

  const application = Application.start()
  application.context = {
    foo: "bar"
  }
</script>

<input flow-attr="value:foo">
<br>
<input flow-prop="value:foo">
