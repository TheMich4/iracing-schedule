/* eslint-disable react-hooks/rules-of-hooks */

import type { CarMap } from "~/types";
import { useMemo } from "react";

// TODO: Use Map
const useCars = () => {
  if (typeof window === "undefined") return {};

  const carMap = useMemo<CarMap>(
    () => JSON.parse(localStorage.getItem("cars") ?? "{}") || {},
    []
  );

  return carMap;
};

export default useCars;
