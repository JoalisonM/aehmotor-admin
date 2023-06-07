import { api } from "../lib/axios";

export interface UfProps {
  codigoUf: number;
  uf: string;
  nome: string;
  latitude: number;
  longitude: number;
  regiao: string;
}

const uriUf = "ufs"

export const Uf = {
  getAll() {
    return api.get(uriUf);
  },
};