"use server";

import IracingAPI from "iracing-api";
import { prisma } from "~/server/db";

interface Car {
  packageId: number;
  carName: string;
  carIds: number[];
}

export const importCars = async (email: string, password: string) => {
  const ir = new IracingAPI();
  await ir.login(email, password);

  const irCars = await ir.getCars();

  if (!irCars) return;

  const carMap = irCars?.reduce((acc, car) => {
    const { carId, carName, packageId } = car;

    if (!acc[packageId]) {
      acc[packageId] = {
        packageId,
        carName,
        carIds: [carId],
      };
    } else {
      acc[packageId]?.carIds.push(carId);
    }

    return acc;
  }, {} as { [packageId: string]: Car });

  await Promise.all(
    Object.values(carMap).map(async (car: Car) => {
      const { packageId, carName, carIds } = car;

      await prisma.car.upsert({
        where: { packageId },
        update: {
          carName,
          carIds,
        },
        create: {
          packageId,
          carName,
          carIds,
        },
      });
    })
  );

  return irCars;
};
