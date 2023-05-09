"use client";

import { CalendarDays, Lock, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import type { SidebarButtonProps } from "./types";
import { useMemo } from "react";

const iconMap = {
  "/": CalendarDays,
  "/profile": User,
  "/admin": Lock,
};

const SidebarButton = ({
  label,
  expanded = true,
  pathname,
}: SidebarButtonProps) => {
  const router = useRouter();
  const currentPathname = usePathname();

  const isActive = useMemo(
    () => pathname === currentPathname,
    [pathname, currentPathname]
  );

  const Icon = useMemo(() => iconMap[pathname], [pathname]);

  const handleClick = () => {
    router.push(pathname);
  };

  return (
    <Button
      className="flex w-full items-center justify-start gap-2"
      onClick={handleClick}
      size="sm"
      variant={isActive ? "secondary" : "ghost"}
    >
      <Icon className="h-4 w-4" />
      {expanded && label}
    </Button>
  );
};

export default SidebarButton;
