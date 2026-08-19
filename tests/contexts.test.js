import { aTimeout, fixture, html } from "@open-wc/testing-helpers"
import { Application, Controller } from "downflow"
import {assert} from "@esm-bundle/chai"
import { sendKeys } from "@web/test-runner-commands"


test("Should properly handle swapping of scopes", async () => {
  const application = Application.start()
  application.context = {email: "bar" }

  application.register(class extends Controller {
    initialize () {
      this.context = {email: "foo"}
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
  application.stop()
})

test("Should properly handle form scopes", async () => {
  const application = Application.start()
  const form = await fixture(html`<form>
    <input name="foo">
    <span flow-context="$form" flow-text="foo"></span>
  </form>`)


  assert.equal(form.querySelector("span").textContent, "")

  form.querySelector("input").focus()
  await sendKeys({ type: "foo" })


  assert.equal(form.querySelector("input").value, "foo")
  assert.equal(form.querySelector("span").textContent, "foo")

  application.stop()
})
