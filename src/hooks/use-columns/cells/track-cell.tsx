import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";

import { Star } from "lucide-react";
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

  const isFavorite = useMemo(() => {
    return content?.tracks?.[trackId]?.favorite ?? false;
  }, [trackId, content]);

  // TODO: Fix full width
  return (
    <div
      className={cn(
        isOwned && "-m-2 w-full bg-green-100/40 p-2 dark:bg-green-900/40"
      )}
    >
      <ContextMenu>
        <ContextMenuTrigger className=" cursor-pointer">
          {trackName ?? "Unknown"}
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem>
            <Star className="mr-2 h-4 w-4" />
            {isFavorite ? "Remove favorite track" : "Add favorite track"}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

export default TrackCell;
