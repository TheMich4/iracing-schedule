/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { Schedule } from "~/types";
import { seriesData } from "~/consts/series";

const prepareScheduleData = (series: any, schedule: any): Schedule => {
  return {
    carIds: schedule.carRestrictions.map((c: { carId: number }) => c.carId),
    carClassIds: series.carClassIds,
    fixedSetup: series.fixedSetup,
    licenseGroup: series.licenseGroup,
    multiclass: series.multiclass,
    official: series.official,
    raceLapLimit: schedule.raceLapLimit,
    raceTimeLimit: schedule.raceTimeLimit,
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
  };
};

const importSchedule = () => {
  console.log("--- import schedule start ---");

  const byStartDate = seriesData.reduce((acc, series) => {
    if (!series.active) return acc;

    series.schedules.forEach((schedule) => {
      if (!acc[schedule.startDate]) {
        acc = {
          ...acc,
          [schedule.startDate]: [prepareScheduleData(series, schedule)],
        };
      } else {
        acc = {
          ...acc,
          [schedule.startDate]: [
            ...acc[schedule.startDate],
            prepareScheduleData(series, schedule),
          ],
        };
      }
    });

    return acc;
  }, {});

  localStorage.setItem("schedule", JSON.stringify(byStartDate));

  console.log("--- import schedule end ---");
};

export default importSchedule;
