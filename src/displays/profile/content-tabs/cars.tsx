import { cars } from "~/consts/cars";
import { useMemo } from "react";

const CarsTab = ({ user }: any) => {
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

  console.log({ user, carNames });
  return (
    <div className="rounded-md border p-2">
      {carNames.sort().map((carName) => (
        <div>{carName}</div>
      ))}
    </div>
  );
};

export default CarsTab;
