import { defineComponent as ne, computed as B, provide as U, createVNode as D, inject as C, ref as H, onMounted as oe, onUnmounted as ue } from "vue";
const de = {
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
}, ie = Symbol("formContextToken"), ce = ne({
  name: "SForm",
  props: de,
  emits: ["submit"],
  setup(n, {
    slots: e,
    emit: r,
    expose: t
  }) {
    const i = B(() => ({
      layout: n.layout,
      labelSize: n.labelSize,
      labelAlign: n.labelAlign
    }));
    U("LABEL_DATA", i);
    const a = /* @__PURE__ */ new Set(), f = (c) => a.add(c), s = (c) => a.delete(c);
    U(ie, {
      model: n.model,
      rules: n.rules,
      addItem: f,
      removeItem: s
    });
    const u = (c) => {
      c.preventDefault(), r("submit");
    };
    return t({
      validate: (c) => {
        const m = [];
        a.forEach((h) => m.push(h.validate())), Promise.all(m).then(() => {
          c(!0);
        }).catch(() => {
          c(!1);
        });
      }
    }), () => {
      var c;
      return D("form", {
        class: "s-form",
        onSubmit: u
      }, [(c = e.default) == null ? void 0 : c.call(e)]);
    };
  }
}), le = {
  label: {
    type: String
  },
  field: {
    type: String
  }
};
function S() {
  return S = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var t in r)
        Object.prototype.hasOwnProperty.call(r, t) && (n[t] = r[t]);
    }
    return n;
  }, S.apply(this, arguments);
}
function pe(n, e) {
  n.prototype = Object.create(e.prototype), n.prototype.constructor = n, M(n, e);
}
function J(n) {
  return J = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, J(n);
}
function M(n, e) {
  return M = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, i) {
    return t.__proto__ = i, t;
  }, M(n, e);
}
function me() {
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
function L(n, e, r) {
  return me() ? L = Reflect.construct.bind() : L = function(i, a, f) {
    var s = [null];
    s.push.apply(s, a);
    var u = Function.bind.apply(i, s), v = new u();
    return f && M(v, f.prototype), v;
  }, L.apply(null, arguments);
}
function ye(n) {
  return Function.toString.call(n).indexOf("[native code]") !== -1;
}
function W(n) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return W = function(t) {
    if (t === null || !ye(t))
      return t;
    if (typeof t != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof e < "u") {
      if (e.has(t))
        return e.get(t);
      e.set(t, i);
    }
    function i() {
      return L(t, arguments, J(this).constructor);
    }
    return i.prototype = Object.create(t.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), M(i, t);
  }, W(n);
}
var ge = /%[sdj%]/g, ae = function() {
};
typeof process < "u" && process.env && process.env.NODE_ENV !== "production" && typeof window < "u" && typeof document < "u" && (ae = function(e, r) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && r.every(function(t) {
    return typeof t == "string";
  }) && console.warn(e, r);
});
function Z(n) {
  if (!n || !n.length)
    return null;
  var e = {};
  return n.forEach(function(r) {
    var t = r.field;
    e[t] = e[t] || [], e[t].push(r);
  }), e;
}
function x(n) {
  for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), t = 1; t < e; t++)
    r[t - 1] = arguments[t];
  var i = 0, a = r.length;
  if (typeof n == "function")
    return n.apply(null, r);
  if (typeof n == "string") {
    var f = n.replace(ge, function(s) {
      if (s === "%%")
        return "%";
      if (i >= a)
        return s;
      switch (s) {
        case "%s":
          return String(r[i++]);
        case "%d":
          return Number(r[i++]);
        case "%j":
          try {
            return JSON.stringify(r[i++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return s;
      }
    });
    return f;
  }
  return n;
}
function ve(n) {
  return n === "string" || n === "url" || n === "hex" || n === "email" || n === "date" || n === "pattern";
}
function b(n, e) {
  return !!(n == null || e === "array" && Array.isArray(n) && !n.length || ve(e) && typeof n == "string" && !n);
}
function he(n, e, r) {
  var t = [], i = 0, a = n.length;
  function f(s) {
    t.push.apply(t, s || []), i++, i === a && r(t);
  }
  n.forEach(function(s) {
    e(s, f);
  });
}
function Q(n, e, r) {
  var t = 0, i = n.length;
  function a(f) {
    if (f && f.length) {
      r(f);
      return;
    }
    var s = t;
    t = t + 1, s < i ? e(n[s], a) : r([]);
  }
  a([]);
}
function be(n) {
  var e = [];
  return Object.keys(n).forEach(function(r) {
    e.push.apply(e, n[r] || []);
  }), e;
}
var k = /* @__PURE__ */ function(n) {
  pe(e, n);
  function e(r, t) {
    var i;
    return i = n.call(this, "Async Validation Error") || this, i.errors = r, i.fields = t, i;
  }
  return e;
}(/* @__PURE__ */ W(Error));
function we(n, e, r, t, i) {
  if (e.first) {
    var a = new Promise(function(h, q) {
      var O = function(o) {
        return t(o), o.length ? q(new k(o, Z(o))) : h(i);
      }, d = be(n);
      Q(d, r, O);
    });
    return a.catch(function(h) {
      return h;
    }), a;
  }
  var f = e.firstFields === !0 ? Object.keys(n) : e.firstFields || [], s = Object.keys(n), u = s.length, v = 0, c = [], m = new Promise(function(h, q) {
    var O = function(g) {
      if (c.push.apply(c, g), v++, v === u)
        return t(c), c.length ? q(new k(c, Z(c))) : h(i);
    };
    s.length || (t(c), h(i)), s.forEach(function(d) {
      var g = n[d];
      f.indexOf(d) !== -1 ? Q(g, r, O) : he(g, r, O);
    });
  });
  return m.catch(function(h) {
    return h;
  }), m;
}
function Fe(n) {
  return !!(n && n.message !== void 0);
}
function qe(n, e) {
  for (var r = n, t = 0; t < e.length; t++) {
    if (r == null)
      return r;
    r = r[e[t]];
  }
  return r;
}
function ee(n, e) {
  return function(r) {
    var t;
    return n.fullFields ? t = qe(e, n.fullFields) : t = e[r.field || n.fullField], Fe(r) ? (r.field = r.field || n.fullField, r.fieldValue = t, r) : {
      message: typeof r == "function" ? r() : r,
      fieldValue: t,
      field: r.field || n.fullField
    };
  };
}
function re(n, e) {
  if (e) {
    for (var r in e)
      if (e.hasOwnProperty(r)) {
        var t = e[r];
        typeof t == "object" && typeof n[r] == "object" ? n[r] = S({}, n[r], t) : n[r] = t;
      }
  }
  return n;
}
var fe = function(e, r, t, i, a, f) {
  e.required && (!t.hasOwnProperty(e.field) || b(r, f || e.type)) && i.push(x(a.messages.required, e.fullField));
}, xe = function(e, r, t, i, a) {
  (/^\s+$/.test(r) || r === "") && i.push(x(a.messages.whitespace, e.fullField));
}, $, Oe = function() {
  if ($)
    return $;
  var n = "[a-fA-F\\d:]", e = function(y) {
    return y && y.includeBoundaries ? "(?:(?<=\\s|^)(?=" + n + ")|(?<=" + n + ")(?=\\s|$))" : "";
  }, r = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", t = "[a-fA-F\\d]{1,4}", i = (`
(?:
(?:` + t + ":){7}(?:" + t + `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` + t + ":){6}(?:" + r + "|:" + t + `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` + t + ":){5}(?::" + r + "|(?::" + t + `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` + t + ":){4}(?:(?::" + t + "){0,1}:" + r + "|(?::" + t + `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` + t + ":){3}(?:(?::" + t + "){0,2}:" + r + "|(?::" + t + `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` + t + ":){2}(?:(?::" + t + "){0,3}:" + r + "|(?::" + t + `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` + t + ":){1}(?:(?::" + t + "){0,4}:" + r + "|(?::" + t + `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` + t + "){0,5}:" + r + "|(?::" + t + `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), a = new RegExp("(?:^" + r + "$)|(?:^" + i + "$)"), f = new RegExp("^" + r + "$"), s = new RegExp("^" + i + "$"), u = function(y) {
    return y && y.exact ? a : new RegExp("(?:" + e(y) + r + e(y) + ")|(?:" + e(y) + i + e(y) + ")", "g");
  };
  u.v4 = function(p) {
    return p && p.exact ? f : new RegExp("" + e(p) + r + e(p), "g");
  }, u.v6 = function(p) {
    return p && p.exact ? s : new RegExp("" + e(p) + i + e(p), "g");
  };
  var v = "(?:(?:[a-z]+:)?//)", c = "(?:\\S+(?::\\S*)?@)?", m = u.v4().source, h = u.v6().source, q = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", O = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", d = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", g = "(?::\\d{2,5})?", o = '(?:[/?#][^\\s"]*)?', E = "(?:" + v + "|www\\.)" + c + "(?:localhost|" + m + "|" + h + "|" + q + O + d + ")" + g + o;
  return $ = new RegExp("(?:^" + E + "$)", "i"), $;
}, te = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, T = {
  integer: function(e) {
    return T.number(e) && parseInt(e, 10) === e;
  },
  float: function(e) {
    return T.number(e) && !T.integer(e);
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
    return typeof e == "object" && !T.array(e);
  },
  method: function(e) {
    return typeof e == "function";
  },
  email: function(e) {
    return typeof e == "string" && e.length <= 320 && !!e.match(te.email);
  },
  url: function(e) {
    return typeof e == "string" && e.length <= 2048 && !!e.match(Oe());
  },
  hex: function(e) {
    return typeof e == "string" && !!e.match(te.hex);
  }
}, Ae = function(e, r, t, i, a) {
  if (e.required && r === void 0) {
    fe(e, r, t, i, a);
    return;
  }
  var f = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], s = e.type;
  f.indexOf(s) > -1 ? T[s](r) || i.push(x(a.messages.types[s], e.fullField, e.type)) : s && typeof r !== e.type && i.push(x(a.messages.types[s], e.fullField, e.type));
}, Ee = function(e, r, t, i, a) {
  var f = typeof e.len == "number", s = typeof e.min == "number", u = typeof e.max == "number", v = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, c = r, m = null, h = typeof r == "number", q = typeof r == "string", O = Array.isArray(r);
  if (h ? m = "number" : q ? m = "string" : O && (m = "array"), !m)
    return !1;
  O && (c = r.length), q && (c = r.replace(v, "_").length), f ? c !== e.len && i.push(x(a.messages[m].len, e.fullField, e.len)) : s && !u && c < e.min ? i.push(x(a.messages[m].min, e.fullField, e.min)) : u && !s && c > e.max ? i.push(x(a.messages[m].max, e.fullField, e.max)) : s && u && (c < e.min || c > e.max) && i.push(x(a.messages[m].range, e.fullField, e.min, e.max));
}, R = "enum", _e = function(e, r, t, i, a) {
  e[R] = Array.isArray(e[R]) ? e[R] : [], e[R].indexOf(r) === -1 && i.push(x(a.messages[R], e.fullField, e[R].join(", ")));
}, Pe = function(e, r, t, i, a) {
  if (e.pattern) {
    if (e.pattern instanceof RegExp)
      e.pattern.lastIndex = 0, e.pattern.test(r) || i.push(x(a.messages.pattern.mismatch, e.fullField, r, e.pattern));
    else if (typeof e.pattern == "string") {
      var f = new RegExp(e.pattern);
      f.test(r) || i.push(x(a.messages.pattern.mismatch, e.fullField, r, e.pattern));
    }
  }
}, l = {
  required: fe,
  whitespace: xe,
  type: Ae,
  range: Ee,
  enum: _e,
  pattern: Pe
}, je = function(e, r, t, i, a) {
  var f = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r, "string") && !e.required)
      return t();
    l.required(e, r, i, f, a, "string"), b(r, "string") || (l.type(e, r, i, f, a), l.range(e, r, i, f, a), l.pattern(e, r, i, f, a), e.whitespace === !0 && l.whitespace(e, r, i, f, a));
  }
  t(f);
}, Se = function(e, r, t, i, a) {
  var f = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    l.required(e, r, i, f, a), r !== void 0 && l.type(e, r, i, f, a);
  }
  t(f);
}, Re = function(e, r, t, i, a) {
  var f = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (r === "" && (r = void 0), b(r) && !e.required)
      return t();
    l.required(e, r, i, f, a), r !== void 0 && (l.type(e, r, i, f, a), l.range(e, r, i, f, a));
  }
  t(f);
}, Ne = function(e, r, t, i, a) {
  var f = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    l.required(e, r, i, f, a), r !== void 0 && l.type(e, r, i, f, a);
  }
  t(f);
}, De = function(e, r, t, i, a) {
  var f = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    l.required(e, r, i, f, a), b(r) || l.type(e, r, i, f, a);
  }
  t(f);
}, Te = function(e, r, t, i, a) {
  var f = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    l.required(e, r, i, f, a), r !== void 0 && (l.type(e, r, i, f, a), l.range(e, r, i, f, a));
  }
  t(f);
}, Ve = function(e, r, t, i, a) {
  var f = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    l.required(e, r, i, f, a), r !== void 0 && (l.type(e, r, i, f, a), l.range(e, r, i, f, a));
  }
  t(f);
}, Me = function(e, r, t, i, a) {
  var f = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (r == null && !e.required)
      return t();
    l.required(e, r, i, f, a, "array"), r != null && (l.type(e, r, i, f, a), l.range(e, r, i, f, a));
  }
  t(f);
}, Ie = function(e, r, t, i, a) {
  var f = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    l.required(e, r, i, f, a), r !== void 0 && l.type(e, r, i, f, a);
  }
  t(f);
}, $e = "enum", Le = function(e, r, t, i, a) {
  var f = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    l.required(e, r, i, f, a), r !== void 0 && l[$e](e, r, i, f, a);
  }
  t(f);
}, ze = function(e, r, t, i, a) {
  var f = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r, "string") && !e.required)
      return t();
    l.required(e, r, i, f, a), b(r, "string") || l.pattern(e, r, i, f, a);
  }
  t(f);
}, Be = function(e, r, t, i, a) {
  var f = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r, "date") && !e.required)
      return t();
    if (l.required(e, r, i, f, a), !b(r, "date")) {
      var u;
      r instanceof Date ? u = r : u = new Date(r), l.type(e, u, i, f, a), u && l.range(e, u.getTime(), i, f, a);
    }
  }
  t(f);
}, Ue = function(e, r, t, i, a) {
  var f = [], s = Array.isArray(r) ? "array" : typeof r;
  l.required(e, r, i, f, a, s), t(f);
}, z = function(e, r, t, i, a) {
  var f = e.type, s = [], u = e.required || !e.required && i.hasOwnProperty(e.field);
  if (u) {
    if (b(r, f) && !e.required)
      return t();
    l.required(e, r, i, s, a, f), b(r, f) || l.type(e, r, i, s, a);
  }
  t(s);
}, Je = function(e, r, t, i, a) {
  var f = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (b(r) && !e.required)
      return t();
    l.required(e, r, i, f, a);
  }
  t(f);
}, V = {
  string: je,
  method: Se,
  number: Re,
  boolean: Ne,
  regexp: De,
  integer: Te,
  float: Ve,
  array: Me,
  object: Ie,
  enum: Le,
  pattern: ze,
  date: Be,
  url: z,
  hex: z,
  email: z,
  required: Ue,
  any: Je
};
function Y() {
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
var G = Y(), I = /* @__PURE__ */ function() {
  function n(r) {
    this.rules = null, this._messages = G, this.define(r);
  }
  var e = n.prototype;
  return e.define = function(t) {
    var i = this;
    if (!t)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof t != "object" || Array.isArray(t))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(t).forEach(function(a) {
      var f = t[a];
      i.rules[a] = Array.isArray(f) ? f : [f];
    });
  }, e.messages = function(t) {
    return t && (this._messages = re(Y(), t)), this._messages;
  }, e.validate = function(t, i, a) {
    var f = this;
    i === void 0 && (i = {}), a === void 0 && (a = function() {
    });
    var s = t, u = i, v = a;
    if (typeof u == "function" && (v = u, u = {}), !this.rules || Object.keys(this.rules).length === 0)
      return v && v(null, s), Promise.resolve(s);
    function c(d) {
      var g = [], o = {};
      function E(y) {
        if (Array.isArray(y)) {
          var F;
          g = (F = g).concat.apply(F, y);
        } else
          g.push(y);
      }
      for (var p = 0; p < d.length; p++)
        E(d[p]);
      g.length ? (o = Z(g), v(g, o)) : v(null, s);
    }
    if (u.messages) {
      var m = this.messages();
      m === G && (m = Y()), re(m, u.messages), u.messages = m;
    } else
      u.messages = this.messages();
    var h = {}, q = u.keys || Object.keys(this.rules);
    q.forEach(function(d) {
      var g = f.rules[d], o = s[d];
      g.forEach(function(E) {
        var p = E;
        typeof p.transform == "function" && (s === t && (s = S({}, s)), o = s[d] = p.transform(o)), typeof p == "function" ? p = {
          validator: p
        } : p = S({}, p), p.validator = f.getValidationMethod(p), p.validator && (p.field = d, p.fullField = p.fullField || d, p.type = f.getType(p), h[d] = h[d] || [], h[d].push({
          rule: p,
          value: o,
          source: s,
          field: d
        }));
      });
    });
    var O = {};
    return we(h, u, function(d, g) {
      var o = d.rule, E = (o.type === "object" || o.type === "array") && (typeof o.fields == "object" || typeof o.defaultField == "object");
      E = E && (o.required || !o.required && d.value), o.field = d.field;
      function p(w, j) {
        return S({}, j, {
          fullField: o.fullField + "." + w,
          fullFields: o.fullFields ? [].concat(o.fullFields, [w]) : [w]
        });
      }
      function y(w) {
        w === void 0 && (w = []);
        var j = Array.isArray(w) ? w : [w];
        !u.suppressWarning && j.length && n.warning("async-validator:", j), j.length && o.message !== void 0 && (j = [].concat(o.message));
        var _ = j.map(ee(o, s));
        if (u.first && _.length)
          return O[o.field] = 1, g(_);
        if (!E)
          g(_);
        else {
          if (o.required && !d.value)
            return o.message !== void 0 ? _ = [].concat(o.message).map(ee(o, s)) : u.error && (_ = [u.error(o, x(u.messages.required, o.field))]), g(_);
          var N = {};
          o.defaultField && Object.keys(d.value).map(function(P) {
            N[P] = o.defaultField;
          }), N = S({}, N, d.rule.fields);
          var K = {};
          Object.keys(N).forEach(function(P) {
            var A = N[P], se = Array.isArray(A) ? A : [A];
            K[P] = se.map(p.bind(null, P));
          });
          var X = new n(K);
          X.messages(u.messages), d.rule.options && (d.rule.options.messages = u.messages, d.rule.options.error = u.error), X.validate(d.value, d.rule.options || u, function(P) {
            var A = [];
            _ && _.length && A.push.apply(A, _), P && P.length && A.push.apply(A, P), g(A.length ? A : null);
          });
        }
      }
      var F;
      if (o.asyncValidator)
        F = o.asyncValidator(o, d.value, y, d.source, u);
      else if (o.validator) {
        try {
          F = o.validator(o, d.value, y, d.source, u);
        } catch (w) {
          console.error == null || console.error(w), u.suppressValidatorError || setTimeout(function() {
            throw w;
          }, 0), y(w.message);
        }
        F === !0 ? y() : F === !1 ? y(typeof o.message == "function" ? o.message(o.fullField || o.field) : o.message || (o.fullField || o.field) + " fails") : F instanceof Array ? y(F) : F instanceof Error && y(F.message);
      }
      F && F.then && F.then(function() {
        return y();
      }, function(w) {
        return y(w);
      });
    }, function(d) {
      c(d);
    }, s);
  }, e.getType = function(t) {
    if (t.type === void 0 && t.pattern instanceof RegExp && (t.type = "pattern"), typeof t.validator != "function" && t.type && !V.hasOwnProperty(t.type))
      throw new Error(x("Unknown rule type %s", t.type));
    return t.type || "string";
  }, e.getValidationMethod = function(t) {
    if (typeof t.validator == "function")
      return t.validator;
    var i = Object.keys(t), a = i.indexOf("message");
    return a !== -1 && i.splice(a, 1), i.length === 1 && i[0] === "required" ? V.required : V[this.getType(t)] || void 0;
  }, n;
}();
I.register = function(e, r) {
  if (typeof r != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  V[e] = r;
};
I.warning = ae;
I.messages = G;
I.validators = V;
const We = ne({
  name: "SFormItem",
  props: le,
  setup(n, {
    slots: e
  }) {
    const r = C("LABEL_DATA"), t = B(() => ({
      "s-form__item": !0,
      "s-form__item--horizontal": r.value.layout === "horizontal",
      "s-form__item--vertical": r.value.layout === "vertical",
      "s-form__item--error": f.value
    })), i = B(() => ({
      "s-form__label": !0,
      "s-form__label--vertical": r.value.layout === "vertical",
      [`s-form__label--${r.value.labelAlign}`]: r.value.layout === "horizontal",
      [`s-form__label--${r.value.labelSize}`]: r.value.layout === "horizontal"
    })), a = C(ie), f = H(!1), s = H(""), v = {
      validate: () => {
        if (!a)
          return console.warn("\u8BF7\u5728Form\u7EC4\u4EF6\u4E2D\u4F7F\u7528FormItem"), Promise.reject("\u8BF7\u5728Form\u7EC4\u4EF6\u4E2D\u4F7F\u7528FormItem");
        if (!n.field)
          return console.warn("\u5982\u679C\u8981\u6821\u9A8C\u5F53\u524D\u9879\uFF0C\u8BF7\u8BBE\u7F6Efield\u5B57\u6BB5"), Promise.reject("\u5982\u679C\u8981\u6821\u9A8C\u5F53\u524D\u9879\uFF0C\u8BF7\u8BBE\u7F6Efield\u5B57\u6BB5");
        if (!a.rules)
          return Promise.resolve({
            result: !0
          });
        const c = a.rules[n.field] || void 0;
        if (!c)
          return Promise.resolve({
            result: !0
          });
        const m = a.model[n.field];
        return new I({
          [n.field]: c
        }).validate({
          [n.field]: m
        }, (q) => {
          q ? (f.value = !0, s.value = q[0].message || "\u6821\u9A8C\u9519\u8BEF") : (f.value = !1, s.value = "");
        });
      }
    };
    return U("FORM_ITEM_CTX", v), oe(() => {
      n.field && (a == null || a.addItem(v));
    }), ue(() => {
      n.field && (a == null || a.removeItem(v));
    }), () => {
      var c;
      return D("div", {
        class: t.value
      }, [D("span", {
        class: i.value
      }, [n.label]), D("div", null, [(c = e.default) == null ? void 0 : c.call(e), f.value && D("div", {
        class: "error-message"
      }, [s.value])])]);
    };
  }
}), Ye = {
  install(n) {
    n.component("SForm", ce), n.component("SFormItem", We);
  }
};
export {
  ce as Form,
  We as FormItem,
  Ye as default
};
