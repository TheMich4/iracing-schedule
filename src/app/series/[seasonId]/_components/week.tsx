import { type SeriesSeason } from "iracing-api";
import { getRaceLimit } from "@/lib/race";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo } from "react";
import { getDateString } from "@/lib/week";

interface WeekProps {
  schedule: SeriesSeason["schedules"][0];
}

// TODO: Add track logo
export const Week = ({ schedule }: WeekProps) => {
  const raceLimit = getRaceLimit(schedule);

  const endDate = useMemo(() => {
    const date = new Date(schedule.startDate);
    date.setDate(date.getDate() + 6);

    return getDateString(date);
  }, [schedule.startDate]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{schedule.track?.trackName}</CardTitle>
        <CardDescription>
          {`Week ${schedule.raceWeekNum + 1}`}
          <span className="ml-2 text-xs">
            ({schedule.startDate} - {endDate})
          </span>
        </CardDescription>
        <CardDescription>
          {`${raceLimit?.limit} ${raceLimit?.type}`}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
