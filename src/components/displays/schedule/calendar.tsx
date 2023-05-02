import { useState } from "react"

import CalendarDatePicker from "@/components/ui/calendar-date-picker"

interface CalendarProps {
  initialDate: Date
  setDate: (date: Date) => void
  minDate?: Date
  maxDate?: Date
}

const Calendar = ({
  initialDate,
  setDate,
  minDate,
  maxDate,
}: CalendarProps) => {
  const [value, setValue] = useState<Date>(initialDate)

  const handleValueChange = (newValue: Date) => {
    if (!newValue) return

    setValue(newValue)
    setDate(newValue)
  }

  return (
    <CalendarDatePicker
      className="w-full lg:w-[280px]"
      date={value}
      fromDate={minDate}
      onSelect={handleValueChange}
      toDate={maxDate}
      weekStartsOn={1}
    />
  )
}

export default Calendar
