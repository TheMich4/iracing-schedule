import type {
  CarRestriction,
  RaceTimeDescriptor,
  SeriesSeason,
} from "iracing-api";

export interface SeasonData {
  carClassIds: number[];
  carIds: number[];
  cars: {
    carId: number;
    carName: string;
    carNameAbbreviated: string;
    packageId: number;
  }[];
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
  category: string;
  categoryId: number;
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
