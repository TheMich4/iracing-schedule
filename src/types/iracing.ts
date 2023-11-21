export type License = 1 | 2 | 3 | 4 | 5 | 6;

export interface Track {
  track_id: number;
  track_name: string;
  config_name?: string;
  category_id: number;
  category: string;
}

export interface Schedule {
  race_lap_limit: number | null;
  race_time_limit: number | null;
  race_week_num: number;
  series_name: string;
  start_date: string;
  track?: Track;
}

export interface Season {
  license_group: License;
  official: boolean;
  schedules: Array<Schedule>;
  season_id: number;
  season_name: string;
}

export enum LicenseGroup {
  Rookie = 1,
  D = 2,
  C = 3,
  B = 4,
  A = 5,
  Pro = 6,
}

export const LicenseGroupNames = {
  [LicenseGroup.Rookie]: "Rookie",
  [LicenseGroup.D]: "D class",
  [LicenseGroup.C]: "C class",
  [LicenseGroup.B]: "B class",
  [LicenseGroup.A]: "A class",
  [LicenseGroup.Pro]: "Pro",
};
