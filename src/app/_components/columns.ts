"use client";

import { CarClassesCell } from "./cells/car-classes-cell";
import { CheckmarkCell } from "./cells/checkmark-cell";
import type { ColumnDef } from "@tanstack/react-table";
import { LicenseGroupCell } from "./cells/license-group-cell";
import type { SeriesSeason } from "iracing-api";

export const columns: ColumnDef<SeriesSeason>[] = [
  {
    cell: LicenseGroupCell,
    header: "Class",
    meta: {
      center: true,
    },
  },
  {
    accessorFn: (row) => row.schedules[0]?.seriesName,
    header: "Series name",
  },
  {
    accessorFn: (row) => row.schedules[0]?.track?.trackName,
    header: "Track",
  },
  {
    cell: CarClassesCell,
    header: "Cars",
  },
  {
    accessorFn: (row) => row.official,
    cell: CheckmarkCell,
    header: "Official",
    meta: {
      center: true,
    },
  },
  {
    accessorFn: (row) => row.fixedSetup,
    cell: CheckmarkCell,
    header: "Fixed",
    meta: {
      center: true,
    },
  },
  {
    accessorFn: (row) => row.incidentLimit,
    header: "Max inc",
    meta: {
      center: true,
    },
  },
];
