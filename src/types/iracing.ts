export type License = 1 | 2 | 3 | 4 | 5 | 6;

export interface Schedule {
  series_name: string;
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
  [LicenseGroup.D]: "D",
  [LicenseGroup.C]: "C",
  [LicenseGroup.B]: "B",
  [LicenseGroup.A]: "A",
  [LicenseGroup.Pro]: "Pro",
};
