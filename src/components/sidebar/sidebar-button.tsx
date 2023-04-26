"use client";

import { useEffect, useState } from "react";
import type { SidebarButtonProps } from "./types";
import Button from "../ui/button";
import cn from "~/utils/cn";

const SidebarButton = ({
  label,
  expanded = true,
  Icon,
  onClick,
  isActive,
}: SidebarButtonProps) => {
  // TODO: Find better solution for hydration issue
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    setShowIcon(true);
  }, []);

  return (
    <Button
      className="flex w-full items-center justify-start gap-2"
      onClick={onClick}
      size="sm"
      variant={isActive ? "secondary" : "ghost"}
    >
      {showIcon && <Icon className="h-4 w-4" />}
      {expanded && label}
    </Button>
  );
};

export default SidebarButton;
