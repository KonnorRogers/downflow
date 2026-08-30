/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaTimeInput
} from "./chunk.EU2H5WQ4.js";

// src/react/time-input/index.ts
import { createComponent } from "@lit/react";
import * as React from "react";
import "@lit/react";
var tagName = "wa-time-input";
var reactWrapper = createComponent({
  tagName,
  elementClass: WaTimeInput,
  react: React,
  events: {
    onWaClear: "wa-clear",
    onWaShow: "wa-show",
    onWaAfterShow: "wa-after-show",
    onWaHide: "wa-hide",
    onWaAfterHide: "wa-after-hide",
    onWaInvalid: "wa-invalid"
  },
  displayName: "WaTimeInput"
});
var time_input_default = reactWrapper;

export {
  time_input_default
};
