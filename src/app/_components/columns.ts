"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { type Season } from "@/types/iracing";
import { LicenseGroupCell } from "./cells/license-group-cell";

export const columns: ColumnDef<Season>[] = [
  {
    cell: LicenseGroupCell,
    header: "Class",
  },
  {
    accessorFn: (row) => row.schedules[0]?.series_name,
    header: "Series name",
  },
  {
    accessorFn: (row) => row.schedules[0]?.track?.track_name,
    header: "Track",
  },
];
