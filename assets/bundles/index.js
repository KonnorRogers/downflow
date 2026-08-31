import {
  Application,
  Controller
} from "./chunk-CNMVXYPG.js";
import {
  __objRest,
  __publicField,
  __spreadProps,
  __spreadValues,
  __yieldStar
} from "./chunk-UKNFP365.js";

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
      const id3 = decodeURIComponent(link.hash.slice(1));
      const heading = id3 && document.getElementById(id3);
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

// node_modules/lit-html/lit-html.js
var t = globalThis;
var i = (t6) => t6;
var s = t.trustedTypes;
var e = s ? s.createPolicy("lit-html", { createHTML: (t6) => t6 }) : void 0;
var h = "$lit$";
var o = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n = "?" + o;
var r = `<${n}>`;
var l = document;
var c = () => l.createComment("");
var a = (t6) => null === t6 || "object" != typeof t6 && "function" != typeof t6;
var u = Array.isArray;
var d = (t6) => u(t6) || "function" == typeof (t6 == null ? void 0 : t6[Symbol.iterator]);
var f = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y = /^(?:script|style|textarea|title)$/i;
var x = (t6) => (i9, ...s5) => ({ _$litType$: t6, strings: i9, values: s5 });
var b = x(1);
var w = x(2);
var T = x(3);
var E = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l.createTreeWalker(l, 129);
function V(t6, i9) {
  if (!u(t6) || !t6.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e ? e.createHTML(i9) : i9;
}
var N = (t6, i9) => {
  const s5 = t6.length - 1, e10 = [];
  let n7, l7 = 2 === i9 ? "<svg>" : 3 === i9 ? "<math>" : "", c6 = v;
  for (let i10 = 0; i10 < s5; i10++) {
    const s6 = t6[i10];
    let a4, u5, d5 = -1, f4 = 0;
    for (; f4 < s6.length && (c6.lastIndex = f4, u5 = c6.exec(s6), null !== u5); ) f4 = c6.lastIndex, c6 === v ? "!--" === u5[1] ? c6 = _ : void 0 !== u5[1] ? c6 = m : void 0 !== u5[2] ? (y.test(u5[2]) && (n7 = RegExp("</" + u5[2], "g")), c6 = p) : void 0 !== u5[3] && (c6 = p) : c6 === p ? ">" === u5[0] ? (c6 = n7 != null ? n7 : v, d5 = -1) : void 0 === u5[1] ? d5 = -2 : (d5 = c6.lastIndex - u5[2].length, a4 = u5[1], c6 = void 0 === u5[3] ? p : '"' === u5[3] ? $ : g) : c6 === $ || c6 === g ? c6 = p : c6 === _ || c6 === m ? c6 = v : (c6 = p, n7 = void 0);
    const x2 = c6 === p && t6[i10 + 1].startsWith("/>") ? " " : "";
    l7 += c6 === v ? s6 + r : d5 >= 0 ? (e10.push(a4), s6.slice(0, d5) + h + s6.slice(d5) + o + x2) : s6 + o + (-2 === d5 ? i10 : x2);
  }
  return [V(t6, l7 + (t6[s5] || "<?>") + (2 === i9 ? "</svg>" : 3 === i9 ? "</math>" : "")), e10];
};
var S = class _S {
  constructor({ strings: t6, _$litType$: i9 }, e10) {
    let r9;
    this.parts = [];
    let l7 = 0, a4 = 0;
    const u5 = t6.length - 1, d5 = this.parts, [f4, v3] = N(t6, i9);
    if (this.el = _S.createElement(f4, e10), P.currentNode = this.el.content, 2 === i9 || 3 === i9) {
      const t7 = this.el.content.firstChild;
      t7.replaceWith(...t7.childNodes);
    }
    for (; null !== (r9 = P.nextNode()) && d5.length < u5; ) {
      if (1 === r9.nodeType) {
        if (r9.hasAttributes()) for (const t7 of r9.getAttributeNames()) if (t7.endsWith(h)) {
          const i10 = v3[a4++], s5 = r9.getAttribute(t7).split(o), e11 = /([.?@])?(.*)/.exec(i10);
          d5.push({ type: 1, index: l7, name: e11[2], strings: s5, ctor: "." === e11[1] ? I : "?" === e11[1] ? L : "@" === e11[1] ? z : H }), r9.removeAttribute(t7);
        } else t7.startsWith(o) && (d5.push({ type: 6, index: l7 }), r9.removeAttribute(t7));
        if (y.test(r9.tagName)) {
          const t7 = r9.textContent.split(o), i10 = t7.length - 1;
          if (i10 > 0) {
            r9.textContent = s ? s.emptyScript : "";
            for (let s5 = 0; s5 < i10; s5++) r9.append(t7[s5], c()), P.nextNode(), d5.push({ type: 2, index: ++l7 });
            r9.append(t7[i10], c());
          }
        }
      } else if (8 === r9.nodeType) if (r9.data === n) d5.push({ type: 2, index: l7 });
      else {
        let t7 = -1;
        for (; -1 !== (t7 = r9.data.indexOf(o, t7 + 1)); ) d5.push({ type: 7, index: l7 }), t7 += o.length - 1;
      }
      l7++;
    }
  }
  static createElement(t6, i9) {
    const s5 = l.createElement("template");
    return s5.innerHTML = t6, s5;
  }
};
function M(t6, i9, s5 = t6, e10) {
  var _a16, _b2, _c;
  if (i9 === E) return i9;
  let h4 = void 0 !== e10 ? (_a16 = s5._$Co) == null ? void 0 : _a16[e10] : s5._$Cl;
  const o10 = a(i9) ? void 0 : i9._$litDirective$;
  return (h4 == null ? void 0 : h4.constructor) !== o10 && ((_b2 = h4 == null ? void 0 : h4._$AO) == null ? void 0 : _b2.call(h4, false), void 0 === o10 ? h4 = void 0 : (h4 = new o10(t6), h4._$AT(t6, s5, e10)), void 0 !== e10 ? ((_c = s5._$Co) != null ? _c : s5._$Co = [])[e10] = h4 : s5._$Cl = h4), void 0 !== h4 && (i9 = M(t6, h4._$AS(t6, i9.values), h4, e10)), i9;
}
var R = class {
  constructor(t6, i9) {
    this._$AV = [], this._$AN = void 0, this._$AD = t6, this._$AM = i9;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t6) {
    var _a16;
    const { el: { content: i9 }, parts: s5 } = this._$AD, e10 = ((_a16 = t6 == null ? void 0 : t6.creationScope) != null ? _a16 : l).importNode(i9, true);
    P.currentNode = e10;
    let h4 = P.nextNode(), o10 = 0, n7 = 0, r9 = s5[0];
    for (; void 0 !== r9; ) {
      if (o10 === r9.index) {
        let i10;
        2 === r9.type ? i10 = new k(h4, h4.nextSibling, this, t6) : 1 === r9.type ? i10 = new r9.ctor(h4, r9.name, r9.strings, this, t6) : 6 === r9.type && (i10 = new Z(h4, this, t6)), this._$AV.push(i10), r9 = s5[++n7];
      }
      o10 !== (r9 == null ? void 0 : r9.index) && (h4 = P.nextNode(), o10++);
    }
    return P.currentNode = l, e10;
  }
  p(t6) {
    let i9 = 0;
    for (const s5 of this._$AV) void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t6, s5, i9), i9 += s5.strings.length - 2) : s5._$AI(t6[i9])), i9++;
  }
};
var k = class _k {
  get _$AU() {
    var _a16, _b2;
    return (_b2 = (_a16 = this._$AM) == null ? void 0 : _a16._$AU) != null ? _b2 : this._$Cv;
  }
  constructor(t6, i9, s5, e10) {
    var _a16;
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t6, this._$AB = i9, this._$AM = s5, this.options = e10, this._$Cv = (_a16 = e10 == null ? void 0 : e10.isConnected) != null ? _a16 : true;
  }
  get parentNode() {
    let t6 = this._$AA.parentNode;
    const i9 = this._$AM;
    return void 0 !== i9 && 11 === (t6 == null ? void 0 : t6.nodeType) && (t6 = i9.parentNode), t6;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t6, i9 = this) {
    t6 = M(this, t6, i9), a(t6) ? t6 === A || null == t6 || "" === t6 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t6 !== this._$AH && t6 !== E && this._(t6) : void 0 !== t6._$litType$ ? this.$(t6) : void 0 !== t6.nodeType ? this.T(t6) : d(t6) ? this.k(t6) : this._(t6);
  }
  O(t6) {
    return this._$AA.parentNode.insertBefore(t6, this._$AB);
  }
  T(t6) {
    this._$AH !== t6 && (this._$AR(), this._$AH = this.O(t6));
  }
  _(t6) {
    this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = t6 : this.T(l.createTextNode(t6)), this._$AH = t6;
  }
  $(t6) {
    var _a16;
    const { values: i9, _$litType$: s5 } = t6, e10 = "number" == typeof s5 ? this._$AC(t6) : (void 0 === s5.el && (s5.el = S.createElement(V(s5.h, s5.h[0]), this.options)), s5);
    if (((_a16 = this._$AH) == null ? void 0 : _a16._$AD) === e10) this._$AH.p(i9);
    else {
      const t7 = new R(e10, this), s6 = t7.u(this.options);
      t7.p(i9), this.T(s6), this._$AH = t7;
    }
  }
  _$AC(t6) {
    let i9 = C.get(t6.strings);
    return void 0 === i9 && C.set(t6.strings, i9 = new S(t6)), i9;
  }
  k(t6) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i9 = this._$AH;
    let s5, e10 = 0;
    for (const h4 of t6) e10 === i9.length ? i9.push(s5 = new _k(this.O(c()), this.O(c()), this, this.options)) : s5 = i9[e10], s5._$AI(h4), e10++;
    e10 < i9.length && (this._$AR(s5 && s5._$AB.nextSibling, e10), i9.length = e10);
  }
  _$AR(t6 = this._$AA.nextSibling, s5) {
    var _a16;
    for ((_a16 = this._$AP) == null ? void 0 : _a16.call(this, false, true, s5); t6 !== this._$AB; ) {
      const s6 = i(t6).nextSibling;
      i(t6).remove(), t6 = s6;
    }
  }
  setConnected(t6) {
    var _a16;
    void 0 === this._$AM && (this._$Cv = t6, (_a16 = this._$AP) == null ? void 0 : _a16.call(this, t6));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t6, i9, s5, e10, h4) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t6, this.name = i9, this._$AM = e10, this.options = h4, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
  }
  _$AI(t6, i9 = this, s5, e10) {
    const h4 = this.strings;
    let o10 = false;
    if (void 0 === h4) t6 = M(this, t6, i9, 0), o10 = !a(t6) || t6 !== this._$AH && t6 !== E, o10 && (this._$AH = t6);
    else {
      const e11 = t6;
      let n7, r9;
      for (t6 = h4[0], n7 = 0; n7 < h4.length - 1; n7++) r9 = M(this, e11[s5 + n7], i9, n7), r9 === E && (r9 = this._$AH[n7]), o10 || (o10 = !a(r9) || r9 !== this._$AH[n7]), r9 === A ? t6 = A : t6 !== A && (t6 += (r9 != null ? r9 : "") + h4[n7 + 1]), this._$AH[n7] = r9;
    }
    o10 && !e10 && this.j(t6);
  }
  j(t6) {
    t6 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t6 != null ? t6 : "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t6) {
    this.element[this.name] = t6 === A ? void 0 : t6;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t6) {
    this.element.toggleAttribute(this.name, !!t6 && t6 !== A);
  }
};
var z = class extends H {
  constructor(t6, i9, s5, e10, h4) {
    super(t6, i9, s5, e10, h4), this.type = 5;
  }
  _$AI(t6, i9 = this) {
    var _a16;
    if ((t6 = (_a16 = M(this, t6, i9, 0)) != null ? _a16 : A) === E) return;
    const s5 = this._$AH, e10 = t6 === A && s5 !== A || t6.capture !== s5.capture || t6.once !== s5.once || t6.passive !== s5.passive, h4 = t6 !== A && (s5 === A || e10);
    e10 && this.element.removeEventListener(this.name, this, s5), h4 && this.element.addEventListener(this.name, this, t6), this._$AH = t6;
  }
  handleEvent(t6) {
    var _a16, _b2;
    "function" == typeof this._$AH ? this._$AH.call((_b2 = (_a16 = this.options) == null ? void 0 : _a16.host) != null ? _b2 : this.element, t6) : this._$AH.handleEvent(t6);
  }
};
var Z = class {
  constructor(t6, i9, s5) {
    this.element = t6, this.type = 6, this._$AN = void 0, this._$AM = i9, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t6) {
    M(this, t6);
  }
};
var j = { M: h, P: o, A: n, C: 1, L: N, R, D: d, V: M, I: k, H, N: L, U: z, B: I, F: Z };
var B = t.litHtmlPolyfillSupport;
var _a;
B == null ? void 0 : B(S, k), ((_a = t.litHtmlVersions) != null ? _a : t.litHtmlVersions = []).push("3.3.3");
var D = (t6, i9, s5) => {
  var _a16, _b2;
  const e10 = (_a16 = s5 == null ? void 0 : s5.renderBefore) != null ? _a16 : i9;
  let h4 = e10._$litPart$;
  if (void 0 === h4) {
    const t7 = (_b2 = s5 == null ? void 0 : s5.renderBefore) != null ? _b2 : null;
    e10._$litPart$ = h4 = new k(i9.insertBefore(c(), t7), t7, void 0, s5 != null ? s5 : {});
  }
  return h4._$AI(t6), h4;
};

// node_modules/lit-html/private-ssr-support.js
var r2 = null;
var i2 = { boundAttributeSuffix: j.M, marker: j.P, markerMatch: j.A, HTML_RESULT: j.C, getTemplateHtml: j.L, overrideDirectiveResolve: (e10, t6) => class extends e10 {
  _$AS(e11, r9) {
    return t6(this, r9);
  }
}, patchDirectiveResolve: (e10, t6) => {
  if (e10.prototype._$AS.name !== t6.name) {
    r2 != null ? r2 : r2 = e10.prototype._$AS.name;
    for (let i9 = e10.prototype; i9 !== Object.prototype; i9 = Object.getPrototypeOf(i9)) if (i9.hasOwnProperty(r2)) return void (i9[r2] = t6);
    throw Error("Internal error: It is possible that both dev mode and production mode Lit was mixed together during SSR. Please comment on the issue: https://github.com/lit/lit/issues/4527");
  }
}, setDirectiveClass(e10, t6) {
  e10._$litDirective$ = t6;
}, getAttributePartCommittedValue: (e10, r9, i9) => {
  let o10 = E;
  return e10.j = (e11) => o10 = e11, e10._$AI(r9, e10, i9), o10;
}, connectedDisconnectable: (e10) => __spreadProps(__spreadValues({}, e10), { _$AU: true }), resolveDirective: j.V, AttributePart: j.H, PropertyPart: j.B, BooleanAttributePart: j.N, EventPart: j.U, ElementPart: j.F, TemplateInstance: j.R, isIterable: j.D, ChildPart: j.I };

// node_modules/lit-html/directive.js
var t2 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e2 = (t6) => (...e10) => ({ _$litDirective$: t6, values: e10 });
var i3 = class {
  constructor(t6) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t6, e10, i9) {
    this._$Ct = t6, this._$AM = e10, this._$Ci = i9;
  }
  _$AS(t6, e10) {
    return this.update(t6, e10);
  }
  update(t6, e10) {
    return this.render(...e10);
  }
};

// node_modules/lit-html/directive-helpers.js
var { I: t3 } = j;
var n2 = (o10) => null === o10 || "object" != typeof o10 && "function" != typeof o10;
var l2 = (o10, t6) => void 0 === t6 ? void 0 !== (o10 == null ? void 0 : o10._$litType$) : (o10 == null ? void 0 : o10._$litType$) === t6;
var d2 = (o10) => {
  var _a16;
  return null != ((_a16 = o10 == null ? void 0 : o10._$litType$) == null ? void 0 : _a16.h);
};
var r3 = (o10) => void 0 === o10.strings;
var m2 = {};
var p2 = (o10, t6 = m2) => o10._$AH = t6;

// node_modules/@lit-labs/ssr-client/lib/hydrate-lit-html.js
var { TemplateInstance: l3, isIterable: s2, resolveDirective: d3, ChildPart: c2, ElementPart: p3 } = i2;
var f2 = (e10, t6, r9 = {}) => {
  if (void 0 !== t6._$litPart$) throw Error("container already contains a live render");
  let n7, o10, i9;
  const a4 = [], l7 = document.createTreeWalker(t6, NodeFilter.SHOW_COMMENT);
  let s5;
  for (; null !== (s5 = l7.nextNode()); ) {
    const t7 = s5.data;
    if (t7.startsWith("lit-part")) {
      if (0 === a4.length && void 0 !== n7) throw Error(`There must be only one root part per container. Found a part marker (${s5}) when we already have a root part marker (${o10})`);
      i9 = m3(e10, s5, a4, r9), void 0 === n7 && (n7 = i9), o10 != null ? o10 : o10 = s5;
    } else if (t7.startsWith("lit-node")) h2(s5, a4, r9);
    else if (t7.startsWith("/lit-part")) {
      if (1 === a4.length && i9 !== n7) throw Error("internal error");
      i9 = u2(s5, i9, a4);
    }
  }
  if (void 0 === n7) {
    const e11 = t6 instanceof ShadowRoot ? "{container.host.localName}'s shadow root" : t6 instanceof DocumentFragment ? "DocumentFragment" : t6.localName;
    console.error(`There should be exactly one root part in a render container, but we didn't find any in ${e11}.`);
  }
  t6._$litPart$ = n7;
};
var m3 = (t6, r9, a4, p5) => {
  let f4, m4;
  if (0 === a4.length) m4 = new c2(r9, null, void 0, p5), f4 = t6;
  else {
    const e10 = a4[a4.length - 1];
    if ("template-instance" === e10.type) m4 = new c2(r9, null, e10.instance, p5), e10.instance._$AV.push(m4), f4 = e10.result.values[e10.instancePartIndex++], e10.templatePartIndex++;
    else if ("iterable" === e10.type) {
      m4 = new c2(r9, null, e10.part, p5);
      const t7 = e10.iterator.next();
      if (t7.done) throw f4 = void 0, e10.done = true, Error("Unhandled shorter than expected iterable");
      f4 = t7.value, e10.part._$AH.push(m4);
    } else m4 = new c2(r9, null, e10.part, p5);
  }
  if (f4 = d3(m4, f4), f4 === E) a4.push({ part: m4, type: "leaf" });
  else if (n2(f4)) a4.push({ part: m4, type: "leaf" }), m4._$AH = f4;
  else if (l2(f4)) {
    if (d2(f4)) throw Error("compiled templates are not supported");
    const e10 = "lit-part " + v2(f4);
    if (r9.data !== e10) throw Error("Hydration value mismatch: Unexpected TemplateResult rendered to part");
    {
      const e11 = c2.prototype._$AC(f4), t7 = new l3(e11, m4);
      a4.push({ type: "template-instance", instance: t7, part: m4, templatePartIndex: 0, instancePartIndex: 0, result: f4 }), m4._$AH = t7;
    }
  } else s2(f4) ? (a4.push({ part: m4, type: "iterable", value: f4, iterator: f4[Symbol.iterator](), done: false }), m4._$AH = []) : (a4.push({ part: m4, type: "leaf" }), m4._$AH = f4 != null ? f4 : "");
  return m4;
};
var u2 = (e10, t6, r9) => {
  if (void 0 === t6) throw Error("unbalanced part marker");
  t6._$AB = e10;
  const n7 = r9.pop();
  if ("iterable" === n7.type && !n7.iterator.next().done) throw Error("unexpected longer than expected iterable");
  if (r9.length > 0) return r9[r9.length - 1].part;
};
var h2 = (e10, t6, n7) => {
  const o10 = /lit-node (\d+)/.exec(e10.data), i9 = parseInt(o10[1]), l7 = e10.nextElementSibling;
  if (null === l7) throw Error("could not find node for attribute parts");
  l7.removeAttribute("defer-hydration");
  const s5 = t6[t6.length - 1];
  if ("template-instance" !== s5.type) throw Error("Hydration value mismatch: Primitive found where TemplateResult expected. This usually occurs due to conditional rendering that resulted in a different value or template being rendered between the server and client.");
  {
    const e11 = s5.instance;
    for (; ; ) {
      const t7 = e11._$AD.parts[s5.templatePartIndex];
      if (void 0 === t7 || t7.type !== t2.ATTRIBUTE && t7.type !== t2.ELEMENT || t7.index !== i9) break;
      if (t7.type === t2.ATTRIBUTE) {
        const o11 = new t7.ctor(l7, t7.name, t7.strings, s5.instance, n7), i10 = r3(o11) ? s5.result.values[s5.instancePartIndex] : s5.result.values, d5 = !(o11.type === t2.EVENT || o11.type === t2.PROPERTY);
        o11._$AI(i10, o11, s5.instancePartIndex, d5), s5.instancePartIndex += t7.strings.length - 1, e11._$AV.push(o11);
      } else {
        const t8 = new p3(l7, s5.instance, n7);
        d3(t8, s5.result.values[s5.instancePartIndex++]), e11._$AV.push(t8);
      }
      s5.templatePartIndex++;
    }
  }
};
var w2 = /* @__PURE__ */ new WeakMap();
var v2 = (e10) => {
  let t6 = w2.get(e10.strings);
  if (void 0 !== t6) return t6;
  const r9 = new Uint32Array(2).fill(5381);
  for (const t7 of e10.strings) for (let e11 = 0; e11 < t7.length; e11++) r9[e11 % 2] = 33 * r9[e11 % 2] ^ t7.charCodeAt(e11);
  const n7 = String.fromCharCode(...new Uint8Array(r9.buffer));
  return t6 = btoa(n7), w2.set(e10.strings, t6), t6;
};

// node_modules/@lit-labs/ssr-client/lit-element-hydrate-support.js
globalThis.litElementHydrateSupport = ({ LitElement: s5 }) => {
  const h4 = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(s5), "observedAttributes").get;
  Object.defineProperty(s5, "observedAttributes", { get() {
    return [...h4.call(this), "defer-hydration"];
  } });
  const e10 = s5.prototype.attributeChangedCallback;
  s5.prototype.attributeChangedCallback = function(t6, i9, s6) {
    "defer-hydration" === t6 && null === s6 && n7.call(this), e10.call(this, t6, i9, s6);
  };
  const n7 = s5.prototype.connectedCallback;
  s5.prototype.connectedCallback = function() {
    this.hasAttribute("defer-hydration") || n7.call(this);
  };
  const o10 = s5.prototype.createRenderRoot;
  s5.prototype.createRenderRoot = function() {
    return this.shadowRoot ? (this._$AG = true, this.shadowRoot) : o10.call(this);
  };
  const r9 = Object.getPrototypeOf(s5.prototype).update;
  s5.prototype.update = function(s6) {
    const h5 = this.render();
    if (r9.call(this, s6), this._$AG) {
      this._$AG = false;
      for (const t6 of this.getAttributeNames()) if (t6.startsWith("hydrate-internals-")) {
        const i9 = t6.slice(18);
        this.removeAttribute(i9), this.removeAttribute(t6);
      }
      f2(h5, this.renderRoot, this.renderOptions);
    } else D(h5, this.renderRoot, this.renderOptions);
  };
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.R7QX4M6R.js
var MirrorValidator = () => {
  return {
    checkValidity(element) {
      const formControl = element.input;
      const validity = {
        message: "",
        isValid: true,
        invalidKeys: []
      };
      if (!formControl) {
        return validity;
      }
      let isValid = true;
      if ("checkValidity" in formControl) {
        isValid = formControl.checkValidity();
      }
      if (isValid) {
        return validity;
      }
      validity.isValid = false;
      if ("validationMessage" in formControl) {
        validity.message = formControl.validationMessage;
      }
      if (!("validity" in formControl)) {
        validity.invalidKeys.push("customError");
        return validity;
      }
      for (const key in formControl.validity) {
        if (key === "valid") {
          continue;
        }
        const checkedKey = key;
        if (formControl.validity[checkedKey]) {
          validity.invalidKeys.push(checkedKey);
        }
      }
      return validity;
    }
  };
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.VC3BPUZJ.js
var WaInvalidEvent = class extends Event {
  constructor() {
    super("wa-invalid", { bubbles: true, cancelable: false, composed: true });
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.7VGCIHDG.js
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i9 = decorators.length - 1, decorator; i9 >= 0; i9--)
    if (decorator = decorators[i9])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// node_modules/@lit/reactive-element/css-tag.js
var t4 = globalThis;
var e3 = t4.ShadowRoot && (void 0 === t4.ShadyCSS || t4.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s3 = Symbol();
var o2 = /* @__PURE__ */ new WeakMap();
var n3 = class {
  constructor(t6, e10, o10) {
    if (this._$cssResult$ = true, o10 !== s3) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t6, this.t = e10;
  }
  get styleSheet() {
    let t6 = this.o;
    const s5 = this.t;
    if (e3 && void 0 === t6) {
      const e10 = void 0 !== s5 && 1 === s5.length;
      e10 && (t6 = o2.get(s5)), void 0 === t6 && ((this.o = t6 = new CSSStyleSheet()).replaceSync(this.cssText), e10 && o2.set(s5, t6));
    }
    return t6;
  }
  toString() {
    return this.cssText;
  }
};
var r4 = (t6) => new n3("string" == typeof t6 ? t6 : t6 + "", void 0, s3);
var i4 = (t6, ...e10) => {
  const o10 = 1 === t6.length ? t6[0] : e10.reduce((e11, s5, o11) => e11 + ((t7) => {
    if (true === t7._$cssResult$) return t7.cssText;
    if ("number" == typeof t7) return t7;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t7 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t6[o11 + 1], t6[0]);
  return new n3(o10, t6, s3);
};
var S2 = (s5, o10) => {
  if (e3) s5.adoptedStyleSheets = o10.map((t6) => t6 instanceof CSSStyleSheet ? t6 : t6.styleSheet);
  else for (const e10 of o10) {
    const o11 = document.createElement("style"), n7 = t4.litNonce;
    void 0 !== n7 && o11.setAttribute("nonce", n7), o11.textContent = e10.cssText, s5.appendChild(o11);
  }
};
var c3 = e3 ? (t6) => t6 : (t6) => t6 instanceof CSSStyleSheet ? ((t7) => {
  let e10 = "";
  for (const s5 of t7.cssRules) e10 += s5.cssText;
  return r4(e10);
})(t6) : t6;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i5, defineProperty: e4, getOwnPropertyDescriptor: h3, getOwnPropertyNames: r5, getOwnPropertySymbols: o3, getPrototypeOf: n4 } = Object;
var a2 = globalThis;
var c4 = a2.trustedTypes;
var l4 = c4 ? c4.emptyScript : "";
var p4 = a2.reactiveElementPolyfillSupport;
var d4 = (t6, s5) => t6;
var u3 = { toAttribute(t6, s5) {
  switch (s5) {
    case Boolean:
      t6 = t6 ? l4 : null;
      break;
    case Object:
    case Array:
      t6 = null == t6 ? t6 : JSON.stringify(t6);
  }
  return t6;
}, fromAttribute(t6, s5) {
  let i9 = t6;
  switch (s5) {
    case Boolean:
      i9 = null !== t6;
      break;
    case Number:
      i9 = null === t6 ? null : Number(t6);
      break;
    case Object:
    case Array:
      try {
        i9 = JSON.parse(t6);
      } catch (t7) {
        i9 = null;
      }
  }
  return i9;
} };
var f3 = (t6, s5) => !i5(t6, s5);
var b2 = { attribute: true, type: String, converter: u3, reflect: false, useDefault: false, hasChanged: f3 };
var _a2, _b;
(_a2 = Symbol.metadata) != null ? _a2 : Symbol.metadata = Symbol("metadata"), (_b = a2.litPropertyMetadata) != null ? _b : a2.litPropertyMetadata = /* @__PURE__ */ new WeakMap();
var y2 = class extends HTMLElement {
  static addInitializer(t6) {
    var _a16;
    this._$Ei(), ((_a16 = this.l) != null ? _a16 : this.l = []).push(t6);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t6, s5 = b2) {
    if (s5.state && (s5.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t6) && ((s5 = Object.create(s5)).wrapped = true), this.elementProperties.set(t6, s5), !s5.noAccessor) {
      const i9 = Symbol(), h4 = this.getPropertyDescriptor(t6, i9, s5);
      void 0 !== h4 && e4(this.prototype, t6, h4);
    }
  }
  static getPropertyDescriptor(t6, s5, i9) {
    var _a16;
    const { get: e10, set: r9 } = (_a16 = h3(this.prototype, t6)) != null ? _a16 : { get() {
      return this[s5];
    }, set(t7) {
      this[s5] = t7;
    } };
    return { get: e10, set(s6) {
      const h4 = e10 == null ? void 0 : e10.call(this);
      r9 == null ? void 0 : r9.call(this, s6), this.requestUpdate(t6, h4, i9);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t6) {
    var _a16;
    return (_a16 = this.elementProperties.get(t6)) != null ? _a16 : b2;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d4("elementProperties"))) return;
    const t6 = n4(this);
    t6.finalize(), void 0 !== t6.l && (this.l = [...t6.l]), this.elementProperties = new Map(t6.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d4("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d4("properties"))) {
      const t7 = this.properties, s5 = [...r5(t7), ...o3(t7)];
      for (const i9 of s5) this.createProperty(i9, t7[i9]);
    }
    const t6 = this[Symbol.metadata];
    if (null !== t6) {
      const s5 = litPropertyMetadata.get(t6);
      if (void 0 !== s5) for (const [t7, i9] of s5) this.elementProperties.set(t7, i9);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t7, s5] of this.elementProperties) {
      const i9 = this._$Eu(t7, s5);
      void 0 !== i9 && this._$Eh.set(i9, t7);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s5) {
    const i9 = [];
    if (Array.isArray(s5)) {
      const e10 = new Set(s5.flat(1 / 0).reverse());
      for (const s6 of e10) i9.unshift(c3(s6));
    } else void 0 !== s5 && i9.push(c3(s5));
    return i9;
  }
  static _$Eu(t6, s5) {
    const i9 = s5.attribute;
    return false === i9 ? void 0 : "string" == typeof i9 ? i9 : "string" == typeof t6 ? t6.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a16;
    this._$ES = new Promise((t6) => this.enableUpdating = t6), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a16 = this.constructor.l) == null ? void 0 : _a16.forEach((t6) => t6(this));
  }
  addController(t6) {
    var _a16, _b2;
    ((_a16 = this._$EO) != null ? _a16 : this._$EO = /* @__PURE__ */ new Set()).add(t6), void 0 !== this.renderRoot && this.isConnected && ((_b2 = t6.hostConnected) == null ? void 0 : _b2.call(t6));
  }
  removeController(t6) {
    var _a16;
    (_a16 = this._$EO) == null ? void 0 : _a16.delete(t6);
  }
  _$E_() {
    const t6 = /* @__PURE__ */ new Map(), s5 = this.constructor.elementProperties;
    for (const i9 of s5.keys()) this.hasOwnProperty(i9) && (t6.set(i9, this[i9]), delete this[i9]);
    t6.size > 0 && (this._$Ep = t6);
  }
  createRenderRoot() {
    var _a16;
    const t6 = (_a16 = this.shadowRoot) != null ? _a16 : this.attachShadow(this.constructor.shadowRootOptions);
    return S2(t6, this.constructor.elementStyles), t6;
  }
  connectedCallback() {
    var _a16, _b2;
    (_a16 = this.renderRoot) != null ? _a16 : this.renderRoot = this.createRenderRoot(), this.enableUpdating(true), (_b2 = this._$EO) == null ? void 0 : _b2.forEach((t6) => {
      var _a17;
      return (_a17 = t6.hostConnected) == null ? void 0 : _a17.call(t6);
    });
  }
  enableUpdating(t6) {
  }
  disconnectedCallback() {
    var _a16;
    (_a16 = this._$EO) == null ? void 0 : _a16.forEach((t6) => {
      var _a17;
      return (_a17 = t6.hostDisconnected) == null ? void 0 : _a17.call(t6);
    });
  }
  attributeChangedCallback(t6, s5, i9) {
    this._$AK(t6, i9);
  }
  _$ET(t6, s5) {
    var _a16;
    const i9 = this.constructor.elementProperties.get(t6), e10 = this.constructor._$Eu(t6, i9);
    if (void 0 !== e10 && true === i9.reflect) {
      const h4 = (void 0 !== ((_a16 = i9.converter) == null ? void 0 : _a16.toAttribute) ? i9.converter : u3).toAttribute(s5, i9.type);
      this._$Em = t6, null == h4 ? this.removeAttribute(e10) : this.setAttribute(e10, h4), this._$Em = null;
    }
  }
  _$AK(t6, s5) {
    var _a16, _b2, _c;
    const i9 = this.constructor, e10 = i9._$Eh.get(t6);
    if (void 0 !== e10 && this._$Em !== e10) {
      const t7 = i9.getPropertyOptions(e10), h4 = "function" == typeof t7.converter ? { fromAttribute: t7.converter } : void 0 !== ((_a16 = t7.converter) == null ? void 0 : _a16.fromAttribute) ? t7.converter : u3;
      this._$Em = e10;
      const r9 = h4.fromAttribute(s5, t7.type);
      this[e10] = (_c = r9 != null ? r9 : (_b2 = this._$Ej) == null ? void 0 : _b2.get(e10)) != null ? _c : r9, this._$Em = null;
    }
  }
  requestUpdate(t6, s5, i9, e10 = false, h4) {
    var _a16, _b2;
    if (void 0 !== t6) {
      const r9 = this.constructor;
      if (false === e10 && (h4 = this[t6]), i9 != null ? i9 : i9 = r9.getPropertyOptions(t6), !(((_a16 = i9.hasChanged) != null ? _a16 : f3)(h4, s5) || i9.useDefault && i9.reflect && h4 === ((_b2 = this._$Ej) == null ? void 0 : _b2.get(t6)) && !this.hasAttribute(r9._$Eu(t6, i9)))) return;
      this.C(t6, s5, i9);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t6, s5, { useDefault: i9, reflect: e10, wrapped: h4 }, r9) {
    var _a16, _b2, _c;
    i9 && !((_a16 = this._$Ej) != null ? _a16 : this._$Ej = /* @__PURE__ */ new Map()).has(t6) && (this._$Ej.set(t6, (_b2 = r9 != null ? r9 : s5) != null ? _b2 : this[t6]), true !== h4 || void 0 !== r9) || (this._$AL.has(t6) || (this.hasUpdated || i9 || (s5 = void 0), this._$AL.set(t6, s5)), true === e10 && this._$Em !== t6 && ((_c = this._$Eq) != null ? _c : this._$Eq = /* @__PURE__ */ new Set()).add(t6));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t7) {
      Promise.reject(t7);
    }
    const t6 = this.scheduleUpdate();
    return null != t6 && await t6, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a16, _b2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if ((_a16 = this.renderRoot) != null ? _a16 : this.renderRoot = this.createRenderRoot(), this._$Ep) {
        for (const [t8, s6] of this._$Ep) this[t8] = s6;
        this._$Ep = void 0;
      }
      const t7 = this.constructor.elementProperties;
      if (t7.size > 0) for (const [s6, i9] of t7) {
        const { wrapped: t8 } = i9, e10 = this[s6];
        true !== t8 || this._$AL.has(s6) || void 0 === e10 || this.C(s6, void 0, i9, e10);
      }
    }
    let t6 = false;
    const s5 = this._$AL;
    try {
      t6 = this.shouldUpdate(s5), t6 ? (this.willUpdate(s5), (_b2 = this._$EO) == null ? void 0 : _b2.forEach((t7) => {
        var _a17;
        return (_a17 = t7.hostUpdate) == null ? void 0 : _a17.call(t7);
      }), this.update(s5)) : this._$EM();
    } catch (s6) {
      throw t6 = false, this._$EM(), s6;
    }
    t6 && this._$AE(s5);
  }
  willUpdate(t6) {
  }
  _$AE(t6) {
    var _a16;
    (_a16 = this._$EO) == null ? void 0 : _a16.forEach((t7) => {
      var _a17;
      return (_a17 = t7.hostUpdated) == null ? void 0 : _a17.call(t7);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t6)), this.updated(t6);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t6) {
    return true;
  }
  update(t6) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t7) => this._$ET(t7, this[t7]))), this._$EM();
  }
  updated(t6) {
  }
  firstUpdated(t6) {
  }
};
var _a3;
y2.elementStyles = [], y2.shadowRootOptions = { mode: "open" }, y2[d4("elementProperties")] = /* @__PURE__ */ new Map(), y2[d4("finalized")] = /* @__PURE__ */ new Map(), p4 == null ? void 0 : p4({ ReactiveElement: y2 }), ((_a3 = a2.reactiveElementVersions) != null ? _a3 : a2.reactiveElementVersions = []).push("2.1.2");

// node_modules/lit-element/lit-element.js
var s4 = globalThis;
var i6 = class extends y2 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a16, _b2;
    const t6 = super.createRenderRoot();
    return (_b2 = (_a16 = this.renderOptions).renderBefore) != null ? _b2 : _a16.renderBefore = t6.firstChild, t6;
  }
  update(t6) {
    const r9 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t6), this._$Do = D(r9, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a16;
    super.connectedCallback(), (_a16 = this._$Do) == null ? void 0 : _a16.setConnected(true);
  }
  disconnectedCallback() {
    var _a16;
    super.disconnectedCallback(), (_a16 = this._$Do) == null ? void 0 : _a16.setConnected(false);
  }
  render() {
    return E;
  }
};
var _a4;
i6._$litElement$ = true, i6["finalized"] = true, (_a4 = s4.litElementHydrateSupport) == null ? void 0 : _a4.call(s4, { LitElement: i6 });
var o4 = s4.litElementPolyfillSupport;
o4 == null ? void 0 : o4({ LitElement: i6 });
var _a5;
((_a5 = s4.litElementVersions) != null ? _a5 : s4.litElementVersions = []).push("4.2.2");

// node_modules/lit-html/is-server.js
var o5 = false;

// node_modules/@lit/reactive-element/decorators/custom-element.js
var t5 = (t6) => (e10, o10) => {
  void 0 !== o10 ? o10.addInitializer(() => {
    customElements.define(t6, e10);
  }) : customElements.define(t6, e10);
};

// node_modules/@lit/reactive-element/decorators/property.js
var o6 = { attribute: true, type: String, converter: u3, reflect: false, hasChanged: f3 };
var r6 = (t6 = o6, e10, r9) => {
  const { kind: n7, metadata: i9 } = r9;
  let s5 = globalThis.litPropertyMetadata.get(i9);
  if (void 0 === s5 && globalThis.litPropertyMetadata.set(i9, s5 = /* @__PURE__ */ new Map()), "setter" === n7 && ((t6 = Object.create(t6)).wrapped = true), s5.set(r9.name, t6), "accessor" === n7) {
    const { name: o10 } = r9;
    return { set(r10) {
      const n8 = e10.get.call(this);
      e10.set.call(this, r10), this.requestUpdate(o10, n8, t6, true, r10);
    }, init(e11) {
      return void 0 !== e11 && this.C(o10, void 0, t6, e11), e11;
    } };
  }
  if ("setter" === n7) {
    const { name: o10 } = r9;
    return function(r10) {
      const n8 = this[o10];
      e10.call(this, r10), this.requestUpdate(o10, n8, t6, true, r10);
    };
  }
  throw Error("Unsupported decorator location: " + n7);
};
function n5(t6) {
  return (e10, o10) => "object" == typeof o10 ? r6(t6, e10, o10) : ((t7, e11, o11) => {
    const r9 = e11.hasOwnProperty(o11);
    return e11.constructor.createProperty(o11, t7), r9 ? Object.getOwnPropertyDescriptor(e11, o11) : void 0;
  })(t6, e10, o10);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r7(r9) {
  return n5(__spreadProps(__spreadValues({}, r9), { state: true, attribute: false }));
}

// node_modules/@lit/reactive-element/decorators/base.js
var e5 = (e10, t6, c6) => (c6.configurable = true, c6.enumerable = true, Reflect.decorate && "object" != typeof t6 && Object.defineProperty(e10, t6, c6), c6);

// node_modules/@lit/reactive-element/decorators/query.js
function e6(e10, r9) {
  return (n7, s5, i9) => {
    const o10 = (t6) => {
      var _a16, _b2;
      return (_b2 = (_a16 = t6.renderRoot) == null ? void 0 : _a16.querySelector(e10)) != null ? _b2 : null;
    };
    if (r9) {
      const { get: e11, set: r10 } = "object" == typeof s5 ? n7 : i9 != null ? i9 : (() => {
        const t6 = Symbol();
        return { get() {
          return this[t6];
        }, set(e12) {
          this[t6] = e12;
        } };
      })();
      return e5(n7, s5, { get() {
        let t6 = e11.call(this);
        return void 0 === t6 && (t6 = o10(this), (null !== t6 || this.hasUpdated) && r10.call(this, t6)), t6;
      } });
    }
    return e5(n7, s5, { get() {
      return o10(this);
    } });
  };
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.AOKMSJXD.js
var host_styles_default = i4`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden],
  :host([hidden]) {
    display: none !important;
  }
`;
var HAS_ENDING_COLON = /;\s+$/;
function camelToKebab(str) {
  return str.replace(/[A-Z]/g, (c6) => `-${c6.toLowerCase()}`);
}
function buildStyleAttribute(options) {
  const { property: property2, value, element } = options;
  if (value) {
    let style = element.getAttribute("style") || "";
    if (style) {
      if (!style.match(HAS_ENDING_COLON)) {
        style += ";";
      }
      style += " ";
    }
    const str = `${property2}: ${value}`;
    if (style.includes(str)) {
      return;
    }
    return `${style}${str};`;
  }
  return null;
}
var _hasRecordedInitialProperties;
var WebAwesomeElement = class extends i6 {
  constructor() {
    super();
    __privateAdd(this, _hasRecordedInitialProperties, false);
    this.initialReflectedProperties = /* @__PURE__ */ new Map();
    this.didSSR = o5 || Boolean(this.shadowRoot);
    this.customStates = {
      /** Adds or removes the specified custom state. */
      set: (customState, active) => {
        var _a16;
        if (!Boolean((_a16 = this.internals) == null ? void 0 : _a16.states)) return;
        try {
          if (active) {
            this.internals.states.add(customState);
          } else {
            this.internals.states.delete(customState);
          }
        } catch (e10) {
          if (String(e10).includes("must start with '--'")) {
            console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");
          } else {
            throw e10;
          }
        }
      },
      /** Determines whether or not the element currently has the specified state. */
      has: (customState) => {
        var _a16;
        if (!Boolean((_a16 = this.internals) == null ? void 0 : _a16.states)) return false;
        try {
          return this.internals.states.has(customState);
        } catch (e10) {
          return false;
        }
      }
    };
    try {
      this.internals = this.attachInternals();
    } catch (e10) {
      console.error("Element internals are not supported in your browser. Consider using a polyfill");
    }
    this.customStates.set("wa-defined", true);
    let Self = this.constructor;
    for (let [property2, spec] of Self.elementProperties) {
      if (spec.default === "inherit" && spec.initial !== void 0 && typeof property2 === "string") {
        this.customStates.set(`initial-${property2}-${spec.initial}`, true);
      }
    }
  }
  /** Prepends host styles to the component's styles. */
  static get styles() {
    const styles = Array.isArray(this.css) ? this.css : this.css ? [this.css] : [];
    return [host_styles_default, ...styles];
  }
  connectedCallback() {
    var _a16;
    super.connectedCallback();
    if (!this.didSSR) {
      (_a16 = this.shadowRoot) == null ? void 0 : _a16.prepend(
        document.createComment(
          ` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-", "")} `
        )
      );
    }
    if (this.didSSR) {
      this.updateComplete.then(() => {
        var _a17;
        (_a17 = this.shadowRoot) == null ? void 0 : _a17.prepend(
          document.createComment(
            ` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-", "")} `
          )
        );
      });
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (!__privateGet(this, _hasRecordedInitialProperties)) {
      this.constructor.elementProperties.forEach(
        (obj, prop) => {
          if (obj.reflect && this[prop] != null) {
            this.initialReflectedProperties.set(prop, this[prop]);
          }
        }
      );
      __privateSet(this, _hasRecordedInitialProperties, true);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    this.initialReflectedProperties.forEach((value, prop) => {
      if (changedProperties.has(prop) && this[prop] == null) {
        this[prop] = value;
      }
    });
  }
  firstUpdated(changedProperties) {
    var _a16;
    super.firstUpdated(changedProperties);
    if (this.didSSR) {
      (_a16 = this.shadowRoot) == null ? void 0 : _a16.querySelectorAll("slot").forEach((slotElement) => {
        slotElement.dispatchEvent(new Event("slotchange", { bubbles: true, composed: false, cancelable: false }));
      });
    }
  }
  update(changedProperties) {
    try {
      super.update(changedProperties);
    } catch (e10) {
      if (this.didSSR && !this.hasUpdated) {
        const event = new Event("lit-hydration-error", { bubbles: true, composed: true, cancelable: false });
        event.error = e10;
        this.dispatchEvent(event);
      }
      throw e10;
    }
  }
  /**
   * @internal
   * Internal way to set styles across both client and server
   */
  setStyle(property2, value) {
    if (!this.style) {
      const str = buildStyleAttribute({
        // because this is going to be serialized to an HTML style attribute, need to transform the casing.
        property: camelToKebab(property2),
        value,
        element: this
      });
      if (str) {
        this.setAttribute("style", str);
      }
      return;
    }
    this.style[property2] = value;
  }
  /**
   * @internal
   * Internal way to set a CSS custom property across both client and server.
   */
  setStyleProperty(property2, value) {
    if (!this.style) {
      const str = buildStyleAttribute({
        // because this is going to be serialized to an HTML style attribute, need to transform the casing.
        property: property2,
        value,
        element: this
      });
      if (str) {
        this.setAttribute("style", str);
      }
      return;
    }
    this.style.setProperty(property2, value);
  }
  /**
   * @internal Given a native event, this function cancels it and dispatches it again from the host element using the desired
   * event options.
   */
  relayNativeEvent(event, eventOptions) {
    event.stopImmediatePropagation();
    this.dispatchEvent(
      new event.constructor(event.type, __spreadValues(__spreadValues({}, event), eventOptions))
    );
  }
};
_hasRecordedInitialProperties = /* @__PURE__ */ new WeakMap();
__decorateClass([
  n5()
], WebAwesomeElement.prototype, "dir", 2);
__decorateClass([
  n5()
], WebAwesomeElement.prototype, "lang", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true, attribute: "did-ssr" })
], WebAwesomeElement.prototype, "didSSR", 2);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.KBXNFZQL.js
var CustomErrorValidator = () => {
  return {
    observedAttributes: ["custom-error"],
    checkValidity(element) {
      const validity = {
        message: "",
        isValid: true,
        invalidKeys: []
      };
      if (element.customError) {
        validity.message = element.customError;
        validity.isValid = false;
        validity.invalidKeys = ["customError"];
      }
      return validity;
    }
  };
};
var WebAwesomeFormAssociatedElement = class extends WebAwesomeElement {
  constructor() {
    super();
    this.name = null;
    this.disabled = false;
    this.required = false;
    this.assumeInteractionOn = ["input"];
    this.validators = [];
    this.valueHasChanged = false;
    this.hasInteracted = false;
    this.customError = null;
    this.emittedEvents = [];
    this.emitInvalid = (e10) => {
      if (e10.target !== this) return;
      this.hasInteracted = true;
      this.dispatchEvent(new WaInvalidEvent());
    };
    this.handleInteraction = (event) => {
      var _a16;
      const emittedEvents = this.emittedEvents;
      if (!emittedEvents.includes(event.type)) {
        emittedEvents.push(event.type);
      }
      if (emittedEvents.length === ((_a16 = this.assumeInteractionOn) == null ? void 0 : _a16.length)) {
        this.hasInteracted = true;
      }
    };
    if ("addEventListener" in this) {
      this.addEventListener("invalid", this.emitInvalid);
    }
  }
  /**
   * Validators are static because they have `observedAttributes`, essentially attributes to "watch"
   * for changes. Whenever these attributes change, we want to be notified and update the validator.
   */
  static get validators() {
    return o5 ? [] : [CustomErrorValidator()];
  }
  // Append all Validator "observedAttributes" into the "observedAttributes" so they can run.
  static get observedAttributes() {
    const parentAttrs = new Set(super.observedAttributes || []);
    for (const validator of this.validators) {
      if (!validator.observedAttributes) {
        continue;
      }
      for (const attr of validator.observedAttributes) {
        parentAttrs.add(attr);
      }
    }
    return [...parentAttrs];
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.didSSR && !this.hasUpdated) {
      this.updateComplete.then(() => {
        this.updateValidity();
      });
    } else {
      this.updateValidity();
    }
    this.assumeInteractionOn.forEach((event) => {
      var _a16;
      (_a16 = this.addEventListener) == null ? void 0 : _a16.call(this, event, this.handleInteraction);
    });
  }
  firstUpdated(...args) {
    super.firstUpdated(...args);
    this.updateValidity();
  }
  willUpdate(changedProperties) {
    if (!o5 && changedProperties.has("customError")) {
      if (!this.customError) {
        this.customError = null;
      }
      this.setCustomValidity(this.customError || "");
    }
    if (changedProperties.has("value") || changedProperties.has("disabled") || changedProperties.has("defaultValue")) {
      const value = this.value;
      this.updateFormValue(value);
    }
    if (changedProperties.has("disabled")) {
      this.customStates.set("disabled", this.disabled);
      if (this.hasAttribute("disabled") || !o5 && !this.matches(":disabled")) {
        this.toggleAttribute("disabled", this.disabled);
      }
    }
    super.willUpdate(changedProperties);
    if (this.didSSR && !this.hasUpdated) {
      this.updateComplete.then(() => this.updateValidity());
    } else {
      this.updateValidity();
    }
  }
  /**
   * @internal
   */
  updateFormValue(value) {
    if (Array.isArray(value)) {
      if (this.name) {
        const formData = new FormData();
        for (const val of value) {
          formData.append(this.name, val);
        }
        this.setValue(formData, formData);
      }
    } else {
      this.setValue(value, value);
    }
  }
  get labels() {
    return this.internals.labels;
  }
  getForm() {
    return this.internals.form;
  }
  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  set form(val) {
    if (val) {
      this.setAttribute("form", val);
    } else {
      this.removeAttribute("form");
    }
  }
  get form() {
    return this.internals.form;
  }
  get validity() {
    return this.internals.validity;
  }
  // Not sure if this supports `novalidate`. Will need to test.
  get willValidate() {
    return this.internals.willValidate;
  }
  get validationMessage() {
    return this.internals.validationMessage;
  }
  checkValidity() {
    this.updateValidity();
    return this.internals.checkValidity();
  }
  reportValidity() {
    this.updateValidity();
    this.hasInteracted = true;
    return this.internals.reportValidity();
  }
  /**
   * Override this to change where constraint validation popups are anchored.
   */
  get validationTarget() {
    return this.input || void 0;
  }
  setValidity(...args) {
    const flags = args[0];
    const message = args[1];
    let anchor = args[2];
    if (!anchor) {
      anchor = this.validationTarget;
    }
    this.internals.setValidity(flags, message, anchor || void 0);
    this.requestUpdate("validity");
    this.setCustomStates();
  }
  setCustomStates() {
    const required = Boolean(this.required);
    const isValid = this.internals.validity.valid;
    const hasInteracted = this.hasInteracted;
    this.customStates.set("required", required);
    this.customStates.set("optional", !required);
    this.customStates.set("invalid", !isValid);
    this.customStates.set("valid", isValid);
    this.customStates.set("user-invalid", !isValid && hasInteracted);
    this.customStates.set("user-valid", isValid && hasInteracted);
  }
  /**
   * Do not use this when creating a "Validator". This is intended for end users of components.
   * We track manually defined custom errors so we don't clear them on accident in our validators.
   *
   */
  setCustomValidity(message) {
    if (!message) {
      this.customError = null;
      this.setValidity({});
      return;
    }
    this.customError = message;
    this.setValidity({ customError: true }, message, this.validationTarget);
  }
  formResetCallback() {
    this.resetValidity();
    this.hasInteracted = false;
    this.valueHasChanged = false;
    this.emittedEvents = [];
    this.updateValidity();
  }
  formDisabledCallback(isDisabled) {
    this.disabled = isDisabled;
    this.updateValidity();
  }
  /**
   * Called when the browser is trying to restore element’s state to state in which case reason is "restore", or when
   * the browser is trying to fulfill autofill on behalf of user in which case reason is "autocomplete". In the case of
   * "restore", state is a string, File, or FormData object previously set as the second argument to setFormValue.
   */
  formStateRestoreCallback(state, reason) {
    if (this.didSSR && !this.hasUpdated) {
      this.updateComplete.then(() => {
        this.value = state;
        if (reason === "restore") {
          this.resetValidity();
        }
        this.updateValidity();
      });
    } else {
      this.value = state;
      if (reason === "restore") {
        this.resetValidity();
      }
      this.updateValidity();
    }
  }
  setValue(...args) {
    const [value, state] = args;
    this.internals.setFormValue(value, state);
  }
  get allValidators() {
    const staticValidators = this.constructor.validators || [];
    const validators = this.validators || [];
    return [...staticValidators, ...validators];
  }
  /**
   * Reset validity is a way of removing manual custom errors and native validation.
   */
  resetValidity() {
    this.setCustomValidity("");
    this.setValidity({});
  }
  updateValidity() {
    if (this.disabled || this.hasAttribute("disabled") || !this.willValidate) {
      this.resetValidity();
      return;
    }
    const validators = this.allValidators;
    if (!(validators == null ? void 0 : validators.length)) {
      return;
    }
    const flags = {
      // Don't trust custom errors from the Browser. Safari breaks the spec.
      customError: Boolean(this.customError)
    };
    const formControl = this.validationTarget || this.input || void 0;
    let finalMessage = "";
    for (const validator of validators) {
      const { isValid, message, invalidKeys } = validator.checkValidity(this);
      if (isValid) {
        continue;
      }
      if (!finalMessage) {
        finalMessage = message;
      }
      if ((invalidKeys == null ? void 0 : invalidKeys.length) >= 0) {
        invalidKeys.forEach((str) => flags[str] = true);
      }
    }
    if (!finalMessage) {
      finalMessage = this.validationMessage;
    }
    this.setValidity(flags, finalMessage, formControl);
  }
};
WebAwesomeFormAssociatedElement.formAssociated = true;
__decorateClass([
  n5({ reflect: true })
], WebAwesomeFormAssociatedElement.prototype, "name", 2);
__decorateClass([
  n5({ type: Boolean })
], WebAwesomeFormAssociatedElement.prototype, "disabled", 2);
__decorateClass([
  n5({ state: true, attribute: false })
], WebAwesomeFormAssociatedElement.prototype, "valueHasChanged", 2);
__decorateClass([
  n5({ state: true, attribute: false })
], WebAwesomeFormAssociatedElement.prototype, "hasInteracted", 2);
__decorateClass([
  n5({ attribute: "custom-error", reflect: true })
], WebAwesomeFormAssociatedElement.prototype, "customError", 2);
__decorateClass([
  n5({ attribute: false, state: true, type: Object })
], WebAwesomeFormAssociatedElement.prototype, "validity", 1);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.RPQJAXXR.js
var DEPRECATION_MAP = {
  small: "s",
  medium: "m",
  large: "l"
};
var warned = /* @__PURE__ */ new Set();
function warnDeprecatedSize(tagName, value) {
  if (value in DEPRECATION_MAP && !warned.has(`${tagName}:${value}`)) {
    warned.add(`${tagName}:${value}`);
    console.warn(
      `[${tagName}] size="${value}" is deprecated. Use size="${DEPRECATION_MAP[value]}" instead. The long-form value will be removed in the next major version.`
    );
  }
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.RWNXKUCF.js
var HasSlotController = class {
  constructor(host, ...slotNames) {
    this.slotNames = [];
    this.handleSlotChange = (event) => {
      const slot = event.target;
      if (this.slotNames.includes("[default]") && !slot.name || slot.name && this.slotNames.includes(slot.name)) {
        this.host.requestUpdate();
      }
    };
    (this.host = host).addController(this);
    this.slotNames = slotNames;
  }
  hasDefaultSlot() {
    if (!this.host.childNodes) {
      return false;
    }
    return [...this.host.childNodes].some((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
        return true;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node;
        const tagName = el.tagName.toLowerCase();
        if (tagName === "wa-visually-hidden") {
          return false;
        }
        if (!el.hasAttribute("slot")) {
          return true;
        }
      }
      return false;
    });
  }
  hasNamedSlot(name) {
    var _a16, _b2;
    return ((_b2 = (_a16 = this.host).querySelector) == null ? void 0 : _b2.call(_a16, `:scope > [slot="${name}"]`)) !== null;
  }
  /**
   * @param slotName     - Name of the slot to look for
   * @param propertyName - Generally we infer via `withHeader` property on the host, but in cases where its different, you can specify a manual property name.
   */
  test(slotName, propertyName) {
    if (propertyName && this.host.didSSR && !this.host.hasUpdated) {
      return Boolean(this.host[propertyName]);
    }
    return slotName === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
  }
  hostConnected() {
    const shadowRoot = this.host.shadowRoot;
    if (shadowRoot && "addEventListener" in shadowRoot) {
      shadowRoot.addEventListener("slotchange", this.handleSlotChange);
    }
  }
  hostDisconnected() {
    const shadowRoot = this.host.shadowRoot;
    if (shadowRoot && "removeEventListener" in shadowRoot) {
      shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
    }
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.G5ZZIGWB.js
var size_styles_default = i4`
  :host([size='xs']) {
    font-size: var(--wa-font-size-xs);
  }

  :host([size='s']),
  :host([size='small']) {
    font-size: var(--wa-font-size-s);
  }

  :host([size='m']),
  :host([size='medium']) {
    font-size: var(--wa-font-size-m);
  }

  :host([size='l']),
  :host([size='large']) {
    font-size: var(--wa-font-size-l);
  }

  :host([size='xl']) {
    font-size: var(--wa-font-size-xl);
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.3CFUTVFX.js
var button_styles_default = i4`
  @layer wa-component {
    :host {
      display: inline-block;

      /* Workaround because Chrome doesn't like :host(:has()) below
       * https://issues.chromium.org/issues/40062355
       * Firefox doesn't like this nested rule, so both are needed */
      &:has(wa-badge) {
        position: relative;
      }
    }

    /* Apply relative positioning only when needed to position wa-badge
     * This avoids creating a new stacking context for every button */
    :host(:has(wa-badge)) {
      position: relative;
    }
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition-property: background, border, box-shadow, color, opacity, transform;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    transform-origin: center;
    cursor: pointer;
    padding: 0 var(--wa-form-control-padding-inline);
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--wa-font-weight-action);
    height: var(--wa-form-control-height);
    width: 100%;

    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));

    border-color: transparent;
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-form-control-border-radius));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-form-control-border-radius));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-form-control-border-radius));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-form-control-border-radius));
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
  }

  /* Hover and active transforms */
  .button:not(.disabled):not(.loading) {
    @media (hover: hover) {
      &:hover {
        transform: var(--wa-button-transform-hover);
      }
    }
    &:active {
      transform: var(--wa-button-transform-active);
    }

    @media (prefers-reduced-motion: reduce) {
      &:hover,
      &:active {
        transform: none;
      }
    }
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled-outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='accent']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
        var(--wa-color-mix-active)
      );
    }
  }

  /* Focus states */
  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled state */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;

    /* When disabled, prevent mouse events from bubbling up from children */
    .button {
      pointer-events: none;
    }
  }

  /* Keep it last so Safari doesn't stop parsing this block */
  .button::-moz-focus-inner {
    border: 0;
  }

  /* Icon buttons */
  .button.is-icon-button {
    outline-offset: 2px;
    width: var(--wa-form-control-height);
    aspect-ratio: 1;
  }

  /* Icon buttons with a caret need to grow to fit both the icon and the caret */
  .button.is-icon-button.caret {
    width: auto;
    aspect-ratio: auto;
    min-width: var(--wa-form-control-height);
  }

  /* Pill modifier */
  :host([pill]) .button {
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-border-radius-pill));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-border-radius-pill));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-border-radius-pill));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-border-radius-pill));
  }

  /*
   * Label
   */

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .label {
    display: inline-block;
  }

  .is-icon-button .label {
    display: flex;
    justify-content: center;
  }

  .label::slotted(wa-icon) {
    align-self: center;
  }

  /*
   * Caret modifier
   */

  wa-icon[part='caret'] {
    display: flex;
    align-self: center;
    align-items: center;

    &::part(svg) {
      width: 0.875em;
      height: 0.875em;
    }

    .button:has(&) .end {
      display: none;
    }
  }

  /*
   * Loading modifier
   */

  .loading {
    position: relative;
    cursor: wait;

    .start,
    .label,
    .end,
    .caret {
      visibility: hidden;
    }

    wa-spinner {
      --indicator-color: currentColor;
      --track-color: color-mix(in oklab, currentColor, transparent 90%);

      position: absolute;
      font-size: 1em;
      height: 1em;
      width: 1em;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }
  }

  /*
   * Badges
   */

  .button ::slotted(wa-badge) {
    border-color: var(--wa-color-surface-default);
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  :host(:dir(rtl)) ::slotted(wa-badge) {
    translate: -50% -50%;
  }

  /*
  * Button spacing
  */

  slot[name='start']::slotted(*) {
    margin-inline-end: 0.75em;
  }

  slot[name='end']::slotted(*),
  .button:not(.visually-hidden-label) [part='caret'] {
    margin-inline-start: 0.75em;
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.XNTP7DEQ.js
var variants_styles_default = i4`
  :where(:root),
  .wa-neutral,
  :host([variant='neutral']) {
    --wa-color-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-border-loud: var(--wa-color-neutral-border-loud);
    --wa-color-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-on-quiet: var(--wa-color-neutral-on-quiet);
  }

  .wa-brand,
  :host([variant='brand']) {
    --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
    --wa-color-fill-normal: var(--wa-color-brand-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-brand-fill-quiet);
    --wa-color-border-loud: var(--wa-color-brand-border-loud);
    --wa-color-border-normal: var(--wa-color-brand-border-normal);
    --wa-color-border-quiet: var(--wa-color-brand-border-quiet);
    --wa-color-on-loud: var(--wa-color-brand-on-loud);
    --wa-color-on-normal: var(--wa-color-brand-on-normal);
    --wa-color-on-quiet: var(--wa-color-brand-on-quiet);
  }

  .wa-success,
  :host([variant='success']) {
    --wa-color-fill-loud: var(--wa-color-success-fill-loud);
    --wa-color-fill-normal: var(--wa-color-success-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-success-fill-quiet);
    --wa-color-border-loud: var(--wa-color-success-border-loud);
    --wa-color-border-normal: var(--wa-color-success-border-normal);
    --wa-color-border-quiet: var(--wa-color-success-border-quiet);
    --wa-color-on-loud: var(--wa-color-success-on-loud);
    --wa-color-on-normal: var(--wa-color-success-on-normal);
    --wa-color-on-quiet: var(--wa-color-success-on-quiet);
  }

  .wa-warning,
  :host([variant='warning']) {
    --wa-color-fill-loud: var(--wa-color-warning-fill-loud);
    --wa-color-fill-normal: var(--wa-color-warning-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-warning-fill-quiet);
    --wa-color-border-loud: var(--wa-color-warning-border-loud);
    --wa-color-border-normal: var(--wa-color-warning-border-normal);
    --wa-color-border-quiet: var(--wa-color-warning-border-quiet);
    --wa-color-on-loud: var(--wa-color-warning-on-loud);
    --wa-color-on-normal: var(--wa-color-warning-on-normal);
    --wa-color-on-quiet: var(--wa-color-warning-on-quiet);
  }

  .wa-danger,
  :host([variant='danger']) {
    --wa-color-fill-loud: var(--wa-color-danger-fill-loud);
    --wa-color-fill-normal: var(--wa-color-danger-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-danger-fill-quiet);
    --wa-color-border-loud: var(--wa-color-danger-border-loud);
    --wa-color-border-normal: var(--wa-color-danger-border-normal);
    --wa-color-border-quiet: var(--wa-color-danger-border-quiet);
    --wa-color-on-loud: var(--wa-color-danger-on-loud);
    --wa-color-on-normal: var(--wa-color-danger-on-normal);
    --wa-color-on-quiet: var(--wa-color-danger-on-quiet);
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.PZAN6FPN.js
function watch(propertyName, options) {
  const resolvedOptions = __spreadValues({
    waitUntilFirstUpdate: false
  }, options);
  return (proto, decoratedFnName) => {
    const { update: update2 } = proto;
    const watchedProperties = Array.isArray(propertyName) ? propertyName : [propertyName];
    proto.update = function(changedProps) {
      watchedProperties.forEach((property) => {
        const key = property;
        if (changedProps.has(key)) {
          const oldValue = changedProps.get(key);
          const newValue = this[key];
          if (oldValue !== newValue) {
            if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
              this[decoratedFnName](oldValue, newValue);
            }
          }
        }
      });
      update2.call(this, changedProps);
    };
  };
}

// node_modules/@shoelace-style/localize/dist/index.js
var connectedElements = /* @__PURE__ */ new Set();
var translations = /* @__PURE__ */ new Map();
var fallback;
var documentDirection = "ltr";
var documentLanguage = "en";
var isClient = typeof MutationObserver !== "undefined" && typeof document !== "undefined" && typeof document.documentElement !== "undefined";
if (isClient) {
  const documentElementObserver = new MutationObserver(update);
  documentDirection = document.documentElement.dir || "ltr";
  documentLanguage = document.documentElement.lang || navigator.language;
  documentElementObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["dir", "lang"]
  });
}
function registerTranslation(...translation2) {
  translation2.map((t6) => {
    const code = t6.$code.toLowerCase();
    if (translations.has(code)) {
      translations.set(code, Object.assign(Object.assign({}, translations.get(code)), t6));
    } else {
      translations.set(code, t6);
    }
    if (!fallback) {
      fallback = t6;
    }
  });
  update();
}
function update() {
  if (isClient) {
    documentDirection = document.documentElement.dir || "ltr";
    documentLanguage = document.documentElement.lang || navigator.language;
  }
  [...connectedElements.keys()].map((el) => {
    if (typeof el.requestUpdate === "function") {
      el.requestUpdate();
    }
  });
}
var LocalizeController = class {
  constructor(host) {
    this.host = host;
    this.host.addController(this);
  }
  hostConnected() {
    connectedElements.add(this.host);
  }
  hostDisconnected() {
    connectedElements.delete(this.host);
  }
  dir() {
    return `${this.host.dir || documentDirection}`.toLowerCase();
  }
  lang() {
    return `${this.host.lang || documentLanguage}`.toLowerCase();
  }
  getTranslationData(lang) {
    var _a16, _b2;
    let locale;
    try {
      locale = new Intl.Locale(lang.replace(/_/g, "-"));
    } catch (_c) {
      return { locale: void 0, language: "", region: "", primary: void 0, secondary: void 0 };
    }
    const language = locale.language.toLowerCase();
    const region = (_b2 = (_a16 = locale.region) === null || _a16 === void 0 ? void 0 : _a16.toLowerCase()) !== null && _b2 !== void 0 ? _b2 : "";
    const primary = translations.get(`${language}-${region}`);
    const secondary = translations.get(language);
    return { locale, language, region, primary, secondary };
  }
  exists(key, options) {
    var _a16;
    const { primary, secondary } = this.getTranslationData((_a16 = options.lang) !== null && _a16 !== void 0 ? _a16 : this.lang());
    options = Object.assign({ includeFallback: false }, options);
    if (primary && primary[key] || secondary && secondary[key] || options.includeFallback && fallback && fallback[key]) {
      return true;
    }
    return false;
  }
  term(key, ...args) {
    const { primary, secondary } = this.getTranslationData(this.lang());
    let term;
    if (primary && primary[key]) {
      term = primary[key];
    } else if (secondary && secondary[key]) {
      term = secondary[key];
    } else if (fallback && fallback[key]) {
      term = fallback[key];
    } else {
      console.error(`No translation found for: ${String(key)}`);
      return String(key);
    }
    if (typeof term === "function") {
      return term(...args);
    }
    return term;
  }
  date(dateToFormat, options) {
    dateToFormat = new Date(dateToFormat);
    return new Intl.DateTimeFormat(this.lang(), options).format(dateToFormat);
  }
  number(numberToFormat, options) {
    numberToFormat = Number(numberToFormat);
    return isNaN(numberToFormat) ? "" : new Intl.NumberFormat(this.lang(), options).format(numberToFormat);
  }
  relativeTime(value, unit, options) {
    return new Intl.RelativeTimeFormat(this.lang(), options).format(value, unit);
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.HK4J654O.js
var translation = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  carousel: "Carousel",
  captions: "Captions",
  chooseDate: "Choose date",
  chooseDecade: "Choose decade",
  chooseMonth: "Choose month",
  chooseYear: "Choose year",
  clearEntry: "Clear entry",
  close: "Close",
  closeCalendar: "Close calendar",
  createOption: (value) => `Create "${value}"`,
  copied: "Copied",
  copy: "Copy",
  currentValue: "Current value",
  date: "Date",
  datePickerKeyboardHelp: "Use arrow keys to change values; press Alt+Down Arrow to open the calendar.",
  day: "Day",
  incompleteDate: "Enter a valid date.",
  dropFileHere: "Drop file here or click to browse",
  decrement: "Decrement",
  dropFilesHere: "Drop files here or click to browse",
  empty: "Empty",
  endDate: "End date",
  error: "Error",
  enterFullscreen: "Enter fullscreen",
  exitFullscreen: "Exit fullscreen",
  goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
  hidePassword: "Hide password",
  increment: "Increment",
  loading: "Loading",
  month: "Month",
  moreOptions: "More Options",
  mute: "Mute",
  nextDecade: "Next decade",
  nextMonth: "Next month",
  nextSlide: "Next slide",
  nextVideo: "Next Video",
  nextYear: "Next year",
  numCharacters: (num) => {
    if (num === 1) return "1 character";
    return `${num} characters`;
  },
  numCharactersRemaining: (num) => {
    if (num === 1) return "1 character remaining";
    return `${num} characters remaining`;
  },
  numOptionsSelected: (num) => {
    if (num === 0) return "No options selected";
    if (num === 1) return "1 option selected";
    return `${num} options selected`;
  },
  pause: "Pause",
  pauseAnimation: "Pause animation",
  pictureInPicture: "Picture in picture",
  play: "Play",
  playbackSpeed: "Playback speed",
  playlist: "Playlist",
  playAnimation: "Play animation",
  previousDecade: "Previous decade",
  previousMonth: "Previous month",
  previousSlide: "Previous slide",
  previousVideo: "Previous video",
  previousYear: "Previous year",
  progress: "Progress",
  rangeTooLong: (max2) => {
    if (max2 === 1) return "Select a range no longer than 1 day";
    return `Select a range no longer than ${max2} days`;
  },
  rangeTooShort: (min2) => {
    if (min2 === 1) return "Select a range at least 1 day long";
    return `Select a range at least ${min2} days long`;
  },
  readonly: "Read-only",
  selected: "Selected",
  selectedDateLabel: (date) => `Selected: ${date}`,
  selectedRangeLabel: (range) => `Selected range: ${range}`,
  selectionCleared: "Selection cleared",
  remove: "Remove",
  resize: "Resize",
  scrollableRegion: "Scrollable region",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  slideNum: (slide) => `Slide ${slide}`,
  startDate: "Start date",
  today: "Today",
  toggleColorFormat: "Toggle color format",
  seek: "Seek",
  seekProgress: (current, duration) => `${current} of ${duration}`,
  currentlyPlaying: "currently playing",
  unmute: "Unmute",
  videoPlayer: "Video player",
  volume: "Volume",
  year: "Year",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  am: "AM",
  chooseTime: "Choose time",
  closeTimeInput: "Close time picker",
  dayPeriod: "AM/PM",
  hour: "Hour",
  minute: "Minute",
  now: "Now",
  pm: "PM",
  second: "Second",
  time: "Time",
  timeInputKeyboardHelp: "Use arrow keys to change values; press Alt+Down Arrow to open the time picker."
};
registerTranslation(translation);
var en_default = translation;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.CDGKIW7Y.js
var LocalizeController2 = class extends LocalizeController {
  lang() {
    if (this.host.didSSR && !this.host.hasUpdated) {
      return this.host.lang || "en";
    }
    return super.lang();
  }
};
registerTranslation(en_default);

// node_modules/lit-html/directives/class-map.js
var e7 = e2(class extends i3 {
  constructor(t6) {
    var _a16;
    if (super(t6), t6.type !== t2.ATTRIBUTE || "class" !== t6.name || ((_a16 = t6.strings) == null ? void 0 : _a16.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t6) {
    return " " + Object.keys(t6).filter((s5) => t6[s5]).join(" ") + " ";
  }
  update(s5, [i9]) {
    var _a16, _b2;
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s5.strings && (this.nt = new Set(s5.strings.join(" ").split(/\s/).filter((t6) => "" !== t6)));
      for (const t6 in i9) i9[t6] && !((_a16 = this.nt) == null ? void 0 : _a16.has(t6)) && this.st.add(t6);
      return this.render(i9);
    }
    const r9 = s5.element.classList;
    for (const t6 of this.st) t6 in i9 || (r9.remove(t6), this.st.delete(t6));
    for (const t6 in i9) {
      const s6 = !!i9[t6];
      s6 === this.st.has(t6) || ((_b2 = this.nt) == null ? void 0 : _b2.has(t6)) || (s6 ? (r9.add(t6), this.st.add(t6)) : (r9.remove(t6), this.st.delete(t6)));
    }
    return E;
  }
});

// node_modules/lit-html/directives/if-defined.js
var o7 = (o10) => o10 != null ? o10 : A;

// node_modules/lit-html/static.js
var a3 = Symbol.for("");
var o8 = (t6) => {
  if ((t6 == null ? void 0 : t6.r) === a3) return t6 == null ? void 0 : t6._$litStatic$;
};
var i7 = (t6, ...r9) => ({ _$litStatic$: r9.reduce((r10, e10, a4) => r10 + ((t7) => {
  if (void 0 !== t7._$litStatic$) return t7._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t7}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(e10) + t6[a4 + 1], t6[0]), r: a3 });
var l5 = /* @__PURE__ */ new Map();
var n6 = (t6) => (r9, ...e10) => {
  const a4 = e10.length;
  let s5, i9;
  const n7 = [], u5 = [];
  let c6, $3 = 0, f4 = false;
  for (; $3 < a4; ) {
    for (c6 = r9[$3]; $3 < a4 && void 0 !== (i9 = e10[$3], s5 = o8(i9)); ) c6 += s5 + r9[++$3], f4 = true;
    $3 !== a4 && u5.push(i9), n7.push(c6), $3++;
  }
  if ($3 === a4 && n7.push(r9[a4]), f4) {
    const t7 = n7.join("$$lit$$");
    void 0 === (r9 = l5.get(t7)) && (n7.raw = n7, l5.set(t7, r9 = n7)), e10 = u5;
  }
  return t6(r9, ...e10);
};
var u4 = n6(b);
var c5 = n6(w);
var $2 = n6(T);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.N2SS4JTL.js
var WaButton = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.assumeInteractionOn = ["click"];
    this.hasSlotController = new HasSlotController(this, "[default]", "start", "end");
    this.localize = new LocalizeController2(this);
    this.invalid = false;
    this.isIconButton = false;
    this.title = "";
    this.variant = "neutral";
    this.appearance = "accent";
    this.size = "m";
    this.withCaret = false;
    this.withStart = false;
    this.withEnd = false;
    this.disabled = false;
    this.loading = false;
    this.pill = false;
    this.type = "button";
  }
  static get validators() {
    return [...super.validators, MirrorValidator()];
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  constructLightDOMButton() {
    const button = document.createElement("button");
    for (const attribute of this.attributes) {
      if (attribute.name === "style") {
        continue;
      }
      button.setAttribute(attribute.name, attribute.value);
    }
    button.type = this.type;
    button.style.position = "absolute !important";
    button.style.width = "0 !important";
    button.style.height = "0 !important";
    button.style.clipPath = "inset(50%) !important";
    button.style.overflow = "hidden !important";
    button.style.whiteSpace = "nowrap !important";
    if (this.name) {
      button.name = this.name;
    }
    button.value = this.value || "";
    return button;
  }
  handleClick(event) {
    var _a16;
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (this.type !== "submit" && this.type !== "reset") {
      return;
    }
    const form = this.getForm();
    if (!form) return;
    const lightDOMButton = this.constructLightDOMButton();
    (_a16 = this.parentElement) == null ? void 0 : _a16.append(lightDOMButton);
    lightDOMButton.click();
    lightDOMButton.remove();
  }
  handleInvalid() {
    this.dispatchEvent(new WaInvalidEvent());
  }
  handleLabelSlotChange() {
    const nodes = this.labelSlot.assignedNodes({ flatten: true });
    let hasIconLabel = false;
    let hasIcon = false;
    let hasText = false;
    let hasOtherElements = false;
    [...nodes].forEach((node) => {
      var _a16;
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;
        if (element.localName === "wa-icon") {
          hasIcon = true;
          if (!hasIconLabel) hasIconLabel = element.label !== void 0;
        } else {
          hasOtherElements = true;
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        const text = ((_a16 = node.textContent) == null ? void 0 : _a16.trim()) || "";
        if (text.length > 0) {
          hasText = true;
        }
      }
    });
    this.isIconButton = hasIcon && !hasText && !hasOtherElements;
    this.customStates.set("icon-button", this.isIconButton);
    if (this.isIconButton && !hasIconLabel) {
      console.warn(
        'Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',
        this
      );
    }
  }
  isButton() {
    return this.href ? false : true;
  }
  isLink() {
    return this.href ? true : false;
  }
  handleDisabledChange() {
    this.customStates.set("disabled", this.disabled);
    this.updateValidity();
  }
  handleHrefChange() {
    this.customStates.set("link", this.isLink());
  }
  handleLoadingChange() {
    this.customStates.set("loading", this.loading);
  }
  // eslint-disable-next-line
  setValue(..._args) {
  }
  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }
  render() {
    const isLink = this.isLink();
    const tag = isLink ? i7`a` : i7`button`;
    return u4`
      <${tag}
        part="base"
        class=${e7({
      button: true,
      caret: this.withCaret,
      disabled: this.disabled,
      loading: this.loading,
      rtl: this.localize.dir() === "rtl",
      "has-label": this.hasSlotController.test("[default]"),
      "has-start": this.hasSlotController.test("start", "withStart"),
      "has-end": this.hasSlotController.test("end", "withEnd"),
      "is-icon-button": this.isIconButton
    })}
        ?disabled=${o7(isLink ? void 0 : this.disabled)}
        type=${o7(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${o7(isLink ? void 0 : this.name)}
        value=${o7(isLink ? void 0 : this.value)}
        href=${o7(isLink ? this.href : void 0)}
        target=${o7(isLink ? this.target : void 0)}
        download=${o7(isLink ? this.download : void 0)}
        rel=${o7(isLink && this.rel ? this.rel : void 0)}
        role=${o7(isLink ? void 0 : "button")}
        aria-disabled=${o7(isLink && this.disabled ? "true" : void 0)}
        tabindex=${this.disabled ? "-1" : "0"}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret ? u4`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              ` : ""}
        ${this.loading ? u4`<wa-spinner part="spinner"></wa-spinner>` : ""}
      </${tag}>
    `;
  }
};
WaButton.shadowRootOptions = __spreadProps(__spreadValues({}, WebAwesomeFormAssociatedElement.shadowRootOptions), { delegatesFocus: true });
WaButton.css = [button_styles_default, variants_styles_default, size_styles_default];
__decorateClass([
  e6(".button")
], WaButton.prototype, "button", 2);
__decorateClass([
  e6("slot:not([name])")
], WaButton.prototype, "labelSlot", 2);
__decorateClass([
  r7()
], WaButton.prototype, "invalid", 2);
__decorateClass([
  r7()
], WaButton.prototype, "isIconButton", 2);
__decorateClass([
  n5()
], WaButton.prototype, "title", 2);
__decorateClass([
  n5({ reflect: true })
], WaButton.prototype, "variant", 2);
__decorateClass([
  n5({ reflect: true })
], WaButton.prototype, "appearance", 2);
__decorateClass([
  n5({ reflect: true })
], WaButton.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaButton.prototype, "handleSizeChange", 1);
__decorateClass([
  n5({ attribute: "with-caret", type: Boolean, reflect: true })
], WaButton.prototype, "withCaret", 2);
__decorateClass([
  n5({ attribute: "with-start", type: Boolean })
], WaButton.prototype, "withStart", 2);
__decorateClass([
  n5({ attribute: "with-end", type: Boolean })
], WaButton.prototype, "withEnd", 2);
__decorateClass([
  n5({ type: Boolean })
], WaButton.prototype, "disabled", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaButton.prototype, "loading", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaButton.prototype, "pill", 2);
__decorateClass([
  n5()
], WaButton.prototype, "type", 2);
__decorateClass([
  n5({ reflect: true })
], WaButton.prototype, "name", 2);
__decorateClass([
  n5({ reflect: true })
], WaButton.prototype, "value", 2);
__decorateClass([
  n5({ reflect: true })
], WaButton.prototype, "href", 2);
__decorateClass([
  n5()
], WaButton.prototype, "target", 2);
__decorateClass([
  n5()
], WaButton.prototype, "rel", 2);
__decorateClass([
  n5()
], WaButton.prototype, "download", 2);
__decorateClass([
  n5({ attribute: "formaction" })
], WaButton.prototype, "formAction", 2);
__decorateClass([
  n5({ attribute: "formenctype" })
], WaButton.prototype, "formEnctype", 2);
__decorateClass([
  n5({ attribute: "formmethod" })
], WaButton.prototype, "formMethod", 2);
__decorateClass([
  n5({ attribute: "formnovalidate", type: Boolean })
], WaButton.prototype, "formNoValidate", 2);
__decorateClass([
  n5({ attribute: "formtarget" })
], WaButton.prototype, "formTarget", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], WaButton.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("href")
], WaButton.prototype, "handleHrefChange", 1);
__decorateClass([
  watch("loading", { waitUntilFirstUpdate: true })
], WaButton.prototype, "handleLoadingChange", 1);
WaButton = __decorateClass([
  t5("wa-button")
], WaButton);
var _a6;
(_a6 = WaButton.disableWarning) == null ? void 0 : _a6.call(WaButton, "change-in-update");

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.W7A2VLCT.js
var spinner_styles_default = i4`
  :host {
    --track-width: 2px;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --speed: 2s;
    --size: 1em;

    /*
      Resizing a spinner element using anything but font-size will break the animation because the animation uses em
      units. Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can
      grow/shrink and break the animation. The use of \`flex: none\` on the host element prevents this by always having
      the spinner sized according to its actual dimensions.
    */
    flex: none;
    display: inline-flex;
    width: var(--size);
    height: var(--size);
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    animation: spin var(--speed) linear infinite;
  }

  .track,
  .indicator {
    --radius: calc(var(--size) / 2 - var(--track-width) / 2);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
    r: var(--radius);
    fill: none;
    stroke-width: var(--track-width);
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: calc(0.597 * var(--circumference)), calc(0.796 * var(--circumference));
    stroke-dashoffset: calc(-0.04 * var(--circumference));
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: calc(0.008 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.278 * var(--circumference));
    }
    100% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.987 * var(--circumference));
    }
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.JBGB3CLX.js
var WaSpinner = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
  }
  render() {
    return b`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" />
        <circle class="indicator" />
      </svg>
    `;
  }
};
WaSpinner.css = spinner_styles_default;
WaSpinner = __decorateClass([
  t5("wa-spinner")
], WaSpinner);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.YDQCS2HK.js
var WaErrorEvent = class extends Event {
  constructor() {
    super("wa-error", { bubbles: true, cancelable: false, composed: true });
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.WDIIGUNP.js
var WaLoadEvent = class extends Event {
  constructor() {
    super("wa-load", { bubbles: true, cancelable: false, composed: true });
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.W6JCCVOH.js
var icon_styles_default = i4`
  :host {
    --primary-color: currentColor;
    --primary-opacity: 1;
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;
    --rotate-angle: 0deg;

    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: -0.125em;
  }

  /* #region Canvas — the box the icon is centered within (mirrors Font Awesome's icon canvas). Orthogonal to font-size. */

  /* Fixed width (default): 1.25em × 1em (20 × 16px) */
  :host(:not([canvas])),
  :host([canvas='fixed']) {
    width: 1.25em;
    height: 1em;
    min-width: 1.25em; /* <-- this is what Safari respects for intrinsic */
    min-height: 1em;
  }

  /* Auto: hug the icon's width. \`auto-width\` is the deprecated alias for canvas="auto". */
  :host([canvas='auto']),
  :host([auto-width]:not([canvas])) {
    width: auto;
    height: 1em;
  }

  /* Square: 1.25em × 1.25em (20 × 20px) */
  :host([canvas='square']) {
    width: 1.25em;
    height: 1.25em;
    min-width: 1.25em;
    min-height: 1.25em;
  }

  /* Roomy: 1.5em × 1.5em (24 × 24px) */
  :host([canvas='roomy']) {
    width: 1.5em;
    height: 1.5em;
    min-width: 1.5em;
    min-height: 1.5em;
  }

  /* #endregion */

  svg {
    fill: currentColor;
    height: 1em;
    overflow: visible;
    width: auto;

    /* Duotone colors with path-specific opacity fallback */
    path[data-duotone-primary] {
      color: var(--primary-color);
      opacity: var(--path-opacity, var(--primary-opacity));
    }

    path[data-duotone-secondary] {
      color: var(--secondary-color);
      opacity: var(--path-opacity, var(--secondary-opacity));
    }
  }

  /* Rotation */
  :host([rotate]) {
    transform: rotate(var(--rotate-angle, 0deg));
  }

  /* Flipping */
  :host([flip='x']) {
    transform: scaleX(-1);
  }
  :host([flip='y']) {
    transform: scaleY(-1);
  }
  :host([flip='both']) {
    transform: scale(-1, -1);
  }

  /* Rotation and Flipping combined */
  :host([rotate][flip='x']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleX(-1);
  }
  :host([rotate][flip='y']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleY(-1);
  }
  :host([rotate][flip='both']) {
    transform: rotate(var(--rotate-angle, 0deg)) scale(-1, -1);
  }

  /* #region Animations — ported from Font Awesome 7.3 (--fa-* props mapped to wa-icon's --* names) */

  :host([animation='beat']) {
    animation-name: beat;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='bounce']) {
    animation-name: bounce;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
  }

  :host([animation='fade']) {
    animation-name: fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='beat-fade']) {
    animation-name: beat-fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='flip']) {
    animation-name: flip;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1.5s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='flip-360']) {
    animation-name: flip-360;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='shake']) {
    animation-name: shake;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.75s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='spin']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-pulse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, steps(8));
  }

  /* spin-reverse is FA's reverse modifier expressed as a standalone value; reverse any spin via --animation-direction: reverse */
  :host([animation='spin-reverse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, reverse);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap']) {
    animation-name: spin-snap;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 3s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap-4']) {
    animation-name: spin-snap-4;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2.4s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap-8']) {
    animation-name: spin-snap-8;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 4s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='buzz']) {
    animation-name: buzz;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.6s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='wag']) {
    animation-name: wag;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.9s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
    transform-origin: bottom center;
  }

  :host([animation='float']) {
    animation-name: float;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 3s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
    will-change: transform;
  }

  :host([animation='swing']) {
    animation-name: swing;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1.2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
    transform-origin: top center;
  }

  :host([animation='jello']) {
    animation-name: jello;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.9s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
  }

  @media (prefers-reduced-motion: reduce) {
    :host([animation='beat']),
    :host([animation='bounce']),
    :host([animation='fade']),
    :host([animation='beat-fade']),
    :host([animation='flip']),
    :host([animation='flip-360']),
    :host([animation='shake']),
    :host([animation='spin']),
    :host([animation='spin-pulse']),
    :host([animation='spin-reverse']),
    :host([animation='spin-snap']),
    :host([animation='spin-snap-4']),
    :host([animation='spin-snap-8']),
    :host([animation='buzz']),
    :host([animation='wag']),
    :host([animation='float']),
    :host([animation='swing']),
    :host([animation='jello']) {
      animation: none !important;
      transition: none !important;
    }
  }

  /* #endregion */

  /* #region Keyframes — ported verbatim from Font Awesome 7.3 */

  @keyframes beat {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(calc(1.25 * var(--beat-scale, 1.25)));
    }
    45% {
      transform: scale(calc(1.22 * var(--beat-scale, 1.22)));
    }
    65% {
      transform: scale(calc(1.25 * var(--beat-scale, 1.25)));
    }
    90% {
      transform: scale(1);
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
      /* No fallback by design (ported from FA 7.3): the first segment uses the user's --animation-timing or the CSS
         initial ease, while the explicit cubic-beziers on later stops drive the bounce physics. */
      animation-timing-function: var(--animation-timing);
    }
    14% {
      transform: scale(var(--bounce-start-scale-x, 1.06), var(--bounce-start-scale-y, 0.94))
        translateY(var(--bounce-anticipation, 3px));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    32% {
      transform: scale(var(--bounce-jump-scale-x, 0.94), var(--bounce-jump-scale-y, 1.12))
        translateY(calc(-1 * var(--bounce-height, 0.5em)));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    52% {
      transform: scale(1, 1) translateY(calc(-1 * var(--bounce-height, 0.5em) * 1.1));
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    70% {
      transform: scale(var(--bounce-land-scale-x, 1.06), var(--bounce-land-scale-y, 0.92)) translateY(0);
      animation-timing-function: cubic-bezier(0.33, 0.33, 0.66, 1);
    }
    85% {
      transform: scale(0.98, 1.04) translateY(calc(-2px * var(--bounce-rebound, 1)));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @keyframes fade {
    0% {
      opacity: 1;
      transform: scale(1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    40% {
      opacity: var(--fade-opacity, 0.4);
      transform: scale(0.98);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes beat-fade {
    0% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    25% {
      opacity: calc(var(--beat-fade-opacity, 0.4) + 0.4);
      transform: scale(var(--beat-fade-scale, 1.28));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    45% {
      opacity: 1;
      transform: scale(var(--beat-fade-scale, 1.25));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    65% {
      opacity: calc(var(--beat-fade-opacity, 0.4) + 0.4);
      transform: scale(var(--beat-fade-scale, 1.28));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
    }
  }

  @keyframes flip {
    0% {
      transform: perspective(2em) scale(1) rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    8% {
      transform: perspective(2em) scale(var(--flip-anticipation-scale, 0.95))
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    35% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.6));
      animation-timing-function: linear;
    }
    65% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.5));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    92% {
      transform: perspective(2em) scale(1)
        rotate3d(
          var(--flip-x, 0),
          var(--flip-y, 1),
          var(--flip-z, 0),
          calc(var(--flip-angle, -360deg) * var(--flip-overshoot, 1.04))
        );
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -360deg));
    }
  }

  @keyframes flip-360 {
    0% {
      transform: perspective(2em) scale(1) rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    8% {
      transform: perspective(2em) scale(var(--flip-anticipation-scale, 0.95))
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    50% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.6));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    80% {
      transform: perspective(2em) scale(1)
        rotate3d(
          var(--flip-x, 0),
          var(--flip-y, 1),
          var(--flip-z, 0),
          calc(var(--flip-angle, -360deg) * var(--flip-overshoot, 1.04))
        );
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -360deg));
    }
  }

  @keyframes shake {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    8% {
      transform: rotate(35deg) translateX(1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    20% {
      transform: rotate(-22deg) translateX(-1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    35% {
      transform: rotate(15deg) translateX(1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    50% {
      transform: rotate(-9deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    65% {
      transform: rotate(5deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    78% {
      transform: rotate(-3deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    90% {
      transform: rotate(1deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    12% {
      transform: rotate(60deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    16.67% {
      transform: rotate(60deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    28.67% {
      transform: rotate(120deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    33.33% {
      transform: rotate(120deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    45.33% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    62% {
      transform: rotate(240deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    66.67% {
      transform: rotate(240deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    78.67% {
      transform: rotate(300deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    83.33% {
      transform: rotate(300deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    95.33% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap-4 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    15% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    25% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    40% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    65% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    75% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    90% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap-8 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    9% {
      transform: rotate(45deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    12.5% {
      transform: rotate(45deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    21.5% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    25% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    34% {
      transform: rotate(135deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    37.5% {
      transform: rotate(135deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    46.5% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    59% {
      transform: rotate(225deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    62.5% {
      transform: rotate(225deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    71.5% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    75% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    84% {
      transform: rotate(315deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    87.5% {
      transform: rotate(315deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    96.5% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes buzz {
    0% {
      transform: translateX(0) rotate(0deg);
      animation-timing-function: cubic-bezier(0.1, 0, 0.9, 1);
    }
    5% {
      transform: translateX(var(--buzz-distance, 4px)) rotate(0.5deg);
    }
    10% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px))) rotate(-0.5deg);
    }
    15% {
      transform: translateX(var(--buzz-distance, 4px)) rotate(0.3deg);
    }
    20% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px))) rotate(-0.3deg);
    }
    25% {
      transform: translateX(calc(var(--buzz-distance, 4px) * 0.7)) rotate(0.2deg);
    }
    30% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px) * 0.7)) rotate(-0.2deg);
    }
    35% {
      transform: translateX(calc(var(--buzz-distance, 4px) * 0.4)) rotate(0.1deg);
    }
    40% {
      transform: translateX(0) rotate(0deg);
    }
    100% {
      transform: translateX(0) rotate(0deg);
    }
  }

  @keyframes wag {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    12% {
      transform: rotate(var(--wag-angle, 12deg));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    24% {
      transform: rotate(2deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    36% {
      transform: rotate(calc(var(--wag-angle, 12deg) * 0.85));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    48% {
      transform: rotate(1deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    58% {
      transform: rotate(calc(var(--wag-angle, 12deg) * 0.6));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    68% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    15% {
      transform: translateY(calc(-0.4 * var(--float-height, 6px))) translateX(var(--float-drift, 1px))
        rotate(var(--float-tilt, 1deg)) scale(1, 1);
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    35% {
      transform: translateY(calc(-1 * var(--float-height, 6px))) translateX(0) rotate(0deg)
        scale(var(--float-stretch-x, 0.98), var(--float-stretch-y, 1.03));
      animation-timing-function: cubic-bezier(0.5, 0, 0.5, 0);
    }
    50% {
      transform: translateY(calc(-0.92 * var(--float-height, 6px))) translateX(calc(-0.5 * var(--float-drift, 1px)))
        rotate(calc(-0.5 * var(--float-tilt, 1deg))) scale(0.995, 1.01);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    70% {
      transform: translateY(calc(-0.3 * var(--float-height, 6px))) translateX(calc(-1 * var(--float-drift, 1px)))
        rotate(calc(-1 * var(--float-tilt, 1deg))) scale(1, 1);
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    90% {
      transform: translateY(calc(0.05 * var(--float-height, 6px))) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: translateY(0) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
    }
  }

  @keyframes swing {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    8% {
      transform: rotate(var(--swing-angle, 22deg));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    18% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.85));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    28% {
      transform: rotate(calc(var(--swing-angle, 22deg) * 0.65));
      animation-timing-function: cubic-bezier(0.35, 0, 0.65, 1);
    }
    38% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.45));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    48% {
      transform: rotate(calc(var(--swing-angle, 22deg) * 0.25));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    56% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.1));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    64% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes jello {
    0% {
      transform: scale(1, 1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    12% {
      transform: scale(var(--jello-scale-x, 1.15), calc(2 - var(--jello-scale-x, 1.15)));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    24% {
      transform: scale(calc(2 - var(--jello-scale-y, 1.12)), var(--jello-scale-y, 1.12));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    36% {
      transform: scale(
        calc(1 + (var(--jello-scale-x, 1.15) - 1) * 0.5),
        calc(2 - (1 + (var(--jello-scale-x, 1.15) - 1) * 0.5))
      );
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    48% {
      transform: scale(
        calc(2 - (1 + (var(--jello-scale-y, 1.12) - 1) * 0.3)),
        calc(1 + (var(--jello-scale-y, 1.12) - 1) * 0.3)
      );
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    58% {
      transform: scale(1.02, 0.98);
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    68% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  /* #endregion */
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.HGBRCPUS.js
var iconPath = "";
var kitCode = "";
function getIconPath() {
  return iconPath.replace(/\/$/, "");
}
function setKitCode(code) {
  kitCode = code;
}
function getKitCode() {
  if (!kitCode) {
    const el = document.querySelector("[data-fa-kit-code]");
    if (el) {
      setKitCode(el.getAttribute("data-fa-kit-code") || "");
    }
  }
  return kitCode;
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.D4VAJWKJ.js
var FA_VERSION = "7.3.0";
function getIconFolder(_name, family, variant) {
  let folder = "solid";
  if (family === "chisel") {
    folder = "chisel-regular";
  }
  if (family === "etch") {
    folder = "etch-solid";
  }
  if (family === "graphite") {
    folder = "graphite-thin";
  }
  if (family === "jelly") {
    folder = "jelly-regular";
    if (variant === "duo-regular") folder = "jelly-duo-regular";
    if (variant === "fill-regular") folder = "jelly-fill-regular";
  }
  if (family === "jelly-duo") {
    folder = "jelly-duo-regular";
  }
  if (family === "jelly-fill") {
    folder = "jelly-fill-regular";
  }
  if (family === "notdog") {
    if (variant === "solid") folder = "notdog-solid";
    if (variant === "duo-solid") folder = "notdog-duo-solid";
  }
  if (family === "notdog-duo") {
    folder = "notdog-duo-solid";
  }
  if (family === "slab") {
    if (variant === "solid" || variant === "regular") folder = "slab-regular";
    if (variant === "press-regular") folder = "slab-press-regular";
  }
  if (family === "slab-press") {
    folder = "slab-press-regular";
  }
  if (family === "slab-duo") {
    folder = "slab-duo-regular";
  }
  if (family === "slab-press-duo") {
    folder = "slab-press-duo-regular";
  }
  if (family === "thumbprint") {
    folder = "thumbprint-light";
  }
  if (family === "utility") {
    folder = "utility-semibold";
  }
  if (family === "utility-duo") {
    folder = "utility-duo-semibold";
  }
  if (family === "utility-fill") {
    folder = "utility-fill-semibold";
  }
  if (family === "whiteboard") {
    folder = "whiteboard-semibold";
  }
  if (family === "mosaic") {
    folder = "mosaic-solid";
  }
  if (family === "pixel") {
    folder = "pixel-regular";
  }
  if (family === "vellum") {
    folder = "vellum-solid";
  }
  if (family === "classic") {
    if (variant === "thin") folder = "thin";
    if (variant === "light") folder = "light";
    if (variant === "regular") folder = "regular";
    if (variant === "solid") folder = "solid";
  }
  if (family === "duotone") {
    if (variant === "thin") folder = "duotone-thin";
    if (variant === "light") folder = "duotone-light";
    if (variant === "regular") folder = "duotone-regular";
    if (variant === "solid") folder = "duotone";
  }
  if (family === "sharp") {
    if (variant === "thin") folder = "sharp-thin";
    if (variant === "light") folder = "sharp-light";
    if (variant === "regular") folder = "sharp-regular";
    if (variant === "solid") folder = "sharp-solid";
  }
  if (family === "sharp-duotone") {
    if (variant === "thin") folder = "sharp-duotone-thin";
    if (variant === "light") folder = "sharp-duotone-light";
    if (variant === "regular") folder = "sharp-duotone-regular";
    if (variant === "solid") folder = "sharp-duotone-solid";
  }
  if (family === "brands") {
    folder = "brands";
  }
  return folder;
}
function getIconUrl(name, family, variant) {
  const folder = getIconFolder(name, family, variant);
  const iconBase = getIconPath();
  if (iconBase) {
    return `${iconBase}/${folder}/${name}.svg`;
  }
  const kitCode2 = getKitCode();
  const isPro = kitCode2.length > 0;
  return isPro ? `https://ka-p.fontawesome.com/releases/v${FA_VERSION}/svgs/${folder}/${name}.svg?token=${encodeURIComponent(kitCode2)}` : `https://ka-f.fontawesome.com/releases/v${FA_VERSION}/svgs/${folder}/${name}.svg`;
}
var library = {
  name: "default",
  resolver: (name, family = "classic", variant = "solid") => {
    return getIconUrl(name, family, variant);
  },
  mutator: (svg, hostEl) => {
    if ((hostEl == null ? void 0 : hostEl.family) && !svg.hasAttribute("data-duotone-initialized")) {
      const { family, variant } = hostEl;
      if (
        // Duotone
        family === "duotone" || // Sharp duotone
        family === "sharp-duotone" || // Notdog duo (correct usage: family="notdog-duo")
        family === "notdog-duo" || // NOTE: family="notdog" variant="duo-solid" is deprecated
        family === "notdog" && variant === "duo-solid" || // Jelly duo (correct usage: family="jelly-duo")
        family === "jelly-duo" || // NOTE: family="jelly" variant="duo-regular" is deprecated
        family === "jelly" && variant === "duo-regular" || // Utility duo (correct usage: family="utility-duo")
        family === "utility-duo" || // Slab duo (new in 7.3)
        family === "slab-duo" || family === "slab-press-duo" || // Thumbprint
        family === "thumbprint"
      ) {
        const paths = [...svg.querySelectorAll("path")];
        const primaryPath = paths.find((p5) => !p5.hasAttribute("opacity"));
        const secondaryPath = paths.find((p5) => p5.hasAttribute("opacity"));
        if (!primaryPath || !secondaryPath) return;
        primaryPath.setAttribute("data-duotone-primary", "");
        secondaryPath.setAttribute("data-duotone-secondary", "");
        if (hostEl.swapOpacity && primaryPath && secondaryPath) {
          const originalOpacity = secondaryPath.getAttribute("opacity") || "0.4";
          primaryPath.style.setProperty("--path-opacity", originalOpacity);
          secondaryPath.style.setProperty("--path-opacity", "1");
        }
        svg.setAttribute("data-duotone-initialized", "");
      }
    }
  }
};
var library_default_default = library;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.XTA2JDH4.js
function dataUri(svg) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
var icons = {
  //
  // Solid variant
  //
  solid: {
    backward: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M236.3 107.1C247.9 96 265 92.9 279.7 99.2C294.4 105.5 304 120 304 136L304 272.3L476.3 107.2C487.9 96 505 92.9 519.7 99.2C534.4 105.5 544 120 544 136L544 504C544 520 534.4 534.5 519.7 540.8C505 547.1 487.9 544 476.3 532.9L304 367.7L304 504C304 520 294.4 534.5 279.7 540.8C265 547.1 247.9 544 236.3 532.9L44.3 348.9C36.5 341.3 32 330.9 32 320C32 309.1 36.5 298.7 44.3 291.1L236.3 107.1z"/></svg>`,
    "backward-step": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>`,
    "chevron-down": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>`,
    "chevron-left": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>`,
    "chevron-right": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>`,
    circle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>`,
    "closed-captioning": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M64 192C64 156.7 92.7 128 128 128L512 128C547.3 128 576 156.7 576 192L576 448C576 483.3 547.3 512 512 512L128 512C92.7 512 64 483.3 64 448L64 192zM216 272L248 272C252.4 272 256 275.6 256 280C256 293.3 266.7 304 280 304C293.3 304 304 293.3 304 280C304 249.1 278.9 224 248 224L216 224C185.1 224 160 249.1 160 280L160 360C160 390.9 185.1 416 216 416L248 416C278.9 416 304 390.9 304 360C304 346.7 293.3 336 280 336C266.7 336 256 346.7 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 280C208 275.6 211.6 272 216 272zM384 280C384 275.6 387.6 272 392 272L424 272C428.4 272 432 275.6 432 280C432 293.3 442.7 304 456 304C469.3 304 480 293.3 480 280C480 249.1 454.9 224 424 224L392 224C361.1 224 336 249.1 336 280L336 360C336 390.9 361.1 416 392 416L424 416C454.9 416 480 390.9 480 360C480 346.7 469.3 336 456 336C442.7 336 432 346.7 432 360C432 364.4 428.4 368 424 368L392 368C387.6 368 384 364.4 384 360L384 280z"/></svg>`,
    "closed-captioning-slash": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M39 39.1C48.4 29.7 63.6 29.7 72.9 39.1L161.8 128L512 128C547.3 128 576 156.7 576 192L576 448C576 473.5 561.1 495.4 539.6 505.8L601 567.1C610.4 576.5 610.4 591.7 601 601C591.6 610.3 576.4 610.4 567.1 601L39 73.1C29.7 63.7 29.7 48.5 39 39.1zM384 350.1L384 279.9C384 275.5 387.6 271.9 392 271.9L424 271.9C428.4 271.9 432 275.5 432 279.9C432 293.2 442.7 303.9 456 303.9C469.3 303.9 480 293.2 480 279.9C480 249 454.9 223.9 424 223.9L392 223.9C361.1 223.9 336 249 336 279.9L336 302.1L384 350.1zM445.5 411.6C465.7 403.2 480 383.2 480 359.9C480 346.6 469.3 335.9 456 335.9C442.7 335.9 432 346.6 432 359.9C432 364.3 428.4 367.9 424 367.9L401.8 367.9L445.5 411.6zM162.3 264.1C160.8 269.1 160 274.5 160 280L160 360C160 390.9 185.1 416 216 416L248 416C266.1 416 282.1 407.5 292.4 394.2L410.2 512L128 512C92.7 512 64 483.3 64 448L64 192C64 184.2 65.4 176.7 68 169.8L162.3 264.1zM256.1 357.9C256 358.6 256 359.3 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 309.8L256.1 357.9z"/></svg>`,
    compress: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M160 64c0-17.7-14.3-32-32-32S96 46.3 96 64l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z"/></svg>`,
    "ellipsis-vertical": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"/></svg>`,
    expand: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 96C110.3 96 96 110.3 96 128L96 224C96 241.7 110.3 256 128 256C145.7 256 160 241.7 160 224L160 160L224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L128 96zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 512C96 529.7 110.3 544 128 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480L160 416zM416 96C398.3 96 384 110.3 384 128C384 145.7 398.3 160 416 160L480 160L480 224C480 241.7 494.3 256 512 256C529.7 256 544 241.7 544 224L544 128C544 110.3 529.7 96 512 96L416 96zM544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480L416 480C398.3 480 384 494.3 384 512C384 529.7 398.3 544 416 544L512 544C529.7 544 544 529.7 544 512L544 416z"/></svg>`,
    eyedropper: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>`,
    forward: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M403.7 107.1C392.1 96 375 92.9 360.3 99.2C345.6 105.5 336 120 336 136L336 272.3L163.7 107.2C152.1 96 135 92.9 120.3 99.2C105.6 105.5 96 120 96 136L96 504C96 520 105.6 534.5 120.3 540.8C135 547.1 152.1 544 163.7 532.9L336 367.7L336 504C336 520 345.6 534.5 360.3 540.8C375 547.1 392.1 544 403.7 532.9L595.7 348.9C603.6 341.4 608 330.9 608 320C608 309.1 603.5 298.7 595.7 291.1L403.7 107.1z"/></svg>`,
    file: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>`,
    "file-audio": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>`,
    "file-code": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>`,
    "file-excel": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>`,
    "file-image": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>`,
    "file-pdf": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>`,
    "file-powerpoint": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>`,
    "file-video": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>`,
    "file-word": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>`,
    "file-zipper": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>`,
    "forward-step": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M21 36.8c12.9-7 28.7-6.3 41 1.8L320 208.1 320 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 384c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-144.1-258 169.6c-12.3 8.1-28 8.8-41 1.8S0 454.7 0 440L0 72C0 57.3 8.1 43.8 21 36.8z"/></svg>`,
    gauge: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm320 96c0-26.9-16.5-49.9-40-59.3L280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 172.7c-23.5 9.5-40 32.5-40 59.3 0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>`,
    gear: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/></svg>`,
    "grip-vertical": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>`,
    indeterminate: `<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>`,
    minus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>`,
    pause: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>`,
    "picture-in-picture": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M448 32c35.3 0 64 28.7 64 64l0 112-64 0 0-112-384 0 0 320 144 0 0 64-144 0-6.5-.3c-30.1-3.1-54.1-27-57.1-57.1L0 416 0 96C0 62.9 25.2 35.6 57.5 32.3L64 32 448 32zm16 224c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48l-160 0c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48l160 0z"/></svg>`,
    play: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>`,
    "play-circle": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>`,
    upload: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>`,
    volume: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM441.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C443.3 170.7 464 210.9 464 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>`,
    "volume-low": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM380.6 181.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>`,
    "volume-xmark": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM367 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>`,
    xmark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>`
  },
  //
  // Regular variant
  //
  regular: {
    calendar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg>`,
    "circle-question": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>`,
    "circle-xmark": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"/></svg>`,
    copy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>`,
    eye: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>`,
    "eye-slash": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>`
  }
};
var systemLibrary = {
  name: "system",
  resolver: (name, _family = "classic", variant = "solid") => {
    var _a16, _b2;
    let collection = icons[variant];
    let svg = (_b2 = (_a16 = collection[name]) != null ? _a16 : icons.regular[name]) != null ? _b2 : icons.regular["circle-question"];
    if (svg) {
      return dataUri(svg);
    }
    return "";
  }
};
var library_system_default = systemLibrary;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.L2IYIH2C.js
var defaultIconFamily = "classic";
var registry = [library_default_default, library_system_default];
var watchedIcons = /* @__PURE__ */ new Set();
function watchIcon(icon) {
  watchedIcons.add(icon);
}
function unwatchIcon(icon) {
  watchedIcons.delete(icon);
}
function getIconLibrary(name) {
  return registry.find((lib) => lib.name === name);
}
function getDefaultIconFamily() {
  return defaultIconFamily;
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.4TFM52NM.js
var CACHEABLE_ERROR = Symbol();
var RETRYABLE_ERROR = Symbol();
var parser;
var iconCache = /* @__PURE__ */ new Map();
var WaIcon = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.svg = null;
    this.autoWidth = false;
    this.swapOpacity = false;
    this.label = "";
    this.library = "default";
    this.rotate = 0;
    this.resolveIcon = async (url, library2) => {
      var _a16;
      let fileData;
      if (library2 == null ? void 0 : library2.spriteSheet) {
        if (!this.hasUpdated) {
          await this.updateComplete;
        }
        this.svg = b`<svg part="svg">
        <use part="use" href="${url}"></use>
      </svg>`;
        await this.updateComplete;
        const svg = this.shadowRoot.querySelector("[part='svg']");
        if (typeof library2.mutator === "function") {
          library2.mutator(svg, this);
        }
        return this.svg;
      }
      try {
        fileData = await fetch(url, { mode: "cors" });
        if (!fileData.ok) return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
      } catch (e10) {
        return RETRYABLE_ERROR;
      }
      try {
        const div = document.createElement("div");
        div.innerHTML = await fileData.text();
        const svg = div.firstElementChild;
        if (((_a16 = svg == null ? void 0 : svg.tagName) == null ? void 0 : _a16.toLowerCase()) !== "svg") return CACHEABLE_ERROR;
        if (!parser) parser = new DOMParser();
        const doc = parser.parseFromString(svg.outerHTML, "text/html");
        const svgEl = doc.body.querySelector("svg");
        if (!svgEl) return CACHEABLE_ERROR;
        svgEl.part.add("svg");
        return document.adoptNode(svgEl);
      } catch (e10) {
        return CACHEABLE_ERROR;
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    watchIcon(this);
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    if (this.hasAttribute("rotate")) {
      this.style.setProperty("--rotate-angle", `${this.rotate}deg`);
    }
    this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unwatchIcon(this);
  }
  async getIconSource() {
    const library2 = getIconLibrary(this.library);
    const family = this.family || getDefaultIconFamily();
    if (this.name && library2) {
      const autoWidth = this.canvas === "auto" || this.autoWidth;
      let url;
      try {
        url = await library2.resolver(this.name, family, this.variant, autoWidth);
      } catch (e10) {
        url = void 0;
      }
      return { url, fromLibrary: true };
    }
    return {
      url: this.src,
      fromLibrary: false
    };
  }
  handleLabelChange() {
    const hasLabel = typeof this.label === "string" && this.label.length > 0;
    if (hasLabel) {
      this.setAttribute("role", "img");
      this.setAttribute("aria-label", this.label);
      this.removeAttribute("aria-hidden");
    } else {
      this.removeAttribute("role");
      this.removeAttribute("aria-label");
      this.setAttribute("aria-hidden", "true");
    }
  }
  async setIcon() {
    var _a16;
    const { url, fromLibrary } = await this.getIconSource();
    const library2 = fromLibrary ? getIconLibrary(this.library) : void 0;
    if (!url) {
      this.svg = null;
      return;
    }
    let iconResolver = iconCache.get(url);
    if (!iconResolver) {
      iconResolver = this.resolveIcon(url, library2);
      iconCache.set(url, iconResolver);
    }
    const svg = await iconResolver;
    if (svg === RETRYABLE_ERROR) {
      iconCache.delete(url);
    }
    const sourceAfterFetch = await this.getIconSource();
    if (url !== sourceAfterFetch.url) {
      return;
    }
    if (l2(svg)) {
      this.svg = svg;
      return;
    }
    switch (svg) {
      case RETRYABLE_ERROR:
      case CACHEABLE_ERROR:
        this.svg = null;
        this.dispatchEvent(new WaErrorEvent());
        break;
      default:
        this.svg = svg.cloneNode(true);
        (_a16 = library2 == null ? void 0 : library2.mutator) == null ? void 0 : _a16.call(library2, this.svg, this);
        this.dispatchEvent(new WaLoadEvent());
    }
  }
  willUpdate(changedProperties) {
    if (!this.style) {
      this.setStyleProperty("--rotate-angle", `${this.rotate}deg`);
    }
    return super.willUpdate(changedProperties);
  }
  updated(changedProperties) {
    var _a16, _b2;
    super.updated(changedProperties);
    const library2 = getIconLibrary(this.library);
    if (this.hasAttribute("rotate")) {
      this.style.setProperty("--rotate-angle", `${this.rotate}deg`);
    }
    const svg = (_a16 = this.shadowRoot) == null ? void 0 : _a16.querySelector("svg");
    if (svg) {
      (_b2 = library2 == null ? void 0 : library2.mutator) == null ? void 0 : _b2.call(library2, svg, this);
    }
  }
  render() {
    if (this.hasUpdated) {
      return this.svg;
    }
    return b`<svg part="svg" width="16" height="16" viewBox="0 0 16 16"></svg>`;
  }
};
WaIcon.css = icon_styles_default;
__decorateClass([
  r7()
], WaIcon.prototype, "svg", 2);
__decorateClass([
  n5({ reflect: true })
], WaIcon.prototype, "name", 2);
__decorateClass([
  n5({ reflect: true })
], WaIcon.prototype, "family", 2);
__decorateClass([
  n5({ reflect: true })
], WaIcon.prototype, "variant", 2);
__decorateClass([
  n5({ reflect: true })
], WaIcon.prototype, "canvas", 2);
__decorateClass([
  n5({ attribute: "auto-width", type: Boolean, reflect: true })
], WaIcon.prototype, "autoWidth", 2);
__decorateClass([
  n5({ attribute: "swap-opacity", type: Boolean, reflect: true })
], WaIcon.prototype, "swapOpacity", 2);
__decorateClass([
  n5()
], WaIcon.prototype, "src", 2);
__decorateClass([
  n5()
], WaIcon.prototype, "label", 2);
__decorateClass([
  n5({ reflect: true })
], WaIcon.prototype, "library", 2);
__decorateClass([
  n5({ type: Number, reflect: true })
], WaIcon.prototype, "rotate", 2);
__decorateClass([
  n5({ type: String, reflect: true })
], WaIcon.prototype, "flip", 2);
__decorateClass([
  n5({ type: String, reflect: true })
], WaIcon.prototype, "animation", 2);
__decorateClass([
  watch("label")
], WaIcon.prototype, "handleLabelChange", 1);
__decorateClass([
  watch(["family", "name", "library", "variant", "src", "autoWidth", "canvas", "swapOpacity"], {
    waitUntilFirstUpdate: true
  })
], WaIcon.prototype, "setIcon", 1);
WaIcon = __decorateClass([
  t5("wa-icon")
], WaIcon);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.LCEGCF5S.js
var callout_styles_default = i4`
  :host {
    display: flex;
    position: relative;
    align-items: stretch;
    border-radius: var(--wa-panel-border-radius);
    background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
    border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
    border-style: var(--wa-panel-border-style);
    border-width: var(--wa-panel-border-width);
    color: var(--wa-color-text-normal);
    padding: 1em;
  }

  /* Appearance modifiers */
  :host([appearance~='plain']) {
    background-color: transparent;
    border-color: transparent;
  }

  :host([appearance~='outlined']) {
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));
  }

  :host([appearance~='filled']) {
    background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
    border-color: transparent;
  }

  :host([appearance~='filled-outlined']) {
    border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
  }

  :host([appearance~='accent']) {
    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;

    [part~='icon'] {
      color: currentColor;
    }
  }

  [part~='icon'] {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-on-quiet);
    font-size: 1.25em;
  }

  ::slotted([slot='icon']) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  [part~='message'] {
    flex: 1 1 auto;
    display: block;
    overflow: hidden;
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.C6MKRB3S.js
var WaCallout = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.variant = "brand";
    this.size = "m";
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  render() {
    return b`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `;
  }
};
WaCallout.css = [callout_styles_default, variants_styles_default, size_styles_default];
__decorateClass([
  n5({ reflect: true })
], WaCallout.prototype, "variant", 2);
__decorateClass([
  n5({ reflect: true })
], WaCallout.prototype, "appearance", 2);
__decorateClass([
  n5({ reflect: true })
], WaCallout.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaCallout.prototype, "handleSizeChange", 1);
WaCallout = __decorateClass([
  t5("wa-callout")
], WaCallout);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.ATI2KDM5.js
var card_styles_default = i4`
  :host {
    --spacing: var(--wa-space-l);

    /* Internal calculated properties */
    --inner-border-radius: calc(var(--wa-panel-border-radius) - var(--wa-panel-border-width));

    display: flex;
    flex-direction: column;
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-panel-border-radius);
    border-style: var(--wa-panel-border-style);
    box-shadow: var(--wa-shadow-s);
    border-width: var(--wa-panel-border-width);
    color: var(--wa-color-text-normal);
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  :host([appearance='outlined']) {
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='filled']) {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='accent']) {
    color: var(--wa-color-neutral-on-loud);
    background-color: var(--wa-color-neutral-fill-loud);
    border-color: transparent;
  }

  /* Take care of top and bottom radii */
  .media,
  :host(:not([with-media])) .header,
  :host(:not([with-media], [with-header])) .body {
    border-start-start-radius: var(--inner-border-radius);
    border-start-end-radius: var(--inner-border-radius);
  }

  :host(:not([with-footer])) .body,
  .footer {
    border-end-start-radius: var(--inner-border-radius);
    border-end-end-radius: var(--inner-border-radius);
  }

  .media {
    display: flex;
    overflow: hidden;

    &::slotted(*) {
      display: block;
      width: 100%;
      border-radius: 0 !important;
    }
  }

  /* Round all corners for plain appearance */
  :host([appearance='plain']) .media {
    border-radius: var(--inner-border-radius);

    &::slotted(*) {
      border-radius: inherit !important;
    }
  }

  .header {
    display: block;
    border-block-end-style: inherit;
    border-block-end-color: var(--wa-color-surface-border);
    border-block-end-width: var(--wa-panel-border-width);
    padding: calc(var(--spacing) / 2) var(--spacing);
  }

  .body {
    display: block;
    padding: var(--spacing);
  }

  .footer {
    display: block;
    border-block-start-style: inherit;
    border-block-start-color: var(--wa-color-surface-border);
    border-block-start-width: var(--wa-panel-border-width);
    padding: var(--spacing);
  }

  /* Push slots to sides when the action slots renders */
  .has-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  :host(:not([with-header])) .header,
  :host(:not([with-footer])) .footer,
  :host(:not([with-media])) .media {
    display: none;
  }

  /* Orientation Styles */
  :host([orientation='horizontal']) {
    flex-direction: row;

    .media {
      border-start-start-radius: var(--inner-border-radius);
      border-end-start-radius: var(--inner-border-radius);
      border-start-end-radius: 0;

      &::slotted(*) {
        block-size: 100%;
        inline-size: 100%;
        object-fit: cover;
      }
    }
  }

  :host([orientation='horizontal']) .body slot::slotted(*) {
    display: block;
    height: 100%;
    margin: 0;
  }

  :host([orientation='horizontal']) slot[name='actions']::slotted(*) {
    display: flex;
    align-items: center;
    padding: var(--spacing);
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.S37D42WK.js
var WaCard = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(
      this,
      "footer",
      "header",
      "media",
      "header-actions",
      "footer-actions",
      "actions"
    );
    this.appearance = "outlined";
    this.withHeader = false;
    this.withMedia = false;
    this.withFooter = false;
    this.withHeaderActions = false;
    this.withFooterActions = false;
    this.orientation = "vertical";
  }
  willUpdate(changedProperties) {
    this.withHeader = this.hasSlotController.test("header", "withHeader");
    this.withMedia = this.hasSlotController.test("media", "withMedia");
    this.withFooter = this.hasSlotController.test("footer", "withFooter");
    super.willUpdate(changedProperties);
  }
  render() {
    if (this.orientation === "horizontal") {
      return b`
        <slot name="media" part="media" class="media"></slot>
        <div part="body" class="body"><slot></slot></div>
        <slot name="actions" part="actions" class="actions"></slot>
      `;
    }
    const hasHeaderActions = this.hasSlotController.test("header-actions", "withHeaderActions");
    const hasFooterActions = this.hasSlotController.test("footer-actions", "withFooterActions");
    return b`
      <slot name="media" part="media" class="media"></slot>

      <header
        part="header"
        class=${e7({
      header: true,
      "has-actions": hasHeaderActions
    })}
      >
        <slot name="header"></slot>
        <slot name="header-actions"></slot>
      </header>

      <div part="body" class="body"><slot></slot></div>

      <footer
        part="footer"
        class=${e7({
      footer: true,
      "has-actions": hasFooterActions
    })}
      >
        <slot name="footer"></slot>
        <slot name="footer-actions"></slot>
      </footer>
    `;
  }
};
WaCard.css = [size_styles_default, card_styles_default];
__decorateClass([
  n5({ reflect: true })
], WaCard.prototype, "appearance", 2);
__decorateClass([
  n5({ attribute: "with-header", type: Boolean, reflect: true })
], WaCard.prototype, "withHeader", 2);
__decorateClass([
  n5({ attribute: "with-media", type: Boolean, reflect: true })
], WaCard.prototype, "withMedia", 2);
__decorateClass([
  n5({ attribute: "with-footer", type: Boolean, reflect: true })
], WaCard.prototype, "withFooter", 2);
__decorateClass([
  n5({ attribute: "with-header-actions", type: Boolean, reflect: true })
], WaCard.prototype, "withHeaderActions", 2);
__decorateClass([
  n5({ attribute: "with-footer-actions", type: Boolean, reflect: true })
], WaCard.prototype, "withFooterActions", 2);
__decorateClass([
  n5({ reflect: true })
], WaCard.prototype, "orientation", 2);
WaCard = __decorateClass([
  t5("wa-card")
], WaCard);
var _a7;
(_a7 = WaCard.disableWarning) == null ? void 0 : _a7.call(WaCard, "change-in-update");

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.YB6263IP.js
var checkbox_styles_default = i4`
  :host {
    --checked-icon-color: var(--wa-color-brand-on-loud);
    --checked-icon-scale: 0.8;

    display: inline-flex;
    color: var(--wa-form-control-value-color);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    user-select: none;
    -webkit-user-select: none;
  }

  [part~='control'] {
    display: inline-flex;
    flex: 0 0 auto;
    position: relative;
    align-items: center;
    justify-content: center;
    width: var(--wa-form-control-toggle-size);
    height: var(--wa-form-control-toggle-size);
    border-color: var(--wa-form-control-border-color);
    border-radius: min(
      calc(var(--wa-form-control-toggle-size) * 0.375),
      var(--wa-border-radius-s)
    ); /* min prevents entirely circular checkbox */
    border-style: var(--wa-border-style);
    border-width: var(--wa-form-control-border-width);
    background-color: var(--wa-form-control-background-color);
    transition:
      background var(--wa-transition-normal),
      border-color var(--wa-transition-fast),
      box-shadow var(--wa-transition-fast),
      color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    margin-inline-end: 0.5em;
  }

  [part~='base'] {
    display: flex;
    align-items: flex-start;
    position: relative;
    color: currentColor;
    vertical-align: middle;
    cursor: pointer;
  }

  [part~='label'] {
    display: inline;
  }

  /* Checked */
  [part~='control']:has(:checked, :indeterminate) {
    color: var(--checked-icon-color);
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-form-control-activated-color);
  }

  /* Focus */
  [part~='control']:has(> input:focus-visible:not(:disabled)) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  :host [part~='base']:has(input:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input {
    position: absolute;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    pointer-events: none;
  }

  [part~='icon'] {
    display: flex;
    scale: var(--checked-icon-scale);

    /* Without this, Safari renders the icon slightly to the left */
    &::part(svg) {
      translate: 0.0009765625em;
    }

    input:not(:checked, :indeterminate) + & {
      visibility: hidden;
    }
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.GWSUX3V5.js
var RequiredValidator = (options = {}) => {
  let { validationElement, validationProperty } = options;
  if (!validationElement) {
    if (typeof document !== "undefined" && "createElement" in document) {
      validationElement = Object.assign(document.createElement("input"), { required: true });
    }
  }
  if (!validationProperty) {
    validationProperty = "value";
  }
  const obj = {
    observedAttributes: ["required"],
    message: validationElement == null ? void 0 : validationElement.validationMessage,
    // @TODO: Add a translation.
    checkValidity(element) {
      var _a16;
      const validity = {
        message: "",
        isValid: true,
        invalidKeys: []
      };
      const isRequired = (_a16 = element.required) != null ? _a16 : element.hasAttribute("required");
      if (!isRequired) {
        return validity;
      }
      const value = element[validationProperty];
      const isEmpty = !value;
      if (isEmpty) {
        validity.message = typeof obj.message === "function" ? obj.message(element) : obj.message || "";
        validity.isValid = false;
        validity.invalidKeys.push("valueMissing");
      }
      return validity;
    }
  };
  return obj;
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.5LXXXELE.js
var form_control_styles_default = i4`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Treat wrapped labels, inputs, and hints as direct children of the host element */
  [part~='form-control'] {
    display: contents;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)),
  :is([part~='form-control-label'], [part~='label']).has-label {
    display: inline-flex;
    color: var(--wa-form-control-label-color);
    font-weight: var(--wa-form-control-label-font-weight);
    line-height: var(--wa-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);

    &:not(.has-slotted, .has-hint) {
      display: none;
    }
  }
`;

// node_modules/lit-html/directives/live.js
var l6 = e2(class extends i3 {
  constructor(r9) {
    if (super(r9), r9.type !== t2.PROPERTY && r9.type !== t2.ATTRIBUTE && r9.type !== t2.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!r3(r9)) throw Error("`live` bindings can only contain a single expression");
  }
  render(r9) {
    return r9;
  }
  update(i9, [t6]) {
    if (t6 === E || t6 === A) return t6;
    const o10 = i9.element, l7 = i9.name;
    if (i9.type === t2.PROPERTY) {
      if (t6 === o10[l7]) return E;
    } else if (i9.type === t2.BOOLEAN_ATTRIBUTE) {
      if (!!t6 === o10.hasAttribute(l7)) return E;
    } else if (i9.type === t2.ATTRIBUTE && o10.getAttribute(l7) === t6 + "") return E;
    return p2(i9), t6;
  }
});

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.PKAOFPE6.js
var WaCheckbox = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    var _a16;
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "hint");
    this.title = "";
    this._value = (_a16 = this.getAttribute("value")) != null ? _a16 : null;
    this.size = "m";
    this.disabled = false;
    this.indeterminate = false;
    this._checked = null;
    this.defaultChecked = this.hasAttribute("checked");
    this.required = false;
    this.hint = "";
  }
  static get validators() {
    const validators = o5 ? [] : [
      RequiredValidator({
        validationProperty: "checked",
        // Use a checkbox so we get "free" translation strings.
        validationElement: Object.assign(document.createElement("input"), {
          type: "checkbox",
          required: true
        })
      })
    ];
    return [...super.validators, ...validators];
  }
  /** The value of the checkbox, submitted as a name/value pair with form data. */
  get value() {
    var _a16;
    return (_a16 = this._value) != null ? _a16 : "on";
  }
  set value(val) {
    this._value = val;
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  get checked() {
    var _a16;
    if (this.valueHasChanged) {
      return Boolean(this._checked);
    }
    return (_a16 = this._checked) != null ? _a16 : this.defaultChecked;
  }
  set checked(val) {
    this._checked = Boolean(val);
    this.valueHasChanged = true;
  }
  handleClick() {
    this.hasInteracted = true;
    this.checked = !this.checked;
    this.indeterminate = false;
    this.updateComplete.then(() => {
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.didSSR && !this.hasUpdated) {
      this.updateComplete.then(() => {
        this.handleDefaultCheckedChange();
      });
      return;
    }
    this.handleDefaultCheckedChange();
  }
  handleDefaultCheckedChange() {
    this.handleValueOrCheckedChange();
  }
  handleValueOrCheckedChange() {
    if (this.didSSR && !this.hasUpdated) {
      this.updateComplete.then(() => {
        this.handleValueOrCheckedChange();
      });
      return;
    }
    this.setValue(this.checked ? this.value : null, this._value);
    this.updateValidity();
  }
  handleStateChange() {
    if (this.hasUpdated) {
      this.input.checked = this.checked;
      this.input.indeterminate = this.indeterminate;
    }
    this.customStates.set("checked", this.checked);
    this.customStates.set("indeterminate", this.indeterminate);
    this.updateValidity();
  }
  handleDisabledChange() {
    this.customStates.set("disabled", this.disabled);
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("value") || changedProperties.has("checked") || changedProperties.has("defaultChecked")) {
      this.handleValueOrCheckedChange();
    }
  }
  formResetCallback() {
    this._checked = null;
    super.formResetCallback();
    this.handleValueOrCheckedChange();
  }
  /** Simulates a click on the checkbox. */
  click() {
    this.input.click();
  }
  /** Sets focus on the checkbox. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the checkbox. */
  blur() {
    this.input.blur();
  }
  render() {
    const hasHintSlot = o5 ? true : this.hasSlotController.test("hint");
    const hasHint = this.hint ? true : !!hasHintSlot;
    const isIndeterminate = !this.checked && this.indeterminate;
    const iconName = isIndeterminate ? "indeterminate" : "check";
    const iconState = isIndeterminate ? "indeterminate" : "check";
    const checkedAttribute = this.didSSR && !this.hasUpdated ? this.checked : this.defaultChecked;
    const checkedProperty = this.didSSR && !this.hasUpdated ? null : l6(this.checked);
    return b`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${o7(this.name)}
            value=${o7(this.value)}
            .indeterminate=${l6(this.indeterminate)}
            .checked=${o7(checkedProperty)}
            ?checked=${checkedAttribute}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-checked=${this.indeterminate ? "mixed" : this.checked ? "true" : "false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${iconState}-icon icon" library="system" name=${iconName}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${hasHint ? "false" : "true"}
        class="${e7({ "has-slotted": hasHint })}"
      >
        ${this.hint}
      </slot>
    `;
  }
};
WaCheckbox.css = [form_control_styles_default, size_styles_default, checkbox_styles_default];
WaCheckbox.shadowRootOptions = __spreadProps(__spreadValues({}, WebAwesomeFormAssociatedElement.shadowRootOptions), { delegatesFocus: true });
__decorateClass([
  e6('input[type="checkbox"]')
], WaCheckbox.prototype, "input", 2);
__decorateClass([
  n5()
], WaCheckbox.prototype, "title", 2);
__decorateClass([
  n5({ reflect: true })
], WaCheckbox.prototype, "value", 1);
__decorateClass([
  n5({ reflect: true })
], WaCheckbox.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaCheckbox.prototype, "handleSizeChange", 1);
__decorateClass([
  n5({ type: Boolean })
], WaCheckbox.prototype, "disabled", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaCheckbox.prototype, "indeterminate", 2);
__decorateClass([
  n5({ type: Boolean, attribute: false })
], WaCheckbox.prototype, "checked", 1);
__decorateClass([
  n5({ type: Boolean, reflect: true, attribute: "checked" })
], WaCheckbox.prototype, "defaultChecked", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaCheckbox.prototype, "required", 2);
__decorateClass([
  n5()
], WaCheckbox.prototype, "hint", 2);
__decorateClass([
  watch(["checked", "defaultChecked"])
], WaCheckbox.prototype, "handleDefaultCheckedChange", 1);
__decorateClass([
  watch(["checked", "indeterminate"])
], WaCheckbox.prototype, "handleStateChange", 1);
__decorateClass([
  watch("disabled")
], WaCheckbox.prototype, "handleDisabledChange", 1);
WaCheckbox = __decorateClass([
  t5("wa-checkbox")
], WaCheckbox);
var _a8;
(_a8 = WaCheckbox.disableWarning) == null ? void 0 : _a8.call(WaCheckbox, "change-in-update");

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.NY2PQ35L.js
var WaCopyEvent = class extends Event {
  constructor(detail) {
    super("wa-copy", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.YDWBRJAR.js
var copy_button_styles_default = i4`
  :host {
    display: inline-block;
    color: var(--wa-color-neutral-on-quiet);
  }

  .copy-button__trigger {
    position: relative;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    border-radius: var(--wa-form-control-border-radius);
    color: inherit;
    font-size: inherit;
    height: calc(var(--wa-form-control-height) * 0.8);
    aspect-ratio: 1;
    cursor: pointer;
    transition-property: background-color, color;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
  }

  @media (hover: hover) {
    .button:hover:not([disabled]) {
      background-color: var(--wa-color-neutral-fill-quiet);
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  .button:focus-visible:not([disabled]) {
    background-color: var(--wa-color-neutral-fill-quiet);
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
  }

  .button:active:not([disabled]) {
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .button[disabled] {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  slot {
    display: inline-flex;
  }

  /* Icon swap animation */
  .show {
    animation: copy-button-icon-show var(--wa-transition-fast) var(--wa-transition-easing);
  }

  .hide {
    animation: copy-button-icon-show var(--wa-transition-fast) var(--wa-transition-easing) reverse;
  }

  @keyframes copy-button-icon-show {
    from {
      scale: 0.25;
      opacity: 0.25;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .show,
    .hide {
      animation-duration: 1ms;
    }
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.2ZAJEMB4.js
var visually_hidden_styles_default = i4`
  .wa-visually-hidden:not(:focus-within),
  .wa-visually-hidden-force,
  .wa-visually-hidden-hint::part(hint),
  .wa-visually-hidden-label::part(label),
  .wa-visually-hidden-label::part(form-control-label) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`;

// node_modules/@awesome.me/webawesome/node_modules/nanoid/url-alphabet/index.js
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

// node_modules/@awesome.me/webawesome/node_modules/nanoid/index.browser.js
var nanoid = (size3 = 21) => {
  let id3 = "";
  let bytes = crypto.getRandomValues(new Uint8Array(size3 |= 0));
  while (size3--) {
    id3 += urlAlphabet[bytes[size3] & 63];
  }
  return id3;
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.KNJT7KBU.js
function uniqueId(prefix = "") {
  return `${prefix}${nanoid()}`;
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.L6CIKOFQ.js
async function animate(el, keyframes, options) {
  return el.animate(keyframes, options).finished.catch(() => {
  });
}
function animateWithClass(el, className) {
  return new Promise((resolve) => {
    const controller = new AbortController();
    const { signal } = controller;
    if (el.classList.contains(className)) {
      return;
    }
    el.classList.add(className);
    let resolved = false;
    let onEnd = () => {
      if (resolved) {
        return;
      }
      resolved = true;
      el.classList.remove(className);
      resolve();
      controller.abort();
    };
    el.addEventListener("animationend", onEnd, { once: true, signal });
    el.addEventListener("animationcancel", onEnd, { once: true, signal });
    requestAnimationFrame(() => {
      if (!resolved && el.getAnimations().length === 0) {
        onEnd();
      }
    });
  });
}
function parseDuration(duration) {
  duration = duration.toString().toLowerCase();
  if (duration.indexOf("ms") > -1) {
    return parseFloat(duration) || 0;
  }
  if (duration.indexOf("s") > -1) {
    return (parseFloat(duration) || 0) * 1e3;
  }
  return parseFloat(duration) || 0;
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.FXXRVH6C.js
var INTERNAL_TOOLTIP_SLOT = "wa-internal-tooltip";
var ASSIGNED_ID_PROP = "__waCopyButtonAssignedId";
var WaCopyButton = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.isCopying = false;
    this.status = "rest";
    this.hasCustomTrigger = false;
    this.liveAnnouncement = "";
    this.customTriggerEl = null;
    this.lightTooltip = null;
    this.feedbackTimeout = null;
    this.value = "";
    this.from = "";
    this.disabled = false;
    this.copyLabel = "";
    this.successLabel = "";
    this.errorLabel = "";
    this.feedbackDuration = 1e3;
    this.tooltipPlacement = "top";
    this.tooltip = "full";
    this.handleDefaultSlotChange = () => {
      var _a16, _b2, _c;
      const assigned = (_b2 = (_a16 = this.defaultSlot) == null ? void 0 : _a16.assignedElements({ flatten: true })) != null ? _b2 : [];
      const trigger = (_c = assigned.find((el) => el instanceof HTMLElement)) != null ? _c : null;
      if (trigger !== this.customTriggerEl) {
        this.releaseAssignedId(this.customTriggerEl);
        this.customTriggerEl = trigger;
      }
      this.hasCustomTrigger = trigger !== null;
      if (trigger && this.tooltip !== "none") {
        if (!trigger.id) {
          trigger.id = uniqueId("wa-copy-button-trigger-");
          trigger[ASSIGNED_ID_PROP] = true;
        }
        this.ensureLightTooltip();
      } else {
        this.removeLightTooltip();
      }
    };
  }
  get activeTooltip() {
    var _a16, _b2;
    return (_b2 = (_a16 = this.lightTooltip) != null ? _a16 : this.shadowTooltip) != null ? _b2 : null;
  }
  get currentLabel() {
    if (this.status === "success") {
      return this.successLabel || this.localize.term("copied");
    }
    if (this.status === "error") {
      return this.errorLabel || this.localize.term("error");
    }
    return this.copyLabel || this.localize.term("copy");
  }
  firstUpdated() {
    if (this.didSSR) {
      this.updateComplete.then(() => {
        this.handleDefaultSlotChange();
      });
    } else {
      this.handleDefaultSlotChange();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeLightTooltip();
  }
  handleStatusChange() {
    this.customStates.set("success", this.status === "success");
    this.customStates.set("error", this.status === "error");
    this.syncTooltipText();
    if (this.status === "success" || this.status === "error") {
      this.liveAnnouncement = this.currentLabel;
    } else {
      this.liveAnnouncement = "";
    }
  }
  handleLabelChange() {
    this.syncTooltipText();
  }
  handleTooltipOptionsChange() {
    if (this.lightTooltip) {
      this.lightTooltip.placement = this.tooltipPlacement;
      this.lightTooltip.disabled = this.disabled;
    }
  }
  handleTooltipModeChange(oldValue) {
    if (this.tooltip === "none") {
      this.removeLightTooltip();
    } else if (oldValue === "none") {
      this.handleDefaultSlotChange();
    } else if (this.lightTooltip) {
      this.lightTooltip.setAttribute("trigger", this.tooltip === "copy" ? "manual" : "hover focus");
    }
  }
  releaseAssignedId(el) {
    if (el && el[ASSIGNED_ID_PROP]) {
      el.removeAttribute("id");
      delete el[ASSIGNED_ID_PROP];
    }
  }
  ensureLightTooltip() {
    if (!this.customTriggerEl) {
      return;
    }
    const triggerValue = this.tooltip === "copy" ? "manual" : "hover focus";
    if (!this.lightTooltip) {
      const tooltip = document.createElement("wa-tooltip");
      tooltip.setAttribute("slot", INTERNAL_TOOLTIP_SLOT);
      tooltip.setAttribute("part", "feedback");
      tooltip.setAttribute("trigger", triggerValue);
      tooltip.dataset.copyButtonTooltip = "";
      tooltip.setAttribute("for", this.customTriggerEl.id);
      tooltip.placement = this.tooltipPlacement;
      tooltip.disabled = this.disabled;
      tooltip.textContent = this.currentLabel;
      this.appendChild(tooltip);
      this.lightTooltip = tooltip;
    } else {
      this.lightTooltip.setAttribute("for", this.customTriggerEl.id);
      this.lightTooltip.setAttribute("trigger", triggerValue);
      this.lightTooltip.placement = this.tooltipPlacement;
      this.lightTooltip.disabled = this.disabled;
      this.lightTooltip.textContent = this.currentLabel;
    }
  }
  removeLightTooltip() {
    if (this.lightTooltip) {
      this.releaseAssignedId(this.customTriggerEl);
      this.lightTooltip.remove();
      this.lightTooltip = null;
    }
  }
  syncTooltipText() {
    if (this.lightTooltip) {
      this.lightTooltip.textContent = this.currentLabel;
    }
  }
  async handleCopy() {
    if (this.disabled || this.isCopying) {
      return;
    }
    this.isCopying = true;
    let valueToCopy = this.value;
    if (this.from) {
      const root = this.getRootNode();
      const isProperty = this.from.includes(".");
      const isAttribute = this.from.includes("[") && this.from.includes("]");
      let id3 = this.from;
      let field = "";
      if (isProperty) {
        [id3, field] = this.from.trim().split(".");
      } else if (isAttribute) {
        [id3, field] = this.from.trim().replace(/\]$/, "").split("[");
      }
      const target = "getElementById" in root ? root.getElementById(id3) : null;
      if (target) {
        if (isAttribute) {
          valueToCopy = target.getAttribute(field) || "";
        } else if (isProperty) {
          valueToCopy = target[field] || "";
        } else {
          valueToCopy = target.textContent || "";
        }
      } else {
        this.showStatus("error");
        this.dispatchEvent(new WaErrorEvent());
      }
    }
    if (!valueToCopy) {
      this.showStatus("error");
      this.dispatchEvent(new WaErrorEvent());
    } else {
      try {
        await navigator.clipboard.writeText(valueToCopy);
        this.showStatus("success");
        this.dispatchEvent(new WaCopyEvent({ value: valueToCopy }));
      } catch (error) {
        this.showStatus("error");
        this.dispatchEvent(new WaErrorEvent());
      }
    }
  }
  async showStatus(status) {
    this.status = status;
    if (this.copyIcon) {
      const iconToShow = status === "success" ? this.successIcon : this.errorIcon;
      await animateWithClass(this.copyIcon, "hide");
      this.copyIcon.hidden = true;
      iconToShow.hidden = false;
      await animateWithClass(iconToShow, "show");
    }
    await this.updateComplete;
    const tooltip = this.tooltip === "none" ? null : this.activeTooltip;
    let earlyClose = null;
    if (tooltip) {
      tooltip.show();
      earlyClose = new Promise((resolve) => {
        tooltip.addEventListener(
          "wa-after-hide",
          () => {
            if (this.feedbackTimeout !== null) {
              clearTimeout(this.feedbackTimeout);
              this.feedbackTimeout = null;
            }
            resolve();
          },
          { once: true }
        );
      });
      this.feedbackTimeout = window.setTimeout(async () => {
        this.feedbackTimeout = null;
        await tooltip.hide();
      }, this.feedbackDuration);
    }
    setTimeout(async () => {
      if (earlyClose) {
        await earlyClose;
      }
      if (this.copyIcon) {
        const iconToShow = status === "success" ? this.successIcon : this.errorIcon;
        await animateWithClass(iconToShow, "hide");
        iconToShow.hidden = true;
        this.copyIcon.hidden = false;
        await animateWithClass(this.copyIcon, "show");
      }
      this.status = "rest";
      this.isCopying = false;
    }, this.feedbackDuration);
  }
  render() {
    const hasCustomTrigger = this.hasCustomTrigger;
    let showTooltip = !hasCustomTrigger && this.tooltip !== "none";
    const triggerValue = this.tooltip === "copy" ? "manual" : "hover focus";
    if (this.didSSR && !this.hasUpdated) {
      showTooltip = false;
    }
    return b`
      <div class="copy-button__trigger" @click=${this.handleCopy}>
        <slot @slotchange=${this.handleDefaultSlotChange}></slot>
        <button
          class="button"
          part="button"
          type="button"
          id="copy-button"
          aria-label=${this.currentLabel}
          ?disabled=${this.disabled}
          ?hidden=${this.hasCustomTrigger}
        >
          <slot part="copy-icon" name="copy-icon">
            <wa-icon library="system" name="copy" variant="regular"></wa-icon>
          </slot>
          <slot part="success-icon" name="success-icon" variant="solid" hidden>
            <wa-icon library="system" name="check"></wa-icon>
          </slot>
          <slot part="error-icon" name="error-icon" variant="solid" hidden>
            <wa-icon library="system" name="xmark"></wa-icon>
          </slot>
        </button>

        ${showTooltip ? b`
              <wa-tooltip
                part="feedback"
                for="copy-button"
                placement=${this.tooltipPlacement}
                trigger=${triggerValue}
                class=${e7({
      "copy-button-tooltip": true,
      "copy-button-tooltip-success": this.status === "success",
      "copy-button-tooltip-error": this.status === "error"
    })}
                ?disabled=${this.disabled}
                >${this.currentLabel}</wa-tooltip
              >
            ` : ""}
        <slot name="${INTERNAL_TOOLTIP_SLOT}"></slot>
        <div class="wa-visually-hidden" role="status" aria-live="polite">${this.liveAnnouncement}</div>
      </div>
    `;
  }
};
WaCopyButton.css = [host_styles_default, visually_hidden_styles_default, copy_button_styles_default];
__decorateClass([
  e6('slot[name="copy-icon"]')
], WaCopyButton.prototype, "copyIcon", 2);
__decorateClass([
  e6('slot[name="success-icon"]')
], WaCopyButton.prototype, "successIcon", 2);
__decorateClass([
  e6('slot[name="error-icon"]')
], WaCopyButton.prototype, "errorIcon", 2);
__decorateClass([
  e6("slot:not([name])")
], WaCopyButton.prototype, "defaultSlot", 2);
__decorateClass([
  e6('wa-tooltip[part="feedback"]')
], WaCopyButton.prototype, "shadowTooltip", 2);
__decorateClass([
  r7()
], WaCopyButton.prototype, "isCopying", 2);
__decorateClass([
  r7()
], WaCopyButton.prototype, "status", 2);
__decorateClass([
  r7()
], WaCopyButton.prototype, "hasCustomTrigger", 2);
__decorateClass([
  r7()
], WaCopyButton.prototype, "liveAnnouncement", 2);
__decorateClass([
  n5()
], WaCopyButton.prototype, "value", 2);
__decorateClass([
  n5()
], WaCopyButton.prototype, "from", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaCopyButton.prototype, "disabled", 2);
__decorateClass([
  n5({ attribute: "copy-label" })
], WaCopyButton.prototype, "copyLabel", 2);
__decorateClass([
  n5({ attribute: "success-label" })
], WaCopyButton.prototype, "successLabel", 2);
__decorateClass([
  n5({ attribute: "error-label" })
], WaCopyButton.prototype, "errorLabel", 2);
__decorateClass([
  n5({ attribute: "feedback-duration", type: Number })
], WaCopyButton.prototype, "feedbackDuration", 2);
__decorateClass([
  n5({ attribute: "tooltip-placement", reflect: true })
], WaCopyButton.prototype, "tooltipPlacement", 2);
__decorateClass([
  n5({ reflect: true })
], WaCopyButton.prototype, "tooltip", 2);
__decorateClass([
  watch("status")
], WaCopyButton.prototype, "handleStatusChange", 1);
__decorateClass([
  watch(["copyLabel", "successLabel", "errorLabel"])
], WaCopyButton.prototype, "handleLabelChange", 1);
__decorateClass([
  watch(["tooltipPlacement", "disabled"], { waitUntilFirstUpdate: true })
], WaCopyButton.prototype, "handleTooltipOptionsChange", 1);
__decorateClass([
  watch("tooltip", { waitUntilFirstUpdate: true })
], WaCopyButton.prototype, "handleTooltipModeChange", 1);
WaCopyButton = __decorateClass([
  t5("wa-copy-button")
], WaCopyButton);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.TKL7YZKI.js
var tooltip_styles_default = i4`
  :host {
    --max-width: 30ch;

    /** These styles are added so we don't interfere in the DOM. */
    display: inline-block;
    position: absolute;

    /** Defaults for inherited CSS properties */
    color: var(--wa-tooltip-content-color);
    font-size: var(--wa-tooltip-font-size);
    line-height: var(--wa-tooltip-line-height);
    text-align: start;
    white-space: normal;
  }

  .tooltip {
    --arrow-size: var(--wa-tooltip-arrow-size);
    --arrow-color: var(--wa-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: 1000;
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--wa-tooltip-border-radius);
    background-color: var(--wa-tooltip-background-color);
    border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    padding: 0.25em 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  .tooltip {
    --popup-border-width: var(--wa-tooltip-border-width);

    &::part(arrow) {
      border-bottom: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
      border-right: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    }
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.4ZAKP7NY.js
var WaShowEvent = class extends Event {
  constructor() {
    super("wa-show", { bubbles: true, cancelable: true, composed: true });
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.MQODJ75V.js
var WaHideEvent = class extends Event {
  constructor(detail) {
    super("wa-hide", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.PX3HMKF7.js
var WaAfterShowEvent = class extends Event {
  constructor() {
    super("wa-after-show", { bubbles: true, cancelable: false, composed: true });
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.3NKIHICW.js
var WaAfterHideEvent = class extends Event {
  constructor() {
    super("wa-after-hide", { bubbles: true, cancelable: false, composed: true });
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.ZWQCGLB5.js
var WaRepositionEvent = class extends Event {
  constructor() {
    super("wa-reposition", { bubbles: true, cancelable: false, composed: true });
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.HS5AYC6E.js
var popup_styles_default = i4`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45) to calculate the length of the arrow after rotation.
     *
     * The diamond will be translated inward by --arrow-base-offset, the border thickness, to centralise it on
     * the inner edge of the popup border. This also means we need to increase the size of the arrow by the
     * same amount to compensate.
     *
     * A diamond shaped clipping mask is used to avoid overlap of popup content. This extends slightly inward so
     * the popup border is covered with no sub-pixel rounding artifacts. The diamond corners are mitred at 22.5º
     * to properly merge any arrow border with the popup border. The constant 1.4142 is derived from 1 + tan(22.5).
     *
     */
    --arrow-base-offset: var(--popup-border-width);
    --arrow-size-diagonal: calc((var(--arrow-size) + var(--arrow-base-offset)) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));
    --arrow-size-div: calc(var(--arrow-size-diagonal) * 2);
    --arrow-clipping-corner: calc(var(--arrow-base-offset) * 1.4142);

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: var(--arrow-size-div);
    height: var(--arrow-size-div);
    background: var(--arrow-color);
    z-index: 3;
    clip-path: polygon(
      var(--arrow-clipping-corner) 100%,
      var(--arrow-base-offset) calc(100% - var(--arrow-base-offset)),
      calc(var(--arrow-base-offset) - 2px) calc(100% - var(--arrow-base-offset)),
      calc(100% - var(--arrow-base-offset)) calc(var(--arrow-base-offset) - 2px),
      calc(100% - var(--arrow-base-offset)) var(--arrow-base-offset),
      100% var(--arrow-clipping-corner),
      100% 100%
    );
    rotate: 45deg;
  }

  :host([data-current-placement|='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement|='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement|='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`;

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v3) => ({
  x: v3,
  y: v3
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction45, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction45 === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  return __spreadValues({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, padding);
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x: x2,
    y: y3,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y3,
    left: x2,
    right: x2 + width,
    bottom: y3 + height,
    x: x2,
    y: y3
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x2,
    y: y3,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x2,
    y: y3,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var MAX_RESET_COUNT = 50;
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : __spreadProps(__spreadValues({}, platform2), {
    detectOverflow
  });
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x2,
    y: y3
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i9 = 0; i9 < middleware.length; i9++) {
    const currentMiddleware = middleware[i9];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x: x2,
      y: y3,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x2 = nextX != null ? nextX : x2;
    y3 = nextY != null ? nextY : y3;
    middlewareData[name] = __spreadValues(__spreadValues({}, middlewareData[name]), data);
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x: x2,
          y: y3
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i9 = -1;
    }
  }
  return {
    x: x2,
    y: y3,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x: x2,
      y: y3,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x: x2,
      y: y3
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset3 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: __spreadValues({
        [axis]: offset3,
        centerOffset: center - offset3 - alignmentOffset
      }, shouldAddOffset && {
        alignmentOffset
      }),
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const _a16 = evaluate(options, state), {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true
      } = _a16, detectOverflowOptions = __objRest(_a16, [
        "mainAxis",
        "crossAxis",
        "fallbackPlacements",
        "fallbackStrategy",
        "fallbackAxisSideDirection",
        "flipAlignment"
      ]);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d5) => getSideAxis(d5.placement) === initialSideAxis ? d5.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d5) => d5.overflows[0] <= 0).sort((a4, b3) => a4.overflows[1] - b3.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d5) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d5.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d5) => [d5.placement, d5.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a4, b3) => a4[1] - b3[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x: x2,
        y: y3,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x2 + diffCoords.x,
        y: y3 + diffCoords.y,
        data: __spreadProps(__spreadValues({}, diffCoords), {
          placement
        })
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x: x2,
        y: y3,
        placement,
        platform: platform2
      } = state;
      const _a16 = evaluate(options, state), {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x3,
              y: y4
            } = _ref;
            return {
              x: x3,
              y: y4
            };
          }
        }
      } = _a16, detectOverflowOptions = __objRest(_a16, [
        "mainAxis",
        "crossAxis",
        "limiter"
      ]);
      const coords = {
        x: x2,
        y: y3
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn(__spreadProps(__spreadValues({}, state), {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      }));
      return __spreadProps(__spreadValues({}, limitedCoords), {
        data: {
          x: limitedCoords.x - x2,
          y: limitedCoords.y - y3,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      });
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const _a16 = evaluate(options, state), {
        apply = () => {
        }
      } = _a16, detectOverflowOptions = __objRest(_a16, [
        "apply"
      ]);
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply(__spreadProps(__spreadValues({}, state), {
        availableWidth,
        availableHeight
      }));
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $: $3
  } = getCssDimensions(domElement);
  let x2 = ($3 ? round(rect.width) : rect.width) / width;
  let y3 = ($3 ? round(rect.height) : rect.height) / height;
  if (!x2 || !Number.isFinite(x2)) {
    x2 = 1;
  }
  if (!y3 || !Number.isFinite(y3)) {
    y3 = 1;
  }
  return {
    x: x2,
    y: y3
  };
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x2 = (clientRect.left + visualOffsets.x) / scale.x;
  let y3 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x2 *= iframeScale.x;
      y3 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x2 += left;
      y3 += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x2,
    y: y3
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x2 = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y3 = htmlRect.top + scroll.scrollTop;
  return {
    x: x2,
    y: y3
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x2 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y3 = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x2 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y3
  };
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x2 = 0;
  let y3 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y3 = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x: x2,
    y: y3
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x2 = left * scale.x;
  const y3 = top * scale.y;
  return {
    width,
    height,
    x: x2,
    y: y3
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i9 = 1; i9 < clippingAncestors.length; i9++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i9], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x2 = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y3 = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x: x2,
    y: y3,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a4, b3) {
  return a4.x === b3.x && a4.y === b3.y && a4.width === b3.width && a4.height === b3.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, __spreadProps(__spreadValues({}, options), {
        // Handle <iframe>s
        root: root.ownerDocument
      }));
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update2, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update2, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update2);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update2) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update2();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update2();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update2();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update2);
      ancestorResize && ancestor.removeEventListener("resize", update2);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var arrow2 = arrow;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = __spreadValues({
    platform
  }, options);
  const platformWithCache = __spreadProps(__spreadValues({}, mergedOptions.platform), {
    _c: cache
  });
  return computePosition(reference, floating, __spreadProps(__spreadValues({}, mergedOptions), {
    platform: platformWithCache
  }));
};

// node_modules/composed-offset-position/dist/composed-offset-position.browser.min.mjs
function e8(t6) {
  return i8(t6);
}
function r8(t6) {
  return t6.assignedSlot ? t6.assignedSlot : t6.parentNode instanceof ShadowRoot ? t6.parentNode.host : t6.parentNode;
}
function i8(e10) {
  for (let t6 = e10; t6; t6 = r8(t6)) if (t6 instanceof Element && "none" === getComputedStyle(t6).display) return null;
  for (let n7 = r8(e10); n7; n7 = r8(n7)) {
    if (!(n7 instanceof Element)) continue;
    const e11 = getComputedStyle(n7);
    if ("contents" !== e11.display) {
      if ("static" !== e11.position || isContainingBlock(e11)) return n7;
      if ("BODY" === n7.tagName) return n7;
    }
  }
  return null;
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.7MPIABXH.js
function isVirtualElement(e10) {
  return e10 !== null && typeof e10 === "object" && "getBoundingClientRect" in e10 && ("contextElement" in e10 ? e10 instanceof Element : true);
}
var _a9;
var SUPPORTS_POPOVER = Boolean((_a9 = globalThis == null ? void 0 : globalThis.HTMLElement) == null ? void 0 : _a9.prototype.hasOwnProperty("popover"));
var WaPopup = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.SUPPORTS_POPOVER = false;
    this.active = false;
    this.placement = "top";
    this.boundary = "viewport";
    this.distance = 0;
    this.skidding = 0;
    this.arrow = false;
    this.arrowPlacement = "anchor";
    this.arrowPadding = 10;
    this.flip = false;
    this.flipFallbackPlacements = "";
    this.flipFallbackStrategy = "best-fit";
    this.flipPadding = 0;
    this.shift = false;
    this.shiftPadding = 0;
    this.autoSizePadding = 0;
    this.hoverBridge = false;
    this.updateHoverBridge = () => {
      if (this.hoverBridge && this.anchorEl && this.popup) {
        const anchorRect = this.anchorEl.getBoundingClientRect();
        const popupRect = this.popup.getBoundingClientRect();
        const isVertical = this.placement.includes("top") || this.placement.includes("bottom");
        let topLeftX = 0;
        let topLeftY = 0;
        let topRightX = 0;
        let topRightY = 0;
        let bottomLeftX = 0;
        let bottomLeftY = 0;
        let bottomRightX = 0;
        let bottomRightY = 0;
        if (isVertical) {
          if (anchorRect.top < popupRect.top) {
            topLeftX = anchorRect.left;
            topLeftY = anchorRect.bottom;
            topRightX = anchorRect.right;
            topRightY = anchorRect.bottom;
            bottomLeftX = popupRect.left;
            bottomLeftY = popupRect.top;
            bottomRightX = popupRect.right;
            bottomRightY = popupRect.top;
          } else {
            topLeftX = popupRect.left;
            topLeftY = popupRect.bottom;
            topRightX = popupRect.right;
            topRightY = popupRect.bottom;
            bottomLeftX = anchorRect.left;
            bottomLeftY = anchorRect.top;
            bottomRightX = anchorRect.right;
            bottomRightY = anchorRect.top;
          }
        } else {
          if (anchorRect.left < popupRect.left) {
            topLeftX = anchorRect.right;
            topLeftY = anchorRect.top;
            topRightX = popupRect.left;
            topRightY = popupRect.top;
            bottomLeftX = anchorRect.right;
            bottomLeftY = anchorRect.bottom;
            bottomRightX = popupRect.left;
            bottomRightY = popupRect.bottom;
          } else {
            topLeftX = popupRect.right;
            topLeftY = popupRect.top;
            topRightX = anchorRect.left;
            topRightY = anchorRect.top;
            bottomLeftX = popupRect.right;
            bottomLeftY = popupRect.bottom;
            bottomRightX = anchorRect.left;
            bottomRightY = anchorRect.bottom;
          }
        }
        this.style.setProperty("--hover-bridge-top-left-x", `${topLeftX}px`);
        this.style.setProperty("--hover-bridge-top-left-y", `${topLeftY}px`);
        this.style.setProperty("--hover-bridge-top-right-x", `${topRightX}px`);
        this.style.setProperty("--hover-bridge-top-right-y", `${topRightY}px`);
        this.style.setProperty("--hover-bridge-bottom-left-x", `${bottomLeftX}px`);
        this.style.setProperty("--hover-bridge-bottom-left-y", `${bottomLeftY}px`);
        this.style.setProperty("--hover-bridge-bottom-right-x", `${bottomRightX}px`);
        this.style.setProperty("--hover-bridge-bottom-right-y", `${bottomRightY}px`);
      }
    };
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this.SUPPORTS_POPOVER = SUPPORTS_POPOVER;
    this.start();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.stop();
  }
  async updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("active")) {
      if (this.active) {
        this.start();
      } else {
        this.stop();
      }
    }
    if (changedProperties.has("anchor")) {
      this.handleAnchorChange();
    }
    if (this.active) {
      await this.updateComplete;
      this.reposition();
    }
  }
  async handleAnchorChange() {
    await this.stop();
    if (this.anchor && typeof this.anchor === "string") {
      const root = this.getRootNode();
      this.anchorEl = root.getElementById(this.anchor);
    } else if (this.anchor instanceof Element || isVirtualElement(this.anchor)) {
      this.anchorEl = this.anchor;
    } else {
      this.anchorEl = this.querySelector('[slot="anchor"]');
    }
    if (this.anchorEl instanceof HTMLSlotElement) {
      this.anchorEl = this.anchorEl.assignedElements({ flatten: true })[0];
    }
    if (this.anchorEl) {
      this.start();
    }
  }
  start() {
    var _a16, _b2;
    if (!this.anchorEl || !this.active || !this.isConnected) {
      return;
    }
    (_b2 = (_a16 = this.popup) == null ? void 0 : _a16.showPopover) == null ? void 0 : _b2.call(_a16);
    this.cleanup = autoUpdate(this.anchorEl, this.popup, () => {
      this.reposition();
    });
  }
  async stop() {
    return new Promise((resolve) => {
      var _a16, _b2;
      (_b2 = (_a16 = this.popup) == null ? void 0 : _a16.hidePopover) == null ? void 0 : _b2.call(_a16);
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = void 0;
        this.removeAttribute("data-current-placement");
        this.style.removeProperty("--auto-size-available-width");
        this.style.removeProperty("--auto-size-available-height");
        requestAnimationFrame(() => resolve());
      } else {
        resolve();
      }
    });
  }
  /** Forces the popup to recalculate and reposition itself. */
  reposition() {
    if (!this.active || !this.anchorEl || !this.popup) {
      return;
    }
    const middleware = [
      // The offset middleware goes first
      offset2({ mainAxis: this.distance, crossAxis: this.skidding })
    ];
    if (this.sync) {
      middleware.push(
        size2({
          apply: ({ rects }) => {
            const syncWidth = this.sync === "width" || this.sync === "both";
            const syncHeight = this.sync === "height" || this.sync === "both";
            this.popup.style.width = syncWidth ? `${rects.reference.width}px` : "";
            this.popup.style.height = syncHeight ? `${rects.reference.height}px` : "";
          }
        })
      );
    } else {
      this.popup.style.width = "";
      this.popup.style.height = "";
    }
    let defaultBoundary;
    if (this.SUPPORTS_POPOVER && !isVirtualElement(this.anchor) && this.boundary === "scroll") {
      defaultBoundary = getOverflowAncestors(this.anchorEl).filter((el) => el instanceof Element);
    }
    if (this.flip) {
      middleware.push(
        flip2({
          boundary: this.flipBoundary || defaultBoundary,
          // @ts-expect-error - We're converting a string attribute to an array here
          fallbackPlacements: this.flipFallbackPlacements,
          fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
          padding: this.flipPadding
        })
      );
    }
    if (this.shift) {
      middleware.push(
        shift2({
          boundary: this.shiftBoundary || defaultBoundary,
          padding: this.shiftPadding
        })
      );
    }
    if (this.autoSize) {
      middleware.push(
        size2({
          boundary: this.autoSizeBoundary || defaultBoundary,
          padding: this.autoSizePadding,
          apply: ({ availableWidth, availableHeight }) => {
            if (this.autoSize === "vertical" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-height", `${availableHeight}px`);
            } else {
              this.style.removeProperty("--auto-size-available-height");
            }
            if (this.autoSize === "horizontal" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-width", `${availableWidth}px`);
            } else {
              this.style.removeProperty("--auto-size-available-width");
            }
          }
        })
      );
    } else {
      this.style.removeProperty("--auto-size-available-width");
      this.style.removeProperty("--auto-size-available-height");
    }
    if (this.arrow) {
      middleware.push(
        arrow2({
          element: this.arrowEl,
          padding: this.arrowPadding
        })
      );
    }
    const getOffsetParent2 = this.SUPPORTS_POPOVER ? (element) => platform.getOffsetParent(element, e8) : platform.getOffsetParent;
    computePosition2(this.anchorEl, this.popup, {
      placement: this.placement,
      middleware,
      strategy: this.SUPPORTS_POPOVER ? "absolute" : "fixed",
      platform: __spreadProps(__spreadValues({}, platform), {
        getOffsetParent: getOffsetParent2
      })
    }).then(({ x: x2, y: y3, middlewareData, placement }) => {
      const isRtl = this.localize.dir() === "rtl";
      const staticSide = { top: "bottom", right: "left", bottom: "top", left: "right" }[placement.split("-")[0]];
      this.setAttribute("data-current-placement", placement);
      Object.assign(this.popup.style, {
        left: `${x2}px`,
        top: `${y3}px`
      });
      if (this.arrow) {
        const arrowX = middlewareData.arrow.x;
        const arrowY = middlewareData.arrow.y;
        let top = "";
        let right = "";
        let bottom = "";
        let left = "";
        if (this.arrowPlacement === "start") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          top = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? value : "";
          left = isRtl ? "" : value;
        } else if (this.arrowPlacement === "end") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? "" : value;
          left = isRtl ? value : "";
          bottom = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
        } else if (this.arrowPlacement === "center") {
          left = typeof arrowX === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
          top = typeof arrowY === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
        } else {
          left = typeof arrowX === "number" ? `${arrowX}px` : "";
          top = typeof arrowY === "number" ? `${arrowY}px` : "";
        }
        Object.assign(this.arrowEl.style, {
          top,
          right,
          bottom,
          left,
          [staticSide]: "calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"
        });
      }
    });
    requestAnimationFrame(() => this.updateHoverBridge());
    this.dispatchEvent(new WaRepositionEvent());
  }
  render() {
    return b`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${e7({
      "popup-hover-bridge": true,
      "popup-hover-bridge-visible": this.hoverBridge && this.active
    })}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${e7({
      popup: true,
      "popup-active": this.active,
      "popup-fixed": !this.SUPPORTS_POPOVER,
      "popup-has-arrow": this.arrow
    })}
      >
        <slot></slot>
        ${this.arrow ? b`<div part="arrow" class="arrow" role="presentation"></div>` : ""}
      </div>
    `;
  }
};
WaPopup.css = popup_styles_default;
__decorateClass([
  e6(".popup")
], WaPopup.prototype, "popup", 2);
__decorateClass([
  e6(".arrow")
], WaPopup.prototype, "arrowEl", 2);
__decorateClass([
  n5({ attribute: false, type: Boolean })
], WaPopup.prototype, "SUPPORTS_POPOVER", 2);
__decorateClass([
  n5()
], WaPopup.prototype, "anchor", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaPopup.prototype, "active", 2);
__decorateClass([
  n5({ reflect: true })
], WaPopup.prototype, "placement", 2);
__decorateClass([
  n5()
], WaPopup.prototype, "boundary", 2);
__decorateClass([
  n5({ type: Number })
], WaPopup.prototype, "distance", 2);
__decorateClass([
  n5({ type: Number })
], WaPopup.prototype, "skidding", 2);
__decorateClass([
  n5({ type: Boolean })
], WaPopup.prototype, "arrow", 2);
__decorateClass([
  n5({ attribute: "arrow-placement" })
], WaPopup.prototype, "arrowPlacement", 2);
__decorateClass([
  n5({ attribute: "arrow-padding", type: Number })
], WaPopup.prototype, "arrowPadding", 2);
__decorateClass([
  n5({ type: Boolean })
], WaPopup.prototype, "flip", 2);
__decorateClass([
  n5({
    attribute: "flip-fallback-placements",
    converter: {
      fromAttribute: (value) => {
        return value.split(" ").map((p5) => p5.trim()).filter((p5) => p5 !== "");
      },
      toAttribute: (value) => {
        return value.join(" ");
      }
    }
  })
], WaPopup.prototype, "flipFallbackPlacements", 2);
__decorateClass([
  n5({ attribute: "flip-fallback-strategy" })
], WaPopup.prototype, "flipFallbackStrategy", 2);
__decorateClass([
  n5({ type: Object })
], WaPopup.prototype, "flipBoundary", 2);
__decorateClass([
  n5({ attribute: "flip-padding", type: Number })
], WaPopup.prototype, "flipPadding", 2);
__decorateClass([
  n5({ type: Boolean })
], WaPopup.prototype, "shift", 2);
__decorateClass([
  n5({ type: Object })
], WaPopup.prototype, "shiftBoundary", 2);
__decorateClass([
  n5({ attribute: "shift-padding", type: Number })
], WaPopup.prototype, "shiftPadding", 2);
__decorateClass([
  n5({ attribute: "auto-size" })
], WaPopup.prototype, "autoSize", 2);
__decorateClass([
  n5()
], WaPopup.prototype, "sync", 2);
__decorateClass([
  n5({ type: Object })
], WaPopup.prototype, "autoSizeBoundary", 2);
__decorateClass([
  n5({ attribute: "auto-size-padding", type: Number })
], WaPopup.prototype, "autoSizePadding", 2);
__decorateClass([
  n5({ attribute: "hover-bridge", type: Boolean })
], WaPopup.prototype, "hoverBridge", 2);
WaPopup = __decorateClass([
  t5("wa-popup")
], WaPopup);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.52WA2DJO.js
var dismissibleStack = [];
function registerDismissible(key) {
  dismissibleStack.push(key);
}
function unregisterDismissible(key) {
  for (let i9 = dismissibleStack.length - 1; i9 >= 0; i9--) {
    if (dismissibleStack[i9] === key) {
      dismissibleStack.splice(i9, 1);
      break;
    }
  }
}
function isTopDismissible(key) {
  return dismissibleStack.length > 0 && dismissibleStack[dismissibleStack.length - 1] === key;
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.F25QOBDY.js
function waitForEvent(el, eventName) {
  return new Promise((resolve) => {
    function done(event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done);
        resolve();
      }
    }
    el.addEventListener(eventName, done);
  });
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.ULEOIS5V.js
var WaTooltip = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.placement = "top";
    this.disabled = false;
    this.distance = 8;
    this.open = false;
    this.skidding = 0;
    this.showDelay = 150;
    this.hideDelay = 0;
    this.trigger = "hover focus";
    this.withoutArrow = false;
    this.for = null;
    this.anchor = null;
    this.eventController = new AbortController();
    this.handleBlur = () => {
      if (this.hasTrigger("focus")) {
        this.hide();
      }
    };
    this.handleClick = () => {
      if (this.hasTrigger("click")) {
        if (this.open) {
          this.hide();
        } else {
          this.show();
        }
      }
    };
    this.handleFocus = () => {
      if (this.hasTrigger("focus")) {
        this.show();
      }
    };
    this.handleDocumentKeyDown = (event) => {
      if (event.key === "Escape" && this.open && isTopDismissible(this)) {
        event.preventDefault();
        event.stopPropagation();
        this.hide();
      }
    };
    this.handleMouseOver = () => {
      if (this.hasTrigger("hover")) {
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = window.setTimeout(() => this.show(), this.showDelay);
      }
    };
    this.handleMouseOut = (event) => {
      var _a16;
      if (this.hasTrigger("hover")) {
        const relatedTarget = event.relatedTarget;
        const movedIntoAnchor = Boolean(relatedTarget && ((_a16 = this.anchor) == null ? void 0 : _a16.contains(relatedTarget)));
        const movedIntoTooltip = Boolean(relatedTarget && this.contains(relatedTarget));
        if (movedIntoAnchor || movedIntoTooltip) {
          return;
        }
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = window.setTimeout(() => {
          this.hide();
        }, this.hideDelay);
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    const isClient2 = typeof document !== "undefined";
    if (isClient2) {
      if (this.eventController.signal.aborted) {
        this.eventController = new AbortController();
      }
      this.addEventListener("mouseout", this.handleMouseOut);
      if (this.open) {
        this.open = false;
        this.updateComplete.then(() => {
          this.open = true;
        });
      }
      if (!this.id) {
        this.id = uniqueId("wa-tooltip-");
      }
      if (this.for && this.anchor) {
        this.anchor = null;
        this.handleForChange();
      } else if (this.for) {
        this.handleForChange();
      }
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    unregisterDismissible(this);
    this.eventController.abort();
    if (this.anchor) {
      this.removeFromAriaLabelledBy(this.anchor, this.id);
    }
  }
  firstUpdated() {
    this.body.hidden = !this.open;
    if (this.open) {
      this.popup.active = true;
      this.popup.reposition();
    }
  }
  hasTrigger(triggerType) {
    const triggers = this.trigger.split(" ");
    return triggers.includes(triggerType);
  }
  /** Adds the tooltip ID to the aria-labelledby attribute */
  addToAriaLabelledBy(element, id3) {
    const currentLabel = element.getAttribute("aria-labelledby") || "";
    const labels = currentLabel.split(/\s+/).filter(Boolean);
    if (!labels.includes(id3)) {
      labels.push(id3);
      element.setAttribute("aria-labelledby", labels.join(" "));
    }
  }
  /** Removes the tooltip ID from the aria-labelledby attribute */
  removeFromAriaLabelledBy(element, id3) {
    const currentLabel = element.getAttribute("aria-labelledby") || "";
    const labels = currentLabel.split(/\s+/).filter(Boolean);
    const filteredLabels = labels.filter((label) => label !== id3);
    if (filteredLabels.length > 0) {
      element.setAttribute("aria-labelledby", filteredLabels.join(" "));
    } else {
      element.removeAttribute("aria-labelledby");
    }
  }
  async handleOpenChange() {
    if (this.open) {
      if (this.disabled) {
        return;
      }
      const waShowEvent = new WaShowEvent();
      this.dispatchEvent(waShowEvent);
      if (waShowEvent.defaultPrevented) {
        this.open = false;
        return;
      }
      document.addEventListener("keydown", this.handleDocumentKeyDown, { signal: this.eventController.signal });
      registerDismissible(this);
      this.body.hidden = false;
      this.popup.active = true;
      await animateWithClass(this.popup.popup, "show-with-scale");
      this.popup.reposition();
      this.dispatchEvent(new WaAfterShowEvent());
    } else {
      const waHideEvent = new WaHideEvent();
      this.dispatchEvent(waHideEvent);
      if (waHideEvent.defaultPrevented) {
        this.open = false;
        return;
      }
      document.removeEventListener("keydown", this.handleDocumentKeyDown);
      unregisterDismissible(this);
      await animateWithClass(this.popup.popup, "hide-with-scale");
      this.popup.active = false;
      this.body.hidden = true;
      this.dispatchEvent(new WaAfterHideEvent());
    }
  }
  handleForChange() {
    var _a16, _b2;
    const rootNode = (_a16 = this.getRootNode) == null ? void 0 : _a16.call(this);
    if (!rootNode) {
      return;
    }
    const newAnchor = this.for ? (_b2 = rootNode.getElementById) == null ? void 0 : _b2.call(rootNode, this.for) : null;
    const oldAnchor = this.anchor;
    if (newAnchor === oldAnchor) {
      return;
    }
    const { signal } = this.eventController;
    if (newAnchor) {
      this.addToAriaLabelledBy(newAnchor, this.id);
      newAnchor.addEventListener("blur", this.handleBlur, { capture: true, signal });
      newAnchor.addEventListener("focus", this.handleFocus, { capture: true, signal });
      newAnchor.addEventListener("click", this.handleClick, { signal });
      newAnchor.addEventListener("mouseover", this.handleMouseOver, { signal });
      newAnchor.addEventListener("mouseout", this.handleMouseOut, { signal });
    }
    if (oldAnchor) {
      this.removeFromAriaLabelledBy(oldAnchor, this.id);
      oldAnchor.removeEventListener("blur", this.handleBlur, { capture: true });
      oldAnchor.removeEventListener("focus", this.handleFocus, { capture: true });
      oldAnchor.removeEventListener("click", this.handleClick);
      oldAnchor.removeEventListener("mouseover", this.handleMouseOver);
      oldAnchor.removeEventListener("mouseout", this.handleMouseOut);
    }
    this.anchor = newAnchor;
  }
  async handleOptionsChange() {
    if (this.hasUpdated) {
      await this.updateComplete;
      this.popup.reposition();
    }
  }
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.hide();
    }
  }
  /** Shows the tooltip. */
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "wa-after-show");
  }
  /** Hides the tooltip */
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "wa-after-hide");
  }
  render() {
    return b`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${e7({
      tooltip: true,
      "tooltip-open": this.open
    })}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </wa-popup>
    `;
  }
};
WaTooltip.css = tooltip_styles_default;
WaTooltip.dependencies = { "wa-popup": WaPopup };
__decorateClass([
  e6("slot:not([name])")
], WaTooltip.prototype, "defaultSlot", 2);
__decorateClass([
  e6(".body")
], WaTooltip.prototype, "body", 2);
__decorateClass([
  e6("wa-popup")
], WaTooltip.prototype, "popup", 2);
__decorateClass([
  n5()
], WaTooltip.prototype, "placement", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaTooltip.prototype, "disabled", 2);
__decorateClass([
  n5({ type: Number })
], WaTooltip.prototype, "distance", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaTooltip.prototype, "open", 2);
__decorateClass([
  n5({ type: Number })
], WaTooltip.prototype, "skidding", 2);
__decorateClass([
  n5({ attribute: "show-delay", type: Number })
], WaTooltip.prototype, "showDelay", 2);
__decorateClass([
  n5({ attribute: "hide-delay", type: Number })
], WaTooltip.prototype, "hideDelay", 2);
__decorateClass([
  n5()
], WaTooltip.prototype, "trigger", 2);
__decorateClass([
  n5({ attribute: "without-arrow", type: Boolean, reflect: true })
], WaTooltip.prototype, "withoutArrow", 2);
__decorateClass([
  n5()
], WaTooltip.prototype, "for", 2);
__decorateClass([
  r7()
], WaTooltip.prototype, "anchor", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], WaTooltip.prototype, "handleOpenChange", 1);
__decorateClass([
  watch("for")
], WaTooltip.prototype, "handleForChange", 1);
__decorateClass([
  watch(["distance", "placement", "skidding"])
], WaTooltip.prototype, "handleOptionsChange", 1);
__decorateClass([
  watch("disabled")
], WaTooltip.prototype, "handleDisabledChange", 1);
WaTooltip = __decorateClass([
  t5("wa-tooltip")
], WaTooltip);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.W62SLQ7P.js
var details_styles_default = i4`
  :host {
    --spacing: var(--wa-space-m);
    --show-duration: var(--wa-transition-normal);
    --hide-duration: var(--wa-transition-normal);

    display: block;
  }

  details {
    display: block;
    overflow-anchor: none;
    border: var(--wa-panel-border-width) var(--wa-color-surface-border) var(--wa-panel-border-style);
    background-color: var(--wa-color-surface-default);
    border-radius: var(--wa-panel-border-radius);
    color: var(--wa-color-text-normal);

    /* Print styles */
    @media print {
      background: none;
      border: solid var(--wa-border-width-s) var(--wa-color-surface-border);

      summary {
        list-style: none;
      }
    }
  }

  /* Appearance modifiers */
  :host([appearance='plain']) details {
    background-color: transparent;
    border-color: transparent;
    border-radius: 0;
  }

  :host([appearance='outlined']) details {
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='filled']) details {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) details {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-border-quiet);
  }

  :host([disabled]) details {
    opacity: 0.5;
    cursor: not-allowed;
  }

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing);
    padding: var(--spacing); /* Add padding here */
    border-radius: calc(var(--wa-panel-border-radius) - var(--wa-panel-border-width));
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;

    &::marker,
    &::-webkit-details-marker {
      display: none;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: calc(var(--wa-panel-border-width) + var(--wa-focus-ring-offset));
    }
  }

  :host([open]) summary {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  /* 'Start' icon placement */
  :host([icon-placement='start']) summary {
    flex-direction: row-reverse;
    justify-content: start;
  }

  [part~='icon'] {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-text-quiet);
    transition: rotate var(--wa-transition-normal) var(--wa-transition-easing);
  }

  :host([open]) [part~='icon'] {
    rotate: 90deg;
  }

  :host([open]:dir(rtl)) [part~='icon'] {
    rotate: -90deg;
  }

  :host([open]) slot[name='expand-icon'],
  :host(:not([open])) slot[name='collapse-icon'] {
    display: none;
  }

  .body.animating {
    overflow: hidden;
  }

  .content {
    display: block;
    box-sizing: border-box; /* Ensure contents don't overflow */
    padding-block-start: var(--spacing);
    padding-inline: var(--spacing); /* Add horizontal padding */
    padding-block-end: var(--spacing); /* Add bottom padding */
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.QZCZWFP7.js
var WaDetails = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.animationGeneration = 0;
    this.isAnimating = false;
    this.open = false;
    this.disabled = false;
    this.appearance = "outlined";
    this.iconPlacement = "end";
  }
  disconnectedCallback() {
    var _a16;
    super.disconnectedCallback();
    (_a16 = this.detailsObserver) == null ? void 0 : _a16.disconnect();
  }
  firstUpdated() {
    this.body.style.height = this.open ? "auto" : "0";
    if (this.open) {
      this.details.open = true;
    }
    this.detailsObserver = new MutationObserver((changes) => {
      for (const change of changes) {
        if (change.type === "attributes" && change.attributeName === "open") {
          if (this.details.open) {
            this.show();
          } else {
            this.hide();
          }
        }
      }
    });
    this.detailsObserver.observe(this.details, { attributes: true });
  }
  updated(changedProperties) {
    if (changedProperties.has("isAnimating")) {
      this.customStates.set("animating", this.isAnimating);
    }
  }
  handleSummaryClick(event) {
    const eventPath = event.composedPath();
    const hasInteractiveElement = eventPath.some((element) => {
      var _a16;
      if (!(element instanceof HTMLElement)) return false;
      const tagName = (_a16 = element.tagName) == null ? void 0 : _a16.toLowerCase();
      if (["a", "button", "input", "textarea", "select"].includes(tagName)) {
        return true;
      }
      if (element instanceof WebAwesomeFormAssociatedElement) {
        return !("disabled" in element) || !element.disabled;
      }
      return false;
    });
    if (hasInteractiveElement) {
      return;
    }
    event.preventDefault();
    if (!this.disabled) {
      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
      this.header.focus();
    }
  }
  handleSummaryKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      this.hide();
    }
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      this.show();
    }
  }
  /** Closes other <wa-details> elements in the same document when they have the same name. */
  closeOthersWithSameName() {
    if (!this.name) return;
    const root = this.getRootNode();
    const otherDetails = root.querySelectorAll(`wa-details[name="${this.name}"]`);
    otherDetails.forEach((detail) => {
      if (detail !== this && detail.open) {
        detail.open = false;
      }
    });
  }
  async handleOpenChange() {
    this.animationGeneration++;
    const generation = this.animationGeneration;
    if (this.open) {
      this.details.open = true;
      const waShow = new WaShowEvent();
      this.dispatchEvent(waShow);
      if (waShow.defaultPrevented) {
        this.open = false;
        this.details.open = false;
        return;
      }
      this.closeOthersWithSameName();
      this.isAnimating = true;
      const duration = parseDuration(getComputedStyle(this.body).getPropertyValue("--show-duration"));
      await animate(
        this.body,
        [
          { height: "0", opacity: "0" },
          { height: `${this.body.scrollHeight}px`, opacity: "1" }
        ],
        {
          duration,
          easing: "linear"
        }
      );
      if (this.animationGeneration !== generation) {
        return;
      }
      this.body.style.height = "auto";
      this.isAnimating = false;
      this.dispatchEvent(new WaAfterShowEvent());
    } else {
      const waHide = new WaHideEvent();
      this.dispatchEvent(waHide);
      if (waHide.defaultPrevented) {
        this.details.open = true;
        this.open = true;
        return;
      }
      this.isAnimating = true;
      const duration = parseDuration(getComputedStyle(this.body).getPropertyValue("--hide-duration"));
      await animate(
        this.body,
        [
          { height: `${this.body.scrollHeight}px`, opacity: "1" },
          { height: "0", opacity: "0" }
        ],
        { duration, easing: "linear" }
      );
      if (this.animationGeneration !== generation) {
        return;
      }
      this.body.style.height = "0";
      this.isAnimating = false;
      this.details.open = false;
      this.dispatchEvent(new WaAfterHideEvent());
    }
  }
  /** Shows the details. */
  async show() {
    if (this.open || this.disabled) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "wa-after-show");
  }
  /** Hides the details */
  async hide() {
    if (!this.open || this.disabled) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "wa-after-hide");
  }
  render() {
    const isRtl = !this.hasUpdated ? this.dir === "rtl" : this.localize.dir() === "rtl";
    return b`
      <details part="base">
        <summary
          part="header"
          role="button"
          aria-expanded=${this.open ? "true" : "false"}
          aria-controls="content"
          aria-disabled=${this.disabled ? "true" : "false"}
          tabindex=${this.disabled ? "-1" : "0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary">${this.summary}</slot>

          <span part="icon">
            <slot name="expand-icon">
              <wa-icon library="system" variant="solid" name=${isRtl ? "chevron-left" : "chevron-right"}></wa-icon>
            </slot>
            <slot name="collapse-icon">
              <wa-icon library="system" variant="solid" name=${isRtl ? "chevron-left" : "chevron-right"}></wa-icon>
            </slot>
          </span>
        </summary>

        <div
          class=${e7({
      body: true,
      animating: this.isAnimating
    })}
          role="region"
          aria-labelledby="header"
        >
          <slot part="content" id="content" class="content"></slot>
        </div>
      </details>
    `;
  }
};
WaDetails.css = details_styles_default;
__decorateClass([
  e6("details")
], WaDetails.prototype, "details", 2);
__decorateClass([
  e6("summary")
], WaDetails.prototype, "header", 2);
__decorateClass([
  e6(".body")
], WaDetails.prototype, "body", 2);
__decorateClass([
  e6(".expand-icon-slot")
], WaDetails.prototype, "expandIconSlot", 2);
__decorateClass([
  r7()
], WaDetails.prototype, "isAnimating", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaDetails.prototype, "open", 2);
__decorateClass([
  n5()
], WaDetails.prototype, "summary", 2);
__decorateClass([
  n5({ reflect: true })
], WaDetails.prototype, "name", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaDetails.prototype, "disabled", 2);
__decorateClass([
  n5({ reflect: true })
], WaDetails.prototype, "appearance", 2);
__decorateClass([
  n5({ attribute: "icon-placement", reflect: true })
], WaDetails.prototype, "iconPlacement", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], WaDetails.prototype, "handleOpenChange", 1);
WaDetails = __decorateClass([
  t5("wa-details")
], WaDetails);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.VQZ46MYI.js
function getOffset(element, parent) {
  return {
    top: Math.round(element.getBoundingClientRect().top - parent.getBoundingClientRect().top),
    left: Math.round(element.getBoundingClientRect().left - parent.getBoundingClientRect().left)
  };
}
var locks = /* @__PURE__ */ new Set();
function getScrollbarWidth() {
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}
function getExistingBodyPadding() {
  const padding = Number(getComputedStyle(document.body).paddingRight.replace(/px/, ""));
  if (isNaN(padding) || !padding) {
    return 0;
  }
  return padding;
}
function lockBodyScrolling(lockingEl) {
  locks.add(lockingEl);
  if (!document.documentElement.classList.contains("wa-scroll-lock")) {
    const scrollbarWidth = getScrollbarWidth() + getExistingBodyPadding();
    let scrollbarGutterProperty = getComputedStyle(document.documentElement).scrollbarGutter;
    if (!scrollbarGutterProperty || scrollbarGutterProperty === "auto") {
      scrollbarGutterProperty = "stable";
    }
    if (scrollbarWidth < 2) {
      scrollbarGutterProperty = "";
    }
    document.documentElement.style.setProperty("--wa-scroll-lock-gutter", scrollbarGutterProperty);
    document.documentElement.classList.add("wa-scroll-lock");
    document.documentElement.style.setProperty("--wa-scroll-lock-size", `${scrollbarWidth}px`);
  }
}
function unlockBodyScrolling(lockingEl) {
  locks.delete(lockingEl);
  if (locks.size === 0) {
    document.documentElement.classList.remove("wa-scroll-lock");
    document.documentElement.style.removeProperty("--wa-scroll-lock-size");
  }
}
function scrollIntoView(element, container, direction45 = "vertical", behavior = "smooth") {
  const offset3 = getOffset(element, container);
  const offsetTop = offset3.top + container.scrollTop;
  const offsetLeft = offset3.left + container.scrollLeft;
  const minX = container.scrollLeft;
  const maxX = container.scrollLeft + container.offsetWidth;
  const minY = container.scrollTop;
  const maxY = container.scrollTop + container.offsetHeight;
  if (direction45 === "horizontal" || direction45 === "both") {
    if (offsetLeft < minX) {
      container.scrollTo({ left: offsetLeft, behavior });
    } else if (offsetLeft + element.clientWidth > maxX) {
      container.scrollTo({ left: offsetLeft - container.offsetWidth + element.clientWidth, behavior });
    }
  }
  if (direction45 === "vertical" || direction45 === "both") {
    if (offsetTop < minY) {
      container.scrollTo({ top: offsetTop, behavior });
    } else if (offsetTop + element.clientHeight > maxY) {
      container.scrollTo({ top: offsetTop - container.offsetHeight + element.clientHeight, behavior });
    }
  }
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.RMZ7BVDM.js
function parseSpaceDelimitedTokens(input) {
  return input.split(" ").map((token) => token.trim()).filter((token) => token !== "");
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.XTG2LNFG.js
var dialog_styles_default = i4`
  :host {
    --width: 31rem;
    --spacing: var(--wa-space-l);
    --backdrop-filter: none;
    --show-duration: var(--wa-transition-normal);
    --hide-duration: var(--wa-transition-normal);

    display: none;
  }

  :host([open]) {
    display: block;
  }

  .dialog {
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: var(--width);
    max-width: calc(100% - var(--wa-space-2xl));
    max-height: calc(100% - var(--wa-space-2xl));
    color: inherit;
    background-color: var(--wa-color-surface-raised);
    border-radius: var(--wa-panel-border-radius);
    border: none;
    box-shadow: var(--wa-shadow-l);
    padding: 0;
    margin: auto;

    &.show {
      animation: show-dialog var(--show-duration) ease;

      &::backdrop {
        animation: show-backdrop var(--show-duration, 200ms) ease;
      }
    }

    &.hide {
      animation: show-dialog var(--hide-duration) ease reverse;

      &::backdrop {
        animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
      }
    }

    &.pulse {
      animation: pulse 250ms ease;
    }
  }

  .dialog:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog {
      max-height: 80vh;
    }
  }

  .open {
    display: flex;
    opacity: 1;
  }

  .header {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: nowrap;

    padding-inline-start: var(--spacing);
    padding-block-end: 0;

    /* Subtract the close button's padding so that the X is visually aligned with the edges of the dialog content */
    padding-inline-end: calc(var(--spacing) - var(--wa-form-control-padding-block));
    padding-block-start: calc(var(--spacing) - var(--wa-form-control-padding-block));
  }

  .title {
    align-self: center;
    flex: 1 1 auto;
    font-family: inherit;
    font-size: var(--wa-font-size-l);
    font-weight: var(--wa-font-weight-heading);
    line-height: var(--wa-line-height-condensed);
    margin: 0;
  }

  .header-actions {
    align-self: start;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--wa-space-2xs);
    padding-inline-start: var(--spacing);
  }

  .header-actions wa-button,
  .header-actions ::slotted(wa-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .body {
    flex: 1 1 auto;
    display: block;
    padding: var(--spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  .footer {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: var(--wa-space-xs);
    justify-content: end;
    padding: var(--spacing);
    padding-block-start: 0;
  }

  .footer ::slotted(wa-button:not(:first-of-type)) {
    margin-inline-start: var(--wa-spacing-xs);
  }

  .dialog::backdrop {
    /*
      NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
      remove the fallback values here.
    */
    background-color: var(--wa-color-overlay-modal, rgb(0 0 0 / 0.25));
    backdrop-filter: var(--backdrop-filter);
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.02;
    }
    100% {
      scale: 1;
    }
  }

  @keyframes show-dialog {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes show-backdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    .dialog {
      border: solid 1px white;
    }
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.Q4MSGKHB.js
var WaDialog = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.hasSlotController = new HasSlotController(this, "footer", "header-actions", "label");
    this.open = false;
    this.label = "";
    this.withoutHeader = false;
    this.lightDismiss = false;
    this.withFooter = false;
    this.handleDocumentKeyDown = (event) => {
      if (event.key === "Escape" && this.open && isTopDismissible(this)) {
        event.preventDefault();
        event.stopPropagation();
        this.requestClose(this.dialog);
      }
    };
  }
  firstUpdated() {
    if (this.open) {
      this.addOpenListeners();
      this.dialog.showModal();
      lockBodyScrolling(this);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
    this.removeOpenListeners();
  }
  async requestClose(source) {
    const waHideEvent = new WaHideEvent({ source });
    this.dispatchEvent(waHideEvent);
    if (waHideEvent.defaultPrevented) {
      this.open = true;
      animateWithClass(this.dialog, "pulse");
      return;
    }
    this.removeOpenListeners();
    await animateWithClass(this.dialog, "hide");
    this.open = false;
    this.dialog.close();
    unlockBodyScrolling(this);
    const trigger = this.originalTrigger;
    if (typeof (trigger == null ? void 0 : trigger.focus) === "function") {
      setTimeout(() => trigger.focus());
    }
    this.dispatchEvent(new WaAfterHideEvent());
  }
  addOpenListeners() {
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    registerDismissible(this);
  }
  removeOpenListeners() {
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    unregisterDismissible(this);
  }
  handleDialogCancel(event) {
    event.preventDefault();
    if (!this.dialog.classList.contains("hide") && event.target === this.dialog && isTopDismissible(this)) {
      this.requestClose(this.dialog);
    }
  }
  handleDialogClick(event) {
    const target = event.target;
    const button = target.closest('[data-dialog="close"]');
    if (button) {
      event.stopPropagation();
      this.requestClose(button);
    }
  }
  async handleDialogPointerDown(event) {
    if (event.target === this.dialog) {
      if (this.lightDismiss) {
        this.requestClose(this.dialog);
      } else {
        await animateWithClass(this.dialog, "pulse");
      }
    }
  }
  handleOpenChange() {
    if (this.open && !this.dialog.open) {
      this.show();
    } else if (!this.open && this.dialog.open) {
      this.open = true;
      this.requestClose(this.dialog);
    }
  }
  /** Shows the dialog. */
  async show() {
    const waShowEvent = new WaShowEvent();
    this.dispatchEvent(waShowEvent);
    if (waShowEvent.defaultPrevented) {
      this.open = false;
      return;
    }
    this.addOpenListeners();
    this.originalTrigger = document.activeElement;
    this.open = true;
    this.dialog.showModal();
    lockBodyScrolling(this);
    requestAnimationFrame(() => {
      const elementToFocus = this.querySelector("[autofocus]");
      if (elementToFocus && typeof elementToFocus.focus === "function") {
        elementToFocus.focus();
      } else {
        this.dialog.focus();
      }
    });
    await animateWithClass(this.dialog, "show");
    this.dispatchEvent(new WaAfterShowEvent());
  }
  render() {
    const hasHeader = !this.withoutHeader;
    const hasFooter = this.hasSlotController.test("footer", "withFooter");
    return b`
      <dialog
        part="dialog"
        class=${e7({
      dialog: true,
      open: this.open
    })}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${hasHeader ? b`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length > 0 ? this.label : String.fromCharCode(8203)} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${(event) => this.requestClose(event.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            ` : ""}

        <div part="body" class="body"><slot></slot></div>

        <!-- Use a hidden element so we still get "slotchange" events. -->
        <footer part="footer" class="footer" ?hidden=${!hasFooter}>
          <slot name="footer"></slot>
        </footer>
      </dialog>
    `;
  }
};
WaDialog.css = dialog_styles_default;
__decorateClass([
  e6(".dialog")
], WaDialog.prototype, "dialog", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaDialog.prototype, "open", 2);
__decorateClass([
  n5({ reflect: true })
], WaDialog.prototype, "label", 2);
__decorateClass([
  n5({ attribute: "without-header", type: Boolean, reflect: true })
], WaDialog.prototype, "withoutHeader", 2);
__decorateClass([
  n5({ attribute: "light-dismiss", type: Boolean })
], WaDialog.prototype, "lightDismiss", 2);
__decorateClass([
  n5({ attribute: "with-footer", type: Boolean })
], WaDialog.prototype, "withFooter", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], WaDialog.prototype, "handleOpenChange", 1);
WaDialog = __decorateClass([
  t5("wa-dialog")
], WaDialog);
if (!o5) {
  document.addEventListener("click", (event) => {
    const dialogAttrEl = event.target.closest("[data-dialog]");
    if (dialogAttrEl instanceof Element) {
      const [command, id3] = parseSpaceDelimitedTokens(dialogAttrEl.getAttribute("data-dialog") || "");
      if (command === "open" && (id3 == null ? void 0 : id3.length)) {
        const doc = dialogAttrEl.getRootNode();
        const dialog = doc.getElementById(id3);
        if ((dialog == null ? void 0 : dialog.localName) === "wa-dialog") {
          dialog.open = true;
        } else {
          console.warn(`A dialog with an ID of "${id3}" could not be found in this document.`);
        }
      }
    }
  });
  document.addEventListener("pointerdown", () => {
  });
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.CZSN7KEZ.js
var divider_styles_default = i4`
  :host {
    --color: var(--wa-color-surface-border);
    --width: var(--wa-border-width-s);
    --spacing: var(--wa-space-m);
  }

  :host(:not([orientation='vertical'])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([orientation='vertical']) {
    display: inline-block;
    height: 100%;
    border-inline-start: solid var(--width) var(--color);
    margin: 0 var(--spacing);
    min-block-size: 1lh;
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.P6YH3RDQ.js
var WaDivider = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.orientation = "horizontal";
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "separator");
  }
  handleVerticalChange() {
    this.setAttribute("aria-orientation", this.orientation);
  }
};
WaDivider.css = divider_styles_default;
__decorateClass([
  n5({ reflect: true })
], WaDivider.prototype, "orientation", 2);
__decorateClass([
  watch("orientation")
], WaDivider.prototype, "handleVerticalChange", 1);
WaDivider = __decorateClass([
  t5("wa-divider")
], WaDivider);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.LVP7MDLV.js
var drawer_styles_default = i4`
  :host {
    --size: 25rem;
    --spacing: var(--wa-space-l);
    --backdrop-filter: none;
    --show-duration: var(--wa-transition-normal);
    --hide-duration: var(--wa-transition-normal);

    display: none;
  }

  :host([open]) {
    display: block;
  }

  .drawer {
    display: flex;
    flex-direction: column;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    color: inherit;
    background-color: var(--wa-color-surface-raised);
    border: none;
    box-shadow: var(--wa-shadow-l);
    overflow: auto;
    padding: 0;
    margin: 0;
    animation-duration: var(--show-duration);
    animation-timing-function: ease;

    &.show::backdrop {
      animation: show-backdrop var(--show-duration, 200ms) ease;
    }

    &.hide::backdrop {
      animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
    }

    &.show.top {
      animation: show-drawer-from-top var(--show-duration) ease;
    }

    &.hide.top {
      animation: show-drawer-from-top var(--hide-duration) ease reverse;
    }

    &.show.end {
      animation: show-drawer-from-end var(--show-duration) ease;

      &:dir(rtl) {
        animation-name: show-drawer-from-start;
      }
    }

    &.hide.end {
      animation: show-drawer-from-end var(--hide-duration) ease reverse;

      &:dir(rtl) {
        animation-name: show-drawer-from-start;
      }
    }

    &.show.bottom {
      animation: show-drawer-from-bottom var(--show-duration) ease;
    }

    &.hide.bottom {
      animation: show-drawer-from-bottom var(--hide-duration) ease reverse;
    }

    &.show.start {
      animation: show-drawer-from-start var(--show-duration) ease;

      &:dir(rtl) {
        animation-name: show-drawer-from-end;
      }
    }

    &.hide.start {
      animation: show-drawer-from-start var(--hide-duration) ease reverse;

      &:dir(rtl) {
        animation-name: show-drawer-from-end;
      }
    }

    &.pulse {
      animation: pulse 250ms ease;
    }
  }

  .drawer:focus {
    outline: none;
  }

  .top {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .end {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .bottom {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .start {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .header {
    display: flex;
    flex-wrap: nowrap;
    padding-inline-start: var(--spacing);
    padding-block-end: 0;

    /* Subtract the close button's padding so that the X is visually aligned with the edges of the dialog content */
    padding-inline-end: calc(var(--spacing) - var(--wa-form-control-padding-block));
    padding-block-start: calc(var(--spacing) - var(--wa-form-control-padding-block));
  }

  .title {
    align-self: center;
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--wa-font-size-l);
    font-weight: var(--wa-font-weight-heading);
    line-height: var(--wa-line-height-condensed);
    margin: 0;
  }

  .header-actions {
    align-self: start;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--wa-space-2xs);
    padding-inline-start: var(--spacing);
  }

  .header-actions wa-button,
  .header-actions ::slotted(wa-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .body {
    flex: 1 1 auto;
    display: block;
    padding: var(--spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  .footer {
    display: flex;
    flex-wrap: wrap;
    gap: var(--wa-space-xs);
    justify-content: end;
    padding: var(--spacing);
    padding-block-start: 0;
  }

  .footer ::slotted(wa-button:not(:last-of-type)) {
    margin-inline-end: var(--wa-spacing-xs);
  }

  .drawer::backdrop {
    /*
        NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
        remove the fallback values here.
      */
    background-color: var(--wa-color-overlay-modal, rgb(0 0 0 / 0.25));
    backdrop-filter: var(--backdrop-filter);
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.01;
    }
    100% {
      scale: 1;
    }
  }

  @keyframes show-drawer {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes show-drawer-from-top {
    from {
      opacity: 0;
      translate: 0 -100%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-drawer-from-end {
    from {
      opacity: 0;
      translate: 100%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-drawer-from-bottom {
    from {
      opacity: 0;
      translate: 0 100%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-drawer-from-start {
    from {
      opacity: 0;
      translate: -100% 0;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-backdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    .drawer {
      border: solid 1px white;
    }
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.WZZNE26D.js
var WaDrawer = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.hasSlotController = new HasSlotController(this, "footer", "header-actions", "label");
    this.open = false;
    this.label = "";
    this.placement = "end";
    this.withoutHeader = false;
    this.lightDismiss = false;
    this.withFooter = false;
    this.handleDocumentKeyDown = (event) => {
      if (event.key === "Escape" && this.open && isTopDismissible(this)) {
        event.preventDefault();
        event.stopPropagation();
        this.requestClose(this.drawer);
      }
    };
  }
  firstUpdated() {
    if (o5) {
      return;
    }
    if (this.open) {
      this.addOpenListeners();
      this.drawer.showModal();
      lockBodyScrolling(this);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
    this.removeOpenListeners();
  }
  async requestClose(source) {
    const waHideEvent = new WaHideEvent({ source });
    this.dispatchEvent(waHideEvent);
    if (waHideEvent.defaultPrevented) {
      this.open = true;
      animateWithClass(this.drawer, "pulse");
      return;
    }
    this.removeOpenListeners();
    await animateWithClass(this.drawer, "hide");
    this.open = false;
    this.drawer.close();
    unlockBodyScrolling(this);
    const trigger = this.originalTrigger;
    if (typeof (trigger == null ? void 0 : trigger.focus) === "function") {
      setTimeout(() => trigger.focus());
    }
    this.dispatchEvent(new WaAfterHideEvent());
  }
  addOpenListeners() {
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    registerDismissible(this);
  }
  removeOpenListeners() {
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    unregisterDismissible(this);
  }
  handleDialogCancel(event) {
    event.preventDefault();
    if (!this.drawer.classList.contains("hide") && event.target === this.drawer && isTopDismissible(this)) {
      this.requestClose(this.drawer);
    }
  }
  handleDialogClick(event) {
    const target = event.target;
    const button = target.closest('[data-drawer="close"]');
    if (button) {
      event.stopPropagation();
      this.requestClose(button);
    }
  }
  async handleDialogPointerDown(event) {
    if (event.target === this.drawer) {
      if (this.lightDismiss) {
        this.requestClose(this.drawer);
      } else {
        await animateWithClass(this.drawer, "pulse");
      }
    }
  }
  handleOpenChange() {
    if (this.open && !this.drawer.open) {
      this.show();
    } else if (this.drawer.open) {
      this.open = true;
      this.requestClose(this.drawer);
    }
  }
  /** Shows the drawer. */
  async show() {
    const waShowEvent = new WaShowEvent();
    this.dispatchEvent(waShowEvent);
    if (waShowEvent.defaultPrevented) {
      this.open = false;
      return;
    }
    this.addOpenListeners();
    this.originalTrigger = document.activeElement;
    this.open = true;
    this.drawer.showModal();
    lockBodyScrolling(this);
    requestAnimationFrame(() => {
      const elementToFocus = this.querySelector("[autofocus]");
      if (elementToFocus && typeof elementToFocus.focus === "function") {
        elementToFocus.focus();
      } else {
        this.drawer.focus();
      }
    });
    await animateWithClass(this.drawer, "show");
    this.dispatchEvent(new WaAfterShowEvent());
  }
  render() {
    const hasHeader = !this.withoutHeader;
    const hasFooter = this.hasSlotController.test("footer", "withFooter");
    return b`
      <dialog
        part="dialog"
        class=${e7({
      drawer: true,
      open: this.open,
      top: this.placement === "top",
      end: this.placement === "end",
      bottom: this.placement === "bottom",
      start: this.placement === "start"
    })}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${hasHeader ? b`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length > 0 ? this.label : String.fromCharCode(8203)} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${(event) => this.requestClose(event.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            ` : ""}

        <div part="body" class="body"><slot></slot></div>

        <footer part="footer" class="footer" ?hidden=${!hasFooter}>
          <slot name="footer"></slot>
        </footer>
      </dialog>
    `;
  }
};
WaDrawer.css = drawer_styles_default;
__decorateClass([
  e6(".drawer")
], WaDrawer.prototype, "drawer", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaDrawer.prototype, "open", 2);
__decorateClass([
  n5({ reflect: true })
], WaDrawer.prototype, "label", 2);
__decorateClass([
  n5({ reflect: true })
], WaDrawer.prototype, "placement", 2);
__decorateClass([
  n5({ attribute: "without-header", type: Boolean, reflect: true })
], WaDrawer.prototype, "withoutHeader", 2);
__decorateClass([
  n5({ attribute: "light-dismiss", type: Boolean })
], WaDrawer.prototype, "lightDismiss", 2);
__decorateClass([
  n5({ attribute: "with-footer", type: Boolean })
], WaDrawer.prototype, "withFooter", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], WaDrawer.prototype, "handleOpenChange", 1);
WaDrawer = __decorateClass([
  t5("wa-drawer")
], WaDrawer);
if (!o5) {
  document.addEventListener("click", (event) => {
    const drawerAttrEl = event.target.closest("[data-drawer]");
    if (drawerAttrEl instanceof Element) {
      const [command, id3] = parseSpaceDelimitedTokens(drawerAttrEl.getAttribute("data-drawer") || "");
      if (command === "open" && (id3 == null ? void 0 : id3.length)) {
        const doc = drawerAttrEl.getRootNode();
        const drawer = doc.getElementById(id3);
        if ((drawer == null ? void 0 : drawer.localName) === "wa-drawer") {
          drawer.open = true;
        } else {
          console.warn(`A drawer with an ID of "${id3}" could not be found in this document.`);
        }
      }
    }
  });
  document.addEventListener("pointerdown", () => {
  });
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.VCKA3KNZ.js
var dropdown_item_styles_default = i4`
  :host {
    display: flex;
    position: relative;
    align-items: center;
    padding: 0.5em 1em;
    border-radius: var(--wa-border-radius-s);
    isolation: isolate;
    color: var(--wa-color-text-normal);
    line-height: var(--wa-line-height-condensed);
    cursor: pointer;
    transition:
      var(--wa-transition-fast) background-color var(--wa-transition-easing),
      var(--wa-transition-fast) color var(--wa-transition-easing);
  }

  @media (hover: hover) {
    :host(:hover:not(:state(disabled))) {
      background-color: var(--wa-color-neutral-fill-normal);
    }
  }

  :host(:state(submenu-open)) {
    background-color: var(--wa-color-neutral-fill-normal);
  }

  :host(:focus-visible) {
    z-index: 1;
    outline: var(--wa-focus-ring);
    background-color: var(--wa-color-neutral-fill-normal);
  }

  :host(:state(disabled)),
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Danger variant */
  :host([variant='danger']),
  :host([variant='danger']) #details {
    color: var(--wa-color-danger-on-quiet);
  }

  @media (hover: hover) {
    :host([variant='danger']:hover) {
      background-color: var(--wa-color-danger-fill-normal);
      color: var(--wa-color-danger-on-normal);
    }
  }

  :host([variant='danger']:state(submenu-open)),
  :host([variant='danger']:focus-visible) {
    background-color: var(--wa-color-danger-fill-normal);
    color: var(--wa-color-danger-on-normal);
  }

  :host([checkbox-adjacent]) {
    padding-inline-start: 2em;
  }

  /* Only add padding when item actually has a submenu */
  :host([submenu-adjacent]:not(:state(has-submenu))) #details {
    padding-inline-end: 0;
  }

  :host(:state(has-submenu)[submenu-adjacent]) #details {
    padding-inline-end: 1.75em;
  }

  #check {
    visibility: hidden;
    margin-inline-start: -1.5em;
    margin-inline-end: 0.5em;
    font-size: var(--wa-font-size-smaller);
  }

  :host(:state(checked)) #check {
    visibility: visible;
  }

  #icon ::slotted(*) {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    margin-inline-end: 0.75em !important;
    font-size: var(--wa-font-size-smaller);
  }

  #label {
    flex: 1 1 auto;
    min-width: 0;
  }

  #details {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: end;
    color: var(--wa-color-text-quiet);
    font-size: var(--wa-font-size-smaller) !important;
  }

  #details ::slotted(*) {
    margin-inline-start: 2em !important;
  }

  /* Submenu indicator icon */
  #submenu-indicator {
    position: absolute;
    inset-inline-end: 1em;
    color: var(--wa-color-neutral-on-quiet);
    font-size: var(--wa-font-size-smaller);
  }

  /* Flip chevron icon when RTL */
  :host(:dir(rtl)) #submenu-indicator {
    transform: scaleX(-1);
  }

  /* Submenu styles */
  #submenu {
    display: flex;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25em;
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background-color: var(--wa-color-surface-raised);
    box-shadow: var(--wa-shadow-m);
    color: var(--wa-color-text-normal);
    text-align: start;
    user-select: none;

    /* Override default popover styles */
    &[popover] {
      margin: 0;
      inset: auto;
      padding: 0.25em;
      overflow: visible;
      border-radius: var(--wa-border-radius-m);
    }

    &.show {
      animation: submenu-show var(--show-duration, var(--wa-transition-fast)) ease;
    }

    &.hide {
      animation: submenu-show var(--show-duration, var(--wa-transition-fast)) ease reverse;
    }

    /* Submenu placement transform origins */
    &[data-placement^='top'] {
      transform-origin: bottom;
    }

    &[data-placement^='bottom'] {
      transform-origin: top;
    }

    &[data-placement^='left'] {
      transform-origin: right;
    }

    &[data-placement^='right'] {
      transform-origin: left;
    }

    &[data-placement='left-start'] {
      transform-origin: right top;
    }

    &[data-placement='left-end'] {
      transform-origin: right bottom;
    }

    &[data-placement='right-start'] {
      transform-origin: left top;
    }

    &[data-placement='right-end'] {
      transform-origin: left bottom;
    }

    /* Safe triangle styling */
    &::before {
      display: none;
      z-index: 9;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: transparent;
      content: '';
      clip-path: polygon(
        var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
        var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
        var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
      );
      pointer-events: auto; /* Enable mouse events on the triangle */
    }

    &[data-visible]::before {
      display: block;
    }
  }

  ::slotted(wa-dropdown-item) {
    font-size: inherit;
  }

  ::slotted(wa-divider) {
    --spacing: 0.25em;
  }

  @keyframes submenu-show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.HUPDX6RW.js
var WaDropdownItem = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "[default]", "start", "end");
    this.active = false;
    this.variant = "default";
    this.size = "m";
    this.checkboxAdjacent = false;
    this.submenuAdjacent = false;
    this.type = "normal";
    this.checked = false;
    this.disabled = false;
    this.submenuOpen = false;
    this.hasSubmenu = false;
    this.handleSlotChange = () => {
      this.hasSubmenu = this.hasSlotController.test("submenu");
      this.updateHasSubmenuState();
      if (this.hasSubmenu) {
        this.setAttribute("aria-haspopup", "menu");
        this.setAttribute("aria-expanded", this.submenuOpen ? "true" : "false");
      } else {
        this.removeAttribute("aria-haspopup");
        this.removeAttribute("aria-expanded");
      }
    };
    this.handleHostClick = (event) => {
      if (this.disabled) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    this.handleClick = (event) => {
      if (this.disabled) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  connectedCallback() {
    var _a16, _b2, _c, _d, _e, _f;
    super.connectedCallback();
    (_a16 = this.addEventListener) == null ? void 0 : _a16.call(this, "click", this.handleHostClick);
    (_b2 = this.addEventListener) == null ? void 0 : _b2.call(this, "mouseenter", this.handleMouseEnter.bind(this));
    (_d = (_c = this.shadowRoot) == null ? void 0 : _c.addEventListener) == null ? void 0 : _d.call(_c, "click", this.handleClick, { capture: true });
    (_f = (_e = this.shadowRoot) == null ? void 0 : _e.addEventListener) == null ? void 0 : _f.call(_e, "slotchange", this.handleSlotChange);
  }
  disconnectedCallback() {
    var _a16, _b2, _c, _d, _e, _f;
    super.disconnectedCallback();
    this.closeSubmenu();
    (_a16 = this.removeEventListener) == null ? void 0 : _a16.call(this, "click", this.handleHostClick);
    (_b2 = this.removeEventListener) == null ? void 0 : _b2.call(this, "mouseenter", this.handleMouseEnter);
    (_d = (_c = this.shadowRoot) == null ? void 0 : _c.removeEventListener) == null ? void 0 : _d.call(_c, "click", this.handleClick, { capture: true });
    (_f = (_e = this.shadowRoot) == null ? void 0 : _e.removeEventListener) == null ? void 0 : _f.call(_e, "slotchange", this.handleSlotChange);
  }
  firstUpdated() {
    this.setAttribute("tabindex", "-1");
    this.hasSubmenu = this.hasSlotController.test("submenu");
    this.updateHasSubmenuState();
  }
  updated(changedProperties) {
    if (changedProperties.has("active")) {
      this.setAttribute("tabindex", this.active ? "0" : "-1");
      this.customStates.set("active", this.active);
    }
    if (changedProperties.has("checked")) {
      if (this.type === "checkbox") {
        this.setAttribute("aria-checked", this.checked ? "true" : "false");
      } else {
        this.removeAttribute("aria-checked");
      }
      this.customStates.set("checked", this.checked);
    }
    if (changedProperties.has("disabled")) {
      this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
      this.customStates.set("disabled", this.disabled);
    }
    if (changedProperties.has("type")) {
      if (this.type === "checkbox") {
        this.setAttribute("role", "menuitemcheckbox");
        this.setAttribute("aria-checked", this.checked ? "true" : "false");
      } else {
        this.setAttribute("role", "menuitem");
        this.removeAttribute("aria-checked");
      }
    }
    if (changedProperties.has("submenuOpen")) {
      this.customStates.set("submenu-open", this.submenuOpen);
      if (this.submenuOpen) {
        this.openSubmenu();
      } else {
        this.closeSubmenu();
      }
    }
  }
  /** Update the has-submenu custom state */
  updateHasSubmenuState() {
    this.customStates.set("has-submenu", this.hasSubmenu);
  }
  /** Opens the submenu. */
  async openSubmenu() {
    var _a16;
    const submenu = this.submenuElement;
    if (!this.hasSubmenu || !submenu || !this.isConnected) return;
    this.notifyParentOfOpening();
    (_a16 = submenu.showPopover) == null ? void 0 : _a16.call(submenu);
    submenu.hidden = false;
    submenu.setAttribute("data-visible", "");
    this.submenuOpen = true;
    this.setAttribute("aria-expanded", "true");
    await animateWithClass(submenu, "show");
    setTimeout(() => {
      const items = this.getSubmenuItems();
      if (items.length > 0) {
        items.forEach((item, index) => item.active = index === 0);
        items[0].focus({ preventScroll: true });
      }
    }, 0);
  }
  /** Notifies the parent dropdown that this item is opening its submenu */
  notifyParentOfOpening() {
    const event = new CustomEvent("submenu-opening", {
      bubbles: true,
      composed: true,
      detail: { item: this }
    });
    this.dispatchEvent(event);
    const parent = this.parentElement;
    if (parent) {
      const siblings = [...parent.children].filter(
        (el) => el !== this && el.localName === "wa-dropdown-item" && el.getAttribute("slot") === this.getAttribute("slot") && el.submenuOpen
      );
      siblings.forEach((sibling) => {
        sibling.submenuOpen = false;
      });
    }
  }
  /** Closes the submenu. */
  async closeSubmenu() {
    var _a16;
    const submenu = this.submenuElement;
    if (!this.hasSubmenu || !submenu) return;
    this.submenuOpen = false;
    this.setAttribute("aria-expanded", "false");
    if (!submenu.hidden) {
      await animateWithClass(submenu, "hide");
      if (submenu == null ? void 0 : submenu.isConnected) {
        submenu.hidden = true;
        submenu.removeAttribute("data-visible");
        (_a16 = submenu.hidePopover) == null ? void 0 : _a16.call(submenu);
      }
    }
  }
  /** Gets all dropdown items in the submenu. */
  getSubmenuItems() {
    return [...this.children].filter(
      (el) => el.localName === "wa-dropdown-item" && el.getAttribute("slot") === "submenu" && !el.hasAttribute("disabled")
    );
  }
  /** Handles mouse enter to open the submenu */
  handleMouseEnter() {
    if (this.hasSubmenu && !this.disabled) {
      this.notifyParentOfOpening();
      this.submenuOpen = true;
    }
  }
  render() {
    return b`
      ${this.type === "checkbox" ? b`
            <wa-icon
              id="check"
              part="checkmark"
              exportparts="svg:checkmark__svg"
              library="system"
              name="check"
            ></wa-icon>
          ` : ""}

      <span id="icon" part="icon">
        <slot name="icon"></slot>
      </span>

      <span id="label" part="label">
        <slot></slot>
      </span>

      <span id="details" part="details">
        <slot name="details"></slot>
      </span>

      ${this.hasSubmenu ? b`
            <wa-icon
              id="submenu-indicator"
              part="submenu-icon"
              exportparts="svg:submenu-icon__svg"
              library="system"
              name="chevron-right"
            ></wa-icon>
          ` : ""}
      ${this.hasSubmenu ? b`
            <div
              id="submenu"
              part="submenu"
              popover="manual"
              role="menu"
              tabindex="-1"
              aria-orientation="vertical"
              hidden
            >
              <slot name="submenu"></slot>
            </div>
          ` : ""}
    `;
  }
};
WaDropdownItem.css = dropdown_item_styles_default;
__decorateClass([
  e6("#submenu")
], WaDropdownItem.prototype, "submenuElement", 2);
__decorateClass([
  n5({ type: Boolean })
], WaDropdownItem.prototype, "active", 2);
__decorateClass([
  n5({ reflect: true })
], WaDropdownItem.prototype, "variant", 2);
__decorateClass([
  n5({ reflect: true })
], WaDropdownItem.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaDropdownItem.prototype, "handleSizeChange", 1);
__decorateClass([
  n5({ attribute: "checkbox-adjacent", type: Boolean, reflect: true })
], WaDropdownItem.prototype, "checkboxAdjacent", 2);
__decorateClass([
  n5({ attribute: "submenu-adjacent", type: Boolean, reflect: true })
], WaDropdownItem.prototype, "submenuAdjacent", 2);
__decorateClass([
  n5()
], WaDropdownItem.prototype, "value", 2);
__decorateClass([
  n5({ reflect: true })
], WaDropdownItem.prototype, "type", 2);
__decorateClass([
  n5({ type: Boolean })
], WaDropdownItem.prototype, "checked", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaDropdownItem.prototype, "disabled", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaDropdownItem.prototype, "submenuOpen", 2);
__decorateClass([
  r7()
], WaDropdownItem.prototype, "hasSubmenu", 2);
WaDropdownItem = __decorateClass([
  t5("wa-dropdown-item")
], WaDropdownItem);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.2LXKNNNE.js
var WaSelectEvent = class extends Event {
  constructor(detail) {
    super("wa-select", { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.TTJR7FH2.js
function* activeElements(activeElement = document.activeElement) {
  if (activeElement === null || activeElement === void 0) return;
  yield activeElement;
  if ("shadowRoot" in activeElement && activeElement.shadowRoot && activeElement.shadowRoot.mode !== "closed") {
    yield* __yieldStar(activeElements(activeElement.shadowRoot.activeElement));
  }
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.Z6IK7DP4.js
var dropdown_styles_default = i4`
  :host {
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);
    display: contents;
  }

  #menu {
    display: flex;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25em;
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background-color: var(--wa-color-surface-raised);
    box-shadow: var(--wa-shadow-m);
    color: var(--wa-color-text-normal);
    text-align: start;
    user-select: none;
    overflow: auto;
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;

    &.show {
      animation: show var(--show-duration) ease;
    }

    &.hide {
      animation: show var(--hide-duration) ease reverse;
    }

    ::slotted(h1),
    ::slotted(h2),
    ::slotted(h3),
    ::slotted(h4),
    ::slotted(h5),
    ::slotted(h6) {
      display: block !important;
      margin: 0.25em 0 !important;
      padding: 0.25em 0.75em !important;
      color: var(--wa-color-text-quiet);
      font-family: var(--wa-font-family-body) !important;
      font-weight: var(--wa-font-weight-semibold) !important;
      font-size: var(--wa-font-size-smaller) !important;
    }

    ::slotted(wa-divider) {
      --spacing: 0.25em; /* Component-specific, left as-is */
    }
  }

  wa-popup[data-current-placement^='top'] #menu {
    transform-origin: bottom;
  }

  wa-popup[data-current-placement^='bottom'] #menu {
    transform-origin: top;
  }

  wa-popup[data-current-placement^='left'] #menu {
    transform-origin: right;
  }

  wa-popup[data-current-placement^='right'] #menu {
    transform-origin: left;
  }

  wa-popup[data-current-placement='left-start'] #menu {
    transform-origin: right top;
  }

  wa-popup[data-current-placement='left-end'] #menu {
    transform-origin: right bottom;
  }

  wa-popup[data-current-placement='right-start'] #menu {
    transform-origin: left top;
  }

  wa-popup[data-current-placement='right-end'] #menu {
    transform-origin: left bottom;
  }

  @keyframes show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.2IJXO5LR.js
var openDropdowns = /* @__PURE__ */ new Set();
var WaDropdown = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.submenuCleanups = /* @__PURE__ */ new Map();
    this.localize = new LocalizeController2(this);
    this.userTypedQuery = "";
    this.openSubmenuStack = [];
    this.open = false;
    this.size = "m";
    this.placement = "bottom-start";
    this.distance = 0;
    this.skidding = 0;
    this.handleDocumentKeyDown = async (event) => {
      const isRtl = this.localize.dir() === "rtl";
      if (event.key === "Escape" && this.open && isTopDismissible(this)) {
        const trigger = this.getTrigger();
        event.preventDefault();
        event.stopPropagation();
        this.open = false;
        trigger == null ? void 0 : trigger.focus({ preventScroll: true });
        return;
      }
      const activeElement = [...activeElements()].find((el) => el.localName === "wa-dropdown-item");
      const isFocusedOnItem = (activeElement == null ? void 0 : activeElement.localName) === "wa-dropdown-item";
      const currentSubmenuItem = this.getCurrentSubmenuItem();
      const isInSubmenu = !!currentSubmenuItem;
      let items;
      let activeItem;
      let activeItemIndex;
      if (isInSubmenu) {
        items = this.getSubmenuItems(currentSubmenuItem);
        activeItem = items.find((item) => item.active || item === activeElement);
        activeItemIndex = activeItem ? items.indexOf(activeItem) : -1;
      } else {
        items = this.getItems();
        activeItem = items.find((item) => item.active || item === activeElement);
        activeItemIndex = activeItem ? items.indexOf(activeItem) : -1;
      }
      let itemToSelect;
      if (event.key === "ArrowUp") {
        event.preventDefault();
        event.stopPropagation();
        if (activeItemIndex > 0) {
          itemToSelect = items[activeItemIndex - 1];
        } else {
          itemToSelect = items[items.length - 1];
        }
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        event.stopPropagation();
        if (activeItemIndex !== -1 && activeItemIndex < items.length - 1) {
          itemToSelect = items[activeItemIndex + 1];
        } else {
          itemToSelect = items[0];
        }
      }
      if (event.key === (isRtl ? "ArrowLeft" : "ArrowRight") && isFocusedOnItem && activeItem) {
        if (activeItem.hasSubmenu) {
          event.preventDefault();
          event.stopPropagation();
          activeItem.submenuOpen = true;
          this.addToSubmenuStack(activeItem);
          setTimeout(() => {
            const submenuItems = this.getSubmenuItems(activeItem);
            if (submenuItems.length > 0) {
              submenuItems.forEach((item, index) => item.active = index === 0);
              submenuItems[0].focus({ preventScroll: true });
            }
          }, 0);
          return;
        }
      }
      if (event.key === (isRtl ? "ArrowRight" : "ArrowLeft") && isInSubmenu) {
        event.preventDefault();
        event.stopPropagation();
        const removedItem = this.removeFromSubmenuStack();
        if (removedItem) {
          removedItem.submenuOpen = false;
          setTimeout(() => {
            removedItem.focus({ preventScroll: true });
            removedItem.active = true;
            const parentItems = removedItem.slot === "submenu" ? this.getSubmenuItems(removedItem.parentElement) : this.getItems();
            parentItems.forEach((item) => {
              if (item !== removedItem) {
                item.active = false;
              }
            });
          }, 0);
        }
        return;
      }
      if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        event.stopPropagation();
        itemToSelect = event.key === "Home" ? items[0] : items[items.length - 1];
      }
      if (event.key === "Tab") {
        await this.hideMenu();
      }
      if (event.key.length === 1 && !(event.metaKey || event.ctrlKey || event.altKey) && !(event.key === " " && this.userTypedQuery === "")) {
        clearTimeout(this.userTypedTimeout);
        this.userTypedTimeout = setTimeout(() => {
          this.userTypedQuery = "";
        }, 1e3);
        this.userTypedQuery += event.key;
        items.some((item) => {
          const label = (item.textContent || "").trim().toLowerCase();
          const selectionQuery = this.userTypedQuery.trim().toLowerCase();
          if (label.startsWith(selectionQuery)) {
            itemToSelect = item;
            return true;
          }
          return false;
        });
      }
      if (itemToSelect) {
        event.preventDefault();
        event.stopPropagation();
        items.forEach((item) => item.active = item === itemToSelect);
        itemToSelect.focus({ preventScroll: true });
        itemToSelect.scrollIntoView({ block: "nearest" });
        return;
      }
      if ((event.key === "Enter" || event.key === " " && this.userTypedQuery === "") && isFocusedOnItem && activeItem) {
        event.preventDefault();
        event.stopPropagation();
        if (activeItem.hasSubmenu) {
          activeItem.submenuOpen = true;
          this.addToSubmenuStack(activeItem);
          setTimeout(() => {
            const submenuItems = this.getSubmenuItems(activeItem);
            if (submenuItems.length > 0) {
              submenuItems.forEach((item, index) => item.active = index === 0);
              submenuItems[0].focus({ preventScroll: true });
            }
          }, 0);
        } else {
          this.makeSelection(activeItem);
        }
      }
    };
    this.handleDocumentPointerDown = (event) => {
      const path = event.composedPath();
      const isInDropdownHierarchy = path.some((el) => {
        if (el instanceof HTMLElement) {
          return el === this || el.closest('wa-dropdown, [part="submenu"]');
        }
        return false;
      });
      if (!isInDropdownHierarchy) {
        this.open = false;
      }
    };
    this.handleGlobalMouseMove = (event) => {
      var _a16;
      const currentSubmenuItem = this.getCurrentSubmenuItem();
      if (!(currentSubmenuItem == null ? void 0 : currentSubmenuItem.submenuOpen) || !currentSubmenuItem.submenuElement) return;
      const submenuRect = currentSubmenuItem.submenuElement.getBoundingClientRect();
      const isRtl = this.localize.dir() === "rtl";
      const submenuEdgeX = isRtl ? submenuRect.right : submenuRect.left;
      const constrainedX = isRtl ? Math.max(event.clientX, submenuEdgeX) : Math.min(event.clientX, submenuEdgeX);
      const constrainedY = Math.max(submenuRect.top, Math.min(event.clientY, submenuRect.bottom));
      currentSubmenuItem.submenuElement.style.setProperty("--safe-triangle-cursor-x", `${constrainedX}px`);
      currentSubmenuItem.submenuElement.style.setProperty("--safe-triangle-cursor-y", `${constrainedY}px`);
      const composedPath = event.composedPath();
      const submenuItemHovered = currentSubmenuItem.matches(":hover");
      const submenuElementHovered = Boolean((_a16 = currentSubmenuItem.submenuElement) == null ? void 0 : _a16.matches(":hover"));
      const isOverItem = submenuItemHovered || !!composedPath.find((el) => el === currentSubmenuItem);
      const isOverSubmenu = submenuElementHovered || !!composedPath.find(
        (el) => el instanceof HTMLElement && el.closest('[part="submenu"]') === currentSubmenuItem.submenuElement
      );
      if (!isOverItem && !isOverSubmenu) {
        setTimeout(() => {
          if (!submenuItemHovered && !submenuElementHovered) {
            currentSubmenuItem.submenuOpen = false;
          }
        }, 100);
      }
    };
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.userTypedTimeout);
    this.closeAllSubmenus();
    this.submenuCleanups.forEach((cleanup) => cleanup());
    this.submenuCleanups.clear();
    document.removeEventListener("mousemove", this.handleGlobalMouseMove);
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    document.removeEventListener("pointerdown", this.handleDocumentPointerDown);
    unregisterDismissible(this);
  }
  firstUpdated() {
    this.syncAriaAttributes();
  }
  async updated(changedProperties) {
    if (changedProperties.has("open")) {
      const previousOpen = changedProperties.get("open");
      if (previousOpen === this.open) {
        return;
      }
      if (previousOpen === void 0 && this.open === false) {
        return;
      }
      this.customStates.set("open", this.open);
      if (this.open) {
        await this.showMenu();
      } else {
        this.closeAllSubmenus();
        await this.hideMenu();
      }
    }
    if (changedProperties.has("size")) {
      this.syncItemSizes();
    }
  }
  /** Gets all dropdown items slotted in the menu. */
  getItems(includeDisabled = false) {
    var _a16, _b2;
    const items = ((_b2 = (_a16 = this.defaultSlot) == null ? void 0 : _a16.assignedElements({ flatten: true })) != null ? _b2 : []).filter(
      (el) => el.localName === "wa-dropdown-item"
    );
    return includeDisabled ? items : items.filter((item) => !item.disabled);
  }
  /** Gets all dropdown items in a specific submenu. */
  getSubmenuItems(parentItem, includeDisabled = false) {
    var _a16;
    const submenuSlot = ((_a16 = parentItem.shadowRoot) == null ? void 0 : _a16.querySelector('slot[name="submenu"]')) || parentItem.querySelector('slot[name="submenu"]');
    if (!submenuSlot) {
      return [];
    }
    const items = submenuSlot.assignedElements({ flatten: true }).filter((el) => el.localName === "wa-dropdown-item");
    return includeDisabled ? items : items.filter((item) => !item.disabled);
  }
  /** Syncs item sizes with the dropdown's size property. */
  syncItemSizes() {
    var _a16, _b2;
    const items = ((_b2 = (_a16 = this.defaultSlot) == null ? void 0 : _a16.assignedElements({ flatten: true })) != null ? _b2 : []).filter(
      (el) => el.localName === "wa-dropdown-item"
    );
    items.forEach((item) => item.size = this.size);
  }
  /** Handles the submenu navigation stack */
  addToSubmenuStack(item) {
    const index = this.openSubmenuStack.indexOf(item);
    if (index !== -1) {
      this.openSubmenuStack = this.openSubmenuStack.slice(0, index + 1);
    } else {
      this.openSubmenuStack.push(item);
    }
  }
  /** Removes the last item from the submenu stack */
  removeFromSubmenuStack() {
    return this.openSubmenuStack.pop();
  }
  /** Gets the current active submenu item */
  getCurrentSubmenuItem() {
    return this.openSubmenuStack.length > 0 ? this.openSubmenuStack[this.openSubmenuStack.length - 1] : void 0;
  }
  /** Closes all submenus in the dropdown. */
  closeAllSubmenus() {
    const items = this.getItems(true);
    items.forEach((item) => {
      item.submenuOpen = false;
    });
    this.openSubmenuStack = [];
  }
  /** Closes sibling submenus at the same level as the specified item. */
  closeSiblingSubmenus(item) {
    const parentDropdownItem = item.closest('wa-dropdown-item:not([slot="submenu"])');
    let siblingItems;
    if (parentDropdownItem) {
      siblingItems = this.getSubmenuItems(parentDropdownItem, true);
    } else {
      siblingItems = this.getItems(true);
    }
    siblingItems.forEach((siblingItem) => {
      if (siblingItem !== item && siblingItem.submenuOpen) {
        siblingItem.submenuOpen = false;
      }
    });
    if (!this.openSubmenuStack.includes(item)) {
      this.openSubmenuStack.push(item);
    }
  }
  /** Get the slotted trigger button, a <wa-button> or <button> element */
  getTrigger() {
    return this.querySelector('[slot="trigger"]');
  }
  /** Shows the dropdown menu. This should only be called from within updated(). */
  async showMenu() {
    const anchor = this.getTrigger();
    if (!anchor || !this.popup || !this.menu) return;
    const showEvent = new WaShowEvent();
    this.dispatchEvent(showEvent);
    if (showEvent.defaultPrevented) {
      this.open = false;
      return;
    }
    if (this.popup.active) {
      return;
    }
    openDropdowns.forEach((dropdown) => dropdown.open = false);
    this.popup.active = true;
    this.open = true;
    openDropdowns.add(this);
    registerDismissible(this);
    this.syncAriaAttributes();
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    document.addEventListener("pointerdown", this.handleDocumentPointerDown);
    document.addEventListener("mousemove", this.handleGlobalMouseMove);
    this.menu.classList.remove("hide");
    await animateWithClass(this.menu, "show");
    const items = this.getItems();
    if (items.length > 0) {
      items.forEach((item, index) => item.active = index === 0);
      items[0].focus({ preventScroll: true });
    }
    this.dispatchEvent(new WaAfterShowEvent());
  }
  /** Hides the dropdown menu. This should only be called from within updated(). */
  async hideMenu() {
    if (!this.popup || !this.menu) return;
    const hideEvent = new WaHideEvent({ source: this });
    this.dispatchEvent(hideEvent);
    if (hideEvent.defaultPrevented) {
      this.open = true;
      return;
    }
    this.open = false;
    openDropdowns.delete(this);
    unregisterDismissible(this);
    this.syncAriaAttributes();
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    document.removeEventListener("pointerdown", this.handleDocumentPointerDown);
    document.removeEventListener("mousemove", this.handleGlobalMouseMove);
    this.menu.classList.remove("show");
    await animateWithClass(this.menu, "hide");
    this.popup.active = this.open;
    this.dispatchEvent(new WaAfterHideEvent());
  }
  /** Handles clicks on the menu. */
  handleMenuClick(event) {
    const item = event.target.closest("wa-dropdown-item");
    if (!item || item.disabled) return;
    if (item.hasSubmenu) {
      if (!item.submenuOpen) {
        this.closeSiblingSubmenus(item);
        this.addToSubmenuStack(item);
        item.submenuOpen = true;
      }
      event.stopPropagation();
      return;
    }
    this.makeSelection(item);
  }
  /** Prepares dropdown items when they get added or removed */
  async handleMenuSlotChange() {
    const items = this.getItems(true);
    await Promise.all(items.map((item) => item.updateComplete));
    this.syncItemSizes();
    const hasCheckbox = items.some((item) => item.type === "checkbox");
    const hasSubmenu = items.some((item) => item.hasSubmenu);
    items.forEach((item, index) => {
      item.active = index === 0;
      item.checkboxAdjacent = hasCheckbox;
      item.submenuAdjacent = hasSubmenu;
    });
  }
  /** Toggles the dropdown menu */
  handleTriggerClick() {
    this.open = !this.open;
  }
  /** Handles submenu opening events */
  handleSubmenuOpening(event) {
    const openingItem = event.detail.item;
    this.closeSiblingSubmenus(openingItem);
    this.addToSubmenuStack(openingItem);
    this.setupSubmenuPosition(openingItem);
    this.processSubmenuItems(openingItem);
  }
  /** Sets up submenu positioning with autoUpdate */
  setupSubmenuPosition(item) {
    if (!item.submenuElement) return;
    this.cleanupSubmenuPosition(item);
    const cleanup = autoUpdate(item, item.submenuElement, () => {
      this.positionSubmenu(item);
      this.updateSafeTriangleCoordinates(item);
    });
    this.submenuCleanups.set(item, cleanup);
    const submenuSlot = item.submenuElement.querySelector('slot[name="submenu"]');
    if (submenuSlot) {
      submenuSlot.removeEventListener("slotchange", WaDropdown.handleSubmenuSlotChange);
      submenuSlot.addEventListener("slotchange", WaDropdown.handleSubmenuSlotChange);
      WaDropdown.handleSubmenuSlotChange({ target: submenuSlot });
    }
  }
  static handleSubmenuSlotChange(event) {
    const slot = event.target;
    if (!slot) return;
    const items = slot.assignedElements().filter((el) => el.localName === "wa-dropdown-item");
    if (items.length === 0) return;
    const hasSubmenuItems = items.some((item) => item.hasSubmenu);
    const hasCheckboxItems = items.some((item) => item.type === "checkbox");
    items.forEach((item) => {
      item.submenuAdjacent = hasSubmenuItems;
      item.checkboxAdjacent = hasCheckboxItems;
    });
  }
  processSubmenuItems(item) {
    if (!item.submenuElement) return;
    const submenuItems = this.getSubmenuItems(item, true);
    const hasSubmenuItems = submenuItems.some((subItem) => subItem.hasSubmenu);
    submenuItems.forEach((subItem) => {
      subItem.submenuAdjacent = hasSubmenuItems;
    });
  }
  /** Cleans up submenu positioning */
  cleanupSubmenuPosition(item) {
    const cleanup = this.submenuCleanups.get(item);
    if (cleanup) {
      cleanup();
      this.submenuCleanups.delete(item);
    }
  }
  /** Positions a submenu relative to its parent item */
  positionSubmenu(item) {
    if (!item.submenuElement) return;
    const isRtl = this.localize.dir() === "rtl";
    const placement = isRtl ? "left-start" : "right-start";
    computePosition2(item, item.submenuElement, {
      placement,
      middleware: [
        offset2({
          mainAxis: 0,
          crossAxis: -5
        }),
        flip2({
          fallbackStrategy: "bestFit"
        }),
        shift2({
          padding: 8
        })
      ]
    }).then(({ x: x2, y: y3, placement: placement2 }) => {
      item.submenuElement.setAttribute("data-placement", placement2);
      Object.assign(item.submenuElement.style, {
        left: `${x2}px`,
        top: `${y3}px`
      });
    });
  }
  /** Updates the safe triangle coordinates for a submenu */
  updateSafeTriangleCoordinates(item) {
    var _a16;
    if (!item.submenuElement || !item.submenuOpen) return;
    const isKeyboardNavigation = (_a16 = document.activeElement) == null ? void 0 : _a16.matches(":focus-visible");
    if (isKeyboardNavigation) {
      item.submenuElement.style.setProperty("--safe-triangle-visible", "none");
      return;
    }
    item.submenuElement.style.setProperty("--safe-triangle-visible", "block");
    const submenuRect = item.submenuElement.getBoundingClientRect();
    const isRtl = this.localize.dir() === "rtl";
    item.submenuElement.style.setProperty(
      "--safe-triangle-submenu-start-x",
      `${isRtl ? submenuRect.right : submenuRect.left}px`
    );
    item.submenuElement.style.setProperty("--safe-triangle-submenu-start-y", `${submenuRect.top}px`);
    item.submenuElement.style.setProperty(
      "--safe-triangle-submenu-end-x",
      `${isRtl ? submenuRect.right : submenuRect.left}px`
    );
    item.submenuElement.style.setProperty("--safe-triangle-submenu-end-y", `${submenuRect.bottom}px`);
  }
  /** Makes a selection, emits the wa-select event, and closes the dropdown. */
  makeSelection(item) {
    const trigger = this.getTrigger();
    if (item.disabled) {
      return;
    }
    if (item.type === "checkbox") {
      item.checked = !item.checked;
    }
    const selectEvent = new WaSelectEvent({ item });
    this.dispatchEvent(selectEvent);
    if (!selectEvent.defaultPrevented) {
      this.open = false;
      trigger == null ? void 0 : trigger.focus({ preventScroll: true });
    }
  }
  /** Syncs aria attributes on the slotted trigger element and the menu based on the dropdown's current state */
  async syncAriaAttributes() {
    var _a16;
    const trigger = this.getTrigger();
    let nativeButton;
    if (!trigger) {
      return;
    }
    if (trigger.localName === "wa-button") {
      await customElements.whenDefined("wa-button");
      await trigger.updateComplete;
      nativeButton = trigger.shadowRoot.querySelector('[part="base"]');
    } else {
      nativeButton = trigger;
    }
    if (!nativeButton.hasAttribute("id")) {
      nativeButton.setAttribute("id", uniqueId("wa-dropdown-trigger-"));
    }
    nativeButton.setAttribute("aria-haspopup", "menu");
    nativeButton.setAttribute("aria-expanded", this.open ? "true" : "false");
    (_a16 = this.menu) == null ? void 0 : _a16.setAttribute("aria-expanded", "false");
  }
  render() {
    var _a16;
    let active = this.didSSR && !this.hasUpdated ? this.open : (_a16 = this.popup) == null ? void 0 : _a16.active;
    return b`
      <wa-popup
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        ?active=${active}
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="10"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot
          name="trigger"
          slot="anchor"
          @click=${this.handleTriggerClick}
          @slotchange=${this.syncAriaAttributes}
        ></slot>
        <div
          id="menu"
          part="menu"
          role="menu"
          tabindex="-1"
          aria-orientation="vertical"
          @click=${this.handleMenuClick}
          @submenu-opening=${this.handleSubmenuOpening}
        >
          <slot @slotchange=${this.handleMenuSlotChange}></slot>
        </div>
      </wa-popup>
    `;
  }
};
WaDropdown.css = [size_styles_default, dropdown_styles_default];
__decorateClass([
  e6("slot:not([name])")
], WaDropdown.prototype, "defaultSlot", 2);
__decorateClass([
  e6("#menu")
], WaDropdown.prototype, "menu", 2);
__decorateClass([
  e6("wa-popup")
], WaDropdown.prototype, "popup", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaDropdown.prototype, "open", 2);
__decorateClass([
  n5({ reflect: true })
], WaDropdown.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaDropdown.prototype, "handleSizeChange", 1);
__decorateClass([
  n5({ reflect: true })
], WaDropdown.prototype, "placement", 2);
__decorateClass([
  n5({ type: Number })
], WaDropdown.prototype, "distance", 2);
__decorateClass([
  n5({ type: Number })
], WaDropdown.prototype, "skidding", 2);
WaDropdown = __decorateClass([
  t5("wa-dropdown")
], WaDropdown);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.CJ6QKR26.js
var WaFormatNumber = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.value = 0;
    this.type = "decimal";
    this.withoutGrouping = false;
    this.currency = "USD";
    this.currencyDisplay = "symbol";
  }
  static get styles() {
    return [];
  }
  render() {
    if (isNaN(this.value)) {
      return "";
    }
    return this.localize.number(this.value, {
      style: this.type,
      currency: this.currency,
      currencyDisplay: this.currencyDisplay,
      useGrouping: !this.withoutGrouping,
      minimumIntegerDigits: this.minimumIntegerDigits,
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits,
      minimumSignificantDigits: this.minimumSignificantDigits,
      maximumSignificantDigits: this.maximumSignificantDigits
    });
  }
};
__decorateClass([
  n5({ type: Number })
], WaFormatNumber.prototype, "value", 2);
__decorateClass([
  n5()
], WaFormatNumber.prototype, "type", 2);
__decorateClass([
  n5({ attribute: "without-grouping", type: Boolean })
], WaFormatNumber.prototype, "withoutGrouping", 2);
__decorateClass([
  n5()
], WaFormatNumber.prototype, "currency", 2);
__decorateClass([
  n5({ attribute: "currency-display" })
], WaFormatNumber.prototype, "currencyDisplay", 2);
__decorateClass([
  n5({ attribute: "minimum-integer-digits", type: Number })
], WaFormatNumber.prototype, "minimumIntegerDigits", 2);
__decorateClass([
  n5({ attribute: "minimum-fraction-digits", type: Number })
], WaFormatNumber.prototype, "minimumFractionDigits", 2);
__decorateClass([
  n5({ attribute: "maximum-fraction-digits", type: Number })
], WaFormatNumber.prototype, "maximumFractionDigits", 2);
__decorateClass([
  n5({ attribute: "minimum-significant-digits", type: Number })
], WaFormatNumber.prototype, "minimumSignificantDigits", 2);
__decorateClass([
  n5({ attribute: "maximum-significant-digits", type: Number })
], WaFormatNumber.prototype, "maximumSignificantDigits", 2);
WaFormatNumber = __decorateClass([
  t5("wa-format-number")
], WaFormatNumber);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.H7TA73OO.js
var WaIncludeErrorEvent = class extends Event {
  constructor(detail) {
    super("wa-include-error", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.2MLO7LVV.js
var include_styles_default = i4`
  :host {
    display: block;
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.WGFDW2LC.js
var includeFiles = /* @__PURE__ */ new Map();
function requestInclude(src, mode = "cors") {
  const prev = includeFiles.get(src);
  if (prev !== void 0) {
    return Promise.resolve(prev);
  }
  const fileDataPromise = fetch(src, { mode }).then(async (response) => {
    const res = {
      ok: response.ok,
      status: response.status,
      html: await response.text()
    };
    includeFiles.set(src, res);
    return res;
  });
  includeFiles.set(src, fileDataPromise);
  return fileDataPromise;
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.AEEHXP6K.js
var WaInclude = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.mode = "cors";
    this.allowScripts = false;
  }
  executeScript(script) {
    const newScript = document.createElement("script");
    [...script.attributes].forEach((attr) => newScript.setAttribute(attr.name, attr.value));
    newScript.textContent = script.textContent;
    script.parentNode.replaceChild(newScript, script);
  }
  async handleSrcChange() {
    try {
      const src = this.src;
      const file = await requestInclude(src, this.mode);
      if (src !== this.src) {
        return;
      }
      if (!file.ok) {
        this.dispatchEvent(new WaIncludeErrorEvent({ status: file.status }));
        return;
      }
      this.innerHTML = file.html;
      if (this.allowScripts) {
        [...this.querySelectorAll("script")].forEach((script) => this.executeScript(script));
      }
      this.dispatchEvent(new WaLoadEvent());
    } catch (e10) {
      this.dispatchEvent(new WaIncludeErrorEvent({ status: -1 }));
    }
  }
  render() {
    return b`<slot></slot>`;
  }
};
WaInclude.css = include_styles_default;
__decorateClass([
  n5()
], WaInclude.prototype, "src", 2);
__decorateClass([
  n5()
], WaInclude.prototype, "mode", 2);
__decorateClass([
  n5({ attribute: "allow-scripts", type: Boolean })
], WaInclude.prototype, "allowScripts", 2);
__decorateClass([
  watch("src")
], WaInclude.prototype, "handleSrcChange", 1);
WaInclude = __decorateClass([
  t5("wa-include")
], WaInclude);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.JTOY5KP3.js
var WaClearEvent = class extends Event {
  constructor() {
    super("wa-clear", { bubbles: true, cancelable: false, composed: true });
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.DOFHHKB4.js
function submitOnEnter(event, el) {
  const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
  if (event.key === "Enter" && !hasModifier) {
    setTimeout(() => {
      if (!event.defaultPrevented && !event.isComposing) {
        submitForm(el);
      }
    });
  }
}
function submitForm(el) {
  let form = null;
  if ("form" in el) {
    form = el.form;
  }
  if (!form && "getForm" in el) {
    form = el.getForm();
  }
  if (!form) {
    return;
  }
  const formElements = [...form.elements];
  if (formElements.length === 1) {
    form.requestSubmit(null);
    return;
  }
  const button = formElements.find((el2) => el2.type === "submit" && !el2.matches(":disabled"));
  if (!button) {
    return;
  }
  if (["input", "button"].includes(button.localName)) {
    form.requestSubmit(button);
  } else {
    button.click();
  }
}

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.ODECC6XW.js
var input_styles_default = i4`
  :host {
    border-width: 0;
  }

  :host(:focus) {
    outline: none;
  }

  .text-field {
    display: flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    transition: inherit;
    height: var(--wa-form-control-height);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    cursor: text;
    color: var(--wa-form-control-value-color);
    font-size: var(--wa-form-control-value-font-size);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    vertical-align: middle;
    width: 100%;
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    background-color: var(--wa-form-control-background-color);
    box-shadow: var(--box-shadow);
    padding: 0 var(--wa-form-control-padding-inline);
    outline-offset: var(--wa-focus-ring-offset);

    &:focus-within {
      outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
      outline-color: var(--wa-color-focus);
    }

    /* Style disabled inputs */
    &:has(:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .text-field {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  :host([pill]) .text-field {
    border-radius: var(--wa-border-radius-pill) !important;
  }

  .text-field {
    /* Show autofill styles over the entire text field, not just the native <input> */
    &:has(:autofill),
    &:has(:-webkit-autofill) {
      background-color: var(--wa-color-brand-fill-quiet) !important;
    }

    input,
    textarea {
      /*
      Fixes an alignment issue with placeholders.
      https://github.com/shoelace-style/webawesome/issues/342
    */
      height: 100%;

      padding: 0;
      border: none;
      outline: none;
      box-shadow: none;
      margin: 0;
      cursor: inherit;
      -webkit-appearance: none;
      font: inherit;

      /* Turn off Safari's autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        background-color: transparent;
        -webkit-text-fill-color: inherit;
      }
    }
  }

  input {
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
    transition: inherit;

    /* prettier-ignore */
    background-color: rgb(118 118 118 / 0); /* ensures proper placeholder styles in webkit's date input */
    height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    padding-block: 0;
    color: inherit;

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }

    &:focus {
      outline: none;
    }
  }

  textarea {
    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }
  }

  .start,
  .end {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;

    &::slotted(wa-icon) {
      color: var(--wa-color-neutral-on-quiet);
    }
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  /*
   * Clearable + Password Toggle
   */

  .clear,
  .password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: var(--wa-transition-normal) color;
    cursor: pointer;
    margin-inline-start: var(--wa-form-control-padding-inline);

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }

    &:focus {
      outline: none;
    }
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  :host([without-spin-buttons]) input[type='number'] {
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      display: none;
    }
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.APJ42YJ7.js
var WaInput = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.assumeInteractionOn = ["blur", "input"];
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.localize = new LocalizeController2(this);
    this.title = "";
    this.type = "text";
    this._value = null;
    this.defaultValue = this.getAttribute("value") || null;
    this.size = "m";
    this.appearance = "outlined";
    this.pill = false;
    this.label = "";
    this.hint = "";
    this.withClear = false;
    this.placeholder = "";
    this.readonly = false;
    this.passwordToggle = false;
    this.passwordVisible = false;
    this.withoutSpinButtons = false;
    this.required = false;
    this.spellcheck = true;
    this.withLabel = false;
    this.withHint = false;
  }
  static get validators() {
    return o5 ? [] : [...super.validators, MirrorValidator()];
  }
  /** The current value of the input, submitted as a name/value pair with form data. */
  get value() {
    var _a16;
    if (this.valueHasChanged) {
      return this._value;
    }
    return (_a16 = this._value) != null ? _a16 : this.defaultValue;
  }
  set value(val) {
    if (this._value === val) {
      return;
    }
    this.valueHasChanged = true;
    this._value = val;
  }
  /**
   * @internal
   */
  updateFormValue(value) {
    if (value == null) {
      this.setValue("", null);
      return;
    }
    super.updateFormValue(value);
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  handleChange(event) {
    this.value = this.input.value;
    this.relayNativeEvent(event, { bubbles: true, composed: true });
  }
  handleClearClick(event) {
    event.preventDefault();
    if (this.value !== "") {
      this.value = "";
      this.updateComplete.then(() => {
        this.dispatchEvent(new WaClearEvent());
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      });
    }
    this.input.focus();
  }
  handleInput() {
    this.value = this.input.value;
  }
  handleKeyDown(event) {
    submitOnEnter(event, this);
  }
  handlePasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("value") || changedProperties.has("defaultValue") || changedProperties.has("type")) {
      const sanitizingTypes = ["number", "date", "time", "datetime-local"];
      if (this.input && sanitizingTypes.includes(this.type) && this.value && this.input.value !== this.value) {
        this._value = this.input.value;
      }
      this.customStates.set("blank", !this.value);
      this.updateValidity();
    }
  }
  handleStepChange() {
    this.input.step = String(this.step);
    this.updateValidity();
  }
  /** Sets focus on the input. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the input. */
  blur() {
    this.input.blur();
  }
  /** Selects all the text in the input. */
  select() {
    this.input.select();
  }
  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  /** Replaces a range of text with a new string. */
  setRangeText(replacement, start, end, selectMode = "preserve") {
    const selectionStart = start != null ? start : this.input.selectionStart;
    const selectionEnd = end != null ? end : this.input.selectionEnd;
    this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Displays the browser picker for an input element (only works if the browser supports it for the input type). */
  showPicker() {
    if ("showPicker" in HTMLInputElement.prototype) {
      this.input.showPicker();
    }
  }
  /** Increments the value of a numeric input type by the value of the step attribute. */
  stepUp() {
    this.input.stepUp();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Decrements the value of a numeric input type by the value of the step attribute. */
  stepDown() {
    this.input.stepDown();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  formResetCallback() {
    this.value = null;
    if (this.input) {
      this.input.value = this.value;
    }
    super.formResetCallback();
  }
  render() {
    var _a16;
    const hasLabelSlot = this.hasSlotController.test("label", "withLabel");
    const hasHintSlot = this.hasSlotController.test("hint", "withHint");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    const hasClearIcon = this.withClear && !this.disabled && !this.readonly;
    const isClearIconVisible = (
      // prevents hydration mismatch errors.
      (!this.didSSR || this.hasUpdated) && hasClearIcon && (typeof this.value === "number" || this.value && this.value.length > 0)
    );
    return b`
      <label
        part="form-control-label label"
        class=${e7({
      label: true,
      "has-label": hasLabel
    })}
        for="input"
        aria-hidden=${hasLabel ? "false" : "true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type=${this.type === "password" && this.passwordVisible ? "text" : this.type}
          title=${this.title}
          name=${o7(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${o7(this.placeholder)}
          minlength=${o7(this.minlength)}
          maxlength=${o7(this.maxlength)}
          min=${o7(this.min)}
          max=${o7(this.max)}
          step=${o7(this.step)}
          .value=${l6((_a16 = this.value) != null ? _a16 : "")}
          autocapitalize=${o7(this.autocapitalize)}
          autocomplete=${o7(this.autocomplete)}
          autocorrect=${this.autocorrect ? "on" : "off"}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${o7(this.pattern)}
          enterkeyhint=${o7(this.enterkeyhint)}
          inputmode=${o7(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${isClearIconVisible ? b`
              <button
                part="clear-button"
                class="clear"
                type="button"
                aria-label=${this.localize.term("clearEntry")}
                @click=${this.handleClearClick}
                tabindex="-1"
              >
                <slot name="clear-icon">
                  <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                </slot>
              </button>
            ` : ""}
        ${this.passwordToggle && !this.disabled ? b`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible ? "hidePassword" : "showPassword")}
                @click=${this.handlePasswordToggle}
                tabindex="-1"
              >
                ${!this.passwordVisible ? b`
                      <slot name="show-password-icon">
                        <wa-icon name="eye" library="system" variant="regular"></wa-icon>
                      </slot>
                    ` : b`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `}
              </button>
            ` : ""}

        <slot name="end" part="end" class="end"></slot>
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${e7({
      "has-slotted": hasHint
    })}
        aria-hidden=${hasHint ? "false" : "true"}
        >${this.hint}</slot
      >
    `;
  }
};
WaInput.css = [size_styles_default, form_control_styles_default, input_styles_default];
WaInput.shadowRootOptions = __spreadProps(__spreadValues({}, WebAwesomeFormAssociatedElement.shadowRootOptions), { delegatesFocus: true });
__decorateClass([
  e6("input")
], WaInput.prototype, "input", 2);
__decorateClass([
  n5()
], WaInput.prototype, "title", 2);
__decorateClass([
  n5({ reflect: true })
], WaInput.prototype, "type", 2);
__decorateClass([
  r7()
], WaInput.prototype, "value", 1);
__decorateClass([
  n5({ attribute: "value", reflect: true })
], WaInput.prototype, "defaultValue", 2);
__decorateClass([
  n5({ reflect: true })
], WaInput.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaInput.prototype, "handleSizeChange", 1);
__decorateClass([
  n5({ reflect: true })
], WaInput.prototype, "appearance", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaInput.prototype, "pill", 2);
__decorateClass([
  n5()
], WaInput.prototype, "label", 2);
__decorateClass([
  n5({ attribute: "hint" })
], WaInput.prototype, "hint", 2);
__decorateClass([
  n5({ attribute: "with-clear", type: Boolean })
], WaInput.prototype, "withClear", 2);
__decorateClass([
  n5()
], WaInput.prototype, "placeholder", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaInput.prototype, "readonly", 2);
__decorateClass([
  n5({ attribute: "password-toggle", type: Boolean })
], WaInput.prototype, "passwordToggle", 2);
__decorateClass([
  n5({ attribute: "password-visible", type: Boolean })
], WaInput.prototype, "passwordVisible", 2);
__decorateClass([
  n5({ attribute: "without-spin-buttons", type: Boolean, reflect: true })
], WaInput.prototype, "withoutSpinButtons", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaInput.prototype, "required", 2);
__decorateClass([
  n5()
], WaInput.prototype, "pattern", 2);
__decorateClass([
  n5({ type: Number })
], WaInput.prototype, "minlength", 2);
__decorateClass([
  n5({ type: Number })
], WaInput.prototype, "maxlength", 2);
__decorateClass([
  n5()
], WaInput.prototype, "min", 2);
__decorateClass([
  n5()
], WaInput.prototype, "max", 2);
__decorateClass([
  n5()
], WaInput.prototype, "step", 2);
__decorateClass([
  n5()
], WaInput.prototype, "autocapitalize", 2);
__decorateClass([
  n5({
    type: Boolean,
    converter: {
      fromAttribute: (value) => !value || value === "off" ? false : true,
      toAttribute: (value) => value ? "on" : "off"
    }
  })
], WaInput.prototype, "autocorrect", 2);
__decorateClass([
  n5()
], WaInput.prototype, "autocomplete", 2);
__decorateClass([
  n5({ type: Boolean })
], WaInput.prototype, "autofocus", 2);
__decorateClass([
  n5()
], WaInput.prototype, "enterkeyhint", 2);
__decorateClass([
  n5({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], WaInput.prototype, "spellcheck", 2);
__decorateClass([
  n5()
], WaInput.prototype, "inputmode", 2);
__decorateClass([
  n5({ attribute: "with-label", type: Boolean })
], WaInput.prototype, "withLabel", 2);
__decorateClass([
  n5({ attribute: "with-hint", type: Boolean })
], WaInput.prototype, "withHint", 2);
__decorateClass([
  watch("step", { waitUntilFirstUpdate: true })
], WaInput.prototype, "handleStepChange", 1);
WaInput = __decorateClass([
  t5("wa-input")
], WaInput);
var _a10;
(_a10 = WaInput.disableWarning) == null ? void 0 : _a10.call(WaInput, "change-in-update");

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.5J72BVE2.js
var number_input_styles_default = i4`
  :host(:focus) {
    outline: none;
  }

  .number-field {
    display: flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    height: var(--wa-form-control-height);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    cursor: text;
    color: var(--wa-form-control-value-color);
    font-size: inherit;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    vertical-align: middle;
    width: 100%;
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    background-color: var(--wa-form-control-background-color);
    padding: 0;
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    &:focus-within {
      outline-color: var(--wa-color-focus);
    }

    /* Style disabled inputs */
    &:has(input:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) {
    .number-field {
      background-color: var(--wa-form-control-background-color);
      border-color: var(--wa-form-control-border-color);
    }

    .stepper {
      color: var(--wa-color-neutral-on-quiet);

      @media (hover: hover) {
        &:hover:not(:disabled) {
          color: var(--wa-color-neutral-on-quiet);
          background-color: var(--wa-color-neutral-fill-quiet);
        }
      }

      &:active:not(:disabled) {
        color: color-mix(in oklab, var(--wa-color-neutral-on-quiet), var(--wa-color-mix-active));
        background-color: color-mix(in oklab, var(--wa-color-neutral-fill-quiet), var(--wa-color-mix-active));
      }
    }
  }

  :host([appearance='filled']) {
    .number-field {
      background-color: var(--wa-color-neutral-fill-quiet);
      border-color: var(--wa-color-neutral-fill-quiet);
    }

    .stepper {
      color: var(--wa-color-neutral-on-quiet);

      @media (hover: hover) {
        &:hover:not(:disabled) {
          color: var(--wa-color-neutral-on-normal);
          background-color: var(--wa-color-neutral-fill-normal);
        }
      }

      &:active:not(:disabled) {
        color: color-mix(in oklab, var(--wa-color-neutral-on-normal), var(--wa-color-mix-active));
        background-color: color-mix(in oklab, var(--wa-color-neutral-fill-normal), var(--wa-color-mix-active));
      }
    }
  }

  :host([appearance='filled-outlined']) {
    .number-field {
      background-color: var(--wa-color-neutral-fill-quiet);
      border-color: var(--wa-form-control-border-color);
    }

    .stepper {
      color: var(--wa-color-neutral-on-quiet);

      @media (hover: hover) {
        &:hover:not(:disabled) {
          color: var(--wa-color-neutral-on-normal);
          background-color: var(--wa-color-neutral-fill-normal);
        }
      }

      &:active:not(:disabled) {
        color: color-mix(in oklab, var(--wa-color-neutral-on-normal), var(--wa-color-mix-active));
        background-color: color-mix(in oklab, var(--wa-color-neutral-fill-normal), var(--wa-color-mix-active));
      }
    }
  }

  :host([pill]) {
    .number-field,
    .stepper {
      border-radius: var(--wa-border-radius-pill);
    }
  }

  .number-field {
    /* Show autofill styles over the entire number field, not just the native <input> */
    &:has(:autofill),
    &:has(:-webkit-autofill) {
      background-color: var(--wa-color-brand-fill-quiet) !important;
    }

    input {
      flex: auto;
      height: 100%;
      width: auto;
      min-width: 0;
      margin: 0;
      padding: 0 var(--wa-form-control-padding-inline);
      outline: none;
      box-shadow: none;
      border: none;
      background-color: transparent;
      font: inherit;
      transition: inherit;
      cursor: inherit;
      -webkit-appearance: none;

      /* Center-align and use tabular numbers for better alignment */
      text-align: center;
      font-variant-numeric: tabular-nums;

      /* Hide the number spinners in Firefox */
      -moz-appearance: textfield;

      /* Hide the number spinners in Chrome/Safari */
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        display: none;
      }

      /* Turn off Safari's autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        background-color: transparent;
        -webkit-text-fill-color: inherit;
      }
    }

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &:focus {
      outline: none;
    }
  }

  .start,
  .end {
    display: inline-flex;
    flex: 1;
    align-items: center;
    cursor: default;

    &::slotted(wa-icon) {
      color: var(--wa-color-neutral-on-quiet);
    }
  }

  .start {
    justify-content: start;
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  .end {
    justify-content: end;
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  /*
   * Steppers - horizontal layout with minus on start, plus on end
   */

  .stepper {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    height: calc(100% - var(--wa-form-control-border-width) * 2);
    flex: 0 0 auto;
    border: none;
    border-radius: calc(var(--wa-form-control-border-radius) - var(--wa-form-control-border-width) * 2);
    background: transparent;
    cursor: pointer;
    margin: var(--wa-form-control-border-width);
    padding: 0;
    font-size: inherit;
    transition-property: background-color, color;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:focus {
      outline: none;
    }
  }

  :host([without-steppers]) .stepper {
    display: none;
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.6QAL56QA.js
var WaNumberInput = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super(...arguments);
    this.assumeInteractionOn = ["blur", "input"];
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.localize = new LocalizeController2(this);
    this.title = "";
    this._value = null;
    this.defaultValue = this.getAttribute("value") || null;
    this.size = "m";
    this.appearance = "outlined";
    this.pill = false;
    this.label = "";
    this.hint = "";
    this.placeholder = "";
    this.readonly = false;
    this.required = false;
    this.step = 1;
    this.withoutSteppers = false;
    this.inputmode = "numeric";
    this.withLabel = false;
    this.withHint = false;
  }
  static get validators() {
    return [...super.validators, MirrorValidator()];
  }
  /** The current value of the input, submitted as a name/value pair with form data. */
  get value() {
    var _a16;
    if (this.valueHasChanged) {
      return this._value;
    }
    return (_a16 = this._value) != null ? _a16 : this.defaultValue;
  }
  set value(val) {
    if (this._value === val) {
      return;
    }
    this.valueHasChanged = true;
    this._value = val;
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  /**
   * @internal
   */
  updateFormValue(value) {
    if (value == null) {
      this.setValue("", null);
      return;
    }
    super.updateFormValue(value);
  }
  /** Returns true if the value is at or below the minimum. */
  get isAtMin() {
    if (this.min === void 0) return false;
    const numValue = parseFloat(this.value || "");
    return !isNaN(numValue) && numValue <= this.min;
  }
  /** Returns true if the value is at or above the maximum. */
  get isAtMax() {
    if (this.max === void 0) return false;
    const numValue = parseFloat(this.value || "");
    return !isNaN(numValue) && numValue >= this.max;
  }
  handleChange(event) {
    this.value = this.input.value;
    this.relayNativeEvent(event, { bubbles: true, composed: true });
  }
  handleInput() {
    this.value = this.input.value;
  }
  handleKeyDown(event) {
    submitOnEnter(event, this);
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      requestAnimationFrame(() => {
        if (this.value !== this.input.value) {
          this.value = this.input.value;
        }
      });
    }
  }
  handleStepperPointerUp(direction45, event) {
    if (this.disabled || this.readonly) return;
    const beforeInputEvent = new InputEvent("beforeinput", { bubbles: true, cancelable: true, composed: true });
    this.dispatchEvent(beforeInputEvent);
    if (beforeInputEvent.defaultPrevented) return;
    if (direction45 === "up") {
      this.input.stepUp();
    } else {
      this.input.stepDown();
    }
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
    this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    if (event.pointerType !== "touch") {
      this.input.focus();
    }
  }
  handleStepperPointerDown(event) {
    if (event.pointerType === "touch") return;
    event.preventDefault();
    this.input.focus();
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("value") || changedProperties.has("defaultValue")) {
      if (this.input && this.value && this.input.value !== this.value) {
        this._value = this.input.value;
      }
      this.customStates.set("blank", !this.value);
    }
  }
  handleStepChange() {
    this.input.step = String(this.step);
    this.updateValidity();
  }
  /** Sets focus on the input. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the input. */
  blur() {
    this.input.blur();
  }
  /** Selects all the text in the input. */
  select() {
    this.input.select();
  }
  /** Increments the value by the step amount. */
  stepUp() {
    this.input.stepUp();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Decrements the value by the step amount. */
  stepDown() {
    this.input.stepDown();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  formResetCallback() {
    this.value = this.defaultValue;
    super.formResetCallback();
  }
  render() {
    var _a16;
    const hasLabelSlot = this.hasSlotController.test("label", "withLabel");
    const hasHintSlot = this.hasSlotController.test("hint", "withHint");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    return b`
      <label
        part="form-control-label label"
        class=${e7({
      label: true,
      "has-label": hasLabel
    })}
        for="input"
        aria-hidden=${hasLabel ? "false" : "true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="number-field">
        ${!this.withoutSteppers ? b`
              <button
                part="stepper stepper-decrement"
                class="stepper stepper-decrement"
                type="button"
                tabindex="-1"
                aria-label=${this.localize.term("decrement")}
                ?disabled=${this.disabled || this.readonly || this.isAtMin}
                @pointerdown=${this.handleStepperPointerDown}
                @pointerup=${(event) => this.handleStepperPointerUp("down", event)}
              >
                <slot name="decrement-icon">
                  <wa-icon name="minus" library="system"></wa-icon>
                </slot>
              </button>
            ` : ""}

        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type="number"
          inputmode=${o7(this.inputmode)}
          title=${this.title}
          name=${o7(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${o7(this.placeholder)}
          min=${o7(this.min)}
          max=${o7(this.max)}
          step=${o7(this.step)}
          .value=${l6((_a16 = this.value) != null ? _a16 : "")}
          autocomplete=${o7(this.autocomplete)}
          ?autofocus=${this.autofocus}
          enterkeyhint=${o7(this.enterkeyhint)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        <slot name="end" part="end" class="end"></slot>

        ${!this.withoutSteppers ? b`
              <button
                part="stepper stepper-increment"
                class="stepper stepper-increment"
                type="button"
                tabindex="-1"
                aria-label=${this.localize.term("increment")}
                ?disabled=${this.disabled || this.readonly || this.isAtMax}
                @pointerdown=${this.handleStepperPointerDown}
                @pointerup=${(event) => this.handleStepperPointerUp("up", event)}
              >
                <slot name="increment-icon">
                  <wa-icon name="plus" library="system"></wa-icon>
                </slot>
              </button>
            ` : ""}
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${e7({
      "has-slotted": hasHint
    })}
        aria-hidden=${hasHint ? "false" : "true"}
        >${this.hint}</slot
      >
    `;
  }
};
WaNumberInput.css = [size_styles_default, form_control_styles_default, number_input_styles_default];
WaNumberInput.shadowRootOptions = __spreadProps(__spreadValues({}, WebAwesomeFormAssociatedElement.shadowRootOptions), { delegatesFocus: true });
__decorateClass([
  e6("input")
], WaNumberInput.prototype, "input", 2);
__decorateClass([
  n5()
], WaNumberInput.prototype, "title", 2);
__decorateClass([
  r7()
], WaNumberInput.prototype, "value", 1);
__decorateClass([
  n5({ attribute: "value", reflect: true })
], WaNumberInput.prototype, "defaultValue", 2);
__decorateClass([
  n5({ reflect: true })
], WaNumberInput.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaNumberInput.prototype, "handleSizeChange", 1);
__decorateClass([
  n5({ reflect: true })
], WaNumberInput.prototype, "appearance", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaNumberInput.prototype, "pill", 2);
__decorateClass([
  n5()
], WaNumberInput.prototype, "label", 2);
__decorateClass([
  n5({ attribute: "hint" })
], WaNumberInput.prototype, "hint", 2);
__decorateClass([
  n5()
], WaNumberInput.prototype, "placeholder", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaNumberInput.prototype, "readonly", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaNumberInput.prototype, "required", 2);
__decorateClass([
  n5({ type: Number })
], WaNumberInput.prototype, "min", 2);
__decorateClass([
  n5({ type: Number })
], WaNumberInput.prototype, "max", 2);
__decorateClass([
  n5()
], WaNumberInput.prototype, "step", 2);
__decorateClass([
  n5({ attribute: "without-steppers", type: Boolean })
], WaNumberInput.prototype, "withoutSteppers", 2);
__decorateClass([
  n5()
], WaNumberInput.prototype, "autocomplete", 2);
__decorateClass([
  n5({ type: Boolean })
], WaNumberInput.prototype, "autofocus", 2);
__decorateClass([
  n5()
], WaNumberInput.prototype, "enterkeyhint", 2);
__decorateClass([
  n5()
], WaNumberInput.prototype, "inputmode", 2);
__decorateClass([
  n5({ attribute: "with-label", type: Boolean })
], WaNumberInput.prototype, "withLabel", 2);
__decorateClass([
  n5({ attribute: "with-hint", type: Boolean })
], WaNumberInput.prototype, "withHint", 2);
__decorateClass([
  watch("step", { waitUntilFirstUpdate: true })
], WaNumberInput.prototype, "handleStepChange", 1);
WaNumberInput = __decorateClass([
  t5("wa-number-input")
], WaNumberInput);
var _a11;
(_a11 = WaNumberInput.disableWarning) == null ? void 0 : _a11.call(WaNumberInput, "change-in-update");

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.C3KOHXUM.js
var option_styles_default = i4`
  :host {
    --current-text-color: var(--wa-color-brand-on-loud);

    display: block;
    color: var(--wa-color-text-normal);
    -webkit-user-select: none;
    user-select: none;

    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    padding: 0.5em 1em 0.5em 0.25em;
    border-radius: var(--wa-border-radius-s);
    line-height: var(--wa-line-height-condensed);
    transition: var(--wa-transition-fast) background-color var(--wa-transition-easing);
    cursor: pointer;
  }

  :host(:focus) {
    outline: none;
  }

  @media (hover: hover) {
    :host(:not(:state(disabled), :state(current)):is(:state(hover), :hover)) {
      background-color: var(--wa-color-neutral-fill-normal);
      color: var(--wa-color-neutral-on-normal);
    }
  }

  :host(:state(current)),
  :host(:state(disabled):state(current)) {
    background-color: var(--wa-form-control-activated-color);
    color: var(--current-text-color);
    opacity: 1;
  }

  :host(:state(disabled)) {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .label {
    flex: 1 1 auto;
    display: inline-block;
  }

  .check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--wa-font-size-smaller);
    visibility: hidden;
    width: 2em;
  }

  :host(:state(selected)) .check {
    visibility: visible;
  }

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .start::slotted(*) {
    margin-inline-end: 0.5em;
  }

  .end::slotted(*) {
    margin-inline-start: 0.5em;
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.LORKLTKP.js
function getText(root, depth = 0) {
  var _a16, _b2;
  if (!root || !globalThis.Node) {
    return "";
  }
  if (typeof root[Symbol.iterator] === "function") {
    let nodes = Array.isArray(root) ? root : [...root];
    return nodes.map((node2) => getText(node2, --depth)).join("");
  }
  let node = root;
  if (node.nodeType === Node.TEXT_NODE) {
    return (_a16 = node.textContent) != null ? _a16 : "";
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    let element = node;
    if (element.hasAttribute("slot") || element.matches("style, script")) {
      return "";
    }
    if (element instanceof HTMLSlotElement) {
      let assignedNodes = element.assignedNodes({ flatten: true });
      if (assignedNodes.length > 0) {
        return getText(assignedNodes, --depth);
      }
    }
    return depth > -1 ? getText(element, --depth) : (_b2 = element.textContent) != null ? _b2 : "";
  }
  return node.hasChildNodes() ? getText(node.childNodes, --depth) : "";
}
var WaOption = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.cachedDefaultLabel = "";
    this.isInitialized = false;
    this.isDefaultLabelDirty = true;
    this.current = false;
    this.value = "";
    this.disabled = false;
    this.selected = false;
    this.defaultSelected = false;
    this._label = "";
    this.handleHover = (event) => {
      if (event.type === "mouseenter") {
        this.customStates.set("hover", true);
      } else if (event.type === "mouseleave") {
        this.customStates.set("hover", false);
      }
    };
  }
  set label(value) {
    const oldValue = this._label;
    this._label = value || "";
    if (this._label !== oldValue) {
      this.requestUpdate("label", oldValue);
    }
  }
  get label() {
    if (this._label) {
      return this._label;
    }
    return this.defaultLabel;
  }
  /** The default label, generated from the element contents. Will be equal to `label` in most cases. */
  get defaultLabel() {
    if (this.isDefaultLabelDirty || !this.cachedDefaultLabel) {
      this.updateDefaultLabel();
    }
    return this.cachedDefaultLabel;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "option");
    this.setAttribute("aria-selected", "false");
    this.addEventListener("mouseenter", this.handleHover);
    this.addEventListener("mouseleave", this.handleHover);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mouseenter", this.handleHover);
    this.removeEventListener("mouseleave", this.handleHover);
  }
  handleDefaultSlotChange() {
    this.isDefaultLabelDirty = true;
    if (this.isInitialized) {
      customElements.whenDefined("wa-select").then(() => {
        const controller = this.closest("wa-select");
        if (controller) {
          controller.handleDefaultSlotChange();
        }
      });
      customElements.whenDefined("wa-combobox").then(() => {
        const controller = this.closest("wa-combobox");
        if (controller) {
          controller.handleDefaultSlotChange();
        }
      });
    } else {
      this.isInitialized = true;
    }
  }
  willUpdate(changedProperties) {
    if (changedProperties.has("defaultSelected")) {
      if (this.didSSR && this.hasUpdated || !this.didSSR) {
        this.syncDefaultSelected();
      }
    }
    super.willUpdate(changedProperties);
  }
  syncDefaultSelected() {
    var _a16;
    if ("closest" in this) {
      if (!((_a16 = this.closest("wa-combobox, wa-select")) == null ? void 0 : _a16.hasInteracted)) {
        if (this.defaultSelected) {
          const oldVal = this.selected;
          this.selected = this.defaultSelected;
          this.requestUpdate("selected", oldVal);
        }
      }
    }
  }
  updated(changedProperties) {
    if (changedProperties.has("disabled")) {
      this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
      this.customStates.set("disabled", this.disabled);
    }
    if (changedProperties.has("selected")) {
      this.setAttribute("aria-selected", this.selected ? "true" : "false");
      this.customStates.set("selected", this.selected);
    }
    if (changedProperties.has("value")) {
      if (typeof this.value !== "string") {
        this.value = String(this.value);
      }
      this.handleDefaultSlotChange();
    }
    if (changedProperties.has("current")) {
      this.customStates.set("current", this.current);
    }
    super.updated(changedProperties);
  }
  async firstUpdated(changedProperties) {
    var _a16;
    super.firstUpdated(changedProperties);
    if (this.didSSR && !this.hasUpdated) {
      await this.updateComplete;
      this.syncDefaultSelected();
    } else {
      this.syncDefaultSelected();
    }
    if (this.selected && !this.defaultSelected) {
      const parent = this.closest("wa-select, wa-combobox");
      if (parent && !parent.hasInteracted) {
        await customElements.whenDefined(parent == null ? void 0 : parent.localName);
        await parent.updateComplete;
        (_a16 = parent.selectionChanged) == null ? void 0 : _a16.call(parent);
      }
    }
  }
  updateDefaultLabel() {
    let oldValue = this.cachedDefaultLabel;
    this.cachedDefaultLabel = getText(this).trim();
    this.isDefaultLabelDirty = false;
    let changed = this.cachedDefaultLabel !== oldValue;
    if (!this._label && changed) {
      this.requestUpdate("label", oldValue);
    }
    return changed;
  }
  render() {
    let selected = this.selected;
    if (this.didSSR && !this.hasUpdated) {
      this.updateComplete.then(() => {
        this.requestUpdate();
      });
      return A;
    }
    return b`
      ${selected ? b`<wa-icon
            part="checked-icon"
            class="check"
            name="check"
            library="system"
            variant="solid"
            aria-hidden="true"
          ></wa-icon>` : b`<span part="checked-icon" class="check" aria-hidden="true"></span>`}
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `;
  }
};
WaOption.css = option_styles_default;
__decorateClass([
  e6(".label")
], WaOption.prototype, "defaultSlot", 2);
__decorateClass([
  r7()
], WaOption.prototype, "current", 2);
__decorateClass([
  n5({ reflect: true })
], WaOption.prototype, "value", 2);
__decorateClass([
  n5({ type: Boolean })
], WaOption.prototype, "disabled", 2);
__decorateClass([
  n5({ type: Boolean, attribute: false })
], WaOption.prototype, "selected", 2);
__decorateClass([
  n5({ type: Boolean, attribute: "selected" })
], WaOption.prototype, "defaultSelected", 2);
__decorateClass([
  n5()
], WaOption.prototype, "label", 1);
WaOption = __decorateClass([
  t5("wa-option")
], WaOption);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.WKX3BKNK.js
var page_mobile_styles_default = (breakpoint = "768px") => `
  @media screen and (width < ${breakpoint}) {
    [part~='navigation'] {
      display: none;
    }

    :host(:not([disable-navigation-toggle])) slot[name~='navigation-toggle'] {
      display: contents;
    }
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.WNS42D5L.js
var page_styles_default = i4`
  :host {
    display: block;
    background-color: var(--wa-color-surface-default);
    box-sizing: border-box;
    min-height: 100%;
    --menu-width: auto;
    --main-width: 1fr;
    --aside-width: auto;
    --banner-height: 0px;
    --header-height: 0px;
    --subheader-height: 0px;
    --scroll-margin-top: calc(var(--header-height, 0px) + var(--subheader-height, 0px) + 0.5em);

    --banner-top: var(--banner-height);
    --header-top: var(--header-height);
    --subheader-top: var(--subheader-height);
  }

  slot[name]:not([name='skip-to-content'], [name='navigation-toggle'])::slotted(*) {
    display: flex;
    background-color: var(--wa-color-surface-default);
  }

  ::slotted([slot='banner']) {
    align-items: center;
    justify-content: center;
    gap: var(--wa-space-m);
    padding: var(--wa-space-xs) var(--wa-space-m);
  }

  ::slotted([slot='header']) {
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--wa-space-m);
    padding: var(--wa-space-m);
    flex: auto;
  }

  ::slotted([slot='subheader']) {
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--wa-space-m);
    padding: var(--wa-space-xs) var(--wa-space-m);
  }

  ::slotted([slot*='navigation']),
  ::slotted([slot='menu']),
  ::slotted([slot='aside']) {
    flex-direction: column;
    gap: var(--wa-space-m);
    padding: var(--wa-space-m);
  }

  ::slotted([slot='main-header']) {
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--wa-space-m);
    padding: var(--wa-space-m) var(--wa-space-3xl);
  }

  slot:not([name]) {
    /* See #331 */
    &::slotted(main),
    &::slotted(section) {
      padding: var(--wa-space-3xl);
    }
  }

  ::slotted([slot='main-footer']),
  ::slotted([slot='footer']) {
    align-items: start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--wa-space-m);
    padding: var(--wa-space-3xl);
  }

  :host([disable-sticky~='banner']) {
    --banner-top: 0px;
  }
  :host([disable-sticky~='header']) {
    --header-top: 0px;
  }
  :host([disable-sticky~='subheader']) {
    --subheader-top: 0px;
  }

  /* Nothing else depends on subheader-height. */
  :host([disable-sticky~='subheader']) {
  }
  :host([disable-sticky~='aside']) [part~='aside'],
  :host([disable-sticky~='menu']) [part~='menu'] {
    height: unset;
    max-height: unset;
  }

  :host([disable-sticky~='banner']) [part~='banner'],
  :host([disable-sticky~='header']) [part~='header'],
  :host([disable-sticky~='subheader']) [part~='subheader'],
  :host([disable-sticky~='aside']) [part~='aside'],
  :host([disable-sticky~='menu']) [part~='menu'] {
    position: static;
    overflow: unset;
    z-index: unset;
  }

  :host([disable-sticky~='aside']) [part~='aside'],
  :host([disable-sticky~='menu']) [part~='menu'] {
    height: auto;
    max-height: auto;
  }

  [part~='base'] {
    min-height: 100dvh;
    display: grid;
    grid-template-rows: repeat(3, minmax(0, auto)) minmax(0, 1fr) minmax(0, auto);
    grid-template-columns: 100%;
    width: 100%;
    grid-template-areas:
      'banner'
      'header'
      'subheader'
      'body'
      'footer';
  }

  /* Grid areas */
  [part~='banner'] {
    grid-area: banner;
  }
  [part~='header'] {
    grid-area: header;
  }
  [part~='subheader'] {
    grid-area: subheader;
  }
  [part~='menu'] {
    grid-area: menu;
  }
  [part~='body'] {
    grid-area: body;
  }
  [part~='main'] {
    grid-area: main;
  }
  [part~='aside'] {
    grid-area: aside;
  }
  [part~='footer'] {
    grid-area: footer;
  }

  /* Z-indexes */
  [part~='banner'],
  [part~='header'],
  [part~='subheader'] {
    position: sticky;
    z-index: 5;
  }
  [part~='banner'] {
    top: 0px;
  }
  [part~='header'] {
    top: var(--banner-top);

    /** Make the header flex so that you don't unexpectedly have the default toggle button appearing above a slotted div because block elements are fun. */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
  [part~='subheader'] {
    top: calc(var(--header-top) + var(--banner-top));
  }
  [part~='body'] {
    display: grid;
    min-height: 100%;
    align-items: start;
    grid-template-columns: minmax(0, var(--menu-width)) minmax(0, var(--main-width)) minmax(0, var(--aside-width));
    grid-template-rows: minmax(0, 1fr);
    grid-template-areas: 'menu main aside';
  }
  [part~='main'] {
    display: grid;
    min-height: 100%;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);
    grid-template-areas:
      'main-header'
      'main-content'
      'main-footer';
  }
  [part~='main-header'] {
    grid-area: main-header;
  }
  [part~='main-content'] {
    grid-area: main-content;
  }
  [part~='main-footer'] {
    grid-area: main-footer;
  }

  .skip-to-content {
    position: absolute;
    top: var(--wa-space-m);
    left: var(--wa-space-m);
    z-index: 6;
    border-radius: var(--wa-corners-1x);
    background-color: var(--wa-color-surface-default);
    color: var(--wa-color-text-link);
    text-decoration: none;
    padding: var(--wa-space-s) var(--wa-space-m);
    box-shadow: var(--wa-shadow-l);
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  [part~='menu'],
  [part~='aside'] {
    position: sticky;
    top: calc(var(--banner-top) + var(--header-top) + var(--subheader-top));
    z-index: 4;
    min-height: 0;
    /** Allows the menu / aside to always be 100% of the height of the main content area */
    align-self: stretch;
    max-height: calc(100dvh - var(--header-top) - var(--banner-top) - var(--subheader-top));
    overflow: auto;
  }

  [part~='navigation'] {
    height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);
  }

  [part~='drawer']::part(dialog) {
    background-color: var(--wa-color-surface-default);
  }

  /* Set these on the slot because we don't always control the navigation-toggle since that may be slotted. */
  slot[name~='navigation-toggle'],
  :host([disable-navigation-toggle]) slot[name~='navigation-toggle'] {
    display: none;
  }

  /* Sometimes the media query in the viewport is stubborn in iframes. This is an extra check to make it behave properly. */
  :host(:not([disable-navigation-toggle])[view='mobile']) slot[name~='navigation-toggle'] {
    display: contents;
  }

  [part~='navigation-toggle'] {
    /* Use only a margin-inline-start because the slotted header is expected to have default padding
        so it looks really awkward if this sets a margin-inline-end and the slotted header has a padding-inline-start. */
    margin-inline-start: var(--wa-space-m);
  }
`;

// node_modules/lit-html/directives/unsafe-html.js
var e9 = class extends i3 {
  constructor(i9) {
    if (super(i9), this.it = A, i9.type !== t2.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r9) {
    if (r9 === A || null == r9) return this._t = void 0, this.it = r9;
    if (r9 === E) return r9;
    if ("string" != typeof r9) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r9 === this.it) return this._t;
    this.it = r9;
    const s5 = [r9];
    return s5.raw = s5, this._t = { _$litType$: this.constructor.resultType, strings: s5, values: [] };
  }
};
e9.directiveName = "unsafeHTML", e9.resultType = 1;
var o9 = e2(e9);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.TK7N5KSX.js
function toPx(value, element = document.documentElement) {
  var _a16;
  if (!Number.isNaN(Number(value))) {
    return Number(value);
  }
  if (!window.CSS || !CSS.registerProperty) {
    if (typeof value === "string" && value.endsWith("px")) {
      return parseFloat(value);
    }
    return Number(value) || 0;
  }
  const resolver = "--wa-length-resolver";
  if (!CSS.registerProperty.toString().includes(resolver)) {
    try {
      CSS.registerProperty({
        name: resolver,
        syntax: "<length>",
        inherits: false,
        initialValue: "0px"
      });
    } catch (e10) {
    }
  }
  const previousValue = element.style.getPropertyValue(resolver);
  element.style.setProperty(resolver, value);
  const computedValue = (_a16 = getComputedStyle(element)) == null ? void 0 : _a16.getPropertyValue(resolver);
  element.style.setProperty(resolver, previousValue);
  if (computedValue == null ? void 0 : computedValue.endsWith("px")) {
    return parseFloat(computedValue);
  }
  return Number(computedValue) || 0;
}
function toLength(px) {
  return Number.isNaN(Number(px)) ? px : `${px}px`;
}
var WaPage = class extends WebAwesomeElement {
  constructor() {
    super();
    this.headerResizeObserver = !o5 ? this.slotResizeObserver("header") : null;
    this.subheaderResizeObserver = !o5 ? this.slotResizeObserver("subheader") : null;
    this.bannerResizeObserver = !o5 ? this.slotResizeObserver("banner") : null;
    this.footerResizeObserver = !o5 ? this.slotResizeObserver("footer") : null;
    this.handleNavigationToggle = (e10) => {
      if (this.view === "desktop") {
        this.hideNavigation();
        return;
      }
      const path = e10.composedPath();
      const navigationToggleSlot = this.navigationToggleSlot;
      if (path.find((el) => {
        var _a16;
        return ((_a16 = el.hasAttribute) == null ? void 0 : _a16.call(el, "data-toggle-nav")) || el.assignedSlot === navigationToggleSlot || el === navigationToggleSlot;
      })) {
        e10.preventDefault();
        this.toggleNavigation();
      }
    };
    this.view = "desktop";
    this.navOpen = false;
    this.mobileBreakpoint = "768px";
    this.navigationPlacement = "start";
    this.disableNavigationToggle = false;
    this.pageResizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        for (const entry of entries) {
          if (entry.contentBoxSize) {
            const contentBoxSize = entry.borderBoxSize[0];
            const pageWidth = contentBoxSize.inlineSize;
            const oldView = this.view;
            if (pageWidth >= toPx(this.mobileBreakpoint)) {
              this.view = "desktop";
            } else {
              this.view = "mobile";
            }
            this.requestUpdate("view", oldView);
          }
        }
      });
    }) : null;
    this.updateNavigationToggleState = (e10) => {
      if (e10) {
        const slotName = e10.target.name;
        if (!["navigation", "navigation-header", "navigation-footer"].includes(slotName)) return;
      }
      const hasCustomToggle = Boolean(this.querySelector(":not([slot='navigation-toggle']) [data-toggle-nav]"));
      const hasNavigationContent = Boolean(this.querySelector('[slot="navigation"]')) || Boolean(this.querySelector('[slot="navigation-header"]')) || Boolean(this.querySelector('[slot="navigation-footer"]'));
      this.disableNavigationToggle = hasCustomToggle || !hasNavigationContent;
    };
    if (!o5) {
      this.addEventListener("click", this.handleNavigationToggle);
    }
  }
  slotResizeObserver(slot) {
    return new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        for (const entry of entries) {
          if (entry.contentBoxSize) {
            const contentBoxSize = entry.borderBoxSize[0];
            this.style.setProperty(`--${slot}-height`, `${Math.round(contentBoxSize.blockSize)}px`);
          }
        }
      });
    });
  }
  updated(changedProperties) {
    if (changedProperties.has("view")) {
      this.hideNavigation();
    }
    super.updated(changedProperties);
  }
  connectedCallback() {
    super.connectedCallback();
    if (!o5) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          var _a16, _b2, _c, _d, _e;
          (_a16 = this.pageResizeObserver) == null ? void 0 : _a16.observe(this);
          (_b2 = this.headerResizeObserver) == null ? void 0 : _b2.observe(this.header);
          (_c = this.subheaderResizeObserver) == null ? void 0 : _c.observe(this.subheader);
          (_d = this.bannerResizeObserver) == null ? void 0 : _d.observe(this.banner);
          (_e = this.footerResizeObserver) == null ? void 0 : _e.observe(this.footer);
        });
      });
    }
  }
  /**
   * https://stackoverflow.com/a/26831113
   * This prevents awkward gaps when scrolling the page and the aside / menu dont "fill" the gaps.
   */
  visiblePixelsInViewport(element) {
    var _a16;
    if (!element) {
      return null;
    }
    const elementHeight = element.clientHeight;
    const windowHeight = window.innerHeight;
    const rect = (_a16 = element.getBoundingClientRect) == null ? void 0 : _a16.call(element);
    if (!rect) {
      return null;
    }
    const { top, bottom } = rect;
    return Math.max(0, top > 0 ? Math.min(elementHeight, windowHeight - top) : Math.min(bottom, windowHeight));
  }
  firstUpdated() {
    if (!document.getElementById("main-content")) {
      const div = document.createElement("div");
      div.id = "main-content";
      div.slot = "skip-to-content-target";
      this.prepend(div);
    }
    this.shadowRoot.addEventListener("slotchange", this.updateNavigationToggleState);
    this.updateNavigationToggleState();
  }
  disconnectedCallback() {
    var _a16, _b2, _c, _d, _e;
    super.disconnectedCallback();
    (_a16 = this.pageResizeObserver) == null ? void 0 : _a16.unobserve(this);
    (_b2 = this.headerResizeObserver) == null ? void 0 : _b2.unobserve(this.header);
    (_c = this.subheaderResizeObserver) == null ? void 0 : _c.unobserve(this.subheader);
    (_d = this.footerResizeObserver) == null ? void 0 : _d.unobserve(this.footer);
    (_e = this.bannerResizeObserver) == null ? void 0 : _e.unobserve(this.banner);
  }
  /**
   * Shows the mobile navigation drawer
   */
  showNavigation() {
    this.navOpen = true;
  }
  /**
   * Hides the mobile navigation drawer
   */
  hideNavigation() {
    this.navOpen = false;
  }
  /**
   * Toggles the mobile navigation drawer
   */
  toggleNavigation() {
    this.navOpen = !this.navOpen;
  }
  render() {
    return b`
      <a href="#main-content" part="skip-to-content" class="wa-visually-hidden">
        <slot name="skip-to-content">Skip to content</slot>
      </a>

      <!-- unsafeHTML needed for SSR until this is solved: https://github.com/lit/lit/issues/4696 -->
      ${o9(`
        <style id="mobile-styles">
          ${page_mobile_styles_default(toLength(this.mobileBreakpoint))}
        </style>
      `)}

      <div class="base" part="base">
        <div class="banner" part="banner">
          <slot name="banner"></slot>
        </div>
        <div class="header" part="header">
          <slot name="navigation-toggle">
            <wa-button part="navigation-toggle" size="s" appearance="plain" variant="neutral">
              <slot name="navigation-toggle-icon">
                <wa-icon name="bars" part="navigation-toggle-icon" label="Toggle navigation drawer"></wa-icon>
              </slot>
            </wa-button>
          </slot>
          <slot name="header"></slot>
        </div>
        <div class="subheader" part="subheader">
          <slot name="subheader"></slot>
        </div>
        <div class="body" part="body">
          <div class="menu" part="menu">
            <slot name="menu">
              <nav name="navigation" class="navigation" part="navigation navigation-desktop">
                <!-- Add fallback divs so that CSS grid works properly. -->
                <slot name="desktop-navigation-header">
                  <slot name=${this.view === "desktop" ? "navigation-header" : "___"}><div></div></slot>
                </slot>
                <slot name="desktop-navigation">
                  <slot name=${this.view === "desktop" ? "navigation" : "____"}><div></div></slot>
                </slot>
                <slot name="desktop-navigation-footer">
                  <slot name=${this.view === "desktop" ? "navigation-footer" : "___"}><div></div></slot>
                </slot>
              </nav>
            </slot>
          </div>
          <div class="main" part="main">
            <div class="main-header" part="main-header">
              <slot name="main-header"></slot>
            </div>
            <div class="main-content" part="main-content">
              <slot name="skip-to-content-target"></slot>
              <slot></slot>
            </div>
            <div class="main-footer" part="main-footer">
              <slot name="main-footer"></slot>
            </div>
          </div>
          <div class="aside" part="aside">
            <slot name="aside"></slot>
          </div>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
      <wa-drawer
        part="drawer"
        placement=${this.navigationPlacement}
        light-dismiss
        ?open=${l6(this.navOpen)}
        @wa-after-show=${() => this.navOpen = this.navigationDrawer.open}
        @wa-after-hide=${() => this.navOpen = this.navigationDrawer.open}
        exportparts="
          dialog:drawer__dialog,
          overlay:drawer__overlay,
          panel:drawer__panel,
          header:drawer__header,
          header-actions:drawer__header-actions,
          title:drawer__title,
          close-button:drawer__close-button,
          close-button__base:drawer__close-button__base,
          body:drawer__body,
          footer:drawer__footer
        "
        class="navigation-drawer"
      >
        <slot slot="label" part="navigation-header" name="mobile-navigation-header">
          <slot name=${this.view === "mobile" ? "navigation-header" : "___"}></slot>
        </slot>
        <slot name="mobile-navigation">
          <slot name=${this.view === "mobile" ? "navigation" : "____"}></slot>
        </slot>

        <slot slot="footer" name="mobile-navigation-footer">
          <slot part="navigation-footer" name=${this.view === "mobile" ? "navigation-footer" : "___"}></slot>
        </slot>
      </wa-drawer>
    `;
  }
};
WaPage.css = [visually_hidden_styles_default, page_styles_default];
__decorateClass([
  e6("[part~='header']")
], WaPage.prototype, "header", 2);
__decorateClass([
  e6("[part~='menu']")
], WaPage.prototype, "menu", 2);
__decorateClass([
  e6("[part~='main']")
], WaPage.prototype, "main", 2);
__decorateClass([
  e6("[part~='aside']")
], WaPage.prototype, "aside", 2);
__decorateClass([
  e6("[part~='subheader']")
], WaPage.prototype, "subheader", 2);
__decorateClass([
  e6("[part~='footer']")
], WaPage.prototype, "footer", 2);
__decorateClass([
  e6("[part~='banner']")
], WaPage.prototype, "banner", 2);
__decorateClass([
  e6("[part~='drawer']")
], WaPage.prototype, "navigationDrawer", 2);
__decorateClass([
  e6("slot[name~='navigation-toggle']")
], WaPage.prototype, "navigationToggleSlot", 2);
__decorateClass([
  n5({ attribute: "view", reflect: true })
], WaPage.prototype, "view", 2);
__decorateClass([
  n5({ attribute: "nav-open", reflect: true, type: Boolean })
], WaPage.prototype, "navOpen", 2);
__decorateClass([
  n5({ attribute: "mobile-breakpoint", type: String })
], WaPage.prototype, "mobileBreakpoint", 2);
__decorateClass([
  n5({ attribute: "navigation-placement", reflect: true })
], WaPage.prototype, "navigationPlacement", 2);
__decorateClass([
  n5({ attribute: "disable-navigation-toggle", reflect: true, type: Boolean })
], WaPage.prototype, "disableNavigationToggle", 2);
WaPage = __decorateClass([
  t5("wa-page")
], WaPage);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.5GSAV6WQ.js
var popover_styles_default = i4`
  :host {
    --arrow-size: 0.375rem;
    --max-width: 25rem;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);

    display: contents;

    /** Defaults for inherited CSS properties */
    font-size: var(--wa-font-size-m);
    line-height: var(--wa-line-height-normal);
    text-align: start;
    white-space: normal;
  }

  /* The native dialog element */
  .dialog {
    display: none;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    overflow: visible;
    pointer-events: none;

    &:focus {
      outline: none;
    }

    &[open] {
      display: block;
    }
  }

  /* The <wa-popup> element */
  .popover {
    --arrow-size: inherit;
    --popup-border-width: var(--wa-panel-border-width);
    --show-duration: inherit;
    --hide-duration: inherit;

    pointer-events: auto;

    &::part(arrow) {
      background-color: var(--wa-color-surface-default);
      border-top: none;
      border-left: none;
      border-bottom: solid var(--wa-panel-border-width) var(--wa-color-surface-border);
      border-right: solid var(--wa-panel-border-width) var(--wa-color-surface-border);
      box-shadow: none;
    }
  }

  .popover[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .popover[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .popover[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .popover[placement^='right']::part(popup) {
    transform-origin: left;
  }

  /* Body */
  .body {
    display: flex;
    flex-direction: column;
    width: auto;
    max-width: min(var(--max-width), 100vw);
    padding: var(--wa-space-l);
    background-color: var(--wa-color-surface-default);
    border: var(--wa-panel-border-width) solid var(--wa-color-surface-border);
    border-radius: var(--wa-panel-border-radius);
    border-style: var(--wa-panel-border-style);
    box-shadow: var(--wa-shadow-l);
    color: var(--wa-color-text-normal);
    user-select: none;
    -webkit-user-select: none;
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.GSYA32IS.js
var openPopovers = /* @__PURE__ */ new Set();
var WaPopover = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.anchor = null;
    this.placement = "top";
    this.open = false;
    this.distance = 8;
    this.skidding = 0;
    this.for = null;
    this.withoutArrow = false;
    this.eventController = new AbortController();
    this.handleAnchorClick = () => {
      this.open = !this.open;
    };
    this.handleBodyClick = (event) => {
      const target = event.target;
      const button = target.closest('[data-popover="close"]');
      if (button) {
        event.stopPropagation();
        this.open = false;
      }
    };
    this.handleDocumentKeyDown = (event) => {
      if (event.key === "Escape" && this.open && isTopDismissible(this)) {
        event.preventDefault();
        event.stopPropagation();
        this.open = false;
        if (this.anchor && typeof this.anchor.focus === "function") {
          this.anchor.focus();
        }
      }
    };
    this.handleDocumentClick = (event) => {
      if (this.anchor && event.composedPath().includes(this.anchor)) {
        return;
      }
      if (!event.composedPath().includes(this)) {
        this.open = false;
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.id) {
      this.id = uniqueId("wa-popover-");
    }
    if (this.eventController.signal.aborted) {
      this.eventController = new AbortController();
    }
    if (this.for && this.anchor) {
      this.anchor = null;
      this.handleForChange();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    unregisterDismissible(this);
    this.eventController.abort();
  }
  firstUpdated() {
    if (this.open) {
      this.dialog.show();
      this.popup.active = true;
      this.popup.reposition();
    }
  }
  updated(changedProperties) {
    if (changedProperties.has("open")) {
      this.customStates.set("open", this.open);
    }
  }
  async handleOpenChange() {
    if (this.open) {
      const waShowEvent = new WaShowEvent();
      this.dispatchEvent(waShowEvent);
      if (waShowEvent.defaultPrevented) {
        this.open = false;
        return;
      }
      openPopovers.forEach((popover) => popover.open = false);
      document.addEventListener("keydown", this.handleDocumentKeyDown, { signal: this.eventController.signal });
      document.addEventListener("click", this.handleDocumentClick, { signal: this.eventController.signal });
      this.dialog.show();
      this.popup.active = true;
      openPopovers.add(this);
      registerDismissible(this);
      requestAnimationFrame(() => {
        const elementToFocus = this.querySelector("[autofocus]");
        if (elementToFocus && typeof elementToFocus.focus === "function") {
          elementToFocus.focus();
        } else {
          this.dialog.focus();
        }
      });
      await animateWithClass(this.popup.popup, "show-with-scale");
      this.popup.reposition();
      this.dispatchEvent(new WaAfterShowEvent());
    } else {
      const waHideEvent = new WaHideEvent();
      this.dispatchEvent(waHideEvent);
      if (waHideEvent.defaultPrevented) {
        this.open = true;
        return;
      }
      document.removeEventListener("keydown", this.handleDocumentKeyDown);
      document.removeEventListener("click", this.handleDocumentClick);
      openPopovers.delete(this);
      unregisterDismissible(this);
      await animateWithClass(this.popup.popup, "hide-with-scale");
      this.popup.active = false;
      this.dialog.close();
      this.dispatchEvent(new WaAfterHideEvent());
    }
  }
  handleForChange() {
    const rootNode = this.getRootNode();
    if (!rootNode) {
      return;
    }
    const newAnchor = this.for ? rootNode.getElementById(this.for) : null;
    const oldAnchor = this.anchor;
    if (newAnchor === oldAnchor) {
      return;
    }
    const { signal } = this.eventController;
    if (newAnchor) {
      newAnchor.addEventListener("click", this.handleAnchorClick, { signal });
    }
    if (oldAnchor) {
      oldAnchor.removeEventListener("click", this.handleAnchorClick);
    }
    this.anchor = newAnchor;
    if (this.for && !newAnchor) {
      console.warn(
        `A popover was assigned to an element with an ID of "${this.for}" but the element could not be found.`,
        this
      );
    }
  }
  async handleOptionsChange() {
    if (this.hasUpdated) {
      await this.updateComplete;
      this.popup.reposition();
    }
  }
  /** Shows the popover. */
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "wa-after-show");
  }
  /** Hides the popover. */
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "wa-after-hide");
  }
  render() {
    return b`
      <dialog part="dialog" class="dialog">
        <wa-popup
          part="popup"
          exportparts="
            popup:popup__popup,
            arrow:popup__arrow
          "
          class=${e7({
      popover: true,
      "popover-open": this.open
    })}
          placement=${this.placement}
          distance=${this.distance}
          skidding=${this.skidding}
          flip
          shift
          shift-padding="8"
          ?arrow=${!this.withoutArrow}
          .anchor=${this.anchor}
        >
          <div part="body" class="body" @click=${this.handleBodyClick}>
            <slot></slot>
          </div>
        </wa-popup>
      </dialog>
    `;
  }
};
WaPopover.css = popover_styles_default;
WaPopover.dependencies = { "wa-popup": WaPopup };
__decorateClass([
  e6("dialog")
], WaPopover.prototype, "dialog", 2);
__decorateClass([
  e6(".body")
], WaPopover.prototype, "body", 2);
__decorateClass([
  e6("wa-popup")
], WaPopover.prototype, "popup", 2);
__decorateClass([
  r7()
], WaPopover.prototype, "anchor", 2);
__decorateClass([
  n5()
], WaPopover.prototype, "placement", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaPopover.prototype, "open", 2);
__decorateClass([
  n5({ type: Number })
], WaPopover.prototype, "distance", 2);
__decorateClass([
  n5({ type: Number })
], WaPopover.prototype, "skidding", 2);
__decorateClass([
  n5()
], WaPopover.prototype, "for", 2);
__decorateClass([
  n5({ attribute: "without-arrow", type: Boolean, reflect: true })
], WaPopover.prototype, "withoutArrow", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], WaPopover.prototype, "handleOpenChange", 1);
__decorateClass([
  watch("for")
], WaPopover.prototype, "handleForChange", 1);
__decorateClass([
  watch(["distance", "placement", "skidding"])
], WaPopover.prototype, "handleOptionsChange", 1);
WaPopover = __decorateClass([
  t5("wa-popover")
], WaPopover);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.GBDIGVZM.js
var radio_group_styles_default = i4`
  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .label {
    padding: 0;
  }

  .radio-group-required .label::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }

  [part~='form-control-input'] {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0; /* Radios handle their own spacing */
  }

  /* Horizontal */
  :host([orientation='horizontal']) [part~='form-control-input'] {
    flex-direction: row;
  }

  /* Help text */
  [part~='hint'] {
    margin-block-start: 0.5em;
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.CE7HN7KT.js
var WaRadioGroup = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super();
    this.hasSlotController = new HasSlotController(this, "hint", "label");
    this.label = "";
    this.hint = "";
    this.name = null;
    this.disabled = false;
    this.orientation = "vertical";
    this._value = null;
    this.defaultValue = this.getAttribute("value") || null;
    this.required = false;
    this.withLabel = false;
    this.withHint = false;
    this.handleRadioClick = (e10) => {
      const clickedRadio = e10.target.closest("wa-radio");
      if (!clickedRadio || clickedRadio.disabled || clickedRadio.forceDisabled || this.disabled) {
        return;
      }
      const oldValue = this.value;
      this.value = clickedRadio.value;
      clickedRadio.checked = true;
      const radios = this.getAllRadios();
      for (const radio of radios) {
        if (clickedRadio === radio) {
          continue;
        }
        radio.checked = false;
        radio.setAttribute("tabindex", "-1");
      }
      if (this.value !== oldValue) {
        this.updateComplete.then(() => {
          this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
          this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        });
      }
    };
    if (!o5) {
      this.addEventListener("keydown", this.handleKeyDown);
      this.addEventListener("click", this.handleRadioClick);
    }
  }
  static get validators() {
    const validators = o5 ? [] : [
      RequiredValidator({
        validationElement: Object.assign(document.createElement("input"), {
          required: true,
          type: "radio",
          // we need an id that's guaranteed to be unique; users will never see this
          name: uniqueId("__wa-radio")
        })
      })
    ];
    return [...super.validators, ...validators];
  }
  get value() {
    var _a16;
    if (this.valueHasChanged) {
      return this._value;
    }
    return (_a16 = this._value) != null ? _a16 : this.defaultValue;
  }
  set value(val) {
    if (typeof val === "number") val = String(val);
    this.valueHasChanged = true;
    this._value = val;
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  /**
   * We use the first available radio as the validationTarget similar to native HTML that shows the validation popup on
   * the first radio element.
   */
  get validationTarget() {
    if (o5) return void 0;
    const radio = this.querySelector(":is(wa-radio):not([disabled])");
    if (!radio) return void 0;
    return radio;
  }
  updated(changedProperties) {
    if (changedProperties.has("disabled") || changedProperties.has("size") || changedProperties.has("value") || changedProperties.has("defaultValue")) {
      this.syncRadioElements();
    }
  }
  formResetCallback(...args) {
    this._value = null;
    super.formResetCallback(...args);
    this.syncRadioElements();
  }
  getAllRadios() {
    return [...this.querySelectorAll("wa-radio")];
  }
  handleLabelClick() {
    this.focus();
  }
  async syncRadioElements() {
    const radios = this.getAllRadios();
    radios.forEach((radio, index) => {
      if (this.size) radio.setAttribute("size", this.size);
      radio.toggleAttribute("data-wa-radio-horizontal", this.orientation !== "vertical");
      radio.toggleAttribute("data-wa-radio-vertical", this.orientation === "vertical");
      radio.toggleAttribute("data-wa-radio-first", index === 0);
      radio.toggleAttribute("data-wa-radio-inner", index !== 0 && index !== radios.length - 1);
      radio.toggleAttribute("data-wa-radio-last", index === radios.length - 1);
      radio.forceDisabled = this.disabled;
    });
    await Promise.all(
      radios.map(async (radio) => {
        await radio.updateComplete;
        if (!radio.disabled && radio.value === this.value) {
          radio.checked = true;
        } else {
          radio.checked = false;
        }
      })
    );
    if (this.disabled) {
      radios.forEach((radio) => {
        radio.tabIndex = -1;
      });
    } else {
      const enabledRadios = radios.filter((radio) => !radio.disabled);
      const checkedRadio = enabledRadios.find((radio) => radio.checked);
      if (enabledRadios.length > 0) {
        if (checkedRadio) {
          enabledRadios.forEach((radio) => {
            radio.tabIndex = radio.checked ? 0 : -1;
          });
        } else {
          enabledRadios.forEach((radio, index) => {
            radio.tabIndex = index === 0 ? 0 : -1;
          });
        }
      }
      radios.filter((radio) => radio.disabled).forEach((radio) => {
        radio.tabIndex = -1;
      });
    }
  }
  handleKeyDown(event) {
    var _a16;
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key) || this.disabled) {
      return;
    }
    const radios = this.getAllRadios().filter((radio) => !radio.disabled);
    if (radios.length <= 0) {
      return;
    }
    event.preventDefault();
    const oldValue = this.value;
    const checkedRadio = (_a16 = radios.find((radio) => radio.checked)) != null ? _a16 : radios[0];
    const incr = event.key === " " ? 0 : ["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 1;
    let index = radios.indexOf(checkedRadio) + incr;
    if (!index) index = 0;
    if (index < 0) {
      index = radios.length - 1;
    }
    if (index > radios.length - 1) {
      index = 0;
    }
    const hasRadioButtons = radios.some((radio) => radio.tagName.toLowerCase() === "wa-radio-button");
    this.getAllRadios().forEach((radio) => {
      radio.checked = false;
      if (!hasRadioButtons) {
        radio.setAttribute("tabindex", "-1");
      }
    });
    this.value = radios[index].value;
    radios[index].checked = true;
    if (!hasRadioButtons) {
      radios[index].setAttribute("tabindex", "0");
      radios[index].focus();
    } else {
      radios[index].shadowRoot.querySelector("button").focus();
    }
    if (this.value !== oldValue) {
      this.updateComplete.then(() => {
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      });
    }
    event.preventDefault();
  }
  /** Sets focus on the radio group. */
  focus(options) {
    if (this.disabled) return;
    const radios = this.getAllRadios();
    const checked = radios.find((radio) => radio.checked);
    const firstEnabledRadio = radios.find((radio) => !radio.disabled);
    const radioToFocus = checked || firstEnabledRadio;
    if (radioToFocus) {
      radioToFocus.focus(options);
    }
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label", "withLabel");
    const hasHintSlot = this.hasSlotController.test("hint", "withHint");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;
    return b`
      <fieldset
        part="form-control"
        class=${e7({
      "form-control": true,
      "form-control-radio-group": true,
      "form-control-has-label": hasLabel
    })}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="hint"
        aria-errormessage="error-message"
        aria-orientation=${this.orientation}
      >
        <label
          part="form-control-label"
          id="label"
          class=${e7({
      label: true,
      "has-label": hasLabel
    })}
          aria-hidden=${hasLabel ? "false" : "true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <slot part="form-control-input" @slotchange=${this.syncRadioElements}></slot>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${e7({
      "has-slotted": hasHint
    })}
          aria-hidden=${hasHint ? "false" : "true"}
          >${this.hint}</slot
        >
      </fieldset>
    `;
  }
};
WaRadioGroup.css = [size_styles_default, form_control_styles_default, radio_group_styles_default];
WaRadioGroup.shadowRootOptions = __spreadProps(__spreadValues({}, WebAwesomeFormAssociatedElement.shadowRootOptions), { delegatesFocus: true });
__decorateClass([
  e6("slot:not([name])")
], WaRadioGroup.prototype, "defaultSlot", 2);
__decorateClass([
  n5()
], WaRadioGroup.prototype, "label", 2);
__decorateClass([
  n5({ attribute: "hint" })
], WaRadioGroup.prototype, "hint", 2);
__decorateClass([
  n5({ reflect: true })
], WaRadioGroup.prototype, "name", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaRadioGroup.prototype, "disabled", 2);
__decorateClass([
  n5({ reflect: true })
], WaRadioGroup.prototype, "orientation", 2);
__decorateClass([
  r7()
], WaRadioGroup.prototype, "value", 1);
__decorateClass([
  n5({ attribute: "value", reflect: true })
], WaRadioGroup.prototype, "defaultValue", 2);
__decorateClass([
  n5({ reflect: true })
], WaRadioGroup.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaRadioGroup.prototype, "handleSizeChange", 1);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaRadioGroup.prototype, "required", 2);
__decorateClass([
  n5({ type: Boolean, attribute: "with-label" })
], WaRadioGroup.prototype, "withLabel", 2);
__decorateClass([
  n5({ type: Boolean, attribute: "with-hint" })
], WaRadioGroup.prototype, "withHint", 2);
WaRadioGroup = __decorateClass([
  t5("wa-radio-group")
], WaRadioGroup);
var _a12;
(_a12 = WaRadioGroup.disableWarning) == null ? void 0 : _a12.call(WaRadioGroup, "change-in-update");

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.BELHQIBT.js
var radio_styles_default = i4`
  :host {
    --checked-icon-color: var(--wa-form-control-activated-color);
    --checked-icon-scale: 0.7;

    color: var(--wa-form-control-value-color);
    display: inline-flex;
    flex-direction: row;
    align-items: top;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  :host(:not(:state(checked))) svg circle {
    opacity: 0;
  }

  [part~='label'] {
    display: inline;
  }

  [part~='hint'] {
    margin-block-start: 0.5em;
  }

  /* Default spacing for default appearance radios */
  :host([appearance='default']) {
    margin-block: 0.375em; /* Half of the original 0.75em gap on each side */
  }

  :host([appearance='default'][data-wa-radio-horizontal]) {
    margin-block: 0;
    margin-inline: 0.5em; /* Half of the original 1em gap on each side */
  }

  /* Remove margin from first/last items to prevent extra space */
  :host([appearance='default'][data-wa-radio-first]) {
    margin-block-start: 0;
    margin-inline-start: 0;
  }

  :host([appearance='default'][data-wa-radio-last]) {
    margin-block-end: 0;
    margin-inline-end: 0;
  }

  /* Button appearance have no spacing, they get handled by the overlap margins below */
  :host([appearance='button']) {
    margin: 0;
    align-items: center;
    min-height: var(--wa-form-control-height);
    background-color: var(--wa-color-surface-default);
    border: var(--wa-form-control-border-width) var(--wa-form-control-border-style) var(--wa-form-control-border-color);
    border-radius: var(--wa-border-radius-m);
    padding: 0 var(--wa-form-control-padding-inline);
    transition:
      background-color var(--wa-transition-fast),
      border-color var(--wa-transition-fast);
  }

  /* Default appearance */
  :host([appearance='default']) {
    .control {
      flex: 0 0 auto;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--wa-form-control-toggle-size);
      height: var(--wa-form-control-toggle-size);
      border-color: var(--wa-form-control-border-color);
      border-radius: 50%;
      border-style: var(--wa-form-control-border-style);
      border-width: var(--wa-form-control-border-width);
      background-color: var(--wa-form-control-background-color);
      color: transparent;
      transition:
        background var(--wa-transition-normal),
        border-color var(--wa-transition-fast),
        box-shadow var(--wa-transition-fast),
        color var(--wa-transition-fast);
      transition-timing-function: var(--wa-transition-easing);

      margin-inline-end: 0.5em;
    }

    .checked-icon {
      display: flex;
      fill: currentColor;
      width: var(--wa-form-control-toggle-size);
      height: var(--wa-form-control-toggle-size);
      scale: var(--checked-icon-scale);
    }
  }

  /* Button appearance */
  :host([appearance='button']) {
    .control {
      display: none;
    }
  }

  /* Checked */
  :host(:state(checked)) .control {
    color: var(--checked-icon-color);
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-form-control-background-color);
  }

  /* Focus */
  :host(:focus-visible) .control {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  :host(:state(disabled)) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Horizontal grouping - remove inner border radius */
  :host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-inner]) {
    border-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-first]) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-last]) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* Vertical grouping - remove inner border radius */
  :host([appearance='button'][data-wa-radio-vertical][data-wa-radio-inner]) {
    border-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-vertical][data-wa-radio-first]) {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-vertical][data-wa-radio-last]) {
    border-start-start-radius: 0;
    border-start-end-radius: 0;
  }

  @media (hover: hover) {
    :host([appearance='button']:hover:not(:state(disabled), :state(checked))) {
      background-color: color-mix(in srgb, var(--wa-color-surface-default) 95%, var(--wa-color-mix-hover));
    }
  }

  :host([appearance='button']:focus-visible) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  :host([appearance='button']:state(checked)) {
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-color-brand-fill-quiet);
  }

  :host([appearance='button']:state(checked):focus-visible) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Button overlap margins */
  :host([appearance='button'][data-wa-radio-horizontal]:not([data-wa-radio-first])) {
    margin-inline-start: calc(-1 * var(--wa-form-control-border-width));
  }

  :host([appearance='button'][data-wa-radio-vertical]:not([data-wa-radio-first])) {
    margin-block-start: calc(-1 * var(--wa-form-control-border-width));
  }

  /* Ensure interactive states are visible above adjacent buttons */
  :host([appearance='button']:hover),
  :host([appearance='button']:state(checked)) {
    position: relative;
    z-index: 1;
  }

  :host([appearance='button']:focus-visible) {
    z-index: 2;
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.B5X2I7WQ.js
var WaRadio = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    super();
    this.checked = false;
    this.forceDisabled = false;
    this.appearance = "default";
    this.disabled = false;
    this.handleClick = () => {
      if (!this.disabled && !this.forceDisabled) {
        this.checked = true;
      }
    };
    if (!o5) {
      this.addEventListener("click", this.handleClick);
    }
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  connectedCallback() {
    super.connectedCallback();
    this.setInitialAttributes();
  }
  setInitialAttributes() {
    this.setAttribute("role", "radio");
    this.tabIndex = 0;
    this.setAttribute("aria-disabled", this.disabled || this.forceDisabled ? "true" : "false");
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("checked")) {
      this.customStates.set("checked", this.checked);
      this.setAttribute("aria-checked", this.checked ? "true" : "false");
      if (!this.disabled && !this.forceDisabled) {
        this.tabIndex = this.checked ? 0 : -1;
      }
    }
    if (changedProperties.has("disabled") || changedProperties.has("forceDisabled")) {
      const effectivelyDisabled = this.disabled || this.forceDisabled;
      this.customStates.set("disabled", effectivelyDisabled);
      this.setAttribute("aria-disabled", effectivelyDisabled ? "true" : "false");
      if (effectivelyDisabled) {
        this.tabIndex = -1;
      } else {
        this.tabIndex = this.checked ? 0 : -1;
      }
    }
  }
  /**
   * @override
   */
  setValue() {
  }
  render() {
    return b`
      <span part="control" class="control">
        ${this.checked ? b`
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" part="checked-icon" class="checked-icon">
                <circle cx="8" cy="8" r="8" />
              </svg>
            ` : ""}
      </span>

      <slot part="label" class="label"></slot>
    `;
  }
};
WaRadio.css = [form_control_styles_default, size_styles_default, radio_styles_default];
__decorateClass([
  r7()
], WaRadio.prototype, "checked", 2);
__decorateClass([
  r7()
], WaRadio.prototype, "forceDisabled", 2);
__decorateClass([
  n5({ reflect: true })
], WaRadio.prototype, "value", 2);
__decorateClass([
  n5({ reflect: true })
], WaRadio.prototype, "appearance", 2);
__decorateClass([
  n5({ reflect: true })
], WaRadio.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaRadio.prototype, "handleSizeChange", 1);
__decorateClass([
  n5({ type: Boolean })
], WaRadio.prototype, "disabled", 2);
WaRadio = __decorateClass([
  t5("wa-radio")
], WaRadio);
var _a13;
(_a13 = WaRadio.disableWarning) == null ? void 0 : _a13.call(WaRadio, "change-in-update");

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.C6UR4IOH.js
var switch_styles_default = i4`
  :host {
    --height: var(--wa-form-control-toggle-size);
    --width: calc(var(--height) * 1.75);
    --thumb-size: 0.75em;

    display: inline-flex;
    line-height: var(--wa-form-control-value-line-height);
  }

  label {
    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    color: var(--wa-form-control-value-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch {
    flex: 0 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--height);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    transition-property: translate, background, border-color, box-shadow;
    transition-duration: var(--wa-transition-normal);
    transition-timing-function: var(--wa-transition-easing);
  }

  :host([did-ssr]:not(:defined)) .switch {
    transition-property: unset;
    transition-duration: unset;
    transition-timing-function: unset;
  }

  .switch .thumb {
    aspect-ratio: 1 / 1;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--wa-form-control-border-color);
    border-radius: 50%;
    translate: calc((var(--width) - var(--height)) / -2);
    transition: inherit;
  }
  .switch .thumb:dir(rtl) {
    translate: calc((var(--width) - var(--height)) / 2);
  }

  .input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Focus */
  label:not(.disabled) .input:focus-visible ~ .switch .thumb {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Checked */
  .checked .switch {
    background-color: var(--wa-form-control-activated-color);
    border-color: var(--wa-form-control-activated-color);
  }

  .checked .switch .thumb {
    background-color: var(--wa-color-surface-default);
    translate: calc((var(--width) - var(--height)) / 2);
  }
  .checked .switch .thumb:dir(rtl) {
    translate: calc((var(--width) - var(--height)) / -2);
  }

  /* Disabled */
  label:has(> :disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [part~='label'] {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }

  @media (forced-colors: active) {
    :checked:enabled + .switch:hover .thumb,
    :checked + .switch .thumb {
      background-color: ButtonText;
    }
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.F6P22JWC.js
var WaSwitch = class extends WebAwesomeFormAssociatedElement {
  constructor() {
    var _a16;
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "hint");
    this.localize = new LocalizeController2(this);
    this.title = "";
    this.name = null;
    this._value = (_a16 = this.getAttribute("value")) != null ? _a16 : null;
    this.size = "m";
    this.disabled = false;
    this._checked = null;
    this.defaultChecked = this.hasAttribute("checked");
    this.required = false;
    this.hint = "";
    this.withHint = false;
  }
  static get validators() {
    return o5 ? [] : [...super.validators, MirrorValidator()];
  }
  /** The value of the switch, submitted as a name/value pair with form data. */
  get value() {
    var _a16;
    return (_a16 = this._value) != null ? _a16 : "on";
  }
  set value(val) {
    this._value = val;
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  get checked() {
    var _a16;
    if (this.valueHasChanged) {
      return Boolean(this._checked);
    }
    return (_a16 = this._checked) != null ? _a16 : this.defaultChecked;
  }
  set checked(val) {
    this._checked = Boolean(val);
    this.valueHasChanged = true;
  }
  handleClick() {
    this.hasInteracted = true;
    this.checked = !this.checked;
    this.updateComplete.then(() => {
      this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
    });
  }
  handleKeyDown(event) {
    const isRtl = this.localize.dir() === "rtl";
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.checked = isRtl;
      this.updateComplete.then(() => {
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      });
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.checked = !isRtl;
      this.updateComplete.then(() => {
        this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
        this.dispatchEvent(new InputEvent("input", { bubbles: true, composed: true }));
      });
    }
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    if (changedProperties.has("value") || changedProperties.has("checked") || changedProperties.has("defaultChecked")) {
      this.handleValueOrCheckedChange();
    }
  }
  handleValueOrCheckedChange() {
    if (this.didSSR && !this.hasUpdated) {
      this.updateComplete.then(() => {
        this.handleValueOrCheckedChange();
      });
      return;
    }
    this.setValue(this.checked ? this.value : null, this._value);
    this.updateValidity();
  }
  handleStateChange() {
    if (this.hasUpdated) {
      this.input.checked = this.checked;
    }
    this.customStates.set("checked", this.checked);
    this.updateValidity();
  }
  handleDisabledChange() {
    this.updateValidity();
  }
  /** Simulates a click on the switch. */
  click() {
    this.input.click();
  }
  /** Sets focus on the switch. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the switch. */
  blur() {
    this.input.blur();
  }
  setValue(value, stateValue) {
    if (!this.checked) {
      this.internals.setFormValue(null, null);
      return;
    }
    this.internals.setFormValue(value != null ? value : "on", stateValue);
  }
  formResetCallback() {
    this._checked = null;
    super.formResetCallback();
    this.handleValueOrCheckedChange();
  }
  render() {
    const hasHintSlot = this.hasSlotController.test("hint", "withHint");
    const hasHint = this.hint ? true : !!hasHintSlot;
    const checkedAttribute = this.didSSR && !this.hasUpdated ? this.checked : this.defaultChecked;
    const checkedProperty = this.didSSR && !this.hasUpdated ? null : l6(this.checked);
    return b`
      <label
        part="base"
        class=${e7({
      checked: this.checked,
      disabled: this.disabled
    })}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${o7(this.name)}
          value=${o7(this.value)}
          .checked=${o7(checkedProperty)}
          ?checked=${checkedAttribute}
          ?disabled=${this.disabled}
          ?required=${this.required}
          role="switch"
          aria-checked=${this.checked ? "true" : "false"}
          aria-describedby="hint"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch">
          <span part="thumb" class="thumb"></span>
        </span>

        <slot part="label" class="label"></slot>
      </label>

      <slot
        id="hint"
        name="hint"
        part="hint"
        class=${e7({
      "has-slotted": hasHint
    })}
        aria-hidden=${hasHint ? "false" : "true"}
        >${this.hint}</slot
      >
    `;
  }
};
WaSwitch.shadowRootOptions = __spreadProps(__spreadValues({}, WebAwesomeFormAssociatedElement.shadowRootOptions), { delegatesFocus: true });
WaSwitch.css = [form_control_styles_default, size_styles_default, switch_styles_default];
__decorateClass([
  e6('input[type="checkbox"]')
], WaSwitch.prototype, "input", 2);
__decorateClass([
  n5()
], WaSwitch.prototype, "title", 2);
__decorateClass([
  n5({ reflect: true })
], WaSwitch.prototype, "name", 2);
__decorateClass([
  n5({ reflect: true })
], WaSwitch.prototype, "value", 1);
__decorateClass([
  n5({ reflect: true })
], WaSwitch.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaSwitch.prototype, "handleSizeChange", 1);
__decorateClass([
  n5({ type: Boolean })
], WaSwitch.prototype, "disabled", 2);
__decorateClass([
  n5({ type: Boolean, attribute: false })
], WaSwitch.prototype, "checked", 1);
__decorateClass([
  n5({ type: Boolean, attribute: "checked", reflect: true })
], WaSwitch.prototype, "defaultChecked", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaSwitch.prototype, "required", 2);
__decorateClass([
  n5({ attribute: "hint" })
], WaSwitch.prototype, "hint", 2);
__decorateClass([
  n5({ attribute: "with-hint", type: Boolean })
], WaSwitch.prototype, "withHint", 2);
__decorateClass([
  watch(["checked", "defaultChecked"])
], WaSwitch.prototype, "handleStateChange", 1);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], WaSwitch.prototype, "handleDisabledChange", 1);
WaSwitch = __decorateClass([
  t5("wa-switch")
], WaSwitch);
var _a14;
(_a14 = WaSwitch.disableWarning) == null ? void 0 : _a14.call(WaSwitch, "change-in-update");

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.YBFCQDTA.js
var WaTabHideEvent = class extends Event {
  constructor(detail) {
    super("wa-tab-hide", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.SKLR37OM.js
var WaTabShowEvent = class extends Event {
  constructor(detail) {
    super("wa-tab-show", { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.NMA53WZH.js
var tab_group_styles_default = i4`
  :host {
    --indicator-color: var(--wa-color-brand-fill-loud);
    --track-color: var(--wa-color-neutral-fill-normal);
    --track-width: 0.125rem;

    /* Private */
    --safe-track-width: max(0.5px, round(var(--track-width), 0.5px));

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tabs {
    display: flex;
    position: relative;
  }

  .indicator {
    position: absolute;
  }

  .tab-group-has-scroll-controls .nav-container {
    position: relative;
    padding: 0 1.5em;
  }

  .body {
    display: block;
  }

  .scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1.5em;
  }

  .scroll-button-start {
    inset-inline-start: 0;
  }

  .scroll-button-end {
    inset-inline-end: 0;
  }

  /*
    * Top
    */

  .tab-group-top {
    flex-direction: column;
  }

  .tab-group-top .nav-container {
    order: 1;
  }

  .tab-group-top .nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group-top .nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group-top .tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-top .indicator {
    bottom: calc(-1 * var(--safe-track-width));
    border-bottom: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-top .body {
    order: 2;
  }

  .tab-group-top ::slotted(wa-tab[active]) {
    border-block-end: solid var(--safe-track-width) var(--indicator-color);
    margin-block-end: calc(-1 * var(--safe-track-width));
  }

  .tab-group-top .body slot::slotted(wa-tab-panel) {
    --padding: var(--wa-space-xl) 0;
  }

  /*
    * Bottom
    */

  .tab-group-bottom {
    flex-direction: column;
  }

  .tab-group-bottom .nav-container {
    order: 2;
  }

  .tab-group-bottom .nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group-bottom .nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group-bottom .tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-bottom .indicator {
    top: calc(-1 * var(--safe-track-width));
    border-top: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-bottom .body {
    order: 1;
  }

  .tab-group-bottom ::slotted(wa-tab[active]) {
    border-block-start: solid var(--safe-track-width) var(--indicator-color);
    margin-block-start: calc(-1 * var(--safe-track-width));
  }

  .tab-group-bottom .body slot::slotted(wa-tab-panel) {
    --padding: var(--wa-space-xl) 0;
  }

  /*
    * Start
    */

  .tab-group-start {
    flex-direction: row;
  }

  .tab-group-start .nav-container {
    order: 1;
  }

  .tab-group-start .tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-start .indicator {
    inset-inline-end: calc(-1 * var(--safe-track-width));
    border-right: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-start .body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group-start ::slotted(wa-tab[active]) {
    border-inline-end: solid var(--safe-track-width) var(--indicator-color);
    margin-inline-end: calc(-1 * var(--safe-track-width));
  }

  .tab-group-start .body slot::slotted(wa-tab-panel) {
    --padding: 0 var(--wa-space-xl);
  }

  /*
    * End
    */

  .tab-group-end {
    flex-direction: row;
  }

  .tab-group-end .nav-container {
    order: 2;
  }

  .tab-group-end .tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--safe-track-width) var(--track-color);
  }

  .tab-group-end .indicator {
    inset-inline-start: calc(-1 * var(--safe-track-width));
    border-inline-start: solid var(--safe-track-width) var(--indicator-color);
  }

  .tab-group-end .body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group-end ::slotted(wa-tab[active]) {
    border-inline-start: solid var(--safe-track-width) var(--indicator-color);
    margin-inline-start: calc(-1 * var(--safe-track-width));
  }

  .tab-group-end .body slot::slotted(wa-tab-panel) {
    --padding: 0 var(--wa-space-xl);
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.IBWWPMEF.js
var WaTabGroup = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.tabs = [];
    this.focusableTabs = [];
    this.panels = [];
    this.localize = new LocalizeController2(this);
    this.hasScrollControls = false;
    this.active = "";
    this.placement = "top";
    this.activation = "auto";
    this.withoutScrollControls = false;
  }
  connectedCallback() {
    super.connectedCallback();
    if (o5) {
      return;
    }
    this.resizeObserver = new ResizeObserver(() => {
      this.updateScrollControls();
    });
    this.mutationObserver = new MutationObserver((mutations) => {
      if (mutations.some((m4) => !["aria-labelledby", "aria-controls"].includes(m4.attributeName))) {
        setTimeout(() => this.setAriaLabels());
      }
      const relevantMutations = mutations.filter((m4) => {
        const target = m4.target;
        return target.closest("wa-tab-group") === this;
      });
      if (relevantMutations.some((m4) => m4.attributeName === "disabled")) {
        this.syncTabsAndPanels();
      } else if (relevantMutations.some((m4) => m4.attributeName === "active")) {
        const tabs = relevantMutations.filter((m4) => m4.attributeName === "active" && m4.target.tagName.toLowerCase() === "wa-tab").map((m4) => m4.target);
        const newActiveTab = tabs.find((tab) => tab.active);
        if (newActiveTab && newActiveTab.closest("wa-tab-group") === this) {
          this.setActiveTab(newActiveTab);
        }
      }
    });
    this.updateComplete.then(() => {
      this.syncTabsAndPanels();
      this.mutationObserver.observe(this, { attributes: true, childList: true, subtree: true });
      this.resizeObserver.observe(this.nav);
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        var _a16;
        if (entries[0].intersectionRatio > 0) {
          this.setAriaLabels();
          if (this.active) {
            const tab = this.tabs.find((t6) => t6.panel === this.active);
            if (tab) {
              this.setActiveTab(tab);
            }
          } else {
            this.setActiveTab((_a16 = this.getActiveTab()) != null ? _a16 : this.tabs[0], { emitEvents: false });
          }
          observer.unobserve(entries[0].target);
        }
      });
      intersectionObserver.observe(this.tabGroup);
    });
  }
  disconnectedCallback() {
    var _a16, _b2;
    super.disconnectedCallback();
    (_a16 = this.mutationObserver) == null ? void 0 : _a16.disconnect();
    if (this.nav) {
      (_b2 = this.resizeObserver) == null ? void 0 : _b2.unobserve(this.nav);
    }
  }
  getAllTabs() {
    const slot = this.shadowRoot.querySelector('slot[name="nav"]');
    return [...slot.assignedElements()].filter((el) => {
      return el.tagName.toLowerCase() === "wa-tab";
    });
  }
  getAllPanels() {
    return [...this.defaultSlot.assignedElements()].filter((el) => el.tagName.toLowerCase() === "wa-tab-panel");
  }
  getActiveTab() {
    return this.tabs.find((el) => el.active);
  }
  handleClick(event) {
    const target = event.target;
    const tab = target.closest("wa-tab");
    const tabGroup = tab == null ? void 0 : tab.closest("wa-tab-group");
    if (tabGroup !== this) {
      return;
    }
    if (tab !== null) {
      this.setActiveTab(tab, { scrollBehavior: "smooth" });
    }
  }
  handleKeyDown(event) {
    const target = event.target;
    const tab = target.closest("wa-tab");
    const tabGroup = tab == null ? void 0 : tab.closest("wa-tab-group");
    if (tabGroup !== this) {
      return;
    }
    if (["Enter", " "].includes(event.key)) {
      if (tab !== null) {
        this.setActiveTab(tab, { scrollBehavior: "smooth" });
        event.preventDefault();
      }
      return;
    }
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
      const activeEl = this.tabs.find((t6) => t6.matches(":focus"));
      const isRtl = this.localize.dir() === "rtl";
      let nextTab = null;
      if ((activeEl == null ? void 0 : activeEl.tagName.toLowerCase()) === "wa-tab") {
        if (event.key === "Home") {
          nextTab = this.focusableTabs[0];
        } else if (event.key === "End") {
          nextTab = this.focusableTabs[this.focusableTabs.length - 1];
        } else if (["top", "bottom"].includes(this.placement) && event.key === (isRtl ? "ArrowRight" : "ArrowLeft") || ["start", "end"].includes(this.placement) && event.key === "ArrowUp") {
          const currentIndex = this.tabs.findIndex((el) => el === activeEl);
          nextTab = this.findNextFocusableTab(currentIndex, "backward");
        } else if (["top", "bottom"].includes(this.placement) && event.key === (isRtl ? "ArrowLeft" : "ArrowRight") || ["start", "end"].includes(this.placement) && event.key === "ArrowDown") {
          const currentIndex = this.tabs.findIndex((el) => el === activeEl);
          nextTab = this.findNextFocusableTab(currentIndex, "forward");
        }
        if (!nextTab) {
          return;
        }
        nextTab.tabIndex = 0;
        nextTab.focus({ preventScroll: true });
        if (this.activation === "auto") {
          this.setActiveTab(nextTab, { scrollBehavior: "smooth" });
        } else {
          this.tabs.forEach((tabEl) => {
            tabEl.tabIndex = tabEl === nextTab ? 0 : -1;
          });
        }
        if (["top", "bottom"].includes(this.placement)) {
          scrollIntoView(nextTab, this.nav, "horizontal");
        }
        event.preventDefault();
      }
    }
  }
  findNextFocusableTab(currentIndex, direction45) {
    let nextTab = null;
    const iterator = direction45 === "forward" ? 1 : -1;
    let nextIndex = currentIndex + iterator;
    while (currentIndex < this.tabs.length) {
      nextTab = this.tabs[nextIndex] || null;
      if (nextTab === null) {
        if (direction45 === "forward") {
          nextTab = this.focusableTabs[0];
        } else {
          nextTab = this.focusableTabs[this.focusableTabs.length - 1];
        }
        break;
      }
      if (!nextTab.disabled) {
        break;
      }
      nextIndex += iterator;
    }
    return nextTab;
  }
  handleScrollToStart() {
    this.nav.scroll({
      left: this.localize.dir() === "rtl" ? this.nav.scrollLeft + this.nav.clientWidth : this.nav.scrollLeft - this.nav.clientWidth,
      behavior: "smooth"
    });
  }
  handleScrollToEnd() {
    this.nav.scroll({
      left: this.localize.dir() === "rtl" ? this.nav.scrollLeft - this.nav.clientWidth : this.nav.scrollLeft + this.nav.clientWidth,
      behavior: "smooth"
    });
  }
  setActiveTab(tab, options) {
    options = __spreadValues({
      emitEvents: true,
      scrollBehavior: "auto"
    }, options);
    if (tab.closest("wa-tab-group") !== this) {
      return;
    }
    if (tab !== this.activeTab && !tab.disabled) {
      const previousTab = this.activeTab;
      this.active = tab.panel;
      this.activeTab = tab;
      this.tabs.forEach((el) => {
        el.active = el === this.activeTab;
        el.tabIndex = el === this.activeTab ? 0 : -1;
      });
      this.panels.forEach((el) => {
        var _a16;
        return el.active = el.name === ((_a16 = this.activeTab) == null ? void 0 : _a16.panel);
      });
      if (["top", "bottom"].includes(this.placement)) {
        scrollIntoView(this.activeTab, this.nav, "horizontal", options.scrollBehavior);
      }
      if (options.emitEvents) {
        if (previousTab) {
          this.dispatchEvent(new WaTabHideEvent({ name: previousTab.panel }));
        }
        this.dispatchEvent(new WaTabShowEvent({ name: this.activeTab.panel }));
      }
    }
  }
  setAriaLabels() {
    this.tabs.forEach((tab) => {
      const panel = this.panels.find((el) => el.name === tab.panel);
      if (panel) {
        tab.setAttribute("aria-controls", panel.getAttribute("id"));
        panel.setAttribute("aria-labelledby", tab.getAttribute("id"));
      }
    });
  }
  // This stores tabs and panels so we can refer to a cache instead of calling querySelectorAll() multiple times.
  syncTabsAndPanels() {
    this.tabs = this.getAllTabs();
    this.focusableTabs = this.tabs.filter((el) => !el.disabled);
    this.panels = this.getAllPanels();
    this.updateComplete.then(() => this.updateScrollControls());
  }
  updateActiveTab() {
    const tab = this.tabs.find((el) => el.panel === this.active);
    if (tab) {
      this.setActiveTab(tab, { scrollBehavior: "smooth" });
    }
  }
  updateScrollControls() {
    if (this.withoutScrollControls) {
      this.hasScrollControls = false;
    } else {
      this.hasScrollControls = ["top", "bottom"].includes(this.placement) && this.nav.scrollWidth > this.nav.clientWidth + 1;
    }
  }
  render() {
    const isRtl = this.hasUpdated ? this.localize.dir() === "rtl" : this.dir === "rtl";
    return b`
      <div
        part="base"
        class=${e7({
      "tab-group": true,
      "tab-group-top": this.placement === "top",
      "tab-group-bottom": this.placement === "bottom",
      "tab-group-start": this.placement === "start",
      "tab-group-end": this.placement === "end",
      "tab-group-has-scroll-controls": this.hasScrollControls
    })}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="nav-container" part="nav">
          ${this.hasScrollControls ? b`
                <wa-button
                  part="scroll-button scroll-button-start"
                  exportparts="base:scroll-button__base"
                  class="scroll-button scroll-button-start"
                  appearance="plain"
                  @click=${this.handleScrollToStart}
                >
                  <wa-icon
                    name=${isRtl ? "chevron-right" : "chevron-left"}
                    library="system"
                    variant="solid"
                    label=${this.localize.term("scrollToStart")}
                  ></wa-icon>
                </wa-button>
              ` : ""}

          <!-- We have a focus listener because in Firefox (and soon to be Chrome) overflow containers are focusable. -->
          <div class="nav" @focus=${() => {
      var _a16;
      return (_a16 = this.activeTab) == null ? void 0 : _a16.focus({ preventScroll: true });
    }}>
            <div part="tabs" class="tabs" role="tablist">
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls ? b`
                <wa-button
                  part="scroll-button scroll-button-end"
                  class="scroll-button scroll-button-end"
                  exportparts="base:scroll-button__base"
                  appearance="plain"
                  @click=${this.handleScrollToEnd}
                >
                  <wa-icon
                    name=${isRtl ? "chevron-left" : "chevron-right"}
                    library="system"
                    variant="solid"
                    label=${this.localize.term("scrollToEnd")}
                  ></wa-icon>
                </wa-button>
              ` : ""}
        </div>

        <div part="body" class="body"><slot @slotchange=${this.syncTabsAndPanels}></slot></div>
      </div>
    `;
  }
};
WaTabGroup.css = tab_group_styles_default;
__decorateClass([
  e6(".tab-group")
], WaTabGroup.prototype, "tabGroup", 2);
__decorateClass([
  e6(".body slot")
], WaTabGroup.prototype, "defaultSlot", 2);
__decorateClass([
  e6(".nav")
], WaTabGroup.prototype, "nav", 2);
__decorateClass([
  r7()
], WaTabGroup.prototype, "hasScrollControls", 2);
__decorateClass([
  n5({ reflect: true })
], WaTabGroup.prototype, "active", 2);
__decorateClass([
  n5()
], WaTabGroup.prototype, "placement", 2);
__decorateClass([
  n5()
], WaTabGroup.prototype, "activation", 2);
__decorateClass([
  n5({ attribute: "without-scroll-controls", type: Boolean })
], WaTabGroup.prototype, "withoutScrollControls", 2);
__decorateClass([
  watch("active")
], WaTabGroup.prototype, "updateActiveTab", 1);
__decorateClass([
  watch("withoutScrollControls", { waitUntilFirstUpdate: true })
], WaTabGroup.prototype, "updateScrollControls", 1);
WaTabGroup = __decorateClass([
  t5("wa-tab-group")
], WaTabGroup);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.R2GHHEHL.js
var tab_styles_default = i4`
  :host {
    display: inline-block;
    color: var(--wa-color-neutral-on-quiet);
    font-weight: var(--wa-font-weight-action);
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font: inherit;
    padding: 1em 1.5em;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition: color var(--wa-transition-fast) var(--wa-transition-easing);

    ::slotted(wa-icon:first-child) {
      margin-inline-end: 0.5em;
    }

    ::slotted(wa-icon:last-child) {
      margin-inline-start: 0.5em;
    }
  }

  @media (hover: hover) {
    :host(:hover:not([disabled])) .tab {
      color: currentColor;
    }
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible) .tab {
    outline: var(--wa-focus-ring);
    outline-offset: calc(-1 * var(--wa-border-width-l) - var(--wa-focus-ring-offset));
  }

  :host([active]:not([disabled])) {
    color: var(--wa-color-brand-on-quiet);
  }

  :host([disabled]) .tab {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (forced-colors: active) {
    :host([active]:not([disabled])) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.IVYLTDB6.js
var id = 0;
var WaTab = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.attrId = ++id;
    this.componentId = `wa-tab-${this.attrId}`;
    this.panel = "";
    this.active = false;
    this.disabled = false;
    this.tabIndex = 0;
    this.slot = "nav";
    this.role = "tab";
  }
  handleActiveChange() {
    this.setAttribute("aria-selected", this.active ? "true" : "false");
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    if (this.disabled && !this.active) {
      this.tabIndex = -1;
    } else {
      this.tabIndex = 0;
    }
  }
  render() {
    var _a16;
    this.id = ((_a16 = this.id) == null ? void 0 : _a16.length) > 0 ? this.id : this.componentId;
    return b`
      <div
        part="base"
        class=${e7({
      tab: true,
      "tab-active": this.active
    })}
      >
        <slot></slot>
      </div>
    `;
  }
};
WaTab.css = tab_styles_default;
__decorateClass([
  e6(".tab")
], WaTab.prototype, "tab", 2);
__decorateClass([
  n5({ reflect: true })
], WaTab.prototype, "panel", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaTab.prototype, "active", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaTab.prototype, "disabled", 2);
__decorateClass([
  n5({ type: Number, reflect: true })
], WaTab.prototype, "tabIndex", 2);
__decorateClass([
  n5({ reflect: true })
], WaTab.prototype, "slot", 2);
__decorateClass([
  n5({ reflect: true })
], WaTab.prototype, "role", 2);
__decorateClass([
  watch("active")
], WaTab.prototype, "handleActiveChange", 1);
__decorateClass([
  watch("disabled")
], WaTab.prototype, "handleDisabledChange", 1);
WaTab = __decorateClass([
  t5("wa-tab")
], WaTab);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.WRIHAZWX.js
var tab_panel_styles_default = i4`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.KQ3Z6T2I.js
var id2 = 0;
var WaTabPanel = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.attrId = ++id2;
    this.componentId = `wa-tab-panel-${this.attrId}`;
    this.name = "";
    this.active = false;
    this.role = "tabpanel";
  }
  connectedCallback() {
    super.connectedCallback();
    this.id = (this.id || "").length > 0 ? this.id : this.componentId;
  }
  handleActiveChange() {
    this.setAttribute("aria-hidden", this.active ? "false" : "true");
  }
  render() {
    return b`
      <slot
        part="base"
        class=${e7({
      "tab-panel": true,
      "tab-panel-active": this.active
    })}
      ></slot>
    `;
  }
};
WaTabPanel.css = tab_panel_styles_default;
__decorateClass([
  n5({ reflect: true })
], WaTabPanel.prototype, "name", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaTabPanel.prototype, "active", 2);
__decorateClass([
  n5({ reflect: true })
], WaTabPanel.prototype, "role", 2);
__decorateClass([
  watch("active")
], WaTabPanel.prototype, "handleActiveChange", 1);
WaTabPanel = __decorateClass([
  t5("wa-tab-panel")
], WaTabPanel);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.HPULLNVR.js
var WaRemoveEvent = class extends Event {
  constructor() {
    super("wa-remove", { bubbles: true, cancelable: false, composed: true });
  }
};

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.4AHPL3WP.js
var tag_styles_default = i4`
  @layer wa-component {
    :host {
      display: inline-flex;
      gap: 0.5em;
      border-radius: var(--wa-border-radius-m);
      align-items: center;
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
      border-style: var(--wa-border-style);
      border-width: var(--wa-border-width-s);
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      font-size: inherit;
      line-height: 1;
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      height: calc(var(--wa-form-control-height) * 0.8);
      line-height: calc(var(--wa-form-control-height) - var(--wa-form-control-border-width) * 2);
      padding: 0 0.75em;
    }

    /* Appearance modifiers */
    :host([appearance='outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }

    :host([appearance='filled']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: transparent;
    }

    :host([appearance='filled-outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }

    :host([appearance='accent']) {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
  }

  .content {
    font-size: var(--wa-font-size-smaller);
  }

  [part='remove-button'] {
    line-height: 1;
  }

  [part='remove-button']::part(base) {
    padding: 0;
    height: 1em;
    width: 1em;
    color: currentColor;
  }

  @media (hover: hover) {
    :host(:hover) > [part='remove-button']::part(base) {
      background-color: transparent;
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  :host(:active) > [part='remove-button']::part(base) {
    background-color: transparent;
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  /*
   * Pill modifier
   */
  :host([pill]) {
    border-radius: var(--wa-border-radius-pill);
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.BRDQCPHI.js
var WaTag = class extends WebAwesomeElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.variant = "neutral";
    this.appearance = "filled-outlined";
    this.size = "m";
    this.pill = false;
    this.withRemove = false;
  }
  handleSizeChange() {
    warnDeprecatedSize(this.localName, this.size);
  }
  handleRemoveClick() {
    this.dispatchEvent(new WaRemoveEvent());
  }
  render() {
    return b`
      <slot part="content" class="content"></slot>

      ${this.withRemove ? b`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          ` : ""}
    `;
  }
};
WaTag.css = [tag_styles_default, variants_styles_default, size_styles_default];
__decorateClass([
  n5({ reflect: true })
], WaTag.prototype, "variant", 2);
__decorateClass([
  n5({ reflect: true })
], WaTag.prototype, "appearance", 2);
__decorateClass([
  n5({ reflect: true })
], WaTag.prototype, "size", 2);
__decorateClass([
  watch("size")
], WaTag.prototype, "handleSizeChange", 1);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], WaTag.prototype, "pill", 2);
__decorateClass([
  n5({ attribute: "with-remove", type: Boolean })
], WaTag.prototype, "withRemove", 2);
WaTag = __decorateClass([
  t5("wa-tag")
], WaTag);

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.GN6FNBVQ.js
var zoomable_frame_styles_default = i4`
  :host {
    display: block;
    position: relative;
    aspect-ratio: 16 / 9;
    width: 100%;
    overflow: hidden;
    border-radius: var(--wa-border-radius-m);
  }

  #frame-container {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% / var(--zoom));
    height: calc(100% / var(--zoom));
    transform: scale(var(--zoom));
    transform-origin: 0 0;
  }

  #iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: inherit;
    /* Prevent the iframe from being selected, e.g. by a double click. Doesn't affect selection withing the iframe. */
    user-select: none;
    -webkit-user-select: none;
  }

  #controls {
    display: flex;
    position: absolute;
    bottom: 0.5em;
    align-items: center;
    font-weight: var(--wa-font-weight-semibold);
    padding: 0.25em 0.5em;
    gap: 0.5em;
    border-radius: var(--wa-border-radius-s);
    background: #000b;
    color: white;
    font-size: min(12px, 0.75em);
    user-select: none;
    -webkit-user-select: none;

    &:dir(ltr) {
      right: 0.5em;
    }

    &:dir(rtl) {
      left: 0.5em;
    }

    button {
      display: flex;
      align-items: center;
      padding: 0.25em;
      border: none;
      background: none;
      color: inherit;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline: var(--wa-focus-ring);
        outline-offset: var(--wa-focus-ring-offset);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }

    span {
      min-width: 4.5ch; /* extra space so numbers don't shift */
      font-variant-numeric: tabular-nums;
      text-align: center;
    }
  }
`;

// node_modules/@awesome.me/webawesome/dist/chunks/chunk.3WA5QC43.js
var ColorSchemeController = class {
  constructor(host, onThemeChange) {
    this.handleTransitionEnd = () => {
      this.onThemeChange();
    };
    (this.host = host).addController(this);
    this.onThemeChange = onThemeChange;
    if (typeof document !== "undefined") {
      this.hiddenElement = document.createElement("div");
      this.hiddenElement.setAttribute("aria-hidden", "true");
      Object.assign(this.hiddenElement.style, {
        position: "absolute",
        width: "0",
        height: "0",
        overflow: "hidden",
        pointerEvents: "none",
        opacity: "0",
        // Transition on a WA surface token — changes whenever the theme class changes
        color: "var(--wa-color-surface-default, transparent)",
        transition: "color 0.001ms"
      });
    }
  }
  hostConnected() {
    if (this.hiddenElement) {
      this.host.appendChild(this.hiddenElement);
      this.hiddenElement.addEventListener("transitionend", this.handleTransitionEnd);
    }
  }
  hostDisconnected() {
    if (this.hiddenElement) {
      this.hiddenElement.removeEventListener("transitionend", this.handleTransitionEnd);
      this.hiddenElement.remove();
    }
  }
};
var WaZoomableFrame = class extends WebAwesomeElement {
  constructor() {
    super();
    this.localize = new LocalizeController2(this);
    this.themeObserver = !o5 ? new MutationObserver(() => this.syncTheme()) : null;
    this.availableZoomLevels = [];
    this.allowfullscreen = false;
    this.loading = "eager";
    this.zoom = 1;
    this.zoomLevels = "25% 50% 75% 100% 125% 150% 175% 200%";
    this.withoutControls = false;
    this.withoutInteraction = false;
    this.withThemeSync = false;
    new ColorSchemeController(this, () => this.syncTheme());
  }
  /** Returns the internal iframe's `window` object. (Readonly property) */
  get contentWindow() {
    var _a16;
    return ((_a16 = this.iframe) == null ? void 0 : _a16.contentWindow) || null;
  }
  /** Returns the internal iframe's `document` object. (Readonly property) */
  get contentDocument() {
    var _a16;
    return ((_a16 = this.iframe) == null ? void 0 : _a16.contentDocument) || null;
  }
  parseZoomLevels(zoomLevelsString) {
    const tokens = parseSpaceDelimitedTokens(zoomLevelsString);
    const levels = [];
    for (const token of tokens) {
      let value;
      if (token.endsWith("%")) {
        const percentage = parseFloat(token.slice(0, -1));
        if (!isNaN(percentage)) {
          value = Math.max(0, percentage / 100);
        } else {
          continue;
        }
      } else {
        value = parseFloat(token);
        if (!isNaN(value)) {
          value = Math.max(0, value);
        } else {
          continue;
        }
      }
      levels.push(value);
    }
    return [...new Set(levels)].sort((a4, b3) => a4 - b3);
  }
  getCurrentZoomIndex() {
    if (this.availableZoomLevels.length === 0) return -1;
    let closestIndex = 0;
    let closestDiff = Math.abs(this.availableZoomLevels[0] - this.zoom);
    for (let i9 = 1; i9 < this.availableZoomLevels.length; i9++) {
      const diff = Math.abs(this.availableZoomLevels[i9] - this.zoom);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestIndex = i9;
      }
    }
    return closestIndex;
  }
  isZoomInDisabled() {
    if (this.availableZoomLevels.length === 0) return false;
    const currentIndex = this.getCurrentZoomIndex();
    return currentIndex >= this.availableZoomLevels.length - 1;
  }
  isZoomOutDisabled() {
    if (this.availableZoomLevels.length === 0) return false;
    const currentIndex = this.getCurrentZoomIndex();
    return currentIndex <= 0;
  }
  willUpdate(changedProperties) {
    if (changedProperties.has("zoom")) {
      this.setStyleProperty("--zoom", `${this.zoom}`);
    }
    super.willUpdate(changedProperties);
  }
  updated(changedProperties) {
    var _a16, _b2;
    if (changedProperties.has("zoomLevels")) {
      this.availableZoomLevels = this.parseZoomLevels(this.zoomLevels);
      if (this.availableZoomLevels.length > 0) {
        const currentIndex = this.getCurrentZoomIndex();
        if (Math.abs(this.availableZoomLevels[currentIndex] - this.zoom) > 1e-3) {
          this.zoom = this.availableZoomLevels[currentIndex];
        }
      }
    }
    if (changedProperties.has("withThemeSync")) {
      if (this.withThemeSync) {
        (_a16 = this.themeObserver) == null ? void 0 : _a16.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        this.syncTheme();
      } else {
        (_b2 = this.themeObserver) == null ? void 0 : _b2.disconnect();
      }
    }
    super.updated(changedProperties);
  }
  /** Zooms in to the next available zoom level. */
  zoomIn() {
    if (this.availableZoomLevels.length === 0) {
      this.zoom = Math.min(this.zoom + 0.05, 2);
      return;
    }
    const currentIndex = this.getCurrentZoomIndex();
    if (currentIndex < this.availableZoomLevels.length - 1) {
      this.zoom = this.availableZoomLevels[currentIndex + 1];
    }
  }
  /** Zooms out to the previous available zoom level. */
  zoomOut() {
    if (this.availableZoomLevels.length === 0) {
      this.zoom = Math.max(this.zoom - 0.05, 0);
      return;
    }
    const currentIndex = this.getCurrentZoomIndex();
    if (currentIndex > 0) {
      this.zoom = this.availableZoomLevels[currentIndex - 1];
    }
  }
  disconnectedCallback() {
    var _a16;
    super.disconnectedCallback();
    (_a16 = this.themeObserver) == null ? void 0 : _a16.disconnect();
  }
  syncTheme() {
    var _a16;
    if (!this.withThemeSync) return;
    try {
      const iframeRoot = (_a16 = this.contentDocument) == null ? void 0 : _a16.documentElement;
      if (!iframeRoot) return;
      const prefixes = ["wa-theme-", "wa-brand-", "wa-palette-"];
      const schemeCls = /* @__PURE__ */ new Set();
      const themeCls = /* @__PURE__ */ new Set();
      let el = this;
      let schemeFound = false;
      while (el) {
        if (!schemeFound) {
          if (el.classList.contains("wa-dark")) {
            schemeCls.add("wa-dark");
            schemeFound = true;
          } else if (el.classList.contains("wa-light")) {
            schemeCls.add("wa-light");
            schemeFound = true;
          }
        }
        for (const cls of el.classList) {
          if (prefixes.some((p5) => cls.startsWith(p5))) themeCls.add(cls);
        }
        el = el.parentElement;
      }
      iframeRoot.classList.toggle("wa-dark", schemeCls.has("wa-dark"));
      iframeRoot.classList.toggle("wa-light", schemeCls.has("wa-light"));
      const toRemove = Array.from(iframeRoot.classList).filter((c6) => prefixes.some((p5) => c6.startsWith(p5)));
      iframeRoot.classList.remove(...toRemove);
      iframeRoot.classList.add(...themeCls);
    } catch (e10) {
    }
  }
  handleLoad() {
    if (this.withThemeSync) this.syncTheme();
    this.dispatchEvent(new Event("load", { bubbles: false, cancelable: false, composed: true }));
  }
  handleError() {
    this.dispatchEvent(new Event("error", { bubbles: false, cancelable: false, composed: true }));
  }
  render() {
    var _a16, _b2, _c;
    return b`
      <div id="frame-container">
        <iframe
          id="iframe"
          part="iframe"
          ?inert=${this.withoutInteraction}
          ?allowfullscreen=${this.allowfullscreen}
          loading=${this.loading}
          referrerpolicy=${this.referrerpolicy}
          sandbox=${o7((_a16 = this.sandbox) != null ? _a16 : void 0)}
          src=${o7((_b2 = this.src) != null ? _b2 : void 0)}
          srcdoc=${o7((_c = this.srcdoc) != null ? _c : void 0)}
          @load=${this.handleLoad}
          @error=${this.handleError}
        ></iframe>
      </div>

      ${!this.withoutControls ? b`
            <div id="controls" part="controls">
              <button
                part="zoom-out-button"
                aria-label=${this.localize.term("zoomOut")}
                @click=${this.zoomOut}
                ?disabled=${this.isZoomOutDisabled()}
              >
                <slot name="zoom-out-icon">
                  <wa-icon name="minus" label="Zoom out"></wa-icon>
                </slot>
              </button>
              <span>${this.localize.number(this.zoom, { style: "percent", maximumFractionDigits: 1 })}</span>
              <button
                part="zoom-in-button"
                aria-label=${this.localize.term("zoomIn")}
                @click=${this.zoomIn}
                ?disabled=${this.isZoomInDisabled()}
              >
                <slot name="zoom-in-icon">
                  <wa-icon name="plus" label="Zoom in"></wa-icon>
                </slot>
              </button>
            </div>
          ` : ""}
    `;
  }
};
WaZoomableFrame.css = zoomable_frame_styles_default;
__decorateClass([
  r7()
], WaZoomableFrame.prototype, "availableZoomLevels", 2);
__decorateClass([
  e6("#iframe")
], WaZoomableFrame.prototype, "iframe", 2);
__decorateClass([
  n5()
], WaZoomableFrame.prototype, "src", 2);
__decorateClass([
  n5()
], WaZoomableFrame.prototype, "srcdoc", 2);
__decorateClass([
  n5({ type: Boolean })
], WaZoomableFrame.prototype, "allowfullscreen", 2);
__decorateClass([
  n5()
], WaZoomableFrame.prototype, "loading", 2);
__decorateClass([
  n5()
], WaZoomableFrame.prototype, "referrerpolicy", 2);
__decorateClass([
  n5()
], WaZoomableFrame.prototype, "sandbox", 2);
__decorateClass([
  n5({ type: Number, reflect: true })
], WaZoomableFrame.prototype, "zoom", 2);
__decorateClass([
  n5({ attribute: "zoom-levels" })
], WaZoomableFrame.prototype, "zoomLevels", 2);
__decorateClass([
  n5({ type: Boolean, attribute: "without-controls", reflect: true })
], WaZoomableFrame.prototype, "withoutControls", 2);
__decorateClass([
  n5({ type: Boolean, attribute: "without-interaction", reflect: true })
], WaZoomableFrame.prototype, "withoutInteraction", 2);
__decorateClass([
  n5({ type: Boolean, attribute: "with-theme-sync", reflect: true })
], WaZoomableFrame.prototype, "withThemeSync", 2);
WaZoomableFrame = __decorateClass([
  t5("wa-zoomable-frame")
], WaZoomableFrame);

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
  default: () => en_default2,
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
var en_default2 = {
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
      let offset3 = start;
      while (isAlphanumerical(value.charCodeAt(offset3))) {
        if (offset3 - start > 7) {
          return fail(
            offset3,
            1,
            "Too long variant, expected at most 8 characters"
          );
        }
        offset3++;
      }
      if (
        // Long variant.
        offset3 - start > 4 || // Short variant.
        offset3 - start > 3 && isDecimal(value.charCodeAt(start))
      ) {
        result.variants.push(source.slice(start, offset3));
        index = offset3;
      } else {
        break;
      }
    }
    while (value.charCodeAt(index) === 45) {
      if (value.charCodeAt(index + 1) === 120 || !isAlphanumerical(value.charCodeAt(index + 1)) || value.charCodeAt(index + 2) !== 45 || !isAlphanumerical(value.charCodeAt(index + 3))) {
        break;
      }
      let offset3 = index + 2;
      let groups = 0;
      while (value.charCodeAt(offset3) === 45 && isAlphanumerical(value.charCodeAt(offset3 + 1)) && isAlphanumerical(value.charCodeAt(offset3 + 2))) {
        const start = offset3 + 1;
        offset3 = start + 2;
        groups++;
        while (isAlphanumerical(value.charCodeAt(offset3))) {
          if (offset3 - start > 7) {
            return fail(
              offset3,
              2,
              "Too long extension, expected at most 8 characters"
            );
          }
          offset3++;
        }
      }
      if (!groups) {
        return fail(
          offset3,
          4,
          "Empty extension, extensions must have at least 2 characters of content"
        );
      }
      result.extensions.push({
        singleton: source.charAt(index + 1),
        extensions: source.slice(index + 3, offset3).split("-")
      });
      index = offset3;
    }
  } else {
    index = 0;
  }
  if (index === 0 && value.charCodeAt(index) === 120 || value.charCodeAt(index) === 45 && value.charCodeAt(index + 1) === 120) {
    index = index ? index + 2 : 1;
    let offset3 = index;
    while (value.charCodeAt(offset3) === 45 && isAlphanumerical(value.charCodeAt(offset3 + 1))) {
      const start = index + 1;
      offset3 = start;
      while (isAlphanumerical(value.charCodeAt(offset3))) {
        if (offset3 - start > 7) {
          return fail(
            offset3,
            5,
            "Too long private-use area, expected at most 8 characters"
          );
        }
        offset3++;
      }
      result.privateuse.push(source.slice(index + 1, offset3));
      index = offset3;
    }
  }
  if (index !== source.length) {
    return fail(index, 6, "Found superfluous content after tag");
  }
  return result;
  function fail(offset3, code, reason) {
    if (options.warning) options.warning(reason, code, offset3);
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
var translations2 = {};
var filenames2 = filenames;
var contents = __default;
for (let i9 = 0; i9 < filenames2.length; i9++) {
  const match = filenames2[i9].match(/([^\/]+)\.json$/);
  if (!match) continue;
  const lang = match[1];
  translations2[lang] = __spreadValues({
    language: lang,
    direction: contents[i9].direction || "ltr"
  }, contents[i9].strings);
}
function getTranslations(langCode) {
  if (!langCode) {
    return translations2["en"];
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
    if (translations2[key]) {
      return translations2[key];
    }
  }
  return translations2["en"];
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
      for (let i9 = 0; i9 < 2; i9++) {
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
} catch (e10) {
  scriptBundlePath = "/pagefind/";
}
var Instance = class {
  constructor(name, opts = {}) {
    var _a16, _b2, _c;
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
      bundlePath: (_b2 = (_a16 = opts.bundlePath) != null ? _a16 : scriptBundlePath) != null ? _b2 : "/pagefind/",
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
      for (let i9 = 0; i9 < len; i9++) {
        word += idChars[Math.floor(Math.random() * idChars.length)];
      }
      return word;
    };
    const instancePart = this.name !== "default" ? `${this.name}-` : "";
    const segments = Array.from({ length }, () => randomSeg()).join("-");
    const id3 = `${prefix}-${instancePart}${segments}`;
    if (this.generatedIds.has(id3) || document.getElementById(id3)) {
      return this.generateId(prefix, length + 1);
    }
    this.generatedIds.add(id3);
    return id3;
  }
  add(component) {
    var _a16;
    (_a16 = component == null ? void 0 : component.register) == null ? void 0 : _a16.call(component, this);
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
    return components.filter((c6) => {
      var _a16;
      return (_a16 = c6.capabilities) == null ? void 0 : _a16[requiredCapability];
    });
  }
  getResults(requiredCapability = null) {
    const components = this.componentsByType["results"] || [];
    if (!requiredCapability) return components;
    return components.filter((c6) => {
      var _a16;
      return (_a16 = c6.capabilities) == null ? void 0 : _a16[requiredCapability];
    });
  }
  getSummaries(requiredCapability = null) {
    const components = this.componentsByType["summary"] || [];
    if (!requiredCapability) return components;
    return components.filter((c6) => {
      var _a16;
      return (_a16 = c6.capabilities) == null ? void 0 : _a16[requiredCapability];
    });
  }
  getFilters(requiredCapability = null) {
    const components = this.componentsByType["filter"] || [];
    if (!requiredCapability) return components;
    return components.filter((c6) => {
      var _a16;
      return (_a16 = c6.capabilities) == null ? void 0 : _a16[requiredCapability];
    });
  }
  getSorts(requiredCapability = null) {
    const components = this.componentsByType["sort"] || [];
    if (!requiredCapability) return components;
    return components.filter((c6) => {
      var _a16;
      return (_a16 = c6.capabilities) == null ? void 0 : _a16[requiredCapability];
    });
  }
  getUtilities(subtype = null, requiredCapability = null) {
    let utilities = this.componentsByType["utility"] || [];
    if (subtype !== null) {
      utilities = utilities.filter((u5) => u5.componentSubtype === subtype);
    }
    if (requiredCapability) {
      utilities = utilities.filter((c6) => {
        var _a16;
        return (_a16 = c6.capabilities) == null ? void 0 : _a16[requiredCapability];
      });
    }
    return utilities;
  }
  /**
   * Check if any component has registered announcement capability.
   * Used to determine if Instance should handle announcements as a fallback.
   */
  hasAnnouncementCapability() {
    return this.components.some((c6) => {
      var _a16;
      return ((_a16 = c6.capabilities) == null ? void 0 : _a16.announcements) === true;
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
      (s5) => !(s5.label === label && s5.owner === owner)
    );
    this.notifyShortcutsChanged();
  }
  /**
   * Deregister all shortcuts from an owner.
   */
  deregisterAllShortcuts(owner) {
    this.activeShortcuts = this.activeShortcuts.filter(
      (s5) => s5.owner !== owner
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
    hints.forEach((h4) => {
      var _a16;
      return (_a16 = h4.render) == null ? void 0 : _a16.call(h4);
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
    this.components.forEach((c6) => {
      var _a16;
      return (_a16 = c6.reconcileAria) == null ? void 0 : _a16.call(c6);
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
    var _a16;
    if (!langCode) {
      langCode = ((_a16 = document == null ? void 0 : document.documentElement) == null ? void 0 : _a16.lang) || "en";
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
    var _a16, _b2, _c;
    const str = (_b2 = this._userTranslations[key]) != null ? _b2 : (_a16 = this._translations) == null ? void 0 : _a16[key];
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
        (h4) => typeof h4 === "object" && h4.owner === owner
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
  __dispatch__(e10, ...args) {
    var _a16;
    (_a16 = this.__hooks__[e10]) == null ? void 0 : _a16.forEach((hook) => {
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
    var _a16, _b2, _c, _d;
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
      if (results.filters && ((_a16 = Object.keys(results.filters)) == null ? void 0 : _a16.length)) {
        this.availableFilters = results.filters;
        this.totalFilters = (_b2 = results.totalFilters) != null ? _b2 : null;
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
    var _a16, _b2;
    if (this.__pagefind__) return;
    let pagefindModule;
    try {
      pagefindModule = await import(
        /* @vite-ignore */
        `${this.options.bundlePath}pagefind.js`
      );
    } catch (e10) {
      console.error(e10);
      console.error(
        [
          `Pagefind couldn't be loaded from ${this.options.bundlePath}pagefind.js`,
          `You can configure this by passing a bundlePath option to the Pagefind Component UI`
        ].join("\n")
      );
      if ((document == null ? void 0 : document.currentScript) && document.currentScript.tagName.toUpperCase() === "SCRIPT") {
        console.error(
          `[DEBUG: Loaded from ${(_b2 = (_a16 = document.currentScript) == null ? void 0 : _a16.src) != null ? _b2 : "bad script location"}]`
        );
      } else {
        console.error("no known script location");
      }
      this.__dispatch__("error", {
        type: "bundle_load_failed",
        message: "Could not load search bundle",
        bundlePath: this.options.bundlePath,
        error: e10
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
    const topUrls = [...results].sort((a4, b3) => {
      var _a16, _b2, _c, _d;
      return ((_b2 = (_a16 = b3.locations) == null ? void 0 : _a16.length) != null ? _b2 : 0) - ((_d = (_c = a4.locations) == null ? void 0 : _c.length) != null ? _d : 0);
    }).slice(0, limit).map((r9) => r9.url);
    return results.filter((r9) => topUrls.includes(r9.url));
  }
  /**
   * Get sub-results for display, excluding the root result and thinning to limit.
   */
  getDisplaySubResults(result, limit = 3) {
    var _a16, _b2;
    if (!Array.isArray(result.sub_results)) return [];
    const hasRootSubResult = ((_a16 = result.sub_results[0]) == null ? void 0 : _a16.url) === (((_b2 = result.meta) == null ? void 0 : _b2.url) || result.url);
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
    } catch (e10) {
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
var truthy = (v3) => !(v3 == null || v3 === false || v3 === 0 || v3 === "" || Number.isNaN(v3) || Array.isArray(v3) && v3.length === 0 || typeof v3 === "object" && v3 !== null && !Array.isArray(v3) && Object.keys(v3).length === 0);
var ck = (a4, n7, name) => a4.length < n7 ? `[Error: ${name}() needs ${n7} args]` : null;
var fns = {
  eq: (ctx, ...a4) => {
    var _a16;
    return (_a16 = ck(a4, 2, "eq")) != null ? _a16 : ev(a4[0], ctx) === ev(a4[1], ctx);
  },
  ne: (ctx, ...a4) => {
    var _a16;
    return (_a16 = ck(a4, 2, "ne")) != null ? _a16 : ev(a4[0], ctx) !== ev(a4[1], ctx);
  },
  gt: (ctx, ...a4) => {
    var _a16;
    return (_a16 = ck(a4, 2, "gt")) != null ? _a16 : Number(ev(a4[0], ctx)) > Number(ev(a4[1], ctx));
  },
  lt: (ctx, ...a4) => {
    var _a16;
    return (_a16 = ck(a4, 2, "lt")) != null ? _a16 : Number(ev(a4[0], ctx)) < Number(ev(a4[1], ctx));
  },
  gte: (ctx, ...a4) => {
    var _a16;
    return (_a16 = ck(a4, 2, "gte")) != null ? _a16 : Number(ev(a4[0], ctx)) >= Number(ev(a4[1], ctx));
  },
  lte: (ctx, ...a4) => {
    var _a16;
    return (_a16 = ck(a4, 2, "lte")) != null ? _a16 : Number(ev(a4[0], ctx)) <= Number(ev(a4[1], ctx));
  },
  and: (ctx, ...a4) => {
    let r9 = true;
    for (const e10 of a4) {
      r9 = ev(e10, ctx);
      if (!truthy(r9))
        return r9;
    }
    return r9;
  },
  or: (ctx, ...a4) => {
    let r9 = false;
    for (const e10 of a4) {
      r9 = ev(e10, ctx);
      if (truthy(r9))
        return r9;
    }
    return r9;
  },
  not: (ctx, ...a4) => {
    var _a16;
    return (_a16 = ck(a4, 1, "not")) != null ? _a16 : !truthy(ev(a4[0], ctx));
  },
  lowercase: (ctx, ...a4) => String(ev(a4[0], ctx)).toLowerCase(),
  uppercase: (ctx, ...a4) => String(ev(a4[0], ctx)).toUpperCase(),
  trim: (ctx, ...a4) => String(ev(a4[0], ctx)).trim(),
  truncate: (ctx, ...a4) => {
    const e10 = ck(a4, 2, "truncate");
    if (e10)
      return e10;
    const s5 = String(ev(a4[0], ctx)), n7 = Number(ev(a4[1], ctx));
    const suffix = a4[2] ? String(ev(a4[2], ctx)) : "...";
    return s5.length > n7 ? s5.slice(0, n7) + suffix : s5;
  },
  replace: (ctx, ...a4) => {
    var _a16;
    return (_a16 = ck(a4, 3, "replace")) != null ? _a16 : String(ev(a4[0], ctx)).split(String(ev(a4[1], ctx))).join(String(ev(a4[2], ctx)));
  },
  limit: (ctx, ...a4) => {
    const e10 = ck(a4, 2, "limit");
    if (e10)
      return e10;
    const r9 = ev(a4[0], ctx), n7 = ev(a4[1], ctx);
    return Array.isArray(r9) ? r9.slice(0, n7 < 0 ? 0 : n7) : r9;
  },
  first: (ctx, ...a4) => {
    const e10 = ck(a4, 1, "first");
    if (e10)
      return e10;
    const r9 = ev(a4[0], ctx);
    return Array.isArray(r9) ? r9[0] : r9;
  },
  last: (ctx, ...a4) => {
    const e10 = ck(a4, 1, "last");
    if (e10)
      return e10;
    const r9 = ev(a4[0], ctx);
    return Array.isArray(r9) ? r9[r9.length - 1] : r9;
  },
  length: (ctx, ...a4) => {
    const e10 = ck(a4, 1, "length");
    if (e10)
      return e10;
    const v3 = ev(a4[0], ctx);
    return Array.isArray(v3) ? v3.length : String(v3).length;
  },
  join: (ctx, ...a4) => {
    var _a16;
    return (_a16 = ck(a4, 2, "join")) != null ? _a16 : ((r9) => Array.isArray(r9) ? r9.join(String(ev(a4[1], ctx))) : String(r9))(ev(a4[0], ctx));
  },
  default: (ctx, ...a4) => {
    const e10 = ck(a4, 2, "default");
    if (e10)
      return e10;
    const v3 = ev(a4[0], ctx);
    return truthy(v3) ? v3 : ev(a4[1], ctx);
  },
  safeUrl: (ctx, ...a4) => {
    var _a16;
    const u5 = String((_a16 = ev(a4[0], ctx)) != null ? _a16 : "").trim();
    return u5 && /^(?:\.{0,2}\/|[#?]|(?:https?|ftp):\/\/|(?:mailto|tel):)/i.test(u5) ? u5 : "";
  }
};
var ev = (e10, ctx) => {
  if (!e10)
    return void 0;
  if (e10.t === "L")
    return e10.val;
  if (e10.t === "V") {
    const has = (o10, k2) => Object.prototype.hasOwnProperty.call(o10, k2);
    let v3 = ctx;
    for (const k2 of e10.path) {
      if (v3 == null || !has(v3, k2))
        return void 0;
      v3 = v3[k2];
    }
    return v3;
  }
  const fn = fns[e10.fn];
  if (!fn)
    return `[Error: unknown ${e10.fn}()]`;
  return e10.t === "C" ? fn(ctx, ...e10.args) : fn(ctx, e10.left, ...e10.args);
};
var esc = (s5) => s5.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
var rn = (nodes, ctx) => {
  let out = "";
  for (const n7 of nodes) {
    if (n7.t === "T") {
      out += n7.val;
      continue;
    }
    if (n7.t === "I") {
      const v3 = ev(n7.expr, ctx);
      if (Array.isArray(v3))
        out += "[Error: use #each for arrays]";
      else if (typeof v3 === "object" && v3 !== null)
        out += "[Error: cannot render object]";
      else {
        const s5 = String(v3 != null ? v3 : "");
        out += n7.raw ? s5 : esc(s5);
      }
      continue;
    }
    if (n7.t === "F") {
      let matched = false;
      for (const b3 of n7.branches)
        if (truthy(ev(b3.cond, ctx))) {
          out += rn(b3.body, ctx);
          matched = true;
          break;
        }
      if (!matched && n7.else)
        out += rn(n7.else, ctx);
      continue;
    }
    if (n7.t === "E") {
      const arr = ev(n7.arr, ctx);
      if (!Array.isArray(arr)) {
        out += "[Error: #each needs array]";
        continue;
      }
      if (!arr.length && n7.else)
        out += rn(n7.else, ctx);
      else
        for (let i9 = 0; i9 < arr.length; i9++) {
          const local = __spreadProps(__spreadValues({}, ctx), { [n7.as]: arr[i9] });
          if (n7.idx)
            local[n7.idx] = i9;
          out += rn(n7.body, local);
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
  const at = (s5) => src.slice(pos, pos + s5.length) === s5;
  const skip = (s5) => {
    if (at(s5))
      pos += s5.length;
  };
  const ident = () => {
    let r9 = "";
    while (pos < src.length && /\w/.test(src[pos]))
      r9 += src[pos++];
    return r9;
  };
  const parseExpr = () => {
    skipWs();
    const start = pos;
    let expr;
    const ch = src[pos];
    if (ch === '"' || ch === "'") {
      const q = src[pos++];
      let s5 = "";
      while (pos < src.length && src[pos] !== q) {
        if (src[pos] === "\\" && pos + 1 < src.length) {
          pos++;
          const c6 = src[pos];
          s5 += c6 === "n" ? "\n" : c6 === "t" ? "	" : c6 === "r" ? "\r" : c6;
          pos++;
          continue;
        }
        s5 += src[pos++];
      }
      if (pos < src.length)
        pos++;
      else
        s5 = "";
      expr = { t: "L", val: s5 };
    } else if (/[-0-9.]/.test(ch)) {
      let s5 = "", dot = 0;
      if (src[pos] === "-")
        s5 += src[pos++];
      if (src[pos] === ".") {
        s5 += src[pos++];
        dot = 1;
      }
      while (pos < src.length && (/[0-9]/.test(src[pos]) || src[pos] === "." && !dot++))
        s5 += src[pos++];
      expr = s5 === "-" || s5 === "." || s5 === "" ? { t: "V", path: [s5 || "-"] } : { t: "L", val: parseFloat(s5) };
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
      for (const s5 of stops)
        if (at(s5))
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
        for (const s5 of stops)
          if (at(s5)) {
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
  fns[name] = (ctx, ...a4) => fn(...a4.map((e10) => ev(e10, ctx)));
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
    return str.replace(/-([a-z])/g, (g2) => g2[1].toUpperCase());
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
var asyncSleep = (ms = 100) => new Promise((r9) => setTimeout(r9, ms));
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
    var _a16, _b2, _c, _d, _e;
    this.innerHTML = "";
    const inputId = this.instance.generateId("pfmod-input");
    const searchLabel = ((_a16 = this.instance) == null ? void 0 : _a16.translate("search_label")) || "Search this site";
    const clearText = ((_b2 = this.instance) == null ? void 0 : _b2.translate("clear_search")) || "Clear";
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
    this.inputEl.addEventListener("input", async (e10) => {
      var _a16;
      const target = e10.target;
      if (this.instance && typeof (target == null ? void 0 : target.value) === "string") {
        this.updateState(target.value);
        const thisSearchID = ++this.searchID;
        await asyncSleep(this.debounce);
        if (thisSearchID !== this.searchID) {
          return;
        }
        (_a16 = this.instance) == null ? void 0 : _a16.triggerSearch(target.value);
      }
    });
    this.inputEl.addEventListener("keydown", (e10) => {
      var _a16, _b2;
      if (e10.key === "Escape") {
        ++this.searchID;
        if (this.inputEl) this.inputEl.value = "";
        (_a16 = this.instance) == null ? void 0 : _a16.triggerSearch("");
        this.updateState("");
      }
      if (e10.key === "ArrowDown") {
        e10.preventDefault();
        if (this.inputEl) {
          (_b2 = this.instance) == null ? void 0 : _b2.focusNextResults(this.inputEl);
        }
      }
    });
    this.inputEl.addEventListener("focus", () => {
      var _a16, _b2, _c, _d, _e;
      (_a16 = this.instance) == null ? void 0 : _a16.triggerLoad();
      const navigateText = ((_b2 = this.instance) == null ? void 0 : _b2.translate("keyboard_navigate")) || "navigate";
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
      var _a16;
      (_a16 = this.instance) == null ? void 0 : _a16.deregisterAllShortcuts(this);
    });
    this.clearEl.addEventListener("click", () => {
      var _a16;
      if (this.inputEl) {
        this.inputEl.value = "";
        (_a16 = this.instance) == null ? void 0 : _a16.triggerSearch("");
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
        var _a16;
        const currentValue = ((_a16 = this.inputEl) == null ? void 0 : _a16.value) || "";
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
    var _a16;
    this.innerHTML = "";
    if (((_a16 = this.instance) == null ? void 0 : _a16.direction) === "rtl") {
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
        var _a16, _b2;
        if (!this.containerEl || !results) return;
        const searchResult = results;
        const count = (_b2 = (_a16 = searchResult == null ? void 0 : searchResult.results) == null ? void 0 : _a16.length) != null ? _b2 : 0;
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
  if (Array.isArray(templateResult) && templateResult.every((r9) => r9 instanceof Element)) {
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
    var _a16;
    if (this.result !== null || this.observer !== null) return;
    if (!((_a16 = this.placeholderNodes) == null ? void 0 : _a16.length)) return;
    const options = {
      root: this.intersectionEl,
      rootMargin: "50px",
      // Start loading slightly before visible
      threshold: 0.01
    };
    this.observer = new IntersectionObserver((entries, obs) => {
      var _a17;
      if (this.result !== null) return;
      if ((_a17 = entries == null ? void 0 : entries[0]) == null ? void 0 : _a17.isIntersecting) {
        this.load();
        obs.disconnect();
        this.observer = null;
      }
    }, options);
    this.observer.observe(this.placeholderNodes[0]);
  }
  async load() {
    var _a16, _b2;
    if (!((_a16 = this.placeholderNodes) == null ? void 0 : _a16.length)) return;
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
    } catch (e10) {
      this.loading = false;
    }
    (_b2 = this.onLoad) == null ? void 0 : _b2.call(this);
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
    var _a16, _b2;
    const savedScripts = [];
    this.querySelectorAll('script[type="text/pagefind-template"]').forEach(
      (s5) => {
        savedScripts.push(s5);
      }
    );
    this.innerHTML = "";
    savedScripts.forEach((s5) => this.appendChild(s5));
    const resultsLabel = ((_a16 = this.instance) == null ? void 0 : _a16.translate("results_label")) || "Search results";
    if (((_b2 = this.instance) == null ? void 0 : _b2.direction) === "rtl") {
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
        this.results = limitedResults.map((r9, idx) => {
          const placeholderNodes = templateNodes(this.getPlaceholder());
          stampResultIndex(placeholderNodes, idx);
          this.appendResults(placeholderNodes);
          const result = new Result({
            result: r9,
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
    this.containerEl.addEventListener("keydown", (e10) => {
      var _a16, _b2, _c, _d;
      const anchor = e10.target.closest("a");
      if (!anchor) return;
      if (e10.key === "ArrowDown") {
        e10.preventDefault();
        const neighbor = this.findNeighborAnchor(
          anchor,
          1
        );
        if (neighbor) {
          neighbor.anchor.focus();
          this.scrollToCenter(neighbor.anchor, e10.repeat);
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
      } else if (e10.key === "ArrowUp") {
        e10.preventDefault();
        const neighbor = this.findNeighborAnchor(
          anchor,
          -1
        );
        if (neighbor) {
          neighbor.anchor.focus();
          this.scrollToCenter(neighbor.anchor, e10.repeat);
          if (neighbor.resultIndex !== -1)
            this.preloadAhead(neighbor.resultIndex, -1);
        } else {
          (_a16 = this.instance) == null ? void 0 : _a16.focusPreviousInput(document.activeElement);
        }
      } else if (e10.key === "Backspace") {
        e10.preventDefault();
        (_b2 = this.instance) == null ? void 0 : _b2.focusInputAndDelete(document.activeElement);
      } else if (e10.key === "/") {
        e10.preventDefault();
        (_c = this.instance) == null ? void 0 : _c.focusPreviousInput(document.activeElement);
      } else if (e10.key.length === 1 && !e10.ctrlKey && !e10.metaKey && !e10.altKey) {
        e10.preventDefault();
        (_d = this.instance) == null ? void 0 : _d.focusInputAndType(
          document.activeElement,
          e10.key
        );
      }
    });
    this.containerEl.addEventListener("focusin", (e10) => {
      var _a16, _b2, _c, _d, _e, _f;
      const anchor = e10.target.closest(
        "a"
      );
      if (!anchor) return;
      this.clearSelection();
      anchor.setAttribute("data-pf-selected", "");
      this.selectedAnchor = anchor;
      const navigateText = ((_a16 = this.instance) == null ? void 0 : _a16.translate("keyboard_navigate")) || "navigate";
      const selectText = ((_b2 = this.instance) == null ? void 0 : _b2.translate("keyboard_select")) || "select";
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
    this.containerEl.addEventListener("focusout", (e10) => {
      var _a16, _b2;
      const focusEvent = e10;
      if (!((_a16 = this.containerEl) == null ? void 0 : _a16.contains(focusEvent.relatedTarget))) {
        this.clearSelection();
        (_b2 = this.instance) == null ? void 0 : _b2.deregisterAllShortcuts(this);
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
    for (let i9 = 1; i9 <= 3; i9++) {
      const idx = fromIndex + step * i9;
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
      var _a16;
      this.loadingAnnouncementTimeout = null;
      (_a16 = this.instance) == null ? void 0 : _a16.announce("loading", {}, "polite");
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
      this.openFilters = (this.getAttribute("open") || "").split(",").map((s5) => s5.trim().toLowerCase()).filter((s5) => s5.length > 0);
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
        sorted.sort((a4, b3) => a4[0].localeCompare(b3[0]));
        break;
      case "count-desc":
        sorted.sort((a4, b3) => {
          var _a16, _b2;
          const countA = (_a16 = availableValues[a4[0]]) != null ? _a16 : a4[1];
          const countB = (_b2 = availableValues[b3[0]]) != null ? _b2 : b3[1];
          return countB - countA;
        });
        break;
      case "count-asc":
        sorted.sort((a4, b3) => {
          var _a16, _b2;
          const countA = (_a16 = availableValues[a4[0]]) != null ? _a16 : a4[1];
          const countB = (_b2 = availableValues[b3[0]]) != null ? _b2 : b3[1];
          return countA - countB;
        });
        break;
    }
    return sorted;
  }
  render() {
    var _a16;
    this.innerHTML = "";
    if (((_a16 = this.instance) == null ? void 0 : _a16.direction) === "rtl") {
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
    var _a16;
    if (!this.containerEl || !this.totalFilters) return;
    this.containerEl.innerHTML = "";
    this.filterElements.clear();
    this.groupElements.clear();
    this.groupVisibleCounts.clear();
    const filterNames = Object.keys(this.totalFilters);
    for (const filterName of filterNames) {
      const values = this.totalFilters[filterName];
      const availableValues = ((_a16 = this.availableFilters) == null ? void 0 : _a16[filterName]) || {};
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
    var _a16, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    for (const [key, elements] of this.filterElements) {
      const colonIndex = key.indexOf(":");
      const filterName = key.slice(0, colonIndex);
      const value = key.slice(colonIndex + 1);
      const availableCount = (_c = (_b2 = (_a16 = this.availableFilters) == null ? void 0 : _a16[filterName]) == null ? void 0 : _b2[value]) != null ? _c : 0;
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
    var _a16, _b2, _c;
    const rawEntries = Object.entries(values);
    if (rawEntries.length === 0) return null;
    const valueEntries = this.sortValues(rawEntries, availableValues);
    const displayName = filterName.charAt(0).toUpperCase() + filterName.slice(1);
    const selectedCount = ((_a16 = this.selectedFilters[filterName]) == null ? void 0 : _a16.size) || 0;
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
      const availableCount = (_b2 = availableValues[value]) != null ? _b2 : 0;
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
    checkbox.addEventListener("change", (e10) => {
      this.handleCheckboxChange(
        filterName,
        value,
        e10.target.checked
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
    var _a16, _b2;
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
      (_a16 = this.instance) == null ? void 0 : _a16.triggerFilters(filters);
    } else {
      (_b2 = this.instance) == null ? void 0 : _b2.triggerFilter(filterName, selectedValues);
    }
  }
  register(instance) {
    instance.registerFilter(this);
    instance.on(
      "filters",
      (filters) => {
        const f4 = filters;
        this.availableFilters = f4.available;
        this.totalFilters = f4.total;
        this.handleFiltersUpdate();
      },
      this
    );
    instance.on(
      "search",
      (_term, filters) => {
        this.selectedFilters = {};
        const f4 = filters;
        if (f4) {
          for (const [name, values] of Object.entries(f4)) {
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
      this.openFilters = (this.getAttribute("open") || "").split(",").map((s5) => s5.trim().toLowerCase()).filter((s5) => s5.length > 0);
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
        sorted.sort((a4, b3) => a4.localeCompare(b3));
        break;
      case "count-desc":
        sorted.sort((a4, b3) => {
          var _a16, _b2, _c, _d;
          const countA = (_b2 = (_a16 = this.availableFilters[a4]) != null ? _a16 : this.totalFilters[a4]) != null ? _b2 : 0;
          const countB = (_d = (_c = this.availableFilters[b3]) != null ? _c : this.totalFilters[b3]) != null ? _d : 0;
          return countB - countA;
        });
        break;
      case "count-asc":
        sorted.sort((a4, b3) => {
          var _a16, _b2, _c, _d;
          const countA = (_b2 = (_a16 = this.availableFilters[a4]) != null ? _a16 : this.totalFilters[a4]) != null ? _b2 : 0;
          const countB = (_d = (_c = this.availableFilters[b3]) != null ? _c : this.totalFilters[b3]) != null ? _d : 0;
          return countA - countB;
        });
        break;
    }
    return sorted;
  }
  render() {
    var _a16, _b2;
    this.innerHTML = "";
    const id3 = this.ensureId("pf-dropdown");
    const triggerId = `${id3}-trigger`;
    const menuId = `${id3}-menu`;
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
    const arrow3 = document.createElement("span");
    arrow3.className = "pf-dropdown-arrow";
    arrow3.setAttribute("aria-hidden", "true");
    this.triggerEl.appendChild(arrow3);
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
        (((_a16 = this.instance) == null ? void 0 : _a16.translate("clear_search")) || "Clear") + " " + (this.getAttribute("label") || this.filterName || "")
      );
      this.clearEl.textContent = ((_b2 = this.instance) == null ? void 0 : _b2.translate("clear_search")) || "Clear";
      this.wrapperEl.appendChild(this.clearEl);
      this.clearEl.addEventListener("click", () => this.clearAll());
    }
    this.appendChild(this.wrapperEl);
    this.triggerEl.addEventListener("click", () => this.toggle());
    this.triggerEl.addEventListener(
      "focus",
      () => {
        var _a17;
        return (_a17 = this.instance) == null ? void 0 : _a17.triggerLoad();
      }
    );
    this.triggerEl.addEventListener("keydown", (e10) => {
      if (this.isOpen) {
        this.handleMenuKeydown(e10);
      } else {
        this.handleTriggerKeydown(e10);
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
    var _a16, _b2, _c, _d, _e, _f, _g;
    (_a16 = this.instance) == null ? void 0 : _a16.triggerLoad();
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
    const navigateText = ((_b2 = this.instance) == null ? void 0 : _b2.translate("keyboard_navigate")) || "navigate";
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
    var _a16, _b2;
    if (!this.isOpen || !this.menuEl || !this.triggerEl || !this.optionsEl)
      return;
    this.isOpen = false;
    this.menuEl.hidden = true;
    this.triggerEl.setAttribute("aria-expanded", "false");
    this.triggerEl.classList.remove("open");
    (_a16 = this.triggerEl) == null ? void 0 : _a16.removeAttribute("aria-activedescendant");
    if (this.focusedOptionEl) {
      this.focusedOptionEl.classList.remove("pf-dropdown-option-focused");
      this.focusedOptionEl = null;
    }
    (_b2 = this.instance) == null ? void 0 : _b2.deregisterAllShortcuts(this);
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
  handleTriggerKeydown(e10) {
    switch (e10.key) {
      case "Enter":
      case " ":
        e10.preventDefault();
        this.open();
        break;
      case "ArrowDown":
        e10.preventDefault();
        this.open();
        this.setActiveIndex(0);
        break;
      case "ArrowUp":
        e10.preventDefault();
        this.open();
        this.setActiveIndex(this.optionElements.length - 1);
        break;
    }
  }
  handleMenuKeydown(e10) {
    switch (e10.key) {
      case "ArrowDown":
        e10.preventDefault();
        this.moveActiveIndex(1);
        break;
      case "ArrowUp":
        e10.preventDefault();
        this.moveActiveIndex(-1);
        break;
      case "Home":
        e10.preventDefault();
        this.setActiveIndex(0);
        break;
      case "End":
        e10.preventDefault();
        this.setActiveIndex(this.optionElements.length - 1);
        break;
      case "Enter":
      case " ":
        e10.preventDefault();
        if (this.activeIndex >= 0 && this.activeIndex < this.optionElements.length) {
          const activeOption = this.optionElements[this.activeIndex];
          if (activeOption) {
            this.toggleOption(activeOption.value);
          }
        }
        break;
      case "Escape":
        e10.preventDefault();
        this.close();
        break;
      case "Tab":
        this.close(false);
        break;
      default:
        if (e10.key.length === 1 && !e10.ctrlKey && !e10.metaKey && !e10.altKey) {
          this.handleTypeAhead(e10.key);
        }
    }
  }
  setActiveIndex(index) {
    var _a16;
    if (index < 0 || index >= this.optionElements.length || !this.optionsEl)
      return;
    if (this.focusedOptionEl) {
      this.focusedOptionEl.classList.remove("pf-dropdown-option-focused");
    }
    this.activeIndex = index;
    const option = this.optionElements[index];
    option.el.classList.add("pf-dropdown-option-focused");
    this.focusedOptionEl = option.el;
    (_a16 = this.triggerEl) == null ? void 0 : _a16.setAttribute("aria-activedescendant", option.el.id);
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
    for (let i9 = 0; i9 < 3; i9++) {
      const skeleton = document.createElement("div");
      skeleton.className = "pf-dropdown-option pf-dropdown-option-loading";
      skeleton.setAttribute("aria-hidden", "true");
      const checkbox = document.createElement("span");
      checkbox.className = "pf-dropdown-checkbox pf-skeleton";
      skeleton.appendChild(checkbox);
      const label = document.createElement("span");
      label.className = "pf-dropdown-option-label pf-skeleton";
      label.style.width = `${60 + i9 * 15}%`;
      label.innerHTML = "&nbsp;";
      skeleton.appendChild(label);
      this.optionsEl.appendChild(skeleton);
    }
  }
  updateOptions() {
    var _a16;
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
    (_a16 = this.wrapperEl) == null ? void 0 : _a16.removeAttribute("data-pf-hidden");
    this.optionsEl.innerHTML = "";
    this.optionElements = [];
    this.focusedOptionEl = null;
    const baseId = this.id || this.ensureId("pf-dropdown");
    values.forEach((value, index) => {
      var _a17, _b2, _c;
      const availableCount = (_b2 = (_a17 = this.availableFilters) == null ? void 0 : _a17[value]) != null ? _b2 : 0;
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
  createOption(id3, value, count, isSelected) {
    const option = document.createElement("div");
    option.id = id3;
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
    option.addEventListener("click", (e10) => {
      e10.stopPropagation();
      this.toggleOption(value);
    });
    return option;
  }
  toggleOption(value) {
    var _a16;
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
      (_a16 = this.instance) == null ? void 0 : _a16.announceRaw(`${value} ${action}`);
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
    var _a16, _b2;
    if (!this.filterName) return;
    const selectedArray = Array.from(this.selectedValues);
    if (selectedArray.length === 0) {
      (_a16 = this.instance) == null ? void 0 : _a16.triggerFilter(this.filterName, []);
    } else {
      (_b2 = this.instance) == null ? void 0 : _b2.triggerFilter(this.filterName, selectedArray);
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
        var _a16, _b2;
        const f4 = filters;
        this.availableFilters = ((_a16 = f4.available) == null ? void 0 : _a16[this.filterName]) || {};
        this.totalFilters = ((_b2 = f4.total) == null ? void 0 : _b2[this.filterName]) || {};
        if (this.isRendered) {
          this.updateOptions();
        }
      },
      this
    );
    instance.on(
      "search",
      (_term, filters) => {
        const f4 = filters;
        const externalValues = (f4 == null ? void 0 : f4[this.filterName]) || [];
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
    var _a16;
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
    const labelSpan = (_a16 = this.triggerEl) == null ? void 0 : _a16.querySelector(
      ".pf-dropdown-trigger-label"
    );
    if (labelSpan) {
      labelSpan.textContent = this.getAttribute("label") || this.filterName || "";
    }
    this.updateOptions();
  }
  cleanup() {
    var _a16;
    document.removeEventListener("click", this._handleClickOutside);
    (_a16 = this.instance) == null ? void 0 : _a16.deregisterAllShortcuts(this);
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
    var _a16, _b2;
    const hasChildren = this.children.length > 0;
    const children = hasChildren ? Array.from(this.children) : null;
    this.innerHTML = "";
    const dialogId = this.id || this.instance.generateId("pagefind-modal");
    const searchLabel = ((_a16 = this.instance) == null ? void 0 : _a16.translate("keyboard_search")) || "search";
    if (((_b2 = this.instance) == null ? void 0 : _b2.direction) === "rtl") {
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
      (e10) => {
        if (e10.key === "Escape") {
          e10.preventDefault();
          e10.stopPropagation();
          this.close();
        }
      },
      true
    );
    this.dialogEl.addEventListener("click", (e10) => {
      if (e10.target === this.dialogEl) {
        this.close();
      }
    });
  }
  open() {
    var _a16, _b2, _c;
    if (this._isOpen || !this.dialogEl) return;
    this._isOpen = true;
    this.dialogEl.showModal();
    const closeText = ((_a16 = this.instance) == null ? void 0 : _a16.translate("keyboard_close")) || "close";
    (_b2 = this.instance) == null ? void 0 : _b2.registerShortcut(
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
    triggers.forEach((t6) => {
      var _a17;
      return (_a17 = t6.buttonEl) == null ? void 0 : _a17.setAttribute("aria-expanded", "true");
    });
  }
  close() {
    if (!this._isOpen || !this.dialogEl) return;
    this.dialogEl.close();
  }
  handleClose() {
    var _a16, _b2;
    (_a16 = this.instance) == null ? void 0 : _a16.deregisterAllShortcuts(this);
    if (this.resetOnClose && this.instance) {
      this.instance.triggerSearch("");
    }
    const triggers = ((_b2 = this.instance) == null ? void 0 : _b2.getUtilities("modal-trigger")) || [];
    const trigger = triggers[0];
    if (trigger && typeof trigger.handleModalClose === "function") {
      trigger.handleModalClose();
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
    var _a16;
    const triggers = ((_a16 = this.instance) == null ? void 0 : _a16.getUtilities("modal-trigger")) || [];
    triggers.forEach((t6) => {
      var _a17;
      if (t6.buttonEl && ((_a17 = this.dialogEl) == null ? void 0 : _a17.id)) {
        t6.buttonEl.setAttribute("aria-controls", this.dialogEl.id);
      }
    });
  }
  cleanup() {
    var _a16;
    if (this.dialogEl && this._closeHandler) {
      this.dialogEl.removeEventListener("close", this._closeHandler);
    }
    (_a16 = this.instance) == null ? void 0 : _a16.deregisterAllShortcuts(this);
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
  } catch (e10) {
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
    var _a16;
    return this._userPlaceholder || ((_a16 = this.instance) == null ? void 0 : _a16.translate("keyboard_search")) || "Search";
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
    var _a16;
    this.innerHTML = "";
    if (((_a16 = this.instance) == null ? void 0 : _a16.direction) === "rtl") {
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
    this._keydownHandler = (e10) => {
      if (!this._keyBinding || !keyBindingMatches(this._keyBinding, e10)) return;
      const activeEl = document.activeElement;
      const isTyping = activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.isContentEditable);
      if (!isTyping) {
        e10.preventDefault();
        this.openModal();
      }
    };
    document.addEventListener("keydown", this._keydownHandler);
  }
  openModal() {
    var _a16;
    const modals = ((_a16 = this.instance) == null ? void 0 : _a16.getUtilities("modal")) || [];
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
    var _a16, _b2;
    const modals = ((_a16 = this.instance) == null ? void 0 : _a16.getUtilities("modal")) || [];
    const modal = modals[0];
    if (((_b2 = modal == null ? void 0 : modal.dialogEl) == null ? void 0 : _b2.id) && this.buttonEl) {
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
    var _a16;
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
      ((_a16 = this.instance) == null ? void 0 : _a16.translate("keyboard_close")) || "Close"
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
    var _a16, _b2;
    this.innerHTML = "";
    if (((_a16 = this.instance) == null ? void 0 : _a16.direction) === "rtl") {
      this.setAttribute("dir", "rtl");
    } else {
      this.removeAttribute("dir");
    }
    const shortcuts = ((_b2 = this.instance) == null ? void 0 : _b2.getActiveShortcuts()) || [];
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
var asyncSleep2 = (ms = 100) => new Promise((r9) => setTimeout(r9, ms));
var stampOptionAttributes = (root, resultIndex) => {
  const options = root.getAttribute("role") === "option" ? [root] : Array.from(root.querySelectorAll('[role="option"]'));
  for (let i9 = 0; i9 < options.length; i9++) {
    options[i9].setAttribute("data-pf-result-index", String(resultIndex));
    options[i9].setAttribute("data-pf-option-offset", String(i9));
  }
};
var templateNodes2 = (templateResult) => {
  if (templateResult instanceof Element) {
    return [templateResult];
  }
  if (Array.isArray(templateResult) && templateResult.every((r9) => r9 instanceof Element)) {
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
      var _a16;
      if (this.data !== null) return;
      if ((_a16 = entries == null ? void 0 : entries[0]) == null ? void 0 : _a16.isIntersecting) {
        this.load();
        obs.disconnect();
        this.observer = null;
      }
    }, options);
    this.observer.observe(this.placeholderEl);
  }
  async load() {
    var _a16;
    if (this.data !== null || this.loading) return;
    this.loading = true;
    try {
      this.data = await this.rawResult.data();
      const templateResult = this.renderFn(this.data);
      const nodes = templateNodes2(templateResult);
      if (nodes.length > 0 && this.placeholderEl.parentNode) {
        const firstElement = nodes.find((n7) => n7 instanceof Element);
        this.placeholderEl.replaceWith(...nodes);
        if (firstElement instanceof Element) {
          this.placeholderEl = firstElement;
          stampOptionAttributes(firstElement, this.index);
          this.cacheOptions();
        }
      }
    } catch (e10) {
      await new Promise((r9) => setTimeout(r9, this.retryDelay || 100));
      this.retryDelay = Math.min((this.retryDelay || 100) * 2, 1e4);
      this.loading = false;
    }
    (_a16 = this.onLoad) == null ? void 0 : _a16.call(this);
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
    var _a16;
    return this._userPlaceholder || ((_a16 = this.instance) == null ? void 0 : _a16.translate("placeholder")) || "Search...";
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
    var _a16, _b2;
    const savedScripts = [];
    this.querySelectorAll('script[type="text/pagefind-template"]').forEach(
      (s5) => {
        savedScripts.push(s5);
      }
    );
    this.innerHTML = "";
    savedScripts.forEach((s5) => this.appendChild(s5));
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
    const resultsLabel = ((_a16 = this.instance) == null ? void 0 : _a16.translate("results_label")) || "Search results";
    if (((_b2 = this.instance) == null ? void 0 : _b2.direction) === "rtl") {
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
    var _a16, _b2, _c;
    if (!this.footerEl) return;
    this.footerEl.innerHTML = "";
    const navigateText = ((_a16 = this.instance) == null ? void 0 : _a16.translate("keyboard_navigate")) || "navigate";
    const selectText = ((_b2 = this.instance) == null ? void 0 : _b2.translate("keyboard_select")) || "select";
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
    this.inputEl.addEventListener("input", async (e10) => {
      var _a16, _b2;
      const value = e10.target.value;
      this.searchTerm = value;
      if (!value || !value.trim()) {
        this.closeDropdown();
        this.results = [];
        (_a16 = this.instance) == null ? void 0 : _a16.triggerSearch("");
        return;
      }
      this.openDropdown();
      this.showLoadingState();
      const thisSearchID = ++this.searchID;
      await asyncSleep2(this.debounce);
      if (thisSearchID !== this.searchID) {
        return;
      }
      (_b2 = this.instance) == null ? void 0 : _b2.triggerSearch(value);
    });
    this.inputEl.addEventListener("keydown", (e10) => {
      var _a16, _b2, _c;
      switch (e10.key) {
        case "ArrowDown":
          e10.preventDefault();
          if (!this.isOpen && ((_a16 = this.inputEl) == null ? void 0 : _a16.value.trim())) {
            this.openDropdown();
          }
          if (this.isOpen && this.results.length > 0) {
            this.moveSelection(1);
          }
          break;
        case "ArrowUp":
          e10.preventDefault();
          if (this.isOpen && this.results.length > 0) {
            this.moveSelection(-1);
          }
          break;
        case "Enter":
          if (this.isOpen && this.activeIndex >= 0) {
            e10.preventDefault();
            this.activateCurrentSelection(e10);
          } else if (!this.isOpen && ((_b2 = this.inputEl) == null ? void 0 : _b2.value.trim())) {
            e10.preventDefault();
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
            e10.preventDefault();
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
      var _a16;
      (_a16 = this.instance) == null ? void 0 : _a16.triggerLoad();
    });
    this.resultsEl.addEventListener("click", (e10) => {
      const resultLink = e10.target.closest("a");
      if (resultLink) {
        this.closeDropdown();
      }
    });
    this.resultsEl.addEventListener("mousemove", (e10) => {
      const resultLink = e10.target.closest("a");
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
    this._documentClickHandler = (e10) => {
      if (this.isOpen && !this.contains(e10.target)) {
        this.closeDropdown();
      }
    };
    document.addEventListener("click", this._documentClickHandler);
  }
  setupShortcutHandler() {
    if (!this._keyBinding) return;
    this._shortcutKeyHandler = (e10) => {
      var _a16;
      if (!this._keyBinding || !keyBindingMatches(this._keyBinding, e10)) return;
      const activeEl = document.activeElement;
      const isTyping = activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.isContentEditable);
      if (!isTyping) {
        e10.preventDefault();
        (_a16 = this.inputEl) == null ? void 0 : _a16.focus();
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
    var _a16;
    if (!this.resultsEl || !this.statusEl) return;
    this.isLoading = true;
    this.resultsEl.innerHTML = "";
    this.selectedEl = null;
    this.resultsEl.setAttribute("aria-busy", "true");
    const searchingText = ((_a16 = this.instance) == null ? void 0 : _a16.translate("searching", { SEARCH_TERM: this.searchTerm })) || "Searching...";
    this.statusEl.textContent = searchingText;
    this.statusEl.className = "pf-searchbox-status pf-searchbox-loading";
    this.statusEl.hidden = false;
  }
  showEmptyState() {
    var _a16, _b2;
    if (!this.resultsEl || !this.statusEl) return;
    this.resultsEl.innerHTML = "";
    this.selectedEl = null;
    this.resultsEl.removeAttribute("aria-busy");
    const noResultsText = ((_a16 = this.instance) == null ? void 0 : _a16.translate("zero_results", {
      SEARCH_TERM: this.searchTerm
    })) || `No results for "${this.searchTerm}"`;
    this.statusEl.textContent = noResultsText;
    this.statusEl.className = "pf-searchbox-status pf-searchbox-empty";
    this.statusEl.hidden = false;
    (_b2 = this.instance) == null ? void 0 : _b2.announce(
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
    for (let i9 = 1; i9 <= count; i9++) {
      const idx = fromIndex + step * i9;
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
      var _a16;
      this.loadingAnnouncementTimeout = null;
      (_a16 = this.instance) == null ? void 0 : _a16.announce("loading", {}, "polite");
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
    for (let i9 = 0; i9 < this.results.length; i9++) {
      const result = this.results[i9];
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
            stampOptionAttributes(node, i9);
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
    var _a16, _b2;
    const count = this.results.length;
    if (count === 0) {
      (_a16 = this.instance) == null ? void 0 : _a16.announce(
        "zero_results",
        { SEARCH_TERM: this.searchTerm },
        "assertive"
      );
    } else {
      const key = count === 1 ? "one_result" : "many_results";
      (_b2 = this.instance) == null ? void 0 : _b2.announce(key, {
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
        var _a16;
        const currentValue = ((_a16 = this.inputEl) == null ? void 0 : _a16.value) || "";
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
  const s5 = String(url != null ? url : "");
  if (!s5 || /^[a-z][a-z0-9+.-]*:/i.test(s5) || /^\/\//.test(s5) || s5.startsWith("/")) return s5;
  try {
    return new URL(s5, new URL(String(pageUrl != null ? pageUrl : "/"), "https://p")).pathname;
  } catch (e10) {
    return s5;
  }
});
if (typeof window !== "undefined") {
  window.PagefindComponents = components_exports;
}

// docs/assets/js/index.js
var application = new Application();
var _a15;
application.context = (_a15 = window == null ? void 0 : window.application) == null ? void 0 : _a15.context;
window.application = application;
application.start();
var QuickSearchButton = class extends HTMLElement {
  constructor() {
    super();
    const instance = window.PagefindComponents.getInstanceManager().getInstance("default");
    instance.registerUtility(this, "modal-trigger");
    this.addEventListener("click", () => {
      var _a16;
      return (_a16 = instance.getUtilities("modal")[0]) == null ? void 0 : _a16.open();
    });
  }
  handleModalClose() {
    var _a16;
    (_a16 = this.buttonEl) == null ? void 0 : _a16.focus();
  }
};
customElements.define("quick-search-button", QuickSearchButton);
var ColorSwitcherController = class extends Controller {
  constructor() {
    super(...arguments);
    __publicField(this, "handleShortcut", (event) => {
      if (event.key === "\\" && !event.composedPath().some((el) => {
        var _a16, _b2, _c;
        return ["input", "textarea"].includes((_a16 = el == null ? void 0 : el.tagName) == null ? void 0 : _a16.toLowerCase()) || ((_b2 = el.hasAttribute) == null ? void 0 : _b2.call(el, "contenteditable")) || ((_c = el.getAttribute) == null ? void 0 : _c.call(el, "role")) === "textbox";
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
  var _a16, _b2;
  return (_b2 = (_a16 = root == null ? void 0 : root.querySelector("wa-page")) == null ? void 0 : _a16.shadowRoot) == null ? void 0 : _b2.querySelector("[part~='menu']");
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
function storeScrollPosition(e10) {
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
function handleBodySwap(e10) {
  var _a16, _b2;
  const newBody = e10.newBody;
  document.querySelectorAll("dialog.pf-modal[open]").forEach((d5) => d5.close());
  const instanceManager2 = (_b2 = (_a16 = window.PagefindComponents) == null ? void 0 : _a16.getInstanceManager) == null ? void 0 : _b2.call(_a16);
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
function restoreScrollPosition(e10) {
  updateMenu();
  customElements.whenDefined("wa-page").then(() => {
    const currentPage = document.querySelector("wa-page");
    if (!currentPage) {
      return;
    }
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

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/private-ssr-support.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/ssr-client/lib/hydrate-lit-html.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@awesome.me/webawesome/dist/chunks/chunk.R7QX4M6R.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.VC3BPUZJ.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.7VGCIHDG.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@awesome.me/webawesome/dist/chunks/chunk.AOKMSJXD.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.KBXNFZQL.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.RPQJAXXR.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.RWNXKUCF.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.G5ZZIGWB.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.3CFUTVFX.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.XNTP7DEQ.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.PZAN6FPN.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.HK4J654O.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.CDGKIW7Y.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@awesome.me/webawesome/dist/chunks/chunk.N2SS4JTL.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.W7A2VLCT.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.JBGB3CLX.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.YDQCS2HK.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.WDIIGUNP.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.W6JCCVOH.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.HGBRCPUS.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.D4VAJWKJ.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.XTA2JDH4.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.L2IYIH2C.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.4TFM52NM.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/button/button.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.LCEGCF5S.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.C6MKRB3S.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/callout/callout.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.ATI2KDM5.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.S37D42WK.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/card/card.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.YB6263IP.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.GWSUX3V5.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.5LXXXELE.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@awesome.me/webawesome/dist/chunks/chunk.PKAOFPE6.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/checkbox/checkbox.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.NY2PQ35L.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.YDWBRJAR.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.2ZAJEMB4.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.KNJT7KBU.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.L6CIKOFQ.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.FXXRVH6C.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.TKL7YZKI.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.4ZAKP7NY.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.MQODJ75V.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.PX3HMKF7.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.3NKIHICW.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.ZWQCGLB5.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.HS5AYC6E.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.7MPIABXH.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.52WA2DJO.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.F25QOBDY.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.ULEOIS5V.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/copy-button/copy-button.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.W62SLQ7P.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.QZCZWFP7.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/details/details.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.VQZ46MYI.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.RMZ7BVDM.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.XTG2LNFG.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.Q4MSGKHB.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/dialog/dialog.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.CZSN7KEZ.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.P6YH3RDQ.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/divider/divider.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.LVP7MDLV.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.WZZNE26D.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/drawer/drawer.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.VCKA3KNZ.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.HUPDX6RW.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/dropdown-item/dropdown-item.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.2LXKNNNE.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.TTJR7FH2.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.Z6IK7DP4.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.2IJXO5LR.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/dropdown/dropdown.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.CJ6QKR26.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/format-number/format-number.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/icon/icon.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.H7TA73OO.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.2MLO7LVV.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.WGFDW2LC.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.AEEHXP6K.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/include/include.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.JTOY5KP3.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.DOFHHKB4.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.ODECC6XW.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.APJ42YJ7.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/input/input.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.5J72BVE2.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.6QAL56QA.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/number-input/number-input.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.C3KOHXUM.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.LORKLTKP.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/option/option.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.WKX3BKNK.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.WNS42D5L.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@awesome.me/webawesome/dist/chunks/chunk.TK7N5KSX.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/page/page.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.5GSAV6WQ.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.GSYA32IS.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/popover/popover.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/popup/popup.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.GBDIGVZM.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.CE7HN7KT.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.BELHQIBT.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.B5X2I7WQ.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/radio-group/radio-group.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/radio/radio.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.C6UR4IOH.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.F6P22JWC.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/switch/switch.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.YBFCQDTA.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.SKLR37OM.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.NMA53WZH.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.IBWWPMEF.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.R2GHHEHL.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.IVYLTDB6.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.WRIHAZWX.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.KQ3Z6T2I.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/tab-group/tab-group.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/tab-panel/tab-panel.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/tab/tab.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.HPULLNVR.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.4AHPL3WP.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.BRDQCPHI.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/tag/tag.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/tooltip/tooltip.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.GN6FNBVQ.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/chunks/chunk.3WA5QC43.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@awesome.me/webawesome/dist/components/zoomable-frame/zoomable-frame.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)
*/
//# sourceMappingURL=index.js.map
