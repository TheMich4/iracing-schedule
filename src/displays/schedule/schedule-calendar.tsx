import CalendarDatePicker from "../../components/ui/calendar-date-picker";
import { useState } from "react";

interface CalendarProps {
  initialDate: Date;
  setDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const ScheduleCalendar = ({
  initialDate,
  setDate,
  minDate,
  maxDate,
}: CalendarProps) => {
  const [value, setValue] = useState<Date>(initialDate);

  const handleValueChange = (newValue: Date) => {
    if (!newValue) return;

    setValue(newValue);
    setDate(newValue);
  };

  return (
    <CalendarDatePicker
      className="w-full lg:w-[280px]"
      date={value}
      fromDate={minDate}
      onSelect={handleValueChange}
      toDate={maxDate}
      weekStartsOn={1}
    />
  );
};
