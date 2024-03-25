import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { carClasses, cars } from "@iracing-schedule/data";

import { FreeIcon } from "../icons/free-icon";
import type { ParsedData } from "@iracing-schedule/data";
import { useMemo } from "react";

interface CarClassesCellProps {
  row: { original: ParsedData };
}

export const CarClassesCell = ({
  row: { original: season },
}: CarClassesCellProps) => {
  const { classes, hasFreeCar, carsMap } = useMemo(() => {
    const fullClasses = season.carClassIds.map((id) => carClasses[id]);

    return {
      classes: fullClasses.map((c) => c?.shortName).join(", "),
      hasFreeCar: season.hasFreeCar,
      carsMap: fullClasses.reduce(
        (acc, c) => [
          ...acc,
          {
            name: c.name,
            id: c.carClassId,
            cars: c.carsInClass
              .map((car) => cars[car.carId])
              .sort((a, b) => a.carName.localeCompare(b.carName)),
          },
        ],
        [] as {
          name: string;
          id: string;
          cars: Record<string, unknown>[];
        }[],
      ),
    };
  }, [season.carClassIds]);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex flex-row items-center gap-2 text-start">
          {hasFreeCar && <FreeIcon />}
          {classes}
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Cars in ${season.seriesName}`}</DialogTitle>
        </DialogHeader>

        {carsMap.map((carClass) => (
          <div key={carClass.id} className="flex flex-col gap-2">
            <span className="text-xl font-semibold">{carClass.name}</span>
            {carClass.cars.map((car) => (
              <span className="ml-2 text-muted-foreground/90" key={car.carId}>
                {car.carName}
              </span>
            ))}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};
