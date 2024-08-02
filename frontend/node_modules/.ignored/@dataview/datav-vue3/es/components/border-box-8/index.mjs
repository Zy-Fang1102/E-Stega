var C = Object.defineProperty, y = Object.defineProperties;
var L = Object.getOwnPropertyDescriptors;
var c = Object.getOwnPropertySymbols;
var v = Object.prototype.hasOwnProperty, w = Object.prototype.propertyIsEnumerable;
var $ = (r, o, t) => o in r ? C(r, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[o] = t, h = (r, o) => {
  for (var t in o || (o = {}))
    v.call(o, t) && $(r, t, o[t]);
  if (c)
    for (var t of c(o))
      w.call(o, t) && $(r, t, o[t]);
  return r;
}, x = (r, o) => y(r, L(o));
import { defineComponent as M, createVNode as e } from "vue";
import { useResize as N } from "../../hooks/useResize.mjs";
import { useUuid as z } from "../../hooks/useUuid.mjs";
import { mergeColor as F, createBorderBoxCommonProps as P } from "../../utils/borderBox.mjs";
import { withInstall as R } from "../../utils/common.mjs";
import { styled as S, getFullClassForBind as D } from "../../utils/styled.mjs";
import { BorderBoxContainer as G, BorderBoxContent as I } from "../styled/borderBox.mjs";
import "lodash-es";
const U = ["#235fa7", "#4fd2dd"], V = S.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
`("border-svg-container"), j = () => x(h({}, P()), {
  dur: {
    type: Number,
    default: 3
  },
  reverse: {
    type: Boolean,
    default: !1
  }
}), W = /* @__PURE__ */ R(M({
  name: "BorderBox8",
  props: j(),
  setup(r, {
    slots: o
  }) {
    const {
      domRef: t,
      domSize: g
    } = N(), d = z();
    return () => {
      const {
        color: b,
        backgroundColor: B,
        dur: s,
        reverse: k
      } = r, {
        width: n,
        height: l
      } = g, u = F(U, b), a = `border-box-8-path-${d.id}`, f = `border-box-8-gradient-${d.id}`, p = `border-box-8-mask-${d.id}`, m = k ? `M 2.5, 2.5 L 2.5, ${l - 2.5} L ${n - 2.5}, ${l - 2.5} L ${n - 2.5}, 2.5 L 2.5, 2.5` : `M2.5, 2.5 L${n - 2.5}, 2.5 L${n - 2.5}, ${l - 2.5} L2.5, ${l - 2.5} L2.5, 2.5`;
      return e(G, {
        class: D("border-box-8"),
        ref: (i) => t.value = i.$el
      }, {
        default: () => [e(V, {
          width: n,
          height: l
        }, {
          default: () => [e("defs", null, [e("path", {
            id: a,
            d: m,
            fill: "transparent"
          }, null), e("radialGradient", {
            id: f,
            cx: "50%",
            cy: "50%",
            r: "50%"
          }, [e("stop", {
            offset: "0%",
            "stop-color": "#fff",
            "stop-opacity": "1"
          }, null), e("stop", {
            offset: "100%",
            "stop-color": "#fff",
            "stop-opacity": "0"
          }, null)]), e("mask", {
            id: p
          }, [e("circle", {
            cx: "0",
            cy: "0",
            r: "150",
            fill: `url(#${f})`
          }, [e("animateMotion", {
            dur: `${s}s`,
            path: m,
            rotate: "auto",
            repeatCount: "indefinite"
          }, null)])])]), e("polygon", {
            fill: B,
            points: `5, 5 ${n - 5}, 5 ${n - 5} ${l - 5} 5, ${l - 5}`
          }, null), e("use", {
            stroke: u[0],
            "stroke-width": "1",
            "xlink:href": `#${a}`
          }, null), e("use", {
            stroke: u[1],
            "stroke-width": "3",
            "xlink:href": `#${a}`,
            mask: `url(#${p})`
          }, [e("animate", {
            attributeName: "stroke-dasharray",
            from: `0, ${length}`,
            to: `${length}, 0`,
            dur: `${s}s`,
            repeatCount: "indefinite"
          }, null)])]
        }), e(I, null, {
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
  W as BorderBox8
};
