"use client";

import { CalendarDays, Lock, User } from "lucide-react";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import type { SidebarButtonProps } from "./types";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

const iconMap = {
  "/": CalendarDays,
  "/profile": User,
  "/admin": Lock,
};

export const SidebarButton = ({
  label,
  expanded = true,
  pathname,
}: SidebarButtonProps) => {
  const currentPathname = usePathname();

  const isActive = useMemo(
    () => pathname === currentPathname,
    [pathname, currentPathname]
  );

  const Icon = useMemo(() => iconMap[pathname], [pathname]);

  return (
    <Link
      className="flex w-full items-center justify-start gap-2"
      href={pathname}
    >
      <Button
        className="flex w-full items-center justify-start gap-2"
        size="sm"
        variant={isActive ? "secondary" : "ghost"}
      >
        <Icon className="h-4 w-4" />
        {expanded && label}
      </Button>
    </Link>
  );
};
