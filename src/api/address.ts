import { api } from "../lib/axios";

export interface AddressProps {
  id: number;
  id_cidade: number;
  id_pessoa: number;
  cep: string;
  numero: number;
  complemento: string;
  referencia: string;
  logradouro: string;
}

export interface CreateAddressInput {
  id_cidade: number;
  id_pessoa: number;
  cep: string;
  numero: number;
  complemento: string;
  referencia: string;
  logradouro: string;
}

export interface UpdateAddressInput {
  id: number;
  id_cidade: number;
  id_pessoa: number;
  cep: string;
  numero: number;
  complemento: string;
  referencia: string;
  logradouro: string;
}

const uriAddress = "enderecos"

export const Address = {
  getAll() {
    return api.get(uriAddress);
  },

  get(id: number) {
    return api.get(`${uriAddress}/${id}`);
  },

  create(address: CreateAddressInput) {
    return api.post(`${uriAddress}`, address);
  },

  update(address: UpdateAddressInput) {
    const { id, ...newAddress } = address;

    return api.put(`${uriAddress}/${id}`, newAddress);
  },

  delete(id: number) {
    return api.delete(`${uriAddress}/${id}`);
  }
};