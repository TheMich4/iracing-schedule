export interface Season {
  carClassIds: Array<string>;
  licenseGroup: string;
  official: boolean;
  scheduleDescription: string;
  schedules: Array<{
    raceWeekNum: number;
    startDate: string;
    track: {
      category: string;
      categoryId: number;
      configName: string;
      trackId: number;
      trackName: string;
    };
  }>;
  seasonName: string;
  seriesName: string;
  startDate: string;
}

export interface SeasonMap {
  [seasonId: string]: Season;
}
