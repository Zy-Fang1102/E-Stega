import { defineComponent as m, createVNode as t } from "vue";
import { useResize as $ } from "../../hooks/useResize.mjs";
import { createBorderBoxCommonProps as u, mergeColor as h } from "../../utils/borderBox.mjs";
import { withInstall as c } from "../../utils/common.mjs";
import { styled as f, getFullClassForBind as k } from "../../utils/styled.mjs";
import { BorderBoxContainer as w, BorderBoxContent as B } from "../styled/borderBox.mjs";
import "lodash-es";
const _ = ["#2862b7", "#2862b7"], g = f.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.__STYLED__ > polyline {
  fill: none;
}
.__STYLED__ .stroke-width-1 {
  stroke-width: 1;
}
.__STYLED__ .stroke-width-3 {
  stroke-width: 3;
`("border-svg-container"), E = /* @__PURE__ */ c(m({
  name: "BorderBox3",
  props: u(),
  setup(i, {
    slots: n
  }) {
    const {
      domRef: s,
      domSize: d
    } = $();
    return () => {
      const {
        color: p,
        backgroundColor: a
      } = i, {
        width: o,
        height: e
      } = d, r = h(_, p);
      return t(w, {
        class: k("border-box-3"),
        ref: (l) => s.value = l.$el
      }, {
        default: () => [t(g, {
          width: o,
          height: e
        }, {
          default: () => [t("polygon", {
            fill: a,
            points: `23, 23 ${o - 24}, 23 ${o - 24}, ${e - 24} 23, ${e - 24}`
          }, null), t("polyline", {
            class: "stroke-width-3",
            stroke: r[0],
            points: `4, 4 ${o - 22} ,4 ${o - 22}, ${e - 22} 4, ${e - 22} 4, 4`
          }, null), t("polyline", {
            class: "stroke-width-1",
            stroke: r[1],
            points: `10, 10 ${o - 16}, 10 ${o - 16}, ${e - 16} 10, ${e - 16} 10, 10`
          }, null), t("polyline", {
            class: "stroke-width-1",
            stroke: r[1],
            points: `16, 16 ${o - 10}, 16 ${o - 10}, ${e - 10} 16, ${e - 10} 16, 16`
          }, null), t("polyline", {
            class: "stroke-width-1",
            stroke: r[1],
            points: `22, 22 ${o - 4}, 22 ${o - 4}, ${e - 4} 22, ${e - 4} 22, 22`
          }, null)]
        }), t(B, null, {
          default: () => {
            var l;
            return [t("slot", null, [(l = n.default) == null ? void 0 : l.call(n)])];
          }
        })]
      });
    };
  }
}));
export {
  E as BorderBox3
};
