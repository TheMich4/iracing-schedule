export interface LicenseGroupMap {
  [licenseGroupId: string]: {
    name: string;
    color: string;
    short: string;
  };
}

export const licenseGroups = {
  "1": {
    name: "Rookie",
    color: "red-500",
    short: "R",
  },
  "2": {
    name: "D Class",
    color: "orange-500",
    short: "D",
  },
  "3": {
    name: "C Class",
    color: "yellow-500",
    short: "C",
  },
  "4": {
    name: "B Class",
    color: "green-500",
    short: "B",
  },
  "5": {
    name: "A Class",
    color: "blue-500",
    short: "A",
  },
};

export const licenseGroupMap = new Proxy(licenseGroups, {
  get: (target: LicenseGroupMap, prop) =>
    target[String(prop)] || { name: "Unknown", color: "#FFFFFF", short: "U" },
});
