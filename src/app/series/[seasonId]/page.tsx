import { Badge } from "@/components/ui/badge";
import { LicenseColors } from "@/config/license";
import { LicenseGroupNames } from "@/types/iracing";
import { WeeksCarousel } from "./_components/weeks-carousel";
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

      <div className="container">
        <WeeksCarousel schedules={season.schedules} />
      </div>
    </main>
  );
}
