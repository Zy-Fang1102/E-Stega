var f = Object.defineProperty, _ = Object.defineProperties;
var k = Object.getOwnPropertyDescriptors;
var d = Object.getOwnPropertySymbols;
var w = Object.prototype.hasOwnProperty, g = Object.prototype.propertyIsEnumerable;
var p = (l, o, r) => o in l ? f(l, o, { enumerable: !0, configurable: !0, writable: !0, value: r }) : l[o] = r, a = (l, o) => {
  for (var r in o || (o = {}))
    w.call(o, r) && p(l, r, o[r]);
  if (d)
    for (var r of d(o))
      g.call(o, r) && p(l, r, o[r]);
  return l;
}, $ = (l, o) => _(l, k(o));
import { defineComponent as B, createVNode as s } from "vue";
import x from "classnames";
import { useResize as y } from "../../hooks/useResize.mjs";
import { mergeColor as C, createBorderBoxCommonProps as b } from "../../utils/borderBox.mjs";
import { withInstall as v } from "../../utils/common.mjs";
import { styled as S, getFullClassForBind as D } from "../../utils/styled.mjs";
import { BorderBoxContainer as E, BorderBoxContent as L } from "../styled/borderBox.mjs";
import "lodash-es";
const T = ["rgba(255, 255, 255, 0.35)", "rgba(255, 255, 255, 0.20)"], Y = S.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.__STYLED__ > polyline {
  fill: none;
}
.__STYLED__.reverse {
  transform: rotate(180deg);
}
.__STYLED__ .stroke-width1 {
  stroke-width: 1;
}
.__STYLED__ .stroke-width2 {
  stroke-width: 2px;
}
.__STYLED__ .stroke-width5 {
  stroke-width: 5px;
`("border-svg-container"), z = () => $(a({}, b()), {
  reverse: {
    type: Boolean,
    default: !1
  }
}), G = /* @__PURE__ */ v(B({
  name: "BorderBox5",
  props: z(),
  setup(l, {
    slots: o
  }) {
    const {
      domRef: r,
      domSize: m
    } = y();
    return () => {
      const {
        color: u,
        backgroundColor: c,
        reverse: h
      } = l, {
        width: e,
        height: t
      } = m, n = C(T, u);
      return s(E, {
        class: D("border-box-5"),
        ref: (i) => r.value = i.$el
      }, {
        default: () => [s(Y, {
          class: x({
            reverse: h
          }),
          width: e,
          height: t
        }, {
          default: () => [s("polygon", {
            fill: c,
            points: `
                  10, 22 ${e - 22}, 22 ${e - 22}, ${t - 86} ${e - 84}, ${t - 24} 10, ${t - 24}`
          }, null), s("polyline", {
            class: "stroke-width1",
            stroke: n[0],
            points: `8, 5 ${e - 5}, 5 ${e - 5}, ${t - 100}
                  ${e - 100}, ${t - 5} 8, ${t - 5} 8, 5`
          }, null), s("polyline", {
            class: "stroke-width1",
            stroke: n[1],
            points: `3, 5 ${e - 20}, 5 ${e - 20}, ${t - 60}
                  ${e - 74}, ${t - 5} 3, ${t - 5} 3, 5`
          }, null), s("polyline", {
            class: "stroke-width5",
            stroke: n[1],
            points: `50, 13 ${e - 35}, 13`
          }, null), s("polyline", {
            class: "stroke-width2",
            stroke: n[1],
            points: `15, 20 ${e - 35}, 20`
          }, null), s("polyline", {
            class: "stroke-width2",
            stroke: n[1],
            points: `15, ${t - 20} ${e - 110}, ${t - 20}`
          }, null), s("polyline", {
            class: "stroke-width5",
            stroke: n[1],
            points: `15, ${t - 13} ${e - 110}, ${t - 13}`
          }, null)]
        }), s(L, null, {
          default: () => {
            var i;
            return [s("slot", null, [(i = o.default) == null ? void 0 : i.call(o)])];
          }
        })]
      });
    };
  }
}));
export {
  G as BorderBox5
};
