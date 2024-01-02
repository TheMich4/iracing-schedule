import { type ReactNode, createContext, useState } from "react";

export type FavoriteData = Record<string, number[]>;

const DEFAULT_FAVORITES: FavoriteData = {
  series: [],
};

export const FavoriteContext = createContext({
  favorites: DEFAULT_FAVORITES,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addFavorite: (type: string, id: number) => {},
});

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setValue] = useState<FavoriteData>(DEFAULT_FAVORITES);

  const addFavorite = (type: string, id: number) => {
    console.log({ type, id, favorites });
    setValue((prev) => {
      return {
        ...prev,
        [type]: [...(prev[type] ?? []), id],
      };
    });
  };

  console.log({ favorites });

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
