import { CheckIcon } from "@heroicons/react/24/outline";
import type { Schedule } from "~/types";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { licenseGroupMap } from "~/utils/license";
import { trackTypesMap } from "~/utils/track-type";
import { useMemo } from "react";

const getColumns = (cars) => {
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
          <span className={`px-1 bg-${license.color} rounded-sm text-white`}>
            {license.short}
          </span>
        );
      },
      header: () => "Class",
    }),
    columnHelper.accessor("seriesName", {
      id: "seriesName",
      cell: (cell) => cell.getValue(),
      header: () => "Series name",
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
    columnHelper.accessor("trackName", {
      id: "trackName",
      cell: (cell) => cell.getValue() ?? "Unknown",
      header: () => "Track name",
    }),
    columnHelper.accessor("trackType", {
      id: "trackType",
      cell: (cell) => trackTypesMap[cell.getValue()]?.name,
      header: () => "Track type",
    }),
    columnHelper.accessor("fixedSetup", {
      id: "fixedSetup",
      cell: (cell) => <span>{cell.getValue() ? "Fixed" : "Open"}</span>,
      header: () => "Setup",
    }),
    columnHelper.accessor("carIds", {
      id: "carIds",
      cell: (cell) => {
        const carIds = cell.getValue();
        const c = carIds?.map(
          (carId) =>
            (cars[carId]?.carNameAbbreviated || cars[carId]?.carName) ??
            "Unknown"
        );

        // TODO: Fix this + use proper key
        return (
          <div className="cursor-pointer rounded-sm hover:bg-slate-900">
            {c?.map((x, i) => (
              <span key={i}>
                {x}
                {i !== c.length - 1 && ", "}
              </span>
            ))}
          </div>
        );
      },
      header: () => "Cars",
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

        return official && <CheckIcon className="h-4 w-4" />;
      },
      header: "Official",
    }),
    columnHelper.display({
      id: "multiclass",
      cell: ({ row }) => {
        const { multiclass } = row.original;

        return multiclass && <CheckIcon className="h-4 w-4" />;
      },
      header: "Multi Class",
    }),
  ];
};

const useColumns = (cars) => {
  const columns = useMemo(() => getColumns(cars), [cars]);

  return columns;
};

export default useColumns;
