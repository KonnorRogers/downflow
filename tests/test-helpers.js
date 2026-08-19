import { sendMouse, resetMouse } from '@web/test-runner-commands';


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
export async function clickOnElement (el) {
  const { x, y } = getMiddleOfElement(el)
  await sendMouse({ type: "click", position: [x, y] })
  await resetMouse();
}
