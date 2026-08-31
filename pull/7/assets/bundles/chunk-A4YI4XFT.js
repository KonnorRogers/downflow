import {
  __privateAdd,
  __privateGet,
  __privateSet,
  __privateWrapper,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-UKNFP365.js";

// node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
var EMPTY_OBJ = true ? Object.freeze({}) : {};
var EMPTY_ARR = true ? Object.freeze([]) : [];
var extend = Object.assign;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
var camelizeRE = /-\w/g;
var camelize = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
  }
);
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
var capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
var toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isBooleanAttr = /* @__PURE__ */ makeMap(
  specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
);

// node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
function warn(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
var activeEffectScope;
var EffectScope = class {
  // TODO isolatedDeclarations "__v_skip"
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this._on = 0;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
    this._warnOnRun = true;
    this.__v_skip = true;
    if (!detached && activeEffectScope) {
      if (activeEffectScope.active) {
        this.parent = activeEffectScope;
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
          this
        ) - 1;
      } else {
        this._active = false;
        this._warnOnRun = false;
      }
    }
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        const scopes = this.scopes.slice();
        for (i = 0, l = scopes.length; i < l; i++) {
          scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          const scopes = this.scopes.slice();
          for (i = 0, l = scopes.length; i < l; i++) {
            scopes[i].resume();
          }
        }
        const effects = this.effects.slice();
        for (i = 0, l = effects.length; i < l; i++) {
          effects[i].resume();
        }
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else if (this._warnOnRun) {
      warn(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    if (++this._on === 1) {
      this.prevScope = activeEffectScope;
      activeEffectScope = this;
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (activeEffectScope === this) {
        activeEffectScope = this.prevScope;
      } else {
        let current = activeEffectScope;
        while (current) {
          if (current.prevScope === this) {
            current.prevScope = this.prevScope;
            break;
          }
          current = current.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        const scopes = this.scopes.slice();
        for (i = 0, l = scopes.length; i < l; i++) {
          scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
};
function effectScope(detached) {
  return new EffectScope(detached);
}
var activeSub;
var pausedQueueEffects = /* @__PURE__ */ new WeakSet();
var ReactiveEffect = class {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope) {
      if (activeEffectScope.active) {
        activeEffectScope.effects.push(this);
      } else {
        this.flags &= -2;
      }
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      if (activeSub !== this) {
        warn(
          "Active effect was not restored correctly - this is likely a Vue internal bug."
        );
      }
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
};
var batchDepth = 0;
var batchedSub;
var batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed) {
  if (computed.flags & 4 && !(computed.flags & 16)) {
    return;
  }
  computed.flags &= -17;
  if (computed.globalVersion === globalVersion) {
    return;
  }
  computed.globalVersion = globalVersion;
  if (!computed.isSSR && computed.flags & 128 && (!computed.deps && !computed._dirty || !isDirty(computed))) {
    return;
  }
  computed.flags |= 2;
  const dep = computed.dep;
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed;
  shouldTrack = true;
  try {
    prepareDeps(computed);
    const value = computed.fn(computed._value);
    if (dep.version === 0 || hasChanged(value, computed._value)) {
      computed.flags |= 128;
      computed._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed);
    computed.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (dep.subsHead === link) {
    dep.subsHead = nextSub;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
function effect(fn, options) {
  if (fn.effect instanceof ReactiveEffect) {
    fn = fn.effect.fn;
  }
  const e = new ReactiveEffect(fn);
  if (options) {
    extend(e, options);
  }
  try {
    e.run();
  } catch (err) {
    e.stop();
    throw err;
  }
  const runner = e.run.bind(e);
  runner.effect = e;
  return runner;
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
var globalVersion = 0;
var Link = class {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
};
var Dep = class {
  // TODO isolatedDeclarations "__v_skip"
  constructor(computed) {
    this.computed = computed;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
    this.__v_skip = true;
    if (true) {
      this.subsHead = void 0;
    }
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    if (activeSub.onTrack) {
      activeSub.onTrack(
        extend(
          {
            effect: activeSub
          },
          debugInfo
        )
      );
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (true) {
        for (let head = this.subsHead; head; head = head.nextSub) {
          if (head.sub.onTrigger && !(head.sub.flags & 8)) {
            head.sub.onTrigger(
              extend(
                {
                  effect: head.sub
                },
                debugInfo
              )
            );
          }
        }
      }
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
};
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed = link.dep.computed;
    if (computed && !link.dep.subs) {
      computed.flags |= 4 | 16;
      for (let l = computed.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    if (link.dep.subsHead === void 0) {
      link.dep.subsHead = link;
    }
    link.dep.subs = link;
  }
}
var targetMap = /* @__PURE__ */ new WeakMap();
var ITERATE_KEY = /* @__PURE__ */ Symbol(
  true ? "Object iterate" : ""
);
var MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  true ? "Map keys iterate" : ""
);
var ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  true ? "Array iterate" : ""
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    if (true) {
      dep.track({
        target,
        type,
        key
      });
    } else {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      if (true) {
        dep.trigger({
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        });
      } else {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function reactiveReadArray(array) {
  const raw = /* @__PURE__ */ toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return /* @__PURE__ */ isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
function toWrapped(target, item) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
  }
  return toReactive(item);
}
var arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toWrapped(this, value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(
      this,
      "filter",
      fn,
      thisArg,
      (v) => v.map((item) => toWrapped(this, item)),
      arguments
    );
  },
  find(fn, thisArg) {
    return apply(
      this,
      "find",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(
      this,
      "findLast",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", (item) => toWrapped(this, item));
  }
};
function iterator(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !/* @__PURE__ */ isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (!result.done) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
var arrayProto = Array.prototype;
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
  let wrappedFn = fn;
  let wrapInitialAccumulator = false;
  if (arr !== self2) {
    if (needsWrap) {
      wrapInitialAccumulator = args.length === 0;
      wrappedFn = function(acc, item, index) {
        if (wrapInitialAccumulator) {
          wrapInitialAccumulator = false;
          acc = toWrapped(self2, acc);
        }
        return fn.call(this, acc, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  const result = arr[method](wrappedFn, ...args);
  return wrapInitialAccumulator ? toWrapped(self2, result) : result;
}
function searchProxy(self2, method, args) {
  const arr = /* @__PURE__ */ toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
    args[0] = /* @__PURE__ */ toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = (/* @__PURE__ */ toRaw(self2))[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty2(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = /* @__PURE__ */ toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
var BaseReactiveHandler = class {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty2;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ isRef(target) ? target : receiver
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (/* @__PURE__ */ isRef(res)) {
      const value = targetIsArray && isIntegerKey(key) ? res : res.value;
      return isReadonly2 && isObject(value) ? /* @__PURE__ */ readonly(value) : value;
    }
    if (isObject(res)) {
      return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
    }
    return res;
  }
};
var MutableReactiveHandler = class extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    const isArrayWithIntegerKey = isArray(target) && isIntegerKey(key);
    if (!this._isShallow) {
      const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
      if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
        oldValue = /* @__PURE__ */ toRaw(oldValue);
        value = /* @__PURE__ */ toRaw(value);
      }
      if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
        if (isOldValueReadonly) {
          if (true) {
            warn(
              `Set operation on key "${String(key)}" failed: target is readonly.`,
              target[key]
            );
          }
          return true;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      /* @__PURE__ */ isRef(target) ? target : receiver
    );
    if (target === /* @__PURE__ */ toRaw(receiver) && result) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
};
var ReadonlyReactiveHandler = class extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    if (true) {
      warn(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    if (true) {
      warn(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
};
var mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
var readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = /* @__PURE__ */ toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return extend(
      // inheriting all iterator properties
      Object.create(innerIterator),
      {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        }
      }
    );
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    if (true) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        /* @__PURE__ */ toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
      return target.size;
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend(
    instrumentations,
    readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        const target = /* @__PURE__ */ toRaw(this);
        const proto = getProto(target);
        const rawValue = /* @__PURE__ */ toRaw(value);
        const valueToAdd = !shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value) ? rawValue : value;
        const hadKey = proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue);
        if (!hadKey) {
          target.add(valueToAdd);
          trigger(target, "add", valueToAdd, valueToAdd);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
          value = /* @__PURE__ */ toRaw(value);
        }
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        } else if (true) {
          checkIdentityKeys(target, has, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
        return this;
      },
      delete(key) {
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        } else if (true) {
          checkIdentityKeys(target, has, key);
        }
        const oldValue = get ? get.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0, oldValue);
        }
        return result;
      },
      clear() {
        const target = /* @__PURE__ */ toRaw(this);
        const hadItems = target.size !== 0;
        const oldTarget = true ? isMap(target) ? new Map(target) : new Set(target) : void 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0,
            oldTarget
          );
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
var mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
var readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
function checkIdentityKeys(target, has, key) {
  const rawKey = /* @__PURE__ */ toRaw(key);
  if (rawKey !== key && has.call(target, rawKey)) {
    const type = toRawType(target);
    warn(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
var reactiveMap = /* @__PURE__ */ new WeakMap();
var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
var readonlyMap = /* @__PURE__ */ new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function reactive(target) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
// @__NO_SIDE_EFFECTS__
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (true) {
      warn(
        `value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(
          target
        )}`
      );
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  if (target["__v_skip"] || !Object.isExtensible(target)) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = targetTypeMap(toRawType(target));
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
// @__NO_SIDE_EFFECTS__
function isReactive(value) {
  if (/* @__PURE__ */ isReadonly(value)) {
    return /* @__PURE__ */ isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
// @__NO_SIDE_EFFECTS__
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
// @__NO_SIDE_EFFECTS__
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
// @__NO_SIDE_EFFECTS__
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
// @__NO_SIDE_EFFECTS__
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? /* @__PURE__ */ toRaw(raw) : observed;
}
var toReactive = (value) => isObject(value) ? /* @__PURE__ */ reactive(value) : value;
var toReadonly = (value) => isObject(value) ? /* @__PURE__ */ readonly(value) : value;
// @__NO_SIDE_EFFECTS__
function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
}
// @__NO_SIDE_EFFECTS__
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (/* @__PURE__ */ isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
var RefImpl = class {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : /* @__PURE__ */ toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    if (true) {
      this.dep.track({
        target: this,
        type: "get",
        key: "value"
      });
    } else {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly(newValue);
    newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      if (true) {
        this.dep.trigger({
          target: this,
          type: "set",
          key: "value",
          newValue,
          oldValue
        });
      } else {
        this.dep.trigger();
      }
    }
  }
};

// exports/controller.js
var Controller = class {
  /**
   * @param {object} options
   * @param {HTMLElement} options.element
   * @param {import("./application.js").Application} options.application
   * @param {string} options.controllerName
   */
  constructor({ element, application, controllerName }) {
    const ctor = (
      /** @type {typeof Controller} */
      this.constructor
    );
    if (!ctor.__finalized__) {
      ctor.__finalized__ = true;
      ctor.targets.forEach((targetName) => {
        Object.defineProperties(ctor.prototype, {
          [`${targetName}Targets`]: {
            get() {
              const targets = this.application.targetsForController(
                this,
                targetName
              );
              return targets;
            }
          },
          [`has${capitalize2(targetName)}Target`]: {
            get() {
              return Boolean(this[`${targetName}Target`]);
            }
          },
          [`${targetName}Target`]: {
            get() {
              var _a;
              return ((_a = this[`${targetName}Targets`]) == null ? void 0 : _a[0]) || null;
            }
          }
        });
      });
    }
    this.element = element;
    this.application = application;
    this.controllerName = controllerName;
    this.isConnected = false;
    this._contextRef = ref({});
  }
  get context() {
    return this._contextRef.value;
  }
  set context(obj) {
    if (isRef(obj)) {
      this._contextRef.value = obj.value;
      return;
    }
    this._contextRef.value = obj;
  }
  /**
   * Finds the closest form element.
   * @returns {HTMLFormElement | null}
   */
  get form() {
    var _a, _b;
    let form = this.element.form;
    if (form) {
      return form;
    }
    const formAttr = (_b = (_a = this.element) == null ? void 0 : _a.getAttribute) == null ? void 0 : _b.call(_a, "form");
    if (formAttr) {
      return this.element.querySelector(`#${formAttr}`);
    }
    return this.element.closest("form") || null;
  }
  get formData() {
    const form = this.form;
    if (!form) {
      return null;
    }
    return new FormData(form);
  }
  initialize() {
  }
  // Should we support connect / disconnect shorthand??
  // connect () {}
  connectedCallback() {
  }
  // disconnect() {}
  disconnectedCallback() {
  }
};
/**
 * @type {string[]}
 */
__publicField(Controller, "targets", []);
/**
 * @type {string | null | undefined}
 */
__publicField(Controller, "controllerName");
__publicField(Controller, "__finalized__", false);
function capitalize2(str) {
  return str[0].toUpperCase() + str.slice(1, str.length);
}

// internal/string-scanner.js
var _input, _cursor;
var StringScanner = class {
  /**
   * @param {string} input
   */
  constructor(input) {
    __privateAdd(this, _input);
    __privateAdd(this, _cursor);
    __privateSet(this, _input, input);
    __privateSet(this, _cursor, 0);
  }
  get input() {
    return __privateGet(this, _input);
  }
  get currentCharacter() {
    return this.input[this.cursor];
  }
  /**
   * @return {number}
   */
  get cursor() {
    return __privateGet(this, _cursor);
  }
  /**
   * If cursor is at the end of the string
   */
  get done() {
    return this.cursor >= this.input.length;
  }
  /**
   * Returns the next character, or '' if done without advancing the cursor.
   *
   * @param {number} [distance=1]
   * @return {string} 1 or multiple characters depending on distance.
   */
  peek(distance = 1) {
    let str = "";
    for (let i = 1; i <= distance; i++) {
      str += this.input[this.cursor + i];
    }
    return str;
  }
  /**
   * Returns the next character[s], or '' if done. Advances the cursor.
   *
   * @param {number} [distance=1]
   * @return {string} characters or ''
   */
  pop(distance = 1) {
    let str = "";
    for (let i = 0; i < distance; i++) {
      str += this.input[__privateGet(this, _cursor)];
      __privateWrapper(this, _cursor)._++;
    }
    return str;
  }
  /**
   * Returns the string match for `regex` starting
   * from the current cursor. Advances cursor if a
   * match is found. Returns `undefined` otherwise.
   *
   * @param {RegExp} regex
   * @return {string|undefined}
   * @throws {Error} given regex global flag not set
   */
  scan(regex) {
    if (!regex.global) {
      throw Error("regex global flag must be set");
    }
    regex.lastIndex = __privateGet(this, _cursor);
    const match = regex.exec(__privateGet(this, _input));
    if (match === null || match.index !== __privateGet(this, _cursor)) {
      return void 0;
    }
    __privateSet(this, _cursor, regex.lastIndex);
    return match[0];
  }
  // ...
};
_input = new WeakMap();
_cursor = new WeakMap();

// internal/action-parser.js
var ActionParser = class {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = input;
  }
  /**
   * @return {ParsedAction}
   */
  parse() {
    const obj = {
      eventName: null,
      eventModifier: null,
      additionalEventModifiers: [],
      globalTarget: null,
      controllerName: null,
      controllerFunction: null,
      actionOptions: [],
      errors: [],
      source: this.input
    };
    const scanner = new StringScanner(this.input);
    const ctor = (
      /** @type {typeof ActionParser} */
      this.constructor
    );
    let { eventName, eventModifier, additionalEventModifiers } = this.parseEvent(scanner);
    if (!eventName) {
      obj.errors.push(ctor.NoEventNameError);
      return obj;
    }
    obj.eventName = eventName;
    obj.eventModifier = eventModifier;
    obj.additionalEventModifiers = additionalEventModifiers;
    const globalTarget = this.findGlobalTarget(scanner);
    if (globalTarget) {
      obj.globalTarget = globalTarget;
    }
    const controllerName = this.findControllerName(scanner);
    if (controllerName instanceof Error) {
      obj.errors.push(ctor.NoControllerNameError);
      return obj;
    }
    obj.controllerName = controllerName;
    const controllerFunction = this.findControllerFunction(scanner);
    if (!controllerFunction) {
      obj.errors.push(ctor.NoControllerFunctionError);
      return obj;
    }
    obj.controllerFunction = controllerFunction;
    const actionOptions = this.findActionOptions(scanner);
    obj.actionOptions = actionOptions;
    return obj;
  }
  /**
   * Finds all `actionOptions`, IE: ":!passive", ":!capture", etc
   * @param {StringScanner} scanner
   * @return {Array<string>}
   */
  findActionOptions(scanner) {
    let actionOptions = [];
    while (!scanner.done) {
      const action = this.findActionOption(scanner);
      actionOptions.push(action);
      if (action === "") {
        return actionOptions;
      }
    }
    return actionOptions;
  }
  /**
   * Finds an `actionOption`, IE: ":!passive", ":!capture", etc
   * @param {StringScanner} scanner
   * @return {string}
   */
  findActionOption(scanner) {
    let actionOption = "";
    if (scanner.currentCharacter !== ":") {
      return actionOption;
    }
    scanner.pop();
    while (!scanner.done) {
      if (scanner.peek() === ":") {
        actionOption += scanner.pop();
        return actionOption;
      }
      actionOption += scanner.pop();
    }
    return actionOption;
  }
  /**
   * Finds the `controllerFunction`, IE: "doThing", "doOtherThing", etc
   * @param {StringScanner} scanner
   * @return {string}
   */
  findControllerFunction(scanner) {
    let controllerFunction = "";
    if (scanner.currentCharacter !== "#") {
      return controllerFunction;
    }
    scanner.pop();
    while (!scanner.done) {
      if (scanner.peek() === ":") {
        controllerFunction += scanner.pop();
        return controllerFunction;
      }
      controllerFunction += scanner.pop();
    }
    return controllerFunction;
  }
  /**
   * Finds the `controllerName`, IE: "my-controller"
   * @param {StringScanner} scanner
   * @return {Error | string | null}
   */
  findControllerName(scanner) {
    let controllerName = "";
    if (scanner.currentCharacter + scanner.peek() !== "->" && scanner.currentCharacter !== "#") {
      return Error(`Expected "->" or "#"`);
    }
    if (scanner.currentCharacter === "#") {
      return null;
    } else {
      scanner.pop(2);
    }
    if (scanner.currentCharacter === "#") {
      return null;
    }
    while (!scanner.done) {
      if (scanner.peek() === "#") {
        controllerName += scanner.pop();
        return controllerName;
      }
      controllerName += scanner.pop();
    }
    return controllerName || null;
  }
  /**
   * Finds the `globalTarget`. Either `@window` or `@document` usually.
   * @param {StringScanner} scanner
   * @return {string | null}
   */
  findGlobalTarget(scanner) {
    let globalTarget = "";
    if (scanner.currentCharacter !== "@") {
      return null;
    }
    scanner.pop();
    while (!scanner.done) {
      if (scanner.peek(2) === "->") {
        globalTarget += scanner.pop();
        return globalTarget;
      }
      globalTarget += scanner.pop();
    }
    return globalTarget || null;
  }
  /**
   * Finds the `eventName`, IE: "click", "scroll", etc
   * @param {StringScanner} scanner
   * @return {EventTokens}
   */
  parseEvent(scanner) {
    let parsedStr = "";
    while (!scanner.done) {
      const nextChar = scanner.peek();
      if (["@", "#"].includes(nextChar) || scanner.peek(2) === "->") {
        parsedStr += scanner.pop();
        break;
      }
      parsedStr += scanner.pop();
    }
    const splitStr = parsedStr.split(/\./);
    const eventName = splitStr[0];
    const modifiers = (splitStr[1] || "").split(/\+/);
    const additionalEventModifiers = [];
    const eventModifier = modifiers.pop() || null;
    if (modifiers.length > 0) {
      modifiers.forEach((modifier) => additionalEventModifiers.push(modifier));
    }
    return {
      eventName,
      eventModifier,
      additionalEventModifiers
    };
  }
};
/**
 * At minimum, an action needs an eventName, controllerFunction, and controllerName
 */
__publicField(ActionParser, "NoEventNameError", "No event name found");
__publicField(ActionParser, "NoControllerFunctionError", "No controller function name found");
__publicField(ActionParser, "NoControllerNameError", "No controller name found");

// exports/effect-scheduler.js
var EffectScheduler = class {
  /**
   * @param {(fn: () => void) => void} [runMutations]
   */
  constructor(runMutations) {
    this.queue = /* @__PURE__ */ new Set();
    this.scheduled = false;
    this.boundFlush = this.flush.bind(this);
    this.runMutations = runMutations || ((callback) => callback());
  }
  flush() {
    this.scheduled = false;
    const jobs = [...this.queue];
    this.queue.clear();
    this.runMutations(() => jobs.forEach((j) => j()));
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
};

// exports/application.js
function dig(obj, ...args) {
  let current = obj;
  for (const key of args) {
    if (current == null) return void 0;
    current = current[key];
  }
  return current;
}
function dig_p(obj, ...args) {
  let current = obj;
  for (const key of args) {
    if (current == null) {
      return null;
    }
    if (current[key] == null) {
      current[key] = {};
    }
    current = current[key];
  }
  return current;
}
var Application = class {
  /**
   * Starts the registry and listens.
   * @param {RegistryOptions} options
   */
  static start(options = {}) {
    return new this(options).start();
  }
  /**
   * @param {RegistryOptions} options
   */
  constructor(options = {}) {
    if (!options.rootElement) {
      options.rootElement = document.documentElement;
    }
    if (!(options.rootElement instanceof Element)) {
      throw new Error(
        `The rootElement must an Element. Was given ${options.rootElement}`
      );
    }
    this.rootElement = options.rootElement;
    this.handleMutations = this.handleMutations.bind(this);
    this._controllerIds = /* @__PURE__ */ new WeakMap();
    this._controllerSequentialId = 0;
    this._controllerConstructorMap = /* @__PURE__ */ new Map();
    this._actionListenerMap = /* @__PURE__ */ new Map();
    this._controllerInstanceMap = /* @__PURE__ */ new Map();
    this._targetConnectionMap = /* @__PURE__ */ new Map();
    this._bindingSignatures = /* @__PURE__ */ new Map();
    this.started = false;
    this._pauseCount = 0;
    this.getControllerBinding = (node) => {
      var _a;
      return (_a = node.getAttribute) == null ? void 0 : _a.call(node, "flow-controller");
    };
    this.getTargetBinding = (node) => {
      var _a, _b;
      return (_b = (_a = node.getAttribute) == null ? void 0 : _a.call(node, `flow-target`)) == null ? void 0 : _b.split(/\s+/);
    };
    this.getTextBinding = (node) => {
      var _a;
      return (_a = node.getAttribute) == null ? void 0 : _a.call(node, "flow-text");
    };
    this.parseTextBinding = (el) => {
      const binding = this.getTextBinding(el);
      if (!binding) {
        return null;
      }
      const filters = [];
      let key = binding.trim();
      binding.split("|").forEach((str, index) => {
        if (index === 0) {
          key = str.trim();
        } else {
          filters.push(str);
        }
      });
      let value = this.resolveValue(el, key);
      filters.forEach((key2) => {
        const callback = this.filters[key2.trim()];
        if (typeof callback === "function") {
          value = callback(value);
          return;
        }
      });
      return value == null ? "" : String(value);
    };
    this.getActionBinding = (node) => {
      var _a;
      return (_a = node.getAttribute) == null ? void 0 : _a.call(node, "flow-action");
    };
    this.getContextBinding = (node) => {
      var _a;
      return (_a = node.getAttribute) == null ? void 0 : _a.call(node, "flow-context");
    };
    this.getAttributeBinding = (node) => {
      var _a;
      return (_a = node.getAttribute) == null ? void 0 : _a.call(node, "flow-attr");
    };
    this.getPropertyBinding = (node) => {
      var _a;
      return (_a = node.getAttribute) == null ? void 0 : _a.call(node, "flow-prop");
    };
    this.modifierSchema = /** @const */
    {
      ctrl: "ctrlKey",
      alt: "altKey",
      meta: "metaKey",
      shift: "shiftKey"
    };
    this.keymapSchema = {
      enter: "Enter",
      tab: `Tab`,
      esc: `Escape`,
      space: ` `,
      up: `ArrowUp`,
      down: `ArrowDown`,
      left: `ArrowLeft`,
      right: `ArrowRight`,
      home: `Home`,
      end: `End`,
      page_up: `PageUp`,
      page_down: `PageDown`,
      [`[a-z]`]: /[a-z]/,
      [`[0-9]`]: /[0-9]/
    };
    this.twoWayBindingSchema = {
      "input[type='checkbox']": (element) => {
        return (
          /** @type {HTMLInputElement} */
          element.checked
        );
      },
      "input[type='radio']": (element) => {
        var _a, _b, _c;
        const elements = (
          /** @type {HTMLInputElement} */
          (_a = element.form) == null ? void 0 : _a.elements
        );
        if (!elements) {
          return null;
        }
        return (
          /** @type {HTMLInputElement} */
          (_c = (_b = Array.from(elements).find((el) => {
            return (
              /** @type {HTMLInputElement} */
              el.name === /** @type {HTMLInputElement} */
              element.name && /** @type {HTMLInputElement} */
              el.checked === true
            );
          })) == null ? void 0 : _b.value) != null ? _c : null
        );
      },
      input: (element) => {
        return (
          /** @type {HTMLInputElement} */
          element.value
        );
      },
      select: (
        /** @param {Element} el */
        (el) => {
          const element = (
            /** @type {HTMLSelectElement} */
            el
          );
          return Array.from(element.selectedOptions, (o) => o.value);
        }
      ),
      default: (element) => {
        return (
          /** @type {HTMLInputElement} */
          element.value
        );
      }
    };
    this._contextRef = ref({});
    this.forms = document.forms;
    this.effectScheduler = new EffectScheduler((fn) => this.flushChanges(fn));
    this._bindingScopes = /* @__PURE__ */ new Map();
    this._formState = /* @__PURE__ */ new WeakMap();
    this.formEvents = ["change", "input"];
    this.eventUpdateContext = (e) => {
      const target = (
        /** @type {HTMLInputElement | null} */
        e.target
      );
      if (!target) {
        return;
      }
      this.updateBindingsForElement(target);
    };
    this.filters = {};
    this._effects = [
      {
        name: "__downflow__text",
        run: (el) => this._effectText(el),
        match(attributeName) {
          return Boolean(attributeName.match(/flow-text/));
        }
      },
      {
        name: "__downflow__properties",
        run: (el) => this._effectProperties(el),
        match(attributeName) {
          return Boolean(attributeName.match(/flow-prop/));
        }
      },
      {
        name: "__downflow__attributes",
        run: (el) => this._effectAttributes(el),
        match(attributeName) {
          return Boolean(attributeName.match(/flow-attr/));
        }
      }
    ];
  }
  // This function is purposely *not* run as part of an effect.
  /**
   * @param {Element} el
   */
  updateBindingsForElement(el) {
    const bindings = this.parseBindings(el);
    bindings.forEach((binding) => {
      const context = this.resolveContext(el, binding.contextString);
      const keys = binding.property.split(".");
      const finalKey = keys.pop();
      const obj = dig_p(context, ...keys);
      if (finalKey && obj) {
        obj[finalKey] = this._readFormControl(el);
      }
    });
    const name = el.name;
    if (!name) {
      return;
    }
    const form = el == null ? void 0 : el.form;
    if (!form) {
      return;
    }
    this._stateForForm(form)[name] = this._readFormControl(el);
  }
  get context() {
    return this._contextRef.value;
  }
  set context(ctx) {
    if (isRef(ctx)) {
      this._contextRef.value = ctx.value;
      return;
    }
    this._contextRef.value = ctx;
  }
  /**
   * Flushes changes and pauses the observer.
   * @param {() => void} fn
   */
  flushChanges(fn) {
    var _a, _b;
    if (this._pauseCount === 0) {
      (_a = this.observer) == null ? void 0 : _a.disconnect();
    }
    this._pauseCount++;
    try {
      fn();
    } finally {
      this._pauseCount--;
      if (this._pauseCount === 0 && this.started) {
        (_b = this.observer) == null ? void 0 : _b.takeRecords();
        this._observe();
      }
    }
  }
  /**
   * The attribute to use for finding a controller. Defaults to "flow-target".
   * @param {Element} node
   * @returns {{controllerName: string, target: string}[]}
   */
  parseTargetBinding(node) {
    const binding = this.getTargetBinding(node);
    if (!binding) {
      return [];
    }
    const controllers = [];
    binding.forEach((str) => {
      if (str.includes(".")) {
        const parsedStr = str.split(".");
        if (parsedStr[0] && parsedStr[1]) {
          controllers.push({
            controllerName: parsedStr[0],
            target: parsedStr[1]
          });
        }
      }
    });
    return controllers;
  }
  /**
   * @param {HTMLFormElement} form
   */
  _stateForForm(form) {
    let state = this._formState.get(form);
    if (!state) {
      state = reactive({});
      this._formState.set(form, state);
      for (const _el of form.elements) {
        const el = (
          /** @type {Element & {name: string | null | undefined}} */
          _el
        );
        if (el.name) {
          state[el.name] = this._readFormControl(el);
        }
      }
    }
    return state;
  }
  /**
   * @param {Element} el
   */
  _readFormControl(el) {
    for (const [key, fn] of Object.entries(this.twoWayBindingSchema)) {
      if (el.matches(key)) {
        return fn(el);
      }
    }
    return this.twoWayBindingSchema.default(el);
  }
  /**
   * Search upwards from current node to find closest controller for a given name.
   * @param {Element} root
   * @param {string} controllerName
   */
  getClosestController(root, controllerName) {
    let controller = null;
    this.walkParentElements(root, (el) => {
      controller = this.getController(el, controllerName);
      if (controller) {
        return true;
      }
    });
    return (
      /** @type {Controller | null | undefined} */
      controller
    );
  }
  /**
   * Search upwards from current node to find closest controller for a given name. This *excludes* the root element.
   * @param {Element} root
   * @param {string} controllerName
   */
  getClosestParentController(root, controllerName) {
    let controller = null;
    this.walkParentElements(root, (el) => {
      if (root === el) {
        return;
      }
      controller = this.getController(el, controllerName);
      if (controller) {
        return true;
      }
    });
    return controller;
  }
  /**
   * Search upwards from current node to find closest controller for a given name.
   * @param {Element} root
   * @param {string} controllerName
   * @returns {Element | null | undefined}
   */
  getClosestControllerElement(root, controllerName) {
    let controller = null;
    let element = null;
    this.walkParentElements(root, (el) => {
      controller = this.getController(el, controllerName);
      if (controller) {
        element = el;
        return true;
      }
    });
    return element;
  }
  /**
   * Search upwards from current node to find closest context for a given name.
   * @param {Element} root
   * @returns {string | undefined | null}
   */
  getClosestContextString(root) {
    let contextString = null;
    this.walkParentElements(root, (el) => {
      contextString = this.getContextBinding(el);
      if (contextString) {
        return true;
      }
    });
    return contextString;
  }
  /**
   * @param {Element} el
   * @param {string | null} key
   */
  resolveValue(el, key) {
    var _a;
    if (!key) {
      return null;
    }
    let negativeLength = 0;
    if (key.startsWith("!")) {
      const negatives = (_a = key.match(/^\!+/g)) == null ? void 0 : _a[0];
      if (negatives) {
        negativeLength = negatives.length;
      }
    }
    key = key.slice(negativeLength);
    let contextString = null;
    if (key.includes("#")) {
      const splitKeys = key.split(/#/);
      const controllerName = splitKeys[0];
      key = splitKeys.slice(1).join("");
      contextString = controllerName;
    }
    const keys = key.split(/\./g);
    const firstKey = keys[0];
    if (firstKey === "$form" || firstKey === "$context") {
      contextString = firstKey;
      keys.shift();
    }
    const context = this.resolveContext(el, contextString);
    let value = dig(context, ...keys);
    if (isRef(value)) {
      value = value.value;
    }
    for (let i = 0; i < negativeLength; i++) {
      value = !value;
    }
    return value;
  }
  /**
   * Starts the registry and listens.
   * @param {RegistryOptions} options
   */
  start(options = {}) {
    this.abortController = new AbortController();
    this.rootElement = options.rootElement || document.documentElement || this.rootElement;
    this.formEvents.forEach((evt) => {
      var _a;
      this.rootElement.addEventListener(evt, this.eventUpdateContext, {
        signal: (_a = this.abortController) == null ? void 0 : _a.signal
      });
    });
    if (!this.started) {
      this._observe();
      this.started = true;
    }
    this.reconcile();
    return this;
  }
  /**
   * Takes records, and then disconnects the observer.
   */
  stop() {
    var _a, _b;
    if (!this.started) return this;
    this.started = false;
    this._reconcileQueued = false;
    (_a = this.observer) == null ? void 0 : _a.disconnect();
    for (const el of [...this._controllerInstanceMap.keys()]) {
      this._destroyElement(el);
    }
    for (const el of [...this._actionListenerMap.keys()]) {
      this._removeActionsForElement(el);
    }
    for (const el of [...this._bindingScopes.keys()]) {
      this._deleteCachedScopes(el);
    }
    (_b = this.abortController) == null ? void 0 : _b.abort("application stopped");
    this._controllerInstanceMap.clear();
    this._actionListenerMap.clear();
    this._targetConnectionMap.clear();
    this._bindingSignatures.clear();
    return this;
  }
  /**
   * Registers a new controller to listen for.
   * @param {typeof Controller} Constructor
   * @param {string} [controllerName] - Use this to override the registration name.
   */
  register(Constructor, controllerName) {
    const name = controllerName || Constructor.controllerName;
    if (!name) {
      console.error(`No "controllerName" given for ${Constructor}.`);
      return;
    }
    this._controllerConstructorMap.set(name, Constructor);
    if (this.started) {
      this.reconcile();
    }
  }
  /**
   * Registers a new controller to listen for.
   * @param {{controllerName: string} | string} strOrObj
   */
  unregister(strOrObj) {
    if (typeof strOrObj === "object") {
      this._controllerConstructorMap.delete(strOrObj.controllerName);
      return;
    }
    this._controllerConstructorMap.delete(strOrObj);
  }
  /**
   * Finds a map of controllers based on the element and controllerName.
   * @param {Element} element
   * @param {string} controllerName
   * @return {null | undefined | Controller}
   */
  getController(element, controllerName) {
    let map = this._controllerInstanceMap.get(element);
    if (!map) return;
    return map.get(controllerName);
  }
  /**
   * @param {string} controllerName
   * @return {undefined | null | typeof Controller}
   */
  _getConstructor(controllerName) {
    return this._controllerConstructorMap.get(controllerName);
  }
  _observe() {
    let root = this.rootElement;
    if (!this.observer) {
      this.observer = new MutationObserver(this.handleMutations);
    }
    this.observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true
    });
  }
  /**
   * @param {MutationRecord[]} _mutations
   */
  handleMutations(_mutations) {
    if (this._reconcileQueued) return;
    this._reconcileQueued = true;
    queueMicrotask(() => {
      this._reconcileQueued = false;
      if (this.started) {
        this.reconcile();
      }
    });
  }
  reconcile(root = this.rootElement) {
    const seen = /* @__PURE__ */ new Set();
    this.flushChanges(() => {
      this.walkElements(root, (el) => {
        seen.add(el);
        this.updateBindingsForElement(el);
        this._reconcileControllers(el);
        this._reconcileActions(el);
        this._reconcileBindings(el);
      });
      for (const el of [...this._controllerInstanceMap.keys()]) {
        if (!seen.has(el)) {
          this._disconnectElement(el);
        }
      }
      for (const el of [...this._actionListenerMap.keys()]) {
        if (!seen.has(el)) {
          this._removeActionsForElement(el);
        }
      }
      for (const el of [...this._bindingScopes.keys()]) {
        if (!seen.has(el)) {
          this._deleteCachedScopes(el);
        }
      }
      for (const map of this._controllerInstanceMap.values()) {
        for (const controller of map.values()) {
          if (controller.isConnected) {
            this._reconcileTargets(controller);
          }
        }
      }
    });
  }
  /**
   * @param {Element} el
   */
  _reconcileControllers(el) {
    const binding = this.getControllerBinding(el);
    const desired = new Set(
      binding ? this.parseControllerNamesFromString(binding) : []
    );
    for (const name of desired) {
      this._createControllerInstance(name, el);
    }
    const map = this._controllerInstanceMap.get(el);
    if (!map) return;
    const names = [];
    for (const name of map.keys()) {
      if (!desired.has(name)) {
        names.push(name);
      }
    }
    for (const name of names) {
      this._destroyElement(el, name);
    }
  }
  /**
   * @param {Element | ShadowRoot} rootNode
   * @param {(node: Element, treeWalker: TreeWalker) => unknown} callback
   */
  walkParentElements(rootNode, callback) {
    const treeWalker = document.createTreeWalker(
      this.rootElement,
      NodeFilter.SHOW_ELEMENT
    );
    treeWalker.currentNode = rootNode;
    let node = treeWalker.currentNode;
    while (node) {
      let el = (
        /** @type {Element} */
        node
      );
      const retVal = callback(el, treeWalker);
      if (retVal === true) {
        return;
      }
      node = treeWalker.parentNode();
    }
  }
  /**
   * @param {Element | ShadowRoot} rootNode
   * @param {(node: Element, treeWalker: TreeWalker) => unknown} callback
   */
  walkElements(rootNode, callback) {
    const treeWalker = document.createTreeWalker(
      rootNode,
      NodeFilter.SHOW_ELEMENT
    );
    let node = treeWalker.currentNode;
    while (node) {
      let el = (
        /** @type {Element} */
        node
      );
      callback(el, treeWalker);
      node = treeWalker.nextNode();
    }
  }
  /**
   * Fires disconnect lifecycle but KEEPS the instance for potential re-append.
   * @param {Element} element
   * @param {string} [controllerName]
   */
  _disconnectElement(element, controllerName) {
    var _a;
    const map = this._controllerInstanceMap.get(element);
    if (!map) return;
    const names = controllerName ? [controllerName] : [...map.keys()];
    const ary = [];
    for (const name of names) {
      const inst = map.get(name);
      if (!inst || !inst.isConnected) continue;
      this._disconnectAllTargets(inst);
      (_a = inst.disconnectedCallback) == null ? void 0 : _a.call(inst);
      inst.isConnected = false;
      ary.push({ controller: inst, name });
    }
    return { map, disconnectedControllers: ary };
  }
  /**
   * Fully destroys the controller - attribute removed or app stopped.
   * @param {Element} element
   * @param {string} [controllerName]
   */
  _destroyElement(element, controllerName) {
    const retVal = this._disconnectElement(element, controllerName);
    if (!retVal) {
      return;
    }
    const { map, disconnectedControllers } = retVal;
    for (const { controller, name } of disconnectedControllers) {
      this._targetConnectionMap.delete(controller);
      map.delete(name);
    }
    if (map.size === 0) {
      this._controllerInstanceMap.delete(element);
    }
  }
  /**
   * @param {Element} element
   */
  _removeActionsForElement(element) {
    const listeners = this._actionListenerMap.get(element);
    if (!listeners) return;
    listeners.forEach(({ target, eventName, fn, options }) => {
      var _a;
      (_a = target == null ? void 0 : target.removeEventListener) == null ? void 0 : _a.call(target, eventName, fn, options);
    });
    this._actionListenerMap.delete(element);
  }
  /**
   * @param {string} controllerName
   * @param {Element} el
   */
  _createControllerInstance(controllerName, el) {
    var _a;
    let map = this._controllerInstanceMap.get(el);
    if (!map) {
      map = /* @__PURE__ */ new Map();
      this._controllerInstanceMap.set(el, map);
    }
    let inst = map.get(controllerName);
    if (!inst) {
      const Constructor = this._getConstructor(controllerName);
      if (!Constructor) {
        return;
      }
      inst = new Constructor({
        element: (
          /** @type {HTMLElement} */
          el
        ),
        application: this,
        controllerName
      });
      inst.initialize();
      map.set(controllerName, inst);
    }
    if (!inst.isConnected) {
      inst.isConnected = true;
      (_a = inst.connectedCallback) == null ? void 0 : _a.call(inst);
    }
  }
  /** @param {Element} el */
  _reconcileActions(el) {
    var _a, _b, _c;
    const attr = this.getActionBinding(el);
    const desired = /* @__PURE__ */ new Set();
    if (attr) {
      for (const parsed of this._parseActionsFromString(attr)) {
        desired.add(parsed.source);
        if (!((_a = this._actionListenerMap.get(el)) == null ? void 0 : _a.has(parsed.source))) {
          this.addParsedActionToElement(parsed, el);
        }
      }
    }
    const listeners = this._actionListenerMap.get(el);
    if (!listeners) {
      return;
    }
    for (const source of [...listeners.keys()]) {
      if (desired.has(source)) {
        continue;
      }
      const rec = listeners.get(source);
      (_c = (_b = rec == null ? void 0 : rec.target) == null ? void 0 : _b.removeEventListener) == null ? void 0 : _c.call(_b, rec.eventName, rec.fn, rec.options);
      listeners.delete(source);
    }
    if (listeners.size === 0) {
      this._actionListenerMap.delete(el);
    }
  }
  /**
   * Takes an attribute and turns it into an array of controller names.
   * @param {string} str
   * @return {Array<string>}
   */
  parseControllerNamesFromString(str) {
    return (str == null ? void 0 : str.split(/\s+/)) || [];
  }
  /**
   * @param {Controller} controller
   * @param {string} targetName
   */
  targetsForController(controller, targetName) {
    const { element, controllerName } = controller;
    const targets = [];
    this.walkElements(element, (node) => {
      if (element === node) {
        return;
      }
      const parsedBindings = this.parseTargetBinding(node);
      if (parsedBindings.length <= 0) {
        return;
      }
      parsedBindings.forEach((binding) => {
        if (binding.controllerName !== controllerName) {
          return;
        }
        if (binding.target !== targetName) {
          return;
        }
        if (this.getClosestParentController(node, controllerName) !== controller) {
          return;
        }
        targets.push(node);
      });
    });
    return targets;
  }
  /**
   * @param {string} str
   * @return {Array<string>}
   */
  _parseControllersFromTargetAttribute(str) {
    const ary = [];
    str.split(/\s+/).forEach((targetString) => {
      const splitStr = targetString.split(/\./);
      const controllerName = splitStr[0];
      ary.push(controllerName);
    });
    return ary;
  }
  /**
   * @param {string} str
   * @return {Array<import("../internal/action-parser.js").ParsedAction>}
   */
  _parseActionsFromString(str) {
    const parsedActions = [];
    str.trim().split(/\s+/).forEach((str2) => {
      str2 = str2.trim();
      if (str2) {
        const parsedAction = new ActionParser(str2).parse();
        if (parsedAction.errors.length > 0) {
          return;
        }
        parsedActions.push(parsedAction);
      }
    });
    return parsedActions;
  }
  /**
   * @param {import("../internal/action-parser.js").ParsedAction} parsedAction
   * @param {Element} element
   */
  addParsedActionToElement(parsedAction, element) {
    var _a;
    if (parsedAction.errors.length > 0) {
      return;
    }
    const {
      controllerFunction,
      controllerName,
      eventName,
      globalTarget,
      eventModifier,
      additionalEventModifiers,
      actionOptions
    } = parsedAction;
    const _controllerName = (
      /** @type {any} */
      controllerName
    );
    if (_controllerName instanceof Error) {
      return;
    }
    if (!eventName) {
      return;
    }
    const keymapSchema = this.keymapSchema;
    const modifierSchema = this.modifierSchema;
    const self2 = this;
    const fn = function(evt) {
      let shouldCallFunction = true;
      let controller = null;
      if (controllerName) {
        controller = self2.getClosestController(element, controllerName);
      } else {
        controller = self2.resolveContext(element);
      }
      if (eventModifier && evt instanceof KeyboardEvent) {
        shouldCallFunction = false;
        for (const [key, value] of Object.entries(keymapSchema)) {
          const keyRegex = new RegExp(key);
          if (eventModifier.match(keyRegex)) {
            if (evt.key.match(value)) {
              if (additionalEventModifiers.length > 0) {
                shouldCallFunction = additionalEventModifiers.every(
                  (modifier) => {
                    const evtKey = (
                      /** @type {keyof typeof evt} */
                      modifierSchema[
                        /** @type {keyof typeof modifierSchema} */
                        modifier
                      ]
                    );
                    return evt[evtKey] === true;
                  }
                );
                if (shouldCallFunction) {
                  break;
                }
              } else {
                shouldCallFunction = true;
                break;
              }
            }
          }
        }
      }
      if (shouldCallFunction && controllerFunction) {
        if (controller) {
          let keys = controllerFunction.split(".");
          let context = controller;
          let fnString = controllerFunction;
          if (keys.length > 1) {
            fnString = keys.pop();
            context = dig(controller, ...keys);
          }
          if (typeof context === "object" && typeof context[fnString] === "function") {
            context[fnString].call(controller, evt);
          }
        }
      }
    };
    let target = element;
    if (globalTarget) {
      target = globalThis[globalTarget];
      if (!target) {
        throw Error(`${target} does not exist on "globalThis"`);
      }
      if (typeof target.addEventListener !== "function") {
        throw Error(`${target} does not have an "addEventListener" function`);
      }
    }
    const options = {};
    actionOptions.forEach((option) => {
      if (option.startsWith("!")) {
        options[option.slice(1)] = false;
        return;
      }
      options[option] = true;
    });
    target.addEventListener(eventName, fn, __spreadProps(__spreadValues({}, options), {
      signal: (_a = this.abortController) == null ? void 0 : _a.signal
    }));
    let listeners = this._actionListenerMap.get(element);
    if (!listeners) {
      listeners = /* @__PURE__ */ new Map();
      this._actionListenerMap.set(element, listeners);
    }
    const existing = listeners.get(parsedAction.source);
    if (existing) {
      existing.target.removeEventListener(
        existing.eventName,
        existing.fn,
        existing.options
      );
    }
    listeners.set(parsedAction.source, { target, eventName, fn, options });
  }
  /** @param {Controller} controller */
  _reconcileTargets(controller) {
    const Ctor = (
      /** @type {typeof Controller} */
      controller.constructor
    );
    let byName = this._targetConnectionMap.get(controller);
    if (!byName) {
      byName = /* @__PURE__ */ new Map();
      this._targetConnectionMap.set(controller, byName);
    }
    Ctor.targets.forEach((targetName) => {
      let connected = byName.get(targetName);
      if (!connected) {
        connected = /* @__PURE__ */ new Set();
        byName.set(targetName, connected);
      }
      const desired = new Set(
        this.targetsForController(controller, targetName)
      );
      for (const el of desired) {
        if (connected.has(el)) continue;
        connected.add(el);
        this._fireTargetConnected(controller, targetName, el);
      }
      for (const el of connected) {
        if (desired.has(el)) continue;
        connected.delete(el);
        this._fireTargetDisconnected(controller, targetName, el);
      }
    });
  }
  /**
   * @param {Controller} controller
   * @param {string} targetName
   * @param {Element} target
   */
  _fireTargetConnected(controller, targetName, target) {
    const fn = (
      /** @type {any} */
      controller[`${targetName}TargetConnected`]
    );
    if (typeof fn === "function") fn.call(controller, target);
  }
  /**
   * @param {Controller} controller
   * @param {string} targetName
   * @param {Element} target
   */
  _fireTargetDisconnected(controller, targetName, target) {
    const fn = (
      /** @type {any} */
      controller[`${targetName}TargetDisconnected`]
    );
    if (typeof fn === "function") fn.call(controller, target);
  }
  /**
   * @param {Controller} controller
   */
  _disconnectAllTargets(controller) {
    const byName = this._targetConnectionMap.get(controller);
    if (!byName) return;
    for (const [targetName, set] of byName) {
      for (const target of set) {
        this._fireTargetDisconnected(controller, targetName, target);
      }
      set.clear();
    }
  }
  /**
   * @param {(...args: any[]) => any} callback
   */
  _runEffect(callback) {
    const runner = effect(
      callback,
      { scheduler: () => this.effectScheduler.schedule(runner) }
    );
  }
  /**
   * @param {Element} el
   */
  _runEffects(el) {
    this._runEffect(() => {
      this._effects.forEach((effect2) => {
        effect2.run(el);
      });
    });
  }
  /**
   * @param {Element} el
   */
  _effectText(el) {
    let text = this.parseTextBinding(el);
    if (text == null) {
      return;
    }
    if (el.textContent !== text) {
      el.textContent = text;
    }
  }
  /**
   * @param {Element} el
   */
  _effectAttributes(el) {
    const attributeText = this.getAttributeBinding(el);
    if (!attributeText) return;
    const [attr, key] = attributeText.split(":");
    const value = this.resolveValue(el, key);
    if (value == null) {
      el.removeAttribute(attr);
      return;
    }
    el.setAttribute(attr, String(value));
  }
  /**
   * @param {Element} el
   * @param {string | null | undefined} [contextStr]
   */
  resolveContext(el, contextStr) {
    let context = (
      /** @type {Controller["context"] | Application["context"]} */
      this.context
    );
    const keywords = ["$form", "$context"];
    if (!contextStr) {
      contextStr = this.getClosestContextString(el);
    }
    if (contextStr && !keywords.includes(contextStr)) {
      let controllerName = contextStr;
      if (!controllerName) {
        return null;
      }
      const controller = this.getClosestController(el, controllerName);
      if (!controller) {
        return null;
      }
      context = controller.context;
    }
    if (contextStr === "$form") {
      const formAttr = el.getAttribute("form");
      const rootNode = (
        /** @type {Element} */
        el.getRootNode() || document
      );
      const form = (
        /** @type {HTMLFormElement | null} */
        formAttr ? rootNode.querySelector(`form#${formAttr}`) : el.closest("form")
      );
      if (form) {
        return this._stateForForm(form);
      }
    } else {
      return context;
    }
  }
  /**
   * @param {Element} el
   */
  _effectProperties(el) {
    const propertyText = this.getPropertyBinding(el);
    if (!propertyText) {
      return;
    }
    ;
    const [prop, key] = propertyText.split(":");
    const value = this.resolveValue(el, key);
    el[prop] = value;
  }
  /**
   * @param {Element} el
   */
  parseBindings(el) {
    const bindings = [];
    const str = el.getAttribute("flow-bind");
    if (str) {
      const [property, contextString] = str.split(":");
      bindings.push({ property, contextString });
    }
    [...el.attributes].forEach((attr) => {
      if (attr.name.startsWith("flow-bind:")) {
        const [_, property] = attr.name.split(":");
        const contextString = attr.value;
        bindings.push({ property, contextString });
      }
    });
    return bindings;
  }
  /**
   * @param {Element} el
   */
  _generateSignature(el) {
    var _a;
    let signature = "";
    for (const attr of el.attributes) {
      for (const effect2 of this._effects) {
        if (effect2.match(attr.name)) {
          if (signature.length > 0) {
            signature += ">> ";
          }
          signature += attr.name + ">> " + attr.value;
          break;
        }
      }
    }
    if (signature.length === 0) {
      return null;
    }
    const context = (_a = this.getClosestContextString(el)) != null ? _a : "";
    let controllerId = "";
    if (context && context !== "$form" && context !== "$context") {
      const controller = this.getClosestController(el, context);
      if (controller) {
        controllerId = this._idForController(controller).toString();
        if (controllerId) {
          signature = signature + `>> controller >> ${controllerId}`;
        }
      }
    }
    return signature;
  }
  /** @param {Element} el */
  _reconcileBindings(el) {
    const signature = this._generateSignature(el);
    if (!signature) {
      this._deleteCachedScopes(el);
      return;
    }
    if (this._bindingSignatures.get(el) === signature) {
      return;
    }
    this._deleteCachedScopes(el);
    const scope = effectScope();
    this.flushChanges(() => {
      scope.run(() => {
        this._runEffects(el);
      });
    });
    this._bindingScopes.set(el, scope);
    this._bindingSignatures.set(el, signature);
  }
  /**
    * Deletes stored scopes for an element.
    * @param {Element} el
    */
  _deleteCachedScopes(el) {
    const scope = this._bindingScopes.get(el);
    if (scope) {
      scope.stop();
      this._bindingScopes.delete(el);
    }
    this._bindingSignatures.delete(el);
  }
  /**
   * @param {Controller} controller
   */
  _idForController(controller) {
    let id = this._controllerIds.get(controller);
    if (id == null) {
      this._controllerSequentialId++;
      id = this._controllerSequentialId;
      this._controllerIds.set(controller, id);
    }
    return id;
  }
};

export {
  Controller,
  Application
};
/*! Bundled license information:

@vue/shared/dist/shared.esm-bundler.js:
  (**
  * @vue/shared v3.5.40
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/reactivity/dist/reactivity.esm-bundler.js:
  (**
  * @vue/reactivity v3.5.40
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
//# sourceMappingURL=chunk-A4YI4XFT.js.map
