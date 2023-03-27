/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import type { SeasonMap } from "~/types";
import { useMemo } from "react";

const useSchedule = (): SeasonMap => {
  if (typeof window === "undefined") return {};

  const schedule: SeasonMap = useMemo(
    () => JSON.parse(localStorage.getItem("schedule") ?? "{}") || {},
    [localStorage.getItem("schedule")]
  );

  return schedule;
};

export default useSchedule;
