import type { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import type { Filters } from "./types";
import { buttonVariants } from "@/components/ui/button";
import { categories } from "@/data/iracing-consts";
import { cn } from "@/lib/utils";

interface CategoryDropdownProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}

export const CategoryDropdown = ({
  filters,
  setFilters,
}: CategoryDropdownProps) => {
  const handleCategoryClick = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category],
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
        Categories
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {categories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category}
            checked={filters.categories[category]}
            onCheckedChange={() => handleCategoryClick(category)}
          >
            {category}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
