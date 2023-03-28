/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import type { Schedule, ScheduleMap } from "~/types";

import { format } from "date-fns";
import getLastTuesday from "~/utils/get-last-tuesday";
import { useMemo } from "react";

interface ScheduleData {
  schedule: Array<Schedule>;
  minDate?: Date;
  maxDate?: Date;
}

const useSchedule = (date: Date): ScheduleData => {
  if (typeof window === "undefined") return { schedule: [] };

  const tuesday = useMemo<string>(
    () => format(getLastTuesday(date), "yyyy-MM-dd") ?? "",
    [date]
  );

  const data = useMemo<ScheduleData>(() => {
    if (!tuesday) return { schedule: [] };

    const s: ScheduleMap =
      JSON.parse(localStorage.getItem("schedule") ?? "{}") || {};

    const { minDate, maxDate } = Object.keys(s || {}).reduce(
      (acc, key) => {
        const date = new Date(key);

        if (date < acc.minDate) acc.minDate = date;
        if (date > acc.maxDate) acc.maxDate = date;

        return acc;
      },
      { minDate: new Date(), maxDate: new Date() }
    );

    return {
      schedule: Object.values(s[tuesday] || {}) ?? [],
      minDate,
      maxDate,
    };
  }, [tuesday]);

  return data;
};

export default useSchedule;
