"use client";

import { useCallback, useEffect, useState } from "react";
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
import { type ParsedData } from "@/server/data/parse-seasons";
import { useFavorites } from "./use-favorite";

export interface GlobalFilter {
  favorite: { series: boolean };
}

const DEFAULT_COLUMN_FILTERS: ColumnFiltersState = [];
const DEFAULT_COLUMN_VISIBILITY = {
  id: false,
  maxIncidents: false,
  multiClass: false,
  scheduleDescription: false,
  startType: false,
};
const DEFAULT_SORTING: SortingState = [];

const getInitialTableState = () => {
  const storedState = localStorage.getItem("tableState");
  if (storedState) {
    return JSON.parse(storedState) as {
      columnFilters: ColumnFiltersState;
      columnVisibility: VisibilityState;
      sorting: SortingState;
    };
  }
  return {
    columnFilters: DEFAULT_COLUMN_FILTERS,
    columnVisibility: DEFAULT_COLUMN_VISIBILITY,
    sorting: DEFAULT_SORTING,
  };
};

export const useTable = (columns: ColumnDef<ParsedData, any>[]) => {
  const [weekString, setWeekString] = useState<string>(
    getPreviousTuesdayString(new Date()),
  );

  const favorites = useFavorites();

  const { data, isFetching } = api.schedule.get.useQuery(weekString, {
    initialData: [],
  });

  const [globalFilter, setGlobalFilter] = useState<{
    favorite: { series: boolean };
  }>({ favorite: { series: false } });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    getInitialTableState().columnFilters,
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    getInitialTableState().columnVisibility,
  );
  const [sorting, setSorting] = useState<SortingState>(
    getInitialTableState().sorting,
  );

  useEffect(() => {
    localStorage.setItem(
      "tableState",
      JSON.stringify({ columnFilters, columnVisibility, sorting }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnFilters, columnVisibility, sorting]);

  const globalFilterFn = useCallback(
    (row) => {
      if (globalFilter.favorite.series) {
        const { seasonId } = row.original;

        if (!favorites.series?.some((sId) => sId === seasonId)) {
          return false;
        }
      }

      return true;
    },
    [globalFilter, favorites],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      columnVisibility,
      sorting,
      globalFilter,
    },
    globalFilterFn,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
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
