import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TrashSimple, PencilSimpleLine } from "phosphor-react";
import * as AlertDialogRadix from '@radix-ui/react-alert-dialog';

import { Container } from "./styles";
import { EmployeeModal } from "./EmployeeModal";
import { EmployeeProps } from "../../api/employee";
import { Table } from "../../styles/components/table";
import { useEmployees } from "../../hooks/useEmployees";
import { SearchForm } from "../../components/SearchForm";
import { AlertDialog } from "../../components/AlertDialog";
import { Button } from "../../styles/components/button";
import { Header } from "../../components/Header";

export const Employee = () => {
  const {
    employees,
    getEmployee,
    setEmployee,
    fetchEmployees,
    deleteEmployee,
    getEmployeeByName,
  } = useEmployees();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleShowEmployee = (id?: number) => {
    if (id) {
      getEmployee(id);
    } else {
      setEmployee({} as EmployeeProps);
    }
  };

  const handleDeleteEmployee = (id: number) => {
    deleteEmployee(id);
  };

  const handleSearchFilter = (name: string) => {
    getEmployeeByName(name);
  };

  return (
    <Container>
      <Header
        title="Funcionário"
        buttonTitle="Novo funcionário"
        onShowModal={handleShowEmployee}
      >
        <EmployeeModal />
      </Header>
      <SearchForm
        onSearchAll={fetchEmployees}
        placeholder="Buscar por funcionários"
        onSearchFilter={handleSearchFilter}
      />

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Cargo</th>
            <th>Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {employees && employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.nome}</td>
              <td>{employee.email}</td>
              <td>{employee.telefone}</td>
              <td>{employee.cargo}</td>
              <td>{employee.nascimento}</td>
              <td>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button
                      variant="icon"
                      onClick={() => handleShowEmployee(employee.id)}
                    >
                      <PencilSimpleLine size={16} />
                    </Button>
                  </Dialog.Trigger>

                  <EmployeeModal />
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
                    id={employee.id}
                    onClickAction={handleDeleteEmployee}
                    description="Essa ação não pode ser desfeita. Isso excluirá permanentemente o funcionário."
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