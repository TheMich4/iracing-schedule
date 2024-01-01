import { createContext } from "react";

export const FavoriteContext = createContext({});

export const FavoriteProvider = ({ children }) => {
  return (
    <FavoriteContext.Provider value={{}}>{children}</FavoriteContext.Provider>
  );
};
