"use server";

import IracingAPI from "iracing-api";
import { prisma } from "~/server/db";
import { track } from "@vercel/analytics/react";

export const importSchedule = async (email: string, password: string) => {
  const ir = new IracingAPI();
  await ir.login(email, password);

  const seriesSeasons = await ir.getSeriesSeasons();

  if (!seriesSeasons) return;

  const cars = await ir.getCars();
  const carClasses = await ir.getCarClasses();
  const tracks = await ir.getTracks();

  const getTrackData = (trackId: number | undefined) => {
    const track = tracks?.find((track) => track.trackId === trackId);

    if (!trackId || !track) return null;

    return {
      packageId: track.packageId,
      trackName: track.trackName,
    };
  };

  const byStartDate = seriesSeasons.reduce((acc, series) => {
    // Only import active sessions
    if (!series.active) return acc;

    series.schedules.forEach((schedule) => {
      acc = {
        ...acc,
        [schedule.startDate]: [
          ...(acc[schedule.startDate] || []),
          {
            carClasses: series.carClassIds,
            fixedSetup: series.fixedSetup,
            licenseGroup: series.licenseGroup,
            multiclass: series.multiclass,
            official: series.official,
            seriesId: series.seriesId,
            seriesName: schedule.seriesName,
            startType: schedule.startType,
            trackPackageId: tracks?.find(
              (track) => track.trackId === schedule.track?.trackId
            )?.packageId,
            weekStartDate: schedule.startDate,
          },
        ],
      };
    });

    return acc;
  }, {});

  // Delete all old schedules
  await prisma.scheduleItem.deleteMany({ where: {} });

  // Create new weeks with startDate
  await Promise.all(
    Object.keys(byStartDate).map(async (startDate: string) => {
      await prisma.weekSchedule.upsert({
        where: { startDate },
        create: {
          startDate,
        },
        update: {},
      });
    })
  );

  for (const [startDate, schedules] of Object.entries(byStartDate)) {
    await Promise.all(
      schedules.map(async (schedule) => {
        await prisma.scheduleItem.create({
          data: {
            // carClasses: schedule.carClasses.map((carClassId) => ({
            //   connect: { id: carClassId },
            // })),
            fixedSetup: schedule.fixedSetup,
            licenseGroup: schedule.licenseGroup,
            multiclass: schedule.multiclass,
            official: schedule.official,
            seriesId: schedule.seriesId,
            seriesName: schedule.seriesName,
            startType: schedule.startType,
            track: {
              connect: {
                packageId: schedule.trackPackageId,
              },
            },
            week: {
              connect: { startDate },
            },
          },
        });
      })
    );

    console.log("Waiting 500ms");

    // Throttle writes to not overload the database
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return { byStartDate };
};
