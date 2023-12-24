import { CategoryIcon } from "../icons/category-icons";
import { useMemo } from "react";

interface CategoryCellProps {
  getValue: () => unknown;
}

export const CategoryCell = ({ getValue }: CategoryCellProps) => {
  const value = useMemo(() => getValue() as string, [getValue]);

  return (
    <div className="flex flex-row items-center">
      <CategoryIcon category={value} />
      {value}
    </div>
  );
};
