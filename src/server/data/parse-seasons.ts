/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

import {
  type RaceTimeDescriptor,
  type CarRestriction,
  type SeriesSeason,
} from "iracing-api";

export interface SeasonData {
  carClassIds: number[];
  fixedSetup: boolean;
  incidentLimit: number;
  licenseGroup: number;
  multiclass: boolean;
  official: boolean;
  scheduleDescription: string;
  seasonId: number;
  seasonName: string;
  seasonQuarter: number;
  seasonYear: number;
  seriesId: number;
}

export interface ScheduleData {
  carRestrictions: CarRestriction[];
  raceLapLimit: number | null;
  raceTimeDescriptors: RaceTimeDescriptor[];
  raceTimeLimit: number | null;
  raceWeekNum: number;
  restartType: string;
  seriesName: string;
  startDate: string;
  startType: string;
  track: SeriesSeason["schedules"][0]["track"];
  weather: SeriesSeason["schedules"][0]["weather"];
}

export type ParsedData = SeasonData & ScheduleData;

export interface ParsedSeasonsData {
  [startDate: string]: ParsedData[];
}

export const parseSeasons = (seasons: SeriesSeason[]) => {
  const parsed: ParsedSeasonsData = {};

  for (const season of seasons) {
    const seasonData: SeasonData = {
      carClassIds: season.carClassIds,
      fixedSetup: season.fixedSetup,
      incidentLimit: season.incidentLimit,
      licenseGroup: season.licenseGroup,
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
          startDate: schedule.startDate,
          startType: schedule.startType,
          track: schedule.track,
          weather: schedule.weather,
        },
      ];
    }
  }

  return parsed;
};
