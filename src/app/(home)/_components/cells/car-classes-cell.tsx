import carClasses from "@/data/car-classes.json";
import { useMemo } from "react";
import { type ParsedSeasonsData } from "@/server/data/parse-seasons";

interface CarClassesCellProps {
  row: { original: ParsedSeasonsData };
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
