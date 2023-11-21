import type { Schedule } from "@/types/iracing";

export const getRaceLimit = (schedule: Schedule) => {
  if (schedule.race_lap_limit) {
    return {
      type: "laps",
      limit: schedule.race_lap_limit,
    };
  }

  if (schedule.race_time_limit) {
    return {
      type: "minutes",
      limit: schedule.race_time_limit,
    };
  }
};
