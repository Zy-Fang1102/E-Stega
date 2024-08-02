import { defineComponent as m, createVNode as e } from "vue";
import { fade as d } from "@jiaminghi/color";
import { useResize as c } from "../../hooks/useResize.mjs";
import { useUuid as g } from "../../hooks/useUuid.mjs";
import { createBorderBoxCommonProps as k, mergeColor as C } from "../../utils/borderBox.mjs";
import { withInstall as w } from "../../utils/common.mjs";
import { styled as B, getFullClassForBind as L } from "../../utils/styled.mjs";
import { BorderBoxContainer as b, BorderBoxContent as x } from "../styled/borderBox.mjs";
import "lodash-es";
const n = ["#2e6099", "#7ce7fd"], M = B.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`("border-svg-container"), R = /* @__PURE__ */ w(m({
  name: "BorderBox12",
  props: k(),
  setup(s, {
    slots: u
  }) {
    const {
      domRef: a,
      domSize: f
    } = c(), $ = g();
    return () => {
      const {
        color: p,
        backgroundColor: h
      } = s, {
        width: o,
        height: r
      } = f, t = C(n, p), l = `border-box-12-filterId-${$}`;
      return e(b, {
        class: L("border-box-12"),
        ref: (i) => a.value = i.$el
      }, {
        default: () => [e(M, {
          width: o,
          height: r
        }, {
          default: () => [e("defs", null, [e("filter", {
            id: l,
            height: "150%",
            width: "150%",
            x: "-25%",
            y: "-25%"
          }, [e("feMorphology", {
            operator: "dilate",
            radius: "1",
            in: "SourceAlpha",
            result: "thicken"
          }, null), e("feGaussianBlur", {
            in: "thicken",
            stdDeviation: "2",
            result: "blurred"
          }, null), e("feFlood", {
            "flood-color": d(t[1] || n[1], 70),
            result: "glowColor"
          }, [e("animate", {
            attributeName: "flood-color",
            values: `
                        ${d(t[1] || n[1], 70)};
                        ${d(t[1] || n[1], 30)};
                        ${d(t[1] || n[1], 70)};
                      `,
            dur: "3s",
            begin: "0s",
            repeatCount: "indefinite"
          }, null)]), e("feComposite", {
            in: "glowColor",
            in2: "blurred",
            operator: "in",
            result: "softGlowColored"
          }, null), e("feMerge", null, [e("feMergeNode", {
            in: "softGlowColored"
          }, null), e("feMergeNode", {
            in: "SourceGraphic"
          }, null)])])]), o && r && e("path", {
            fill: h,
            "stroke-width": "2",
            stroke: t[0],
            d: `
                    M15 5 L ${o - 15} 5 Q ${o - 5} 5, ${o - 5} 15
                    L ${o - 5} ${r - 15} Q ${o - 5} ${r - 5}, ${o - 15} ${r - 5}
                    L 15, ${r - 5} Q 5 ${r - 5} 5 ${r - 15} L 5 15
                    Q 5 5 15 5
                  `
          }, null), e("path", {
            "stroke-width": "2",
            fill: "transparent",
            "stroke-linecap": "round",
            filter: `url(#${l})`,
            stroke: t[1],
            d: "M 20 5 L 15 5 Q 5 5 5 15 L 5 20"
          }, null), e("path", {
            "stroke-width": "2",
            fill: "transparent",
            "stroke-linecap": "round",
            filter: `url(#${l})`,
            stroke: t[1],
            d: `M ${o - 20} 5 L ${o - 15} 5 Q ${o - 5} 5 ${o - 5} 15 L ${o - 5} 20`
          }, null), e("path", {
            "stroke-width": "2",
            fill: "transparent",
            "stroke-linecap": "round",
            filter: `url(#${l})`,
            stroke: t[1],
            d: `
                  M ${o - 20} ${r - 5} L ${o - 15} ${r - 5}
                  Q ${o - 5} ${r - 5} ${o - 5} ${r - 15}
                  L ${o - 5} ${r - 20}
                `
          }, null), e("path", {
            "stroke-width": "2",
            fill: "transparent",
            "stroke-linecap": "round",
            filter: `url(#${l})`,
            stroke: t[1],
            d: `
                  M 20 ${r - 5} L 15 ${r - 5}
                  Q 5 ${r - 5} 5 ${r - 15}
                  L 5 ${r - 20}
                `
          }, null)]
        }), e(x, null, {
          default: () => {
            var i;
            return [e("slot", null, [(i = u.default) == null ? void 0 : i.call(u)])];
          }
        })]
      });
    };
  }
}));
export {
  R as BorderBox12
};
