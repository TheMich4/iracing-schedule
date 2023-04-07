import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/dialog";

import { cars } from "~/consts/cars";
import { useMemo } from "react";

const CarsDialog = ({ isOpen, close, series }) => {
  const carData = useMemo(() => {
    return series?.carIds?.map((carId) =>
      cars.find((car) => car.carId === carId)
    );
  }, [series]);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cars</DialogTitle>
          <DialogDescription>{series?.seriesName}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-1">
          {carData?.map((car) => (
            <div>{car.carName}</div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarsDialog;
