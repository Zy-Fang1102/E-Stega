var w = Object.defineProperty;
var f = Object.getOwnPropertySymbols;
var x = Object.prototype.hasOwnProperty, C = Object.prototype.propertyIsEnumerable;
var h = (o, e, t) => e in o ? w(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t, s = (o, e) => {
  for (var t in e || (e = {}))
    x.call(e, t) && h(o, t, e[t]);
  if (f)
    for (var t of f(e))
      C.call(e, t) && h(o, t, e[t]);
  return o;
};
import { defineComponent as v, createVNode as r } from "vue";
import { useResize as D } from "../../hooks/useResize.mjs";
import { withInstall as k, mergeColor as P } from "../../utils/common.mjs";
import { createColorProps as S, createReverseProps as b, createDurationProps as N } from "../../utils/decoration.mjs";
import { styled as R } from "../../utils/styled.mjs";
import "lodash-es";
const $ = ["#3faacb", "#fff"];
function z() {
  return s(s(s({}, S()), b()), N(6));
}
function M(o, e, t) {
  return o ? {
    width: 1,
    height: t,
    x: e / 2,
    y: 0
  } : {
    width: e,
    height: 1,
    x: 0,
    y: t / 2
  };
}
const T = R.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`("decoration-2"), A = /* @__PURE__ */ k(v({
  name: "Decoration2",
  props: z(),
  setup(o) {
    const {
      domRef: e,
      domSize: t
    } = D();
    return () => {
      const {
        width: n,
        height: a
      } = t, {
        color: u,
        reverse: i,
        duration: c
      } = o, l = P($, u), {
        x: d,
        y: m,
        width: p,
        height: g
      } = M(i, n, a);
      return r(T, {
        ref: (y) => e.value = y.$el
      }, {
        default: () => [r("svg", {
          width: n,
          height: a
        }, [r("rect", {
          x: d,
          y: m,
          width: p,
          height: g,
          fill: l[0]
        }, [r("animate", {
          attributeName: i ? "height" : "width",
          from: "0",
          to: i ? a : n,
          dur: `${c}s`,
          calcMode: "spline",
          keyTimes: "0;1",
          keySplines: ".42,0,.58,1",
          repeatCount: "indefinite"
        }, null)]), r("rect", {
          x: d,
          y: m,
          width: "1",
          height: "1",
          fill: l[1]
        }, [r("animate", {
          attributeName: i ? "y" : "x",
          from: "0",
          to: i ? a : n,
          dur: `${c}s`,
          calcMode: "spline",
          keyTimes: "0;1",
          keySplines: "0.42,0,0.58,1",
          repeatCount: "indefinite"
        }, null)])])]
      });
    };
  }
}));
export {
  A as Decoration2
};
