export class EffectScheduler {
  constructor () {
    this.queue = new Set()
    this.scheduled = false
    this.boundFlush = this.flush.bind(this)
  }

  flush() {
    this.scheduled = false
    const jobs = [...this.queue]
    this.queue.clear();
    jobs.forEach(j => j());
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

