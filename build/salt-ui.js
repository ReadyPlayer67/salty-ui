import { defineComponent as c, toRefs as r, createVNode as f } from "vue";
const i = {
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
}, n = c({
  name: "SButton",
  props: i,
  setup(t, {
    slots: e
  }) {
    const {
      type: o,
      size: l,
      disabled: s,
      block: a
    } = r(t);
    return () => {
      const u = e.default ? e.default() : "\u6309\u94AE", d = a.value ? "s-btn--block" : "";
      return f("button", {
        disabled: s.value,
        class: `s-btn s-btn--${o.value} s-btn--${l.value} ${d}`
      }, [u]);
    };
  }
}), p = {
  install(t) {
    t.component(n.name, n);
  }
}, b = [p], y = {
  install(t) {
    b.forEach((e) => t.use(e));
  }
};
export {
  n as Button,
  y as default
};
