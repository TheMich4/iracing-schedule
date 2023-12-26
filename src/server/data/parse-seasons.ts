/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

import {
  type RaceTimeDescriptor,
  type CarRestriction,
  type SeriesSeason,
} from "iracing-api";

interface SeasonData {
  carClassIds: number[];
  incidentLimit: number;
  multiclass: boolean;
  official: boolean;
  scheduleDescription: string;
  seasonId: number;
  seasonName: string;
  seasonQuarter: number;
  seasonYear: number;
  seriesId: number;
}

interface ScheduleData {
  carRestrictions: CarRestriction[];
  raceLapLimit: number | null;
  raceTimeDescriptors: RaceTimeDescriptor[];
  raceTimeLimit: number | null;
  raceWeekNum: number;
  restartType: string;
  seriesName: string;
  startType: string;
  track: SeriesSeason["schedules"][0]["track"];
  weather: SeriesSeason["schedules"][0]["weather"];
}

export interface ParsedSeasonsData {
  [startDate: string]: {
    [seriesId: string]: SeasonData & ScheduleData;
  };
}

export const parseSeasons = (seasons: SeriesSeason[]) => {
  const parsed: ParsedSeasonsData = {};

  for (const season of seasons) {
    const seasonData: SeasonData = {
      carClassIds: season.carClassIds,
      incidentLimit: season.incidentLimit,
      multiclass: season.multiclass,
      official: season.official,
      scheduleDescription: season.scheduleDescription,
      seasonId: season.seasonId,
      seasonName: season.seasonName,
      seasonQuarter: season.seasonQuarter,
      seasonYear: season.seasonYear,
      seriesId: season.seriesId,
    };

    for (const schedule of season.schedules) {
      parsed[schedule.startDate] = [
        ...(parsed[schedule.startDate] ?? []),
        {
          ...seasonData,

          carRestrictions: schedule.carRestrictions,
          raceLapLimit: schedule.raceLapLimit,
          raceTimeDescriptors: schedule.raceTimeDescriptors,
          raceTimeLimit: schedule.raceTimeLimit,
          raceWeekNum: schedule.raceWeekNum,
          restartType: schedule.restartType,
          seriesName: schedule.seriesName,
          startType: schedule.startType,
          track: schedule.track,
          weather: schedule.weather,
        },
      ];
    }
  }

  return parsed;
};
