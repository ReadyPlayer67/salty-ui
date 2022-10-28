import { computed as C, ref as k, reactive as B, unref as $, defineComponent as w, toRefs as P, inject as j, createVNode as f, mergeProps as E, withDirectives as R, vModelCheckbox as q, onMounted as U, provide as Y } from "vue";
const V = {
  data: {
    type: Object,
    required: !0
  },
  checkable: {
    type: Boolean,
    default: !1
  },
  operable: {
    type: Boolean,
    default: !1
  },
  dragdrop: {
    type: [Boolean, Object],
    default: !1
  },
  height: {
    type: Number
  },
  itemHeight: {
    type: Number,
    default: 30
  }
};
function M(l, t = 0, e = []) {
  return t++, l.reduce((s, r) => {
    const a = { ...r };
    if (a.level = t, e.length && (a.parentId = e[e.length - 1].id), a.children) {
      const n = M(a.children, t, [...e, a]);
      return delete a.children, s.concat(a, n);
    } else
      return a.isLeaf === void 0 && (a.isLeaf = !0), s.concat(a);
  }, []);
}
function A(l) {
  const t = C(() => {
    let n = [], o = [];
    for (const d of l.value)
      n.includes(d) || (d.expanded !== !0 && (n = [...n, ...e(d)]), o.push(d));
    return o;
  }), e = (n, o = !0) => {
    let d = [];
    const m = l.value.findIndex((p) => p.id === n.id);
    for (let p = m + 1; p < l.value.length && n.level < l.value[p].level; p++)
      (o || n.level === l.value[p].level - 1) && d.push(l.value[p]);
    return d;
  };
  return {
    expandedTree: t,
    getChildren: e,
    getIndex: (n) => n ? l.value.findIndex((o) => o.id === n.id) : -1,
    getNode: (n) => l.value.find((o) => o.id === n.id),
    getParent: (n) => l.value.find((o) => o.id === n.parentId)
  };
}
function G(l, t, e, s) {
  return {
    toggleNode: (a) => {
      const { lazyLoadNodes: n } = s, o = l.value.find((d) => d.id === a.id);
      o && (o.expanded = !o.expanded, o.expanded && n(o));
    }
  };
}
function F(l, t) {
  const { getChildren: e } = t;
  return {
    toggleCheckNode: (r) => {
      r.checked = !r.checked, e(r).forEach((d) => {
        d.checked = r.checked;
      });
      const a = l.value.find((d) => d.id === r.parentId);
      if (!a)
        return;
      const n = e(a, !1), o = n.filter((d) => d.checked);
      n.length === o.length ? a.checked = !0 : a.checked = !1;
    }
  };
}
function J(l = 8) {
  const t = "abcdefghijklmnopqrstuvwxyz0123456789";
  let e = "";
  for (let s = 0; s < l; s++)
    e += t[parseInt((Math.random() * t.length).toString())];
  return e;
}
function K(l, t) {
  const { getChildren: e, getIndex: s } = t;
  return {
    append: (n, o) => {
      const d = e(n, !1), m = d[d.length - 1];
      let p = s(n) + 1;
      m && (p = s(m) + 1), n.expanded = !0, n.isLeaf = !1;
      const v = k({
        ...o,
        level: n.level + 1,
        isLeaf: !0,
        parentId: n.id
      });
      v.value.id === void 0 && (v.value.id = J()), l.value.splice(p, 0, v.value);
    },
    remove: (n) => {
      const o = e(n).map((d) => d.id);
      l.value = l.value.filter((d) => d.id !== n.id && !o.includes(d.id));
    }
  };
}
function Q(l, t, { emit: e }) {
  const { getNode: s, getIndex: r, getChildren: a } = t, n = (p) => {
    const v = s(p);
    v && v.isLeaf === !1 && !v.childNodeCount && (v.loading = !0, e("lazy-load", v, o));
  }, o = (p) => {
    const v = s(p.node);
    if (v) {
      v.loading = !1;
      const h = k(
        M(p.treeItems, v.level)
      );
      d(v, h), m(v, h), v.childNodeCount = a(v).length;
    }
  }, d = (p, v) => {
    v.value.forEach((h) => {
      h.level - 1 === p.level && !h.parentId && (h.parentId = p.id);
    });
  }, m = (p, v) => {
    const h = r(p);
    h > -1 && l.value.splice(h + 1, 0, ...v.value);
  };
  return {
    lazyLoadNodes: n
  };
}
const z = {
  dropPrev: "s-tree__node--drop-prev",
  dropNext: "s-tree__node--drop-next",
  dropInner: "s-tree__node--drop-inner"
};
function W(l, t, { getChildren: e, getParent: s }) {
  const r = B({
    dropType: void 0,
    draggingNode: null,
    draggingTreeNode: null
  }), a = C(
    () => t.value.reduce(
      (i, c) => ({
        ...i,
        [c.id]: c
      }),
      {}
    )
  ), n = (i) => {
    i == null || i.classList.remove(...Object.values(z));
  }, o = (i, c) => {
    var u;
    const g = (u = a.value[i]) == null ? void 0 : u.parentId;
    return g === c ? !0 : g !== void 0 ? o(g, c) : !1;
  }, d = () => {
    r.dropType = void 0, r.draggingNode = null, r.draggingTreeNode = null;
  }, m = (i, c) => {
    var g;
    i.stopPropagation(), r.draggingNode = i.target, r.draggingTreeNode = c, (g = i.dataTransfer) == null || g.setData("dragNodeId", c.id);
  }, p = (i) => {
    if (i.preventDefault(), i.stopPropagation(), !!r.draggingNode && l) {
      if (i.dataTransfer && (i.dataTransfer.dropEffect = "move"), !t)
        return;
      let c = {};
      typeof l == "object" ? c = l : l && (c = { dropInner: !0 });
      const { dropPrev: g, dropNext: u, dropInner: x } = c;
      let y;
      const T = g ? x ? 0.25 : u ? 0.45 : 1 : -1, b = u ? x ? 0.75 : g ? 0.55 : 0 : 1, N = i.currentTarget, L = N == null ? void 0 : N.getBoundingClientRect(), O = i.clientY - ((L == null ? void 0 : L.top) || 0);
      if (O < ((L == null ? void 0 : L.height) || 0) * T ? y = "dropPrev" : O > ((L == null ? void 0 : L.height) || 0) * b ? y = "dropNext" : x ? y = "dropInner" : y = void 0, y) {
        const _ = N == null ? void 0 : N.classList;
        _ && (_.contains(z[y]) || (n(N), _.add(z[y])));
      } else
        n(N);
      r.dropType = y;
    }
  }, v = (i) => {
    i.stopPropagation(), r.draggingNode && n(i.currentTarget);
  }, h = (i, c) => {
    var u;
    if (i.preventDefault(), i.stopPropagation(), n(i.currentTarget), !r.draggingNode || !l)
      return;
    const g = (u = i.dataTransfer) == null ? void 0 : u.getData("dragNodeId");
    if (g) {
      const x = o(c.id, g);
      if (g === c.id || x)
        return;
      r.dropType && I(g, c), d();
    }
  };
  function I(i, c) {
    const g = t.value.find((u) => u.id === i);
    if (g) {
      let u;
      const x = e(g), y = s(g);
      if (r.dropType === "dropInner") {
        u = {
          ...g,
          parentId: c.id,
          level: c.level + 1
        };
        const T = t.value.indexOf(c);
        t.value.splice(T + 1, 0, u), c.isLeaf = void 0;
        const b = t.value.indexOf(g);
        t.value.splice(b, 1);
      } else if (r.dropType === "dropNext") {
        u = {
          ...g,
          parentId: c.parentId,
          level: c.level
        };
        const T = t.value.indexOf(c), b = e(c, !0).length;
        t.value.splice(
          T + b + 1,
          0,
          u
        );
        const N = t.value.indexOf(g);
        t.value.splice(N, 1);
      } else if (r.dropType === "dropPrev") {
        u = {
          ...g,
          parentId: c.parentId,
          level: c.level
        };
        const T = t.value.indexOf(c);
        t.value.splice(T, 0, u);
        const b = t.value.indexOf(g);
        t.value.splice(b, 1);
      }
      r.dropType = "dropInner", x.forEach((T) => I(T.id, u)), y && e(y).length === 0 && (y.isLeaf = !0);
    }
  }
  return {
    onDragstart: m,
    onDragover: p,
    onDragleave: v,
    onDrop: h,
    onDragend: (i) => {
      i.preventDefault(), i.stopPropagation(), d();
    }
  };
}
function X(l, t, e) {
  const s = k(M($(l))), r = A(s), a = [G, F, K], n = Q(s, r, e), o = W(t.dragdrop, s, r), d = a.reduce((m, p) => ({ ...m, ...p(s, r, e, n) }), {});
  return {
    innerData: s,
    ...r,
    ...o,
    ...d
  };
}
const Z = {
  ...V,
  treeNode: {
    type: Object,
    required: !0
  }
}, S = 28, H = 24, ee = w({
  name: "STreeNode",
  props: Z,
  setup(l, {
    slots: t
  }) {
    const {
      treeNode: e,
      checkable: s,
      operable: r,
      dragdrop: a
    } = P(l), {
      toggleNode: n,
      toggleCheckNode: o,
      getChildren: d,
      append: m,
      remove: p,
      onDragstart: v,
      onDragend: h,
      onDragleave: I,
      onDragover: D,
      onDrop: i
    } = j("TREE_UTILS"), c = k(!1), g = () => {
      c.value = !c.value;
    };
    let u = {};
    return a && (u = {
      draggable: !0,
      onDragstart: (x) => v(x, e.value),
      onDragend: (x) => h(x),
      onDragleave: (x) => I(x),
      onDragover: (x) => D(x),
      onDrop: (x) => i(x, e.value)
    }), () => f("div", {
      class: "s-tree__node hover:bg-slate-100 relative leading-8",
      style: {
        paddingLeft: `${H * (e.value.level - 1)}px`
      },
      onMouseenter: g,
      onMouseleave: g
    }, [!e.value.isLeaf && e.value.expanded && f("span", {
      class: "s-tree-node_vline absolute w-px bg-gray-300",
      style: {
        height: `${S * d(e.value).length}px`,
        left: `${H * (e.value.level - 1) + 12}px`,
        top: `${S}px`
      }
    }, null), f("div", E({
      class: "s-node__node-content"
    }, u), [e.value.isLeaf ? f("span", {
      style: {
        display: "inline-block",
        width: "25px"
      }
    }, null) : t.icon(), s.value && f("span", {
      class: `relative ${e.value.checked ? "s-tree__inChecked" : ""}`
    }, [R(f("input", {
      type: "checkbox",
      style: {
        marginRight: "8px"
      },
      "onUpdate:modelValue": (x) => e.value.checked = x,
      onClick: () => o(e.value)
    }, null), [[q, e.value.checked]])]), t.content(), r.value && c.value && f("span", {
      class: "inline-flex ml-1"
    }, [f("svg", {
      onClick: () => {
        m(e.value, {
          label: "\u65B0\u8282\u70B9"
        });
      },
      viewBox: "0 0 1024 1024",
      width: "14",
      height: "14",
      class: "cursor-pointer"
    }, [f("path", {
      d: "M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z"
    }, null)]), f("svg", {
      onClick: () => {
        p(e.value);
      },
      viewBox: "0 0 1024 1024",
      width: "14",
      height: "14",
      class: "cursor-pointer ml-1"
    }, [f("path", {
      d: "M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"
    }, null)])]), e.value.loading && t.loading()])]);
  }
}), ne = w({
  props: {
    expanded: {
      type: Boolean,
      required: !0
    }
  },
  emits: ["click"],
  setup(l, {
    emit: t
  }) {
    return () => f("svg", {
      onClick: () => t("click"),
      style: {
        width: "25px",
        height: "15px",
        display: "inline-block",
        cursor: "pointer",
        transform: l.expanded ? "rotate(90deg)" : ""
      },
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    }, [f("path", {
      fill: "currentColor",
      d: "M384 192v640l384-320.064z"
    }, null)]);
  }
}), te = {
  data: {
    type: Array,
    required: !0
  },
  itemHeight: {
    type: Number,
    default: 24
  },
  component: {
    type: String,
    default: "div"
  }
}, le = w({
  name: "SVirtualList",
  props: te,
  setup: function(l, {
    slots: t
  }) {
    const {
      data: e,
      itemHeight: s,
      component: r
    } = P(l), a = k(), n = k(0), o = k(0), d = C(() => Math.ceil(n.value / s.value)), m = C(() => e.value.slice(o.value, Math.min(o.value + d.value, e.value.length)));
    U(() => {
      n.value = a.value.clientHeight;
    });
    const p = k(0), v = (h) => {
      const {
        scrollTop: I
      } = h.target;
      o.value = Math.floor(I / s.value), p.value = I - I % s.value;
    };
    return () => f("div", {
      class: "s-virtual-list__container",
      ref: a,
      onScroll: v
    }, [f("div", {
      class: "s-virtual-list__blank",
      style: {
        height: `${e.value.length * s.value}px`
      }
    }, null), f("div", {
      class: "s-virtual-list",
      style: {
        transform: `translate3d(0,${p.value}px,0)`
      }
    }, [m.value.map((h, I) => {
      var D;
      return (D = t.default) == null ? void 0 : D.call(t, {
        item: h,
        index: I
      });
    })])]);
  }
}), oe = w({
  name: "STree",
  props: V,
  emits: ["lazy-load"],
  setup(l, t) {
    const {
      data: e,
      height: s,
      itemHeight: r
    } = P(l), {
      slots: a
    } = t, {
      expandedTree: n,
      toggleNode: o,
      getChildren: d,
      toggleCheckNode: m,
      append: p,
      remove: v,
      onDragstart: h,
      onDragend: I,
      onDragleave: D,
      onDragover: i,
      onDrop: c
    } = X(e, l, t);
    return Y("TREE_UTILS", {
      toggleNode: o,
      getChildren: d,
      toggleCheckNode: m,
      append: p,
      remove: v,
      onDragstart: h,
      onDragend: I,
      onDragleave: D,
      onDragover: i,
      onDrop: c
    }), () => {
      const g = (u) => f(ee, E(l, {
        treeNode: u
      }), {
        content: () => a.content ? a.content(u) : u.label,
        icon: () => a.icon ? a.icon({
          nodeData: u,
          toggleNode: o
        }) : f(ne, {
          expanded: !!u.expanded,
          onClick: () => {
            o(u);
          }
        }, null),
        loading: () => a.loading ? a.loading({
          nodeData: u
        }) : f("span", {
          class: "ml-1"
        }, [f("svg", {
          class: "rotating-icon",
          height: "16",
          width: "16",
          viewBox: "0 0 1024 1024",
          xmlns: "http://www.w3.org/2000/svg",
          style: "display:inline-block"
        }, [f("path", {
          fill: "currentColor",
          d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
        }, null)])])
      });
      return f("div", {
        class: "s-tree"
      }, [
        s != null && s.value ? f("div", {
          style: {
            height: `${s.value}px`
          }
        }, [f(le, {
          data: n.value,
          itemHeight: r.value
        }, {
          default: ({
            item: u
          }) => g(u)
        })]) : n.value.map((u) => g(u))
      ]);
    };
  }
}), ae = {
  install(l) {
    l.component("STree", oe);
  }
};
export {
  oe as Tree,
  ae as default
};
