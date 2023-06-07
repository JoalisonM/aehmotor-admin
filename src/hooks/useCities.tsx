import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { City, CityProps } from "../api/city";

interface CitiesContextType {
  cities: CityProps[];
  fetchCities: () => Promise<void>;
}

interface CitiesContextProviderProps {
  children: ReactNode;
}

export const CitiesContext = createContext({} as CitiesContextType);

export const CitiesContextProvider = ({ children }: CitiesContextProviderProps) => {
  const [cities, setCities] = useState<CityProps[]>([]);

  const fetchCities = useCallback(async () => {
    const response = await City.getAll();

    setCities(response.data);
  }, []);

  // useEffect(() => {
  //   fetchCities();
  // }, [fetchCities]);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        fetchCities,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export const useCities = () => {
  const cities = useContextSelector(CitiesContext, (context) => context.cities);
  const fetchCities = useContextSelector(CitiesContext, (context) => context.fetchCities);

  return {
    cities,
    fetchCities,
  };
}