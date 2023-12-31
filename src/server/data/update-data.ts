import IRacingAPI from "iracing-api";
import { env } from "@/env.mjs";
import { parseSeasons } from "./parse-seasons";

const writeToFile = async (name: string, data?: Record<string, unknown>) => {
  if (!data) {
    console.error(`No data for ${name}`);
    return;
  }

  await Bun.write(`./src/data/${name}.json`, JSON.stringify(data, null, 2));
  console.log(`Updated ${name}.json`);
};

export const updateData = async () => {
  console.log("Starting updating data");
  const ir = new IRacingAPI();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const login = await ir.login(env.IRACING_EMAIL, env.IRACING_PASSWORD);

  if (login.authcode == 0) {
    console.error("Login failed");
    return;
  }

  console.log("Login successful");

  const seasons = await ir.getSeriesSeasons();
  await writeToFile("seasons", seasons);

  const carClasses = await ir.getCarClasses();
  const parsedCarClasses = carClasses?.reduce((acc, carClass) => {
    acc[carClass.carClassId] = carClass;
    return acc;
  }, {});
  await writeToFile("car-classes", parsedCarClasses);

  const tracks = await ir.getTracks();
  const parsedTracks = tracks?.reduce((acc, track) => {
    acc[track.trackId] = track;
    return acc;
  }, {});
  await writeToFile("tracks", parsedTracks);

  const cars = await ir.getCars();
  const parsedCars = cars?.reduce((acc, car) => {
    acc[car.carId] = car;
    return acc;
  }, {});
  await writeToFile("cars", parsedCars);

  const parsedData = parseSeasons(
    seasons,
    parsedTracks,
    parsedCars,
    parsedCarClasses,
  );
  await writeToFile("seasons-data", parsedData);
};

await updateData();
