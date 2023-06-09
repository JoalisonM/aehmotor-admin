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
  NewEmployeeButton,
} from "./styles";
import { EmployeeModal } from "./EmployeeModal";
import { EmployeeProps } from "../../api/employee";
import { Table } from "../../styles/components/table";
import { useEmployees } from "../../hooks/useEmployees";
import { SearchForm } from "../../components/SearchForm";

export const Employee = () => {
  const [openToast, setOpenToast] = useState(false);
  const {
    employees,
    getEmployee,
    setEmployee,
    fetchEmployees,
    deleteEmployee,
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
    setOpenToast(true);
  };

  return (
    <Container>
      <Header>
        <h1>Funcionário</h1>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewEmployeeButton
              onClick={() => handleShowEmployee()}
            >
              Novo funcionário
            </NewEmployeeButton>
          </Dialog.Trigger>

          <EmployeeModal />
        </Dialog.Root>
      </Header>
      <SearchForm placeholder="Buscar por funcionários" />

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
                    <button onClick={() => handleShowEmployee(employee.id)}>
                      <PencilSimpleLine size={16} />
                    </button>
                  </Dialog.Trigger>

                  <EmployeeModal />
                </Dialog.Root>
              </td>
              <td>
                <Toast.Provider duration={3000}>
                  <button onClick={() => handleDeleteEmployee(employee.id)}>
                    <TrashSimple size={16} />
                  </button>

                  <ToastRoot open={openToast} onOpenChange={setOpenToast}>
                    <ToastTitle>Funcionário deletada com sucesso!</ToastTitle>
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