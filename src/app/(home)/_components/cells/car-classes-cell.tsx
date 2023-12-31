import carClasses from "@/data/car-classes.json";
import { useMemo } from "react";
import { type ParsedData } from "@/server/data/parse-seasons";
import { FreeIcon } from "../icons/free-icon";

interface CarClassesCellProps {
  row: { original: ParsedData };
}

export const CarClassesCell = ({
  row: { original: season },
}: CarClassesCellProps) => {
  const { classes, hasFreeCar } = useMemo(() => {
    const fullClasses = season.carClassIds.map((id) => carClasses[id]);
    return {
      classes: fullClasses.map((c) => c?.shortName).join(", "),
      hasFreeCar: season.hasFreeCar,
    };
  }, [season.carClassIds]);
  return (
    <div className="flex flex-row gap-2">
      {hasFreeCar && <FreeIcon />}
      {classes}
    </div>
  );
};
