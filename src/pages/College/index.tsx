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
  NewCollegeButton,
} from "./styles";
import { CollegeModal } from "./CollegeModal";
import { CollegeProps } from "../../api/college";
import { useColleges } from "../../hooks/useColleges";
import { Table } from "../../styles/components/table";
import { SearchForm } from "../../components/SearchForm";

export const College = () => {
  const [openToast, setOpenToast] = useState(false);
  const {
    colleges,
    setCollege,
    getCollege,
    fetchColleges,
    deleteCollege,
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
    setOpenToast(true);
  };

  return (
    <Container>
      <Header>
        <h1>Instituição de Ensino</h1>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewCollegeButton
              onClick={() => handleShowCollege()}
            >
              Nova instituição
            </NewCollegeButton>
          </Dialog.Trigger>

          <CollegeModal />
        </Dialog.Root>
      </Header>
      <SearchForm placeholder="Buscar por endereços" />

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>idEndereço</th>
            <th>nome</th>
            <th>telefone</th>
          </tr>
        </thead>
        <tbody>
          {colleges && colleges.map((college) => (
            <tr key={college.id}>
              <td>{college.id}</td>
              <td>{college.id_endereco}</td>
              <td>{college.nome}</td>
              <td>{college.telefone}</td>
              <td>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button>
                      <PencilSimpleLine
                        size={16}
                        onClick={() => handleShowCollege(college.id)}
                      />
                    </button>
                  </Dialog.Trigger>

                  <CollegeModal />
                </Dialog.Root>
              </td>
              <td>
                <Toast.Provider duration={3000}>
                  <button>
                    <TrashSimple
                      size={16}
                      onClick={() => handleDeleteCollege(college.id)}
                    />
                  </button>

                  <ToastRoot open={openToast} onOpenChange={setOpenToast}>
                    <ToastTitle>
                      Instituição de Ensino deletada com sucesso!
                    </ToastTitle>
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