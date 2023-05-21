import { Check, Star } from "lucide-react";

import { Button } from "~/components/ui/button";
import { TabItem } from "./tab-item";
import type { User } from "next-auth";
import { cars } from "~/consts/cars";
import { useMemo } from "react";

export const CarsTab = ({ user }: { user: User }) => {
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

  const isFavorite = false;
  const isOwned = true;

  return (
    <div className="grid auto-rows-max grid-cols-1 gap-x-2 gap-y-1 dark:text-primary md:grid-cols-2 2xl:grid-cols-3">
      {carNames.length > 0 ? (
        carNames
          .sort()
          .map((carName) => (
            <TabItem
              isFavorite={isFavorite}
              isOwned={isOwned}
              key={carName}
              label={carName}
            />
          ))
      ) : (
        <span className="text-slate-400">No cars to display</span>
      )}
    </div>
  );
};
