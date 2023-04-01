import type { Dispatch, SetStateAction } from "react";

import type { Filter } from "./types";
import { trackTypes } from "~/utils/track-type";
import { useState } from "react";

const useFilter = (): [Filter, Dispatch<SetStateAction<Filter>>] => {
  const [filter, setFilter] = useState<Filter>({
    licenseGroup: [],
    official: ["Official", "Unofficial"],
    setup: ["Fixed", "Open"],
    trackType: Object.keys(trackTypes),
  });

  return [filter, setFilter];
};

export default useFilter;
