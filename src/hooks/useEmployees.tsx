import { ReactNode, useCallback, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { Employee, EmployeeProps, CreateEmployeeInput, UpdateEmployeeInput } from "../api/employee";

interface EmployeesContextType {
  employee: EmployeeProps;
  employees: EmployeeProps[];
  fetchEmployees: () => Promise<void>;
  deleteEmployee: (id: number) => void;
  setEmployee: (value: EmployeeProps) => void;
  getEmployee: (id: number) => Promise<void>;
  getEmployeeByName: (name: string) => Promise<void>;
  createEmployee: (data: CreateEmployeeInput) => Promise<void>;
  updateEmployee: (data: UpdateEmployeeInput) => Promise<void>;
}

interface EmployeesContextProviderProps {
  children: ReactNode;
}

export const EmployeesContext = createContext({} as EmployeesContextType);

export const EmployeesContextProvider = ({ children }: EmployeesContextProviderProps) => {
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);
  const [employee, setEmployee] = useState<EmployeeProps>({} as EmployeeProps);

  const fetchEmployees = useCallback(async () => {
    const response = await Employee.getAll();

    setEmployees(response.data);
  }, []);

  const getEmployee = useCallback(
    async (id: number) => {
      const response = await Employee.get(id);

      if (response) {
        setEmployee(response.data);
      }
    }, []
  );

  const getEmployeeByName = useCallback(
    async (name: string) => {
      const response = await Employee.getByName(name);

      if (response) {
        setEmployees(response.data);
      }
    }, []
  );

  const createEmployee = useCallback(
    async (data: CreateEmployeeInput) => {
      const { nome, email, nascimento, telefone, senha, cargo } = data;

      const response = await Employee.create(
        {
          nome,
          email,
          nascimento,
          telefone,
          senha,
          cargo,
        }
      );

      setEmployees((state) => [response.data, ...state]);
    }, []
  );

  const updateEmployee = useCallback(
    async (data: UpdateEmployeeInput) => {
      const { id, nome, email, nascimento, telefone, senha, cargo } = data;

      const response = await Employee.update(
        {
          id,
          nome,
          email,
          nascimento,
          telefone,
          senha,
          cargo,
        }
      );

      setEmployees((state) => state.map((Employee) => Employee.id === id ? response.data : Employee));
    }, []
  );

  const deleteEmployee = async (id: number) => {
    Employee.delete(id);

    setEmployees((state) => state.filter((Employee) => Employee.id !== id));
  }

  return (
    <EmployeesContext.Provider
      value={{
        employee,
        employees,
        getEmployee,
        setEmployee,
        fetchEmployees,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeByName,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
}

export const useEmployees = () => {
  const employee = useContextSelector(EmployeesContext, (context) => context.employee);
  const employees = useContextSelector(EmployeesContext, (context) => context.employees);
  const getEmployee = useContextSelector(EmployeesContext, (context) => context.getEmployee);
  const setEmployee = useContextSelector(EmployeesContext, (context) => context.setEmployee);
  const fetchEmployees = useContextSelector(EmployeesContext, (context) => context.fetchEmployees);
  const createEmployee = useContextSelector(EmployeesContext, (context) => context.createEmployee);
  const updateEmployee = useContextSelector(EmployeesContext, (context) => context.updateEmployee);
  const deleteEmployee = useContextSelector(EmployeesContext, (context) => context.deleteEmployee);
  const getEmployeeByName = useContextSelector(EmployeesContext, (context) => context.getEmployeeByName);

  return {
    employee,
    employees,
    setEmployee,
    getEmployee,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeByName,
  };
}