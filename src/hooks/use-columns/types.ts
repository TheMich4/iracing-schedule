import type { Schedule } from "~/types";

export interface ColumnProps {
  setSelectedRow: (row: Schedule | null) => void;
}
