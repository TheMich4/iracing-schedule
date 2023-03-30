/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import type { Schedule, ScheduleMap } from "~/types";
import { useEffect, useMemo, useState } from "react";

import { format } from "date-fns";
import getLastTuesday from "~/utils/get-last-tuesday";

interface ScheduleData {
  schedule: Array<Schedule>;
  minDate?: Date;
  maxDate?: Date;
}

interface UseScheduleArgs {
  date: Date;
}

const useSchedule = ({ date }: UseScheduleArgs): ScheduleData => {
  if (typeof window === "undefined") return { schedule: [] };

  const [schedule, setSchedule] = useState<Array<Schedule>>([]);

  const scheduleMap = useMemo<ScheduleMap>(
    () => JSON.parse(localStorage.getItem("schedule") ?? "{}") || {},
    []
  );

  const tuesday = useMemo<string>(
    () => format(getLastTuesday(date), "yyyy-MM-dd") ?? "",
    [date]
  );

  // Handle week change
  useEffect(() => {
    if (!tuesday) {
      setSchedule([]);
    }

    setSchedule(Object.values(scheduleMap[tuesday] || {}) ?? []);
  }, [tuesday]);

  const { minDate, maxDate } = useMemo(() => {
    return Object.keys(scheduleMap || {}).reduce(
      (acc, key) => {
        const date = new Date(key);

        if (date < acc.minDate) acc.minDate = date;
        if (date > acc.maxDate) acc.maxDate = date;

        return acc;
      },
      { minDate: new Date(), maxDate: new Date() }
    );
  }, [scheduleMap]);

  return {
    schedule,
    minDate,
    maxDate,
  };
};

export default useSchedule;
