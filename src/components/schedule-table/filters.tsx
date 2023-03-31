/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { Dispatch, SetStateAction } from "react";

import Checkbox from "../checkbox";
import type { Filter } from "~/hooks/use-filter/types";
import { licenseGroups } from "~/utils/license";

interface FiltersProps {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

const Filters = ({ filter, setFilter }: FiltersProps) => {
  const handleClassChange = (event: unknown) => {
    const { checked, id } = event.target;
    if (checked) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        licenseGroup: [...prevFilter.licenseGroup, id],
      }));
    }
    if (!checked) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        licenseGroup: prevFilter.licenseGroup.filter((c) => c !== id),
      }));
    }
  };

  return (
    <div className="flex min-h-[100px] w-full flex-row gap-2 divide-x divide-slate-700 rounded-md bg-slate-800">
      <div>
        Class:
        {Object.entries(licenseGroups).map(([licenseId, value]) => (
          <Checkbox
            checked={filter.licenseGroup.includes(licenseId)}
            id={licenseId}
            key={`license-${value.short}`}
            label={value.name}
            onChange={handleClassChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Filters;
