import { Check, Star } from "lucide-react";

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

  const isFavorite = false;
  const isOwned = true;

  return (
    <div className="grid auto-rows-max grid-cols-1 gap-x-2 gap-y-1 dark:text-primary md:grid-cols-2 2xl:grid-cols-3">
      {carNames.length > 0 ? (
        carNames.sort().map((carName) => (
          <Button
            className="flex flex-row items-center justify-start gap-2"
            key={carName}
            variant="outline"
          >
            {isOwned && (
              <Button className="p-0" size="sm" variant="ghost">
                <Check className="h-4 w-4" />
              </Button>
            )}
            <span>{carName}</span>
            {isFavorite && (
              <Button className="p-0" size="sm" variant="ghost">
                <Star className="h-4 w-4" />
              </Button>
            )}
          </Button>
        ))
      ) : (
        <span className="text-slate-400">No cars to display</span>
      )}
    </div>
  );
};

export default CarsTab;
