import * as Cn from "vue";
import { defineComponent as P, createElementBlock as q, openBlock as b, normalizeClass as I, unref as g, renderSlot as D, createBlock as M, withCtx as x, createVNode as N, createCommentVNode as Y, createElementVNode as le, toDisplayString as G, inject as Io, provide as Fo, Fragment as Ke, shallowRef as Ot, readonly as Un, toValue as te, getCurrentScope as Gn, onScopeDispose as Kn, effectScope as Xn, onBeforeUnmount as zo, watch as ae, watchEffect as ge, customRef as Ho, getCurrentInstance as Be, ref as L, nextTick as De, computed as T, onMounted as Re, toHandlerKey as Vo, camelize as Yn, toRef as Wo, onUnmounted as Jn, toRefs as Xe, h as ce, Comment as Zn, mergeProps as H, cloneVNode as jo, reactive as yt, normalizeStyle as bt, Teleport as Uo, normalizeProps as nn, guardReactiveProps as on, watchPostEffect as Qn, shallowReadonly as $e, mergeDefaults as Go, useSlots as Ko, withModifiers as Xo, createTextVNode as Ye, resolveDynamicComponent as eo, toHandlers as Yo, isRef as Lt, renderList as rn, createApp as Jo } from "vue";
function to(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (t = 0; t < r; t++) e[t] && (n = to(e[t])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function no() {
  for (var e, t, n = 0, o = "", r = arguments.length; n < r; n++) (e = arguments[n]) && (t = to(e)) && (o && (o += " "), o += t);
  return o;
}
const sn = "-", Zo = (e) => {
  const t = er(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (a) => {
      const l = a.split(sn);
      return l[0] === "" && l.length !== 1 && l.shift(), oo(l, t) || Qo(a);
    },
    getConflictingClassGroupIds: (a, l) => {
      const c = n[a] || [];
      return l && o[a] ? [...c, ...o[a]] : c;
    }
  };
}, oo = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], o = t.nextPart.get(n), r = o ? oo(e.slice(1), o) : void 0;
  if (r)
    return r;
  if (t.validators.length === 0)
    return;
  const s = e.join(sn);
  return t.validators.find(({
    validator: a
  }) => a(s))?.classGroupId;
}, _n = /^\[(.+)\]$/, Qo = (e) => {
  if (_n.test(e)) {
    const t = _n.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, er = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const r in n)
    jt(n[r], o, r, t);
  return o;
}, jt = (e, t, n, o) => {
  e.forEach((r) => {
    if (typeof r == "string") {
      const s = r === "" ? t : kn(t, r);
      s.classGroupId = n;
      return;
    }
    if (typeof r == "function") {
      if (tr(r)) {
        jt(r(o), t, n, o);
        return;
      }
      t.validators.push({
        validator: r,
        classGroupId: n
      });
      return;
    }
    Object.entries(r).forEach(([s, a]) => {
      jt(a, kn(t, s), n, o);
    });
  });
}, kn = (e, t) => {
  let n = e;
  return t.split(sn).forEach((o) => {
    n.nextPart.has(o) || n.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(o);
  }), n;
}, tr = (e) => e.isThemeGetter, nr = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const r = (s, a) => {
    n.set(s, a), t++, t > e && (t = 0, o = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let a = n.get(s);
      if (a !== void 0)
        return a;
      if ((a = o.get(s)) !== void 0)
        return r(s, a), a;
    },
    set(s, a) {
      n.has(s) ? n.set(s, a) : r(s, a);
    }
  };
}, Ut = "!", Gt = ":", or = Gt.length, rr = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let o = (r) => {
    const s = [];
    let a = 0, l = 0, c = 0, u;
    for (let p = 0; p < r.length; p++) {
      let h = r[p];
      if (a === 0 && l === 0) {
        if (h === Gt) {
          s.push(r.slice(c, p)), c = p + or;
          continue;
        }
        if (h === "/") {
          u = p;
          continue;
        }
      }
      h === "[" ? a++ : h === "]" ? a-- : h === "(" ? l++ : h === ")" && l--;
    }
    const i = s.length === 0 ? r : r.substring(c), d = sr(i), f = d !== i, m = u && u > c ? u - c : void 0;
    return {
      modifiers: s,
      hasImportantModifier: f,
      baseClassName: d,
      maybePostfixModifierPosition: m
    };
  };
  if (t) {
    const r = t + Gt, s = o;
    o = (a) => a.startsWith(r) ? s(a.substring(r.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: a,
      maybePostfixModifierPosition: void 0
    };
  }
  if (n) {
    const r = o;
    o = (s) => n({
      className: s,
      parseClassName: r
    });
  }
  return o;
}, sr = (e) => e.endsWith(Ut) ? e.substring(0, e.length - 1) : e.startsWith(Ut) ? e.substring(1) : e, ar = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((o) => [o, !0]));
  return (o) => {
    if (o.length <= 1)
      return o;
    const r = [];
    let s = [];
    return o.forEach((a) => {
      a[0] === "[" || t[a] ? (r.push(...s.sort(), a), s = []) : s.push(a);
    }), r.push(...s.sort()), r;
  };
}, ir = (e) => ({
  cache: nr(e.cacheSize),
  parseClassName: rr(e),
  sortModifiers: ar(e),
  ...Zo(e)
}), lr = /\s+/, cr = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: s
  } = t, a = [], l = e.trim().split(lr);
  let c = "";
  for (let u = l.length - 1; u >= 0; u -= 1) {
    const i = l[u], {
      isExternal: d,
      modifiers: f,
      hasImportantModifier: m,
      baseClassName: p,
      maybePostfixModifierPosition: h
    } = n(i);
    if (d) {
      c = i + (c.length > 0 ? " " + c : c);
      continue;
    }
    let v = !!h, y = o(v ? p.substring(0, h) : p);
    if (!y) {
      if (!v) {
        c = i + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (y = o(p), !y) {
        c = i + (c.length > 0 ? " " + c : c);
        continue;
      }
      v = !1;
    }
    const A = s(f).join(":"), w = m ? A + Ut : A, S = w + y;
    if (a.includes(S))
      continue;
    a.push(S);
    const E = r(y, v);
    for (let $ = 0; $ < E.length; ++$) {
      const B = E[$];
      a.push(w + B);
    }
    c = i + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function ur() {
  let e = 0, t, n, o = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = ro(t)) && (o && (o += " "), o += n);
  return o;
}
const ro = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = ro(e[o])) && (n && (n += " "), n += t);
  return n;
};
function dr(e, ...t) {
  let n, o, r, s = a;
  function a(c) {
    const u = t.reduce((i, d) => d(i), e());
    return n = ir(u), o = n.cache.get, r = n.cache.set, s = l, l(c);
  }
  function l(c) {
    const u = o(c);
    if (u)
      return u;
    const i = cr(c, n);
    return r(c, i), i;
  }
  return function() {
    return s(ur.apply(null, arguments));
  };
}
const U = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, so = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ao = /^\((?:(\w[\w-]*):)?(.+)\)$/i, fr = /^\d+\/\d+$/, pr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, mr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, gr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, vr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, hr = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ne = (e) => fr.test(e), R = (e) => !!e && !Number.isNaN(Number(e)), ke = (e) => !!e && Number.isInteger(Number(e)), $t = (e) => e.endsWith("%") && R(e.slice(0, -1)), be = (e) => pr.test(e), yr = () => !0, br = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  mr.test(e) && !gr.test(e)
), io = () => !1, wr = (e) => vr.test(e), xr = (e) => hr.test(e), Cr = (e) => !_(e) && !k(e), _r = (e) => He(e, uo, io), _ = (e) => so.test(e), Te = (e) => He(e, fo, br), Nt = (e) => He(e, Sr, R), On = (e) => He(e, lo, io), kr = (e) => He(e, co, xr), ut = (e) => He(e, po, wr), k = (e) => ao.test(e), Ue = (e) => Ve(e, fo), Or = (e) => Ve(e, Er), An = (e) => Ve(e, lo), Ar = (e) => Ve(e, uo), Pr = (e) => Ve(e, co), dt = (e) => Ve(e, po, !0), He = (e, t, n) => {
  const o = so.exec(e);
  return o ? o[1] ? t(o[1]) : n(o[2]) : !1;
}, Ve = (e, t, n = !1) => {
  const o = ao.exec(e);
  return o ? o[1] ? t(o[1]) : n : !1;
}, lo = (e) => e === "position" || e === "percentage", co = (e) => e === "image" || e === "url", uo = (e) => e === "length" || e === "size" || e === "bg-size", fo = (e) => e === "length", Sr = (e) => e === "number", Er = (e) => e === "family-name", po = (e) => e === "shadow", Tr = () => {
  const e = U("color"), t = U("font"), n = U("text"), o = U("font-weight"), r = U("tracking"), s = U("leading"), a = U("breakpoint"), l = U("container"), c = U("spacing"), u = U("radius"), i = U("shadow"), d = U("inset-shadow"), f = U("text-shadow"), m = U("drop-shadow"), p = U("blur"), h = U("perspective"), v = U("aspect"), y = U("ease"), A = U("animate"), w = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], E = () => [...S(), k, _], $ = () => ["auto", "hidden", "clip", "visible", "scroll"], B = () => ["auto", "contain", "none"], O = () => [k, _, c], F = () => [Ne, "full", "auto", ...O()], J = () => [ke, "none", "subgrid", k, _], ne = () => ["auto", {
    span: ["full", ke, k, _]
  }, ke, k, _], z = () => [ke, "auto", k, _], Q = () => ["auto", "min", "max", "fr", k, _], V = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], Z = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], W = () => ["auto", ...O()], j = () => [Ne, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...O()], C = () => [e, k, _], ie = () => [...S(), An, On, {
    position: [k, _]
  }], st = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], bn = () => ["auto", "cover", "contain", Ar, _r, {
    size: [k, _]
  }], Bt = () => [$t, Ue, Te], ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    k,
    _
  ], oe = () => ["", R, Ue, Te], at = () => ["solid", "dashed", "dotted", "double"], wn = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], X = () => [R, $t, An, On], xn = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    p,
    k,
    _
  ], it = () => ["none", R, k, _], lt = () => ["none", R, k, _], Rt = () => [R, k, _], ct = () => [Ne, "full", ...O()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [be],
      breakpoint: [be],
      color: [yr],
      container: [be],
      "drop-shadow": [be],
      ease: ["in", "out", "in-out"],
      font: [Cr],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [be],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [be],
      shadow: [be],
      spacing: ["px", R],
      text: [be],
      "text-shadow": [be],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", Ne, _, k, v]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [R, _, k, l]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": w()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": w()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: E()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: $()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": $()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": $()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: B()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": B()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": B()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: F()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": F()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": F()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: F()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: F()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: F()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: F()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: F()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: F()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [ke, "auto", k, _]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Ne, "full", "auto", l, ...O()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [R, Ne, "auto", "initial", "none", _]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", R, k, _]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", R, k, _]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [ke, "first", "last", "none", k, _]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": J()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ne()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": z()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": z()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": J()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ne()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": z()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": z()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": Q()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": Q()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: O()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": O()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": O()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...V(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...Z(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...Z()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...V()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...Z(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...Z(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": V()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...Z(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...Z()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: O()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: O()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: O()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: O()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: O()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: O()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: O()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: O()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: O()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: W()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: W()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: W()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: W()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: W()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: W()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: W()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: W()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: W()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": O()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": O()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: j()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [l, "screen", ...j()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          l,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...j()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          l,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [a]
          },
          ...j()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...j()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...j()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...j()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, Ue, Te]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [o, k, Nt]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", $t, _]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Or, _, t]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [r, k, _]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [R, "none", k, Nt]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          s,
          ...O()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", k, _]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", k, _]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: C()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: C()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...at(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [R, "from-font", "auto", k, Te]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: C()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [R, "auto", k, _]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: O()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", k, _]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", k, _]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: ie()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: st()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: bn()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, ke, k, _],
          radial: ["", k, _],
          conic: [ke, k, _]
        }, Pr, kr]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: C()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: Bt()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: Bt()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: Bt()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: C()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: C()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: C()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: ee()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": ee()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": ee()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": ee()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": ee()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": ee()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": ee()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": ee()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": ee()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": ee()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": ee()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": ee()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": ee()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": ee()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": ee()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: oe()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": oe()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": oe()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": oe()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": oe()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": oe()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": oe()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": oe()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": oe()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": oe()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": oe()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...at(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...at(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: C()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": C()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": C()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": C()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": C()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": C()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": C()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": C()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": C()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: C()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...at(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [R, k, _]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", R, Ue, Te]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: C()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          i,
          dt,
          ut
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: C()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", d, dt, ut]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": C()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: oe()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: C()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [R, Te]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": C()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": oe()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": C()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", f, dt, ut]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": C()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [R, k, _]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...wn(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": wn()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [R]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": X()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": X()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": C()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": C()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": X()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": X()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": C()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": C()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": X()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": X()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": C()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": C()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": X()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": X()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": C()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": C()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": X()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": X()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": C()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": C()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": X()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": X()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": C()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": C()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": X()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": X()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": C()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": C()
      }],
      "mask-image-radial": [{
        "mask-radial": [k, _]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": X()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": X()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": C()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": C()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": S()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [R]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": X()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": X()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": C()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": C()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: ie()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: st()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: bn()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", k, _]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          k,
          _
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: xn()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [R, k, _]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [R, k, _]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          m,
          dt,
          ut
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": C()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", R, k, _]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [R, k, _]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", R, k, _]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [R, k, _]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", R, k, _]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          k,
          _
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": xn()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [R, k, _]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [R, k, _]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", R, k, _]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [R, k, _]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", R, k, _]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [R, k, _]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [R, k, _]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", R, k, _]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": O()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": O()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": O()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", k, _]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [R, "initial", k, _]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", y, k, _]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [R, k, _]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", A, k, _]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [h, k, _]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": E()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: it()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": it()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": it()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": it()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: lt()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": lt()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": lt()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": lt()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: Rt()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Rt()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Rt()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [k, _, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: E()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: ct()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ct()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ct()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ct()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: C()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: C()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", k, _]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": O()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": O()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": O()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": O()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": O()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": O()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": O()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": O()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": O()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": O()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": O()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": O()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": O()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": O()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": O()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": O()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": O()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": O()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", k, _]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...C()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [R, Ue, Te, Nt]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...C()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, Dr = /* @__PURE__ */ dr(Tr);
function he(...e) {
  return Dr(no(e));
}
const Qe = /* @__PURE__ */ P({
  __name: "Card",
  props: {
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (b(), q("div", {
      "data-slot": "card",
      class: I(
        g(he)(
          "bg-card text-card-foreground flex flex-col gap-4 rounded-xl border py-4 shadow-sm",
          t.class
        )
      )
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}), et = /* @__PURE__ */ P({
  __name: "CardContent",
  props: {
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (b(), q("div", {
      "data-slot": "card-content",
      class: I(g(he)("px-5", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}), Mr = /* @__PURE__ */ P({
  name: "SimpleCard",
  __name: "SimpleCard",
  props: {
    content: {},
    contentClass: {},
    title: {},
    titleClass: {},
    description: {},
    descriptionClass: {},
    url: {}
  },
  setup(e) {
    const t = e;
    function n() {
      t.url && window.location.replace(t.url);
    }
    return (o, r) => (b(), M(Qe, { onClick: n }, {
      default: x(() => [
        N(et, null, {
          default: x(() => [
            e.title ? (b(), q("div", {
              key: 0,
              class: I(e.titleClass)
            }, [
              le("span", null, G(e.title), 1)
            ], 2)) : Y("", !0),
            e.description ? (b(), q("div", {
              key: 1,
              class: I(e.descriptionClass)
            }, [
              le("span", null, G(e.description), 1)
            ], 2)) : Y("", !0),
            e.content ? (b(), q("div", {
              key: 2,
              class: I(e.contentClass)
            }, [
              le("span", null, G(e.content), 1)
            ], 2)) : Y("", !0)
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}), Br = /* @__PURE__ */ P({
  __name: "Missing",
  props: {
    name: {}
  },
  setup(e) {
    return (t, n) => (b(), q("div", null, 'Component "' + G(e.name) + '" not found', 1));
  }
});
function We(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, o = Symbol(n);
  return [(a) => {
    const l = Io(o, a);
    if (l || l === null) return l;
    throw new Error(`Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
  }, (a) => (Fo(o, a), a)];
}
function Ae() {
  let e = document.activeElement;
  if (e == null) return null;
  for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null; ) e = e.shadowRoot.activeElement;
  return e;
}
function mo(e, t, n) {
  const o = n.originalEvent.target, r = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && o.addEventListener(e, t, { once: !0 }), o.dispatchEvent(r);
}
function an(e) {
  return e ? e.flatMap((t) => t.type === Ke ? an(t.children) : [t]) : [];
}
const [go] = We("ConfigProvider");
function Rr(e, t) {
  var n;
  const o = Ot();
  return ge(() => {
    o.value = e();
  }, {
    ...t,
    flush: (n = void 0) != null ? n : "sync"
  }), Un(o);
}
function tt(e) {
  return Gn() ? (Kn(e), !0) : !1;
}
function Lr() {
  const e = /* @__PURE__ */ new Set(), t = (s) => {
    e.delete(s);
  };
  return {
    on: (s) => {
      e.add(s);
      const a = () => t(s);
      return tt(a), {
        off: a
      };
    },
    off: t,
    trigger: (...s) => Promise.all(Array.from(e).map((a) => a(...s))),
    clear: () => {
      e.clear();
    }
  };
}
function $r(e) {
  let t = !1, n;
  const o = Xn(!0);
  return (...r) => (t || (n = o.run(() => e(...r)), t = !0), n);
}
function Nr(e) {
  let t = 0, n, o;
  const r = () => {
    t -= 1, o && t <= 0 && (o.stop(), n = void 0, o = void 0);
  };
  return (...s) => (t += 1, o || (o = Xn(!0), n = o.run(() => e(...s))), tt(r), n);
}
const Ee = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const qr = (e) => typeof e < "u", Ir = Object.prototype.toString, Fr = (e) => Ir.call(e) === "[object Object]", Pn = /* @__PURE__ */ zr();
function zr() {
  var e, t;
  return Ee && ((e = window?.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window?.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function Hr(e) {
  return Be();
}
function qt(e) {
  return Array.isArray(e) ? e : [e];
}
function Vr(e, t = 1e4) {
  return Ho((n, o) => {
    let r = te(e), s;
    const a = () => setTimeout(() => {
      r = te(e), o();
    }, te(t));
    return tt(() => {
      clearTimeout(s);
    }), {
      get() {
        return n(), r;
      },
      set(l) {
        r = l, o(), clearTimeout(s), s = a();
      }
    };
  });
}
function Wr(e, t) {
  Hr() && zo(e, t);
}
function vo(e, t, n = {}) {
  const {
    immediate: o = !0,
    immediateCallback: r = !1
  } = n, s = Ot(!1);
  let a = null;
  function l() {
    a && (clearTimeout(a), a = null);
  }
  function c() {
    s.value = !1, l();
  }
  function u(...i) {
    r && e(), l(), s.value = !0, a = setTimeout(() => {
      s.value = !1, a = null, e(...i);
    }, te(t));
  }
  return o && (s.value = !0, Ee && u()), tt(c), {
    isPending: Un(s),
    start: u,
    stop: c
  };
}
function jr(e, t, n) {
  return ae(
    e,
    t,
    {
      ...n,
      immediate: !0
    }
  );
}
const ln = Ee ? window : void 0;
function nt(e) {
  var t;
  const n = te(e);
  return (t = n?.$el) != null ? t : n;
}
function wt(...e) {
  const t = [], n = () => {
    t.forEach((l) => l()), t.length = 0;
  }, o = (l, c, u, i) => (l.addEventListener(c, u, i), () => l.removeEventListener(c, u, i)), r = T(() => {
    const l = qt(te(e[0])).filter((c) => c != null);
    return l.every((c) => typeof c != "string") ? l : void 0;
  }), s = jr(
    () => {
      var l, c;
      return [
        (c = (l = r.value) == null ? void 0 : l.map((u) => nt(u))) != null ? c : [ln].filter((u) => u != null),
        qt(te(r.value ? e[1] : e[0])),
        qt(g(r.value ? e[2] : e[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        te(r.value ? e[3] : e[2])
      ];
    },
    ([l, c, u, i]) => {
      if (n(), !l?.length || !c?.length || !u?.length)
        return;
      const d = Fr(i) ? { ...i } : i;
      t.push(
        ...l.flatMap(
          (f) => c.flatMap(
            (m) => u.map((p) => o(f, m, p, d))
          )
        )
      );
    },
    { flush: "post" }
  ), a = () => {
    s(), n();
  };
  return tt(n), a;
}
function Ur() {
  const e = Ot(!1), t = Be();
  return t && Re(() => {
    e.value = !0;
  }, t), e;
}
function Gr(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Kr(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: r = ln,
    eventName: s = "keydown",
    passive: a = !1,
    dedupe: l = !1
  } = o, c = Gr(t);
  return wt(r, s, (i) => {
    i.repeat && te(l) || c(i) && n(i);
  }, a);
}
function Xr(e) {
  return JSON.parse(JSON.stringify(e));
}
function ho(e, t, n, o = {}) {
  var r, s, a;
  const {
    clone: l = !1,
    passive: c = !1,
    eventName: u,
    deep: i = !1,
    defaultValue: d,
    shouldEmit: f
  } = o, m = Be(), p = n || m?.emit || ((r = m?.$emit) == null ? void 0 : r.bind(m)) || ((a = (s = m?.proxy) == null ? void 0 : s.$emit) == null ? void 0 : a.bind(m?.proxy));
  let h = u;
  h = h || `update:${t.toString()}`;
  const v = (w) => l ? typeof l == "function" ? l(w) : Xr(w) : w, y = () => qr(e[t]) ? v(e[t]) : d, A = (w) => {
    f ? f(w) && p(h, w) : p(h, w);
  };
  if (c) {
    const w = y(), S = L(w);
    let E = !1;
    return ae(
      () => e[t],
      ($) => {
        E || (E = !0, S.value = v($), De(() => E = !1));
      }
    ), ae(
      S,
      ($) => {
        !E && ($ !== e[t] || i) && A($);
      },
      { deep: i }
    ), S;
  } else
    return T({
      get() {
        return y();
      },
      set(w) {
        A(w);
      }
    });
}
function It(e) {
  if (e === null || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function Kt(e, t, n = ".", o) {
  if (!It(t))
    return Kt(e, {}, n, o);
  const r = Object.assign({}, t);
  for (const s in e) {
    if (s === "__proto__" || s === "constructor")
      continue;
    const a = e[s];
    a != null && (o && o(r, s, a, n) || (Array.isArray(a) && Array.isArray(r[s]) ? r[s] = [...a, ...r[s]] : It(a) && It(r[s]) ? r[s] = Kt(
      a,
      r[s],
      (n ? `${n}.` : "") + s.toString(),
      o
    ) : r[s] = a));
  }
  return r;
}
function Yr(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, o) => Kt(n, o, "", e), {})
  );
}
const Jr = Yr(), Zr = Nr(() => {
  const e = L(/* @__PURE__ */ new Map()), t = L(), n = T(() => {
    for (const a of e.value.values()) if (a) return !0;
    return !1;
  }), o = go({ scrollBody: L(!0) });
  let r = null;
  const s = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", Pn && r?.(), t.value = void 0;
  };
  return ae(n, (a, l) => {
    if (!Ee) return;
    if (!a) {
      l && s();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const c = window.innerWidth - document.documentElement.clientWidth, u = {
      padding: c,
      margin: 0
    }, i = o.scrollBody?.value ? typeof o.scrollBody.value == "object" ? Jr({
      padding: o.scrollBody.value.padding === !0 ? c : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? c : o.scrollBody.value.margin
    }, u) : u : {
      padding: 0,
      margin: 0
    };
    c > 0 && (document.body.style.paddingRight = typeof i.padding == "number" ? `${i.padding}px` : String(i.padding), document.body.style.marginRight = typeof i.margin == "number" ? `${i.margin}px` : String(i.margin), document.documentElement.style.setProperty("--scrollbar-width", `${c}px`), document.body.style.overflow = "hidden"), Pn && (r = wt(document, "touchmove", (d) => es(d), { passive: !1 })), De(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, {
    immediate: !0,
    flush: "sync"
  }), e;
});
function Qr(e) {
  const t = Math.random().toString(36).substring(2, 7), n = Zr();
  n.value.set(t, e);
  const o = T({
    get: () => n.value.get(t) ?? !1,
    set: (r) => n.value.set(t, r)
  });
  return Wr(() => {
    n.value.delete(t);
  }), o;
}
function yo(e) {
  const t = window.getComputedStyle(e);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight) return !0;
  {
    const n = e.parentNode;
    return !(n instanceof Element) || n.tagName === "BODY" ? !1 : yo(n);
  }
}
function es(e) {
  const t = e || window.event, n = t.target;
  return n instanceof Element && yo(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
function At(e) {
  const t = Be(), n = t?.type.emits, o = {};
  return n?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`), n?.forEach((r) => {
    o[Vo(Yn(r))] = (...s) => e(r, ...s);
  }), o;
}
function K() {
  const e = Be(), t = L(), n = T(() => ["#text", "#comment"].includes(t.value?.$el.nodeName) ? t.value?.$el.nextElementSibling : nt(t)), o = Object.assign({}, e.exposed), r = {};
  for (const a in e.props) Object.defineProperty(r, a, {
    enumerable: !0,
    configurable: !0,
    get: () => e.props[a]
  });
  if (Object.keys(o).length > 0) for (const a in o) Object.defineProperty(r, a, {
    enumerable: !0,
    configurable: !0,
    get: () => o[a]
  });
  Object.defineProperty(r, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => e.vnode.el
  }), e.exposed = r;
  function s(a) {
    t.value = a, a && (Object.defineProperty(r, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => a instanceof Element ? a : a.$el
    }), e.exposed = r);
  }
  return {
    forwardRef: s,
    currentRef: t,
    currentElement: n
  };
}
function cn(e) {
  const t = Be(), n = Object.keys(t?.type.props ?? {}).reduce((r, s) => {
    const a = (t?.type.props[s]).default;
    return a !== void 0 && (r[s] = a), r;
  }, {}), o = Wo(e);
  return T(() => {
    const r = {}, s = t?.vnode.props ?? {};
    return Object.keys(s).forEach((a) => {
      r[Yn(a)] = s[a];
    }), Object.keys({
      ...n,
      ...r
    }).reduce((a, l) => (o.value[l] !== void 0 && (a[l] = o.value[l]), a), {});
  });
}
function ot(e, t) {
  const n = cn(e), o = t ? At(t) : {};
  return T(() => ({
    ...n.value,
    ...o
  }));
}
function ts(e, t) {
  const n = Vr(!1, 300), o = L(null), r = Lr();
  function s() {
    o.value = null, n.value = !1;
  }
  function a(l, c) {
    const u = l.currentTarget, i = {
      x: l.clientX,
      y: l.clientY
    }, d = ns(i, u.getBoundingClientRect()), f = os(i, d), m = rs(c.getBoundingClientRect()), p = as([...f, ...m]);
    o.value = p, n.value = !0;
  }
  return ge((l) => {
    if (e.value && t.value) {
      const c = (i) => a(i, t.value), u = (i) => a(i, e.value);
      e.value.addEventListener("pointerleave", c), t.value.addEventListener("pointerleave", u), l(() => {
        e.value?.removeEventListener("pointerleave", c), t.value?.removeEventListener("pointerleave", u);
      });
    }
  }), ge((l) => {
    if (o.value) {
      const c = (u) => {
        if (!o.value || !(u.target instanceof HTMLElement)) return;
        const i = u.target, d = {
          x: u.clientX,
          y: u.clientY
        }, f = e.value?.contains(i) || t.value?.contains(i), m = !ss(d, o.value), p = !!i.closest("[data-grace-area-trigger]");
        f ? s() : (m || p) && (s(), r.trigger());
      };
      e.value?.ownerDocument.addEventListener("pointermove", c), l(() => e.value?.ownerDocument.removeEventListener("pointermove", c));
    }
  }), {
    isPointerInTransit: n,
    onPointerExit: r.on
  };
}
function ns(e, t) {
  const n = Math.abs(t.top - e.y), o = Math.abs(t.bottom - e.y), r = Math.abs(t.right - e.x), s = Math.abs(t.left - e.x);
  switch (Math.min(n, o, r, s)) {
    case s:
      return "left";
    case r:
      return "right";
    case n:
      return "top";
    case o:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function os(e, t, n = 5) {
  const o = [];
  switch (t) {
    case "top":
      o.push({
        x: e.x - n,
        y: e.y + n
      }, {
        x: e.x + n,
        y: e.y + n
      });
      break;
    case "bottom":
      o.push({
        x: e.x - n,
        y: e.y - n
      }, {
        x: e.x + n,
        y: e.y - n
      });
      break;
    case "left":
      o.push({
        x: e.x + n,
        y: e.y - n
      }, {
        x: e.x + n,
        y: e.y + n
      });
      break;
    case "right":
      o.push({
        x: e.x - n,
        y: e.y - n
      }, {
        x: e.x - n,
        y: e.y + n
      });
      break;
  }
  return o;
}
function rs(e) {
  const { top: t, right: n, bottom: o, left: r } = e;
  return [
    {
      x: r,
      y: t
    },
    {
      x: n,
      y: t
    },
    {
      x: n,
      y: o
    },
    {
      x: r,
      y: o
    }
  ];
}
function ss(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let s = 0, a = t.length - 1; s < t.length; a = s++) {
    const l = t[s].x, c = t[s].y, u = t[a].x, i = t[a].y;
    c > o != i > o && n < (u - l) * (o - c) / (i - c) + l && (r = !r);
  }
  return r;
}
function as(e) {
  const t = e.slice();
  return t.sort((n, o) => n.x < o.x ? -1 : n.x > o.x ? 1 : n.y < o.y ? -1 : n.y > o.y ? 1 : 0), is(t);
}
function is(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    for (; t.length >= 2; ) {
      const s = t[t.length - 1], a = t[t.length - 2];
      if ((s.x - a.x) * (r.y - a.y) >= (s.y - a.y) * (r.x - a.x)) t.pop();
      else break;
    }
    t.push(r);
  }
  t.pop();
  const n = [];
  for (let o = e.length - 1; o >= 0; o--) {
    const r = e[o];
    for (; n.length >= 2; ) {
      const s = n[n.length - 1], a = n[n.length - 2];
      if ((s.x - a.x) * (r.y - a.y) >= (s.y - a.y) * (r.x - a.x)) n.pop();
      else break;
    }
    n.push(r);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var ls = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, qe = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ new WeakMap(), pt = {}, Ft = 0, bo = function(e) {
  return e && (e.host || bo(e.parentNode));
}, cs = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = bo(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, us = function(e, t, n, o) {
  var r = cs(t, Array.isArray(e) ? e : [e]);
  pt[n] || (pt[n] = /* @__PURE__ */ new WeakMap());
  var s = pt[n], a = [], l = /* @__PURE__ */ new Set(), c = new Set(r), u = function(d) {
    !d || l.has(d) || (l.add(d), u(d.parentNode));
  };
  r.forEach(u);
  var i = function(d) {
    !d || c.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (l.has(f))
        i(f);
      else
        try {
          var m = f.getAttribute(o), p = m !== null && m !== "false", h = (qe.get(f) || 0) + 1, v = (s.get(f) || 0) + 1;
          qe.set(f, h), s.set(f, v), a.push(f), h === 1 && p && ft.set(f, !0), v === 1 && f.setAttribute(n, "true"), p || f.setAttribute(o, "true");
        } catch (y) {
          console.error("aria-hidden: cannot operate on ", f, y);
        }
    });
  };
  return i(t), l.clear(), Ft++, function() {
    a.forEach(function(d) {
      var f = qe.get(d) - 1, m = s.get(d) - 1;
      qe.set(d, f), s.set(d, m), f || (ft.has(d) || d.removeAttribute(o), ft.delete(d)), m || d.removeAttribute(n);
    }), Ft--, Ft || (qe = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ new WeakMap(), pt = {});
  };
}, ds = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = ls(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), us(o, r, n, "aria-hidden")) : function() {
    return null;
  };
};
function fs(e) {
  let t;
  ae(() => nt(e), (n) => {
    n ? t = ds(n) : t && t();
  }), Jn(() => {
    t && t();
  });
}
let ps = 0;
function xt(e, t = "reka") {
  if ("useId" in Cn) return `${t}-${Cn.useId?.()}`;
  const n = go({ useId: void 0 });
  return n.useId ? `${t}-${n.useId()}` : `${t}-${++ps}`;
}
function ms(e) {
  const t = L(), n = T(() => t.value?.width ?? 0), o = T(() => t.value?.height ?? 0);
  return Re(() => {
    const r = nt(e);
    if (r) {
      t.value = {
        width: r.offsetWidth,
        height: r.offsetHeight
      };
      const s = new ResizeObserver((a) => {
        if (!Array.isArray(a) || !a.length) return;
        const l = a[0];
        let c, u;
        if ("borderBoxSize" in l) {
          const i = l.borderBoxSize, d = Array.isArray(i) ? i[0] : i;
          c = d.inlineSize, u = d.blockSize;
        } else
          c = r.offsetWidth, u = r.offsetHeight;
        t.value = {
          width: c,
          height: u
        };
      });
      return s.observe(r, { box: "border-box" }), () => s.unobserve(r);
    } else t.value = void 0;
  }), {
    width: n,
    height: o
  };
}
function gs(e, t) {
  const n = L(e);
  function o(s) {
    return t[n.value][s] ?? n.value;
  }
  return {
    state: n,
    dispatch: (s) => {
      n.value = o(s);
    }
  };
}
function vs(e, t) {
  const n = L({}), o = L("none"), r = L(e), s = e.value ? "mounted" : "unmounted";
  let a;
  const l = t.value?.ownerDocument.defaultView ?? ln, { state: c, dispatch: u } = gs(s, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: { MOUNT: "mounted" }
  }), i = (v) => {
    if (Ee) {
      const y = new CustomEvent(v, {
        bubbles: !1,
        cancelable: !1
      });
      t.value?.dispatchEvent(y);
    }
  };
  ae(e, async (v, y) => {
    const A = y !== v;
    if (await De(), A) {
      const w = o.value, S = mt(t.value);
      v ? (u("MOUNT"), i("enter"), S === "none" && i("after-enter")) : S === "none" || S === "undefined" || n.value?.display === "none" ? (u("UNMOUNT"), i("leave"), i("after-leave")) : y && w !== S ? (u("ANIMATION_OUT"), i("leave")) : (u("UNMOUNT"), i("after-leave"));
    }
  }, { immediate: !0 });
  const d = (v) => {
    const y = mt(t.value), A = y.includes(CSS.escape(v.animationName)), w = c.value === "mounted" ? "enter" : "leave";
    if (v.target === t.value && A && (i(`after-${w}`), u("ANIMATION_END"), !r.value)) {
      const S = t.value.style.animationFillMode;
      t.value.style.animationFillMode = "forwards", a = l?.setTimeout(() => {
        t.value?.style.animationFillMode === "forwards" && (t.value.style.animationFillMode = S);
      });
    }
    v.target === t.value && y === "none" && u("ANIMATION_END");
  }, f = (v) => {
    v.target === t.value && (o.value = mt(t.value));
  }, m = ae(t, (v, y) => {
    v ? (n.value = getComputedStyle(v), v.addEventListener("animationstart", f), v.addEventListener("animationcancel", d), v.addEventListener("animationend", d)) : (u("ANIMATION_END"), a !== void 0 && l?.clearTimeout(a), y?.removeEventListener("animationstart", f), y?.removeEventListener("animationcancel", d), y?.removeEventListener("animationend", d));
  }, { immediate: !0 }), p = ae(c, () => {
    const v = mt(t.value);
    o.value = c.value === "mounted" ? v : "none";
  });
  return Jn(() => {
    m(), p();
  }), { isPresent: T(() => ["mounted", "unmountSuspended"].includes(c.value)) };
}
function mt(e) {
  return e && getComputedStyle(e).animationName || "none";
}
var un = P({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: !0
    },
    forceMount: { type: Boolean }
  },
  slots: {},
  setup(e, { slots: t, expose: n }) {
    const { present: o, forceMount: r } = Xe(e), s = L(), { isPresent: a } = vs(o, s);
    n({ present: a });
    let l = t.default({ present: a.value });
    l = an(l || []);
    const c = Be();
    if (l && l?.length > 1) {
      const u = c?.parent?.type.name ? `<${c.parent.type.name} />` : "component";
      throw new Error([
        `Detected an invalid children for \`${u}\` for  \`Presence\` component.`,
        "",
        "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
        "You can apply a few solutions:",
        ["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((i) => `  - ${i}`).join(`
`)
      ].join(`
`));
    }
    return () => r.value || o.value || a.value ? ce(t.default({ present: a.value })[0], { ref: (u) => {
      const i = nt(u);
      return typeof i?.hasAttribute > "u" || (i?.hasAttribute("data-reka-popper-content-wrapper") ? s.value = i.firstElementChild : s.value = i), i;
    } }) : null;
  }
});
const hs = P({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      if (!n.default) return null;
      const o = an(n.default()), r = o.findIndex((c) => c.type !== Zn);
      if (r === -1) return o;
      const s = o[r];
      delete s.props?.ref;
      const a = s.props ? H(t, s.props) : t, l = jo({
        ...s,
        props: {}
      }, a);
      return o.length === 1 ? l : (o[r] = l, o);
    };
  }
}), ys = [
  "area",
  "img",
  "input"
], fe = P({
  name: "Primitive",
  inheritAttrs: !1,
  props: {
    asChild: {
      type: Boolean,
      default: !1
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(e, { attrs: t, slots: n }) {
    const o = e.asChild ? "template" : e.as;
    return typeof o == "string" && ys.includes(o) ? () => ce(o, t) : o !== "template" ? () => ce(e.as, t, { default: n.default }) : () => ce(hs, t, { default: n.default });
  }
}), [_e, bs] = We("DialogRoot");
var ws = /* @__PURE__ */ P({
  inheritAttrs: !1,
  __name: "DialogRoot",
  props: {
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      required: !1,
      default: !1
    },
    modal: {
      type: Boolean,
      required: !1,
      default: !0
    }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, r = ho(n, "open", t, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), s = L(), a = L(), { modal: l } = Xe(n);
    return bs({
      open: r,
      modal: l,
      openModal: () => {
        r.value = !0;
      },
      onOpenChange: (c) => {
        r.value = c;
      },
      onOpenToggle: () => {
        r.value = !r.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement: s,
      contentElement: a
    }), (c, u) => D(c.$slots, "default", {
      open: g(r),
      close: () => r.value = !1
    });
  }
}), xs = ws, Cs = /* @__PURE__ */ P({
  __name: "DialogClose",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const t = e;
    K();
    const n = _e();
    return (o, r) => (b(), M(g(fe), H(t, {
      type: o.as === "button" ? "button" : void 0,
      onClick: r[0] || (r[0] = (s) => g(n).onOpenChange(!1))
    }), {
      default: x(() => [D(o.$slots, "default")]),
      _: 3
    }, 16, ["type"]));
  }
}), wo = Cs;
const _s = "dismissableLayer.pointerDownOutside", ks = "dismissableLayer.focusOutside";
function xo(e, t) {
  const n = t.closest("[data-dismissable-layer]"), o = e.dataset.dismissableLayer === "" ? e : e.querySelector("[data-dismissable-layer]"), r = Array.from(e.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
  return !!(n && (o === n || r.indexOf(o) < r.indexOf(n)));
}
function Os(e, t, n = !0) {
  const o = t?.value?.ownerDocument ?? globalThis?.document, r = L(!1), s = L(() => {
  });
  return ge((a) => {
    if (!Ee || !te(n)) return;
    const l = async (u) => {
      const i = u.target;
      if (!(!t?.value || !i)) {
        if (xo(t.value, i)) {
          r.value = !1;
          return;
        }
        if (u.target && !r.value) {
          let f = function() {
            mo(_s, e, d);
          };
          const d = { originalEvent: u };
          u.pointerType === "touch" ? (o.removeEventListener("click", s.value), s.value = f, o.addEventListener("click", s.value, { once: !0 })) : f();
        } else o.removeEventListener("click", s.value);
        r.value = !1;
      }
    }, c = window.setTimeout(() => {
      o.addEventListener("pointerdown", l);
    }, 0);
    a(() => {
      window.clearTimeout(c), o.removeEventListener("pointerdown", l), o.removeEventListener("click", s.value);
    });
  }), { onPointerDownCapture: () => {
    te(n) && (r.value = !0);
  } };
}
function As(e, t, n = !0) {
  const o = t?.value?.ownerDocument ?? globalThis?.document, r = L(!1);
  return ge((s) => {
    if (!Ee || !te(n)) return;
    const a = async (l) => {
      if (!t?.value) return;
      await De(), await De();
      const c = l.target;
      !t.value || !c || xo(t.value, c) || l.target && !r.value && mo(ks, e, { originalEvent: l });
    };
    o.addEventListener("focusin", a), s(() => o.removeEventListener("focusin", a));
  }), {
    onFocusCapture: () => {
      te(n) && (r.value = !0);
    },
    onBlurCapture: () => {
      te(n) && (r.value = !1);
    }
  };
}
const we = yt({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var Ps = /* @__PURE__ */ P({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1,
      default: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "dismiss"
  ],
  setup(e, { emit: t }) {
    const n = e, o = t, { forwardRef: r, currentElement: s } = K(), a = T(() => s.value?.ownerDocument ?? globalThis.document), l = T(() => we.layersRoot), c = T(() => s.value ? Array.from(l.value).indexOf(s.value) : -1), u = T(() => we.layersWithOutsidePointerEventsDisabled.size > 0), i = T(() => {
      const p = Array.from(l.value), [h] = [...we.layersWithOutsidePointerEventsDisabled].slice(-1), v = p.indexOf(h);
      return c.value >= v;
    }), d = Os(async (p) => {
      const h = [...we.branches].some((v) => v?.contains(p.target));
      !i.value || h || (o("pointerDownOutside", p), o("interactOutside", p), await De(), p.defaultPrevented || o("dismiss"));
    }, s), f = As((p) => {
      [...we.branches].some((v) => v?.contains(p.target)) || (o("focusOutside", p), o("interactOutside", p), p.defaultPrevented || o("dismiss"));
    }, s);
    Kr("Escape", (p) => {
      c.value === l.value.size - 1 && (o("escapeKeyDown", p), p.defaultPrevented || o("dismiss"));
    });
    let m;
    return ge((p) => {
      s.value && (n.disableOutsidePointerEvents && (we.layersWithOutsidePointerEventsDisabled.size === 0 && (m = a.value.body.style.pointerEvents, a.value.body.style.pointerEvents = "none"), we.layersWithOutsidePointerEventsDisabled.add(s.value)), l.value.add(s.value), p(() => {
        n.disableOutsidePointerEvents && we.layersWithOutsidePointerEventsDisabled.size === 1 && (a.value.body.style.pointerEvents = m);
      }));
    }), ge((p) => {
      p(() => {
        s.value && (l.value.delete(s.value), we.layersWithOutsidePointerEventsDisabled.delete(s.value));
      });
    }), (p, h) => (b(), M(g(fe), {
      ref: g(r),
      "as-child": p.asChild,
      as: p.as,
      "data-dismissable-layer": "",
      style: bt({ pointerEvents: u.value ? i.value ? "auto" : "none" : void 0 }),
      onFocusCapture: g(f).onFocusCapture,
      onBlurCapture: g(f).onBlurCapture,
      onPointerdownCapture: g(d).onPointerDownCapture
    }, {
      default: x(() => [D(p.$slots, "default")]),
      _: 3
    }, 8, [
      "as-child",
      "as",
      "style",
      "onFocusCapture",
      "onBlurCapture",
      "onPointerdownCapture"
    ]));
  }
}), Co = Ps;
const Ss = $r(() => L([]));
function Es() {
  const e = Ss();
  return {
    add(t) {
      const n = e.value[0];
      t !== n && n?.pause(), e.value = Sn(e.value, t), e.value.unshift(t);
    },
    remove(t) {
      e.value = Sn(e.value, t), e.value[0]?.resume();
    }
  };
}
function Sn(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function Ts(e) {
  return e.filter((t) => t.tagName !== "A");
}
const zt = "focusScope.autoFocusOnMount", Ht = "focusScope.autoFocusOnUnmount", En = {
  bubbles: !1,
  cancelable: !0
};
function Ds(e, { select: t = !1 } = {}) {
  const n = Ae();
  for (const o of e)
    if (Oe(o, { select: t }), Ae() !== n) return !0;
}
function Ms(e) {
  const t = _o(e), n = Tn(t, e), o = Tn(t.reverse(), e);
  return [n, o];
}
function _o(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (o) => {
    const r = o.tagName === "INPUT" && o.type === "hidden";
    return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Tn(e, t) {
  for (const n of e) if (!Bs(n, { upTo: t })) return n;
}
function Bs(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Rs(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Oe(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = Ae();
    e.focus({ preventScroll: !0 }), e !== n && Rs(e) && t && e.select();
  }
}
var Ls = /* @__PURE__ */ P({
  __name: "FocusScope",
  props: {
    loop: {
      type: Boolean,
      required: !1,
      default: !1
    },
    trapped: {
      type: Boolean,
      required: !1,
      default: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, { currentRef: r, currentElement: s } = K(), a = L(null), l = Es(), c = yt({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    ge((i) => {
      if (!Ee) return;
      const d = s.value;
      if (!n.trapped) return;
      function f(v) {
        if (c.paused || !d) return;
        const y = v.target;
        d.contains(y) ? a.value = y : Oe(a.value, { select: !0 });
      }
      function m(v) {
        if (c.paused || !d) return;
        const y = v.relatedTarget;
        y !== null && (d.contains(y) || Oe(a.value, { select: !0 }));
      }
      function p(v) {
        d.contains(a.value) || Oe(d);
      }
      document.addEventListener("focusin", f), document.addEventListener("focusout", m);
      const h = new MutationObserver(p);
      d && h.observe(d, {
        childList: !0,
        subtree: !0
      }), i(() => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", m), h.disconnect();
      });
    }), ge(async (i) => {
      const d = s.value;
      if (await De(), !d) return;
      l.add(c);
      const f = Ae();
      if (!d.contains(f)) {
        const p = new CustomEvent(zt, En);
        d.addEventListener(zt, (h) => o("mountAutoFocus", h)), d.dispatchEvent(p), p.defaultPrevented || (Ds(Ts(_o(d)), { select: !0 }), Ae() === f && Oe(d));
      }
      i(() => {
        d.removeEventListener(zt, (v) => o("mountAutoFocus", v));
        const p = new CustomEvent(Ht, En), h = (v) => {
          o("unmountAutoFocus", v);
        };
        d.addEventListener(Ht, h), d.dispatchEvent(p), setTimeout(() => {
          p.defaultPrevented || Oe(f ?? document.body, { select: !0 }), d.removeEventListener(Ht, h), l.remove(c);
        }, 0);
      });
    });
    function u(i) {
      if (!n.loop && !n.trapped || c.paused) return;
      const d = i.key === "Tab" && !i.altKey && !i.ctrlKey && !i.metaKey, f = Ae();
      if (d && f) {
        const m = i.currentTarget, [p, h] = Ms(m);
        p && h ? !i.shiftKey && f === h ? (i.preventDefault(), n.loop && Oe(p, { select: !0 })) : i.shiftKey && f === p && (i.preventDefault(), n.loop && Oe(h, { select: !0 })) : f === m && i.preventDefault();
      }
    }
    return (i, d) => (b(), M(g(fe), {
      ref_key: "currentRef",
      ref: r,
      tabindex: "-1",
      "as-child": i.asChild,
      as: i.as,
      onKeydown: u
    }, {
      default: x(() => [D(i.$slots, "default")]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
}), $s = Ls;
function Ns(e) {
  return e ? "open" : "closed";
}
const qs = "DialogTitle", Is = "DialogContent";
function Fs({ titleName: e = qs, contentName: t = Is, componentLink: n = "dialog.html#title", titleId: o, descriptionId: r, contentElement: s }) {
  const a = `Warning: \`${t}\` requires a \`${e}\` for the component to be accessible for screen reader users.

If you want to hide the \`${e}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.reka-ui.com/docs/components/${n}`, l = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${t}.`;
  Re(() => {
    document.getElementById(o) || console.warn(a);
    const u = s.value?.getAttribute("aria-describedby");
    r && u && (document.getElementById(r) || console.warn(l));
  });
}
var zs = /* @__PURE__ */ P({
  __name: "DialogContentImpl",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    trapFocus: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: t }) {
    const n = e, o = t, r = _e(), { forwardRef: s, currentElement: a } = K();
    return r.titleId ||= xt(void 0, "reka-dialog-title"), r.descriptionId ||= xt(void 0, "reka-dialog-description"), Re(() => {
      r.contentElement = a, Ae() !== document.body && (r.triggerElement.value = Ae());
    }), process.env.NODE_ENV !== "production" && Fs({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: r.titleId,
      descriptionId: r.descriptionId,
      contentElement: a
    }), (l, c) => (b(), M(g($s), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: c[5] || (c[5] = (u) => o("openAutoFocus", u)),
      onUnmountAutoFocus: c[6] || (c[6] = (u) => o("closeAutoFocus", u))
    }, {
      default: x(() => [N(g(Co), H({
        id: g(r).contentId,
        ref: g(s),
        as: l.as,
        "as-child": l.asChild,
        "disable-outside-pointer-events": l.disableOutsidePointerEvents,
        role: "dialog",
        "aria-describedby": g(r).descriptionId,
        "aria-labelledby": g(r).titleId,
        "data-state": g(Ns)(g(r).open.value)
      }, l.$attrs, {
        onDismiss: c[0] || (c[0] = (u) => g(r).onOpenChange(!1)),
        onEscapeKeyDown: c[1] || (c[1] = (u) => o("escapeKeyDown", u)),
        onFocusOutside: c[2] || (c[2] = (u) => o("focusOutside", u)),
        onInteractOutside: c[3] || (c[3] = (u) => o("interactOutside", u)),
        onPointerDownOutside: c[4] || (c[4] = (u) => o("pointerDownOutside", u))
      }), {
        default: x(() => [D(l.$slots, "default")]),
        _: 3
      }, 16, [
        "id",
        "as",
        "as-child",
        "disable-outside-pointer-events",
        "aria-describedby",
        "aria-labelledby",
        "data-state"
      ])]),
      _: 3
    }, 8, ["trapped"]));
  }
}), ko = zs, Hs = /* @__PURE__ */ P({
  __name: "DialogContentModal",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    trapFocus: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: t }) {
    const n = e, o = t, r = _e(), s = At(o), { forwardRef: a, currentElement: l } = K();
    return fs(l), (c, u) => (b(), M(ko, H({
      ...n,
      ...g(s)
    }, {
      ref: g(a),
      "trap-focus": g(r).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: u[0] || (u[0] = (i) => {
        i.defaultPrevented || (i.preventDefault(), g(r).triggerElement.value?.focus());
      }),
      onPointerDownOutside: u[1] || (u[1] = (i) => {
        const d = i.detail.originalEvent, f = d.button === 0 && d.ctrlKey === !0;
        (d.button === 2 || f) && i.preventDefault();
      }),
      onFocusOutside: u[2] || (u[2] = (i) => {
        i.preventDefault();
      })
    }), {
      default: x(() => [D(c.$slots, "default")]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Vs = Hs, Ws = /* @__PURE__ */ P({
  __name: "DialogContentNonModal",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    trapFocus: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: t }) {
    const n = e, r = At(t);
    K();
    const s = _e(), a = L(!1), l = L(!1);
    return (c, u) => (b(), M(ko, H({
      ...n,
      ...g(r)
    }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: u[0] || (u[0] = (i) => {
        i.defaultPrevented || (a.value || g(s).triggerElement.value?.focus(), i.preventDefault()), a.value = !1, l.value = !1;
      }),
      onInteractOutside: u[1] || (u[1] = (i) => {
        i.defaultPrevented || (a.value = !0, i.detail.originalEvent.type === "pointerdown" && (l.value = !0));
        const d = i.target;
        g(s).triggerElement.value?.contains(d) && i.preventDefault(), i.detail.originalEvent.type === "focusin" && l.value && i.preventDefault();
      })
    }), {
      default: x(() => [D(c.$slots, "default")]),
      _: 3
    }, 16));
  }
}), js = Ws, Us = /* @__PURE__ */ P({
  __name: "DialogContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: t }) {
    const n = e, o = t, r = _e(), s = At(o), { forwardRef: a } = K();
    return (l, c) => (b(), M(g(un), { present: l.forceMount || g(r).open.value }, {
      default: x(() => [g(r).modal.value ? (b(), M(Vs, H({
        key: 0,
        ref: g(a)
      }, {
        ...n,
        ...g(s),
        ...l.$attrs
      }), {
        default: x(() => [D(l.$slots, "default")]),
        _: 3
      }, 16)) : (b(), M(js, H({
        key: 1,
        ref: g(a)
      }, {
        ...n,
        ...g(s),
        ...l.$attrs
      }), {
        default: x(() => [D(l.$slots, "default")]),
        _: 3
      }, 16))]),
      _: 3
    }, 8, ["present"]));
  }
}), Gs = Us, Ks = /* @__PURE__ */ P({
  __name: "DialogOverlayImpl",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = _e();
    return Qr(!0), K(), (n, o) => (b(), M(g(fe), {
      as: n.as,
      "as-child": n.asChild,
      "data-state": g(t).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: x(() => [D(n.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-state"
    ]));
  }
}), Xs = Ks, Ys = /* @__PURE__ */ P({
  __name: "DialogOverlay",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = _e(), { forwardRef: n } = K();
    return (o, r) => g(t)?.modal.value ? (b(), M(g(un), {
      key: 0,
      present: o.forceMount || g(t).open.value
    }, {
      default: x(() => [N(Xs, H(o.$attrs, {
        ref: g(n),
        as: o.as,
        "as-child": o.asChild
      }), {
        default: x(() => [D(o.$slots, "default")]),
        _: 3
      }, 16, ["as", "as-child"])]),
      _: 3
    }, 8, ["present"])) : Y("v-if", !0);
  }
}), Js = Ys, Zs = /* @__PURE__ */ P({
  __name: "Teleport",
  props: {
    to: {
      type: null,
      required: !1,
      default: "body"
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const t = Ur();
    return (n, o) => g(t) || n.forceMount ? (b(), M(Uo, {
      key: 0,
      to: n.to,
      disabled: n.disabled,
      defer: n.defer
    }, [D(n.$slots, "default")], 8, [
      "to",
      "disabled",
      "defer"
    ])) : Y("v-if", !0);
  }
}), Oo = Zs, Qs = /* @__PURE__ */ P({
  __name: "DialogPortal",
  props: {
    to: {
      type: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const t = e;
    return (n, o) => (b(), M(g(Oo), nn(on(t)), {
      default: x(() => [D(n.$slots, "default")]),
      _: 3
    }, 16));
  }
}), ea = Qs, ta = /* @__PURE__ */ P({
  __name: "DialogTitle",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "h2"
    }
  },
  setup(e) {
    const t = e, n = _e();
    return K(), (o, r) => (b(), M(g(fe), H(t, { id: g(n).titleId }), {
      default: x(() => [D(o.$slots, "default")]),
      _: 3
    }, 16, ["id"]));
  }
}), na = ta, oa = /* @__PURE__ */ P({
  __name: "DialogTrigger",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const t = e, n = _e(), { forwardRef: o, currentElement: r } = K();
    return n.contentId ||= xt(void 0, "reka-dialog-content"), Re(() => {
      n.triggerElement.value = r.value;
    }), (s, a) => (b(), M(g(fe), H(t, {
      ref: g(o),
      type: s.as === "button" ? "button" : void 0,
      "aria-haspopup": "dialog",
      "aria-expanded": g(n).open.value || !1,
      "aria-controls": g(n).open.value ? g(n).contentId : void 0,
      "data-state": g(n).open.value ? "open" : "closed",
      onClick: g(n).onOpenToggle
    }), {
      default: x(() => [D(s.$slots, "default")]),
      _: 3
    }, 16, [
      "type",
      "aria-expanded",
      "aria-controls",
      "data-state",
      "onClick"
    ]));
  }
}), ra = oa, sa = /* @__PURE__ */ P({
  __name: "VisuallyHidden",
  props: {
    feature: {
      type: String,
      required: !1,
      default: "focusable"
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    return (t, n) => (b(), M(g(fe), {
      as: t.as,
      "as-child": t.asChild,
      "aria-hidden": t.feature === "focusable" ? "true" : void 0,
      "data-hidden": t.feature === "fully-hidden" ? "" : void 0,
      tabindex: t.feature === "fully-hidden" ? "-1" : void 0,
      style: {
        position: "absolute",
        border: 0,
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
        wordWrap: "normal",
        top: "-1px",
        left: "-1px"
      }
    }, {
      default: x(() => [D(t.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "aria-hidden",
      "data-hidden",
      "tabindex"
    ]));
  }
}), aa = sa;
const [Ao, ia] = We("PopperRoot");
var la = /* @__PURE__ */ P({
  inheritAttrs: !1,
  __name: "PopperRoot",
  setup(e) {
    const t = L();
    return ia({
      anchor: t,
      onAnchorChange: (n) => t.value = n
    }), (n, o) => D(n.$slots, "default");
  }
}), ca = la, ua = /* @__PURE__ */ P({
  __name: "PopperAnchor",
  props: {
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const t = e, { forwardRef: n, currentElement: o } = K(), r = Ao();
    return Qn(() => {
      r.onAnchorChange(t.reference ?? o.value);
    }), (s, a) => (b(), M(g(fe), {
      ref: g(n),
      as: s.as,
      "as-child": s.asChild
    }, {
      default: x(() => [D(s.$slots, "default")]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), da = ua;
function fa(e) {
  return e !== null;
}
function pa(e) {
  return {
    name: "transformOrigin",
    options: e,
    fn(t) {
      const { placement: n, rects: o, middlewareData: r } = t, a = r.arrow?.centerOffset !== 0, l = a ? 0 : e.arrowWidth, c = a ? 0 : e.arrowHeight, [u, i] = Xt(n), d = {
        start: "0%",
        center: "50%",
        end: "100%"
      }[i], f = (r.arrow?.x ?? 0) + l / 2, m = (r.arrow?.y ?? 0) + c / 2;
      let p = "", h = "";
      return u === "bottom" ? (p = a ? d : `${f}px`, h = `${-c}px`) : u === "top" ? (p = a ? d : `${f}px`, h = `${o.floating.height + c}px`) : u === "right" ? (p = `${-c}px`, h = a ? d : `${m}px`) : u === "left" && (p = `${o.floating.width + c}px`, h = a ? d : `${m}px`), { data: {
        x: p,
        y: h
      } };
    }
  };
}
function Xt(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
const ma = ["top", "right", "bottom", "left"], Pe = Math.min, re = Math.max, Ct = Math.round, gt = Math.floor, me = (e) => ({
  x: e,
  y: e
}), ga = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, va = {
  start: "end",
  end: "start"
};
function Yt(e, t, n) {
  return re(e, Pe(t, n));
}
function xe(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ce(e) {
  return e.split("-")[0];
}
function je(e) {
  return e.split("-")[1];
}
function dn(e) {
  return e === "x" ? "y" : "x";
}
function fn(e) {
  return e === "y" ? "height" : "width";
}
const ha = /* @__PURE__ */ new Set(["top", "bottom"]);
function pe(e) {
  return ha.has(Ce(e)) ? "y" : "x";
}
function pn(e) {
  return dn(pe(e));
}
function ya(e, t, n) {
  n === void 0 && (n = !1);
  const o = je(e), r = pn(e), s = fn(r);
  let a = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = _t(a)), [a, _t(a)];
}
function ba(e) {
  const t = _t(e);
  return [Jt(e), t, Jt(t)];
}
function Jt(e) {
  return e.replace(/start|end/g, (t) => va[t]);
}
const Dn = ["left", "right"], Mn = ["right", "left"], wa = ["top", "bottom"], xa = ["bottom", "top"];
function Ca(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Mn : Dn : t ? Dn : Mn;
    case "left":
    case "right":
      return t ? wa : xa;
    default:
      return [];
  }
}
function _a(e, t, n, o) {
  const r = je(e);
  let s = Ca(Ce(e), n === "start", o);
  return r && (s = s.map((a) => a + "-" + r), t && (s = s.concat(s.map(Jt)))), s;
}
function _t(e) {
  return e.replace(/left|right|bottom|top/g, (t) => ga[t]);
}
function ka(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Po(e) {
  return typeof e != "number" ? ka(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function kt(e) {
  const {
    x: t,
    y: n,
    width: o,
    height: r
  } = e;
  return {
    width: o,
    height: r,
    top: n,
    left: t,
    right: t + o,
    bottom: n + r,
    x: t,
    y: n
  };
}
function Bn(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const s = pe(t), a = pn(t), l = fn(a), c = Ce(t), u = s === "y", i = o.x + o.width / 2 - r.width / 2, d = o.y + o.height / 2 - r.height / 2, f = o[l] / 2 - r[l] / 2;
  let m;
  switch (c) {
    case "top":
      m = {
        x: i,
        y: o.y - r.height
      };
      break;
    case "bottom":
      m = {
        x: i,
        y: o.y + o.height
      };
      break;
    case "right":
      m = {
        x: o.x + o.width,
        y: d
      };
      break;
    case "left":
      m = {
        x: o.x - r.width,
        y: d
      };
      break;
    default:
      m = {
        x: o.x,
        y: o.y
      };
  }
  switch (je(t)) {
    case "start":
      m[a] -= f * (n && u ? -1 : 1);
      break;
    case "end":
      m[a] += f * (n && u ? -1 : 1);
      break;
  }
  return m;
}
const Oa = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: s = [],
    platform: a
  } = n, l = s.filter(Boolean), c = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let u = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: i,
    y: d
  } = Bn(u, o, c), f = o, m = {}, p = 0;
  for (let h = 0; h < l.length; h++) {
    const {
      name: v,
      fn: y
    } = l[h], {
      x: A,
      y: w,
      data: S,
      reset: E
    } = await y({
      x: i,
      y: d,
      initialPlacement: o,
      placement: f,
      strategy: r,
      middlewareData: m,
      rects: u,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    i = A ?? i, d = w ?? d, m = {
      ...m,
      [v]: {
        ...m[v],
        ...S
      }
    }, E && p <= 50 && (p++, typeof E == "object" && (E.placement && (f = E.placement), E.rects && (u = E.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : E.rects), {
      x: i,
      y: d
    } = Bn(u, f, c)), h = -1);
  }
  return {
    x: i,
    y: d,
    placement: f,
    strategy: r,
    middlewareData: m
  };
};
async function Je(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: r,
    platform: s,
    rects: a,
    elements: l,
    strategy: c
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: i = "viewport",
    elementContext: d = "floating",
    altBoundary: f = !1,
    padding: m = 0
  } = xe(t, e), p = Po(m), v = l[f ? d === "floating" ? "reference" : "floating" : d], y = kt(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(v))) == null || n ? v : v.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(l.floating)),
    boundary: u,
    rootBoundary: i,
    strategy: c
  })), A = d === "floating" ? {
    x: o,
    y: r,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, w = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l.floating)), S = await (s.isElement == null ? void 0 : s.isElement(w)) ? await (s.getScale == null ? void 0 : s.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = kt(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: l,
    rect: A,
    offsetParent: w,
    strategy: c
  }) : A);
  return {
    top: (y.top - E.top + p.top) / S.y,
    bottom: (E.bottom - y.bottom + p.bottom) / S.y,
    left: (y.left - E.left + p.left) / S.x,
    right: (E.right - y.right + p.right) / S.x
  };
}
const Aa = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: r,
      rects: s,
      platform: a,
      elements: l,
      middlewareData: c
    } = t, {
      element: u,
      padding: i = 0
    } = xe(e, t) || {};
    if (u == null)
      return {};
    const d = Po(i), f = {
      x: n,
      y: o
    }, m = pn(r), p = fn(m), h = await a.getDimensions(u), v = m === "y", y = v ? "top" : "left", A = v ? "bottom" : "right", w = v ? "clientHeight" : "clientWidth", S = s.reference[p] + s.reference[m] - f[m] - s.floating[p], E = f[m] - s.reference[m], $ = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(u));
    let B = $ ? $[w] : 0;
    (!B || !await (a.isElement == null ? void 0 : a.isElement($))) && (B = l.floating[w] || s.floating[p]);
    const O = S / 2 - E / 2, F = B / 2 - h[p] / 2 - 1, J = Pe(d[y], F), ne = Pe(d[A], F), z = J, Q = B - h[p] - ne, V = B / 2 - h[p] / 2 + O, Z = Yt(z, V, Q), W = !c.arrow && je(r) != null && V !== Z && s.reference[p] / 2 - (V < z ? J : ne) - h[p] / 2 < 0, j = W ? V < z ? V - z : V - Q : 0;
    return {
      [m]: f[m] + j,
      data: {
        [m]: Z,
        centerOffset: V - Z - j,
        ...W && {
          alignmentOffset: j
        }
      },
      reset: W
    };
  }
}), Pa = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        middlewareData: s,
        rects: a,
        initialPlacement: l,
        platform: c,
        elements: u
      } = t, {
        mainAxis: i = !0,
        crossAxis: d = !0,
        fallbackPlacements: f,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: p = "none",
        flipAlignment: h = !0,
        ...v
      } = xe(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const y = Ce(r), A = pe(l), w = Ce(l) === l, S = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), E = f || (w || !h ? [_t(l)] : ba(l)), $ = p !== "none";
      !f && $ && E.push(..._a(l, h, p, S));
      const B = [l, ...E], O = await Je(t, v), F = [];
      let J = ((o = s.flip) == null ? void 0 : o.overflows) || [];
      if (i && F.push(O[y]), d) {
        const V = ya(r, a, S);
        F.push(O[V[0]], O[V[1]]);
      }
      if (J = [...J, {
        placement: r,
        overflows: F
      }], !F.every((V) => V <= 0)) {
        var ne, z;
        const V = (((ne = s.flip) == null ? void 0 : ne.index) || 0) + 1, Z = B[V];
        if (Z && (!(d === "alignment" ? A !== pe(Z) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        J.every((C) => pe(C.placement) === A ? C.overflows[0] > 0 : !0)))
          return {
            data: {
              index: V,
              overflows: J
            },
            reset: {
              placement: Z
            }
          };
        let W = (z = J.filter((j) => j.overflows[0] <= 0).sort((j, C) => j.overflows[1] - C.overflows[1])[0]) == null ? void 0 : z.placement;
        if (!W)
          switch (m) {
            case "bestFit": {
              var Q;
              const j = (Q = J.filter((C) => {
                if ($) {
                  const ie = pe(C.placement);
                  return ie === A || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ie === "y";
                }
                return !0;
              }).map((C) => [C.placement, C.overflows.filter((ie) => ie > 0).reduce((ie, st) => ie + st, 0)]).sort((C, ie) => C[1] - ie[1])[0]) == null ? void 0 : Q[0];
              j && (W = j);
              break;
            }
            case "initialPlacement":
              W = l;
              break;
          }
        if (r !== W)
          return {
            reset: {
              placement: W
            }
          };
      }
      return {};
    }
  };
};
function Rn(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Ln(e) {
  return ma.some((t) => e[t] >= 0);
}
const Sa = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: o = "referenceHidden",
        ...r
      } = xe(e, t);
      switch (o) {
        case "referenceHidden": {
          const s = await Je(t, {
            ...r,
            elementContext: "reference"
          }), a = Rn(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: Ln(a)
            }
          };
        }
        case "escaped": {
          const s = await Je(t, {
            ...r,
            altBoundary: !0
          }), a = Rn(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: Ln(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, So = /* @__PURE__ */ new Set(["left", "top"]);
async function Ea(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, s = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), a = Ce(n), l = je(n), c = pe(n) === "y", u = So.has(a) ? -1 : 1, i = s && c ? -1 : 1, d = xe(t, e);
  let {
    mainAxis: f,
    crossAxis: m,
    alignmentAxis: p
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return l && typeof p == "number" && (m = l === "end" ? p * -1 : p), c ? {
    x: m * i,
    y: f * u
  } : {
    x: f * u,
    y: m * i
  };
}
const Ta = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: r,
        y: s,
        placement: a,
        middlewareData: l
      } = t, c = await Ea(t, e);
      return a === ((n = l.offset) == null ? void 0 : n.placement) && (o = l.arrow) != null && o.alignmentOffset ? {} : {
        x: r + c.x,
        y: s + c.y,
        data: {
          ...c,
          placement: a
        }
      };
    }
  };
}, Da = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: o,
        placement: r
      } = t, {
        mainAxis: s = !0,
        crossAxis: a = !1,
        limiter: l = {
          fn: (v) => {
            let {
              x: y,
              y: A
            } = v;
            return {
              x: y,
              y: A
            };
          }
        },
        ...c
      } = xe(e, t), u = {
        x: n,
        y: o
      }, i = await Je(t, c), d = pe(Ce(r)), f = dn(d);
      let m = u[f], p = u[d];
      if (s) {
        const v = f === "y" ? "top" : "left", y = f === "y" ? "bottom" : "right", A = m + i[v], w = m - i[y];
        m = Yt(A, m, w);
      }
      if (a) {
        const v = d === "y" ? "top" : "left", y = d === "y" ? "bottom" : "right", A = p + i[v], w = p - i[y];
        p = Yt(A, p, w);
      }
      const h = l.fn({
        ...t,
        [f]: m,
        [d]: p
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - o,
          enabled: {
            [f]: s,
            [d]: a
          }
        }
      };
    }
  };
}, Ma = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: o,
        placement: r,
        rects: s,
        middlewareData: a
      } = t, {
        offset: l = 0,
        mainAxis: c = !0,
        crossAxis: u = !0
      } = xe(e, t), i = {
        x: n,
        y: o
      }, d = pe(r), f = dn(d);
      let m = i[f], p = i[d];
      const h = xe(l, t), v = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (c) {
        const w = f === "y" ? "height" : "width", S = s.reference[f] - s.floating[w] + v.mainAxis, E = s.reference[f] + s.reference[w] - v.mainAxis;
        m < S ? m = S : m > E && (m = E);
      }
      if (u) {
        var y, A;
        const w = f === "y" ? "width" : "height", S = So.has(Ce(r)), E = s.reference[d] - s.floating[w] + (S && ((y = a.offset) == null ? void 0 : y[d]) || 0) + (S ? 0 : v.crossAxis), $ = s.reference[d] + s.reference[w] + (S ? 0 : ((A = a.offset) == null ? void 0 : A[d]) || 0) - (S ? v.crossAxis : 0);
        p < E ? p = E : p > $ && (p = $);
      }
      return {
        [f]: m,
        [d]: p
      };
    }
  };
}, Ba = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        rects: s,
        platform: a,
        elements: l
      } = t, {
        apply: c = () => {
        },
        ...u
      } = xe(e, t), i = await Je(t, u), d = Ce(r), f = je(r), m = pe(r) === "y", {
        width: p,
        height: h
      } = s.floating;
      let v, y;
      d === "top" || d === "bottom" ? (v = d, y = f === (await (a.isRTL == null ? void 0 : a.isRTL(l.floating)) ? "start" : "end") ? "left" : "right") : (y = d, v = f === "end" ? "top" : "bottom");
      const A = h - i.top - i.bottom, w = p - i.left - i.right, S = Pe(h - i[v], A), E = Pe(p - i[y], w), $ = !t.middlewareData.shift;
      let B = S, O = E;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (O = w), (o = t.middlewareData.shift) != null && o.enabled.y && (B = A), $ && !f) {
        const J = re(i.left, 0), ne = re(i.right, 0), z = re(i.top, 0), Q = re(i.bottom, 0);
        m ? O = p - 2 * (J !== 0 || ne !== 0 ? J + ne : re(i.left, i.right)) : B = h - 2 * (z !== 0 || Q !== 0 ? z + Q : re(i.top, i.bottom));
      }
      await c({
        ...t,
        availableWidth: O,
        availableHeight: B
      });
      const F = await a.getDimensions(l.floating);
      return p !== F.width || h !== F.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Pt() {
  return typeof window < "u";
}
function Le(e) {
  return mn(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function se(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ye(e) {
  var t;
  return (t = (mn(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function mn(e) {
  return Pt() ? e instanceof Node || e instanceof se(e).Node : !1;
}
function ue(e) {
  return Pt() ? e instanceof Element || e instanceof se(e).Element : !1;
}
function ve(e) {
  return Pt() ? e instanceof HTMLElement || e instanceof se(e).HTMLElement : !1;
}
function $n(e) {
  return !Pt() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof se(e).ShadowRoot;
}
const Ra = /* @__PURE__ */ new Set(["inline", "contents"]);
function rt(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = de(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !Ra.has(r);
}
const La = /* @__PURE__ */ new Set(["table", "td", "th"]);
function $a(e) {
  return La.has(Le(e));
}
const Na = [":popover-open", ":modal"];
function St(e) {
  return Na.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const qa = ["transform", "translate", "scale", "rotate", "perspective"], Ia = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Fa = ["paint", "layout", "strict", "content"];
function gn(e) {
  const t = vn(), n = ue(e) ? de(e) : e;
  return qa.some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Ia.some((o) => (n.willChange || "").includes(o)) || Fa.some((o) => (n.contain || "").includes(o));
}
function za(e) {
  let t = Se(e);
  for (; ve(t) && !ze(t); ) {
    if (gn(t))
      return t;
    if (St(t))
      return null;
    t = Se(t);
  }
  return null;
}
function vn() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Ha = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function ze(e) {
  return Ha.has(Le(e));
}
function de(e) {
  return se(e).getComputedStyle(e);
}
function Et(e) {
  return ue(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Se(e) {
  if (Le(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    $n(e) && e.host || // Fallback.
    ye(e)
  );
  return $n(t) ? t.host : t;
}
function Eo(e) {
  const t = Se(e);
  return ze(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ve(t) && rt(t) ? t : Eo(t);
}
function Ze(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = Eo(e), s = r === ((o = e.ownerDocument) == null ? void 0 : o.body), a = se(r);
  if (s) {
    const l = Zt(a);
    return t.concat(a, a.visualViewport || [], rt(r) ? r : [], l && n ? Ze(l) : []);
  }
  return t.concat(r, Ze(r, [], n));
}
function Zt(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function To(e) {
  const t = de(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = ve(e), s = r ? e.offsetWidth : n, a = r ? e.offsetHeight : o, l = Ct(n) !== s || Ct(o) !== a;
  return l && (n = s, o = a), {
    width: n,
    height: o,
    $: l
  };
}
function hn(e) {
  return ue(e) ? e : e.contextElement;
}
function Fe(e) {
  const t = hn(e);
  if (!ve(t))
    return me(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: s
  } = To(t);
  let a = (s ? Ct(n.width) : n.width) / o, l = (s ? Ct(n.height) : n.height) / r;
  return (!a || !Number.isFinite(a)) && (a = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: a,
    y: l
  };
}
const Va = /* @__PURE__ */ me(0);
function Do(e) {
  const t = se(e);
  return !vn() || !t.visualViewport ? Va : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Wa(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== se(e) ? !1 : t;
}
function Me(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), s = hn(e);
  let a = me(1);
  t && (o ? ue(o) && (a = Fe(o)) : a = Fe(e));
  const l = Wa(s, n, o) ? Do(s) : me(0);
  let c = (r.left + l.x) / a.x, u = (r.top + l.y) / a.y, i = r.width / a.x, d = r.height / a.y;
  if (s) {
    const f = se(s), m = o && ue(o) ? se(o) : o;
    let p = f, h = Zt(p);
    for (; h && o && m !== p; ) {
      const v = Fe(h), y = h.getBoundingClientRect(), A = de(h), w = y.left + (h.clientLeft + parseFloat(A.paddingLeft)) * v.x, S = y.top + (h.clientTop + parseFloat(A.paddingTop)) * v.y;
      c *= v.x, u *= v.y, i *= v.x, d *= v.y, c += w, u += S, p = se(h), h = Zt(p);
    }
  }
  return kt({
    width: i,
    height: d,
    x: c,
    y: u
  });
}
function Tt(e, t) {
  const n = Et(e).scrollLeft;
  return t ? t.left + n : Me(ye(e)).left + n;
}
function Mo(e, t) {
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - Tt(e, n), r = n.top + t.scrollTop;
  return {
    x: o,
    y: r
  };
}
function ja(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: r
  } = e;
  const s = r === "fixed", a = ye(o), l = t ? St(t.floating) : !1;
  if (o === a || l && s)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = me(1);
  const i = me(0), d = ve(o);
  if ((d || !d && !s) && ((Le(o) !== "body" || rt(a)) && (c = Et(o)), ve(o))) {
    const m = Me(o);
    u = Fe(o), i.x = m.x + o.clientLeft, i.y = m.y + o.clientTop;
  }
  const f = a && !d && !s ? Mo(a, c) : me(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - c.scrollLeft * u.x + i.x + f.x,
    y: n.y * u.y - c.scrollTop * u.y + i.y + f.y
  };
}
function Ua(e) {
  return Array.from(e.getClientRects());
}
function Ga(e) {
  const t = ye(e), n = Et(e), o = e.ownerDocument.body, r = re(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), s = re(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let a = -n.scrollLeft + Tt(e);
  const l = -n.scrollTop;
  return de(o).direction === "rtl" && (a += re(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: s,
    x: a,
    y: l
  };
}
const Nn = 25;
function Ka(e, t) {
  const n = se(e), o = ye(e), r = n.visualViewport;
  let s = o.clientWidth, a = o.clientHeight, l = 0, c = 0;
  if (r) {
    s = r.width, a = r.height;
    const i = vn();
    (!i || i && t === "fixed") && (l = r.offsetLeft, c = r.offsetTop);
  }
  const u = Tt(o);
  if (u <= 0) {
    const i = o.ownerDocument, d = i.body, f = getComputedStyle(d), m = i.compatMode === "CSS1Compat" && parseFloat(f.marginLeft) + parseFloat(f.marginRight) || 0, p = Math.abs(o.clientWidth - d.clientWidth - m);
    p <= Nn && (s -= p);
  } else u <= Nn && (s += u);
  return {
    width: s,
    height: a,
    x: l,
    y: c
  };
}
const Xa = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Ya(e, t) {
  const n = Me(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, s = ve(e) ? Fe(e) : me(1), a = e.clientWidth * s.x, l = e.clientHeight * s.y, c = r * s.x, u = o * s.y;
  return {
    width: a,
    height: l,
    x: c,
    y: u
  };
}
function qn(e, t, n) {
  let o;
  if (t === "viewport")
    o = Ka(e, n);
  else if (t === "document")
    o = Ga(ye(e));
  else if (ue(t))
    o = Ya(t, n);
  else {
    const r = Do(e);
    o = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return kt(o);
}
function Bo(e, t) {
  const n = Se(e);
  return n === t || !ue(n) || ze(n) ? !1 : de(n).position === "fixed" || Bo(n, t);
}
function Ja(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = Ze(e, [], !1).filter((l) => ue(l) && Le(l) !== "body"), r = null;
  const s = de(e).position === "fixed";
  let a = s ? Se(e) : e;
  for (; ue(a) && !ze(a); ) {
    const l = de(a), c = gn(a);
    !c && l.position === "fixed" && (r = null), (s ? !c && !r : !c && l.position === "static" && !!r && Xa.has(r.position) || rt(a) && !c && Bo(e, a)) ? o = o.filter((i) => i !== a) : r = l, a = Se(a);
  }
  return t.set(e, o), o;
}
function Za(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const a = [...n === "clippingAncestors" ? St(t) ? [] : Ja(t, this._c) : [].concat(n), o], l = a[0], c = a.reduce((u, i) => {
    const d = qn(t, i, r);
    return u.top = re(d.top, u.top), u.right = Pe(d.right, u.right), u.bottom = Pe(d.bottom, u.bottom), u.left = re(d.left, u.left), u;
  }, qn(t, l, r));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Qa(e) {
  const {
    width: t,
    height: n
  } = To(e);
  return {
    width: t,
    height: n
  };
}
function ei(e, t, n) {
  const o = ve(t), r = ye(t), s = n === "fixed", a = Me(e, !0, s, t);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = me(0);
  function u() {
    c.x = Tt(r);
  }
  if (o || !o && !s)
    if ((Le(t) !== "body" || rt(r)) && (l = Et(t)), o) {
      const m = Me(t, !0, s, t);
      c.x = m.x + t.clientLeft, c.y = m.y + t.clientTop;
    } else r && u();
  s && !o && r && u();
  const i = r && !o && !s ? Mo(r, l) : me(0), d = a.left + l.scrollLeft - c.x - i.x, f = a.top + l.scrollTop - c.y - i.y;
  return {
    x: d,
    y: f,
    width: a.width,
    height: a.height
  };
}
function Vt(e) {
  return de(e).position === "static";
}
function In(e, t) {
  if (!ve(e) || de(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return ye(e) === n && (n = n.ownerDocument.body), n;
}
function Ro(e, t) {
  const n = se(e);
  if (St(e))
    return n;
  if (!ve(e)) {
    let r = Se(e);
    for (; r && !ze(r); ) {
      if (ue(r) && !Vt(r))
        return r;
      r = Se(r);
    }
    return n;
  }
  let o = In(e, t);
  for (; o && $a(o) && Vt(o); )
    o = In(o, t);
  return o && ze(o) && Vt(o) && !gn(o) ? n : o || za(e) || n;
}
const ti = async function(e) {
  const t = this.getOffsetParent || Ro, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: ei(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function ni(e) {
  return de(e).direction === "rtl";
}
const oi = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ja,
  getDocumentElement: ye,
  getClippingRect: Za,
  getOffsetParent: Ro,
  getElementRects: ti,
  getClientRects: Ua,
  getDimensions: Qa,
  getScale: Fe,
  isElement: ue,
  isRTL: ni
};
function Lo(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function ri(e, t) {
  let n = null, o;
  const r = ye(e);
  function s() {
    var l;
    clearTimeout(o), (l = n) == null || l.disconnect(), n = null;
  }
  function a(l, c) {
    l === void 0 && (l = !1), c === void 0 && (c = 1), s();
    const u = e.getBoundingClientRect(), {
      left: i,
      top: d,
      width: f,
      height: m
    } = u;
    if (l || t(), !f || !m)
      return;
    const p = gt(d), h = gt(r.clientWidth - (i + f)), v = gt(r.clientHeight - (d + m)), y = gt(i), w = {
      rootMargin: -p + "px " + -h + "px " + -v + "px " + -y + "px",
      threshold: re(0, Pe(1, c)) || 1
    };
    let S = !0;
    function E($) {
      const B = $[0].intersectionRatio;
      if (B !== c) {
        if (!S)
          return a();
        B ? a(!1, B) : o = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      B === 1 && !Lo(u, e.getBoundingClientRect()) && a(), S = !1;
    }
    try {
      n = new IntersectionObserver(E, {
        ...w,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(E, w);
    }
    n.observe(e);
  }
  return a(!0), s;
}
function si(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = o, u = hn(e), i = r || s ? [...u ? Ze(u) : [], ...Ze(t)] : [];
  i.forEach((y) => {
    r && y.addEventListener("scroll", n, {
      passive: !0
    }), s && y.addEventListener("resize", n);
  });
  const d = u && l ? ri(u, n) : null;
  let f = -1, m = null;
  a && (m = new ResizeObserver((y) => {
    let [A] = y;
    A && A.target === u && m && (m.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var w;
      (w = m) == null || w.observe(t);
    })), n();
  }), u && !c && m.observe(u), m.observe(t));
  let p, h = c ? Me(e) : null;
  c && v();
  function v() {
    const y = Me(e);
    h && !Lo(h, y) && n(), h = y, p = requestAnimationFrame(v);
  }
  return n(), () => {
    var y;
    i.forEach((A) => {
      r && A.removeEventListener("scroll", n), s && A.removeEventListener("resize", n);
    }), d?.(), (y = m) == null || y.disconnect(), m = null, c && cancelAnimationFrame(p);
  };
}
const ai = Ta, ii = Da, Fn = Pa, li = Ba, ci = Sa, ui = Aa, di = Ma, fi = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: oi,
    ...n
  }, s = {
    ...r.platform,
    _c: o
  };
  return Oa(e, t, {
    ...r,
    platform: s
  });
};
function pi(e) {
  return e != null && typeof e == "object" && "$el" in e;
}
function Qt(e) {
  if (pi(e)) {
    const t = e.$el;
    return mn(t) && Le(t) === "#comment" ? null : t;
  }
  return e;
}
function Ie(e) {
  return typeof e == "function" ? e() : g(e);
}
function mi(e) {
  return {
    name: "arrow",
    options: e,
    fn(t) {
      const n = Qt(Ie(e.element));
      return n == null ? {} : ui({
        element: n,
        padding: e.padding
      }).fn(t);
    }
  };
}
function $o(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function zn(e, t) {
  const n = $o(e);
  return Math.round(t * n) / n;
}
function gi(e, t, n) {
  n === void 0 && (n = {});
  const o = n.whileElementsMounted, r = T(() => {
    var B;
    return (B = Ie(n.open)) != null ? B : !0;
  }), s = T(() => Ie(n.middleware)), a = T(() => {
    var B;
    return (B = Ie(n.placement)) != null ? B : "bottom";
  }), l = T(() => {
    var B;
    return (B = Ie(n.strategy)) != null ? B : "absolute";
  }), c = T(() => {
    var B;
    return (B = Ie(n.transform)) != null ? B : !0;
  }), u = T(() => Qt(e.value)), i = T(() => Qt(t.value)), d = L(0), f = L(0), m = L(l.value), p = L(a.value), h = Ot({}), v = L(!1), y = T(() => {
    const B = {
      position: m.value,
      left: "0",
      top: "0"
    };
    if (!i.value)
      return B;
    const O = zn(i.value, d.value), F = zn(i.value, f.value);
    return c.value ? {
      ...B,
      transform: "translate(" + O + "px, " + F + "px)",
      ...$o(i.value) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: m.value,
      left: O + "px",
      top: F + "px"
    };
  });
  let A;
  function w() {
    if (u.value == null || i.value == null)
      return;
    const B = r.value;
    fi(u.value, i.value, {
      middleware: s.value,
      placement: a.value,
      strategy: l.value
    }).then((O) => {
      d.value = O.x, f.value = O.y, m.value = O.strategy, p.value = O.placement, h.value = O.middlewareData, v.value = B !== !1;
    });
  }
  function S() {
    typeof A == "function" && (A(), A = void 0);
  }
  function E() {
    if (S(), o === void 0) {
      w();
      return;
    }
    if (u.value != null && i.value != null) {
      A = o(u.value, i.value, w);
      return;
    }
  }
  function $() {
    r.value || (v.value = !1);
  }
  return ae([s, a, l, r], w, {
    flush: "sync"
  }), ae([u, i], E, {
    flush: "sync"
  }), ae(r, $, {
    flush: "sync"
  }), Gn() && Kn(S), {
    x: $e(d),
    y: $e(f),
    strategy: $e(m),
    placement: $e(p),
    middlewareData: $e(h),
    isPositioned: $e(v),
    floatingStyles: y,
    update: w
  };
}
const vi = {
  side: "bottom",
  sideOffset: 0,
  sideFlip: !0,
  align: "center",
  alignOffset: 0,
  alignFlip: !0,
  arrowPadding: 0,
  avoidCollisions: !0,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: "partial",
  hideWhenDetached: !1,
  positionStrategy: "fixed",
  updatePositionStrategy: "optimized",
  prioritizePosition: !1
}, [hl, hi] = We("PopperContent");
var yi = /* @__PURE__ */ P({
  inheritAttrs: !1,
  __name: "PopperContent",
  props: /* @__PURE__ */ Go({
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    sideFlip: {
      type: Boolean,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    alignFlip: {
      type: Boolean,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: !1
    },
    prioritizePosition: {
      type: Boolean,
      required: !1
    },
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    }
  }, { ...vi }),
  emits: ["placed"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = Ao(), { forwardRef: s, currentElement: a } = K(), l = L(), c = L(), { width: u, height: i } = ms(c), d = T(() => n.side + (n.align !== "center" ? `-${n.align}` : "")), f = T(() => typeof n.collisionPadding == "number" ? n.collisionPadding : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...n.collisionPadding
    }), m = T(() => Array.isArray(n.collisionBoundary) ? n.collisionBoundary : [n.collisionBoundary]), p = T(() => ({
      padding: f.value,
      boundary: m.value.filter(fa),
      altBoundary: m.value.length > 0
    })), h = T(() => ({
      mainAxis: n.sideFlip,
      crossAxis: n.alignFlip
    })), v = Rr(() => [
      ai({
        mainAxis: n.sideOffset + i.value,
        alignmentAxis: n.alignOffset
      }),
      n.prioritizePosition && n.avoidCollisions && Fn({
        ...p.value,
        ...h.value
      }),
      n.avoidCollisions && ii({
        mainAxis: !0,
        crossAxis: !!n.prioritizePosition,
        limiter: n.sticky === "partial" ? di() : void 0,
        ...p.value
      }),
      !n.prioritizePosition && n.avoidCollisions && Fn({
        ...p.value,
        ...h.value
      }),
      li({
        ...p.value,
        apply: ({ elements: z, rects: Q, availableWidth: V, availableHeight: Z }) => {
          const { width: W, height: j } = Q.reference, C = z.floating.style;
          C.setProperty("--reka-popper-available-width", `${V}px`), C.setProperty("--reka-popper-available-height", `${Z}px`), C.setProperty("--reka-popper-anchor-width", `${W}px`), C.setProperty("--reka-popper-anchor-height", `${j}px`);
        }
      }),
      c.value && mi({
        element: c.value,
        padding: n.arrowPadding
      }),
      pa({
        arrowWidth: u.value,
        arrowHeight: i.value
      }),
      n.hideWhenDetached && ci({
        strategy: "referenceHidden",
        ...p.value
      })
    ]), y = T(() => n.reference ?? r.anchor.value), { floatingStyles: A, placement: w, isPositioned: S, middlewareData: E } = gi(y, l, {
      strategy: n.positionStrategy,
      placement: d,
      whileElementsMounted: (...z) => si(...z, {
        layoutShift: !n.disableUpdateOnLayoutShift,
        animationFrame: n.updatePositionStrategy === "always"
      }),
      middleware: v
    }), $ = T(() => Xt(w.value)[0]), B = T(() => Xt(w.value)[1]);
    Qn(() => {
      S.value && o("placed");
    });
    const O = T(() => E.value.arrow?.centerOffset !== 0), F = L("");
    ge(() => {
      a.value && (F.value = window.getComputedStyle(a.value).zIndex);
    });
    const J = T(() => E.value.arrow?.x ?? 0), ne = T(() => E.value.arrow?.y ?? 0);
    return hi({
      placedSide: $,
      onArrowChange: (z) => c.value = z,
      arrowX: J,
      arrowY: ne,
      shouldHideArrow: O
    }), (z, Q) => (b(), q("div", {
      ref_key: "floatingRef",
      ref: l,
      "data-reka-popper-content-wrapper": "",
      style: bt({
        ...g(A),
        transform: g(S) ? g(A).transform : "translate(0, -200%)",
        minWidth: "max-content",
        zIndex: F.value,
        "--reka-popper-transform-origin": [g(E).transformOrigin?.x, g(E).transformOrigin?.y].join(" "),
        ...g(E).hide?.referenceHidden && {
          visibility: "hidden",
          pointerEvents: "none"
        }
      })
    }, [N(g(fe), H({ ref: g(s) }, z.$attrs, {
      "as-child": n.asChild,
      as: z.as,
      "data-side": $.value,
      "data-align": B.value,
      style: { animation: g(S) ? void 0 : "none" }
    }), {
      default: x(() => [D(z.$slots, "default")]),
      _: 3
    }, 16, [
      "as-child",
      "as",
      "data-side",
      "data-align",
      "style"
    ])], 4));
  }
}), bi = yi;
const [yn, wi] = We("TooltipProvider");
var xi = /* @__PURE__ */ P({
  inheritAttrs: !1,
  __name: "TooltipProvider",
  props: {
    delayDuration: {
      type: Number,
      required: !1,
      default: 700
    },
    skipDelayDuration: {
      type: Number,
      required: !1,
      default: 300
    },
    disableHoverableContent: {
      type: Boolean,
      required: !1,
      default: !1
    },
    disableClosingTrigger: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    ignoreNonKeyboardFocus: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  setup(e) {
    const t = e, { delayDuration: n, skipDelayDuration: o, disableHoverableContent: r, disableClosingTrigger: s, ignoreNonKeyboardFocus: a, disabled: l } = Xe(t);
    K();
    const c = L(!0), u = L(!1), { start: i, stop: d } = vo(() => {
      c.value = !0;
    }, o, { immediate: !1 });
    return wi({
      isOpenDelayed: c,
      delayDuration: n,
      onOpen() {
        d(), c.value = !1;
      },
      onClose() {
        i();
      },
      isPointerInTransitRef: u,
      disableHoverableContent: r,
      disableClosingTrigger: s,
      disabled: l,
      ignoreNonKeyboardFocus: a
    }), (f, m) => D(f.$slots, "default");
  }
}), Ci = xi;
const No = "tooltip.open", [Dt, _i] = We("TooltipRoot");
var ki = /* @__PURE__ */ P({
  __name: "TooltipRoot",
  props: {
    defaultOpen: {
      type: Boolean,
      required: !1,
      default: !1
    },
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    delayDuration: {
      type: Number,
      required: !1,
      default: void 0
    },
    disableHoverableContent: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    disableClosingTrigger: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    disabled: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    ignoreNonKeyboardFocus: {
      type: Boolean,
      required: !1,
      default: void 0
    }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, o = t;
    K();
    const r = yn(), s = T(() => n.disableHoverableContent ?? r.disableHoverableContent.value), a = T(() => n.disableClosingTrigger ?? r.disableClosingTrigger.value), l = T(() => n.disabled ?? r.disabled.value), c = T(() => n.delayDuration ?? r.delayDuration.value), u = T(() => n.ignoreNonKeyboardFocus ?? r.ignoreNonKeyboardFocus.value), i = ho(n, "open", o, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    });
    ae(i, (w) => {
      r.onClose && (w ? (r.onOpen(), document.dispatchEvent(new CustomEvent(No))) : r.onClose());
    });
    const d = L(!1), f = L(), m = T(() => i.value ? d.value ? "delayed-open" : "instant-open" : "closed"), { start: p, stop: h } = vo(() => {
      d.value = !0, i.value = !0;
    }, c, { immediate: !1 });
    function v() {
      h(), d.value = !1, i.value = !0;
    }
    function y() {
      h(), i.value = !1;
    }
    function A() {
      p();
    }
    return _i({
      contentId: "",
      open: i,
      stateAttribute: m,
      trigger: f,
      onTriggerChange(w) {
        f.value = w;
      },
      onTriggerEnter() {
        r.isOpenDelayed.value ? A() : v();
      },
      onTriggerLeave() {
        s.value ? y() : h();
      },
      onOpen: v,
      onClose: y,
      disableHoverableContent: s,
      disableClosingTrigger: a,
      disabled: l,
      ignoreNonKeyboardFocus: u
    }), (w, S) => (b(), M(g(ca), null, {
      default: x(() => [D(w.$slots, "default", { open: g(i) })]),
      _: 3
    }));
  }
}), Oi = ki, Ai = /* @__PURE__ */ P({
  __name: "TooltipContentImpl",
  props: {
    ariaLabel: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    side: {
      type: null,
      required: !1,
      default: "top"
    },
    sideOffset: {
      type: Number,
      required: !1,
      default: 0
    },
    align: {
      type: null,
      required: !1,
      default: "center"
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1,
      default: !0
    },
    collisionBoundary: {
      type: null,
      required: !1,
      default: () => []
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1,
      default: 0
    },
    arrowPadding: {
      type: Number,
      required: !1,
      default: 0
    },
    sticky: {
      type: String,
      required: !1,
      default: "partial"
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1,
      default: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    }
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = Dt(), { forwardRef: s } = K(), a = Ko(), l = T(() => a.default?.({})), c = T(() => {
      if (n.ariaLabel) return n.ariaLabel;
      let i = "";
      function d(f) {
        typeof f.children == "string" && f.type !== Zn ? i += f.children : Array.isArray(f.children) && f.children.forEach((m) => d(m));
      }
      return l.value?.forEach((f) => d(f)), i;
    }), u = T(() => {
      const { ariaLabel: i, ...d } = n;
      return d;
    });
    return Re(() => {
      wt(window, "scroll", (i) => {
        i.target?.contains(r.trigger.value) && r.onClose();
      }), wt(window, No, r.onClose);
    }), (i, d) => (b(), M(g(Co), {
      "as-child": "",
      "disable-outside-pointer-events": !1,
      onEscapeKeyDown: d[0] || (d[0] = (f) => o("escapeKeyDown", f)),
      onPointerDownOutside: d[1] || (d[1] = (f) => {
        g(r).disableClosingTrigger.value && g(r).trigger.value?.contains(f.target) && f.preventDefault(), o("pointerDownOutside", f);
      }),
      onFocusOutside: d[2] || (d[2] = Xo(() => {
      }, ["prevent"])),
      onDismiss: d[3] || (d[3] = (f) => g(r).onClose())
    }, {
      default: x(() => [N(g(bi), H({
        ref: g(s),
        "data-state": g(r).stateAttribute.value
      }, {
        ...i.$attrs,
        ...u.value
      }, { style: {
        "--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
        "--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
        "--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
        "--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
        "--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
      } }), {
        default: x(() => [D(i.$slots, "default"), N(g(aa), {
          id: g(r).contentId,
          role: "tooltip"
        }, {
          default: x(() => [Ye(G(c.value), 1)]),
          _: 1
        }, 8, ["id"])]),
        _: 3
      }, 16, ["data-state"])]),
      _: 3
    }));
  }
}), qo = Ai, Pi = /* @__PURE__ */ P({
  __name: "TooltipContentHoverable",
  props: {
    ariaLabel: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    side: {
      type: null,
      required: !1
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    }
  },
  setup(e) {
    const n = cn(e), { forwardRef: o, currentElement: r } = K(), { trigger: s, onClose: a } = Dt(), l = yn(), { isPointerInTransit: c, onPointerExit: u } = ts(s, r);
    return l.isPointerInTransitRef = c, u(() => {
      a();
    }), (i, d) => (b(), M(qo, H({ ref: g(o) }, g(n)), {
      default: x(() => [D(i.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Si = Pi, Ei = /* @__PURE__ */ P({
  __name: "TooltipContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    ariaLabel: {
      type: String,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    side: {
      type: null,
      required: !1,
      default: "top"
    },
    sideOffset: {
      type: Number,
      required: !1
    },
    align: {
      type: null,
      required: !1
    },
    alignOffset: {
      type: Number,
      required: !1
    },
    avoidCollisions: {
      type: Boolean,
      required: !1
    },
    collisionBoundary: {
      type: null,
      required: !1
    },
    collisionPadding: {
      type: [Number, Object],
      required: !1
    },
    arrowPadding: {
      type: Number,
      required: !1
    },
    sticky: {
      type: String,
      required: !1
    },
    hideWhenDetached: {
      type: Boolean,
      required: !1
    },
    positionStrategy: {
      type: String,
      required: !1
    },
    updatePositionStrategy: {
      type: String,
      required: !1
    }
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = Dt(), s = ot(n, o), { forwardRef: a } = K();
    return (l, c) => (b(), M(g(un), { present: l.forceMount || g(r).open.value }, {
      default: x(() => [(b(), M(eo(g(r).disableHoverableContent.value ? qo : Si), H({ ref: g(a) }, g(s)), {
        default: x(() => [D(l.$slots, "default")]),
        _: 3
      }, 16))]),
      _: 3
    }, 8, ["present"]));
  }
}), Ti = Ei, Di = /* @__PURE__ */ P({
  __name: "TooltipPortal",
  props: {
    to: {
      type: null,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    defer: {
      type: Boolean,
      required: !1
    },
    forceMount: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const t = e;
    return (n, o) => (b(), M(g(Oo), nn(on(t)), {
      default: x(() => [D(n.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Mi = Di, Bi = /* @__PURE__ */ P({
  __name: "TooltipTrigger",
  props: {
    reference: {
      type: null,
      required: !1
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const t = e, n = Dt(), o = yn();
    n.contentId ||= xt(void 0, "reka-tooltip-content");
    const { forwardRef: r, currentElement: s } = K(), a = L(!1), l = L(!1), c = T(() => n.disabled.value ? {} : {
      click: h,
      focus: m,
      pointermove: d,
      pointerleave: f,
      pointerdown: i,
      blur: p
    });
    Re(() => {
      n.onTriggerChange(s.value);
    });
    function u() {
      setTimeout(() => {
        a.value = !1;
      }, 1);
    }
    function i() {
      n.open && !n.disableClosingTrigger.value && n.onClose(), a.value = !0, document.addEventListener("pointerup", u, { once: !0 });
    }
    function d(v) {
      v.pointerType !== "touch" && !l.value && !o.isPointerInTransitRef.value && (n.onTriggerEnter(), l.value = !0);
    }
    function f() {
      n.onTriggerLeave(), l.value = !1;
    }
    function m(v) {
      a.value || n.ignoreNonKeyboardFocus.value && !v.target.matches?.(":focus-visible") || n.onOpen();
    }
    function p() {
      n.onClose();
    }
    function h() {
      n.disableClosingTrigger.value || n.onClose();
    }
    return (v, y) => (b(), M(g(da), {
      "as-child": "",
      reference: v.reference
    }, {
      default: x(() => [N(g(fe), H({
        ref: g(r),
        "aria-describedby": g(n).open.value ? g(n).contentId : void 0,
        "data-state": g(n).stateAttribute.value,
        as: v.as,
        "as-child": t.asChild,
        "data-grace-area-trigger": ""
      }, Yo(c.value)), {
        default: x(() => [D(v.$slots, "default")]),
        _: 3
      }, 16, [
        "aria-describedby",
        "data-state",
        "as",
        "as-child"
      ])]),
      _: 3
    }, 8, ["reference"]));
  }
}), Ri = Bi;
const Hn = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Vn = no, Li = (e, t) => (n) => {
  var o;
  if (t?.variants == null) return Vn(e, n?.class, n?.className);
  const { variants: r, defaultVariants: s } = t, a = Object.keys(r).map((u) => {
    const i = n?.[u], d = s?.[u];
    if (i === null) return null;
    const f = Hn(i) || Hn(d);
    return r[u][f];
  }), l = n && Object.entries(n).reduce((u, i) => {
    let [d, f] = i;
    return f === void 0 || (u[d] = f), u;
  }, {}), c = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((u, i) => {
    let { class: d, className: f, ...m } = i;
    return Object.entries(m).every((p) => {
      let [h, v] = p;
      return Array.isArray(v) ? v.includes({
        ...s,
        ...l
      }[h]) : {
        ...s,
        ...l
      }[h] === v;
    }) ? [
      ...u,
      d,
      f
    ] : u;
  }, []);
  return Vn(e, a, c, n?.class, n?.className);
}, $i = Li(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), ht = /* @__PURE__ */ P({
  __name: "Button",
  props: {
    variant: {},
    size: {},
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e;
    return (n, o) => (b(), M(g(fe), {
      "data-slot": "button",
      as: e.as,
      "as-child": e.asChild,
      class: I(g(he)(g($i)({ variant: e.variant, size: e.size }), t.class))
    }, {
      default: x(() => [
        D(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "class"]));
  }
}), Ni = /* @__PURE__ */ P({
  __name: "Dialog",
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const r = ot(e, t);
    return (s, a) => (b(), M(g(xs), H({ "data-slot": "dialog" }, g(r)), {
      default: x(() => [
        D(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), qi = /* @__PURE__ */ P({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (b(), M(g(wo), H({ "data-slot": "dialog-close" }, t), {
      default: x(() => [
        D(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
function Ii(e) {
  if (!Lt(e))
    return yt(e);
  const t = new Proxy({}, {
    get(n, o, r) {
      return g(Reflect.get(e.value, o, r));
    },
    set(n, o, r) {
      return Lt(e.value[o]) && !Lt(r) ? e.value[o].value = r : e.value[o] = r, !0;
    },
    deleteProperty(n, o) {
      return Reflect.deleteProperty(e.value, o);
    },
    has(n, o) {
      return Reflect.has(e.value, o);
    },
    ownKeys() {
      return Object.keys(e.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: !0,
        configurable: !0
      };
    }
  });
  return yt(t);
}
function Fi(e) {
  return Ii(T(e));
}
function Mt(e, ...t) {
  const n = t.flat(), o = n[0];
  return Fi(() => Object.fromEntries(typeof o == "function" ? Object.entries(Xe(e)).filter(([r, s]) => !o(te(s), r)) : Object.entries(Xe(e)).filter((r) => !n.includes(r[0]))));
}
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
/**
 * @license lucide-vue-next v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wn = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), zi = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, o) => o ? o.toUpperCase() : n.toLowerCase()
), Hi = (e) => {
  const t = zi(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Vi = (...e) => e.filter((t, n, o) => !!t && t.trim() !== "" && o.indexOf(t) === n).join(" ").trim(), jn = (e) => e === "";
/**
 * @license lucide-vue-next v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ge = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
/**
 * @license lucide-vue-next v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wi = ({
  name: e,
  iconNode: t,
  absoluteStrokeWidth: n,
  "absolute-stroke-width": o,
  strokeWidth: r,
  "stroke-width": s,
  size: a = Ge.width,
  color: l = Ge.stroke,
  ...c
}, { slots: u }) => ce(
  "svg",
  {
    ...Ge,
    ...c,
    width: a,
    height: a,
    stroke: l,
    "stroke-width": jn(n) || jn(o) || n === !0 || o === !0 ? Number(r || s || Ge["stroke-width"]) * 24 / Number(a) : r || s || Ge["stroke-width"],
    class: Vi(
      "lucide",
      c.class,
      ...e ? [`lucide-${Wn(Hi(e))}-icon`, `lucide-${Wn(e)}`] : ["lucide-icon"]
    )
  },
  [...t.map((i) => ce(...i)), ...u.default ? [u.default()] : []]
);
/**
 * @license lucide-vue-next v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ji = (e, t) => (n, { slots: o, attrs: r }) => ce(
  Wi,
  {
    ...r,
    ...n,
    iconNode: t,
    name: e
  },
  o
);
/**
 * @license lucide-vue-next v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ui = ji("x", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]), Gi = /* @__PURE__ */ P({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e, n = Mt(t, "class");
    return (o, r) => (b(), M(g(Js), H({ "data-slot": "dialog-overlay" }, g(n), {
      class: g(he)("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80", t.class)
    }), {
      default: x(() => [
        D(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Ki = /* @__PURE__ */ P({
  __name: "DialogContent",
  props: {
    forceMount: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = Mt(n, "class"), s = ot(r, o);
    return (a, l) => (b(), M(g(ea), null, {
      default: x(() => [
        N(Gi),
        N(g(Gs), H({ "data-slot": "dialog-content" }, g(s), {
          class: g(he)(
            "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
            n.class
          )
        }), {
          default: x(() => [
            D(a.$slots, "default"),
            N(g(wo), { class: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" }, {
              default: x(() => [
                N(g(Ui)),
                l[0] || (l[0] = le("span", { class: "sr-only" }, "Close", -1))
              ]),
              _: 1
            })
          ]),
          _: 3
        }, 16, ["class"])
      ]),
      _: 3
    }));
  }
}), Xi = /* @__PURE__ */ P({
  __name: "DialogFooter",
  props: {
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (b(), q("div", {
      "data-slot": "dialog-footer",
      class: I(g(he)("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}), Yi = /* @__PURE__ */ P({
  __name: "DialogHeader",
  props: {
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (b(), q("div", {
      "data-slot": "dialog-header",
      class: I(g(he)("flex flex-col gap-2 text-center sm:text-left", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}), Ji = /* @__PURE__ */ P({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e, n = Mt(t, "class"), o = cn(n);
    return (r, s) => (b(), M(g(na), H({ "data-slot": "dialog-title" }, g(o), {
      class: g(he)("text-lg leading-none font-semibold", t.class)
    }), {
      default: x(() => [
        D(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Zi = /* @__PURE__ */ P({
  __name: "DialogTrigger",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (b(), M(g(ra), H({ "data-slot": "dialog-trigger" }, t), {
      default: x(() => [
        D(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Qi = /* @__PURE__ */ P({
  name: "ConfirmDialog",
  __name: "ConfirmDialog",
  props: {
    okText: {},
    cancelText: {},
    onOk: { type: Function },
    onCancel: { type: Function }
  },
  setup(e) {
    const t = e;
    return (n, o) => (b(), M(Ni, null, {
      default: x(() => [
        N(Zi, { "as-child": "" }, {
          default: x(() => [
            D(n.$slots, "trigger", {}, () => [
              N(ht)
            ])
          ]),
          _: 3
        }),
        N(Ki, null, {
          default: x(() => [
            N(Yi, null, {
              default: x(() => [
                N(Ji, null, {
                  default: x(() => [
                    D(n.$slots, "header")
                  ]),
                  _: 3
                })
              ]),
              _: 3
            }),
            le("div", null, [
              D(n.$slots, "default")
            ]),
            N(Xi, null, {
              default: x(() => [
                D(n.$slots, "footer", {}, () => [
                  N(qi, null, {
                    default: x(() => [
                      N(ht, {
                        onClick: t.onCancel,
                        variant: "destructive"
                      }, {
                        default: x(() => [
                          Ye(G(t.cancelText ?? "Abbrechen"), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  }),
                  N(ht, {
                    onClick: t.onOk
                  }, {
                    default: x(() => [
                      Ye(G(t.okText ?? "OK"), 1)
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ]),
              _: 3
            })
          ]),
          _: 3
        })
      ]),
      _: 3
    }));
  }
}), el = /* @__PURE__ */ P({
  name: "Dashboard",
  __name: "Dashboard",
  props: {
    source: {}
  },
  setup(e) {
    const t = T(() => ({
      x: e.source.global ? e.source.meta.gridSize.x : e.source.meta.gridSizeApp.x,
      y: e.source.global ? e.source.meta.gridSize.y : e.source.meta.gridSizeApp.y
    })), n = T(() => {
      const o = t.value.x, r = t.value.y, s = Array.from({ length: r }, () => Array(o).fill(!1)), a = [], l = (u, i, d, f) => {
        if (u + d > o || i + f > r) return !1;
        for (let m = i; m < i + f; m++)
          for (let p = u; p < u + d; p++)
            if (s[m][p]) return !1;
        return !0;
      }, c = (u, i, d, f) => {
        for (let m = i; m < i + f; m++)
          for (let p = u; p < u + d; p++)
            s[m][p] = !0;
      };
      for (const u of e.source.items) {
        const i = u.size?.x ?? 1, d = u.size?.y ?? 1;
        let f = !1;
        for (let m = 0; m < r; m++) {
          for (let p = 0; p < o; p++)
            if (l(p, m, i, d)) {
              c(p, m, i, d), a.push(u), f = !0;
              break;
            }
          if (f) break;
        }
      }
      return a;
    });
    return (o, r) => (b(), q("div", {
      class: "grid gap-4 p-4 w-max mx-auto",
      style: bt({
        gridTemplateColumns: `repeat(${t.value.x}, 1fr)`,
        gridTemplateRows: `repeat(${t.value.y}, 1fr)`
      })
    }, [
      (b(!0), q(Ke, null, rn(n.value, (s) => (b(), q("div", {
        class: "whitespace-nowrap",
        style: bt({
          gridColumn: s.size ? `span ${s.size.x}` : void 0,
          gridRow: s.size ? `span ${s.size.y}` : void 0
        })
      }, [
        (b(), M(eo(g(tn)(s.component)), H({ ref_for: !0 }, s.props, { class: "h-full" }), null, 16))
      ], 4))), 256))
    ], 4));
  }
}), tl = { key: 0 }, nl = /* @__PURE__ */ P({
  name: "MultiTextCard",
  __name: "MultiTextCard",
  props: {
    items: {},
    title: {},
    titleClass: {},
    description: {},
    descriptionClass: {},
    url: {}
  },
  setup(e) {
    const t = e;
    function n() {
      t.url && window.location.replace(t.url);
    }
    return (o, r) => (b(), M(Qe, { onClick: n }, {
      default: x(() => [
        N(et, null, {
          default: x(() => [
            e.title ? (b(), q("div", {
              key: 0,
              class: I(e.titleClass)
            }, G(e.title), 3)) : Y("", !0),
            e.description ? (b(), q("div", {
              key: 1,
              class: I(e.descriptionClass)
            }, G(e.description), 3)) : Y("", !0),
            (b(!0), q(Ke, null, rn(e.items, (s) => (b(), q("span", {
              class: I(s.classes)
            }, [
              Ye(G(s.text), 1),
              s.newLine ? (b(), q("br", tl)) : Y("", !0)
            ], 2))), 256))
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}), ol = /* @__PURE__ */ P({
  __name: "CardHeader",
  props: {
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (b(), q("div", {
      "data-slot": "card-header",
      class: I(g(he)("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}), rl = ["innerHTML"], sl = /* @__PURE__ */ P({
  name: "AdvancedCard",
  __name: "AdvancedCard",
  props: {
    html: {},
    title: {},
    titleClass: {},
    description: {},
    descriptionClass: {},
    url: {}
  },
  setup(e) {
    return (t, n) => (b(), M(Qe, null, {
      default: x(() => [
        e.title || e.description ? (b(), M(ol, { key: 0 }, {
          default: x(() => [
            e.title ? (b(), q("div", {
              key: 0,
              class: I(e.titleClass)
            }, G(e.title), 3)) : Y("", !0),
            e.description ? (b(), q("div", {
              key: 1,
              class: I(e.descriptionClass)
            }, G(e.description), 3)) : Y("", !0)
          ]),
          _: 1
        })) : Y("", !0),
        N(et, null, {
          default: x(() => [
            le("div", { innerHTML: e.html }, null, 8, rl)
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}), al = /* @__PURE__ */ P({
  name: "StyledCard",
  __name: "StyledCard",
  props: {
    content: {},
    contentClass: {},
    note: {},
    noteClass: {},
    title: {},
    titleClass: {},
    description: {},
    descriptionClass: {},
    url: {}
  },
  setup(e) {
    const t = e;
    function n() {
      t.url && window.location.replace(t.url);
    }
    return (o, r) => (b(), M(Qe, {
      onClick: n,
      class: I(e.url ? "cursor-pointer" : "")
    }, {
      default: x(() => [
        N(et, null, {
          default: x(() => [
            e.title ? (b(), q("div", {
              key: 0,
              class: I(["text-base font-normal text-gray-500", e.titleClass])
            }, [
              le("span", null, G(e.title), 1)
            ], 2)) : Y("", !0),
            e.content ? (b(), q("div", {
              key: 1,
              class: I(["ml-2 text-2xl font-bold my-2", e.contentClass])
            }, [
              le("span", null, G(e.content), 1)
            ], 2)) : Y("", !0),
            e.description ? (b(), q("div", {
              key: 2,
              class: I(["font-normal", e.descriptionClass])
            }, [
              le("span", null, G(e.description), 1)
            ], 2)) : Y("", !0),
            e.note ? (b(), q("div", {
              key: 3,
              class: I(["text-sm text-gray-500 mt-2", e.noteClass])
            }, [
              le("span", null, G(e.note), 1)
            ], 2)) : Y("", !0)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), il = { key: 2 }, vt = /* @__PURE__ */ P({
  __name: "MultiCardPart",
  props: {
    arr: {},
    class: {}
  },
  setup(e) {
    function t(n, o = !1) {
      o ? window.location.replace(n) : window.open(n);
    }
    return (n, o) => e.arr ? (b(), q("div", {
      key: 0,
      class: I(e.class)
    }, [
      (b(!0), q(Ke, null, rn(e.arr, (r) => (b(), q(Ke, null, [
        r.url ? (b(), M(ht, {
          key: 0,
          variant: "link",
          onClick: () => t(r.url, r.sameTab),
          class: I([(r.classes + " " + r.className).trim(), "p-0 cursor-pointer h-max"])
        }, {
          default: x(() => [
            Ye(G(r.text), 1)
          ]),
          _: 2
        }, 1032, ["onClick", "class"])) : (b(), q("span", {
          key: 1,
          class: I([((r.classes ?? "") + " " + (r.className ?? "")).trim(), "h-max"])
        }, G(r.text), 3)),
        r.newLine ? (b(), q("br", il)) : Y("", !0)
      ], 64))), 256))
    ], 2)) : Y("", !0);
  }
}), ll = /* @__PURE__ */ P({
  name: "MultiTextCard",
  __name: "StyledMultiCard",
  props: {
    itemsTitle: {},
    titleClass: {},
    contentClass: {},
    descriptionClass: {},
    noteClass: {},
    itemsContent: {},
    itemsDescription: {},
    itemsNote: {},
    url: {}
  },
  setup(e) {
    const t = e;
    function n() {
      t.url && window.location.replace(t.url);
    }
    return (o, r) => (b(), M(Qe, {
      onClick: n,
      class: I(e.url ? "cursor-pointer" : "")
    }, {
      default: x(() => [
        N(et, null, {
          default: x(() => [
            N(vt, {
              arr: e.itemsTitle,
              class: I(["text-base font-normal text-gray-500", e.titleClass])
            }, null, 8, ["arr", "class"]),
            N(vt, {
              arr: e.itemsContent,
              class: I(["ml-2 text-2xl font-bold my-2", e.contentClass])
            }, null, 8, ["arr", "class"]),
            N(vt, {
              arr: e.itemsDescription,
              class: I(["font-normal", e.descriptionClass])
            }, null, 8, ["arr", "class"]),
            N(vt, {
              arr: e.itemsNote,
              class: I(["text-sm text-gray-500 mt-2", e.noteClass])
            }, null, 8, ["arr", "class"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), cl = /* @__PURE__ */ P({
  __name: "Tooltip",
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    delayDuration: {},
    disableHoverableContent: { type: Boolean },
    disableClosingTrigger: { type: Boolean },
    disabled: { type: Boolean },
    ignoreNonKeyboardFocus: { type: Boolean }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const r = ot(e, t);
    return (s, a) => (b(), M(g(Oi), H({ "data-slot": "tooltip" }, g(r)), {
      default: x(() => [
        D(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), ul = /* @__PURE__ */ P({
  inheritAttrs: !1,
  __name: "TooltipContent",
  props: {
    forceMount: { type: Boolean },
    ariaLabel: {},
    asChild: { type: Boolean },
    as: {},
    side: {},
    sideOffset: { default: 4 },
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = Mt(n, "class"), s = ot(r, o);
    return (a, l) => (b(), M(g(Mi), null, {
      default: x(() => [
        N(g(Ti), H({ "data-slot": "tooltip-content" }, { ...g(s), ...a.$attrs }, {
          class: g(he)("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance", n.class)
        }), {
          default: x(() => [
            D(a.$slots, "default"),
            Y("", !0)
          ]),
          _: 3
        }, 16, ["class"])
      ]),
      _: 3
    }));
  }
}), dl = /* @__PURE__ */ P({
  __name: "TooltipProvider",
  props: {
    delayDuration: { default: 0 },
    skipDelayDuration: {},
    disableHoverableContent: { type: Boolean },
    disableClosingTrigger: { type: Boolean },
    disabled: { type: Boolean },
    ignoreNonKeyboardFocus: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (b(), M(g(Ci), nn(on(t)), {
      default: x(() => [
        D(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), fl = /* @__PURE__ */ P({
  __name: "TooltipTrigger",
  props: {
    reference: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (b(), M(g(Ri), H({ "data-slot": "tooltip-trigger" }, t), {
      default: x(() => [
        D(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), pl = ["innerHTML"], ml = /* @__PURE__ */ P({
  name: "HintTooltip",
  __name: "HintTooltip",
  props: {
    content: {},
    classTrigger: {},
    classContent: {},
    contentHtml: {}
  },
  setup(e) {
    return (t, n) => (b(), M(dl, null, {
      default: x(() => [
        N(cl, null, {
          default: x(() => [
            N(fl, null, {
              default: x(() => [
                le("i", {
                  class: I([e.classTrigger, "fas fa-question-circle"]),
                  style: { "margin-left": "0.4rem" }
                }, null, 2)
              ]),
              _: 1
            }),
            N(ul, {
              align: "start",
              side: "bottom",
              class: "border vite-hint-content"
            }, {
              default: x(() => [
                e.content ? (b(), q("span", {
                  key: 0,
                  class: I(["text-base", e.classContent])
                }, G(e.content), 3)) : (b(), q("div", {
                  key: 1,
                  innerHTML: e.contentHtml
                }, null, 8, pl))
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
});
function Wt(e, t, n) {
  console.log("Loading Vue");
  const o = document.querySelectorAll("div[data-vue-component]");
  for (const r of o) {
    const s = r.getAttribute("data-vue-component") || "?", a = {};
    r.querySelectorAll("template[data-slot]").forEach((d) => {
      const f = d.getAttribute("data-slot") ?? "", m = d.innerHTML;
      d.remove(), a[f] = () => ce("div", { innerHTML: m });
    }), r.innerHTML.trim().length > 1 && (a.default = () => ce("div", { innerHTML: r.innerHTML }));
    const l = e(s) ?? tn(s);
    let c = {}, u = {};
    try {
      c = JSON.parse(r.getAttribute("data-vue-props") || "{}");
    } catch {
    }
    try {
      u = JSON.parse(r.getAttribute("data-base-props") || "{}");
    } catch {
    }
    r.removeAttribute("data-vue-props"), r.removeAttribute("data-base-props"), l !== tn("Missing") ? r.removeAttribute("data-vue-component") : c.name = s;
    const i = Jo({
      render() {
        return ce(t, u, {
          default: () => ce(l, c, a)
        });
      }
    });
    i.use(n), i.use(gl), i.mount(r);
  }
}
function yl(e, t, n) {
  function o(s) {
    for (const a of Object.values(e))
      if (a.name === s) return a;
    return null;
  }
  document.readyState !== "loading" ? Wt(o, t, n) : document.addEventListener("DOMContentLoaded", () => Wt(o, t, n));
  const r = window;
  r.renderVueComponents || (r.renderVueComponents = () => Wt(o, t, n));
}
const en = {
  SimpleCard: Mr,
  ConfirmDialog: Qi,
  Dashboard: el,
  MultiTextCard: nl,
  AdvancedCard: sl,
  StyledCard: al,
  StyledMultiCard: ll,
  HintTooltip: ml
};
function tn(e) {
  return e in en ? en[e] : Br;
}
function gl() {
  return {
    install(e, t) {
      for (const n of Object.values(en))
        n.name ? e.component(n.name, n) : console.error("Every shared component needs a name");
      return e;
    }
  };
}
export {
  sl as AdvancedCard,
  Qi as ConfirmDialog,
  el as Dashboard,
  ml as HintTooltip,
  nl as MultiTextCard,
  Mr as SimpleCard,
  al as StyledCard,
  ll as StyledMultiCard,
  yl as ViteLoader,
  tn as getCadiComponent,
  gl as getPlugin
};
