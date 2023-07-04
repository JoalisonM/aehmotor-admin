import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { Route, RouteProps, CreateRouteInput, UpdateRouteInput } from "../api/route";

interface CitiesRoutesContextType {
  citiesRoute: RouteProps;
  citiesRoutes: RouteProps[];
  fetchCitiesRoutes: () => Promise<void>;
  deleteCitiesRoute: (id: number) => void;
  setCitiesRoute: (value: RouteProps) => void;
  getCitiesRoute: (id: number) => Promise<void>;
  createCitiesRoute: (data: CreateRouteInput) => Promise<void>;
  updateCitiesRoute: (data: UpdateRouteInput) => Promise<void>;
  getCitiesRouteByDestinationCity: (value: string) => Promise<void>;
}

interface CitiesRoutesContextProviderProps {
  children: ReactNode;
}

export const CitiesRoutesContext = createContext({} as CitiesRoutesContextType);

export const CitiesRoutesContextProvider = ({ children }: CitiesRoutesContextProviderProps) => {
  const [citiesRoutes, setCitiesRoutes] = useState<RouteProps[]>([]);
  const [citiesRoute, setCitiesRoute] = useState<RouteProps>({} as RouteProps);

  const fetchCitiesRoutes = useCallback(async () => {
    const response = await Route.getAll();

    setCitiesRoutes(response.data);
  }, []);

  const getCitiesRoute = useCallback(
    async (id: number) => {
      const response = await Route.get(id);

      if (response) {
        setCitiesRoute(response.data);
      }
    }, []
  );

  const getCitiesRouteByDestinationCity = useCallback(
    async (destinationCity: string) => {
      const response = await Route.getByDestinationCity(destinationCity);

      if (response) {
        setCitiesRoutes(response.data);
      }
    }, []
  );

  const createCitiesRoute = useCallback(
    async (data: CreateRouteInput) => {
      const { id_veiculo, id_motorista, id_prefeitura, instituicoes_ensino,
        cidade_origem, cidade_destino, horario_chegada, horario_saida, qtd_alunos} = data;

      const response = await Route.create(
        {
          id_veiculo,
          id_motorista,
          id_prefeitura,
          instituicoes_ensino,
          qtd_alunos,
          cidade_origem,
          cidade_destino,
          horario_saida,
          horario_chegada,
        }
      );

      setCitiesRoutes((state) => [response.data, ...state]);
    }, []
  );

  const updateCitiesRoute = useCallback(
    async (data: UpdateRouteInput) => {
      const { id, id_veiculo, id_motorista, id_prefeitura, instituicoes_ensino,
        cidade_origem, cidade_destino, horario_chegada, horario_saida, qtd_alunos } = data;

      const response = await Route.update(
        {
          id,
          id_veiculo,
          id_motorista,
          id_prefeitura,
          instituicoes_ensino,
          qtd_alunos,
          cidade_origem,
          cidade_destino,
          horario_saida,
          horario_chegada,
        }
      );

      setCitiesRoutes((state) => state.map((CitiesRoute) => CitiesRoute.id === id ? response.data : CitiesRoute));
    }, []
  );

  const deleteCitiesRoute = async (id: number) => {
    Route.delete(id);

    setCitiesRoutes((state) => state.filter((CitiesRoute) => CitiesRoute.id !== id));
  }

  return (
    <CitiesRoutesContext.Provider
      value={{
        citiesRoute,
        citiesRoutes,
        setCitiesRoute,
        getCitiesRoute,
        createCitiesRoute,
        updateCitiesRoute,
        deleteCitiesRoute,
        fetchCitiesRoutes,
        getCitiesRouteByDestinationCity,
      }}
    >
      {children}
    </CitiesRoutesContext.Provider>
  );
}

export const useCitiesRoutes = () => {
  const citiesRoute = useContextSelector(CitiesRoutesContext, (context) => context.citiesRoute);
  const citiesRoutes = useContextSelector(CitiesRoutesContext, (context) => context.citiesRoutes);
  const fetchCitiesRoutes = useContextSelector(CitiesRoutesContext, (context) => context.fetchCitiesRoutes);
  const getCitiesRoute = useContextSelector(CitiesRoutesContext, (context) => context.getCitiesRoute);
  const setCitiesRoute = useContextSelector(CitiesRoutesContext, (context) => context.setCitiesRoute);
  const createCitiesRoute = useContextSelector(CitiesRoutesContext, (context) => context.createCitiesRoute);
  const updateCitiesRoute = useContextSelector(CitiesRoutesContext, (context) => context.updateCitiesRoute);
  const deleteCitiesRoute = useContextSelector(CitiesRoutesContext, (context) => context.deleteCitiesRoute);
  const getCitiesRouteByDestinationCity = useContextSelector(CitiesRoutesContext, (context) => context.getCitiesRouteByDestinationCity);


  return {
    citiesRoute,
    citiesRoutes,
    getCitiesRoute,
    setCitiesRoute,
    fetchCitiesRoutes,
    createCitiesRoute,
    updateCitiesRoute,
    deleteCitiesRoute,
    getCitiesRouteByDestinationCity,
  };
}