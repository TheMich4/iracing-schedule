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
      <CarouselContent>
        {schedules.map((schedule) => (
          <CarouselItem
            key={schedule.raceWeekNum}
            className="sm:basis-1/2 lg:basis-1/4"
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
