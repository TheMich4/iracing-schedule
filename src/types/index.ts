export interface SeasonMap {
  [seasonId: string]: {
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
    startDate: string;
  };
}
