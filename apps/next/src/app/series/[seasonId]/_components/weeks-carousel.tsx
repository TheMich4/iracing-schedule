"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { type SeriesSeason } from "iracing-api";
import { Week } from "./week";

interface WeeksCarouselProps {
  schedules?: SeriesSeason["schedules"];
}

export const WeeksCarousel = ({ schedules }: WeeksCarouselProps) => {
  return (
    <Carousel>
      <CarouselContent className="h-36">
        {schedules.map((schedule) => (
          <CarouselItem
            key={schedule.raceWeekNum}
            className="sm:basis-1/1 h-full lg:basis-1/3 "
          >
            <Week schedule={schedule} key={schedule.raceWeekNum} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
