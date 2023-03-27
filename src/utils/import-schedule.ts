import { seriesData } from "~/consts/series";

const importSchedule = async () => {
  console.log("--- import schedule start ---");

  console.log({ seriesData });

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

  console.log({ series });

  console.log("--- import schedule end ---");

  return series;
};

export default importSchedule;
