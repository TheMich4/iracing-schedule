import { useState } from "react";
import CalendarDatePicker from "../calendar-date-picker";

interface CalendarProps {
  initialDate: Date;
  setDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

const Calendar = ({
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
    <div>
      <CalendarDatePicker
        date={value}
        fromDate={minDate}
        onSelect={handleValueChange}
        toDate={maxDate}
        weekStartsOn={1}
      />
    </div>
  );
};

export default Calendar;
