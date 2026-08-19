---
---

<script type="module">
    window.application.context = {
        ...application.context,
        name: "",
        get displayName () {
            const name = application.context.name || "stranger"
            return `Hello ${name}`
        }
    }
    <form>
        <input flow-bind="name" name="foo">
        <p data-text="displayName"></p>
    </form>
</script>
