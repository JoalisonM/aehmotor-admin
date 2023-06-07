import { api } from "../lib/axios";

export interface CityProps {
  codigo_ibge: number;
  nome: string;
  latitude: number;
  longitude: number;
  capital: boolean;
  codigo_uf: number;
  siafi_id: string;
  ddd: number;
  fuso_horario: string;
}

const uriCity = "cidades"

export const City = {
  getAll() {
    return api.get(uriCity);
  },
};