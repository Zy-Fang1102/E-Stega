import { defineComponent as u, createVNode as o } from "vue";
import { useResize as m } from "../../hooks/useResize.mjs";
import { createBorderBoxCommonProps as s, mergeColor as a } from "../../utils/borderBox.mjs";
import { withInstall as x } from "../../utils/common.mjs";
import { styled as $, getFullClassForBind as g } from "../../utils/styled.mjs";
import { BorderBoxContainer as B, BorderBoxContent as h } from "../styled/borderBox.mjs";
import "lodash-es";
const C = ["#fff", "rgba(255, 255, 255, 0.6)"], y = $.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.__STYLED__ > polyline {
  fill: none;
  stroke-width: 1;
`("border-svg-container"), F = /* @__PURE__ */ x(u({
  name: "BorderBox2",
  props: s(),
  setup(i, {
    slots: n
  }) {
    const {
      domRef: c,
      domSize: d
    } = m();
    return () => {
      const {
        color: f,
        backgroundColor: p
      } = i, {
        width: r,
        height: e
      } = d, l = a(C, f);
      return o(B, {
        class: g("border-box-2"),
        ref: (t) => c.value = t.$el
      }, {
        default: () => [o(y, {
          width: r,
          height: e
        }, {
          default: () => [o("polygon", {
            fill: p,
            points: `7, 7 ${r - 7}, 7 ${r - 7}, ${e - 7} 7, ${e - 7}`
          }, null), o("polyline", {
            stroke: l[0],
            points: `2, 2 ${r - 2} ,2 ${r - 2}, ${e - 2} 2, ${e - 2} 2, 2`
          }, null), o("polyline", {
            stroke: l[1],
            points: `6, 6 ${r - 6}, 6 ${r - 6}, ${e - 6} 6, ${e - 6} 6, 6`
          }, null), o("circle", {
            fill: l[0],
            cx: "11",
            cy: "11",
            r: "1"
          }, null), o("circle", {
            fill: l[0],
            cx: r - 11,
            cy: "11",
            r: "1"
          }, null), o("circle", {
            fill: l[0],
            cx: r - 11,
            cy: e - 11,
            r: "1"
          }, null), o("circle", {
            fill: l[0],
            cx: "11",
            cy: e - 11,
            r: "1"
          }, null)]
        }), o(h, null, {
          default: () => {
            var t;
            return [o("slot", null, [(t = n.default) == null ? void 0 : t.call(n)])];
          }
        })]
      });
    };
  }
}));
export {
  F as BorderBox2
};
