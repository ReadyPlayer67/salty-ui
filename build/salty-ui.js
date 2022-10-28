import { defineComponent as N, toRefs as C, createVNode as f, computed as E, ref as O, reactive as Te, unref as qe, inject as j, mergeProps as Z, withDirectives as Fe, vModelCheckbox as Ne, onMounted as ae, provide as B, createTextVNode as G, watch as le, onUnmounted as Oe, Fragment as Ae } from "vue";
const Ee = {
  type: {
    type: String,
    default: "secondary"
  },
  size: {
    type: String,
    default: "medium"
  },
  disabled: {
    type: Boolean,
    default: !1
  },
  block: {
    type: Boolean,
    default: !1
  }
}, se = N({
  name: "SButton",
  props: Ee,
  setup(n, {
    slots: e
  }) {
    const {
      type: t,
      size: r,
      disabled: a,
      block: i
    } = C(n);
    return () => {
      const o = e.default ? e.default() : "\u6309\u94AE", l = i.value ? "s-btn--block" : "";
      return f("button", {
        disabled: a.value,
        class: `s-btn s-btn--${t.value} s-btn--${r.value} ${l}`
      }, [o]);
    };
  }
}), De = {
  install(n) {
    n.component(se.name, se);
  }
}, he = {
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
function ie(n, e = 0, t = []) {
  return e++, n.reduce((r, a) => {
    const i = { ...a };
    if (i.level = e, t.length && (i.parentId = t[t.length - 1].id), i.children) {
      const o = ie(i.children, e, [...t, i]);
      return delete i.children, r.concat(i, o);
    } else
      return i.isLeaf === void 0 && (i.isLeaf = !0), r.concat(i);
  }, []);
}
function Le(n) {
  const e = E(() => {
    let o = [], l = [];
    for (const s of n.value)
      o.includes(s) || (s.expanded !== !0 && (o = [...o, ...t(s)]), l.push(s));
    return l;
  }), t = (o, l = !0) => {
    let s = [];
    const m = n.value.findIndex((u) => u.id === o.id);
    for (let u = m + 1; u < n.value.length && o.level < n.value[u].level; u++)
      (l || o.level === n.value[u].level - 1) && s.push(n.value[u]);
    return s;
  };
  return {
    expandedTree: e,
    getChildren: t,
    getIndex: (o) => o ? n.value.findIndex((l) => l.id === o.id) : -1,
    getNode: (o) => n.value.find((l) => l.id === o.id),
    getParent: (o) => n.value.find((l) => l.id === o.parentId)
  };
}
function Ve(n, e, t, r) {
  return {
    toggleNode: (i) => {
      const { lazyLoadNodes: o } = r, l = n.value.find((s) => s.id === i.id);
      l && (l.expanded = !l.expanded, l.expanded && o(l));
    }
  };
}
function Ce(n, e) {
  const { getChildren: t } = e;
  return {
    toggleCheckNode: (a) => {
      a.checked = !a.checked, t(a).forEach((s) => {
        s.checked = a.checked;
      });
      const i = n.value.find((s) => s.id === a.parentId);
      if (!i)
        return;
      const o = t(i, !1), l = o.filter((s) => s.checked);
      o.length === l.length ? i.checked = !0 : i.checked = !1;
    }
  };
}
function ze(n = 8) {
  const e = "abcdefghijklmnopqrstuvwxyz0123456789";
  let t = "";
  for (let r = 0; r < n; r++)
    t += e[parseInt((Math.random() * e.length).toString())];
  return t;
}
function Me(n, e) {
  const { getChildren: t, getIndex: r } = e;
  return {
    append: (o, l) => {
      const s = t(o, !1), m = s[s.length - 1];
      let u = r(o) + 1;
      m && (u = r(m) + 1), o.expanded = !0, o.isLeaf = !1;
      const p = O({
        ...l,
        level: o.level + 1,
        isLeaf: !0,
        parentId: o.id
      });
      p.value.id === void 0 && (p.value.id = ze()), n.value.splice(u, 0, p.value);
    },
    remove: (o) => {
      const l = t(o).map((s) => s.id);
      n.value = n.value.filter((s) => s.id !== o.id && !l.includes(s.id));
    }
  };
}
function ke(n, e, { emit: t }) {
  const { getNode: r, getIndex: a, getChildren: i } = e, o = (u) => {
    const p = r(u);
    p && p.isLeaf === !1 && !p.childNodeCount && (p.loading = !0, t("lazy-load", p, l));
  }, l = (u) => {
    const p = r(u.node);
    if (p) {
      p.loading = !1;
      const y = O(
        ie(u.treeItems, p.level)
      );
      s(p, y), m(p, y), p.childNodeCount = i(p).length;
    }
  }, s = (u, p) => {
    p.value.forEach((y) => {
      y.level - 1 === u.level && !y.parentId && (y.parentId = u.id);
    });
  }, m = (u, p) => {
    const y = a(u);
    y > -1 && n.value.splice(y + 1, 0, ...p.value);
  };
  return {
    lazyLoadNodes: o
  };
}
const X = {
  dropPrev: "s-tree__node--drop-prev",
  dropNext: "s-tree__node--drop-next",
  dropInner: "s-tree__node--drop-inner"
};
function je(n, e, { getChildren: t, getParent: r }) {
  const a = Te({
    dropType: void 0,
    draggingNode: null,
    draggingTreeNode: null
  }), i = E(
    () => e.value.reduce(
      (c, g) => ({
        ...c,
        [g.id]: g
      }),
      {}
    )
  ), o = (c) => {
    c == null || c.classList.remove(...Object.values(X));
  }, l = (c, g) => {
    var h;
    const d = (h = i.value[c]) == null ? void 0 : h.parentId;
    return d === g ? !0 : d !== void 0 ? l(d, g) : !1;
  }, s = () => {
    a.dropType = void 0, a.draggingNode = null, a.draggingTreeNode = null;
  }, m = (c, g) => {
    var d;
    c.stopPropagation(), a.draggingNode = c.target, a.draggingTreeNode = g, (d = c.dataTransfer) == null || d.setData("dragNodeId", g.id);
  }, u = (c) => {
    if (c.preventDefault(), c.stopPropagation(), !!a.draggingNode && n) {
      if (c.dataTransfer && (c.dataTransfer.dropEffect = "move"), !e)
        return;
      let g = {};
      typeof n == "object" ? g = n : n && (g = { dropInner: !0 });
      const { dropPrev: d, dropNext: h, dropInner: v } = g;
      let b;
      const P = d ? v ? 0.25 : h ? 0.45 : 1 : -1, I = h ? v ? 0.75 : d ? 0.55 : 0 : 1, q = c.currentTarget, S = q == null ? void 0 : q.getBoundingClientRect(), V = c.clientY - ((S == null ? void 0 : S.top) || 0);
      if (V < ((S == null ? void 0 : S.height) || 0) * P ? b = "dropPrev" : V > ((S == null ? void 0 : S.height) || 0) * I ? b = "dropNext" : v ? b = "dropInner" : b = void 0, b) {
        const M = q == null ? void 0 : q.classList;
        M && (M.contains(X[b]) || (o(q), M.add(X[b])));
      } else
        o(q);
      a.dropType = b;
    }
  }, p = (c) => {
    c.stopPropagation(), a.draggingNode && o(c.currentTarget);
  }, y = (c, g) => {
    var h;
    if (c.preventDefault(), c.stopPropagation(), o(c.currentTarget), !a.draggingNode || !n)
      return;
    const d = (h = c.dataTransfer) == null ? void 0 : h.getData("dragNodeId");
    if (d) {
      const v = l(g.id, d);
      if (d === g.id || v)
        return;
      a.dropType && w(d, g), s();
    }
  };
  function w(c, g) {
    const d = e.value.find((h) => h.id === c);
    if (d) {
      let h;
      const v = t(d), b = r(d);
      if (a.dropType === "dropInner") {
        h = {
          ...d,
          parentId: g.id,
          level: g.level + 1
        };
        const P = e.value.indexOf(g);
        e.value.splice(P + 1, 0, h), g.isLeaf = void 0;
        const I = e.value.indexOf(d);
        e.value.splice(I, 1);
      } else if (a.dropType === "dropNext") {
        h = {
          ...d,
          parentId: g.parentId,
          level: g.level
        };
        const P = e.value.indexOf(g), I = t(g, !0).length;
        e.value.splice(
          P + I + 1,
          0,
          h
        );
        const q = e.value.indexOf(d);
        e.value.splice(q, 1);
      } else if (a.dropType === "dropPrev") {
        h = {
          ...d,
          parentId: g.parentId,
          level: g.level
        };
        const P = e.value.indexOf(g);
        e.value.splice(P, 0, h);
        const I = e.value.indexOf(d);
        e.value.splice(I, 1);
      }
      a.dropType = "dropInner", v.forEach((P) => w(P.id, h)), b && t(b).length === 0 && (b.isLeaf = !0);
    }
  }
  return {
    onDragstart: m,
    onDragover: u,
    onDragleave: p,
    onDrop: y,
    onDragend: (c) => {
      c.preventDefault(), c.stopPropagation(), s();
    }
  };
}
function Be(n, e, t) {
  const r = O(ie(qe(n))), a = Le(r), i = [Ve, Ce, Me], o = ke(r, a, t), l = je(e.dragdrop, r, a), s = i.reduce((m, u) => ({ ...m, ...u(r, a, t, o) }), {});
  return {
    innerData: r,
    ...a,
    ...l,
    ...s
  };
}
const Re = {
  ...he,
  treeNode: {
    type: Object,
    required: !0
  }
}, ue = 28, de = 24, $e = N({
  name: "STreeNode",
  props: Re,
  setup(n, {
    slots: e
  }) {
    const {
      treeNode: t,
      checkable: r,
      operable: a,
      dragdrop: i
    } = C(n), {
      toggleNode: o,
      toggleCheckNode: l,
      getChildren: s,
      append: m,
      remove: u,
      onDragstart: p,
      onDragend: y,
      onDragleave: w,
      onDragover: _,
      onDrop: c
    } = j("TREE_UTILS"), g = O(!1), d = () => {
      g.value = !g.value;
    };
    let h = {};
    return i && (h = {
      draggable: !0,
      onDragstart: (v) => p(v, t.value),
      onDragend: (v) => y(v),
      onDragleave: (v) => w(v),
      onDragover: (v) => _(v),
      onDrop: (v) => c(v, t.value)
    }), () => f("div", {
      class: "s-tree__node hover:bg-slate-100 relative leading-8",
      style: {
        paddingLeft: `${de * (t.value.level - 1)}px`
      },
      onMouseenter: d,
      onMouseleave: d
    }, [!t.value.isLeaf && t.value.expanded && f("span", {
      class: "s-tree-node_vline absolute w-px bg-gray-300",
      style: {
        height: `${ue * s(t.value).length}px`,
        left: `${de * (t.value.level - 1) + 12}px`,
        top: `${ue}px`
      }
    }, null), f("div", Z({
      class: "s-node__node-content"
    }, h), [t.value.isLeaf ? f("span", {
      style: {
        display: "inline-block",
        width: "25px"
      }
    }, null) : e.icon(), r.value && f("span", {
      class: `relative ${t.value.checked ? "s-tree__inChecked" : ""}`
    }, [Fe(f("input", {
      type: "checkbox",
      style: {
        marginRight: "8px"
      },
      "onUpdate:modelValue": (v) => t.value.checked = v,
      onClick: () => l(t.value)
    }, null), [[Ne, t.value.checked]])]), e.content(), a.value && g.value && f("span", {
      class: "inline-flex ml-1"
    }, [f("svg", {
      onClick: () => {
        m(t.value, {
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
        u(t.value);
      },
      viewBox: "0 0 1024 1024",
      width: "14",
      height: "14",
      class: "cursor-pointer ml-1"
    }, [f("path", {
      d: "M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"
    }, null)])]), t.value.loading && e.loading()])]);
  }
}), Ue = N({
  props: {
    expanded: {
      type: Boolean,
      required: !0
    }
  },
  emits: ["click"],
  setup(n, {
    emit: e
  }) {
    return () => f("svg", {
      onClick: () => e("click"),
      style: {
        width: "25px",
        height: "15px",
        display: "inline-block",
        cursor: "pointer",
        transform: n.expanded ? "rotate(90deg)" : ""
      },
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    }, [f("path", {
      fill: "currentColor",
      d: "M384 192v640l384-320.064z"
    }, null)]);
  }
}), He = {
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
}, Ye = N({
  name: "SVirtualList",
  props: He,
  setup: function(n, {
    slots: e
  }) {
    const {
      data: t,
      itemHeight: r,
      component: a
    } = C(n), i = O(), o = O(0), l = O(0), s = E(() => Math.ceil(o.value / r.value)), m = E(() => t.value.slice(l.value, Math.min(l.value + s.value, t.value.length)));
    ae(() => {
      o.value = i.value.clientHeight;
    });
    const u = O(0), p = (y) => {
      const {
        scrollTop: w
      } = y.target;
      l.value = Math.floor(w / r.value), u.value = w - w % r.value;
    };
    return () => f("div", {
      class: "s-virtual-list__container",
      ref: i,
      onScroll: p
    }, [f("div", {
      class: "s-virtual-list__blank",
      style: {
        height: `${t.value.length * r.value}px`
      }
    }, null), f("div", {
      class: "s-virtual-list",
      style: {
        transform: `translate3d(0,${u.value}px,0)`
      }
    }, [m.value.map((y, w) => {
      var _;
      return (_ = e.default) == null ? void 0 : _.call(e, {
        item: y,
        index: w
      });
    })])]);
  }
}), Je = N({
  name: "STree",
  props: he,
  emits: ["lazy-load"],
  setup(n, e) {
    const {
      data: t,
      height: r,
      itemHeight: a
    } = C(n), {
      slots: i
    } = e, {
      expandedTree: o,
      toggleNode: l,
      getChildren: s,
      toggleCheckNode: m,
      append: u,
      remove: p,
      onDragstart: y,
      onDragend: w,
      onDragleave: _,
      onDragover: c,
      onDrop: g
    } = Be(t, n, e);
    return B("TREE_UTILS", {
      toggleNode: l,
      getChildren: s,
      toggleCheckNode: m,
      append: u,
      remove: p,
      onDragstart: y,
      onDragend: w,
      onDragleave: _,
      onDragover: c,
      onDrop: g
    }), () => {
      const d = (h) => f($e, Z(n, {
        treeNode: h
      }), {
        content: () => i.content ? i.content(h) : h.label,
        icon: () => i.icon ? i.icon({
          nodeData: h,
          toggleNode: l
        }) : f(Ue, {
          expanded: !!h.expanded,
          onClick: () => {
            l(h);
          }
        }, null),
        loading: () => i.loading ? i.loading({
          nodeData: h
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
        r != null && r.value ? f("div", {
          style: {
            height: `${r.value}px`
          }
        }, [f(Ye, {
          data: o.value,
          itemHeight: a.value
        }, {
          default: ({
            item: h
          }) => d(h)
        })]) : o.value.map((h) => d(h))
      ]);
    };
  }
}), We = {
  install(n) {
    n.component("STree", Je);
  }
}, ye = {
  total: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pagerCount: {
    type: Number,
    default: 7
  },
  modelValue: {
    type: Number,
    default: 1
  }
};
function Ze(n = 1) {
  const e = O(n), t = (o) => {
    e.value = o;
  }, r = (o) => {
    e.value += o;
  };
  return { pageIndex: e, setPageIndex: t, jumpPage: r, prevPage: () => r(-1), nextPage: () => r(1) };
}
function Ge(n, e, t) {
  const r = Array.from(Array(n).keys());
  if (n <= t)
    return r.slice(2, n);
  {
    const a = Math.ceil(t / 2);
    return e <= a ? r.slice(2, t) : e >= n - a + 1 ? r.slice(n - t + 2, n) : r.slice(e - a + 2, e + a - 1);
  }
}
const Xe = ye, be = N({
  name: "SPager",
  props: Xe,
  setup(n) {
    const {
      total: e,
      pageSize: t,
      pagerCount: r
    } = C(n), {
      pageIndex: a,
      setPageIndex: i,
      jumpPage: o,
      prevPage: l,
      nextPage: s
    } = Ze(), m = E(() => Math.ceil(e.value / t.value)), u = E(() => Ge(m.value, a.value, r.value));
    return {
      totalPage: m,
      pageIndex: a,
      pagerCount: r,
      setPageIndex: i,
      jumpPage: o,
      prevPage: l,
      nextPage: s,
      centerPages: u
    };
  },
  render() {
    const {
      pageIndex: n,
      setPageIndex: e,
      totalPage: t,
      pagerCount: r,
      jumpPage: a,
      centerPages: i
    } = this;
    return f("ul", {
      class: "s-pager"
    }, [f("li", {
      class: {
        current: n === 1
      },
      onClick: () => e(1)
    }, [G("1")]), t > r && n > Math.ceil(r / 2) && f("li", {
      class: "more left",
      onClick: () => a(-5)
    }, [G("...")]), i.map((o) => f("li", {
      class: {
        current: n === o
      },
      onClick: () => e(o)
    }, [o])), t > r && n < t - Math.floor(r / 2) && f("li", {
      class: "more right",
      onClick: () => a(5)
    }, [G("...")]), t > 1 && f("li", {
      class: {
        current: n === t
      },
      onClick: () => e(t)
    }, [t])]);
  }
}), Ke = N({
  name: "SPagination",
  props: ye,
  emits: ["update:modelValue"],
  setup(n, {
    emit: e
  }) {
    const t = O(), r = E(() => t.value ? t.value.pageIndex < 2 : !0), a = E(() => t.value ? t.value.pageIndex > t.value.totalPage - 1 : !0);
    return ae(() => {
      le(() => n.modelValue, (i) => {
        t.value.pageIndex = i;
      }), le(() => t.value.pageIndex, (i) => {
        e("update:modelValue", i);
      });
    }), () => f("div", {
      class: "s-pagination"
    }, [f("button", {
      class: "pr-1",
      disabled: r.value,
      onClick: () => t.value.prevPage()
    }, [f("svg", {
      width: "12",
      height: "12",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    }, [f("path", {
      fill: "currentColor",
      d: "M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
    }, null)])]), f(be, Z({
      ref: t
    }, n), null), f("button", {
      class: "pl-1",
      disabled: a.value,
      onClick: () => t.value.nextPage()
    }, [f("svg", {
      width: "12",
      height: "12",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    }, [f("path", {
      fill: "currentColor",
      d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
    }, null)])])]);
  }
}), Qe = {
  install(n) {
    n.component("SPagination", Ke), n.component("SPager", be);
  }
}, et = {
  model: {
    type: Object,
    required: !0
  },
  layout: {
    type: String,
    default: "vertical"
  },
  labelSize: {
    type: String,
    default: "md"
  },
  labelAlign: {
    type: String,
    default: "start"
  },
  rules: {
    type: Object
  }
}, xe = Symbol("formContextToken"), tt = N({
  name: "SForm",
  props: et,
  emits: ["submit"],
  setup(n, {
    slots: e,
    emit: t,
    expose: r
  }) {
    const a = E(() => ({
      layout: n.layout,
      labelSize: n.labelSize,
      labelAlign: n.labelAlign
    }));
    B("LABEL_DATA", a);
    const i = /* @__PURE__ */ new Set(), o = (u) => i.add(u), l = (u) => i.delete(u);
    B(xe, {
      model: n.model,
      rules: n.rules,
      addItem: o,
      removeItem: l
    });
    const s = (u) => {
      u.preventDefault(), t("submit");
    };
    return r({
      validate: (u) => {
        const p = [];
        i.forEach((y) => p.push(y.validate())), Promise.all(p).then(() => {
          u(!0);
        }).catch(() => {
          u(!1);
        });
      }
    }), () => {
      var u;
      return f("form", {
        class: "s-form",
        onSubmit: s
      }, [(u = e.default) == null ? void 0 : u.call(e)]);
    };
  }
}), nt = {
  label: {
    type: String
  },
  field: {
    type: String
  }
};
function z() {
  return z = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, z.apply(this, arguments);
}
function rt(n, e) {
  n.prototype = Object.create(e.prototype), n.prototype.constructor = n, U(n, e);
}
function Q(n) {
  return Q = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, Q(n);
}
function U(n, e) {
  return U = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, a) {
    return r.__proto__ = a, r;
  }, U(n, e);
}
function at() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function W(n, e, t) {
  return at() ? W = Reflect.construct.bind() : W = function(a, i, o) {
    var l = [null];
    l.push.apply(l, i);
    var s = Function.bind.apply(a, l), m = new s();
    return o && U(m, o.prototype), m;
  }, W.apply(null, arguments);
}
function it(n) {
  return Function.toString.call(n).indexOf("[native code]") !== -1;
}
function ee(n) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return ee = function(r) {
    if (r === null || !it(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof e < "u") {
      if (e.has(r))
        return e.get(r);
      e.set(r, a);
    }
    function a() {
      return W(r, arguments, Q(this).constructor);
    }
    return a.prototype = Object.create(r.prototype, {
      constructor: {
        value: a,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), U(a, r);
  }, ee(n);
}
var ot = /%[sdj%]/g, we = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (we = function(e, t) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && t.every(function(r) {
    return typeof r == "string";
  }) && console.warn(e, t);
});
function te(n) {
  if (!n || !n.length)
    return null;
  var e = {};
  return n.forEach(function(t) {
    var r = t.field;
    e[r] = e[r] || [], e[r].push(t);
  }), e;
}
function A(n) {
  for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    t[r - 1] = arguments[r];
  var a = 0, i = t.length;
  if (typeof n == "function")
    return n.apply(null, t);
  if (typeof n == "string") {
    var o = n.replace(ot, function(l) {
      if (l === "%%")
        return "%";
      if (a >= i)
        return l;
      switch (l) {
        case "%s":
          return String(t[a++]);
        case "%d":
          return Number(t[a++]);
        case "%j":
          try {
            return JSON.stringify(t[a++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return l;
      }
    });
    return o;
  }
  return n;
}
function lt(n) {
  return n === "string" || n === "url" || n === "hex" || n === "email" || n === "date" || n === "pattern";
}
function T(n, e) {
  return !!(n == null || e === "array" && Array.isArray(n) && !n.length || lt(e) && typeof n == "string" && !n);
}
function st(n, e, t) {
  var r = [], a = 0, i = n.length;
  function o(l) {
    r.push.apply(r, l || []), a++, a === i && t(r);
  }
  n.forEach(function(l) {
    e(l, o);
  });
}
function ce(n, e, t) {
  var r = 0, a = n.length;
  function i(o) {
    if (o && o.length) {
      t(o);
      return;
    }
    var l = r;
    r = r + 1, l < a ? e(n[l], i) : t([]);
  }
  i([]);
}
function ut(n) {
  var e = [];
  return Object.keys(n).forEach(function(t) {
    e.push.apply(e, n[t] || []);
  }), e;
}
var fe = /* @__PURE__ */ function(n) {
  rt(e, n);
  function e(t, r) {
    var a;
    return a = n.call(this, "Async Validation Error") || this, a.errors = t, a.fields = r, a;
  }
  return e;
}(/* @__PURE__ */ ee(Error));
function dt(n, e, t, r, a) {
  if (e.first) {
    var i = new Promise(function(y, w) {
      var _ = function(d) {
        return r(d), d.length ? w(new fe(d, te(d))) : y(a);
      }, c = ut(n);
      ce(c, t, _);
    });
    return i.catch(function(y) {
      return y;
    }), i;
  }
  var o = e.firstFields === !0 ? Object.keys(n) : e.firstFields || [], l = Object.keys(n), s = l.length, m = 0, u = [], p = new Promise(function(y, w) {
    var _ = function(g) {
      if (u.push.apply(u, g), m++, m === s)
        return r(u), u.length ? w(new fe(u, te(u))) : y(a);
    };
    l.length || (r(u), y(a)), l.forEach(function(c) {
      var g = n[c];
      o.indexOf(c) !== -1 ? ce(g, t, _) : st(g, t, _);
    });
  });
  return p.catch(function(y) {
    return y;
  }), p;
}
function ct(n) {
  return !!(n && n.message !== void 0);
}
function ft(n, e) {
  for (var t = n, r = 0; r < e.length; r++) {
    if (t == null)
      return t;
    t = t[e[r]];
  }
  return t;
}
function pe(n, e) {
  return function(t) {
    var r;
    return n.fullFields ? r = ft(e, n.fullFields) : r = e[t.field || n.fullField], ct(t) ? (t.field = t.field || n.fullField, t.fieldValue = r, t) : {
      message: typeof t == "function" ? t() : t,
      fieldValue: r,
      field: t.field || n.fullField
    };
  };
}
function ge(n, e) {
  if (e) {
    for (var t in e)
      if (e.hasOwnProperty(t)) {
        var r = e[t];
        typeof r == "object" && typeof n[t] == "object" ? n[t] = z({}, n[t], r) : n[t] = r;
      }
  }
  return n;
}
var Pe = function(e, t, r, a, i, o) {
  e.required && (!r.hasOwnProperty(e.field) || T(t, o || e.type)) && a.push(A(i.messages.required, e.fullField));
}, pt = function(e, t, r, a, i) {
  (/^\s+$/.test(t) || t === "") && a.push(A(i.messages.whitespace, e.fullField));
}, Y, gt = function() {
  if (Y)
    return Y;
  var n = "[a-fA-F\\d:]", e = function(b) {
    return b && b.includeBoundaries ? "(?:(?<=\\s|^)(?=" + n + ")|(?<=" + n + ")(?=\\s|$))" : "";
  }, t = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", r = "[a-fA-F\\d]{1,4}", a = (`
(?:
(?:` + r + ":){7}(?:" + r + `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` + r + ":){6}(?:" + t + "|:" + r + `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` + r + ":){5}(?::" + t + "|(?::" + r + `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` + r + ":){4}(?:(?::" + r + "){0,1}:" + t + "|(?::" + r + `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` + r + ":){3}(?:(?::" + r + "){0,2}:" + t + "|(?::" + r + `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` + r + ":){2}(?:(?::" + r + "){0,3}:" + t + "|(?::" + r + `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` + r + ":){1}(?:(?::" + r + "){0,4}:" + t + "|(?::" + r + `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` + r + "){0,5}:" + t + "|(?::" + r + `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), i = new RegExp("(?:^" + t + "$)|(?:^" + a + "$)"), o = new RegExp("^" + t + "$"), l = new RegExp("^" + a + "$"), s = function(b) {
    return b && b.exact ? i : new RegExp("(?:" + e(b) + t + e(b) + ")|(?:" + e(b) + a + e(b) + ")", "g");
  };
  s.v4 = function(v) {
    return v && v.exact ? o : new RegExp("" + e(v) + t + e(v), "g");
  }, s.v6 = function(v) {
    return v && v.exact ? l : new RegExp("" + e(v) + a + e(v), "g");
  };
  var m = "(?:(?:[a-z]+:)?//)", u = "(?:\\S+(?::\\S*)?@)?", p = s.v4().source, y = s.v6().source, w = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", _ = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", c = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", g = "(?::\\d{2,5})?", d = '(?:[/?#][^\\s"]*)?', h = "(?:" + m + "|www\\.)" + u + "(?:localhost|" + p + "|" + y + "|" + w + _ + c + ")" + g + d;
  return Y = new RegExp("(?:^" + h + "$)", "i"), Y;
}, ve = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, R = {
  integer: function(e) {
    return R.number(e) && parseInt(e, 10) === e;
  },
  float: function(e) {
    return R.number(e) && !R.integer(e);
  },
  array: function(e) {
    return Array.isArray(e);
  },
  regexp: function(e) {
    if (e instanceof RegExp)
      return !0;
    try {
      return !!new RegExp(e);
    } catch {
      return !1;
    }
  },
  date: function(e) {
    return typeof e.getTime == "function" && typeof e.getMonth == "function" && typeof e.getYear == "function" && !isNaN(e.getTime());
  },
  number: function(e) {
    return isNaN(e) ? !1 : typeof e == "number";
  },
  object: function(e) {
    return typeof e == "object" && !R.array(e);
  },
  method: function(e) {
    return typeof e == "function";
  },
  email: function(e) {
    return typeof e == "string" && e.length <= 320 && !!e.match(ve.email);
  },
  url: function(e) {
    return typeof e == "string" && e.length <= 2048 && !!e.match(gt());
  },
  hex: function(e) {
    return typeof e == "string" && !!e.match(ve.hex);
  }
}, vt = function(e, t, r, a, i) {
  if (e.required && t === void 0) {
    Pe(e, t, r, a, i);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], l = e.type;
  o.indexOf(l) > -1 ? R[l](t) || a.push(A(i.messages.types[l], e.fullField, e.type)) : l && typeof t !== e.type && a.push(A(i.messages.types[l], e.fullField, e.type));
}, mt = function(e, t, r, a, i) {
  var o = typeof e.len == "number", l = typeof e.min == "number", s = typeof e.max == "number", m = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, u = t, p = null, y = typeof t == "number", w = typeof t == "string", _ = Array.isArray(t);
  if (y ? p = "number" : w ? p = "string" : _ && (p = "array"), !p)
    return !1;
  _ && (u = t.length), w && (u = t.replace(m, "_").length), o ? u !== e.len && a.push(A(i.messages[p].len, e.fullField, e.len)) : l && !s && u < e.min ? a.push(A(i.messages[p].min, e.fullField, e.min)) : s && !l && u > e.max ? a.push(A(i.messages[p].max, e.fullField, e.max)) : l && s && (u < e.min || u > e.max) && a.push(A(i.messages[p].range, e.fullField, e.min, e.max));
}, k = "enum", ht = function(e, t, r, a, i) {
  e[k] = Array.isArray(e[k]) ? e[k] : [], e[k].indexOf(t) === -1 && a.push(A(i.messages[k], e.fullField, e[k].join(", ")));
}, yt = function(e, t, r, a, i) {
  if (e.pattern) {
    if (e.pattern instanceof RegExp)
      e.pattern.lastIndex = 0, e.pattern.test(t) || a.push(A(i.messages.pattern.mismatch, e.fullField, t, e.pattern));
    else if (typeof e.pattern == "string") {
      var o = new RegExp(e.pattern);
      o.test(t) || a.push(A(i.messages.pattern.mismatch, e.fullField, t, e.pattern));
    }
  }
}, x = {
  required: Pe,
  whitespace: pt,
  type: vt,
  range: mt,
  enum: ht,
  pattern: yt
}, bt = function(e, t, r, a, i) {
  var o = [], l = e.required || !e.required && a.hasOwnProperty(e.field);
  if (l) {
    if (T(t, "string") && !e.required)
      return r();
    x.required(e, t, a, o, i, "string"), T(t, "string") || (x.type(e, t, a, o, i), x.range(e, t, a, o, i), x.pattern(e, t, a, o, i), e.whitespace === !0 && x.whitespace(e, t, a, o, i));
  }
  r(o);
}, xt = function(e, t, r, a, i) {
  var o = [], l = e.required || !e.required && a.hasOwnProperty(e.field);
  if (l) {
    if (T(t) && !e.required)
      return r();
    x.required(e, t, a, o, i), t !== void 0 && x.type(e, t, a, o, i);
  }
  r(o);
}, wt = function(e, t, r, a, i) {
  var o = [], l = e.required || !e.required && a.hasOwnProperty(e.field);
  if (l) {
    if (t === "" && (t = void 0), T(t) && !e.required)
      return r();
    x.required(e, t, a, o, i), t !== void 0 && (x.type(e, t, a, o, i), x.range(e, t, a, o, i));
  }
  r(o);
}, Pt = function(e, t, r, a, i) {
  var o = [], l = e.required || !e.required && a.hasOwnProperty(e.field);
  if (l) {
    if (T(t) && !e.required)
      return r();
    x.required(e, t, a, o, i), t !== void 0 && x.type(e, t, a, o, i);
  }
  r(o);
}, It = function(e, t, r, a, i) {
  var o = [], l = e.required || !e.required && a.hasOwnProperty(e.field);
  if (l) {
    if (T(t) && !e.required)
      return r();
    x.required(e, t, a, o, i), T(t) || x.type(e, t, a, o, i);
  }
  r(o);
}, _t = function(e, t, r, a, i) {
  var o = [], l = e.required || !e.required && a.hasOwnProperty(e.field);
  if (l) {
    if (T(t) && !e.required)
      return r();
    x.required(e, t, a, o, i), t !== void 0 && (x.type(e, t, a, o, i), x.range(e, t, a, o, i));
  }
  r(o);
}, St = function(e, t, r, a, i) {
  var o = [], l = e.required || !e.required && a.hasOwnProperty(e.field);
  if (l) {
    if (T(t) && !e.required)
      return r();
    x.required(e, t, a, o, i), t !== void 0 && (x.type(e, t, a, o, i), x.range(e, t, a, o, i));
  }
  r(o);
}, Tt = function(e, t, r, a, i) {
  var o = [], l = e.required || !e.required && a.hasOwnProperty(e.field);
  if (l) {
    if (t == null && !e.required)
      return r();
    x.required(e, t, a, o, i, "array"), t != null && (x.type(e, t, a, o, i), x.range(e, t, a, o, i));
  }
  r(o);
}, qt = function(e, t, r, a, i) {
  var o = [], l = e.required || !e.required && a.hasOwnProperty(e.field);
  if (l) {
    if (T(t) && !e.required)
      return r();
    x.required(e, t, a, o, i), t !== void 0 && x.type(e, t, a, o, i);
  }
  r(o);
}, Ft = "enum", Nt = function(e, t, r, a, i) {
  var o = [], l = e.required || !e.required && a.hasOwnProperty(e.field);
  if (l) {
    if (T(t) && !e.required)
      return r();
    x.required(e, t, a, o, i), t !== void 0 && x[Ft](e, t, a, o, i);
  }
  r(o);
}, Ot = function(e, t, r, a, i) {
  var o = [], l = e.required || !e.required && a.hasOwnProperty(e.field);
  if (l) {
    if (T(t, "string") && !e.required)
      return r();
    x.required(e, t, a, o, i), T(t, "string") || x.pattern(e, t, a, o, i);
  }
  r(o);
}, At = function(e, t, r, a, i) {
  var o = [], l = e.required || !e.required && a.hasOwnProperty(e.field);
  if (l) {
    if (T(t, "date") && !e.required)
      return r();
    if (x.required(e, t, a, o, i), !T(t, "date")) {
      var s;
      t instanceof Date ? s = t : s = new Date(t), x.type(e, s, a, o, i), s && x.range(e, s.getTime(), a, o, i);
    }
  }
  r(o);
}, Et = function(e, t, r, a, i) {
  var o = [], l = Array.isArray(t) ? "array" : typeof t;
  x.required(e, t, a, o, i, l), r(o);
}, K = function(e, t, r, a, i) {
  var o = e.type, l = [], s = e.required || !e.required && a.hasOwnProperty(e.field);
  if (s) {
    if (T(t, o) && !e.required)
      return r();
    x.required(e, t, a, l, i, o), T(t, o) || x.type(e, t, a, l, i);
  }
  r(l);
}, Dt = function(e, t, r, a, i) {
  var o = [], l = e.required || !e.required && a.hasOwnProperty(e.field);
  if (l) {
    if (T(t) && !e.required)
      return r();
    x.required(e, t, a, o, i);
  }
  r(o);
}, $ = {
  string: bt,
  method: xt,
  number: wt,
  boolean: Pt,
  regexp: It,
  integer: _t,
  float: St,
  array: Tt,
  object: qt,
  enum: Nt,
  pattern: Ot,
  date: At,
  url: K,
  hex: K,
  email: K,
  required: Et,
  any: Dt
};
function ne() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function() {
      var e = JSON.parse(JSON.stringify(this));
      return e.clone = this.clone, e;
    }
  };
}
var re = ne(), H = /* @__PURE__ */ function() {
  function n(t) {
    this.rules = null, this._messages = re, this.define(t);
  }
  var e = n.prototype;
  return e.define = function(r) {
    var a = this;
    if (!r)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof r != "object" || Array.isArray(r))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(r).forEach(function(i) {
      var o = r[i];
      a.rules[i] = Array.isArray(o) ? o : [o];
    });
  }, e.messages = function(r) {
    return r && (this._messages = ge(ne(), r)), this._messages;
  }, e.validate = function(r, a, i) {
    var o = this;
    a === void 0 && (a = {}), i === void 0 && (i = function() {
    });
    var l = r, s = a, m = i;
    if (typeof s == "function" && (m = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
      return m && m(null, l), Promise.resolve(l);
    function u(c) {
      var g = [], d = {};
      function h(b) {
        if (Array.isArray(b)) {
          var P;
          g = (P = g).concat.apply(P, b);
        } else
          g.push(b);
      }
      for (var v = 0; v < c.length; v++)
        h(c[v]);
      g.length ? (d = te(g), m(g, d)) : m(null, l);
    }
    if (s.messages) {
      var p = this.messages();
      p === re && (p = ne()), ge(p, s.messages), s.messages = p;
    } else
      s.messages = this.messages();
    var y = {}, w = s.keys || Object.keys(this.rules);
    w.forEach(function(c) {
      var g = o.rules[c], d = l[c];
      g.forEach(function(h) {
        var v = h;
        typeof v.transform == "function" && (l === r && (l = z({}, l)), d = l[c] = v.transform(d)), typeof v == "function" ? v = {
          validator: v
        } : v = z({}, v), v.validator = o.getValidationMethod(v), v.validator && (v.field = c, v.fullField = v.fullField || c, v.type = o.getType(v), y[c] = y[c] || [], y[c].push({
          rule: v,
          value: d,
          source: l,
          field: c
        }));
      });
    });
    var _ = {};
    return dt(y, s, function(c, g) {
      var d = c.rule, h = (d.type === "object" || d.type === "array") && (typeof d.fields == "object" || typeof d.defaultField == "object");
      h = h && (d.required || !d.required && c.value), d.field = c.field;
      function v(I, q) {
        return z({}, q, {
          fullField: d.fullField + "." + I,
          fullFields: d.fullFields ? [].concat(d.fullFields, [I]) : [I]
        });
      }
      function b(I) {
        I === void 0 && (I = []);
        var q = Array.isArray(I) ? I : [I];
        !s.suppressWarning && q.length && n.warning("async-validator:", q), q.length && d.message !== void 0 && (q = [].concat(d.message));
        var S = q.map(pe(d, l));
        if (s.first && S.length)
          return _[d.field] = 1, g(S);
        if (!h)
          g(S);
        else {
          if (d.required && !c.value)
            return d.message !== void 0 ? S = [].concat(d.message).map(pe(d, l)) : s.error && (S = [s.error(d, A(s.messages.required, d.field))]), g(S);
          var V = {};
          d.defaultField && Object.keys(c.value).map(function(L) {
            V[L] = d.defaultField;
          }), V = z({}, V, c.rule.fields);
          var M = {};
          Object.keys(V).forEach(function(L) {
            var D = V[L], Se = Array.isArray(D) ? D : [D];
            M[L] = Se.map(v.bind(null, L));
          });
          var oe = new n(M);
          oe.messages(s.messages), c.rule.options && (c.rule.options.messages = s.messages, c.rule.options.error = s.error), oe.validate(c.value, c.rule.options || s, function(L) {
            var D = [];
            S && S.length && D.push.apply(D, S), L && L.length && D.push.apply(D, L), g(D.length ? D : null);
          });
        }
      }
      var P;
      if (d.asyncValidator)
        P = d.asyncValidator(d, c.value, b, c.source, s);
      else if (d.validator) {
        try {
          P = d.validator(d, c.value, b, c.source, s);
        } catch (I) {
          console.error == null || console.error(I), s.suppressValidatorError || setTimeout(function() {
            throw I;
          }, 0), b(I.message);
        }
        P === !0 ? b() : P === !1 ? b(typeof d.message == "function" ? d.message(d.fullField || d.field) : d.message || (d.fullField || d.field) + " fails") : P instanceof Array ? b(P) : P instanceof Error && b(P.message);
      }
      P && P.then && P.then(function() {
        return b();
      }, function(I) {
        return b(I);
      });
    }, function(c) {
      u(c);
    }, l);
  }, e.getType = function(r) {
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !$.hasOwnProperty(r.type))
      throw new Error(A("Unknown rule type %s", r.type));
    return r.type || "string";
  }, e.getValidationMethod = function(r) {
    if (typeof r.validator == "function")
      return r.validator;
    var a = Object.keys(r), i = a.indexOf("message");
    return i !== -1 && a.splice(i, 1), a.length === 1 && a[0] === "required" ? $.required : $[this.getType(r)] || void 0;
  }, n;
}();
H.register = function(e, t) {
  if (typeof t != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  $[e] = t;
};
H.warning = we;
H.messages = re;
H.validators = $;
const Lt = N({
  name: "SFormItem",
  props: nt,
  setup(n, {
    slots: e
  }) {
    const t = j("LABEL_DATA"), r = E(() => ({
      "s-form__item": !0,
      "s-form__item--horizontal": t.value.layout === "horizontal",
      "s-form__item--vertical": t.value.layout === "vertical",
      "s-form__item--error": o.value
    })), a = E(() => ({
      "s-form__label": !0,
      "s-form__label--vertical": t.value.layout === "vertical",
      [`s-form__label--${t.value.labelAlign}`]: t.value.layout === "horizontal",
      [`s-form__label--${t.value.labelSize}`]: t.value.layout === "horizontal"
    })), i = j(xe), o = O(!1), l = O(""), m = {
      validate: () => {
        if (!i)
          return console.warn("\u8BF7\u5728Form\u7EC4\u4EF6\u4E2D\u4F7F\u7528FormItem"), Promise.reject("\u8BF7\u5728Form\u7EC4\u4EF6\u4E2D\u4F7F\u7528FormItem");
        if (!n.field)
          return console.warn("\u5982\u679C\u8981\u6821\u9A8C\u5F53\u524D\u9879\uFF0C\u8BF7\u8BBE\u7F6Efield\u5B57\u6BB5"), Promise.reject("\u5982\u679C\u8981\u6821\u9A8C\u5F53\u524D\u9879\uFF0C\u8BF7\u8BBE\u7F6Efield\u5B57\u6BB5");
        if (!i.rules)
          return Promise.resolve({
            result: !0
          });
        const u = i.rules[n.field] || void 0;
        if (!u)
          return Promise.resolve({
            result: !0
          });
        const p = i.model[n.field];
        return new H({
          [n.field]: u
        }).validate({
          [n.field]: p
        }, (w) => {
          w ? (o.value = !0, l.value = w[0].message || "\u6821\u9A8C\u9519\u8BEF") : (o.value = !1, l.value = "");
        });
      }
    };
    return B("FORM_ITEM_CTX", m), ae(() => {
      n.field && (i == null || i.addItem(m));
    }), Oe(() => {
      n.field && (i == null || i.removeItem(m));
    }), () => {
      var u;
      return f("div", {
        class: r.value
      }, [f("span", {
        class: a.value
      }, [n.label]), f("div", null, [(u = e.default) == null ? void 0 : u.call(e), o.value && f("div", {
        class: "error-message"
      }, [l.value])])]);
    };
  }
}), Vt = {
  install(n) {
    n.component("SForm", tt), n.component("SFormItem", Lt);
  }
}, Ct = {
  modelValue: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "text"
  }
}, zt = N({
  name: "SInput",
  props: Ct,
  emits: ["update:modelValue"],
  setup(n, {
    emit: e
  }) {
    const t = j("FORM_ITEM_CTX"), r = (a) => {
      const i = a.target.value;
      e("update:modelValue", i), t.validate();
    };
    return () => f("div", {
      class: "s-input__wrapper"
    }, [f("input", {
      class: "s-input__input",
      value: n.modelValue,
      onInput: r,
      type: n.type
    }, null)]);
  }
}), Mt = {
  install(n) {
    n.component("SInput", zt);
  }
}, kt = {
  modelValue: {
    type: Boolean,
    default: !1
  },
  title: {
    type: String,
    default: ""
  },
  showClose: {
    type: Boolean,
    default: !0
  },
  width: {
    type: String,
    default: "500px"
  },
  center: {
    type: Boolean,
    default: !1
  },
  alignCenter: {
    type: Boolean,
    default: !1
  }
};
const jt = N({
  name: "SBaseModal",
  props: {
    modelValue: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  setup(n, {
    slots: e,
    emit: t
  }) {
    const {
      modelValue: r
    } = C(n);
    return () => {
      var a;
      return f("div", null, [r.value && f("div", {
        class: "s-base-modal"
      }, [f("div", {
        class: "s-base-modal__mask",
        onClick: () => t("update:modelValue", !1)
      }, null), (a = e.default) == null ? void 0 : a.call(e)])]);
    };
  }
}), Bt = N({
  name: "SModal",
  props: kt,
  emits: ["update:modelValue"],
  setup(n, {
    slots: e,
    emit: t
  }) {
    const {
      modelValue: r,
      title: a,
      showClose: i,
      width: o,
      center: l,
      alignCenter: s
    } = C(n), m = s.value ? {
      marginTop: 0,
      top: "50%",
      transform: "translateY(-50%)"
    } : null;
    return () => f(jt, {
      class: "s-modal",
      "onUpdate:modelValue": (u) => t("update:modelValue", u),
      modelValue: r.value
    }, {
      default: () => {
        var u, p;
        return [f("div", {
          class: "s-modal__container",
          style: {
            width: o.value,
            ...m
          }
        }, [e.header ? e.header({
          close: () => {
            t("update:modelValue", !1);
          }
        }) : f("div", {
          class: "s-modal__header",
          style: {
            textAlign: l.value ? "center" : "left"
          }
        }, [a.value, i.value && f("svg", {
          onClick: () => {
            t("update:modelValue", !1);
          },
          class: "s-modal__close",
          viewBox: "0 0 1024 1024",
          width: "16",
          xmlns: "http://www.w3.org/2000/svg"
        }, [f("path", {
          fill: "currentColor",
          d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
        }, null)])]), f("div", {
          class: "s-modal__body"
        }, [(u = e.default) == null ? void 0 : u.call(e)]), f("div", {
          class: "s-modal__footer"
        }, [(p = e.footer) == null ? void 0 : p.call(e)])])];
      }
    });
  }
}), Rt = {
  install(n) {
    n.component("SModal", Bt);
  }
}, $t = {
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
}, Ut = N({
  name: "SIcon",
  props: $t,
  setup(n, {
    attrs: e
  }) {
    const t = E(() => typeof n.size == "number" ? `${n.size}px` : n.size), r = f("img", Z({
      src: n.name,
      style: {
        width: t.value,
        verticalAlign: "middle"
      }
    }, e), null), a = f("span", {
      style: {
        fontSize: t.value,
        color: n.color
      },
      class: [n.prefix, `${n.prefix}-${n.name}`]
    }, null), i = f("svg", {
      class: "icon",
      style: {
        fontSize: t.value
      }
    }, [f("use", {
      "xlink:href": `#${n.prefix}-${n.component}`,
      fill: n.color
    }, null)]), o = n.component ? i : /http|https/.test(n.name) ? r : a;
    return () => o;
  }
}), Ht = (n) => {
  const e = n.size ? typeof n.size == "number" ? `${n.size}px` : n.size : void 0, t = n.color ? n.color : "black";
  return f("svg", {
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    class: "icon icon-arrow-down",
    style: {
      width: e,
      height: e,
      fill: t,
      stroke: t
    }
  }, [f("path", {
    d: "m11.27 27.728 12.727 12.728 12.728-12.728M24 5v34.295"
  }, null)]);
}, Ie = (n) => {
  const e = n.size ? typeof n.size == "number" ? `${n.size}px` : n.size : void 0, t = n.color ? n.color : "black";
  return f("svg", {
    viewBox: "0 0 1024 1024",
    style: {
      width: e,
      height: e,
      fill: t,
      stroke: t
    }
  }, [f("path", {
    d: "M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"
  }, null)]);
}, Yt = {
  install(n) {
    n.component("SIcon", Ut), n.component("ArrowDownIcon", Ht), n.component("CloseIcon", Ie);
  }
}, Jt = {
  modelValue: {
    type: String,
    default: ""
  },
  editable: {
    type: Boolean,
    default: !1
  }
}, _e = N({
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
  setup(n, {
    slots: e
  }) {
    const t = j("ACTIVE_TAB"), r = j("TABS_DATA");
    return n.type !== "random" && r.value.push({
      id: n.id,
      title: n.title
    }), () => {
      var a;
      return f(Ae, null, [n.id === t.value && f("div", {
        class: "s-tab"
      }, [(a = e.default) == null ? void 0 : a.call(e)])]);
    };
  }
});
let J;
const Wt = new Uint8Array(16);
function Zt() {
  if (!J && (J = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !J))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return J(Wt);
}
const F = [];
for (let n = 0; n < 256; ++n)
  F.push((n + 256).toString(16).slice(1));
function Gt(n, e = 0) {
  return (F[n[e + 0]] + F[n[e + 1]] + F[n[e + 2]] + F[n[e + 3]] + "-" + F[n[e + 4]] + F[n[e + 5]] + "-" + F[n[e + 6]] + F[n[e + 7]] + "-" + F[n[e + 8]] + F[n[e + 9]] + "-" + F[n[e + 10]] + F[n[e + 11]] + F[n[e + 12]] + F[n[e + 13]] + F[n[e + 14]] + F[n[e + 15]]).toLowerCase();
}
const Xt = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), me = {
  randomUUID: Xt
};
function Kt(n, e, t) {
  if (me.randomUUID && !e && !n)
    return me.randomUUID();
  n = n || {};
  const r = n.random || (n.rng || Zt)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, e) {
    t = t || 0;
    for (let a = 0; a < 16; ++a)
      e[t + a] = r[a];
    return e;
  }
  return Gt(r);
}
const Qt = N({
  name: "STab",
  props: Jt,
  emits: ["update:modelValue"],
  setup(n, {
    slots: e
  }) {
    const {
      modelValue: t,
      editable: r
    } = C(n), a = O([]);
    B("TABS_DATA", a);
    const i = O(t.value);
    B("ACTIVE_TAB", i);
    const o = (m) => {
      i.value = m;
    }, l = (m, u) => {
      u.stopPropagation();
      const p = a.value.findIndex((y) => y.id === m);
      i.value === m && (p === a.value.length - 1 ? i.value = a.value[p - 1].id : i.value = a.value[p + 1].id), a.value.splice(p, 1);
    }, s = () => {
      const m = Kt();
      a.value.push({
        id: m,
        type: "random",
        title: "New Tab",
        content: "New Tab Content"
      }), i.value = m;
    };
    return () => {
      var m;
      return f("div", {
        class: "s-tabs"
      }, [f("ul", {
        class: "s-tabs__nav"
      }, [a.value.map((u) => f("li", {
        class: u.id === i.value ? "active" : "",
        onClick: () => o(u.id)
      }, [u.title, r.value && a.value.length > 1 && f(Ie, {
        size: "12",
        color: "grey",
        onClick: (p) => l(u.id, p),
        style: "margin-left: 8px;"
      }, null)])), r.value && f("li", null, [f("svg", {
        onClick: s,
        viewBox: "0 0 1024 1024",
        width: "14",
        height: "14"
      }, [f("path", {
        d: "M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z"
      }, null)])])]), (m = e.default) == null ? void 0 : m.call(e), a.value.filter((u) => u.type === "random").map((u) => f(_e, {
        type: "random",
        id: u.id,
        title: u.title
      }, {
        default: () => [u.content]
      }))]);
    };
  }
}), en = {
  install(n) {
    n.component("STabs", Qt), n.component("STab", _e);
  }
}, tn = [
  De,
  We,
  Qe,
  Vt,
  Mt,
  Rt,
  Yt,
  en
], rn = {
  install(n) {
    tn.forEach((e) => n.use(e));
  }
};
export {
  se as Button,
  tt as Form,
  Ut as Icon,
  zt as Input,
  Bt as Modal,
  Ke as Pagination,
  _e as Tab,
  Je as Tree,
  rn as default
};
