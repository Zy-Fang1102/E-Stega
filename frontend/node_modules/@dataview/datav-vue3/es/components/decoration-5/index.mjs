var C = Object.defineProperty;
var u = Object.getOwnPropertySymbols;
var D = Object.prototype.hasOwnProperty, S = Object.prototype.propertyIsEnumerable;
var p = (o, e, n) => e in o ? C(o, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : o[e] = n, l = (o, e) => {
  for (var n in e || (e = {}))
    D.call(e, n) && p(o, n, e[n]);
  if (u)
    for (var n of u(e))
      S.call(e, n) && p(o, n, e[n]);
  return o;
};
import { defineComponent as b, createVNode as r } from "vue";
import { sum as f } from "lodash-es";
import { useResize as T } from "../../hooks/useResize.mjs";
import { withInstall as j, mergeColor as M, calcTwoPointDistance as v } from "../../utils/common.mjs";
import { createColorProps as N, createDurationProps as z } from "../../utils/decoration.mjs";
import { styled as L } from "../../utils/styled.mjs";
const R = ["#3f96a5", "#3f96a5"];
function V() {
  return l(l({}, N()), z(1.2));
}
function d(o) {
  return new Array(o.length - 1).fill(0).map((e, n) => v(o[n], o[n + 1]));
}
function X(o, e) {
  const n = [[0, e * 0.2], [o * 0.18, e * 0.2], [o * 0.2, e * 0.4], [o * 0.25, e * 0.4], [o * 0.27, e * 0.6], [o * 0.72, e * 0.6], [o * 0.75, e * 0.4], [o * 0.8, e * 0.4], [o * 0.82, e * 0.2], [o, e * 0.2]], i = [[o * 0.3, e * 0.8], [o * 0.7, e * 0.8]];
  return {
    line1Sum: f(d(n)),
    line2Sum: f(d(i)),
    line1Point: n.map((t) => t.join(",")).join(" "),
    line2Point: i.map((t) => t.join(",")).join(" ")
  };
}
const x = L.div`
  width: 100%;
  height: 100%;
`("decoration-5"), F = /* @__PURE__ */ j(b({
  name: "Decoration5",
  props: V(),
  setup(o) {
    const {
      domRef: e,
      domSize: n
    } = T();
    return () => {
      const {
        width: i,
        height: t
      } = n, {
        color: y,
        duration: m
      } = o, c = M(R, y), {
        line1Sum: a,
        line2Sum: s,
        line1Point: P,
        line2Point: k
      } = X(i, t);
      return r(x, {
        ref: ($) => e.value = $.$el
      }, {
        default: () => [r("svg", {
          width: i,
          height: t
        }, [r("polyline", {
          fill: "transparent",
          stroke: c[0],
          "stroke-width": "3",
          points: P
        }, [r("animate", {
          attributeName: "stroke-dasharray",
          attributeType: "XML",
          from: `0, ${a / 2}, 0, ${a / 2}`,
          to: `0, 0, ${a}, 0`,
          dur: `${m}s`,
          begin: "0s",
          calcMode: "spline",
          keyTimes: "0;1",
          keySplines: "0.4,1,0.49,0.98",
          repeatCount: "indefinite"
        }, null)]), r("polyline", {
          fill: "transparent",
          stroke: c[1],
          "stroke-width": "2",
          points: k
        }, [r("animate", {
          attributeName: "stroke-dasharray",
          attributeType: "XML",
          from: `0, ${s / 2}, 0, ${s / 2}`,
          to: `0, 0, ${s}, 0`,
          dur: `${m}s`,
          begin: "0s",
          calcMode: "spline",
          keyTimes: "0;1",
          keySplines: ".4,1,.49,.98",
          repeatCount: "indefinite"
        }, null)])])]
      });
    };
  }
}));
export {
  F as Decoration5
};
