import { createTRPCRouter } from "@/server/api/trpc";
import { postRouter } from "@/server/api/routers/post";
import { scheduleRouter } from "./routers/schedule";
import { trackRouter } from "./routers/track";
import { specialEventsRouter } from "./routers/special-events";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  schedule: scheduleRouter,
  specialEvents: specialEventsRouter,
  track: trackRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
