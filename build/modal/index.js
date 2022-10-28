import { defineComponent as r, toRefs as s, createVNode as a } from "vue";
const v = {
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
const V = r({
  name: "SBaseModal",
  props: {
    modelValue: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  setup(l, {
    slots: e,
    emit: t
  }) {
    const {
      modelValue: n
    } = s(l);
    return () => {
      var d;
      return a("div", null, [n.value && a("div", {
        class: "s-base-modal"
      }, [a("div", {
        class: "s-base-modal__mask",
        onClick: () => t("update:modelValue", !1)
      }, null), (d = e.default) == null ? void 0 : d.call(e)])]);
    };
  }
}), _ = r({
  name: "SModal",
  props: v,
  emits: ["update:modelValue"],
  setup(l, {
    slots: e,
    emit: t
  }) {
    const {
      modelValue: n,
      title: d,
      showClose: m,
      width: p,
      center: i,
      alignCenter: c
    } = s(l), f = c.value ? {
      marginTop: 0,
      top: "50%",
      transform: "translateY(-50%)"
    } : null;
    return () => a(V, {
      class: "s-modal",
      "onUpdate:modelValue": (o) => t("update:modelValue", o),
      modelValue: n.value
    }, {
      default: () => {
        var o, u;
        return [a("div", {
          class: "s-modal__container",
          style: {
            width: p.value,
            ...f
          }
        }, [e.header ? e.header({
          close: () => {
            t("update:modelValue", !1);
          }
        }) : a("div", {
          class: "s-modal__header",
          style: {
            textAlign: i.value ? "center" : "left"
          }
        }, [d.value, m.value && a("svg", {
          onClick: () => {
            t("update:modelValue", !1);
          },
          class: "s-modal__close",
          viewBox: "0 0 1024 1024",
          width: "16",
          xmlns: "http://www.w3.org/2000/svg"
        }, [a("path", {
          fill: "currentColor",
          d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
        }, null)])]), a("div", {
          class: "s-modal__body"
        }, [(o = e.default) == null ? void 0 : o.call(e)]), a("div", {
          class: "s-modal__footer"
        }, [(u = e.footer) == null ? void 0 : u.call(e)])])];
      }
    });
  }
}), w = {
  install(l) {
    l.component("SModal", _);
  }
};
export {
  _ as Modal,
  w as default
};
