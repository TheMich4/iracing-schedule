import { type SeriesSeason } from "iracing-api";
import { type Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { LicenseGroup } from "@/types/iracing";

const classes = [
  {
    value: `${LicenseGroup.Rookie}`,
    label: "Rookie",
  },
  {
    value: `${LicenseGroup.D}`,
    label: "D",
  },
  {
    value: `${LicenseGroup.C}`,
    label: "C",
  },
  {
    value: `${LicenseGroup.B}`,
    label: "B",
  },
  {
    value: `${LicenseGroup.A}`,
    label: "A",
  },
  {
    value: `${LicenseGroup.Pro}`,
    label: "Pro",
  },
];

interface DataTableToolbarProps {
  table: Table<Array<SeriesSeason>>;
}

export const DataTableToolbar = ({ table }: DataTableToolbarProps) => {
  const isFiltered = false;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter series..."
          value={
            (table.getColumn("seriesName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("seriesName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("class") && (
          <DataTableFacetedFilter
            column={table.getColumn("class")}
            title="Class"
            options={classes}
          />
        )}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
};