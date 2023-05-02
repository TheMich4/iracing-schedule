import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { z } from "zod";

export const userRouter = createTRPCRouter({
  getFavorites: protectedProcedure.query(async ({ ctx }) => {
    const userData = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session?.user?.id,
      },
    });
    console.log({ userData });

    return userData?.favorites;
  }),
  addFavorite: protectedProcedure
    .input(z.object({ type: z.string(), id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // return userData.favorites;
    }),
});
