import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useCallback, type ReactNode } from "react";

interface FavoritableCellProps {
  children: ReactNode;
  id: string | number;
  type: string;
}

export const FavoritableCell = ({
  children,
  type,
  id,
}: FavoritableCellProps) => {
  return children;

  const handleFavorite = useCallback(() => {
    console.log("favorite", type, id);
  }, []);

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleFavorite}>Favorite</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
