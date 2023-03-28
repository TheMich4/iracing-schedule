/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { format } from "date-fns";
import { licenseGroupMap } from "~/utils/license";
import useSchedule from "~/hooks/use-schedule";

const columnHelper = createColumnHelper<Season>();

const columns = [
  columnHelper.accessor("licenseGroup", {
    id: "licenseGroup",
    cell: (cell) => {
      const license = licenseGroupMap[cell.getValue()?.toString()] as {
        name: string;
        color: string;
        short: string;
      };

      return (
        <span className={`px-1 bg-${license.color} rounded-sm text-white`}>
          {license.short}
        </span>
      );
    },
    header: () => "Class",
  }),
  columnHelper.accessor("seriesName", {
    id: "seriesName",
    cell: (cell) => cell.getValue(),
  }),
  // columnHelper.accessor("startDate", {
  //   id: "startDate",
  //   cell: (cell) => format(cell.getValue(), "dd-MM-yyyy"),
  // }),
];

const ScheduleTable = () => {
  const schedule = useSchedule();
  const table = useReactTable({
    data: Object.values(schedule),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
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
