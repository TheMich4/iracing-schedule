import { useMemo } from "react"

import { getColumns } from "./get-columns"

const useColumns = () => {
  const columns = useMemo(() => getColumns(), [])

  return { columns }
}

export { useColumns }
