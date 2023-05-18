import { useEffect } from "react";

import type { Filter } from "./types";
import { licenseGroups } from "~/utils/license";
import { useState } from "react";
import { type ColumnFiltersState } from "@tanstack/react-table";
import { trackTypes } from "~/utils/track-type";

const defaultFilter: ColumnFiltersState = [
  {
    id: "licenseGroup",
    value: Object.keys(licenseGroups),
  },
  {
    id: "trackType",
    value: Object.keys(trackTypes),
  },
];

const getInitialFilter = (): ColumnFiltersState => {
  const lsFilter =
    typeof window !== "undefined" && localStorage.getItem("filter");

  if (lsFilter && lsFilter !== "[]") {
    return (JSON.parse(lsFilter) as Filter) || defaultFilter;
  }

  return defaultFilter;
};

export const useColumnFilters = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    getInitialFilter()
  );

  useEffect(() => {
    localStorage.setItem("filter", JSON.stringify(columnFilters));
  }, [columnFilters]);

  return { columnFilters, setColumnFilters };
};
