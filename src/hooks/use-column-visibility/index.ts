import { useState } from "react";

const defaultColumnVisibility = {
  raceWeekNum: false,
};

const useColumnVisibility = () => {
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >(defaultColumnVisibility);

  return [columnVisibility, setColumnVisibility];
};

export default useColumnVisibility;
