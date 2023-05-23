"use server";

import { prisma } from "~/server/db";

export const getTracks = async () => {
  return await prisma.track.findMany({
    orderBy: {
      trackName: "asc",
    },
  });
};
