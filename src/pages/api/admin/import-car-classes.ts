"use server";

import IracingAPI from "iracing-api";
import { prisma } from "~/server/db";

export const importCarClasses = async (email: string, password: string) => {
  const ir = new IracingAPI();
  await ir.login(email, password);

  const cars = await ir.getCars();
  const irCarClasses = await ir.getCarClasses();

  if (!irCarClasses) return;

  const carClasses = irCarClasses.map((carClass) => {
    const { carClassId, name, shortName, carsInClass } = carClass;

    const carPackageIds = carsInClass.map((car) => {
      const carData = cars?.find((c) => c.carId === car.carId);
      return carData?.packageId;
    });

    return {
      id: carClassId,
      name,
      shortName,
      carPackageIds,
    };
  });

  await Promise.all(
    carClasses.map(async (carClass) => {
      const { id, name, shortName, carPackageIds } = carClass;

      await prisma.carClass.upsert({
        where: { id },
        update: {
          name,
          shortName,
          cars: {
            connect: carPackageIds.map((packageId) => ({ packageId })),
          },
        },
        create: {
          id,
          name,
          shortName,
          cars: {
            connect: carPackageIds.map((packageId) => ({ packageId })),
          },
        },
      });
    })
  );

  return { carClasses };
};
