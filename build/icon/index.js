import { defineComponent as r, computed as u, createVNode as t, mergeProps as a } from "vue";
const m = {
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
}, f = r({
  name: "SIcon",
  props: m,
  setup(e, {
    attrs: o
  }) {
    const n = u(() => typeof e.size == "number" ? `${e.size}px` : e.size), c = t("img", a({
      src: e.name,
      style: {
        width: n.value,
        verticalAlign: "middle"
      }
    }, o), null), l = t("span", {
      style: {
        fontSize: n.value,
        color: e.color
      },
      class: [e.prefix, `${e.prefix}-${e.name}`]
    }, null), i = t("svg", {
      class: "icon",
      style: {
        fontSize: n.value
      }
    }, [t("use", {
      "xlink:href": `#${e.prefix}-${e.component}`,
      fill: e.color
    }, null)]), s = e.component ? i : /http|https/.test(e.name) ? c : l;
    return () => s;
  }
}), d = (e) => {
  const o = e.size ? typeof e.size == "number" ? `${e.size}px` : e.size : void 0, n = e.color ? e.color : "black";
  return t("svg", {
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    class: "icon icon-arrow-down",
    style: {
      width: o,
      height: o,
      fill: n,
      stroke: n
    }
  }, [t("path", {
    d: "m11.27 27.728 12.727 12.728 12.728-12.728M24 5v34.295"
  }, null)]);
}, z = (e) => {
  const o = e.size ? typeof e.size == "number" ? `${e.size}px` : e.size : void 0, n = e.color ? e.color : "black";
  return t("svg", {
    viewBox: "0 0 1024 1024",
    style: {
      width: o,
      height: o,
      fill: n,
      stroke: n
    }
  }, [t("path", {
    d: "M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"
  }, null)]);
}, w = {
  install(e) {
    e.component("SIcon", f), e.component("ArrowDownIcon", d), e.component("CloseIcon", z);
  }
};
export {
  d as ArrowDownIcon,
  z as CloseIcon,
  f as Icon,
  w as default
};
