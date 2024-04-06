/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

import type { SeriesSeason, Track, Car, CarClass } from "iracing-api";
import type { ParsedSeasonsData, SeasonData } from "./types/schedule.ts";

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

    const cars = carIds.map((carId) => {
      const car = carData[carId];

      return {
        carId: car.carId,
        carName: car.carName,
        carNameAbbreviated: car.carNameAbbreviated,
        packageId: car.packageId,
      };
    });

    const seasonData: SeasonData = {
      carClassIds,
      carIds,
      cars,
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
          category: schedule.category,
          categoryId: schedule.categoryId,
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
