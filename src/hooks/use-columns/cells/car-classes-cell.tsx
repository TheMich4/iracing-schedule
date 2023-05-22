import { Star } from "lucide-react";
import type { UserContent } from "next-auth";
import { cn } from "~/utils/cn";
import { useMemo } from "react";
import { useTheme } from "next-themes";

export const CarClassesCell = ({
  row: {
    original: { carClasses },
  },
  content,
}: {
  row: { original: { carClasses: Array<{ shortName: string }> } };
  content: UserContent | undefined;
}) => {
  const { theme } = useTheme();

  const includesOwnedCar = useMemo(() => {
    if (!content?.cars) return false;

    for (const carClass of carClasses) {
      for (const carPackageId of carClass.carPackageIds) {
        if (content.cars[carPackageId]?.owned) {
          return true;
        }
      }
    }

    return false;
  }, [carClasses, content]);

  const includesFavoriteCar = false;

  return (
    <div
      className={cn(
        includesOwnedCar &&
          "-m-2 w-full bg-green-100/40 p-2 dark:bg-green-900/40"
      )}
    >
      <div className="flex flex-row items-center">
        {includesFavoriteCar && (
          <Star
            className="mr-2 h-4 w-4"
            fill={theme === "dark" ? "#E1E7EF" : "#0F172A"}
          />
        )}
        {carClasses.map((carClass) => carClass?.shortName).join(", ")}
      </div>
    </div>
  );
};
