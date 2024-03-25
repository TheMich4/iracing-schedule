import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type ParsedData } from "@/server/data/parse-seasons";
import { useMemo, type ReactNode } from "react";
import seasons from "@/data/seasons.json";
import Link from "next/link";

interface TrackCellProps {
  getValue: () => unknown;
  icons?: ReactNode;
  row: { original: ParsedData };
}

export const TrackCell = ({
  getValue,
  icons,
  row: { original: season },
}: TrackCellProps) => {
  const tracks = useMemo(() => {
    return seasons
      .find((s) => s.seasonId === season.seasonId)
      ?.schedules.map((s) => ({ ...s.track, startDate: s.startDate }));
  }, [season.seasonId]);

  return (
    <Dialog>
      <DialogTrigger className="flex flex-row items-center gap-2">
        {icons && <span>{icons}</span>}
        <span className="text-start">{getValue() as string}</span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Tracks in ${season.seriesName}`}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-1">
          {tracks?.map((track, i) => (
            <Link
              key={track.trackId}
              className="flex flex-row"
              href={`/track/${track.trackId}`}
            >
              <div className="w-8 text-muted-foreground">{`${i + 1}. `}</div>
              <span className="hover:underline">{track.trackName}</span>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
