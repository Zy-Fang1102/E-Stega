import { defineComponent as _, createVNode as i } from "vue";
import { random as g } from "lodash-es";
import { useResize as C } from "../../hooks/useResize.mjs";
import { withInstall as M, mergeColor as k } from "../../utils/common.mjs";
import { createColorProps as w } from "../../utils/decoration.mjs";
import { styled as A } from "../../utils/styled.mjs";
const b = ["#7acaec", "#7acaec"], y = 300, v = 35, D = 1, z = 40, $ = 7, H = $ / 2, N = A.div`
  width: 100%;
  height: 100%;
}
.__STYLED__ .svg-origin {
  transform-origin: left top;
`("decoration-6");
function R({
  width: d,
  height: n,
  rowPoints: r,
  rowCount: t
}) {
  const s = d / (r + 1), p = n / (t + 1), f = new Array(t).fill(0).map((o, e) => new Array(r).fill(0).map((W, S) => [s * (S + 1), p * (e + 1)])).reduce((o, e) => [...o, ...e], []), c = new Array(t * r).fill(0).map(() => Math.random() > 0.8 ? g(0.7 * n, n) : g(0.2 * n, 0.5 * n)), h = new Array(t * r).fill(0).map((o, e) => c[e] * Math.random()), a = new Array(t * r).fill(0).map(() => Math.random() + 1.5);
  return {
    points: f,
    heights: c,
    minHeights: h,
    randoms: a
  };
}
const {
  points: T,
  heights: l,
  minHeights: m,
  randoms: u
} = R({
  width: y,
  height: v,
  rowPoints: z,
  rowCount: D
}), Y = /* @__PURE__ */ M(_({
  name: "Decoration6",
  props: w(),
  setup(d) {
    const {
      domRef: n,
      domSize: r
    } = C();
    return () => {
      const {
        width: t,
        height: s
      } = r, {
        color: p
      } = d, f = k(b, p), c = {
        transform: `scale(${t / y},${s / v})`
      }, h = () => f[Math.random() > 0.5 ? 0 : 1];
      return i(N, {
        ref: (a) => n.value = a.$el
      }, {
        default: () => [i("svg", {
          class: "svg-origin",
          width: t,
          height: s,
          style: c
        }, [T.map(([a, o], e) => i("rect", {
          key: `rect${e}`,
          fill: h(),
          x: a - H,
          y: o - l[e],
          width: $,
          height: l[e]
        }, [i("animate", {
          attributeName: "y",
          values: `${o - m[e] / 2};${o - l[e] / 2};${o - m[e] / 2}`,
          dur: u[e],
          keyTimes: "0;0.5;1",
          calcMode: "spline",
          keySplines: "0.42,0,0.58,1;0.42,0,0.58,1",
          begin: "0s",
          repeatCount: "indefinite"
        }, null), i("animate", {
          attributeName: "height",
          values: `${m[e]};${l[e]};${m[e]}`,
          dur: u[e],
          keyTimes: "0;0.5;1",
          calcMode: "spline",
          keySplines: "0.42,0,0.58,1;0.42,0,0.58,1",
          begin: "0s",
          repeatCount: "indefinite"
        }, null)]))])]
      });
    };
  }
}));
export {
  Y as Decoration6
};
