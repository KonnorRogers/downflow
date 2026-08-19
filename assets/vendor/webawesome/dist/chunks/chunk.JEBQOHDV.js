/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  WaRating
} from "./chunk.6DBSRNX7.js";

// src/react/rating/index.ts
import { createComponent } from "@lit/react";
import * as React from "react";
import "@lit/react";
var tagName = "wa-rating";
var reactWrapper = createComponent({
  tagName,
  elementClass: WaRating,
  react: React,
  events: {
    onWaHover: "wa-hover",
    onWaInvalid: "wa-invalid"
  },
  displayName: "WaRating"
});
var rating_default = reactWrapper;

export {
  rating_default
};
