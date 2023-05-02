"use client"

import { useState } from "react"
import { Settings } from "lucide-react"

import { useSchedule } from "@/hooks/use-schedule"
import { Button } from "@/components/ui/button"

import Calendar from "./calendar"
import { Dialogs } from "./dialogs"
import { ScheduleTable } from "./table"

const Schedule = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [dialogVisibility, setDialogVisibility] = useState({ config: false })

  const { schedule, minDate, maxDate } = useSchedule({ date })

  return (
    <div className="flex h-full flex-col gap-2 p-2">
      <div className="flex flex-row gap-1">
        <Calendar
          initialDate={date}
          maxDate={maxDate}
          minDate={minDate}
          setDate={setDate}
        />
        <Button
          onClick={() =>
            setDialogVisibility((prev) => ({ ...prev, config: true }))
          }
          variant="outline"
        >
          <div className="flex flex-row gap-2">
            <Settings className="h-5 w-5" />
            <div className="lg:hidden">Configure</div>
          </div>
        </Button>
      </div>

      <ScheduleTable data={schedule} />

      <Dialogs
        dialogVisibility={dialogVisibility}
        setDialogVisibility={setDialogVisibility}
      />
    </div>
  )
}

export { Schedule }
