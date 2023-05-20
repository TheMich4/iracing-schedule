"use server";

import IracingAPI from "iracing-api";
import { prisma } from "~/server/db";

export const importTracks = async (email: string, password: string) => {
  console.log("importTracks", { email, password });

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
      acc[packageId].trackIds.push(trackId);
    }

    return acc;
  }, {});

  const tracks = Object.values(trackMap);

  await Promise.all(
    tracks.map(async (track: any) => {
      await prisma.track.upsert({
        where: { packageId: track.packageId },
        update: {
          trackName: track.trackName,
          trackIds: track.trackIds,
        },
        create: {
          packageId: track.packageId,
          trackName: track.trackName,
          trackIds: track.trackIds,
        },
      });
    })
  );
};
