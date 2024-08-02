import { defineComponent as f, createVNode as t } from "vue";
import { useResize as g } from "../../hooks/useResize.mjs";
import { createBorderBoxCommonProps as u, mergeColor as c } from "../../utils/borderBox.mjs";
import { withInstall as h } from "../../utils/common.mjs";
import { styled as x, getFullClassForBind as b } from "../../utils/styled.mjs";
import { BorderBoxContainer as B, BorderBoxContent as _ } from "../styled/borderBox.mjs";
import "lodash-es";
const C = ["#1d48c4", "#d3e1f8"], $ = ["left-top", "right-top", "left-bottom", "right-bottom"], d = x.svg`
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
`("border-svg-container"), E = /* @__PURE__ */ h(f({
  name: "BorderBox10",
  props: u(),
  setup(i, {
    slots: n
  }) {
    const {
      domRef: p,
      domSize: m
    } = g();
    return () => {
      const {
        width: r,
        height: e
      } = m, {
        backgroundColor: a,
        color: s
      } = i, l = c(C, s);
      return t(B, {
        class: b("border-box-10"),
        ref: (o) => p.value = o.$el,
        style: {
          boxShadow: `inset 0 0 25px 3px ${l[0]}`
        }
      }, {
        default: () => [t(d, {
          width: r,
          height: e
        }, {
          default: () => [t("polygon", {
            fill: a,
            points: `
                  4, 0 ${r - 4}, 0 ${r}, 4 ${r}, ${e - 4} ${r - 4}, ${e}
                  4, ${e} 0, ${e - 4} 0, 4
                `
          }, null)]
        }), $.map((o) => t(d, {
          width: "150px",
          height: "150px",
          key: o,
          class: o
        }, {
          default: () => [t("polygon", {
            fill: l[1],
            points: "40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3"
          }, null)]
        })), t(_, null, {
          default: () => {
            var o;
            return [t("slot", null, [(o = n.default) == null ? void 0 : o.call(n)])];
          }
        })]
      });
    };
  }
}));
export {
  E as BorderBox10
};
