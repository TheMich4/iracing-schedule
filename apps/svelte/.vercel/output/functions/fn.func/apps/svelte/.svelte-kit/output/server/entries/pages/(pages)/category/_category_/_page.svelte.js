import { b as pop, p as push } from "../../../../../chunks/index2.js";
import { g as getPreviousTuesdayString, S as Schedule_page, a as getScheduleState } from "../../../../../chunks/schedule-page.js";
const Categories = {
  OVAL: "Oval",
  ROAD: "Road",
  DIRT_OVAL: "Dirt Oval",
  DIRT_ROAD: "Dirt Road",
  SPORTS_CAR: "Sports Car",
  FORMULA_CAR: "Formula Car"
};
const categoryToName = {
  ["oval"]: Categories.OVAL,
  ["road"]: Categories.ROAD,
  ["dirt_oval"]: Categories.DIRT_OVAL,
  ["dirt_road"]: Categories.DIRT_ROAD,
  ["sports_car"]: Categories.SPORTS_CAR,
  ["formula_car"]: Categories.FORMULA_CAR
};
function _page($$payload, $$props) {
  push();
  let schedule = getScheduleState();
  let { data } = $$props;
  let column = data.column;
  let favorite = data.favorite;
  let weekData = data.schedule[getPreviousTuesdayString(schedule.date)]?.filter((item) => item.category === data.category);
  $$payload.out += `<!--[-->`;
  Schedule_page($$payload, {
    title: categoryToName[data.category],
    column,
    data: weekData,
    favorite
  });
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
