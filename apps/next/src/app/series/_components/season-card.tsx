"use client";

import { LicenseColors } from "@/config/license";
import { LicenseGroupNames } from "@/types/iracing";
import { type SeriesSeason } from "iracing-api";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SeasonCardProps {
  season: SeriesSeason;
}

export const SeasonCard = ({ season }: SeasonCardProps) => {
  const router = useRouter();

  const seasonName = useMemo(() => season.schedules[0]?.seriesName, [season]);
  const licenseColor = LicenseColors[season.licenseGroup];

  return (
    <a
      className="cursor-pointer"
      onClick={() => router.push(`/series/${season.seasonId}`)}
    >
      <Card
        className={cn(
          "h-32",
          `border-${licenseColor}/60 hover:bg-${licenseColor}/10`,
        )}
      >
        <CardHeader>
          <CardTitle>{seasonName}</CardTitle>
          <CardDescription>
            {season.official ? "Official" : "Unofficial"}
          </CardDescription>
          <CardDescription className={cn("text-sm", `text-${licenseColor}`)}>
            <Badge
              className={cn(
                `bg-${LicenseColors[season.licenseGroup]}`,
                `hover:bg-${LicenseColors[season.licenseGroup]}`,
              )}
            >{`${LicenseGroupNames[season.licenseGroup]}`}</Badge>
          </CardDescription>
        </CardHeader>
      </Card>
    </a>
  );
};
