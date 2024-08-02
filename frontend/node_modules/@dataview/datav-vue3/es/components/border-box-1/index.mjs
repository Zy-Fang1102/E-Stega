import { defineComponent as s, createVNode as r } from "vue";
import { useResize as f } from "../../hooks/useResize.mjs";
import { createBorderBoxCommonProps as u, mergeColor as g } from "../../utils/borderBox.mjs";
import { withInstall as b } from "../../utils/common.mjs";
import { styled as h, getFullClassForBind as c } from "../../utils/styled.mjs";
import { BorderBoxContainer as B, BorderBoxContent as C } from "../styled/borderBox.mjs";
import "lodash-es";
const _ = ["#4fd2dd", "#235fa7"], x = ["left-top", "right-top", "left-bottom", "right-bottom"], l = h.svg`
  position: absolute;
  display: block;
}
.__STYLED__.right-top {
  right: 0px;
  transform: rotateY(180deg);
}
.__STYLED__.left-bottom {
  bottom: 0px;
  transform: rotateX(180deg);
}
.__STYLED__.right-bottom {
  right: 0px;
  bottom: 0px;
  transform: rotateX(180deg) rotateY(180deg);
`("border"), D = /* @__PURE__ */ b(s({
  name: "BorderBox1",
  props: u(),
  setup($, {
    slots: n
  }) {
    const {
      domRef: a,
      domSize: d
    } = f();
    return () => {
      const {
        color: m,
        backgroundColor: p
      } = $, {
        width: t,
        height: o
      } = d, e = g(_, m);
      return r(B, {
        class: c("border-box-1"),
        ref: (i) => a.value = i.$el
      }, {
        default: () => [r(l, {
          width: t,
          height: o
        }, {
          default: () => [r("polygon", {
            fill: p,
            points: `10, 27 10, ${o - 27} 13, ${o - 24} 13, ${o - 21} 24, ${o - 11} 38, ${o - 11}
                41, ${o - 8} 73, ${o - 8} 75, ${o - 10} 81, ${o - 10} 85, ${o - 6}
                ${t - 85}, ${o - 6} ${t - 81}, ${o - 10} ${t - 75}, ${o - 10}
                ${t - 73}, ${o - 8} ${t - 41}, ${o - 8} ${t - 38}, ${o - 11}
                ${t - 24}, ${o - 11} ${t - 13}, ${o - 21} ${t - 13}, ${o - 24}
                ${t - 10}, ${o - 27} ${t - 10}, 27 ${t - 13}, 25 ${t - 13}, 21
                ${t - 24}, 11 ${t - 38}, 11 ${t - 41}, 8 ${t - 73}, 8 ${t - 75}, 10
                ${t - 81}, 10 ${t - 85}, 6 85, 6 81, 10 75, 10 73, 8 41, 8 38, 11 24, 11 13, 21 13, 24`
          }, null)]
        }), x.map((i) => r(l, {
          key: i,
          width: "150",
          height: "150",
          class: i
        }, {
          default: () => [r("polygon", {
            fill: e[0],
            points: "6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63"
          }, [r("animate", {
            attributeName: "fill",
            values: `${e[0]};${e[1]};${e[0]}`,
            dur: "0.5s",
            begin: "0s",
            repeatCount: "indefinite"
          }, null)]), r("polygon", {
            fill: e[1],
            points: "27.6,4.8 38.4,4.8 35.4,7.8 30.6,7.8"
          }, [r("animate", {
            attributeName: "fill",
            values: `${e[1]};${e[0]};${e[1]}`,
            dur: "0.5s",
            begin: "0s",
            repeatCount: "indefinite"
          }, null)]), r("polygon", {
            fill: e[0],
            points: "9,54 9,63 7.2,66 7.2,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54"
          }, [r("animate", {
            attributeName: "fill",
            values: `${e[0]};${e[1]};transparent`,
            dur: "1s",
            begin: "0s",
            repeatCount: "indefinite"
          }, null)])]
        })), r(C, null, {
          default: () => {
            var i;
            return [(i = n.default) == null ? void 0 : i.call(n)];
          }
        })]
      });
    };
  }
}));
export {
  D as BorderBox1
};
