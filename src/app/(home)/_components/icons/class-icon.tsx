"use client";

import { LicenseGroupNames } from "@/types/iracing";
import { cn } from "@/lib/utils";
import { getLicenseColor } from "@/config/license";
import { useMemo } from "react";

interface ClassIconProps {
  licenseGroup: number;
}

export const ClassIcon = ({ licenseGroup }: ClassIconProps) => {
  const licenseColor = useMemo(
    () => getLicenseColor(licenseGroup),
    [licenseGroup],
  );

  return (
    <span
      className={cn(
        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm font-mono text-xs leading-[18px] text-white",
        `bg-${licenseColor}`,
      )}
    >
      {LicenseGroupNames[licenseGroup].charAt(0)}
    </span>
  );
};
