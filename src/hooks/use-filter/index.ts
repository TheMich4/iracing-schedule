import type { Dispatch, SetStateAction } from "react";

import type { Filter } from "./types";
import { useState } from "react";

const useFilter = (): [Filter, Dispatch<SetStateAction<Filter>>] => {
  const [filter, setFilter] = useState<Filter>({
    licenseGroup: [],
    official: ["Official", "Unofficial"],
    setup: ["Fixed", "Open"],
  });

  return [filter, setFilter];
};

export default useFilter;
