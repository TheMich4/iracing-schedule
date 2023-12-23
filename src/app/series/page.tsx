"use client";

import { SeasonCard } from "./_components/season-card";
import { type SeriesSeason } from "iracing-api";
import seasons from "../../data/seasons.json";
import { sortSeasons } from "@/lib/season";
import { useFilters } from "./_hooks/use-filters";
import { useMemo } from "react";

export default function SeriesPage() {
  const sortedSeasons = sortSeasons(seasons as Array<SeriesSeason>);
  const { filters, setFilters } = useFilters();

  const seasonsData = useMemo(
    () => sortedSeasons.filter(() => true),
    [sortedSeasons, filters],
  );

  return (
    <main className="container flex flex-col gap-2 bg-background py-2">
      {/* <div className="flex flex-row justify-center gap-2">
        <CategoryDropdown filters={filters} setFilters={setFilters} />
        <LicenseDropdown filters={filters} setFilters={setFilters} />
      </div> */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {seasonsData.map((season) => (
          <SeasonCard season={season} key={season.seasonId} />
        ))}
      </div>
    </main>
  );
}
