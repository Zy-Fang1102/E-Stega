var y = Object.defineProperty;
var p = Object.getOwnPropertySymbols;
var D = Object.prototype.hasOwnProperty, x = Object.prototype.propertyIsEnumerable;
var m = (o, e, t) => e in o ? y(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t, n = (o, e) => {
  for (var t in e || (e = {}))
    D.call(e, t) && m(o, t, e[t]);
  if (p)
    for (var t of p(e))
      x.call(e, t) && m(o, t, e[t]);
  return o;
};
import { defineComponent as _, createVNode as i } from "vue";
import k from "classnames";
import { useResize as C } from "../../hooks/useResize.mjs";
import { withInstall as $, mergeColor as P } from "../../utils/common.mjs";
import { createColorProps as b, createReverseProps as S, createDurationProps as R } from "../../utils/decoration.mjs";
import { styled as f } from "../../utils/styled.mjs";
import "lodash-es";
function z() {
  return n(n(n({}, b()), S()), R(3));
}
const E = ["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.3)"], L = f.div`
  position: relative;
  width: 100%;
  height: 100%;
`("decoration-4"), T = f.div`
  display: flex;
  overflow: hidden;
  position: absolute;
  flex: 1;
}
.__STYLED__.normal {
  animation: ani-height ease-in-out infinite;
  left: 50%;
  margin-left: -2px;
}
.__STYLED__.reverse {
  animation: ani-width ease-in-out infinite;
  top: 50%;
  margin-top: -2px;
}
@keyframes ani-height {
  0% {
    height: 0%;
  }
  70% {
    height: 100%;
  }
  100% {
    height: 100%;
  }
}
@keyframes ani-width {
  0% {
    width: 0%;
  }
  70% {
    width: 100%;
  }
  100% {
    width: 100%;
  }
`("decoration-content"), A = /* @__PURE__ */ $(_({
  name: "Decoration4",
  props: z(),
  setup(o) {
    const {
      domRef: e,
      domSize: t
    } = C();
    return () => {
      const {
        width: s,
        height: a
      } = t, {
        color: g,
        reverse: r,
        duration: u
      } = o, l = P(E, g), h = r ? s : 5, c = r ? 5 : a, v = {
        width: `${h}px`,
        height: `${c}px`,
        animationDuration: `${u}s`
      }, d = r ? `0, 2.5 ${s}, 2.5` : `2.5, 0 2.5, ${a}`;
      return i(L, {
        ref: (w) => e.value = w.$el
      }, {
        default: () => [i(T, {
          class: k(r ? "reverse" : "normal"),
          style: v
        }, {
          default: () => [i("svg", {
            width: h,
            height: c
          }, [i("polyline", {
            stroke: l[0],
            points: d
          }, null), i("polyline", {
            class: "bold-line",
            stroke: l[1],
            "stroke-width": "3",
            "stroke-dasharray": "20, 80",
            "stroke-dashoffset": "-30",
            points: d
          }, null)])]
        })]
      });
    };
  }
}));
export {
  A as Decoration4
};
