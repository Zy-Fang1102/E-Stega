import { merge as a } from "lodash-es";
function s(t) {
  const n = t;
  return n.install = function(o) {
    o.component(n.displayName || n.name, t);
  }, t;
}
const c = (t) => t, i = (t, n) => {
  const o = Math.abs(t[0] - n[0]), e = Math.abs(t[1] - n[1]);
  return Math.sqrt(Math.pow(o, 2) + Math.pow(e, 2));
};
function u(t, n = []) {
  return a(t, n);
}
export {
  i as calcTwoPointDistance,
  c as definePropType,
  u as mergeColor,
  s as withInstall
};
