import { defineComponent as g, toRefs as y, ref as a, computed as d, onMounted as x, createVNode as u } from "vue";
const b = {
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
}, M = g({
  name: "SVirtualList",
  props: b,
  setup: function(p, {
    slots: l
  }) {
    const {
      data: n,
      itemHeight: e,
      component: H
    } = y(p), o = a(), s = a(0), i = a(0), f = d(() => Math.ceil(s.value / e.value)), m = d(() => n.value.slice(i.value, Math.min(i.value + f.value, n.value.length)));
    x(() => {
      s.value = o.value.clientHeight;
    });
    const c = a(0), h = (r) => {
      const {
        scrollTop: t
      } = r.target;
      i.value = Math.floor(t / e.value), c.value = t - t % e.value;
    };
    return () => u("div", {
      class: "s-virtual-list__container",
      ref: o,
      onScroll: h
    }, [u("div", {
      class: "s-virtual-list__blank",
      style: {
        height: `${n.value.length * e.value}px`
      }
    }, null), u("div", {
      class: "s-virtual-list",
      style: {
        transform: `translate3d(0,${c.value}px,0)`
      }
    }, [m.value.map((r, t) => {
      var v;
      return (v = l.default) == null ? void 0 : v.call(l, {
        item: r,
        index: t
      });
    })])]);
  }
}), _ = {};
export {
  M as VirtualList,
  _ as default
};
