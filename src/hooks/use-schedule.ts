/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import type { SeasonMap } from "~/types";
import { format } from "date-fns";
import getLastTuesday from "~/utils/get-last-tuesday";
import { useMemo } from "react";

const useSchedule = (date: Date): SeasonMap => {
  if (typeof window === "undefined") return {};

  const tuesday = useMemo<string>(
    () => format(getLastTuesday(date), "yyyy-MM-dd"),
    [date]
  );

  const schedule: SeasonMap = useMemo(() => {
    if (!tuesday) return [];

    const s = JSON.parse(localStorage.getItem("schedule") ?? "{}") || {};

    return s[tuesday] || [];
  }, [tuesday]);

  return schedule;
};

export default useSchedule;
