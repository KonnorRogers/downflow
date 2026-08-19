import { sendMouse, resetMouse } from "@web/test-runner-commands";
import { Application } from "downflow";

let applications = [];

export function start(options) {
  const application = new Application(options);
  application.start(options);
  applications.push(application);
  return application;
}

// After each test
teardown(() => {
  applications.forEach((app) => {
    app.stop();
  });
  applications = [];
  document.body.innerHTML = ""; // clears manually-appended nodes fixture() won't
});

/**
 * @param {Element} el
 */
export function getMiddleOfElement(element) {
  const { x, y, width, height } = element.getBoundingClientRect();

  return {
    x: Math.floor(x + window.pageXOffset + width / 2),
    y: Math.floor(y + window.pageYOffset + height / 2),
  };
}

/**
 * @param {Element} el
 */
export async function clickOnElement(el) {
  const { x, y } = getMiddleOfElement(el);
  await sendMouse({ type: "click", position: [x, y] });
  await resetMouse();
}
