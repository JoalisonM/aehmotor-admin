import { useEffect, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { TrashSimple, PencilSimpleLine } from "phosphor-react";

import {
  Header,
  Container,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  NewVehicleButton,
} from "./styles";
import { VehicleModal } from "./VehicleModal";
import { VehicleProps } from "../../api/vehicle";
import { useVehicles } from "../../hooks/useVehicles";
import { Table } from "../../styles/components/table";
import { SearchForm } from "../../components/SearchForm";

export const Vehicle = () => {
  const [openToast, setOpenToast] = useState(false);
  const {
    vehicles,
    setVehicle,
    getVehicle,
    fetchVehicles,
    deleteVehicle,
  } = useVehicles();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleShowVehicle = (id?: number) => {
    if (id) {
      getVehicle(id);
    } else {
      setVehicle({} as VehicleProps);
    }
  };

  const handleDeleteVehicle = (id: number) => {
    deleteVehicle(id);
    setOpenToast(true);
  };

  return (
    <Container>
      <Header>
        <h1>Veículo</h1>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewVehicleButton
              onClick={() => handleShowVehicle()}
            >
              Novo veículo
            </NewVehicleButton>
          </Dialog.Trigger>

          <VehicleModal />
        </Dialog.Root>
      </Header>
      <SearchForm placeholder="Buscar por endereços" />

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Placa</th>
            <th>Tipo do veículo</th>
            <th>Quantidade de passageiros</th>
          </tr>
        </thead>
        <tbody>
          {vehicles && vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.placa}</td>
              <td>{vehicle.tipo_veiculo}</td>
              <td>{vehicle.qtd_passageiros}</td>
              <td>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button>
                      <PencilSimpleLine
                        size={16}
                        onClick={() => handleShowVehicle(vehicle.id)}
                      />
                    </button>
                  </Dialog.Trigger>

                  <VehicleModal />
                </Dialog.Root>
              </td>
              <td>
                <Toast.Provider duration={3000}>
                  <button>
                    <TrashSimple
                      size={16}
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                    />
                  </button>

                  <ToastRoot open={openToast} onOpenChange={setOpenToast}>
                    <ToastTitle>Veículo deletada com sucesso!</ToastTitle>
                  </ToastRoot>
                  <ToastViewport />
                </Toast.Provider>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};