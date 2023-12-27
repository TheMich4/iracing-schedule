import { type Car as TCar } from "iracing-api";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WeekProps {
  car: TCar;
}

export const Car = ({ car }: WeekProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{car.carName}</CardTitle>
        {car.freeWithSubscription && (
          <CardDescription>
            <Badge>{"Free"}</Badge>
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
};
