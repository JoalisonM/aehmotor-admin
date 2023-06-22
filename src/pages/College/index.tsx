import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TrashSimple, PencilSimpleLine } from "phosphor-react";
import * as AlertDialogRadix from '@radix-ui/react-alert-dialog';

import { Container } from "./styles";
import { CollegeModal } from "./CollegeModal";
import { CollegeProps } from "../../api/college";
import { useColleges } from "../../hooks/useColleges";
import { Table } from "../../styles/components/table";
import { SearchForm } from "../../components/SearchForm";
import { AlertDialog } from "../../components/AlertDialog";
import { Button } from "../../styles/components/button";
import { Header } from "../../components/Header";

export const College = () => {
  const {
    colleges,
    setCollege,
    getCollege,
    fetchColleges,
    deleteCollege,
    getCollegeByName,
  } = useColleges();

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  const handleShowCollege = (id?: number) => {
    if (id) {
      getCollege(id);
    } else {
      setCollege({} as CollegeProps);
    }
  };

  const handleDeleteCollege = (id: number) => {
    deleteCollege(id);
  };

  const handleSearchFilter = (name: string) => {
    getCollegeByName(name);
  };

  return (
    <Container>
      <Header
        title="Faculdade"
        buttonTitle="Nova faculdade"
        onShowModal={handleShowCollege}
      >
        <CollegeModal />
      </Header>
      <SearchForm
        onSearchAll={fetchColleges}
        placeholder="Buscar por endereços"
        onSearchFilter={handleSearchFilter}
      />

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {colleges && colleges.map((college) => (
            <tr key={college.id}>
              <td>{college.id}</td>
              <td>{college.nome}</td>
              <td>{college.telefone}</td>
              <td>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button variant="icon">
                      <PencilSimpleLine
                        size={16}
                        onClick={() => handleShowCollege(college.id)}
                      />
                    </Button>
                  </Dialog.Trigger>

                  <CollegeModal />
                </Dialog.Root>
              </td>
              <td>
                <AlertDialogRadix.Root>
                  <AlertDialogRadix.Trigger asChild>
                    <Button variant="icon">
                      <TrashSimple size={16} />
                    </Button>
                  </AlertDialogRadix.Trigger>
                  <AlertDialog
                    id={college.id}
                    onClickAction={handleDeleteCollege}
                    description="Essa ação não pode ser desfeita. Isso excluirá permanentemente a instituição de ensino."
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