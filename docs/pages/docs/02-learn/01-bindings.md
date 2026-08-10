---
layout: default.njk
---

<script type="module">
window.application.context = {
  ...window.application.context,
  foo: "bar"
}
</script>

<div>
  <input flow-attr="value:foo">
  <br>
  <input flow-prop="value:foo">
</div>
