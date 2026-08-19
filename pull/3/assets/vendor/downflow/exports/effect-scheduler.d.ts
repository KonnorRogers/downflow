export class EffectScheduler {
    /**
     * @param {(fn: () => void) => void} [runMutations]
     */
    constructor(runMutations?: ((fn: () => void) => void) | undefined);
    queue: Set<any>;
    scheduled: boolean;
    boundFlush: () => void;
    runMutations: (callback: () => void) => void;
    flush(): void;
    /**
     * @param {() => unknown} job
     */
    schedule(job: () => unknown): void;
}
