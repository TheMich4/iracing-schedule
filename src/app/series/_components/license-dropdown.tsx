import type { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import type { Filters } from "./types";
import { LicenseGroupNames } from "@/types/iracing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LicenseDropdownProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}

export const LicenseDropdown = ({
  filters,
  setFilters,
}: LicenseDropdownProps) => {
  const handleLicenseClick = (license: string) => {
    setFilters((prev) => ({
      ...prev,
      licenses: {
        ...prev.licenses,
        [license]: !prev.licenses[license],
      },
    }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "xs" }),
          "gap-1",
        )}
      >
        <ChevronDownIcon className="h-5 w-5" />
        Licenses
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {Object.values(LicenseGroupNames).map((license) => (
          <DropdownMenuCheckboxItem
            key={license}
            checked={filters.licenses[license]}
            onCheckedChange={() => handleLicenseClick(license)}
          >
            {license}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
