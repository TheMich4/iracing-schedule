import { LicenseColors } from "@/config/license";
import { LicenseGroupNames } from "@/types/iracing";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { type ParsedData } from "@/server/data/parse-seasons";

export const LicenseGroupCell = ({
  row,
}: {
  row: { original: ParsedData };
}) => {
  const licenseColor = useMemo(
    () => LicenseColors[row.original.licenseGroup],
    [row.original.licenseGroup],
  );

  return (
    <div className="ml-2 flex w-full">
      <span
        className={cn(
          "flex w-fit items-center justify-center rounded-sm px-1 text-center text-sm font-bold text-white",
          `bg-${licenseColor}`,
        )}
      >
        {LicenseGroupNames[row.original.licenseGroup]?.charAt(0)}
      </span>
    </div>
  );
};
