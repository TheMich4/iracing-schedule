/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

import {
  type RaceTimeDescriptor,
  type CarRestriction,
  type SeriesSeason,
  type Track,
  type Car,
  type CarClass,
} from "iracing-api";

export interface SeasonData {
  carClassIds: number[];
  fixedSetup: boolean;
  hasFreeCar: boolean;
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
  track: SeriesSeason["schedules"][0]["track"] & { isFree: boolean };
  weather: SeriesSeason["schedules"][0]["weather"];
  week: number;
}

export type ParsedData = SeasonData & ScheduleData;

export interface ParsedSeasonsData {
  [startDate: string]: ParsedData[];
}

export const parseSeasons = (
  seasons: SeriesSeason[],
  trackData: Record<string, Track>,
  carData: Record<string, Car>,
  carClassData: Record<string, CarClass>,
) => {
  const parsed: ParsedSeasonsData = {};

  for (const season of seasons) {
    const carClassIds = season.carClassIds ?? [];
    const carIds = carClassIds.reduce((acc, carClassId) => {
      const carClass = carClassData[carClassId];
      if (!carClass) {
        return acc;
      }

      return [...acc, ...carClass.carsInClass.map((car) => car.carId)];
    }, [] as number[]);
    const hasFreeCar = carIds.some(
      (carId) => carData[carId]?.freeWithSubscription ?? false,
    );

    const seasonData: SeasonData = {
      carClassIds: carClassIds,
      fixedSetup: season.fixedSetup,
      incidentLimit: season.incidentLimit,
      hasFreeCar,
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
      const track = trackData[schedule.track.trackId];

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
          track: {
            ...schedule.track,
            isFree: track?.freeWithSubscription ?? false,
          },
          weather: schedule.weather,
          week: schedule.raceWeekNum,
        },
      ];
    }
  }

  return parsed;
};
