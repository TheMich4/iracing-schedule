/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Calendar from "./calendar";
import columns from "./columns";
import useSchedule from "~/hooks/use-schedule";
import { useState } from "react";

const ScheduleTable = () => {
  const [date, setDate] = useState<Date>(new Date());
  const { schedule, minDate, maxDate } = useSchedule(date);
  const table = useReactTable({
    data: schedule,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
