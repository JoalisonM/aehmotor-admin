import { api } from "../lib/axios";

export interface RouteProps {
  id: number;
  id_motorista: number;
  id_veiculo: number;
  id_prefeitura: number;
  id_instituicao_ensino: number;
  cidade_origem: string;
  cidade_destino: string;
  qtd_alunos: number;
  horario_saida: string;
  horario_chegada: string;
}

export interface CreateRouteInput {
  id_motorista: number;
  id_veiculo: number;
  id_prefeitura: number;
  id_instituicao_ensino: number;
  cidade_origem: string;
  cidade_destino: string;
  qtd_alunos: number;
  horario_saida: string;
  horario_chegada: string;
}

export interface UpdateRouteInput {
  id: number;
  id_motorista: number;
  id_veiculo: number;
  id_prefeitura: number;
  id_instituicao_ensino: number;
  cidade_origem: string;
  cidade_destino: string;
  qtd_alunos: number;
  horario_saida: string;
  horario_chegada: string;
}

const uriRoute = "rotas"

export const Route = {
  getAll() {
    return api.get(uriRoute);
  },

  get(id: number) {
    return api.get(`${uriRoute}/${id}`);
  },

  getByDestinationCity(name: string) {
    return api.get<RouteProps[]>(`${uriRoute}/${name}`);
  },

  create(route: CreateRouteInput) {
    return api.post(`${uriRoute}`, route);
  },

  update(route: UpdateRouteInput) {
    const { id, ...newRoute } = route;

    return api.put(`${uriRoute}/${id}`, newRoute);
  },

  delete(id: number) {
    return api.delete(`${uriRoute}/${id}`);
  }
};