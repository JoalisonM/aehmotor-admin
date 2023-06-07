import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { Uf, UfProps } from "../api/uf";

interface UfsContextType {
  ufs: UfProps[];
  fetchUfs: () => Promise<void>;
}

interface UfsContextProviderProps {
  children: ReactNode;
}

export const UfsContext = createContext({} as UfsContextType);

export const UfsContextProvider = ({ children }: UfsContextProviderProps) => {
  const [ufs, setUfs] = useState<UfProps[]>([]);

  const fetchUfs = useCallback(async () => {
    const response = await Uf.getAll();

    setUfs(response.data);
  }, []);

  // useEffect(() => {
  //   fetchUfs();
  // }, [fetchUfs]);

  return (
    <UfsContext.Provider
      value={{
        ufs,
        fetchUfs,
      }}
    >
      {children}
    </UfsContext.Provider>
  );
}

export const useUfs = () => {
  const ufs = useContextSelector(UfsContext, (context) => context.ufs);
  const fetchUfs = useContextSelector(UfsContext, (context) => context.fetchUfs);

  return {
    ufs,
    fetchUfs,
  };
}