import { b as pop, p as push } from "./index2.js";
function Coming_soon($$payload, $$props) {
  push();
  $$payload.out += `<div class="flex h-full w-full items-center justify-center text-2xl tracking-tighter">This page is coming soon.</div>`;
  pop();
}
export {
  Coming_soon as C
};
