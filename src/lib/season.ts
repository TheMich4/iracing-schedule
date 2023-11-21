import seasons from "../data/seasons.json";

export const getSeasonData = (seasonId: number) =>
  seasons.find((season) => season.season_id === seasonId);
