export class EffectScheduler {
  /**
    * @param {(fn: () => void) => void} [runMutations]
    */
  constructor (runMutations) {
    this.queue = new Set()
    this.scheduled = false
    this.boundFlush = this.flush.bind(this)
    this.runMutations = runMutations || ((callback) => callback())
  }

  flush() {
    this.scheduled = false
    const jobs = [...this.queue]
    this.queue.clear();
    this.runMutations(() => jobs.forEach(j => j()));
  }

  /**
   * @param {() => unknown} job
   */
  schedule(job) {
    this.queue.add(job);
    if (!this.scheduled) {
      this.scheduled = true;
      queueMicrotask(this.boundFlush);
    }
  }
}

