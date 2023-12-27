import { type Car as TCar } from "iracing-api";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WeekProps {
  car: TCar;
}

export const Car = ({ car }: WeekProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{car.carName}</CardTitle>
        {/* <CardDescription>{`Week ${schedule.raceWeekNum + 1}`}</CardDescription> */}
      </CardHeader>
    </Card>
  );
};
