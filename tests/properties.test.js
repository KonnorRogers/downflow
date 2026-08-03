import {fixture, html} from "@open-wc/testing"
import { assert } from "@esm-bundle/chai"
import { Application } from "downflow"

test("Should properly bind properties", async () => {
  const application = Application.start()
  application.context = {
    foo: "bar"
  }

  const el = await fixture(html`<input flow-attr="value:foo">`)

  assert.equal(el.getAttribute("value"), "bar")
})
