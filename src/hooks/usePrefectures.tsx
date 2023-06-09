import { ReactNode, useCallback, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { CityHall, CityHallProps, CreateCityHallInput, UpdateCityHallInput } from "../api/cityHall";

interface PrefecturesContextType {
  cityHall: CityHallProps;
  prefectures: CityHallProps[];
  fetchPrefectures: () => Promise<void>;
  deleteCityHall: (id: number) => void;
  setCityHall: (value: CityHallProps) => void;
  getCityHall: (id: number) => Promise<void>;
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

  const createCityHall = useCallback(
    async (data: CreateCityHallInput) => {
      const { secretario, id_endereco } = data;

      const response = await CityHall.create(
        {
          secretario,
          id_endereco,
        }
      );

      setPrefectures((state) => [response.data, ...state]);
    }, []
  );

  const updateCityHall = useCallback(
    async (data: UpdateCityHallInput) => {
      const { id, secretario, id_endereco } = data;

      const response = await CityHall.update(
        {
          id,
          secretario,
          id_endereco
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
        fetchPrefectures,
        createCityHall,
        updateCityHall,
        deleteCityHall,
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

  return {
    cityHall,
    prefectures,
    setCityHall,
    getCityHall,
    fetchPrefectures,
    createCityHall,
    updateCityHall,
    deleteCityHall,
  };
}