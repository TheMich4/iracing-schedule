import { CarClassesCell } from "./cells/car-classes-cell";
import { Check } from "lucide-react";
import { LicenseGroupCell } from "./cells/license-group-cell";
import type { Schedule } from "~/types";
import { TrackCell } from "./cells/track-cell";
import type { UserContent } from "next-auth";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { trackTypesMap } from "~/utils/track-type";
import { useColumnFilters } from "../use-column-filters";
import { useColumnVisibility } from "../use-column-visibility";
import { useMemo } from "react";

const multiSelectFilter = (
  row: { original: Record<string, unknown> },
  columnId: string,
  filterValue: Array<string>
) => {
  return filterValue.length === 0
    ? false
    : filterValue.includes(String(row.original[columnId]));
};

export const getColumns = ({
  content,
}: {
  content: UserContent | undefined;
}) => {
  const columnHelper = createColumnHelper<Schedule>();

  return [
    columnHelper.accessor("licenseGroup", {
      id: "licenseGroup",
      cell: LicenseGroupCell,
      name: "Class",
      header: () => <div className="w-full text-center">Class</div>,
      filterFn: multiSelectFilter,
    }),
    columnHelper.accessor("seriesName", {
      id: "seriesName",
      cell: (cell) => cell.getValue(),
      header: "Series name",
    }),
    columnHelper.accessor("carClasses", {
      id: "carClasses",
      cell: ({ row }) => <CarClassesCell row={row} content={content} />,
      header: "Car classes",
    }),
    columnHelper.accessor("trackName", {
      id: "trackName",
      cell: ({ row }) => <TrackCell row={row} content={content} />,
      header: "Track name",
    }),
    columnHelper.accessor("trackType", {
      id: "trackType",
      cell: (cell) => {
        const value = cell.getValue();
        return value ? trackTypesMap[value]?.name : "Unknown";
      },
      header: "Track type",
      filterFn: multiSelectFilter,
    }),
    columnHelper.accessor("startDate", {
      id: "startDate",
      cell: (cell) => format(new Date(cell.getValue()), "dd/MM/yyyy"),
      header: "Start date",
    }),
    columnHelper.accessor("fixedSetup", {
      id: "fixedSetup",
      cell: (cell) => <span>{cell.getValue() ? "Fixed" : "Open"}</span>,
      header: "Setup",
    }),

    columnHelper.display({
      id: "raceLength",
      cell: ({ row }) => {
        const { raceLapLimit, raceTimeLimit } = row.original;

        if (raceLapLimit) {
          return <span>{raceLapLimit} laps</span>;
        }

        if (raceTimeLimit) {
          return <span>{raceTimeLimit} minutes</span>;
        }

        return <span>Unknown</span>;
      },
      header: "Race length",
    }),
    columnHelper.display({
      id: "official",
      cell: ({ row }) => {
        const { official } = row.original;

        return (
          official && (
            <div className="flex w-full justify-center">
              <Check className="h-4 w-4" />
            </div>
          )
        );
      },
      header: "Official",
    }),
    columnHelper.display({
      id: "multiclass",
      cell: ({ row }) => {
        const { multiclass } = row.original;

        return (
          multiclass && (
            <div className="flex w-full justify-center">
              <Check className="h-4 w-4" />
            </div>
          )
        );
      },
      header: "Multi Class",
    }),
    columnHelper.accessor("startType", {
      id: "startType",
      cell: (cell) => cell.getValue(),
      header: "Start type",
    }),
    columnHelper.accessor("raceWeekNum", {
      id: "raceWeekNum",
      cell: (cell) => cell.getValue(),
      header: "Week",
    }),
  ];
};

export const useColumns = ({
  content,
}: {
  content: UserContent | undefined;
}) => {
  const columns = useMemo(() => getColumns({ content }), []);
  const { columnFilters, setColumnFilters } = useColumnFilters();
  const { columnVisibility, setColumnVisibility } = useColumnVisibility();

  return {
    columnFilters,
    columnVisibility,
    columns,
    setColumnFilters,
    setColumnVisibility,
  };
};
