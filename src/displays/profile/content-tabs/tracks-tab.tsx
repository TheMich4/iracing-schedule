"use client";

import { TabItem } from "./tab-item";
import type { Track } from "@prisma/client";
import type { User } from "next-auth";

const isFavorite = false;

export const TracksTab = ({
  user,
  tracks,
}: {
  user: User;
  tracks: Array<Track>;
}) => {
  return (
    <div className="grid auto-rows-max grid-cols-1 gap-x-2 gap-y-1 dark:text-primary md:grid-cols-2 2xl:grid-cols-3">
      {tracks?.map((track) => (
        <TabItem
          isFavorite={isFavorite}
          isOwned={user?.content?.tracks?.[track.packageId]?.owned ?? false}
          key={track.packageId}
          label={track.trackName}
        />
      ))}
    </div>
  );
};
