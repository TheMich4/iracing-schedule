import { createTRPCRouter, publicProcedure } from "../trpc";

import { type ParsedSeasonsData } from "@/server/data/parse-seasons";
import seasonsData from "@/data/seasons-data.json";
import { z } from "zod";

export const scheduleRouter = createTRPCRouter({
  get: publicProcedure.input(z.string()).query(({ input }) => {
    return (seasonsData as unknown as ParsedSeasonsData)[input] ?? [];
  }),
});
