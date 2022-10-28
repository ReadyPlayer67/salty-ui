import { ref as p, defineComponent as d, toRefs as h, computed as u, createVNode as n, createTextVNode as c, onMounted as w, watch as g, mergeProps as C } from "vue";
const v = {
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
function b(t = 1) {
  const l = p(t), e = (s) => {
    l.value = s;
  }, a = (s) => {
    l.value += s;
  };
  return { pageIndex: l, setPageIndex: e, jumpPage: a, prevPage: () => a(-1), nextPage: () => a(1) };
}
function k(t, l, e) {
  const a = Array.from(Array(t).keys());
  if (t <= e)
    return a.slice(2, t);
  {
    const r = Math.ceil(e / 2);
    return l <= r ? a.slice(2, e) : l >= t - r + 1 ? a.slice(t - e + 2, t) : a.slice(l - r + 2, l + r - 1);
  }
}
const y = v, m = d({
  name: "SPager",
  props: y,
  setup(t) {
    const {
      total: l,
      pageSize: e,
      pagerCount: a
    } = h(t), {
      pageIndex: r,
      setPageIndex: o,
      jumpPage: s,
      prevPage: P,
      nextPage: f
    } = b(), i = u(() => Math.ceil(l.value / e.value)), x = u(() => k(i.value, r.value, a.value));
    return {
      totalPage: i,
      pageIndex: r,
      pagerCount: a,
      setPageIndex: o,
      jumpPage: s,
      prevPage: P,
      nextPage: f,
      centerPages: x
    };
  },
  render() {
    const {
      pageIndex: t,
      setPageIndex: l,
      totalPage: e,
      pagerCount: a,
      jumpPage: r,
      centerPages: o
    } = this;
    return n("ul", {
      class: "s-pager"
    }, [n("li", {
      class: {
        current: t === 1
      },
      onClick: () => l(1)
    }, [c("1")]), e > a && t > Math.ceil(a / 2) && n("li", {
      class: "more left",
      onClick: () => r(-5)
    }, [c("...")]), o.map((s) => n("li", {
      class: {
        current: t === s
      },
      onClick: () => l(s)
    }, [s])), e > a && t < e - Math.floor(a / 2) && n("li", {
      class: "more right",
      onClick: () => r(5)
    }, [c("...")]), e > 1 && n("li", {
      class: {
        current: t === e
      },
      onClick: () => l(e)
    }, [e])]);
  }
}), I = d({
  name: "SPagination",
  props: v,
  emits: ["update:modelValue"],
  setup(t, {
    emit: l
  }) {
    const e = p(), a = u(() => e.value ? e.value.pageIndex < 2 : !0), r = u(() => e.value ? e.value.pageIndex > e.value.totalPage - 1 : !0);
    return w(() => {
      g(() => t.modelValue, (o) => {
        e.value.pageIndex = o;
      }), g(() => e.value.pageIndex, (o) => {
        l("update:modelValue", o);
      });
    }), () => n("div", {
      class: "s-pagination"
    }, [n("button", {
      class: "pr-1",
      disabled: a.value,
      onClick: () => e.value.prevPage()
    }, [n("svg", {
      width: "12",
      height: "12",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    }, [n("path", {
      fill: "currentColor",
      d: "M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
    }, null)])]), n(m, C({
      ref: e
    }, t), null), n("button", {
      class: "pl-1",
      disabled: r.value,
      onClick: () => e.value.nextPage()
    }, [n("svg", {
      width: "12",
      height: "12",
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    }, [n("path", {
      fill: "currentColor",
      d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
    }, null)])])]);
  }
}), N = {
  install(t) {
    t.component("SPagination", I), t.component("SPager", m);
  }
};
export {
  m as Pager,
  I as Pagination,
  N as default
};
