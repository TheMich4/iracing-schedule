import { type Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import {
  categoryOptions,
  classOptions,
  multiClassOptions,
  officialOptions,
  setupOptions,
} from "../_data/filter-options";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableCalendar } from "./data-table-calendar";
import { type ParsedData } from "@/server/data/parse-seasons";
import { DataTableFavoriteFilter } from "./data-table-favorite-filter";

interface DataTableToolbarProps {
  table: Table<ParsedData[]>;
  updateWeekDate: (date: Date) => void;
}

export const DataTableToolbar = ({
  table,
  updateWeekDate,
}: DataTableToolbarProps) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col justify-center gap-1 lg:flex-row lg:justify-normal">
        <div className="flex flex-row gap-2">
          <Input
            placeholder="Filter series..."
            value={
              (table.getColumn("seriesName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("seriesName")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] sm:w-[250px]"
          />
          <Input
            placeholder="Filter tracks..."
            value={(table.getColumn("track")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("track")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] sm:w-[250px]"
          />
          <DataTableCalendar updateWeekDate={updateWeekDate} />
        </div>

        <div className="inline-block space-x-2 space-y-1 lg:space-y-0">
          {table.getColumn("class") && (
            <DataTableFacetedFilter
              column={table.getColumn("class")}
              title="Class"
              options={classOptions}
            />
          )}
          {table.getColumn("category") && (
            <DataTableFacetedFilter
              column={table.getColumn("category")}
              title="Category"
              options={categoryOptions}
            />
          )}
          {table.getColumn("multiClass") && (
            <DataTableFacetedFilter
              column={table.getColumn("multiClass")}
              title="Multi-Class"
              options={multiClassOptions}
            />
          )}
          {table.getColumn("official") && (
            <DataTableFacetedFilter
              column={table.getColumn("official")}
              title="Official"
              options={officialOptions}
            />
          )}
          {table.getColumn("fixed") && (
            <DataTableFacetedFilter
              column={table.getColumn("fixed")}
              title="Setup"
              options={setupOptions}
            />
          )}
          <DataTableFavoriteFilter table={table} />

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8  px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
};
