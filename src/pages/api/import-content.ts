"use server";

import IracingAPI from "iracing-api";
import { Prisma } from "@prisma/client";
import { User } from "next-auth";
import { prisma } from "~/server/db";

interface Content {
  cars: { [packageId: string]: { owned?: boolean; favorite?: boolean } };
  tracks: { [packageId: string]: { owned?: boolean; favorite?: boolean } };
}

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

  const data = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      content: true,
    },
  });
  const currentContent =
    data?.content ||
    ({
      cars: {},
      tracks: {},
    } as Content);

  // const cars = memberInfo.carPackages.map((car) => car.packageId);
  // const ownedTracks = memberInfo.trackPackages.map((track) => track.packageId);

  const cars = memberInfo.carPackages.reduce((acc, car) => {
    acc[car.packageId] = {
      ...(currentContent?.cars?.[car.packageId] || {}),
      owned: true,
    };
    return acc;
  }, {} as Content);

  const tracks = memberInfo.trackPackages.reduce((acc, track) => {
    acc[track.packageId] = {
      ...(currentContent?.tracks?.[track.packageId] || {}),
      owned: true,
    };
    return acc;
  }, {} as Content);

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

  return { cars, tracks, currentContent, newContent };
};