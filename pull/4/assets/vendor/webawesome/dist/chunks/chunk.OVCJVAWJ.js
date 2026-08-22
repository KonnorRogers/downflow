/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaAccordion
} from "./chunk.J4TTRVXY.js";

// src/react/accordion/index.ts
import { createComponent } from "@lit/react";
import * as React from "react";
import "@lit/react";
var tagName = "wa-accordion";
var reactWrapper = createComponent({
  tagName,
  elementClass: WaAccordion,
  react: React,
  events: {
    onWaExpand: "wa-expand",
    onWaAfterExpand: "wa-after-expand",
    onWaCollapse: "wa-collapse",
    onWaAfterCollapse: "wa-after-collapse"
  },
  displayName: "WaAccordion"
});
var accordion_default = reactWrapper;

export {
  accordion_default
};
