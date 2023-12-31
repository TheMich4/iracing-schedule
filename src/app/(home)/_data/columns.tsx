"use client";

import { CarClassesCell } from "../_components/cells/car-classes-cell";
import { CategoryCell } from "../_components/cells/category-cell";
import { CheckmarkCell } from "../_components/cells/checkmark-cell";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../_components/data-table-column-header";
import { LicenseGroupCell } from "../_components/cells/license-group-cell";
import { LinkCell } from "../_components/cells/link-cell";
import { categoryToName } from "@/data/iracing-consts";
import { type ParsedSeasonsData } from "@/server/data/parse-seasons";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<ParsedSeasonsData>[] = [
  {
    id: "id",
    accessorFn: (row) => row.seriesId,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
  },
  {
    id: "class",
    accessorFn: (row) => `${row.licenseGroup}`,
    cell: LicenseGroupCell,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Class" />
    ),
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
  {
    id: "category",
    accessorFn: (row) => {
      const category = row.track?.category;
      return categoryToName[category] ?? "Unknown";
    },
    cell: CategoryCell,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    filterFn: (row, id, value: string[]) => value.includes(row.getValue(id)),
  },
  {
    id: "seriesName",
    accessorFn: (row) => row.seriesName,
    cell: ({
      getValue,
      row: {
        original: { seasonId },
      },
    }) => (
      <LinkCell
        getValue={getValue as () => string}
        href={`/series/${seasonId}`}
      />
    ),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Series name" />
    ),
  },
  {
    id: "track",
    accessorFn: (row) => row.track?.trackName,
    cell: ({
      getValue,
      row: {
        original: {
          track: { trackId, isFree },
        },
      },
    }) => {
      const icons = isFree ? (
        <Badge variant="secondary" size="xs">
          FREE
        </Badge>
      ) : null;

      return (
        <LinkCell
          getValue={getValue as () => string}
          href={`/track/${trackId}`}
          icons={icons}
        />
      );
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Track" />
    ),
  },
  {
    id: "cars",
    cell: CarClassesCell,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cars" />
    ),
  },
  {
    id: "multiClass",
    accessorFn: (row) => row.multiclass,
    cell: CheckmarkCell,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Multi-class" />
    ),
    filterFn: (row, id, value: boolean[]) => value.includes(row.getValue(id)),
  },
  {
    id: "official",
    accessorFn: (row) => row.official,
    cell: CheckmarkCell,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Official" />
    ),
    filterFn: (row, id, value: boolean[]) => value.includes(row.getValue(id)),
  },
  {
    id: "fixed",
    accessorFn: (row) => row.fixedSetup,
    cell: CheckmarkCell,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fixed" />
    ),
    filterFn: (row, id, value: boolean[]) => value.includes(row.getValue(id)),
  },
  {
    id: "maxIncidents",
    accessorFn: (row) => row.incidentLimit,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max inc" />
    ),
  },
  {
    id: "startType",
    accessorFn: (row) => row.startType,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start type" />
    ),
  },
  {
    id: "scheduleDescription",
    accessorFn: (row) => row.scheduleDescription,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Schedule" />
    ),
    enableSorting: false,
  },
  {
    id: "startDate",
    accessorFn: (row) => row.startDate,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start date" />
    ),
  },
];
