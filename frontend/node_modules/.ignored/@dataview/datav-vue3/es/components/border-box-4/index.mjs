var f = Object.defineProperty, w = Object.defineProperties;
var y = Object.getOwnPropertyDescriptors;
var p = Object.getOwnPropertySymbols;
var $ = Object.prototype.hasOwnProperty, _ = Object.prototype.propertyIsEnumerable;
var d = (l, o, r) => o in l ? f(l, o, { enumerable: !0, configurable: !0, writable: !0, value: r }) : l[o] = r, a = (l, o) => {
  for (var r in o || (o = {}))
    $.call(o, r) && d(l, r, o[r]);
  if (p)
    for (var r of p(o))
      _.call(o, r) && d(l, r, o[r]);
  return l;
}, k = (l, o) => w(l, y(o));
import { defineComponent as B, createVNode as e } from "vue";
import g from "classnames";
import { useResize as x } from "../../hooks/useResize.mjs";
import { mergeColor as C, createBorderBoxCommonProps as b } from "../../utils/borderBox.mjs";
import { withInstall as v } from "../../utils/common.mjs";
import { styled as D, getFullClassForBind as S } from "../../utils/styled.mjs";
import { BorderBoxContainer as E, BorderBoxContent as L } from "../styled/borderBox.mjs";
import "lodash-es";
const T = ["red", "rgba(0,0,255,0.8)"], Y = D.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
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
.__STYLED__ .stroke-width3 {
  stroke-width: 3px;
  stroke-linecap: round;
`("border-svg-container"), z = () => k(a({}, b()), {
  reverse: {
    type: Boolean,
    default: !1
  }
}), G = /* @__PURE__ */ v(B({
  name: "BorderBox4",
  props: z(),
  setup(l, {
    slots: o
  }) {
    const {
      domRef: r,
      domSize: u
    } = x();
    return () => {
      const {
        color: c,
        backgroundColor: h,
        reverse: m
      } = l, {
        width: n,
        height: t
      } = u, s = C(T, c);
      return e(E, {
        class: S("border-box-4"),
        ref: (i) => r.value = i.$el
      }, {
        default: () => [e(Y, {
          class: g({
            reverse: m
          }),
          width: n,
          height: t
        }, {
          default: () => [e("polygon", {
            fill: h,
            points: `${n - 15}, 22 170, 22 150, 7 40, 7 28, 21 32, 24
                16, 42 16, ${t - 32} 41, ${t - 7} ${n - 15}, ${t - 7}`
          }, null), e("polyline", {
            class: "stroke-width1",
            stroke: s[0],
            points: `145, ${t - 5} 40, ${t - 5} 10, ${t - 35} 10, 40 40, 5 150, 5 170, 20 ${n - 15}, 20`
          }, null), e("polyline", {
            stroke: s[1],
            class: "stroke-width1",
            points: `245, ${t - 1} 36, ${t - 1} 14, ${t - 23} 14, ${t - 100}`
          }, null), e("polyline", {
            class: "stroke-width3",
            stroke: s[0],
            points: `7, ${t - 40} 7, ${t - 75}`
          }, null), e("polyline", {
            class: "stroke-width3",
            stroke: s[0],
            points: "28, 24 13, 41 13, 64"
          }, null), e("polyline", {
            class: "stroke-width1",
            stroke: s[0],
            points: "5, 45 5, 140"
          }, null), e("polyline", {
            class: "stroke-width1",
            stroke: s[1],
            points: "14, 75 14, 180"
          }, null), e("polyline", {
            class: "stroke-width1",
            stroke: s[1],
            points: "55, 11 147, 11 167, 26 250, 26"
          }, null), e("polyline", {
            class: "stroke-width3",
            stroke: s[1],
            points: "158, 5 173, 16"
          }, null), e("polyline", {
            class: "stroke-width3",
            style: {
              strokeDasharray: "100 250"
            },
            stroke: s[0],
            points: `200, 17 ${n - 10}, 17`
          }, null), e("polyline", {
            class: "stroke-width1",
            style: {
              strokeDasharray: "80 270"
            },
            stroke: s[1],
            points: `385, 17 ${n - 10}, 17`
          }, null)]
        }), e(L, null, {
          default: () => {
            var i;
            return [e("slot", null, [(i = o.default) == null ? void 0 : i.call(o)])];
          }
        })]
      });
    };
  }
}));
export {
  G as BorderBox4
};
