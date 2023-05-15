import { useEffect, useState } from "react";

interface ColumnVisibility {
  carClasses: boolean;
  fixedSetup: boolean;
  licenseGroup: boolean;
  multiclass: boolean;
  official: boolean;
  raceLength: boolean;
  raceWeekNum: boolean;
  seriesName: boolean;
  startDate: boolean;
  startType: boolean;
  trackName: boolean;
  trackType: boolean;
}

const defaultColumnVisibility = {
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
      (JSON.parse(lsColumnVisibility) as ColumnVisibility) ||
      defaultColumnVisibility
    );
  }

  return defaultColumnVisibility;
};

export const useColumnVisibility = () => {
  const [columnVisibility, setColumnVisibility] = useState(
    getInitialColumnVisibility()
  );

  useEffect(() => {
    localStorage.setItem("columnVisibility", JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  return [columnVisibility, setColumnVisibility];
};
