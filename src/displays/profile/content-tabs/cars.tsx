import { Button } from "~/components/ui/button";
import type { User } from "next-auth";
import { cars } from "~/consts/cars";
import { useMemo } from "react";

const CarsTab = ({ user }: { user: User }) => {
  const carNames = useMemo(() => {
    return Object.entries(user.content?.cars ?? {}).reduce(
      (acc, [carId, value]) => {
        if (value.owned) {
          const carName = cars.find(
            (car) => String(car.packageId) === carId
          )?.carName;

          if (carName) acc = [...acc, carName];
        }
        return acc;
      },
      []
    );
  }, []);

  return (
    <div className="grid auto-rows-max grid-cols-1 gap-x-2 gap-y-1 dark:text-primary md:grid-cols-2 2xl:grid-cols-3">
      {carNames.sort().map((carName) => (
        <Button className="justify-start" key={carName} variant="outline">
          {carName}
        </Button>
      ))}
    </div>
  );
};

export default CarsTab;
