import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TrashSimple, PencilSimpleLine } from "phosphor-react";
import * as AlertDialogRadix from '@radix-ui/react-alert-dialog';

import { Container } from "./styles";
import {DriverModal } from "./DriverModal";
import { DriverProps } from "../../api/driver";
import { useDrivers } from "../../hooks/useDrivers";
import { Table } from "../../styles/components/table";
import { SearchForm } from "../../components/SearchForm";
import { AlertDialog } from "../../components/AlertDialog";
import { Button } from "../../styles/components/button";
import { Header } from "../../components/Header";

export const Driver = () => {
  const {
    drivers,
    setDriver,
    getDriver,
    fetchDrivers,
    deleteDriver,
    getDriverByName,
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
  };

  const handleSearchFilter = (name: string) => {
    getDriverByName(name);
  };

  return (
    <Container>
      <Header
        title="Motorista"
        buttonTitle="Novo motorista"
        onShowModal={handleShowDriver}
      >
        <DriverModal />
      </Header>
      <SearchForm
        onSearchAll={fetchDrivers}
        placeholder="Buscar por motoristas"
        onSearchFilter={handleSearchFilter}
      />

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Id Veículo</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
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
              <td>{driver.nascimento}</td>
              <td>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button
                      variant="icon"
                      onClick={() => handleShowDriver(driver.id)}
                    >
                      <PencilSimpleLine size={16} />
                    </Button>
                  </Dialog.Trigger>

                  <DriverModal />
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
                    id={driver.id}
                    onClickAction={handleDeleteDriver}
                    description="Essa ação não pode ser desfeita. Isso excluirá permanentemente o motorista."
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