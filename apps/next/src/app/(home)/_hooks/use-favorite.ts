import { useCallback, useContext, useMemo } from "react";
import { FavoriteContext } from "../_providers/favorite-provider";

export const useFavorite = (type: string, id: number) => {
  const context = useContext(FavoriteContext);

  const isFavorite = useMemo(
    () => context.favorites[type]?.some((fId) => fId === id) ?? false,
    [context, type, id],
  );

  const addFavorite = useCallback(() => {
    context.addFavorite(type, id);
  }, [context, type, id]);

  const removeFavorite = useCallback(() => {
    context.removeFavorite(type, id);
  }, [context, type, id]);

  return { addFavorite, isFavorite, removeFavorite };
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);

  return useMemo(() => context.favorites, [context]);
};
