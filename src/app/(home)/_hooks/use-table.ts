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
import { type SeriesSeason } from "iracing-api";

const DEFAULT_COLUMN_FILTERS: ColumnFiltersState = [];
const DEFAULT_COLUMN_VISIBILITY = {
  id: false,
  maxIncidents: false,
  multiClass: false,
  scheduleDescription: false,
  startType: false,
};
const DEFAULT_SORTING: SortingState = [];

export const useTable = (
  columns: ColumnDef<SeriesSeason[], any>[],
  data: SeriesSeason[],
) => {
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

  return table;
};
