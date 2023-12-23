import { type SeriesSeason } from "iracing-api";
import carClasses from "@/data/car-classes.json";
import { useMemo } from "react";

interface CarClassesCellProps {
  row: { original: SeriesSeason };
}

export const CarClassesCell = ({
  row: { original: season },
}: CarClassesCellProps) => {
  const classes = useMemo(() => {
    const fullClasses = season.carClassIds.map((id) =>
      carClasses.find((c) => c.carClassId === id),
    );
    return fullClasses.map((c) => c?.shortName).join(", ");
  }, [season.carClassIds]);

  return <div>{classes}</div>;
};
