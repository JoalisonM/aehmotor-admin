import { api } from "../lib/axios";
import { AddressProps, CreateAddressInput } from "./address";

export interface CollegeProps {
  id: number;
  nome: string;
  telefone: string;
  endereco: AddressProps;
}

export interface CreateCollegeInput {
  nome: string;
  telefone: string;
  endereco: CreateAddressInput;
}

export interface UpdateCollegeInput {
  id: number;
  nome: string;
  telefone: string;
  endereco: CreateAddressInput;
}

const uriCollege = "instituicoesDeEnsino"

export const College = {
  getAll() {
    return api.get(uriCollege);
  },

  get(id: number) {
    return api.get(`${uriCollege}/${id}`);
  },

  getByName(name: string) {
    return api.get<CollegeProps[]>(`${uriCollege}/${name}`);
  },

  create(college: CreateCollegeInput) {
    return api.post(`${uriCollege}`, college);
  },

  update(college: UpdateCollegeInput) {
    const { id, ...newCollege } = college;

    return api.put(`${uriCollege}/${id}`, newCollege);
  },

  delete(id: number) {
    return api.delete(`${uriCollege}/${id}`);
  }
};