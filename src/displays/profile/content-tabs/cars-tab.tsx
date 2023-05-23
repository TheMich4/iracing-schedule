import type { Car } from "@prisma/client";
import { TabItem } from "./tab-item";
import type { User } from "next-auth";

const isFavorite = false;

export const CarsTab = ({ user, cars }: { user: User; cars: Array<Car> }) => {
  return (
    <div className="grid auto-rows-max grid-cols-1 gap-x-2 gap-y-1 dark:text-primary md:grid-cols-2 2xl:grid-cols-3">
      {cars.length > 0 ? (
        cars.map((car) => (
          <TabItem
            isFavorite={isFavorite}
            isOwned={user.content.cars[car.packageId]?.owned ?? false}
            key={car.carName}
            label={car.carName}
          />
        ))
      ) : (
        <span className="text-slate-400">No cars to display</span>
      )}
    </div>
  );
};
