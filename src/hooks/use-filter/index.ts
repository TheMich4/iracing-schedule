import type { Filter } from "./types";
import { useState } from "react";

const useFilter = () => {
  const [filter, setFilter] = useState<Filter>({
    licenseGroup: [],
  });

  return [filter, setFilter];
};

export default useFilter;
