"use client";

import { CalendarDays, Lock, User } from "lucide-react";

import { Button } from "../../ui/button";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const Icon = useMemo(() => iconMap[pathname], [pathname]);

  return (
    <Button
      className="flex w-full flex-row items-center justify-start gap-2"
      onClick={() => void router.push(pathname)}
      size="sm"
      variant="ghost"
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Button>
  );
};
