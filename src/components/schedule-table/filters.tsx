/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import Checkbox from "../checkbox";
import { useState } from "react";

const Filters = () => {
  const [classState, setClassState] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
    R: false,
  });

  const handleClassChange = (event: any) => {
    const { checked, id } = event.target;
    setClassState((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div className="min-h-[100px] w-full rounded-md bg-slate-800">
      <div>
        Class:
        <Checkbox
          checked={classState["A"]}
          id="A"
          label="A"
          onChange={handleClassChange}
        />
        <Checkbox
          checked={classState["B"]}
          id="B"
          label="B"
          onChange={handleClassChange}
        />
        <Checkbox
          checked={classState["C"]}
          id="C"
          label="C"
          onChange={handleClassChange}
        />
        <Checkbox
          checked={classState["D"]}
          id="D"
          label="D"
          onChange={handleClassChange}
        />
        <Checkbox
          checked={classState["R"]}
          id="R"
          label="R"
          onChange={handleClassChange}
        />
      </div>
    </div>
  );
};

export default Filters;
