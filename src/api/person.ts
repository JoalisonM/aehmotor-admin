import { api } from "../lib/axios";

export interface PersonProps {
  id: number;
  nome: string;
  email: string;
  nascimento: string;
  telefone: string;
  senha: string;
  tipo: string;
}

export interface CreatePersonInput {
  nome: string;
  email: string;
  nascimento: string;
  telefone: string;
  senha: string;
}

export interface UpdatePersonInput {
  id: number;
  nome: string;
  email: string;
  nascimento: string;
  telefone: string;
  senha: string;
}

const uriPerson = "pessoas"

export const Person = {
  getAll() {
    return api.get(uriPerson);
  },

  get(id: number) {
    return api.get(`${uriPerson}/${id}`);
  },

  create(person: CreatePersonInput) {
    return api.post(`${uriPerson}`, person);
  },

  update(person: UpdatePersonInput) {
    const { id, ...newPerson } = person;

    return api.put(`${uriPerson}/${id}`, newPerson);
  },

  delete(id: number) {
    return api.delete(`${uriPerson}/${id}`);
  }
};