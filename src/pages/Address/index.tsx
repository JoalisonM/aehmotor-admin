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
  NewStudentButton,
} from "./styles";
import { AddressModal } from "./AddressModal";
import { AddressProps } from "../../api/address";
import { Table } from "../../styles/components/table";
import { useAddresses } from "../../hooks/useAddresses";
import { SearchForm } from "../../components/SearchForm";

export const Address = () => {
  const [openToast, setOpenToast] = useState(false);
  const {
    addresses,
    getAddress,
    setAddress,
    deleteAddress,
    fetchAddresses,
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
    setOpenToast(true);
  };

  return (
    <Container>
      <Header>
        <h1>Endereço</h1>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewStudentButton
              onClick={() => handleShowAddress()}
            >
              Novo endereço
            </NewStudentButton>
          </Dialog.Trigger>

          <AddressModal />
        </Dialog.Root>
      </Header>
      <SearchForm placeholder="Buscar por endereços" />

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>IdPessoa</th>
            <th>IdCidade</th>
            <th>Cep</th>
            <th>Numero</th>
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
                    <button>
                      <PencilSimpleLine
                        size={16}
                        onClick={() => handleShowAddress(address.id)}
                      />
                    </button>
                  </Dialog.Trigger>

                  <AddressModal />
                </Dialog.Root>
              </td>
              <td>
                <Toast.Provider duration={3000}>
                  <button>
                    <TrashSimple
                      size={16}
                      onClick={() => handleDeleteAddress(address.id)}
                    />
                  </button>

                  <ToastRoot open={openToast} onOpenChange={setOpenToast}>
                    <ToastTitle>Endereço deletado com sucesso!</ToastTitle>
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