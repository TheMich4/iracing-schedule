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

export const useTable = (
  columns: ColumnDef<SeriesSeason[], any>[],
  data: SeriesSeason[][],
) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
    scheduleDescription: false,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

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
