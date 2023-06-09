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
  NewPersonButton,
} from "./styles";
import { PersonModal } from "./PersonModal";
import { PersonProps } from "../../api/person";
import { usePeople } from "../../hooks/usePeople";
import { Table } from "../../styles/components/table";
import { SearchForm } from "../../components/SearchForm";

export const Person = () => {
  const [openToast, setOpenToast] = useState(false);
  const {
    people,
    getPerson,
    setPerson,
    fetchPeople,
    deletePerson,
  } = usePeople();

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  const handleShowPerson = (id?: number) => {
    if (id) {
      getPerson(id);
    } else {
      setPerson({} as PersonProps);
    }
  };

  const handleDeletePerson = (id: number) => {
    deletePerson(id);
    setOpenToast(true);
  };

  return (
    <Container>
      <Header>
        <h1>Pessoa</h1>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewPersonButton
              onClick={() => handleShowPerson()}
            >
              Nova pessoa
            </NewPersonButton>
          </Dialog.Trigger>

          <PersonModal />
        </Dialog.Root>
      </Header>
      <SearchForm placeholder="Buscar por pessoas" />

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Tipo</th>
            <th>Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {people && people.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.nome}</td>
              <td>{person.email}</td>
              <td>{person.telefone}</td>
              <td>{person.tipo}</td>
              <td>{person.nascimento}</td>
              <td>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button onClick={() => handleShowPerson(person.id)}>
                      <PencilSimpleLine size={16} />
                    </button>
                  </Dialog.Trigger>

                  <PersonModal />
                </Dialog.Root>
              </td>
              <td>
                <Toast.Provider duration={3000}>
                  <button onClick={() => handleDeletePerson(person.id)}>
                    <TrashSimple size={16} />
                  </button>

                  <ToastRoot open={openToast} onOpenChange={setOpenToast}>
                    <ToastTitle>Pessoa deletada com sucesso!</ToastTitle>
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