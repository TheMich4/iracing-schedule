"use client";

import { useState } from "react";
import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
  type ColumnFiltersState,
  getFacetedRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
  type SortingState,
  getSortedRowModel,
  type VisibilityState,
} from "@tanstack/react-table";
import { api } from "@/trpc/react";
import { getPreviousTuesdayString } from "@/lib/week";
import { type ParsedSeasonsData } from "@/server/data/parse-seasons";

const DEFAULT_COLUMN_FILTERS: ColumnFiltersState = [];
const DEFAULT_COLUMN_VISIBILITY = {
  id: false,
  maxIncidents: false,
  multiClass: false,
  scheduleDescription: false,
  startType: false,
};
const DEFAULT_SORTING: SortingState = [];

export const useTable = (columns: ColumnDef<ParsedSeasonsData, any>[]) => {
  const [weekString, setWeekString] = useState<string>(
    getPreviousTuesdayString(new Date()),
  );

  const { data, isFetching } = api.schedule.get.useQuery(weekString, {
    initialData: [],
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    DEFAULT_COLUMN_FILTERS,
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    DEFAULT_COLUMN_VISIBILITY,
  );
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      columnVisibility,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const updateWeekDate = (date: Date) => {
    setWeekString(getPreviousTuesdayString(date));
  };

  return { table, updateWeekDate, isFetching };
};
