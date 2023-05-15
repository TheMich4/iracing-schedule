"use server";

import type { User } from "next-auth";
import { prisma } from "~/server/db";

interface Content {
  cars: { [packageId: string]: { owned?: boolean; favorite?: boolean } };
  tracks: { [packageId: string]: { owned?: boolean; favorite?: boolean } };
}

export const getUserContent = async (user: User) => {
  const data = (await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      content: true,
    },
  })) as { content?: Content } | null;

  return (
    data?.content ||
    ({
      cars: {},
      tracks: {},
    } as Content)
  );
};
