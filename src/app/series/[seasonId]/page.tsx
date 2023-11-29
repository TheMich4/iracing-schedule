import { Badge } from "@/components/ui/badge";
import { LicenseColors } from "@/config/license";
import { LicenseGroupNames } from "@/types/iracing";
import { Week } from "./_components/week";
import { cn } from "@/lib/utils";
import { getSeasonData } from "@/lib/season";

interface SeasonPageProps {
  params: {
    seasonId: string;
  };
}

export default function SeasonPage({ params: { seasonId } }: SeasonPageProps) {
  const season = getSeasonData(parseInt(seasonId));

  if (!season) {
    return <div>Season not found</div>;
  }

  return (
    <main className="container flex flex-col gap-2 bg-background py-2">
      <div className="flex items-center gap-2">
        <Badge
          className={cn(
            "text-center align-baseline",
            `bg-${LicenseColors[season.licenseGroup]}`,
          )}
        >
          {LicenseGroupNames[season.licenseGroup]}
        </Badge>
        <span className="flex align-baseline text-2xl font-bold tracking-tighter">
          {season.seasonName}
        </span>
      </div>

      {/* TODO: Make carousel */}
      <div className=" flex h-32 w-full flex-row gap-1 overflow-x-scroll">
        {season.schedules.map((schedule) => (
          <Week schedule={schedule} key={schedule.raceWeekNum} />
        ))}
      </div>
    </main>
  );
}
