import { carClasses } from "@/consts/car-classes"
import { seriesData } from "@/consts/series"
import { seriesAssets } from "@/consts/series-assets"
import type { Schedule } from "@/types"
import type {
  Schedule as IRSchedule,
  SeriesSeason,
} from "iracing-api/lib/types/series"

const prepareScheduleData = (
  series: SeriesSeason,
  schedule: IRSchedule
): Schedule => {
  return {
    assets: seriesAssets[series.seriesId],
    carClassIds: series.carClassIds,
    carClasses: series.carClassIds.map((carClassId) => {
      const carClass = carClasses.find(
        (carClass) => carClass.carClassId === carClassId
      )
      if (!carClass) return null

      return {
        carClassId: carClass.carClassId,
        name: carClass.name,
        shortName: carClass.shortName,
      }
    }),
    carRestrictions: schedule.carRestrictions,
    carIds: series.carClassIds.flatMap((carClassId) => {
      const cars = carClasses.find(
        (carClass) => carClass.carClassId === carClassId
      )?.carsInClass
      if (!cars) return []

      return cars.map((car) => car.carId)
    }),
    fixedSetup: series.fixedSetup,
    licenseGroup: series.licenseGroup,
    multiclass: series.multiclass,
    official: series.official,
    raceLapLimit: schedule.raceLapLimit,
    raceTimeLimit: schedule.raceTimeLimit,
    raceWeekNum: schedule.raceWeekNum,
    seriesId: schedule.seriesId,
    seriesName: schedule.seriesName,
    seasonId: series.seasonId,
    seasonName: series.seasonName,
    seasonStartDate: series.startDate,
    startDate: schedule.startDate,
    startType: schedule.startType,
    track: schedule.track,
    trackName: schedule.track.trackName,
    trackType: series.trackTypes?.[0]?.trackType,
  }
}

const importSchedule = () => {
  console.log("--- import schedule start ---")

  const byStartDate = seriesData.reduce((acc, series) => {
    if (!series.active) return acc

    series.schedules.forEach((schedule) => {
      if (!acc[schedule.startDate]) {
        acc = {
          ...acc,
          [schedule.startDate]: [prepareScheduleData(series, schedule)],
        }
      } else {
        acc = {
          ...acc,
          [schedule.startDate]: [
            ...acc[schedule.startDate],
            prepareScheduleData(series, schedule),
          ],
        }
      }
    })

    return acc
  }, {})

  localStorage.setItem("schedule", JSON.stringify(byStartDate))

  console.log("--- import schedule end ---")

  return byStartDate
}

export { importSchedule }
