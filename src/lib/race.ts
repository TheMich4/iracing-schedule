import { type SeriesSeason } from "iracing-api";

export const getRaceLimit = (schedule: SeriesSeason["schedules"][0]) => {
  if (schedule.raceLapLimit) {
    return {
      type: "laps",
      limit: schedule.raceLapLimit,
    };
  }

  if (schedule.raceTimeLimit) {
    return {
      type: "minutes",
      limit: schedule.raceTimeLimit,
    };
  }
};
