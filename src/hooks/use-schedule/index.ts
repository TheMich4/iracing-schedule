/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useMemo, useState } from "react"
import type { Schedule, ScheduleMap } from "@/types"
import { getLastTuesday } from "@/utils/date"
import { importSchedule } from "@/utils/schedule"
import { format } from "date-fns"

import { getNewWeekSchedule, getScheduleDateRange } from "./helpers"

interface ScheduleData {
  schedule: Array<Schedule>
  minDate?: Date
  maxDate?: Date
}

interface UseScheduleArgs {
  date: Date
}

const useSchedule = ({ date }: UseScheduleArgs): ScheduleData => {
  if (typeof window === "undefined") return { schedule: [] }

  const [schedule, setSchedule] = useState<Array<Schedule>>([])

  const scheduleMap = useMemo<ScheduleMap>(() => importSchedule() || {}, [])

  const tuesday = useMemo<string>(
    () => format(getLastTuesday(date), "yyyy-MM-dd") ?? "",
    [date]
  )

  const { minDate, maxDate } = useMemo(
    () => getScheduleDateRange(scheduleMap),
    [scheduleMap]
  )

  // Handle week change
  useEffect(
    () => setSchedule(getNewWeekSchedule(scheduleMap, tuesday)),
    [tuesday]
  )

  return {
    schedule,
    minDate,
    maxDate,
  }
}

export { useSchedule }
