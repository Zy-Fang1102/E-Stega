import { definePropType as r } from "./common.mjs";
import "lodash-es";
function n() {
  return {
    color: {
      type: r(Array),
      default: () => []
    }
  };
}
function u() {
  return {
    reverse: {
      type: Boolean,
      default: !1
    }
  };
}
function a(e) {
  return {
    duration: {
      type: Number,
      default: e
    }
  };
}
export {
  n as createColorProps,
  a as createDurationProps,
  u as createReverseProps
};
