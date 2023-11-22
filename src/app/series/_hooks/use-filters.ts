import type { Filters } from "../_components/types";
import { LicenseGroupNames } from "@/types/iracing";
import { categories } from "@/data/iracing-consts";
import { useState } from "react";

const getDefaultCategories = () => {
  return categories.reduce(
    (acc, category) => {
      acc[category] = true;
      return acc;
    },
    {} as Record<string, boolean>,
  );
};

const getDefaultLicenses = () => {
  return Object.values(LicenseGroupNames).reduce(
    (acc, license) => {
      acc[license] = true;
      return acc;
    },
    {} as Record<string, boolean>,
  );
};

export const useFilters = () => {
  const [filters, setFilters] = useState<Filters>({
    categories: getDefaultCategories(),
    licenses: getDefaultLicenses(),
  });

  return { filters, setFilters };
};
