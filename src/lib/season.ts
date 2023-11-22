import type { Season } from "@/types/iracing";
import seasons from "../data/seasons.json";

export const getSeasonData = (seasonId: number) =>
  seasons.find((season) => season.season_id === seasonId);

export const sortSeasons = (seasons: Array<Season>) => {
  return seasons.sort((a, b) => {
    if (a.license_group !== b.license_group) {
      return a.license_group - b.license_group;
    }

    if (a.season_name !== b.season_name) {
      return a.season_name.localeCompare(b.season_name);
    }

    return 0;
  });
};
