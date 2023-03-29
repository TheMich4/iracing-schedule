import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";

interface SortIconProps {
  isSorted: "asc" | "desc" | false | null | undefined;
}

const SortIcon = ({ isSorted }: SortIconProps) => {
  if (!isSorted) return null;

  if (isSorted === "asc") return <ArrowUpCircleIcon className="h-4 w-4" />;

  if (isSorted === "desc") return <ArrowDownCircleIcon className="h-4 w-4" />;

  return null;
};

export default SortIcon;
