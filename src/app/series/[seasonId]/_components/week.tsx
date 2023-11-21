import type { Schedule } from "@/types/iracing";
import { getRaceLimit } from "@/lib/race";

interface WeekProps {
  schedule: Schedule;
}

// TODO: Add track logo
export const Week = ({ schedule }: WeekProps) => {
  const raceLimit = getRaceLimit(schedule);

  return (
    <div className="flex min-w-[300px] flex-col items-baseline gap-1 rounded-sm bg-muted/50 px-2 py-1 text-sm">
      <div className="font-bold">Week {schedule.race_week_num + 1}:</div>
      <div className="text-sm">{schedule.track?.track_name}</div>
      <div className="text-xs text-muted-foreground">{`${raceLimit?.limit} ${raceLimit?.type}`}</div>
    </div>
  );
};
