"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import useColumns from "@/hooks/use-columns"
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/table"

const ScheduleTable = () => {
  const { columns } = useColumns({})

  const table = useReactTable({
    columns,
    data: [],
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table className="min-w-full" size="sm">
      <Thead className="sticky top-0 bg-slate-200 dark:bg-slate-900">
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Th
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
                    {/* <SortIcon isSorted={header.column.getIsSorted()} /> */}
                  </div>
                )}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody className="divide-y divide-slate-100 dark:divide-slate-900">
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Td
                className="w-fit whitespace-nowrap px-4 py-1 text-sm text-slate-800 dark:text-slate-200"
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export { ScheduleTable }
