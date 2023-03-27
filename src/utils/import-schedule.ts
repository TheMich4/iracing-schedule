import { seriesData } from "~/consts/series";

const importSchedule = () => {
  console.log("--- import schedule start ---");

  const series = seriesData.reduce((acc, series) => {
    if (!series.active) return acc;

    return {
      ...acc,
      [series.seasonId]: {
        carClassIds: series.carClassIds,
        licenseGroup: series.licenseGroup,
        official: series.official,
        scheduleDescription: series.scheduleDescription,
        schedules: series.schedules.map((schedule) => ({
          raceWeekNum: schedule.raceWeekNum,
          startDate: schedule.startDate,
          track: schedule.track,
        })),
        seasonName: series.seasonName,
        startDate: series.startDate,
      },
    };
  }, {});

  if (typeof window === "undefined") {
    console.log("--- import schedule failed ---");
    return;
  }

  localStorage.setItem("schedule", JSON.stringify(series));

  console.log("--- import schedule end ---");
};

export default importSchedule;
