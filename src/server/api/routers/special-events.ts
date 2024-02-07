import { createTRPCRouter, publicProcedure } from "../trpc";
import specialEvents from "@/data/special-events.json";

export const specialEventsRouter = createTRPCRouter({
  get: publicProcedure.query(() => {
    return specialEvents;
  }),
});
