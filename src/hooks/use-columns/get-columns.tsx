import { Schedule } from "@/types"
import { trackTypesMap } from "@/utils/track-type"
import { createColumnHelper } from "@tanstack/react-table"
import { format } from "date-fns"
import { Check } from "lucide-react"

const getColumns = () => {
  const columnHelper = createColumnHelper<Schedule>()

  return [
    columnHelper.accessor("licenseGroup", {
      id: "licenseGroup",
      // cell: LicenseGroupCell,
      header: "Class",
    }),
    columnHelper.accessor("seriesName", {
      id: "seriesName",
      // cell: SeriesCell,
      header: "Series name",
    }),
    columnHelper.accessor("carClasses", {
      id: "carClasses",
      // cell: (cell) => {
      //   const carClasses = cell.getValue()

      //   return (
      //     <div
      //       className="w-fill cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900"
      //       onClick={() => setSelectedRow(cell.row.original)}
      //     >
      //       {carClasses.map((carClass) => carClass?.shortName).join(", ")}
      //     </div>
      //   )
      // },
      header: "Car classes",
    }),
    columnHelper.accessor("trackName", {
      id: "trackName",
      cell: (cell) => cell.getValue() ?? "Unknown",
      header: "Track name",
    }),
    columnHelper.accessor("trackType", {
      id: "trackType",
      cell: (cell) => {
        const value = cell.getValue()
        return value ? trackTypesMap[value]?.name : "Unknown"
      },
      header: "Track type",
    }),
    columnHelper.accessor("startDate", {
      id: "startDate",
      cell: (cell) => format(new Date(cell.getValue()), "dd/MM/yyyy"),
      header: "Start date",
    }),
    // columnHelper.accessor("scheduleDescription", {
    //   id: "scheduleDescription",
    //   cell: (cell) => cell.getValue(),
    //   header: "Schedule",
    // }),
    columnHelper.accessor("fixedSetup", {
      id: "fixedSetup",
      cell: (cell) => <span>{cell.getValue() ? "Fixed" : "Open"}</span>,
      header: "Setup",
    }),

    columnHelper.display({
      id: "raceLength",
      cell: ({ row }) => {
        const { raceLapLimit, raceTimeLimit } = row.original

        if (raceLapLimit) {
          return <span>{raceLapLimit} laps</span>
        }

        if (raceTimeLimit) {
          return <span>{raceTimeLimit} minutes</span>
        }

        return <span>Unknown</span>
      },
      header: "Race length",
    }),
    columnHelper.display({
      id: "official",
      cell: ({ row }) => {
        const { official } = row.original

        return (
          official && (
            <div className="flex w-full justify-center">
              <Check className="h-4 w-4" />
            </div>
          )
        )
      },
      header: "Official",
    }),
    columnHelper.display({
      id: "multiclass",
      cell: ({ row }) => {
        const { multiclass } = row.original

        return (
          multiclass && (
            <div className="flex w-full justify-center">
              <Check className="h-4 w-4" />
            </div>
          )
        )
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
  ]
}

export { getColumns }
