import { defineComponent as $, createVNode as o } from "vue";
import { useResize as d } from "../../hooks/useResize.mjs";
import { createBorderBoxCommonProps as f, mergeColor as m } from "../../utils/borderBox.mjs";
import { withInstall as y } from "../../utils/common.mjs";
import { styled as a, getFullClassForBind as k } from "../../utils/styled.mjs";
import { BorderBoxContainer as g, BorderBoxContent as x } from "../styled/borderBox.mjs";
import "lodash-es";
const B = ["rgba(255, 255, 255, 0.35)", "gray"], h = a.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.__STYLED__ > polyline {
  fill: none;
  stroke-width: 1;
`("border-svg-container"), F = /* @__PURE__ */ y($({
  name: "BorderBox6",
  props: f(),
  setup(i, {
    slots: t
  }) {
    const {
      domRef: p,
      domSize: s
    } = d();
    return () => {
      const {
        color: u,
        backgroundColor: c
      } = i, {
        width: l,
        height: e
      } = s, n = m(B, u);
      return o(g, {
        class: k("border-box-6"),
        ref: (r) => p.value = r.$el
      }, {
        default: () => [o(h, {
          width: l,
          height: e
        }, {
          default: () => [o("polygon", {
            fill: c,
            points: `
              9, 7 ${l - 9}, 7 ${l - 9}, ${e - 7} 9, ${e - 7}`
          }, null), o("circle", {
            fill: n[1],
            cx: "5",
            cy: "5",
            r: "2"
          }, null), o("circle", {
            fill: n[1],
            cx: l - 5,
            cy: "5",
            r: "2"
          }, null), o("circle", {
            fill: n[1],
            cx: l - 5,
            cy: e - 5,
            r: "2"
          }, null), o("circle", {
            fill: n[1],
            cx: "5",
            cy: e - 5,
            r: "2"
          }, null), o("polyline", {
            stroke: n[0],
            points: `10, 4 ${l - 10}, 4`
          }, null), o("polyline", {
            stroke: n[0],
            points: `10, ${e - 4} ${l - 10}, ${e - 4}`
          }, null), o("polyline", {
            stroke: n[0],
            points: `5, 70 5, ${e - 70}`
          }, null), o("polyline", {
            stroke: n[0],
            points: `${l - 5}, 70 ${l - 5}, ${e - 70}`
          }, null), o("polyline", {
            stroke: n[0],
            points: "3, 10, 3, 50"
          }, null), o("polyline", {
            stroke: n[0],
            points: "7, 30 7, 80"
          }, null), o("polyline", {
            stroke: n[0],
            points: `${l - 3}, 10 ${l - 3}, 50`
          }, null), o("polyline", {
            stroke: n[0],
            points: `${l - 7}, 30 ${l - 7}, 80`
          }, null), o("polyline", {
            stroke: n[0],
            points: `3, ${e - 10} 3, ${e - 50}`
          }, null), o("polyline", {
            stroke: n[0],
            points: `7, ${e - 30} 7, ${e - 80}`
          }, null), o("polyline", {
            stroke: n[0],
            points: `${l - 3}, ${e - 10} ${l - 3}, ${e - 50}`
          }, null), o("polyline", {
            stroke: n[0],
            points: `${l - 7}, ${e - 30} ${l - 7}, ${e - 80}`
          }, null)]
        }), o(x, null, {
          default: () => {
            var r;
            return [o("slot", null, [(r = t.default) == null ? void 0 : r.call(t)])];
          }
        })]
      });
    };
  }
}));
export {
  F as BorderBox6
};
