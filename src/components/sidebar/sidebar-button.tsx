"use client";

import { useEffect, useState } from "react";
import type { SidebarButtonProps } from "./types";

const SidebarButton = ({
  children,
  expanded = true,
  Icon,
  onClick,
}: SidebarButtonProps) => {
  // TODO: Find better solution for hydration issue
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    setShowIcon(true);
  }, []);

  return (
    <button
      className="flex h-10 w-full cursor-pointer flex-row items-center gap-2 rounded-md p-2 text-start font-medium hover:bg-slate-300/40 dark:hover:bg-slate-800/40"
      onClick={onClick}
    >
      {showIcon && <Icon className="w-5-200 h-5 dark:text-slate-100" />}
      {expanded && children}
    </button>
  );
};

export default SidebarButton;
