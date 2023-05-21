"use client";

import type { Track } from "@prisma/client";
import type { User } from "next-auth";

export const TracksTab = ({
  user,
  tracks,
}: {
  user: User;
  tracks: Array<Track>;
}) => {
  console.log({ user, tracks });

  return (
    <div className="grid auto-rows-max grid-cols-1 gap-x-2 gap-y-1 dark:text-primary md:grid-cols-2 2xl:grid-cols-3">
      {tracks?.map((track) => track.trackName)}
    </div>
  );
};
