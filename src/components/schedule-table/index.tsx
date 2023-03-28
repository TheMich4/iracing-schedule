/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import columns from "./columns";
import { format } from "date-fns";
import useSchedule from "~/hooks/use-schedule";

const ScheduleTable = () => {
  const date = new Date();

  const schedule = useSchedule(date);
  const table = useReactTable({
    data: Object.values(schedule),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log({ date, schedule });

  return (
    <div className="flex flex-col gap-2 p-2">
      <div>
        Date:{" "}
        <span className="font-light text-slate-300">
          {format(date, "dd-MM-yyy EEEE")}
        </span>
      </div>
      <table className="min-w-full divide-y divide-slate-700 rounded-sm">
        <thead className="bg-slate-900/40">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-1 text-start text-xs font-medium uppercase tracking-wider text-gray-500"
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
                  key={cell.id}
                  className="whitespace-nowrap px-4 py-1 text-sm text-slate-200"
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
