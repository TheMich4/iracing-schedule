import DatePicker from "react-tailwindcss-datepicker";
import { useState } from "react";

interface CalendarProps {
  initialDate: Date;
  setDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

interface CalendarDate {
  startDate: Date | string;
  endDate: Date | string;
}

const Calendar = ({
  initialDate,
  setDate,
  minDate,
  maxDate,
}: CalendarProps) => {
  const [value, setValue] = useState<CalendarDate>({
    startDate: initialDate,
    endDate: initialDate,
  });

  const handleValueChange = (newValue: CalendarDate) => {
    setValue(newValue);
    setDate(new Date(newValue.startDate));
  };

  return (
    <div className="min-w-[315px]">
      <DatePicker
        asSingle
        displayFormat="DD/MM/YYYY"
        maxDate={maxDate}
        minDate={minDate}
        onChange={handleValueChange}
        startWeekOn="mon"
        useRange={false}
        value={value}
      />
    </div>
  );
};

export default Calendar;
