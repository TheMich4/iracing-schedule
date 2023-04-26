import type { SidebarButtonProps } from "./types";

const SidebarButton = ({
  children,
  expanded = true,
  Icon,
  onClick,
}: SidebarButtonProps) => {
  return (
    <button
      className="flex h-10 w-full cursor-pointer flex-row items-center gap-2 rounded-md p-2 text-start font-medium hover:bg-slate-800/40 "
      onClick={onClick}
    >
      <Icon className="w-5-200 h-5 dark:text-slate-100" />
      {expanded && children}
    </button>
  );
};

export default SidebarButton;
