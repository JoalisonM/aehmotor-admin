import { api } from "../lib/axios";
import { AddressProps, CreateAddressInput, UpdateAddressInput } from "./address";

export interface CityHallProps {
  id: number;
  nome: string;
  secretario: number;
  endereco: AddressProps;
}

export interface CreateCityHallInput {
  nome: string;
  secretario: number;
  endereco: CreateAddressInput;
}

export interface UpdateCityHallInput {
  id: number;
  nome: string;
  secretario: number;
  endereco: CreateAddressInput;
}

const uriCityHall = "prefeituras"

export const CityHall = {
  getAll() {
    return api.get(uriCityHall);
  },

  get(id: number) {
    return api.get(`${uriCityHall}/${id}`);
  },

  getByName(name: string) {
    return api.get<CityHallProps[]>(`${uriCityHall}/${name}`);
  },

  create(cityHall: CreateCityHallInput) {
    return api.post(`${uriCityHall}`, cityHall);
  },

  update(cityHall: UpdateCityHallInput) {
    const { id, ...newCityHall } = cityHall;

    return api.put(`${uriCityHall}/${id}`, newCityHall);
  },

  delete(id: number) {
    return api.delete(`${uriCityHall}/${id}`);
  }
};