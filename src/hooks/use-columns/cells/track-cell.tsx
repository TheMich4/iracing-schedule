import cn from "~/utils/cn";
import { useMemo } from "react";

const TrackCell = ({ row, content }) => {
  const { trackId, trackName } = useMemo(
    () => ({
      trackId: row.original.track.trackId,
      trackName: row.original.trackName,
    }),
    [row.original]
  );
  const isOwned = useMemo(() => {
    return content?.tracks?.[trackId]?.owned ?? false;
  }, [trackId, content]);

  return (
    <div
      className={cn(isOwned && "-m-2 bg-green-100/40 p-2 dark:bg-green-900/40")}
    >
      {trackName ?? "Unknown"}
    </div>
  );
};

export default TrackCell;
