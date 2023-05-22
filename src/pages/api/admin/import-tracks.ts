"use server";

import IracingAPI from "iracing-api";
import { prisma } from "~/server/db";

interface Track {
  packageId: number;
  trackName: string;
  trackIds: number[];
}

export const importTracks = async (email: string, password: string) => {
  const ir = new IracingAPI();
  await ir.login(email, password);

  const irTracks = await ir.getTracks();

  const trackMap = irTracks?.reduce((acc, track) => {
    const { packageId, trackName, trackId } = track;

    if (!acc[packageId]) {
      acc[packageId] = {
        packageId,
        trackName,
        trackIds: [trackId],
      };
    } else {
      acc[packageId]?.trackIds.push(trackId);
    }

    return acc;
  }, {} as { [packageId: string]: Track });

  await Promise.all(
    Object.values(trackMap).map(async (track: Track) => {
      const { packageId, trackName, trackIds } = track;

      await prisma.track.upsert({
        where: { packageId },
        update: {
          trackName,
          trackIds,
        },
        create: {
          packageId,
          trackName,
          trackIds,
        },
      });
    })
  );
};
