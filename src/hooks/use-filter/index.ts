import { useState } from "react";

const useFilter = () => {
  const [filter, setFilter] = useState<Record<string, Array<string>>>({
    licenseGroup: [],
  });

  return [filter, setFilter];
};

export default useFilter;
