import IRacingAPI from "iracing-api";
import { env } from "@/env.mjs";

const writeToFile = async (name: string, data?: Record<string, any>) => {
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
  await writeToFile("car-classes", carClasses);
};

await updateData();