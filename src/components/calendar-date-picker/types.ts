import type { SelectSingleEventHandler } from "react-day-picker";

export interface CalendarDatePickerProps {
  date: Date;
  onSelect: SelectSingleEventHandler;
}
