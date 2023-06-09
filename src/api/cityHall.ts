import { api } from "../lib/axios";

export interface CityHallProps {
  id: number;
  secretario: number;
  id_endereco: number;
}

export interface CreateCityHallInput {
  secretario: number;
  id_endereco: number;
}

export interface UpdateCityHallInput {
  id: number;
  secretario: number;
  id_endereco: number;
}

const uriCityHall = "prefeituras"

export const CityHall = {
  getAll() {
    return api.get(uriCityHall);
  },

  get(id: number) {
    return api.get(`${uriCityHall}/${id}`);
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