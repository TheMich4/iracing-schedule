import { Dispatch, SetStateAction, useEffect } from "react";

import type { Filter } from "./types";
import { licenseGroups } from "~/utils/license";
import { trackTypes } from "~/utils/track-type";
import { useState } from "react";

const defaultFilter: Filter = {
  licenseGroup: Object.keys(licenseGroups),
  official: ["Official", "Unofficial"],
  setup: ["Fixed", "Open"],
  trackType: Object.keys(trackTypes),
};

const getInitialFilter = (): Filter => {
  const lsFilter =
    typeof window !== "undefined" && localStorage.getItem("filter");

  if (lsFilter && lsFilter !== "{}") {
    return (JSON.parse(lsFilter) as Filter) || defaultFilter;
  }

  return defaultFilter;
};

const useFilter = (): [Filter, Dispatch<SetStateAction<Filter>>] => {
  const [filter, setFilter] = useState<Filter>(getInitialFilter());

  useEffect(() => {
    localStorage.setItem("filter", JSON.stringify(filter));
  }, [filter]);

  return [filter, setFilter];
};

export default useFilter;
