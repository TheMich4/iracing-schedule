"use client";

import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useCallback } from "react";

interface DataTableCalendarProps {
  updateWeekDate: (date: Date) => void;
}

export function DataTableCalendar({ updateWeekDate }: DataTableCalendarProps) {
  const [date, setDate] = React.useState<Date>(new Date());

  const handleDateChange = useCallback((date: Date | undefined) => {
    if (!date) return;

    setDate(date);
    updateWeekDate(date);
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "h-8 w-[150px] justify-start text-left font-normal text-foreground sm:w-[250px]",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
