import { debounce as s } from "lodash-es";
import { ref as a, reactive as c, onMounted as d, onUnmounted as u } from "vue";
function m(e, n) {
  const t = new MutationObserver(n);
  return t.observe(e, {
    attributes: !0,
    attributeFilter: ["class", "style"],
    attributeOldValue: !0
  }), t;
}
function l(e, n) {
  const { clientWidth: t = 0, clientHeight: o = 0 } = e || {};
  e ? (!t || !o) && console.warn("DataV: Component width or height is 0px, rendering abnormality may occur!") : console.warn("DataV: Failed to get dom node, component rendering may be abnormal!"), n.width = t, n.height = o;
}
function f() {
  const e = a(), n = [], t = c({
    width: 0,
    height: 0
  }), o = () => {
    l(e.value, t);
  }, i = s(o, 100);
  return d(() => {
    o();
    const r = m(e.value, i);
    window.addEventListener("resize", i), n.push(
      () => {
        r.disconnect();
      },
      () => {
        window.removeEventListener("resize", i);
      }
    );
  }), u(() => {
    n.forEach((r) => r());
  }), {
    domRef: e,
    domSize: t
  };
}
export {
  f as useResize
};
