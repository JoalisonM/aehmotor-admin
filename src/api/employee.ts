import { api } from "../lib/axios";

export interface EmployeeProps {
  id: number;
  nome: string;
  email: string;
  nascimento: string;
  telefone: string;
  senha: string;
  cargo: string;
}

export interface CreateEmployeeInput {
  nome: string;
  email: string;
  nascimento: string;
  telefone: string;
  senha: string;
  cargo: string;
}

export interface UpdateEmployeeInput {
  id: number;
  nome: string;
  email: string;
  nascimento: string;
  telefone: string;
  senha: string;
  cargo: string;
}

const uriEmployee = "funcionarios"

export const Employee = {
  getAll() {
    return api.get(uriEmployee);
  },

  get(id: number) {
    return api.get(`${uriEmployee}/${id}`);
  },

  getByName(name: string) {
    return api.get<EmployeeProps[]>(`${uriEmployee}/${name}`);
  },

  create(employee: CreateEmployeeInput) {
    return api.post(`${uriEmployee}`, employee);
  },

  update(employee: UpdateEmployeeInput) {
    const { id, ...newEmployee } = employee;

    return api.put(`${uriEmployee}/${id}`, newEmployee);
  },

  delete(id: number) {
    return api.delete(`${uriEmployee}/${id}`);
  }
};