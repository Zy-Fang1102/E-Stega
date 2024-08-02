import { defineComponent as b, createVNode as e } from "vue";
import { useResize as N } from "../../hooks/useResize.mjs";
import { withInstall as x, mergeColor as P } from "../../utils/common.mjs";
import { createColorProps as S } from "../../utils/decoration.mjs";
import { styled as _ } from "../../utils/styled.mjs";
import "lodash-es";
function D({
  width: u,
  height: d,
  rowPoints: a,
  rowCount: l
}) {
  const c = u / (a + 1), m = d / (l + 1);
  return new Array(l).fill(0).map((i, o) => new Array(a).fill(0).map((s, h) => [c * (h + 1), m * (o + 1)])).reduce((i, o) => [...i, ...o], []);
}
const R = ["#fff", "#0de7c2"], f = 200, p = 50, g = 20, z = 4, t = 2.5, C = t / 2, v = D({
  width: f,
  height: p,
  rowPoints: g,
  rowCount: z
}), n = v[g * 2 - 1], r = v[g * 2 - 3], L = _.div`
  width: 100%;
  height: 100%;
}
.__STYLED__ svg {
  transform-origin: left top;
`("decoration-1"), I = /* @__PURE__ */ x(b({
  name: "Decoration1",
  props: S(),
  setup(u) {
    const {
      domRef: d,
      domSize: a
    } = N();
    return () => {
      const {
        color: l
      } = u, {
        width: c,
        height: m
      } = a, i = P(R, l), o = {
        transform: `scale(${c / f},${m / p})`
      };
      return e(L, {
        ref: (s) => d.value = s.$el
      }, {
        default: () => [e("svg", {
          width: f,
          height: p,
          style: o
        }, [v.map(([s, h], $) => {
          const w = s - C, y = h - C;
          return Math.random() > 0.6 ? e("rect", {
            key: $,
            x: w,
            y,
            width: t,
            height: t,
            fill: i[0]
          }, [Math.random() > 0.6 && e("animate", {
            attributeName: "fill",
            values: `${i[0]};transparent`,
            dur: "1s",
            begin: Math.random() * 2,
            repeatCount: "indefinite"
          }, null)]) : null;
        }), e("rect", {
          fill: i[1],
          x: n[0] - t,
          y: n[1] - t,
          width: t * 2,
          height: t * 2
        }, [e("animate", {
          attributeName: "width",
          values: `0;${t * 2}`,
          dur: "2s",
          repeatCount: "indefinite"
        }, null), e("animate", {
          attributeName: "height",
          values: `0;${t * 2}`,
          dur: "2s",
          repeatCount: "indefinite"
        }, null), e("animate", {
          attributeName: "x",
          values: `${n[0]};${n[0] - t}`,
          dur: "2s",
          repeatCount: "indefinite"
        }, null), e("animate", {
          attributeName: "y",
          values: `${n[1]};${n[1] - t}`,
          dur: "2s",
          repeatCount: "indefinite"
        }, null)]), e("rect", {
          fill: i[1],
          x: r[0] - t,
          y: r[1] - t,
          width: t * 2,
          height: t * 2
        }, [e("animate", {
          attributeName: "width",
          values: "0;40;0",
          dur: "2s",
          repeatCount: "indefinite"
        }, null), e("animate", {
          attributeName: "x",
          values: `${r[0]};${r[0] - 40};${r[0]}`,
          dur: "2s",
          repeatCount: "indefinite"
        }, null)])])]
      });
    };
  }
}));
export {
  I as Decoration1
};
