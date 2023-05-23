"use server";

import IracingAPI from "iracing-api";
import { prisma } from "~/server/db";

interface Track {
  packageId: number;
  trackName: string;
}

export const importTracks = async (email: string, password: string) => {
  const ir = new IracingAPI();
  await ir.login(email, password);

  const irTracks = await ir.getTracks();

  const trackMap = irTracks?.reduce((acc, track) => {
    const { packageId, trackName } = track;

    if (!acc[packageId]) {
      acc[packageId] = {
        packageId,
        trackName,
      };
    }

    return acc;
  }, {} as { [packageId: string]: Track });

  await Promise.all(
    Object.values(trackMap).map(async (track: Track) => {
      const { packageId, trackName } = track;

      await prisma.track.upsert({
        where: { packageId },
        update: {
          trackName,
        },
        create: {
          packageId,
          trackName,
        },
      });
    })
  );
};
