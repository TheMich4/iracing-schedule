/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { type Dispatch, type SetStateAction, useState } from "react";

import Checkbox from "../../checkbox";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import type { Filter } from "~/hooks/use-filter/types";
import { licenseGroups } from "~/utils/license";
import { trackTypes } from "~/utils/track-type";

interface FiltersProps {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

const Filters = ({ filter, setFilter }: FiltersProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClassChange = (checked: boolean, id: string) => {
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
    <div className="flex w-full flex-row gap-2 divide-slate-700 rounded-md bg-slate-800 p-2 text-slate-200">
      <div
        className="cursor-pointer px-2 py-1"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded ? (
          <ChevronUpIcon className="h-4 w-4" />
        ) : (
          <ChevronDownIcon className="h-4 w-4" />
        )}
      </div>
      {isExpanded ? (
        <>
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
          <div>
            <div>Setup:</div>
            {["Fixed", "Open"].map((setup) => (
              <Checkbox
                checked={filter.setup.includes(setup)}
                id={setup}
                key={`setup-${setup}`}
                label={setup}
                onChange={(checked: boolean, id: string) => {
                  if (checked) {
                    setFilter((prevFilter) => ({
                      ...prevFilter,
                      setup: [...prevFilter.setup, id],
                    }));
                  }
                  if (!checked) {
                    setFilter((prevFilter) => ({
                      ...prevFilter,
                      setup: prevFilter.setup.filter((c) => c !== id),
                    }));
                  }
                }}
              />
            ))}
          </div>
          <div>
            <div>Official:</div>
            {["Official", "Unofficial"].map((official) => (
              <Checkbox
                checked={filter.official.includes(official)}
                id={official}
                key={`official-${official}`}
                label={official}
                onChange={(checked: boolean, id: string) => {
                  if (checked) {
                    setFilter((prevFilter) => ({
                      ...prevFilter,
                      official: [...prevFilter.official, id],
                    }));
                  }
                  if (!checked) {
                    setFilter((prevFilter) => ({
                      ...prevFilter,
                      official: prevFilter.official.filter((c) => c !== id),
                    }));
                  }
                }}
              />
            ))}
          </div>
          <div>
            <div>Track type:</div>
            {Object.entries(trackTypes).map(([trackTypeId, value]) => (
              <Checkbox
                checked={filter.trackType.includes(trackTypeId)}
                id={trackTypeId}
                key={`trackType-${trackTypeId}`}
                label={value.name}
                onChange={(checked: boolean, id: string) => {
                  if (checked) {
                    setFilter((prevFilter) => ({
                      ...prevFilter,
                      trackType: [...prevFilter.trackType, id],
                    }));
                  }
                  if (!checked) {
                    setFilter((prevFilter) => ({
                      ...prevFilter,
                      trackType: prevFilter.trackType.filter((c) => c !== id),
                    }));
                  }
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <div>TEST</div>
      )}
    </div>
  );
};

export default Filters;