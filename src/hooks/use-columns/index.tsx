import { useMemo } from "react"
import { createColumnHelper } from "@tanstack/react-table"

const getColumns = () => {
  const columnHelper = createColumnHelper<any>()

  return [
    columnHelper.accessor("id", {
      id: "id",
      cell: (cell) => cell.getValue(),
      header: "Class",
    }),
  ]
}

const useColumns = (props) => {
  const columns = useMemo(() => getColumns(), [])

  return { columns }
}

export default useColumns
