"use client"

import { useState } from "react"

import { useSchedule } from "@/hooks/use-schedule"

import Calendar from "./calendar"
import { ScheduleTable } from "./table"

const Schedule = () => {
  const [date, setDate] = useState<Date>(new Date())
  const { schedule, minDate, maxDate } = useSchedule({ date })

  return (
    <div className="flex h-full flex-col gap-2 p-2">
      <Calendar
        initialDate={date}
        maxDate={maxDate}
        minDate={minDate}
        setDate={setDate}
      />
      <ScheduleTable data={schedule} />
    </div>
  )
}

export { Schedule }
