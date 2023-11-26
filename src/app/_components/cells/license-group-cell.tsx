import { LicenseColors } from "@/config/license";
import { LicenseGroupNames } from "@/types/iracing";
import type { Season } from "iracing-api";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export const LicenseGroupCell = ({ row }: { row: { original: Season } }) => {
  const licenseColor = useMemo(
    () => LicenseColors[row.original.licenseGroup],
    [row.original.licenseGroup],
  );

  return (
    <span
      className={cn(
        "flex w-fit items-center justify-center rounded-sm px-1 text-center text-sm font-bold",
        `bg-${licenseColor}`,
      )}
    >
      {LicenseGroupNames[row.original.licenseGroup].charAt(0)}
    </span>
  );
};
