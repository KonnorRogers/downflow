import { aTimeout, fixture, html } from "@open-wc/testing-helpers";
import { start } from "./test-helpers";
import { assert } from "@esm-bundle/chai";
import { sendKeys } from "@web/test-runner-commands";

test("Should properly pass along filters", async () => {
  const application = start();

  application.filters = {
    /** @param {string} str */
    displayName (str) {
      return `Hello ${str || "stranger"}`
    }
  }

  const form = await fixture(html`
    <form>
        <input name="name">
        <output flow-text="$form.name | displayName"></output>
    </form>
  `)

  const output = form.querySelector("output")
  assert.equal(output?.textContent, "Hello stranger")

  const word = "Moto"
  const input = form.querySelector("input")
  input.focus()
  await sendKeys({type: word})
  await aTimeout(1)
  assert.equal(output?.textContent, `Hello ${word}`)
})
