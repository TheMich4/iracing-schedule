"use client";

/* eslint-disable @typescript-eslint/restrict-template-expressions */

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

import type { CellContext } from "@tanstack/react-table";
import Image from "next/image";
import type { Schedule } from "~/types";
import { Skeleton } from "~/components/ui/skeleton";
import { useState } from "react";

const SeriesCell = ({
  getValue,
  row: { original: seriesData },
}: CellContext<Schedule, any>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const seriesName = getValue() ?? "Unknown series";

  const [isLoaded, setIsLoaded] = useState(false);

  // TODO: Fix series logo sizing
  return (
    <div>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="cursor-pointer rounded-md px-2 hover:bg-slate-100 dark:hover:bg-slate-900">{`${seriesName}`}</div>
        </HoverCardTrigger>

        <HoverCardContent className="w-fit min-w-[300px]">
          <div className="flex flex-row gap-4">
            <div className="relative flex w-[80px] items-start justify-start">
              {!isLoaded && <Skeleton className="h-full w-full" />}
              <Image
                alt="Series logo"
                layout="fill"
                objectFit="contain"
                onLoad={() => setIsLoaded(true)}
                src={`https://images-static.iracing.com/img/logos/series/${seriesData.assets.logo}`}
              />
            </div>
            <div>
              <div className="font-semibold dark:text-slate-50">
                {seriesName}
              </div>
              <div className="light:text-slate-700 max-w-[300px] whitespace-normal font-light">
                {seriesData.assets.seriesCopy}
              </div>
            </div>
            {/* TODO: Customize color if is favorite */}
            {/* <Star
              className="m-1 h-4 w-4 cursor-pointer"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () =>
                await addFavorite({
                  id: seriesData.seriesId,
                  type: "series",
                })
              }
            /> */}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default SeriesCell;
