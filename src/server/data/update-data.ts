import IRacingAPI from "iracing-api";
import { env } from "@/env.mjs";

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

  await Bun.write("./src/data/seasons.json", JSON.stringify(seasons, null, 2));
};

await updateData();
