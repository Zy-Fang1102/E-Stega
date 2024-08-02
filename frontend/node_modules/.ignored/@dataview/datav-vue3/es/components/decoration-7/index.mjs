import { defineComponent as p, createVNode as t } from "vue";
import { useResize as s } from "../../hooks/useResize.mjs";
import { withInstall as a, mergeColor as d } from "../../utils/common.mjs";
import { createColorProps as f } from "../../utils/decoration.mjs";
import { styled as c } from "../../utils/styled.mjs";
import "lodash-es";
const m = c.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`("decoration-7"), h = ["#1dc1f5", "#1dc1f5"], C = /* @__PURE__ */ a(p({
  name: "Decoration7",
  props: f(),
  setup(n, {
    slots: r
  }) {
    const {
      domRef: i
    } = s();
    return () => {
      const {
        color: l
      } = n, e = d(h, l);
      return t(m, {
        ref: (o) => i.value = o.$el
      }, {
        default: () => {
          var o;
          return [t("svg", {
            width: "21px",
            height: "20px"
          }, [t("polyline", {
            "stroke-width": "4",
            fill: "transparent",
            stroke: e[0],
            points: "10, 0 19, 10 10, 20"
          }, null), t("polyline", {
            "stroke-width": "2",
            fill: "transparent",
            stroke: e[1],
            points: "2, 0 11, 10 2, 20"
          }, null)]), (o = r.default) == null ? void 0 : o.call(r), t("svg", {
            width: "21px",
            height: "20px"
          }, [t("polyline", {
            "stroke-width": "4",
            fill: "transparent",
            stroke: e[0],
            points: "11, 0 2, 10 11, 20"
          }, null), t("polyline", {
            "stroke-width": "2",
            fill: "transparent",
            stroke: e[1],
            points: "19, 0 10, 10 19, 20"
          }, null)])];
        }
      });
    };
  }
}));
export {
  C as Decoration7
};
