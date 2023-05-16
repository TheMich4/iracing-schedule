import { useEffect, useState } from "react";

import type { VisibilityState } from "@tanstack/react-table";

const defaultColumnVisibility: VisibilityState = {
  carClasses: true,
  fixedSetup: false,
  licenseGroup: true,
  multiclass: false,
  official: false,
  raceLength: false,
  raceWeekNum: false,
  seriesName: true,
  startDate: false,
  startType: false,
  trackName: true,
  trackType: false,
};

const getInitialColumnVisibility = () => {
  const lsColumnVisibility =
    typeof window !== "undefined" && localStorage.getItem("columnVisibility");

  if (lsColumnVisibility && lsColumnVisibility !== "{}") {
    return (
      (JSON.parse(lsColumnVisibility) as VisibilityState) ||
      defaultColumnVisibility
    );
  }

  return defaultColumnVisibility;
};

export const useColumnVisibility = () => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    getInitialColumnVisibility()
  );

  useEffect(() => {
    localStorage.setItem("columnVisibility", JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  return { columnVisibility, setColumnVisibility };
};
