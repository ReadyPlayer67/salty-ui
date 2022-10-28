import { defineComponent as v, computed as f, createVNode as i, mergeProps as z, inject as y, Fragment as I, toRefs as V, ref as g, provide as p } from "vue";
const A = {
  modelValue: {
    type: String,
    default: ""
  },
  editable: {
    type: Boolean,
    default: !1
  }
}, w = {
  name: {
    type: String,
    default: ""
  },
  prefix: {
    type: String,
    default: "icon"
  },
  size: {
    type: [String, Number],
    default: ""
  },
  color: {
    type: String,
    default: "inherit"
  },
  component: {
    type: String,
    default: null
  }
};
v({
  name: "SIcon",
  props: w,
  setup(e, {
    attrs: t
  }) {
    const c = f(() => typeof e.size == "number" ? `${e.size}px` : e.size), a = i("img", z({
      src: e.name,
      style: {
        width: c.value,
        verticalAlign: "middle"
      }
    }, t), null), n = i("span", {
      style: {
        fontSize: c.value,
        color: e.color
      },
      class: [e.prefix, `${e.prefix}-${e.name}`]
    }, null), d = i("svg", {
      class: "icon",
      style: {
        fontSize: c.value
      }
    }, [i("use", {
      "xlink:href": `#${e.prefix}-${e.component}`,
      fill: e.color
    }, null)]), m = e.component ? d : /http|https/.test(e.name) ? a : n;
    return () => m;
  }
});
const U = (e) => {
  const t = e.size ? typeof e.size == "number" ? `${e.size}px` : e.size : void 0, c = e.color ? e.color : "black";
  return i("svg", {
    viewBox: "0 0 1024 1024",
    style: {
      width: t,
      height: t,
      fill: c,
      stroke: c
    }
  }, [i("path", {
    d: "M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"
  }, null)]);
}, S = v({
  name: "STab",
  props: {
    id: {
      type: String,
      required: !0
    },
    title: {
      type: String,
      required: !0
    },
    type: {
      type: String,
      default: ""
    }
  },
  setup(e, {
    slots: t
  }) {
    const c = y("ACTIVE_TAB"), a = y("TABS_DATA");
    return e.type !== "random" && a.value.push({
      id: e.id,
      title: e.title
    }), () => {
      var n;
      return i(I, null, [e.id === c.value && i("div", {
        class: "s-tab"
      }, [(n = t.default) == null ? void 0 : n.call(t)])]);
    };
  }
});
let s;
const C = new Uint8Array(16);
function D() {
  if (!s && (s = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !s))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return s(C);
}
const l = [];
for (let e = 0; e < 256; ++e)
  l.push((e + 256).toString(16).slice(1));
function B(e, t = 0) {
  return (l[e[t + 0]] + l[e[t + 1]] + l[e[t + 2]] + l[e[t + 3]] + "-" + l[e[t + 4]] + l[e[t + 5]] + "-" + l[e[t + 6]] + l[e[t + 7]] + "-" + l[e[t + 8]] + l[e[t + 9]] + "-" + l[e[t + 10]] + l[e[t + 11]] + l[e[t + 12]] + l[e[t + 13]] + l[e[t + 14]] + l[e[t + 15]]).toLowerCase();
}
const L = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), h = {
  randomUUID: L
};
function k(e, t, c) {
  if (h.randomUUID && !t && !e)
    return h.randomUUID();
  e = e || {};
  const a = e.random || (e.rng || D)();
  if (a[6] = a[6] & 15 | 64, a[8] = a[8] & 63 | 128, t) {
    c = c || 0;
    for (let n = 0; n < 16; ++n)
      t[c + n] = a[n];
    return t;
  }
  return B(a);
}
const _ = v({
  name: "STab",
  props: A,
  emits: ["update:modelValue"],
  setup(e, {
    slots: t
  }) {
    const {
      modelValue: c,
      editable: a
    } = V(e), n = g([]);
    p("TABS_DATA", n);
    const d = g(c.value);
    p("ACTIVE_TAB", d);
    const m = (u) => {
      d.value = u;
    }, T = (u, o) => {
      o.stopPropagation();
      const r = n.value.findIndex((x) => x.id === u);
      d.value === u && (r === n.value.length - 1 ? d.value = n.value[r - 1].id : d.value = n.value[r + 1].id), n.value.splice(r, 1);
    }, b = () => {
      const u = k();
      n.value.push({
        id: u,
        type: "random",
        title: "New Tab",
        content: "New Tab Content"
      }), d.value = u;
    };
    return () => {
      var u;
      return i("div", {
        class: "s-tabs"
      }, [i("ul", {
        class: "s-tabs__nav"
      }, [n.value.map((o) => i("li", {
        class: o.id === d.value ? "active" : "",
        onClick: () => m(o.id)
      }, [o.title, a.value && n.value.length > 1 && i(U, {
        size: "12",
        color: "grey",
        onClick: (r) => T(o.id, r),
        style: "margin-left: 8px;"
      }, null)])), a.value && i("li", null, [i("svg", {
        onClick: b,
        viewBox: "0 0 1024 1024",
        width: "14",
        height: "14"
      }, [i("path", {
        d: "M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z"
      }, null)])])]), (u = t.default) == null ? void 0 : u.call(t), n.value.filter((o) => o.type === "random").map((o) => i(S, {
        type: "random",
        id: o.id,
        title: o.title
      }, {
        default: () => [o.content]
      }))]);
    };
  }
}), R = {
  install(e) {
    e.component("STabs", _), e.component("STab", S);
  }
};
export {
  S as Tab,
  _ as Tabs,
  R as default
};
