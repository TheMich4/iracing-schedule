import type { Car } from "~/types";
import { cars } from "~/consts/cars";

const prepareCarData = (car: any): Car => {
  return {
    carName: car.carName,
    carNameAbbreviated: car.carNameAbbreviated,
  };
};

const importCars = () => {
  console.log("--- import cars start ---");

  const carsMap = cars.reduce((acc, car) => {
    acc[car.carId] = prepareCarData(car);

    return acc;
  }, {});

  localStorage.setItem("cars", JSON.stringify(carsMap));

  console.log("--- import cars end ---");
};

export default importCars;
