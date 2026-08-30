/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
import {
  en_default
} from "./chunk.HK4J654O.js";

// src/utilities/localize.ts
import { LocalizeController as DefaultLocalizationController, registerTranslation } from "@shoelace-style/localize";
import { registerTranslation as registerTranslation2 } from "@shoelace-style/localize";
var LocalizeController = class extends DefaultLocalizationController {
  lang() {
    if (this.host.didSSR && !this.host.hasUpdated) {
      return this.host.lang || "en";
    }
    return super.lang();
  }
};
registerTranslation(en_default);

export {
  LocalizeController,
  registerTranslation2 as registerTranslation
};
