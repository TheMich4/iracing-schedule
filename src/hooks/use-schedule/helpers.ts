import type { Schedule, ScheduleMap } from "~/types";

export const getNewWeekSchedule = (
  scheduleMap: ScheduleMap,
  tuesday: string
): Array<Schedule> => {
  if (!tuesday) return [];

  return Object.values(scheduleMap[tuesday] || {}) ?? [];
};

export const getScheduleDateRange = (
  scheduleMap: ScheduleMap
): { minDate: Date; maxDate: Date } =>
  Object.keys(scheduleMap || {}).reduce(
    (acc, key) => {
      const date = new Date(key);

      if (date < acc.minDate) acc.minDate = date;
      if (date > acc.maxDate) acc.maxDate = date;

      return acc;
    },
    { minDate: new Date(), maxDate: new Date() }
  );
