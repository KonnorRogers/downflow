import { aTimeout, fixture, html } from "@open-wc/testing";
import { assert } from "@esm-bundle/chai";
import { start } from "./test-helpers.js";
import { sendKeys } from "@web/test-runner-commands";

/**
  // - `flow-bind="name"`
  // - `flow-bind:name`
  // - `flow-bind:name="my-controller"
  // - `flow-bind:name="$context"
  // - `flow-bind="name:$context"`
  // - `flow-bind="myName:my-controller"`
 */

test("Should properly parse bindings", async () => {
  const application = start()

  const el = await fixture(html`<input flow-bind="name">`);

  const bindings = application.parseBindings(el)

  assert.deepEqual(bindings[0], {contextString: undefined, property: "name" })
})

test("Should properly parse bindings", async () => {
  const application = start()

  const el = await fixture(html`<input flow-bind="foo.bar.baz">`);

  const bindings = application.parseBindings(el)

  assert.deepEqual(bindings[0], {contextString: undefined, property: "foo.bar.baz" })
})

test("Should properly 2-way bind attributes onto the given context.", async () => {
  const application = start();
  application.context = {};

  const el = await fixture(html`<input flow-bind="name">`);
  el.click()
  el.focus()
  const word = "foo"
  await sendKeys({
    type: word,
  })
  await aTimeout(1)
  assert.equal(application.context.name, word)
});

test("Should properly 2-way bind with nested keys that aren't defined onto the given context.", async () => {
  const application = start();
  application.context = {};

  const el = await fixture(html`<input flow-bind="foo.bar.baz">`);
  el.click()
  el.focus()
  const word = "foo"
  await sendKeys({
    type: word,
  })
  await aTimeout(1)
  assert.equal(application.context.foo.bar.baz, word)
});
