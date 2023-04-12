import type { Column } from "@tanstack/react-table";
import type { Schedule } from "~/types";

interface TableColumn extends Column<Schedule, unknown> {
  id: string;
}
type TableColumns = Array<TableColumn>;

export interface ScheduleTableDialogsProps {
  selectedRow: Schedule | null;
  setSelectedRow: (row: Schedule | null) => void;
  showConfig: boolean;
  setShowConfig: (show: boolean) => void;
  columns: TableColumns;
}

export interface CarsDialogProps {
  isOpen: boolean;
  close: () => void;
  series: Schedule | null;
}

export interface ConfigDialogProps {
  isOpen: boolean;
  close: () => void;
  columns: TableColumns;
}
