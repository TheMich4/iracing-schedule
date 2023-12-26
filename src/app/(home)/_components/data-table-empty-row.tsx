import { TableCell, TableRow } from "@/components/ui/table";

import { type ColumnDef } from "@tanstack/react-table";
import { type ParsedSeasonsData } from "@/server/data/parse-seasons";
import { Loader2 } from "lucide-react";

interface DataTableEmptyRowProps {
  isFetching: boolean;
  columns: ColumnDef<ParsedSeasonsData>[];
}

export const DataTableEmptyRow = ({
  isFetching,
  columns,
}: DataTableEmptyRowProps) => {
  if (isFetching) {
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          <div className="flex flex-row justify-center gap-2 text-foreground">
            <Loader2 className="h-4 w-4 animate-spin self-center" />
            Loading schedule for selected week...
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
};
