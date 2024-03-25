import { createTRPCRouter, publicProcedure } from "../trpc";

export const specialEventsRouter = createTRPCRouter({
  get: publicProcedure.query(() => {
    return [];
  }),
});
