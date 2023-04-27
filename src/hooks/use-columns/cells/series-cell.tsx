/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@ui/hover-card";

import type { CellContext } from "@tanstack/react-table";
import Image from "next/image";
import type { Schedule } from "~/types";

const SeriesCell = ({
  getValue,
  row: { original: seriesData },
}: CellContext<Schedule, any>) => {
  const seriesName = getValue() ?? "Unknown series";

  // TODO: Fix series logo sizing

  return (
    <div>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="cursor-pointer rounded-md px-2 hover:bg-slate-100 dark:hover:bg-slate-900">{`${seriesName}`}</div>
        </HoverCardTrigger>

        <HoverCardContent className="w-fit min-w-[300px]">
          <div className="flex flex-row gap-2">
            <div className="relative flex w-[80px]  items-start justify-start">
              <Image
                layout="fill"
                objectFit="contain"
                alt="Series logo"
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
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default SeriesCell;
