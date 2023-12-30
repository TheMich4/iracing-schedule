import { createTRPCRouter, publicProcedure } from "../trpc";

import tracks from "@/data/tracks.json";
import { type Track } from "iracing-api";
import { z } from "zod";

export const trackRouter = createTRPCRouter({
  get: publicProcedure.input(z.number()).query(({ input }) => {
    return tracks.find((track) => track.trackId === input) as Track;
  }),
});
