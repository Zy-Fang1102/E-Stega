import { uniqueId as r } from "lodash-es";
import { readonly as i, reactive as u } from "vue";
function t() {
  return i(u({ id: r("datav_uuid") }));
}
export {
  t as useUuid
};
