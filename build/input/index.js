import { defineComponent as l, inject as s, createVNode as e } from "vue";
const i = {
  modelValue: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "text"
  }
}, r = l({
  name: "SInput",
  props: i,
  emits: ["update:modelValue"],
  setup(t, {
    emit: n
  }) {
    const p = s("FORM_ITEM_CTX"), u = (a) => {
      const o = a.target.value;
      n("update:modelValue", o), p.validate();
    };
    return () => e("div", {
      class: "s-input__wrapper"
    }, [e("input", {
      class: "s-input__input",
      value: t.modelValue,
      onInput: u,
      type: t.type
    }, null)]);
  }
}), m = {
  install(t) {
    t.component("SInput", r);
  }
};
export {
  r as Input,
  m as default
};
