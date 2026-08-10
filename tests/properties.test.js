import {aTimeout, fixture, html} from "@open-wc/testing"
import { assert } from "@esm-bundle/chai"
import { Application } from "downflow"

test("Should properly bind properties", async () => {
  const application = Application.start()
  application.context = {
    foo: "bar"
  }

  const el = await fixture(html`<input flow-attr="value:foo">`)

  assert.equal(el.getAttribute("value"), "bar")
  application.stop()
})

test("Should properly re-bind properties on change", async () => {
  const application = Application.start()
  application.context = {
    foo: "bar"
  }

  const el = await fixture(html`<input flow-attr="value:foo">`)

  assert.equal(el.getAttribute("value"), "bar")

  el.setAttribute("value", "baz")
  await aTimeout(0)
  assert.equal(el.getAttribute("value", "baz"))

  application.context.foo = "foo"
  await aTimeout(0)
  assert.equal(el.getAttribute("value"), "foo")
  application.stop()
})
