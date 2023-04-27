import type { SelectSingleEventHandler } from "react-day-picker";

export interface CalendarDatePickerProps {
  className?: string;
  date: Date;
  onSelect: SelectSingleEventHandler;
}
