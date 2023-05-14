"use client";

import {
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Calendar from "~/components/schedule-table/calendar";
import { DataTable } from "~/components/ui/data-table";
import { ScheduleColumnToggle } from "./schedule-column-toggle";
import ScheduleFilters from "./schedule-filters";
import { SchedulePagination } from "./schedule-pagination";
import useColumnFilters from "~/hooks/use-column-filters";
import useColumns from "~/hooks/use-columns";
import useSchedule from "~/hooks/use-schedule";
import { useState } from "react";

const ScheduleTable = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useColumnFilters();
  const { columns, columnVisibility, setColumnVisibility } = useColumns();
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
  });

  return (
    <div className="flex h-full flex-col gap-2 p-2">
      <div className="flex flex-col-reverse justify-between gap-2 lg:flex-row">
        <ScheduleFilters
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <Calendar
          initialDate={date}
          maxDate={maxDate}
          minDate={minDate}
          setDate={setDate}
        />
        <ScheduleColumnToggle table={table} />
      </div>

      <div className="h-full overflow-auto rounded-md border scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-rounded-md scrollbar-thumb-rounded-md dark:scrollbar-thumb-slate-900">
        <DataTable table={table} columns={columns} />
      </div>

      <SchedulePagination table={table} />
    </div>
  );
};

export default ScheduleTable;
