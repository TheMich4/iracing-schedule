"use server";

import { prisma } from "~/server/db";

export const getCars = async () => {
  return await prisma.car.findMany({
    orderBy: {
      carName: "asc",
    },
  });
};
