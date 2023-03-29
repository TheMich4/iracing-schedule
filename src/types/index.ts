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
  fixedSetup: boolean;
  licenseGroup: string;
  raceLapLimit: number | null;
  raceTimeLimit: number | null;
  seasonId: number;
  seasonName: string;
  seasonStartDate: string;
  seriesId: number;
  seriesName: string;
  startDate: string;
  startType: string;
  track: Track;
  trackName: string;
  trackTypes: Array<{ trackType: string }>;
}

export interface ScheduleMap {
  [startDate: string]: Array<Schedule>;
}
