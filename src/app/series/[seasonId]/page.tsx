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
    <main className="container bg-background py-2">
      <p className="flex items-center gap-2">
        <Badge
          className={cn(
            "text-center align-baseline",
            `bg-${LicenseColors[season.license_group]}`,
          )}
        >
          {LicenseGroupNames[season.license_group]}
        </Badge>
        <span className="flex align-baseline text-2xl font-bold tracking-tighter">
          {season.season_name}
        </span>
      </p>

      <div className="flex flex-col gap-1">
        {season.schedules.map((schedule) => (
          <Week schedule={schedule} key={schedule.race_week_num} />
        ))}
      </div>
    </main>
  );
}
