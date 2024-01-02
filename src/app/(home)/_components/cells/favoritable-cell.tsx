import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { type ReactNode } from "react";
import { useFavorite } from "../../_hooks/use-favorite";
import { FavoriteIcon } from "../icons/favorite-icon";

interface FavoritableCellProps {
  children: ReactNode;
  id: number;
  type: string;
}

export const FavoritableCell = ({
  children,
  type,
  id,
}: FavoritableCellProps) => {
  const { isFavorite, addFavorite } = useFavorite(type, id);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex flex-row items-center gap-2">
          {isFavorite && <FavoriteIcon />}
          {children}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={addFavorite}>Favorite</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
