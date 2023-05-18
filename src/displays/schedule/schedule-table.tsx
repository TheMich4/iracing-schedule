"use client";

import {
  type SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ScheduleCalendar } from "./schedule-calendar";
import { DataTable } from "~/components/ui/data-table";
import { ScheduleColumnToggle } from "./schedule-column-toggle";
import { ScheduleFilters } from "./schedule-filters";
import { SchedulePagination } from "./schedule-pagination";
import { useColumns } from "~/hooks/use-columns";
import { useSchedule } from "~/hooks/use-schedule";
import { useState } from "react";
import type { UserContent } from "next-auth";

export const ScheduleTable = ({
  content,
}: {
  content: UserContent | undefined;
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [sorting, setSorting] = useState<SortingState>([]);
  const {
    columns,
    columnFilters,
    setColumnFilters,
    columnVisibility,
    setColumnVisibility,
  } = useColumns({
    content,
  });
  const { schedule, minDate, maxDate } = useSchedule({ date });

  const table = useReactTable({
    data: schedule,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility,
      columnFilters,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 30,
      },
    },
  });

  return (
    <div className="flex flex-col gap-2 p-2 lg:h-full">
      <div className="flex flex-col-reverse justify-between gap-2 lg:flex-row">
        <ScheduleFilters
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <ScheduleCalendar
          initialDate={date}
          maxDate={maxDate}
          minDate={minDate}
          setDate={setDate}
        />
        <ScheduleColumnToggle table={table} />
      </div>

      <div className="custom-scrollbar h-full overflow-auto rounded-md border">
        <DataTable columns={columns} table={table} />
      </div>

      <SchedulePagination table={table} />
    </div>
  );
};
