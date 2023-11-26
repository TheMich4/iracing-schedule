import { LicenseColors } from "@/config/license";
import { cn } from "@/lib/utils";
import { LicenseGroupNames, type Season } from "@/types/iracing";
import { useMemo } from "react";

export const LicenseGroupCell = ({ row }: { row: { original: Season } }) => {
  const licenseColor = useMemo(
    () => LicenseColors[row.original.license_group],
    [row.original.license_group],
  );

  return (
    <span
      className={cn(
        "flex w-fit items-center justify-center rounded-sm px-1 text-center text-sm font-bold",
        `bg-${licenseColor}`,
      )}
    >
      {LicenseGroupNames[row.original.license_group].charAt(0)}
    </span>
  );
};
