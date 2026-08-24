var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});

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
  constructor({ element, application: application2, controllerName }) {
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
              var _a2;
              return ((_a2 = this[`${targetName}Targets`]) == null ? void 0 : _a2[0]) || null;
            }
          }
        });
      });
    }
    this.element = element;
    this.application = application2;
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
   * @returns {HTMLFormElement | null}
   */
  get form() {
    var _a2, _b;
    let form = this.element.form;
    if (form) {
      return form;
    }
    const formAttr = (_b = (_a2 = this.element) == null ? void 0 : _a2.getAttribute) == null ? void 0 : _b.call(_a2, "form");
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
      var _a2;
      return (_a2 = node.getAttribute) == null ? void 0 : _a2.call(node, "flow-controller");
    };
    this.getTargetBinding = (node) => {
      var _a2, _b;
      return (_b = (_a2 = node.getAttribute) == null ? void 0 : _a2.call(node, `flow-target`)) == null ? void 0 : _b.split(/\s+/);
    };
    this.getTextBinding = (node) => {
      var _a2;
      return (_a2 = node.getAttribute) == null ? void 0 : _a2.call(node, "flow-text");
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
      var _a2;
      return (_a2 = node.getAttribute) == null ? void 0 : _a2.call(node, "flow-action");
    };
    this.getContextBinding = (node) => {
      var _a2;
      return (_a2 = node.getAttribute) == null ? void 0 : _a2.call(node, "flow-context");
    };
    this.getAttributeBinding = (node) => {
      var _a2;
      return (_a2 = node.getAttribute) == null ? void 0 : _a2.call(node, "flow-attr");
    };
    this.getPropertyBinding = (node) => {
      var _a2;
      return (_a2 = node.getAttribute) == null ? void 0 : _a2.call(node, "flow-prop");
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
        var _a2, _b, _c;
        const elements = (
          /** @type {HTMLInputElement} */
          (_a2 = element.form) == null ? void 0 : _a2.elements
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
  }
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
    var _a2, _b;
    if (this._pauseCount === 0) (_a2 = this.observer) == null ? void 0 : _a2.disconnect();
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
    var _a2;
    if (!key) {
      return null;
    }
    let negativeLength = 0;
    if (key.startsWith("!")) {
      const negatives = (_a2 = key.match(/^\!+/g)) == null ? void 0 : _a2[0];
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
      var _a2;
      this.rootElement.addEventListener(evt, this.eventUpdateContext, {
        signal: (_a2 = this.abortController) == null ? void 0 : _a2.signal
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
    var _a2, _b;
    if (!this.started) return this;
    this.started = false;
    this._reconcileQueued = false;
    (_a2 = this.observer) == null ? void 0 : _a2.disconnect();
    for (const el of [...this._controllerInstanceMap.keys()]) {
      this._destroyElement(el);
    }
    for (const el of [...this._actionListenerMap.keys()]) {
      this._removeActionsForElement(el);
    }
    for (const el of [...this._bindingScopes.keys()]) {
      this._downgradeBindings(el);
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
      let downgradeElements = [];
      for (const el of this._controllerInstanceMap.keys()) {
        if (!seen.has(el)) {
          downgradeElements.push(el);
        }
      }
      for (const el of downgradeElements) {
        this._disconnectElement(el);
      }
      let removeActions = [];
      for (const el of this._actionListenerMap.keys()) {
        if (!seen.has(el)) {
          removeActions.push(el);
        }
      }
      for (const el of removeActions) {
        this._removeActionsForElement(el);
      }
      const downgradeBindings = [];
      for (const el of this._bindingScopes.keys()) {
        if (!seen.has(el)) {
          downgradeBindings.push(el);
        }
      }
      for (const el of downgradeBindings) {
        this._downgradeBindings(el);
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
    var _a2;
    const map = this._controllerInstanceMap.get(element);
    if (!map) return;
    const names = controllerName ? [controllerName] : [...map.keys()];
    const ary = [];
    for (const name of names) {
      const inst = map.get(name);
      if (!inst || !inst.isConnected) continue;
      this._disconnectAllTargets(inst);
      (_a2 = inst.disconnectedCallback) == null ? void 0 : _a2.call(inst);
      inst.isConnected = false;
      ary.push({ controller: inst, name });
    }
    return { map, disconnectedControllers: ary };
  }
  /**
   * Fully destroys the controller — attribute removed or app stopped.
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
      var _a2;
      (_a2 = target == null ? void 0 : target.removeEventListener) == null ? void 0 : _a2.call(target, eventName, fn, options);
    });
    this._actionListenerMap.delete(element);
  }
  /**
   * @param {string} controllerName
   * @param {Element} el
   */
  _createControllerInstance(controllerName, el) {
    var _a2;
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
      (_a2 = inst.connectedCallback) == null ? void 0 : _a2.call(inst);
    }
  }
  /** @param {Element} el */
  _reconcileActions(el) {
    var _a2, _b, _c;
    const attr = this.getActionBinding(el);
    const desired = /* @__PURE__ */ new Set();
    if (attr) {
      for (const parsed of this._parseActionsFromString(attr)) {
        desired.add(parsed.source);
        if (!((_a2 = this._actionListenerMap.get(el)) == null ? void 0 : _a2.has(parsed.source))) {
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
    var _a2;
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
        controller = self2.context;
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
          if (typeof context === "object" && // @ts-expect-error
          typeof context[fnString] === "function") {
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
      signal: (_a2 = this.abortController) == null ? void 0 : _a2.signal
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
   * @param {Element} el
   */
  _effectText(el) {
    const runner = effect(
      () => {
        let text = this.parseTextBinding(el);
        if (text == null) {
          return;
        }
        if (el.textContent !== text) {
          el.textContent = text;
        }
      },
      { scheduler: () => this.effectScheduler.schedule(runner) }
    );
  }
  /**
   * @param {Element} el
   */
  _effectAttributes(el) {
    const runner = effect(
      () => {
        const attributeText = this.getAttributeBinding(el);
        if (!attributeText) return;
        const [attr, key] = attributeText.split(":");
        const value = this.resolveValue(el, key);
        if (value == null) {
          el.removeAttribute(attr);
          return;
        }
        el.setAttribute(attr, String(value));
      },
      { scheduler: () => this.effectScheduler.schedule(runner) }
    );
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
    const runner = effect(
      () => {
        const propertyText = this.getPropertyBinding(el);
        if (!propertyText) return;
        const [prop, key] = propertyText.split(":");
        el[prop] = this.resolveValue(el, key);
      },
      { scheduler: () => this.effectScheduler.schedule(runner) }
    );
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
    ;
    [...el.attributes].forEach((attr) => {
      if (attr.name.startsWith("flow-bind:")) {
        const [_, property] = attr.name.split(":");
        const contextString = attr.value;
        bindings.push({ property, contextString });
      }
    });
    return bindings;
  }
  /** @param {Element} el */
  _reconcileBindings(el) {
    var _a2, _b, _c, _d;
    const text = (_a2 = this.getTextBinding(el)) != null ? _a2 : "";
    const attr = (_b = this.getAttributeBinding(el)) != null ? _b : "";
    const prop = (_c = this.getPropertyBinding(el)) != null ? _c : "";
    if (!text && !attr && !prop) {
      if (this._bindingScopes.has(el)) {
        this._downgradeBindings(el);
      }
      return;
    }
    const context = (_d = this.getClosestContextString(el)) != null ? _d : "";
    let signature = `${context}||${text}||${attr}||${prop}`;
    let controllerId = "";
    if (context && context !== "$form" && context !== "$context") {
      const controller = this.getClosestController(el, context);
      if (controller) {
        controllerId = this._idForController(controller).toString();
        if (controllerId) {
          signature = signature + `||${controllerId}`;
        }
      }
    }
    if (this._bindingSignatures.get(el) === signature) {
      return;
    }
    this._downgradeBindings(el);
    const scope = effectScope();
    this.flushChanges(() => {
      scope.run(() => {
        if (text) this._effectText(el);
        if (attr) this._effectAttributes(el);
        if (prop) this._effectProperties(el);
      });
    });
    this._bindingScopes.set(el, scope);
    this._bindingSignatures.set(el, signature);
  }
  /** @param {Element} el */
  _downgradeBindings(el) {
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

// docs/assets/js/scroll_spy_controller.js
var ScrollSpyController = class extends Controller {
  constructor() {
    super(...arguments);
    // rAF-throttle so scrolling stays cheap.
    __publicField(this, "requestUpdate", () => {
      cancelAnimationFrame(this.frame);
      this.frame = requestAnimationFrame(this.update);
    });
    __publicField(this, "update", () => {
      if (!this.entries.length) return;
      const viewportBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight;
      const atBottom = Math.ceil(viewportBottom) >= pageBottom - 1;
      const line = this.readingLine;
      let active = this.entries[0];
      if (atBottom) {
        active = this.entries[this.entries.length - 1];
      } else {
        for (const entry of this.entries) {
          if (entry.heading.getBoundingClientRect().top <= line + 1) {
            active = entry;
          }
        }
      }
      this.setActive(active.link);
    });
  }
  connectedCallback() {
    this.entries = this.links.flatMap((link) => {
      const id = decodeURIComponent(link.hash.slice(1));
      const heading = id && document.getElementById(id);
      return heading ? [{ link, heading }] : [];
    });
    this.frame = null;
    window.addEventListener("scroll", this.requestUpdate, { passive: true });
    window.addEventListener("resize", this.requestUpdate, { passive: true });
    this.requestUpdate();
  }
  disconnectedCallback() {
    window.removeEventListener("scroll", this.requestUpdate);
    window.removeEventListener("resize", this.requestUpdate);
    cancelAnimationFrame(this.frame);
  }
  get links() {
    return [...document.querySelectorAll("#table-of-contents ol a")];
  }
  get computedStyle() {
    if (this._computedStyle == null) {
      this._computedStyle = getComputedStyle(this.element);
    }
    return this._computedStyle;
  }
  // Distance from the top of the viewport that counts as "you're reading here".
  // Mirrors the heading's scroll-margin-top so it lines up with anchor jumps.
  get readingLine() {
    const line = (parseFloat(this.computedStyle.scrollMarginTop) || 0) + 20;
    return line;
  }
  setActive(link) {
    if (link === this.activeLink) return;
    this.activeLink = link;
    this.entries.forEach(({ link: el }) => {
      if (el === link) {
        el.setAttribute("aria-current", "true");
      } else {
        el.removeAttribute("aria-current");
      }
    });
  }
};
__publicField(ScrollSpyController, "controllerName", "scroll-spy");

// node_modules/@pagefind/component-ui/npm_dist/mjs/component-ui.mjs
var __defProp2 = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
};
var components_exports = {};
__export(components_exports, {
  PagefindConfig: () => PagefindConfig,
  PagefindElement: () => PagefindElement,
  PagefindFilterDropdown: () => PagefindFilterDropdown,
  PagefindFilterPane: () => PagefindFilterPane,
  PagefindInput: () => PagefindInput,
  PagefindKeyboardHints: () => PagefindKeyboardHints,
  PagefindModal: () => PagefindModal,
  PagefindModalBody: () => PagefindModalBody,
  PagefindModalFooter: () => PagefindModalFooter,
  PagefindModalHeader: () => PagefindModalHeader,
  PagefindModalTrigger: () => PagefindModalTrigger,
  PagefindResults: () => PagefindResults,
  PagefindSearchbox: () => PagefindSearchbox,
  PagefindSummary: () => PagefindSummary,
  configureInstance: () => configureInstance,
  getInstanceManager: () => getInstanceManager
});
var FOCUSABLE_SELECTOR = "a[href], button, input, [tabindex]";
function hasTabbableChild(container) {
  const elements = container.querySelectorAll(FOCUSABLE_SELECTOR);
  for (const el of elements) {
    if (el.tabIndex < 0) continue;
    if (el.disabled) continue;
    if (el.hasAttribute("hidden")) continue;
    if (window.getComputedStyle(el).display === "none") continue;
    return true;
  }
  return false;
}
function findNextComponentInTabOrder(fromElement, components) {
  let closest = null;
  for (const component of components) {
    if (component.contains(fromElement)) continue;
    const pos = fromElement.compareDocumentPosition(component);
    if (!(pos & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
    if (!hasTabbableChild(component)) continue;
    if (closest === null || component.compareDocumentPosition(closest) & Node.DOCUMENT_POSITION_FOLLOWING) {
      closest = component;
    }
  }
  return closest;
}
function findPreviousComponentInTabOrder(fromElement, components) {
  let closest = null;
  for (const component of components) {
    if (component.contains(fromElement)) continue;
    const pos = fromElement.compareDocumentPosition(component);
    if (!(pos & Node.DOCUMENT_POSITION_PRECEDING)) continue;
    if (!hasTabbableChild(component)) continue;
    if (closest === null || component.compareDocumentPosition(closest) & Node.DOCUMENT_POSITION_PRECEDING) {
      closest = component;
    }
  }
  return closest;
}
var af_exports = {};
__export(af_exports, {
  comments: () => comments,
  default: () => af_default,
  direction: () => direction,
  strings: () => strings,
  thanks_to: () => thanks_to
});
var thanks_to = "Jan Claasen <jan@cloudcannon.com>";
var comments = "";
var direction = "ltr";
var strings = {
  placeholder: "Soek",
  clear_search: "Opruim",
  load_more: "Laai nog resultate",
  search_label: "Soek hierdie webwerf",
  filters_label: "Filters",
  zero_results: "Geen resultate vir [SEARCH_TERM]",
  many_results: "[COUNT] resultate vir [SEARCH_TERM]",
  one_result: "[COUNT] resultate vir [SEARCH_TERM]",
  total_zero_results: "Geen resultate",
  total_one_result: "[COUNT] resultaat",
  total_many_results: "[COUNT] resultate",
  alt_search: "Geen resultate vir [SEARCH_TERM]. Toon resultate vir [DIFFERENT_TERM] in plaas daarvan",
  search_suggestion: "Geen resultate vir [SEARCH_TERM]. Probeer eerder een van die volgende terme:",
  searching: "Soek vir [SEARCH_TERM]",
  results_label: "Soekresultate",
  keyboard_navigate: "navigeer",
  keyboard_select: "kies",
  keyboard_clear: "wis",
  keyboard_close: "sluit",
  keyboard_search: "soek",
  error_search: "Soek het misluk",
  filter_selected_one: "[COUNT] gekies",
  filter_selected_many: "[COUNT] gekies",
  input_hint: "Resultate sal verskyn terwyl jy tik",
  loading: "Laai"
};
var af_default = {
  thanks_to,
  comments,
  direction,
  strings
};
var ar_exports = {};
__export(ar_exports, {
  comments: () => comments2,
  default: () => ar_default,
  direction: () => direction2,
  strings: () => strings2,
  thanks_to: () => thanks_to2
});
var thanks_to2 = "Jermanuts";
var comments2 = "";
var direction2 = "rtl";
var strings2 = {
  placeholder: "\u0628\u062D\u062B",
  clear_search: "\u0627\u0645\u0633\u062D",
  load_more: "\u062D\u0645\u0651\u0650\u0644 \u0627\u0644\u0645\u0632\u064A\u062F \u0645\u0646 \u0627\u0644\u0646\u062A\u0627\u0626\u062C",
  search_label: "\u0627\u0628\u062D\u062B \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0642\u0639",
  filters_label: "\u062A\u0635\u0641\u064A\u0627\u062A",
  zero_results: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644 [SEARCH_TERM]",
  many_results: "[COUNT] \u0646\u062A\u0627\u0626\u062C \u0644 [SEARCH_TERM]",
  one_result: "[COUNT] \u0646\u062A\u064A\u062C\u0629 \u0644 [SEARCH_TERM]",
  total_zero_results: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C",
  total_one_result: "[COUNT] \u0646\u062A\u064A\u062C\u0629",
  total_many_results: "[COUNT] \u0646\u062A\u0627\u0626\u062C",
  alt_search: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644 [SEARCH_TERM]. \u064A\u0639\u0631\u0636 \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0644 [DIFFERENT_TERM] \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0630\u0644\u0643",
  search_suggestion: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644 [SEARCH_TERM]. \u062C\u0631\u0628 \u0623\u062D\u062F \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0628\u062D\u062B \u0627\u0644\u062A\u0627\u0644\u064A\u0629:",
  searching: "\u064A\u0628\u062D\u062B \u0639\u0646 [SEARCH_TERM]...",
  results_label: "\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0628\u062D\u062B",
  keyboard_navigate: "\u062A\u0646\u0642\u0644",
  keyboard_select: "\u0627\u062E\u062A\u064A\u0627\u0631",
  keyboard_clear: "\u0627\u0645\u0633\u062D",
  keyboard_close: "\u0625\u063A\u0644\u0627\u0642",
  keyboard_search: "\u0628\u062D\u062B",
  error_search: "\u0641\u0634\u0644 \u0627\u0644\u0628\u062D\u062B",
  filter_selected_one: "[COUNT] \u0645\u062D\u062F\u062F",
  filter_selected_many: "[COUNT] \u0645\u062D\u062F\u062F",
  input_hint: "\u0633\u062A\u0638\u0647\u0631 \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0643\u062A\u0627\u0628\u0629",
  loading: "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644"
};
var ar_default = {
  thanks_to: thanks_to2,
  comments: comments2,
  direction: direction2,
  strings: strings2
};
var bn_exports = {};
__export(bn_exports, {
  comments: () => comments3,
  default: () => bn_default,
  direction: () => direction3,
  strings: () => strings3,
  thanks_to: () => thanks_to3
});
var thanks_to3 = "Maruf Alom <mail@marufalom.com>";
var comments3 = "";
var direction3 = "ltr";
var strings3 = {
  placeholder: "\u0985\u09A8\u09C1\u09B8\u09A8\u09CD\u09A7\u09BE\u09A8 \u0995\u09B0\u09C1\u09A8",
  clear_search: "\u09AE\u09C1\u099B\u09C7 \u09AB\u09C7\u09B2\u09C1\u09A8",
  load_more: "\u0986\u09B0\u09CB \u09AB\u09B2\u09BE\u09AB\u09B2 \u09A6\u09C7\u0996\u09C1\u09A8",
  search_label: "\u098F\u0987 \u0993\u09AF\u09BC\u09C7\u09AC\u09B8\u09BE\u0987\u099F\u09C7 \u0985\u09A8\u09C1\u09B8\u09A8\u09CD\u09A7\u09BE\u09A8 \u0995\u09B0\u09C1\u09A8",
  filters_label: "\u09AB\u09BF\u09B2\u09CD\u099F\u09BE\u09B0",
  zero_results: "[SEARCH_TERM] \u098F\u09B0 \u099C\u09A8\u09CD\u09AF \u0995\u09BF\u099B\u09C1 \u0996\u09C1\u0981\u099C\u09C7 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF",
  many_results: "[COUNT]-\u099F\u09BF \u09AB\u09B2\u09BE\u09AB\u09B2 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u0997\u09BF\u09AF\u09BC\u09C7\u099B\u09C7 [SEARCH_TERM] \u098F\u09B0 \u099C\u09A8\u09CD\u09AF",
  one_result: "[COUNT]-\u099F\u09BF \u09AB\u09B2\u09BE\u09AB\u09B2 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u0997\u09BF\u09AF\u09BC\u09C7\u099B\u09C7 [SEARCH_TERM] \u098F\u09B0 \u099C\u09A8\u09CD\u09AF",
  total_zero_results: "\u0995\u09CB\u09A8 \u09AB\u09B2\u09BE\u09AB\u09B2 \u09A8\u09C7\u0987",
  total_one_result: "[COUNT]-\u099F\u09BF \u09AB\u09B2\u09BE\u09AB\u09B2",
  total_many_results: "[COUNT]-\u099F\u09BF \u09AB\u09B2\u09BE\u09AB\u09B2",
  alt_search: "\u0995\u09CB\u09A8 \u0995\u09BF\u099B\u09C1 \u0996\u09C1\u0981\u099C\u09C7 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF [SEARCH_TERM] \u098F\u09B0 \u099C\u09A8\u09CD\u09AF. \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09C7 [DIFFERENT_TERM] \u098F\u09B0 \u099C\u09A8\u09CD\u09AF \u09A6\u09C7\u0996\u09BE\u09A8\u09CB \u09B9\u099A\u09CD\u099B\u09C7",
  search_suggestion: "\u0995\u09CB\u09A8 \u0995\u09BF\u099B\u09C1 \u0996\u09C1\u0981\u099C\u09C7 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF [SEARCH_TERM] \u098F\u09B0 \u09AC\u09BF\u09B7\u09AF\u09BC\u09C7. \u09A8\u09BF\u09A8\u09CD\u09AE\u09C7\u09B0 \u09AC\u09BF\u09B7\u09AF\u09BC\u09AC\u09B8\u09CD\u09A4\u09C1 \u0996\u09C1\u0981\u099C\u09C7 \u09A6\u09C7\u0996\u09C1\u09A8:",
  searching: "\u0985\u09A8\u09C1\u09B8\u09A8\u09CD\u09A7\u09BE\u09A8 \u099A\u09B2\u099B\u09C7 [SEARCH_TERM]...",
  results_label: "\u0985\u09A8\u09C1\u09B8\u09A8\u09CD\u09A7\u09BE\u09A8\u09C7\u09B0 \u09AB\u09B2\u09BE\u09AB\u09B2",
  keyboard_navigate: "\u09A8\u09C7\u09AD\u09BF\u0997\u09C7\u099F",
  keyboard_select: "\u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8",
  keyboard_clear: "\u09AE\u09C1\u099B\u09C1\u09A8",
  keyboard_close: "\u09AC\u09A8\u09CD\u09A7",
  keyboard_search: "\u0985\u09A8\u09C1\u09B8\u09A8\u09CD\u09A7\u09BE\u09A8",
  error_search: "\u0985\u09A8\u09C1\u09B8\u09A8\u09CD\u09A7\u09BE\u09A8 \u09AC\u09CD\u09AF\u09B0\u09CD\u09A5",
  filter_selected_one: "[COUNT]-\u099F\u09BF \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09BF\u09A4",
  filter_selected_many: "[COUNT]-\u099F\u09BF \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09BF\u09A4",
  input_hint: "\u099F\u09BE\u0987\u09AA \u0995\u09B0\u09BE\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09B8\u09BE\u09A5\u09C7 \u09AB\u09B2\u09BE\u09AB\u09B2 \u09A6\u09C7\u0996\u09BE \u09AF\u09BE\u09AC\u09C7",
  loading: "\u09B2\u09CB\u09A1 \u09B9\u099A\u09CD\u099B\u09C7"
};
var bn_default = {
  thanks_to: thanks_to3,
  comments: comments3,
  direction: direction3,
  strings: strings3
};
var ca_exports = {};
__export(ca_exports, {
  comments: () => comments4,
  default: () => ca_default,
  direction: () => direction4,
  strings: () => strings4,
  thanks_to: () => thanks_to4
});
var thanks_to4 = "Pablo Villaverde <https://github.com/pvillaverde>";
var comments4 = "";
var direction4 = "ltr";
var strings4 = {
  placeholder: "Cerca",
  clear_search: "Netejar",
  load_more: "Veure m\xE9s resultats",
  search_label: "Cerca en aquest lloc",
  filters_label: "Filtres",
  zero_results: "No es van trobar resultats per [SEARCH_TERM]",
  many_results: "[COUNT] resultats trobats per [SEARCH_TERM]",
  one_result: "[COUNT] resultat trobat per [SEARCH_TERM]",
  total_zero_results: "Sense resultats",
  total_one_result: "[COUNT] resultat",
  total_many_results: "[COUNT] resultats",
  alt_search: "No es van trobar resultats per [SEARCH_TERM]. Mostrant al seu lloc resultats per [DIFFERENT_TERM]",
  search_suggestion: "No es van trobar resultats per [SEARCH_TERM]. Proveu una de les cerques seg\xFCents:",
  searching: "Cercant [SEARCH_TERM]...",
  results_label: "Resultats de la cerca",
  keyboard_navigate: "navegar",
  keyboard_select: "triar",
  keyboard_clear: "netejar",
  keyboard_close: "tancar",
  keyboard_search: "cercar",
  error_search: "Error en la cerca",
  filter_selected_one: "[COUNT] seleccionat",
  filter_selected_many: "[COUNT] seleccionats",
  input_hint: "Els resultats apareixeran mentre escriviu",
  loading: "Carregant"
};
var ca_default = {
  thanks_to: thanks_to4,
  comments: comments4,
  direction: direction4,
  strings: strings4
};
var cs_exports = {};
__export(cs_exports, {
  comments: () => comments5,
  default: () => cs_default,
  direction: () => direction5,
  strings: () => strings5,
  thanks_to: () => thanks_to5
});
var thanks_to5 = "Dalibor Hon <https://github.com/dallyh>";
var comments5 = "";
var direction5 = "ltr";
var strings5 = {
  placeholder: "Hledat",
  clear_search: "Smazat",
  load_more: "Na\u010D\xEDst dal\u0161\xED v\xFDsledky",
  search_label: "Prohledat tuto str\xE1nku",
  filters_label: "Filtry",
  zero_results: "\u017D\xE1dn\xE9 v\xFDsledky pro [SEARCH_TERM]",
  many_results: "[COUNT] v\xFDsledk\u016F pro [SEARCH_TERM]",
  one_result: "[COUNT] v\xFDsledek pro [SEARCH_TERM]",
  total_zero_results: "\u017D\xE1dn\xE9 v\xFDsledky",
  total_one_result: "[COUNT] v\xFDsledek",
  total_many_results: "[COUNT] v\xFDsledk\u016F",
  alt_search: "\u017D\xE1dn\xE9 v\xFDsledky pro [SEARCH_TERM]. Zobrazuj\xED se v\xFDsledky pro [DIFFERENT_TERM]",
  search_suggestion: "\u017D\xE1dn\xE9 v\xFDsledky pro [SEARCH_TERM]. Souvisej\xEDc\xED v\xFDsledky hled\xE1n\xED:",
  searching: "Hled\xE1m [SEARCH_TERM]...",
  results_label: "V\xFDsledky hled\xE1n\xED",
  keyboard_navigate: "navigovat",
  keyboard_select: "vybrat",
  keyboard_clear: "smazat",
  keyboard_close: "zav\u0159\xEDt",
  keyboard_search: "hledat",
  error_search: "Hled\xE1n\xED selhalo",
  filter_selected_one: "[COUNT] vybran\xFD",
  filter_selected_many: "[COUNT] vybran\xFDch",
  input_hint: "V\xFDsledky se zobraz\xED b\u011Bhem psan\xED",
  loading: "Na\u010D\xEDt\xE1n\xED"
};
var cs_default = {
  thanks_to: thanks_to5,
  comments: comments5,
  direction: direction5,
  strings: strings5
};
var da_exports = {};
__export(da_exports, {
  comments: () => comments6,
  default: () => da_default,
  direction: () => direction6,
  strings: () => strings6,
  thanks_to: () => thanks_to6
});
var thanks_to6 = "Jonas Smedegaard <dr@jones.dk>";
var comments6 = "";
var direction6 = "ltr";
var strings6 = {
  placeholder: "S\xF8g",
  clear_search: "Nulstil",
  load_more: "Indl\xE6s flere resultater",
  search_label: "S\xF8g p\xE5 dette website",
  filters_label: "Filtre",
  zero_results: "Ingen resultater for [SEARCH_TERM]",
  many_results: "[COUNT] resultater for [SEARCH_TERM]",
  one_result: "[COUNT] resultat for [SEARCH_TERM]",
  total_zero_results: "Ingen resultater",
  total_one_result: "[COUNT] resultat",
  total_many_results: "[COUNT] resultater",
  alt_search: "Ingen resultater for [SEARCH_TERM]. Viser resultater for [DIFFERENT_TERM] i stedet",
  search_suggestion: "Ingen resultater for [SEARCH_TERM]. Pr\xF8v et af disse s\xF8geord i stedet:",
  searching: "S\xF8ger efter [SEARCH_TERM]...",
  results_label: "S\xF8geresultater",
  keyboard_navigate: "naviger",
  keyboard_select: "v\xE6lg",
  keyboard_clear: "ryd",
  keyboard_close: "luk",
  keyboard_search: "s\xF8g",
  error_search: "S\xF8gning mislykkedes",
  filter_selected_one: "[COUNT] valgt",
  filter_selected_many: "[COUNT] valgte",
  input_hint: "Resultater vises mens du skriver",
  loading: "Indl\xE6ser"
};
var da_default = {
  thanks_to: thanks_to6,
  comments: comments6,
  direction: direction6,
  strings: strings6
};
var de_exports = {};
__export(de_exports, {
  comments: () => comments7,
  default: () => de_default,
  direction: () => direction7,
  strings: () => strings7,
  thanks_to: () => thanks_to7
});
var thanks_to7 = "Jan Claasen <jan@cloudcannon.com>";
var comments7 = "";
var direction7 = "ltr";
var strings7 = {
  placeholder: "Suche",
  clear_search: "L\xF6schen",
  load_more: "Mehr Ergebnisse laden",
  search_label: "Suche diese Seite",
  filters_label: "Filter",
  zero_results: "Keine Ergebnisse f\xFCr [SEARCH_TERM]",
  many_results: "[COUNT] Ergebnisse f\xFCr [SEARCH_TERM]",
  one_result: "[COUNT] Ergebnis f\xFCr [SEARCH_TERM]",
  total_zero_results: "Keine Ergebnisse",
  total_one_result: "[COUNT] Ergebnis",
  total_many_results: "[COUNT] Ergebnisse",
  alt_search: "Keine Ergebnisse f\xFCr [SEARCH_TERM]. Stattdessen werden Ergebnisse f\xFCr [DIFFERENT_TERM] angezeigt",
  search_suggestion: "Keine Ergebnisse f\xFCr [SEARCH_TERM]. Versuchen Sie eine der folgenden Suchen:",
  searching: "Suche nach [SEARCH_TERM]\u202F\u2026",
  results_label: "Suchergebnisse",
  keyboard_navigate: "navigieren",
  keyboard_select: "ausw\xE4hlen",
  keyboard_clear: "l\xF6schen",
  keyboard_close: "schlie\xDFen",
  keyboard_search: "suchen",
  error_search: "Suche fehlgeschlagen",
  filter_selected_one: "[COUNT] ausgew\xE4hlt",
  filter_selected_many: "[COUNT] ausgew\xE4hlt",
  input_hint: "Ergebnisse werden w\xE4hrend der Eingabe angezeigt",
  loading: "Wird geladen"
};
var de_default = {
  thanks_to: thanks_to7,
  comments: comments7,
  direction: direction7,
  strings: strings7
};
var el_exports = {};
__export(el_exports, {
  comments: () => comments8,
  default: () => el_default,
  direction: () => direction8,
  strings: () => strings8,
  thanks_to: () => thanks_to8
});
var thanks_to8 = "George Papadopoulos";
var comments8 = "";
var direction8 = "ltr";
var strings8 = {
  placeholder: "\u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7",
  clear_search: "\u039A\u03B1\u03B8\u03B1\u03C1\u03B9\u03C3\u03BC\u03CC\u03C2",
  load_more: "\u03A6\u03CC\u03C1\u03C4\u03C9\u03C3\u03B7 \u03C0\u03B5\u03C1\u03B9\u03C3\u03C3\u03CC\u03C4\u03B5\u03C1\u03C9\u03BD \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03B5\u03C3\u03BC\u03AC\u03C4\u03C9\u03BD",
  search_label: "\u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7 \u03C3\u03B5 \u03B1\u03C5\u03C4\u03CC\u03BD \u03C4\u03BF\u03BD \u03B9\u03C3\u03C4\u03CC\u03C4\u03BF\u03C0\u03BF",
  filters_label: "\u03A6\u03AF\u03BB\u03C4\u03C1\u03B1",
  zero_results: "\u0394\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B1\u03BD \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1 \u03B3\u03B9\u03B1 [SEARCH_TERM]",
  many_results: "[COUNT] \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1 \u03B3\u03B9\u03B1 [SEARCH_TERM]",
  one_result: "[COUNT] \u03B1\u03C0\u03BF\u03C4\u03AD\u03BB\u03B5\u03C3\u03BC\u03B1 \u03B3\u03B9\u03B1 [SEARCH_TERM]",
  total_zero_results: "\u0394\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B1\u03BD \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1",
  total_one_result: "[COUNT] \u03B1\u03C0\u03BF\u03C4\u03AD\u03BB\u03B5\u03C3\u03BC\u03B1",
  total_many_results: "[COUNT] \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1",
  alt_search: "\u0394\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B1\u03BD \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1 \u03B3\u03B9\u03B1 [SEARCH_TERM]. \u0395\u03BC\u03C6\u03B1\u03BD\u03AF\u03B6\u03BF\u03BD\u03C4\u03B1\u03B9 \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1 \u03B3\u03B9\u03B1 [DIFFERENT_TERM]",
  search_suggestion: "\u0394\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B1\u03BD \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1 \u03B3\u03B9\u03B1 [SEARCH_TERM]. \u0394\u03BF\u03BA\u03B9\u03BC\u03AC\u03C3\u03C4\u03B5 \u03BC\u03AF\u03B1 \u03B1\u03C0\u03CC \u03C4\u03B9\u03C2 \u03C0\u03B1\u03C1\u03B1\u03BA\u03AC\u03C4\u03C9 \u03B1\u03BD\u03B1\u03B6\u03B7\u03C4\u03AE\u03C3\u03B5\u03B9\u03C2:",
  searching: "\u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7 \u03B3\u03B9\u03B1 [SEARCH_TERM]...",
  results_label: "\u0391\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1 \u03B1\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7\u03C2",
  keyboard_navigate: "\u03C0\u03BB\u03BF\u03AE\u03B3\u03B7\u03C3\u03B7",
  keyboard_select: "\u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE",
  keyboard_clear: "\u03BA\u03B1\u03B8\u03B1\u03C1\u03B9\u03C3\u03BC\u03CC\u03C2",
  keyboard_close: "\u03BA\u03BB\u03B5\u03AF\u03C3\u03B9\u03BC\u03BF",
  keyboard_search: "\u03B1\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7",
  error_search: "\u0397 \u03B1\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7 \u03B1\u03C0\u03AD\u03C4\u03C5\u03C7\u03B5",
  filter_selected_one: "[COUNT] \u03B5\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03BF",
  filter_selected_many: "[COUNT] \u03B5\u03C0\u03B9\u03BB\u03B5\u03B3\u03BC\u03AD\u03BD\u03B1",
  input_hint: "\u03A4\u03B1 \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1 \u03B8\u03B1 \u03B5\u03BC\u03C6\u03B1\u03BD\u03AF\u03B6\u03BF\u03BD\u03C4\u03B1\u03B9 \u03BA\u03B1\u03B8\u03CE\u03C2 \u03C0\u03BB\u03B7\u03BA\u03C4\u03C1\u03BF\u03BB\u03BF\u03B3\u03B5\u03AF\u03C4\u03B5",
  loading: "\u03A6\u03CC\u03C1\u03C4\u03C9\u03C3\u03B7"
};
var el_default = {
  thanks_to: thanks_to8,
  comments: comments8,
  direction: direction8,
  strings: strings8
};
var en_exports = {};
__export(en_exports, {
  comments: () => comments9,
  default: () => en_default,
  direction: () => direction9,
  strings: () => strings9,
  thanks_to: () => thanks_to9
});
var thanks_to9 = "Liam Bigelow <liam@cloudcannon.com>";
var comments9 = "";
var direction9 = "ltr";
var strings9 = {
  placeholder: "Search",
  clear_search: "Clear",
  load_more: "Load more results",
  search_label: "Search this site",
  filters_label: "Filters",
  zero_results: "No results for [SEARCH_TERM]",
  many_results: "[COUNT] results for [SEARCH_TERM]",
  one_result: "[COUNT] result for [SEARCH_TERM]",
  total_zero_results: "No results",
  total_one_result: "[COUNT] result",
  total_many_results: "[COUNT] results",
  alt_search: "No results for [SEARCH_TERM]. Showing results for [DIFFERENT_TERM] instead",
  search_suggestion: "No results for [SEARCH_TERM]. Try one of the following searches:",
  searching: "Searching for [SEARCH_TERM]...",
  results_label: "Search results",
  keyboard_navigate: "navigate",
  keyboard_select: "select",
  keyboard_clear: "clear",
  keyboard_close: "close",
  keyboard_search: "search",
  error_search: "Search failed",
  filter_selected_one: "[COUNT] selected",
  filter_selected_many: "[COUNT] selected",
  input_hint: "Results will appear as you type",
  loading: "Loading"
};
var en_default = {
  thanks_to: thanks_to9,
  comments: comments9,
  direction: direction9,
  strings: strings9
};
var es_exports = {};
__export(es_exports, {
  comments: () => comments10,
  default: () => es_default,
  direction: () => direction10,
  strings: () => strings10,
  thanks_to: () => thanks_to10
});
var thanks_to10 = "Pablo Villaverde <https://github.com/pvillaverde>";
var comments10 = "";
var direction10 = "ltr";
var strings10 = {
  placeholder: "Buscar",
  clear_search: "Limpiar",
  load_more: "Ver m\xE1s resultados",
  search_label: "Buscar en este sitio",
  filters_label: "Filtros",
  zero_results: "No se encontraron resultados para [SEARCH_TERM]",
  many_results: "[COUNT] resultados encontrados para [SEARCH_TERM]",
  one_result: "[COUNT] resultado encontrado para [SEARCH_TERM]",
  total_zero_results: "Sin resultados",
  total_one_result: "[COUNT] resultado",
  total_many_results: "[COUNT] resultados",
  alt_search: "No se encontraron resultados para [SEARCH_TERM]. Mostrando en su lugar resultados para [DIFFERENT_TERM]",
  search_suggestion: "No se encontraron resultados para [SEARCH_TERM]. Prueba una de las siguientes b\xFAsquedas:",
  searching: "Buscando [SEARCH_TERM]...",
  results_label: "Resultados de b\xFAsqueda",
  keyboard_navigate: "navegar",
  keyboard_select: "elegir",
  keyboard_clear: "limpiar",
  keyboard_close: "cerrar",
  keyboard_search: "buscar",
  error_search: "Error en la b\xFAsqueda",
  filter_selected_one: "[COUNT] seleccionado",
  filter_selected_many: "[COUNT] seleccionados",
  input_hint: "Los resultados aparecer\xE1n mientras escribe",
  loading: "Cargando"
};
var es_default = {
  thanks_to: thanks_to10,
  comments: comments10,
  direction: direction10,
  strings: strings10
};
var eu_exports = {};
__export(eu_exports, {
  comments: () => comments11,
  default: () => eu_default,
  direction: () => direction11,
  strings: () => strings11,
  thanks_to: () => thanks_to11
});
var thanks_to11 = "Mikel Larreategi <mlarreaegi@codesyntax.com>";
var comments11 = "";
var direction11 = "ltr";
var strings11 = {
  placeholder: "Bilatu",
  clear_search: "Garbitu",
  load_more: "Kargatu emaitza gehiagi",
  search_label: "Bilatu",
  filters_label: "Iragazkiak",
  zero_results: "Ez dago emaitzarik [SEARCH_TERM] bilaketarentzat",
  many_results: "[COUNT] emaitza [SEARCH_TERM] bilaketarentzat",
  one_result: "Emaitza bat [COUNT] [SEARCH_TERM] bilaketarentzat",
  total_zero_results: "Emaitzarik ez",
  total_one_result: "[COUNT] emaitza",
  total_many_results: "[COUNT] emaitza",
  alt_search: "Ez dago emaitzarik [SEARCH_TERM] bilaketarentzat. [DIFFERENT_TERM] bilaketaren emaitzak erakusten",
  search_suggestion: "Ez dago emaitzarik [SEARCH_TERM] bilaketarentzat. Saiatu hauetako beste bateikin:",
  searching: "[SEARCH_TERM] bilatzen...",
  results_label: "Bilaketaren emaitzak",
  keyboard_navigate: "nabigatu",
  keyboard_select: "hautatu",
  keyboard_clear: "garbitu",
  keyboard_close: "itxi",
  keyboard_search: "bilatu",
  error_search: "Bilaketak huts egin du",
  filter_selected_one: "[COUNT] hautatuta",
  filter_selected_many: "[COUNT] hautatuta",
  input_hint: "Emaitzak idatzi ahala agertuko dira",
  loading: "Kargatzen"
};
var eu_default = {
  thanks_to: thanks_to11,
  comments: comments11,
  direction: direction11,
  strings: strings11
};
var fa_exports = {};
__export(fa_exports, {
  comments: () => comments12,
  default: () => fa_default,
  direction: () => direction12,
  strings: () => strings12,
  thanks_to: () => thanks_to12
});
var thanks_to12 = "Ali Khaleqi Yekta <https://yekta.dev>";
var comments12 = "";
var direction12 = "rtl";
var strings12 = {
  placeholder: "\u062C\u0633\u062A\u062C\u0648",
  clear_search: "\u067E\u0627\u06A9\u0633\u0627\u0632\u06CC",
  load_more: "\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0646\u062A\u0627\u06CC\u062C \u0628\u06CC\u0634\u062A\u0631",
  search_label: "\u062C\u0633\u062A\u062C\u0648 \u062F\u0631 \u0633\u0627\u06CC\u062A",
  filters_label: "\u0641\u06CC\u0644\u062A\u0631\u0647\u0627",
  zero_results: "\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC [SEARCH_TERM] \u06CC\u0627\u0641\u062A \u0646\u0634\u062F",
  many_results: "[COUNT] \u0646\u062A\u06CC\u062C\u0647 \u0628\u0631\u0627\u06CC [SEARCH_TERM] \u06CC\u0627\u0641\u062A \u0634\u062F",
  one_result: "[COUNT] \u0646\u062A\u06CC\u062C\u0647 \u0628\u0631\u0627\u06CC [SEARCH_TERM] \u06CC\u0627\u0641\u062A \u0634\u062F",
  total_zero_results: "\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u06CC\u0627\u0641\u062A \u0646\u0634\u062F",
  total_one_result: "[COUNT] \u0646\u062A\u06CC\u062C\u0647",
  total_many_results: "[COUNT] \u0646\u062A\u06CC\u062C\u0647",
  alt_search: "\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC [SEARCH_TERM] \u06CC\u0627\u0641\u062A \u0646\u0634\u062F. \u062F\u0631 \u0639\u0648\u0636 \u0646\u062A\u0627\u06CC\u062C \u0628\u0631\u0627\u06CC [DIFFERENT_TERM] \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F",
  search_suggestion: "\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC [SEARCH_TERM] \u06CC\u0627\u0641\u062A \u0646\u0634\u062F. \u06CC\u06A9\u06CC \u0627\u0632 \u062C\u0633\u062A\u062C\u0648\u0647\u0627\u06CC \u0632\u06CC\u0631 \u0631\u0627 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646\u06CC\u062F:",
  searching: "\u062F\u0631 \u062D\u0627\u0644 \u062C\u0633\u062A\u062C\u0648\u06CC [SEARCH_TERM]...",
  results_label: "\u0646\u062A\u0627\u06CC\u062C \u062C\u0633\u062A\u062C\u0648",
  keyboard_navigate: "\u067E\u06CC\u0645\u0627\u06CC\u0634",
  keyboard_select: "\u0627\u0646\u062A\u062E\u0627\u0628",
  keyboard_clear: "\u067E\u0627\u06A9\u0633\u0627\u0632\u06CC",
  keyboard_close: "\u0628\u0633\u062A\u0646",
  keyboard_search: "\u062C\u0633\u062A\u062C\u0648",
  error_search: "\u062C\u0633\u062A\u062C\u0648 \u0646\u0627\u0645\u0648\u0641\u0642 \u0628\u0648\u062F",
  filter_selected_one: "[COUNT] \u0627\u0646\u062A\u062E\u0627\u0628 \u0634\u062F\u0647",
  filter_selected_many: "[COUNT] \u0627\u0646\u062A\u062E\u0627\u0628 \u0634\u062F\u0647",
  input_hint: "\u0646\u062A\u0627\u06CC\u062C \u0647\u0646\u06AF\u0627\u0645 \u062A\u0627\u06CC\u067E \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u0646\u062F",
  loading: "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC"
};
var fa_default = {
  thanks_to: thanks_to12,
  comments: comments12,
  direction: direction12,
  strings: strings12
};
var fi_exports = {};
__export(fi_exports, {
  comments: () => comments13,
  default: () => fi_default,
  direction: () => direction13,
  strings: () => strings13,
  thanks_to: () => thanks_to13
});
var thanks_to13 = "Valtteri Laitinen <dev@valtlai.fi>";
var comments13 = "";
var direction13 = "ltr";
var strings13 = {
  placeholder: "Haku",
  clear_search: "Tyhjenn\xE4",
  load_more: "Lataa lis\xE4\xE4 tuloksia",
  search_label: "Hae t\xE4lt\xE4 sivustolta",
  filters_label: "Suodattimet",
  zero_results: "Ei tuloksia haulle [SEARCH_TERM]",
  many_results: "[COUNT] tulosta haulle [SEARCH_TERM]",
  one_result: "[COUNT] tulos haulle [SEARCH_TERM]",
  total_zero_results: "Ei tuloksia",
  total_one_result: "[COUNT] tulos",
  total_many_results: "[COUNT] tulosta",
  alt_search: "Ei tuloksia haulle [SEARCH_TERM]. N\xE4ytet\xE4\xE4n tulokset sen sijaan haulle [DIFFERENT_TERM]",
  search_suggestion: "Ei tuloksia haulle [SEARCH_TERM]. Kokeile jotain seuraavista:",
  searching: "Haetaan [SEARCH_TERM]...",
  results_label: "Hakutulokset",
  keyboard_navigate: "siirry",
  keyboard_select: "valitse",
  keyboard_clear: "tyhjenn\xE4",
  keyboard_close: "sulje",
  keyboard_search: "hae",
  error_search: "Haku ep\xE4onnistui",
  filter_selected_one: "[COUNT] valittu",
  filter_selected_many: "[COUNT] valittu",
  input_hint: "Tulokset n\xE4kyv\xE4t kirjoittaessasi",
  loading: "Ladataan"
};
var fi_default = {
  thanks_to: thanks_to13,
  comments: comments13,
  direction: direction13,
  strings: strings13
};
var fr_exports = {};
__export(fr_exports, {
  comments: () => comments14,
  default: () => fr_default,
  direction: () => direction14,
  strings: () => strings14,
  thanks_to: () => thanks_to14
});
var thanks_to14 = "Nicolas Friedli <nicolas@theologique.ch>";
var comments14 = "";
var direction14 = "ltr";
var strings14 = {
  placeholder: "Rechercher",
  clear_search: "Nettoyer",
  load_more: "Charger plus de r\xE9sultats",
  search_label: "Recherche sur ce site",
  filters_label: "Filtres",
  zero_results: "Pas de r\xE9sultat pour [SEARCH_TERM]",
  many_results: "[COUNT] r\xE9sultats pour [SEARCH_TERM]",
  one_result: "[COUNT] r\xE9sultat pour [SEARCH_TERM]",
  total_zero_results: "Pas de r\xE9sultat",
  total_one_result: "[COUNT] r\xE9sultat",
  total_many_results: "[COUNT] r\xE9sultats",
  alt_search: "Pas de r\xE9sultat pour [SEARCH_TERM]. Montre les r\xE9sultats pour [DIFFERENT_TERM] \xE0 la place",
  search_suggestion: "Pas de r\xE9sultat pour [SEARCH_TERM]. Essayer une des recherches suivantes:",
  searching: "Recherche [SEARCH_TERM]...",
  results_label: "R\xE9sultats de recherche",
  keyboard_navigate: "naviguer",
  keyboard_select: "choisir",
  keyboard_clear: "effacer",
  keyboard_close: "fermer",
  keyboard_search: "rechercher",
  error_search: "\xC9chec de la recherche",
  filter_selected_one: "[COUNT] s\xE9lectionn\xE9",
  filter_selected_many: "[COUNT] s\xE9lectionn\xE9s",
  input_hint: "Les r\xE9sultats appara\xEEtront au fur et \xE0 mesure de la saisie",
  loading: "Chargement"
};
var fr_default = {
  thanks_to: thanks_to14,
  comments: comments14,
  direction: direction14,
  strings: strings14
};
var gl_exports = {};
__export(gl_exports, {
  comments: () => comments15,
  default: () => gl_default,
  direction: () => direction15,
  strings: () => strings15,
  thanks_to: () => thanks_to15
});
var thanks_to15 = "Pablo Villaverde <https://github.com/pvillaverde>";
var comments15 = "";
var direction15 = "ltr";
var strings15 = {
  placeholder: "Buscar",
  clear_search: "Limpar",
  load_more: "Ver m\xE1is resultados",
  search_label: "Buscar neste sitio",
  filters_label: "Filtros",
  zero_results: "Non se atoparon resultados para [SEARCH_TERM]",
  many_results: "[COUNT] resultados atopados para [SEARCH_TERM]",
  one_result: "[COUNT] resultado atopado para [SEARCH_TERM]",
  total_zero_results: "Sen resultados",
  total_one_result: "[COUNT] resultado",
  total_many_results: "[COUNT] resultados",
  alt_search: "Non se atoparon resultados para [SEARCH_TERM]. Amosando no seu lugar resultados para [DIFFERENT_TERM]",
  search_suggestion: "Non se atoparon resultados para [SEARCH_TERM]. Probe unha das seguintes pesquisas:",
  searching: "Buscando [SEARCH_TERM]...",
  results_label: "Resultados da busca",
  keyboard_navigate: "navegar",
  keyboard_select: "escoller",
  keyboard_clear: "limpar",
  keyboard_close: "pechar",
  keyboard_search: "buscar",
  error_search: "Erro na busca",
  filter_selected_one: "[COUNT] seleccionado",
  filter_selected_many: "[COUNT] seleccionados",
  input_hint: "Os resultados aparecer\xE1n mentres escribe",
  loading: "Cargando"
};
var gl_default = {
  thanks_to: thanks_to15,
  comments: comments15,
  direction: direction15,
  strings: strings15
};
var he_exports = {};
__export(he_exports, {
  comments: () => comments16,
  default: () => he_default,
  direction: () => direction16,
  strings: () => strings16,
  thanks_to: () => thanks_to16
});
var thanks_to16 = "Nir Tamir <nirtamir2@gmail.com>";
var comments16 = "";
var direction16 = "rtl";
var strings16 = {
  placeholder: "\u05D7\u05D9\u05E4\u05D5\u05E9",
  clear_search: "\u05E0\u05D9\u05E7\u05D5\u05D9",
  load_more: "\u05E2\u05D5\u05D3 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA",
  search_label: "\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D1\u05D0\u05EA\u05E8 \u05D6\u05D4",
  filters_label: "\u05DE\u05E1\u05E0\u05E0\u05D9\u05DD",
  zero_results: "\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05E8 [SEARCH_TERM]",
  many_results: "\u05E0\u05DE\u05E6\u05D0\u05D5 [COUNT] \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05E8 [SEARCH_TERM]",
  one_result: "\u05E0\u05DE\u05E6\u05D0\u05D4 \u05EA\u05D5\u05E6\u05D0\u05D4 \u05D0\u05D7\u05EA \u05E2\u05D1\u05D5\u05E8 [SEARCH_TERM]",
  total_zero_results: "\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA",
  total_one_result: "\u05EA\u05D5\u05E6\u05D0\u05D4 [COUNT]",
  total_many_results: "[COUNT] \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA",
  alt_search: "\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05E8 [SEARCH_TERM]. \u05DE\u05D5\u05E6\u05D2\u05D5\u05EA \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05E8 [DIFFERENT_TERM]",
  search_suggestion: "\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05E8 [SEARCH_TERM]. \u05E0\u05E1\u05D5 \u05D0\u05D7\u05D3 \u05DE\u05D4\u05D7\u05D9\u05E4\u05D5\u05E9\u05D9\u05DD \u05D4\u05D1\u05D0\u05D9\u05DD:",
  searching: "\u05DE\u05D7\u05E4\u05E9 \u05D0\u05EA [SEARCH_TERM]...",
  results_label: "\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D7\u05D9\u05E4\u05D5\u05E9",
  keyboard_navigate: "\u05E0\u05D9\u05D5\u05D5\u05D8",
  keyboard_select: "\u05D1\u05D7\u05D9\u05E8\u05D4",
  keyboard_clear: "\u05E0\u05D9\u05E7\u05D5\u05D9",
  keyboard_close: "\u05E1\u05D2\u05D9\u05E8\u05D4",
  keyboard_search: "\u05D7\u05D9\u05E4\u05D5\u05E9",
  error_search: "\u05D4\u05D7\u05D9\u05E4\u05D5\u05E9 \u05E0\u05DB\u05E9\u05DC",
  filter_selected_one: "[COUNT] \u05E0\u05D1\u05D7\u05E8",
  filter_selected_many: "[COUNT] \u05E0\u05D1\u05D7\u05E8\u05D5",
  input_hint: "\u05D4\u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05D9\u05D5\u05E4\u05D9\u05E2\u05D5 \u05EA\u05D5\u05DA \u05DB\u05D3\u05D9 \u05D4\u05E7\u05DC\u05D3\u05D4",
  loading: "\u05D8\u05D5\u05E2\u05DF"
};
var he_default = {
  thanks_to: thanks_to16,
  comments: comments16,
  direction: direction16,
  strings: strings16
};
var hi_exports = {};
__export(hi_exports, {
  comments: () => comments17,
  default: () => hi_default,
  direction: () => direction17,
  strings: () => strings17,
  thanks_to: () => thanks_to17
});
var thanks_to17 = "Amit Yadav <amit@thetechbasket.com>";
var comments17 = "";
var direction17 = "ltr";
var strings17 = {
  placeholder: "\u0916\u094B\u091C\u0947\u0902",
  clear_search: "\u0938\u093E\u092B \u0915\u0930\u0947\u0902",
  load_more: "\u0914\u0930 \u0905\u0927\u093F\u0915 \u092A\u0930\u093F\u0923\u093E\u092E \u0932\u094B\u0921 \u0915\u0930\u0947\u0902",
  search_label: "\u0907\u0938 \u0938\u093E\u0907\u091F \u092E\u0947\u0902 \u0916\u094B\u091C\u0947\u0902",
  filters_label: "\u092B\u093C\u093F\u0932\u094D\u091F\u0930",
  zero_results: "\u0915\u094B\u0908 \u092A\u0930\u093F\u0923\u093E\u092E [SEARCH_TERM] \u0915\u0947 \u0932\u093F\u090F \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E",
  many_results: "[COUNT] \u092A\u0930\u093F\u0923\u093E\u092E [SEARCH_TERM] \u0915\u0947 \u0932\u093F\u090F \u092E\u093F\u0932\u0947",
  one_result: "[COUNT] \u092A\u0930\u093F\u0923\u093E\u092E [SEARCH_TERM] \u0915\u0947 \u0932\u093F\u090F \u092E\u093F\u0932\u093E",
  total_zero_results: "\u0915\u094B\u0908 \u092A\u0930\u093F\u0923\u093E\u092E \u0928\u0939\u0940\u0902",
  total_one_result: "[COUNT] \u092A\u0930\u093F\u0923\u093E\u092E",
  total_many_results: "[COUNT] \u092A\u0930\u093F\u0923\u093E\u092E",
  alt_search: "[SEARCH_TERM] \u0915\u0947 \u0932\u093F\u090F \u0915\u094B\u0908 \u092A\u0930\u093F\u0923\u093E\u092E \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964 \u0907\u0938\u0915\u0947 \u092C\u091C\u093E\u092F [DIFFERENT_TERM] \u0915\u0947 \u0932\u093F\u090F \u092A\u0930\u093F\u0923\u093E\u092E \u0926\u093F\u0916\u093E \u0930\u0939\u093E \u0939\u0948",
  search_suggestion: "[SEARCH_TERM] \u0915\u0947 \u0932\u093F\u090F \u0915\u094B\u0908 \u092A\u0930\u093F\u0923\u093E\u092E \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964 \u0928\u093F\u092E\u094D\u0928\u0932\u093F\u0916\u093F\u0924 \u0916\u094B\u091C\u094B\u0902 \u092E\u0947\u0902 \u0938\u0947 \u0915\u094B\u0908 \u090F\u0915 \u0906\u091C\u093C\u092E\u093E\u090F\u0902:",
  searching: "[SEARCH_TERM] \u0915\u0940 \u0916\u094B\u091C \u0915\u0940 \u091C\u093E \u0930\u0939\u0940 \u0939\u0948...",
  results_label: "\u0916\u094B\u091C \u092A\u0930\u093F\u0923\u093E\u092E",
  keyboard_navigate: "\u0928\u0947\u0935\u093F\u0917\u0947\u091F",
  keyboard_select: "\u091A\u0941\u0928\u0947\u0902",
  keyboard_clear: "\u0938\u093E\u092B\u093C \u0915\u0930\u0947\u0902",
  keyboard_close: "\u092C\u0902\u0926 \u0915\u0930\u0947\u0902",
  keyboard_search: "\u0916\u094B\u091C\u0947\u0902",
  error_search: "\u0916\u094B\u091C \u0935\u093F\u092B\u0932",
  filter_selected_one: "[COUNT] \u091A\u092F\u0928\u093F\u0924",
  filter_selected_many: "[COUNT] \u091A\u092F\u0928\u093F\u0924",
  input_hint: "\u091F\u093E\u0907\u092A \u0915\u0930\u0924\u0947 \u0938\u092E\u092F \u092A\u0930\u093F\u0923\u093E\u092E \u0926\u093F\u0916\u093E\u0908 \u0926\u0947\u0902\u0917\u0947",
  loading: "\u0932\u094B\u0921 \u0939\u094B \u0930\u0939\u093E \u0939\u0948"
};
var hi_default = {
  thanks_to: thanks_to17,
  comments: comments17,
  direction: direction17,
  strings: strings17
};
var hr_exports = {};
__export(hr_exports, {
  comments: () => comments18,
  default: () => hr_default,
  direction: () => direction18,
  strings: () => strings18,
  thanks_to: () => thanks_to18
});
var thanks_to18 = "Diomed <https://github.com/diomed>";
var comments18 = "";
var direction18 = "ltr";
var strings18 = {
  placeholder: "Tra\u017Ei",
  clear_search: "O\u010Disti",
  load_more: "U\u010Ditaj vi\u0161e rezultata",
  search_label: "Pretra\u017Ei ovu stranicu",
  filters_label: "Filteri",
  zero_results: "Nema rezultata za [SEARCH_TERM]",
  many_results: "[COUNT] rezultata za [SEARCH_TERM]",
  one_result: "[COUNT] rezultat za [SEARCH_TERM]",
  total_zero_results: "Nema rezultata",
  total_one_result: "[COUNT] rezultat",
  total_many_results: "[COUNT] rezultata",
  alt_search: "Nema rezultata za [SEARCH_TERM]. Prikazujem rezultate za [DIFFERENT_TERM]",
  search_suggestion: "Nema rezultata za [SEARCH_TERM]. Poku\u0161aj s jednom od ovih pretraga:",
  searching: "Pretra\u017Eujem [SEARCH_TERM]...",
  results_label: "Rezultati pretrage",
  keyboard_navigate: "navigiraj",
  keyboard_select: "odaberi",
  keyboard_clear: "o\u010Disti",
  keyboard_close: "zatvori",
  keyboard_search: "tra\u017Ei",
  error_search: "Pretraga nije uspjela",
  filter_selected_one: "[COUNT] odabran",
  filter_selected_many: "[COUNT] odabranih",
  input_hint: "Rezultati \u0107e se pojaviti dok tipkate",
  loading: "U\u010Ditavanje"
};
var hr_default = {
  thanks_to: thanks_to18,
  comments: comments18,
  direction: direction18,
  strings: strings18
};
var hu_exports = {};
__export(hu_exports, {
  comments: () => comments19,
  default: () => hu_default,
  direction: () => direction19,
  strings: () => strings19,
  thanks_to: () => thanks_to19
});
var thanks_to19 = "Adam Laki <info@adamlaki.com>";
var comments19 = "";
var direction19 = "ltr";
var strings19 = {
  placeholder: "Keres\xE9s",
  clear_search: "T\xF6rl\xE9s",
  load_more: "Tov\xE1bbi tal\xE1latok bet\xF6lt\xE9se",
  search_label: "Keres\xE9s az oldalon",
  filters_label: "Sz\u0171r\xE9s",
  zero_results: "Nincs tal\xE1lat a(z) [SEARCH_TERM] kifejez\xE9sre",
  many_results: "[COUNT] db tal\xE1lat a(z) [SEARCH_TERM] kifejez\xE9sre",
  one_result: "[COUNT] db tal\xE1lat a(z) [SEARCH_TERM] kifejez\xE9sre",
  total_zero_results: "Nincs tal\xE1lat",
  total_one_result: "[COUNT] tal\xE1lat",
  total_many_results: "[COUNT] tal\xE1lat",
  alt_search: "Nincs tal\xE1lat a(z) [SEARCH_TERM] kifejez\xE9sre. Tal\xE1latok mutat\xE1sa ink\xE1bb a(z) [DIFFERENT_TERM] kifejez\xE9sre",
  search_suggestion: "Nincs tal\xE1lat a(z) [SEARCH_TERM] kifejez\xE9sre. Pr\xF3b\xE1ld meg a k\xF6vetkez\u0151 keres\xE9sek egyik\xE9t:",
  searching: "Keres\xE9s a(z) [SEARCH_TERM] kifejez\xE9sre...",
  results_label: "Keres\xE9si tal\xE1latok",
  keyboard_navigate: "navig\xE1l\xE1s",
  keyboard_select: "kiv\xE1laszt\xE1s",
  keyboard_clear: "t\xF6rl\xE9s",
  keyboard_close: "bez\xE1r\xE1s",
  keyboard_search: "keres\xE9s",
  error_search: "A keres\xE9s sikertelen",
  filter_selected_one: "[COUNT] kiv\xE1lasztva",
  filter_selected_many: "[COUNT] kiv\xE1lasztva",
  input_hint: "A tal\xE1latok g\xE9pel\xE9s k\xF6zben jelennek meg",
  loading: "Bet\xF6lt\xE9s"
};
var hu_default = {
  thanks_to: thanks_to19,
  comments: comments19,
  direction: direction19,
  strings: strings19
};
var id_exports = {};
__export(id_exports, {
  comments: () => comments20,
  default: () => id_default,
  direction: () => direction20,
  strings: () => strings20,
  thanks_to: () => thanks_to20
});
var thanks_to20 = "Nixentric";
var comments20 = "";
var direction20 = "ltr";
var strings20 = {
  placeholder: "Cari",
  clear_search: "Bersihkan",
  load_more: "Muat lebih banyak hasil",
  search_label: "Telusuri situs ini",
  filters_label: "Filter",
  zero_results: "[SEARCH_TERM] tidak ditemukan",
  many_results: "Ditemukan [COUNT] hasil untuk [SEARCH_TERM]",
  one_result: "Ditemukan [COUNT] hasil untuk [SEARCH_TERM]",
  total_zero_results: "Tidak ada hasil",
  total_one_result: "[COUNT] hasil",
  total_many_results: "[COUNT] hasil",
  alt_search: "[SEARCH_TERM] tidak ditemukan. Menampilkan hasil [DIFFERENT_TERM] sebagai gantinya",
  search_suggestion: "[SEARCH_TERM] tidak ditemukan. Coba salah satu pencarian berikut ini:",
  searching: "Mencari [SEARCH_TERM]...",
  results_label: "Hasil pencarian",
  keyboard_navigate: "navigasi",
  keyboard_select: "pilih",
  keyboard_clear: "bersihkan",
  keyboard_close: "tutup",
  keyboard_search: "cari",
  error_search: "Pencarian gagal",
  filter_selected_one: "[COUNT] dipilih",
  filter_selected_many: "[COUNT] dipilih",
  input_hint: "Hasil akan muncul saat Anda mengetik",
  loading: "Memuat"
};
var id_default = {
  thanks_to: thanks_to20,
  comments: comments20,
  direction: direction20,
  strings: strings20
};
var it_exports = {};
__export(it_exports, {
  comments: () => comments21,
  default: () => it_default,
  direction: () => direction21,
  strings: () => strings21,
  thanks_to: () => thanks_to21
});
var thanks_to21 = "Cosette Bruhns Alonso, Andrew Janco <apjanco@upenn.edu>";
var comments21 = "";
var direction21 = "ltr";
var strings21 = {
  placeholder: "Cerca",
  clear_search: "Cancella la cronologia",
  load_more: "Mostra pi\xF9 risultati",
  search_label: "Cerca nel sito",
  filters_label: "Filtri di ricerca",
  zero_results: "Nessun risultato per [SEARCH_TERM]",
  many_results: "[COUNT] risultati per [SEARCH_TERM]",
  one_result: "[COUNT] risultato per [SEARCH_TERM]",
  total_zero_results: "Nessun risultato",
  total_one_result: "[COUNT] risultato",
  total_many_results: "[COUNT] risultati",
  alt_search: "Nessun risultato per [SEARCH_TERM]. Mostrando risultati per [DIFFERENT_TERM] come alternativa.",
  search_suggestion: "Nessun risultato per [SEARCH_TERM]. Prova una delle seguenti ricerche:",
  searching: "Cercando [SEARCH_TERM]...",
  results_label: "Risultati della ricerca",
  keyboard_navigate: "naviga",
  keyboard_select: "seleziona",
  keyboard_clear: "cancella",
  keyboard_close: "chiudi",
  keyboard_search: "cerca",
  error_search: "Ricerca fallita",
  filter_selected_one: "[COUNT] selezionato",
  filter_selected_many: "[COUNT] selezionati",
  input_hint: "I risultati appariranno durante la digitazione",
  loading: "Caricamento"
};
var it_default = {
  thanks_to: thanks_to21,
  comments: comments21,
  direction: direction21,
  strings: strings21
};
var ja_exports = {};
__export(ja_exports, {
  comments: () => comments22,
  default: () => ja_default,
  direction: () => direction22,
  strings: () => strings22,
  thanks_to: () => thanks_to22
});
var thanks_to22 = "Tate";
var comments22 = "";
var direction22 = "ltr";
var strings22 = {
  placeholder: "\u691C\u7D22",
  clear_search: "\u30AF\u30EA\u30A2",
  load_more: "\u6B21\u3092\u8AAD\u307F\u8FBC\u3080",
  search_label: "\u3053\u306E\u30B5\u30A4\u30C8\u3092\u691C\u7D22",
  filters_label: "\u30D5\u30A3\u30EB\u30BF",
  zero_results: "[SEARCH_TERM]\u306E\u691C\u7D22\u306B\u4E00\u81F4\u3059\u308B\u60C5\u5831\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F",
  many_results: "[SEARCH_TERM]\u306E[COUNT]\u4EF6\u306E\u691C\u7D22\u7D50\u679C",
  one_result: "[SEARCH_TERM]\u306E[COUNT]\u4EF6\u306E\u691C\u7D22\u7D50\u679C",
  total_zero_results: "\u7D50\u679C\u306A\u3057",
  total_one_result: "[COUNT]\u4EF6\u306E\u7D50\u679C",
  total_many_results: "[COUNT]\u4EF6\u306E\u7D50\u679C",
  alt_search: "[SEARCH_TERM]\u306E\u691C\u7D22\u306B\u4E00\u81F4\u3059\u308B\u60C5\u5831\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002[DIFFERENT_TERM]\u306E\u691C\u7D22\u7D50\u679C\u3092\u8868\u793A\u3057\u3066\u3044\u307E\u3059",
  search_suggestion: "[SEARCH_TERM]\u306E\u691C\u7D22\u306B\u4E00\u81F4\u3059\u308B\u60C5\u5831\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u6B21\u306E\u3044\u305A\u308C\u304B\u306E\u691C\u7D22\u3092\u8A66\u3057\u3066\u304F\u3060\u3055\u3044",
  searching: "[SEARCH_TERM]\u3092\u691C\u7D22\u3057\u3066\u3044\u307E\u3059",
  results_label: "\u691C\u7D22\u7D50\u679C",
  keyboard_navigate: "\u79FB\u52D5",
  keyboard_select: "\u9078\u629E",
  keyboard_clear: "\u30AF\u30EA\u30A2",
  keyboard_close: "\u9589\u3058\u308B",
  keyboard_search: "\u691C\u7D22",
  error_search: "\u691C\u7D22\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
  filter_selected_one: "[COUNT]\u4EF6\u9078\u629E\u4E2D",
  filter_selected_many: "[COUNT]\u4EF6\u9078\u629E\u4E2D",
  input_hint: "\u5165\u529B\u4E2D\u306B\u691C\u7D22\u7D50\u679C\u304C\u8868\u793A\u3055\u308C\u307E\u3059",
  loading: "\u8AAD\u307F\u8FBC\u307F\u4E2D"
};
var ja_default = {
  thanks_to: thanks_to22,
  comments: comments22,
  direction: direction22,
  strings: strings22
};
var ko_exports = {};
__export(ko_exports, {
  comments: () => comments23,
  default: () => ko_default,
  direction: () => direction23,
  strings: () => strings23,
  thanks_to: () => thanks_to23
});
var thanks_to23 = "Seokho Son <https://github.com/seokho-son>";
var comments23 = "";
var direction23 = "ltr";
var strings23 = {
  placeholder: "\uAC80\uC0C9\uC5B4",
  clear_search: "\uBE44\uC6B0\uAE30",
  load_more: "\uAC80\uC0C9 \uACB0\uACFC \uB354 \uBCF4\uAE30",
  search_label: "\uC0AC\uC774\uD2B8 \uAC80\uC0C9",
  filters_label: "\uD544\uD130",
  zero_results: "[SEARCH_TERM]\uC5D0 \uB300\uD55C \uACB0\uACFC \uC5C6\uC74C",
  many_results: "[SEARCH_TERM]\uC5D0 \uB300\uD55C \uACB0\uACFC [COUNT]\uAC74",
  one_result: "[SEARCH_TERM]\uC5D0 \uB300\uD55C \uACB0\uACFC [COUNT]\uAC74",
  total_zero_results: "\uACB0\uACFC \uC5C6\uC74C",
  total_one_result: "\uACB0\uACFC [COUNT]\uAC74",
  total_many_results: "\uACB0\uACFC [COUNT]\uAC74",
  alt_search: "[SEARCH_TERM]\uC5D0 \uB300\uD55C \uACB0\uACFC \uC5C6\uC74C. [DIFFERENT_TERM]\uC5D0 \uB300\uD55C \uACB0\uACFC",
  search_suggestion: "[SEARCH_TERM]\uC5D0 \uB300\uD55C \uACB0\uACFC \uC5C6\uC74C. \uCD94\uCC9C \uAC80\uC0C9\uC5B4: ",
  searching: "[SEARCH_TERM] \uAC80\uC0C9 \uC911...",
  results_label: "\uAC80\uC0C9 \uACB0\uACFC",
  keyboard_navigate: "\uC774\uB3D9",
  keyboard_select: "\uC120\uD0DD",
  keyboard_clear: "\uBE44\uC6B0\uAE30",
  keyboard_close: "\uB2EB\uAE30",
  keyboard_search: "\uAC80\uC0C9",
  error_search: "\uAC80\uC0C9 \uC2E4\uD328",
  filter_selected_one: "[COUNT]\uAC1C \uC120\uD0DD\uB428",
  filter_selected_many: "[COUNT]\uAC1C \uC120\uD0DD\uB428",
  input_hint: "\uC785\uB825\uD558\uB294 \uB3D9\uC548 \uACB0\uACFC\uAC00 \uD45C\uC2DC\uB429\uB2C8\uB2E4",
  loading: "\uB85C\uB529 \uC911"
};
var ko_default = {
  thanks_to: thanks_to23,
  comments: comments23,
  direction: direction23,
  strings: strings23
};
var mi_exports = {};
__export(mi_exports, {
  comments: () => comments24,
  default: () => mi_default,
  direction: () => direction24,
  strings: () => strings24,
  thanks_to: () => thanks_to24
});
var thanks_to24 = "";
var comments24 = "";
var direction24 = "ltr";
var strings24 = {
  placeholder: "Rapu",
  clear_search: "Whakakore",
  load_more: "Whakauta \u0113tahi otinga k\u0113",
  search_label: "Rapu",
  filters_label: "T\u0101tari",
  zero_results: "Otinga kore ki [SEARCH_TERM]",
  many_results: "[COUNT] otinga ki [SEARCH_TERM]",
  one_result: "[COUNT] otinga ki [SEARCH_TERM]",
  total_zero_results: "K\u0101ore he otinga",
  total_one_result: "[COUNT] otinga",
  total_many_results: "[COUNT] ng\u0101 otinga",
  alt_search: "Otinga kore ki [SEARCH_TERM]. Otinga k\u0113 ki [DIFFERENT_TERM]",
  search_suggestion: "Otinga kore ki [SEARCH_TERM]. whakam\u0101tau ki ng\u0101 mea atu:",
  searching: "Rapu ki [SEARCH_TERM]...",
  results_label: "Ng\u0101 otinga rapu",
  keyboard_navigate: "whakatere",
  keyboard_select: "t\u012Bpako",
  keyboard_clear: "whakakore",
  keyboard_close: "kati",
  keyboard_search: "rapu",
  error_search: "K\u0101ore i eke te rapu",
  filter_selected_one: "[COUNT] kua t\u012Bpakohia",
  filter_selected_many: "[COUNT] kua t\u012Bpakohia",
  input_hint: "Ka puta ng\u0101 otinga i a koe e patopato ana",
  loading: "E uta ana"
};
var mi_default = {
  thanks_to: thanks_to24,
  comments: comments24,
  direction: direction24,
  strings: strings24
};
var my_exports = {};
__export(my_exports, {
  comments: () => comments25,
  default: () => my_default,
  direction: () => direction25,
  strings: () => strings25,
  thanks_to: () => thanks_to25
});
var thanks_to25 = "Harry Min Khant <https://harrymkt.github.io>";
var comments25 = "";
var direction25 = "ltr";
var strings25 = {
  placeholder: "\u101B\u103E\u102C\u101B\u1014\u103A",
  clear_search: "\u101B\u103E\u102C\u1016\u103D\u1031\u1019\u103E\u102F\u1000\u102D\u102F \u101B\u103E\u1004\u103A\u1038\u101C\u1004\u103A\u1038\u1015\u102B\u104B",
  load_more: "\u1014\u1031\u102C\u1000\u103A\u1011\u1015\u103A\u101B\u101C\u1012\u103A\u1019\u103B\u102C\u1038\u1000\u102D\u102F \u1010\u1004\u103A\u1015\u102B\u104B",
  search_label: "\u1024\u1006\u102D\u102F\u1000\u103A\u1010\u103D\u1004\u103A\u101B\u103E\u102C\u1016\u103D\u1031\u1015\u102B\u104B",
  filters_label: "\u1005\u1005\u103A\u1011\u102F\u1010\u103A\u1019\u103E\u102F\u1019\u103B\u102C\u1038",
  zero_results: "[SEARCH_TERM] \u1021\u1010\u103D\u1000\u103A \u101B\u101C\u1012\u103A\u1019\u103B\u102C\u1038 \u1019\u101B\u103E\u102D\u1015\u102B",
  many_results: "[SEARCH_TERM] \u1021\u1010\u103D\u1000\u103A \u101B\u101C\u1012\u103A [COUNT] \u1001\u102F",
  one_result: "[SEARCH_TERM] \u1021\u1010\u103D\u1000\u103A \u101B\u101C\u1012\u103A [COUNT]",
  total_zero_results: "\u101B\u101C\u1012\u103A\u1019\u103B\u102C\u1038 \u1019\u101B\u103E\u102D\u1015\u102B",
  total_one_result: "\u101B\u101C\u1012\u103A [COUNT] \u1001\u102F",
  total_many_results: "\u101B\u101C\u1012\u103A [COUNT] \u1001\u102F",
  alt_search: "[SEARCH_TERM] \u1021\u1010\u103D\u1000\u103A \u101B\u101C\u1012\u103A\u1019\u101B\u103E\u102D\u1015\u102B\u104B \u104E\u1004\u103A\u1038\u1021\u1005\u102C\u1038 [DIFFERENT_TERM] \u1021\u1010\u103D\u1000\u103A \u101B\u101C\u1012\u103A\u1019\u103B\u102C\u1038\u1000\u102D\u102F \u1015\u103C\u101E\u101E\u100A\u103A\u104B",
  search_suggestion: "[SEARCH_TERM] \u1021\u1010\u103D\u1000\u103A \u101B\u101C\u1012\u103A\u1019\u101B\u103E\u102D\u1015\u102B\u104B \u1021\u1031\u102C\u1000\u103A\u1015\u102B\u101B\u103E\u102C\u1016\u103D\u1031\u1019\u103E\u102F\u1019\u103B\u102C\u1038\u1011\u1032\u1019\u103E \u1010\u1005\u103A\u1001\u102F\u1000\u102D\u102F \u1005\u1019\u103A\u1038\u1000\u103C\u100A\u1037\u103A\u1015\u102B:",
  searching: "[SEARCH_TERM] \u1000\u102D\u102F \u101B\u103E\u102C\u1016\u103D\u1031\u1014\u1031\u101E\u100A\u103A...",
  results_label: "\u101B\u103E\u102C\u1016\u103D\u1031\u1019\u103E\u102F \u101B\u101C\u1012\u103A\u1019\u103B\u102C\u1038",
  keyboard_navigate: "\u101C\u1019\u103A\u1038\u100A\u103D\u103E\u1014\u103A",
  keyboard_select: "\u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A",
  keyboard_clear: "\u101B\u103E\u1004\u103A\u1038\u101C\u1004\u103A\u1038",
  keyboard_close: "\u1015\u102D\u1010\u103A",
  keyboard_search: "\u101B\u103E\u102C\u101B\u1014\u103A",
  error_search: "\u101B\u103E\u102C\u1016\u103D\u1031\u1019\u103E\u102F \u1019\u1021\u1031\u102C\u1004\u103A\u1019\u103C\u1004\u103A\u1015\u102B",
  filter_selected_one: "[COUNT] \u1001\u102F \u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A\u1011\u102C\u1038\u101E\u100A\u103A",
  filter_selected_many: "[COUNT] \u1001\u102F \u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A\u1011\u102C\u1038\u101E\u100A\u103A",
  input_hint: "\u101B\u102D\u102F\u1000\u103A\u1014\u1031\u1005\u1009\u103A \u101B\u101C\u1012\u103A\u1019\u103B\u102C\u1038 \u1015\u1031\u102B\u103A\u101C\u102C\u1015\u102B\u1019\u100A\u103A",
  loading: "\u1010\u1004\u103A\u1014\u1031\u101E\u100A\u103A"
};
var my_default = {
  thanks_to: thanks_to25,
  comments: comments25,
  direction: direction25,
  strings: strings25
};
var nb_exports = {};
__export(nb_exports, {
  comments: () => comments26,
  default: () => nb_default,
  direction: () => direction26,
  strings: () => strings26,
  thanks_to: () => thanks_to26
});
var thanks_to26 = "Eirik Mikkelsen";
var comments26 = "";
var direction26 = "ltr";
var strings26 = {
  placeholder: "S\xF8k",
  clear_search: "Fjern",
  load_more: "Last flere resultater",
  search_label: "S\xF8k p\xE5 denne siden",
  filters_label: "Filtre",
  zero_results: "Ingen resultater for [SEARCH_TERM]",
  many_results: "[COUNT] resultater for [SEARCH_TERM]",
  one_result: "[COUNT] resultat for [SEARCH_TERM]",
  total_zero_results: "Ingen resultater",
  total_one_result: "[COUNT] resultat",
  total_many_results: "[COUNT] resultater",
  alt_search: "Ingen resultater for [SEARCH_TERM]. Viser resultater for [DIFFERENT_TERM] i stedet",
  search_suggestion: "Ingen resultater for [SEARCH_TERM]. Pr\xF8v en av disse s\xF8keordene i stedet:",
  searching: "S\xF8ker etter [SEARCH_TERM]",
  results_label: "S\xF8keresultater",
  keyboard_navigate: "naviger",
  keyboard_select: "velg",
  keyboard_clear: "fjern",
  keyboard_close: "lukk",
  keyboard_search: "s\xF8k",
  error_search: "S\xF8k feilet",
  filter_selected_one: "[COUNT] valgt",
  filter_selected_many: "[COUNT] valgte",
  input_hint: "Resultater vises mens du skriver",
  loading: "Laster"
};
var nb_default = {
  thanks_to: thanks_to26,
  comments: comments26,
  direction: direction26,
  strings: strings26
};
var nl_exports = {};
__export(nl_exports, {
  comments: () => comments27,
  default: () => nl_default,
  direction: () => direction27,
  strings: () => strings27,
  thanks_to: () => thanks_to27
});
var thanks_to27 = "Paul van Brouwershaven";
var comments27 = "";
var direction27 = "ltr";
var strings27 = {
  placeholder: "Zoeken",
  clear_search: "Reset",
  load_more: "Meer resultaten laden",
  search_label: "Doorzoek deze site",
  filters_label: "Filters",
  zero_results: "Geen resultaten voor [SEARCH_TERM]",
  many_results: "[COUNT] resultaten voor [SEARCH_TERM]",
  one_result: "[COUNT] resultaat voor [SEARCH_TERM]",
  total_zero_results: "Geen resultaten",
  total_one_result: "[COUNT] resultaat",
  total_many_results: "[COUNT] resultaten",
  alt_search: "Geen resultaten voor [SEARCH_TERM]. In plaats daarvan worden resultaten voor [DIFFERENT_TERM] weergegeven",
  search_suggestion: "Geen resultaten voor [SEARCH_TERM]. Probeer een van de volgende zoekopdrachten:",
  searching: "Zoeken naar [SEARCH_TERM]...",
  results_label: "Zoekresultaten",
  keyboard_navigate: "navigeren",
  keyboard_select: "selecteren",
  keyboard_clear: "wissen",
  keyboard_close: "sluiten",
  keyboard_search: "zoeken",
  error_search: "Zoeken mislukt",
  filter_selected_one: "[COUNT] geselecteerd",
  filter_selected_many: "[COUNT] geselecteerd",
  input_hint: "Resultaten verschijnen terwijl u typt",
  loading: "Laden"
};
var nl_default = {
  thanks_to: thanks_to27,
  comments: comments27,
  direction: direction27,
  strings: strings27
};
var nn_exports = {};
__export(nn_exports, {
  comments: () => comments28,
  default: () => nn_default,
  direction: () => direction28,
  strings: () => strings28,
  thanks_to: () => thanks_to28
});
var thanks_to28 = "Eirik Mikkelsen";
var comments28 = "";
var direction28 = "ltr";
var strings28 = {
  placeholder: "S\xF8k",
  clear_search: "Fjern",
  load_more: "Last fleire resultat",
  search_label: "S\xF8k p\xE5 denne sida",
  filters_label: "Filter",
  zero_results: "Ingen resultat for [SEARCH_TERM]",
  many_results: "[COUNT] resultat for [SEARCH_TERM]",
  one_result: "[COUNT] resultat for [SEARCH_TERM]",
  total_zero_results: "Ingen resultat",
  total_one_result: "[COUNT] resultat",
  total_many_results: "[COUNT] resultat",
  alt_search: "Ingen resultat for [SEARCH_TERM]. Viser resultat for [DIFFERENT_TERM] i staden",
  search_suggestion: "Ingen resultat for [SEARCH_TERM]. Pr\xF8v eitt av desse s\xF8keorda i staden:",
  searching: "S\xF8ker etter [SEARCH_TERM]",
  results_label: "S\xF8keresultat",
  keyboard_navigate: "naviger",
  keyboard_select: "vel",
  keyboard_clear: "fjern",
  keyboard_close: "lukk",
  keyboard_search: "s\xF8k",
  error_search: "S\xF8k feila",
  filter_selected_one: "[COUNT] vald",
  filter_selected_many: "[COUNT] valde",
  input_hint: "Resultat visast medan du skriv",
  loading: "Lastar"
};
var nn_default = {
  thanks_to: thanks_to28,
  comments: comments28,
  direction: direction28,
  strings: strings28
};
var no_exports = {};
__export(no_exports, {
  comments: () => comments29,
  default: () => no_default,
  direction: () => direction29,
  strings: () => strings29,
  thanks_to: () => thanks_to29
});
var thanks_to29 = "Christopher Wingate";
var comments29 = "";
var direction29 = "ltr";
var strings29 = {
  placeholder: "S\xF8k",
  clear_search: "Fjern",
  load_more: "Last flere resultater",
  search_label: "S\xF8k p\xE5 denne siden",
  filters_label: "Filtre",
  zero_results: "Ingen resultater for [SEARCH_TERM]",
  many_results: "[COUNT] resultater for [SEARCH_TERM]",
  one_result: "[COUNT] resultat for [SEARCH_TERM]",
  total_zero_results: "Ingen resultater",
  total_one_result: "[COUNT] resultat",
  total_many_results: "[COUNT] resultater",
  alt_search: "Ingen resultater for [SEARCH_TERM]. Viser resultater for [DIFFERENT_TERM] i stedet",
  search_suggestion: "Ingen resultater for [SEARCH_TERM]. Pr\xF8v en av disse s\xF8keordene i stedet:",
  searching: "S\xF8ker etter [SEARCH_TERM]",
  results_label: "S\xF8keresultater",
  keyboard_navigate: "naviger",
  keyboard_select: "velg",
  keyboard_clear: "fjern",
  keyboard_close: "lukk",
  keyboard_search: "s\xF8k",
  error_search: "S\xF8k feilet",
  filter_selected_one: "[COUNT] valgt",
  filter_selected_many: "[COUNT] valgte",
  input_hint: "Resultater vises mens du skriver",
  loading: "Laster"
};
var no_default = {
  thanks_to: thanks_to29,
  comments: comments29,
  direction: direction29,
  strings: strings29
};
var pl_exports = {};
__export(pl_exports, {
  comments: () => comments30,
  default: () => pl_default,
  direction: () => direction30,
  strings: () => strings30,
  thanks_to: () => thanks_to30
});
var thanks_to30 = "";
var comments30 = "";
var direction30 = "ltr";
var strings30 = {
  placeholder: "Szukaj",
  clear_search: "Wyczy\u015B\u0107",
  load_more: "Za\u0142aduj wi\u0119cej",
  search_label: "Przeszukaj t\u0119 stron\u0119",
  filters_label: "Filtry",
  zero_results: "Brak wynik\xF3w dla [SEARCH_TERM]",
  many_results: "[COUNT] wynik\xF3w dla [SEARCH_TERM]",
  one_result: "[COUNT] wynik dla [SEARCH_TERM]",
  total_zero_results: "Brak wynik\xF3w",
  total_one_result: "[COUNT] wynik",
  total_many_results: "[COUNT] wynik\xF3w",
  alt_search: "Brak wynik\xF3w dla [SEARCH_TERM]. Wy\u015Bwietlam wyniki dla [DIFFERENT_TERM]",
  search_suggestion: "Brak wynik\xF3w dla [SEARCH_TERM]. Pokrewne wyniki wyszukiwania:",
  searching: "Szukam [SEARCH_TERM]...",
  results_label: "Wyniki wyszukiwania",
  keyboard_navigate: "nawiguj",
  keyboard_select: "wybierz",
  keyboard_clear: "wyczy\u015B\u0107",
  keyboard_close: "zamknij",
  keyboard_search: "szukaj",
  error_search: "Wyszukiwanie nie powiod\u0142o si\u0119",
  filter_selected_one: "[COUNT] wybrany",
  filter_selected_many: "[COUNT] wybranych",
  input_hint: "Wyniki pojawi\u0105 si\u0119 podczas pisania",
  loading: "\u0141adowanie"
};
var pl_default = {
  thanks_to: thanks_to30,
  comments: comments30,
  direction: direction30,
  strings: strings30
};
var pt_exports = {};
__export(pt_exports, {
  comments: () => comments31,
  default: () => pt_default,
  direction: () => direction31,
  strings: () => strings31,
  thanks_to: () => thanks_to31
});
var thanks_to31 = "Jonatah";
var comments31 = "";
var direction31 = "ltr";
var strings31 = {
  placeholder: "Pesquisar",
  clear_search: "Limpar",
  load_more: "Ver mais resultados",
  search_label: "Pesquisar",
  filters_label: "Filtros",
  zero_results: "Nenhum resultado encontrado para [SEARCH_TERM]",
  many_results: "[COUNT] resultados encontrados para [SEARCH_TERM]",
  one_result: "[COUNT] resultado encontrado para [SEARCH_TERM]",
  total_zero_results: "Nenhum resultado",
  total_one_result: "[COUNT] resultado",
  total_many_results: "[COUNT] resultados",
  alt_search: "Nenhum resultado encontrado para [SEARCH_TERM]. Exibindo resultados para [DIFFERENT_TERM]",
  search_suggestion: "Nenhum resultado encontrado para [SEARCH_TERM]. Tente uma das seguintes pesquisas:",
  searching: "Pesquisando por [SEARCH_TERM]...",
  results_label: "Resultados da pesquisa",
  keyboard_navigate: "navegar",
  keyboard_select: "selecionar",
  keyboard_clear: "limpar",
  keyboard_close: "fechar",
  keyboard_search: "pesquisar",
  error_search: "Falha na pesquisa",
  filter_selected_one: "[COUNT] selecionado",
  filter_selected_many: "[COUNT] selecionados",
  input_hint: "Os resultados aparecer\xE3o enquanto voc\xEA digita",
  loading: "Carregando"
};
var pt_default = {
  thanks_to: thanks_to31,
  comments: comments31,
  direction: direction31,
  strings: strings31
};
var ro_exports = {};
__export(ro_exports, {
  comments: () => comments32,
  default: () => ro_default,
  direction: () => direction32,
  strings: () => strings32,
  thanks_to: () => thanks_to32
});
var thanks_to32 = "Bogdan Mateescu <bogdan@surfverse.com>";
var comments32 = "";
var direction32 = "ltr";
var strings32 = {
  placeholder: "C\u0103utare",
  clear_search: "\u015Eterge\u0163i",
  load_more: "\xCEnc\u0103rca\u021Bi mai multe rezultate",
  search_label: "C\u0103uta\u021Bi \xEEn acest site",
  filters_label: "Filtre",
  zero_results: "Niciun rezultat pentru [SEARCH_TERM]",
  many_results: "[COUNT] rezultate pentru [SEARCH_TERM]",
  one_result: "[COUNT] rezultat pentru [SEARCH_TERM]",
  total_zero_results: "Niciun rezultat",
  total_one_result: "[COUNT] rezultat",
  total_many_results: "[COUNT] rezultate",
  alt_search: "Niciun rezultat pentru [SEARCH_TERM]. Se afi\u0219eaz\u0103 \xEEn schimb rezultatele pentru [DIFFERENT_TERM]",
  search_suggestion: "Niciun rezultat pentru [SEARCH_TERM]. \xCEncerca\u021Bi una dintre urm\u0103toarele c\u0103ut\u0103ri:",
  searching: "Se caut\u0103 dup\u0103: [SEARCH_TERM]...",
  results_label: "Rezultatele c\u0103ut\u0103rii",
  keyboard_navigate: "navigare",
  keyboard_select: "selectare",
  keyboard_clear: "\u0219tergere",
  keyboard_close: "\xEEnchidere",
  keyboard_search: "c\u0103utare",
  error_search: "C\u0103utarea a e\u0219uat",
  filter_selected_one: "[COUNT] selectat",
  filter_selected_many: "[COUNT] selectate",
  input_hint: "Rezultatele vor ap\u0103rea pe m\u0103sur\u0103 ce tasta\u021Bi",
  loading: "Se \xEEncarc\u0103"
};
var ro_default = {
  thanks_to: thanks_to32,
  comments: comments32,
  direction: direction32,
  strings: strings32
};
var ru_exports = {};
__export(ru_exports, {
  comments: () => comments33,
  default: () => ru_default,
  direction: () => direction33,
  strings: () => strings33,
  thanks_to: () => thanks_to33
});
var thanks_to33 = "Aleksandr Gordeev";
var comments33 = "";
var direction33 = "ltr";
var strings33 = {
  placeholder: "\u041F\u043E\u0438\u0441\u043A",
  clear_search: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u043E\u043B\u0435",
  load_more: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0435",
  search_label: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0441\u0430\u0439\u0442\u0443",
  filters_label: "\u0424\u0438\u043B\u044C\u0442\u0440\u044B",
  zero_results: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]",
  many_results: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]",
  one_result: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]",
  total_zero_results: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E",
  total_one_result: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442",
  total_many_results: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432",
  alt_search: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]. \u041F\u043E\u043A\u0430\u0437\u0430\u043D\u044B \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [DIFFERENT_TERM]",
  search_suggestion: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043E\u0434\u0438\u043D \u0438\u0437 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0445 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432",
  searching: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]",
  results_label: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u0438\u0441\u043A\u0430",
  keyboard_navigate: "\u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F",
  keyboard_select: "\u0432\u044B\u0431\u0440\u0430\u0442\u044C",
  keyboard_clear: "\u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C",
  keyboard_close: "\u0437\u0430\u043A\u0440\u044B\u0442\u044C",
  keyboard_search: "\u043F\u043E\u0438\u0441\u043A",
  error_search: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u0438\u0441\u043A\u0430",
  filter_selected_one: "[COUNT] \u0432\u044B\u0431\u0440\u0430\u043D",
  filter_selected_many: "[COUNT] \u0432\u044B\u0431\u0440\u0430\u043D\u043E",
  input_hint: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0431\u0443\u0434\u0443\u0442 \u043F\u043E\u044F\u0432\u043B\u044F\u0442\u044C\u0441\u044F \u043F\u043E \u043C\u0435\u0440\u0435 \u0432\u0432\u043E\u0434\u0430",
  loading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430"
};
var ru_default = {
  thanks_to: thanks_to33,
  comments: comments33,
  direction: direction33,
  strings: strings33
};
var sr_exports = {};
__export(sr_exports, {
  comments: () => comments34,
  default: () => sr_default,
  direction: () => direction34,
  strings: () => strings34,
  thanks_to: () => thanks_to34
});
var thanks_to34 = "Andrija Sagicc";
var comments34 = "";
var direction34 = "ltr";
var strings34 = {
  placeholder: "\u041F\u0440\u0435\u0442\u0440\u0430\u0433\u0430",
  clear_search: "\u0411\u0440\u0438\u0441\u0430\u045A\u0435",
  load_more: "\u041F\u0440\u0438\u043A\u0430\u0437 \u0432\u0438\u0448\u0435 \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430",
  search_label: "\u041F\u0440\u0435\u0442\u0440\u0430\u0433\u0430 \u0441\u0430\u0458\u0442\u0430",
  filters_label: "\u0424\u0438\u043B\u0442\u0435\u0440\u0438",
  zero_results: "\u041D\u0435\u043C\u0430 \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [SEARCH_TERM]",
  many_results: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [SEARCH_TERM]",
  one_result: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [SEARCH_TERM]",
  total_zero_results: "\u041D\u0435\u043C\u0430 \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430",
  total_one_result: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442",
  total_many_results: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430",
  alt_search: "\u041D\u0435\u043C\u0430 \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [SEARCH_TERM]. \u041F\u0440\u0438\u043A\u0430\u0437 \u0434\u043E\u0434\u0430\u0442\u043D\u0438\u043A \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [DIFFERENT_TERM]",
  search_suggestion: "\u041D\u0435\u043C\u0430 \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [SEARCH_TERM]. \u041F\u043E\u043A\u0443\u0448\u0430\u0458\u0442\u0435 \u0441\u0430 \u043D\u0435\u043A\u043E\u043C \u043E\u0434 \u0441\u043B\u0435\u0434\u0435\u045B\u0438\u0445 \u043F\u0440\u0435\u0442\u0440\u0430\u0433\u0430:",
  searching: "\u041F\u0440\u0435\u0442\u0440\u0430\u0433\u0430 \u0442\u0435\u0440\u043C\u0438\u043D\u0430 [SEARCH_TERM]...",
  results_label: "\u0420\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0438 \u043F\u0440\u0435\u0442\u0440\u0430\u0433\u0435",
  keyboard_navigate: "\u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0458\u0430",
  keyboard_select: "\u0438\u0437\u0430\u0431\u0435\u0440\u0438",
  keyboard_clear: "\u043E\u0431\u0440\u0438\u0448\u0438",
  keyboard_close: "\u0437\u0430\u0442\u0432\u043E\u0440\u0438",
  keyboard_search: "\u043F\u0440\u0435\u0442\u0440\u0430\u0433\u0430",
  error_search: "\u041F\u0440\u0435\u0442\u0440\u0430\u0433\u0430 \u043D\u0438\u0458\u0435 \u0443\u0441\u043F\u0435\u043B\u0430",
  filter_selected_one: "[COUNT] \u0438\u0437\u0430\u0431\u0440\u0430\u043D",
  filter_selected_many: "[COUNT] \u0438\u0437\u0430\u0431\u0440\u0430\u043D\u0438\u0445",
  input_hint: "\u0420\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0438 \u045B\u0435 \u0441\u0435 \u043F\u043E\u0458\u0430\u0432\u0459\u0438\u0432\u0430\u0442\u0438 \u0434\u043E\u043A \u043A\u0443\u0446\u0430\u0442\u0435",
  loading: "\u0423\u0447\u0438\u0442\u0430\u0432\u0430\u045A\u0435"
};
var sr_default = {
  thanks_to: thanks_to34,
  comments: comments34,
  direction: direction34,
  strings: strings34
};
var sv_exports = {};
__export(sv_exports, {
  comments: () => comments35,
  default: () => sv_default,
  direction: () => direction35,
  strings: () => strings35,
  thanks_to: () => thanks_to35
});
var thanks_to35 = "Montazar Al-Jaber <montazar@nanawee.tech>";
var comments35 = "";
var direction35 = "ltr";
var strings35 = {
  placeholder: "S\xF6k",
  clear_search: "Rensa",
  load_more: "Visa fler tr\xE4ffar",
  search_label: "S\xF6k p\xE5 denna sida",
  filters_label: "Filter",
  zero_results: "[SEARCH_TERM] gav inga tr\xE4ffar",
  many_results: "[SEARCH_TERM] gav [COUNT] tr\xE4ffar",
  one_result: "[SEARCH_TERM] gav [COUNT] tr\xE4ff",
  total_zero_results: "Inga tr\xE4ffar",
  total_one_result: "[COUNT] tr\xE4ff",
  total_many_results: "[COUNT] tr\xE4ffar",
  alt_search: "[SEARCH_TERM] gav inga tr\xE4ffar. Visar resultat f\xF6r [DIFFERENT_TERM] ist\xE4llet",
  search_suggestion: "[SEARCH_TERM] gav inga tr\xE4ffar. F\xF6rs\xF6k igen med en av f\xF6ljande s\xF6kord:",
  searching: "S\xF6ker efter [SEARCH_TERM]...",
  results_label: "S\xF6kresultat",
  keyboard_navigate: "navigera",
  keyboard_select: "v\xE4lj",
  keyboard_clear: "rensa",
  keyboard_close: "st\xE4ng",
  keyboard_search: "s\xF6k",
  error_search: "S\xF6kningen misslyckades",
  filter_selected_one: "[COUNT] vald",
  filter_selected_many: "[COUNT] valda",
  input_hint: "Resultat visas medan du skriver",
  loading: "L\xE4ser in"
};
var sv_default = {
  thanks_to: thanks_to35,
  comments: comments35,
  direction: direction35,
  strings: strings35
};
var sw_exports = {};
__export(sw_exports, {
  comments: () => comments36,
  default: () => sw_default,
  direction: () => direction36,
  strings: () => strings36,
  thanks_to: () => thanks_to36
});
var thanks_to36 = "Anonymous";
var comments36 = "";
var direction36 = "ltr";
var strings36 = {
  placeholder: "Tafuta",
  clear_search: "Futa",
  load_more: "Pakia matokeo zaidi",
  search_label: "Tafuta tovuti hii",
  filters_label: "Vichujio",
  zero_results: "Hakuna matokeo ya [SEARCH_TERM]",
  many_results: "Matokeo [COUNT] ya [SEARCH_TERM]",
  one_result: "Tokeo [COUNT] la [SEARCH_TERM]",
  total_zero_results: "Hakuna matokeo",
  total_one_result: "Tokeo [COUNT]",
  total_many_results: "Matokeo [COUNT]",
  alt_search: "Hakuna mayokeo ya [SEARCH_TERM]. Badala yake, inaonyesha matokeo ya [DIFFERENT_TERM]",
  search_suggestion: "Hakuna matokeo ya [SEARCH_TERM]. Jaribu mojawapo ya utafutaji ufuatao:",
  searching: "Kutafuta [SEARCH_TERM]...",
  results_label: "Matokeo ya utafutaji",
  keyboard_navigate: "sogeza",
  keyboard_select: "chagua",
  keyboard_clear: "futa",
  keyboard_close: "funga",
  keyboard_search: "tafuta",
  error_search: "Utafutaji umeshindwa",
  filter_selected_one: "[COUNT] imechaguliwa",
  filter_selected_many: "[COUNT] zimechaguliwa",
  input_hint: "Matokeo yataonekana unapoandika",
  loading: "Inapakia"
};
var sw_default = {
  thanks_to: thanks_to36,
  comments: comments36,
  direction: direction36,
  strings: strings36
};
var ta_exports = {};
__export(ta_exports, {
  comments: () => comments37,
  default: () => ta_default,
  direction: () => direction37,
  strings: () => strings37,
  thanks_to: () => thanks_to37
});
var thanks_to37 = "";
var comments37 = "";
var direction37 = "ltr";
var strings37 = {
  placeholder: "\u0BA4\u0BC7\u0B9F\u0BC1\u0B95",
  clear_search: "\u0B85\u0BB4\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0B95",
  load_more: "\u0BAE\u0BC7\u0BB2\u0BC1\u0BAE\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B95",
  search_label: "\u0B87\u0BA8\u0BCD\u0BA4 \u0BA4\u0BB3\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BA4\u0BC7\u0B9F\u0BC1\u0B95",
  filters_label: "\u0BB5\u0B9F\u0BBF\u0B95\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD\u0B95\u0BB3\u0BCD",
  zero_results: "[SEARCH_TERM] \u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8",
  many_results: "[SEARCH_TERM] \u0B95\u0BCD\u0B95\u0BBE\u0BA9 [COUNT] \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD",
  one_result: "[SEARCH_TERM] \u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1",
  total_zero_results: "\u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8",
  total_one_result: "[COUNT] \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1",
  total_many_results: "[COUNT] \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD",
  alt_search: "[SEARCH_TERM] \u0B87\u0BA4\u0BCD\u0BA4\u0BC7\u0B9F\u0BB2\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8, \u0B87\u0BA8\u0BCD\u0BA4 \u0BA4\u0BC7\u0B9F\u0BB2\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0B92\u0BA4\u0BCD\u0BA4 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD [DIFFERENT_TERM]",
  search_suggestion: "[SEARCH_TERM] \u0B87\u0BA4\u0BCD \u0BA4\u0BC7\u0B9F\u0BB2\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8.\u0B87\u0BA4\u0BB1\u0BCD\u0B95\u0BC1 \u0BAA\u0BA4\u0BBF\u0BB2\u0BC0\u0B9F\u0BBE\u0BA9 \u0BA4\u0BC7\u0B9F\u0BB2\u0BCD\u0B95\u0BB3\u0BC8 \u0BA4\u0BC7\u0B9F\u0BC1\u0B95:",
  searching: "[SEARCH_TERM] \u0BA4\u0BC7\u0B9F\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA4\u0BC1",
  results_label: "\u0BA4\u0BC7\u0B9F\u0BB2\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD",
  keyboard_navigate: "\u0BB5\u0BB4\u0BBF\u0BA8\u0B9F\u0BA4\u0BCD\u0BA4\u0BC1",
  keyboard_select: "\u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1",
  keyboard_clear: "\u0B85\u0BB4\u0BBF",
  keyboard_close: "\u0BAE\u0BC2\u0B9F\u0BC1",
  keyboard_search: "\u0BA4\u0BC7\u0B9F\u0BC1",
  error_search: "\u0BA4\u0BC7\u0B9F\u0BB2\u0BCD \u0BA4\u0BCB\u0BB2\u0BCD\u0BB5\u0BBF",
  filter_selected_one: "[COUNT] \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1",
  filter_selected_many: "[COUNT] \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA9",
  input_hint: "\u0BA8\u0BC0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BA4\u0B9F\u0BCD\u0B9F\u0B9A\u0BCD\u0B9A\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BC1\u0BAE\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0BA4\u0BCB\u0BA9\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD",
  loading: "\u0B8F\u0BB1\u0BCD\u0BB1\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1"
};
var ta_default = {
  thanks_to: thanks_to37,
  comments: comments37,
  direction: direction37,
  strings: strings37
};
var th_exports = {};
__export(th_exports, {
  comments: () => comments38,
  default: () => th_default,
  direction: () => direction38,
  strings: () => strings38,
  thanks_to: () => thanks_to38
});
var thanks_to38 = "Patiphon Loetsuthakun <ptphon@gmail.com>";
var comments38 = "";
var direction38 = "ltr";
var strings38 = {
  placeholder: "\u0E04\u0E49\u0E19\u0E2B\u0E32",
  clear_search: "\u0E25\u0E49\u0E32\u0E07",
  load_more: "\u0E42\u0E2B\u0E25\u0E14\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21",
  search_label: "\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E1A\u0E19\u0E40\u0E27\u0E47\u0E1A\u0E44\u0E0B\u0E15\u0E4C",
  filters_label: "\u0E15\u0E31\u0E27\u0E01\u0E23\u0E2D\u0E07",
  zero_results: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A [SEARCH_TERM]",
  many_results: "\u0E1E\u0E1A [COUNT] \u0E1C\u0E25\u0E01\u0E32\u0E23\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A [SEARCH_TERM]",
  one_result: "\u0E1E\u0E1A [COUNT] \u0E1C\u0E25\u0E01\u0E32\u0E23\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A [SEARCH_TERM]",
  total_zero_results: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C",
  total_one_result: "[COUNT] \u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C",
  total_many_results: "[COUNT] \u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C",
  alt_search: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A [SEARCH_TERM] \u0E41\u0E2A\u0E14\u0E07\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E04\u0E49\u0E19\u0E2B\u0E32 [DIFFERENT_TERM] \u0E41\u0E17\u0E19",
  search_suggestion: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A [SEARCH_TERM] \u0E25\u0E2D\u0E07\u0E04\u0E33\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E40\u0E2B\u0E25\u0E48\u0E32\u0E19\u0E35\u0E49\u0E41\u0E17\u0E19:",
  searching: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E49\u0E19\u0E2B\u0E32 [SEARCH_TERM]...",
  results_label: "\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E04\u0E49\u0E19\u0E2B\u0E32",
  keyboard_navigate: "\u0E19\u0E33\u0E17\u0E32\u0E07",
  keyboard_select: "\u0E40\u0E25\u0E37\u0E2D\u0E01",
  keyboard_clear: "\u0E25\u0E49\u0E32\u0E07",
  keyboard_close: "\u0E1B\u0E34\u0E14",
  keyboard_search: "\u0E04\u0E49\u0E19\u0E2B\u0E32",
  error_search: "\u0E01\u0E32\u0E23\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E25\u0E49\u0E21\u0E40\u0E2B\u0E25\u0E27",
  filter_selected_one: "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27 [COUNT] \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23",
  filter_selected_many: "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27 [COUNT] \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23",
  input_hint: "\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E08\u0E30\u0E1B\u0E23\u0E32\u0E01\u0E0F\u0E02\u0E13\u0E30\u0E17\u0E35\u0E48\u0E04\u0E38\u0E13\u0E1E\u0E34\u0E21\u0E1E\u0E4C",
  loading: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14"
};
var th_default = {
  thanks_to: thanks_to38,
  comments: comments38,
  direction: direction38,
  strings: strings38
};
var tr_exports = {};
__export(tr_exports, {
  comments: () => comments39,
  default: () => tr_default,
  direction: () => direction39,
  strings: () => strings39,
  thanks_to: () => thanks_to39
});
var thanks_to39 = "Taylan \xD6zg\xFCr Bildik";
var comments39 = "";
var direction39 = "ltr";
var strings39 = {
  placeholder: "Ara\u015Ft\u0131r",
  clear_search: "Temizle",
  load_more: "Daha fazla sonu\xE7",
  search_label: "Site genelinde arama",
  filters_label: "Filtreler",
  zero_results: "[SEARCH_TERM] i\xE7in sonu\xE7 yok",
  many_results: "[SEARCH_TERM] i\xE7in [COUNT] sonu\xE7 bulundu",
  one_result: "[SEARCH_TERM] i\xE7in [COUNT] sonu\xE7 bulundu",
  total_zero_results: "Sonu\xE7 yok",
  total_one_result: "[COUNT] sonu\xE7",
  total_many_results: "[COUNT] sonu\xE7",
  alt_search: "[SEARCH_TERM] i\xE7in sonu\xE7 yok. Bunun yerine [DIFFERENT_TERM] i\xE7in sonu\xE7lar g\xF6steriliyor",
  search_suggestion: "[SEARCH_TERM] i\xE7in sonu\xE7 yok. Alternatif olarak a\u015Fa\u011F\u0131daki kelimelerden birini deneyebilirsiniz:",
  searching: "[SEARCH_TERM] ara\u015Ft\u0131r\u0131l\u0131yor...",
  results_label: "Arama sonu\xE7lar\u0131",
  keyboard_navigate: "gezin",
  keyboard_select: "se\xE7",
  keyboard_clear: "temizle",
  keyboard_close: "kapat",
  keyboard_search: "ara",
  error_search: "Arama ba\u015Far\u0131s\u0131z",
  filter_selected_one: "[COUNT] se\xE7ili",
  filter_selected_many: "[COUNT] se\xE7ili",
  input_hint: "Sonu\xE7lar siz yazarken g\xF6r\xFCnecektir",
  loading: "Y\xFCkleniyor"
};
var tr_default = {
  thanks_to: thanks_to39,
  comments: comments39,
  direction: direction39,
  strings: strings39
};
var uk_exports = {};
__export(uk_exports, {
  comments: () => comments40,
  default: () => uk_default,
  direction: () => direction40,
  strings: () => strings40,
  thanks_to: () => thanks_to40
});
var thanks_to40 = "Vladyslav Lyshenko <vladdnepr1989@gmail.com>";
var comments40 = "";
var direction40 = "ltr";
var strings40 = {
  placeholder: "\u041F\u043E\u0448\u0443\u043A",
  clear_search: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438 \u043F\u043E\u043B\u0435",
  load_more: "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u0449\u0435",
  search_label: "\u041F\u043E\u0448\u0443\u043A \u043F\u043E \u0441\u0430\u0439\u0442\u0443",
  filters_label: "\u0424\u0456\u043B\u044C\u0442\u0440\u0438",
  zero_results: "\u041D\u0456\u0447\u043E\u0433\u043E \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0437\u0430 \u0437\u0430\u043F\u0438\u0442\u043E\u043C: [SEARCH_TERM]",
  many_results: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0456\u0432 \u043D\u0430 \u0437\u0430\u043F\u0438\u0442: [SEARCH_TERM]",
  one_result: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0437\u0430 \u0437\u0430\u043F\u0438\u0442\u043E\u043C: [SEARCH_TERM]",
  total_zero_results: "\u041D\u0456\u0447\u043E\u0433\u043E \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E",
  total_one_result: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442",
  total_many_results: "[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0456\u0432",
  alt_search: "\u041D\u0456\u0447\u043E\u0433\u043E \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043D\u0430 \u0437\u0430\u043F\u0438\u0442: [SEARCH_TERM]. \u041F\u043E\u043A\u0430\u0437\u0430\u043D\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0438 \u043D\u0430 \u0437\u0430\u043F\u0438\u0442: [DIFFERENT_TERM]",
  search_suggestion: "\u041D\u0456\u0447\u043E\u0433\u043E \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043D\u0430 \u0437\u0430\u043F\u0438\u0442: [SEARCH_TERM]. \u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043E\u0434\u0438\u043D \u0456\u0437 \u0442\u0430\u043A\u0438\u0445 \u0432\u0430\u0440\u0456\u0430\u043D\u0442\u0456\u0432",
  searching: "\u041F\u043E\u0448\u0443\u043A \u0437\u0430 \u0437\u0430\u043F\u0438\u0442\u043E\u043C: [SEARCH_TERM]",
  results_label: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0438 \u043F\u043E\u0448\u0443\u043A\u0443",
  keyboard_navigate: "\u043D\u0430\u0432\u0456\u0433\u0430\u0446\u0456\u044F",
  keyboard_select: "\u0432\u0438\u0431\u0440\u0430\u0442\u0438",
  keyboard_clear: "\u043E\u0447\u0438\u0441\u0442\u0438\u0442\u0438",
  keyboard_close: "\u0437\u0430\u043A\u0440\u0438\u0442\u0438",
  keyboard_search: "\u043F\u043E\u0448\u0443\u043A",
  error_search: "\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043F\u043E\u0448\u0443\u043A\u0443",
  filter_selected_one: "[COUNT] \u0432\u0438\u0431\u0440\u0430\u043D\u043E",
  filter_selected_many: "[COUNT] \u0432\u0438\u0431\u0440\u0430\u043D\u043E",
  input_hint: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0438 \u0437'\u044F\u0432\u043B\u044F\u0442\u0438\u043C\u0443\u0442\u044C\u0441\u044F \u043F\u0456\u0434 \u0447\u0430\u0441 \u0432\u0432\u0435\u0434\u0435\u043D\u043D\u044F",
  loading: "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F"
};
var uk_default = {
  thanks_to: thanks_to40,
  comments: comments40,
  direction: direction40,
  strings: strings40
};
var vi_exports = {};
__export(vi_exports, {
  comments: () => comments41,
  default: () => vi_default,
  direction: () => direction41,
  strings: () => strings41,
  thanks_to: () => thanks_to41
});
var thanks_to41 = "Long Nhat Nguyen";
var comments41 = "";
var direction41 = "ltr";
var strings41 = {
  placeholder: "T\xECm ki\u1EBFm",
  clear_search: "X\xF3a",
  load_more: "Nhi\u1EC1u k\u1EBFt qu\u1EA3 h\u01A1n",
  search_label: "T\xECm ki\u1EBFm trong trang n\xE0y",
  filters_label: "B\u1ED9 l\u1ECDc",
  zero_results: "Kh\xF4ng t\xECm th\u1EA5y k\u1EBFt qu\u1EA3 cho [SEARCH_TERM]",
  many_results: "[COUNT] k\u1EBFt qu\u1EA3 cho [SEARCH_TERM]",
  one_result: "[COUNT] k\u1EBFt qu\u1EA3 cho [SEARCH_TERM]",
  total_zero_results: "Kh\xF4ng c\xF3 k\u1EBFt qu\u1EA3",
  total_one_result: "[COUNT] k\u1EBFt qu\u1EA3",
  total_many_results: "[COUNT] k\u1EBFt qu\u1EA3",
  alt_search: "Kh\xF4ng t\xECm th\u1EA5y k\u1EBFt qu\u1EA3 cho [SEARCH_TERM]. Ki\u1EC3m th\u1ECB k\u1EBFt qu\u1EA3 thay th\u1EBF v\u1EDBi [DIFFERENT_TERM]",
  search_suggestion: "Kh\xF4ng t\xECm th\u1EA5y k\u1EBFt qu\u1EA3 cho [SEARCH_TERM]. Th\u1EED m\u1ED9t trong c\xE1c t\xECm ki\u1EBFm:",
  searching: "\u0110ang t\xECm ki\u1EBFm cho [SEARCH_TERM]...",
  results_label: "K\u1EBFt qu\u1EA3 t\xECm ki\u1EBFm",
  keyboard_navigate: "chuy\u1EC3n",
  keyboard_select: "ch\u1ECDn",
  keyboard_clear: "x\xF3a",
  keyboard_close: "\u0111\xF3ng",
  keyboard_search: "t\xECm ki\u1EBFm",
  error_search: "T\xECm ki\u1EBFm th\u1EA5t b\u1EA1i",
  filter_selected_one: "\u0110\xE3 ch\u1ECDn [COUNT]",
  filter_selected_many: "\u0110\xE3 ch\u1ECDn [COUNT]",
  input_hint: "K\u1EBFt qu\u1EA3 s\u1EBD xu\u1EA5t hi\u1EC7n khi b\u1EA1n nh\u1EADp",
  loading: "\u0110ang t\u1EA3i"
};
var vi_default = {
  thanks_to: thanks_to41,
  comments: comments41,
  direction: direction41,
  strings: strings41
};
var zh_cn_exports = {};
__export(zh_cn_exports, {
  comments: () => comments42,
  default: () => zh_cn_default,
  direction: () => direction42,
  strings: () => strings42,
  thanks_to: () => thanks_to42
});
var thanks_to42 = "Amber Song";
var comments42 = "";
var direction42 = "ltr";
var strings42 = {
  placeholder: "\u641C\u7D22",
  clear_search: "\u6E05\u9664",
  load_more: "\u52A0\u8F7D\u66F4\u591A\u7ED3\u679C",
  search_label: "\u7AD9\u5185\u641C\u7D22",
  filters_label: "\u7B5B\u9009",
  zero_results: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
  many_results: "\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
  one_result: "\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
  total_zero_results: "\u65E0\u7ED3\u679C",
  total_one_result: "[COUNT] \u4E2A\u7ED3\u679C",
  total_many_results: "[COUNT] \u4E2A\u7ED3\u679C",
  alt_search: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u6539\u4E3A\u663E\u793A [DIFFERENT_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
  search_suggestion: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u8BF7\u5C1D\u8BD5\u4EE5\u4E0B\u641C\u7D22\u3002",
  searching: "\u6B63\u5728\u641C\u7D22 [SEARCH_TERM]...",
  results_label: "\u641C\u7D22\u7ED3\u679C",
  keyboard_navigate: "\u5BFC\u822A",
  keyboard_select: "\u9009\u62E9",
  keyboard_clear: "\u6E05\u9664",
  keyboard_close: "\u5173\u95ED",
  keyboard_search: "\u641C\u7D22",
  error_search: "\u641C\u7D22\u5931\u8D25",
  filter_selected_one: "\u5DF2\u9009\u62E9 [COUNT] \u4E2A",
  filter_selected_many: "\u5DF2\u9009\u62E9 [COUNT] \u4E2A",
  input_hint: "\u8F93\u5165\u65F6\u5C06\u663E\u793A\u7ED3\u679C",
  loading: "\u52A0\u8F7D\u4E2D"
};
var zh_cn_default = {
  thanks_to: thanks_to42,
  comments: comments42,
  direction: direction42,
  strings: strings42
};
var zh_tw_exports = {};
__export(zh_tw_exports, {
  comments: () => comments43,
  default: () => zh_tw_default,
  direction: () => direction43,
  strings: () => strings43,
  thanks_to: () => thanks_to43
});
var thanks_to43 = "Amber Song";
var comments43 = "";
var direction43 = "ltr";
var strings43 = {
  placeholder: "\u641C\u5C0B",
  clear_search: "\u6E05\u9664",
  load_more: "\u8F09\u5165\u66F4\u591A\u7D50\u679C",
  search_label: "\u7AD9\u5167\u641C\u5C0B",
  filters_label: "\u7BE9\u9078",
  zero_results: "\u627E\u4E0D\u5230 [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
  many_results: "\u627E\u5230 [COUNT] \u500B [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
  one_result: "\u627E\u5230 [COUNT] \u500B [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
  total_zero_results: "\u7121\u7D50\u679C",
  total_one_result: "[COUNT] \u500B\u7D50\u679C",
  total_many_results: "[COUNT] \u500B\u7D50\u679C",
  alt_search: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C\u3002\u6539\u70BA\u986F\u793A [DIFFERENT_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
  search_suggestion: "\u627E\u4E0D\u5230 [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C\u3002\u8ACB\u5617\u8A66\u4EE5\u4E0B\u7684\u5EFA\u8B70\u4E4B\u4E00\u3002",
  searching: "\u6B63\u5728\u641C\u5C0B[SEARCH_TERM]...",
  results_label: "\u641C\u5C0B\u7D50\u679C",
  keyboard_navigate: "\u5C0E\u89BD",
  keyboard_select: "\u9078\u64C7",
  keyboard_clear: "\u6E05\u9664",
  keyboard_close: "\u95DC\u9589",
  keyboard_search: "\u641C\u5C0B",
  error_search: "\u641C\u5C0B\u5931\u6557",
  filter_selected_one: "\u5DF2\u9078\u64C7 [COUNT] \u500B",
  filter_selected_many: "\u5DF2\u9078\u64C7 [COUNT] \u500B",
  input_hint: "\u8F38\u5165\u6642\u5C07\u986F\u793A\u7D50\u679C",
  loading: "\u8F09\u5165\u4E2D"
};
var zh_tw_default = {
  thanks_to: thanks_to43,
  comments: comments43,
  direction: direction43,
  strings: strings43
};
var zh_exports = {};
__export(zh_exports, {
  comments: () => comments44,
  default: () => zh_default,
  direction: () => direction44,
  strings: () => strings44,
  thanks_to: () => thanks_to44
});
var thanks_to44 = "Amber Song";
var comments44 = "";
var direction44 = "ltr";
var strings44 = {
  placeholder: "\u641C\u7D22",
  clear_search: "\u6E05\u9664",
  load_more: "\u52A0\u8F7D\u66F4\u591A\u7ED3\u679C",
  search_label: "\u7AD9\u5185\u641C\u7D22",
  filters_label: "\u7B5B\u9009",
  zero_results: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
  many_results: "\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
  one_result: "\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
  total_zero_results: "\u65E0\u7ED3\u679C",
  total_one_result: "[COUNT] \u4E2A\u7ED3\u679C",
  total_many_results: "[COUNT] \u4E2A\u7ED3\u679C",
  alt_search: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u6539\u4E3A\u663E\u793A [DIFFERENT_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
  search_suggestion: "\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u8BF7\u5C1D\u8BD5\u4EE5\u4E0B\u641C\u7D22\u3002",
  searching: "\u6B63\u5728\u641C\u7D22 [SEARCH_TERM]...",
  results_label: "\u641C\u7D22\u7ED3\u679C",
  keyboard_navigate: "\u5BFC\u822A",
  keyboard_select: "\u9009\u62E9",
  keyboard_clear: "\u6E05\u9664",
  keyboard_close: "\u5173\u95ED",
  keyboard_search: "\u641C\u7D22",
  error_search: "\u641C\u7D22\u5931\u8D25",
  filter_selected_one: "\u5DF2\u9009\u62E9 [COUNT] \u4E2A",
  filter_selected_many: "\u5DF2\u9009\u62E9 [COUNT] \u4E2A",
  input_hint: "\u8F93\u5165\u65F6\u5C06\u663E\u793A\u7ED3\u679C",
  loading: "\u52A0\u8F7D\u4E2D"
};
var zh_default = {
  thanks_to: thanks_to44,
  comments: comments44,
  direction: direction44,
  strings: strings44
};
var modules = [af_exports, ar_exports, bn_exports, ca_exports, cs_exports, da_exports, de_exports, el_exports, en_exports, es_exports, eu_exports, fa_exports, fi_exports, fr_exports, gl_exports, he_exports, hi_exports, hr_exports, hu_exports, id_exports, it_exports, ja_exports, ko_exports, mi_exports, my_exports, nb_exports, nl_exports, nn_exports, no_exports, pl_exports, pt_exports, ro_exports, ru_exports, sr_exports, sv_exports, sw_exports, ta_exports, th_exports, tr_exports, uk_exports, vi_exports, zh_cn_exports, zh_tw_exports, zh_exports];
var __default = modules;
var filenames = ["../../translations/af.json", "../../translations/ar.json", "../../translations/bn.json", "../../translations/ca.json", "../../translations/cs.json", "../../translations/da.json", "../../translations/de.json", "../../translations/el.json", "../../translations/en.json", "../../translations/es.json", "../../translations/eu.json", "../../translations/fa.json", "../../translations/fi.json", "../../translations/fr.json", "../../translations/gl.json", "../../translations/he.json", "../../translations/hi.json", "../../translations/hr.json", "../../translations/hu.json", "../../translations/id.json", "../../translations/it.json", "../../translations/ja.json", "../../translations/ko.json", "../../translations/mi.json", "../../translations/my.json", "../../translations/nb.json", "../../translations/nl.json", "../../translations/nn.json", "../../translations/no.json", "../../translations/pl.json", "../../translations/pt.json", "../../translations/ro.json", "../../translations/ru.json", "../../translations/sr.json", "../../translations/sv.json", "../../translations/sw.json", "../../translations/ta.json", "../../translations/th.json", "../../translations/tr.json", "../../translations/uk.json", "../../translations/vi.json", "../../translations/zh-cn.json", "../../translations/zh-tw.json", "../../translations/zh.json"];
function isAlphabetical(character) {
  const code = typeof character === "string" ? character.charCodeAt(0) : character;
  return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function isDecimal(character) {
  const code = typeof character === "string" ? character.charCodeAt(0) : character;
  return code >= 48 && code <= 57;
}
function isAlphanumerical(character) {
  return isAlphabetical(character) || isDecimal(character);
}
var regular = [
  "art-lojban",
  "cel-gaulish",
  "no-bok",
  "no-nyn",
  "zh-guoyu",
  "zh-hakka",
  "zh-min",
  "zh-min-nan",
  "zh-xiang"
];
var normal = {
  "en-gb-oed": "en-GB-oxendict",
  "i-ami": "ami",
  "i-bnn": "bnn",
  "i-default": null,
  "i-enochian": null,
  "i-hak": "hak",
  "i-klingon": "tlh",
  "i-lux": "lb",
  "i-mingo": null,
  "i-navajo": "nv",
  "i-pwn": "pwn",
  "i-tao": "tao",
  "i-tay": "tay",
  "i-tsu": "tsu",
  "sgn-be-fr": "sfb",
  "sgn-be-nl": "vgt",
  "sgn-ch-de": "sgg",
  "art-lojban": "jbo",
  "cel-gaulish": null,
  "no-bok": "nb",
  "no-nyn": "nn",
  "zh-guoyu": "cmn",
  "zh-hakka": "hak",
  "zh-min": null,
  "zh-min-nan": "nan",
  "zh-xiang": "hsn"
};
var own = {}.hasOwnProperty;
function parse(tag, options = {}) {
  const result = empty();
  const source = String(tag);
  const value = source.toLowerCase();
  let index = 0;
  if (tag === null || tag === void 0) {
    throw new Error("Expected string, got `" + tag + "`");
  }
  if (own.call(normal, value)) {
    const replacement = normal[value];
    if ((options.normalize === void 0 || options.normalize === null || options.normalize) && typeof replacement === "string") {
      return parse(replacement);
    }
    result[regular.includes(value) ? "regular" : "irregular"] = source;
    return result;
  }
  while (isAlphabetical(value.charCodeAt(index)) && index < 9) index++;
  if (index > 1 && index < 9) {
    result.language = source.slice(0, index);
    if (index < 4) {
      let groups = 0;
      while (value.charCodeAt(index) === 45 && isAlphabetical(value.charCodeAt(index + 1)) && isAlphabetical(value.charCodeAt(index + 2)) && isAlphabetical(value.charCodeAt(index + 3)) && !isAlphabetical(value.charCodeAt(index + 4))) {
        if (groups > 2) {
          return fail(
            index,
            3,
            "Too many extended language subtags, expected at most 3 subtags"
          );
        }
        result.extendedLanguageSubtags.push(source.slice(index + 1, index + 4));
        index += 4;
        groups++;
      }
    }
    if (value.charCodeAt(index) === 45 && isAlphabetical(value.charCodeAt(index + 1)) && isAlphabetical(value.charCodeAt(index + 2)) && isAlphabetical(value.charCodeAt(index + 3)) && isAlphabetical(value.charCodeAt(index + 4)) && !isAlphabetical(value.charCodeAt(index + 5))) {
      result.script = source.slice(index + 1, index + 5);
      index += 5;
    }
    if (value.charCodeAt(index) === 45) {
      if (isAlphabetical(value.charCodeAt(index + 1)) && isAlphabetical(value.charCodeAt(index + 2)) && !isAlphabetical(value.charCodeAt(index + 3))) {
        result.region = source.slice(index + 1, index + 3);
        index += 3;
      } else if (isDecimal(value.charCodeAt(index + 1)) && isDecimal(value.charCodeAt(index + 2)) && isDecimal(value.charCodeAt(index + 3)) && !isDecimal(value.charCodeAt(index + 4))) {
        result.region = source.slice(index + 1, index + 4);
        index += 4;
      }
    }
    while (value.charCodeAt(index) === 45) {
      const start = index + 1;
      let offset = start;
      while (isAlphanumerical(value.charCodeAt(offset))) {
        if (offset - start > 7) {
          return fail(
            offset,
            1,
            "Too long variant, expected at most 8 characters"
          );
        }
        offset++;
      }
      if (
        // Long variant.
        offset - start > 4 || // Short variant.
        offset - start > 3 && isDecimal(value.charCodeAt(start))
      ) {
        result.variants.push(source.slice(start, offset));
        index = offset;
      } else {
        break;
      }
    }
    while (value.charCodeAt(index) === 45) {
      if (value.charCodeAt(index + 1) === 120 || !isAlphanumerical(value.charCodeAt(index + 1)) || value.charCodeAt(index + 2) !== 45 || !isAlphanumerical(value.charCodeAt(index + 3))) {
        break;
      }
      let offset = index + 2;
      let groups = 0;
      while (value.charCodeAt(offset) === 45 && isAlphanumerical(value.charCodeAt(offset + 1)) && isAlphanumerical(value.charCodeAt(offset + 2))) {
        const start = offset + 1;
        offset = start + 2;
        groups++;
        while (isAlphanumerical(value.charCodeAt(offset))) {
          if (offset - start > 7) {
            return fail(
              offset,
              2,
              "Too long extension, expected at most 8 characters"
            );
          }
          offset++;
        }
      }
      if (!groups) {
        return fail(
          offset,
          4,
          "Empty extension, extensions must have at least 2 characters of content"
        );
      }
      result.extensions.push({
        singleton: source.charAt(index + 1),
        extensions: source.slice(index + 3, offset).split("-")
      });
      index = offset;
    }
  } else {
    index = 0;
  }
  if (index === 0 && value.charCodeAt(index) === 120 || value.charCodeAt(index) === 45 && value.charCodeAt(index + 1) === 120) {
    index = index ? index + 2 : 1;
    let offset = index;
    while (value.charCodeAt(offset) === 45 && isAlphanumerical(value.charCodeAt(offset + 1))) {
      const start = index + 1;
      offset = start;
      while (isAlphanumerical(value.charCodeAt(offset))) {
        if (offset - start > 7) {
          return fail(
            offset,
            5,
            "Too long private-use area, expected at most 8 characters"
          );
        }
        offset++;
      }
      result.privateuse.push(source.slice(index + 1, offset));
      index = offset;
    }
  }
  if (index !== source.length) {
    return fail(index, 6, "Found superfluous content after tag");
  }
  return result;
  function fail(offset, code, reason) {
    if (options.warning) options.warning(reason, code, offset);
    return options.forgiving ? result : empty();
  }
}
function empty() {
  return {
    language: null,
    extendedLanguageSubtags: [],
    script: null,
    region: null,
    variants: [],
    extensions: [],
    privateuse: [],
    irregular: null,
    regular: null
  };
}
var translations = {};
var filenames2 = filenames;
var contents = __default;
for (let i = 0; i < filenames2.length; i++) {
  const match = filenames2[i].match(/([^\/]+)\.json$/);
  if (!match) continue;
  const lang = match[1];
  translations[lang] = __spreadValues({
    language: lang,
    direction: contents[i].direction || "ltr"
  }, contents[i].strings);
}
function getTranslations(langCode) {
  if (!langCode) {
    return translations["en"];
  }
  const parsed = parse(langCode.toLowerCase());
  const keys = [];
  if (parsed.language && parsed.script && parsed.region) {
    keys.push(`${parsed.language}-${parsed.script}-${parsed.region}`);
  }
  if (parsed.language && parsed.region) {
    keys.push(`${parsed.language}-${parsed.region}`);
  }
  if (parsed.language) {
    keys.push(parsed.language);
  }
  for (const key of keys) {
    if (translations[key]) {
      return translations[key];
    }
  }
  return translations["en"];
}
function interpolate(str, replacements = {}, locale) {
  if (!str) return "";
  let result = str;
  for (const [placeholder, value] of Object.entries(replacements)) {
    const display = typeof value === "number" && locale ? new Intl.NumberFormat(locale).format(value) : String(value);
    result = result.replace(
      new RegExp(`\\[${placeholder}\\]`, "g"),
      display
    );
  }
  return result;
}
var ANNOUNCE_DELAY_MS = 100;
var CLEAR_DELAY_MS = 350;
var Announcer = class {
  constructor(idGenerator) {
    this.regions = null;
    this.politeIndex = 0;
    this.assertiveIndex = 0;
    this.clearTimeoutId = null;
    this.idGenerator = idGenerator;
    this.containerId = idGenerator("pf-announcer");
    this.createRegions();
  }
  createRegions() {
    if (typeof document === "undefined") return;
    const container = document.createElement("div");
    container.id = this.containerId;
    container.setAttribute("data-pagefind-announcer", "");
    const createRegionPair = (priority) => {
      const regions = [];
      for (let i = 0; i < 2; i++) {
        const region = document.createElement("div");
        region.id = this.idGenerator(`pf-${priority}-region`);
        region.setAttribute("role", "status");
        region.setAttribute("aria-live", priority);
        region.setAttribute("aria-atomic", "true");
        region.setAttribute("data-pf-sr-hidden", "");
        container.appendChild(region);
        regions.push(region);
      }
      return regions;
    };
    this.regions = {
      polite: createRegionPair("polite"),
      assertive: createRegionPair("assertive")
    };
    document.body.appendChild(container);
  }
  /**
   * Announce a message to screen readers.
   */
  announce(message, priority = "polite") {
    if (!this.regions || !message) return;
    if (this.clearTimeoutId) {
      clearTimeout(this.clearTimeoutId);
      this.clearTimeoutId = null;
    }
    const currentIndex = priority === "polite" ? this.politeIndex : this.assertiveIndex;
    const region = this.regions[priority][currentIndex];
    if (priority === "polite") {
      this.politeIndex = currentIndex === 0 ? 1 : 0;
    } else {
      this.assertiveIndex = currentIndex === 0 ? 1 : 0;
    }
    const nextIndex = priority === "polite" ? this.politeIndex : this.assertiveIndex;
    this.regions[priority][nextIndex].textContent = "";
    setTimeout(() => {
      region.textContent = message;
      this.clearTimeoutId = setTimeout(() => {
        region.textContent = "";
        this.clearTimeoutId = null;
      }, CLEAR_DELAY_MS);
    }, ANNOUNCE_DELAY_MS);
  }
  /**
   * Clear all live regions immediately.
   */
  clear() {
    if (!this.regions) return;
    if (this.clearTimeoutId) {
      clearTimeout(this.clearTimeoutId);
      this.clearTimeoutId = null;
    }
    for (const priority of ["polite", "assertive"]) {
      for (const region of this.regions[priority]) {
        region.textContent = "";
      }
    }
  }
  /**
   * Remove announcer from DOM.
   */
  destroy() {
    this.clear();
    if (typeof document !== "undefined") {
      const container = document.getElementById(this.containerId);
      if (container) {
        container.remove();
      }
    }
    this.regions = null;
  }
};
var scriptBundlePath;
try {
  if ((document == null ? void 0 : document.currentScript) && document.currentScript.tagName.toUpperCase() === "SCRIPT") {
    const match = new URL(
      document.currentScript.src
    ).pathname.match(/^(.*\/)(?:pagefind[-_])?component[-_]?ui.js.*$/);
    if (match) {
      scriptBundlePath = match[1];
    }
  }
} catch (e) {
  scriptBundlePath = "/pagefind/";
}
var Instance = class {
  constructor(name, opts = {}) {
    var _a2, _b, _c;
    this.__pagefind__ = null;
    this.__loadPromise__ = null;
    this.__searchID__ = 0;
    this._translations = null;
    this._userTranslations = {};
    this._direction = "ltr";
    this._languageSet = false;
    this.components = [];
    this.componentsByType = {};
    this.searchTerm = "";
    this.searchFilters = {};
    this.searchResult = { results: [] };
    this.availableFilters = null;
    this.totalFilters = null;
    this.activeShortcuts = [];
    this.faceted = false;
    this.generatedIds = /* @__PURE__ */ new Set();
    this.name = name;
    this.__hooks__ = {
      search: [],
      filters: [],
      loading: [],
      results: [],
      error: [],
      translations: []
    };
    this.options = {
      bundlePath: (_b = (_a2 = opts.bundlePath) != null ? _a2 : scriptBundlePath) != null ? _b : "/pagefind/",
      mergeIndex: (_c = opts.mergeIndex) != null ? _c : []
    };
    const pagefindOpts = __spreadValues({}, opts);
    delete pagefindOpts.bundlePath;
    delete pagefindOpts.mergeIndex;
    this.pagefindOptions = pagefindOpts;
    this._announcer = new Announcer(this.generateId.bind(this));
  }
  generateId(prefix, length = 2) {
    const idChars = "abcdef";
    const randomSeg = (len = 3) => {
      let word = "";
      for (let i = 0; i < len; i++) {
        word += idChars[Math.floor(Math.random() * idChars.length)];
      }
      return word;
    };
    const instancePart = this.name !== "default" ? `${this.name}-` : "";
    const segments = Array.from({ length }, () => randomSeg()).join("-");
    const id = `${prefix}-${instancePart}${segments}`;
    if (this.generatedIds.has(id) || document.getElementById(id)) {
      return this.generateId(prefix, length + 1);
    }
    this.generatedIds.add(id);
    return id;
  }
  add(component) {
    var _a2;
    (_a2 = component == null ? void 0 : component.register) == null ? void 0 : _a2.call(component, this);
    this.components.push(component);
  }
  registerInput(component, capabilities = {}) {
    this._registerComponent(component, "input", null, capabilities);
  }
  registerResults(component, capabilities = {}) {
    this._registerComponent(component, "results", null, capabilities);
  }
  registerSummary(component, capabilities = {}) {
    this._registerComponent(component, "summary", null, capabilities);
  }
  registerFilter(component, capabilities = {}) {
    this._registerComponent(component, "filter", null, capabilities);
  }
  registerSort(component, capabilities = {}) {
    this._registerComponent(component, "sort", null, capabilities);
  }
  registerUtility(component, subtype = null, capabilities = {}) {
    this._registerComponent(component, "utility", subtype, capabilities);
  }
  _registerComponent(component, type, subtype = null, capabilities = {}) {
    if (!this.componentsByType[type]) {
      this.componentsByType[type] = [];
    }
    if (!this._languageSet) {
      this.setLanguage();
    }
    if (this.components.includes(component)) {
      component.capabilities = capabilities;
      this.reconcileAria();
      return;
    }
    component.componentType = type;
    component.componentSubtype = subtype;
    component.capabilities = capabilities;
    this.componentsByType[type].push(component);
    this.components.push(component);
    this.reconcileAria();
  }
  getInputs(requiredCapability = null) {
    const components = this.componentsByType["input"] || [];
    if (!requiredCapability) return components;
    return components.filter((c) => {
      var _a2;
      return (_a2 = c.capabilities) == null ? void 0 : _a2[requiredCapability];
    });
  }
  getResults(requiredCapability = null) {
    const components = this.componentsByType["results"] || [];
    if (!requiredCapability) return components;
    return components.filter((c) => {
      var _a2;
      return (_a2 = c.capabilities) == null ? void 0 : _a2[requiredCapability];
    });
  }
  getSummaries(requiredCapability = null) {
    const components = this.componentsByType["summary"] || [];
    if (!requiredCapability) return components;
    return components.filter((c) => {
      var _a2;
      return (_a2 = c.capabilities) == null ? void 0 : _a2[requiredCapability];
    });
  }
  getFilters(requiredCapability = null) {
    const components = this.componentsByType["filter"] || [];
    if (!requiredCapability) return components;
    return components.filter((c) => {
      var _a2;
      return (_a2 = c.capabilities) == null ? void 0 : _a2[requiredCapability];
    });
  }
  getSorts(requiredCapability = null) {
    const components = this.componentsByType["sort"] || [];
    if (!requiredCapability) return components;
    return components.filter((c) => {
      var _a2;
      return (_a2 = c.capabilities) == null ? void 0 : _a2[requiredCapability];
    });
  }
  getUtilities(subtype = null, requiredCapability = null) {
    let utilities = this.componentsByType["utility"] || [];
    if (subtype !== null) {
      utilities = utilities.filter((u) => u.componentSubtype === subtype);
    }
    if (requiredCapability) {
      utilities = utilities.filter((c) => {
        var _a2;
        return (_a2 = c.capabilities) == null ? void 0 : _a2[requiredCapability];
      });
    }
    return utilities;
  }
  /**
   * Check if any component has registered announcement capability.
   * Used to determine if Instance should handle announcements as a fallback.
   */
  hasAnnouncementCapability() {
    return this.components.some((c) => {
      var _a2;
      return ((_a2 = c.capabilities) == null ? void 0 : _a2.announcements) === true;
    });
  }
  /**
   * Register an active shortcut. Triggers hints to re-render.
   */
  registerShortcut(shortcut, owner) {
    const entry = __spreadProps(__spreadValues({}, shortcut), { owner });
    this.activeShortcuts.push(entry);
    this.notifyShortcutsChanged();
  }
  /**
   * Deregister a shortcut by owner + label.
   */
  deregisterShortcut(label, owner) {
    this.activeShortcuts = this.activeShortcuts.filter(
      (s) => !(s.label === label && s.owner === owner)
    );
    this.notifyShortcutsChanged();
  }
  /**
   * Deregister all shortcuts from an owner.
   */
  deregisterAllShortcuts(owner) {
    this.activeShortcuts = this.activeShortcuts.filter(
      (s) => s.owner !== owner
    );
    this.notifyShortcutsChanged();
  }
  /**
   * Get currently active shortcuts.
   */
  getActiveShortcuts() {
    return this.activeShortcuts;
  }
  /**
   * Notify keyboard-hints utilities to re-render
   * due to shortcuts changing
   */
  notifyShortcutsChanged() {
    const hints = this.getUtilities("keyboard-hints");
    hints.forEach((h) => {
      var _a2;
      return (_a2 = h.render) == null ? void 0 : _a2.call(h);
    });
  }
  /**
   * Focus the first result in the next keyboard-navigable results component.
   */
  focusNextResults(fromElement) {
    const results = this.getResults("keyboardNavigation");
    const resultsComponent = findNextComponentInTabOrder(fromElement, results);
    if (!resultsComponent) return false;
    const firstLink = resultsComponent.querySelector("a");
    if (firstLink) {
      firstLink.focus();
      return true;
    }
    return false;
  }
  /**
   * Focus the previous keyboard-navigable input component.
   */
  focusPreviousInput(fromElement) {
    const inputs = this.getInputs("keyboardNavigation");
    const inputComponent = findPreviousComponentInTabOrder(
      fromElement,
      inputs
    );
    if (!inputComponent) return false;
    if (inputComponent.focus) {
      inputComponent.focus();
      return true;
    }
    const inputEl = inputComponent.querySelector("input");
    if (inputEl) {
      inputEl.focus();
      return true;
    }
    return false;
  }
  /**
   * Focus previous keyboard-navigable input and append a character.
   */
  focusInputAndType(fromElement, char) {
    const inputs = this.getInputs("keyboardNavigation");
    const inputComponent = findPreviousComponentInTabOrder(
      fromElement,
      inputs
    );
    const inputEl = (inputComponent == null ? void 0 : inputComponent.inputEl) || (inputComponent == null ? void 0 : inputComponent.querySelector("input"));
    if (inputEl) {
      inputEl.value += char;
      inputEl.focus();
      inputEl.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
  /**
   * Focus previous keyboard-navigable input and delete last character.
   */
  focusInputAndDelete(fromElement) {
    const inputs = this.getInputs("keyboardNavigation");
    const inputComponent = findPreviousComponentInTabOrder(
      fromElement,
      inputs
    );
    const inputEl = (inputComponent == null ? void 0 : inputComponent.inputEl) || (inputComponent == null ? void 0 : inputComponent.querySelector("input"));
    if (inputEl) {
      inputEl.value = inputEl.value.slice(0, -1);
      inputEl.focus();
      inputEl.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
  /**
   * Trigger ARIA reconciliation on all registered components.
   */
  reconcileAria() {
    this.components.forEach((c) => {
      var _a2;
      return (_a2 = c.reconcileAria) == null ? void 0 : _a2.call(c);
    });
  }
  /**
   * Get current text direction.
   */
  get direction() {
    return this._direction;
  }
  /**
   * Set the language for translations.
   */
  setLanguage(langCode) {
    var _a2;
    if (!langCode) {
      langCode = ((_a2 = document == null ? void 0 : document.documentElement) == null ? void 0 : _a2.lang) || "en";
    }
    this._translations = getTranslations(langCode);
    this._direction = this._translations.direction || "ltr";
    this._languageSet = true;
    this.__dispatch__("translations", this._translations, this._direction);
  }
  /**
   * Set user translation overrides.
   */
  setTranslations(overrides) {
    this._userTranslations = __spreadValues(__spreadValues({}, this._userTranslations), overrides);
    this.__dispatch__("translations", this._translations, this._direction);
  }
  /**
   * Get a translated string.
   */
  translate(key, replacements = {}) {
    var _a2, _b, _c;
    const str = (_b = this._userTranslations[key]) != null ? _b : (_a2 = this._translations) == null ? void 0 : _a2[key];
    return interpolate(typeof str === "string" ? str : void 0, replacements, (_c = this._translations) == null ? void 0 : _c.language);
  }
  /**
   * Announce a message to screen readers using a translation key.
   */
  announce(key, replacements = {}, priority = "polite") {
    const message = this.translate(key, replacements);
    if (message) {
      this._announcer.announce(message, priority);
    }
  }
  /**
   * Announce a raw message to screen readers (bypasses translation system).
   */
  announceRaw(message, priority = "polite") {
    this._announcer.announce(message, priority);
  }
  /**
   * Clear any pending announcements.
   */
  clearAnnouncements() {
    this._announcer.clear();
  }
  on(event, callback, owner = null) {
    if (!this.__hooks__[event]) {
      const supportedEvents = Object.keys(this.__hooks__).join(", ");
      console.error(
        `[Pagefind Component UI]: Unknown event type ${event}. Supported events: [${supportedEvents}]`
      );
      return;
    }
    if (typeof callback !== "function") {
      console.error(
        `[Pagefind Component UI]: Expected callback to be a function, received ${typeof callback}`
      );
      return;
    }
    if (owner) {
      const existingIndex = this.__hooks__[event].findIndex(
        (h) => typeof h === "object" && h.owner === owner
      );
      if (existingIndex !== -1) {
        this.__hooks__[event][existingIndex] = { callback, owner };
        return;
      }
      this.__hooks__[event].push({ callback, owner });
    } else {
      this.__hooks__[event].push(callback);
    }
  }
  triggerLoad() {
    return this.__load__();
  }
  triggerSearch(term) {
    this.searchTerm = term;
    this.__dispatch__("search", term, this.searchFilters);
    this.__search__(term, this.searchFilters);
  }
  triggerSearchWithFilters(term, filters) {
    this.searchTerm = term;
    this.searchFilters = filters;
    this.__dispatch__("search", term, filters);
    this.__search__(term, filters);
  }
  triggerFilters(filters) {
    this.searchFilters = filters;
    this.__dispatch__("search", this.searchTerm, filters);
    this.__search__(this.searchTerm, filters);
  }
  triggerFilter(filter, values) {
    this.searchFilters = this.searchFilters || {};
    this.searchFilters[filter] = values;
    this.__dispatch__("search", this.searchTerm, this.searchFilters);
    this.__search__(this.searchTerm, this.searchFilters);
  }
  __dispatch__(e, ...args) {
    var _a2;
    (_a2 = this.__hooks__[e]) == null ? void 0 : _a2.forEach((hook) => {
      if (typeof hook === "function") {
        hook(...args);
      } else if (hook == null ? void 0 : hook.callback) {
        hook.callback(...args);
      }
    });
  }
  async __clear__() {
    this.__dispatch__("results", { results: [], unfilteredTotalCount: 0 });
    if (this.__pagefind__) {
      this.availableFilters = await this.__pagefind__.filters();
      this.totalFilters = this.availableFilters;
      this.__dispatch__("filters", {
        available: this.availableFilters,
        total: this.totalFilters
      });
    }
  }
  async __search__(term, filters) {
    var _a2, _b, _c, _d;
    this.__dispatch__("loading");
    await this.__load__();
    const thisSearch = ++this.__searchID__;
    if ((!term || !term.length) && !this.faceted) {
      return this.__clear__();
    }
    if (!this.__pagefind__) return;
    const searchTerm = term && term.length ? term : null;
    const results = await this.__pagefind__.search(searchTerm, { filters });
    if (results && this.__searchID__ === thisSearch) {
      if (results.filters && ((_a2 = Object.keys(results.filters)) == null ? void 0 : _a2.length)) {
        this.availableFilters = results.filters;
        this.totalFilters = (_b = results.totalFilters) != null ? _b : null;
        this.__dispatch__("filters", {
          available: this.availableFilters,
          total: this.totalFilters
        });
      }
      this.searchResult = results;
      this.__dispatch__("results", this.searchResult);
      if (!this.hasAnnouncementCapability() && term) {
        const count = (_d = (_c = results.results) == null ? void 0 : _c.length) != null ? _d : 0;
        const key = count === 0 ? "zero_results" : count === 1 ? "one_result" : "many_results";
        const priority = count === 0 ? "assertive" : "polite";
        this.announce(key, { SEARCH_TERM: term, COUNT: count }, priority);
      }
    }
  }
  async __load__() {
    if (this.__pagefind__) {
      return;
    }
    if (this.__loadPromise__) {
      return this.__loadPromise__;
    }
    this.__loadPromise__ = this.__doLoad__();
    try {
      await this.__loadPromise__;
    } finally {
      this.__loadPromise__ = null;
    }
  }
  async __doLoad__() {
    var _a2, _b;
    if (this.__pagefind__) return;
    let pagefindModule;
    try {
      pagefindModule = await import(
        /* @vite-ignore */
        `${this.options.bundlePath}pagefind.js`
      );
    } catch (e) {
      console.error(e);
      console.error(
        [
          `Pagefind couldn't be loaded from ${this.options.bundlePath}pagefind.js`,
          `You can configure this by passing a bundlePath option to the Pagefind Component UI`
        ].join("\n")
      );
      if ((document == null ? void 0 : document.currentScript) && document.currentScript.tagName.toUpperCase() === "SCRIPT") {
        console.error(
          `[DEBUG: Loaded from ${(_b = (_a2 = document.currentScript) == null ? void 0 : _a2.src) != null ? _b : "bad script location"}]`
        );
      } else {
        console.error("no known script location");
      }
      this.__dispatch__("error", {
        type: "bundle_load_failed",
        message: "Could not load search bundle",
        bundlePath: this.options.bundlePath,
        error: e
      });
      if (!this.hasAnnouncementCapability()) {
        this.announce("error_search", {}, "assertive");
      }
      return;
    }
    const imported_pagefind = pagefindModule.createInstance(
      this.pagefindOptions || {}
    );
    for (const index of this.options.mergeIndex) {
      if (!index.bundlePath) {
        throw new Error("mergeIndex requires a bundlePath parameter");
      }
      const _c = index, { bundlePath: url } = _c, indexOpts = __objRest(_c, ["bundlePath"]);
      await imported_pagefind.mergeIndex(url, indexOpts);
    }
    this.__pagefind__ = imported_pagefind;
    this.availableFilters = await this.__pagefind__.filters();
    this.totalFilters = this.availableFilters;
    this.__dispatch__("filters", {
      available: this.availableFilters,
      total: this.totalFilters
    });
    if (this.faceted && this.__searchID__ === 0) {
      this.triggerSearch("");
    }
  }
  /**
   * Thin sub-results to the top N by relevance (location count).
   * Preserves original order while keeping only the most relevant entries.
   */
  thinSubResults(results, limit = 3) {
    if (results.length <= limit) return results;
    const topUrls = [...results].sort((a, b) => {
      var _a2, _b, _c, _d;
      return ((_b = (_a2 = b.locations) == null ? void 0 : _a2.length) != null ? _b : 0) - ((_d = (_c = a.locations) == null ? void 0 : _c.length) != null ? _d : 0);
    }).slice(0, limit).map((r) => r.url);
    return results.filter((r) => topUrls.includes(r.url));
  }
  /**
   * Get sub-results for display, excluding the root result and thinning to limit.
   */
  getDisplaySubResults(result, limit = 3) {
    var _a2, _b;
    if (!Array.isArray(result.sub_results)) return [];
    const hasRootSubResult = ((_a2 = result.sub_results[0]) == null ? void 0 : _a2.url) === (((_b = result.meta) == null ? void 0 : _b.url) || result.url);
    const subResults = hasRootSubResult ? result.sub_results.slice(1) : result.sub_results;
    return this.thinSubResults(subResults, limit);
  }
};
var InstanceManager = class {
  constructor() {
    this.instances = /* @__PURE__ */ new Map();
    this.defaultOptions = {
      bundlePath: this.detectBundlePath()
    };
  }
  detectBundlePath() {
    try {
      if ((document == null ? void 0 : document.currentScript) && document.currentScript.tagName.toUpperCase() === "SCRIPT") {
        const scriptPath = new URL(
          document.currentScript.src
        ).pathname.match(/^(.*\/)(?:pagefind[-_])?.*\.js.*$/);
        if (scriptPath) {
          return scriptPath[1];
        }
      }
    } catch (e) {
    }
    return "/pagefind/";
  }
  getInstance(name = "default", options = {}) {
    const existing = this.instances.get(name);
    if (existing) {
      return existing;
    }
    const instanceOptions = __spreadValues(__spreadValues({}, this.defaultOptions), options);
    const instance = new Instance(name, instanceOptions);
    this.instances.set(name, instance);
    return instance;
  }
  hasInstance(name) {
    return this.instances.has(name);
  }
  removeInstance(name) {
    this.instances.delete(name);
  }
  getInstanceNames() {
    return Array.from(this.instances.keys());
  }
};
var instanceManager = null;
function getInstanceManager() {
  if (!instanceManager) {
    instanceManager = new InstanceManager();
  }
  return instanceManager;
}
function configureInstance(name, options) {
  const manager = getInstanceManager();
  if (manager.hasInstance(name)) {
    console.warn(
      `[Pagefind Component UI]: Instance "${name}" already exists, configuration ignored`
    );
    return manager.getInstance(name);
  }
  return manager.getInstance(name, options);
}
var truthy = (v) => !(v == null || v === false || v === 0 || v === "" || Number.isNaN(v) || Array.isArray(v) && v.length === 0 || typeof v === "object" && v !== null && !Array.isArray(v) && Object.keys(v).length === 0);
var ck = (a, n, name) => a.length < n ? `[Error: ${name}() needs ${n} args]` : null;
var fns = {
  eq: (ctx, ...a) => {
    var _a2;
    return (_a2 = ck(a, 2, "eq")) != null ? _a2 : ev(a[0], ctx) === ev(a[1], ctx);
  },
  ne: (ctx, ...a) => {
    var _a2;
    return (_a2 = ck(a, 2, "ne")) != null ? _a2 : ev(a[0], ctx) !== ev(a[1], ctx);
  },
  gt: (ctx, ...a) => {
    var _a2;
    return (_a2 = ck(a, 2, "gt")) != null ? _a2 : Number(ev(a[0], ctx)) > Number(ev(a[1], ctx));
  },
  lt: (ctx, ...a) => {
    var _a2;
    return (_a2 = ck(a, 2, "lt")) != null ? _a2 : Number(ev(a[0], ctx)) < Number(ev(a[1], ctx));
  },
  gte: (ctx, ...a) => {
    var _a2;
    return (_a2 = ck(a, 2, "gte")) != null ? _a2 : Number(ev(a[0], ctx)) >= Number(ev(a[1], ctx));
  },
  lte: (ctx, ...a) => {
    var _a2;
    return (_a2 = ck(a, 2, "lte")) != null ? _a2 : Number(ev(a[0], ctx)) <= Number(ev(a[1], ctx));
  },
  and: (ctx, ...a) => {
    let r = true;
    for (const e of a) {
      r = ev(e, ctx);
      if (!truthy(r))
        return r;
    }
    return r;
  },
  or: (ctx, ...a) => {
    let r = false;
    for (const e of a) {
      r = ev(e, ctx);
      if (truthy(r))
        return r;
    }
    return r;
  },
  not: (ctx, ...a) => {
    var _a2;
    return (_a2 = ck(a, 1, "not")) != null ? _a2 : !truthy(ev(a[0], ctx));
  },
  lowercase: (ctx, ...a) => String(ev(a[0], ctx)).toLowerCase(),
  uppercase: (ctx, ...a) => String(ev(a[0], ctx)).toUpperCase(),
  trim: (ctx, ...a) => String(ev(a[0], ctx)).trim(),
  truncate: (ctx, ...a) => {
    const e = ck(a, 2, "truncate");
    if (e)
      return e;
    const s = String(ev(a[0], ctx)), n = Number(ev(a[1], ctx));
    const suffix = a[2] ? String(ev(a[2], ctx)) : "...";
    return s.length > n ? s.slice(0, n) + suffix : s;
  },
  replace: (ctx, ...a) => {
    var _a2;
    return (_a2 = ck(a, 3, "replace")) != null ? _a2 : String(ev(a[0], ctx)).split(String(ev(a[1], ctx))).join(String(ev(a[2], ctx)));
  },
  limit: (ctx, ...a) => {
    const e = ck(a, 2, "limit");
    if (e)
      return e;
    const r = ev(a[0], ctx), n = ev(a[1], ctx);
    return Array.isArray(r) ? r.slice(0, n < 0 ? 0 : n) : r;
  },
  first: (ctx, ...a) => {
    const e = ck(a, 1, "first");
    if (e)
      return e;
    const r = ev(a[0], ctx);
    return Array.isArray(r) ? r[0] : r;
  },
  last: (ctx, ...a) => {
    const e = ck(a, 1, "last");
    if (e)
      return e;
    const r = ev(a[0], ctx);
    return Array.isArray(r) ? r[r.length - 1] : r;
  },
  length: (ctx, ...a) => {
    const e = ck(a, 1, "length");
    if (e)
      return e;
    const v = ev(a[0], ctx);
    return Array.isArray(v) ? v.length : String(v).length;
  },
  join: (ctx, ...a) => {
    var _a2;
    return (_a2 = ck(a, 2, "join")) != null ? _a2 : ((r) => Array.isArray(r) ? r.join(String(ev(a[1], ctx))) : String(r))(ev(a[0], ctx));
  },
  default: (ctx, ...a) => {
    const e = ck(a, 2, "default");
    if (e)
      return e;
    const v = ev(a[0], ctx);
    return truthy(v) ? v : ev(a[1], ctx);
  },
  safeUrl: (ctx, ...a) => {
    var _a2;
    const u = String((_a2 = ev(a[0], ctx)) != null ? _a2 : "").trim();
    return u && /^(?:\.{0,2}\/|[#?]|(?:https?|ftp):\/\/|(?:mailto|tel):)/i.test(u) ? u : "";
  }
};
var ev = (e, ctx) => {
  if (!e)
    return void 0;
  if (e.t === "L")
    return e.val;
  if (e.t === "V") {
    const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
    let v = ctx;
    for (const k of e.path) {
      if (v == null || !has(v, k))
        return void 0;
      v = v[k];
    }
    return v;
  }
  const fn = fns[e.fn];
  if (!fn)
    return `[Error: unknown ${e.fn}()]`;
  return e.t === "C" ? fn(ctx, ...e.args) : fn(ctx, e.left, ...e.args);
};
var esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
var rn = (nodes, ctx) => {
  let out = "";
  for (const n of nodes) {
    if (n.t === "T") {
      out += n.val;
      continue;
    }
    if (n.t === "I") {
      const v = ev(n.expr, ctx);
      if (Array.isArray(v))
        out += "[Error: use #each for arrays]";
      else if (typeof v === "object" && v !== null)
        out += "[Error: cannot render object]";
      else {
        const s = String(v != null ? v : "");
        out += n.raw ? s : esc(s);
      }
      continue;
    }
    if (n.t === "F") {
      let matched = false;
      for (const b of n.branches)
        if (truthy(ev(b.cond, ctx))) {
          out += rn(b.body, ctx);
          matched = true;
          break;
        }
      if (!matched && n.else)
        out += rn(n.else, ctx);
      continue;
    }
    if (n.t === "E") {
      const arr = ev(n.arr, ctx);
      if (!Array.isArray(arr)) {
        out += "[Error: #each needs array]";
        continue;
      }
      if (!arr.length && n.else)
        out += rn(n.else, ctx);
      else
        for (let i = 0; i < arr.length; i++) {
          const local = __spreadProps(__spreadValues({}, ctx), { [n.as]: arr[i] });
          if (n.idx)
            local[n.idx] = i;
          out += rn(n.body, local);
        }
    }
  }
  return out;
};
var compile = (tmpl) => {
  let src = tmpl, pos = 0;
  const skipWs = () => {
    while (pos < src.length && " 	\n\r".includes(src[pos]))
      pos++;
  };
  const at = (s) => src.slice(pos, pos + s.length) === s;
  const skip = (s) => {
    if (at(s))
      pos += s.length;
  };
  const ident = () => {
    let r = "";
    while (pos < src.length && /\w/.test(src[pos]))
      r += src[pos++];
    return r;
  };
  const parseExpr = () => {
    skipWs();
    const start = pos;
    let expr;
    const ch = src[pos];
    if (ch === '"' || ch === "'") {
      const q = src[pos++];
      let s = "";
      while (pos < src.length && src[pos] !== q) {
        if (src[pos] === "\\" && pos + 1 < src.length) {
          pos++;
          const c = src[pos];
          s += c === "n" ? "\n" : c === "t" ? "	" : c === "r" ? "\r" : c;
          pos++;
          continue;
        }
        s += src[pos++];
      }
      if (pos < src.length)
        pos++;
      else
        s = "";
      expr = { t: "L", val: s };
    } else if (/[-0-9.]/.test(ch)) {
      let s = "", dot = 0;
      if (src[pos] === "-")
        s += src[pos++];
      if (src[pos] === ".") {
        s += src[pos++];
        dot = 1;
      }
      while (pos < src.length && (/[0-9]/.test(src[pos]) || src[pos] === "." && !dot++))
        s += src[pos++];
      expr = s === "-" || s === "." || s === "" ? { t: "V", path: [s || "-"] } : { t: "L", val: parseFloat(s) };
    } else {
      const name = ident();
      if (name === "true")
        expr = { t: "L", val: true };
      else if (name === "false")
        expr = { t: "L", val: false };
      else if (name === "null")
        expr = { t: "L", val: null };
      else {
        skipWs();
        if (src[pos] === "(") {
          pos++;
          const args = [];
          skipWs();
          while (pos < src.length && src[pos] !== ")" && src[pos] !== "}") {
            args.push(parseExpr());
            skipWs();
            if (src[pos] === ",") {
              pos++;
              skipWs();
            }
          }
          if (src[pos] === ")")
            pos++;
          expr = { t: "C", fn: name, args };
        } else {
          const path = [name];
          while (src[pos] === ".") {
            pos++;
            path.push(ident());
          }
          expr = { t: "V", path };
        }
      }
    }
    skipWs();
    while (src[pos] === "|") {
      pos++;
      skipWs();
      const fn = ident();
      skipWs();
      const args = [];
      if (src[pos] === "(") {
        pos++;
        skipWs();
        while (pos < src.length && src[pos] !== ")" && src[pos] !== "}") {
          args.push(parseExpr());
          skipWs();
          if (src[pos] === ",") {
            pos++;
            skipWs();
          }
        }
        if (src[pos] === ")")
          pos++;
      }
      expr = { t: "P", left: expr, fn, args };
      skipWs();
    }
    if (pos === start && pos < src.length)
      pos++;
    return expr;
  };
  const parseNodes = (stops = []) => {
    const result = [];
    outer: while (pos < src.length) {
      for (const s of stops)
        if (at(s))
          break outer;
      if (src[pos] === "\\" && at("\\{{")) {
        pos++;
        result.push({ t: "T", val: "{{" });
        pos += 2;
        continue;
      }
      if (at("{{")) {
        pos += 2;
        skipWs();
        if (src[pos] === "+") {
          pos++;
          skipWs();
          const expr2 = parseExpr();
          skipWs();
          skip("+");
          skipWs();
          while (pos < src.length && !at("}}"))
            pos++;
          skip("}}");
          result.push({ t: "I", expr: expr2, raw: 1 });
          continue;
        }
        if (src[pos] === "#") {
          pos++;
          const kw = ident();
          skipWs();
          if (kw === "if") {
            const branches = [];
            const cond = parseExpr();
            skipWs();
            skip("}}");
            branches.push({
              cond,
              body: parseNodes([
                "{{:else if",
                "{{:elseif",
                "{{:else}}",
                "{{/if}}"
              ])
            });
            while (at("{{:else if") || at("{{:elseif")) {
              pos += at("{{:elseif") ? 9 : 10;
              skipWs();
              const cond2 = parseExpr();
              skipWs();
              skip("}}");
              branches.push({
                cond: cond2,
                body: parseNodes([
                  "{{:else if",
                  "{{:elseif",
                  "{{:else}}",
                  "{{/if}}"
                ])
              });
            }
            let elseBody;
            if (at("{{:else}}")) {
              pos += 9;
              elseBody = parseNodes(["{{/if}}"]);
            }
            skip("{{/if}}");
            result.push({ t: "F", branches, else: elseBody });
            continue;
          }
          if (kw === "each") {
            const arrExpr = parseExpr();
            skipWs();
            const asKw = ident();
            skipWs();
            if (asKw !== "as") {
              result.push({ t: "T", val: `[Error: #each missing 'as']` });
              continue;
            }
            const itemName = ident();
            skipWs();
            let idxName;
            if (src[pos] === ",") {
              pos++;
              skipWs();
              idxName = ident();
              skipWs();
            }
            skip("}}");
            const body = parseNodes(["{{:else}}", "{{/each}}"]);
            let elseBody;
            if (at("{{:else}}")) {
              pos += 9;
              elseBody = parseNodes(["{{/each}}"]);
            }
            skip("{{/each}}");
            result.push({
              t: "E",
              arr: arrExpr,
              as: itemName,
              idx: idxName,
              body,
              else: elseBody
            });
            continue;
          }
          result.push({ t: "T", val: `[Error: unknown #${kw}]` });
          skipWs();
          skip("}}");
          continue;
        }
        const expr = parseExpr();
        skipWs();
        while (pos < src.length && !at("}}"))
          pos++;
        skip("}}");
        result.push({ t: "I", expr });
        continue;
      }
      let text = "";
      while (pos < src.length) {
        for (const s of stops)
          if (at(s)) {
            if (text)
              result.push({ t: "T", val: text });
            continue outer;
          }
        if (src[pos] === "\\" && at("\\{{"))
          break;
        if (at("{{"))
          break;
        text += src[pos++];
      }
      if (text)
        result.push({ t: "T", val: text });
    }
    return result;
  };
  const ast = parseNodes();
  return (data) => rn(ast, data);
};
var registerFunction = (name, fn) => {
  fns[name] = (ctx, ...a) => fn(...a.map((e) => ev(e, ctx)));
};
var PagefindElement = class extends HTMLElement {
  constructor() {
    super();
    this.instance = null;
    this._initialized = false;
  }
  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;
    const instanceName = this.getAttribute("instance") || "default";
    const manager = getInstanceManager();
    this.instance = manager.getInstance(instanceName);
    this.init();
    if (this.register && typeof this.register === "function") {
      this.register(this.instance);
    }
  }
  disconnectedCallback() {
    if (this.cleanup && typeof this.cleanup === "function") {
      this.cleanup();
    }
    this._initialized = false;
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._initialized || oldValue === newValue) return;
    const prop = this.kebabToCamel(name);
    if (newValue === "false") {
      this[prop] = false;
    } else if (newValue === "true") {
      this[prop] = true;
    } else if (newValue === null || newValue === void 0) {
      this[prop] = false;
    } else {
      this[prop] = newValue;
    }
    if (this.update && typeof this.update === "function") {
      this.update();
    }
  }
  kebabToCamel(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }
  ensureId(prefix = "pagefind") {
    if (!this.id && this.instance) {
      this.id = this.instance.generateId(prefix);
    }
    return this.id;
  }
  init() {
  }
  reconcileAria() {
  }
  register(_instance) {
  }
  cleanup() {
  }
  update() {
  }
  showError(error) {
    const errorEl = document.createElement("div");
    errorEl.className = "pf-error";
    errorEl.innerHTML = `
            <strong>Pagefind Error:</strong> ${this.escapeHtml(error.message || "Unknown error")}
            ${error.details ? `<br><small>${this.escapeHtml(error.details)}</small>` : ""}
        `;
    this.appendChild(errorEl);
    this.dispatchEvent(
      new CustomEvent("pagefind-error", {
        detail: error,
        bubbles: true,
        composed: true
      })
    );
  }
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
};
var PagefindConfig = class extends PagefindElement {
  init() {
    this.setAttribute("hidden", "");
  }
  register(instance) {
    instance.registerUtility(this);
    const bundlePath = this.getAttribute("bundle-path");
    if (bundlePath) {
      instance.options.bundlePath = bundlePath;
    }
    const baseUrl = this.getAttribute("base-url");
    if (baseUrl) {
      instance.pagefindOptions.baseUrl = baseUrl;
    }
    const excerptLength = this.getAttribute("excerpt-length");
    if (excerptLength) {
      instance.pagefindOptions.excerptLength = parseInt(excerptLength, 10);
    }
    const lang = this.getAttribute("lang");
    if (lang) {
      instance.setLanguage(lang);
    }
    const metaCacheTag = this.getAttribute("meta-cache-tag");
    if (metaCacheTag) {
      instance.pagefindOptions.metaCacheTag = metaCacheTag;
    }
    const highlightParam = this.getAttribute("highlight-param");
    if (highlightParam) {
      instance.pagefindOptions.highlightParam = highlightParam;
    }
    if (this.hasAttribute("exact-diacritics")) {
      instance.pagefindOptions.exactDiacritics = true;
    }
    if (this.hasAttribute("no-worker")) {
      instance.pagefindOptions.noWorker = true;
    }
    if (this.hasAttribute("faceted")) {
      instance.faceted = true;
    }
    if (this.hasAttribute("preload")) {
      instance.triggerLoad();
    }
  }
};
if (!customElements.get("pagefind-config")) {
  customElements.define("pagefind-config", PagefindConfig);
}
var asyncSleep = (ms = 100) => new Promise((r) => setTimeout(r, ms));
var PagefindInput = class extends PagefindElement {
  constructor() {
    super();
    this.inputEl = null;
    this.clearEl = null;
    this.searchID = 0;
    this.placeholder = "";
    this.debounce = 300;
    this.autofocus = false;
  }
  static get observedAttributes() {
    return ["placeholder", "debounce", "autofocus"];
  }
  readAttributes() {
    if (this.hasAttribute("placeholder")) {
      this.placeholder = this.getAttribute("placeholder") || "";
    }
    if (this.hasAttribute("debounce")) {
      this.debounce = parseInt(this.getAttribute("debounce") || "300", 10) || 300;
    }
    if (this.hasAttribute("autofocus")) {
      this.autofocus = this.hasAttribute("autofocus");
    }
  }
  init() {
    this.readAttributes();
    this.render();
  }
  render() {
    var _a2, _b, _c, _d, _e;
    this.innerHTML = "";
    const inputId = this.instance.generateId("pfmod-input");
    const searchLabel = ((_a2 = this.instance) == null ? void 0 : _a2.translate("search_label")) || "Search this site";
    const clearText = ((_b = this.instance) == null ? void 0 : _b.translate("clear_search")) || "Clear";
    const placeholderText = this.placeholder || ((_c = this.instance) == null ? void 0 : _c.translate("placeholder")) || "Search";
    if (((_d = this.instance) == null ? void 0 : _d.direction) === "rtl") {
      this.setAttribute("dir", "rtl");
    } else {
      this.removeAttribute("dir");
    }
    const wrapper = document.createElement("search");
    wrapper.className = "pf-input-wrapper";
    wrapper.setAttribute("role", "search");
    wrapper.setAttribute("aria-label", searchLabel);
    const label = document.createElement("label");
    label.setAttribute("for", inputId);
    label.setAttribute("data-pf-sr-hidden", "true");
    label.textContent = searchLabel;
    wrapper.appendChild(label);
    this.inputEl = document.createElement("input");
    this.inputEl.id = inputId;
    this.inputEl.className = "pf-input";
    this.inputEl.setAttribute("type", "search");
    this.inputEl.setAttribute("autocomplete", "off");
    this.inputEl.setAttribute("autocapitalize", "none");
    this.inputEl.setAttribute("enterkeyhint", "search");
    this.inputEl.setAttribute("placeholder", placeholderText);
    if (this.autofocus) {
      this.inputEl.setAttribute("autofocus", "autofocus");
    }
    const hintId = this.instance.generateId("pf-input-hint");
    const hintText = ((_e = this.instance) == null ? void 0 : _e.translate("input_hint")) || "Results will appear as you type";
    const hint = document.createElement("span");
    hint.id = hintId;
    hint.setAttribute("data-pf-sr-hidden", "true");
    hint.textContent = hintText;
    this.inputEl.setAttribute("aria-describedby", hintId);
    wrapper.appendChild(this.inputEl);
    wrapper.appendChild(hint);
    this.clearEl = document.createElement("button");
    this.clearEl.className = "pf-input-clear";
    this.clearEl.setAttribute("type", "button");
    this.clearEl.setAttribute("data-pf-suppressed", "true");
    this.clearEl.textContent = clearText;
    wrapper.appendChild(this.clearEl);
    this.appendChild(wrapper);
    this.setupEventHandlers();
  }
  setupEventHandlers() {
    if (!this.inputEl || !this.clearEl) return;
    this.inputEl.addEventListener("input", async (e) => {
      var _a2;
      const target = e.target;
      if (this.instance && typeof (target == null ? void 0 : target.value) === "string") {
        this.updateState(target.value);
        const thisSearchID = ++this.searchID;
        await asyncSleep(this.debounce);
        if (thisSearchID !== this.searchID) {
          return;
        }
        (_a2 = this.instance) == null ? void 0 : _a2.triggerSearch(target.value);
      }
    });
    this.inputEl.addEventListener("keydown", (e) => {
      var _a2, _b;
      if (e.key === "Escape") {
        ++this.searchID;
        if (this.inputEl) this.inputEl.value = "";
        (_a2 = this.instance) == null ? void 0 : _a2.triggerSearch("");
        this.updateState("");
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (this.inputEl) {
          (_b = this.instance) == null ? void 0 : _b.focusNextResults(this.inputEl);
        }
      }
    });
    this.inputEl.addEventListener("focus", () => {
      var _a2, _b, _c, _d, _e;
      (_a2 = this.instance) == null ? void 0 : _a2.triggerLoad();
      const navigateText = ((_b = this.instance) == null ? void 0 : _b.translate("keyboard_navigate")) || "navigate";
      const clearText = ((_c = this.instance) == null ? void 0 : _c.translate("keyboard_clear")) || "clear";
      (_d = this.instance) == null ? void 0 : _d.registerShortcut(
        { label: "\u2193", description: navigateText },
        this
      );
      (_e = this.instance) == null ? void 0 : _e.registerShortcut(
        { label: "esc", description: clearText },
        this
      );
    });
    this.inputEl.addEventListener("blur", () => {
      var _a2;
      (_a2 = this.instance) == null ? void 0 : _a2.deregisterAllShortcuts(this);
    });
    this.clearEl.addEventListener("click", () => {
      var _a2;
      if (this.inputEl) {
        this.inputEl.value = "";
        (_a2 = this.instance) == null ? void 0 : _a2.triggerSearch("");
        this.updateState("");
        this.inputEl.focus();
      }
    });
  }
  updateState(term) {
    if (this.clearEl) {
      if (term && (term == null ? void 0 : term.length)) {
        this.clearEl.removeAttribute("data-pf-suppressed");
      } else {
        this.clearEl.setAttribute("data-pf-suppressed", "true");
      }
    }
  }
  register(instance) {
    instance.registerInput(this, {
      keyboardNavigation: true
    });
    instance.on(
      "search",
      (term) => {
        if (this.inputEl && document.activeElement !== this.inputEl) {
          this.inputEl.value = term;
          this.updateState(term);
        }
      },
      this
    );
    instance.on(
      "error",
      (error) => {
        const err = error;
        this.showError({
          message: err.message || "Search initialization failed",
          details: err.bundlePath ? `Bundle path: ${err.bundlePath}` : void 0
        });
      },
      this
    );
    instance.on(
      "translations",
      () => {
        var _a2;
        const currentValue = ((_a2 = this.inputEl) == null ? void 0 : _a2.value) || "";
        this.render();
        if (this.inputEl && currentValue) {
          this.inputEl.value = currentValue;
          this.updateState(currentValue);
        }
      },
      this
    );
  }
  update() {
    this.render();
  }
  focus() {
    if (this.inputEl) {
      this.inputEl.focus();
    }
  }
};
if (!customElements.get("pagefind-input")) {
  customElements.define("pagefind-input", PagefindInput);
}
var PagefindSummary = class extends PagefindElement {
  constructor() {
    super();
    this.containerEl = null;
    this.term = "";
    this.defaultMessage = "";
  }
  static get observedAttributes() {
    return ["default-message"];
  }
  init() {
    if (this.hasAttribute("default-message")) {
      this.defaultMessage = this.getAttribute("default-message") || "";
    }
    this.render();
  }
  render() {
    var _a2;
    this.innerHTML = "";
    if (((_a2 = this.instance) == null ? void 0 : _a2.direction) === "rtl") {
      this.setAttribute("dir", "rtl");
    } else {
      this.removeAttribute("dir");
    }
    this.containerEl = document.createElement("div");
    this.containerEl.className = "pf-summary";
    this.containerEl.textContent = this.defaultMessage;
    this.appendChild(this.containerEl);
  }
  reconcileAria() {
  }
  register(instance) {
    instance.registerSummary(this);
    instance.on(
      "search",
      (term) => {
        this.term = term;
      },
      this
    );
    instance.on(
      "results",
      (results) => {
        var _a2, _b;
        if (!this.containerEl || !results) return;
        const searchResult = results;
        const count = (_b = (_a2 = searchResult == null ? void 0 : searchResult.results) == null ? void 0 : _a2.length) != null ? _b : 0;
        if (!this.term) {
          if (instance.faceted) {
            const key2 = count === 0 ? "total_zero_results" : count === 1 ? "total_one_result" : "total_many_results";
            const text2 = instance.translate(key2, { COUNT: count });
            this.containerEl.textContent = text2 || `${count} result${count === 1 ? "" : "s"}`;
          } else {
            this.containerEl.textContent = this.defaultMessage;
          }
          return;
        }
        const key = count === 0 ? "zero_results" : count === 1 ? "one_result" : "many_results";
        const text = instance.translate(key, {
          SEARCH_TERM: this.term,
          COUNT: count
        });
        this.containerEl.textContent = text || `${count} result${count === 1 ? "" : "s"} for ${this.term}`;
      },
      this
    );
    instance.on(
      "loading",
      () => {
        if (!this.containerEl) return;
        const text = instance.translate("searching", {
          SEARCH_TERM: this.term
        });
        this.containerEl.textContent = text || `Searching for ${this.term}...`;
      },
      this
    );
    instance.on(
      "error",
      (error) => {
        if (!this.containerEl) return;
        const err = error;
        const errorText = instance.translate("error_search") || "Search failed";
        this.containerEl.textContent = `Error: ${err.message || errorText}`;
      },
      this
    );
    instance.on(
      "translations",
      () => {
        this.render();
      },
      this
    );
  }
  update() {
    if (this.hasAttribute("default-message")) {
      this.defaultMessage = this.getAttribute("default-message") || "";
      if (!this.term && this.containerEl) {
        this.containerEl.textContent = this.defaultMessage;
      }
    }
  }
};
if (!customElements.get("pagefind-summary")) {
  customElements.define("pagefind-summary", PagefindSummary);
}
var templateNodes = (templateResult) => {
  if (templateResult instanceof Element) {
    return [templateResult];
  }
  if (Array.isArray(templateResult) && templateResult.every((r) => r instanceof Element)) {
    return templateResult;
  }
  if (typeof templateResult === "string" || templateResult instanceof String) {
    const wrap = document.createElement("div");
    wrap.innerHTML = templateResult;
    return [...wrap.childNodes];
  }
  console.error(
    `[Pagefind Results]: Expected template to return HTML element or string, got ${typeof templateResult}`
  );
  return [];
};
var DEFAULT_RESULT_TEMPLATE = `<li class="pf-result">
  <div class="pf-result-card">
    {{#if and(options.show_images, meta.image)}}
    <img class="pf-result-image" src="{{ meta.image | resolveUrl(meta.url | default(url)) }}" alt="{{ meta.image_alt | default(meta.title) }}">
    {{/if}}
    <div class="pf-result-content">
      <p class="pf-result-title">
        <a class="pf-result-link" href="{{ meta.url | default(url) | safeUrl }}"{{#if options.link_target}} target="{{ options.link_target }}"{{/if}}{{#if eq(options.link_target, "_blank")}} rel="noopener"{{/if}}>{{ meta.title }}</a>
      </p>
      {{#if excerpt}}
      <p class="pf-result-excerpt">{{+ excerpt +}}</p>
      {{/if}}
    </div>
  </div>
  {{#if sub_results}}
  <ul class="pf-heading-chips">
    {{#each sub_results as sub}}
    <li class="pf-heading-chip">
      <a class="pf-heading-link" href="{{ sub.url | safeUrl }}"{{#if options.link_target}} target="{{ options.link_target }}"{{/if}}{{#if eq(options.link_target, "_blank")}} rel="noopener"{{/if}}>{{ sub.title }}</a>
      <p class="pf-heading-excerpt">{{+ sub.excerpt +}}</p>
    </li>
    {{/each}}
  </ul>
  {{/if}}
</li>`;
var DEFAULT_PLACEHOLDER_TEMPLATE = `<li class="pf-result" aria-hidden="true">
  <div class="pf-result-card">
    <div class="pf-skeleton pf-skeleton-image"></div>
    <div class="pf-result-content">
      <p class="pf-result-title pf-skeleton pf-skeleton-title"></p>
      <p class="pf-result-excerpt pf-skeleton pf-skeleton-excerpt"></p>
    </div>
  </div>
</li>`;
var defaultResultTemplate = compile(
  DEFAULT_RESULT_TEMPLATE
);
var defaultPlaceholderTemplate = compile(
  DEFAULT_PLACEHOLDER_TEMPLATE
);
var stampResultIndex = (nodes, index) => {
  for (const node of nodes) {
    if (node instanceof Element) {
      node.setAttribute("data-pf-result-index", String(index));
      break;
    }
  }
};
var nearestScrollParent = (el) => {
  if (!(el instanceof HTMLElement)) return null;
  const overflowY = window.getComputedStyle(el).overflowY;
  const isScrollable = overflowY !== "visible" && overflowY !== "hidden";
  return isScrollable ? el : nearestScrollParent(el.parentNode);
};
var Result = class {
  constructor(opts) {
    this.result = null;
    this.loading = false;
    this.observer = null;
    this.rawResult = opts.result;
    this.index = opts.index;
    this.placeholderNodes = opts.placeholderNodes;
    this.resultFn = opts.resultFn;
    this.intersectionEl = opts.intersectionEl;
    this.showImages = opts.showImages;
    this.showSubResults = opts.showSubResults;
    this.maxSubResults = opts.maxSubResults;
    this.linkTarget = opts.linkTarget;
    this.onLoad = opts.onLoad;
    this.setupObserver();
  }
  setupObserver() {
    var _a2;
    if (this.result !== null || this.observer !== null) return;
    if (!((_a2 = this.placeholderNodes) == null ? void 0 : _a2.length)) return;
    const options = {
      root: this.intersectionEl,
      rootMargin: "50px",
      // Start loading slightly before visible
      threshold: 0.01
    };
    this.observer = new IntersectionObserver((entries, obs) => {
      var _a3;
      if (this.result !== null) return;
      if ((_a3 = entries == null ? void 0 : entries[0]) == null ? void 0 : _a3.isIntersecting) {
        this.load();
        obs.disconnect();
        this.observer = null;
      }
    }, options);
    this.observer.observe(this.placeholderNodes[0]);
  }
  async load() {
    var _a2, _b;
    if (!((_a2 = this.placeholderNodes) == null ? void 0 : _a2.length)) return;
    if (this.result !== null || this.loading) return;
    this.loading = true;
    try {
      this.result = await this.rawResult.data();
      const resultTemplate = this.resultFn(this.result, {
        showImages: this.showImages,
        showSubResults: this.showSubResults,
        maxSubResults: this.maxSubResults,
        linkTarget: this.linkTarget
      });
      const resultNodes = templateNodes(resultTemplate);
      stampResultIndex(resultNodes, this.index);
      while (this.placeholderNodes.length > 1) {
        const node = this.placeholderNodes.pop();
        if (node instanceof Element) node.remove();
      }
      const firstNode = this.placeholderNodes[0];
      if (firstNode instanceof Element) {
        firstNode.replaceWith(...resultNodes);
      }
    } catch (e) {
      this.loading = false;
    }
    (_b = this.onLoad) == null ? void 0 : _b.call(this);
  }
  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
};
var PagefindResults = class extends PagefindElement {
  constructor() {
    super();
    this.containerEl = null;
    this.intersectionEl = document.body;
    this.results = [];
    this.showImages = false;
    this.hideSubResults = false;
    this.maxSubResults = 3;
    this.maxResults = 0;
    this.linkTarget = null;
    this.resultTemplate = null;
    this.compiledResultTemplate = null;
    this.compiledPlaceholderTemplate = null;
    this.selectedIndex = -1;
    this.selectedAnchor = null;
    this.loadingAnnouncementTimeout = null;
  }
  static get observedAttributes() {
    return [
      "show-images",
      "hide-sub-results",
      "max-sub-results",
      "max-results",
      "link-target"
    ];
  }
  init() {
    if (this.hasAttribute("show-images")) {
      this.showImages = this.getAttribute("show-images") !== "false";
    }
    if (this.hasAttribute("hide-sub-results")) {
      this.hideSubResults = this.getAttribute("hide-sub-results") !== "false";
    }
    if (this.hasAttribute("max-sub-results")) {
      this.maxSubResults = parseInt(this.getAttribute("max-sub-results") || "3", 10) || 3;
    }
    if (this.hasAttribute("max-results")) {
      this.maxResults = parseInt(this.getAttribute("max-results") || "0", 10);
    }
    if (this.hasAttribute("link-target")) {
      this.linkTarget = this.getAttribute("link-target");
    }
    this.checkForTemplates();
    this.render();
  }
  checkForTemplates() {
    const resultScript = this.querySelector(
      'script[type="text/pagefind-template"]:not([data-template]), script[type="text/pagefind-template"][data-template="result"]'
    );
    if (resultScript) {
      this.compiledResultTemplate = compile(
        (resultScript.textContent || "").trim()
      );
    }
    const placeholderScript = this.querySelector(
      'script[type="text/pagefind-template"][data-template="placeholder"]'
    );
    if (placeholderScript) {
      this.compiledPlaceholderTemplate = compile(
        (placeholderScript.textContent || "").trim()
      );
    }
  }
  buildTemplateData(result, options) {
    const subResults = options.showSubResults ? this.instance.getDisplaySubResults(result, options.maxSubResults) : [];
    return {
      meta: result.meta || {},
      excerpt: result.excerpt || "",
      url: result.url || "",
      sub_results: subResults.map((sr) => ({
        title: sr.title,
        url: sr.url,
        excerpt: sr.excerpt
      })),
      options: {
        link_target: options.linkTarget,
        show_images: options.showImages
      }
    };
  }
  /**
   * Returns the internal render function used by the Result class.
   * Priority: JS function > script template > default template
   */
  getResultRenderer() {
    if (this.resultTemplate) {
      const userFn = this.resultTemplate;
      return (result, _options) => userFn(result);
    }
    if (this.compiledResultTemplate) {
      const template = this.compiledResultTemplate;
      return (result, options) => {
        const data = this.buildTemplateData(result, options);
        return template(data);
      };
    }
    return (result, options) => {
      const data = this.buildTemplateData(result, options);
      return defaultResultTemplate(data);
    };
  }
  getPlaceholder() {
    if (this.compiledPlaceholderTemplate) {
      return this.compiledPlaceholderTemplate({});
    }
    return defaultPlaceholderTemplate({});
  }
  render() {
    var _a2, _b;
    const savedScripts = [];
    this.querySelectorAll('script[type="text/pagefind-template"]').forEach(
      (s) => {
        savedScripts.push(s);
      }
    );
    this.innerHTML = "";
    savedScripts.forEach((s) => this.appendChild(s));
    const resultsLabel = ((_a2 = this.instance) == null ? void 0 : _a2.translate("results_label")) || "Search results";
    if (((_b = this.instance) == null ? void 0 : _b.direction) === "rtl") {
      this.setAttribute("dir", "rtl");
    } else {
      this.removeAttribute("dir");
    }
    this.containerEl = document.createElement("ul");
    this.containerEl.className = "pf-results";
    this.containerEl.setAttribute("aria-label", resultsLabel);
    this.containerEl.setAttribute("aria-busy", "false");
    this.appendChild(this.containerEl);
    this.setupKeyboardHandlers();
  }
  appendResults(nodes) {
    if (!this.containerEl) return;
    for (const node of nodes) {
      this.containerEl.appendChild(node);
    }
  }
  register(instance) {
    instance.registerResults(this, {
      keyboardNavigation: true,
      announcements: true
    });
    instance.on(
      "results",
      (results) => {
        if (!this.containerEl) return;
        const searchResult = results;
        for (const result of this.results) {
          result.cleanup();
        }
        this.containerEl.innerHTML = "";
        this.containerEl.setAttribute("aria-busy", "false");
        this.intersectionEl = nearestScrollParent(this.containerEl);
        this.selectedIndex = -1;
        this.selectedAnchor = null;
        const limitedResults = this.maxResults > 0 ? searchResult.results.slice(0, this.maxResults) : searchResult.results;
        const count = limitedResults.length;
        const term = instance.searchTerm;
        if (term) {
          const key = count === 0 ? "zero_results" : count === 1 ? "one_result" : "many_results";
          const priority = count === 0 ? "assertive" : "polite";
          instance.announce(key, { SEARCH_TERM: term, COUNT: count }, priority);
        } else if (instance.faceted) {
          const key = count === 0 ? "total_zero_results" : count === 1 ? "total_one_result" : "total_many_results";
          const priority = count === 0 ? "assertive" : "polite";
          instance.announce(key, { COUNT: count }, priority);
        }
        const resultRenderer = this.getResultRenderer();
        this.results = limitedResults.map((r, idx) => {
          const placeholderNodes = templateNodes(this.getPlaceholder());
          stampResultIndex(placeholderNodes, idx);
          this.appendResults(placeholderNodes);
          const result = new Result({
            result: r,
            index: idx,
            placeholderNodes,
            resultFn: resultRenderer,
            intersectionEl: this.intersectionEl,
            showImages: this.showImages,
            showSubResults: !this.hideSubResults,
            maxSubResults: this.maxSubResults,
            linkTarget: this.linkTarget,
            onLoad: () => {
              if (result.result) {
                this.clearLoadingAnnouncement();
              }
            }
          });
          return result;
        });
      },
      this
    );
    instance.on(
      "loading",
      () => {
        if (!this.containerEl) return;
        this.containerEl.innerHTML = "";
        this.containerEl.setAttribute("aria-busy", "true");
        this.selectedIndex = -1;
        this.selectedAnchor = null;
      },
      this
    );
    instance.on(
      "error",
      (error) => {
        const err = error;
        if (this.containerEl) {
          this.containerEl.setAttribute("aria-busy", "false");
        }
        instance.announce("error_search", {}, "assertive");
        this.showError({
          message: err.message || instance.translate("error_search") || "Failed to load search results",
          details: err.bundlePath ? `Bundle path: ${err.bundlePath}` : void 0
        });
      },
      this
    );
    instance.on(
      "translations",
      () => {
        this.render();
      },
      this
    );
  }
  /**
   * Find the next or previous anchor relative to the given one using DOM
   * traversal. Returns the neighbor anchor and the index of the Result it
   * belongs to, or null if there is no neighbor in that direction.
   */
  findNeighborAnchor(current, direction45) {
    if (!this.containerEl) return null;
    const walker = document.createTreeWalker(
      this.containerEl,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: (node) => node.tagName === "A" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
      }
    );
    walker.currentNode = current;
    const neighbor = direction45 > 0 ? walker.nextNode() : walker.previousNode();
    if (!neighbor || !(neighbor instanceof HTMLAnchorElement)) return null;
    const resultIndex = this.resultIndexForNode(neighbor);
    return { anchor: neighbor, resultIndex };
  }
  /**
   * Given a node inside the results container, walk up to the direct child
   * of containerEl and read its data-pf-result-index attribute.
   */
  resultIndexForNode(node) {
    if (!this.containerEl) return -1;
    let el = node;
    while (el && el.parentNode !== this.containerEl) {
      el = el.parentNode;
    }
    if (!el || !(el instanceof Element)) return -1;
    const attr = el.getAttribute("data-pf-result-index");
    if (attr === null) return -1;
    const idx = parseInt(attr, 10);
    return Number.isNaN(idx) ? -1 : idx;
  }
  setupKeyboardHandlers() {
    if (!this.containerEl) return;
    this.containerEl.addEventListener("keydown", (e) => {
      var _a2, _b, _c, _d;
      const anchor = e.target.closest("a");
      if (!anchor) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const neighbor = this.findNeighborAnchor(
          anchor,
          1
        );
        if (neighbor) {
          neighbor.anchor.focus();
          this.scrollToCenter(neighbor.anchor, e.repeat);
          if (neighbor.resultIndex !== -1)
            this.preloadAhead(neighbor.resultIndex, 1);
        } else {
          const currentResultIdx = this.resultIndexForNode(anchor);
          const nextResultIdx = currentResultIdx + 1;
          if (nextResultIdx > 0 && nextResultIdx < this.results.length) {
            const nextResult = this.results[nextResultIdx];
            if (nextResult && !nextResult.result) {
              nextResult.load();
              this.scheduleLoadingAnnouncement();
            }
            this.preloadAhead(nextResultIdx, 1);
          }
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const neighbor = this.findNeighborAnchor(
          anchor,
          -1
        );
        if (neighbor) {
          neighbor.anchor.focus();
          this.scrollToCenter(neighbor.anchor, e.repeat);
          if (neighbor.resultIndex !== -1)
            this.preloadAhead(neighbor.resultIndex, -1);
        } else {
          (_a2 = this.instance) == null ? void 0 : _a2.focusPreviousInput(document.activeElement);
        }
      } else if (e.key === "Backspace") {
        e.preventDefault();
        (_b = this.instance) == null ? void 0 : _b.focusInputAndDelete(document.activeElement);
      } else if (e.key === "/") {
        e.preventDefault();
        (_c = this.instance) == null ? void 0 : _c.focusPreviousInput(document.activeElement);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        (_d = this.instance) == null ? void 0 : _d.focusInputAndType(
          document.activeElement,
          e.key
        );
      }
    });
    this.containerEl.addEventListener("focusin", (e) => {
      var _a2, _b, _c, _d, _e, _f;
      const anchor = e.target.closest(
        "a"
      );
      if (!anchor) return;
      this.clearSelection();
      anchor.setAttribute("data-pf-selected", "");
      this.selectedAnchor = anchor;
      const navigateText = ((_a2 = this.instance) == null ? void 0 : _a2.translate("keyboard_navigate")) || "navigate";
      const selectText = ((_b = this.instance) == null ? void 0 : _b.translate("keyboard_select")) || "select";
      const searchText = ((_c = this.instance) == null ? void 0 : _c.translate("keyboard_search")) || "search";
      (_d = this.instance) == null ? void 0 : _d.registerShortcut(
        { label: "\u2191\u2193", description: navigateText },
        this
      );
      (_e = this.instance) == null ? void 0 : _e.registerShortcut(
        { label: "\u21B5", description: selectText },
        this
      );
      (_f = this.instance) == null ? void 0 : _f.registerShortcut(
        { label: "/", description: searchText },
        this
      );
    });
    this.containerEl.addEventListener("focusout", (e) => {
      var _a2, _b;
      const focusEvent = e;
      if (!((_a2 = this.containerEl) == null ? void 0 : _a2.contains(focusEvent.relatedTarget))) {
        this.clearSelection();
        (_b = this.instance) == null ? void 0 : _b.deregisterAllShortcuts(this);
      }
    });
  }
  scrollToCenter(el, instant = false) {
    const container = this.intersectionEl || nearestScrollParent(el);
    if (!container || !(container instanceof HTMLElement)) return;
    if (container === document.body || container === document.documentElement)
      return;
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const elRelativeTop = elRect.top - containerRect.top + container.scrollTop;
    const targetScroll = elRelativeTop - container.clientHeight / 2 + el.offsetHeight / 2;
    container.scrollTo({
      top: targetScroll,
      behavior: instant ? "instant" : "smooth"
    });
  }
  preloadAhead(fromIndex, direction45) {
    const step = direction45 > 0 ? 1 : -1;
    for (let i = 1; i <= 3; i++) {
      const idx = fromIndex + step * i;
      if (idx >= 0 && idx < this.results.length) {
        const result = this.results[idx];
        if (result && !result.result) {
          result.load();
        }
      }
    }
  }
  scheduleLoadingAnnouncement() {
    if (this.loadingAnnouncementTimeout) return;
    this.loadingAnnouncementTimeout = window.setTimeout(() => {
      var _a2;
      this.loadingAnnouncementTimeout = null;
      (_a2 = this.instance) == null ? void 0 : _a2.announce("loading", {}, "polite");
    }, 800);
  }
  clearLoadingAnnouncement() {
    if (this.loadingAnnouncementTimeout) {
      clearTimeout(this.loadingAnnouncementTimeout);
      this.loadingAnnouncementTimeout = null;
    }
  }
  clearSelection() {
    if (this.selectedAnchor) {
      this.selectedAnchor.removeAttribute("data-pf-selected");
      this.selectedAnchor = null;
    }
  }
  cleanup() {
    this.clearLoadingAnnouncement();
    for (const result of this.results) {
      result.cleanup();
    }
    this.results = [];
    this.selectedAnchor = null;
  }
  update() {
    this.render();
  }
};
if (!customElements.get("pagefind-results")) {
  customElements.define("pagefind-results", PagefindResults);
}
var PagefindFilterPane = class extends PagefindElement {
  constructor() {
    super();
    this.containerEl = null;
    this.showEmpty = false;
    this.expanded = false;
    this.openFilters = [];
    this.sortOption = "default";
    this.autoOpenThreshold = 6;
    this.selectedFilters = {};
    this.availableFilters = null;
    this.totalFilters = null;
    this.filterElements = /* @__PURE__ */ new Map();
    this.groupElements = /* @__PURE__ */ new Map();
    this.groupVisibleCounts = /* @__PURE__ */ new Map();
    this.isRendered = false;
  }
  static get observedAttributes() {
    return ["show-empty", "expanded", "open", "sort", "auto-open-threshold"];
  }
  init() {
    if (this.hasAttribute("show-empty")) {
      this.showEmpty = this.getAttribute("show-empty") !== "false";
    }
    if (this.hasAttribute("expanded")) {
      this.expanded = this.getAttribute("expanded") !== "false";
    }
    if (this.hasAttribute("open")) {
      this.openFilters = (this.getAttribute("open") || "").split(",").map((s) => s.trim().toLowerCase()).filter((s) => s.length > 0);
    }
    if (this.hasAttribute("sort")) {
      const sortVal = this.getAttribute("sort");
      if (["default", "alphabetical", "count-desc", "count-asc"].includes(sortVal)) {
        this.sortOption = sortVal;
      }
    }
    if (this.hasAttribute("auto-open-threshold")) {
      this.autoOpenThreshold = parseInt(
        this.getAttribute("auto-open-threshold") || "6",
        10
      );
    }
    this.render();
  }
  sortValues(values, availableValues) {
    if (this.sortOption === "default") {
      return values;
    }
    const sorted = [...values];
    switch (this.sortOption) {
      case "alphabetical":
        sorted.sort((a, b) => a[0].localeCompare(b[0]));
        break;
      case "count-desc":
        sorted.sort((a, b) => {
          var _a2, _b;
          const countA = (_a2 = availableValues[a[0]]) != null ? _a2 : a[1];
          const countB = (_b = availableValues[b[0]]) != null ? _b : b[1];
          return countB - countA;
        });
        break;
      case "count-asc":
        sorted.sort((a, b) => {
          var _a2, _b;
          const countA = (_a2 = availableValues[a[0]]) != null ? _a2 : a[1];
          const countB = (_b = availableValues[b[0]]) != null ? _b : b[1];
          return countA - countB;
        });
        break;
    }
    return sorted;
  }
  render() {
    var _a2;
    this.innerHTML = "";
    if (((_a2 = this.instance) == null ? void 0 : _a2.direction) === "rtl") {
      this.setAttribute("dir", "rtl");
    } else {
      this.removeAttribute("dir");
    }
    this.containerEl = document.createElement("div");
    this.containerEl.className = "pf-filter-pane";
    this.appendChild(this.containerEl);
  }
  getSelectedText(count) {
    return String(count);
  }
  shouldGroupStartOpen(filterName, valueCount, filterCount) {
    if (this.openFilters.length > 0) {
      return this.openFilters.includes(filterName.toLowerCase());
    }
    return this.autoOpenThreshold > 0 && filterCount === 1 && valueCount <= this.autoOpenThreshold;
  }
  hasStructureChanged() {
    if (!this.totalFilters) return false;
    const currentGroups = new Set(Object.keys(this.totalFilters));
    const renderedGroups = new Set(this.groupElements.keys());
    if (currentGroups.size !== renderedGroups.size) return true;
    for (const group of currentGroups) {
      if (!renderedGroups.has(group)) return true;
    }
    for (const [filterName, values] of Object.entries(this.totalFilters)) {
      const currentValues = new Set(Object.keys(values));
      for (const value of currentValues) {
        if (!this.filterElements.has(`${filterName}:${value}`)) return true;
      }
    }
    return false;
  }
  handleFiltersUpdate() {
    if (!this.containerEl || !this.totalFilters) return;
    const filterNames = Object.keys(this.totalFilters);
    if (filterNames.length === 0) {
      this.containerEl.setAttribute("data-pf-hidden", "true");
      return;
    }
    this.containerEl.removeAttribute("data-pf-hidden");
    if (!this.isRendered || this.hasStructureChanged()) {
      this.renderFilters();
    } else {
      this.updateFilters();
    }
  }
  renderFilters() {
    var _a2;
    if (!this.containerEl || !this.totalFilters) return;
    this.containerEl.innerHTML = "";
    this.filterElements.clear();
    this.groupElements.clear();
    this.groupVisibleCounts.clear();
    const filterNames = Object.keys(this.totalFilters);
    for (const filterName of filterNames) {
      const values = this.totalFilters[filterName];
      const availableValues = ((_a2 = this.availableFilters) == null ? void 0 : _a2[filterName]) || {};
      const group = this.renderFilterGroup(
        filterName,
        values,
        availableValues,
        filterNames.length
      );
      if (group) {
        this.containerEl.appendChild(group);
      }
    }
    this.isRendered = true;
  }
  updateFilters() {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    for (const [key, elements] of this.filterElements) {
      const colonIndex = key.indexOf(":");
      const filterName = key.slice(0, colonIndex);
      const value = key.slice(colonIndex + 1);
      const availableCount = (_c = (_b = (_a2 = this.availableFilters) == null ? void 0 : _a2[filterName]) == null ? void 0 : _b[value]) != null ? _c : 0;
      const totalCount = (_f = (_e = (_d = this.totalFilters) == null ? void 0 : _d[filterName]) == null ? void 0 : _e[value]) != null ? _f : 0;
      const isSelected = (_g = this.selectedFilters[filterName]) == null ? void 0 : _g.has(value);
      const count = isSelected ? totalCount : availableCount;
      elements.countSpan.textContent = String(count);
      const shouldShow = this.showEmpty || availableCount > 0 || isSelected;
      const wasHidden = elements.label.hasAttribute("data-pf-hidden");
      elements.label.toggleAttribute("data-pf-hidden", !shouldShow);
      if (shouldShow && wasHidden) {
        this.groupVisibleCounts.set(
          filterName,
          ((_h = this.groupVisibleCounts.get(filterName)) != null ? _h : 0) + 1
        );
      } else if (!shouldShow && !wasHidden) {
        this.groupVisibleCounts.set(
          filterName,
          ((_i = this.groupVisibleCounts.get(filterName)) != null ? _i : 1) - 1
        );
      }
      elements.checkbox.checked = isSelected || false;
    }
    for (const [filterName, elements] of this.groupElements) {
      const selectedCount = ((_j = this.selectedFilters[filterName]) == null ? void 0 : _j.size) || 0;
      if (elements.selectedCountSpan) {
        if (selectedCount > 0) {
          elements.selectedCountSpan.textContent = this.getSelectedText(selectedCount);
          elements.selectedCountSpan.removeAttribute("data-pf-hidden");
        } else {
          elements.selectedCountSpan.setAttribute("data-pf-hidden", "true");
        }
      }
      const visibleCount = (_k = this.groupVisibleCounts.get(filterName)) != null ? _k : 0;
      elements.group.toggleAttribute("data-pf-hidden", visibleCount === 0);
    }
  }
  renderFilterGroup(filterName, values, availableValues, filterCount) {
    var _a2, _b, _c;
    const rawEntries = Object.entries(values);
    if (rawEntries.length === 0) return null;
    const valueEntries = this.sortValues(rawEntries, availableValues);
    const displayName = filterName.charAt(0).toUpperCase() + filterName.slice(1);
    const selectedCount = ((_a2 = this.selectedFilters[filterName]) == null ? void 0 : _a2.size) || 0;
    const shouldOpen = this.expanded || this.shouldGroupStartOpen(filterName, valueEntries.length, filterCount);
    let group;
    let optionsContainer;
    let selectedCountSpan = null;
    if (this.expanded) {
      group = document.createElement("fieldset");
      group.className = "pf-filter-group";
      const legend = document.createElement("legend");
      legend.className = "pf-filter-group-title";
      const titleSpan = document.createElement("span");
      titleSpan.className = "pf-filter-group-name";
      titleSpan.textContent = displayName;
      legend.appendChild(titleSpan);
      group.appendChild(legend);
      optionsContainer = document.createElement("div");
      optionsContainer.className = "pf-filter-options";
      group.appendChild(optionsContainer);
    } else {
      group = document.createElement("details");
      group.className = "pf-filter-group";
      group.dataset.filterName = filterName;
      if (shouldOpen) {
        group.open = true;
      }
      const summary = document.createElement("summary");
      summary.className = "pf-filter-group-title";
      const titleSpan = document.createElement("span");
      titleSpan.className = "pf-filter-group-name";
      titleSpan.textContent = displayName;
      summary.appendChild(titleSpan);
      selectedCountSpan = document.createElement("span");
      selectedCountSpan.className = "pf-filter-group-count";
      selectedCountSpan.setAttribute("aria-hidden", "true");
      if (selectedCount > 0) {
        selectedCountSpan.textContent = this.getSelectedText(selectedCount);
      } else {
        selectedCountSpan.setAttribute("data-pf-hidden", "true");
      }
      summary.appendChild(selectedCountSpan);
      group.appendChild(summary);
      const fieldset = document.createElement("fieldset");
      fieldset.className = "pf-filter-fieldset";
      const legend = document.createElement("legend");
      legend.setAttribute("data-pf-sr-hidden", "");
      legend.textContent = displayName;
      fieldset.appendChild(legend);
      optionsContainer = document.createElement("div");
      optionsContainer.className = "pf-filter-options";
      fieldset.appendChild(optionsContainer);
      group.appendChild(fieldset);
    }
    this.groupElements.set(filterName, {
      group,
      optionsContainer,
      selectedCountSpan
    });
    let visibleCount = 0;
    for (const [value, totalCount] of valueEntries) {
      const availableCount = (_b = availableValues[value]) != null ? _b : 0;
      const isSelected = ((_c = this.selectedFilters[filterName]) == null ? void 0 : _c.has(value)) || false;
      const count = isSelected ? totalCount : availableCount;
      const shouldShow = this.showEmpty || availableCount > 0 || isSelected;
      if (shouldShow) visibleCount++;
      this.renderCheckbox(
        optionsContainer,
        filterName,
        value,
        count,
        isSelected,
        shouldShow
      );
    }
    this.groupVisibleCounts.set(filterName, visibleCount);
    return group;
  }
  renderCheckbox(container, filterName, value, count, isSelected, shouldShow) {
    const checkboxId = this.instance.generateId(
      `pf-filter-${filterName}-${value}`
    );
    const label = document.createElement("label");
    label.className = "pf-filter-checkbox";
    label.setAttribute("for", checkboxId);
    if (!shouldShow) {
      label.setAttribute("data-pf-hidden", "true");
    }
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "pf-checkbox-input";
    checkbox.id = checkboxId;
    checkbox.name = filterName;
    checkbox.value = value;
    checkbox.checked = isSelected;
    checkbox.addEventListener("change", (e) => {
      this.handleCheckboxChange(
        filterName,
        value,
        e.target.checked
      );
    });
    label.appendChild(checkbox);
    const textNode = document.createTextNode(value);
    label.appendChild(textNode);
    const countSpan = document.createElement("span");
    countSpan.className = "pf-filter-checkbox-count";
    countSpan.textContent = String(count);
    label.appendChild(countSpan);
    container.appendChild(label);
    this.filterElements.set(`${filterName}:${value}`, {
      label,
      countSpan,
      checkbox
    });
  }
  handleCheckboxChange(filterName, value, checked) {
    var _a2, _b;
    if (!this.selectedFilters[filterName]) {
      this.selectedFilters[filterName] = /* @__PURE__ */ new Set();
    }
    if (checked) {
      this.selectedFilters[filterName].add(value);
    } else {
      this.selectedFilters[filterName].delete(value);
    }
    const groupElements = this.groupElements.get(filterName);
    if (groupElements == null ? void 0 : groupElements.selectedCountSpan) {
      const selectedCount = this.selectedFilters[filterName].size;
      if (selectedCount > 0) {
        groupElements.selectedCountSpan.textContent = this.getSelectedText(selectedCount);
        groupElements.selectedCountSpan.removeAttribute("data-pf-hidden");
      } else {
        groupElements.selectedCountSpan.setAttribute("data-pf-hidden", "true");
      }
    }
    const selectedValues = Array.from(this.selectedFilters[filterName]);
    if (selectedValues.length === 0) {
      delete this.selectedFilters[filterName];
      const filters = {};
      for (const [name, values] of Object.entries(this.selectedFilters)) {
        filters[name] = Array.from(values);
      }
      (_a2 = this.instance) == null ? void 0 : _a2.triggerFilters(filters);
    } else {
      (_b = this.instance) == null ? void 0 : _b.triggerFilter(filterName, selectedValues);
    }
  }
  register(instance) {
    instance.registerFilter(this);
    instance.on(
      "filters",
      (filters) => {
        const f = filters;
        this.availableFilters = f.available;
        this.totalFilters = f.total;
        this.handleFiltersUpdate();
      },
      this
    );
    instance.on(
      "search",
      (_term, filters) => {
        this.selectedFilters = {};
        const f = filters;
        if (f) {
          for (const [name, values] of Object.entries(f)) {
            if (Array.isArray(values) && values.length > 0) {
              this.selectedFilters[name] = new Set(values);
            }
          }
        }
        if (this.isRendered) {
          this.updateFilters();
        }
      },
      this
    );
    instance.on(
      "error",
      (error) => {
        const err = error;
        this.showError({
          message: err.message || "Failed to load filters",
          details: err.bundlePath ? `Bundle path: ${err.bundlePath}` : void 0
        });
      },
      this
    );
    instance.on(
      "translations",
      () => {
        this.render();
        this.isRendered = false;
        this.handleFiltersUpdate();
      },
      this
    );
  }
  update() {
    if (this.hasAttribute("show-empty")) {
      this.showEmpty = this.getAttribute("show-empty") !== "false";
    }
    if (this.hasAttribute("expanded")) {
      this.expanded = this.getAttribute("expanded") !== "false";
    }
    if (this.hasAttribute("open")) {
      this.openFilters = (this.getAttribute("open") || "").split(",").map((s) => s.trim().toLowerCase()).filter((s) => s.length > 0);
    }
    if (this.isRendered) {
      this.isRendered = false;
      this.handleFiltersUpdate();
    }
  }
};
if (!customElements.get("pagefind-filter-pane")) {
  customElements.define("pagefind-filter-pane", PagefindFilterPane);
}
var PagefindFilterDropdown = class extends PagefindElement {
  constructor() {
    super();
    this.isOpen = false;
    this.activeIndex = -1;
    this.selectedValues = /* @__PURE__ */ new Set();
    this.isRendered = false;
    this.filtersLoaded = false;
    this.filterName = null;
    this.availableFilters = {};
    this.totalFilters = {};
    this.singleSelect = false;
    this.showEmpty = false;
    this.wrapLabels = false;
    this.hideClear = false;
    this.sortOption = "default";
    this.wrapperEl = null;
    this.triggerEl = null;
    this.menuEl = null;
    this.optionsEl = null;
    this.clearEl = null;
    this.badgeEl = null;
    this.optionElements = [];
    this.focusedOptionEl = null;
    this.typeAheadBuffer = "";
    this.typeAheadTimeout = null;
    this._handleClickOutside = this._handleClickOutside.bind(this);
  }
  static get observedAttributes() {
    return ["filter", "label", "single-select", "show-empty", "wrap", "sort", "hide-clear"];
  }
  init() {
    this.filterName = this.getAttribute("filter");
    if (!this.filterName) {
      this.showError({
        message: "filter attribute is required on <pagefind-filter-dropdown>"
      });
      return;
    }
    this.singleSelect = this.hasAttribute("single-select");
    this.showEmpty = this.hasAttribute("show-empty");
    this.wrapLabels = this.hasAttribute("wrap");
    this.hideClear = this.hasAttribute("hide-clear");
    if (this.hasAttribute("sort")) {
      const sortVal = this.getAttribute("sort");
      if (["default", "alphabetical", "count-desc", "count-asc"].includes(sortVal)) {
        this.sortOption = sortVal;
      }
    }
    this.render();
  }
  sortValues(values) {
    if (this.sortOption === "default") {
      return values;
    }
    const sorted = [...values];
    switch (this.sortOption) {
      case "alphabetical":
        sorted.sort((a, b) => a.localeCompare(b));
        break;
      case "count-desc":
        sorted.sort((a, b) => {
          var _a2, _b, _c, _d;
          const countA = (_b = (_a2 = this.availableFilters[a]) != null ? _a2 : this.totalFilters[a]) != null ? _b : 0;
          const countB = (_d = (_c = this.availableFilters[b]) != null ? _c : this.totalFilters[b]) != null ? _d : 0;
          return countB - countA;
        });
        break;
      case "count-asc":
        sorted.sort((a, b) => {
          var _a2, _b, _c, _d;
          const countA = (_b = (_a2 = this.availableFilters[a]) != null ? _a2 : this.totalFilters[a]) != null ? _b : 0;
          const countB = (_d = (_c = this.availableFilters[b]) != null ? _c : this.totalFilters[b]) != null ? _d : 0;
          return countA - countB;
        });
        break;
    }
    return sorted;
  }
  render() {
    var _a2, _b;
    this.innerHTML = "";
    const id = this.ensureId("pf-dropdown");
    const triggerId = `${id}-trigger`;
    const menuId = `${id}-menu`;
    this.wrapperEl = document.createElement("div");
    this.wrapperEl.className = "pf-dropdown-wrapper";
    this.triggerEl = document.createElement("button");
    this.triggerEl.type = "button";
    this.triggerEl.id = triggerId;
    this.triggerEl.className = "pf-dropdown-trigger";
    if (this.wrapLabels) this.triggerEl.classList.add("wrap");
    this.triggerEl.setAttribute("role", "combobox");
    this.triggerEl.setAttribute("aria-haspopup", "listbox");
    this.triggerEl.setAttribute("aria-expanded", "false");
    this.triggerEl.setAttribute("aria-controls", menuId);
    const labelSpan = document.createElement("span");
    labelSpan.className = "pf-dropdown-trigger-label";
    if (this.wrapLabels) labelSpan.classList.add("wrap");
    labelSpan.textContent = this.getAttribute("label") || this.filterName || "";
    this.triggerEl.appendChild(labelSpan);
    this.badgeEl = document.createElement("span");
    this.badgeEl.className = "pf-dropdown-selected-badge";
    this.badgeEl.setAttribute("data-pf-hidden", "true");
    this.badgeEl.setAttribute("aria-hidden", "true");
    this.badgeEl.textContent = "0";
    this.triggerEl.appendChild(this.badgeEl);
    const arrow = document.createElement("span");
    arrow.className = "pf-dropdown-arrow";
    arrow.setAttribute("aria-hidden", "true");
    this.triggerEl.appendChild(arrow);
    this.wrapperEl.appendChild(this.triggerEl);
    this.menuEl = document.createElement("div");
    this.menuEl.id = menuId;
    this.menuEl.className = "pf-dropdown-menu";
    this.menuEl.hidden = true;
    this.optionsEl = document.createElement("div");
    this.optionsEl.className = "pf-dropdown-options";
    this.optionsEl.setAttribute("role", "listbox");
    this.optionsEl.setAttribute(
      "aria-multiselectable",
      this.singleSelect ? "false" : "true"
    );
    this.optionsEl.setAttribute("aria-labelledby", triggerId);
    this.menuEl.appendChild(this.optionsEl);
    this.wrapperEl.appendChild(this.menuEl);
    if (!this.hideClear) {
      this.clearEl = document.createElement("button");
      this.clearEl.type = "button";
      this.clearEl.className = "pf-dropdown-clear";
      this.clearEl.setAttribute("aria-disabled", "true");
      this.clearEl.setAttribute(
        "aria-label",
        (((_a2 = this.instance) == null ? void 0 : _a2.translate("clear_search")) || "Clear") + " " + (this.getAttribute("label") || this.filterName || "")
      );
      this.clearEl.textContent = ((_b = this.instance) == null ? void 0 : _b.translate("clear_search")) || "Clear";
      this.wrapperEl.appendChild(this.clearEl);
      this.clearEl.addEventListener("click", () => this.clearAll());
    }
    this.appendChild(this.wrapperEl);
    this.triggerEl.addEventListener("click", () => this.toggle());
    this.triggerEl.addEventListener(
      "focus",
      () => {
        var _a3;
        return (_a3 = this.instance) == null ? void 0 : _a3.triggerLoad();
      }
    );
    this.triggerEl.addEventListener("keydown", (e) => {
      if (this.isOpen) {
        this.handleMenuKeydown(e);
      } else {
        this.handleTriggerKeydown(e);
      }
    });
    this.isRendered = true;
  }
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  open() {
    var _a2, _b, _c, _d, _e, _f, _g;
    (_a2 = this.instance) == null ? void 0 : _a2.triggerLoad();
    if (this.isOpen || !this.menuEl || !this.triggerEl || !this.optionsEl)
      return;
    this.isOpen = true;
    if (!this.filtersLoaded) {
      this.showLoadingState();
    }
    this.menuEl.hidden = false;
    this.triggerEl.setAttribute("aria-expanded", "true");
    this.triggerEl.classList.add("open");
    if (this.optionElements.length > 0) {
      const targetIndex = this.activeIndex >= 0 ? this.activeIndex : 0;
      this.setActiveIndex(targetIndex);
    }
    const navigateText = ((_b = this.instance) == null ? void 0 : _b.translate("keyboard_navigate")) || "navigate";
    const selectText = ((_c = this.instance) == null ? void 0 : _c.translate("keyboard_select")) || "select";
    const closeText = ((_d = this.instance) == null ? void 0 : _d.translate("keyboard_close")) || "close";
    (_e = this.instance) == null ? void 0 : _e.registerShortcut(
      { label: "\u2191\u2193", description: navigateText },
      this
    );
    (_f = this.instance) == null ? void 0 : _f.registerShortcut(
      { label: "\u21B5", description: selectText },
      this
    );
    (_g = this.instance) == null ? void 0 : _g.registerShortcut(
      { label: "esc", description: closeText },
      this
    );
    setTimeout(() => {
      document.addEventListener("click", this._handleClickOutside);
    }, 0);
  }
  close(returnFocus = true) {
    var _a2, _b;
    if (!this.isOpen || !this.menuEl || !this.triggerEl || !this.optionsEl)
      return;
    this.isOpen = false;
    this.menuEl.hidden = true;
    this.triggerEl.setAttribute("aria-expanded", "false");
    this.triggerEl.classList.remove("open");
    (_a2 = this.triggerEl) == null ? void 0 : _a2.removeAttribute("aria-activedescendant");
    if (this.focusedOptionEl) {
      this.focusedOptionEl.classList.remove("pf-dropdown-option-focused");
      this.focusedOptionEl = null;
    }
    (_b = this.instance) == null ? void 0 : _b.deregisterAllShortcuts(this);
    document.removeEventListener("click", this._handleClickOutside);
    if (returnFocus) {
      this.triggerEl.focus();
    }
  }
  _handleClickOutside(event) {
    if (this.wrapperEl && !this.wrapperEl.contains(event.target)) {
      this.close(false);
    }
  }
  handleTriggerKeydown(e) {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        this.open();
        break;
      case "ArrowDown":
        e.preventDefault();
        this.open();
        this.setActiveIndex(0);
        break;
      case "ArrowUp":
        e.preventDefault();
        this.open();
        this.setActiveIndex(this.optionElements.length - 1);
        break;
    }
  }
  handleMenuKeydown(e) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        this.moveActiveIndex(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        this.moveActiveIndex(-1);
        break;
      case "Home":
        e.preventDefault();
        this.setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        this.setActiveIndex(this.optionElements.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (this.activeIndex >= 0 && this.activeIndex < this.optionElements.length) {
          const activeOption = this.optionElements[this.activeIndex];
          if (activeOption) {
            this.toggleOption(activeOption.value);
          }
        }
        break;
      case "Escape":
        e.preventDefault();
        this.close();
        break;
      case "Tab":
        this.close(false);
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          this.handleTypeAhead(e.key);
        }
    }
  }
  setActiveIndex(index) {
    var _a2;
    if (index < 0 || index >= this.optionElements.length || !this.optionsEl)
      return;
    if (this.focusedOptionEl) {
      this.focusedOptionEl.classList.remove("pf-dropdown-option-focused");
    }
    this.activeIndex = index;
    const option = this.optionElements[index];
    option.el.classList.add("pf-dropdown-option-focused");
    this.focusedOptionEl = option.el;
    (_a2 = this.triggerEl) == null ? void 0 : _a2.setAttribute("aria-activedescendant", option.el.id);
    this.scrollToCenter(option.el);
  }
  scrollToCenter(el) {
    if (!this.optionsEl) return;
    const container = this.optionsEl;
    const elTop = el.offsetTop;
    const elHeight = el.offsetHeight;
    const containerHeight = container.clientHeight;
    const targetScroll = elTop - containerHeight / 2 + elHeight / 2;
    container.scrollTo({ top: targetScroll, behavior: "smooth" });
  }
  moveActiveIndex(delta) {
    let newIndex = this.activeIndex + delta;
    if (newIndex < 0) {
      newIndex = this.optionElements.length - 1;
    } else if (newIndex >= this.optionElements.length) {
      newIndex = 0;
    }
    this.setActiveIndex(newIndex);
  }
  handleTypeAhead(char) {
    this.typeAheadBuffer += char.toLowerCase();
    if (this.typeAheadTimeout) {
      clearTimeout(this.typeAheadTimeout);
    }
    const matchIndex = this.optionElements.findIndex(
      ({ value }) => value.toLowerCase().startsWith(this.typeAheadBuffer)
    );
    if (matchIndex >= 0) {
      this.setActiveIndex(matchIndex);
    }
    this.typeAheadTimeout = setTimeout(() => {
      this.typeAheadBuffer = "";
    }, 500);
  }
  showLoadingState() {
    if (!this.optionsEl) return;
    this.optionsEl.innerHTML = "";
    this.optionsEl.setAttribute("aria-busy", "true");
    const srStatus = document.createElement("div");
    srStatus.setAttribute("data-pf-sr-hidden", "true");
    srStatus.textContent = "Loading filter options...";
    this.optionsEl.appendChild(srStatus);
    for (let i = 0; i < 3; i++) {
      const skeleton = document.createElement("div");
      skeleton.className = "pf-dropdown-option pf-dropdown-option-loading";
      skeleton.setAttribute("aria-hidden", "true");
      const checkbox = document.createElement("span");
      checkbox.className = "pf-dropdown-checkbox pf-skeleton";
      skeleton.appendChild(checkbox);
      const label = document.createElement("span");
      label.className = "pf-dropdown-option-label pf-skeleton";
      label.style.width = `${60 + i * 15}%`;
      label.innerHTML = "&nbsp;";
      skeleton.appendChild(label);
      this.optionsEl.appendChild(skeleton);
    }
  }
  updateOptions() {
    var _a2;
    if (!this.optionsEl) return;
    this.filtersLoaded = true;
    this.optionsEl.removeAttribute("aria-busy");
    const rawValues = Object.keys(this.totalFilters || {});
    const values = this.sortValues(rawValues);
    if (rawValues.length === 0) {
      this.optionsEl.innerHTML = "";
      const error = document.createElement("div");
      error.className = "pf-dropdown-error";
      error.setAttribute("role", "alert");
      error.textContent = `No filter "${this.filterName}" found`;
      this.optionsEl.appendChild(error);
      this.optionElements = [];
      this.focusedOptionEl = null;
      return;
    }
    (_a2 = this.wrapperEl) == null ? void 0 : _a2.removeAttribute("data-pf-hidden");
    this.optionsEl.innerHTML = "";
    this.optionElements = [];
    this.focusedOptionEl = null;
    const baseId = this.id || this.ensureId("pf-dropdown");
    values.forEach((value, index) => {
      var _a3, _b, _c;
      const availableCount = (_b = (_a3 = this.availableFilters) == null ? void 0 : _a3[value]) != null ? _b : 0;
      const totalCount = (_c = this.totalFilters[value]) != null ? _c : 0;
      const isSelected = this.selectedValues.has(value);
      const shouldShow = this.showEmpty || availableCount > 0 || isSelected;
      if (!shouldShow) return;
      const count = isSelected ? totalCount : availableCount;
      const optionId = `${baseId}-option-${index}`;
      const option = this.createOption(optionId, value, count, isSelected);
      this.optionsEl.appendChild(option);
      this.optionElements.push({ el: option, value });
    });
    if (this.isOpen && this.optionElements.length > 0) {
      if (this.activeIndex >= this.optionElements.length) {
        this.setActiveIndex(this.optionElements.length - 1);
      } else if (this.activeIndex < 0) {
        this.setActiveIndex(0);
      } else {
        this.setActiveIndex(this.activeIndex);
      }
    }
    this.updateBadge();
  }
  createOption(id, value, count, isSelected) {
    const option = document.createElement("div");
    option.id = id;
    option.className = "pf-dropdown-option";
    if (this.wrapLabels) option.classList.add("wrap");
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", String(isSelected));
    option.dataset.value = value;
    const checkbox = document.createElement("span");
    checkbox.className = "pf-dropdown-checkbox";
    checkbox.setAttribute("aria-hidden", "true");
    option.appendChild(checkbox);
    const label = document.createElement("span");
    label.className = "pf-dropdown-option-label";
    if (this.wrapLabels) label.classList.add("wrap");
    label.textContent = value;
    option.appendChild(label);
    const countSpan = document.createElement("span");
    countSpan.className = "pf-dropdown-option-count";
    countSpan.setAttribute("aria-hidden", "true");
    countSpan.textContent = String(count);
    option.appendChild(countSpan);
    const resultWord = count === 1 ? "result" : "results";
    option.setAttribute("aria-label", `${value}, ${count} ${resultWord}`);
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleOption(value);
    });
    return option;
  }
  toggleOption(value) {
    var _a2;
    const wasSelected = this.selectedValues.has(value);
    if (this.singleSelect) {
      if (this.selectedValues.has(value)) {
        this.selectedValues.clear();
      } else {
        this.selectedValues.clear();
        this.selectedValues.add(value);
      }
      this.close();
    } else {
      if (this.selectedValues.has(value)) {
        this.selectedValues.delete(value);
      } else {
        this.selectedValues.add(value);
      }
    }
    const isNowSelected = this.selectedValues.has(value);
    if (isNowSelected !== wasSelected) {
      const action = isNowSelected ? "selected" : "deselected";
      (_a2 = this.instance) == null ? void 0 : _a2.announceRaw(`${value} ${action}`);
    }
    this.updateOptionStates();
    this.updateBadge();
    this.dispatchFilterChange();
  }
  clearAll() {
    if (this.selectedValues.size === 0) return;
    this.selectedValues.clear();
    this.updateOptionStates();
    this.updateBadge();
    this.dispatchFilterChange();
  }
  dispatchFilterChange() {
    var _a2, _b;
    if (!this.filterName) return;
    const selectedArray = Array.from(this.selectedValues);
    if (selectedArray.length === 0) {
      (_a2 = this.instance) == null ? void 0 : _a2.triggerFilter(this.filterName, []);
    } else {
      (_b = this.instance) == null ? void 0 : _b.triggerFilter(this.filterName, selectedArray);
    }
  }
  updateBadge() {
    if (!this.badgeEl || !this.triggerEl) return;
    const count = this.selectedValues.size;
    if (count > 0) {
      this.badgeEl.textContent = String(count);
      this.badgeEl.removeAttribute("data-pf-hidden");
      const label = this.getAttribute("label") || this.filterName || "";
      const filterWord = count === 1 ? "filter" : "filters";
      this.triggerEl.setAttribute(
        "aria-label",
        `${label}, ${count} ${filterWord} selected`
      );
      if (this.clearEl) {
        this.clearEl.removeAttribute("aria-disabled");
      }
    } else {
      this.badgeEl.setAttribute("data-pf-hidden", "true");
      this.triggerEl.removeAttribute("aria-label");
      if (this.clearEl) {
        this.clearEl.setAttribute("aria-disabled", "true");
      }
    }
  }
  updateOptionStates() {
    for (const { el, value } of this.optionElements) {
      const isSelected = this.selectedValues.has(value);
      el.setAttribute("aria-selected", String(isSelected));
    }
  }
  register(instance) {
    if (!this.filterName) return;
    instance.registerFilter(this);
    instance.on(
      "filters",
      (filters) => {
        var _a2, _b;
        const f = filters;
        this.availableFilters = ((_a2 = f.available) == null ? void 0 : _a2[this.filterName]) || {};
        this.totalFilters = ((_b = f.total) == null ? void 0 : _b[this.filterName]) || {};
        if (this.isRendered) {
          this.updateOptions();
        }
      },
      this
    );
    instance.on(
      "search",
      (_term, filters) => {
        const f = filters;
        const externalValues = (f == null ? void 0 : f[this.filterName]) || [];
        this.selectedValues = new Set(externalValues);
        if (this.isRendered) {
          this.updateOptionStates();
          this.updateBadge();
        }
      },
      this
    );
    instance.on(
      "error",
      (error) => {
        const err = error;
        this.showError({
          message: err.message || "Failed to load filters",
          details: err.bundlePath ? `Bundle path: ${err.bundlePath}` : void 0
        });
      },
      this
    );
  }
  update() {
    var _a2;
    const newFilterName = this.getAttribute("filter");
    if (newFilterName !== this.filterName) {
      this.filterName = newFilterName;
      this.selectedValues.clear();
      this.updateOptions();
    }
    this.singleSelect = this.hasAttribute("single-select");
    this.showEmpty = this.hasAttribute("show-empty");
    this.wrapLabels = this.hasAttribute("wrap");
    this.hideClear = this.hasAttribute("hide-clear");
    if (this.hasAttribute("sort")) {
      const sortVal = this.getAttribute("sort");
      if (["default", "alphabetical", "count-desc", "count-asc"].includes(sortVal)) {
        this.sortOption = sortVal;
      }
    } else {
      this.sortOption = "default";
    }
    if (this.optionsEl) {
      this.optionsEl.setAttribute(
        "aria-multiselectable",
        this.singleSelect ? "false" : "true"
      );
    }
    const labelSpan = (_a2 = this.triggerEl) == null ? void 0 : _a2.querySelector(
      ".pf-dropdown-trigger-label"
    );
    if (labelSpan) {
      labelSpan.textContent = this.getAttribute("label") || this.filterName || "";
    }
    this.updateOptions();
  }
  cleanup() {
    var _a2;
    document.removeEventListener("click", this._handleClickOutside);
    (_a2 = this.instance) == null ? void 0 : _a2.deregisterAllShortcuts(this);
    this.focusedOptionEl = null;
    if (this.typeAheadTimeout) {
      clearTimeout(this.typeAheadTimeout);
    }
  }
};
if (!customElements.get("pagefind-filter-dropdown")) {
  customElements.define("pagefind-filter-dropdown", PagefindFilterDropdown);
}
var PagefindModal = class extends PagefindElement {
  constructor() {
    super();
    this.dialogEl = null;
    this.resetOnClose = false;
    this._isOpen = false;
    this._closeHandler = null;
  }
  static get observedAttributes() {
    return ["reset-on-close"];
  }
  init() {
    if (this.hasAttribute("reset-on-close")) {
      this.resetOnClose = this.getAttribute("reset-on-close") !== "false";
    }
    this.render();
  }
  render() {
    var _a2, _b;
    const hasChildren = this.children.length > 0;
    const children = hasChildren ? Array.from(this.children) : null;
    this.innerHTML = "";
    const dialogId = this.id || this.instance.generateId("pagefind-modal");
    const searchLabel = ((_a2 = this.instance) == null ? void 0 : _a2.translate("keyboard_search")) || "search";
    if (((_b = this.instance) == null ? void 0 : _b.direction) === "rtl") {
      this.setAttribute("dir", "rtl");
    } else {
      this.removeAttribute("dir");
    }
    this.dialogEl = document.createElement("dialog");
    this.dialogEl.className = "pf-modal";
    this.dialogEl.id = dialogId;
    this.dialogEl.setAttribute("aria-label", searchLabel);
    if (hasChildren && children) {
      children.forEach((child) => this.dialogEl.appendChild(child));
    } else {
      const inst = this.getAttribute("instance");
      const header = document.createElement("pagefind-modal-header");
      const input = document.createElement("pagefind-input");
      if (inst) input.setAttribute("instance", inst);
      header.appendChild(input);
      const body = document.createElement("pagefind-modal-body");
      const summary = document.createElement("pagefind-summary");
      const results = document.createElement("pagefind-results");
      if (inst) {
        summary.setAttribute("instance", inst);
        results.setAttribute("instance", inst);
      }
      body.append(summary, results);
      const footer = document.createElement("pagefind-modal-footer");
      const hints = document.createElement("pagefind-keyboard-hints");
      if (inst) hints.setAttribute("instance", inst);
      footer.appendChild(hints);
      this.dialogEl.append(header, body, footer);
    }
    this.appendChild(this.dialogEl);
    this.setupEventHandlers();
  }
  setupEventHandlers() {
    if (!this.dialogEl) return;
    this._closeHandler = () => {
      this._isOpen = false;
      this.handleClose();
    };
    this.dialogEl.addEventListener("close", this._closeHandler);
    this.dialogEl.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          this.close();
        }
      },
      true
    );
    this.dialogEl.addEventListener("click", (e) => {
      if (e.target === this.dialogEl) {
        this.close();
      }
    });
  }
  open() {
    var _a2, _b, _c;
    if (this._isOpen || !this.dialogEl) return;
    this._isOpen = true;
    this.dialogEl.showModal();
    const closeText = ((_a2 = this.instance) == null ? void 0 : _a2.translate("keyboard_close")) || "close";
    (_b = this.instance) == null ? void 0 : _b.registerShortcut(
      { label: "esc", description: closeText },
      this
    );
    requestAnimationFrame(() => {
      const input = this.querySelector(
        "pagefind-input"
      );
      if (input && typeof input.focus === "function") {
        input.focus();
      } else {
        const inputEl = this.querySelector("input");
        if (inputEl) {
          inputEl.focus();
        }
      }
    });
    const triggers = ((_c = this.instance) == null ? void 0 : _c.getUtilities("modal-trigger")) || [];
    triggers.forEach((t) => {
      var _a3;
      return (_a3 = t.buttonEl) == null ? void 0 : _a3.setAttribute("aria-expanded", "true");
    });
  }
  close() {
    if (!this._isOpen || !this.dialogEl) return;
    this.dialogEl.close();
  }
  handleClose() {
    var _a2, _b;
    (_a2 = this.instance) == null ? void 0 : _a2.deregisterAllShortcuts(this);
    if (this.resetOnClose && this.instance) {
      this.instance.triggerSearch("");
    }
    const triggers = ((_b = this.instance) == null ? void 0 : _b.getUtilities("modal-trigger")) || [];
    const trigger2 = triggers[0];
    if (trigger2 && typeof trigger2.handleModalClose === "function") {
      trigger2.handleModalClose();
    }
  }
  get isOpen() {
    return this._isOpen;
  }
  register(instance) {
    instance.registerUtility(this, "modal");
    instance.on(
      "translations",
      () => {
        const wasOpen = this._isOpen;
        this.render();
        if (wasOpen) {
          this.open();
        }
      },
      this
    );
  }
  reconcileAria() {
    var _a2;
    const triggers = ((_a2 = this.instance) == null ? void 0 : _a2.getUtilities("modal-trigger")) || [];
    triggers.forEach((t) => {
      var _a3;
      if (t.buttonEl && ((_a3 = this.dialogEl) == null ? void 0 : _a3.id)) {
        t.buttonEl.setAttribute("aria-controls", this.dialogEl.id);
      }
    });
  }
  cleanup() {
    var _a2;
    if (this.dialogEl && this._closeHandler) {
      this.dialogEl.removeEventListener("close", this._closeHandler);
    }
    (_a2 = this.instance) == null ? void 0 : _a2.deregisterAllShortcuts(this);
  }
  update() {
    if (this.hasAttribute("reset-on-close")) {
      this.resetOnClose = this.getAttribute("reset-on-close") !== "false";
    }
  }
};
if (!customElements.get("pagefind-modal")) {
  customElements.define("pagefind-modal", PagefindModal);
}
var _isMac = null;
function detectMac() {
  if (_isMac !== null) return _isMac;
  try {
    const uaData = navigator.userAgentData;
    if (uaData == null ? void 0 : uaData.platform) {
      _isMac = uaData.platform.toLowerCase().includes("mac");
      return _isMac;
    }
  } catch (e) {
  }
  _isMac = /mac/i.test(navigator.userAgent);
  return _isMac;
}
function parseKeyBinding(bindingStr) {
  const parts = bindingStr.toLowerCase().split("+");
  const binding = {
    mod: false,
    ctrl: false,
    shift: false,
    alt: false,
    meta: false,
    key: ""
  };
  for (const part of parts) {
    switch (part) {
      case "mod":
        binding.mod = true;
        break;
      case "ctrl":
        binding.ctrl = true;
        break;
      case "shift":
        binding.shift = true;
        break;
      case "alt":
        binding.alt = true;
        break;
      case "meta":
      case "cmd":
      case "command":
        binding.meta = true;
        break;
      default:
        binding.key = part;
    }
  }
  return binding;
}
function keyBindingMatches(binding, event) {
  const isMac = detectMac();
  const keyMatches = event.key.toLowerCase() === binding.key;
  const modCtrl = binding.mod ? !isMac : binding.ctrl;
  const modMeta = binding.mod ? isMac : binding.meta;
  const ctrlMatch = modCtrl ? event.ctrlKey : !event.ctrlKey;
  const metaMatch = modMeta ? event.metaKey : !event.metaKey;
  const shiftMatch = binding.shift ? event.shiftKey : !event.shiftKey;
  const altMatch = binding.alt ? event.altKey : !event.altKey;
  return keyMatches && ctrlMatch && metaMatch && shiftMatch && altMatch;
}
function getShortcutDisplay(binding) {
  const isMac = detectMac();
  const keys = [];
  const ariaParts = [];
  if (binding.mod) {
    keys.push(isMac ? "\u2318" : "Ctrl");
    ariaParts.push(isMac ? "Meta" : "Control");
  }
  if (binding.meta) {
    keys.push(isMac ? "\u2318" : "Win");
    ariaParts.push("Meta");
  }
  if (binding.ctrl) {
    keys.push("Ctrl");
    ariaParts.push("Control");
  }
  if (binding.shift) {
    keys.push("Shift");
    ariaParts.push("Shift");
  }
  if (binding.alt) {
    keys.push("Alt");
    ariaParts.push("Alt");
  }
  keys.push(binding.key.toUpperCase());
  ariaParts.push(binding.key);
  return { keys, aria: ariaParts.join("+") };
}
var PagefindModalTrigger = class extends PagefindElement {
  constructor() {
    super();
    this.buttonEl = null;
    this._userPlaceholder = null;
    this.shortcut = "mod+k";
    this.hideShortcut = false;
    this.compact = false;
    this._keydownHandler = null;
    this._keyBinding = null;
  }
  static get observedAttributes() {
    return ["placeholder", "shortcut", "hide-shortcut", "compact"];
  }
  get placeholder() {
    var _a2;
    return this._userPlaceholder || ((_a2 = this.instance) == null ? void 0 : _a2.translate("keyboard_search")) || "Search";
  }
  init() {
    this.readAttributes();
    this.render();
    this.setupKeyboardShortcut();
  }
  readAttributes() {
    if (this.hasAttribute("placeholder")) {
      this._userPlaceholder = this.getAttribute("placeholder");
    }
    if (this.hasAttribute("shortcut")) {
      this.shortcut = this.getAttribute("shortcut") || "mod+k";
    }
    if (this.hasAttribute("hide-shortcut")) {
      this.hideShortcut = this.getAttribute("hide-shortcut") !== "false";
    }
    if (this.hasAttribute("compact")) {
      this.compact = this.getAttribute("compact") !== "false";
    }
    this._keyBinding = parseKeyBinding(this.shortcut);
  }
  render() {
    var _a2;
    this.innerHTML = "";
    if (((_a2 = this.instance) == null ? void 0 : _a2.direction) === "rtl") {
      this.setAttribute("dir", "rtl");
    } else {
      this.removeAttribute("dir");
    }
    this.buttonEl = document.createElement("button");
    this.buttonEl.className = "pf-trigger-btn";
    this.buttonEl.type = "button";
    this.buttonEl.setAttribute("aria-haspopup", "dialog");
    this.buttonEl.setAttribute("aria-expanded", "false");
    this.buttonEl.setAttribute("aria-label", this.placeholder || "Search");
    if (this._keyBinding) {
      const display = getShortcutDisplay(this._keyBinding);
      this.buttonEl.setAttribute("aria-keyshortcuts", display.aria);
    }
    const icon = document.createElement("span");
    icon.className = "pf-trigger-icon";
    icon.setAttribute("aria-hidden", "true");
    this.buttonEl.appendChild(icon);
    if (!this.compact) {
      const text = document.createElement("span");
      text.className = "pf-trigger-text";
      text.textContent = this.placeholder;
      this.buttonEl.appendChild(text);
    }
    if (!this.hideShortcut && this._keyBinding) {
      const shortcutContainer = document.createElement("span");
      shortcutContainer.className = "pf-trigger-shortcut";
      shortcutContainer.setAttribute("aria-hidden", "true");
      const display = getShortcutDisplay(this._keyBinding);
      for (const keyText of display.keys) {
        const keyEl = document.createElement("span");
        keyEl.className = "pf-trigger-key";
        keyEl.textContent = keyText;
        shortcutContainer.appendChild(keyEl);
      }
      this.buttonEl.appendChild(shortcutContainer);
    }
    this.appendChild(this.buttonEl);
    this.buttonEl.addEventListener("click", () => {
      this.openModal();
    });
  }
  setupKeyboardShortcut() {
    this._keydownHandler = (e) => {
      if (!this._keyBinding || !keyBindingMatches(this._keyBinding, e)) return;
      const activeEl = document.activeElement;
      const isTyping = activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.isContentEditable);
      if (!isTyping) {
        e.preventDefault();
        this.openModal();
      }
    };
    document.addEventListener("keydown", this._keydownHandler);
  }
  openModal() {
    var _a2;
    const modals = ((_a2 = this.instance) == null ? void 0 : _a2.getUtilities("modal")) || [];
    const modal = modals[0];
    if (modal && typeof modal.open === "function") {
      modal.open();
      if (this.buttonEl) {
        this.buttonEl.setAttribute("aria-expanded", "true");
      }
    }
  }
  handleModalClose() {
    if (this.buttonEl) {
      this.buttonEl.setAttribute("aria-expanded", "false");
      this.buttonEl.focus();
    }
  }
  register(instance) {
    instance.registerUtility(this, "modal-trigger");
    instance.on(
      "translations",
      () => {
        this.render();
      },
      this
    );
  }
  reconcileAria() {
    var _a2, _b;
    const modals = ((_a2 = this.instance) == null ? void 0 : _a2.getUtilities("modal")) || [];
    const modal = modals[0];
    if (((_b = modal == null ? void 0 : modal.dialogEl) == null ? void 0 : _b.id) && this.buttonEl) {
      this.buttonEl.setAttribute("aria-controls", modal.dialogEl.id);
    }
  }
  cleanup() {
    if (this._keydownHandler) {
      document.removeEventListener("keydown", this._keydownHandler);
      this._keydownHandler = null;
    }
  }
  update() {
    this.readAttributes();
    this.render();
  }
};
if (!customElements.get("pagefind-modal-trigger")) {
  customElements.define("pagefind-modal-trigger", PagefindModalTrigger);
}
var PagefindModalHeader = class extends PagefindElement {
  constructor() {
    super(...arguments);
    this.closeBtn = null;
  }
  init() {
    var _a2;
    this.classList.add("pf-modal-header");
    const content = document.createElement("div");
    content.className = "pf-modal-header-content";
    while (this.firstChild) {
      content.appendChild(this.firstChild);
    }
    this.closeBtn = document.createElement("button");
    this.closeBtn.type = "button";
    this.closeBtn.className = "pf-modal-close";
    this.closeBtn.setAttribute(
      "aria-label",
      ((_a2 = this.instance) == null ? void 0 : _a2.translate("keyboard_close")) || "Close"
    );
    this.closeBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 5L5 15M5 5l10 10"/></svg>`;
    this.closeBtn.addEventListener("click", () => {
      const modal = this.closest("pagefind-modal");
      if (modal && typeof modal.close === "function") {
        modal.close();
      }
    });
    this.append(content, this.closeBtn);
  }
  register(instance) {
    instance.registerUtility(this, "modal-header");
    instance.on(
      "translations",
      () => {
        if (this.closeBtn) {
          this.closeBtn.setAttribute(
            "aria-label",
            instance.translate("keyboard_close") || "Close"
          );
        }
      },
      this
    );
  }
};
if (!customElements.get("pagefind-modal-header")) {
  customElements.define("pagefind-modal-header", PagefindModalHeader);
}
var PagefindModalBody = class extends PagefindElement {
  init() {
    this.classList.add("pf-modal-body");
    this.setAttribute("tabindex", "-1");
  }
  register(_instance) {
  }
};
if (!customElements.get("pagefind-modal-body")) {
  customElements.define("pagefind-modal-body", PagefindModalBody);
}
var PagefindModalFooter = class extends PagefindElement {
  init() {
    this.classList.add("pf-modal-footer");
  }
  register(_instance) {
  }
};
if (!customElements.get("pagefind-modal-footer")) {
  customElements.define("pagefind-modal-footer", PagefindModalFooter);
}
var PagefindKeyboardHints = class extends PagefindElement {
  init() {
    this.classList.add("pf-keyboard-hints");
    this.setAttribute("aria-hidden", "true");
  }
  render() {
    var _a2, _b;
    this.innerHTML = "";
    if (((_a2 = this.instance) == null ? void 0 : _a2.direction) === "rtl") {
      this.setAttribute("dir", "rtl");
    } else {
      this.removeAttribute("dir");
    }
    const shortcuts = ((_b = this.instance) == null ? void 0 : _b.getActiveShortcuts()) || [];
    if (shortcuts.length === 0) {
      return;
    }
    const seen = /* @__PURE__ */ new Set();
    for (const shortcut of shortcuts) {
      if (seen.has(shortcut.label)) continue;
      seen.add(shortcut.label);
      const hint = document.createElement("div");
      hint.className = "pf-keyboard-hint";
      const key = document.createElement("kbd");
      key.className = "pf-keyboard-key";
      key.textContent = shortcut.label;
      hint.appendChild(key);
      hint.appendChild(document.createTextNode(` ${shortcut.description}`));
      this.appendChild(hint);
    }
  }
  register(instance) {
    instance.registerUtility(this, "keyboard-hints");
    this.render();
    instance.on(
      "translations",
      () => {
        this.render();
      },
      this
    );
  }
};
if (!customElements.get("pagefind-keyboard-hints")) {
  customElements.define("pagefind-keyboard-hints", PagefindKeyboardHints);
}
var asyncSleep2 = (ms = 100) => new Promise((r) => setTimeout(r, ms));
var stampOptionAttributes = (root, resultIndex) => {
  const options = root.getAttribute("role") === "option" ? [root] : Array.from(root.querySelectorAll('[role="option"]'));
  for (let i = 0; i < options.length; i++) {
    options[i].setAttribute("data-pf-result-index", String(resultIndex));
    options[i].setAttribute("data-pf-option-offset", String(i));
  }
};
var templateNodes2 = (templateResult) => {
  if (templateResult instanceof Element) {
    return [templateResult];
  }
  if (Array.isArray(templateResult) && templateResult.every((r) => r instanceof Element)) {
    return templateResult;
  }
  if (typeof templateResult === "string" || templateResult instanceof String) {
    const wrap = document.createElement("div");
    wrap.innerHTML = templateResult;
    return [...wrap.childNodes];
  }
  console.error(
    `[Pagefind Searchbox]: Expected template to return HTML element or string, got ${typeof templateResult}`
  );
  return [];
};
var DEFAULT_RESULT_TEMPLATE2 = `{{#if and(options.show_sub_results, sub_results)}}<div class="pf-searchbox-group" role="group" aria-label="{{ meta.title | default('Untitled') }}">{{/if}}<a class="pf-searchbox-result" id="{{ aria.result_id }}" href="{{ meta.url | default(url) | safeUrl }}" role="option" aria-selected="false" aria-labelledby="{{ aria.title_id }}"{{#if excerpt}} aria-describedby="{{ aria.excerpt_id }}"{{/if}}>
  <p class="pf-searchbox-result-title" id="{{ aria.title_id }}">{{ meta.title | default("Untitled") }}</p>
  {{#if excerpt}}
  <p class="pf-searchbox-result-excerpt" id="{{ aria.excerpt_id }}">{{+ excerpt +}}</p>
  {{/if}}
</a>{{#if and(options.show_sub_results, sub_results)}}
{{#each sub_results as sub}}
<a class="pf-searchbox-result pf-searchbox-subresult" id="{{ sub.aria.result_id }}" href="{{ sub.url | safeUrl }}" role="option" aria-selected="false" aria-labelledby="{{ sub.aria.title_id }}"{{#if sub.excerpt}} aria-describedby="{{ sub.aria.excerpt_id }}"{{/if}}>
  <p class="pf-searchbox-result-title" id="{{ sub.aria.title_id }}">{{ sub.title | default("Section") }}</p>
  {{#if sub.excerpt}}
  <p class="pf-searchbox-result-excerpt" id="{{ sub.aria.excerpt_id }}">{{+ sub.excerpt +}}</p>
  {{/if}}
</a>
{{/each}}
</div>{{/if}}`;
var defaultResultTemplate2 = compile(
  DEFAULT_RESULT_TEMPLATE2
);
var DEFAULT_PLACEHOLDER_TEMPLATE2 = `<div class="pf-searchbox-result pf-searchbox-placeholder" aria-hidden="true">
  <p class="pf-searchbox-result-title pf-skeleton pf-skeleton-title"></p>
  <p class="pf-searchbox-result-excerpt pf-skeleton pf-skeleton-excerpt"></p>
</div>`;
var defaultPlaceholderTemplate2 = compile(
  DEFAULT_PLACEHOLDER_TEMPLATE2
);
var SearchboxResult = class {
  constructor(opts) {
    this.data = null;
    this.cachedOptions = null;
    this.loading = false;
    this.retryDelay = 0;
    this.observer = null;
    this.rawResult = opts.rawResult;
    this.placeholderEl = opts.placeholderEl;
    this.renderFn = opts.renderFn;
    this.intersectionRoot = opts.intersectionRoot;
    this.index = opts.index;
    this.onLoad = opts.onLoad;
    this.setupObserver();
  }
  setupObserver() {
    if (this.data !== null || this.observer !== null) return;
    const options = {
      root: this.intersectionRoot,
      rootMargin: "50px",
      // Start loading slightly before visible
      threshold: 0.01
    };
    this.observer = new IntersectionObserver((entries, obs) => {
      var _a2;
      if (this.data !== null) return;
      if ((_a2 = entries == null ? void 0 : entries[0]) == null ? void 0 : _a2.isIntersecting) {
        this.load();
        obs.disconnect();
        this.observer = null;
      }
    }, options);
    this.observer.observe(this.placeholderEl);
  }
  async load() {
    var _a2;
    if (this.data !== null || this.loading) return;
    this.loading = true;
    try {
      this.data = await this.rawResult.data();
      const templateResult = this.renderFn(this.data);
      const nodes = templateNodes2(templateResult);
      if (nodes.length > 0 && this.placeholderEl.parentNode) {
        const firstElement = nodes.find((n) => n instanceof Element);
        this.placeholderEl.replaceWith(...nodes);
        if (firstElement instanceof Element) {
          this.placeholderEl = firstElement;
          stampOptionAttributes(firstElement, this.index);
          this.cacheOptions();
        }
      }
    } catch (e) {
      await new Promise((r) => setTimeout(r, this.retryDelay || 100));
      this.retryDelay = Math.min((this.retryDelay || 100) * 2, 1e4);
      this.loading = false;
    }
    (_a2 = this.onLoad) == null ? void 0 : _a2.call(this);
  }
  cacheOptions() {
    if (!this.data || !this.placeholderEl) {
      this.cachedOptions = null;
      return;
    }
    if (this.placeholderEl.getAttribute("role") === "group") {
      this.cachedOptions = Array.from(
        this.placeholderEl.querySelectorAll('[role="option"]')
      );
    } else if (this.placeholderEl.getAttribute("role") === "option") {
      this.cachedOptions = [this.placeholderEl];
    } else {
      this.cachedOptions = [];
    }
  }
  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.cachedOptions = null;
  }
};
var PagefindSearchbox = class extends PagefindElement {
  constructor() {
    super();
    this.containerEl = null;
    this.inputEl = null;
    this.dropdownEl = null;
    this.resultsEl = null;
    this.statusEl = null;
    this.footerEl = null;
    this.isOpen = false;
    this.isLoading = false;
    this.results = [];
    this.activeIndex = -1;
    this.activeOptionOffset = 0;
    this.searchID = 0;
    this.searchTerm = "";
    this.pendingNavigation = 0;
    this.loadingAnnouncementTimeout = null;
    this.selectedEl = null;
    this._userPlaceholder = null;
    this.debounce = 150;
    this.autofocus = false;
    this.showSubResults = false;
    this.maxResults = 0;
    this.showKeyboardHints = true;
    this.shortcut = "mod+k";
    this.hideShortcut = false;
    this.resultTemplate = null;
    this.compiledResultTemplate = null;
    this.compiledPlaceholderTemplate = null;
    this._documentClickHandler = null;
    this._shortcutKeyHandler = null;
    this._keyBinding = null;
    this._shortcutEl = null;
  }
  static get observedAttributes() {
    return [
      "placeholder",
      "debounce",
      "autofocus",
      "show-sub-results",
      "max-results",
      "show-keyboard-hints",
      "shortcut",
      "hide-shortcut"
    ];
  }
  get placeholder() {
    var _a2;
    return this._userPlaceholder || ((_a2 = this.instance) == null ? void 0 : _a2.translate("placeholder")) || "Search...";
  }
  readAttributes() {
    if (this.hasAttribute("placeholder")) {
      this._userPlaceholder = this.getAttribute("placeholder");
    }
    if (this.hasAttribute("debounce")) {
      this.debounce = parseInt(this.getAttribute("debounce") || "150", 10) || 150;
    }
    if (this.hasAttribute("autofocus")) {
      this.autofocus = this.hasAttribute("autofocus");
    }
    if (this.hasAttribute("show-sub-results")) {
      this.showSubResults = this.getAttribute("show-sub-results") !== "false";
    }
    if (this.hasAttribute("max-results")) {
      this.maxResults = parseInt(this.getAttribute("max-results") || "0", 10);
    }
    if (this.hasAttribute("show-keyboard-hints")) {
      this.showKeyboardHints = this.getAttribute("show-keyboard-hints") !== "false";
    }
    if (this.hasAttribute("shortcut")) {
      this.shortcut = this.getAttribute("shortcut") || "mod+k";
    }
    if (this.hasAttribute("hide-shortcut")) {
      this.hideShortcut = this.getAttribute("hide-shortcut") !== "false";
    }
    this._keyBinding = parseKeyBinding(this.shortcut);
  }
  init() {
    this.readAttributes();
    this.checkForTemplates();
    this.render();
    this.setupOutsideClickHandler();
    this.setupShortcutHandler();
  }
  checkForTemplates() {
    const resultScript = this.querySelector(
      'script[type="text/pagefind-template"]:not([data-template]), script[type="text/pagefind-template"][data-template="result"]'
    );
    if (resultScript) {
      this.compiledResultTemplate = compile(
        (resultScript.textContent || "").trim()
      );
    }
    const placeholderScript = this.querySelector(
      'script[type="text/pagefind-template"][data-template="placeholder"]'
    );
    if (placeholderScript) {
      this.compiledPlaceholderTemplate = compile(
        (placeholderScript.textContent || "").trim()
      );
    }
  }
  getPlaceholder() {
    if (this.compiledPlaceholderTemplate) {
      return this.compiledPlaceholderTemplate({});
    }
    return defaultPlaceholderTemplate2({});
  }
  render() {
    var _a2, _b;
    const savedScripts = [];
    this.querySelectorAll('script[type="text/pagefind-template"]').forEach(
      (s) => {
        savedScripts.push(s);
      }
    );
    this.innerHTML = "";
    savedScripts.forEach((s) => this.appendChild(s));
    const inputId = this.instance.generateId("pf-sb-input");
    const resultsId = this.instance.generateId("pf-sb-results");
    this.containerEl = document.createElement("div");
    this.containerEl.className = "pf-searchbox";
    this.appendChild(this.containerEl);
    const inputWrapper = document.createElement("div");
    inputWrapper.className = "pf-searchbox-input-wrapper";
    this.containerEl.appendChild(inputWrapper);
    this.inputEl = document.createElement("input");
    this.inputEl.id = inputId;
    this.inputEl.className = "pf-searchbox-input";
    this.inputEl.type = "text";
    this.inputEl.setAttribute("role", "combobox");
    this.inputEl.setAttribute("aria-autocomplete", "list");
    this.inputEl.setAttribute("aria-controls", resultsId);
    this.inputEl.setAttribute("aria-expanded", "false");
    this.inputEl.setAttribute("autocomplete", "off");
    this.inputEl.setAttribute("autocapitalize", "none");
    this.inputEl.placeholder = this.placeholder;
    if (this.autofocus) {
      this.inputEl.setAttribute("autofocus", "autofocus");
    }
    inputWrapper.appendChild(this.inputEl);
    if (!this.hideShortcut && this._keyBinding) {
      this._shortcutEl = document.createElement("span");
      this._shortcutEl.className = "pf-trigger-shortcut";
      this._shortcutEl.setAttribute("aria-hidden", "true");
      const display = getShortcutDisplay(this._keyBinding);
      for (const keyText of display.keys) {
        const keyEl = document.createElement("span");
        keyEl.className = "pf-trigger-key";
        keyEl.textContent = keyText;
        this._shortcutEl.appendChild(keyEl);
      }
      inputWrapper.appendChild(this._shortcutEl);
      this.inputEl.setAttribute("aria-keyshortcuts", display.aria);
    }
    this.dropdownEl = document.createElement("div");
    this.dropdownEl.className = "pf-searchbox-dropdown";
    this.containerEl.appendChild(this.dropdownEl);
    const resultsLabel = ((_a2 = this.instance) == null ? void 0 : _a2.translate("results_label")) || "Search results";
    if (((_b = this.instance) == null ? void 0 : _b.direction) === "rtl") {
      this.setAttribute("dir", "rtl");
    } else {
      this.removeAttribute("dir");
    }
    this.resultsEl = document.createElement("div");
    this.resultsEl.id = resultsId;
    this.resultsEl.className = "pf-searchbox-results";
    this.resultsEl.setAttribute("role", "listbox");
    this.resultsEl.setAttribute("aria-label", resultsLabel);
    this.dropdownEl.appendChild(this.resultsEl);
    this.statusEl = document.createElement("div");
    this.statusEl.className = "pf-searchbox-status";
    this.statusEl.hidden = true;
    this.dropdownEl.appendChild(this.statusEl);
    if (this.showKeyboardHints) {
      this.footerEl = document.createElement("div");
      this.footerEl.className = "pf-searchbox-footer";
      this.footerEl.setAttribute("aria-hidden", "true");
      this.dropdownEl.appendChild(this.footerEl);
      this.renderFooterHints();
    }
    this.setupEventHandlers();
  }
  renderFooterHints() {
    var _a2, _b, _c;
    if (!this.footerEl) return;
    this.footerEl.innerHTML = "";
    const navigateText = ((_a2 = this.instance) == null ? void 0 : _a2.translate("keyboard_navigate")) || "navigate";
    const selectText = ((_b = this.instance) == null ? void 0 : _b.translate("keyboard_select")) || "select";
    const closeText = ((_c = this.instance) == null ? void 0 : _c.translate("keyboard_close")) || "close";
    const navHint = document.createElement("div");
    navHint.className = "pf-searchbox-footer-hint";
    const navKeyUp = document.createElement("span");
    navKeyUp.className = "pf-searchbox-footer-key";
    navKeyUp.textContent = "\u2191";
    navHint.appendChild(navKeyUp);
    const navKeyDown = document.createElement("span");
    navKeyDown.className = "pf-searchbox-footer-key";
    navKeyDown.textContent = "\u2193";
    navHint.appendChild(navKeyDown);
    navHint.appendChild(document.createTextNode(` ${navigateText}`));
    this.footerEl.appendChild(navHint);
    const selectHint = document.createElement("div");
    selectHint.className = "pf-searchbox-footer-hint";
    const selectKey = document.createElement("span");
    selectKey.className = "pf-searchbox-footer-key";
    selectKey.textContent = "\u21B5";
    selectHint.appendChild(selectKey);
    selectHint.appendChild(document.createTextNode(` ${selectText}`));
    this.footerEl.appendChild(selectHint);
    const closeHint = document.createElement("div");
    closeHint.className = "pf-searchbox-footer-hint";
    const closeKey = document.createElement("span");
    closeKey.className = "pf-searchbox-footer-key";
    closeKey.textContent = "esc";
    closeHint.appendChild(closeKey);
    closeHint.appendChild(document.createTextNode(` ${closeText}`));
    this.footerEl.appendChild(closeHint);
  }
  setupEventHandlers() {
    if (!this.inputEl || !this.resultsEl) return;
    this.inputEl.addEventListener("input", async (e) => {
      var _a2, _b;
      const value = e.target.value;
      this.searchTerm = value;
      if (!value || !value.trim()) {
        this.closeDropdown();
        this.results = [];
        (_a2 = this.instance) == null ? void 0 : _a2.triggerSearch("");
        return;
      }
      this.openDropdown();
      this.showLoadingState();
      const thisSearchID = ++this.searchID;
      await asyncSleep2(this.debounce);
      if (thisSearchID !== this.searchID) {
        return;
      }
      (_b = this.instance) == null ? void 0 : _b.triggerSearch(value);
    });
    this.inputEl.addEventListener("keydown", (e) => {
      var _a2, _b, _c;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!this.isOpen && ((_a2 = this.inputEl) == null ? void 0 : _a2.value.trim())) {
            this.openDropdown();
          }
          if (this.isOpen && this.results.length > 0) {
            this.moveSelection(1);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (this.isOpen && this.results.length > 0) {
            this.moveSelection(-1);
          }
          break;
        case "Enter":
          if (this.isOpen && this.activeIndex >= 0) {
            e.preventDefault();
            this.activateCurrentSelection(e);
          } else if (!this.isOpen && ((_b = this.inputEl) == null ? void 0 : _b.value.trim())) {
            e.preventDefault();
            this.openDropdown();
            if (this.results.length > 0) {
              this.rerenderLoadedResults();
              this.activeIndex = 0;
              this.activeOptionOffset = 0;
              this.updateSelectionUI();
            } else {
              (_c = this.instance) == null ? void 0 : _c.triggerSearch(this.inputEl.value);
            }
          }
          break;
        case "Escape":
          this.pendingNavigation = 0;
          this.clearLoadingAnnouncement();
          if (this.isOpen) {
            e.preventDefault();
            this.closeDropdown();
          }
          break;
        case "Tab":
          this.pendingNavigation = 0;
          this.clearLoadingAnnouncement();
          if (this.isOpen) {
            this.closeDropdown();
          }
          break;
      }
    });
    this.inputEl.addEventListener("focus", () => {
      var _a2;
      (_a2 = this.instance) == null ? void 0 : _a2.triggerLoad();
    });
    this.resultsEl.addEventListener("click", (e) => {
      const resultLink = e.target.closest("a");
      if (resultLink) {
        this.closeDropdown();
      }
    });
    this.resultsEl.addEventListener("mousemove", (e) => {
      const resultLink = e.target.closest("a");
      if (resultLink) {
        const pos = this.getResultAndOffsetFromElement(resultLink);
        if (pos && (pos.resultIndex !== this.activeIndex || pos.optionOffset !== this.activeOptionOffset)) {
          this.activeIndex = pos.resultIndex;
          this.activeOptionOffset = pos.optionOffset;
          this.updateSelectionUI(false);
        }
      }
    });
  }
  setupOutsideClickHandler() {
    this._documentClickHandler = (e) => {
      if (this.isOpen && !this.contains(e.target)) {
        this.closeDropdown();
      }
    };
    document.addEventListener("click", this._documentClickHandler);
  }
  setupShortcutHandler() {
    if (!this._keyBinding) return;
    this._shortcutKeyHandler = (e) => {
      var _a2;
      if (!this._keyBinding || !keyBindingMatches(this._keyBinding, e)) return;
      const activeEl = document.activeElement;
      const isTyping = activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.isContentEditable);
      if (!isTyping) {
        e.preventDefault();
        (_a2 = this.inputEl) == null ? void 0 : _a2.focus();
      }
    };
    document.addEventListener("keydown", this._shortcutKeyHandler);
  }
  openDropdown() {
    if (this.isOpen || !this.containerEl || !this.inputEl) return;
    this.isOpen = true;
    this.containerEl.classList.add("open");
    this.inputEl.setAttribute("aria-expanded", "true");
  }
  closeDropdown() {
    if (!this.isOpen || !this.containerEl || !this.inputEl) return;
    this.isOpen = false;
    this.pendingNavigation = 0;
    this.clearLoadingAnnouncement();
    this.containerEl.classList.remove("open");
    this.inputEl.setAttribute("aria-expanded", "false");
    this.inputEl.removeAttribute("aria-activedescendant");
    this.activeIndex = -1;
    this.activeOptionOffset = 0;
    this.selectedEl = null;
  }
  showLoadingState() {
    var _a2;
    if (!this.resultsEl || !this.statusEl) return;
    this.isLoading = true;
    this.resultsEl.innerHTML = "";
    this.selectedEl = null;
    this.resultsEl.setAttribute("aria-busy", "true");
    const searchingText = ((_a2 = this.instance) == null ? void 0 : _a2.translate("searching", { SEARCH_TERM: this.searchTerm })) || "Searching...";
    this.statusEl.textContent = searchingText;
    this.statusEl.className = "pf-searchbox-status pf-searchbox-loading";
    this.statusEl.hidden = false;
  }
  showEmptyState() {
    var _a2, _b;
    if (!this.resultsEl || !this.statusEl) return;
    this.resultsEl.innerHTML = "";
    this.selectedEl = null;
    this.resultsEl.removeAttribute("aria-busy");
    const noResultsText = ((_a2 = this.instance) == null ? void 0 : _a2.translate("zero_results", {
      SEARCH_TERM: this.searchTerm
    })) || `No results for "${this.searchTerm}"`;
    this.statusEl.textContent = noResultsText;
    this.statusEl.className = "pf-searchbox-status pf-searchbox-empty";
    this.statusEl.hidden = false;
    (_b = this.instance) == null ? void 0 : _b.announce(
      "zero_results",
      { SEARCH_TERM: this.searchTerm },
      "assertive"
    );
  }
  getOptionsForResult(result) {
    if (result.cachedOptions !== null) return result.cachedOptions;
    if (!result.data || !result.placeholderEl) return [];
    if (result.placeholderEl.getAttribute("role") === "group") {
      return Array.from(
        result.placeholderEl.querySelectorAll('[role="option"]')
      );
    }
    if (result.placeholderEl.getAttribute("role") === "option") {
      return [result.placeholderEl];
    }
    return [];
  }
  moveSelection(delta) {
    const totalResults = this.results.length;
    if (totalResults === 0) return;
    if (delta < 0) {
      if (this.activeIndex === -1) return;
      if (this.activeOptionOffset > 0) {
        this.activeOptionOffset--;
        this.pendingNavigation = 0;
        this.clearLoadingAnnouncement();
        this.updateSelectionUI(true);
        return;
      }
      const prevIndex = this.activeIndex - 1;
      if (prevIndex < 0) {
        this.pendingNavigation = 0;
        this.clearLoadingAnnouncement();
        this.activeIndex = -1;
        this.activeOptionOffset = 0;
        this.updateSelectionUI(true);
        return;
      }
      const prevResult = this.results[prevIndex];
      if (!prevResult || !prevResult.data) return;
      const prevOptions = this.getOptionsForResult(prevResult);
      this.activeIndex = prevIndex;
      this.activeOptionOffset = Math.max(0, prevOptions.length - 1);
      this.pendingNavigation = 0;
      this.clearLoadingAnnouncement();
      this.updateSelectionUI(true);
      this.preloadAhead(prevIndex, delta);
      return;
    }
    if (this.activeIndex === -1) {
      if (this.results[0] && !this.results[0].data) {
        this.pendingNavigation += delta;
        this.results[0].load();
        this.scheduleLoadingAnnouncement();
        this.preloadAhead(0, delta);
        return;
      }
      this.activeIndex = 0;
      this.activeOptionOffset = 0;
      this.pendingNavigation = 0;
      this.clearLoadingAnnouncement();
      this.updateSelectionUI(true);
      this.preloadAhead(0, delta);
      return;
    }
    const currentResult = this.results[this.activeIndex];
    if (!(currentResult == null ? void 0 : currentResult.data)) {
      if (currentResult) {
        this.pendingNavigation += delta;
        currentResult.load();
        this.scheduleLoadingAnnouncement();
        this.preloadAhead(this.activeIndex, delta);
      }
      return;
    }
    const currentOptions = this.getOptionsForResult(currentResult);
    if (this.activeOptionOffset < currentOptions.length - 1) {
      this.activeOptionOffset++;
      this.pendingNavigation = 0;
      this.clearLoadingAnnouncement();
      this.updateSelectionUI(true);
      return;
    }
    const nextIndex = this.activeIndex + 1;
    if (nextIndex >= totalResults) return;
    const nextResult = this.results[nextIndex];
    if (nextResult && !nextResult.data) {
      this.pendingNavigation += delta;
      nextResult.load();
      this.scheduleLoadingAnnouncement();
      this.preloadAhead(nextIndex, delta);
      return;
    }
    this.activeIndex = nextIndex;
    this.activeOptionOffset = 0;
    this.pendingNavigation = 0;
    this.clearLoadingAnnouncement();
    this.updateSelectionUI(true);
    this.preloadAhead(nextIndex, delta);
  }
  preloadAhead(fromIndex, direction45) {
    const step = direction45 > 0 ? 1 : -1;
    const count = Math.abs(this.pendingNavigation) + 3;
    for (let i = 1; i <= count; i++) {
      const idx = fromIndex + step * i;
      if (idx >= 0 && idx < this.results.length) {
        const result = this.results[idx];
        if (result && !result.data) {
          result.load();
        }
      }
    }
  }
  scheduleLoadingAnnouncement() {
    if (this.loadingAnnouncementTimeout) return;
    this.loadingAnnouncementTimeout = window.setTimeout(() => {
      var _a2;
      this.loadingAnnouncementTimeout = null;
      (_a2 = this.instance) == null ? void 0 : _a2.announce("loading", {}, "polite");
    }, 800);
  }
  clearLoadingAnnouncement() {
    if (this.loadingAnnouncementTimeout) {
      clearTimeout(this.loadingAnnouncementTimeout);
      this.loadingAnnouncementTimeout = null;
    }
  }
  handleResultLoaded() {
    this.clearLoadingAnnouncement();
    if (this.pendingNavigation === 0) {
      this.updateSelectionUI();
      return;
    }
    const direction45 = this.pendingNavigation > 0 ? 1 : -1;
    let currentResultIndex = this.activeIndex;
    let currentOffset = this.activeOptionOffset;
    while (this.pendingNavigation !== 0) {
      if (direction45 > 0) {
        const currentResult = this.results[currentResultIndex];
        if (currentResult == null ? void 0 : currentResult.data) {
          const options = this.getOptionsForResult(currentResult);
          if (currentOffset < options.length - 1) {
            currentOffset++;
            this.pendingNavigation--;
            continue;
          }
        }
        const nextIdx = currentResultIndex + 1;
        if (nextIdx >= this.results.length) {
          this.pendingNavigation = 0;
          break;
        }
        const nextResult = this.results[nextIdx];
        if (nextResult == null ? void 0 : nextResult.data) {
          currentResultIndex = nextIdx;
          currentOffset = 0;
          this.pendingNavigation--;
        } else {
          if (nextResult) {
            nextResult.load();
            this.scheduleLoadingAnnouncement();
            this.preloadAhead(nextIdx, direction45);
          }
          break;
        }
      } else {
        if (currentOffset > 0) {
          currentOffset--;
          this.pendingNavigation++;
          continue;
        }
        const prevIdx = currentResultIndex - 1;
        if (prevIdx < 0) {
          this.pendingNavigation = 0;
          break;
        }
        const prevResult = this.results[prevIdx];
        if (prevResult == null ? void 0 : prevResult.data) {
          const prevOptions = this.getOptionsForResult(prevResult);
          currentResultIndex = prevIdx;
          currentOffset = Math.max(0, prevOptions.length - 1);
          this.pendingNavigation++;
        } else {
          break;
        }
      }
    }
    if (currentResultIndex !== this.activeIndex || currentOffset !== this.activeOptionOffset) {
      this.activeIndex = currentResultIndex;
      this.activeOptionOffset = currentOffset;
      this.updateSelectionUI(true);
    }
  }
  updateSelectionUI(scroll = false) {
    if (!this.resultsEl || !this.inputEl) return;
    if (this.selectedEl) {
      this.selectedEl.removeAttribute("data-pf-selected");
      this.selectedEl.setAttribute("aria-selected", "false");
      this.selectedEl = null;
    }
    const result = this.activeIndex >= 0 ? this.results[this.activeIndex] : null;
    const options = result ? this.getOptionsForResult(result) : [];
    const activeEl = options[this.activeOptionOffset];
    if (activeEl) {
      activeEl.setAttribute("data-pf-selected", "");
      activeEl.setAttribute("aria-selected", "true");
      this.selectedEl = activeEl;
      this.inputEl.setAttribute("aria-activedescendant", activeEl.id);
      if (scroll) {
        this.scrollToCenter(activeEl);
      }
    } else {
      this.inputEl.removeAttribute("aria-activedescendant");
    }
  }
  scrollToCenter(el) {
    if (!this.resultsEl) return;
    const container = this.resultsEl;
    const elTop = el.offsetTop;
    const elHeight = el.offsetHeight;
    const containerHeight = container.clientHeight;
    const targetScroll = elTop - containerHeight / 2 + elHeight / 2;
    container.scrollTo({ top: targetScroll, behavior: "smooth" });
  }
  getResultAndOffsetFromElement(el) {
    const option = el.closest("[data-pf-result-index]");
    if (!option) return null;
    const resultIndex = parseInt(
      option.getAttribute("data-pf-result-index"),
      10
    );
    const optionOffset = parseInt(
      option.getAttribute("data-pf-option-offset") || "0",
      10
    );
    if (Number.isNaN(resultIndex) || Number.isNaN(optionOffset)) return null;
    return { resultIndex, optionOffset };
  }
  activateCurrentSelection(keyboardEvent) {
    if (this.activeIndex < 0 || this.activeIndex >= this.results.length) return;
    const result = this.results[this.activeIndex];
    if (!result || !result.data) return;
    const options = this.getOptionsForResult(result);
    const activeEl = options[this.activeOptionOffset];
    if (!activeEl || !activeEl.href) return;
    if (keyboardEvent.metaKey || keyboardEvent.ctrlKey) {
      window.open(activeEl.href, "_blank");
    } else if (keyboardEvent.shiftKey) {
      window.open(activeEl.href, "_blank");
    } else {
      window.location.href = activeEl.href;
    }
    this.closeDropdown();
  }
  handleResults(searchResult) {
    this.isLoading = false;
    if (this.resultsEl) {
      this.resultsEl.removeAttribute("aria-busy");
    }
    if (this.statusEl) {
      this.statusEl.hidden = true;
    }
    for (const result of this.results) {
      result.cleanup();
    }
    this.pendingNavigation = 0;
    this.clearLoadingAnnouncement();
    if (!searchResult.results || searchResult.results.length === 0) {
      this.results = [];
      this.showEmptyState();
      return;
    }
    const limitedResults = this.maxResults > 0 ? searchResult.results.slice(0, this.maxResults) : searchResult.results;
    if (this.resultsEl) {
      this.resultsEl.innerHTML = "";
      this.selectedEl = null;
    }
    const renderer = this.getResultRenderer();
    this.results = limitedResults.map((rawResult, index) => {
      const placeholderHtml = this.getPlaceholder();
      const placeholderNodes = templateNodes2(placeholderHtml);
      const placeholderEl = placeholderNodes[0];
      if (this.resultsEl && placeholderEl) {
        this.resultsEl.appendChild(placeholderEl);
      }
      const result = new SearchboxResult({
        rawResult,
        placeholderEl,
        renderFn: renderer,
        intersectionRoot: this.resultsEl,
        index,
        onLoad: () => {
          if (this.results[index] === result) {
            this.handleResultLoaded();
          }
        }
      });
      return result;
    });
    this.activeIndex = 0;
    this.activeOptionOffset = 0;
    this.updateSelectionUI();
    this.announceResults();
  }
  buildTemplateData(result) {
    const subResults = this.showSubResults ? this.instance.getDisplaySubResults(result) : [];
    const resultId = this.instance.generateId("pf-sb-result");
    return {
      meta: result.meta || {},
      excerpt: result.excerpt || "",
      url: result.url || "",
      sub_results: subResults.map((sr) => {
        const subResultId = this.instance.generateId("pf-sb-result");
        return {
          title: sr.title,
          url: sr.url,
          excerpt: sr.excerpt,
          aria: {
            result_id: subResultId,
            title_id: `${subResultId}-title`,
            excerpt_id: `${subResultId}-excerpt`
          }
        };
      }),
      options: {
        show_sub_results: this.showSubResults
      },
      aria: {
        result_id: resultId,
        title_id: `${resultId}-title`,
        excerpt_id: `${resultId}-excerpt`
      }
    };
  }
  /**
   * Returns the render function for results.
   * Priority: JS function > script template > default template
   */
  getResultRenderer() {
    if (this.resultTemplate) {
      return this.resultTemplate;
    }
    if (this.compiledResultTemplate) {
      const template = this.compiledResultTemplate;
      return (result) => {
        const data = this.buildTemplateData(result);
        return template(data);
      };
    }
    return (result) => {
      const data = this.buildTemplateData(result);
      return defaultResultTemplate2(data);
    };
  }
  rerenderLoadedResults() {
    if (!this.resultsEl) return;
    this.resultsEl.innerHTML = "";
    this.selectedEl = null;
    for (let i = 0; i < this.results.length; i++) {
      const result = this.results[i];
      if (result.data) {
        const templateData = this.buildTemplateData(result.data);
        let templateResult;
        if (this.resultTemplate) {
          templateResult = this.resultTemplate(result.data);
        } else if (this.compiledResultTemplate) {
          templateResult = this.compiledResultTemplate(templateData);
        } else {
          templateResult = defaultResultTemplate2(templateData);
        }
        const nodes = templateNodes2(templateResult);
        for (const node of nodes) {
          if (node instanceof Element) {
            this.resultsEl.appendChild(node);
            result.placeholderEl = node;
            stampOptionAttributes(node, i);
            result.cacheOptions();
            break;
          }
        }
        for (const node of nodes.slice(1)) {
          this.resultsEl.appendChild(node);
        }
      } else {
        const placeholderHtml = this.getPlaceholder();
        const placeholderNodes = templateNodes2(placeholderHtml);
        const placeholderEl = placeholderNodes[0];
        if (placeholderEl) {
          this.resultsEl.appendChild(placeholderEl);
          result.placeholderEl = placeholderEl;
          result.cleanup();
          result.setupObserver();
        }
      }
    }
  }
  announceResults() {
    var _a2, _b;
    const count = this.results.length;
    if (count === 0) {
      (_a2 = this.instance) == null ? void 0 : _a2.announce(
        "zero_results",
        { SEARCH_TERM: this.searchTerm },
        "assertive"
      );
    } else {
      const key = count === 1 ? "one_result" : "many_results";
      (_b = this.instance) == null ? void 0 : _b.announce(key, {
        SEARCH_TERM: this.searchTerm,
        COUNT: count
      });
    }
  }
  register(instance) {
    instance.registerInput(this, {
      keyboardNavigation: true
    });
    instance.registerResults(this, {
      keyboardNavigation: true,
      announcements: true
    });
    instance.on(
      "loading",
      () => {
        if (this.searchTerm && this.searchTerm.trim()) {
          this.openDropdown();
          this.showLoadingState();
        }
      },
      this
    );
    instance.on(
      "results",
      (results) => {
        this.handleResults(results);
      },
      this
    );
    instance.on(
      "error",
      (error) => {
        const err = error;
        this.isLoading = false;
        const errorText = instance.translate("error_search") || "Search failed";
        this.showError({
          message: err.message || errorText,
          details: err.bundlePath ? `Bundle path: ${err.bundlePath}` : void 0
        });
        instance.announce("error_search", {}, "assertive");
      },
      this
    );
    instance.on(
      "search",
      (term) => {
        if (this.inputEl && document.activeElement !== this.inputEl) {
          this.inputEl.value = term;
          this.searchTerm = term;
        }
      },
      this
    );
    instance.on(
      "translations",
      () => {
        var _a2;
        const currentValue = ((_a2 = this.inputEl) == null ? void 0 : _a2.value) || "";
        const wasOpen = this.isOpen;
        this.render();
        if (this.inputEl && currentValue) {
          this.inputEl.value = currentValue;
        }
        if (wasOpen) {
          this.openDropdown();
          if (this.results.length > 0) {
            this.rerenderLoadedResults();
            this.updateSelectionUI();
          }
        }
      },
      this
    );
  }
  cleanup() {
    this.clearLoadingAnnouncement();
    for (const result of this.results) {
      result.cleanup();
    }
    this.results = [];
    this.selectedEl = null;
    if (this._documentClickHandler) {
      document.removeEventListener("click", this._documentClickHandler);
      this._documentClickHandler = null;
    }
    if (this._shortcutKeyHandler) {
      document.removeEventListener("keydown", this._shortcutKeyHandler);
      this._shortcutKeyHandler = null;
    }
  }
  update() {
    this.readAttributes();
    if (this._documentClickHandler) {
      document.removeEventListener("click", this._documentClickHandler);
      this._documentClickHandler = null;
    }
    if (this._shortcutKeyHandler) {
      document.removeEventListener("keydown", this._shortcutKeyHandler);
      this._shortcutKeyHandler = null;
    }
    this.render();
    this.setupOutsideClickHandler();
    this.setupShortcutHandler();
  }
  focus() {
    if (this.inputEl) {
      this.inputEl.focus();
    }
  }
};
if (!customElements.get("pagefind-searchbox")) {
  customElements.define("pagefind-searchbox", PagefindSearchbox);
}
registerFunction("resolveUrl", (url, pageUrl) => {
  const s = String(url != null ? url : "");
  if (!s || /^[a-z][a-z0-9+.-]*:/i.test(s) || /^\/\//.test(s) || s.startsWith("/")) return s;
  try {
    return new URL(s, new URL(String(pageUrl != null ? pageUrl : "/"), "https://p")).pathname;
  } catch (e) {
    return s;
  }
});
if (typeof window !== "undefined") {
  window.PagefindComponents = components_exports;
}

// docs/assets/js/index.js
var application = new Application();
var _a;
application.context = ((_a = window == null ? void 0 : window.application) == null ? void 0 : _a.context) || {};
window.application = application;
application.start();
var QuickSearchButton = class extends HTMLElement {
  constructor() {
    super();
    const instance = window.PagefindComponents.getInstanceManager().getInstance("default");
    instance.registerUtility(this, "modal-trigger");
    this.addEventListener("click", () => {
      var _a2;
      return (_a2 = instance.getUtilities("modal")[0]) == null ? void 0 : _a2.open();
    });
  }
  handleModalClose() {
    var _a2;
    (_a2 = this.buttonEl) == null ? void 0 : _a2.focus();
  }
};
customElements.define("quick-search-button", QuickSearchButton);
var ColorSwitcherController = class extends Controller {
  constructor() {
    super(...arguments);
    __publicField(this, "handleShortcut", (event) => {
      if (event.key === "\\" && !event.composedPath().some((el) => {
        var _a2, _b, _c;
        return ["input", "textarea"].includes((_a2 = el == null ? void 0 : el.tagName) == null ? void 0 : _a2.toLowerCase()) || ((_b = el.hasAttribute) == null ? void 0 : _b.call(el, "contenteditable")) || ((_c = el.getAttribute) == null ? void 0 : _c.call(el, "role")) === "textbox";
      })) {
        event.preventDefault();
        window.application.context.color.toggleMode();
      }
    });
  }
  connectedCallback() {
    document.addEventListener("keydown", this.handleShortcut);
  }
  disconnectedCallback() {
    document.removeEventListener("keydown", this.handleShortcut);
  }
};
__publicField(ColorSwitcherController, "controllerName", "color-switcher");
application.register(ColorSwitcherController);
application.register(ScrollSpyController);
function getMenu(root = document) {
  return root.querySelector("wa-page").shadowRoot.querySelector("[part~='menu']");
}
function updateMenu(root = document) {
  const menu = getMenu(root);
  if (!menu) {
    return;
  }
  let scrollPosition = sessionStorage.getItem(menuKey);
  if (scrollPosition) {
    scrollPosition = JSON.parse(scrollPosition);
    menu.scrollTop = scrollPosition.scrollTop;
    menu.scrollLeft = scrollPosition.scrollLeft;
  }
}
function updatePage(body) {
  const currentPage = document.querySelector("wa-page");
  const newPage = body.querySelector("wa-page");
  if (currentPage && newPage) {
    driveShaft.replacer.syncAttributes(currentPage, newPage);
  }
  newPage.view = "desktop";
}
var menuKey = "scroll:menu";
function storeScrollPosition(e) {
  const menu = getMenu();
  if (!menu) {
    return;
  }
  const scrollPosition = {
    scrollTop: menu.scrollTop,
    scrollLeft: menu.scrollLeft
  };
  sessionStorage.setItem(menuKey, JSON.stringify(scrollPosition));
}
["navigate", "pagehide", "driveshaft:navigation-start"].forEach((eventName) => {
  window.addEventListener(eventName, storeScrollPosition);
});
function handleBodySwap(e) {
  var _a2, _b;
  const newBody = e.newBody;
  document.querySelectorAll("dialog.pf-modal[open]").forEach((d) => d.close());
  const instanceManager2 = (_b = (_a2 = window.PagefindComponents) == null ? void 0 : _a2.getInstanceManager) == null ? void 0 : _b.call(_a2);
  if (instanceManager2) {
    instanceManager2.instances.clear();
  }
  document.documentElement.classList.remove("js-loaded");
  updateMenu(newBody);
  updatePage(newBody);
  const { light, dark, mode } = application.context.color;
  application.reconcile();
}
document.addEventListener("driveshaft:before-replace", handleBodySwap);
function restoreScrollPosition(e) {
  const currentPage = document.querySelector("wa-page");
  updateMenu();
  customElements.whenDefined("wa-page").then(() => {
    currentPage.updateComplete.then(() => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          updateMenu();
          document.documentElement.classList.add("js-loaded");
        });
      }, 50);
    });
  });
}
["pageshow", "DOMContentLoaded", "driveshaft:after-replace"].forEach((eventName) => {
  window.addEventListener(eventName, restoreScrollPosition);
});
setTimeout(() => document.documentElement.classList.add("js-loaded"), 50);
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
