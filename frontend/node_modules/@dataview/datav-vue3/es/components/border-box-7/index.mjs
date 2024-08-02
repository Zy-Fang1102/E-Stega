import { defineComponent as $, createVNode as e } from "vue";
import { useResize as u } from "../../hooks/useResize.mjs";
import { createBorderBoxCommonProps as c, mergeColor as h } from "../../utils/borderBox.mjs";
import { withInstall as k } from "../../utils/common.mjs";
import { styled as m, getFullClassForBind as w } from "../../utils/styled.mjs";
import { BorderBoxContainer as f, BorderBoxContent as x } from "../styled/borderBox.mjs";
import "lodash-es";
const g = ["rgba(128,128,128,0.3)", "rgba(128,128,128,0.5)"], B = m.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.__STYLED__ > polyline {
  fill: none;
  stroke-linecap: round;
}
.__STYLED__ .stroke-width2 {
  stroke-width: 2px;
}
.__STYLED__ .stroke-width5 {
  stroke-width: 5px;
`("border-svg-container"), E = /* @__PURE__ */ k($({
  name: "BorderBox7",
  props: c(),
  setup(n, {
    slots: s
  }) {
    const {
      domRef: i,
      domSize: d
    } = u();
    return () => {
      const {
        color: p,
        backgroundColor: a
      } = n, {
        width: o,
        height: t
      } = d, r = h(g, p);
      return e(f, {
        class: w("border-box-7"),
        ref: (l) => i.value = l.$el,
        style: {
          boxShadow: `inset 0 0 40px ${r[0]}`,
          border: `1px solid ${r[0]}`,
          backgroundColor: a
        }
      }, {
        default: () => [e(B, {
          width: o,
          height: t
        }, {
          default: () => [e("polyline", {
            class: "stroke-width2",
            stroke: r[0],
            points: "0, 25 0, 0 25, 0"
          }, null), e("polyline", {
            class: "stroke-width2",
            stroke: r[0],
            points: `${o - 25}, 0 ${o}, 0 ${o}, 25`
          }, null), e("polyline", {
            class: "stroke-width2",
            stroke: r[0],
            points: `${o - 25}, ${t} ${o}, ${t} ${o}, ${t - 25}`
          }, null), e("polyline", {
            class: "stroke-width2",
            stroke: r[0],
            points: `0, ${t - 25} 0, ${t} 25, ${t}`
          }, null), e("polyline", {
            class: "stroke-width5",
            stroke: r[1],
            points: "0, 10 0, 0 10, 0"
          }, null), e("polyline", {
            class: "stroke-width5",
            stroke: r[1],
            points: `${o - 10}, 0 ${o}, 0 ${o}, 10`
          }, null), e("polyline", {
            class: "stroke-width5",
            stroke: r[1],
            points: `${o - 10}, ${t} ${o}, ${t} ${o}, ${t - 10}`
          }, null), e("polyline", {
            class: "stroke-width5",
            stroke: r[1],
            points: `0, ${t - 10} 0, ${t} 10, ${t}`
          }, null)]
        }), e(x, null, {
          default: () => {
            var l;
            return [e("slot", null, [(l = s.default) == null ? void 0 : l.call(s)])];
          }
        })]
      });
    };
  }
}));
export {
  E as BorderBox7
};
