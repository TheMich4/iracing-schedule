import { useMemo, useState } from "react";

import { Check } from "lucide-react";
import type { ColumnProps } from "./types";
import LicenseGroupCell from "./cells/license-group-cell";
import type { Schedule } from "~/types";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { trackTypesMap } from "~/utils/track-type";

export const getColumns = () => {
  const columnHelper = createColumnHelper<Schedule>();

  return [
    columnHelper.accessor("licenseGroup", {
      id: "licenseGroup",
      cell: LicenseGroupCell,
      header: () => <div className="w-full text-center">Class</div>,
    }),
    columnHelper.accessor("seriesName", {
      id: "seriesName",
      cell: (cell) => cell.getValue(),
      header: "Series name",
    }),
    columnHelper.accessor("carClasses", {
      id: "carClasses",
      cell: (cell) => {
        const carClasses = cell.getValue();

        return (
          <span>
            {carClasses.map((carClass) => carClass?.shortName).join(", ")}
          </span>
        );
      },
      header: "Car classes",
    }),
    columnHelper.accessor("trackName", {
      id: "trackName",
      cell: (cell) => cell.getValue(),
      header: "Track name",
    }),
    columnHelper.accessor("trackType", {
      id: "trackType",
      cell: (cell) => {
        const value = cell.getValue();
        return value ? trackTypesMap[value]?.name : "Unknown";
      },
      header: "Track type",
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

const defaultColumnVisibility = {
  carClasses: true,
  fixedSetup: false,
  licenseGroup: true,
  multiclass: false,
  official: false,
  raceLength: false,
  raceWeekNum: false,
  seriesName: true,
  startDate: false,
  startType: false,
  trackName: true,
  trackType: false,
};

const useColumns = () => {
  const columns = useMemo(() => getColumns(), []);
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >(defaultColumnVisibility);

  return { columns, columnVisibility, setColumnVisibility };
};

export default useColumns;
