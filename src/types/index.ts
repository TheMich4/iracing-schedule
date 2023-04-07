import type { CarRestriction } from "iracing-api/lib/types/car";

export interface Track {
  category: string;
  categoryId: number;
  configName: string;
  trackId: number;
  trackName: string;
}

export interface Season {
  carClassIds: Array<string>;
  licenseGroup: string;
  official: boolean;
  scheduleDescription: string;
  schedules: Array<{
    raceWeekNum: number;
    startDate: string;
    track: Track;
  }>;
  seasonName: string;
  seriesName: string;
  startDate: string;
}

export interface SeasonMap {
  [seasonId: string]: Season;
}

export interface Schedule {
  carClassIds: Array<number>;
  carClasses: Array<{
    carClassId: number;
    name: string;
    shortName: string;
  }>;
  carIds: Array<number>;
  carRestrictions: Array<CarRestriction> | undefined;
  fixedSetup: boolean;
  licenseGroup: number;
  multiclass: boolean;
  official: boolean;
  raceLapLimit: number | null;
  raceTimeLimit: number | null;
  raceWeekNum: number;
  seasonId: number;
  seasonName: string;
  seasonStartDate: string;
  seriesId: number;
  seriesName: string;
  startDate: string;
  startType: string;
  track: Track;
  trackName: string;
  trackType: string | undefined;
}

export interface ScheduleMap {
  [startDate: string]: Array<Schedule>;
}

export type ScheduleKeys = keyof Schedule;

export interface Car {
  carName: string;
  carNameAbbreviated: string;
}

export interface CarMap {
  [carId: string]: Car;
}
