import { Categories } from "@/data/iracing-consts";
import { ClassIcon } from "../_components/icons/class-icon";
import { LicenseGroup } from "@/types/iracing";

export const classOptions = [
  {
    value: `${LicenseGroup.Rookie}`,
    label: "Rookie",
    icon: () => <ClassIcon licenseGroup={LicenseGroup.Rookie} />,
  },
  {
    value: `${LicenseGroup.D}`,
    label: "D",
    icon: () => <ClassIcon licenseGroup={LicenseGroup.D} />,
  },
  {
    value: `${LicenseGroup.C}`,
    label: "C",
    icon: () => <ClassIcon licenseGroup={LicenseGroup.C} />,
  },
  {
    value: `${LicenseGroup.B}`,
    label: "B",
    icon: () => <ClassIcon licenseGroup={LicenseGroup.B} />,
  },
  {
    value: `${LicenseGroup.A}`,
    label: "A",
    icon: () => <ClassIcon licenseGroup={LicenseGroup.A} />,
  },
  {
    value: `${LicenseGroup.Pro}`,
    label: "Pro",
    icon: () => <ClassIcon licenseGroup={LicenseGroup.Pro} />,
  },
];

export const setupOptions = [
  {
    value: true,
    label: "Fixed",
  },
  {
    value: false,
    label: "Open",
  },
];

export const categoryOptions = [
  {
    value: Categories.OVAL,
    label: Categories.OVAL,
  },
  {
    value: Categories.ROAD,
    label: Categories.ROAD,
  },
  {
    value: Categories.DIRT_OVAL,
    label: Categories.DIRT_OVAL,
  },
  {
    value: Categories.DIRT_ROAD,
    label: Categories.DIRT_ROAD,
  },
];