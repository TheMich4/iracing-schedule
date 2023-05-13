"use client";

import Calendar from "~/components/schedule-table/calendar";
import { DataTable } from "~/components/ui/data-table";
import useColumns from "~/hooks/use-columns";
import useSchedule from "~/hooks/use-schedule";
import { useState } from "react";

const ScheduleTable = () => {
  const [date, setDate] = useState<Date>(new Date());
  const { columns } = useColumns();

  const { schedule, minDate, maxDate } = useSchedule({ date });

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-col-reverse justify-between gap-2 lg:flex-row">
        <Calendar
          initialDate={date}
          maxDate={maxDate}
          minDate={minDate}
          setDate={setDate}
        />
      </div>

      <DataTable columns={columns} data={schedule} />
    </div>
  );
};

export default ScheduleTable;
