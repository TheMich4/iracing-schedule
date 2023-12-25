import { type SeriesSeason } from "iracing-api";
import seasons from "../data/seasons.json";

export const getSeasonData = (seasonId: number) =>
  seasons.find((season) => season.seasonId === seasonId);

export const sortSeasons = (seasons: SeriesSeason[]) => {
  return seasons.sort((a, b) => {
    if (a.licenseGroup !== b.licenseGroup) {
      return a.licenseGroup - b.licenseGroup;
    }

    if (a.seasonName !== b.seasonName) {
      return a.seasonName.localeCompare(b.seasonName);
    }

    return 0;
  });
};
