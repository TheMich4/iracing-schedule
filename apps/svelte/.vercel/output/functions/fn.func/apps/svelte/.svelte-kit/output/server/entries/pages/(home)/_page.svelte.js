import { b as pop, p as push } from "../../../chunks/index2.js";
import { g as getPreviousTuesdayString, S as Schedule_page, a as getScheduleState } from "../../../chunks/schedule-page.js";
function _page($$payload, $$props) {
  push();
  let schedule = getScheduleState();
  let { data } = $$props;
  let column = data.column;
  let favorite = data.favorite;
  let weekSchedule = data.schedule[getPreviousTuesdayString(schedule.date)];
  $$payload.out += `<!--[-->`;
  Schedule_page($$payload, {
    column,
    data: weekSchedule,
    favorite,
    title: "Schedule"
  });
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
