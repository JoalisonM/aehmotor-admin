import * as Dialog from "@radix-ui/react-dialog";
import { TrashSimple, PencilSimpleLine } from "phosphor-react";

import { PersonModal } from "./PersonModal";
import { usePeople } from "../../hooks/usePeople";
import { dateFormatter } from "../../utils/formatter";
import { SearchForm } from "../../components/SearchForm";
import { Container, Header, NewPersonButton, PersonTable } from "./styles";

export const Person = () => {
  const { people } = usePeople();
  return (
    <Container>
      <Header>
        <h1>Pessoa</h1>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewPersonButton>Nova pessoa</NewPersonButton>
          </Dialog.Trigger>

          <PersonModal />
        </Dialog.Root>
      </Header>
      <SearchForm />

      <PersonTable>
        <thead>
          <tr>
            <th>Id</th>
            <th>IdEndereço</th>
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
              <td>{person.idEndereco}</td>
              <td>{person.nome}</td>
              <td>{person.email}</td>
              <td>{person.telefone}</td>
              <td>{person.tipo}</td>
              <td>{dateFormatter.format(new Date(person.nascimento))}</td>
              <td>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <PencilSimpleLine />
                  </Dialog.Trigger>

                  <PersonModal />
                </Dialog.Root>
              </td>
              <td><TrashSimple /></td>
            </tr>
          ))}
        </tbody>
      </PersonTable>
    </Container>
  );
};