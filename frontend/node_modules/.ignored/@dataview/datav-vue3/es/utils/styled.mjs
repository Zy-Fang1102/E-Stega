import { defineComponent as C, onMounted as S, onUnmounted as g, createVNode as d, mergeProps as _ } from "vue";
let f = "dv-";
function $(e) {
  f = e;
}
function c(e, n = !0) {
  return `${n ? "." : ""}${f || ""}${e}`;
}
function x(e) {
  return c(e, !1);
}
function v(e, n) {
  const r = c(n);
  return `.__STYLED__ {${e.toString()}}`.replaceAll(".__STYLED__", r);
}
function t(e) {
  return (n) => {
    const r = document.createElement("style"), i = (a) => {
      r.innerHTML = v(n, a), document.querySelector("head").appendChild(r);
    }, o = () => document.querySelector("head").removeChild(r);
    return (a) => {
      const m = e, p = c(a, !1);
      return /* @__PURE__ */ C({
        setup(y, {
          slots: u
        }) {
          return S(() => {
            i(a);
          }), g(() => {
            o();
          }), () => d(m, _(y, {
            class: p
          }), {
            default: () => {
              var l;
              return [(l = u == null ? void 0 : u.default) == null ? void 0 : l.call(u)];
            }
          });
        }
      });
    };
  };
}
t.span = t((e, {
  slots: n
}) => d("span", e, [n == null ? void 0 : n.default()]));
t.div = t((e, {
  slots: n
}) => d("div", e, [n == null ? void 0 : n.default()]));
t.img = t((e) => d("img", e, null));
t.svg = t((e, {
  slots: n
}) => d("svg", e, [n == null ? void 0 : n.default()]));
export {
  x as getFullClassForBind,
  $ as setClassPrefix,
  t as styled
};
