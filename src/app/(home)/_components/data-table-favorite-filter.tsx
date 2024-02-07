import { Checkbox } from "@/components/ui/checkbox";
import { type ParsedData } from "@/server/data/parse-seasons";
import { type Table } from "@tanstack/react-table";
import { useCallback } from "react";
import { type GlobalFilter } from "../_types/table";

interface DataTableFavoriteFilterProps {
  table: Table<ParsedData>;
}

export const DataTableFavoriteFilter = ({
  table,
}: DataTableFavoriteFilterProps) => {
  const handleClick = useCallback(() => {
    table.setGlobalFilter((globalFilter: GlobalFilter) => ({
      ...globalFilter,
      favorite: {
        ...globalFilter.favorite,
        series: !globalFilter.favorite.series ?? true,
      },
    }));
  }, [table]);

  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms1" onClick={handleClick} />
      <label
        htmlFor="terms1"
        className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Favorites only
      </label>
    </div>
  );
};
