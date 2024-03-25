import IRacingAPI from "iracing-api";
import { parseSeasons } from "./parse-seasons";

const writeToFile = async (
  name: string,
  data?: Record<string, unknown> | Array<Record<string, unknown>>
) => {
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
  const login = (await ir.login(
    process.env.IRACING_EMAIL!,
    process.env.IRACING_PASSWORD!
  )) as {
    authcode: number;
  };

  if (login.authcode == 0) {
    console.error("Login failed");
    return;
  }

  console.log("Login successful");

  const seasons = await ir.series.getSeriesSeasons();
  await writeToFile("seasons", seasons);

  const carClasses = await ir.carClass.getCarClasses();
  const parsedCarClasses = (
    carClasses as Array<Record<string, unknown>>
  )?.reduce((acc, carClass) => {
    acc[carClass.carClassId] = carClass;
    return acc;
  }, {});
  await writeToFile("car-classes", parsedCarClasses);

  const tracks = await ir.track.getTracks();
  const parsedTracks = tracks?.reduce((acc, track) => {
    acc[track.trackId] = track;
    return acc;
  }, {});
  await writeToFile("tracks", parsedTracks);

  const cars = await ir.car.getCars();
  const parsedCars = cars?.reduce((acc, car) => {
    acc[car.carId] = car;
    return acc;
  }, {});
  await writeToFile("cars", parsedCars);

  const parsedData = parseSeasons(
    seasons,
    parsedTracks,
    parsedCars,
    parsedCarClasses
  );
  await writeToFile("seasons-data", parsedData);
};

await updateData();
