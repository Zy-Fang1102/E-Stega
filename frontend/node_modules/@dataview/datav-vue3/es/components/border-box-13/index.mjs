import { defineComponent as f, createVNode as o } from "vue";
import { useResize as m } from "../../hooks/useResize.mjs";
import { createBorderBoxCommonProps as u, mergeColor as L } from "../../utils/borderBox.mjs";
import { withInstall as c } from "../../utils/common.mjs";
import { styled as h, getFullClassForBind as $ } from "../../utils/styled.mjs";
import { BorderBoxContainer as B, BorderBoxContent as g } from "../styled/borderBox.mjs";
import "lodash-es";
const C = ["#6586ec", "#2cf7fe"], x = h.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`("border-svg-container"), F = /* @__PURE__ */ c(f({
  name: "BorderBox13",
  props: u(),
  setup(a, {
    slots: l
  }) {
    const {
      domRef: d,
      domSize: i
    } = m();
    return () => {
      const {
        color: s,
        backgroundColor: p
      } = a, {
        width: r,
        height: e
      } = i, t = L(C, s);
      return o(B, {
        class: $("border-box-13"),
        ref: (n) => d.value = n.$el
      }, {
        default: () => [o(x, {
          width: r,
          height: e
        }, {
          default: () => [o("path", {
            fill: p,
            stroke: t[0],
            d: `
                  M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
                  L ${r - 20} 10 L ${r - 5} 25
                  L ${r - 5} ${e - 5} L 20 ${e - 5}
                  L 5 ${e - 20} L 5 20
                `
          }, null), o("path", {
            fill: "transparent",
            "stroke-width": "3",
            "stroke-linecap": "round",
            "stroke-dasharray": "10, 5",
            stroke: t[0],
            d: "M 16 9 L 61 9"
          }, null), o("path", {
            fill: "transparent",
            stroke: t[1],
            d: "M 5 20 L 5 10 L 12 3  L 60 3 L 68 10"
          }, null), o("path", {
            fill: "transparent",
            stroke: t[1],
            d: `M ${r - 5} ${e - 30} L ${r - 5} ${e - 5} L ${r - 30} ${e - 5}`
          }, null)]
        }), o(g, null, {
          default: () => {
            var n;
            return [o("slot", null, [(n = l.default) == null ? void 0 : n.call(l)])];
          }
        })]
      });
    };
  }
}));
export {
  F as BorderBox13
};
