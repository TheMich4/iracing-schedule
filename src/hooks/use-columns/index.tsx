import { useMemo, useState } from "react";

import { CheckIcon } from "@heroicons/react/24/outline";
import type { ColumnProps } from "./types";
import type { Schedule } from "~/types";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { licenseGroupMap } from "~/utils/license";
import { trackTypesMap } from "~/utils/track-type";

const getColumns = ({ setSelectedRow }: ColumnProps) => {
  const columnHelper = createColumnHelper<Schedule>();

  return [
    columnHelper.accessor("licenseGroup", {
      id: "licenseGroup",
      cell: (cell) => {
        const license = licenseGroupMap[cell.getValue()] as {
          name: string;
          color: string;
          short: string;
        };

        return (
          <div className="flex w-full justify-center">
            <span className={`px-1 bg-${license.color} rounded-sm text-white`}>
              {license.short}
            </span>
          </div>
        );
      },
      header: () => "Class",
    }),
    columnHelper.accessor("seriesName", {
      id: "seriesName",
      cell: (cell) => cell.getValue(),
      header: () => "Series name",
    }),
    columnHelper.accessor("carClasses", {
      id: "carClasses",
      cell: (cell) => {
        const carClasses = cell.getValue();

        return (
          <div
            className="w-fill cursor-pointer hover:bg-slate-900"
            onClick={() => setSelectedRow(cell.row.original)}
          >
            {carClasses.map((carClass) => carClass?.shortName).join(", ")}
          </div>
        );
      },
      header: () => "Car classes",
    }),
    columnHelper.accessor("trackName", {
      id: "trackName",
      cell: (cell) => cell.getValue() ?? "Unknown",
      header: () => "Track name",
    }),
    columnHelper.accessor("trackType", {
      id: "trackType",
      cell: (cell) => {
        const value = cell.getValue();
        return value ? trackTypesMap[value]?.name : "Unknown";
      },
      header: () => "Track type",
    }),
    columnHelper.accessor("startDate", {
      id: "startDate",
      cell: (cell) => format(new Date(cell.getValue()), "dd/MM/yyyy"),
      header: () => "Start date",
    }),
    // columnHelper.accessor("scheduleDescription", {
    //   id: "scheduleDescription",
    //   cell: (cell) => cell.getValue(),
    //   header: () => "Schedule",
    // }),
    columnHelper.accessor("fixedSetup", {
      id: "fixedSetup",
      cell: (cell) => <span>{cell.getValue() ? "Fixed" : "Open"}</span>,
      header: () => "Setup",
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
              <CheckIcon className="h-4 w-4" />
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
              <CheckIcon className="h-4 w-4" />
            </div>
          )
        );
      },
      header: "Multi Class",
    }),
    columnHelper.accessor("startType", {
      id: "startType",
      cell: (cell) => cell.getValue(),
      header: () => "Start type",
    }),
    columnHelper.accessor("raceWeekNum", {
      id: "raceWeekNum",
      cell: (cell) => cell.getValue(),
      header: () => "Week",
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

const useColumns = (props: ColumnProps) => {
  const columns = useMemo(() => getColumns(props), [props]);
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >(defaultColumnVisibility);

  return { columns, columnVisibility, setColumnVisibility };
};

export default useColumns;
