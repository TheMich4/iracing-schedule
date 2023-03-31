import type { Schedule } from "~/types";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { licenseGroupMap } from "~/utils/license";
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
      cell: (cell) => format(new Date(cell.getValue()), "dd/MM/yyyy EEEE"),
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
      cell: (cell) => cell.getValue() ?? "Unknown",
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
        console.log({ carIds, cars });
        const c = carIds?.map((carId) => cars[carId]?.carName ?? "Unknown");

        return c?.map((x) => <span>{x}</span>);
      },
      header: () => "Cars",
    }),
  ];
};

const useColumns = (cars) => {
  console.log({ cars });
  const columns = useMemo(() => getColumns(cars), [cars]);

  return columns;
};

export default useColumns;
