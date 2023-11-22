import { LicenseGroup } from "@/types/iracing";

export const LicenseColors = new Proxy(
  {
    [LicenseGroup.Rookie]: "red-600",
    [LicenseGroup.D]: "orange-600",
    [LicenseGroup.C]: "yellow-600",
    [LicenseGroup.B]: "green-600",
    [LicenseGroup.A]: "blue-600",
    [LicenseGroup.Pro]: "fuchsia-600",
  },
  {
    get: (target, key) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return target[key] ?? "gray-600";
    },
  },
);
