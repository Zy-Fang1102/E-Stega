var u = Object.defineProperty;
var c = Object.getOwnPropertySymbols;
var h = Object.prototype.hasOwnProperty, $ = Object.prototype.propertyIsEnumerable;
var f = (t, e, o) => e in t ? u(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o, p = (t, e) => {
  for (var o in e || (e = {}))
    h.call(e, o) && f(t, o, e[o]);
  if (c)
    for (var o of c(e))
      $.call(e, o) && f(t, o, e[o]);
  return t;
};
import { defineComponent as w, createVNode as i } from "vue";
import { useResize as g } from "../../hooks/useResize.mjs";
import { withInstall as k, mergeColor as C } from "../../utils/common.mjs";
import { createColorProps as v, createReverseProps as y } from "../../utils/decoration.mjs";
import { styled as D } from "../../utils/styled.mjs";
import "lodash-es";
const P = ["#3f96a5", "#3f96a5"];
function x() {
  return p(p({}, v()), y());
}
const R = D.div`
  display: flex;
  width: 100%;
  height: 100%;
`("decoration-8"), q = /* @__PURE__ */ k(w({
  name: "Decoration8",
  props: x(),
  setup(t) {
    const {
      domRef: e,
      domSize: o
    } = g();
    return () => {
      const {
        color: d,
        reverse: m
      } = t, {
        width: l,
        height: n
      } = o, r = (s) => m ? l - s : s, a = C(P, d);
      return i(R, {
        ref: (s) => e.value = s.$el
      }, {
        default: () => [i("svg", {
          width: l,
          height: n
        }, [i("polyline", {
          stroke: a[0],
          "stroke-width": "2",
          fill: "transparent",
          points: `${r(0)}, 0 ${r(30)}, ${n / 2}`
        }, null), i("polyline", {
          stroke: a[0],
          "stroke-width": "2",
          fill: "transparent",
          points: `${r(20)}, 0 ${r(50)}, ${n / 2} ${r(l)}, ${n / 2}`
        }, null), i("polyline", {
          stroke: a[1],
          fill: "transparent",
          "stroke-width": "3",
          points: `${r(0)}, ${n - 3}, ${r(200)}, ${n - 3}`
        }, null)])]
      });
    };
  }
}));
export {
  q as Decoration8
};
