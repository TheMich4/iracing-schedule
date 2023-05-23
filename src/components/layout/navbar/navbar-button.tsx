"use client";

import { CalendarDays, Lock, User } from "lucide-react";

import { Button } from "../../ui/button";
import Link from "next/link";
import { useMemo } from "react";

const iconMap = {
  "/": CalendarDays,
  "/profile": User,
  "/admin": Lock,
};

interface NavbarButtonProps {
  label: string;
  pathname: string;
}

export const NavbarButton = ({ label, pathname }: NavbarButtonProps) => {
  const Icon = useMemo(() => iconMap[pathname], [pathname]);

  return (
    <Link href={pathname}>
      <Button
        className="flex w-full flex-row items-center justify-start gap-2"
        size="sm"
        variant="ghost"
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </Button>
    </Link>
  );
};
