import { ReactNode, useCallback, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { Driver, DriverProps, CreateDriverInput, UpdateDriverInput } from "../api/driver";

interface DriversContextType {
  driver: DriverProps;
  drivers: DriverProps[];
  fetchDrivers: () => Promise<void>;
  deleteDriver: (id: number) => void;
  setDriver: (value: DriverProps) => void;
  getDriver: (id: number) => Promise<void>;
  createDriver: (data: CreateDriverInput) => Promise<void>;
  updateDriver: (data: UpdateDriverInput) => Promise<void>;
}

interface DriversContextProviderProps {
  children: ReactNode;
}

export const DriversContext = createContext({} as DriversContextType);

export const DriversContextProvider = ({ children }: DriversContextProviderProps) => {
  const [drivers, setDrivers] = useState<DriverProps[]>([]);
  const [driver, setDriver] = useState<DriverProps>({} as DriverProps);

  const fetchDrivers = useCallback(async () => {
    const response = await Driver.getAll();

    setDrivers(response.data);
  }, []);

  const getDriver = useCallback(
    async (id: number) => {
      const response = await Driver.get(id);

      if (response) {
        setDriver(response.data);
      }
    }, []
  );

  const createDriver = useCallback(
    async (data: CreateDriverInput) => {
      const { nome, email, nascimento, telefone, senha, cargo, id_veiculo } = data;

      const response = await Driver.create(
        {
          nome,
          email,
          nascimento,
          telefone,
          senha,
          cargo,
          id_veiculo
        }
      );

      setDrivers((state) => [response.data, ...state]);
    }, []
  );

  const updateDriver = useCallback(
    async (data: UpdateDriverInput) => {
      const { id, nome, email, nascimento, telefone, senha, cargo, id_veiculo } = data;

      const response = await Driver.update(
        {
          id,
          nome,
          email,
          nascimento,
          telefone,
          senha,
          cargo,
          id_veiculo,
        }
      );

      setDrivers((state) => state.map((Driver) => Driver.id === id ? response.data : Driver));
    }, []
  );

  const deleteDriver = async (id: number) => {
    Driver.delete(id);

    setDrivers((state) => state.filter((Driver) => Driver.id !== id));
  }

  return (
    <DriversContext.Provider
      value={{
        driver,
        drivers,
        getDriver,
        setDriver,
        fetchDrivers,
        createDriver,
        updateDriver,
        deleteDriver,
      }}
    >
      {children}
    </DriversContext.Provider>
  );
}

export const useDrivers = () => {
  const driver = useContextSelector(DriversContext, (context) => context.driver);
  const drivers = useContextSelector(DriversContext, (context) => context.drivers);
  const getDriver = useContextSelector(DriversContext, (context) => context.getDriver);
  const setDriver = useContextSelector(DriversContext, (context) => context.setDriver);
  const fetchDrivers = useContextSelector(DriversContext, (context) => context.fetchDrivers);
  const createDriver = useContextSelector(DriversContext, (context) => context.createDriver);
  const updateDriver = useContextSelector(DriversContext, (context) => context.updateDriver);
  const deleteDriver = useContextSelector(DriversContext, (context) => context.deleteDriver);

  return {
    driver,
    drivers,
    setDriver,
    getDriver,
    fetchDrivers,
    createDriver,
    updateDriver,
    deleteDriver,
  };
}