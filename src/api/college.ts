import { api } from "../lib/axios";

export interface CollegeProps {
  id: number;
  id_endereco: number;
  nome: string;
  telefone: string;
}

export interface CreateCollegeInput {
  id_endereco: number;
  nome: string;
  telefone: string;
}

export interface UpdateCollegeInput {
  id: number;
  id_endereco: number;
  nome: string;
  telefone: string;
}

const uriCollege = "instituicoesDeEnsino"

export const College = {
  getAll() {
    return api.get(uriCollege);
  },

  get(id: number) {
    return api.get(`${uriCollege}/${id}`);
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