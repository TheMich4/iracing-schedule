import type { Schedule } from "~/types";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { licenseGroupMap } from "~/utils/license";

const columnHelper = createColumnHelper<Schedule>();

const columns = [
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
    header: () => "Season Start date",
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
];

export default columns;
