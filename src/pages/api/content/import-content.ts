"use server";

import IracingAPI from "iracing-api";
import { type Prisma } from "@prisma/client";
import { type User } from "next-auth";
import { prisma } from "~/server/db";
import { getUserContent } from "./get-user-content";

export const importContent = async (
  user: User,
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  }
) => {
  const ir = new IracingAPI();
  await ir.login(email, password);

  const memberInfo = await ir.getMemberInfo();

  if (!memberInfo) return;

  const currentContent = await getUserContent(user);

  const cars = memberInfo.carPackages.reduce((acc, car) => {
    acc[car.packageId] = {
      ...(currentContent?.cars?.[car.packageId] || {}),
      owned: true,
    };
    return acc;
  }, {});

  const tracks = memberInfo.trackPackages.reduce((acc, track) => {
    acc[track.packageId] = {
      ...(currentContent?.cars?.[track.packageId] || {}),
      owned: true,
    };
    return acc;
  }, {});

  const newContent = {
    cars,
    tracks,
  } as Prisma.JsonObject;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      content: newContent,
    },
  });
};
