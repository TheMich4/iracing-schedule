import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

import { Button } from "~/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { ScheduleFilterMenu } from "./schedule-filter-menu";

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
];

const ScheduleFilters = ({ columnFilters, setColumnFilters }) => {
  console.log({ columnFilters });

  return (
    <Collapsible className="w-full">
      <div className="flex h-full flex-row items-center gap-2 rounded-md border">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-left font-normal"
          >
            <ChevronsUpDown className="mr-2 h-4 w-4" />
            <span className="sr-only">Toggle</span>
            <span>Filters</span>
          </Button>
        </CollapsibleTrigger>
      </div>

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
    </Collapsible>
  );
};

export default ScheduleFilters;
