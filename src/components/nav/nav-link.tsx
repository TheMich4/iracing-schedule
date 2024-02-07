import Link from "next/link";
import { type NavItem } from "./types";
import { cn } from "@/lib/utils";

export const NavLink = ({ item }: { item: NavItem }) => {
  if (!item.href) {
    return null;
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center text-lg font-semibold text-muted-foreground hover:text-white sm:text-sm",
        item.disabled && "cursor-not-allowed opacity-80",
      )}
    >
      {item.title}
    </Link>
  );
};
