import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { type Dispatch, type SetStateAction, useState } from "react";

import { Button } from "~/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { type ColumnFiltersState } from "@tanstack/react-table";
import { ScheduleFilterMenu } from "./schedule-filter-menu";
import { trackTypes } from "~/utils/track-type";

const config = [
  {
    id: "licenseGroup",
    name: "Class",
    options: [
      {
        value: "1",
        label: "Rookie",
      },
      {
        value: "2",
        label: "D Class",
      },
      {
        value: "3",
        label: "C Class",
      },
      {
        value: "4",
        label: "B Class",
      },
      {
        value: "5",
        label: "A Class",
      },
    ],
  },
  {
    id: "trackType",
    name: "Track Type",
    options: Object.entries(trackTypes).map(([key, value]) => ({
      value: key,
      label: value.name,
    })),
  },
];

const ScheduleFilters = ({
  columnFilters,
  setColumnFilters,
}: {
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible className="w-full" open={open}>
      <div className="flex h-full flex-row items-center gap-2 rounded-md border">
        <CollapsibleTrigger asChild>
          <Button
            className="w-full justify-start text-left font-normal"
            onClick={() => setOpen((prevOpen) => !prevOpen)}
            size="sm"
            variant="ghost"
          >
            <ChevronsUpDown className="mr-2 h-4 w-4" />
            <span className="sr-only">Toggle</span>
            <span>Filters</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      {open && (
        <CollapsibleContent className="absolute z-10 mt-2 flex flex-row gap-2 rounded-md border bg-background p-2">
          {config.map((filter) => (
            <ScheduleFilterMenu
              key={filter.name}
              {...filter}
              columnFilters={columnFilters}
              setColumnFilters={setColumnFilters}
            />
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

export default ScheduleFilters;
