/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  trimOuterMarkers
} from "../chunks/chunk.MT4KGKUD.js";
import "../chunks/chunk.7VGCIHDG.js";

// src/ssr/render-string.ts
import { render as litRender } from "@lit-labs/ssr";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
function renderString(html, renderInfo = {}) {
  const iterator = litRender(unsafeHTML(html), renderInfo);
  let result = [];
  for (const chunk of iterator) {
    result.push(chunk);
  }
  return trimOuterMarkers(result.join(""));
}
export {
  renderString
};
