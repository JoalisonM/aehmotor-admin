import { useEffect, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { TrashSimple, PencilSimpleLine} from "phosphor-react";

import {
  Header,
  Container,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  NewStudentButton,
} from "./styles";
import { StudentModal } from "./StudentModal";
import { StudentProps } from "../../api/student";
import { useStudents } from "../../hooks/useStudent";
import { Table } from "../../styles/components/table";
import { SearchForm } from "../../components/SearchForm";

export const Student = () => {
  const [openToast, setOpenToast] = useState(false);
  const {
    students,
    getStudent,
    setStudent,
    fetchStudents,
    deleteStudent,
  } = useStudents();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleShowStudent = (id?: number) => {
    if (id) {
      getStudent(id);
    } else {
      setStudent({} as StudentProps);
    }
  };

  const handleDeleteStudent = (id: number) => {
    deleteStudent(id);
    setOpenToast(true);
  };

  return (
    <Container>
      <Header>
        <h1>Aluno</h1>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewStudentButton
              onClick={() => handleShowStudent()}
            >
              Novo aluno
            </NewStudentButton>
          </Dialog.Trigger>

          <StudentModal />
        </Dialog.Root>
      </Header>
      <SearchForm placeholder="Buscar por alunos" />

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>IdFaculdade</th>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>Curso</th>
            <th>Turno</th>
          </tr>
        </thead>
        <tbody>
          {students && students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.id_instituicao_ensino}</td>
              <td>{student.nome}</td>
              <td>{student.matricula}</td>
              <td>{student.curso}</td>
              <td>{student.turno}</td>
              <td>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button>
                      <PencilSimpleLine
                        size={16}
                        onClick={() => handleShowStudent(student.id)}
                      />
                    </button>
                  </Dialog.Trigger>

                  <StudentModal />
                </Dialog.Root>
              </td>
              <td>
                <Toast.Provider duration={3000}>
                  <button>
                    <TrashSimple
                      size={16}
                      onClick={() => handleDeleteStudent(student.id)}
                    />
                  </button>

                  <ToastRoot open={openToast} onOpenChange={setOpenToast}>
                    <ToastTitle>Aluno deletado com sucesso!</ToastTitle>
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