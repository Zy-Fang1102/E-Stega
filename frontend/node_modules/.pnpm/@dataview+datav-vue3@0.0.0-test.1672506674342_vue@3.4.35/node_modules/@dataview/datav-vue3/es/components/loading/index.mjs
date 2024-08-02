import { defineComponent as n, createVNode as e } from "vue";
import { withInstall as a } from "../../utils/common.mjs";
import { styled as i } from "../../utils/styled.mjs";
import "lodash-es";
const o = i.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.__STYLED__ .loading-tip {
  font-size: 15px;
`("loading"), f = /* @__PURE__ */ a(n({
  name: "Loading",
  setup(l, {
    slots: t
  }) {
    return () => e(o, null, {
      default: () => {
        var r;
        return [e("svg", {
          width: "50px",
          height: "50px"
        }, [e("circle", {
          cx: "25",
          cy: "25",
          r: "20",
          fill: "transparent",
          "stroke-width": "3",
          "stroke-dasharray": "31.415, 31.415",
          stroke: "#02bcfe",
          "stroke-linecap": "round"
        }, [e("animateTransform", {
          attributeName: "transform",
          type: "rotate",
          values: "0, 25 25;360, 25 25",
          dur: "1.5s",
          repeatCount: "indefinite"
        }, null), e("animate", {
          attributeName: "stroke",
          values: "#02bcfe;#3be6cb;#02bcfe",
          dur: "3s",
          repeatCount: "indefinite"
        }, null)]), e("circle", {
          cx: "25",
          cy: "25",
          r: "10",
          fill: "transparent",
          "stroke-width": "3",
          "stroke-dasharray": "15.7, 15.7",
          stroke: "#3be6cb",
          "stroke-linecap": "round"
        }, [e("animateTransform", {
          attributeName: "transform",
          type: "rotate",
          values: "360, 25 25;0, 25 25",
          dur: "1.5s",
          repeatCount: "indefinite"
        }, null), e("animate", {
          attributeName: "stroke",
          values: "#3be6cb;#02bcfe;#3be6cb",
          dur: "3s",
          repeatCount: "indefinite"
        }, null)])]), e("div", {
          class: "loading-tip"
        }, [(r = t.default) == null ? void 0 : r.call(t)])];
      }
    });
  }
}));
export {
  f as Loading
};
