import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

import { Skeleton } from "~/components/ui/skeleton";
import { Star } from "lucide-react";
import { useState } from "react";

const TrackCell = ({ getValue }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer rounded-md px-2 hover:bg-slate-100 dark:hover:bg-slate-900">{`${getValue()}`}</div>
      </HoverCardTrigger>

      <HoverCardContent className="w-fit min-w-[300px]">
        <div className="flex flex-row gap-4">
          <div className="relative flex w-[80px] items-start justify-start">
            {!isLoaded && <Skeleton className="h-full w-full" />}
            {/* <Image
              alt="Series logo"
              layout="fill"
              objectFit="contain"
              onLoad={() => setIsLoaded(true)}
              src={`https://images-static.iracing.com/img/logos/series/${seriesData.assets.logo}`}
            /> */}
          </div>
          <div>
            <div className="font-semibold dark:text-slate-50">{getValue()}</div>
            {/* <div className="light:text-slate-700 max-w-[300px] whitespace-normal font-light">
              {seriesData.assets.seriesCopy}
            </div> */}
          </div>
          {/* TODO: Customize color if is favorite
          {/* <Star
            className="m-1 h-4 w-4 cursor-pointer"
            onClick={async () =>
              await addFavorite({ id: seriesData.seriesId, type: "series" })
            }
          /> */}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default TrackCell;
