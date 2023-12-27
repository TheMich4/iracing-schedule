import { type SeriesSeason } from "iracing-api";
import seasons from "../data/seasons.json";
import carsJson from "../data/cars.json";
import carClasses from "../data/car-classes.json";

// TODO: Arrays should be maps
export const getSeasonData = (seasonId: number) => {
  const season = seasons.find((season) => season.seasonId === seasonId);
  const carIds = season?.carClassIds.flatMap(
    (carClassId) =>
      carClasses.find((carClass) => carClass.carClassId === carClassId)
        ?.carsInClass,
  );
  const cars =
    carIds?.map((carId) => carsJson.find((car) => car.carId === carId.carId)) ??
    [];

  return { season, cars };
};

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
