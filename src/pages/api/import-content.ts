"use server";

import IracingAPI from "iracing-api";

export const importContent = async (email: string, password: string) => {
  const ir = new IracingAPI();
  await ir.login(email, password);

  const memberInfo = await ir.getMemberInfo();

  if (!memberInfo) return;

  const ownedCars = memberInfo.carPackages.map((car) => car.packageId);
  const ownedTracks = memberInfo.trackPackages.map((track) => track.packageId);

  return { ownedCars, ownedTracks };
};
