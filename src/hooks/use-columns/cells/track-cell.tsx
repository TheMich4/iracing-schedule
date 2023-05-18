import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { useMemo, useState } from "react";

import { Star } from "lucide-react";
import type { UserContent } from "next-auth";
import { cn } from "~/utils/cn";
import { useTheme } from "next-themes";

export const TrackCell = ({
  row,
  content,
}: {
  row: { original: { track: { trackId: number }; trackName: string } };
  content: UserContent;
}) => {
  const { theme } = useTheme();

  const { trackId, trackName } = useMemo(
    () => ({
      trackId: row.original.track.trackId,
      trackName: row.original.trackName,
    }),
    [row.original]
  );
  const isOwned = useMemo(
    () => content?.tracks?.[trackId]?.owned ?? false,
    [trackId, content]
  );

  const [isFavorite, setIsFavorite] = useState(
    content?.tracks?.[trackId]?.favorite ?? false
  );

  // TODO: Fix full width
  return (
    <div
      className={cn(
        isOwned && "-m-2 w-full bg-green-100/40 p-2 dark:bg-green-900/40"
      )}
    >
      <ContextMenu>
        <ContextMenuTrigger className=" cursor-pointer">
          <div className="flex flex-row items-center">
            {isFavorite && (
              <Star
                className="mr-2 h-4 w-4"
                fill={theme === "dark" ? "#E1E7EF" : "#0F172A"}
              />
            )}
            {trackName ?? "Unknown"}
          </div>
        </ContextMenuTrigger>

        {/* <ContextMenuContent>
          <ContextMenuItem onClick={() => setIsFavorite((prev) => !prev)}>
            <Star
              className="mr-2 h-4 w-4"
              fill={theme === "dark" ? "#94A3B8" : "#0F172A"}
            />
            {isFavorite ? "Remove favorite track" : "Add favorite track"}
          </ContextMenuItem>
        </ContextMenuContent> */}
      </ContextMenu>
    </div>
  );
};
