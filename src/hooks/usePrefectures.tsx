import { ReactNode, useCallback, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { CityHall, CityHallProps, CreateCityHallInput, UpdateCityHallInput } from "../api/cityHall";

interface PrefecturesContextType {
  cityHall: CityHallProps;
  prefectures: CityHallProps[];
  fetchPrefectures: () => Promise<void>;
  deleteCityHall: (id: number) => void;
  getCityHall: (id: number) => Promise<void>;
  setCityHall: (value: CityHallProps) => void;
  getCityHallByName: (name: string) => Promise<void>;
  createCityHall: (data: CreateCityHallInput) => Promise<void>;
  updateCityHall: (data: UpdateCityHallInput) => Promise<void>;
}

interface PrefecturesContextProviderProps {
  children: ReactNode;
}

export const PrefecturesContext = createContext({} as PrefecturesContextType);

export const PrefecturesContextProvider = ({ children }: PrefecturesContextProviderProps) => {
  const [prefectures, setPrefectures] = useState<CityHallProps[]>([]);
  const [cityHall, setCityHall] = useState<CityHallProps>({} as CityHallProps);

  const fetchPrefectures = useCallback(async () => {
    const response = await CityHall.getAll();

    setPrefectures(response.data);
  }, []);

  const getCityHall = useCallback(
    async (id: number) => {
      const response = await CityHall.get(id);

      if (response) {
        setCityHall(response.data);
      }
    }, []
  );

  const getCityHallByName = useCallback(
    async (name: string) => {
      const response = await CityHall.getByName(name);

      if (response) {
        setPrefectures(response.data);
      }
    }, []
  );

  const createCityHall = useCallback(
    async (data: CreateCityHallInput) => {
      const { nome, secretario, endereco } = data;

      const response = await CityHall.create(
        {
          nome,
          secretario,
          endereco,
        }
      );

      setPrefectures((state) => [response.data, ...state]);
    }, []
  );

  const updateCityHall = useCallback(
    async (data: UpdateCityHallInput) => {
      const { id, nome, secretario, endereco } = data;

      const response = await CityHall.update(
        {
          id,
          nome,
          secretario,
          endereco
        }
      );

      setPrefectures((state) => state.map((CityHall) => CityHall.id === id ? response.data : CityHall));
    }, []
  );

  const deleteCityHall = async (id: number) => {
    CityHall.delete(id);

    setPrefectures((state) => state.filter((CityHall) => CityHall.id !== id));
  }

  return (
    <PrefecturesContext.Provider
      value={{
        cityHall,
        prefectures,
        getCityHall,
        setCityHall,
        createCityHall,
        updateCityHall,
        deleteCityHall,
        fetchPrefectures,
        getCityHallByName,
      }}
    >
      {children}
    </PrefecturesContext.Provider>
  );
}

export const usePrefectures = () => {
  const cityHall = useContextSelector(PrefecturesContext, (context) => context.cityHall);
  const prefectures = useContextSelector(PrefecturesContext, (context) => context.prefectures);
  const getCityHall = useContextSelector(PrefecturesContext, (context) => context.getCityHall);
  const setCityHall = useContextSelector(PrefecturesContext, (context) => context.setCityHall);
  const fetchPrefectures = useContextSelector(PrefecturesContext, (context) => context.fetchPrefectures);
  const createCityHall = useContextSelector(PrefecturesContext, (context) => context.createCityHall);
  const updateCityHall = useContextSelector(PrefecturesContext, (context) => context.updateCityHall);
  const deleteCityHall = useContextSelector(PrefecturesContext, (context) => context.deleteCityHall);
  const getCityHallByName = useContextSelector(PrefecturesContext, (context) => context.getCityHallByName);

  return {
    cityHall,
    prefectures,
    setCityHall,
    getCityHall,
    createCityHall,
    updateCityHall,
    deleteCityHall,
    fetchPrefectures,
    getCityHallByName,
  };
}