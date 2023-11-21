import { Season } from "@/types/iracing";
import { SeasonCard } from "./_components/season-card";
import seasons from "../../data/seasons.json";

export function sortSeasons(seasons: Array<Season>): Array<Season> {
  return seasons.sort((a, b) => {
    if (a.license_group !== b.license_group) {
      return a.license_group - b.license_group;
    }

    if (a.season_name !== b.season_name) {
      return a.season_name.localeCompare(b.season_name);
    }

    return 0;
  });
}

export default function SeriesPage() {
  const sortedSeasons = sortSeasons(seasons as Array<Season>);

  return (
    <main className="container bg-background py-2">
      <div className="grid grid-cols-4 gap-2">
        {sortedSeasons.map((season) => (
          <SeasonCard season={season} key={season.season_id} />
        ))}
      </div>
    </main>
  );
}
