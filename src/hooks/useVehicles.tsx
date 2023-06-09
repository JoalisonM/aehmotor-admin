import { ReactNode, useCallback, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { Vehicle, VehicleProps, CreateVehicleInput, UpdateVehicleInput } from "../api/vehicle";

interface VehiclesContextType {
  vehicle: VehicleProps;
  vehicles: VehicleProps[];
  fetchVehicles: () => Promise<void>;
  deleteVehicle: (id: number) => void;
  setVehicle: (value: VehicleProps) => void;
  getVehicle: (id: number) => Promise<void>;
  createVehicle: (data: CreateVehicleInput) => Promise<void>;
  updateVehicle: (data: UpdateVehicleInput) => Promise<void>;
}

interface VehiclesContextProviderProps {
  children: ReactNode;
}

export const VehiclesContext = createContext({} as VehiclesContextType);

export const VehiclesContextProvider = ({ children }: VehiclesContextProviderProps) => {
  const [vehicles, setVehicles] = useState<VehicleProps[]>([]);
  const [vehicle, setVehicle] = useState<VehicleProps>({} as VehicleProps);

  const fetchVehicles = useCallback(async () => {
    const response = await Vehicle.getAll();

    setVehicles(response.data);
  }, []);

  const getVehicle = useCallback(
    async (id: number) => {
      const response = await Vehicle.get(id);

      if (response) {
        setVehicle(response.data);
      }
    }, []
  );

  const createVehicle = useCallback(
    async (data: CreateVehicleInput) => {
      const { cidade, qtd_passageiros, tipo_veiculo, placa } = data;

      const response = await Vehicle.create(
        {
          cidade,
          qtd_passageiros,
          tipo_veiculo,
          placa,
        }
      );

      setVehicles((state) => [response.data, ...state]);
    }, []
  );

  const updateVehicle = useCallback(
    async (data: UpdateVehicleInput) => {
      const { id, cidade, qtd_passageiros, tipo_veiculo, placa } = data;

      const response = await Vehicle.update(
        {
          id,
          cidade,
          qtd_passageiros,
          tipo_veiculo,
          placa,
        }
      );

      setVehicles((state) => state.map((Vehicle) => Vehicle.id === id ? response.data : Vehicle));
    }, []
  );

  const deleteVehicle = async (id: number) => {
    Vehicle.delete(id);

    setVehicles((state) => state.filter((Vehicle) => Vehicle.id !== id));
  }

  return (
    <VehiclesContext.Provider
      value={{
        vehicle,
        vehicles,
        getVehicle,
        setVehicle,
        fetchVehicles,
        createVehicle,
        updateVehicle,
        deleteVehicle,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
}

export const useVehicles = () => {
  const vehicle = useContextSelector(VehiclesContext, (context) => context.vehicle);
  const vehicles = useContextSelector(VehiclesContext, (context) => context.vehicles);
  const getVehicle = useContextSelector(VehiclesContext, (context) => context.getVehicle);
  const setVehicle = useContextSelector(VehiclesContext, (context) => context.setVehicle);
  const fetchVehicles = useContextSelector(VehiclesContext, (context) => context.fetchVehicles);
  const createVehicle = useContextSelector(VehiclesContext, (context) => context.createVehicle);
  const updateVehicle = useContextSelector(VehiclesContext, (context) => context.updateVehicle);
  const deleteVehicle = useContextSelector(VehiclesContext, (context) => context.deleteVehicle);

  return {
    vehicle,
    vehicles,
    setVehicle,
    getVehicle,
    fetchVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  };
}