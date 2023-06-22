import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TrashSimple, PencilSimpleLine } from "phosphor-react";
import * as AlertDialogRadix from '@radix-ui/react-alert-dialog';

import { Container } from "./styles";
import { AddressModal } from "./AddressModal";
import { AddressProps } from "../../api/address";
import { Table } from "../../styles/components/table";
import { useAddresses } from "../../hooks/useAddresses";
import { Button } from "../../styles/components/button";
import { SearchForm } from "../../components/SearchForm";
import { AlertDialog } from "../../components/AlertDialog";
import { Header } from "../../components/Header";

export const Address = () => {
  const {
    addresses,
    getAddress,
    setAddress,
    deleteAddress,
    fetchAddresses,
    getAddressByStreet,
  } = useAddresses();

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleShowAddress = (id?: number) => {
    if (id) {
      getAddress(id);
    } else {
      setAddress({} as AddressProps);
    }
  };

  const handleDeleteAddress = (id: number) => {
    deleteAddress(id);
  };

  const handleSearchFilter = (street: string) => {
    getAddressByStreet(street);
  };

  return (
    <Container>
      <Header
        title="Endereço"
        buttonTitle="Novo endereço"
        onShowModal={handleShowAddress}
      >
        <AddressModal />
      </Header>
      <SearchForm
        onSearchAll={fetchAddresses}
        placeholder="Buscar por endereços"
        onSearchFilter={handleSearchFilter}
      />

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>IdPessoa</th>
            <th>IdCidade</th>
            <th>Cep</th>
            <th>Número</th>
            <th>Logradouro</th>
          </tr>
        </thead>
        <tbody>
          {addresses && addresses.map((address) => (
            <tr key={address.id}>
              <td>{address.id}</td>
              <td>{address.id_pessoa}</td>
              <td>{address.id_cidade}</td>
              <td>{address.cep}</td>
              <td>{address.numero}</td>
              <td>{address.logradouro}</td>
              <td>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button variant="icon">
                      <PencilSimpleLine
                        size={16}
                        onClick={() => handleShowAddress(address.id)}
                      />
                    </Button>
                  </Dialog.Trigger>

                  <AddressModal />
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
                    id={address.id}
                    onClickAction={handleDeleteAddress}
                    description="Essa ação não pode ser desfeita. Isso excluirá permanentemente o seu endereço."
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