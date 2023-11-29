"use client";

import { LicenseColors } from "@/config/license";
import { LicenseGroupNames } from "@/types/iracing";
import { type SeriesSeason } from "iracing-api";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

interface SeasonCardProps {
  season: SeriesSeason;
}

export const SeasonCard = ({ season }: SeasonCardProps) => {
  const router = useRouter();

  const seasonName = useMemo(() => season.schedules[0]?.seriesName, [season]);
  const licenseColor = LicenseColors[season.licenseGroup];

  return (
    <a
      className={cn(
        "flex h-32 cursor-pointer flex-col gap-1 rounded-sm border bg-card p-2",
        `border-${licenseColor}/60 hover:bg-${licenseColor}/10`,
      )}
      onClick={() => router.push(`/series/${season.seasonId}`)}
    >
      <div className="text-sm font-bold">{seasonName}</div>
      <div className="text-sm text-muted-foreground">
        {season.official ? "Official" : "Unofficial"}
      </div>
      <div className={cn("text-sm", `text-${licenseColor}`)}>
        {`${LicenseGroupNames[season.licenseGroup]}`}
      </div>
    </a>
  );
};
