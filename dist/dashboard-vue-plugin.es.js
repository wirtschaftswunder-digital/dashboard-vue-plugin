import * as Wo from "vue";
import { defineComponent as b, createElementBlock as B, openBlock as y, normalizeClass as U, unref as d, renderSlot as R, createBlock as x, withCtx as h, createVNode as A, createCommentVNode as Y, createElementVNode as G, toDisplayString as Z, inject as Ar, provide as Ir, Fragment as de, shallowRef as Nt, readonly as Er, toValue as ce, getCurrentScope as Mr, onScopeDispose as Or, effectScope as qr, customRef as el, onBeforeUnmount as Fr, watch as oe, watchEffect as ge, computed as q, getCurrentInstance as it, isRef as Xe, reactive as Rt, toRefs as me, ref as I, nextTick as le, onMounted as ve, toHandlerKey as tl, camelize as Dr, toRef as nl, onUnmounted as cn, h as Ce, Comment as Br, mergeProps as F, cloneVNode as ol, withKeys as yo, normalizeStyle as Bt, Teleport as Tr, normalizeProps as be, guardReactiveProps as Se, markRaw as rl, renderList as Oe, watchPostEffect as Vr, shallowReadonly as _t, mergeDefaults as Lr, withModifiers as rt, resolveDynamicComponent as wo, createTextVNode as we, useSlots as al, toHandlers as ll, resolveComponent as sl, createApp as il, withDirectives as ul, vModelText as dl } from "vue";
function zr(e) {
  var n, t, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (n = 0; n < r; n++) e[n] && (t = zr(e[n])) && (o && (o += " "), o += t);
  } else for (t in e) e[t] && (o && (o += " "), o += t);
  return o;
}
function Nr() {
  for (var e, n, t = 0, o = "", r = arguments.length; t < r; t++) (e = arguments[t]) && (n = zr(e)) && (o && (o += " "), o += n);
  return o;
}
const _o = "-", cl = (e) => {
  const n = pl(e), {
    conflictingClassGroups: t,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (l) => {
      const s = l.split(_o);
      return s[0] === "" && s.length !== 1 && s.shift(), Hr(s, n) || fl(l);
    },
    getConflictingClassGroupIds: (l, s) => {
      const i = t[l] || [];
      return s && o[l] ? [...i, ...o[l]] : i;
    }
  };
}, Hr = (e, n) => {
  if (e.length === 0)
    return n.classGroupId;
  const t = e[0], o = n.nextPart.get(t), r = o ? Hr(e.slice(1), o) : void 0;
  if (r)
    return r;
  if (n.validators.length === 0)
    return;
  const a = e.join(_o);
  return n.validators.find(({
    validator: l
  }) => l(a))?.classGroupId;
}, Xo = /^\[(.+)\]$/, fl = (e) => {
  if (Xo.test(e)) {
    const n = Xo.exec(e)[1], t = n?.substring(0, n.indexOf(":"));
    if (t)
      return "arbitrary.." + t;
  }
}, pl = (e) => {
  const {
    theme: n,
    classGroups: t
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const r in t)
    Kn(t[r], o, r, n);
  return o;
}, Kn = (e, n, t, o) => {
  e.forEach((r) => {
    if (typeof r == "string") {
      const a = r === "" ? n : Yo(n, r);
      a.classGroupId = t;
      return;
    }
    if (typeof r == "function") {
      if (gl(r)) {
        Kn(r(o), n, t, o);
        return;
      }
      n.validators.push({
        validator: r,
        classGroupId: t
      });
      return;
    }
    Object.entries(r).forEach(([a, l]) => {
      Kn(l, Yo(n, a), t, o);
    });
  });
}, Yo = (e, n) => {
  let t = e;
  return n.split(_o).forEach((o) => {
    t.nextPart.has(o) || t.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), t = t.nextPart.get(o);
  }), t;
}, gl = (e) => e.isThemeGetter, ml = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let n = 0, t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const r = (a, l) => {
    t.set(a, l), n++, n > e && (n = 0, o = t, t = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let l = t.get(a);
      if (l !== void 0)
        return l;
      if ((l = o.get(a)) !== void 0)
        return r(a, l), l;
    },
    set(a, l) {
      t.has(a) ? t.set(a, l) : r(a, l);
    }
  };
}, Wn = "!", Xn = ":", vl = Xn.length, hl = (e) => {
  const {
    prefix: n,
    experimentalParseClassName: t
  } = e;
  let o = (r) => {
    const a = [];
    let l = 0, s = 0, i = 0, u;
    for (let m = 0; m < r.length; m++) {
      let v = r[m];
      if (l === 0 && s === 0) {
        if (v === Xn) {
          a.push(r.slice(i, m)), i = m + vl;
          continue;
        }
        if (v === "/") {
          u = m;
          continue;
        }
      }
      v === "[" ? l++ : v === "]" ? l-- : v === "(" ? s++ : v === ")" && s--;
    }
    const c = a.length === 0 ? r : r.substring(i), f = yl(c), g = f !== c, p = u && u > i ? u - i : void 0;
    return {
      modifiers: a,
      hasImportantModifier: g,
      baseClassName: f,
      maybePostfixModifierPosition: p
    };
  };
  if (n) {
    const r = n + Xn, a = o;
    o = (l) => l.startsWith(r) ? a(l.substring(r.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: l,
      maybePostfixModifierPosition: void 0
    };
  }
  if (t) {
    const r = o;
    o = (a) => t({
      className: a,
      parseClassName: r
    });
  }
  return o;
}, yl = (e) => e.endsWith(Wn) ? e.substring(0, e.length - 1) : e.startsWith(Wn) ? e.substring(1) : e, wl = (e) => {
  const n = Object.fromEntries(e.orderSensitiveModifiers.map((o) => [o, !0]));
  return (o) => {
    if (o.length <= 1)
      return o;
    const r = [];
    let a = [];
    return o.forEach((l) => {
      l[0] === "[" || n[l] ? (r.push(...a.sort(), l), a = []) : a.push(l);
    }), r.push(...a.sort()), r;
  };
}, _l = (e) => ({
  cache: ml(e.cacheSize),
  parseClassName: hl(e),
  sortModifiers: wl(e),
  ...cl(e)
}), bl = /\s+/, Cl = (e, n) => {
  const {
    parseClassName: t,
    getClassGroupId: o,
    getConflictingClassGroupIds: r,
    sortModifiers: a
  } = n, l = [], s = e.trim().split(bl);
  let i = "";
  for (let u = s.length - 1; u >= 0; u -= 1) {
    const c = s[u], {
      isExternal: f,
      modifiers: g,
      hasImportantModifier: p,
      baseClassName: m,
      maybePostfixModifierPosition: v
    } = t(c);
    if (f) {
      i = c + (i.length > 0 ? " " + i : i);
      continue;
    }
    let w = !!v, _ = o(w ? m.substring(0, v) : m);
    if (!_) {
      if (!w) {
        i = c + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (_ = o(m), !_) {
        i = c + (i.length > 0 ? " " + i : i);
        continue;
      }
      w = !1;
    }
    const $ = a(g).join(":"), S = p ? $ + Wn : $, C = S + _;
    if (l.includes(C))
      continue;
    l.push(C);
    const k = r(_, w);
    for (let M = 0; M < k.length; ++M) {
      const O = k[M];
      l.push(S + O);
    }
    i = c + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function Sl() {
  let e = 0, n, t, o = "";
  for (; e < arguments.length; )
    (n = arguments[e++]) && (t = Gr(n)) && (o && (o += " "), o += t);
  return o;
}
const Gr = (e) => {
  if (typeof e == "string")
    return e;
  let n, t = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (n = Gr(e[o])) && (t && (t += " "), t += n);
  return t;
};
function xl(e, ...n) {
  let t, o, r, a = l;
  function l(i) {
    const u = n.reduce((c, f) => f(c), e());
    return t = _l(u), o = t.cache.get, r = t.cache.set, a = s, s(i);
  }
  function s(i) {
    const u = o(i);
    if (u)
      return u;
    const c = Cl(i, t);
    return r(i, c), c;
  }
  return function() {
    return a(Sl.apply(null, arguments));
  };
}
const ie = (e) => {
  const n = (t) => t[e] || [];
  return n.isThemeGetter = !0, n;
}, jr = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ur = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Rl = /^\d+\/\d+$/, Pl = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, $l = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, kl = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Al = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Il = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, bt = (e) => Rl.test(e), K = (e) => !!e && !Number.isNaN(Number(e)), tt = (e) => !!e && Number.isInteger(Number(e)), $n = (e) => e.endsWith("%") && K(e.slice(0, -1)), Ue = (e) => Pl.test(e), El = () => !0, Ml = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  $l.test(e) && !kl.test(e)
), Kr = () => !1, Ol = (e) => Al.test(e), ql = (e) => Il.test(e), Fl = (e) => !T(e) && !V(e), Dl = (e) => $t(e, Yr, Kr), T = (e) => jr.test(e), ft = (e) => $t(e, Jr, Ml), kn = (e) => $t(e, zl, K), Jo = (e) => $t(e, Wr, Kr), Bl = (e) => $t(e, Xr, ql), Wt = (e) => $t(e, Zr, Ol), V = (e) => Ur.test(e), Mt = (e) => kt(e, Jr), Tl = (e) => kt(e, Nl), Zo = (e) => kt(e, Wr), Vl = (e) => kt(e, Yr), Ll = (e) => kt(e, Xr), Xt = (e) => kt(e, Zr, !0), $t = (e, n, t) => {
  const o = jr.exec(e);
  return o ? o[1] ? n(o[1]) : t(o[2]) : !1;
}, kt = (e, n, t = !1) => {
  const o = Ur.exec(e);
  return o ? o[1] ? n(o[1]) : t : !1;
}, Wr = (e) => e === "position" || e === "percentage", Xr = (e) => e === "image" || e === "url", Yr = (e) => e === "length" || e === "size" || e === "bg-size", Jr = (e) => e === "length", zl = (e) => e === "number", Nl = (e) => e === "family-name", Zr = (e) => e === "shadow", Hl = () => {
  const e = ie("color"), n = ie("font"), t = ie("text"), o = ie("font-weight"), r = ie("tracking"), a = ie("leading"), l = ie("breakpoint"), s = ie("container"), i = ie("spacing"), u = ie("radius"), c = ie("shadow"), f = ie("inset-shadow"), g = ie("text-shadow"), p = ie("drop-shadow"), m = ie("blur"), v = ie("perspective"), w = ie("aspect"), _ = ie("ease"), $ = ie("animate"), S = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], C = () => [
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
  ], k = () => [...C(), V, T], M = () => ["auto", "hidden", "clip", "visible", "scroll"], O = () => ["auto", "contain", "none"], E = () => [V, T, i], P = () => [bt, "full", "auto", ...E()], L = () => [tt, "none", "subgrid", V, T], j = () => ["auto", {
    span: ["full", tt, V, T]
  }, tt, V, T], J = () => [tt, "auto", V, T], ae = () => ["auto", "min", "max", "fr", V, T], ee = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], re = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], te = () => ["auto", ...E()], ne = () => [bt, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...E()], D = () => [e, V, T], Re = () => [...C(), Zo, Jo, {
    position: [V, T]
  }], je = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Kt = () => ["auto", "cover", "contain", Vl, Dl, {
    size: [V, T]
  }], dt = () => [$n, Mt, ft], pe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    V,
    T
  ], ue = () => ["", K, Mt, ft], wt = () => ["solid", "dashed", "dotted", "double"], Rn = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Q = () => [K, $n, Zo, Jo], Ee = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    m,
    V,
    T
  ], Ae = () => ["none", K, V, T], Ie = () => ["none", K, V, T], ct = () => [K, V, T], et = () => [bt, "full", ...E()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Ue],
      breakpoint: [Ue],
      color: [El],
      container: [Ue],
      "drop-shadow": [Ue],
      ease: ["in", "out", "in-out"],
      font: [Fl],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Ue],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Ue],
      shadow: [Ue],
      spacing: ["px", K],
      text: [Ue],
      "text-shadow": [Ue],
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
        aspect: ["auto", "square", bt, T, V, w]
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
        columns: [K, T, V, s]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": S()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": S()
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
        object: k()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: M()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": M()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": M()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: O()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": O()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": O()
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
        inset: P()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": P()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": P()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: P()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: P()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: P()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: P()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: P()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: P()
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
        z: [tt, "auto", V, T]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [bt, "full", "auto", s, ...E()]
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
        flex: [K, bt, "auto", "initial", "none", T]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", K, V, T]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", K, V, T]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [tt, "first", "last", "none", V, T]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": L()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: j()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": J()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": J()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": L()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: j()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": J()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": J()
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
        "auto-cols": ae()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ae()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: E()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": E()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": E()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...ee(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...re(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...re()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...ee()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...re(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...re(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": ee()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...re(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...re()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: E()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: E()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: E()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: E()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: E()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: E()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: E()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: E()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: E()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: te()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: te()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: te()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: te()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: te()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: te()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: te()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: te()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: te()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": E()
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
        "space-y": E()
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
        size: ne()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [s, "screen", ...ne()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          s,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...ne()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          s,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [l]
          },
          ...ne()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...ne()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...ne()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...ne()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", t, Mt, ft]
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
        font: [o, V, kn]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", $n, T]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Tl, T, n]
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
        tracking: [r, V, T]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [K, "none", V, kn]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          a,
          ...E()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", V, T]
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
        list: ["disc", "decimal", "none", V, T]
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
        placeholder: D()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: D()
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
        decoration: [...wt(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [K, "from-font", "auto", V, ft]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: D()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [K, "auto", V, T]
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
        indent: E()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", V, T]
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
        content: ["none", V, T]
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
        bg: Re()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: je()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: Kt()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, tt, V, T],
          radial: ["", V, T],
          conic: [tt, V, T]
        }, Ll, Bl]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: D()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: dt()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: dt()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: dt()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: D()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: D()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: D()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: pe()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": pe()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": pe()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": pe()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": pe()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": pe()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": pe()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": pe()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": pe()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": pe()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": pe()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": pe()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": pe()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": pe()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": pe()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: ue()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": ue()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": ue()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": ue()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": ue()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": ue()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": ue()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": ue()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": ue()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": ue()
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
        "divide-y": ue()
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
        border: [...wt(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...wt(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: D()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": D()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": D()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": D()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": D()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": D()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": D()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": D()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": D()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: D()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...wt(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [K, V, T]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", K, Mt, ft]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: D()
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
          c,
          Xt,
          Wt
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: D()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", f, Xt, Wt]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": D()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: ue()
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
        ring: D()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [K, ft]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": D()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": ue()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": D()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", g, Xt, Wt]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": D()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [K, V, T]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Rn(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Rn()
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
        "mask-linear": [K]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": Q()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": Q()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": D()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": D()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Q()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Q()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": D()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": D()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Q()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Q()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": D()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": D()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Q()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Q()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": D()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": D()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Q()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Q()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": D()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": D()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Q()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Q()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": D()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": D()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Q()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Q()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": D()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": D()
      }],
      "mask-image-radial": [{
        "mask-radial": [V, T]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": Q()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": Q()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": D()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": D()
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
        "mask-radial-at": C()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [K]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": Q()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": Q()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": D()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": D()
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
        mask: Re()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: je()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: Kt()
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
        mask: ["none", V, T]
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
          V,
          T
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Ee()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [K, V, T]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [K, V, T]
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
          p,
          Xt,
          Wt
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": D()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", K, V, T]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [K, V, T]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", K, V, T]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [K, V, T]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", K, V, T]
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
          V,
          T
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Ee()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [K, V, T]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [K, V, T]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", K, V, T]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [K, V, T]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", K, V, T]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [K, V, T]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [K, V, T]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", K, V, T]
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
        "border-spacing": E()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": E()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": E()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", V, T]
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
        duration: [K, "initial", V, T]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", _, V, T]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [K, V, T]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", $, V, T]
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
        perspective: [v, V, T]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": k()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: Ae()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Ae()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Ae()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Ae()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: Ie()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": Ie()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": Ie()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": Ie()
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
        skew: ct()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": ct()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": ct()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [V, T, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: k()
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
        translate: et()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": et()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": et()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": et()
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
        accent: D()
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
        caret: D()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", V, T]
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
        "scroll-m": E()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": E()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": E()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": E()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": E()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": E()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": E()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": E()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": E()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": E()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": E()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": E()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": E()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": E()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": E()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": E()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": E()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": E()
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
        "will-change": ["auto", "scroll", "contents", "transform", V, T]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...D()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [K, Mt, ft, kn]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...D()]
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
}, Gl = /* @__PURE__ */ xl(Hl);
function W(...e) {
  return Gl(Nr(e));
}
function Yt(e, n) {
  n.value = typeof e == "function" ? e(n.value) : e;
}
const Ht = /* @__PURE__ */ b({
  __name: "Card",
  props: {
    class: {}
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), B("div", {
      "data-slot": "card",
      class: U(
        d(W)(
          "bg-card text-card-foreground flex flex-col gap-4 rounded-xl border py-4 shadow-sm",
          n.class
        )
      )
    }, [
      R(t.$slots, "default")
    ], 2));
  }
}), Gt = /* @__PURE__ */ b({
  __name: "CardContent",
  props: {
    class: {}
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), B("div", {
      "data-slot": "card-content",
      class: U(d(W)("px-5", n.class))
    }, [
      R(t.$slots, "default")
    ], 2));
  }
}), jl = /* @__PURE__ */ b({
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
    const n = e;
    function t() {
      n.url && window.location.replace(n.url);
    }
    return (o, r) => (y(), x(Ht, { onClick: t }, {
      default: h(() => [
        A(Gt, null, {
          default: h(() => [
            e.title ? (y(), B("div", {
              key: 0,
              class: U(e.titleClass)
            }, [
              G("span", null, Z(e.title), 1)
            ], 2)) : Y("", !0),
            e.description ? (y(), B("div", {
              key: 1,
              class: U(e.descriptionClass)
            }, [
              G("span", null, Z(e.description), 1)
            ], 2)) : Y("", !0),
            e.content ? (y(), B("div", {
              key: 2,
              class: U(e.contentClass)
            }, [
              G("span", null, Z(e.content), 1)
            ], 2)) : Y("", !0)
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}), Ul = /* @__PURE__ */ b({
  __name: "Missing",
  props: {
    name: {}
  },
  setup(e) {
    return (n, t) => (y(), B("div", null, 'Component "' + Z(e.name) + '" not found', 1));
  }
});
function Qo(e) {
  return typeof e == "string" ? `'${e}'` : new Kl().serialize(e);
}
const Kl = /* @__PURE__ */ (function() {
  class e {
    #e = /* @__PURE__ */ new Map();
    compare(t, o) {
      const r = typeof t, a = typeof o;
      return r === "string" && a === "string" ? t.localeCompare(o) : r === "number" && a === "number" ? t - o : String.prototype.localeCompare.call(this.serialize(t, !0), this.serialize(o, !0));
    }
    serialize(t, o) {
      if (t === null) return "null";
      switch (typeof t) {
        case "string":
          return o ? t : `'${t}'`;
        case "bigint":
          return `${t}n`;
        case "object":
          return this.$object(t);
        case "function":
          return this.$function(t);
      }
      return String(t);
    }
    serializeObject(t) {
      const o = Object.prototype.toString.call(t);
      if (o !== "[object Object]") return this.serializeBuiltInType(o.length < 10 ? `unknown:${o}` : o.slice(8, -1), t);
      const r = t.constructor, a = r === Object || r === void 0 ? "" : r.name;
      if (a !== "" && globalThis[a] === r) return this.serializeBuiltInType(a, t);
      if (typeof t.toJSON == "function") {
        const l = t.toJSON();
        return a + (l !== null && typeof l == "object" ? this.$object(l) : `(${this.serialize(l)})`);
      }
      return this.serializeObjectEntries(a, Object.entries(t));
    }
    serializeBuiltInType(t, o) {
      const r = this["$" + t];
      if (r) return r.call(this, o);
      if (typeof o?.entries == "function") return this.serializeObjectEntries(t, o.entries());
      throw new Error(`Cannot serialize ${t}`);
    }
    serializeObjectEntries(t, o) {
      const r = Array.from(o).sort((l, s) => this.compare(l[0], s[0]));
      let a = `${t}{`;
      for (let l = 0; l < r.length; l++) {
        const [s, i] = r[l];
        a += `${this.serialize(s, !0)}:${this.serialize(i)}`, l < r.length - 1 && (a += ",");
      }
      return a + "}";
    }
    $object(t) {
      let o = this.#e.get(t);
      return o === void 0 && (this.#e.set(t, `#${this.#e.size}`), o = this.serializeObject(t), this.#e.set(t, o)), o;
    }
    $function(t) {
      const o = Function.prototype.toString.call(t);
      return o.slice(-15) === "[native code] }" ? `${t.name || ""}()[native]` : `${t.name}(${t.length})${o.replace(/\s*\n\s*/g, "")}`;
    }
    $Array(t) {
      let o = "[";
      for (let r = 0; r < t.length; r++) o += this.serialize(t[r]), r < t.length - 1 && (o += ",");
      return o + "]";
    }
    $Date(t) {
      try {
        return `Date(${t.toISOString()})`;
      } catch {
        return "Date(null)";
      }
    }
    $ArrayBuffer(t) {
      return `ArrayBuffer[${new Uint8Array(t).join(",")}]`;
    }
    $Set(t) {
      return `Set${this.$Array(Array.from(t).sort((o, r) => this.compare(o, r)))}`;
    }
    $Map(t) {
      return this.serializeObjectEntries("Map", t.entries());
    }
  }
  for (const n of ["Error", "RegExp", "URL"]) e.prototype["$" + n] = function(t) {
    return `${n}(${t})`;
  };
  for (const n of ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"]) e.prototype["$" + n] = function(t) {
    return `${n}[${t.join(",")}]`;
  };
  for (const n of ["BigInt64Array", "BigUint64Array"]) e.prototype["$" + n] = function(t) {
    return `${n}[${t.join("n,")}${t.length > 0 ? "n" : ""}]`;
  };
  return e;
})();
function Tt(e, n) {
  return e === n || Qo(e) === Qo(n);
}
function er(e, n = Number.NEGATIVE_INFINITY, t = Number.POSITIVE_INFINITY) {
  return Math.min(t, Math.max(n, e));
}
function se(e, n) {
  const t = typeof e == "string" && !n ? `${e}Context` : n, o = Symbol(t);
  return [(l) => {
    const s = Ar(o, l);
    if (s || s === null) return s;
    throw new Error(`Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
  }, (l) => (Ir(o, l), l)];
}
function _e() {
  let e = document.activeElement;
  if (e == null) return null;
  for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null; ) e = e.shadowRoot.activeElement;
  return e;
}
function bo(e, n, t) {
  const o = t.originalEvent.target, r = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: t
  });
  n && o.addEventListener(e, n, { once: !0 }), o.dispatchEvent(r);
}
function Yn(e) {
  return e == null;
}
function Wl(e, n) {
  return Yn(e) ? !1 : Array.isArray(e) ? e.some((t) => Tt(t, n)) : Tt(e, n);
}
function Co(e) {
  return e ? e.flatMap((n) => n.type === de ? Co(n.children) : [n]) : [];
}
const Xl = ["INPUT", "TEXTAREA"];
function Qr(e, n, t, o = {}) {
  if (!n || o.enableIgnoredElement && Xl.includes(n.nodeName)) return null;
  const { arrowKeyOptions: r = "both", attributeName: a = "[data-reka-collection-item]", itemsArray: l = [], loop: s = !0, dir: i = "ltr", preventScroll: u = !0, focus: c = !1 } = o, [f, g, p, m, v, w] = [
    e.key === "ArrowRight",
    e.key === "ArrowLeft",
    e.key === "ArrowUp",
    e.key === "ArrowDown",
    e.key === "Home",
    e.key === "End"
  ], _ = p || m, $ = f || g;
  if (!v && !w && (!_ && !$ || r === "vertical" && $ || r === "horizontal" && _)) return null;
  const S = t ? Array.from(t.querySelectorAll(a)) : l;
  if (!S.length) return null;
  u && e.preventDefault();
  let C = null;
  return $ || _ ? C = ea(S, n, {
    goForward: _ ? m : i === "ltr" ? f : g,
    loop: s
  }) : v ? C = S.at(0) || null : w && (C = S.at(-1) || null), c && C?.focus(), C;
}
function ea(e, n, t, o = e.length) {
  if (--o === 0) return null;
  const r = e.indexOf(n), a = t.goForward ? r + 1 : r - 1;
  if (!t.loop && (a < 0 || a >= e.length)) return null;
  const l = (a + e.length) % e.length, s = e[l];
  return s ? s.hasAttribute("disabled") && s.getAttribute("disabled") !== "false" ? ea(e, s, t, o) : s : null;
}
const [fn] = se("ConfigProvider");
function Yl(e, n) {
  var t;
  const o = Nt();
  return ge(() => {
    o.value = e();
  }, {
    ...n,
    flush: (t = void 0) != null ? t : "sync"
  }), Er(o);
}
function At(e) {
  return Mr() ? (Or(e), !0) : !1;
}
function Jl() {
  const e = /* @__PURE__ */ new Set(), n = (a) => {
    e.delete(a);
  };
  return {
    on: (a) => {
      e.add(a);
      const l = () => n(a);
      return At(l), {
        off: l
      };
    },
    off: n,
    trigger: (...a) => Promise.all(Array.from(e).map((l) => l(...a))),
    clear: () => {
      e.clear();
    }
  };
}
function Zl(e) {
  let n = !1, t;
  const o = qr(!0);
  return (...r) => (n || (t = o.run(() => e(...r)), n = !0), t);
}
function ta(e) {
  let n = 0, t, o;
  const r = () => {
    n -= 1, o && n <= 0 && (o.stop(), t = void 0, o = void 0);
  };
  return (...a) => (n += 1, o || (o = qr(!0), t = o.run(() => e(...a))), At(r), t);
}
function Ql(e) {
  if (!Xe(e))
    return Rt(e);
  const n = new Proxy({}, {
    get(t, o, r) {
      return d(Reflect.get(e.value, o, r));
    },
    set(t, o, r) {
      return Xe(e.value[o]) && !Xe(r) ? e.value[o].value = r : e.value[o] = r, !0;
    },
    deleteProperty(t, o) {
      return Reflect.deleteProperty(e.value, o);
    },
    has(t, o) {
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
  return Rt(n);
}
function es(e) {
  return Ql(q(e));
}
function ts(e, ...n) {
  const t = n.flat(), o = t[0];
  return es(() => Object.fromEntries(typeof o == "function" ? Object.entries(me(e)).filter(([r, a]) => !o(ce(a), r)) : Object.entries(me(e)).filter((r) => !t.includes(r[0]))));
}
const Ze = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const ns = (e) => typeof e < "u", os = Object.prototype.toString, rs = (e) => os.call(e) === "[object Object]", tr = /* @__PURE__ */ as();
function as() {
  var e, n;
  return Ze && ((e = window?.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((n = window?.navigator) == null ? void 0 : n.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent));
}
function ls(e) {
  return it();
}
function An(e) {
  return Array.isArray(e) ? e : [e];
}
function na(e, n = 1e4) {
  return el((t, o) => {
    let r = ce(e), a;
    const l = () => setTimeout(() => {
      r = ce(e), o();
    }, ce(n));
    return At(() => {
      clearTimeout(a);
    }), {
      get() {
        return t(), r;
      },
      set(s) {
        r = s, o(), clearTimeout(a), a = l();
      }
    };
  });
}
const ss = ce;
function is(e, n) {
  ls() && Fr(e, n);
}
function oa(e, n, t = {}) {
  const {
    immediate: o = !0,
    immediateCallback: r = !1
  } = t, a = Nt(!1);
  let l = null;
  function s() {
    l && (clearTimeout(l), l = null);
  }
  function i() {
    a.value = !1, s();
  }
  function u(...c) {
    r && e(), s(), a.value = !0, l = setTimeout(() => {
      a.value = !1, l = null, e(...c);
    }, ce(n));
  }
  return o && (a.value = !0, Ze && u()), At(i), {
    isPending: Er(a),
    start: u,
    stop: i
  };
}
function us(e, n, t) {
  return oe(
    e,
    n,
    {
      ...t,
      immediate: !0
    }
  );
}
const pn = Ze ? window : void 0;
function ze(e) {
  var n;
  const t = ce(e);
  return (n = t?.$el) != null ? n : t;
}
function pt(...e) {
  const n = [], t = () => {
    n.forEach((s) => s()), n.length = 0;
  }, o = (s, i, u, c) => (s.addEventListener(i, u, c), () => s.removeEventListener(i, u, c)), r = q(() => {
    const s = An(ce(e[0])).filter((i) => i != null);
    return s.every((i) => typeof i != "string") ? s : void 0;
  }), a = us(
    () => {
      var s, i;
      return [
        (i = (s = r.value) == null ? void 0 : s.map((u) => ze(u))) != null ? i : [pn].filter((u) => u != null),
        An(ce(r.value ? e[1] : e[0])),
        An(d(r.value ? e[2] : e[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        ce(r.value ? e[3] : e[2])
      ];
    },
    ([s, i, u, c]) => {
      if (t(), !s?.length || !i?.length || !u?.length)
        return;
      const f = rs(c) ? { ...c } : c;
      n.push(
        ...s.flatMap(
          (g) => i.flatMap(
            (p) => u.map((m) => o(g, p, m, f))
          )
        )
      );
    },
    { flush: "post" }
  ), l = () => {
    a(), t();
  };
  return At(t), l;
}
function ra() {
  const e = Nt(!1), n = it();
  return n && ve(() => {
    e.value = !0;
  }, n), e;
}
function ds(e) {
  const n = ra();
  return q(() => (n.value, !!e()));
}
function cs(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (n) => n.key === e : Array.isArray(e) ? (n) => e.includes(n.key) : () => !0;
}
function fs(...e) {
  let n, t, o = {};
  e.length === 3 ? (n = e[0], t = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (n = !0, t = e[0], o = e[1]) : (n = e[0], t = e[1]) : (n = !0, t = e[0]);
  const {
    target: r = pn,
    eventName: a = "keydown",
    passive: l = !1,
    dedupe: s = !1
  } = o, i = cs(n);
  return pt(r, a, (c) => {
    c.repeat && ce(s) || i(c) && t(c);
  }, l);
}
function ps(e) {
  return JSON.parse(JSON.stringify(e));
}
function gs(e, n, t = {}) {
  const { window: o = pn, ...r } = t;
  let a;
  const l = ds(() => o && "ResizeObserver" in o), s = () => {
    a && (a.disconnect(), a = void 0);
  }, i = q(() => {
    const f = ce(e);
    return Array.isArray(f) ? f.map((g) => ze(g)) : [ze(f)];
  }), u = oe(
    i,
    (f) => {
      if (s(), l.value && o) {
        a = new ResizeObserver(n);
        for (const g of f)
          g && a.observe(g, r);
      }
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    s(), u();
  };
  return At(c), {
    isSupported: l,
    stop: c
  };
}
function Fe(e, n, t, o = {}) {
  var r, a, l;
  const {
    clone: s = !1,
    passive: i = !1,
    eventName: u,
    deep: c = !1,
    defaultValue: f,
    shouldEmit: g
  } = o, p = it(), m = t || p?.emit || ((r = p?.$emit) == null ? void 0 : r.bind(p)) || ((l = (a = p?.proxy) == null ? void 0 : a.$emit) == null ? void 0 : l.bind(p?.proxy));
  let v = u;
  n || (n = "modelValue"), v = v || `update:${n.toString()}`;
  const w = (S) => s ? typeof s == "function" ? s(S) : ps(S) : S, _ = () => ns(e[n]) ? w(e[n]) : f, $ = (S) => {
    g ? g(S) && m(v, S) : m(v, S);
  };
  if (i) {
    const S = _(), C = I(S);
    let k = !1;
    return oe(
      () => e[n],
      (M) => {
        k || (k = !0, C.value = w(M), le(() => k = !1));
      }
    ), oe(
      C,
      (M) => {
        !k && (M !== e[n] || c) && $(M);
      },
      { deep: c }
    ), C;
  } else
    return q({
      get() {
        return _();
      },
      set(S) {
        $(S);
      }
    });
}
function In(e) {
  if (e === null || typeof e != "object")
    return !1;
  const n = Object.getPrototypeOf(e);
  return n !== null && n !== Object.prototype && Object.getPrototypeOf(n) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function Jn(e, n, t = ".", o) {
  if (!In(n))
    return Jn(e, {}, t, o);
  const r = Object.assign({}, n);
  for (const a in e) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const l = e[a];
    l != null && (o && o(r, a, l, t) || (Array.isArray(l) && Array.isArray(r[a]) ? r[a] = [...l, ...r[a]] : In(l) && In(r[a]) ? r[a] = Jn(
      l,
      r[a],
      (t ? `${t}.` : "") + a.toString(),
      o
    ) : r[a] = l));
  }
  return r;
}
function ms(e) {
  return (...n) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    n.reduce((t, o) => Jn(t, o, "", e), {})
  );
}
const vs = ms(), hs = ta(() => {
  const e = I(/* @__PURE__ */ new Map()), n = I(), t = q(() => {
    for (const l of e.value.values()) if (l) return !0;
    return !1;
  }), o = fn({ scrollBody: I(!0) });
  let r = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.documentElement.style.removeProperty("--scrollbar-width"), document.body.style.overflow = n.value ?? "", tr && r?.(), n.value = void 0;
  };
  return oe(t, (l, s) => {
    if (!Ze) return;
    if (!l) {
      s && a();
      return;
    }
    n.value === void 0 && (n.value = document.body.style.overflow);
    const i = window.innerWidth - document.documentElement.clientWidth, u = {
      padding: i,
      margin: 0
    }, c = o.scrollBody?.value ? typeof o.scrollBody.value == "object" ? vs({
      padding: o.scrollBody.value.padding === !0 ? i : o.scrollBody.value.padding,
      margin: o.scrollBody.value.margin === !0 ? i : o.scrollBody.value.margin
    }, u) : u : {
      padding: 0,
      margin: 0
    };
    i > 0 && (document.body.style.paddingRight = typeof c.padding == "number" ? `${c.padding}px` : String(c.padding), document.body.style.marginRight = typeof c.margin == "number" ? `${c.margin}px` : String(c.margin), document.documentElement.style.setProperty("--scrollbar-width", `${i}px`), document.body.style.overflow = "hidden"), tr && (r = pt(document, "touchmove", (f) => ys(f), { passive: !1 })), le(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, {
    immediate: !0,
    flush: "sync"
  }), e;
});
function So(e) {
  const n = Math.random().toString(36).substring(2, 7), t = hs();
  t.value.set(n, e ?? !1);
  const o = q({
    get: () => t.value.get(n) ?? !1,
    set: (r) => t.value.set(n, r)
  });
  return is(() => {
    t.value.delete(n);
  }), o;
}
function aa(e) {
  const n = window.getComputedStyle(e);
  if (n.overflowX === "scroll" || n.overflowY === "scroll" || n.overflowX === "auto" && e.clientWidth < e.scrollWidth || n.overflowY === "auto" && e.clientHeight < e.scrollHeight) return !0;
  {
    const t = e.parentNode;
    return !(t instanceof Element) || t.tagName === "BODY" ? !1 : aa(t);
  }
}
function ys(e) {
  const n = e || window.event, t = n.target;
  return t instanceof Element && aa(t) ? !1 : n.touches.length > 1 ? !0 : (n.preventDefault && n.cancelable && n.preventDefault(), !1);
}
function jt(e) {
  const n = fn({ dir: I("ltr") });
  return q(() => e?.value || n.dir?.value || "ltr");
}
function It(e) {
  const n = it(), t = n?.type.emits, o = {};
  return t?.length || console.warn(`No emitted event found. Please check component: ${n?.type.__name}`), t?.forEach((r) => {
    o[tl(Dr(r))] = (...a) => e(r, ...a);
  }), o;
}
let En = 0;
function la() {
  ge((e) => {
    if (!Ze) return;
    const n = document.querySelectorAll("[data-reka-focus-guard]");
    document.body.insertAdjacentElement("afterbegin", n[0] ?? nr()), document.body.insertAdjacentElement("beforeend", n[1] ?? nr()), En++, e(() => {
      En === 1 && document.querySelectorAll("[data-reka-focus-guard]").forEach((t) => t.remove()), En--;
    });
  });
}
function nr() {
  const e = document.createElement("span");
  return e.setAttribute("data-reka-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
function sa(e) {
  return q(() => ss(e) ? !!ze(e)?.closest("form") : !0);
}
function H() {
  const e = it(), n = I(), t = q(() => ["#text", "#comment"].includes(n.value?.$el.nodeName) ? n.value?.$el.nextElementSibling : ze(n)), o = Object.assign({}, e.exposed), r = {};
  for (const l in e.props) Object.defineProperty(r, l, {
    enumerable: !0,
    configurable: !0,
    get: () => e.props[l]
  });
  if (Object.keys(o).length > 0) for (const l in o) Object.defineProperty(r, l, {
    enumerable: !0,
    configurable: !0,
    get: () => o[l]
  });
  Object.defineProperty(r, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => e.vnode.el
  }), e.exposed = r;
  function a(l) {
    n.value = l, l && (Object.defineProperty(r, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => l instanceof Element ? l : l.$el
    }), e.exposed = r);
  }
  return {
    forwardRef: a,
    currentRef: n,
    currentElement: t
  };
}
function xe(e) {
  const n = it(), t = Object.keys(n?.type.props ?? {}).reduce((r, a) => {
    const l = (n?.type.props[a]).default;
    return l !== void 0 && (r[a] = l), r;
  }, {}), o = nl(e);
  return q(() => {
    const r = {}, a = n?.vnode.props ?? {};
    return Object.keys(a).forEach((l) => {
      r[Dr(l)] = a[l];
    }), Object.keys({
      ...t,
      ...r
    }).reduce((l, s) => (o.value[s] !== void 0 && (l[s] = o.value[s]), l), {});
  });
}
function he(e, n) {
  const t = xe(e), o = n ? It(n) : {};
  return q(() => ({
    ...t.value,
    ...o
  }));
}
function ws(e, n) {
  const t = na(!1, 300), o = I(null), r = Jl();
  function a() {
    o.value = null, t.value = !1;
  }
  function l(s, i) {
    const u = s.currentTarget, c = {
      x: s.clientX,
      y: s.clientY
    }, f = _s(c, u.getBoundingClientRect()), g = bs(c, f), p = Cs(i.getBoundingClientRect()), m = xs([...g, ...p]);
    o.value = m, t.value = !0;
  }
  return ge((s) => {
    if (e.value && n.value) {
      const i = (c) => l(c, n.value), u = (c) => l(c, e.value);
      e.value.addEventListener("pointerleave", i), n.value.addEventListener("pointerleave", u), s(() => {
        e.value?.removeEventListener("pointerleave", i), n.value?.removeEventListener("pointerleave", u);
      });
    }
  }), ge((s) => {
    if (o.value) {
      const i = (u) => {
        if (!o.value || !(u.target instanceof HTMLElement)) return;
        const c = u.target, f = {
          x: u.clientX,
          y: u.clientY
        }, g = e.value?.contains(c) || n.value?.contains(c), p = !Ss(f, o.value), m = !!c.closest("[data-grace-area-trigger]");
        g ? a() : (p || m) && (a(), r.trigger());
      };
      e.value?.ownerDocument.addEventListener("pointermove", i), s(() => e.value?.ownerDocument.removeEventListener("pointermove", i));
    }
  }), {
    isPointerInTransit: t,
    onPointerExit: r.on
  };
}
function _s(e, n) {
  const t = Math.abs(n.top - e.y), o = Math.abs(n.bottom - e.y), r = Math.abs(n.right - e.x), a = Math.abs(n.left - e.x);
  switch (Math.min(t, o, r, a)) {
    case a:
      return "left";
    case r:
      return "right";
    case t:
      return "top";
    case o:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function bs(e, n, t = 5) {
  const o = [];
  switch (n) {
    case "top":
      o.push({
        x: e.x - t,
        y: e.y + t
      }, {
        x: e.x + t,
        y: e.y + t
      });
      break;
    case "bottom":
      o.push({
        x: e.x - t,
        y: e.y - t
      }, {
        x: e.x + t,
        y: e.y - t
      });
      break;
    case "left":
      o.push({
        x: e.x + t,
        y: e.y - t
      }, {
        x: e.x + t,
        y: e.y + t
      });
      break;
    case "right":
      o.push({
        x: e.x - t,
        y: e.y - t
      }, {
        x: e.x - t,
        y: e.y + t
      });
      break;
  }
  return o;
}
function Cs(e) {
  const { top: n, right: t, bottom: o, left: r } = e;
  return [
    {
      x: r,
      y: n
    },
    {
      x: t,
      y: n
    },
    {
      x: t,
      y: o
    },
    {
      x: r,
      y: o
    }
  ];
}
function Ss(e, n) {
  const { x: t, y: o } = e;
  let r = !1;
  for (let a = 0, l = n.length - 1; a < n.length; l = a++) {
    const s = n[a].x, i = n[a].y, u = n[l].x, c = n[l].y;
    i > o != c > o && t < (u - s) * (o - i) / (c - i) + s && (r = !r);
  }
  return r;
}
function xs(e) {
  const n = e.slice();
  return n.sort((t, o) => t.x < o.x ? -1 : t.x > o.x ? 1 : t.y < o.y ? -1 : t.y > o.y ? 1 : 0), Rs(n);
}
function Rs(e) {
  if (e.length <= 1) return e.slice();
  const n = [];
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    for (; n.length >= 2; ) {
      const a = n[n.length - 1], l = n[n.length - 2];
      if ((a.x - l.x) * (r.y - l.y) >= (a.y - l.y) * (r.x - l.x)) n.pop();
      else break;
    }
    n.push(r);
  }
  n.pop();
  const t = [];
  for (let o = e.length - 1; o >= 0; o--) {
    const r = e[o];
    for (; t.length >= 2; ) {
      const a = t[t.length - 1], l = t[t.length - 2];
      if ((a.x - l.x) * (r.y - l.y) >= (a.y - l.y) * (r.x - l.x)) t.pop();
      else break;
    }
    t.push(r);
  }
  return t.pop(), n.length === 1 && t.length === 1 && n[0].x === t[0].x && n[0].y === t[0].y ? n : n.concat(t);
}
var Ps = function(e) {
  if (typeof document > "u")
    return null;
  var n = Array.isArray(e) ? e[0] : e;
  return n.ownerDocument.body;
}, Ct = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ new WeakMap(), Zt = {}, Mn = 0, ia = function(e) {
  return e && (e.host || ia(e.parentNode));
}, $s = function(e, n) {
  return n.map(function(t) {
    if (e.contains(t))
      return t;
    var o = ia(t);
    return o && e.contains(o) ? o : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(t) {
    return !!t;
  });
}, ks = function(e, n, t, o) {
  var r = $s(n, Array.isArray(e) ? e : [e]);
  Zt[t] || (Zt[t] = /* @__PURE__ */ new WeakMap());
  var a = Zt[t], l = [], s = /* @__PURE__ */ new Set(), i = new Set(r), u = function(f) {
    !f || s.has(f) || (s.add(f), u(f.parentNode));
  };
  r.forEach(u);
  var c = function(f) {
    !f || i.has(f) || Array.prototype.forEach.call(f.children, function(g) {
      if (s.has(g))
        c(g);
      else
        try {
          var p = g.getAttribute(o), m = p !== null && p !== "false", v = (Ct.get(g) || 0) + 1, w = (a.get(g) || 0) + 1;
          Ct.set(g, v), a.set(g, w), l.push(g), v === 1 && m && Jt.set(g, !0), w === 1 && g.setAttribute(t, "true"), m || g.setAttribute(o, "true");
        } catch (_) {
          console.error("aria-hidden: cannot operate on ", g, _);
        }
    });
  };
  return c(n), s.clear(), Mn++, function() {
    l.forEach(function(f) {
      var g = Ct.get(f) - 1, p = a.get(f) - 1;
      Ct.set(f, g), a.set(f, p), g || (Jt.has(f) || f.removeAttribute(o), Jt.delete(f)), p || f.removeAttribute(t);
    }), Mn--, Mn || (Ct = /* @__PURE__ */ new WeakMap(), Ct = /* @__PURE__ */ new WeakMap(), Jt = /* @__PURE__ */ new WeakMap(), Zt = {});
  };
}, As = function(e, n, t) {
  t === void 0 && (t = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = Ps(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live], script"))), ks(o, r, t, "aria-hidden")) : function() {
    return null;
  };
};
function xo(e) {
  let n;
  oe(() => ze(e), (t) => {
    t ? n = As(t) : n && n();
  }), cn(() => {
    n && n();
  });
}
let Is = 0;
function Ne(e, n = "reka") {
  if ("useId" in Wo) return `${n}-${Wo.useId?.()}`;
  const t = fn({ useId: void 0 });
  return t.useId ? `${n}-${t.useId()}` : `${n}-${++Is}`;
}
function Es(e) {
  const n = I(), t = q(() => n.value?.width ?? 0), o = q(() => n.value?.height ?? 0);
  return ve(() => {
    const r = ze(e);
    if (r) {
      n.value = {
        width: r.offsetWidth,
        height: r.offsetHeight
      };
      const a = new ResizeObserver((l) => {
        if (!Array.isArray(l) || !l.length) return;
        const s = l[0];
        let i, u;
        if ("borderBoxSize" in s) {
          const c = s.borderBoxSize, f = Array.isArray(c) ? c[0] : c;
          i = f.inlineSize, u = f.blockSize;
        } else
          i = r.offsetWidth, u = r.offsetHeight;
        n.value = {
          width: i,
          height: u
        };
      });
      return a.observe(r, { box: "border-box" }), () => a.unobserve(r);
    } else n.value = void 0;
  }), {
    width: t,
    height: o
  };
}
function Ms(e, n) {
  const t = I(e);
  function o(a) {
    return n[t.value][a] ?? t.value;
  }
  return {
    state: t,
    dispatch: (a) => {
      t.value = o(a);
    }
  };
}
function Ro(e) {
  const n = na("", 1e3);
  return {
    search: n,
    handleTypeaheadSearch: (r, a) => {
      n.value = n.value + r;
      {
        const l = _e(), s = a.map((g) => ({
          ...g,
          textValue: g.value?.textValue ?? g.ref.textContent?.trim() ?? ""
        })), i = s.find((g) => g.ref === l), u = s.map((g) => g.textValue), c = qs(u, n.value, i?.textValue), f = s.find((g) => g.textValue === c);
        return f && f.ref.focus(), f?.ref;
      }
    },
    resetTypeahead: () => {
      n.value = "";
    }
  };
}
function Os(e, n) {
  return e.map((t, o) => e[(n + o) % e.length]);
}
function qs(e, n, t) {
  const r = n.length > 1 && Array.from(n).every((u) => u === n[0]) ? n[0] : n, a = t ? e.indexOf(t) : -1;
  let l = Os(e, Math.max(a, 0));
  r.length === 1 && (l = l.filter((u) => u !== t));
  const i = l.find((u) => u.toLowerCase().startsWith(r.toLowerCase()));
  return i !== t ? i : void 0;
}
function Fs(e, n) {
  const t = I({}), o = I("none"), r = I(e), a = e.value ? "mounted" : "unmounted";
  let l;
  const s = n.value?.ownerDocument.defaultView ?? pn, { state: i, dispatch: u } = Ms(a, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: { MOUNT: "mounted" }
  }), c = (w) => {
    if (Ze) {
      const _ = new CustomEvent(w, {
        bubbles: !1,
        cancelable: !1
      });
      n.value?.dispatchEvent(_);
    }
  };
  oe(e, async (w, _) => {
    const $ = _ !== w;
    if (await le(), $) {
      const S = o.value, C = Qt(n.value);
      w ? (u("MOUNT"), c("enter"), C === "none" && c("after-enter")) : C === "none" || C === "undefined" || t.value?.display === "none" ? (u("UNMOUNT"), c("leave"), c("after-leave")) : _ && S !== C ? (u("ANIMATION_OUT"), c("leave")) : (u("UNMOUNT"), c("after-leave"));
    }
  }, { immediate: !0 });
  const f = (w) => {
    const _ = Qt(n.value), $ = _.includes(CSS.escape(w.animationName)), S = i.value === "mounted" ? "enter" : "leave";
    if (w.target === n.value && $ && (c(`after-${S}`), u("ANIMATION_END"), !r.value)) {
      const C = n.value.style.animationFillMode;
      n.value.style.animationFillMode = "forwards", l = s?.setTimeout(() => {
        n.value?.style.animationFillMode === "forwards" && (n.value.style.animationFillMode = C);
      });
    }
    w.target === n.value && _ === "none" && u("ANIMATION_END");
  }, g = (w) => {
    w.target === n.value && (o.value = Qt(n.value));
  }, p = oe(n, (w, _) => {
    w ? (t.value = getComputedStyle(w), w.addEventListener("animationstart", g), w.addEventListener("animationcancel", f), w.addEventListener("animationend", f)) : (u("ANIMATION_END"), l !== void 0 && s?.clearTimeout(l), _?.removeEventListener("animationstart", g), _?.removeEventListener("animationcancel", f), _?.removeEventListener("animationend", f));
  }, { immediate: !0 }), m = oe(i, () => {
    const w = Qt(n.value);
    o.value = i.value === "mounted" ? w : "none";
  });
  return cn(() => {
    p(), m();
  }), { isPresent: q(() => ["mounted", "unmountSuspended"].includes(i.value)) };
}
function Qt(e) {
  return e && getComputedStyle(e).animationName || "none";
}
var mt = b({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: !0
    },
    forceMount: { type: Boolean }
  },
  slots: {},
  setup(e, { slots: n, expose: t }) {
    const { present: o, forceMount: r } = me(e), a = I(), { isPresent: l } = Fs(o, a);
    t({ present: l });
    let s = n.default({ present: l.value });
    s = Co(s || []);
    const i = it();
    if (s && s?.length > 1) {
      const u = i?.parent?.type.name ? `<${i.parent.type.name} />` : "component";
      throw new Error([
        `Detected an invalid children for \`${u}\` for  \`Presence\` component.`,
        "",
        "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
        "You can apply a few solutions:",
        ["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((c) => `  - ${c}`).join(`
`)
      ].join(`
`));
    }
    return () => r.value || o.value || l.value ? Ce(n.default({ present: l.value })[0], { ref: (u) => {
      const c = ze(u);
      return typeof c?.hasAttribute > "u" || (c?.hasAttribute("data-reka-popper-content-wrapper") ? a.value = c.firstElementChild : a.value = c), c;
    } }) : null;
  }
});
const Zn = b({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: n, slots: t }) {
    return () => {
      if (!t.default) return null;
      const o = Co(t.default()), r = o.findIndex((i) => i.type !== Br);
      if (r === -1) return o;
      const a = o[r];
      delete a.props?.ref;
      const l = a.props ? F(n, a.props) : n, s = ol({
        ...a,
        props: {}
      }, l);
      return o.length === 1 ? s : (o[r] = s, o);
    };
  }
}), Ds = [
  "area",
  "img",
  "input"
], X = b({
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
  setup(e, { attrs: n, slots: t }) {
    const o = e.asChild ? "template" : e.as;
    return typeof o == "string" && Ds.includes(o) ? () => Ce(o, n) : o !== "template" ? () => Ce(e.as, n, { default: t.default }) : () => Ce(Zn, n, { default: t.default });
  }
});
function Qn() {
  const e = I(), n = q(() => ["#text", "#comment"].includes(e.value?.$el.nodeName) ? e.value?.$el.nextElementSibling : ze(e));
  return {
    primitiveElement: e,
    currentElement: n
  };
}
const [ua, Bs] = se("CollapsibleRoot");
var Ts = /* @__PURE__ */ b({
  __name: "CollapsibleRoot",
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
    disabled: {
      type: Boolean,
      required: !1
    },
    unmountOnHide: {
      type: Boolean,
      required: !1,
      default: !0
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
  emits: ["update:open"],
  setup(e, { expose: n, emit: t }) {
    const o = e, a = Fe(o, "open", t, {
      defaultValue: o.defaultOpen,
      passive: o.open === void 0
    }), { disabled: l, unmountOnHide: s } = me(o);
    return Bs({
      contentId: "",
      disabled: l,
      open: a,
      unmountOnHide: s,
      onOpenToggle: () => {
        l.value || (a.value = !a.value);
      }
    }), n({ open: a }), H(), (i, u) => (y(), x(d(X), {
      as: i.as,
      "as-child": o.asChild,
      "data-state": d(a) ? "open" : "closed",
      "data-disabled": d(l) ? "" : void 0
    }, {
      default: h(() => [R(i.$slots, "default", { open: d(a) })]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-state",
      "data-disabled"
    ]));
  }
}), Vs = Ts, Ls = /* @__PURE__ */ b({
  inheritAttrs: !1,
  __name: "CollapsibleContent",
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
  emits: ["contentFound"],
  setup(e, { emit: n }) {
    const t = e, o = n, r = ua();
    r.contentId ||= Ne(void 0, "reka-collapsible-content");
    const a = I(), { forwardRef: l, currentElement: s } = H(), i = I(0), u = I(0), c = q(() => r.open.value), f = I(c.value), g = I();
    oe(() => [c.value, a.value?.present], async () => {
      await le();
      const m = s.value;
      if (!m) return;
      g.value = g.value || {
        transitionDuration: m.style.transitionDuration,
        animationName: m.style.animationName
      }, m.style.transitionDuration = "0s", m.style.animationName = "none";
      const v = m.getBoundingClientRect();
      u.value = v.height, i.value = v.width, f.value || (m.style.transitionDuration = g.value.transitionDuration, m.style.animationName = g.value.animationName);
    }, { immediate: !0 });
    const p = q(() => f.value && r.open.value);
    return ve(() => {
      requestAnimationFrame(() => {
        f.value = !1;
      });
    }), pt(s, "beforematch", (m) => {
      requestAnimationFrame(() => {
        r.onOpenToggle(), o("contentFound");
      });
    }), (m, v) => (y(), x(d(mt), {
      ref_key: "presentRef",
      ref: a,
      present: m.forceMount || d(r).open.value,
      "force-mount": !0
    }, {
      default: h(({ present: w }) => [A(d(X), F(m.$attrs, {
        id: d(r).contentId,
        ref: d(l),
        "as-child": t.asChild,
        as: m.as,
        hidden: w ? void 0 : d(r).unmountOnHide.value ? "" : "until-found",
        "data-state": p.value ? void 0 : d(r).open.value ? "open" : "closed",
        "data-disabled": d(r).disabled?.value ? "" : void 0,
        style: {
          "--reka-collapsible-content-height": `${u.value}px`,
          "--reka-collapsible-content-width": `${i.value}px`
        }
      }), {
        default: h(() => [!d(r).unmountOnHide.value || w ? R(m.$slots, "default", { key: 0 }) : Y("v-if", !0)]),
        _: 2
      }, 1040, [
        "id",
        "as-child",
        "as",
        "hidden",
        "data-state",
        "data-disabled",
        "style"
      ])]),
      _: 3
    }, 8, ["present"]));
  }
}), zs = Ls, Ns = /* @__PURE__ */ b({
  __name: "CollapsibleTrigger",
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
    const n = e;
    H();
    const t = ua();
    return (o, r) => (y(), x(d(X), {
      type: o.as === "button" ? "button" : void 0,
      as: o.as,
      "as-child": n.asChild,
      "aria-controls": d(t).contentId,
      "aria-expanded": d(t).open.value,
      "data-state": d(t).open.value ? "open" : "closed",
      "data-disabled": d(t).disabled?.value ? "" : void 0,
      disabled: d(t).disabled?.value,
      onClick: d(t).onOpenToggle
    }, {
      default: h(() => [R(o.$slots, "default")]),
      _: 3
    }, 8, [
      "type",
      "as",
      "as-child",
      "aria-controls",
      "aria-expanded",
      "data-state",
      "data-disabled",
      "disabled",
      "onClick"
    ]));
  }
}), Hs = Ns;
function Gs({ type: e, defaultValue: n, modelValue: t }) {
  const o = t || n;
  return t !== void 0 || n !== void 0 ? Array.isArray(o) ? "multiple" : "single" : e ?? "single";
}
function js({ type: e, defaultValue: n, modelValue: t }) {
  return e || Gs({
    type: e,
    defaultValue: n,
    modelValue: t
  });
}
function Us({ type: e, defaultValue: n }) {
  return n !== void 0 ? n : e === "single" ? void 0 : [];
}
function Ks(e, n) {
  const t = q(() => js(e)), o = Fe(e, "modelValue", n, {
    defaultValue: Us(e),
    passive: e.modelValue === void 0,
    deep: !0
  });
  function r(l) {
    if (t.value === "single") o.value = Tt(l, o.value) ? void 0 : l;
    else {
      const s = Array.isArray(o.value) ? [...o.value || []] : [o.value].filter(Boolean);
      if (Wl(s, l)) {
        const i = s.findIndex((u) => Tt(u, l));
        s.splice(i, 1);
      } else s.push(l);
      o.value = s;
    }
  }
  const a = q(() => t.value === "single");
  return {
    modelValue: o,
    changeModelValue: r,
    isSingle: a
  };
}
const [gn, Ws] = se("AccordionRoot");
var Xs = /* @__PURE__ */ b({
  __name: "AccordionRoot",
  props: {
    collapsible: {
      type: Boolean,
      required: !1,
      default: !1
    },
    disabled: {
      type: Boolean,
      required: !1,
      default: !1
    },
    dir: {
      type: String,
      required: !1
    },
    orientation: {
      type: String,
      required: !1,
      default: "vertical"
    },
    unmountOnHide: {
      type: Boolean,
      required: !1,
      default: !0
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1
    },
    type: {
      type: String,
      required: !1
    },
    modelValue: {
      type: null,
      required: !1
    },
    defaultValue: {
      type: null,
      required: !1
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, o = n, { dir: r, disabled: a, unmountOnHide: l } = me(t), s = jt(r), { modelValue: i, changeModelValue: u, isSingle: c } = Ks(t, o), { forwardRef: f, currentElement: g } = H();
    return Ws({
      disabled: a,
      direction: s,
      orientation: t.orientation,
      parentElement: g,
      isSingle: c,
      collapsible: t.collapsible,
      modelValue: i,
      changeModelValue: u,
      unmountOnHide: l
    }), (p, m) => (y(), x(d(X), {
      ref: d(f),
      "as-child": p.asChild,
      as: p.as
    }, {
      default: h(() => [R(p.$slots, "default", { modelValue: d(i) })]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
}), Ys = Xs, eo = /* @__PURE__ */ (function(e) {
  return e.Open = "open", e.Closed = "closed", e;
})(eo || {});
const [Po, Js] = se("AccordionItem");
var Zs = /* @__PURE__ */ b({
  __name: "AccordionItem",
  props: {
    disabled: {
      type: Boolean,
      required: !1
    },
    value: {
      type: String,
      required: !0
    },
    unmountOnHide: {
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
  setup(e, { expose: n }) {
    const t = e, o = gn(), r = q(() => o.isSingle.value ? t.value === o.modelValue.value : Array.isArray(o.modelValue.value) && o.modelValue.value.includes(t.value)), a = q(() => o.disabled.value || t.disabled), l = q(() => a.value ? "" : void 0), s = q(() => r.value ? eo.Open : eo.Closed);
    n({
      open: r,
      dataDisabled: l
    });
    const { currentRef: i, currentElement: u } = H();
    Js({
      open: r,
      dataState: s,
      disabled: a,
      dataDisabled: l,
      triggerId: "",
      currentRef: i,
      currentElement: u,
      value: q(() => t.value)
    });
    function c(f) {
      const g = f.target;
      if (Array.from(o.parentElement.value?.querySelectorAll("[data-reka-collection-item]") ?? []).findIndex((v) => v === g) === -1) return null;
      Qr(f, g, o.parentElement.value, {
        arrowKeyOptions: o.orientation,
        dir: o.direction.value,
        focus: !0
      });
    }
    return (f, g) => (y(), x(d(Vs), {
      "data-orientation": d(o).orientation,
      "data-disabled": l.value,
      "data-state": s.value,
      disabled: a.value,
      open: r.value,
      as: t.as,
      "as-child": t.asChild,
      "unmount-on-hide": d(o).unmountOnHide.value,
      onKeydown: yo(c, [
        "up",
        "down",
        "left",
        "right",
        "home",
        "end"
      ])
    }, {
      default: h(() => [R(f.$slots, "default", { open: r.value })]),
      _: 3
    }, 8, [
      "data-orientation",
      "data-disabled",
      "data-state",
      "disabled",
      "open",
      "as",
      "as-child",
      "unmount-on-hide"
    ]));
  }
}), Qs = Zs, ei = /* @__PURE__ */ b({
  __name: "AccordionContent",
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
    const n = e, t = gn(), o = Po();
    return H(), (r, a) => (y(), x(d(zs), {
      role: "region",
      "as-child": n.asChild,
      as: r.as,
      "force-mount": n.forceMount,
      "aria-labelledby": d(o).triggerId,
      "data-state": d(o).dataState.value,
      "data-disabled": d(o).dataDisabled.value,
      "data-orientation": d(t).orientation,
      style: {
        "--reka-accordion-content-width": "var(--reka-collapsible-content-width)",
        "--reka-accordion-content-height": "var(--reka-collapsible-content-height)"
      },
      onContentFound: a[0] || (a[0] = (l) => d(t).changeModelValue(d(o).value.value))
    }, {
      default: h(() => [R(r.$slots, "default")]),
      _: 3
    }, 8, [
      "as-child",
      "as",
      "force-mount",
      "aria-labelledby",
      "data-state",
      "data-disabled",
      "data-orientation"
    ]));
  }
}), ti = ei, ni = /* @__PURE__ */ b({
  __name: "AccordionHeader",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "h3"
    }
  },
  setup(e) {
    const n = e, t = gn(), o = Po();
    return H(), (r, a) => (y(), x(d(X), {
      as: n.as,
      "as-child": n.asChild,
      "data-orientation": d(t).orientation,
      "data-state": d(o).dataState.value,
      "data-disabled": d(o).dataDisabled.value
    }, {
      default: h(() => [R(r.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-orientation",
      "data-state",
      "data-disabled"
    ]));
  }
}), oi = ni, ri = /* @__PURE__ */ b({
  __name: "AccordionTrigger",
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
    const n = e, t = gn(), o = Po();
    o.triggerId ||= Ne(void 0, "reka-accordion-trigger");
    function r() {
      const a = t.isSingle.value && o.open.value && !t.collapsible;
      o.disabled.value || a || t.changeModelValue(o.value.value);
    }
    return (a, l) => (y(), x(d(Hs), {
      id: d(o).triggerId,
      ref: d(o).currentRef,
      "data-reka-collection-item": "",
      as: n.as,
      "as-child": n.asChild,
      "aria-disabled": d(o).disabled.value || void 0,
      "aria-expanded": d(o).open.value || !1,
      "data-disabled": d(o).dataDisabled.value,
      "data-orientation": d(t).orientation,
      "data-state": d(o).dataState.value,
      disabled: d(o).disabled.value,
      onClick: r
    }, {
      default: h(() => [R(a.$slots, "default")]),
      _: 3
    }, 8, [
      "id",
      "as",
      "as-child",
      "aria-disabled",
      "aria-expanded",
      "data-disabled",
      "data-orientation",
      "data-state",
      "disabled"
    ]));
  }
}), ai = ri;
const [Qe, li] = se("DialogRoot");
var si = /* @__PURE__ */ b({
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
  setup(e, { emit: n }) {
    const t = e, r = Fe(t, "open", n, {
      defaultValue: t.defaultOpen,
      passive: t.open === void 0
    }), a = I(), l = I(), { modal: s } = me(t);
    return li({
      open: r,
      modal: s,
      openModal: () => {
        r.value = !0;
      },
      onOpenChange: (i) => {
        r.value = i;
      },
      onOpenToggle: () => {
        r.value = !r.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement: a,
      contentElement: l
    }), (i, u) => R(i.$slots, "default", {
      open: d(r),
      close: () => r.value = !1
    });
  }
}), ii = si, ui = /* @__PURE__ */ b({
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
    const n = e;
    H();
    const t = Qe();
    return (o, r) => (y(), x(d(X), F(n, {
      type: o.as === "button" ? "button" : void 0,
      onClick: r[0] || (r[0] = (a) => d(t).onOpenChange(!1))
    }), {
      default: h(() => [R(o.$slots, "default")]),
      _: 3
    }, 16, ["type"]));
  }
}), da = ui;
const di = "dismissableLayer.pointerDownOutside", ci = "dismissableLayer.focusOutside";
function ca(e, n) {
  const t = n.closest("[data-dismissable-layer]"), o = e.dataset.dismissableLayer === "" ? e : e.querySelector("[data-dismissable-layer]"), r = Array.from(e.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
  return !!(t && (o === t || r.indexOf(o) < r.indexOf(t)));
}
function fi(e, n, t = !0) {
  const o = n?.value?.ownerDocument ?? globalThis?.document, r = I(!1), a = I(() => {
  });
  return ge((l) => {
    if (!Ze || !ce(t)) return;
    const s = async (u) => {
      const c = u.target;
      if (!(!n?.value || !c)) {
        if (ca(n.value, c)) {
          r.value = !1;
          return;
        }
        if (u.target && !r.value) {
          let g = function() {
            bo(di, e, f);
          };
          const f = { originalEvent: u };
          u.pointerType === "touch" ? (o.removeEventListener("click", a.value), a.value = g, o.addEventListener("click", a.value, { once: !0 })) : g();
        } else o.removeEventListener("click", a.value);
        r.value = !1;
      }
    }, i = window.setTimeout(() => {
      o.addEventListener("pointerdown", s);
    }, 0);
    l(() => {
      window.clearTimeout(i), o.removeEventListener("pointerdown", s), o.removeEventListener("click", a.value);
    });
  }), { onPointerDownCapture: () => {
    ce(t) && (r.value = !0);
  } };
}
function pi(e, n, t = !0) {
  const o = n?.value?.ownerDocument ?? globalThis?.document, r = I(!1);
  return ge((a) => {
    if (!Ze || !ce(t)) return;
    const l = async (s) => {
      if (!n?.value) return;
      await le(), await le();
      const i = s.target;
      !n.value || !i || ca(n.value, i) || s.target && !r.value && bo(ci, e, { originalEvent: s });
    };
    o.addEventListener("focusin", l), a(() => o.removeEventListener("focusin", l));
  }), {
    onFocusCapture: () => {
      ce(t) && (r.value = !0);
    },
    onBlurCapture: () => {
      ce(t) && (r.value = !1);
    }
  };
}
const Ke = Rt({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var gi = /* @__PURE__ */ b({
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
  setup(e, { emit: n }) {
    const t = e, o = n, { forwardRef: r, currentElement: a } = H(), l = q(() => a.value?.ownerDocument ?? globalThis.document), s = q(() => Ke.layersRoot), i = q(() => a.value ? Array.from(s.value).indexOf(a.value) : -1), u = q(() => Ke.layersWithOutsidePointerEventsDisabled.size > 0), c = q(() => {
      const m = Array.from(s.value), [v] = [...Ke.layersWithOutsidePointerEventsDisabled].slice(-1), w = m.indexOf(v);
      return i.value >= w;
    }), f = fi(async (m) => {
      const v = [...Ke.branches].some((w) => w?.contains(m.target));
      !c.value || v || (o("pointerDownOutside", m), o("interactOutside", m), await le(), m.defaultPrevented || o("dismiss"));
    }, a), g = pi((m) => {
      [...Ke.branches].some((w) => w?.contains(m.target)) || (o("focusOutside", m), o("interactOutside", m), m.defaultPrevented || o("dismiss"));
    }, a);
    fs("Escape", (m) => {
      i.value === s.value.size - 1 && (o("escapeKeyDown", m), m.defaultPrevented || o("dismiss"));
    });
    let p;
    return ge((m) => {
      a.value && (t.disableOutsidePointerEvents && (Ke.layersWithOutsidePointerEventsDisabled.size === 0 && (p = l.value.body.style.pointerEvents, l.value.body.style.pointerEvents = "none"), Ke.layersWithOutsidePointerEventsDisabled.add(a.value)), s.value.add(a.value), m(() => {
        t.disableOutsidePointerEvents && Ke.layersWithOutsidePointerEventsDisabled.size === 1 && (l.value.body.style.pointerEvents = p);
      }));
    }), ge((m) => {
      m(() => {
        a.value && (s.value.delete(a.value), Ke.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (m, v) => (y(), x(d(X), {
      ref: d(r),
      "as-child": m.asChild,
      as: m.as,
      "data-dismissable-layer": "",
      style: Bt({ pointerEvents: u.value ? c.value ? "auto" : "none" : void 0 }),
      onFocusCapture: d(g).onFocusCapture,
      onBlurCapture: d(g).onBlurCapture,
      onPointerdownCapture: d(f).onPointerDownCapture
    }, {
      default: h(() => [R(m.$slots, "default")]),
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
}), mn = gi;
const mi = Zl(() => I([]));
function vi() {
  const e = mi();
  return {
    add(n) {
      const t = e.value[0];
      n !== t && t?.pause(), e.value = or(e.value, n), e.value.unshift(n);
    },
    remove(n) {
      e.value = or(e.value, n), e.value[0]?.resume();
    }
  };
}
function or(e, n) {
  const t = [...e], o = t.indexOf(n);
  return o !== -1 && t.splice(o, 1), t;
}
function hi(e) {
  return e.filter((n) => n.tagName !== "A");
}
const On = "focusScope.autoFocusOnMount", qn = "focusScope.autoFocusOnUnmount", rr = {
  bubbles: !1,
  cancelable: !0
};
function yi(e, { select: n = !1 } = {}) {
  const t = _e();
  for (const o of e)
    if (nt(o, { select: n }), _e() !== t) return !0;
}
function wi(e) {
  const n = fa(e), t = ar(n, e), o = ar(n.reverse(), e);
  return [t, o];
}
function fa(e) {
  const n = [], t = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (o) => {
    const r = o.tagName === "INPUT" && o.type === "hidden";
    return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
  } });
  for (; t.nextNode(); ) n.push(t.currentNode);
  return n;
}
function ar(e, n) {
  for (const t of e) if (!_i(t, { upTo: n })) return t;
}
function _i(e, { upTo: n }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (n !== void 0 && e === n) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function bi(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function nt(e, { select: n = !1 } = {}) {
  if (e && e.focus) {
    const t = _e();
    e.focus({ preventScroll: !0 }), e !== t && bi(e) && n && e.select();
  }
}
var Ci = /* @__PURE__ */ b({
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
  setup(e, { emit: n }) {
    const t = e, o = n, { currentRef: r, currentElement: a } = H(), l = I(null), s = vi(), i = Rt({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    ge((c) => {
      if (!Ze) return;
      const f = a.value;
      if (!t.trapped) return;
      function g(w) {
        if (i.paused || !f) return;
        const _ = w.target;
        f.contains(_) ? l.value = _ : nt(l.value, { select: !0 });
      }
      function p(w) {
        if (i.paused || !f) return;
        const _ = w.relatedTarget;
        _ !== null && (f.contains(_) || nt(l.value, { select: !0 }));
      }
      function m(w) {
        f.contains(l.value) || nt(f);
      }
      document.addEventListener("focusin", g), document.addEventListener("focusout", p);
      const v = new MutationObserver(m);
      f && v.observe(f, {
        childList: !0,
        subtree: !0
      }), c(() => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", p), v.disconnect();
      });
    }), ge(async (c) => {
      const f = a.value;
      if (await le(), !f) return;
      s.add(i);
      const g = _e();
      if (!f.contains(g)) {
        const m = new CustomEvent(On, rr);
        f.addEventListener(On, (v) => o("mountAutoFocus", v)), f.dispatchEvent(m), m.defaultPrevented || (yi(hi(fa(f)), { select: !0 }), _e() === g && nt(f));
      }
      c(() => {
        f.removeEventListener(On, (w) => o("mountAutoFocus", w));
        const m = new CustomEvent(qn, rr), v = (w) => {
          o("unmountAutoFocus", w);
        };
        f.addEventListener(qn, v), f.dispatchEvent(m), setTimeout(() => {
          m.defaultPrevented || nt(g ?? document.body, { select: !0 }), f.removeEventListener(qn, v), s.remove(i);
        }, 0);
      });
    });
    function u(c) {
      if (!t.loop && !t.trapped || i.paused) return;
      const f = c.key === "Tab" && !c.altKey && !c.ctrlKey && !c.metaKey, g = _e();
      if (f && g) {
        const p = c.currentTarget, [m, v] = wi(p);
        m && v ? !c.shiftKey && g === v ? (c.preventDefault(), t.loop && nt(m, { select: !0 })) : c.shiftKey && g === m && (c.preventDefault(), t.loop && nt(v, { select: !0 })) : g === p && c.preventDefault();
      }
    }
    return (c, f) => (y(), x(d(X), {
      ref_key: "currentRef",
      ref: r,
      tabindex: "-1",
      "as-child": c.asChild,
      as: c.as,
      onKeydown: u
    }, {
      default: h(() => [R(c.$slots, "default")]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
}), $o = Ci;
const Si = "menu.itemSelect", to = ["Enter", " "], xi = [
  "ArrowDown",
  "PageUp",
  "Home"
], pa = [
  "ArrowUp",
  "PageDown",
  "End"
], Ri = [...xi, ...pa];
[...to], [...to];
function ga(e) {
  return e ? "open" : "closed";
}
function ln(e) {
  return e === "indeterminate";
}
function ma(e) {
  return ln(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function no(e) {
  const n = _e();
  for (const t of e)
    if (t === n || (t.focus(), _e() !== n)) return;
}
function Pi(e, n) {
  const { x: t, y: o } = e;
  let r = !1;
  for (let a = 0, l = n.length - 1; a < n.length; l = a++) {
    const s = n[a].x, i = n[a].y, u = n[l].x, c = n[l].y;
    i > o != c > o && t < (u - s) * (o - i) / (c - i) + s && (r = !r);
  }
  return r;
}
function $i(e, n) {
  if (!n) return !1;
  const t = {
    x: e.clientX,
    y: e.clientY
  };
  return Pi(t, n);
}
function oo(e) {
  return e.pointerType === "mouse";
}
const ki = "DialogTitle", Ai = "DialogContent";
function Ii({ titleName: e = ki, contentName: n = Ai, componentLink: t = "dialog.html#title", titleId: o, descriptionId: r, contentElement: a }) {
  const l = `Warning: \`${n}\` requires a \`${e}\` for the component to be accessible for screen reader users.

If you want to hide the \`${e}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.reka-ui.com/docs/components/${t}`, s = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${n}.`;
  ve(() => {
    document.getElementById(o) || console.warn(l);
    const u = a.value?.getAttribute("aria-describedby");
    r && u && (document.getElementById(r) || console.warn(s));
  });
}
var Ei = /* @__PURE__ */ b({
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
  setup(e, { emit: n }) {
    const t = e, o = n, r = Qe(), { forwardRef: a, currentElement: l } = H();
    return r.titleId ||= Ne(void 0, "reka-dialog-title"), r.descriptionId ||= Ne(void 0, "reka-dialog-description"), ve(() => {
      r.contentElement = l, _e() !== document.body && (r.triggerElement.value = _e());
    }), process.env.NODE_ENV !== "production" && Ii({
      titleName: "DialogTitle",
      contentName: "DialogContent",
      componentLink: "dialog.html#title",
      titleId: r.titleId,
      descriptionId: r.descriptionId,
      contentElement: l
    }), (s, i) => (y(), x(d($o), {
      "as-child": "",
      loop: "",
      trapped: t.trapFocus,
      onMountAutoFocus: i[5] || (i[5] = (u) => o("openAutoFocus", u)),
      onUnmountAutoFocus: i[6] || (i[6] = (u) => o("closeAutoFocus", u))
    }, {
      default: h(() => [A(d(mn), F({
        id: d(r).contentId,
        ref: d(a),
        as: s.as,
        "as-child": s.asChild,
        "disable-outside-pointer-events": s.disableOutsidePointerEvents,
        role: "dialog",
        "aria-describedby": d(r).descriptionId,
        "aria-labelledby": d(r).titleId,
        "data-state": d(ga)(d(r).open.value)
      }, s.$attrs, {
        onDismiss: i[0] || (i[0] = (u) => d(r).onOpenChange(!1)),
        onEscapeKeyDown: i[1] || (i[1] = (u) => o("escapeKeyDown", u)),
        onFocusOutside: i[2] || (i[2] = (u) => o("focusOutside", u)),
        onInteractOutside: i[3] || (i[3] = (u) => o("interactOutside", u)),
        onPointerDownOutside: i[4] || (i[4] = (u) => o("pointerDownOutside", u))
      }), {
        default: h(() => [R(s.$slots, "default")]),
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
}), va = Ei, Mi = /* @__PURE__ */ b({
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
  setup(e, { emit: n }) {
    const t = e, o = n, r = Qe(), a = It(o), { forwardRef: l, currentElement: s } = H();
    return xo(s), (i, u) => (y(), x(va, F({
      ...t,
      ...d(a)
    }, {
      ref: d(l),
      "trap-focus": d(r).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: u[0] || (u[0] = (c) => {
        c.defaultPrevented || (c.preventDefault(), d(r).triggerElement.value?.focus());
      }),
      onPointerDownOutside: u[1] || (u[1] = (c) => {
        const f = c.detail.originalEvent, g = f.button === 0 && f.ctrlKey === !0;
        (f.button === 2 || g) && c.preventDefault();
      }),
      onFocusOutside: u[2] || (u[2] = (c) => {
        c.preventDefault();
      })
    }), {
      default: h(() => [R(i.$slots, "default")]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), Oi = Mi, qi = /* @__PURE__ */ b({
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
  setup(e, { emit: n }) {
    const t = e, r = It(n);
    H();
    const a = Qe(), l = I(!1), s = I(!1);
    return (i, u) => (y(), x(va, F({
      ...t,
      ...d(r)
    }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: u[0] || (u[0] = (c) => {
        c.defaultPrevented || (l.value || d(a).triggerElement.value?.focus(), c.preventDefault()), l.value = !1, s.value = !1;
      }),
      onInteractOutside: u[1] || (u[1] = (c) => {
        c.defaultPrevented || (l.value = !0, c.detail.originalEvent.type === "pointerdown" && (s.value = !0));
        const f = c.target;
        d(a).triggerElement.value?.contains(f) && c.preventDefault(), c.detail.originalEvent.type === "focusin" && s.value && c.preventDefault();
      })
    }), {
      default: h(() => [R(i.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Fi = qi, Di = /* @__PURE__ */ b({
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
  setup(e, { emit: n }) {
    const t = e, o = n, r = Qe(), a = It(o), { forwardRef: l } = H();
    return (s, i) => (y(), x(d(mt), { present: s.forceMount || d(r).open.value }, {
      default: h(() => [d(r).modal.value ? (y(), x(Oi, F({
        key: 0,
        ref: d(l)
      }, {
        ...t,
        ...d(a),
        ...s.$attrs
      }), {
        default: h(() => [R(s.$slots, "default")]),
        _: 3
      }, 16)) : (y(), x(Fi, F({
        key: 1,
        ref: d(l)
      }, {
        ...t,
        ...d(a),
        ...s.$attrs
      }), {
        default: h(() => [R(s.$slots, "default")]),
        _: 3
      }, 16))]),
      _: 3
    }, 8, ["present"]));
  }
}), Bi = Di, Ti = /* @__PURE__ */ b({
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
    const n = Qe();
    return So(!0), H(), (t, o) => (y(), x(d(X), {
      as: t.as,
      "as-child": t.asChild,
      "data-state": d(n).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: h(() => [R(t.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-state"
    ]));
  }
}), Vi = Ti, Li = /* @__PURE__ */ b({
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
    const n = Qe(), { forwardRef: t } = H();
    return (o, r) => d(n)?.modal.value ? (y(), x(d(mt), {
      key: 0,
      present: o.forceMount || d(n).open.value
    }, {
      default: h(() => [A(Vi, F(o.$attrs, {
        ref: d(t),
        as: o.as,
        "as-child": o.asChild
      }), {
        default: h(() => [R(o.$slots, "default")]),
        _: 3
      }, 16, ["as", "as-child"])]),
      _: 3
    }, 8, ["present"])) : Y("v-if", !0);
  }
}), zi = Li, Ni = /* @__PURE__ */ b({
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
    const n = ra();
    return (t, o) => d(n) || t.forceMount ? (y(), x(Tr, {
      key: 0,
      to: t.to,
      disabled: t.disabled,
      defer: t.defer
    }, [R(t.$slots, "default")], 8, [
      "to",
      "disabled",
      "defer"
    ])) : Y("v-if", !0);
  }
}), vn = Ni, Hi = /* @__PURE__ */ b({
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
    const n = e;
    return (t, o) => (y(), x(d(vn), be(Se(n)), {
      default: h(() => [R(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Gi = Hi, ji = /* @__PURE__ */ b({
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
    const n = e, t = Qe();
    return H(), (o, r) => (y(), x(d(X), F(n, { id: d(t).titleId }), {
      default: h(() => [R(o.$slots, "default")]),
      _: 3
    }, 16, ["id"]));
  }
}), Ui = ji, Ki = /* @__PURE__ */ b({
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
    const n = e, t = Qe(), { forwardRef: o, currentElement: r } = H();
    return t.contentId ||= Ne(void 0, "reka-dialog-content"), ve(() => {
      t.triggerElement.value = r.value;
    }), (a, l) => (y(), x(d(X), F(n, {
      ref: d(o),
      type: a.as === "button" ? "button" : void 0,
      "aria-haspopup": "dialog",
      "aria-expanded": d(t).open.value || !1,
      "aria-controls": d(t).open.value ? d(t).contentId : void 0,
      "data-state": d(t).open.value ? "open" : "closed",
      onClick: d(t).onOpenToggle
    }), {
      default: h(() => [R(a.$slots, "default")]),
      _: 3
    }, 16, [
      "type",
      "aria-expanded",
      "aria-controls",
      "data-state",
      "onClick"
    ]));
  }
}), Wi = Ki;
const lr = "data-reka-collection-item";
function ut(e = {}) {
  const { key: n = "", isProvider: t = !1 } = e, o = `${n}CollectionProvider`;
  let r;
  if (t) {
    const c = I(/* @__PURE__ */ new Map());
    r = {
      collectionRef: I(),
      itemMap: c
    }, Ir(o, r);
  } else r = Ar(o);
  const a = (c = !1) => {
    const f = r.collectionRef.value;
    if (!f) return [];
    const g = Array.from(f.querySelectorAll(`[${lr}]`)), m = Array.from(r.itemMap.value.values()).sort((v, w) => g.indexOf(v.ref) - g.indexOf(w.ref));
    return c ? m : m.filter((v) => v.ref.dataset.disabled !== "");
  }, l = b({
    name: "CollectionSlot",
    setup(c, { slots: f }) {
      const { primitiveElement: g, currentElement: p } = Qn();
      return oe(p, () => {
        r.collectionRef.value = p.value;
      }), () => Ce(Zn, { ref: g }, f);
    }
  }), s = b({
    name: "CollectionItem",
    inheritAttrs: !1,
    props: { value: { validator: () => !0 } },
    setup(c, { slots: f, attrs: g }) {
      const { primitiveElement: p, currentElement: m } = Qn();
      return ge((v) => {
        if (m.value) {
          const w = rl(m.value);
          r.itemMap.value.set(w, {
            ref: m.value,
            value: c.value
          }), v(() => r.itemMap.value.delete(w));
        }
      }), () => Ce(Zn, {
        ...g,
        [lr]: "",
        ref: p
      }, f);
    }
  }), i = q(() => Array.from(r.itemMap.value.values())), u = q(() => r.itemMap.value.size);
  return {
    getItems: a,
    reactiveItems: i,
    itemMapSize: u,
    CollectionSlot: l,
    CollectionItem: s
  };
}
const Xi = "rovingFocusGroup.onEntryFocus", Yi = {
  bubbles: !1,
  cancelable: !0
};
function Ji(e, n = !1) {
  const t = _e();
  for (const o of e)
    if (o === t || (o.focus({ preventScroll: n }), _e() !== t)) return;
}
const [Yg, Zi] = se("RovingFocusGroup");
var Qi = /* @__PURE__ */ b({
  __name: "RovingFocusGroup",
  props: {
    orientation: {
      type: String,
      required: !1,
      default: void 0
    },
    dir: {
      type: String,
      required: !1
    },
    loop: {
      type: Boolean,
      required: !1,
      default: !1
    },
    currentTabStopId: {
      type: [String, null],
      required: !1
    },
    defaultCurrentTabStopId: {
      type: String,
      required: !1
    },
    preventScrollOnEntryFocus: {
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
  emits: ["entryFocus", "update:currentTabStopId"],
  setup(e, { expose: n, emit: t }) {
    const o = e, r = t, { loop: a, orientation: l, dir: s } = me(o), i = jt(s), u = Fe(o, "currentTabStopId", r, {
      defaultValue: o.defaultCurrentTabStopId,
      passive: o.currentTabStopId === void 0
    }), c = I(!1), f = I(!1), g = I(0), { getItems: p, CollectionSlot: m } = ut({ isProvider: !0 });
    function v(_) {
      const $ = !f.value;
      if (_.currentTarget && _.target === _.currentTarget && $ && !c.value) {
        const S = new CustomEvent(Xi, Yi);
        if (_.currentTarget.dispatchEvent(S), r("entryFocus", S), !S.defaultPrevented) {
          const C = p().map((P) => P.ref).filter((P) => P.dataset.disabled !== ""), k = C.find((P) => P.getAttribute("data-active") === ""), M = C.find((P) => P.getAttribute("data-highlighted") === ""), O = C.find((P) => P.id === u.value), E = [
            k,
            M,
            O,
            ...C
          ].filter(Boolean);
          Ji(E, o.preventScrollOnEntryFocus);
        }
      }
      f.value = !1;
    }
    function w() {
      setTimeout(() => {
        f.value = !1;
      }, 1);
    }
    return n({ getItems: p }), Zi({
      loop: a,
      dir: i,
      orientation: l,
      currentTabStopId: u,
      onItemFocus: (_) => {
        u.value = _;
      },
      onItemShiftTab: () => {
        c.value = !0;
      },
      onFocusableItemAdd: () => {
        g.value++;
      },
      onFocusableItemRemove: () => {
        g.value--;
      }
    }), (_, $) => (y(), x(d(m), null, {
      default: h(() => [A(d(X), {
        tabindex: c.value || g.value === 0 ? -1 : 0,
        "data-orientation": d(l),
        as: _.as,
        "as-child": _.asChild,
        dir: d(i),
        style: { outline: "none" },
        onMousedown: $[0] || ($[0] = (S) => f.value = !0),
        onMouseup: w,
        onFocus: v,
        onBlur: $[1] || ($[1] = (S) => c.value = !1)
      }, {
        default: h(() => [R(_.$slots, "default")]),
        _: 3
      }, 8, [
        "tabindex",
        "data-orientation",
        "as",
        "as-child",
        "dir"
      ])]),
      _: 3
    }));
  }
}), eu = Qi, tu = /* @__PURE__ */ b({
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
    return (n, t) => (y(), x(d(X), {
      as: n.as,
      "as-child": n.asChild,
      "aria-hidden": n.feature === "focusable" ? "true" : void 0,
      "data-hidden": n.feature === "fully-hidden" ? "" : void 0,
      tabindex: n.feature === "fully-hidden" ? "-1" : void 0,
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
      default: h(() => [R(n.$slots, "default")]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "aria-hidden",
      "data-hidden",
      "tabindex"
    ]));
  }
}), ko = tu, nu = /* @__PURE__ */ b({
  inheritAttrs: !1,
  __name: "VisuallyHiddenInputBubble",
  props: {
    name: {
      type: String,
      required: !0
    },
    value: {
      type: null,
      required: !0
    },
    checked: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    required: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    feature: {
      type: String,
      required: !1,
      default: "fully-hidden"
    }
  },
  setup(e) {
    const n = e, { primitiveElement: t, currentElement: o } = Qn(), r = q(() => n.checked ?? n.value);
    return oe(r, (a, l) => {
      if (!o.value) return;
      const s = o.value, i = window.HTMLInputElement.prototype, c = Object.getOwnPropertyDescriptor(i, "value").set;
      if (c && a !== l) {
        const f = new Event("input", { bubbles: !0 }), g = new Event("change", { bubbles: !0 });
        c.call(s, a), s.dispatchEvent(f), s.dispatchEvent(g);
      }
    }), (a, l) => (y(), x(ko, F({
      ref_key: "primitiveElement",
      ref: t
    }, {
      ...n,
      ...a.$attrs
    }, { as: "input" }), null, 16));
  }
}), sr = nu, ou = /* @__PURE__ */ b({
  inheritAttrs: !1,
  __name: "VisuallyHiddenInput",
  props: {
    name: {
      type: String,
      required: !0
    },
    value: {
      type: null,
      required: !0
    },
    checked: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    required: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    feature: {
      type: String,
      required: !1,
      default: "fully-hidden"
    }
  },
  setup(e) {
    const n = e, t = q(() => typeof n.value == "object" && Array.isArray(n.value) && n.value.length === 0 && n.required), o = q(() => typeof n.value == "string" || typeof n.value == "number" || typeof n.value == "boolean" || n.value === null || n.value === void 0 ? [{
      name: n.name,
      value: n.value
    }] : typeof n.value == "object" && Array.isArray(n.value) ? n.value.flatMap((r, a) => typeof r == "object" ? Object.entries(r).map(([l, s]) => ({
      name: `${n.name}[${a}][${l}]`,
      value: s
    })) : {
      name: `${n.name}[${a}]`,
      value: r
    }) : n.value !== null && typeof n.value == "object" && !Array.isArray(n.value) ? Object.entries(n.value).map(([r, a]) => ({
      name: `${n.name}[${r}]`,
      value: a
    })) : []);
    return (r, a) => (y(), B(de, null, [Y(" We render single input if it's required "), t.value ? (y(), x(sr, F({ key: r.name }, {
      ...n,
      ...r.$attrs
    }, {
      name: r.name,
      value: r.value
    }), null, 16, ["name", "value"])) : (y(!0), B(de, { key: 1 }, Oe(o.value, (l) => (y(), x(sr, F({ key: l.name }, { ref_for: !0 }, {
      ...n,
      ...r.$attrs
    }, {
      name: l.name,
      value: l.value
    }), null, 16, ["name", "value"]))), 128))], 2112));
  }
}), ru = ou;
const [ha, au] = se("PopperRoot");
var lu = /* @__PURE__ */ b({
  inheritAttrs: !1,
  __name: "PopperRoot",
  setup(e) {
    const n = I();
    return au({
      anchor: n,
      onAnchorChange: (t) => n.value = t
    }), (t, o) => R(t.$slots, "default");
  }
}), Ao = lu, su = /* @__PURE__ */ b({
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
    const n = e, { forwardRef: t, currentElement: o } = H(), r = ha();
    return Vr(() => {
      r.onAnchorChange(n.reference ?? o.value);
    }), (a, l) => (y(), x(d(X), {
      ref: d(t),
      as: a.as,
      "as-child": a.asChild
    }, {
      default: h(() => [R(a.$slots, "default")]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), Io = su;
function iu(e) {
  return e !== null;
}
function uu(e) {
  return {
    name: "transformOrigin",
    options: e,
    fn(n) {
      const { placement: t, rects: o, middlewareData: r } = n, l = r.arrow?.centerOffset !== 0, s = l ? 0 : e.arrowWidth, i = l ? 0 : e.arrowHeight, [u, c] = ro(t), f = {
        start: "0%",
        center: "50%",
        end: "100%"
      }[c], g = (r.arrow?.x ?? 0) + s / 2, p = (r.arrow?.y ?? 0) + i / 2;
      let m = "", v = "";
      return u === "bottom" ? (m = l ? f : `${g}px`, v = `${-i}px`) : u === "top" ? (m = l ? f : `${g}px`, v = `${o.floating.height + i}px`) : u === "right" ? (m = `${-i}px`, v = l ? f : `${p}px`) : u === "left" && (m = `${o.floating.width + i}px`, v = l ? f : `${p}px`), { data: {
        x: m,
        y: v
      } };
    }
  };
}
function ro(e) {
  const [n, t = "center"] = e.split("-");
  return [n, t];
}
const du = ["top", "right", "bottom", "left"], at = Math.min, Pe = Math.max, sn = Math.round, en = Math.floor, Le = (e) => ({
  x: e,
  y: e
}), cu = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, fu = {
  start: "end",
  end: "start"
};
function ao(e, n, t) {
  return Pe(e, at(n, t));
}
function Ye(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function Je(e) {
  return e.split("-")[0];
}
function Et(e) {
  return e.split("-")[1];
}
function Eo(e) {
  return e === "x" ? "y" : "x";
}
function Mo(e) {
  return e === "y" ? "height" : "width";
}
const pu = /* @__PURE__ */ new Set(["top", "bottom"]);
function Te(e) {
  return pu.has(Je(e)) ? "y" : "x";
}
function Oo(e) {
  return Eo(Te(e));
}
function gu(e, n, t) {
  t === void 0 && (t = !1);
  const o = Et(e), r = Oo(e), a = Mo(r);
  let l = r === "x" ? o === (t ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return n.reference[a] > n.floating[a] && (l = un(l)), [l, un(l)];
}
function mu(e) {
  const n = un(e);
  return [lo(e), n, lo(n)];
}
function lo(e) {
  return e.replace(/start|end/g, (n) => fu[n]);
}
const ir = ["left", "right"], ur = ["right", "left"], vu = ["top", "bottom"], hu = ["bottom", "top"];
function yu(e, n, t) {
  switch (e) {
    case "top":
    case "bottom":
      return t ? n ? ur : ir : n ? ir : ur;
    case "left":
    case "right":
      return n ? vu : hu;
    default:
      return [];
  }
}
function wu(e, n, t, o) {
  const r = Et(e);
  let a = yu(Je(e), t === "start", o);
  return r && (a = a.map((l) => l + "-" + r), n && (a = a.concat(a.map(lo)))), a;
}
function un(e) {
  return e.replace(/left|right|bottom|top/g, (n) => cu[n]);
}
function _u(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function ya(e) {
  return typeof e != "number" ? _u(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function dn(e) {
  const {
    x: n,
    y: t,
    width: o,
    height: r
  } = e;
  return {
    width: o,
    height: r,
    top: t,
    left: n,
    right: n + o,
    bottom: t + r,
    x: n,
    y: t
  };
}
function dr(e, n, t) {
  let {
    reference: o,
    floating: r
  } = e;
  const a = Te(n), l = Oo(n), s = Mo(l), i = Je(n), u = a === "y", c = o.x + o.width / 2 - r.width / 2, f = o.y + o.height / 2 - r.height / 2, g = o[s] / 2 - r[s] / 2;
  let p;
  switch (i) {
    case "top":
      p = {
        x: c,
        y: o.y - r.height
      };
      break;
    case "bottom":
      p = {
        x: c,
        y: o.y + o.height
      };
      break;
    case "right":
      p = {
        x: o.x + o.width,
        y: f
      };
      break;
    case "left":
      p = {
        x: o.x - r.width,
        y: f
      };
      break;
    default:
      p = {
        x: o.x,
        y: o.y
      };
  }
  switch (Et(n)) {
    case "start":
      p[l] -= g * (t && u ? -1 : 1);
      break;
    case "end":
      p[l] += g * (t && u ? -1 : 1);
      break;
  }
  return p;
}
const bu = async (e, n, t) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: a = [],
    platform: l
  } = t, s = a.filter(Boolean), i = await (l.isRTL == null ? void 0 : l.isRTL(n));
  let u = await l.getElementRects({
    reference: e,
    floating: n,
    strategy: r
  }), {
    x: c,
    y: f
  } = dr(u, o, i), g = o, p = {}, m = 0;
  for (let v = 0; v < s.length; v++) {
    const {
      name: w,
      fn: _
    } = s[v], {
      x: $,
      y: S,
      data: C,
      reset: k
    } = await _({
      x: c,
      y: f,
      initialPlacement: o,
      placement: g,
      strategy: r,
      middlewareData: p,
      rects: u,
      platform: l,
      elements: {
        reference: e,
        floating: n
      }
    });
    c = $ ?? c, f = S ?? f, p = {
      ...p,
      [w]: {
        ...p[w],
        ...C
      }
    }, k && m <= 50 && (m++, typeof k == "object" && (k.placement && (g = k.placement), k.rects && (u = k.rects === !0 ? await l.getElementRects({
      reference: e,
      floating: n,
      strategy: r
    }) : k.rects), {
      x: c,
      y: f
    } = dr(u, g, i)), v = -1);
  }
  return {
    x: c,
    y: f,
    placement: g,
    strategy: r,
    middlewareData: p
  };
};
async function Vt(e, n) {
  var t;
  n === void 0 && (n = {});
  const {
    x: o,
    y: r,
    platform: a,
    rects: l,
    elements: s,
    strategy: i
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: c = "viewport",
    elementContext: f = "floating",
    altBoundary: g = !1,
    padding: p = 0
  } = Ye(n, e), m = ya(p), w = s[g ? f === "floating" ? "reference" : "floating" : f], _ = dn(await a.getClippingRect({
    element: (t = await (a.isElement == null ? void 0 : a.isElement(w))) == null || t ? w : w.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(s.floating)),
    boundary: u,
    rootBoundary: c,
    strategy: i
  })), $ = f === "floating" ? {
    x: o,
    y: r,
    width: l.floating.width,
    height: l.floating.height
  } : l.reference, S = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(s.floating)), C = await (a.isElement == null ? void 0 : a.isElement(S)) ? await (a.getScale == null ? void 0 : a.getScale(S)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, k = dn(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: s,
    rect: $,
    offsetParent: S,
    strategy: i
  }) : $);
  return {
    top: (_.top - k.top + m.top) / C.y,
    bottom: (k.bottom - _.bottom + m.bottom) / C.y,
    left: (_.left - k.left + m.left) / C.x,
    right: (k.right - _.right + m.right) / C.x
  };
}
const Cu = (e) => ({
  name: "arrow",
  options: e,
  async fn(n) {
    const {
      x: t,
      y: o,
      placement: r,
      rects: a,
      platform: l,
      elements: s,
      middlewareData: i
    } = n, {
      element: u,
      padding: c = 0
    } = Ye(e, n) || {};
    if (u == null)
      return {};
    const f = ya(c), g = {
      x: t,
      y: o
    }, p = Oo(r), m = Mo(p), v = await l.getDimensions(u), w = p === "y", _ = w ? "top" : "left", $ = w ? "bottom" : "right", S = w ? "clientHeight" : "clientWidth", C = a.reference[m] + a.reference[p] - g[p] - a.floating[m], k = g[p] - a.reference[p], M = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(u));
    let O = M ? M[S] : 0;
    (!O || !await (l.isElement == null ? void 0 : l.isElement(M))) && (O = s.floating[S] || a.floating[m]);
    const E = C / 2 - k / 2, P = O / 2 - v[m] / 2 - 1, L = at(f[_], P), j = at(f[$], P), J = L, ae = O - v[m] - j, ee = O / 2 - v[m] / 2 + E, re = ao(J, ee, ae), te = !i.arrow && Et(r) != null && ee !== re && a.reference[m] / 2 - (ee < J ? L : j) - v[m] / 2 < 0, ne = te ? ee < J ? ee - J : ee - ae : 0;
    return {
      [p]: g[p] + ne,
      data: {
        [p]: re,
        centerOffset: ee - re - ne,
        ...te && {
          alignmentOffset: ne
        }
      },
      reset: te
    };
  }
}), Su = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(n) {
      var t, o;
      const {
        placement: r,
        middlewareData: a,
        rects: l,
        initialPlacement: s,
        platform: i,
        elements: u
      } = n, {
        mainAxis: c = !0,
        crossAxis: f = !0,
        fallbackPlacements: g,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: m = "none",
        flipAlignment: v = !0,
        ...w
      } = Ye(e, n);
      if ((t = a.arrow) != null && t.alignmentOffset)
        return {};
      const _ = Je(r), $ = Te(s), S = Je(s) === s, C = await (i.isRTL == null ? void 0 : i.isRTL(u.floating)), k = g || (S || !v ? [un(s)] : mu(s)), M = m !== "none";
      !g && M && k.push(...wu(s, v, m, C));
      const O = [s, ...k], E = await Vt(n, w), P = [];
      let L = ((o = a.flip) == null ? void 0 : o.overflows) || [];
      if (c && P.push(E[_]), f) {
        const ee = gu(r, l, C);
        P.push(E[ee[0]], E[ee[1]]);
      }
      if (L = [...L, {
        placement: r,
        overflows: P
      }], !P.every((ee) => ee <= 0)) {
        var j, J;
        const ee = (((j = a.flip) == null ? void 0 : j.index) || 0) + 1, re = O[ee];
        if (re && (!(f === "alignment" ? $ !== Te(re) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        L.every((D) => Te(D.placement) === $ ? D.overflows[0] > 0 : !0)))
          return {
            data: {
              index: ee,
              overflows: L
            },
            reset: {
              placement: re
            }
          };
        let te = (J = L.filter((ne) => ne.overflows[0] <= 0).sort((ne, D) => ne.overflows[1] - D.overflows[1])[0]) == null ? void 0 : J.placement;
        if (!te)
          switch (p) {
            case "bestFit": {
              var ae;
              const ne = (ae = L.filter((D) => {
                if (M) {
                  const Re = Te(D.placement);
                  return Re === $ || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  Re === "y";
                }
                return !0;
              }).map((D) => [D.placement, D.overflows.filter((Re) => Re > 0).reduce((Re, je) => Re + je, 0)]).sort((D, Re) => D[1] - Re[1])[0]) == null ? void 0 : ae[0];
              ne && (te = ne);
              break;
            }
            case "initialPlacement":
              te = s;
              break;
          }
        if (r !== te)
          return {
            reset: {
              placement: te
            }
          };
      }
      return {};
    }
  };
};
function cr(e, n) {
  return {
    top: e.top - n.height,
    right: e.right - n.width,
    bottom: e.bottom - n.height,
    left: e.left - n.width
  };
}
function fr(e) {
  return du.some((n) => e[n] >= 0);
}
const xu = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(n) {
      const {
        rects: t
      } = n, {
        strategy: o = "referenceHidden",
        ...r
      } = Ye(e, n);
      switch (o) {
        case "referenceHidden": {
          const a = await Vt(n, {
            ...r,
            elementContext: "reference"
          }), l = cr(a, t.reference);
          return {
            data: {
              referenceHiddenOffsets: l,
              referenceHidden: fr(l)
            }
          };
        }
        case "escaped": {
          const a = await Vt(n, {
            ...r,
            altBoundary: !0
          }), l = cr(a, t.floating);
          return {
            data: {
              escapedOffsets: l,
              escaped: fr(l)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, wa = /* @__PURE__ */ new Set(["left", "top"]);
async function Ru(e, n) {
  const {
    placement: t,
    platform: o,
    elements: r
  } = e, a = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), l = Je(t), s = Et(t), i = Te(t) === "y", u = wa.has(l) ? -1 : 1, c = a && i ? -1 : 1, f = Ye(n, e);
  let {
    mainAxis: g,
    crossAxis: p,
    alignmentAxis: m
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), i ? {
    x: p * c,
    y: g * u
  } : {
    x: g * u,
    y: p * c
  };
}
const Pu = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(n) {
      var t, o;
      const {
        x: r,
        y: a,
        placement: l,
        middlewareData: s
      } = n, i = await Ru(n, e);
      return l === ((t = s.offset) == null ? void 0 : t.placement) && (o = s.arrow) != null && o.alignmentOffset ? {} : {
        x: r + i.x,
        y: a + i.y,
        data: {
          ...i,
          placement: l
        }
      };
    }
  };
}, $u = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(n) {
      const {
        x: t,
        y: o,
        placement: r
      } = n, {
        mainAxis: a = !0,
        crossAxis: l = !1,
        limiter: s = {
          fn: (w) => {
            let {
              x: _,
              y: $
            } = w;
            return {
              x: _,
              y: $
            };
          }
        },
        ...i
      } = Ye(e, n), u = {
        x: t,
        y: o
      }, c = await Vt(n, i), f = Te(Je(r)), g = Eo(f);
      let p = u[g], m = u[f];
      if (a) {
        const w = g === "y" ? "top" : "left", _ = g === "y" ? "bottom" : "right", $ = p + c[w], S = p - c[_];
        p = ao($, p, S);
      }
      if (l) {
        const w = f === "y" ? "top" : "left", _ = f === "y" ? "bottom" : "right", $ = m + c[w], S = m - c[_];
        m = ao($, m, S);
      }
      const v = s.fn({
        ...n,
        [g]: p,
        [f]: m
      });
      return {
        ...v,
        data: {
          x: v.x - t,
          y: v.y - o,
          enabled: {
            [g]: a,
            [f]: l
          }
        }
      };
    }
  };
}, ku = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(n) {
      const {
        x: t,
        y: o,
        placement: r,
        rects: a,
        middlewareData: l
      } = n, {
        offset: s = 0,
        mainAxis: i = !0,
        crossAxis: u = !0
      } = Ye(e, n), c = {
        x: t,
        y: o
      }, f = Te(r), g = Eo(f);
      let p = c[g], m = c[f];
      const v = Ye(s, n), w = typeof v == "number" ? {
        mainAxis: v,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...v
      };
      if (i) {
        const S = g === "y" ? "height" : "width", C = a.reference[g] - a.floating[S] + w.mainAxis, k = a.reference[g] + a.reference[S] - w.mainAxis;
        p < C ? p = C : p > k && (p = k);
      }
      if (u) {
        var _, $;
        const S = g === "y" ? "width" : "height", C = wa.has(Je(r)), k = a.reference[f] - a.floating[S] + (C && ((_ = l.offset) == null ? void 0 : _[f]) || 0) + (C ? 0 : w.crossAxis), M = a.reference[f] + a.reference[S] + (C ? 0 : (($ = l.offset) == null ? void 0 : $[f]) || 0) - (C ? w.crossAxis : 0);
        m < k ? m = k : m > M && (m = M);
      }
      return {
        [g]: p,
        [f]: m
      };
    }
  };
}, Au = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(n) {
      var t, o;
      const {
        placement: r,
        rects: a,
        platform: l,
        elements: s
      } = n, {
        apply: i = () => {
        },
        ...u
      } = Ye(e, n), c = await Vt(n, u), f = Je(r), g = Et(r), p = Te(r) === "y", {
        width: m,
        height: v
      } = a.floating;
      let w, _;
      f === "top" || f === "bottom" ? (w = f, _ = g === (await (l.isRTL == null ? void 0 : l.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (_ = f, w = g === "end" ? "top" : "bottom");
      const $ = v - c.top - c.bottom, S = m - c.left - c.right, C = at(v - c[w], $), k = at(m - c[_], S), M = !n.middlewareData.shift;
      let O = C, E = k;
      if ((t = n.middlewareData.shift) != null && t.enabled.x && (E = S), (o = n.middlewareData.shift) != null && o.enabled.y && (O = $), M && !g) {
        const L = Pe(c.left, 0), j = Pe(c.right, 0), J = Pe(c.top, 0), ae = Pe(c.bottom, 0);
        p ? E = m - 2 * (L !== 0 || j !== 0 ? L + j : Pe(c.left, c.right)) : O = v - 2 * (J !== 0 || ae !== 0 ? J + ae : Pe(c.top, c.bottom));
      }
      await i({
        ...n,
        availableWidth: E,
        availableHeight: O
      });
      const P = await l.getDimensions(s.floating);
      return m !== P.width || v !== P.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function hn() {
  return typeof window < "u";
}
function vt(e) {
  return qo(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function $e(e) {
  var n;
  return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function Ge(e) {
  var n;
  return (n = (qo(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : n.documentElement;
}
function qo(e) {
  return hn() ? e instanceof Node || e instanceof $e(e).Node : !1;
}
function De(e) {
  return hn() ? e instanceof Element || e instanceof $e(e).Element : !1;
}
function He(e) {
  return hn() ? e instanceof HTMLElement || e instanceof $e(e).HTMLElement : !1;
}
function pr(e) {
  return !hn() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof $e(e).ShadowRoot;
}
const Iu = /* @__PURE__ */ new Set(["inline", "contents"]);
function Ut(e) {
  const {
    overflow: n,
    overflowX: t,
    overflowY: o,
    display: r
  } = Be(e);
  return /auto|scroll|overlay|hidden|clip/.test(n + o + t) && !Iu.has(r);
}
const Eu = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Mu(e) {
  return Eu.has(vt(e));
}
const Ou = [":popover-open", ":modal"];
function yn(e) {
  return Ou.some((n) => {
    try {
      return e.matches(n);
    } catch {
      return !1;
    }
  });
}
const qu = ["transform", "translate", "scale", "rotate", "perspective"], Fu = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Du = ["paint", "layout", "strict", "content"];
function Fo(e) {
  const n = Do(), t = De(e) ? Be(e) : e;
  return qu.some((o) => t[o] ? t[o] !== "none" : !1) || (t.containerType ? t.containerType !== "normal" : !1) || !n && (t.backdropFilter ? t.backdropFilter !== "none" : !1) || !n && (t.filter ? t.filter !== "none" : !1) || Fu.some((o) => (t.willChange || "").includes(o)) || Du.some((o) => (t.contain || "").includes(o));
}
function Bu(e) {
  let n = lt(e);
  for (; He(n) && !Pt(n); ) {
    if (Fo(n))
      return n;
    if (yn(n))
      return null;
    n = lt(n);
  }
  return null;
}
function Do() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Tu = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Pt(e) {
  return Tu.has(vt(e));
}
function Be(e) {
  return $e(e).getComputedStyle(e);
}
function wn(e) {
  return De(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function lt(e) {
  if (vt(e) === "html")
    return e;
  const n = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    pr(e) && e.host || // Fallback.
    Ge(e)
  );
  return pr(n) ? n.host : n;
}
function _a(e) {
  const n = lt(e);
  return Pt(n) ? e.ownerDocument ? e.ownerDocument.body : e.body : He(n) && Ut(n) ? n : _a(n);
}
function Lt(e, n, t) {
  var o;
  n === void 0 && (n = []), t === void 0 && (t = !0);
  const r = _a(e), a = r === ((o = e.ownerDocument) == null ? void 0 : o.body), l = $e(r);
  if (a) {
    const s = so(l);
    return n.concat(l, l.visualViewport || [], Ut(r) ? r : [], s && t ? Lt(s) : []);
  }
  return n.concat(r, Lt(r, [], t));
}
function so(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function ba(e) {
  const n = Be(e);
  let t = parseFloat(n.width) || 0, o = parseFloat(n.height) || 0;
  const r = He(e), a = r ? e.offsetWidth : t, l = r ? e.offsetHeight : o, s = sn(t) !== a || sn(o) !== l;
  return s && (t = a, o = l), {
    width: t,
    height: o,
    $: s
  };
}
function Bo(e) {
  return De(e) ? e : e.contextElement;
}
function xt(e) {
  const n = Bo(e);
  if (!He(n))
    return Le(1);
  const t = n.getBoundingClientRect(), {
    width: o,
    height: r,
    $: a
  } = ba(n);
  let l = (a ? sn(t.width) : t.width) / o, s = (a ? sn(t.height) : t.height) / r;
  return (!l || !Number.isFinite(l)) && (l = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: l,
    y: s
  };
}
const Vu = /* @__PURE__ */ Le(0);
function Ca(e) {
  const n = $e(e);
  return !Do() || !n.visualViewport ? Vu : {
    x: n.visualViewport.offsetLeft,
    y: n.visualViewport.offsetTop
  };
}
function Lu(e, n, t) {
  return n === void 0 && (n = !1), !t || n && t !== $e(e) ? !1 : n;
}
function gt(e, n, t, o) {
  n === void 0 && (n = !1), t === void 0 && (t = !1);
  const r = e.getBoundingClientRect(), a = Bo(e);
  let l = Le(1);
  n && (o ? De(o) && (l = xt(o)) : l = xt(e));
  const s = Lu(a, t, o) ? Ca(a) : Le(0);
  let i = (r.left + s.x) / l.x, u = (r.top + s.y) / l.y, c = r.width / l.x, f = r.height / l.y;
  if (a) {
    const g = $e(a), p = o && De(o) ? $e(o) : o;
    let m = g, v = so(m);
    for (; v && o && p !== m; ) {
      const w = xt(v), _ = v.getBoundingClientRect(), $ = Be(v), S = _.left + (v.clientLeft + parseFloat($.paddingLeft)) * w.x, C = _.top + (v.clientTop + parseFloat($.paddingTop)) * w.y;
      i *= w.x, u *= w.y, c *= w.x, f *= w.y, i += S, u += C, m = $e(v), v = so(m);
    }
  }
  return dn({
    width: c,
    height: f,
    x: i,
    y: u
  });
}
function _n(e, n) {
  const t = wn(e).scrollLeft;
  return n ? n.left + t : gt(Ge(e)).left + t;
}
function Sa(e, n) {
  const t = e.getBoundingClientRect(), o = t.left + n.scrollLeft - _n(e, t), r = t.top + n.scrollTop;
  return {
    x: o,
    y: r
  };
}
function zu(e) {
  let {
    elements: n,
    rect: t,
    offsetParent: o,
    strategy: r
  } = e;
  const a = r === "fixed", l = Ge(o), s = n ? yn(n.floating) : !1;
  if (o === l || s && a)
    return t;
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = Le(1);
  const c = Le(0), f = He(o);
  if ((f || !f && !a) && ((vt(o) !== "body" || Ut(l)) && (i = wn(o)), He(o))) {
    const p = gt(o);
    u = xt(o), c.x = p.x + o.clientLeft, c.y = p.y + o.clientTop;
  }
  const g = l && !f && !a ? Sa(l, i) : Le(0);
  return {
    width: t.width * u.x,
    height: t.height * u.y,
    x: t.x * u.x - i.scrollLeft * u.x + c.x + g.x,
    y: t.y * u.y - i.scrollTop * u.y + c.y + g.y
  };
}
function Nu(e) {
  return Array.from(e.getClientRects());
}
function Hu(e) {
  const n = Ge(e), t = wn(e), o = e.ownerDocument.body, r = Pe(n.scrollWidth, n.clientWidth, o.scrollWidth, o.clientWidth), a = Pe(n.scrollHeight, n.clientHeight, o.scrollHeight, o.clientHeight);
  let l = -t.scrollLeft + _n(e);
  const s = -t.scrollTop;
  return Be(o).direction === "rtl" && (l += Pe(n.clientWidth, o.clientWidth) - r), {
    width: r,
    height: a,
    x: l,
    y: s
  };
}
const gr = 25;
function Gu(e, n) {
  const t = $e(e), o = Ge(e), r = t.visualViewport;
  let a = o.clientWidth, l = o.clientHeight, s = 0, i = 0;
  if (r) {
    a = r.width, l = r.height;
    const c = Do();
    (!c || c && n === "fixed") && (s = r.offsetLeft, i = r.offsetTop);
  }
  const u = _n(o);
  if (u <= 0) {
    const c = o.ownerDocument, f = c.body, g = getComputedStyle(f), p = c.compatMode === "CSS1Compat" && parseFloat(g.marginLeft) + parseFloat(g.marginRight) || 0, m = Math.abs(o.clientWidth - f.clientWidth - p);
    m <= gr && (a -= m);
  } else u <= gr && (a += u);
  return {
    width: a,
    height: l,
    x: s,
    y: i
  };
}
const ju = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Uu(e, n) {
  const t = gt(e, !0, n === "fixed"), o = t.top + e.clientTop, r = t.left + e.clientLeft, a = He(e) ? xt(e) : Le(1), l = e.clientWidth * a.x, s = e.clientHeight * a.y, i = r * a.x, u = o * a.y;
  return {
    width: l,
    height: s,
    x: i,
    y: u
  };
}
function mr(e, n, t) {
  let o;
  if (n === "viewport")
    o = Gu(e, t);
  else if (n === "document")
    o = Hu(Ge(e));
  else if (De(n))
    o = Uu(n, t);
  else {
    const r = Ca(e);
    o = {
      x: n.x - r.x,
      y: n.y - r.y,
      width: n.width,
      height: n.height
    };
  }
  return dn(o);
}
function xa(e, n) {
  const t = lt(e);
  return t === n || !De(t) || Pt(t) ? !1 : Be(t).position === "fixed" || xa(t, n);
}
function Ku(e, n) {
  const t = n.get(e);
  if (t)
    return t;
  let o = Lt(e, [], !1).filter((s) => De(s) && vt(s) !== "body"), r = null;
  const a = Be(e).position === "fixed";
  let l = a ? lt(e) : e;
  for (; De(l) && !Pt(l); ) {
    const s = Be(l), i = Fo(l);
    !i && s.position === "fixed" && (r = null), (a ? !i && !r : !i && s.position === "static" && !!r && ju.has(r.position) || Ut(l) && !i && xa(e, l)) ? o = o.filter((c) => c !== l) : r = s, l = lt(l);
  }
  return n.set(e, o), o;
}
function Wu(e) {
  let {
    element: n,
    boundary: t,
    rootBoundary: o,
    strategy: r
  } = e;
  const l = [...t === "clippingAncestors" ? yn(n) ? [] : Ku(n, this._c) : [].concat(t), o], s = l[0], i = l.reduce((u, c) => {
    const f = mr(n, c, r);
    return u.top = Pe(f.top, u.top), u.right = at(f.right, u.right), u.bottom = at(f.bottom, u.bottom), u.left = Pe(f.left, u.left), u;
  }, mr(n, s, r));
  return {
    width: i.right - i.left,
    height: i.bottom - i.top,
    x: i.left,
    y: i.top
  };
}
function Xu(e) {
  const {
    width: n,
    height: t
  } = ba(e);
  return {
    width: n,
    height: t
  };
}
function Yu(e, n, t) {
  const o = He(n), r = Ge(n), a = t === "fixed", l = gt(e, !0, a, n);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const i = Le(0);
  function u() {
    i.x = _n(r);
  }
  if (o || !o && !a)
    if ((vt(n) !== "body" || Ut(r)) && (s = wn(n)), o) {
      const p = gt(n, !0, a, n);
      i.x = p.x + n.clientLeft, i.y = p.y + n.clientTop;
    } else r && u();
  a && !o && r && u();
  const c = r && !o && !a ? Sa(r, s) : Le(0), f = l.left + s.scrollLeft - i.x - c.x, g = l.top + s.scrollTop - i.y - c.y;
  return {
    x: f,
    y: g,
    width: l.width,
    height: l.height
  };
}
function Fn(e) {
  return Be(e).position === "static";
}
function vr(e, n) {
  if (!He(e) || Be(e).position === "fixed")
    return null;
  if (n)
    return n(e);
  let t = e.offsetParent;
  return Ge(e) === t && (t = t.ownerDocument.body), t;
}
function Ra(e, n) {
  const t = $e(e);
  if (yn(e))
    return t;
  if (!He(e)) {
    let r = lt(e);
    for (; r && !Pt(r); ) {
      if (De(r) && !Fn(r))
        return r;
      r = lt(r);
    }
    return t;
  }
  let o = vr(e, n);
  for (; o && Mu(o) && Fn(o); )
    o = vr(o, n);
  return o && Pt(o) && Fn(o) && !Fo(o) ? t : o || Bu(e) || t;
}
const Ju = async function(e) {
  const n = this.getOffsetParent || Ra, t = this.getDimensions, o = await t(e.floating);
  return {
    reference: Yu(e.reference, await n(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function Zu(e) {
  return Be(e).direction === "rtl";
}
const Qu = {
  convertOffsetParentRelativeRectToViewportRelativeRect: zu,
  getDocumentElement: Ge,
  getClippingRect: Wu,
  getOffsetParent: Ra,
  getElementRects: Ju,
  getClientRects: Nu,
  getDimensions: Xu,
  getScale: xt,
  isElement: De,
  isRTL: Zu
};
function Pa(e, n) {
  return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function ed(e, n) {
  let t = null, o;
  const r = Ge(e);
  function a() {
    var s;
    clearTimeout(o), (s = t) == null || s.disconnect(), t = null;
  }
  function l(s, i) {
    s === void 0 && (s = !1), i === void 0 && (i = 1), a();
    const u = e.getBoundingClientRect(), {
      left: c,
      top: f,
      width: g,
      height: p
    } = u;
    if (s || n(), !g || !p)
      return;
    const m = en(f), v = en(r.clientWidth - (c + g)), w = en(r.clientHeight - (f + p)), _ = en(c), S = {
      rootMargin: -m + "px " + -v + "px " + -w + "px " + -_ + "px",
      threshold: Pe(0, at(1, i)) || 1
    };
    let C = !0;
    function k(M) {
      const O = M[0].intersectionRatio;
      if (O !== i) {
        if (!C)
          return l();
        O ? l(!1, O) : o = setTimeout(() => {
          l(!1, 1e-7);
        }, 1e3);
      }
      O === 1 && !Pa(u, e.getBoundingClientRect()) && l(), C = !1;
    }
    try {
      t = new IntersectionObserver(k, {
        ...S,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      t = new IntersectionObserver(k, S);
    }
    t.observe(e);
  }
  return l(!0), a;
}
function td(e, n, t, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: a = !0,
    elementResize: l = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: i = !1
  } = o, u = Bo(e), c = r || a ? [...u ? Lt(u) : [], ...Lt(n)] : [];
  c.forEach((_) => {
    r && _.addEventListener("scroll", t, {
      passive: !0
    }), a && _.addEventListener("resize", t);
  });
  const f = u && s ? ed(u, t) : null;
  let g = -1, p = null;
  l && (p = new ResizeObserver((_) => {
    let [$] = _;
    $ && $.target === u && p && (p.unobserve(n), cancelAnimationFrame(g), g = requestAnimationFrame(() => {
      var S;
      (S = p) == null || S.observe(n);
    })), t();
  }), u && !i && p.observe(u), p.observe(n));
  let m, v = i ? gt(e) : null;
  i && w();
  function w() {
    const _ = gt(e);
    v && !Pa(v, _) && t(), v = _, m = requestAnimationFrame(w);
  }
  return t(), () => {
    var _;
    c.forEach(($) => {
      r && $.removeEventListener("scroll", t), a && $.removeEventListener("resize", t);
    }), f?.(), (_ = p) == null || _.disconnect(), p = null, i && cancelAnimationFrame(m);
  };
}
const nd = Pu, od = $u, hr = Su, rd = Au, ad = xu, ld = Cu, sd = ku, id = (e, n, t) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: Qu,
    ...t
  }, a = {
    ...r.platform,
    _c: o
  };
  return bu(e, n, {
    ...r,
    platform: a
  });
};
function ud(e) {
  return e != null && typeof e == "object" && "$el" in e;
}
function io(e) {
  if (ud(e)) {
    const n = e.$el;
    return qo(n) && vt(n) === "#comment" ? null : n;
  }
  return e;
}
function St(e) {
  return typeof e == "function" ? e() : d(e);
}
function dd(e) {
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const t = io(St(e.element));
      return t == null ? {} : ld({
        element: t,
        padding: e.padding
      }).fn(n);
    }
  };
}
function $a(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function yr(e, n) {
  const t = $a(e);
  return Math.round(n * t) / t;
}
function cd(e, n, t) {
  t === void 0 && (t = {});
  const o = t.whileElementsMounted, r = q(() => {
    var O;
    return (O = St(t.open)) != null ? O : !0;
  }), a = q(() => St(t.middleware)), l = q(() => {
    var O;
    return (O = St(t.placement)) != null ? O : "bottom";
  }), s = q(() => {
    var O;
    return (O = St(t.strategy)) != null ? O : "absolute";
  }), i = q(() => {
    var O;
    return (O = St(t.transform)) != null ? O : !0;
  }), u = q(() => io(e.value)), c = q(() => io(n.value)), f = I(0), g = I(0), p = I(s.value), m = I(l.value), v = Nt({}), w = I(!1), _ = q(() => {
    const O = {
      position: p.value,
      left: "0",
      top: "0"
    };
    if (!c.value)
      return O;
    const E = yr(c.value, f.value), P = yr(c.value, g.value);
    return i.value ? {
      ...O,
      transform: "translate(" + E + "px, " + P + "px)",
      ...$a(c.value) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: p.value,
      left: E + "px",
      top: P + "px"
    };
  });
  let $;
  function S() {
    if (u.value == null || c.value == null)
      return;
    const O = r.value;
    id(u.value, c.value, {
      middleware: a.value,
      placement: l.value,
      strategy: s.value
    }).then((E) => {
      f.value = E.x, g.value = E.y, p.value = E.strategy, m.value = E.placement, v.value = E.middlewareData, w.value = O !== !1;
    });
  }
  function C() {
    typeof $ == "function" && ($(), $ = void 0);
  }
  function k() {
    if (C(), o === void 0) {
      S();
      return;
    }
    if (u.value != null && c.value != null) {
      $ = o(u.value, c.value, S);
      return;
    }
  }
  function M() {
    r.value || (w.value = !1);
  }
  return oe([a, l, s, r], S, {
    flush: "sync"
  }), oe([u, c], k, {
    flush: "sync"
  }), oe(r, M, {
    flush: "sync"
  }), Mr() && Or(C), {
    x: _t(f),
    y: _t(g),
    strategy: _t(p),
    placement: _t(m),
    middlewareData: _t(v),
    isPositioned: _t(w),
    floatingStyles: _,
    update: S
  };
}
const ka = {
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
}, [Jg, fd] = se("PopperContent");
var pd = /* @__PURE__ */ b({
  inheritAttrs: !1,
  __name: "PopperContent",
  props: /* @__PURE__ */ Lr({
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
  }, { ...ka }),
  emits: ["placed"],
  setup(e, { emit: n }) {
    const t = e, o = n, r = ha(), { forwardRef: a, currentElement: l } = H(), s = I(), i = I(), { width: u, height: c } = Es(i), f = q(() => t.side + (t.align !== "center" ? `-${t.align}` : "")), g = q(() => typeof t.collisionPadding == "number" ? t.collisionPadding : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...t.collisionPadding
    }), p = q(() => Array.isArray(t.collisionBoundary) ? t.collisionBoundary : [t.collisionBoundary]), m = q(() => ({
      padding: g.value,
      boundary: p.value.filter(iu),
      altBoundary: p.value.length > 0
    })), v = q(() => ({
      mainAxis: t.sideFlip,
      crossAxis: t.alignFlip
    })), w = Yl(() => [
      nd({
        mainAxis: t.sideOffset + c.value,
        alignmentAxis: t.alignOffset
      }),
      t.prioritizePosition && t.avoidCollisions && hr({
        ...m.value,
        ...v.value
      }),
      t.avoidCollisions && od({
        mainAxis: !0,
        crossAxis: !!t.prioritizePosition,
        limiter: t.sticky === "partial" ? sd() : void 0,
        ...m.value
      }),
      !t.prioritizePosition && t.avoidCollisions && hr({
        ...m.value,
        ...v.value
      }),
      rd({
        ...m.value,
        apply: ({ elements: J, rects: ae, availableWidth: ee, availableHeight: re }) => {
          const { width: te, height: ne } = ae.reference, D = J.floating.style;
          D.setProperty("--reka-popper-available-width", `${ee}px`), D.setProperty("--reka-popper-available-height", `${re}px`), D.setProperty("--reka-popper-anchor-width", `${te}px`), D.setProperty("--reka-popper-anchor-height", `${ne}px`);
        }
      }),
      i.value && dd({
        element: i.value,
        padding: t.arrowPadding
      }),
      uu({
        arrowWidth: u.value,
        arrowHeight: c.value
      }),
      t.hideWhenDetached && ad({
        strategy: "referenceHidden",
        ...m.value
      })
    ]), _ = q(() => t.reference ?? r.anchor.value), { floatingStyles: $, placement: S, isPositioned: C, middlewareData: k } = cd(_, s, {
      strategy: t.positionStrategy,
      placement: f,
      whileElementsMounted: (...J) => td(...J, {
        layoutShift: !t.disableUpdateOnLayoutShift,
        animationFrame: t.updatePositionStrategy === "always"
      }),
      middleware: w
    }), M = q(() => ro(S.value)[0]), O = q(() => ro(S.value)[1]);
    Vr(() => {
      C.value && o("placed");
    });
    const E = q(() => k.value.arrow?.centerOffset !== 0), P = I("");
    ge(() => {
      l.value && (P.value = window.getComputedStyle(l.value).zIndex);
    });
    const L = q(() => k.value.arrow?.x ?? 0), j = q(() => k.value.arrow?.y ?? 0);
    return fd({
      placedSide: M,
      onArrowChange: (J) => i.value = J,
      arrowX: L,
      arrowY: j,
      shouldHideArrow: E
    }), (J, ae) => (y(), B("div", {
      ref_key: "floatingRef",
      ref: s,
      "data-reka-popper-content-wrapper": "",
      style: Bt({
        ...d($),
        transform: d(C) ? d($).transform : "translate(0, -200%)",
        minWidth: "max-content",
        zIndex: P.value,
        "--reka-popper-transform-origin": [d(k).transformOrigin?.x, d(k).transformOrigin?.y].join(" "),
        ...d(k).hide?.referenceHidden && {
          visibility: "hidden",
          pointerEvents: "none"
        }
      })
    }, [A(d(X), F({ ref: d(a) }, J.$attrs, {
      "as-child": t.asChild,
      as: J.as,
      "data-side": M.value,
      "data-align": O.value,
      style: { animation: d(C) ? void 0 : "none" }
    }), {
      default: h(() => [R(J.$slots, "default")]),
      _: 3
    }, 16, [
      "as-child",
      "as",
      "data-side",
      "data-align",
      "style"
    ])], 4));
  }
}), To = pd;
function gd(e) {
  const n = fn({ nonce: I() });
  return q(() => e?.value || n.nonce?.value);
}
var md = /* @__PURE__ */ b({
  __name: "MenuAnchor",
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
    const n = e;
    return (t, o) => (y(), x(d(Io), be(Se(n)), {
      default: h(() => [R(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), vd = md;
function hd() {
  const e = I(!1);
  return ve(() => {
    pt("keydown", () => {
      e.value = !0;
    }, {
      capture: !0,
      passive: !0
    }), pt(["pointerdown", "pointermove"], () => {
      e.value = !1;
    }, {
      capture: !0,
      passive: !0
    });
  }), e;
}
const yd = ta(hd), [bn, wd] = se(["MenuRoot", "MenuSub"], "MenuContext"), [Vo, _d] = se("MenuRoot");
var bd = /* @__PURE__ */ b({
  __name: "MenuRoot",
  props: {
    open: {
      type: Boolean,
      required: !1,
      default: !1
    },
    dir: {
      type: String,
      required: !1
    },
    modal: {
      type: Boolean,
      required: !1,
      default: !0
    }
  },
  emits: ["update:open"],
  setup(e, { emit: n }) {
    const t = e, o = n, { modal: r, dir: a } = me(t), l = jt(a), s = Fe(t, "open", o), i = I(), u = yd();
    return wd({
      open: s,
      onOpenChange: (c) => {
        s.value = c;
      },
      content: i,
      onContentChange: (c) => {
        i.value = c;
      }
    }), _d({
      onClose: () => {
        s.value = !1;
      },
      isUsingKeyboardRef: u,
      dir: l,
      modal: r
    }), (c, f) => (y(), x(d(Ao), null, {
      default: h(() => [R(c.$slots, "default")]),
      _: 3
    }));
  }
}), Cd = bd;
const [Aa, Sd] = se("MenuContent");
var xd = /* @__PURE__ */ b({
  __name: "MenuContentImpl",
  props: /* @__PURE__ */ Lr({
    loop: {
      type: Boolean,
      required: !1
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: !1
    },
    disableOutsideScroll: {
      type: Boolean,
      required: !1
    },
    trapFocus: {
      type: Boolean,
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
  }, { ...ka }),
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus",
    "dismiss"
  ],
  setup(e, { emit: n }) {
    const t = e, o = n, r = bn(), a = Vo(), { trapFocus: l, disableOutsidePointerEvents: s, loop: i } = me(t);
    la(), So(s.value);
    const u = I(""), c = I(0), f = I(0), g = I(null), p = I("right"), m = I(0), v = I(null), w = I(), { forwardRef: _, currentElement: $ } = H(), { handleTypeaheadSearch: S } = Ro();
    oe($, (P) => {
      r.onContentChange(P);
    }), cn(() => {
      window.clearTimeout(c.value);
    });
    function C(P) {
      return p.value === g.value?.side && $i(P, g.value?.area);
    }
    async function k(P) {
      o("openAutoFocus", P), !P.defaultPrevented && (P.preventDefault(), $.value?.focus({ preventScroll: !0 }));
    }
    function M(P) {
      if (P.defaultPrevented) return;
      const j = P.target.closest("[data-reka-menu-content]") === P.currentTarget, J = P.ctrlKey || P.altKey || P.metaKey, ae = P.key.length === 1, ee = Qr(P, _e(), $.value, {
        loop: i.value,
        arrowKeyOptions: "vertical",
        dir: a?.dir.value,
        focus: !0,
        attributeName: "[data-reka-collection-item]:not([data-disabled])"
      });
      if (ee) return ee?.focus();
      if (P.code === "Space") return;
      const re = w.value?.getItems() ?? [];
      if (j && (P.key === "Tab" && P.preventDefault(), !J && ae && S(P.key, re)), P.target !== $.value || !Ri.includes(P.key)) return;
      P.preventDefault();
      const te = [...re.map((ne) => ne.ref)];
      pa.includes(P.key) && te.reverse(), no(te);
    }
    function O(P) {
      P?.currentTarget?.contains?.(P.target) || (window.clearTimeout(c.value), u.value = "");
    }
    function E(P) {
      if (!oo(P)) return;
      const L = P.target, j = m.value !== P.clientX;
      if (P?.currentTarget?.contains(L) && j) {
        const J = P.clientX > m.value ? "right" : "left";
        p.value = J, m.value = P.clientX;
      }
    }
    return Sd({
      onItemEnter: (P) => !!C(P),
      onItemLeave: (P) => {
        C(P) || ($.value?.focus(), v.value = null);
      },
      onTriggerLeave: (P) => !!C(P),
      searchRef: u,
      pointerGraceTimerRef: f,
      onPointerGraceIntentChange: (P) => {
        g.value = P;
      }
    }), (P, L) => (y(), x(d($o), {
      "as-child": "",
      trapped: d(l),
      onMountAutoFocus: k,
      onUnmountAutoFocus: L[7] || (L[7] = (j) => o("closeAutoFocus", j))
    }, {
      default: h(() => [A(d(mn), {
        "as-child": "",
        "disable-outside-pointer-events": d(s),
        onEscapeKeyDown: L[2] || (L[2] = (j) => o("escapeKeyDown", j)),
        onPointerDownOutside: L[3] || (L[3] = (j) => o("pointerDownOutside", j)),
        onFocusOutside: L[4] || (L[4] = (j) => o("focusOutside", j)),
        onInteractOutside: L[5] || (L[5] = (j) => o("interactOutside", j)),
        onDismiss: L[6] || (L[6] = (j) => o("dismiss"))
      }, {
        default: h(() => [A(d(eu), {
          ref_key: "rovingFocusGroupRef",
          ref: w,
          "current-tab-stop-id": v.value,
          "onUpdate:currentTabStopId": L[0] || (L[0] = (j) => v.value = j),
          "as-child": "",
          orientation: "vertical",
          dir: d(a).dir.value,
          loop: d(i),
          onEntryFocus: L[1] || (L[1] = (j) => {
            o("entryFocus", j), d(a).isUsingKeyboardRef.value || j.preventDefault();
          })
        }, {
          default: h(() => [A(d(To), {
            ref: d(_),
            role: "menu",
            as: P.as,
            "as-child": P.asChild,
            "aria-orientation": "vertical",
            "data-reka-menu-content": "",
            "data-state": d(ga)(d(r).open.value),
            dir: d(a).dir.value,
            side: P.side,
            "side-offset": P.sideOffset,
            align: P.align,
            "align-offset": P.alignOffset,
            "avoid-collisions": P.avoidCollisions,
            "collision-boundary": P.collisionBoundary,
            "collision-padding": P.collisionPadding,
            "arrow-padding": P.arrowPadding,
            "prioritize-position": P.prioritizePosition,
            "position-strategy": P.positionStrategy,
            "update-position-strategy": P.updatePositionStrategy,
            sticky: P.sticky,
            "hide-when-detached": P.hideWhenDetached,
            reference: P.reference,
            onKeydown: M,
            onBlur: O,
            onPointermove: E
          }, {
            default: h(() => [R(P.$slots, "default")]),
            _: 3
          }, 8, [
            "as",
            "as-child",
            "data-state",
            "dir",
            "side",
            "side-offset",
            "align",
            "align-offset",
            "avoid-collisions",
            "collision-boundary",
            "collision-padding",
            "arrow-padding",
            "prioritize-position",
            "position-strategy",
            "update-position-strategy",
            "sticky",
            "hide-when-detached",
            "reference"
          ])]),
          _: 3
        }, 8, [
          "current-tab-stop-id",
          "dir",
          "loop"
        ])]),
        _: 3
      }, 8, ["disable-outside-pointer-events"])]),
      _: 3
    }, 8, ["trapped"]));
  }
}), Ia = xd, Rd = /* @__PURE__ */ b({
  inheritAttrs: !1,
  __name: "MenuItemImpl",
  props: {
    disabled: {
      type: Boolean,
      required: !1
    },
    textValue: {
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
    }
  },
  setup(e) {
    const n = e, t = Aa(), { forwardRef: o } = H(), { CollectionItem: r } = ut(), a = I(!1);
    async function l(i) {
      i.defaultPrevented || oo(i) && (n.disabled ? t.onItemLeave(i) : t.onItemEnter(i) || i.currentTarget?.focus({ preventScroll: !0 }));
    }
    async function s(i) {
      await le(), !i.defaultPrevented && oo(i) && t.onItemLeave(i);
    }
    return (i, u) => (y(), x(d(r), { value: { textValue: i.textValue } }, {
      default: h(() => [A(d(X), F({
        ref: d(o),
        role: "menuitem",
        tabindex: "-1"
      }, i.$attrs, {
        as: i.as,
        "as-child": i.asChild,
        "aria-disabled": i.disabled || void 0,
        "data-disabled": i.disabled ? "" : void 0,
        "data-highlighted": a.value ? "" : void 0,
        onPointermove: l,
        onPointerleave: s,
        onFocus: u[0] || (u[0] = async (c) => {
          await le(), !(c.defaultPrevented || i.disabled) && (a.value = !0);
        }),
        onBlur: u[1] || (u[1] = async (c) => {
          await le(), !c.defaultPrevented && (a.value = !1);
        })
      }), {
        default: h(() => [R(i.$slots, "default")]),
        _: 3
      }, 16, [
        "as",
        "as-child",
        "aria-disabled",
        "data-disabled",
        "data-highlighted"
      ])]),
      _: 3
    }, 8, ["value"]));
  }
}), Pd = Rd, $d = /* @__PURE__ */ b({
  __name: "MenuItem",
  props: {
    disabled: {
      type: Boolean,
      required: !1
    },
    textValue: {
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
    }
  },
  emits: ["select"],
  setup(e, { emit: n }) {
    const t = e, o = n, { forwardRef: r, currentElement: a } = H(), l = Vo(), s = Aa(), i = I(!1);
    async function u() {
      const c = a.value;
      if (!t.disabled && c) {
        const f = new CustomEvent(Si, {
          bubbles: !0,
          cancelable: !0
        });
        o("select", f), await le(), f.defaultPrevented ? i.value = !1 : l.onClose();
      }
    }
    return (c, f) => (y(), x(Pd, F(t, {
      ref: d(r),
      onClick: u,
      onPointerdown: f[0] || (f[0] = () => {
        i.value = !0;
      }),
      onPointerup: f[1] || (f[1] = async (g) => {
        await le(), !g.defaultPrevented && (i.value || g.currentTarget?.click());
      }),
      onKeydown: f[2] || (f[2] = async (g) => {
        const p = d(s).searchRef.value !== "";
        c.disabled || p && g.key === " " || d(to).includes(g.key) && (g.currentTarget.click(), g.preventDefault());
      })
    }), {
      default: h(() => [R(c.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Ea = $d;
const [kd, Ad] = se(["MenuCheckboxItem", "MenuRadioItem"], "MenuItemIndicatorContext");
var Id = /* @__PURE__ */ b({
  __name: "MenuItemIndicator",
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
      required: !1,
      default: "span"
    }
  },
  setup(e) {
    const n = kd({ modelValue: I(!1) });
    return (t, o) => (y(), x(d(mt), { present: t.forceMount || d(ln)(d(n).modelValue.value) || d(n).modelValue.value === !0 }, {
      default: h(() => [A(d(X), {
        as: t.as,
        "as-child": t.asChild,
        "data-state": d(ma)(d(n).modelValue.value)
      }, {
        default: h(() => [R(t.$slots, "default")]),
        _: 3
      }, 8, [
        "as",
        "as-child",
        "data-state"
      ])]),
      _: 3
    }, 8, ["present"]));
  }
}), Ed = Id, Md = /* @__PURE__ */ b({
  __name: "MenuCheckboxItem",
  props: {
    modelValue: {
      type: [Boolean, String],
      required: !1,
      default: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    textValue: {
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
    }
  },
  emits: ["select", "update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, o = n, r = ts(t, ["modelValue"]), a = xe(r), l = Fe(t, "modelValue", o);
    return Ad({ modelValue: l }), (s, i) => (y(), x(Ea, F({ role: "menuitemcheckbox" }, d(a), {
      "aria-checked": d(ln)(d(l)) ? "mixed" : d(l),
      "data-state": d(ma)(d(l)),
      onSelect: i[0] || (i[0] = async (u) => {
        o("select", u), d(ln)(d(l)) ? l.value = !0 : l.value = !d(l);
      })
    }), {
      default: h(() => [R(s.$slots, "default", { modelValue: d(l) })]),
      _: 3
    }, 16, ["aria-checked", "data-state"]));
  }
}), Od = Md, qd = /* @__PURE__ */ b({
  __name: "MenuRootContentModal",
  props: {
    loop: {
      type: Boolean,
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
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: n }) {
    const t = e, o = n, r = he(t, o), a = bn(), { forwardRef: l, currentElement: s } = H();
    return xo(s), (i, u) => (y(), x(Ia, F(d(r), {
      ref: d(l),
      "trap-focus": d(a).open.value,
      "disable-outside-pointer-events": d(a).open.value,
      "disable-outside-scroll": !0,
      onDismiss: u[0] || (u[0] = (c) => d(a).onOpenChange(!1)),
      onFocusOutside: u[1] || (u[1] = rt((c) => o("focusOutside", c), ["prevent"]))
    }), {
      default: h(() => [R(i.$slots, "default")]),
      _: 3
    }, 16, ["trap-focus", "disable-outside-pointer-events"]));
  }
}), Fd = qd, Dd = /* @__PURE__ */ b({
  __name: "MenuRootContentNonModal",
  props: {
    loop: {
      type: Boolean,
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
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: n }) {
    const r = he(e, n), a = bn();
    return (l, s) => (y(), x(Ia, F(d(r), {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      "disable-outside-scroll": !1,
      onDismiss: s[0] || (s[0] = (i) => d(a).onOpenChange(!1))
    }), {
      default: h(() => [R(l.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Bd = Dd, Td = /* @__PURE__ */ b({
  __name: "MenuContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    loop: {
      type: Boolean,
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
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(e, { emit: n }) {
    const r = he(e, n), a = bn(), l = Vo();
    return (s, i) => (y(), x(d(mt), { present: s.forceMount || d(a).open.value }, {
      default: h(() => [d(l).modal.value ? (y(), x(Fd, be(F({ key: 0 }, {
        ...s.$attrs,
        ...d(r)
      })), {
        default: h(() => [R(s.$slots, "default")]),
        _: 3
      }, 16)) : (y(), x(Bd, be(F({ key: 1 }, {
        ...s.$attrs,
        ...d(r)
      })), {
        default: h(() => [R(s.$slots, "default")]),
        _: 3
      }, 16))]),
      _: 3
    }, 8, ["present"]));
  }
}), Vd = Td, Ld = /* @__PURE__ */ b({
  __name: "MenuLabel",
  props: {
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "div"
    }
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), x(d(X), be(Se(n)), {
      default: h(() => [R(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), zd = Ld, Nd = /* @__PURE__ */ b({
  __name: "MenuPortal",
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
    const n = e;
    return (t, o) => (y(), x(d(vn), be(Se(n)), {
      default: h(() => [R(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Hd = Nd, Gd = /* @__PURE__ */ b({
  __name: "MenuSeparator",
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
    const n = e;
    return (t, o) => (y(), x(d(X), F(n, {
      role: "separator",
      "aria-orientation": "horizontal"
    }), {
      default: h(() => [R(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), jd = Gd, Ud = /* @__PURE__ */ b({
  __name: "DropdownMenuCheckboxItem",
  props: {
    modelValue: {
      type: [Boolean, String],
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    textValue: {
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
    }
  },
  emits: ["select", "update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, r = It(n);
    return H(), (a, l) => (y(), x(d(Od), be(Se({
      ...t,
      ...d(r)
    })), {
      default: h(() => [R(a.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Kd = Ud;
const [Ma, Wd] = se("DropdownMenuRoot");
var Xd = /* @__PURE__ */ b({
  __name: "DropdownMenuRoot",
  props: {
    defaultOpen: {
      type: Boolean,
      required: !1
    },
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    dir: {
      type: String,
      required: !1
    },
    modal: {
      type: Boolean,
      required: !1,
      default: !0
    }
  },
  emits: ["update:open"],
  setup(e, { emit: n }) {
    const t = e, o = n;
    H();
    const r = Fe(t, "open", o, {
      defaultValue: t.defaultOpen,
      passive: t.open === void 0
    }), a = I(), { modal: l, dir: s } = me(t), i = jt(s);
    return Wd({
      open: r,
      onOpenChange: (u) => {
        r.value = u;
      },
      onOpenToggle: () => {
        r.value = !r.value;
      },
      triggerId: "",
      triggerElement: a,
      contentId: "",
      modal: l,
      dir: i
    }), (u, c) => (y(), x(d(Cd), {
      open: d(r),
      "onUpdate:open": c[0] || (c[0] = (f) => Xe(r) ? r.value = f : null),
      dir: d(i),
      modal: d(l)
    }, {
      default: h(() => [R(u.$slots, "default", { open: d(r) })]),
      _: 3
    }, 8, [
      "open",
      "dir",
      "modal"
    ]));
  }
}), Yd = Xd, Jd = /* @__PURE__ */ b({
  __name: "DropdownMenuContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    loop: {
      type: Boolean,
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
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "closeAutoFocus"
  ],
  setup(e, { emit: n }) {
    const r = he(e, n);
    H();
    const a = Ma(), l = I(!1);
    function s(i) {
      i.defaultPrevented || (l.value || setTimeout(() => {
        a.triggerElement.value?.focus();
      }, 0), l.value = !1, i.preventDefault());
    }
    return a.contentId ||= Ne(void 0, "reka-dropdown-menu-content"), (i, u) => (y(), x(d(Vd), F(d(r), {
      id: d(a).contentId,
      "aria-labelledby": d(a)?.triggerId,
      style: {
        "--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
        "--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
        "--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
        "--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
        "--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
      },
      onCloseAutoFocus: s,
      onInteractOutside: u[0] || (u[0] = (c) => {
        if (c.defaultPrevented) return;
        const f = c.detail.originalEvent, g = f.button === 0 && f.ctrlKey === !0, p = f.button === 2 || g;
        (!d(a).modal.value || p) && (l.value = !0), d(a).triggerElement.value?.contains(c.target) && c.preventDefault();
      })
    }), {
      default: h(() => [R(i.$slots, "default")]),
      _: 3
    }, 16, ["id", "aria-labelledby"]));
  }
}), Zd = Jd, Qd = /* @__PURE__ */ b({
  __name: "DropdownMenuItem",
  props: {
    disabled: {
      type: Boolean,
      required: !1
    },
    textValue: {
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
    }
  },
  emits: ["select"],
  setup(e, { emit: n }) {
    const t = e, r = It(n);
    return H(), (a, l) => (y(), x(d(Ea), be(Se({
      ...t,
      ...d(r)
    })), {
      default: h(() => [R(a.$slots, "default")]),
      _: 3
    }, 16));
  }
}), ec = Qd, tc = /* @__PURE__ */ b({
  __name: "DropdownMenuItemIndicator",
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
    const n = e;
    return H(), (t, o) => (y(), x(d(Ed), be(Se(n)), {
      default: h(() => [R(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), nc = tc, oc = /* @__PURE__ */ b({
  __name: "DropdownMenuLabel",
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
    const n = e;
    return H(), (t, o) => (y(), x(d(zd), be(Se(n)), {
      default: h(() => [R(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), rc = oc, ac = /* @__PURE__ */ b({
  __name: "DropdownMenuPortal",
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
    const n = e;
    return (t, o) => (y(), x(d(Hd), be(Se(n)), {
      default: h(() => [R(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), lc = ac, sc = /* @__PURE__ */ b({
  __name: "DropdownMenuSeparator",
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
    const n = e;
    return H(), (t, o) => (y(), x(d(jd), be(Se(n)), {
      default: h(() => [R(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), ic = sc, uc = /* @__PURE__ */ b({
  __name: "DropdownMenuTrigger",
  props: {
    disabled: {
      type: Boolean,
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
    const n = e, t = Ma(), { forwardRef: o, currentElement: r } = H();
    return ve(() => {
      t.triggerElement = r;
    }), t.triggerId ||= Ne(void 0, "reka-dropdown-menu-trigger"), (a, l) => (y(), x(d(vd), { "as-child": "" }, {
      default: h(() => [A(d(X), {
        id: d(t).triggerId,
        ref: d(o),
        type: a.as === "button" ? "button" : void 0,
        "as-child": n.asChild,
        as: a.as,
        "aria-haspopup": "menu",
        "aria-expanded": d(t).open.value,
        "aria-controls": d(t).open.value ? d(t).contentId : void 0,
        "data-disabled": a.disabled ? "" : void 0,
        disabled: a.disabled,
        "data-state": d(t).open.value ? "open" : "closed",
        onClick: l[0] || (l[0] = async (s) => {
          !a.disabled && s.button === 0 && s.ctrlKey === !1 && (d(t)?.onOpenToggle(), await le(), d(t).open.value && s.preventDefault());
        }),
        onKeydown: l[1] || (l[1] = yo((s) => {
          a.disabled || (["Enter", " "].includes(s.key) && d(t).onOpenToggle(), s.key === "ArrowDown" && d(t).onOpenChange(!0), [
            "Enter",
            " ",
            "ArrowDown"
          ].includes(s.key) && s.preventDefault());
        }, [
          "enter",
          "space",
          "arrow-down"
        ]))
      }, {
        default: h(() => [R(a.$slots, "default")]),
        _: 3
      }, 8, [
        "id",
        "type",
        "as-child",
        "as",
        "aria-expanded",
        "aria-controls",
        "data-disabled",
        "disabled",
        "data-state"
      ])]),
      _: 3
    }));
  }
}), dc = uc, cc = /* @__PURE__ */ b({
  __name: "BubbleSelect",
  props: {
    autocomplete: {
      type: String,
      required: !1
    },
    autofocus: {
      type: Boolean,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    form: {
      type: String,
      required: !1
    },
    multiple: {
      type: Boolean,
      required: !1
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    },
    size: {
      type: Number,
      required: !1
    },
    value: {
      type: null,
      required: !1
    }
  },
  setup(e) {
    const n = e, t = I();
    return oe(() => n.value, (o, r) => {
      const a = window.HTMLSelectElement.prototype, s = Object.getOwnPropertyDescriptor(a, "value").set;
      if (o !== r && s && t.value) {
        const i = new Event("change", { bubbles: !0 });
        s.call(t.value, o), t.value.dispatchEvent(i);
      }
    }), (o, r) => (y(), x(d(ko), { "as-child": "" }, {
      default: h(() => [G("select", F({
        ref_key: "selectElement",
        ref: t
      }, n), [R(o.$slots, "default")], 16)]),
      _: 3
    }));
  }
}), fc = cc;
const pc = [
  " ",
  "Enter",
  "ArrowUp",
  "ArrowDown"
], gc = [" ", "Enter"], Me = 10;
function zt(e, n, t) {
  return e === void 0 ? !1 : Array.isArray(e) ? e.some((o) => uo(o, n, t)) : uo(e, n, t);
}
function uo(e, n, t) {
  return e === void 0 || n === void 0 ? !1 : typeof e == "string" ? e === n : typeof t == "function" ? t(e, n) : typeof t == "string" ? e?.[t] === n?.[t] : Tt(e, n);
}
function mc(e) {
  return e == null || e === "" || Array.isArray(e) && e.length === 0;
}
const vc = {
  key: 0,
  value: ""
}, [ht, Oa] = se("SelectRoot");
var hc = /* @__PURE__ */ b({
  inheritAttrs: !1,
  __name: "SelectRoot",
  props: {
    open: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      required: !1
    },
    defaultValue: {
      type: null,
      required: !1
    },
    modelValue: {
      type: null,
      required: !1,
      default: void 0
    },
    by: {
      type: [String, Function],
      required: !1
    },
    dir: {
      type: String,
      required: !1
    },
    multiple: {
      type: Boolean,
      required: !1
    },
    autocomplete: {
      type: String,
      required: !1
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    }
  },
  emits: ["update:modelValue", "update:open"],
  setup(e, { emit: n }) {
    const t = e, o = n, { required: r, disabled: a, multiple: l, dir: s } = me(t), i = Fe(t, "modelValue", o, {
      defaultValue: t.defaultValue ?? (l.value ? [] : void 0),
      passive: t.modelValue === void 0,
      deep: !0
    }), u = Fe(t, "open", o, {
      defaultValue: t.defaultOpen,
      passive: t.open === void 0
    }), c = I(), f = I(), g = I({
      x: 0,
      y: 0
    }), p = q(() => l.value && Array.isArray(i.value) ? i.value?.length === 0 : Yn(i.value));
    ut({ isProvider: !0 });
    const m = jt(s), v = sa(c), w = I(/* @__PURE__ */ new Set()), _ = q(() => Array.from(w.value).map((C) => C.value).join(";"));
    function $(C) {
      if (l.value) {
        const k = Array.isArray(i.value) ? [...i.value] : [], M = k.findIndex((O) => uo(O, C, t.by));
        M === -1 ? k.push(C) : k.splice(M, 1), i.value = [...k];
      } else i.value = C;
    }
    function S(C) {
      return Array.from(w.value).find((k) => zt(C, k.value, t.by));
    }
    return Oa({
      triggerElement: c,
      onTriggerChange: (C) => {
        c.value = C;
      },
      valueElement: f,
      onValueElementChange: (C) => {
        f.value = C;
      },
      contentId: "",
      modelValue: i,
      onValueChange: $,
      by: t.by,
      open: u,
      multiple: l,
      required: r,
      onOpenChange: (C) => {
        u.value = C;
      },
      dir: m,
      triggerPointerDownPosRef: g,
      disabled: a,
      isEmptyModelValue: p,
      optionsSet: w,
      onOptionAdd: (C) => {
        const k = S(C.value);
        k && w.value.delete(k), w.value.add(C);
      },
      onOptionRemove: (C) => {
        const k = S(C.value);
        k && w.value.delete(k);
      }
    }), (C, k) => (y(), x(d(Ao), null, {
      default: h(() => [R(C.$slots, "default", {
        modelValue: d(i),
        open: d(u)
      }), d(v) ? (y(), x(fc, {
        key: _.value,
        "aria-hidden": "true",
        tabindex: "-1",
        multiple: d(l),
        required: d(r),
        name: C.name,
        autocomplete: C.autocomplete,
        disabled: d(a),
        value: d(i)
      }, {
        default: h(() => [d(Yn)(d(i)) ? (y(), B("option", vc)) : Y("v-if", !0), (y(!0), B(de, null, Oe(Array.from(w.value), (M) => (y(), B("option", F({ key: M.value ?? "" }, { ref_for: !0 }, M), null, 16))), 128))]),
        _: 1
      }, 8, [
        "multiple",
        "required",
        "name",
        "autocomplete",
        "disabled",
        "value"
      ])) : Y("v-if", !0)]),
      _: 3
    }));
  }
}), yc = hc, wc = /* @__PURE__ */ b({
  __name: "SelectPopperPosition",
  props: {
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
      required: !1,
      default: "start"
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
      required: !1,
      default: Me
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
  },
  setup(e) {
    const t = xe(e);
    return (o, r) => (y(), x(d(To), F(d(t), { style: {
      boxSizing: "border-box",
      "--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
      "--reka-select-content-available-width": "var(--reka-popper-available-width)",
      "--reka-select-content-available-height": "var(--reka-popper-available-height)",
      "--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
      "--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
    } }), {
      default: h(() => [R(o.$slots, "default")]),
      _: 3
    }, 16));
  }
}), _c = wc;
const bc = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
}, [yt, qa] = se("SelectContent");
var Cc = /* @__PURE__ */ b({
  __name: "SelectContentImpl",
  props: {
    position: {
      type: String,
      required: !1,
      default: "item-aligned"
    },
    bodyLock: {
      type: Boolean,
      required: !1,
      default: !0
    },
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
      required: !1,
      default: "start"
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
  },
  emits: [
    "closeAutoFocus",
    "escapeKeyDown",
    "pointerDownOutside"
  ],
  setup(e, { emit: n }) {
    const t = e, o = n, r = ht();
    la(), So(t.bodyLock);
    const { CollectionSlot: a, getItems: l } = ut(), s = I();
    xo(s);
    const { search: i, handleTypeaheadSearch: u } = Ro(), c = I(), f = I(), g = I(), p = I(!1), m = I(!1), v = I(!1);
    function w() {
      f.value && s.value && no([f.value, s.value]);
    }
    oe(p, () => {
      w();
    });
    const { onOpenChange: _, triggerPointerDownPosRef: $ } = r;
    ge((M) => {
      if (!s.value) return;
      let O = {
        x: 0,
        y: 0
      };
      const E = (L) => {
        O = {
          x: Math.abs(Math.round(L.pageX) - ($.value?.x ?? 0)),
          y: Math.abs(Math.round(L.pageY) - ($.value?.y ?? 0))
        };
      }, P = (L) => {
        L.pointerType !== "touch" && (O.x <= 10 && O.y <= 10 ? L.preventDefault() : s.value?.contains(L.target) || _(!1), document.removeEventListener("pointermove", E), $.value = null);
      };
      $.value !== null && (document.addEventListener("pointermove", E), document.addEventListener("pointerup", P, {
        capture: !0,
        once: !0
      })), M(() => {
        document.removeEventListener("pointermove", E), document.removeEventListener("pointerup", P, { capture: !0 });
      });
    });
    function S(M) {
      const O = M.ctrlKey || M.altKey || M.metaKey;
      if (M.key === "Tab" && M.preventDefault(), !O && M.key.length === 1 && u(M.key, l()), [
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End"
      ].includes(M.key)) {
        let P = [...l().map((L) => L.ref)];
        if (["ArrowUp", "End"].includes(M.key) && (P = P.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(M.key)) {
          const L = M.target, j = P.indexOf(L);
          P = P.slice(j + 1);
        }
        setTimeout(() => no(P)), M.preventDefault();
      }
    }
    const C = q(() => t.position === "popper" ? t : {}), k = xe(C.value);
    return qa({
      content: s,
      viewport: c,
      onViewportChange: (M) => {
        c.value = M;
      },
      itemRefCallback: (M, O, E) => {
        const P = !m.value && !E, L = zt(r.modelValue.value, O, r.by);
        if (r.multiple.value) {
          if (v.value) return;
          (L || P) && (f.value = M, L && (v.value = !0));
        } else (L || P) && (f.value = M);
        P && (m.value = !0);
      },
      selectedItem: f,
      selectedItemText: g,
      onItemLeave: () => {
        s.value?.focus();
      },
      itemTextRefCallback: (M, O, E) => {
        const P = !m.value && !E;
        (zt(r.modelValue.value, O, r.by) || P) && (g.value = M);
      },
      focusSelectedItem: w,
      position: t.position,
      isPositioned: p,
      searchRef: i
    }), (M, O) => (y(), x(d(a), null, {
      default: h(() => [A(d($o), {
        "as-child": "",
        onMountAutoFocus: O[6] || (O[6] = rt(() => {
        }, ["prevent"])),
        onUnmountAutoFocus: O[7] || (O[7] = (E) => {
          o("closeAutoFocus", E), !E.defaultPrevented && (d(r).triggerElement.value?.focus({ preventScroll: !0 }), E.preventDefault());
        })
      }, {
        default: h(() => [A(d(mn), {
          "as-child": "",
          "disable-outside-pointer-events": "",
          onFocusOutside: O[2] || (O[2] = rt(() => {
          }, ["prevent"])),
          onDismiss: O[3] || (O[3] = (E) => d(r).onOpenChange(!1)),
          onEscapeKeyDown: O[4] || (O[4] = (E) => o("escapeKeyDown", E)),
          onPointerDownOutside: O[5] || (O[5] = (E) => o("pointerDownOutside", E))
        }, {
          default: h(() => [(y(), x(wo(M.position === "popper" ? _c : Pc), F({
            ...M.$attrs,
            ...d(k)
          }, {
            id: d(r).contentId,
            ref: (E) => {
              const P = d(ze)(E);
              P?.hasAttribute("data-reka-popper-content-wrapper") ? s.value = P.firstElementChild : s.value = P;
            },
            role: "listbox",
            "data-state": d(r).open.value ? "open" : "closed",
            dir: d(r).dir.value,
            style: {
              display: "flex",
              flexDirection: "column",
              outline: "none"
            },
            onContextmenu: O[0] || (O[0] = rt(() => {
            }, ["prevent"])),
            onPlaced: O[1] || (O[1] = (E) => p.value = !0),
            onKeydown: S
          }), {
            default: h(() => [R(M.$slots, "default")]),
            _: 3
          }, 16, [
            "id",
            "data-state",
            "dir",
            "onKeydown"
          ]))]),
          _: 3
        })]),
        _: 3
      })]),
      _: 3
    }));
  }
}), Sc = Cc;
const [Lo, xc] = se("SelectItemAlignedPosition");
var Rc = /* @__PURE__ */ b({
  inheritAttrs: !1,
  __name: "SelectItemAlignedPosition",
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
  emits: ["placed"],
  setup(e, { emit: n }) {
    const t = e, o = n, { getItems: r } = ut(), a = ht(), l = yt(), s = I(!1), i = I(!0), u = I(), { forwardRef: c, currentElement: f } = H(), { viewport: g, selectedItem: p, selectedItemText: m, focusSelectedItem: v } = l;
    function w() {
      if (a.triggerElement.value && a.valueElement.value && u.value && f.value && g?.value && p?.value && m?.value) {
        const S = a.triggerElement.value.getBoundingClientRect(), C = f.value.getBoundingClientRect(), k = a.valueElement.value.getBoundingClientRect(), M = m.value.getBoundingClientRect();
        if (a.dir.value !== "rtl") {
          const Q = M.left - C.left, Ee = k.left - Q, Ae = S.left - Ee, Ie = S.width + Ae, ct = Math.max(Ie, C.width), et = window.innerWidth - Me, Pn = er(Ee, Me, Math.max(Me, et - ct));
          u.value.style.minWidth = `${Ie}px`, u.value.style.left = `${Pn}px`;
        } else {
          const Q = C.right - M.right, Ee = window.innerWidth - k.right - Q, Ae = window.innerWidth - S.right - Ee, Ie = S.width + Ae, ct = Math.max(Ie, C.width), et = window.innerWidth - Me, Pn = er(Ee, Me, Math.max(Me, et - ct));
          u.value.style.minWidth = `${Ie}px`, u.value.style.right = `${Pn}px`;
        }
        const O = r().map((Q) => Q.ref), E = window.innerHeight - Me * 2, P = g.value.scrollHeight, L = window.getComputedStyle(f.value), j = Number.parseInt(L.borderTopWidth, 10), J = Number.parseInt(L.paddingTop, 10), ae = Number.parseInt(L.borderBottomWidth, 10), ee = Number.parseInt(L.paddingBottom, 10), re = j + J + P + ee + ae, te = Math.min(p.value.offsetHeight * 5, re), ne = window.getComputedStyle(g.value), D = Number.parseInt(ne.paddingTop, 10), Re = Number.parseInt(ne.paddingBottom, 10), je = S.top + S.height / 2 - Me, Kt = E - je, dt = p.value.offsetHeight / 2, pe = p.value.offsetTop + dt, ue = j + J + pe, wt = re - ue;
        if (ue <= je) {
          const Q = p.value === O[O.length - 1];
          u.value.style.bottom = "0px";
          const Ee = f.value.clientHeight - g.value.offsetTop - g.value.offsetHeight, Ae = Math.max(Kt, dt + (Q ? Re : 0) + Ee + ae), Ie = ue + Ae;
          u.value.style.height = `${Ie}px`;
        } else {
          const Q = p.value === O[0];
          u.value.style.top = "0px";
          const Ae = Math.max(je, j + g.value.offsetTop + (Q ? D : 0) + dt) + wt;
          u.value.style.height = `${Ae}px`, g.value.scrollTop = ue - je + g.value.offsetTop;
        }
        u.value.style.margin = `${Me}px 0`, u.value.style.minHeight = `${te}px`, u.value.style.maxHeight = `${E}px`, o("placed"), requestAnimationFrame(() => s.value = !0);
      }
    }
    const _ = I("");
    ve(async () => {
      await le(), w(), f.value && (_.value = window.getComputedStyle(f.value).zIndex);
    });
    function $(S) {
      S && i.value === !0 && (w(), v?.(), i.value = !1);
    }
    return gs(a.triggerElement, () => {
      w();
    }), xc({
      contentWrapper: u,
      shouldExpandOnScrollRef: s,
      onScrollButtonChange: $
    }), (S, C) => (y(), B("div", {
      ref_key: "contentWrapperElement",
      ref: u,
      style: Bt({
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        zIndex: _.value
      })
    }, [A(d(X), F({
      ref: d(c),
      style: {
        boxSizing: "border-box",
        maxHeight: "100%"
      }
    }, {
      ...S.$attrs,
      ...t
    }), {
      default: h(() => [R(S.$slots, "default")]),
      _: 3
    }, 16)], 4));
  }
}), Pc = Rc, $c = /* @__PURE__ */ b({
  inheritAttrs: !1,
  __name: "SelectProvider",
  props: { context: {
    type: Object,
    required: !0
  } },
  setup(e) {
    return Oa(e.context), qa(bc), (t, o) => R(t.$slots, "default");
  }
}), kc = $c;
const Ac = { key: 1 };
var Ic = /* @__PURE__ */ b({
  inheritAttrs: !1,
  __name: "SelectContent",
  props: {
    forceMount: {
      type: Boolean,
      required: !1
    },
    position: {
      type: String,
      required: !1
    },
    bodyLock: {
      type: Boolean,
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
  },
  emits: [
    "closeAutoFocus",
    "escapeKeyDown",
    "pointerDownOutside"
  ],
  setup(e, { emit: n }) {
    const t = e, r = he(t, n), a = ht(), l = I();
    ve(() => {
      l.value = new DocumentFragment();
    });
    const s = I(), i = q(() => t.forceMount || a.open.value), u = I(i.value);
    return oe(i, () => {
      setTimeout(() => u.value = i.value);
    }), (c, f) => i.value || u.value || s.value?.present ? (y(), x(d(mt), {
      key: 0,
      ref_key: "presenceRef",
      ref: s,
      present: i.value
    }, {
      default: h(() => [A(Sc, be(Se({
        ...d(r),
        ...c.$attrs
      })), {
        default: h(() => [R(c.$slots, "default")]),
        _: 3
      }, 16)]),
      _: 3
    }, 8, ["present"])) : l.value ? (y(), B("div", Ac, [(y(), x(Tr, { to: l.value }, [A(kc, { context: d(a) }, {
      default: h(() => [R(c.$slots, "default")]),
      _: 3
    }, 8, ["context"])], 8, ["to"]))])) : Y("v-if", !0);
  }
}), Ec = Ic, Mc = /* @__PURE__ */ b({
  __name: "SelectIcon",
  props: {
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
    return (n, t) => (y(), x(d(X), {
      "aria-hidden": "true",
      as: n.as,
      "as-child": n.asChild
    }, {
      default: h(() => [R(n.$slots, "default", {}, () => [t[0] || (t[0] = we("▼"))])]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), Oc = Mc;
const [Fa, qc] = se("SelectItem");
var Fc = /* @__PURE__ */ b({
  __name: "SelectItem",
  props: {
    value: {
      type: null,
      required: !0
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    textValue: {
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
    }
  },
  emits: ["select"],
  setup(e, { emit: n }) {
    const t = e, o = n, { disabled: r } = me(t), a = ht(), l = yt(), { forwardRef: s, currentElement: i } = H(), { CollectionItem: u } = ut(), c = q(() => zt(a.modelValue?.value, t.value, a.by)), f = I(!1), g = I(t.textValue ?? ""), p = Ne(void 0, "reka-select-item-text"), m = "select.select";
    async function v(C) {
      if (C.defaultPrevented) return;
      const k = {
        originalEvent: C,
        value: t.value
      };
      bo(m, w, k);
    }
    async function w(C) {
      await le(), o("select", C), !C.defaultPrevented && (r.value || (a.onValueChange(t.value), a.multiple.value || a.onOpenChange(!1)));
    }
    async function _(C) {
      await le(), !C.defaultPrevented && (r.value ? l.onItemLeave?.() : C.currentTarget?.focus({ preventScroll: !0 }));
    }
    async function $(C) {
      await le(), !C.defaultPrevented && C.currentTarget === _e() && l.onItemLeave?.();
    }
    async function S(C) {
      await le(), !(C.defaultPrevented || l.searchRef?.value !== "" && C.key === " ") && (gc.includes(C.key) && v(C), C.key === " " && C.preventDefault());
    }
    if (t.value === "") throw new Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
    return ve(() => {
      i.value && l.itemRefCallback(i.value, t.value, t.disabled);
    }), qc({
      value: t.value,
      disabled: r,
      textId: p,
      isSelected: c,
      onItemTextChange: (C) => {
        g.value = ((g.value || C?.textContent) ?? "").trim();
      }
    }), (C, k) => (y(), x(d(u), { value: { textValue: g.value } }, {
      default: h(() => [A(d(X), {
        ref: d(s),
        role: "option",
        "aria-labelledby": d(p),
        "data-highlighted": f.value ? "" : void 0,
        "aria-selected": c.value,
        "data-state": c.value ? "checked" : "unchecked",
        "aria-disabled": d(r) || void 0,
        "data-disabled": d(r) ? "" : void 0,
        tabindex: d(r) ? void 0 : -1,
        as: C.as,
        "as-child": C.asChild,
        onFocus: k[0] || (k[0] = (M) => f.value = !0),
        onBlur: k[1] || (k[1] = (M) => f.value = !1),
        onPointerup: v,
        onPointerdown: k[2] || (k[2] = (M) => {
          M.currentTarget.focus({ preventScroll: !0 });
        }),
        onTouchend: k[3] || (k[3] = rt(() => {
        }, ["prevent", "stop"])),
        onPointermove: _,
        onPointerleave: $,
        onKeydown: S
      }, {
        default: h(() => [R(C.$slots, "default")]),
        _: 3
      }, 8, [
        "aria-labelledby",
        "data-highlighted",
        "aria-selected",
        "data-state",
        "aria-disabled",
        "data-disabled",
        "tabindex",
        "as",
        "as-child"
      ])]),
      _: 3
    }, 8, ["value"]));
  }
}), Dc = Fc, Bc = /* @__PURE__ */ b({
  __name: "SelectItemIndicator",
  props: {
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
    const n = e, t = Fa();
    return (o, r) => d(t).isSelected.value ? (y(), x(d(X), F({
      key: 0,
      "aria-hidden": "true"
    }, n), {
      default: h(() => [R(o.$slots, "default")]),
      _: 3
    }, 16)) : Y("v-if", !0);
  }
}), Tc = Bc, Vc = /* @__PURE__ */ b({
  inheritAttrs: !1,
  __name: "SelectItemText",
  props: {
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
    const n = e, t = ht(), o = yt(), r = Fa(), { forwardRef: a, currentElement: l } = H(), s = q(() => ({
      value: r.value,
      disabled: r.disabled.value,
      textContent: l.value?.textContent ?? r.value?.toString() ?? ""
    }));
    return ve(() => {
      l.value && (r.onItemTextChange(l.value), o.itemTextRefCallback(l.value, r.value, r.disabled.value), t.onOptionAdd(s.value));
    }), cn(() => {
      t.onOptionRemove(s.value);
    }), (i, u) => (y(), x(d(X), F({
      id: d(r).textId,
      ref: d(a)
    }, {
      ...n,
      ...i.$attrs
    }), {
      default: h(() => [R(i.$slots, "default")]),
      _: 3
    }, 16, ["id"]));
  }
}), Lc = Vc, zc = /* @__PURE__ */ b({
  __name: "SelectPortal",
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
    const n = e;
    return (t, o) => (y(), x(d(vn), be(Se(n)), {
      default: h(() => [R(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Nc = zc, Hc = /* @__PURE__ */ b({
  __name: "SelectScrollButtonImpl",
  emits: ["autoScroll"],
  setup(e, { emit: n }) {
    const t = n, { getItems: o } = ut(), r = yt(), a = I(null);
    function l() {
      a.value !== null && (window.clearInterval(a.value), a.value = null);
    }
    ge(() => {
      o().map((c) => c.ref).find((c) => c === _e())?.scrollIntoView({ block: "nearest" });
    });
    function s() {
      a.value === null && (a.value = window.setInterval(() => {
        t("autoScroll");
      }, 50));
    }
    function i() {
      r.onItemLeave?.(), a.value === null && (a.value = window.setInterval(() => {
        t("autoScroll");
      }, 50));
    }
    return Fr(() => l()), (u, c) => (y(), x(d(X), F({
      "aria-hidden": "true",
      style: { flexShrink: 0 }
    }, u.$parent?.$props, {
      onPointerdown: s,
      onPointermove: i,
      onPointerleave: c[0] || (c[0] = () => {
        l();
      })
    }), {
      default: h(() => [R(u.$slots, "default")]),
      _: 3
    }, 16));
  }
}), Da = Hc, Gc = /* @__PURE__ */ b({
  __name: "SelectScrollDownButton",
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
    const n = yt(), t = n.position === "item-aligned" ? Lo() : void 0, { forwardRef: o, currentElement: r } = H(), a = I(!1);
    return ge((l) => {
      if (n.viewport?.value && n.isPositioned?.value) {
        let i = function() {
          const u = s.scrollHeight - s.clientHeight;
          a.value = Math.ceil(s.scrollTop) < u;
        };
        const s = n.viewport.value;
        i(), s.addEventListener("scroll", i), l(() => s.removeEventListener("scroll", i));
      }
    }), oe(r, () => {
      r.value && t?.onScrollButtonChange(r.value);
    }), (l, s) => a.value ? (y(), x(Da, {
      key: 0,
      ref: d(o),
      onAutoScroll: s[0] || (s[0] = () => {
        const { viewport: i, selectedItem: u } = d(n);
        i?.value && u?.value && (i.value.scrollTop = i.value.scrollTop + u.value.offsetHeight);
      })
    }, {
      default: h(() => [R(l.$slots, "default")]),
      _: 3
    }, 512)) : Y("v-if", !0);
  }
}), jc = Gc, Uc = /* @__PURE__ */ b({
  __name: "SelectScrollUpButton",
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
    const n = yt(), t = n.position === "item-aligned" ? Lo() : void 0, { forwardRef: o, currentElement: r } = H(), a = I(!1);
    return ge((l) => {
      if (n.viewport?.value && n.isPositioned?.value) {
        let i = function() {
          a.value = s.scrollTop > 0;
        };
        const s = n.viewport.value;
        i(), s.addEventListener("scroll", i), l(() => s.removeEventListener("scroll", i));
      }
    }), oe(r, () => {
      r.value && t?.onScrollButtonChange(r.value);
    }), (l, s) => a.value ? (y(), x(Da, {
      key: 0,
      ref: d(o),
      onAutoScroll: s[0] || (s[0] = () => {
        const { viewport: i, selectedItem: u } = d(n);
        i?.value && u?.value && (i.value.scrollTop = i.value.scrollTop - u.value.offsetHeight);
      })
    }, {
      default: h(() => [R(l.$slots, "default")]),
      _: 3
    }, 512)) : Y("v-if", !0);
  }
}), Kc = Uc, Wc = /* @__PURE__ */ b({
  __name: "SelectTrigger",
  props: {
    disabled: {
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
      required: !1,
      default: "button"
    }
  },
  setup(e) {
    const n = e, t = ht(), { forwardRef: o, currentElement: r } = H(), a = q(() => t.disabled?.value || n.disabled);
    t.contentId ||= Ne(void 0, "reka-select-content"), ve(() => {
      t.onTriggerChange(r.value);
    });
    const { getItems: l } = ut(), { search: s, handleTypeaheadSearch: i, resetTypeahead: u } = Ro();
    function c() {
      a.value || (t.onOpenChange(!0), u());
    }
    function f(g) {
      c(), t.triggerPointerDownPosRef.value = {
        x: Math.round(g.pageX),
        y: Math.round(g.pageY)
      };
    }
    return (g, p) => (y(), x(d(Io), {
      "as-child": "",
      reference: g.reference
    }, {
      default: h(() => [A(d(X), {
        ref: d(o),
        role: "combobox",
        type: g.as === "button" ? "button" : void 0,
        "aria-controls": d(t).contentId,
        "aria-expanded": d(t).open.value || !1,
        "aria-required": d(t).required?.value,
        "aria-autocomplete": "none",
        disabled: a.value,
        dir: d(t)?.dir.value,
        "data-state": d(t)?.open.value ? "open" : "closed",
        "data-disabled": a.value ? "" : void 0,
        "data-placeholder": d(mc)(d(t).modelValue?.value) ? "" : void 0,
        "as-child": g.asChild,
        as: g.as,
        onClick: p[0] || (p[0] = (m) => {
          m?.currentTarget?.focus();
        }),
        onPointerdown: p[1] || (p[1] = (m) => {
          if (m.pointerType === "touch") return m.preventDefault();
          const v = m.target;
          v.hasPointerCapture(m.pointerId) && v.releasePointerCapture(m.pointerId), m.button === 0 && m.ctrlKey === !1 && (f(m), m.preventDefault());
        }),
        onPointerup: p[2] || (p[2] = rt((m) => {
          m.pointerType === "touch" && f(m);
        }, ["prevent"])),
        onKeydown: p[3] || (p[3] = (m) => {
          const v = d(s) !== "";
          !(m.ctrlKey || m.altKey || m.metaKey) && m.key.length === 1 && v && m.key === " " || (d(i)(m.key, d(l)()), d(pc).includes(m.key) && (c(), m.preventDefault()));
        })
      }, {
        default: h(() => [R(g.$slots, "default")]),
        _: 3
      }, 8, [
        "type",
        "aria-controls",
        "aria-expanded",
        "aria-required",
        "disabled",
        "dir",
        "data-state",
        "data-disabled",
        "data-placeholder",
        "as-child",
        "as"
      ])]),
      _: 3
    }, 8, ["reference"]));
  }
}), Xc = Wc, Yc = /* @__PURE__ */ b({
  __name: "SelectValue",
  props: {
    placeholder: {
      type: String,
      required: !1,
      default: ""
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
    const n = e, { forwardRef: t, currentElement: o } = H(), r = ht();
    ve(() => {
      r.valueElement = o;
    });
    const a = q(() => {
      let s = [];
      const i = Array.from(r.optionsSet.value), u = (c) => i.find((f) => zt(c, f.value, r.by));
      return Array.isArray(r.modelValue.value) ? s = r.modelValue.value.map((c) => u(c)?.textContent ?? "") : s = [u(r.modelValue.value)?.textContent ?? ""], s.filter(Boolean);
    }), l = q(() => a.value.length ? a.value.join(", ") : n.placeholder);
    return (s, i) => (y(), x(d(X), {
      ref: d(t),
      as: s.as,
      "as-child": s.asChild,
      style: { pointerEvents: "none" },
      "data-placeholder": a.value.length ? void 0 : n.placeholder
    }, {
      default: h(() => [R(s.$slots, "default", {
        selectedLabel: a.value,
        modelValue: d(r).modelValue.value
      }, () => [we(Z(l.value), 1)])]),
      _: 3
    }, 8, [
      "as",
      "as-child",
      "data-placeholder"
    ]));
  }
}), Jc = Yc, Zc = /* @__PURE__ */ b({
  __name: "SelectViewport",
  props: {
    nonce: {
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
    }
  },
  setup(e) {
    const n = e, { nonce: t } = me(n), o = gd(t), r = yt(), a = r.position === "item-aligned" ? Lo() : void 0, { forwardRef: l, currentElement: s } = H();
    ve(() => {
      r?.onViewportChange(s.value);
    });
    const i = I(0);
    function u(c) {
      const f = c.currentTarget, { shouldExpandOnScrollRef: g, contentWrapper: p } = a ?? {};
      if (g?.value && p?.value) {
        const m = Math.abs(i.value - f.scrollTop);
        if (m > 0) {
          const v = window.innerHeight - Me * 2, w = Number.parseFloat(p.value.style.minHeight), _ = Number.parseFloat(p.value.style.height), $ = Math.max(w, _);
          if ($ < v) {
            const S = $ + m, C = Math.min(v, S), k = S - C;
            p.value.style.height = `${C}px`, p.value.style.bottom === "0px" && (f.scrollTop = k > 0 ? k : 0, p.value.style.justifyContent = "flex-end");
          }
        }
      }
      i.value = f.scrollTop;
    }
    return (c, f) => (y(), B(de, null, [A(d(X), F({
      ref: d(l),
      "data-reka-select-viewport": "",
      role: "presentation"
    }, {
      ...c.$attrs,
      ...n
    }, {
      style: {
        position: "relative",
        flex: 1,
        overflow: "hidden auto"
      },
      onScroll: u
    }), {
      default: h(() => [R(c.$slots, "default")]),
      _: 3
    }, 16), A(d(X), {
      as: "style",
      nonce: d(o)
    }, {
      default: h(() => f[0] || (f[0] = [we(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")])),
      _: 1,
      __: [0]
    }, 8, ["nonce"])], 64));
  }
}), Qc = Zc;
const [ef, tf] = se("SwitchRoot");
var nf = /* @__PURE__ */ b({
  __name: "SwitchRoot",
  props: {
    defaultValue: {
      type: Boolean,
      required: !1
    },
    modelValue: {
      type: [Boolean, null],
      required: !1,
      default: void 0
    },
    disabled: {
      type: Boolean,
      required: !1
    },
    id: {
      type: String,
      required: !1
    },
    value: {
      type: String,
      required: !1,
      default: "on"
    },
    asChild: {
      type: Boolean,
      required: !1
    },
    as: {
      type: null,
      required: !1,
      default: "button"
    },
    name: {
      type: String,
      required: !1
    },
    required: {
      type: Boolean,
      required: !1
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, o = n, { disabled: r } = me(t), a = Fe(t, "modelValue", o, {
      defaultValue: t.defaultValue,
      passive: t.modelValue === void 0
    });
    function l() {
      r.value || (a.value = !a.value);
    }
    const { forwardRef: s, currentElement: i } = H(), u = sa(i), c = q(() => t.id && i.value ? document.querySelector(`[for="${t.id}"]`)?.innerText : void 0);
    return tf({
      modelValue: a,
      toggleCheck: l,
      disabled: r
    }), (f, g) => (y(), x(d(X), F(f.$attrs, {
      id: f.id,
      ref: d(s),
      role: "switch",
      type: f.as === "button" ? "button" : void 0,
      value: f.value,
      "aria-label": f.$attrs["aria-label"] || c.value,
      "aria-checked": d(a),
      "aria-required": f.required,
      "data-state": d(a) ? "checked" : "unchecked",
      "data-disabled": d(r) ? "" : void 0,
      "as-child": f.asChild,
      as: f.as,
      disabled: d(r),
      onClick: l,
      onKeydown: yo(rt(l, ["prevent"]), ["enter"])
    }), {
      default: h(() => [R(f.$slots, "default", { modelValue: d(a) }), d(u) && f.name ? (y(), x(d(ru), {
        key: 0,
        type: "checkbox",
        name: f.name,
        disabled: d(r),
        required: f.required,
        value: f.value,
        checked: !!d(a)
      }, null, 8, [
        "name",
        "disabled",
        "required",
        "value",
        "checked"
      ])) : Y("v-if", !0)]),
      _: 3
    }, 16, [
      "id",
      "type",
      "value",
      "aria-label",
      "aria-checked",
      "aria-required",
      "data-state",
      "data-disabled",
      "as-child",
      "as",
      "disabled",
      "onKeydown"
    ]));
  }
}), of = nf, rf = /* @__PURE__ */ b({
  __name: "SwitchThumb",
  props: {
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
    const n = ef();
    return H(), (t, o) => (y(), x(d(X), {
      "data-state": d(n).modelValue?.value ? "checked" : "unchecked",
      "data-disabled": d(n).disabled.value ? "" : void 0,
      "as-child": t.asChild,
      as: t.as
    }, {
      default: h(() => [R(t.$slots, "default")]),
      _: 3
    }, 8, [
      "data-state",
      "data-disabled",
      "as-child",
      "as"
    ]));
  }
}), af = rf;
const [zo, lf] = se("TooltipProvider");
var sf = /* @__PURE__ */ b({
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
    const n = e, { delayDuration: t, skipDelayDuration: o, disableHoverableContent: r, disableClosingTrigger: a, ignoreNonKeyboardFocus: l, disabled: s } = me(n);
    H();
    const i = I(!0), u = I(!1), { start: c, stop: f } = oa(() => {
      i.value = !0;
    }, o, { immediate: !1 });
    return lf({
      isOpenDelayed: i,
      delayDuration: t,
      onOpen() {
        f(), i.value = !1;
      },
      onClose() {
        c();
      },
      isPointerInTransitRef: u,
      disableHoverableContent: r,
      disableClosingTrigger: a,
      disabled: s,
      ignoreNonKeyboardFocus: l
    }), (g, p) => R(g.$slots, "default");
  }
}), uf = sf;
const Ba = "tooltip.open", [Cn, df] = se("TooltipRoot");
var cf = /* @__PURE__ */ b({
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
  setup(e, { emit: n }) {
    const t = e, o = n;
    H();
    const r = zo(), a = q(() => t.disableHoverableContent ?? r.disableHoverableContent.value), l = q(() => t.disableClosingTrigger ?? r.disableClosingTrigger.value), s = q(() => t.disabled ?? r.disabled.value), i = q(() => t.delayDuration ?? r.delayDuration.value), u = q(() => t.ignoreNonKeyboardFocus ?? r.ignoreNonKeyboardFocus.value), c = Fe(t, "open", o, {
      defaultValue: t.defaultOpen,
      passive: t.open === void 0
    });
    oe(c, (S) => {
      r.onClose && (S ? (r.onOpen(), document.dispatchEvent(new CustomEvent(Ba))) : r.onClose());
    });
    const f = I(!1), g = I(), p = q(() => c.value ? f.value ? "delayed-open" : "instant-open" : "closed"), { start: m, stop: v } = oa(() => {
      f.value = !0, c.value = !0;
    }, i, { immediate: !1 });
    function w() {
      v(), f.value = !1, c.value = !0;
    }
    function _() {
      v(), c.value = !1;
    }
    function $() {
      m();
    }
    return df({
      contentId: "",
      open: c,
      stateAttribute: p,
      trigger: g,
      onTriggerChange(S) {
        g.value = S;
      },
      onTriggerEnter() {
        r.isOpenDelayed.value ? $() : w();
      },
      onTriggerLeave() {
        a.value ? _() : v();
      },
      onOpen: w,
      onClose: _,
      disableHoverableContent: a,
      disableClosingTrigger: l,
      disabled: s,
      ignoreNonKeyboardFocus: u
    }), (S, C) => (y(), x(d(Ao), null, {
      default: h(() => [R(S.$slots, "default", { open: d(c) })]),
      _: 3
    }));
  }
}), ff = cf, pf = /* @__PURE__ */ b({
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
  setup(e, { emit: n }) {
    const t = e, o = n, r = Cn(), { forwardRef: a } = H(), l = al(), s = q(() => l.default?.({})), i = q(() => {
      if (t.ariaLabel) return t.ariaLabel;
      let c = "";
      function f(g) {
        typeof g.children == "string" && g.type !== Br ? c += g.children : Array.isArray(g.children) && g.children.forEach((p) => f(p));
      }
      return s.value?.forEach((g) => f(g)), c;
    }), u = q(() => {
      const { ariaLabel: c, ...f } = t;
      return f;
    });
    return ve(() => {
      pt(window, "scroll", (c) => {
        c.target?.contains(r.trigger.value) && r.onClose();
      }), pt(window, Ba, r.onClose);
    }), (c, f) => (y(), x(d(mn), {
      "as-child": "",
      "disable-outside-pointer-events": !1,
      onEscapeKeyDown: f[0] || (f[0] = (g) => o("escapeKeyDown", g)),
      onPointerDownOutside: f[1] || (f[1] = (g) => {
        d(r).disableClosingTrigger.value && d(r).trigger.value?.contains(g.target) && g.preventDefault(), o("pointerDownOutside", g);
      }),
      onFocusOutside: f[2] || (f[2] = rt(() => {
      }, ["prevent"])),
      onDismiss: f[3] || (f[3] = (g) => d(r).onClose())
    }, {
      default: h(() => [A(d(To), F({
        ref: d(a),
        "data-state": d(r).stateAttribute.value
      }, {
        ...c.$attrs,
        ...u.value
      }, { style: {
        "--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
        "--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
        "--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
        "--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
        "--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
      } }), {
        default: h(() => [R(c.$slots, "default"), A(d(ko), {
          id: d(r).contentId,
          role: "tooltip"
        }, {
          default: h(() => [we(Z(i.value), 1)]),
          _: 1
        }, 8, ["id"])]),
        _: 3
      }, 16, ["data-state"])]),
      _: 3
    }));
  }
}), Ta = pf, gf = /* @__PURE__ */ b({
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
    const t = xe(e), { forwardRef: o, currentElement: r } = H(), { trigger: a, onClose: l } = Cn(), s = zo(), { isPointerInTransit: i, onPointerExit: u } = ws(a, r);
    return s.isPointerInTransitRef = i, u(() => {
      l();
    }), (c, f) => (y(), x(Ta, F({ ref: d(o) }, d(t)), {
      default: h(() => [R(c.$slots, "default")]),
      _: 3
    }, 16));
  }
}), mf = gf, vf = /* @__PURE__ */ b({
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
  setup(e, { emit: n }) {
    const t = e, o = n, r = Cn(), a = he(t, o), { forwardRef: l } = H();
    return (s, i) => (y(), x(d(mt), { present: s.forceMount || d(r).open.value }, {
      default: h(() => [(y(), x(wo(d(r).disableHoverableContent.value ? Ta : mf), F({ ref: d(l) }, d(a)), {
        default: h(() => [R(s.$slots, "default")]),
        _: 3
      }, 16))]),
      _: 3
    }, 8, ["present"]));
  }
}), hf = vf, yf = /* @__PURE__ */ b({
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
    const n = e;
    return (t, o) => (y(), x(d(vn), be(Se(n)), {
      default: h(() => [R(t.$slots, "default")]),
      _: 3
    }, 16));
  }
}), wf = yf, _f = /* @__PURE__ */ b({
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
    const n = e, t = Cn(), o = zo();
    t.contentId ||= Ne(void 0, "reka-tooltip-content");
    const { forwardRef: r, currentElement: a } = H(), l = I(!1), s = I(!1), i = q(() => t.disabled.value ? {} : {
      click: v,
      focus: p,
      pointermove: f,
      pointerleave: g,
      pointerdown: c,
      blur: m
    });
    ve(() => {
      t.onTriggerChange(a.value);
    });
    function u() {
      setTimeout(() => {
        l.value = !1;
      }, 1);
    }
    function c() {
      t.open && !t.disableClosingTrigger.value && t.onClose(), l.value = !0, document.addEventListener("pointerup", u, { once: !0 });
    }
    function f(w) {
      w.pointerType !== "touch" && !s.value && !o.isPointerInTransitRef.value && (t.onTriggerEnter(), s.value = !0);
    }
    function g() {
      t.onTriggerLeave(), s.value = !1;
    }
    function p(w) {
      l.value || t.ignoreNonKeyboardFocus.value && !w.target.matches?.(":focus-visible") || t.onOpen();
    }
    function m() {
      t.onClose();
    }
    function v() {
      t.disableClosingTrigger.value || t.onClose();
    }
    return (w, _) => (y(), x(d(Io), {
      "as-child": "",
      reference: w.reference
    }, {
      default: h(() => [A(d(X), F({
        ref: d(r),
        "aria-describedby": d(t).open.value ? d(t).contentId : void 0,
        "data-state": d(t).stateAttribute.value,
        as: w.as,
        "as-child": n.asChild,
        "data-grace-area-trigger": ""
      }, ll(i.value)), {
        default: h(() => [R(w.$slots, "default")]),
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
}), bf = _f;
const wr = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, _r = Nr, Cf = (e, n) => (t) => {
  var o;
  if (n?.variants == null) return _r(e, t?.class, t?.className);
  const { variants: r, defaultVariants: a } = n, l = Object.keys(r).map((u) => {
    const c = t?.[u], f = a?.[u];
    if (c === null) return null;
    const g = wr(c) || wr(f);
    return r[u][g];
  }), s = t && Object.entries(t).reduce((u, c) => {
    let [f, g] = c;
    return g === void 0 || (u[f] = g), u;
  }, {}), i = n == null || (o = n.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((u, c) => {
    let { class: f, className: g, ...p } = c;
    return Object.entries(p).every((m) => {
      let [v, w] = m;
      return Array.isArray(w) ? w.includes({
        ...a,
        ...s
      }[v]) : {
        ...a,
        ...s
      }[v] === w;
    }) ? [
      ...u,
      f,
      g
    ] : u;
  }, []);
  return _r(e, l, i, t?.class, t?.className);
}, Sf = Cf(
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
), Ve = /* @__PURE__ */ b({
  __name: "Button",
  props: {
    variant: {},
    size: {},
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), x(d(X), {
      "data-slot": "button",
      as: e.as,
      "as-child": e.asChild,
      class: U(d(W)(d(Sf)({ variant: e.variant, size: e.size }), n.class))
    }, {
      default: h(() => [
        R(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "class"]));
  }
}), xf = /* @__PURE__ */ b({
  __name: "Dialog",
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(e, { emit: n }) {
    const r = he(e, n);
    return (a, l) => (y(), x(d(ii), F({ "data-slot": "dialog" }, d(r)), {
      default: h(() => [
        R(a.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Rf = /* @__PURE__ */ b({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), x(d(da), F({ "data-slot": "dialog-close" }, n), {
      default: h(() => [
        R(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
function Pf(e) {
  if (!Xe(e))
    return Rt(e);
  const n = new Proxy({}, {
    get(t, o, r) {
      return d(Reflect.get(e.value, o, r));
    },
    set(t, o, r) {
      return Xe(e.value[o]) && !Xe(r) ? e.value[o].value = r : e.value[o] = r, !0;
    },
    deleteProperty(t, o) {
      return Reflect.deleteProperty(e.value, o);
    },
    has(t, o) {
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
  return Rt(n);
}
function $f(e) {
  return Pf(q(e));
}
function fe(e, ...n) {
  const t = n.flat(), o = t[0];
  return $f(() => Object.fromEntries(typeof o == "function" ? Object.entries(me(e)).filter(([r, a]) => !o(ce(a), r)) : Object.entries(me(e)).filter((r) => !t.includes(r[0]))));
}
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const kf = (e) => typeof e < "u";
function Af(e) {
  return JSON.parse(JSON.stringify(e));
}
// @__NO_SIDE_EFFECTS__
function If(e, n, t, o = {}) {
  var r, a, l;
  const {
    clone: s = !1,
    passive: i = !1,
    eventName: u,
    deep: c = !1,
    defaultValue: f,
    shouldEmit: g
  } = o, p = it(), m = t || p?.emit || ((r = p?.$emit) == null ? void 0 : r.bind(p)) || ((l = (a = p?.proxy) == null ? void 0 : a.$emit) == null ? void 0 : l.bind(p?.proxy));
  let v = u;
  v = v || `update:${n.toString()}`;
  const w = (S) => s ? typeof s == "function" ? s(S) : Af(S) : S, _ = () => kf(e[n]) ? w(e[n]) : f, $ = (S) => {
    g ? g(S) && m(v, S) : m(v, S);
  };
  if (i) {
    const S = _(), C = I(S);
    let k = !1;
    return oe(
      () => e[n],
      (M) => {
        k || (k = !0, C.value = w(M), le(() => k = !1));
      }
    ), oe(
      C,
      (M) => {
        !k && (M !== e[n] || c) && $(M);
      },
      { deep: c }
    ), C;
  } else
    return q({
      get() {
        return _();
      },
      set(S) {
        $(S);
      }
    });
}
/**
 * @license lucide-vue-next v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const br = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ef = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (n, t, o) => o ? o.toUpperCase() : t.toLowerCase()
), Mf = (e) => {
  const n = Ef(e);
  return n.charAt(0).toUpperCase() + n.slice(1);
}, Of = (...e) => e.filter((n, t, o) => !!n && n.trim() !== "" && o.indexOf(n) === t).join(" ").trim(), Cr = (e) => e === "";
/**
 * @license lucide-vue-next v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ot = {
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
const qf = ({
  name: e,
  iconNode: n,
  absoluteStrokeWidth: t,
  "absolute-stroke-width": o,
  strokeWidth: r,
  "stroke-width": a,
  size: l = Ot.width,
  color: s = Ot.stroke,
  ...i
}, { slots: u }) => Ce(
  "svg",
  {
    ...Ot,
    ...i,
    width: l,
    height: l,
    stroke: s,
    "stroke-width": Cr(t) || Cr(o) || t === !0 || o === !0 ? Number(r || a || Ot["stroke-width"]) * 24 / Number(l) : r || a || Ot["stroke-width"],
    class: Of(
      "lucide",
      i.class,
      ...e ? [`lucide-${br(Mf(e))}-icon`, `lucide-${br(e)}`] : ["lucide-icon"]
    )
  },
  [...n.map((c) => Ce(...c)), ...u.default ? [u.default()] : []]
);
/**
 * @license lucide-vue-next v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sn = (e, n) => (t, { slots: o, attrs: r }) => Ce(
  qf,
  {
    ...r,
    ...t,
    iconNode: n,
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
const Va = Sn("check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-vue-next v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const No = Sn("chevron-down", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-vue-next v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ff = Sn("chevron-up", [
  ["path", { d: "m18 15-6-6-6 6", key: "153udz" }]
]);
/**
 * @license lucide-vue-next v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Df = Sn("x", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]), Bf = /* @__PURE__ */ b({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const n = e, t = fe(n, "class");
    return (o, r) => (y(), x(d(zi), F({ "data-slot": "dialog-overlay" }, d(t), {
      class: d(W)("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80", n.class)
    }), {
      default: h(() => [
        R(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Tf = /* @__PURE__ */ b({
  __name: "DialogContent",
  props: {
    forceMount: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: n }) {
    const t = e, o = n, r = fe(t, "class"), a = he(r, o);
    return (l, s) => (y(), x(d(Gi), null, {
      default: h(() => [
        A(Bf),
        A(d(Bi), F({ "data-slot": "dialog-content" }, d(a), {
          class: d(W)(
            "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
            t.class
          )
        }), {
          default: h(() => [
            R(l.$slots, "default"),
            A(d(da), { class: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" }, {
              default: h(() => [
                A(d(Df)),
                s[0] || (s[0] = G("span", { class: "sr-only" }, "Close", -1))
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
}), Vf = /* @__PURE__ */ b({
  __name: "DialogFooter",
  props: {
    class: {}
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), B("div", {
      "data-slot": "dialog-footer",
      class: U(d(W)("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", n.class))
    }, [
      R(t.$slots, "default")
    ], 2));
  }
}), Lf = /* @__PURE__ */ b({
  __name: "DialogHeader",
  props: {
    class: {}
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), B("div", {
      "data-slot": "dialog-header",
      class: U(d(W)("flex flex-col gap-2 text-center sm:text-left", n.class))
    }, [
      R(t.$slots, "default")
    ], 2));
  }
}), zf = /* @__PURE__ */ b({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const n = e, t = fe(n, "class"), o = xe(t);
    return (r, a) => (y(), x(d(Ui), F({ "data-slot": "dialog-title" }, d(o), {
      class: d(W)("text-lg leading-none font-semibold", n.class)
    }), {
      default: h(() => [
        R(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Nf = /* @__PURE__ */ b({
  __name: "DialogTrigger",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), x(d(Wi), F({ "data-slot": "dialog-trigger" }, n), {
      default: h(() => [
        R(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Hf = /* @__PURE__ */ b({
  name: "ConfirmDialog",
  __name: "ConfirmDialog",
  props: {
    okText: {},
    cancelText: {},
    onOk: { type: Function },
    onCancel: { type: Function }
  },
  setup(e) {
    const n = e, t = I(!1);
    function o(l) {
      t.value = l ?? !t.value;
    }
    function r() {
      o(!1), n.onOk && n.onOk();
    }
    function a() {
      o(!1), n.onCancel && n.onCancel();
    }
    return (l, s) => (y(), x(xf, {
      open: t.value,
      "onUpdate:open": o
    }, {
      default: h(() => [
        A(Nf, { "as-child": "" }, {
          default: h(() => [
            R(l.$slots, "trigger", {}, () => [
              A(Ve)
            ])
          ]),
          _: 3
        }),
        A(Tf, null, {
          default: h(() => [
            A(Lf, null, {
              default: h(() => [
                A(zf, null, {
                  default: h(() => [
                    R(l.$slots, "header")
                  ]),
                  _: 3
                })
              ]),
              _: 3
            }),
            G("div", null, [
              R(l.$slots, "default")
            ]),
            A(Vf, null, {
              default: h(() => [
                R(l.$slots, "footer", {}, () => [
                  A(Rf, null, {
                    default: h(() => [
                      A(Ve, {
                        onClick: a,
                        variant: "outline"
                      }, {
                        default: h(() => [
                          we(Z(n.cancelText ?? "Abbrechen"), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  A(Ve, { onClick: r }, {
                    default: h(() => [
                      we(Z(n.okText ?? "OK"), 1)
                    ]),
                    _: 1
                  })
                ])
              ]),
              _: 3
            })
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["open"]));
  }
}), Gf = /* @__PURE__ */ b({
  name: "Dashboard",
  __name: "Dashboard",
  props: {
    source: {}
  },
  setup(e) {
    const n = q(() => ({
      x: e.source.global ? e.source.meta.gridSize.x : e.source.meta.gridSizeApp.x,
      y: e.source.global ? e.source.meta.gridSize.y : e.source.meta.gridSizeApp.y
    })), t = q(() => {
      const o = n.value.x, r = n.value.y, a = Array.from({ length: r }, () => Array(o).fill(!1)), l = [], s = (u, c, f, g) => {
        if (u + f > o || c + g > r) return !1;
        for (let p = c; p < c + g; p++)
          for (let m = u; m < u + f; m++)
            if (a[p][m]) return !1;
        return !0;
      }, i = (u, c, f, g) => {
        for (let p = c; p < c + g; p++)
          for (let m = u; m < u + f; m++)
            a[p][m] = !0;
      };
      for (const u of e.source.items) {
        const c = u.size?.x ?? 1, f = u.size?.y ?? 1;
        let g = !1;
        for (let p = 0; p < r; p++) {
          for (let m = 0; m < o; m++)
            if (s(m, p, c, f)) {
              i(m, p, c, f), l.push(u), g = !0;
              break;
            }
          if (g) break;
        }
      }
      return l;
    });
    return (o, r) => (y(), B("div", {
      class: "grid gap-4 p-4 w-max mx-auto",
      style: Bt({
        gridTemplateColumns: `repeat(${n.value.x}, 1fr)`,
        gridTemplateRows: `repeat(${n.value.y}, 1fr)`
      })
    }, [
      (y(!0), B(de, null, Oe(t.value, (a) => (y(), B("div", {
        class: "whitespace-nowrap",
        style: Bt({
          gridColumn: a.size ? `span ${a.size.x}` : void 0,
          gridRow: a.size ? `span ${a.size.y}` : void 0
        })
      }, [
        (y(), x(wo(d(ho)(a.component)), F({ ref_for: !0 }, a.props, { class: "h-full" }), null, 16))
      ], 4))), 256))
    ], 4));
  }
}), jf = { key: 0 }, Uf = /* @__PURE__ */ b({
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
    const n = e;
    function t() {
      n.url && window.location.replace(n.url);
    }
    return (o, r) => (y(), x(Ht, { onClick: t }, {
      default: h(() => [
        A(Gt, null, {
          default: h(() => [
            e.title ? (y(), B("div", {
              key: 0,
              class: U(e.titleClass)
            }, Z(e.title), 3)) : Y("", !0),
            e.description ? (y(), B("div", {
              key: 1,
              class: U(e.descriptionClass)
            }, Z(e.description), 3)) : Y("", !0),
            (y(!0), B(de, null, Oe(e.items, (a) => (y(), B("span", {
              class: U(a.classes)
            }, [
              we(Z(a.text), 1),
              a.newLine ? (y(), B("br", jf)) : Y("", !0)
            ], 2))), 256))
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}), Kf = /* @__PURE__ */ b({
  __name: "CardHeader",
  props: {
    class: {}
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), B("div", {
      "data-slot": "card-header",
      class: U(d(W)("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", n.class))
    }, [
      R(t.$slots, "default")
    ], 2));
  }
}), Wf = ["innerHTML"], Xf = /* @__PURE__ */ b({
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
    return (n, t) => (y(), x(Ht, null, {
      default: h(() => [
        e.title || e.description ? (y(), x(Kf, { key: 0 }, {
          default: h(() => [
            e.title ? (y(), B("div", {
              key: 0,
              class: U(e.titleClass)
            }, Z(e.title), 3)) : Y("", !0),
            e.description ? (y(), B("div", {
              key: 1,
              class: U(e.descriptionClass)
            }, Z(e.description), 3)) : Y("", !0)
          ]),
          _: 1
        })) : Y("", !0),
        A(Gt, null, {
          default: h(() => [
            G("div", { innerHTML: e.html }, null, 8, Wf)
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}), Yf = /* @__PURE__ */ b({
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
    const n = e;
    function t() {
      n.url && window.location.replace(n.url);
    }
    return (o, r) => (y(), x(Ht, {
      onClick: t,
      class: U(e.url ? "cursor-pointer" : "")
    }, {
      default: h(() => [
        A(Gt, null, {
          default: h(() => [
            e.title ? (y(), B("div", {
              key: 0,
              class: U(["text-base font-normal text-gray-500", e.titleClass])
            }, [
              G("span", null, Z(e.title), 1)
            ], 2)) : Y("", !0),
            e.content ? (y(), B("div", {
              key: 1,
              class: U(["ml-2 text-2xl font-bold my-2", e.contentClass])
            }, [
              G("span", null, Z(e.content), 1)
            ], 2)) : Y("", !0),
            e.description ? (y(), B("div", {
              key: 2,
              class: U(["font-normal", e.descriptionClass])
            }, [
              G("span", null, Z(e.description), 1)
            ], 2)) : Y("", !0),
            e.note ? (y(), B("div", {
              key: 3,
              class: U(["text-sm text-gray-500 mt-2", e.noteClass])
            }, [
              G("span", null, Z(e.note), 1)
            ], 2)) : Y("", !0)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Jf = /* @__PURE__ */ b({
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
  setup(e, { emit: n }) {
    const r = he(e, n);
    return (a, l) => (y(), x(d(ff), F({ "data-slot": "tooltip" }, d(r)), {
      default: h(() => [
        R(a.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Zf = /* @__PURE__ */ b({
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
  setup(e, { emit: n }) {
    const t = e, o = n, r = fe(t, "class"), a = he(r, o);
    return (l, s) => (y(), x(d(wf), null, {
      default: h(() => [
        A(d(hf), F({ "data-slot": "tooltip-content" }, { ...d(a), ...l.$attrs }, {
          class: d(W)("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance", t.class)
        }), {
          default: h(() => [
            R(l.$slots, "default"),
            Y("", !0)
          ]),
          _: 3
        }, 16, ["class"])
      ]),
      _: 3
    }));
  }
}), Qf = /* @__PURE__ */ b({
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
    const n = e;
    return (t, o) => (y(), x(d(uf), be(Se(n)), {
      default: h(() => [
        R(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), ep = /* @__PURE__ */ b({
  __name: "TooltipTrigger",
  props: {
    reference: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), x(d(bf), F({ "data-slot": "tooltip-trigger" }, n), {
      default: h(() => [
        R(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), tp = ["innerHTML"], Ho = /* @__PURE__ */ b({
  name: "HintTooltip",
  __name: "HintTooltip",
  props: {
    content: {},
    classTrigger: {},
    classContent: {},
    contentHtml: {}
  },
  setup(e) {
    return (n, t) => (y(), x(Qf, null, {
      default: h(() => [
        A(Jf, null, {
          default: h(() => [
            A(ep, null, {
              default: h(() => [
                R(n.$slots, "trigger", {}, () => [
                  G("i", {
                    class: U([e.classTrigger, "fas fa-question-circle"]),
                    style: { "margin-left": "0.4rem" }
                  }, null, 2)
                ])
              ]),
              _: 3
            }),
            A(Zf, {
              align: "start",
              side: "bottom",
              class: "border vite-hint-content"
            }, {
              default: h(() => [
                R(n.$slots, "default", {}, () => [
                  e.content ? (y(), B("span", {
                    key: 0,
                    class: U(["text-base", e.classContent])
                  }, Z(e.content), 3)) : (y(), B("div", {
                    key: 1,
                    innerHTML: e.contentHtml
                  }, null, 8, tp))
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
}), np = { key: 2 }, Sr = /* @__PURE__ */ b({
  __name: "MultiCardPartContent",
  props: {
    item: {}
  },
  setup(e) {
    function n(t, o = !1) {
      o ? window.location.assign(t) : window.open(t);
    }
    return (t, o) => {
      const r = sl("Button");
      return y(), B(de, null, [
        e.item.url ? (y(), x(r, {
          key: 0,
          variant: "link",
          onClick: o[0] || (o[0] = () => n(e.item.url, e.item.sameTab)),
          class: U([(e.item.classes + " " + e.item.className).trim(), "p-0 cursor-pointer h-max"])
        }, {
          default: h(() => [
            we(Z(e.item.text), 1)
          ]),
          _: 1
        }, 8, ["class"])) : (y(), B("span", {
          key: 1,
          class: U([((e.item.classes ?? "") + " " + (e.item.className ?? "")).trim(), "h-max"])
        }, Z(e.item.text), 3)),
        e.item.newLine ? (y(), B("br", np)) : Y("", !0)
      ], 64);
    };
  }
}), tn = /* @__PURE__ */ b({
  __name: "MultiCardPart",
  props: {
    arr: {},
    class: {}
  },
  setup(e) {
    return (n, t) => e.arr ? (y(), B("div", {
      key: 0,
      class: U(e.class)
    }, [
      (y(!0), B(de, null, Oe(e.arr, (o) => (y(), B(de, null, [
        o.hint ? (y(), x(Ho, {
          key: 0,
          content: o.hint
        }, {
          trigger: h(() => [
            A(Sr, { item: o }, null, 8, ["item"])
          ]),
          _: 2
        }, 1032, ["content"])) : (y(), x(Sr, {
          key: 1,
          item: o
        }, null, 8, ["item"]))
      ], 64))), 256))
    ], 2)) : Y("", !0);
  }
}), op = /* @__PURE__ */ b({
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
    const n = e;
    function t() {
      n.url && window.location.replace(n.url);
    }
    return (o, r) => (y(), x(Ht, {
      onClick: t,
      class: U(e.url ? "cursor-pointer" : "")
    }, {
      default: h(() => [
        A(Gt, null, {
          default: h(() => [
            A(tn, {
              arr: e.itemsTitle,
              class: U(["text-base font-normal text-gray-500", e.titleClass])
            }, null, 8, ["arr", "class"]),
            A(tn, {
              arr: e.itemsContent,
              class: U(["ml-2 text-2xl font-bold my-2", e.contentClass])
            }, null, 8, ["arr", "class"]),
            A(tn, {
              arr: e.itemsDescription,
              class: U(["font-normal", e.descriptionClass])
            }, null, 8, ["arr", "class"]),
            A(tn, {
              arr: e.itemsNote,
              class: U(["text-sm text-gray-500 mt-2", e.noteClass])
            }, null, 8, ["arr", "class"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["class"]));
  }
});
function Dn(e, n, t) {
  console.log("Loading Vue");
  const o = document.querySelectorAll("div[data-vue-component]");
  for (const r of o) {
    const a = r.getAttribute("data-vue-component") || "?", l = {};
    r.querySelectorAll("template[data-slot]").forEach((f) => {
      const g = f.getAttribute("data-slot") ?? "", p = f.innerHTML;
      f.remove(), l[g] = () => Ce("div", { innerHTML: p });
    }), r.innerHTML.trim().length > 1 && (l.default = () => Ce("div", { innerHTML: r.innerHTML }));
    const s = e(a) ?? ho(a);
    let i = {}, u = {};
    try {
      i = JSON.parse(r.getAttribute("data-vue-props") || "{}");
    } catch {
    }
    try {
      u = JSON.parse(r.getAttribute("data-base-props") || "{}");
    } catch {
    }
    r.removeAttribute("data-vue-props"), r.removeAttribute("data-base-props"), s !== ho("Missing") ? r.removeAttribute("data-vue-component") : i.name = a;
    const c = il({
      render() {
        return Ce(n, u, {
          default: () => Ce(s, i, l)
        });
      }
    });
    c.use(t), c.use(Wg), c.mount(r);
  }
}
function Zg(e, n, t) {
  function o(a) {
    for (const l of Object.values(e))
      if (l.name === a) return l;
    return null;
  }
  document.readyState !== "loading" ? Dn(o, n, t) : document.addEventListener("DOMContentLoaded", () => Dn(o, n, t));
  const r = window;
  r.renderVueComponents || (r.renderVueComponents = () => Dn(o, n, t));
}
/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function ot(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function ke(e, n) {
  return (t) => {
    n.setState((o) => ({
      ...o,
      [e]: ot(t, o[e])
    }));
  };
}
function xn(e) {
  return e instanceof Function;
}
function rp(e) {
  return Array.isArray(e) && e.every((n) => typeof n == "number");
}
function ap(e, n) {
  const t = [], o = (r) => {
    r.forEach((a) => {
      t.push(a);
      const l = n(a);
      l != null && l.length && o(l);
    });
  };
  return o(e), t;
}
function z(e, n, t) {
  let o = [], r;
  return (a) => {
    let l;
    t.key && t.debug && (l = Date.now());
    const s = e(a);
    if (!(s.length !== o.length || s.some((c, f) => o[f] !== c)))
      return r;
    o = s;
    let u;
    if (t.key && t.debug && (u = Date.now()), r = n(...s), t == null || t.onChange == null || t.onChange(r), t.key && t.debug && t != null && t.debug()) {
      const c = Math.round((Date.now() - l) * 100) / 100, f = Math.round((Date.now() - u) * 100) / 100, g = f / 16, p = (m, v) => {
        for (m = String(m); m.length < v; )
          m = " " + m;
        return m;
      };
      console.info(`%c⏱ ${p(f, 5)} /${p(c, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * g, 120))}deg 100% 31%);`, t?.key);
    }
    return r;
  };
}
function N(e, n, t, o) {
  return {
    debug: () => {
      var r;
      return (r = e?.debugAll) != null ? r : e[n];
    },
    key: process.env.NODE_ENV === "development" && t,
    onChange: o
  };
}
function lp(e, n, t, o) {
  const r = () => {
    var l;
    return (l = a.getValue()) != null ? l : e.options.renderFallbackValue;
  }, a = {
    id: `${n.id}_${t.id}`,
    row: n,
    column: t,
    getValue: () => n.getValue(o),
    renderValue: r,
    getContext: z(() => [e, t, n, a], (l, s, i, u) => ({
      table: l,
      column: s,
      row: i,
      cell: u,
      getValue: u.getValue,
      renderValue: u.renderValue
    }), N(e.options, "debugCells", "cell.getContext"))
  };
  return e._features.forEach((l) => {
    l.createCell == null || l.createCell(a, t, n, e);
  }, {}), a;
}
function sp(e, n, t, o) {
  var r, a;
  const s = {
    ...e._getDefaultColumnDef(),
    ...n
  }, i = s.accessorKey;
  let u = (r = (a = s.id) != null ? a : i ? typeof String.prototype.replaceAll == "function" ? i.replaceAll(".", "_") : i.replace(/\./g, "_") : void 0) != null ? r : typeof s.header == "string" ? s.header : void 0, c;
  if (s.accessorFn ? c = s.accessorFn : i && (i.includes(".") ? c = (g) => {
    let p = g;
    for (const v of i.split(".")) {
      var m;
      p = (m = p) == null ? void 0 : m[v], process.env.NODE_ENV !== "production" && p === void 0 && console.warn(`"${v}" in deeply nested key "${i}" returned undefined.`);
    }
    return p;
  } : c = (g) => g[s.accessorKey]), !u)
    throw process.env.NODE_ENV !== "production" ? new Error(s.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let f = {
    id: `${String(u)}`,
    accessorFn: c,
    parent: o,
    depth: t,
    columnDef: s,
    columns: [],
    getFlatColumns: z(() => [!0], () => {
      var g;
      return [f, ...(g = f.columns) == null ? void 0 : g.flatMap((p) => p.getFlatColumns())];
    }, N(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: z(() => [e._getOrderColumnsFn()], (g) => {
      var p;
      if ((p = f.columns) != null && p.length) {
        let m = f.columns.flatMap((v) => v.getLeafColumns());
        return g(m);
      }
      return [f];
    }, N(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const g of e._features)
    g.createColumn == null || g.createColumn(f, e);
  return f;
}
const ye = "debugHeaders";
function xr(e, n, t) {
  var o;
  let a = {
    id: (o = t.id) != null ? o : n.id,
    column: n,
    index: t.index,
    isPlaceholder: !!t.isPlaceholder,
    placeholderId: t.placeholderId,
    depth: t.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const l = [], s = (i) => {
        i.subHeaders && i.subHeaders.length && i.subHeaders.map(s), l.push(i);
      };
      return s(a), l;
    },
    getContext: () => ({
      table: e,
      header: a,
      column: n
    })
  };
  return e._features.forEach((l) => {
    l.createHeader == null || l.createHeader(a, e);
  }), a;
}
const ip = {
  createTable: (e) => {
    e.getHeaderGroups = z(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (n, t, o, r) => {
      var a, l;
      const s = (a = o?.map((f) => t.find((g) => g.id === f)).filter(Boolean)) != null ? a : [], i = (l = r?.map((f) => t.find((g) => g.id === f)).filter(Boolean)) != null ? l : [], u = t.filter((f) => !(o != null && o.includes(f.id)) && !(r != null && r.includes(f.id)));
      return nn(n, [...s, ...u, ...i], e);
    }, N(e.options, ye, "getHeaderGroups")), e.getCenterHeaderGroups = z(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (n, t, o, r) => (t = t.filter((a) => !(o != null && o.includes(a.id)) && !(r != null && r.includes(a.id))), nn(n, t, e, "center")), N(e.options, ye, "getCenterHeaderGroups")), e.getLeftHeaderGroups = z(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (n, t, o) => {
      var r;
      const a = (r = o?.map((l) => t.find((s) => s.id === l)).filter(Boolean)) != null ? r : [];
      return nn(n, a, e, "left");
    }, N(e.options, ye, "getLeftHeaderGroups")), e.getRightHeaderGroups = z(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (n, t, o) => {
      var r;
      const a = (r = o?.map((l) => t.find((s) => s.id === l)).filter(Boolean)) != null ? r : [];
      return nn(n, a, e, "right");
    }, N(e.options, ye, "getRightHeaderGroups")), e.getFooterGroups = z(() => [e.getHeaderGroups()], (n) => [...n].reverse(), N(e.options, ye, "getFooterGroups")), e.getLeftFooterGroups = z(() => [e.getLeftHeaderGroups()], (n) => [...n].reverse(), N(e.options, ye, "getLeftFooterGroups")), e.getCenterFooterGroups = z(() => [e.getCenterHeaderGroups()], (n) => [...n].reverse(), N(e.options, ye, "getCenterFooterGroups")), e.getRightFooterGroups = z(() => [e.getRightHeaderGroups()], (n) => [...n].reverse(), N(e.options, ye, "getRightFooterGroups")), e.getFlatHeaders = z(() => [e.getHeaderGroups()], (n) => n.map((t) => t.headers).flat(), N(e.options, ye, "getFlatHeaders")), e.getLeftFlatHeaders = z(() => [e.getLeftHeaderGroups()], (n) => n.map((t) => t.headers).flat(), N(e.options, ye, "getLeftFlatHeaders")), e.getCenterFlatHeaders = z(() => [e.getCenterHeaderGroups()], (n) => n.map((t) => t.headers).flat(), N(e.options, ye, "getCenterFlatHeaders")), e.getRightFlatHeaders = z(() => [e.getRightHeaderGroups()], (n) => n.map((t) => t.headers).flat(), N(e.options, ye, "getRightFlatHeaders")), e.getCenterLeafHeaders = z(() => [e.getCenterFlatHeaders()], (n) => n.filter((t) => {
      var o;
      return !((o = t.subHeaders) != null && o.length);
    }), N(e.options, ye, "getCenterLeafHeaders")), e.getLeftLeafHeaders = z(() => [e.getLeftFlatHeaders()], (n) => n.filter((t) => {
      var o;
      return !((o = t.subHeaders) != null && o.length);
    }), N(e.options, ye, "getLeftLeafHeaders")), e.getRightLeafHeaders = z(() => [e.getRightFlatHeaders()], (n) => n.filter((t) => {
      var o;
      return !((o = t.subHeaders) != null && o.length);
    }), N(e.options, ye, "getRightLeafHeaders")), e.getLeafHeaders = z(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (n, t, o) => {
      var r, a, l, s, i, u;
      return [...(r = (a = n[0]) == null ? void 0 : a.headers) != null ? r : [], ...(l = (s = t[0]) == null ? void 0 : s.headers) != null ? l : [], ...(i = (u = o[0]) == null ? void 0 : u.headers) != null ? i : []].map((c) => c.getLeafHeaders()).flat();
    }, N(e.options, ye, "getLeafHeaders"));
  }
};
function nn(e, n, t, o) {
  var r, a;
  let l = 0;
  const s = function(g, p) {
    p === void 0 && (p = 1), l = Math.max(l, p), g.filter((m) => m.getIsVisible()).forEach((m) => {
      var v;
      (v = m.columns) != null && v.length && s(m.columns, p + 1);
    }, 0);
  };
  s(e);
  let i = [];
  const u = (g, p) => {
    const m = {
      depth: p,
      id: [o, `${p}`].filter(Boolean).join("_"),
      headers: []
    }, v = [];
    g.forEach((w) => {
      const _ = [...v].reverse()[0], $ = w.column.depth === m.depth;
      let S, C = !1;
      if ($ && w.column.parent ? S = w.column.parent : (S = w.column, C = !0), _ && _?.column === S)
        _.subHeaders.push(w);
      else {
        const k = xr(t, S, {
          id: [o, p, S.id, w?.id].filter(Boolean).join("_"),
          isPlaceholder: C,
          placeholderId: C ? `${v.filter((M) => M.column === S).length}` : void 0,
          depth: p,
          index: v.length
        });
        k.subHeaders.push(w), v.push(k);
      }
      m.headers.push(w), w.headerGroup = m;
    }), i.push(m), p > 0 && u(v, p - 1);
  }, c = n.map((g, p) => xr(t, g, {
    depth: l,
    index: p
  }));
  u(c, l - 1), i.reverse();
  const f = (g) => g.filter((m) => m.column.getIsVisible()).map((m) => {
    let v = 0, w = 0, _ = [0];
    m.subHeaders && m.subHeaders.length ? (_ = [], f(m.subHeaders).forEach((S) => {
      let {
        colSpan: C,
        rowSpan: k
      } = S;
      v += C, _.push(k);
    })) : v = 1;
    const $ = Math.min(..._);
    return w = w + $, m.colSpan = v, m.rowSpan = w, {
      colSpan: v,
      rowSpan: w
    };
  });
  return f((r = (a = i[0]) == null ? void 0 : a.headers) != null ? r : []), i;
}
const Go = (e, n, t, o, r, a, l) => {
  let s = {
    id: n,
    index: o,
    original: t,
    depth: r,
    parentId: l,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (i) => {
      if (s._valuesCache.hasOwnProperty(i))
        return s._valuesCache[i];
      const u = e.getColumn(i);
      if (u != null && u.accessorFn)
        return s._valuesCache[i] = u.accessorFn(s.original, o), s._valuesCache[i];
    },
    getUniqueValues: (i) => {
      if (s._uniqueValuesCache.hasOwnProperty(i))
        return s._uniqueValuesCache[i];
      const u = e.getColumn(i);
      if (u != null && u.accessorFn)
        return u.columnDef.getUniqueValues ? (s._uniqueValuesCache[i] = u.columnDef.getUniqueValues(s.original, o), s._uniqueValuesCache[i]) : (s._uniqueValuesCache[i] = [s.getValue(i)], s._uniqueValuesCache[i]);
    },
    renderValue: (i) => {
      var u;
      return (u = s.getValue(i)) != null ? u : e.options.renderFallbackValue;
    },
    subRows: [],
    getLeafRows: () => ap(s.subRows, (i) => i.subRows),
    getParentRow: () => s.parentId ? e.getRow(s.parentId, !0) : void 0,
    getParentRows: () => {
      let i = [], u = s;
      for (; ; ) {
        const c = u.getParentRow();
        if (!c) break;
        i.push(c), u = c;
      }
      return i.reverse();
    },
    getAllCells: z(() => [e.getAllLeafColumns()], (i) => i.map((u) => lp(e, s, u, u.id)), N(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: z(() => [s.getAllCells()], (i) => i.reduce((u, c) => (u[c.column.id] = c, u), {}), N(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let i = 0; i < e._features.length; i++) {
    const u = e._features[i];
    u == null || u.createRow == null || u.createRow(s, e);
  }
  return s;
}, up = {
  createColumn: (e, n) => {
    e._getFacetedRowModel = n.options.getFacetedRowModel && n.options.getFacetedRowModel(n, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : n.getPreFilteredRowModel(), e._getFacetedUniqueValues = n.options.getFacetedUniqueValues && n.options.getFacetedUniqueValues(n, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = n.options.getFacetedMinMaxValues && n.options.getFacetedMinMaxValues(n, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, La = (e, n, t) => {
  var o, r;
  const a = t == null || (o = t.toString()) == null ? void 0 : o.toLowerCase();
  return !!(!((r = e.getValue(n)) == null || (r = r.toString()) == null || (r = r.toLowerCase()) == null) && r.includes(a));
};
La.autoRemove = (e) => qe(e);
const za = (e, n, t) => {
  var o;
  return !!(!((o = e.getValue(n)) == null || (o = o.toString()) == null) && o.includes(t));
};
za.autoRemove = (e) => qe(e);
const Na = (e, n, t) => {
  var o;
  return ((o = e.getValue(n)) == null || (o = o.toString()) == null ? void 0 : o.toLowerCase()) === t?.toLowerCase();
};
Na.autoRemove = (e) => qe(e);
const Ha = (e, n, t) => {
  var o;
  return (o = e.getValue(n)) == null ? void 0 : o.includes(t);
};
Ha.autoRemove = (e) => qe(e);
const Ga = (e, n, t) => !t.some((o) => {
  var r;
  return !((r = e.getValue(n)) != null && r.includes(o));
});
Ga.autoRemove = (e) => qe(e) || !(e != null && e.length);
const ja = (e, n, t) => t.some((o) => {
  var r;
  return (r = e.getValue(n)) == null ? void 0 : r.includes(o);
});
ja.autoRemove = (e) => qe(e) || !(e != null && e.length);
const Ua = (e, n, t) => e.getValue(n) === t;
Ua.autoRemove = (e) => qe(e);
const Ka = (e, n, t) => e.getValue(n) == t;
Ka.autoRemove = (e) => qe(e);
const jo = (e, n, t) => {
  let [o, r] = t;
  const a = e.getValue(n);
  return a >= o && a <= r;
};
jo.resolveFilterValue = (e) => {
  let [n, t] = e, o = typeof n != "number" ? parseFloat(n) : n, r = typeof t != "number" ? parseFloat(t) : t, a = n === null || Number.isNaN(o) ? -1 / 0 : o, l = t === null || Number.isNaN(r) ? 1 / 0 : r;
  if (a > l) {
    const s = a;
    a = l, l = s;
  }
  return [a, l];
};
jo.autoRemove = (e) => qe(e) || qe(e[0]) && qe(e[1]);
const We = {
  includesString: La,
  includesStringSensitive: za,
  equalsString: Na,
  arrIncludes: Ha,
  arrIncludesAll: Ga,
  arrIncludesSome: ja,
  equals: Ua,
  weakEquals: Ka,
  inNumberRange: jo
};
function qe(e) {
  return e == null || e === "";
}
const dp = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: ke("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, n) => {
    e.getAutoFilterFn = () => {
      const t = n.getCoreRowModel().flatRows[0], o = t?.getValue(e.id);
      return typeof o == "string" ? We.includesString : typeof o == "number" ? We.inNumberRange : typeof o == "boolean" || o !== null && typeof o == "object" ? We.equals : Array.isArray(o) ? We.arrIncludes : We.weakEquals;
    }, e.getFilterFn = () => {
      var t, o;
      return xn(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (t = (o = n.options.filterFns) == null ? void 0 : o[e.columnDef.filterFn]) != null ? t : We[e.columnDef.filterFn]
      );
    }, e.getCanFilter = () => {
      var t, o, r;
      return ((t = e.columnDef.enableColumnFilter) != null ? t : !0) && ((o = n.options.enableColumnFilters) != null ? o : !0) && ((r = n.options.enableFilters) != null ? r : !0) && !!e.accessorFn;
    }, e.getIsFiltered = () => e.getFilterIndex() > -1, e.getFilterValue = () => {
      var t;
      return (t = n.getState().columnFilters) == null || (t = t.find((o) => o.id === e.id)) == null ? void 0 : t.value;
    }, e.getFilterIndex = () => {
      var t, o;
      return (t = (o = n.getState().columnFilters) == null ? void 0 : o.findIndex((r) => r.id === e.id)) != null ? t : -1;
    }, e.setFilterValue = (t) => {
      n.setColumnFilters((o) => {
        const r = e.getFilterFn(), a = o?.find((c) => c.id === e.id), l = ot(t, a ? a.value : void 0);
        if (Rr(r, l, e)) {
          var s;
          return (s = o?.filter((c) => c.id !== e.id)) != null ? s : [];
        }
        const i = {
          id: e.id,
          value: l
        };
        if (a) {
          var u;
          return (u = o?.map((c) => c.id === e.id ? i : c)) != null ? u : [];
        }
        return o != null && o.length ? [...o, i] : [i];
      });
    };
  },
  createRow: (e, n) => {
    e.columnFilters = {}, e.columnFiltersMeta = {};
  },
  createTable: (e) => {
    e.setColumnFilters = (n) => {
      const t = e.getAllLeafColumns(), o = (r) => {
        var a;
        return (a = ot(n, r)) == null ? void 0 : a.filter((l) => {
          const s = t.find((i) => i.id === l.id);
          if (s) {
            const i = s.getFilterFn();
            if (Rr(i, l.value, s))
              return !1;
          }
          return !0;
        });
      };
      e.options.onColumnFiltersChange == null || e.options.onColumnFiltersChange(o);
    }, e.resetColumnFilters = (n) => {
      var t, o;
      e.setColumnFilters(n ? [] : (t = (o = e.initialState) == null ? void 0 : o.columnFilters) != null ? t : []);
    }, e.getPreFilteredRowModel = () => e.getCoreRowModel(), e.getFilteredRowModel = () => (!e._getFilteredRowModel && e.options.getFilteredRowModel && (e._getFilteredRowModel = e.options.getFilteredRowModel(e)), e.options.manualFiltering || !e._getFilteredRowModel ? e.getPreFilteredRowModel() : e._getFilteredRowModel());
  }
};
function Rr(e, n, t) {
  return (e && e.autoRemove ? e.autoRemove(n, t) : !1) || typeof n > "u" || typeof n == "string" && !n;
}
const cp = (e, n, t) => t.reduce((o, r) => {
  const a = r.getValue(e);
  return o + (typeof a == "number" ? a : 0);
}, 0), fp = (e, n, t) => {
  let o;
  return t.forEach((r) => {
    const a = r.getValue(e);
    a != null && (o > a || o === void 0 && a >= a) && (o = a);
  }), o;
}, pp = (e, n, t) => {
  let o;
  return t.forEach((r) => {
    const a = r.getValue(e);
    a != null && (o < a || o === void 0 && a >= a) && (o = a);
  }), o;
}, gp = (e, n, t) => {
  let o, r;
  return t.forEach((a) => {
    const l = a.getValue(e);
    l != null && (o === void 0 ? l >= l && (o = r = l) : (o > l && (o = l), r < l && (r = l)));
  }), [o, r];
}, mp = (e, n) => {
  let t = 0, o = 0;
  if (n.forEach((r) => {
    let a = r.getValue(e);
    a != null && (a = +a) >= a && (++t, o += a);
  }), t) return o / t;
}, vp = (e, n) => {
  if (!n.length)
    return;
  const t = n.map((a) => a.getValue(e));
  if (!rp(t))
    return;
  if (t.length === 1)
    return t[0];
  const o = Math.floor(t.length / 2), r = t.sort((a, l) => a - l);
  return t.length % 2 !== 0 ? r[o] : (r[o - 1] + r[o]) / 2;
}, hp = (e, n) => Array.from(new Set(n.map((t) => t.getValue(e))).values()), yp = (e, n) => new Set(n.map((t) => t.getValue(e))).size, wp = (e, n) => n.length, Bn = {
  sum: cp,
  min: fp,
  max: pp,
  extent: gp,
  mean: mp,
  median: vp,
  unique: hp,
  uniqueCount: yp,
  count: wp
}, _p = {
  getDefaultColumnDef: () => ({
    aggregatedCell: (e) => {
      var n, t;
      return (n = (t = e.getValue()) == null || t.toString == null ? void 0 : t.toString()) != null ? n : null;
    },
    aggregationFn: "auto"
  }),
  getInitialState: (e) => ({
    grouping: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGroupingChange: ke("grouping", e),
    groupedColumnMode: "reorder"
  }),
  createColumn: (e, n) => {
    e.toggleGrouping = () => {
      n.setGrouping((t) => t != null && t.includes(e.id) ? t.filter((o) => o !== e.id) : [...t ?? [], e.id]);
    }, e.getCanGroup = () => {
      var t, o;
      return ((t = e.columnDef.enableGrouping) != null ? t : !0) && ((o = n.options.enableGrouping) != null ? o : !0) && (!!e.accessorFn || !!e.columnDef.getGroupingValue);
    }, e.getIsGrouped = () => {
      var t;
      return (t = n.getState().grouping) == null ? void 0 : t.includes(e.id);
    }, e.getGroupedIndex = () => {
      var t;
      return (t = n.getState().grouping) == null ? void 0 : t.indexOf(e.id);
    }, e.getToggleGroupingHandler = () => {
      const t = e.getCanGroup();
      return () => {
        t && e.toggleGrouping();
      };
    }, e.getAutoAggregationFn = () => {
      const t = n.getCoreRowModel().flatRows[0], o = t?.getValue(e.id);
      if (typeof o == "number")
        return Bn.sum;
      if (Object.prototype.toString.call(o) === "[object Date]")
        return Bn.extent;
    }, e.getAggregationFn = () => {
      var t, o;
      if (!e)
        throw new Error();
      return xn(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (t = (o = n.options.aggregationFns) == null ? void 0 : o[e.columnDef.aggregationFn]) != null ? t : Bn[e.columnDef.aggregationFn];
    };
  },
  createTable: (e) => {
    e.setGrouping = (n) => e.options.onGroupingChange == null ? void 0 : e.options.onGroupingChange(n), e.resetGrouping = (n) => {
      var t, o;
      e.setGrouping(n ? [] : (t = (o = e.initialState) == null ? void 0 : o.grouping) != null ? t : []);
    }, e.getPreGroupedRowModel = () => e.getFilteredRowModel(), e.getGroupedRowModel = () => (!e._getGroupedRowModel && e.options.getGroupedRowModel && (e._getGroupedRowModel = e.options.getGroupedRowModel(e)), e.options.manualGrouping || !e._getGroupedRowModel ? e.getPreGroupedRowModel() : e._getGroupedRowModel());
  },
  createRow: (e, n) => {
    e.getIsGrouped = () => !!e.groupingColumnId, e.getGroupingValue = (t) => {
      if (e._groupingValuesCache.hasOwnProperty(t))
        return e._groupingValuesCache[t];
      const o = n.getColumn(t);
      return o != null && o.columnDef.getGroupingValue ? (e._groupingValuesCache[t] = o.columnDef.getGroupingValue(e.original), e._groupingValuesCache[t]) : e.getValue(t);
    }, e._groupingValuesCache = {};
  },
  createCell: (e, n, t, o) => {
    e.getIsGrouped = () => n.getIsGrouped() && n.id === t.groupingColumnId, e.getIsPlaceholder = () => !e.getIsGrouped() && n.getIsGrouped(), e.getIsAggregated = () => {
      var r;
      return !e.getIsGrouped() && !e.getIsPlaceholder() && !!((r = t.subRows) != null && r.length);
    };
  }
};
function bp(e, n, t) {
  if (!(n != null && n.length) || !t)
    return e;
  const o = e.filter((a) => !n.includes(a.id));
  return t === "remove" ? o : [...n.map((a) => e.find((l) => l.id === a)).filter(Boolean), ...o];
}
const Cp = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: ke("columnOrder", e)
  }),
  createColumn: (e, n) => {
    e.getIndex = z((t) => [Dt(n, t)], (t) => t.findIndex((o) => o.id === e.id), N(n.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (t) => {
      var o;
      return ((o = Dt(n, t)[0]) == null ? void 0 : o.id) === e.id;
    }, e.getIsLastColumn = (t) => {
      var o;
      const r = Dt(n, t);
      return ((o = r[r.length - 1]) == null ? void 0 : o.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (n) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(n), e.resetColumnOrder = (n) => {
      var t;
      e.setColumnOrder(n ? [] : (t = e.initialState.columnOrder) != null ? t : []);
    }, e._getOrderColumnsFn = z(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (n, t, o) => (r) => {
      let a = [];
      if (!(n != null && n.length))
        a = r;
      else {
        const l = [...n], s = [...r];
        for (; s.length && l.length; ) {
          const i = l.shift(), u = s.findIndex((c) => c.id === i);
          u > -1 && a.push(s.splice(u, 1)[0]);
        }
        a = [...a, ...s];
      }
      return bp(a, t, o);
    }, N(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, Tn = () => ({
  left: [],
  right: []
}), Sp = {
  getInitialState: (e) => ({
    columnPinning: Tn(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: ke("columnPinning", e)
  }),
  createColumn: (e, n) => {
    e.pin = (t) => {
      const o = e.getLeafColumns().map((r) => r.id).filter(Boolean);
      n.setColumnPinning((r) => {
        var a, l;
        if (t === "right") {
          var s, i;
          return {
            left: ((s = r?.left) != null ? s : []).filter((f) => !(o != null && o.includes(f))),
            right: [...((i = r?.right) != null ? i : []).filter((f) => !(o != null && o.includes(f))), ...o]
          };
        }
        if (t === "left") {
          var u, c;
          return {
            left: [...((u = r?.left) != null ? u : []).filter((f) => !(o != null && o.includes(f))), ...o],
            right: ((c = r?.right) != null ? c : []).filter((f) => !(o != null && o.includes(f)))
          };
        }
        return {
          left: ((a = r?.left) != null ? a : []).filter((f) => !(o != null && o.includes(f))),
          right: ((l = r?.right) != null ? l : []).filter((f) => !(o != null && o.includes(f)))
        };
      });
    }, e.getCanPin = () => e.getLeafColumns().some((o) => {
      var r, a, l;
      return ((r = o.columnDef.enablePinning) != null ? r : !0) && ((a = (l = n.options.enableColumnPinning) != null ? l : n.options.enablePinning) != null ? a : !0);
    }), e.getIsPinned = () => {
      const t = e.getLeafColumns().map((s) => s.id), {
        left: o,
        right: r
      } = n.getState().columnPinning, a = t.some((s) => o?.includes(s)), l = t.some((s) => r?.includes(s));
      return a ? "left" : l ? "right" : !1;
    }, e.getPinnedIndex = () => {
      var t, o;
      const r = e.getIsPinned();
      return r ? (t = (o = n.getState().columnPinning) == null || (o = o[r]) == null ? void 0 : o.indexOf(e.id)) != null ? t : -1 : 0;
    };
  },
  createRow: (e, n) => {
    e.getCenterVisibleCells = z(() => [e._getAllVisibleCells(), n.getState().columnPinning.left, n.getState().columnPinning.right], (t, o, r) => {
      const a = [...o ?? [], ...r ?? []];
      return t.filter((l) => !a.includes(l.column.id));
    }, N(n.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = z(() => [e._getAllVisibleCells(), n.getState().columnPinning.left], (t, o) => (o ?? []).map((a) => t.find((l) => l.column.id === a)).filter(Boolean).map((a) => ({
      ...a,
      position: "left"
    })), N(n.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = z(() => [e._getAllVisibleCells(), n.getState().columnPinning.right], (t, o) => (o ?? []).map((a) => t.find((l) => l.column.id === a)).filter(Boolean).map((a) => ({
      ...a,
      position: "right"
    })), N(n.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (e) => {
    e.setColumnPinning = (n) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(n), e.resetColumnPinning = (n) => {
      var t, o;
      return e.setColumnPinning(n ? Tn() : (t = (o = e.initialState) == null ? void 0 : o.columnPinning) != null ? t : Tn());
    }, e.getIsSomeColumnsPinned = (n) => {
      var t;
      const o = e.getState().columnPinning;
      if (!n) {
        var r, a;
        return !!((r = o.left) != null && r.length || (a = o.right) != null && a.length);
      }
      return !!((t = o[n]) != null && t.length);
    }, e.getLeftLeafColumns = z(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (n, t) => (t ?? []).map((o) => n.find((r) => r.id === o)).filter(Boolean), N(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = z(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (n, t) => (t ?? []).map((o) => n.find((r) => r.id === o)).filter(Boolean), N(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = z(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (n, t, o) => {
      const r = [...t ?? [], ...o ?? []];
      return n.filter((a) => !r.includes(a.id));
    }, N(e.options, "debugColumns", "getCenterLeafColumns"));
  }
};
function xp(e) {
  return e || (typeof document < "u" ? document : null);
}
const on = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Vn = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), Rp = {
  getDefaultColumnDef: () => on,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Vn(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: ke("columnSizing", e),
    onColumnSizingInfoChange: ke("columnSizingInfo", e)
  }),
  createColumn: (e, n) => {
    e.getSize = () => {
      var t, o, r;
      const a = n.getState().columnSizing[e.id];
      return Math.min(Math.max((t = e.columnDef.minSize) != null ? t : on.minSize, (o = a ?? e.columnDef.size) != null ? o : on.size), (r = e.columnDef.maxSize) != null ? r : on.maxSize);
    }, e.getStart = z((t) => [t, Dt(n, t), n.getState().columnSizing], (t, o) => o.slice(0, e.getIndex(t)).reduce((r, a) => r + a.getSize(), 0), N(n.options, "debugColumns", "getStart")), e.getAfter = z((t) => [t, Dt(n, t), n.getState().columnSizing], (t, o) => o.slice(e.getIndex(t) + 1).reduce((r, a) => r + a.getSize(), 0), N(n.options, "debugColumns", "getAfter")), e.resetSize = () => {
      n.setColumnSizing((t) => {
        let {
          [e.id]: o,
          ...r
        } = t;
        return r;
      });
    }, e.getCanResize = () => {
      var t, o;
      return ((t = e.columnDef.enableResizing) != null ? t : !0) && ((o = n.options.enableColumnResizing) != null ? o : !0);
    }, e.getIsResizing = () => n.getState().columnSizingInfo.isResizingColumn === e.id;
  },
  createHeader: (e, n) => {
    e.getSize = () => {
      let t = 0;
      const o = (r) => {
        if (r.subHeaders.length)
          r.subHeaders.forEach(o);
        else {
          var a;
          t += (a = r.column.getSize()) != null ? a : 0;
        }
      };
      return o(e), t;
    }, e.getStart = () => {
      if (e.index > 0) {
        const t = e.headerGroup.headers[e.index - 1];
        return t.getStart() + t.getSize();
      }
      return 0;
    }, e.getResizeHandler = (t) => {
      const o = n.getColumn(e.column.id), r = o?.getCanResize();
      return (a) => {
        if (!o || !r || (a.persist == null || a.persist(), Ln(a) && a.touches && a.touches.length > 1))
          return;
        const l = e.getSize(), s = e ? e.getLeafHeaders().map((_) => [_.column.id, _.column.getSize()]) : [[o.id, o.getSize()]], i = Ln(a) ? Math.round(a.touches[0].clientX) : a.clientX, u = {}, c = (_, $) => {
          typeof $ == "number" && (n.setColumnSizingInfo((S) => {
            var C, k;
            const M = n.options.columnResizeDirection === "rtl" ? -1 : 1, O = ($ - ((C = S?.startOffset) != null ? C : 0)) * M, E = Math.max(O / ((k = S?.startSize) != null ? k : 0), -0.999999);
            return S.columnSizingStart.forEach((P) => {
              let [L, j] = P;
              u[L] = Math.round(Math.max(j + j * E, 0) * 100) / 100;
            }), {
              ...S,
              deltaOffset: O,
              deltaPercentage: E
            };
          }), (n.options.columnResizeMode === "onChange" || _ === "end") && n.setColumnSizing((S) => ({
            ...S,
            ...u
          })));
        }, f = (_) => c("move", _), g = (_) => {
          c("end", _), n.setColumnSizingInfo(($) => ({
            ...$,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, p = xp(t), m = {
          moveHandler: (_) => f(_.clientX),
          upHandler: (_) => {
            p?.removeEventListener("mousemove", m.moveHandler), p?.removeEventListener("mouseup", m.upHandler), g(_.clientX);
          }
        }, v = {
          moveHandler: (_) => (_.cancelable && (_.preventDefault(), _.stopPropagation()), f(_.touches[0].clientX), !1),
          upHandler: (_) => {
            var $;
            p?.removeEventListener("touchmove", v.moveHandler), p?.removeEventListener("touchend", v.upHandler), _.cancelable && (_.preventDefault(), _.stopPropagation()), g(($ = _.touches[0]) == null ? void 0 : $.clientX);
          }
        }, w = Pp() ? {
          passive: !1
        } : !1;
        Ln(a) ? (p?.addEventListener("touchmove", v.moveHandler, w), p?.addEventListener("touchend", v.upHandler, w)) : (p?.addEventListener("mousemove", m.moveHandler, w), p?.addEventListener("mouseup", m.upHandler, w)), n.setColumnSizingInfo((_) => ({
          ..._,
          startOffset: i,
          startSize: l,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart: s,
          isResizingColumn: o.id
        }));
      };
    };
  },
  createTable: (e) => {
    e.setColumnSizing = (n) => e.options.onColumnSizingChange == null ? void 0 : e.options.onColumnSizingChange(n), e.setColumnSizingInfo = (n) => e.options.onColumnSizingInfoChange == null ? void 0 : e.options.onColumnSizingInfoChange(n), e.resetColumnSizing = (n) => {
      var t;
      e.setColumnSizing(n ? {} : (t = e.initialState.columnSizing) != null ? t : {});
    }, e.resetHeaderSizeInfo = (n) => {
      var t;
      e.setColumnSizingInfo(n ? Vn() : (t = e.initialState.columnSizingInfo) != null ? t : Vn());
    }, e.getTotalSize = () => {
      var n, t;
      return (n = (t = e.getHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((o, r) => o + r.getSize(), 0)) != null ? n : 0;
    }, e.getLeftTotalSize = () => {
      var n, t;
      return (n = (t = e.getLeftHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((o, r) => o + r.getSize(), 0)) != null ? n : 0;
    }, e.getCenterTotalSize = () => {
      var n, t;
      return (n = (t = e.getCenterHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((o, r) => o + r.getSize(), 0)) != null ? n : 0;
    }, e.getRightTotalSize = () => {
      var n, t;
      return (n = (t = e.getRightHeaderGroups()[0]) == null ? void 0 : t.headers.reduce((o, r) => o + r.getSize(), 0)) != null ? n : 0;
    };
  }
};
let rn = null;
function Pp() {
  if (typeof rn == "boolean") return rn;
  let e = !1;
  try {
    const n = {
      get passive() {
        return e = !0, !1;
      }
    }, t = () => {
    };
    window.addEventListener("test", t, n), window.removeEventListener("test", t);
  } catch {
    e = !1;
  }
  return rn = e, rn;
}
function Ln(e) {
  return e.type === "touchstart";
}
const $p = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: ke("columnVisibility", e)
  }),
  createColumn: (e, n) => {
    e.toggleVisibility = (t) => {
      e.getCanHide() && n.setColumnVisibility((o) => ({
        ...o,
        [e.id]: t ?? !e.getIsVisible()
      }));
    }, e.getIsVisible = () => {
      var t, o;
      const r = e.columns;
      return (t = r.length ? r.some((a) => a.getIsVisible()) : (o = n.getState().columnVisibility) == null ? void 0 : o[e.id]) != null ? t : !0;
    }, e.getCanHide = () => {
      var t, o;
      return ((t = e.columnDef.enableHiding) != null ? t : !0) && ((o = n.options.enableHiding) != null ? o : !0);
    }, e.getToggleVisibilityHandler = () => (t) => {
      e.toggleVisibility == null || e.toggleVisibility(t.target.checked);
    };
  },
  createRow: (e, n) => {
    e._getAllVisibleCells = z(() => [e.getAllCells(), n.getState().columnVisibility], (t) => t.filter((o) => o.column.getIsVisible()), N(n.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = z(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (t, o, r) => [...t, ...o, ...r], N(n.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const n = (t, o) => z(() => [o(), o().filter((r) => r.getIsVisible()).map((r) => r.id).join("_")], (r) => r.filter((a) => a.getIsVisible == null ? void 0 : a.getIsVisible()), N(e.options, "debugColumns", t));
    e.getVisibleFlatColumns = n("getVisibleFlatColumns", () => e.getAllFlatColumns()), e.getVisibleLeafColumns = n("getVisibleLeafColumns", () => e.getAllLeafColumns()), e.getLeftVisibleLeafColumns = n("getLeftVisibleLeafColumns", () => e.getLeftLeafColumns()), e.getRightVisibleLeafColumns = n("getRightVisibleLeafColumns", () => e.getRightLeafColumns()), e.getCenterVisibleLeafColumns = n("getCenterVisibleLeafColumns", () => e.getCenterLeafColumns()), e.setColumnVisibility = (t) => e.options.onColumnVisibilityChange == null ? void 0 : e.options.onColumnVisibilityChange(t), e.resetColumnVisibility = (t) => {
      var o;
      e.setColumnVisibility(t ? {} : (o = e.initialState.columnVisibility) != null ? o : {});
    }, e.toggleAllColumnsVisible = (t) => {
      var o;
      t = (o = t) != null ? o : !e.getIsAllColumnsVisible(), e.setColumnVisibility(e.getAllLeafColumns().reduce((r, a) => ({
        ...r,
        [a.id]: t || !(a.getCanHide != null && a.getCanHide())
      }), {}));
    }, e.getIsAllColumnsVisible = () => !e.getAllLeafColumns().some((t) => !(t.getIsVisible != null && t.getIsVisible())), e.getIsSomeColumnsVisible = () => e.getAllLeafColumns().some((t) => t.getIsVisible == null ? void 0 : t.getIsVisible()), e.getToggleAllColumnsVisibilityHandler = () => (t) => {
      var o;
      e.toggleAllColumnsVisible((o = t.target) == null ? void 0 : o.checked);
    };
  }
};
function Dt(e, n) {
  return n ? n === "center" ? e.getCenterVisibleLeafColumns() : n === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const kp = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, Ap = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: ke("globalFilter", e),
    globalFilterFn: "auto",
    getColumnCanGlobalFilter: (n) => {
      var t;
      const o = (t = e.getCoreRowModel().flatRows[0]) == null || (t = t._getAllCellsByColumnId()[n.id]) == null ? void 0 : t.getValue();
      return typeof o == "string" || typeof o == "number";
    }
  }),
  createColumn: (e, n) => {
    e.getCanGlobalFilter = () => {
      var t, o, r, a;
      return ((t = e.columnDef.enableGlobalFilter) != null ? t : !0) && ((o = n.options.enableGlobalFilter) != null ? o : !0) && ((r = n.options.enableFilters) != null ? r : !0) && ((a = n.options.getColumnCanGlobalFilter == null ? void 0 : n.options.getColumnCanGlobalFilter(e)) != null ? a : !0) && !!e.accessorFn;
    };
  },
  createTable: (e) => {
    e.getGlobalAutoFilterFn = () => We.includesString, e.getGlobalFilterFn = () => {
      var n, t;
      const {
        globalFilterFn: o
      } = e.options;
      return xn(o) ? o : o === "auto" ? e.getGlobalAutoFilterFn() : (n = (t = e.options.filterFns) == null ? void 0 : t[o]) != null ? n : We[o];
    }, e.setGlobalFilter = (n) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(n);
    }, e.resetGlobalFilter = (n) => {
      e.setGlobalFilter(n ? void 0 : e.initialState.globalFilter);
    };
  }
}, Ip = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: ke("expanded", e),
    paginateExpandedRows: !0
  }),
  createTable: (e) => {
    let n = !1, t = !1;
    e._autoResetExpanded = () => {
      var o, r;
      if (!n) {
        e._queue(() => {
          n = !0;
        });
        return;
      }
      if ((o = (r = e.options.autoResetAll) != null ? r : e.options.autoResetExpanded) != null ? o : !e.options.manualExpanding) {
        if (t) return;
        t = !0, e._queue(() => {
          e.resetExpanded(), t = !1;
        });
      }
    }, e.setExpanded = (o) => e.options.onExpandedChange == null ? void 0 : e.options.onExpandedChange(o), e.toggleAllRowsExpanded = (o) => {
      o ?? !e.getIsAllRowsExpanded() ? e.setExpanded(!0) : e.setExpanded({});
    }, e.resetExpanded = (o) => {
      var r, a;
      e.setExpanded(o ? {} : (r = (a = e.initialState) == null ? void 0 : a.expanded) != null ? r : {});
    }, e.getCanSomeRowsExpand = () => e.getPrePaginationRowModel().flatRows.some((o) => o.getCanExpand()), e.getToggleAllRowsExpandedHandler = () => (o) => {
      o.persist == null || o.persist(), e.toggleAllRowsExpanded();
    }, e.getIsSomeRowsExpanded = () => {
      const o = e.getState().expanded;
      return o === !0 || Object.values(o).some(Boolean);
    }, e.getIsAllRowsExpanded = () => {
      const o = e.getState().expanded;
      return typeof o == "boolean" ? o === !0 : !(!Object.keys(o).length || e.getRowModel().flatRows.some((r) => !r.getIsExpanded()));
    }, e.getExpandedDepth = () => {
      let o = 0;
      return (e.getState().expanded === !0 ? Object.keys(e.getRowModel().rowsById) : Object.keys(e.getState().expanded)).forEach((a) => {
        const l = a.split(".");
        o = Math.max(o, l.length);
      }), o;
    }, e.getPreExpandedRowModel = () => e.getSortedRowModel(), e.getExpandedRowModel = () => (!e._getExpandedRowModel && e.options.getExpandedRowModel && (e._getExpandedRowModel = e.options.getExpandedRowModel(e)), e.options.manualExpanding || !e._getExpandedRowModel ? e.getPreExpandedRowModel() : e._getExpandedRowModel());
  },
  createRow: (e, n) => {
    e.toggleExpanded = (t) => {
      n.setExpanded((o) => {
        var r;
        const a = o === !0 ? !0 : !!(o != null && o[e.id]);
        let l = {};
        if (o === !0 ? Object.keys(n.getRowModel().rowsById).forEach((s) => {
          l[s] = !0;
        }) : l = o, t = (r = t) != null ? r : !a, !a && t)
          return {
            ...l,
            [e.id]: !0
          };
        if (a && !t) {
          const {
            [e.id]: s,
            ...i
          } = l;
          return i;
        }
        return o;
      });
    }, e.getIsExpanded = () => {
      var t;
      const o = n.getState().expanded;
      return !!((t = n.options.getIsRowExpanded == null ? void 0 : n.options.getIsRowExpanded(e)) != null ? t : o === !0 || o?.[e.id]);
    }, e.getCanExpand = () => {
      var t, o, r;
      return (t = n.options.getRowCanExpand == null ? void 0 : n.options.getRowCanExpand(e)) != null ? t : ((o = n.options.enableExpanding) != null ? o : !0) && !!((r = e.subRows) != null && r.length);
    }, e.getIsAllParentsExpanded = () => {
      let t = !0, o = e;
      for (; t && o.parentId; )
        o = n.getRow(o.parentId, !0), t = o.getIsExpanded();
      return t;
    }, e.getToggleExpandedHandler = () => {
      const t = e.getCanExpand();
      return () => {
        t && e.toggleExpanded();
      };
    };
  }
}, co = 0, fo = 10, zn = () => ({
  pageIndex: co,
  pageSize: fo
}), Ep = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...zn(),
      ...e?.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: ke("pagination", e)
  }),
  createTable: (e) => {
    let n = !1, t = !1;
    e._autoResetPageIndex = () => {
      var o, r;
      if (!n) {
        e._queue(() => {
          n = !0;
        });
        return;
      }
      if ((o = (r = e.options.autoResetAll) != null ? r : e.options.autoResetPageIndex) != null ? o : !e.options.manualPagination) {
        if (t) return;
        t = !0, e._queue(() => {
          e.resetPageIndex(), t = !1;
        });
      }
    }, e.setPagination = (o) => {
      const r = (a) => ot(o, a);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(r);
    }, e.resetPagination = (o) => {
      var r;
      e.setPagination(o ? zn() : (r = e.initialState.pagination) != null ? r : zn());
    }, e.setPageIndex = (o) => {
      e.setPagination((r) => {
        let a = ot(o, r.pageIndex);
        const l = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return a = Math.max(0, Math.min(a, l)), {
          ...r,
          pageIndex: a
        };
      });
    }, e.resetPageIndex = (o) => {
      var r, a;
      e.setPageIndex(o ? co : (r = (a = e.initialState) == null || (a = a.pagination) == null ? void 0 : a.pageIndex) != null ? r : co);
    }, e.resetPageSize = (o) => {
      var r, a;
      e.setPageSize(o ? fo : (r = (a = e.initialState) == null || (a = a.pagination) == null ? void 0 : a.pageSize) != null ? r : fo);
    }, e.setPageSize = (o) => {
      e.setPagination((r) => {
        const a = Math.max(1, ot(o, r.pageSize)), l = r.pageSize * r.pageIndex, s = Math.floor(l / a);
        return {
          ...r,
          pageIndex: s,
          pageSize: a
        };
      });
    }, e.setPageCount = (o) => e.setPagination((r) => {
      var a;
      let l = ot(o, (a = e.options.pageCount) != null ? a : -1);
      return typeof l == "number" && (l = Math.max(-1, l)), {
        ...r,
        pageCount: l
      };
    }), e.getPageOptions = z(() => [e.getPageCount()], (o) => {
      let r = [];
      return o && o > 0 && (r = [...new Array(o)].fill(null).map((a, l) => l)), r;
    }, N(e.options, "debugTable", "getPageOptions")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
      const {
        pageIndex: o
      } = e.getState().pagination, r = e.getPageCount();
      return r === -1 ? !0 : r === 0 ? !1 : o < r - 1;
    }, e.previousPage = () => e.setPageIndex((o) => o - 1), e.nextPage = () => e.setPageIndex((o) => o + 1), e.firstPage = () => e.setPageIndex(0), e.lastPage = () => e.setPageIndex(e.getPageCount() - 1), e.getPrePaginationRowModel = () => e.getExpandedRowModel(), e.getPaginationRowModel = () => (!e._getPaginationRowModel && e.options.getPaginationRowModel && (e._getPaginationRowModel = e.options.getPaginationRowModel(e)), e.options.manualPagination || !e._getPaginationRowModel ? e.getPrePaginationRowModel() : e._getPaginationRowModel()), e.getPageCount = () => {
      var o;
      return (o = e.options.pageCount) != null ? o : Math.ceil(e.getRowCount() / e.getState().pagination.pageSize);
    }, e.getRowCount = () => {
      var o;
      return (o = e.options.rowCount) != null ? o : e.getPrePaginationRowModel().rows.length;
    };
  }
}, Nn = () => ({
  top: [],
  bottom: []
}), Mp = {
  getInitialState: (e) => ({
    rowPinning: Nn(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: ke("rowPinning", e)
  }),
  createRow: (e, n) => {
    e.pin = (t, o, r) => {
      const a = o ? e.getLeafRows().map((i) => {
        let {
          id: u
        } = i;
        return u;
      }) : [], l = r ? e.getParentRows().map((i) => {
        let {
          id: u
        } = i;
        return u;
      }) : [], s = /* @__PURE__ */ new Set([...l, e.id, ...a]);
      n.setRowPinning((i) => {
        var u, c;
        if (t === "bottom") {
          var f, g;
          return {
            top: ((f = i?.top) != null ? f : []).filter((v) => !(s != null && s.has(v))),
            bottom: [...((g = i?.bottom) != null ? g : []).filter((v) => !(s != null && s.has(v))), ...Array.from(s)]
          };
        }
        if (t === "top") {
          var p, m;
          return {
            top: [...((p = i?.top) != null ? p : []).filter((v) => !(s != null && s.has(v))), ...Array.from(s)],
            bottom: ((m = i?.bottom) != null ? m : []).filter((v) => !(s != null && s.has(v)))
          };
        }
        return {
          top: ((u = i?.top) != null ? u : []).filter((v) => !(s != null && s.has(v))),
          bottom: ((c = i?.bottom) != null ? c : []).filter((v) => !(s != null && s.has(v)))
        };
      });
    }, e.getCanPin = () => {
      var t;
      const {
        enableRowPinning: o,
        enablePinning: r
      } = n.options;
      return typeof o == "function" ? o(e) : (t = o ?? r) != null ? t : !0;
    }, e.getIsPinned = () => {
      const t = [e.id], {
        top: o,
        bottom: r
      } = n.getState().rowPinning, a = t.some((s) => o?.includes(s)), l = t.some((s) => r?.includes(s));
      return a ? "top" : l ? "bottom" : !1;
    }, e.getPinnedIndex = () => {
      var t, o;
      const r = e.getIsPinned();
      if (!r) return -1;
      const a = (t = r === "top" ? n.getTopRows() : n.getBottomRows()) == null ? void 0 : t.map((l) => {
        let {
          id: s
        } = l;
        return s;
      });
      return (o = a?.indexOf(e.id)) != null ? o : -1;
    };
  },
  createTable: (e) => {
    e.setRowPinning = (n) => e.options.onRowPinningChange == null ? void 0 : e.options.onRowPinningChange(n), e.resetRowPinning = (n) => {
      var t, o;
      return e.setRowPinning(n ? Nn() : (t = (o = e.initialState) == null ? void 0 : o.rowPinning) != null ? t : Nn());
    }, e.getIsSomeRowsPinned = (n) => {
      var t;
      const o = e.getState().rowPinning;
      if (!n) {
        var r, a;
        return !!((r = o.top) != null && r.length || (a = o.bottom) != null && a.length);
      }
      return !!((t = o[n]) != null && t.length);
    }, e._getPinnedRows = (n, t, o) => {
      var r;
      return ((r = e.options.keepPinnedRows) == null || r ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (t ?? []).map((l) => {
          const s = e.getRow(l, !0);
          return s.getIsAllParentsExpanded() ? s : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (t ?? []).map((l) => n.find((s) => s.id === l))
      )).filter(Boolean).map((l) => ({
        ...l,
        position: o
      }));
    }, e.getTopRows = z(() => [e.getRowModel().rows, e.getState().rowPinning.top], (n, t) => e._getPinnedRows(n, t, "top"), N(e.options, "debugRows", "getTopRows")), e.getBottomRows = z(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (n, t) => e._getPinnedRows(n, t, "bottom"), N(e.options, "debugRows", "getBottomRows")), e.getCenterRows = z(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (n, t, o) => {
      const r = /* @__PURE__ */ new Set([...t ?? [], ...o ?? []]);
      return n.filter((a) => !r.has(a.id));
    }, N(e.options, "debugRows", "getCenterRows"));
  }
}, Op = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: ke("rowSelection", e),
    enableRowSelection: !0,
    enableMultiRowSelection: !0,
    enableSubRowSelection: !0
    // enableGroupingRowSelection: false,
    // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
    // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
  }),
  createTable: (e) => {
    e.setRowSelection = (n) => e.options.onRowSelectionChange == null ? void 0 : e.options.onRowSelectionChange(n), e.resetRowSelection = (n) => {
      var t;
      return e.setRowSelection(n ? {} : (t = e.initialState.rowSelection) != null ? t : {});
    }, e.toggleAllRowsSelected = (n) => {
      e.setRowSelection((t) => {
        n = typeof n < "u" ? n : !e.getIsAllRowsSelected();
        const o = {
          ...t
        }, r = e.getPreGroupedRowModel().flatRows;
        return n ? r.forEach((a) => {
          a.getCanSelect() && (o[a.id] = !0);
        }) : r.forEach((a) => {
          delete o[a.id];
        }), o;
      });
    }, e.toggleAllPageRowsSelected = (n) => e.setRowSelection((t) => {
      const o = typeof n < "u" ? n : !e.getIsAllPageRowsSelected(), r = {
        ...t
      };
      return e.getRowModel().rows.forEach((a) => {
        po(r, a.id, o, !0, e);
      }), r;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = z(() => [e.getState().rowSelection, e.getCoreRowModel()], (n, t) => Object.keys(n).length ? Hn(e, t) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, N(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = z(() => [e.getState().rowSelection, e.getFilteredRowModel()], (n, t) => Object.keys(n).length ? Hn(e, t) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, N(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = z(() => [e.getState().rowSelection, e.getSortedRowModel()], (n, t) => Object.keys(n).length ? Hn(e, t) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, N(e.options, "debugTable", "getGroupedSelectedRowModel")), e.getIsAllRowsSelected = () => {
      const n = e.getFilteredRowModel().flatRows, {
        rowSelection: t
      } = e.getState();
      let o = !!(n.length && Object.keys(t).length);
      return o && n.some((r) => r.getCanSelect() && !t[r.id]) && (o = !1), o;
    }, e.getIsAllPageRowsSelected = () => {
      const n = e.getPaginationRowModel().flatRows.filter((r) => r.getCanSelect()), {
        rowSelection: t
      } = e.getState();
      let o = !!n.length;
      return o && n.some((r) => !t[r.id]) && (o = !1), o;
    }, e.getIsSomeRowsSelected = () => {
      var n;
      const t = Object.keys((n = e.getState().rowSelection) != null ? n : {}).length;
      return t > 0 && t < e.getFilteredRowModel().flatRows.length;
    }, e.getIsSomePageRowsSelected = () => {
      const n = e.getPaginationRowModel().flatRows;
      return e.getIsAllPageRowsSelected() ? !1 : n.filter((t) => t.getCanSelect()).some((t) => t.getIsSelected() || t.getIsSomeSelected());
    }, e.getToggleAllRowsSelectedHandler = () => (n) => {
      e.toggleAllRowsSelected(n.target.checked);
    }, e.getToggleAllPageRowsSelectedHandler = () => (n) => {
      e.toggleAllPageRowsSelected(n.target.checked);
    };
  },
  createRow: (e, n) => {
    e.toggleSelected = (t, o) => {
      const r = e.getIsSelected();
      n.setRowSelection((a) => {
        var l;
        if (t = typeof t < "u" ? t : !r, e.getCanSelect() && r === t)
          return a;
        const s = {
          ...a
        };
        return po(s, e.id, t, (l = o?.selectChildren) != null ? l : !0, n), s;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: t
      } = n.getState();
      return Uo(e, t);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: t
      } = n.getState();
      return go(e, t) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: t
      } = n.getState();
      return go(e, t) === "all";
    }, e.getCanSelect = () => {
      var t;
      return typeof n.options.enableRowSelection == "function" ? n.options.enableRowSelection(e) : (t = n.options.enableRowSelection) != null ? t : !0;
    }, e.getCanSelectSubRows = () => {
      var t;
      return typeof n.options.enableSubRowSelection == "function" ? n.options.enableSubRowSelection(e) : (t = n.options.enableSubRowSelection) != null ? t : !0;
    }, e.getCanMultiSelect = () => {
      var t;
      return typeof n.options.enableMultiRowSelection == "function" ? n.options.enableMultiRowSelection(e) : (t = n.options.enableMultiRowSelection) != null ? t : !0;
    }, e.getToggleSelectedHandler = () => {
      const t = e.getCanSelect();
      return (o) => {
        var r;
        t && e.toggleSelected((r = o.target) == null ? void 0 : r.checked);
      };
    };
  }
}, po = (e, n, t, o, r) => {
  var a;
  const l = r.getRow(n, !0);
  t ? (l.getCanMultiSelect() || Object.keys(e).forEach((s) => delete e[s]), l.getCanSelect() && (e[n] = !0)) : delete e[n], o && (a = l.subRows) != null && a.length && l.getCanSelectSubRows() && l.subRows.forEach((s) => po(e, s.id, t, o, r));
};
function Hn(e, n) {
  const t = e.getState().rowSelection, o = [], r = {}, a = function(l, s) {
    return l.map((i) => {
      var u;
      const c = Uo(i, t);
      if (c && (o.push(i), r[i.id] = i), (u = i.subRows) != null && u.length && (i = {
        ...i,
        subRows: a(i.subRows)
      }), c)
        return i;
    }).filter(Boolean);
  };
  return {
    rows: a(n.rows),
    flatRows: o,
    rowsById: r
  };
}
function Uo(e, n) {
  var t;
  return (t = n[e.id]) != null ? t : !1;
}
function go(e, n, t) {
  var o;
  if (!((o = e.subRows) != null && o.length)) return !1;
  let r = !0, a = !1;
  return e.subRows.forEach((l) => {
    if (!(a && !r) && (l.getCanSelect() && (Uo(l, n) ? a = !0 : r = !1), l.subRows && l.subRows.length)) {
      const s = go(l, n);
      s === "all" ? a = !0 : (s === "some" && (a = !0), r = !1);
    }
  }), r ? "all" : a ? "some" : !1;
}
const mo = /([0-9]+)/gm, qp = (e, n, t) => Wa(st(e.getValue(t)).toLowerCase(), st(n.getValue(t)).toLowerCase()), Fp = (e, n, t) => Wa(st(e.getValue(t)), st(n.getValue(t))), Dp = (e, n, t) => Ko(st(e.getValue(t)).toLowerCase(), st(n.getValue(t)).toLowerCase()), Bp = (e, n, t) => Ko(st(e.getValue(t)), st(n.getValue(t))), Tp = (e, n, t) => {
  const o = e.getValue(t), r = n.getValue(t);
  return o > r ? 1 : o < r ? -1 : 0;
}, Vp = (e, n, t) => Ko(e.getValue(t), n.getValue(t));
function Ko(e, n) {
  return e === n ? 0 : e > n ? 1 : -1;
}
function st(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Wa(e, n) {
  const t = e.split(mo).filter(Boolean), o = n.split(mo).filter(Boolean);
  for (; t.length && o.length; ) {
    const r = t.shift(), a = o.shift(), l = parseInt(r, 10), s = parseInt(a, 10), i = [l, s].sort();
    if (isNaN(i[0])) {
      if (r > a)
        return 1;
      if (a > r)
        return -1;
      continue;
    }
    if (isNaN(i[1]))
      return isNaN(l) ? -1 : 1;
    if (l > s)
      return 1;
    if (s > l)
      return -1;
  }
  return t.length - o.length;
}
const qt = {
  alphanumeric: qp,
  alphanumericCaseSensitive: Fp,
  text: Dp,
  textCaseSensitive: Bp,
  datetime: Tp,
  basic: Vp
}, Lp = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: ke("sorting", e),
    isMultiSortEvent: (n) => n.shiftKey
  }),
  createColumn: (e, n) => {
    e.getAutoSortingFn = () => {
      const t = n.getFilteredRowModel().flatRows.slice(10);
      let o = !1;
      for (const r of t) {
        const a = r?.getValue(e.id);
        if (Object.prototype.toString.call(a) === "[object Date]")
          return qt.datetime;
        if (typeof a == "string" && (o = !0, a.split(mo).length > 1))
          return qt.alphanumeric;
      }
      return o ? qt.text : qt.basic;
    }, e.getAutoSortDir = () => {
      const t = n.getFilteredRowModel().flatRows[0];
      return typeof t?.getValue(e.id) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var t, o;
      if (!e)
        throw new Error();
      return xn(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (t = (o = n.options.sortingFns) == null ? void 0 : o[e.columnDef.sortingFn]) != null ? t : qt[e.columnDef.sortingFn];
    }, e.toggleSorting = (t, o) => {
      const r = e.getNextSortingOrder(), a = typeof t < "u" && t !== null;
      n.setSorting((l) => {
        const s = l?.find((p) => p.id === e.id), i = l?.findIndex((p) => p.id === e.id);
        let u = [], c, f = a ? t : r === "desc";
        if (l != null && l.length && e.getCanMultiSort() && o ? s ? c = "toggle" : c = "add" : l != null && l.length && i !== l.length - 1 ? c = "replace" : s ? c = "toggle" : c = "replace", c === "toggle" && (a || r || (c = "remove")), c === "add") {
          var g;
          u = [...l, {
            id: e.id,
            desc: f
          }], u.splice(0, u.length - ((g = n.options.maxMultiSortColCount) != null ? g : Number.MAX_SAFE_INTEGER));
        } else c === "toggle" ? u = l.map((p) => p.id === e.id ? {
          ...p,
          desc: f
        } : p) : c === "remove" ? u = l.filter((p) => p.id !== e.id) : u = [{
          id: e.id,
          desc: f
        }];
        return u;
      });
    }, e.getFirstSortDir = () => {
      var t, o;
      return ((t = (o = e.columnDef.sortDescFirst) != null ? o : n.options.sortDescFirst) != null ? t : e.getAutoSortDir() === "desc") ? "desc" : "asc";
    }, e.getNextSortingOrder = (t) => {
      var o, r;
      const a = e.getFirstSortDir(), l = e.getIsSorted();
      return l ? l !== a && ((o = n.options.enableSortingRemoval) == null || o) && // If enableSortRemove, enable in general
      (!(t && (r = n.options.enableMultiRemove) != null) || r) ? !1 : l === "desc" ? "asc" : "desc" : a;
    }, e.getCanSort = () => {
      var t, o;
      return ((t = e.columnDef.enableSorting) != null ? t : !0) && ((o = n.options.enableSorting) != null ? o : !0) && !!e.accessorFn;
    }, e.getCanMultiSort = () => {
      var t, o;
      return (t = (o = e.columnDef.enableMultiSort) != null ? o : n.options.enableMultiSort) != null ? t : !!e.accessorFn;
    }, e.getIsSorted = () => {
      var t;
      const o = (t = n.getState().sorting) == null ? void 0 : t.find((r) => r.id === e.id);
      return o ? o.desc ? "desc" : "asc" : !1;
    }, e.getSortIndex = () => {
      var t, o;
      return (t = (o = n.getState().sorting) == null ? void 0 : o.findIndex((r) => r.id === e.id)) != null ? t : -1;
    }, e.clearSorting = () => {
      n.setSorting((t) => t != null && t.length ? t.filter((o) => o.id !== e.id) : []);
    }, e.getToggleSortingHandler = () => {
      const t = e.getCanSort();
      return (o) => {
        t && (o.persist == null || o.persist(), e.toggleSorting == null || e.toggleSorting(void 0, e.getCanMultiSort() ? n.options.isMultiSortEvent == null ? void 0 : n.options.isMultiSortEvent(o) : !1));
      };
    };
  },
  createTable: (e) => {
    e.setSorting = (n) => e.options.onSortingChange == null ? void 0 : e.options.onSortingChange(n), e.resetSorting = (n) => {
      var t, o;
      e.setSorting(n ? [] : (t = (o = e.initialState) == null ? void 0 : o.sorting) != null ? t : []);
    }, e.getPreSortedRowModel = () => e.getGroupedRowModel(), e.getSortedRowModel = () => (!e._getSortedRowModel && e.options.getSortedRowModel && (e._getSortedRowModel = e.options.getSortedRowModel(e)), e.options.manualSorting || !e._getSortedRowModel ? e.getPreSortedRowModel() : e._getSortedRowModel());
  }
}, zp = [
  ip,
  $p,
  Cp,
  Sp,
  up,
  dp,
  kp,
  //depends on ColumnFaceting
  Ap,
  //depends on ColumnFiltering
  Lp,
  _p,
  //depends on RowSorting
  Ip,
  Ep,
  Mp,
  Op,
  Rp
];
function Np(e) {
  var n, t;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const o = [...zp, ...(n = e._features) != null ? n : []];
  let r = {
    _features: o
  };
  const a = r._features.reduce((g, p) => Object.assign(g, p.getDefaultOptions == null ? void 0 : p.getDefaultOptions(r)), {}), l = (g) => r.options.mergeOptions ? r.options.mergeOptions(a, g) : {
    ...a,
    ...g
  };
  let i = {
    ...{},
    ...(t = e.initialState) != null ? t : {}
  };
  r._features.forEach((g) => {
    var p;
    i = (p = g.getInitialState == null ? void 0 : g.getInitialState(i)) != null ? p : i;
  });
  const u = [];
  let c = !1;
  const f = {
    _features: o,
    options: {
      ...a,
      ...e
    },
    initialState: i,
    _queue: (g) => {
      u.push(g), c || (c = !0, Promise.resolve().then(() => {
        for (; u.length; )
          u.shift()();
        c = !1;
      }).catch((p) => setTimeout(() => {
        throw p;
      })));
    },
    reset: () => {
      r.setState(r.initialState);
    },
    setOptions: (g) => {
      const p = ot(g, r.options);
      r.options = l(p);
    },
    getState: () => r.options.state,
    setState: (g) => {
      r.options.onStateChange == null || r.options.onStateChange(g);
    },
    _getRowId: (g, p, m) => {
      var v;
      return (v = r.options.getRowId == null ? void 0 : r.options.getRowId(g, p, m)) != null ? v : `${m ? [m.id, p].join(".") : p}`;
    },
    getCoreRowModel: () => (r._getCoreRowModel || (r._getCoreRowModel = r.options.getCoreRowModel(r)), r._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => r.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (g, p) => {
      let m = (p ? r.getPrePaginationRowModel() : r.getRowModel()).rowsById[g];
      if (!m && (m = r.getCoreRowModel().rowsById[g], !m))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${g}`) : new Error();
      return m;
    },
    _getDefaultColumnDef: z(() => [r.options.defaultColumn], (g) => {
      var p;
      return g = (p = g) != null ? p : {}, {
        header: (m) => {
          const v = m.header.column.columnDef;
          return v.accessorKey ? v.accessorKey : v.accessorFn ? v.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (m) => {
          var v, w;
          return (v = (w = m.renderValue()) == null || w.toString == null ? void 0 : w.toString()) != null ? v : null;
        },
        ...r._features.reduce((m, v) => Object.assign(m, v.getDefaultColumnDef == null ? void 0 : v.getDefaultColumnDef()), {}),
        ...g
      };
    }, N(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => r.options.columns,
    getAllColumns: z(() => [r._getColumnDefs()], (g) => {
      const p = function(m, v, w) {
        return w === void 0 && (w = 0), m.map((_) => {
          const $ = sp(r, _, w, v), S = _;
          return $.columns = S.columns ? p(S.columns, $, w + 1) : [], $;
        });
      };
      return p(g);
    }, N(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: z(() => [r.getAllColumns()], (g) => g.flatMap((p) => p.getFlatColumns()), N(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: z(() => [r.getAllFlatColumns()], (g) => g.reduce((p, m) => (p[m.id] = m, p), {}), N(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: z(() => [r.getAllColumns(), r._getOrderColumnsFn()], (g, p) => {
      let m = g.flatMap((v) => v.getLeafColumns());
      return p(m);
    }, N(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (g) => {
      const p = r._getAllFlatColumnsById()[g];
      return process.env.NODE_ENV !== "production" && !p && console.error(`[Table] Column with id '${g}' does not exist.`), p;
    }
  };
  Object.assign(r, f);
  for (let g = 0; g < r._features.length; g++) {
    const p = r._features[g];
    p == null || p.createTable == null || p.createTable(r);
  }
  return r;
}
function Hp() {
  return (e) => z(() => [e.options.data], (n) => {
    const t = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, o = function(r, a, l) {
      a === void 0 && (a = 0);
      const s = [];
      for (let u = 0; u < r.length; u++) {
        const c = Go(e, e._getRowId(r[u], u, l), r[u], u, a, void 0, l?.id);
        if (t.flatRows.push(c), t.rowsById[c.id] = c, s.push(c), e.options.getSubRows) {
          var i;
          c.originalSubRows = e.options.getSubRows(r[u], u), (i = c.originalSubRows) != null && i.length && (c.subRows = o(c.originalSubRows, a + 1, c));
        }
      }
      return s;
    };
    return t.rows = o(n), t;
  }, N(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function Gp() {
  return (e) => z(() => [e.getState().expanded, e.getPreExpandedRowModel(), e.options.paginateExpandedRows], (n, t, o) => !t.rows.length || n !== !0 && !Object.keys(n ?? {}).length || !o ? t : Xa(t), N(e.options, "debugTable", "getExpandedRowModel"));
}
function Xa(e) {
  const n = [], t = (o) => {
    var r;
    n.push(o), (r = o.subRows) != null && r.length && o.getIsExpanded() && o.subRows.forEach(t);
  };
  return e.rows.forEach(t), {
    rows: n,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
function jp(e, n, t) {
  return t.options.filterFromLeafRows ? Up(e, n, t) : Kp(e, n, t);
}
function Up(e, n, t) {
  var o;
  const r = [], a = {}, l = (o = t.options.maxLeafRowFilterDepth) != null ? o : 100, s = function(i, u) {
    u === void 0 && (u = 0);
    const c = [];
    for (let g = 0; g < i.length; g++) {
      var f;
      let p = i[g];
      const m = Go(t, p.id, p.original, p.index, p.depth, void 0, p.parentId);
      if (m.columnFilters = p.columnFilters, (f = p.subRows) != null && f.length && u < l) {
        if (m.subRows = s(p.subRows, u + 1), p = m, n(p) && !m.subRows.length) {
          c.push(p), a[p.id] = p, r.push(p);
          continue;
        }
        if (n(p) || m.subRows.length) {
          c.push(p), a[p.id] = p, r.push(p);
          continue;
        }
      } else
        p = m, n(p) && (c.push(p), a[p.id] = p, r.push(p));
    }
    return c;
  };
  return {
    rows: s(e),
    flatRows: r,
    rowsById: a
  };
}
function Kp(e, n, t) {
  var o;
  const r = [], a = {}, l = (o = t.options.maxLeafRowFilterDepth) != null ? o : 100, s = function(i, u) {
    u === void 0 && (u = 0);
    const c = [];
    for (let g = 0; g < i.length; g++) {
      let p = i[g];
      if (n(p)) {
        var f;
        if ((f = p.subRows) != null && f.length && u < l) {
          const v = Go(t, p.id, p.original, p.index, p.depth, void 0, p.parentId);
          v.subRows = s(p.subRows, u + 1), p = v;
        }
        c.push(p), r.push(p), a[p.id] = p;
      }
    }
    return c;
  };
  return {
    rows: s(e),
    flatRows: r,
    rowsById: a
  };
}
function Wp() {
  return (e) => z(() => [e.getPreFilteredRowModel(), e.getState().columnFilters, e.getState().globalFilter], (n, t, o) => {
    if (!n.rows.length || !(t != null && t.length) && !o) {
      for (let g = 0; g < n.flatRows.length; g++)
        n.flatRows[g].columnFilters = {}, n.flatRows[g].columnFiltersMeta = {};
      return n;
    }
    const r = [], a = [];
    (t ?? []).forEach((g) => {
      var p;
      const m = e.getColumn(g.id);
      if (!m)
        return;
      const v = m.getFilterFn();
      if (!v) {
        process.env.NODE_ENV !== "production" && console.warn(`Could not find a valid 'column.filterFn' for column with the ID: ${m.id}.`);
        return;
      }
      r.push({
        id: g.id,
        filterFn: v,
        resolvedValue: (p = v.resolveFilterValue == null ? void 0 : v.resolveFilterValue(g.value)) != null ? p : g.value
      });
    });
    const l = (t ?? []).map((g) => g.id), s = e.getGlobalFilterFn(), i = e.getAllLeafColumns().filter((g) => g.getCanGlobalFilter());
    o && s && i.length && (l.push("__global__"), i.forEach((g) => {
      var p;
      a.push({
        id: g.id,
        filterFn: s,
        resolvedValue: (p = s.resolveFilterValue == null ? void 0 : s.resolveFilterValue(o)) != null ? p : o
      });
    }));
    let u, c;
    for (let g = 0; g < n.flatRows.length; g++) {
      const p = n.flatRows[g];
      if (p.columnFilters = {}, r.length)
        for (let m = 0; m < r.length; m++) {
          u = r[m];
          const v = u.id;
          p.columnFilters[v] = u.filterFn(p, v, u.resolvedValue, (w) => {
            p.columnFiltersMeta[v] = w;
          });
        }
      if (a.length) {
        for (let m = 0; m < a.length; m++) {
          c = a[m];
          const v = c.id;
          if (c.filterFn(p, v, c.resolvedValue, (w) => {
            p.columnFiltersMeta[v] = w;
          })) {
            p.columnFilters.__global__ = !0;
            break;
          }
        }
        p.columnFilters.__global__ !== !0 && (p.columnFilters.__global__ = !1);
      }
    }
    const f = (g) => {
      for (let p = 0; p < l.length; p++)
        if (g.columnFilters[l[p]] === !1)
          return !1;
      return !0;
    };
    return jp(n.rows, f, e);
  }, N(e.options, "debugTable", "getFilteredRowModel", () => e._autoResetPageIndex()));
}
function Xp(e) {
  return (n) => z(() => [n.getState().pagination, n.getPrePaginationRowModel(), n.options.paginateExpandedRows ? void 0 : n.getState().expanded], (t, o) => {
    if (!o.rows.length)
      return o;
    const {
      pageSize: r,
      pageIndex: a
    } = t;
    let {
      rows: l,
      flatRows: s,
      rowsById: i
    } = o;
    const u = r * a, c = u + r;
    l = l.slice(u, c);
    let f;
    n.options.paginateExpandedRows ? f = {
      rows: l,
      flatRows: s,
      rowsById: i
    } : f = Xa({
      rows: l,
      flatRows: s,
      rowsById: i
    }), f.flatRows = [];
    const g = (p) => {
      f.flatRows.push(p), p.subRows.length && p.subRows.forEach(g);
    };
    return f.rows.forEach(g), f;
  }, N(n.options, "debugTable", "getPaginationRowModel"));
}
function Yp() {
  return (e) => z(() => [e.getState().sorting, e.getPreSortedRowModel()], (n, t) => {
    if (!t.rows.length || !(n != null && n.length))
      return t;
    const o = e.getState().sorting, r = [], a = o.filter((i) => {
      var u;
      return (u = e.getColumn(i.id)) == null ? void 0 : u.getCanSort();
    }), l = {};
    a.forEach((i) => {
      const u = e.getColumn(i.id);
      u && (l[i.id] = {
        sortUndefined: u.columnDef.sortUndefined,
        invertSorting: u.columnDef.invertSorting,
        sortingFn: u.getSortingFn()
      });
    });
    const s = (i) => {
      const u = i.map((c) => ({
        ...c
      }));
      return u.sort((c, f) => {
        for (let p = 0; p < a.length; p += 1) {
          var g;
          const m = a[p], v = l[m.id], w = v.sortUndefined, _ = (g = m?.desc) != null ? g : !1;
          let $ = 0;
          if (w) {
            const S = c.getValue(m.id), C = f.getValue(m.id), k = S === void 0, M = C === void 0;
            if (k || M) {
              if (w === "first") return k ? -1 : 1;
              if (w === "last") return k ? 1 : -1;
              $ = k && M ? 0 : k ? w : -w;
            }
          }
          if ($ === 0 && ($ = v.sortingFn(c, f, m.id)), $ !== 0)
            return _ && ($ *= -1), v.invertSorting && ($ *= -1), $;
        }
        return c.index - f.index;
      }), u.forEach((c) => {
        var f;
        r.push(c), (f = c.subRows) != null && f.length && (c.subRows = s(c.subRows));
      }), u;
    };
    return {
      rows: s(t.rows),
      flatRows: r,
      rowsById: t.rowsById
    };
  }, N(e.options, "debugTable", "getSortedRowModel", () => e._autoResetPageIndex()));
}
/**
   * vue-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function an() {
  return !0;
}
const Jp = Symbol("merge-proxy"), Zp = {
  get(e, n, t) {
    return n === Jp ? t : e.get(n);
  },
  has(e, n) {
    return e.has(n);
  },
  set: an,
  deleteProperty: an,
  getOwnPropertyDescriptor(e, n) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(n);
      },
      set: an,
      deleteProperty: an
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Gn(e) {
  return "value" in e ? e.value : e;
}
function Ft() {
  for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++)
    n[t] = arguments[t];
  return new Proxy({
    get(o) {
      for (let r = n.length - 1; r >= 0; r--) {
        const a = Gn(n[r])[o];
        if (a !== void 0) return a;
      }
    },
    has(o) {
      for (let r = n.length - 1; r >= 0; r--)
        if (o in Gn(n[r])) return !0;
      return !1;
    },
    keys() {
      const o = [];
      for (let r = 0; r < n.length; r++) o.push(...Object.keys(Gn(n[r])));
      return [...Array.from(new Set(o))];
    }
  }, Zp);
}
const Pr = b({
  props: ["render", "props"],
  setup: (e) => () => typeof e.render == "function" || typeof e.render == "object" ? Ce(e.render, e.props) : e.render
});
function $r(e) {
  return Ft(e, {
    data: d(e.data)
  });
}
function Qp(e) {
  const n = Xe(e.data), t = Ft({
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    mergeOptions(a, l) {
      return n ? {
        ...a,
        ...l
      } : Ft(a, l);
    }
  }, n ? $r(e) : e), o = Np(t);
  if (n) {
    const a = Nt(e.data);
    oe(a, () => {
      o.setState((l) => ({
        ...l,
        data: a.value
      }));
    }, {
      immediate: !0
    });
  }
  const r = I(o.initialState);
  return ge(() => {
    o.setOptions((a) => {
      var l;
      const s = new Proxy({}, {
        get: (i, u) => r.value[u]
      });
      return Ft(a, n ? $r(e) : e, {
        // merge the initialState and `options.state`
        // create a new proxy on each `setOptions` call
        // and get the value from state on each property access
        state: Ft(s, (l = e.state) != null ? l : {}),
        // Similarly, we'll maintain both our internal state and any user-provided
        // state.
        onStateChange: (i) => {
          i instanceof Function ? r.value = i(r.value) : r.value = i, e.onStateChange == null || e.onStateChange(i);
        }
      });
    });
  }), o;
}
const eg = {
  "data-slot": "table-container",
  class: "relative w-full overflow-auto"
}, tg = /* @__PURE__ */ b({
  __name: "Table",
  props: {
    class: {}
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), B("div", eg, [
      G("table", {
        "data-slot": "table",
        class: U(d(W)("w-full caption-bottom text-sm", n.class))
      }, [
        R(t.$slots, "default")
      ], 2)
    ]));
  }
}), ng = /* @__PURE__ */ b({
  __name: "TableBody",
  props: {
    class: {}
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), B("tbody", {
      "data-slot": "table-body",
      class: U(d(W)("[&_tr:last-child]:border-0", n.class))
    }, [
      R(t.$slots, "default")
    ], 2));
  }
}), kr = /* @__PURE__ */ b({
  __name: "TableCell",
  props: {
    class: {}
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), B("td", {
      "data-slot": "table-cell",
      class: U(
        d(W)(
          "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
          n.class
        )
      )
    }, [
      R(t.$slots, "default")
    ], 2));
  }
}), jn = /* @__PURE__ */ b({
  __name: "TableRow",
  props: {
    class: {}
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), B("tr", {
      "data-slot": "table-row",
      class: U(d(W)("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", n.class))
    }, [
      R(t.$slots, "default")
    ], 2));
  }
}), og = /* @__PURE__ */ b({
  __name: "TableHead",
  props: {
    class: {}
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), B("th", {
      "data-slot": "table-head",
      class: U(d(W)("text-muted-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", n.class))
    }, [
      R(t.$slots, "default")
    ], 2));
  }
}), rg = /* @__PURE__ */ b({
  __name: "TableHeader",
  props: {
    class: {}
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), B("thead", {
      "data-slot": "table-header",
      class: U(d(W)("[&_tr]:border-b", n.class))
    }, [
      R(t.$slots, "default")
    ], 2));
  }
}), ag = /* @__PURE__ */ b({
  __name: "Select",
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    defaultValue: {},
    modelValue: {},
    by: { type: [String, Function] },
    dir: {},
    multiple: { type: Boolean },
    autocomplete: {},
    disabled: { type: Boolean },
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue", "update:open"],
  setup(e, { emit: n }) {
    const r = he(e, n);
    return (a, l) => (y(), x(d(yc), F({ "data-slot": "select" }, d(r)), {
      default: h(() => [
        R(a.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), lg = /* @__PURE__ */ b({
  inheritAttrs: !1,
  __name: "SelectContent",
  props: {
    forceMount: { type: Boolean },
    position: { default: "popper" },
    bodyLock: { type: Boolean },
    side: {},
    sideOffset: {},
    sideFlip: { type: Boolean },
    align: {},
    alignOffset: {},
    alignFlip: { type: Boolean },
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["closeAutoFocus", "escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: n }) {
    const t = e, o = n, r = fe(t, "class"), a = he(r, o);
    return (l, s) => (y(), x(d(Nc), null, {
      default: h(() => [
        A(d(Ec), F({ "data-slot": "select-content" }, { ...d(a), ...l.$attrs }, {
          class: d(W)(
            "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--reka-select-content-available-height) min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
            e.position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            t.class
          )
        }), {
          default: h(() => [
            A(d(dg)),
            A(d(Qc), {
              class: U(d(W)("p-1", e.position === "popper" && "h-[var(--reka-select-trigger-height)] w-full min-w-[var(--reka-select-trigger-width)] scroll-my-1"))
            }, {
              default: h(() => [
                R(l.$slots, "default")
              ]),
              _: 3
            }, 8, ["class"]),
            A(d(ug))
          ]),
          _: 3
        }, 16, ["class"])
      ]),
      _: 3
    }));
  }
}), sg = { class: "absolute right-2 flex size-3.5 items-center justify-center" }, ig = /* @__PURE__ */ b({
  __name: "SelectItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const n = e, t = fe(n, "class"), o = xe(t);
    return (r, a) => (y(), x(d(Dc), F({ "data-slot": "select-item" }, d(o), {
      class: d(W)(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        n.class
      )
    }), {
      default: h(() => [
        G("span", sg, [
          A(d(Tc), null, {
            default: h(() => [
              A(d(Va), { class: "size-4" })
            ]),
            _: 1
          })
        ]),
        A(d(Lc), null, {
          default: h(() => [
            R(r.$slots, "default")
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), ug = /* @__PURE__ */ b({
  __name: "SelectScrollDownButton",
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const n = e, t = fe(n, "class"), o = xe(t);
    return (r, a) => (y(), x(d(jc), F({ "data-slot": "select-scroll-down-button" }, d(o), {
      class: d(W)("flex cursor-default items-center justify-center py-1", n.class)
    }), {
      default: h(() => [
        R(r.$slots, "default", {}, () => [
          A(d(No), { class: "size-4" })
        ])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), dg = /* @__PURE__ */ b({
  __name: "SelectScrollUpButton",
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const n = e, t = fe(n, "class"), o = xe(t);
    return (r, a) => (y(), x(d(Kc), F({ "data-slot": "select-scroll-up-button" }, d(o), {
      class: d(W)("flex cursor-default items-center justify-center py-1", n.class)
    }), {
      default: h(() => [
        R(r.$slots, "default", {}, () => [
          A(d(Ff), { class: "size-4" })
        ])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), cg = /* @__PURE__ */ b({
  __name: "SelectTrigger",
  props: {
    disabled: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    class: {},
    size: { default: "default" }
  },
  setup(e) {
    const n = e, t = fe(n, "class", "size"), o = xe(t);
    return (r, a) => (y(), x(d(Xc), F({
      "data-slot": "select-trigger",
      "data-size": e.size
    }, d(o), {
      class: d(W)(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        n.class
      )
    }), {
      default: h(() => [
        R(r.$slots, "default"),
        A(d(Oc), { "as-child": "" }, {
          default: h(() => [
            A(d(No), { class: "size-4 opacity-50" })
          ]),
          _: 1
        })
      ]),
      _: 3
    }, 16, ["data-size", "class"]));
  }
}), fg = /* @__PURE__ */ b({
  __name: "SelectValue",
  props: {
    placeholder: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const n = e;
    return (t, o) => (y(), x(d(Jc), F({ "data-slot": "select-value" }, n), {
      default: h(() => [
        R(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), pg = { class: "flex items-center justify-between px-2" }, gg = { class: "flex-1 text-sm text-muted-foreground hidden" }, mg = { class: "" }, vg = { class: "flex items-center space-x-2" }, hg = { class: "ml-2 text-sm font-medium" }, yg = { class: "flex items-center space-x-6 lg:space-x-8" }, wg = { class: "flex w-[120px] items-center justify-end text-sm font-medium" }, _g = { class: "flex items-center space-x-2" }, bg = /* @__PURE__ */ b({
  __name: "DataTablePagination",
  props: {
    table: {}
  },
  emits: ["updatePageSize"],
  setup(e, { emit: n }) {
    const t = e, o = n, r = [5, 10, 20, 40, 9999];
    function a(s) {
      return r.indexOf(s) === r.length - 1 ? "Alle" : `${s}`;
    }
    function l(s) {
      t.table.setPageSize(s);
      const i = parseInt(`${s}`) ?? 10;
      o("updatePageSize", i);
    }
    return (s, i) => (y(), B("div", pg, [
      G("div", gg, [
        G("span", mg, Z(e.table.getFilteredSelectedRowModel().rows.length) + " of " + Z(e.table.getFilteredRowModel().rows.length) + " row(s) selected.", 1)
      ]),
      G("div", vg, [
        i[4] || (i[4] = G("p", {
          class: "text-sm font-medium",
          style: { margin: "0 0.5rem 0 0" }
        }, "Anzahl pro Seite", -1)),
        A(d(ag), {
          "model-value": `${e.table.getState().pagination.pageSize}`,
          "onUpdate:modelValue": l
        }, {
          default: h(() => [
            A(d(cg), { class: "h-8 w-[80px]" }, {
              default: h(() => [
                A(d(fg), {
                  placeholder: `${a(e.table.getState().pagination.pageSize)}`
                }, null, 8, ["placeholder"])
              ]),
              _: 1
            }),
            A(d(lg), { side: "top" }, {
              default: h(() => [
                (y(), B(de, null, Oe(r, (u) => A(d(ig), {
                  key: u,
                  value: `${u}`
                }, {
                  default: h(() => [
                    we(Z(a(u)), 1)
                  ]),
                  _: 2
                }, 1032, ["value"])), 64))
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["model-value"]),
        G("span", hg, "Insgesamt: " + Z(e.table.getFilteredRowModel().rows.length), 1)
      ]),
      G("div", yg, [
        G("div", wg, " Seite " + Z(e.table.getState().pagination.pageIndex + 1) + " von " + Z(e.table.getPageCount()), 1),
        G("div", _g, [
          A(d(Ve), {
            variant: "outline",
            class: "w-8 h-8 p-0 lg:flex",
            disabled: !e.table.getCanPreviousPage(),
            onClick: i[0] || (i[0] = (u) => e.table.setPageIndex(0))
          }, {
            default: h(() => [...i[5] || (i[5] = [
              G("span", { class: "sr-only" }, "Go to first page", -1),
              G("i", {
                class: "fas fa-arrow-alt-to-left w-4 h-4",
                style: { margin: "0" }
              }, null, -1)
            ])]),
            _: 1
          }, 8, ["disabled"]),
          A(d(Ve), {
            variant: "outline",
            class: "w-8 h-8 p-0",
            style: { "margin-left": "0.25rem" },
            disabled: !e.table.getCanPreviousPage(),
            onClick: i[1] || (i[1] = (u) => e.table.previousPage())
          }, {
            default: h(() => [...i[6] || (i[6] = [
              G("span", { class: "sr-only" }, "Go to previous page", -1),
              G("i", {
                class: "fas fa-chevron-left w-4 h-4",
                style: { margin: "0" }
              }, null, -1)
            ])]),
            _: 1
          }, 8, ["disabled"]),
          A(d(Ve), {
            variant: "outline",
            class: "w-8 h-8 p-0",
            style: { "margin-left": "0.25rem" },
            disabled: !e.table.getCanNextPage(),
            onClick: i[2] || (i[2] = (u) => e.table.nextPage())
          }, {
            default: h(() => [...i[7] || (i[7] = [
              G("span", { class: "sr-only" }, "Go to next page", -1),
              G("i", {
                class: "fas fa-chevron-right w-4 h-4",
                style: { margin: "0" }
              }, null, -1)
            ])]),
            _: 1
          }, 8, ["disabled"]),
          A(d(Ve), {
            variant: "outline",
            class: "w-8 h-8 p-0 lg:flex",
            style: { "margin-left": "0.25rem" },
            disabled: !e.table.getCanNextPage(),
            onClick: i[3] || (i[3] = (u) => e.table.setPageIndex(e.table.getPageCount() - 1))
          }, {
            default: h(() => [...i[8] || (i[8] = [
              G("span", { class: "sr-only" }, "Go to last page", -1),
              G("i", {
                class: "fas fa-arrow-alt-to-right w-4 h-4",
                style: { margin: "0" }
              }, null, -1)
            ])]),
            _: 1
          }, 8, ["disabled"])
        ])
      ])
    ]));
  }
}), Ya = /* @__PURE__ */ b({
  __name: "DropdownMenu",
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    dir: {},
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(e, { emit: n }) {
    const r = he(e, n);
    return (a, l) => (y(), x(d(Yd), F({ "data-slot": "dropdown-menu" }, d(r)), {
      default: h(() => [
        R(a.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Cg = { class: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center" }, Sg = /* @__PURE__ */ b({
  __name: "DropdownMenuCheckboxItem",
  props: {
    modelValue: { type: [Boolean, String] },
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["select", "update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, o = n, r = fe(t, "class"), a = he(r, o);
    return (l, s) => (y(), x(d(Kd), F({ "data-slot": "dropdown-menu-checkbox-item" }, d(a), {
      class: d(W)(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        t.class
      )
    }), {
      default: h(() => [
        G("span", Cg, [
          A(d(nc), null, {
            default: h(() => [
              A(d(Va), { class: "size-4" })
            ]),
            _: 1
          })
        ]),
        R(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Ja = /* @__PURE__ */ b({
  __name: "DropdownMenuContent",
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    side: {},
    sideOffset: { default: 4 },
    sideFlip: { type: Boolean },
    align: {},
    alignOffset: {},
    alignFlip: { type: Boolean },
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(e, { emit: n }) {
    const t = e, o = n, r = fe(t, "class"), a = he(r, o);
    return (l, s) => (y(), x(d(lc), null, {
      default: h(() => [
        A(d(Zd), F({ "data-slot": "dropdown-menu-content" }, d(a), {
          class: d(W)("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--reka-dropdown-menu-content-available-height) min-w-[8rem] origin-(--reka-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md", t.class)
        }), {
          default: h(() => [
            R(l.$slots, "default")
          ]),
          _: 3
        }, 16, ["class"])
      ]),
      _: 3
    }));
  }
}), Un = /* @__PURE__ */ b({
  __name: "DropdownMenuItem",
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {},
    inset: { type: Boolean },
    variant: { default: "default" }
  },
  setup(e) {
    const n = e, t = fe(n, "inset", "variant", "class"), o = xe(t);
    return (r, a) => (y(), x(d(ec), F({
      "data-slot": "dropdown-menu-item",
      "data-inset": e.inset ? "" : void 0,
      "data-variant": e.variant
    }, d(o), {
      class: d(W)("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", n.class)
    }), {
      default: h(() => [
        R(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["data-inset", "data-variant", "class"]));
  }
}), xg = /* @__PURE__ */ b({
  __name: "DropdownMenuLabel",
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {},
    inset: { type: Boolean }
  },
  setup(e) {
    const n = e, t = fe(n, "class", "inset"), o = xe(t);
    return (r, a) => (y(), x(d(rc), F({
      "data-slot": "dropdown-menu-label",
      "data-inset": e.inset ? "" : void 0
    }, d(o), {
      class: d(W)("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", n.class)
    }), {
      default: h(() => [
        R(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["data-inset", "class"]));
  }
}), Za = /* @__PURE__ */ b({
  __name: "DropdownMenuSeparator",
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const n = e, t = fe(n, "class");
    return (o, r) => (y(), x(d(ic), F({ "data-slot": "dropdown-menu-separator" }, d(t), {
      class: d(W)("bg-border -mx-1 my-1 h-px", n.class)
    }), null, 16, ["class"]));
  }
}), Qa = /* @__PURE__ */ b({
  __name: "DropdownMenuTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = xe(e);
    return (o, r) => (y(), x(d(dc), F({ "data-slot": "dropdown-menu-trigger" }, d(t)), {
      default: h(() => [
        R(o.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Rg = { key: 1 }, Pg = /* @__PURE__ */ b({
  __name: "DataTableVisibilitySettings",
  props: {
    table: {}
  },
  setup(e) {
    const n = e, t = q(
      () => n.table.getAllColumns().filter((o) => typeof o.accessorFn < "u" && o.getCanHide() && o.id !== "id")
    );
    return (o, r) => t.value.length > 0 ? (y(), x(d(Ya), { key: 0 }, {
      default: h(() => [
        A(d(Qa), { "as-child": "" }, {
          default: h(() => [
            A(d(Ve), {
              variant: "outline",
              size: "sm",
              class: "h-8 ml-auto lg:flex"
            }, {
              default: h(() => [...r[0] || (r[0] = [
                G("i", { class: "fas fa-sliders-h w-4 h-4 mr-2" }, null, -1),
                G("span", null, "Ansicht", -1)
              ])]),
              _: 1
            })
          ]),
          _: 1
        }),
        A(d(Ja), {
          align: "end",
          class: "w-[150px]"
        }, {
          default: h(() => [
            A(d(xg), null, {
              default: h(() => [...r[1] || (r[1] = [
                we("Einzelne Spalten ein-/ausblenden", -1)
              ])]),
              _: 1
            }),
            A(d(Za)),
            (y(!0), B(de, null, Oe(t.value, (a) => (y(), x(d(Sg), {
              key: a.id,
              class: "capitalize",
              modelValue: a.getIsVisible(),
              "onUpdate:modelValue": (l) => a.toggleVisibility(!!l)
            }, {
              default: h(() => [
                we(Z(a.id), 1)
              ]),
              _: 2
            }, 1032, ["modelValue", "onUpdate:modelValue"]))), 128))
          ]),
          _: 1
        })
      ]),
      _: 1
    })) : (y(), B("div", Rg));
  }
}), $g = /* @__PURE__ */ b({
  __name: "Input",
  props: {
    defaultValue: {},
    modelValue: {},
    class: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, r = /* @__PURE__ */ If(t, "modelValue", n, {
      passive: !0,
      defaultValue: t.defaultValue
    });
    return (a, l) => ul((y(), B("input", {
      "onUpdate:modelValue": l[0] || (l[0] = (s) => Xe(r) ? r.value = s : null),
      "data-slot": "input",
      class: U(d(W)(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        t.class
      ))
    }, null, 2)), [
      [dl, d(r)]
    ]);
  }
}), kg = { class: "flex" }, Ag = /* @__PURE__ */ b({
  __name: "DataTableFilter",
  props: {
    table: {}
  },
  setup(e) {
    return (n, t) => (y(), B("div", kg, [
      t[0] || (t[0] = G("span", { class: "my-auto mr-2 hidden" }, "Filter: ", -1)),
      A($g, {
        "onUpdate:modelValue": e.table.setGlobalFilter,
        placeholder: "Suche",
        class: "h-8 ml-auto lg:flex"
      }, null, 8, ["onUpdate:modelValue"])
    ]));
  }
}), Ig = { class: "flex justify-between mb-2 mt-4" }, Eg = { class: "border border-black/25 rounded-md p-1" }, Mg = { class: "mt-2" }, Og = /* @__PURE__ */ b({
  name: "DataTable",
  __name: "DataTable",
  props: {
    columns: {},
    data: {},
    pageSize: {},
    columnVisibility: {},
    nothingFoundText: {}
  },
  emits: ["updateVisibility"],
  setup(e, { emit: n }) {
    const t = e, o = n, r = I([
      {
        id: "id",
        desc: !1
      }
    ]), a = I(t.columnVisibility ?? {}), l = I(""), s = I({}), i = Qp({
      get data() {
        return t.data;
      },
      get columns() {
        return t.columns;
      },
      initialState: {
        pagination: {
          pageSize: t.pageSize ?? 5
        }
      },
      state: {
        get sorting() {
          return r.value;
        },
        get columnVisibility() {
          return a.value;
        },
        get globalFilter() {
          return l.value;
        },
        get expanded() {
          return s.value;
        }
      },
      getCoreRowModel: Hp(),
      getPaginationRowModel: Xp(),
      getSortedRowModel: Yp(),
      onSortingChange: (u) => Yt(u, r),
      onGlobalFilterChange: (u) => {
        Yt(u, l);
      },
      getFilteredRowModel: Wp(),
      onColumnVisibilityChange: (u) => {
        Yt(u, a), o("updateVisibility", a.value);
      },
      getExpandedRowModel: Gp(),
      onExpandedChange: (u) => Yt(u, s),
      getSubRows: (u) => u.children,
      filterFromLeafRows: !0,
      maxLeafRowFilterDepth: 1,
      paginateExpandedRows: !1
    });
    return (u, c) => (y(), B(de, null, [
      G("div", Ig, [
        R(u.$slots, "default"),
        A(Ag, {
          table: d(i),
          class: "mx-2 first:ml-0"
        }, null, 8, ["table"]),
        A(Pg, { table: d(i) }, null, 8, ["table"])
      ]),
      G("div", Eg, [
        A(d(tg), null, {
          default: h(() => [
            A(d(rg), null, {
              default: h(() => [
                (y(!0), B(de, null, Oe(d(i).getHeaderGroups(), (f) => (y(), x(d(jn), {
                  key: f.id,
                  class: "border-black/25"
                }, {
                  default: h(() => [
                    (y(!0), B(de, null, Oe(f.headers, (g) => (y(), x(d(og), {
                      key: g.id
                    }, {
                      default: h(() => [
                        g.isPlaceholder ? Y("", !0) : (y(), x(d(Pr), {
                          key: 0,
                          render: g.column.columnDef.header,
                          props: g.getContext()
                        }, null, 8, ["render", "props"]))
                      ]),
                      _: 2
                    }, 1024))), 128))
                  ]),
                  _: 2
                }, 1024))), 128))
              ]),
              _: 1
            }),
            A(d(ng), null, {
              default: h(() => [
                d(i).getRowModel().rows.length ? (y(!0), B(de, { key: 0 }, Oe(d(i).getRowModel().rows, (f) => (y(), x(d(jn), {
                  key: f.id,
                  "data-state": f.getIsSelected() ? "selected" : void 0,
                  class: "border-black/25"
                }, {
                  default: h(() => [
                    (y(!0), B(de, null, Oe(f.getVisibleCells(), (g) => (y(), x(d(kr), {
                      key: g.id
                    }, {
                      default: h(() => [
                        A(d(Pr), {
                          render: g.column.columnDef.cell,
                          props: g.getContext()
                        }, null, 8, ["render", "props"])
                      ]),
                      _: 2
                    }, 1024))), 128))
                  ]),
                  _: 2
                }, 1032, ["data-state"]))), 128)) : (y(), x(d(jn), { key: 1 }, {
                  default: h(() => [
                    A(d(kr), {
                      colspan: e.columns.length,
                      class: "text-center h-20"
                    }, {
                      default: h(() => [
                        we(Z(e.nothingFoundText ?? "Keine Ergebnisse gefunden."), 1)
                      ]),
                      _: 1
                    }, 8, ["colspan"])
                  ]),
                  _: 1
                }))
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      G("div", Mg, [
        A(bg, { table: d(i) }, null, 8, ["table"])
      ])
    ], 64));
  }
}), qg = {
  key: 0,
  class: "ml-2"
}, Fg = {
  key: 1,
  class: "fas fa-arrow-down w-4 h-4 ml-2"
}, Dg = {
  key: 2,
  class: "fas fa-arrow-up w-4 h-4 ml-2"
}, Bg = {
  key: 3,
  class: "fas fa-sort-alt w-4 h-4 ml-2"
}, Tg = {
  inheritAttrs: !1
}, Vg = /* @__PURE__ */ b({
  ...Tg,
  __name: "DataTableHeader",
  props: {
    column: {},
    title: {},
    hint: {},
    classesBtn: {}
  },
  setup(e) {
    return (n, t) => e.column.getCanSort() || e.column.getCanHide() ? (y(), B("div", {
      key: 0,
      class: U(d(W)("flex space-x-2", n.$attrs.class ?? ""))
    }, [
      A(d(Ya), null, {
        default: h(() => [
          A(d(Qa), { "as-child": "" }, {
            default: h(() => [
              A(d(Ve), {
                variant: "ghost",
                size: "sm",
                class: U(["-ml-3 h-8 data-[state=open]:bg-accent", e.classesBtn])
              }, {
                default: h(() => [
                  G("span", null, Z(e.title), 1),
                  e.hint ? (y(), B("span", qg, [
                    A(Ho, { content: e.hint }, null, 8, ["content"])
                  ])) : Y("", !0),
                  e.column.getIsSorted() === "desc" ? (y(), B("i", Fg)) : e.column.getIsSorted() === "asc" ? (y(), B("i", Dg)) : e.column.getCanSort() ? (y(), B("i", Bg)) : Y("", !0)
                ]),
                _: 1
              }, 8, ["class"])
            ]),
            _: 1
          }),
          A(d(Ja), { align: "start" }, {
            default: h(() => [
              e.column.getCanSort() ? (y(), B(de, { key: 0 }, [
                A(d(Un), {
                  onClick: t[0] || (t[0] = (o) => e.column.toggleSorting(!1))
                }, {
                  default: h(() => [...t[3] || (t[3] = [
                    G("i", { class: "fas fa-arrow-up mr-2 h-3.5 w-3.5 text-muted-foreground/70" }, null, -1),
                    we(" Aufsteigend ", -1)
                  ])]),
                  _: 1
                }),
                A(d(Un), {
                  onClick: t[1] || (t[1] = (o) => e.column.toggleSorting(!0))
                }, {
                  default: h(() => [...t[4] || (t[4] = [
                    G("i", { class: "fas fa-arrow-down mr-2 h-3.5 w-3.5 text-muted-foreground/70" }, null, -1),
                    we(" Absteigend ", -1)
                  ])]),
                  _: 1
                })
              ], 64)) : Y("", !0),
              e.column.getCanSort() && e.column.getCanHide() ? (y(), x(d(Za), { key: 1 })) : Y("", !0),
              e.column.getCanHide() ? (y(), x(d(Un), {
                key: 2,
                onClick: t[2] || (t[2] = (o) => e.column.toggleVisibility(!1))
              }, {
                default: h(() => [...t[5] || (t[5] = [
                  G("i", { class: "fas fa-eye-slash mr-2 h-3.5 w-3.5 text-muted-foreground/70" }, null, -1),
                  we(" Ausblenden ", -1)
                ])]),
                _: 1
              })) : Y("", !0)
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ], 2)) : (y(), B("div", {
      key: 1,
      class: U(n.$attrs.class)
    }, Z(e.title), 3));
  }
}), Lg = /* @__PURE__ */ b({
  __name: "Switch",
  props: {
    defaultValue: { type: Boolean },
    modelValue: { type: [Boolean, null] },
    disabled: { type: Boolean },
    id: {},
    value: {},
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean },
    class: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, o = n, r = fe(t, "class"), a = he(r, o);
    return (l, s) => (y(), x(d(of), F({ "data-slot": "switch" }, d(a), {
      class: d(W)(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        t.class
      )
    }), {
      default: h(() => [
        A(d(af), {
          "data-slot": "switch-thumb",
          class: U(d(W)("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"))
        }, {
          default: h(() => [
            R(l.$slots, "thumb")
          ]),
          _: 3
        }, 8, ["class"])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), zg = { class: "text-xl size-5" }, Ng = /* @__PURE__ */ b({
  __name: "ToggleSwitch",
  props: {
    initialValue: { type: Boolean },
    label: {}
  },
  emits: ["update"],
  setup(e, { emit: n }) {
    const o = I(!!e.initialValue), r = n;
    return (a, l) => (y(), B("div", zg, [
      A(Lg, {
        class: "",
        modelValue: o.value,
        "onUpdate:modelValue": [
          l[0] || (l[0] = (s) => o.value = s),
          l[1] || (l[1] = (s) => r("update", s))
        ]
      }, {
        default: h(() => [
          we(Z(e.label), 1)
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]));
  }
}), Hg = /* @__PURE__ */ b({
  __name: "Accordion",
  props: {
    collapsible: { type: Boolean },
    disabled: { type: Boolean },
    dir: {},
    orientation: {},
    unmountOnHide: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    type: {},
    modelValue: {},
    defaultValue: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const r = he(e, n);
    return (a, l) => (y(), x(d(Ys), F({ "data-slot": "accordion" }, d(r)), {
      default: h(() => [
        R(a.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Gg = /* @__PURE__ */ b({
  __name: "AccordionContent",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const n = e, t = fe(n, "class");
    return (o, r) => (y(), x(d(ti), F({ "data-slot": "accordion-content" }, d(t), { class: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm" }), {
      default: h(() => [
        G("div", {
          class: U(d(W)("pt-0 pb-4", n.class))
        }, [
          R(o.$slots, "default")
        ], 2)
      ]),
      _: 3
    }, 16));
  }
}), jg = /* @__PURE__ */ b({
  __name: "AccordionItem",
  props: {
    disabled: { type: Boolean },
    value: {},
    unmountOnHide: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const n = e, t = fe(n, "class"), o = xe(t);
    return (r, a) => (y(), x(d(Qs), F({ "data-slot": "accordion-item" }, d(o), {
      class: d(W)("border-b last:border-b-0", n.class)
    }), {
      default: h(() => [
        R(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Ug = /* @__PURE__ */ b({
  __name: "AccordionTrigger",
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const n = e, t = fe(n, "class");
    return (o, r) => (y(), x(d(oi), { class: "flex" }, {
      default: h(() => [
        A(d(ai), F({ "data-slot": "accordion-trigger" }, d(t), {
          class: d(W)(
            "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
            n.class
          )
        }), {
          default: h(() => [
            R(o.$slots, "default"),
            R(o.$slots, "icon", {}, () => [
              A(d(No), { class: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })
            ])
          ]),
          _: 3
        }, 16, ["class"])
      ]),
      _: 3
    }));
  }
}), Kg = /* @__PURE__ */ b({
  name: "ArchiveParent",
  __name: "ArchiveParent",
  setup(e) {
    return (n, t) => (y(), x(d(Hg), {
      type: "single",
      collapsible: ""
    }, {
      default: h(() => [
        A(d(jg), { value: "item-1" }, {
          default: h(() => [
            A(d(Ug), null, {
              icon: h(() => [...t[1] || (t[1] = [
                G("div", null, null, -1)
              ])]),
              default: h(() => [
                R(n.$slots, "trigger", {}, () => [
                  A(d(Ve), {
                    variant: "outline",
                    class: "bg-[#cacbcd] pr-1",
                    style: { "font-size": "1rem" }
                  }, {
                    default: h(() => [...t[0] || (t[0] = [
                      G("span", null, "Archiv", -1),
                      G("i", { class: "fas fa-archive" }, null, -1)
                    ])]),
                    _: 1
                  })
                ])
              ]),
              _: 3
            }),
            A(d(Gg), null, {
              default: h(() => [
                R(n.$slots, "default")
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
}), vo = {
  SimpleCard: jl,
  ConfirmDialog: Hf,
  Dashboard: Gf,
  MultiTextCard: Uf,
  AdvancedCard: Xf,
  StyledCard: Yf,
  StyledMultiCard: op,
  HintTooltip: Ho,
  DataTable: Og,
  DataTableHeader: Vg,
  ToggleSwitch: Ng,
  ArchiveParent: Kg
};
function ho(e) {
  return e in vo ? vo[e] : Ul;
}
function Wg() {
  return {
    install(e, n) {
      for (const t of Object.values(vo))
        t.name ? e.component(t.name, t) : console.error("Every shared component needs a name");
      return e;
    }
  };
}
export {
  Xf as AdvancedCard,
  Kg as ArchiveParent,
  Hf as ConfirmDialog,
  Gf as Dashboard,
  Og as DataTable,
  Vg as DataTableHeader,
  Ho as HintTooltip,
  Uf as MultiTextCard,
  jl as SimpleCard,
  Yf as StyledCard,
  op as StyledMultiCard,
  Ng as ToggleSwitch,
  Zg as ViteLoader,
  ho as getCadiComponent,
  Wg as getPlugin
};
