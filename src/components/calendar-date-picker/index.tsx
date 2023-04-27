"use client";

import * as React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";

import { Button } from "@ui/button";
import { Calendar } from "@ui/calendar";
import type { CalendarDatePickerProps } from "./types";
import { Calendar as CalendarIcon } from "lucide-react";
import cn from "~/utils/cn";
import { format } from "date-fns";

const CalendarDatePicker = ({
  date,
  onSelect,
  className,
  ...props
}: CalendarDatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          variant={"outline"}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          {...props}
          mode="single"
          onSelect={onSelect}
          selected={date}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarDatePicker;
