import { Dispatch, SetStateAction, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ColumnFiltersState } from "@tanstack/react-table";
import { SlidersHorizontal } from "lucide-react";

export const ScheduleFilterMenu = ({
  id,
  name,
  options,
  columnFilters,
  setColumnFilters,
}: {
  id: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
}) => {
  const values = useMemo(
    () => columnFilters.find((filter) => filter.id === id)?.value ?? [],
    [columnFilters]
  );

  const handleFilterClick = (optionValue: string) => {
    setColumnFilters((filters) => {
      return filters.map((filter) => {
        if (filter.id !== id) {
          return filter;
        }

        const value = filter.value.includes(optionValue)
          ? filter.value.filter((v) => v !== optionValue)
          : [...filter.value, optionValue];

        return { ...filter, value };
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto flex h-full">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {name}
          {values.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {values.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-[150px] border bg-background"
      >
        {options.map((option) => {
          return (
            <DropdownMenuCheckboxItem
              key={option.value}
              className="capitalize"
              checked={values.includes(option.value)}
              onClick={() => handleFilterClick(option.value)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};