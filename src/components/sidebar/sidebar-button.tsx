import { Button } from "@ui/button";
import type { SidebarButtonProps } from "./types";

const SidebarButton = ({
  label,
  expanded = true,
  Icon,
  onClick,
  isActive = false,
}: SidebarButtonProps) => {
  return (
    <Button
      className="flex w-full items-center justify-start gap-2"
      onClick={onClick}
      size="sm"
      variant={isActive ? "secondary" : "ghost"}
    >
      <Icon className="h-4 w-4" />
      {expanded && label}
    </Button>
  );
};

export default SidebarButton;
