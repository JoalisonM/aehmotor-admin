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
  NewDriverButton,
} from "./styles";
import {DriverModal } from "./DriverModal";
import { DriverProps } from "../../api/driver";
import { useDrivers } from "../../hooks/useDrivers";
import { Table } from "../../styles/components/table";
import { SearchForm } from "../../components/SearchForm";

export const Driver = () => {
  const [openToast, setOpenToast] = useState(false);
  const {
    drivers,
    setDriver,
    getDriver,
    fetchDrivers,
    deleteDriver,
  } = useDrivers();

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const handleShowDriver = (id?: number) => {
    if (id) {
      getDriver(id);
    } else {
      setDriver({} as DriverProps);
    }
  };

  const handleDeleteDriver = (id: number) => {
    deleteDriver(id);
    setOpenToast(true);
  };

  return (
    <Container>
      <Header>
        <h1>Motorista</h1>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewDriverButton
              onClick={() => handleShowDriver()}
            >
              Novo motorista
            </NewDriverButton>
          </Dialog.Trigger>

          <DriverModal />
        </Dialog.Root>
      </Header>
      <SearchForm placeholder="Buscar por motoristas" />

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Id Veículo</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Cargo</th>
            <th>Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {drivers && drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.id_veiculo}</td>
              <td>{driver.nome}</td>
              <td>{driver.email}</td>
              <td>{driver.telefone}</td>
              <td>{driver.cargo}</td>
              <td>{driver.nascimento}</td>
              <td>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button onClick={() => handleShowDriver(driver.id)}>
                      <PencilSimpleLine size={16} />
                    </button>
                  </Dialog.Trigger>

                  <DriverModal />
                </Dialog.Root>
              </td>
              <td>
                <Toast.Provider duration={3000}>
                  <button onClick={() => handleDeleteDriver(driver.id)}>
                    <TrashSimple size={16} />
                  </button>

                  <ToastRoot open={openToast} onOpenChange={setOpenToast}>
                    <ToastTitle>Motorista deletada com sucesso!</ToastTitle>
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