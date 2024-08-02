import { merge as e } from "lodash-es";
import { definePropType as t } from "./common.mjs";
function m() {
  return {
    color: {
      type: t(Array),
      default: () => []
    },
    backgroundColor: {
      type: String,
      default: "transparent"
    }
  };
}
function a(r, o = []) {
  return e(r, o);
}
export {
  m as createBorderBoxCommonProps,
  a as mergeColor
};
