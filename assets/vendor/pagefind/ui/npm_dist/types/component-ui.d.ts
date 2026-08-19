import * as PagefindComponents from "./components/index";
declare global {
    interface Window {
        PagefindComponents: typeof PagefindComponents;
    }
}
export * from "./components/index";
export { Instance } from "./core/instance";
export type * from "./types";
