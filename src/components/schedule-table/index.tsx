/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import Calendar from "./calendar";
import type { Schedule } from "~/types";
import SortIcon from "./sort-icon";
import type { SortingState } from "@tanstack/react-table";
import columns from "./columns";
import useSchedule from "~/hooks/use-schedule";

const ScheduleTable = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [sorting, setSorting] = useState<SortingState>([]);

  const { schedule, minDate, maxDate } = useSchedule(date);

  const data = useMemo(
    () =>
      [...schedule].sort((a: Schedule, b: Schedule) => {
        if (sorting.length === 0) return 0;
        const [sort] = sorting;
        if (!sort) {
          return a.seriesId < b.seriesId ? -1 : 1;
        }

        const { id, desc } = sort;

        if (desc) {
          if (a[id] > b[id]) return -1;
          if (a[id] < b[id]) return 1;
        } else {
          if (a[id] > b[id]) return 1;
          if (a[id] < b[id]) return -1;
        }

        return 0;
      }),
    [schedule, sorting]
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-row justify-end gap-2">
        <Calendar
          initialDate={date}
          maxDate={maxDate}
          minDate={minDate}
          setDate={setDate}
        />
      </div>
      <table className="min-w-full divide-y divide-slate-700 rounded-sm">
        <thead className="bg-slate-900/40">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="px-4 py-1 text-start text-xs font-medium uppercase tracking-wider text-gray-500"
                  key={header.id}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={`flex flex-row items-center gap-1 ${
                        header.column.getCanSort() ? "cursor-pointer" : ""
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <SortIcon isSorted={header.column.getIsSorted()} />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-slate-800">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className="whitespace-nowrap px-4 py-1 text-sm text-slate-200"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
