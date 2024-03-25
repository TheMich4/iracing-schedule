/* eslint-disable @typescript-eslint/no-empty-function */
import { type ReactNode, createContext, useState, useEffect } from "react";

export type FavoriteData = Record<string, number[]>;

const DEFAULT_FAVORITES: FavoriteData = {
  series: [],
};

export const FavoriteContext = createContext({
  favorites: DEFAULT_FAVORITES,
  addFavorite: (_type: string, _id: number) => {},
  removeFavorite: (_type: string, _id: number) => {},
});

const getFavorites = () => {
  const data = localStorage.getItem("favorites");
  if (data) {
    return JSON.parse(data) as FavoriteData;
  }
  return DEFAULT_FAVORITES;
};

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setValue] = useState<FavoriteData>(getFavorites());

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (type: string, id: number) => {
    setValue((prev) => {
      return {
        ...prev,
        [type]: [...(prev[type] ?? []), id],
      };
    });
  };

  const removeFavorite = (type: string, id: number) => {
    setValue((prev) => {
      return {
        ...prev,
        [type]: (prev[type] ?? []).filter((i) => i !== id),
      };
    });
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
