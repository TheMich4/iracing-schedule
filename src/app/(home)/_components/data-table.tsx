"use client";

import { getLicenseColor } from "@/config/license";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { type SeriesSeason } from "iracing-api";
import { cn } from "@/lib/utils";
import { DataTableToolbar } from "./data-table-toolbar";
import { useTable } from "../_hooks/use-table";
import { flexRender } from "@tanstack/react-table";
import { columns } from "../_data/columns";
import { DataTableEmptyRow } from "./data-table-empty-row";
import { FavoriteProvider } from "@/components/providers/favorite-provider";

export function DataTable() {
  const { table, updateWeekDate, isFetching } = useTable(columns);

  return (
    <FavoriteProvider>
      <div className="flex h-full w-full flex-col gap-2">
        <DataTableToolbar table={table} updateWeekDate={updateWeekDate} />
        <div className="h-full w-full overflow-auto rounded-md border text-foreground">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "cursor-pointer",
                          header.column.columnDef.meta?.center && "text-center",
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      `hover:bg-${getLicenseColor(
                        (row.original as unknown as SeriesSeason).licenseGroup,
                      )}/10`,
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "px-4",
                          cell.column.columnDef.meta?.center &&
                            "text-center align-middle",
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <DataTableEmptyRow columns={columns} isFetching={isFetching} />
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </FavoriteProvider>
  );
}
