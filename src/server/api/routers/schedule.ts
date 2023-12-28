import { createTRPCRouter, publicProcedure } from "../trpc";

import { type ParsedSeasonsData } from "@/server/data/parse-seasons";
import seasonsData from "@/data/seasons-data.json";
import { z } from "zod";

export const scheduleRouter = createTRPCRouter({
  get: publicProcedure.input(z.string()).query(({ input }) => {
    const data = (seasonsData as unknown as ParsedSeasonsData)[input] ?? [];

    return data.sort(
      (a, b) =>
        b.licenseGroup - a.licenseGroup ||
        a.seriesName.localeCompare(b.seriesName),
    );
  }),
});
