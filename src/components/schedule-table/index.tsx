"use client";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { Button } from "~/components/ui/button";
import Calendar from "./calendar";
import { Card } from "~/components/ui/card";
import Filters from "./filters";
import type { Schedule } from "~/types";
import ScheduleTableDialogs from "./dialogs";
import { Settings } from "lucide-react";
import SortIcon from "./sort-icon";
import type { SortingState } from "@tanstack/react-table";
import { getFilteredSchedule } from "./helpers";
import useColumns from "~/hooks/use-columns";
import useFilter from "~/hooks/use-filter";
import useSchedule from "~/hooks/use-schedule";

const ScheduleTable = () => {
  const [selectedRow, setSelectedRow] = useState<Schedule | null>(null);
  const [showConfig, setShowConfig] = useState<boolean>(false);

  const [date, setDate] = useState<Date>(new Date());
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useFilter();
  const { columns, columnVisibility, setColumnVisibility } = useColumns({
    setSelectedRow,
  });

  const { schedule, minDate, maxDate } = useSchedule({ date });

  const data = useMemo(
    () => getFilteredSchedule(schedule, filter),
    [schedule, filter]
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      columnVisibility,
      sorting,
    },
  });

  return (
    <>
      <div className="flex h-full flex-col gap-2 overflow-auto p-2">
        <div className="flex flex-col-reverse justify-between gap-2 lg:flex-row">
          <Filters filter={filter} setFilter={setFilter} />
          <Calendar
            initialDate={date}
            maxDate={maxDate}
            minDate={minDate}
            setDate={setDate}
          />
          <Button onClick={() => setShowConfig(true)} variant="outline">
            <div className="flex flex-row gap-2">
              <Settings className="h-5 w-5" />
              <div className="lg:hidden">Configure</div>
            </div>
          </Button>
        </div>
        <Card className="h-full w-full overflow-auto overflow-x-auto overflow-y-scroll bg-inherit scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-rounded-md scrollbar-thumb-rounded-md dark:scrollbar-thumb-slate-900">
          <table className="min-w-full">
            <thead className="sticky top-0 bg-slate-200 dark:bg-slate-900">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="px-4 py-1 text-start text-xs font-medium uppercase tracking-wider text-slate-500"
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
            <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="w-fit whitespace-nowrap px-4 py-1 text-sm text-slate-800 dark:text-slate-200"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <ScheduleTableDialogs
        columns={table.getAllLeafColumns()}
        selectedRow={selectedRow}
        setColumnVisibility={setColumnVisibility}
        setSelectedRow={setSelectedRow}
        setShowConfig={setShowConfig}
        showConfig={showConfig}
      />
    </>
  );
};

export default ScheduleTable;
