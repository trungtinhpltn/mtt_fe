import { createContext, ReactNode, useContext } from "react";

interface GlobalProviderProps {
  children: ReactNode;
  globalData: {
    data: object;
  };
  locale: string;
}

interface IGlobalProviderContext {
  
}

export const GlobalContext = createContext({} as IGlobalProviderContext);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({
  children,
}: GlobalProviderProps) => {
  return (
    <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
