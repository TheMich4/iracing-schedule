import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/dialog";

import type { Car } from "~/types";
import type { CarsDialogProps } from "./types";
import { cars } from "~/consts/cars";
import { useMemo } from "react";

const CarsDialog = ({ isOpen, close, series }: CarsDialogProps) => {
  const carData = useMemo<Array<Car>>(() => {
    return series?.carIds?.map((carId) =>
      cars.find((car) => car.carId === carId)
    );
  }, [series]);

  console.log({ carData });

  return (
    <Dialog onOpenChange={close} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cars</DialogTitle>
          <DialogDescription>{series?.seriesName}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-1">
          {carData?.map((car) => (
            <div key={car.carId}>{car.carName}</div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarsDialog;
