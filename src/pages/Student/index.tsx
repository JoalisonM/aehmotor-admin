import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TrashSimple, PencilSimpleLine } from "phosphor-react";
import * as AlertDialogRadix from '@radix-ui/react-alert-dialog';

import { Container } from "./styles";
import { StudentModal } from "./StudentModal";
import { StudentProps } from "../../api/student";
import { useStudents } from "../../hooks/useStudent";
import { Table } from "../../styles/components/table";
import { SearchForm } from "../../components/SearchForm";
import { AlertDialog } from "../../components/AlertDialog";
import { Button } from "../../styles/components/button";
import { Header } from "../../components/Header";

export const Student = () => {
  const {
    students,
    getStudent,
    setStudent,
    fetchStudents,
    deleteStudent,
    getStudentByName,
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
  };

  const handleSearchFilter = (name: string) => {
    getStudentByName(name);
  };

  return (
    <Container>
      <Header
        title="Aluno"
        buttonTitle="Novo aluno"
        onShowModal={handleShowStudent}
      >
        <StudentModal />
      </Header>
      <SearchForm
        onSearchAll={fetchStudents}
        placeholder="Buscar por alunos"
        onSearchFilter={handleSearchFilter}
      />

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
                    <Button variant="icon">
                      <PencilSimpleLine
                        size={16}
                        onClick={() => handleShowStudent(student.id)}
                      />
                    </Button>
                  </Dialog.Trigger>

                  <StudentModal />
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
                    id={student.id}
                    onClickAction={handleDeleteStudent}
                    description="Essa ação não pode ser desfeita. Isso excluirá permanentemente o aluno."
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