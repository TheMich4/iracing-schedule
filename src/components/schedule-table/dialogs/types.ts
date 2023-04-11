import type { Schedule } from "~/types";

export interface ScheduleTableDialogsProps {
  selectedRow: Schedule | null;
  setSelectedRow: (row: Schedule | null) => void;
  showConfig: boolean;
  setShowConfig: (show: boolean) => void;
  columns: any[];
}

export interface CarsDialogProps {
  isOpen: boolean;
  close: () => void;
  series: Schedule | null;
}

export interface ConfigDialogProps {
  isOpen: boolean;
  close: () => void;
  columns: any[];
}
