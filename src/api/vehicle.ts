import { api } from "../lib/axios";

export interface VehicleProps {
  id: number;
  cidade: string;
  qtd_passageiros: number;
  tipo_veiculo: string;
  placa: string;
}

export interface CreateVehicleInput {
  cidade: string;
  qtd_passageiros: number;
  tipo_veiculo: string;
  placa: string;
}

export interface UpdateVehicleInput {
  id: number;
  cidade: string;
  qtd_passageiros: number;
  tipo_veiculo: string;
  placa: string;
}

const uriVehicle = "veiculos"

export const Vehicle = {
  getAll() {
    return api.get(uriVehicle);
  },

  get(id: number) {
    return api.get(`${uriVehicle}/${id}`);
  },

  create(vehicle: CreateVehicleInput) {
    return api.post(`${uriVehicle}`, vehicle);
  },

  update(vehicle: UpdateVehicleInput) {
    const { id, ...newVehicle } = vehicle;

    return api.put(`${uriVehicle}/${id}`, newVehicle);
  },

  delete(id: number) {
    return api.delete(`${uriVehicle}/${id}`);
  }
};