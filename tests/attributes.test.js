import { fixture, html } from "@open-wc/testing";
import { assert } from "@esm-bundle/chai";
import { start } from "./test-helpers.js";

test("Should properly bind attributes", async () => {
  const application = start();
  application.context = {
    foo: "bar",
  };

  const el = await fixture(html`<input flow-attr="value:foo" />`);

  assert.equal(el.getAttribute("value"), "bar");
});
