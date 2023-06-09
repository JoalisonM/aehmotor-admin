import { api } from "../lib/axios";

export interface DriverProps {
  id: number;
  nome: string;
  email: string;
  nascimento: string;
  telefone: string;
  senha: string;
  cargo: string;
  id_veiculo: number;
}

export interface CreateDriverInput {
  nome: string;
  email: string;
  nascimento: string;
  telefone: string;
  senha: string;
  cargo: string;
  id_veiculo: number;
}

export interface UpdateDriverInput {
  id: number;
  nome: string;
  email: string;
  nascimento: string;
  telefone: string;
  senha: string;
  cargo: string;
  id_veiculo: number;
}

const uriDriver = "motoristas"

export const Driver = {
  getAll() {
    return api.get(uriDriver);
  },

  get(id: number) {
    return api.get(`${uriDriver}/${id}`);
  },

  create(driver: CreateDriverInput) {
    return api.post(`${uriDriver}`, driver);
  },

  update(driver: UpdateDriverInput) {
    const { id, ...newDriver } = driver;

    return api.put(`${uriDriver}/${id}`, newDriver);
  },

  delete(id: number) {
    return api.delete(`${uriDriver}/${id}`);
  }
};