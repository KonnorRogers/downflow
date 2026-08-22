import { Instance } from "../core/instance";
import type { InstanceOptions } from "../types";
declare class InstanceManager {
    private instances;
    private defaultOptions;
    constructor();
    private detectBundlePath;
    getInstance(name?: string, options?: InstanceOptions): Instance;
    hasInstance(name: string): boolean;
    removeInstance(name: string): void;
    getInstanceNames(): string[];
}
export declare function getInstanceManager(): InstanceManager;
/**
 * Configure options for a named instance
 */
export declare function configureInstance(name: string, options: InstanceOptions): Instance;
export {};
