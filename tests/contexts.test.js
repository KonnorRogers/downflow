import { aTimeout, fixture, html } from "@open-wc/testing-helpers"
import { Application, Controller } from "downflow"
import {assert} from "@esm-bundle/chai"


test("Should properly handle swapping of scopes", async () => {
  const application = Application.start()
  application.context = {email: "bar" }

  application.register(class extends Controller {
    initialize () {
      this.state = {email: "foo"}
    }
  }, "foo")


  const el = await fixture(html`<div flow-controller="foo">
    <span flow-context="foo" flow-text="email"></span>
  </div>`)


  assert.equal(el.querySelector("span").textContent, "foo")
  // We change the scope.
  el.querySelector("span").removeAttribute("flow-context")
  await aTimeout(1)
  assert.equal(el.querySelector("span").textContent, "foo")
})
