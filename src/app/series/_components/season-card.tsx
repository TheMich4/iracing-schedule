"use client";

import { LicenseColors } from "@/config/license";
import { cn } from "@/lib/utils";
import { LicenseGroupNames, type Season } from "@/types/iracing";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface SeasonCardProps {
  season: Season;
}

export const SeasonCard = ({ season }: SeasonCardProps) => {
  const router = useRouter();

  const seasonName = useMemo(() => season.schedules[0]?.series_name, [season]);
  const licenseColor = LicenseColors[season.license_group];

  return (
    <a
      className={cn(
        "flex h-32 cursor-pointer flex-col gap-1 rounded-sm border bg-card p-2",
        `border-${licenseColor}/60 hover:bg-${licenseColor}/10`,
      )}
      onClick={() => router.push(`/series/${season.season_id}`)}
    >
      <div className="text-sm font-bold">{seasonName}</div>
      <div className="text-sm text-muted-foreground">
        {season.official ? "Official" : "Unofficial"}
      </div>
      <div className={cn("text-sm", `text-${licenseColor}`)}>
        {`${LicenseGroupNames[season.license_group]}`}
      </div>
    </a>
  );
};
