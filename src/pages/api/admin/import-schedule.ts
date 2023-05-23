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
            carClasses: series.carClassIds.map((carClassId) => {
              const carClass = carClasses?.find(
                (carClass) => carClass.carClassId === carClassId
              );
              return {
                id: carClassId,
                name: carClass?.name,
                shortName: carClass?.shortName,
                carsInClass: carClass?.carsInClass.map((car) => {
                  const carData = cars?.find((c) => c.carId === car.carId);
                  return carData?.packageId;
                }),
              };
            }),
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
          },
        ],
      };
    });

    return acc;
  }, {});

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

  return { byStartDate };
};
