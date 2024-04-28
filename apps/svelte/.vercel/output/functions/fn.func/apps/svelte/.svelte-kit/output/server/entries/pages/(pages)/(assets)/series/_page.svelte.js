import { b as pop, p as push } from "../../../../../chunks/index2.js";
import { C as Coming_soon } from "../../../../../chunks/coming-soon.js";
function _page($$payload, $$props) {
  push();
  $$payload.out += `<!--[-->`;
  Coming_soon($$payload);
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
