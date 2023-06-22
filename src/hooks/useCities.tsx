import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { City, CityProps } from "../api/city";

interface CitiesContextType {
  city: CityProps;
  cities: CityProps[];
  fetchCities: () => Promise<void>;
  getCityByName: (name: string) => Promise<CityProps | undefined>;
}

interface CitiesContextProviderProps {
  children: ReactNode;
}

export const CitiesContext = createContext({} as CitiesContextType);

export const CitiesContextProvider = ({ children }: CitiesContextProviderProps) => {
  const [cities, setCities] = useState<CityProps[]>([]);
  const [city, setCity] = useState<CityProps>({} as CityProps);

  const fetchCities = useCallback(async () => {
    const response = await City.getAll();

    setCities(response.data);
  }, []);

  const getCityByName = useCallback(
    async (name: string) => {
      const response = await City.getByName(name);

      if (response) {
        setCity(response.data);

        return response.data;
      }
    }, []
  );

  return (
    <CitiesContext.Provider
      value={{
        city,
        cities,
        fetchCities,
        getCityByName,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export const useCities = () => {
  const city = useContextSelector(CitiesContext, (context) => context.city);
  const cities = useContextSelector(CitiesContext, (context) => context.cities);
  const fetchCities = useContextSelector(CitiesContext, (context) => context.fetchCities);
  const getCityByName = useContextSelector(CitiesContext, (context) => context.getCityByName);

  return {
    city,
    cities,
    fetchCities,
    getCityByName,
  };
}