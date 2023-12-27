"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type Car as TCar } from "iracing-api";
import { Car } from "./car";

interface CarsCarouselProps {
  cars?: TCar[];
}

export const CarsCarousel = ({ cars }: CarsCarouselProps) => {
  return (
    <Carousel>
      <CarouselContent className="h-36">
        {cars?.map((car) => (
          <CarouselItem
            key={car.carId}
            className="sm:basis-1/1 h-full lg:basis-1/3 "
          >
            <Car car={car} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
