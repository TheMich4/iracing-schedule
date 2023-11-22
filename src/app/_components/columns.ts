"use client";

import type { ColumnDef } from "@tanstack/react-table";

export interface TableData {
  hello: string;
}

export const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: "hello",
    header: "Hello",
  },
  {
    accessorKey: "hello",
    header: "Hello",
  },
  {
    accessorKey: "hello",
    header: "Hello",
  },
];
