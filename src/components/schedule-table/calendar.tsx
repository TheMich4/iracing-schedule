import DatePicker from "react-tailwindcss-datepicker";
import { useState } from "react";

interface CalendarProps {
  initialDate: Date;
  setDate: (date: Date) => void;
}

interface CalendarDate {
  startDate: Date | string;
  endDate: Date | string;
}

const Calendar = ({ initialDate, setDate }: CalendarProps) => {
  const [value, setValue] = useState<CalendarDate>({
    startDate: initialDate,
    endDate: initialDate,
  });

  const handleValueChange = (newValue: CalendarDate) => {
    setValue(newValue);
    setDate(new Date(newValue.startDate));
  };

  return (
    <div>
      <DatePicker
        startWeekOn="mon"
        value={value}
        onChange={handleValueChange}
        useRange={false}
        asSingle
      />
    </div>
  );
};

export default Calendar;
