import { aTimeout, fixture, html } from "@open-wc/testing-helpers"
import { Controller } from "downflow"
import {assert} from "@esm-bundle/chai"
import { sendKeys } from "@web/test-runner-commands"
import { start } from "./test-helpers.js"


test("Should properly handle swapping of scopes", async () => {
  const application = start()
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
  assert.equal(el.querySelector("span").textContent, "bar")

})

test("Should properly handle form scopes", async () => {
  const application = start()
  const form = await fixture(html`<form>
    <input name="foo">
    <span flow-context="$form" flow-text="foo"></span>
  </form>`)


  assert.equal(form.querySelector("span").textContent, "")

  form.querySelector("input").focus()
  await sendKeys({ type: "foo" })


  assert.equal(form.querySelector("input").value, "foo")
  assert.equal(form.querySelector("span").textContent, "foo")


})
