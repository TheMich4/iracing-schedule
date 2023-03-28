import type { SidebarButtonProps } from "./types";

const SidebarButton = ({
  children,
  expanded = true,
  Icon,
  onClick,
}: SidebarButtonProps) => {
  return (
    <button
      className="flex h-10 w-full cursor-pointer flex-row items-center gap-2 rounded-md p-2 text-start font-medium hover:bg-slate-800/40"
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      {expanded && children}
    </button>
  );
};

export default SidebarButton;
