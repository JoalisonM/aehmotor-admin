import { api } from "../lib/axios";

export interface StudentProps {
  id: number;
  id_instituicao_ensino: number;
  nome: string;
  email: string;
  nascimento: string;
  telefone: string;
  senha: string;
  curso: string;
  matricula: string;
  turno: string;
}

export interface CreateStudentInput {
  nome: string;
  email: string;
  nascimento: string;
  telefone: string;
  senha: string;
  id_instituicao_ensino: number;
  curso: string;
  matricula: string;
  turno: string;
}

export interface UpdateStudentInput {
  id: number;
  id_instituicao_ensino: number;
  nome: string;
  email: string;
  nascimento: string;
  telefone: string;
  senha: string;
  curso: string;
  matricula: string;
  turno: string;
}

const uriStudent = "alunos"

export const Student = {
  getAll() {
    return api.get(uriStudent);
  },

  get(id: number) {
    return api.get(`${uriStudent}/${id}`);
  },

  getByName(name: string) {
    return api.get<StudentProps[]>(`${uriStudent}/${name}`);
  },

  create(student: CreateStudentInput) {
    return api.post(`${uriStudent}`, student);
  },

  update(student: UpdateStudentInput) {
    const { id, ...newStudent } = student;

    return api.put(`${uriStudent}/${id}`, newStudent);
  },

  delete(id: number) {
    return api.delete(`${uriStudent}/${id}`);
  }
};