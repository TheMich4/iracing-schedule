"use client";

import { CarClassesCell } from "./cells/car-classes-cell";
import { CheckmarkCell } from "./cells/checkmark-cell";
import type { ColumnDef } from "@tanstack/react-table";
import { LicenseGroupCell } from "./cells/license-group-cell";
import type { SeriesSeason } from "iracing-api";

export const columns: ColumnDef<SeriesSeason>[] = [
  {
    id: "class",
    accessorFn: (row) => `${row.licenseGroup}`,
    cell: LicenseGroupCell,
    header: "Class",
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
    meta: {
      center: true,
    },
  },
  {
    id: "seriesName",
    accessorFn: (row) => row.schedules[0]?.seriesName,
    header: "Series name",
  },
  {
    id: "track",
    accessorFn: (row) => row.schedules[0]?.track?.trackName,
    header: "Track",
  },
  {
    id: "cars",
    cell: CarClassesCell,
    header: "Cars",
  },
  {
    id: "multiClass",
    accessorFn: (row) => row.multiclass,
    cell: CheckmarkCell,
    header: "Multi class",
    meta: {
      center: true,
    },
  },
  {
    id: "official",
    accessorFn: (row) => row.official,
    cell: CheckmarkCell,
    header: "Official",
    meta: {
      center: true,
    },
  },
  {
    id: "fixed",
    accessorFn: (row) => row.fixedSetup,
    cell: CheckmarkCell,
    header: "Fixed",
    meta: {
      center: true,
    },
  },
  {
    id: "maxIncidents",
    accessorFn: (row) => row.incidentLimit,
    header: "Max inc",
    meta: {
      center: true,
    },
  },
];