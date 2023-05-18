/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import type { Schedule, ScheduleMap } from "~/types";
import { getNewWeekSchedule, getScheduleDateRange } from "./helpers";
import { useEffect, useMemo, useState } from "react";

import { format } from "date-fns";
import { getLastTuesday } from "~/utils/get-last-tuesday";
import { importSchedule } from "~/utils/import-schedule";

interface ScheduleData {
  schedule: Array<Schedule>;
  minDate?: Date;
  maxDate?: Date;
}

interface UseScheduleArgs {
  date: Date;
}

export const useSchedule = ({ date }: UseScheduleArgs): ScheduleData => {
  if (typeof window === "undefined") return { schedule: [] };

  const [schedule, setSchedule] = useState<Array<Schedule>>([]);

  const scheduleMap = useMemo<ScheduleMap>(() => importSchedule() || {}, []);

  const tuesday = useMemo<string>(
    () => format(getLastTuesday(date), "yyyy-MM-dd") ?? "",
    [date]
  );

  const { minDate, maxDate } = useMemo(
    () => getScheduleDateRange(scheduleMap),
    [scheduleMap]
  );

  // Handle week change
  useEffect(
    () => setSchedule(getNewWeekSchedule(scheduleMap, tuesday)),
    [tuesday]
  );

  return {
    schedule,
    minDate,
    maxDate,
  };
};
