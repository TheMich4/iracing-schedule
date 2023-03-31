/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import Checkbox from "../checkbox";
import { licenseGroups } from "~/utils/license";

const Filters = ({ filter, setFilter }) => {
  const handleClassChange = (event: any) => {
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
