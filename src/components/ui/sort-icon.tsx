import { ArrowDown, ArrowUp } from "lucide-react";

interface SortIconProps {
  isSorted: "asc" | "desc" | false | null | undefined;
}

export const SortIcon = ({ isSorted }: SortIconProps) => {
  if (!isSorted) return null;

  if (isSorted === "asc") return <ArrowUp className="h-4 w-4" />;

  if (isSorted === "desc") return <ArrowDown className="h-4 w-4" />;

  return null;
};
