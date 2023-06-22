import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TrashSimple, PencilSimpleLine } from "phosphor-react";
import * as AlertDialogRadix from '@radix-ui/react-alert-dialog';

import { Container } from "./styles";
import { VehicleModal } from "./VehicleModal";
import { VehicleProps } from "../../api/vehicle";
import { Button } from "../../styles/components";
import { Header } from "../../components/Header";
import { useVehicles } from "../../hooks/useVehicles";
import { Table } from "../../styles/components/table";
import { SearchForm } from "../../components/SearchForm";
import { AlertDialog } from "../../components/AlertDialog";

export const Vehicle = () => {
  const {
    vehicles,
    setVehicle,
    getVehicle,
    fetchVehicles,
    deleteVehicle,
    getVehicleByName,
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
  };

  const handleSearchFilter = (licensePlate: string) => {
    getVehicleByName(licensePlate);
  };

  return (
    <Container>
      <Header
        title="Veículo"
        buttonTitle="Novo veículo"
        onShowModal={handleShowVehicle}
      >
        <VehicleModal />
      </Header>
      <SearchForm
        onSearchAll={fetchVehicles}
        placeholder="Buscar por endereços"
        onSearchFilter={handleSearchFilter}
      />

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
                    <Button variant="icon">
                      <PencilSimpleLine
                        size={16}
                        onClick={() => handleShowVehicle(vehicle.id)}
                      />
                    </Button>
                  </Dialog.Trigger>

                  <VehicleModal />
                </Dialog.Root>
              </td>
              <td>
                <AlertDialogRadix.Root>
                  <AlertDialogRadix.Trigger asChild>
                    <Button variant="icon" hover="danger">
                      <TrashSimple size={16} />
                    </Button>
                  </AlertDialogRadix.Trigger>
                  <AlertDialog
                    id={vehicle.id}
                    onClickAction={handleDeleteVehicle}
                    description="Essa ação não pode ser
                    desfeita. Isso excluirá permanentemente o veículo."
                  />
                </AlertDialogRadix.Root>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};