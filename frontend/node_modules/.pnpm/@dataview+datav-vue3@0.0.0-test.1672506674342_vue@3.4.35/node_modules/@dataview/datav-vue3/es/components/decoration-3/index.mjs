import { defineComponent as v, createVNode as r } from "vue";
import { useResize as w } from "../../hooks/useResize.mjs";
import { withInstall as y, mergeColor as C } from "../../utils/common.mjs";
import { createColorProps as S } from "../../utils/decoration.mjs";
import { styled as _ } from "../../utils/styled.mjs";
import "lodash-es";
function P({
  width: i,
  height: a,
  rowPoints: e,
  rowCount: n
}) {
  const s = i / (e + 1), c = a / (n + 1);
  return new Array(n).fill(0).map((o, t) => new Array(e).fill(0).map((f, l) => [s * (l + 1), c * (t + 1)])).reduce((o, t) => [...o, ...t], []);
}
const D = ["#7acaec", "transparent"], m = 300, d = 35, M = 25, $ = 2, h = 7, p = h / 2, x = P({
  width: m,
  height: d,
  rowPoints: M,
  rowCount: $
}), z = _.div`
  width: 100%;
  height: 100%;
}
.__STYLED__ svg {
  transform-origin: left top;
`("decoration-3"), j = /* @__PURE__ */ y(v({
  name: "Decoration3",
  props: S(),
  setup(i) {
    const {
      domRef: a,
      domSize: e
    } = w();
    return () => {
      const {
        width: n,
        height: s
      } = e, {
        color: c
      } = i, o = C(D, c);
      return r(z, {
        ref: (t) => a.value = t.$el
      }, {
        default: () => [r("svg", {
          width: m,
          height: d,
          style: {
            transform: `scale(${n / m},${s / d})`
          }
        }, [x.map(([t, f], l) => {
          const u = t - p, g = f - p;
          return Math.random() > 0.6 ? r("rect", {
            key: l,
            x: u,
            y: g,
            width: h,
            height: h,
            fill: o[0]
          }, [Math.random() > 0.6 && r("animate", {
            attributeName: "fill",
            values: o.join(";"),
            dur: `${Math.random() + 1}s`,
            begin: Math.random() * 2,
            repeatCount: "indefinite"
          }, null)]) : null;
        })])]
      });
    };
  }
}));
export {
  j as Decoration3
};
