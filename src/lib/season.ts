import { type Car, type CarClass, type SeriesSeason } from "iracing-api";
import seasons from "../data/seasons.json";
import carsJson from "../data/cars.json";
import carClasses from "../data/car-classes.json";

// TODO: Arrays should be maps
export const getSeasonData = (seasonId: number) => {
  const season = seasons.find((season) => season.seasonId === seasonId);
  const carIds = season?.carClassIds.flatMap(
    (carClassId) =>
      (carClasses as Record<string, CarClass>)[carClassId]?.carsInClass,
  );
  const cars = carIds?.map(
    (carId) => (carsJson as any as Record<string, Car>)[carId] ?? [],
  ) as Car[];

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
