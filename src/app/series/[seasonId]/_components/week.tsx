import { type SeriesSeason } from "iracing-api";
import { getRaceLimit } from "@/lib/race";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WeekProps {
  schedule: SeriesSeason["schedules"][0];
}

// TODO: Add track logo
export const Week = ({ schedule }: WeekProps) => {
  const raceLimit = getRaceLimit(schedule);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{schedule.track?.trackName}</CardTitle>
        <CardDescription>{`Week ${schedule.raceWeekNum + 1}`}</CardDescription>
        <CardDescription>{`${raceLimit?.limit} ${raceLimit?.type}`}</CardDescription>
      </CardHeader>
    </Card>
  );
};
