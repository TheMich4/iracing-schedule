"use server";

import type { User, UserContent } from "next-auth";

import { prisma } from "~/server/db";

export const getUserContent = async (user: User) => {
  const data = (await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      content: true,
    },
  })) as { content?: UserContent } | null;

  return (
    data?.content ||
    ({
      cars: {},
      tracks: {},
    } as UserContent)
  );
};
