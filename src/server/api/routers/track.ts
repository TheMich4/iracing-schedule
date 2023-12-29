import { createTRPCRouter, publicProcedure } from "../trpc";

import tracks from "@/data/tracks.json";
import { z } from "zod";

export const trackRouter = createTRPCRouter({
  get: publicProcedure.input(z.number()).query(({ input }) => {
    console.log({ input });
    return tracks.find((track) => track.trackId === input);
  }),
});
