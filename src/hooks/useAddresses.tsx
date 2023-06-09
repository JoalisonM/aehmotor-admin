import { ReactNode, useCallback, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { Address, AddressProps, CreateAddressInput, UpdateAddressInput } from "../api/address";

interface AddressContextType {
  address: AddressProps;
  addresses: AddressProps[];
  fetchAddresses: () => Promise<void>;
  deleteAddress: (id: number) => void;
  setAddress: (value: AddressProps) => void;
  getAddress: (id: number) => Promise<void>;
  createAddress: (data: CreateAddressInput) => Promise<void>;
  updateAddress: (data: UpdateAddressInput) => Promise<void>;
}

interface AddressContextProviderProps {
  children: ReactNode;
}

export const AddressContext = createContext({} as AddressContextType);

export const AddressContextProvider = ({ children }: AddressContextProviderProps) => {
  const [addresses, setAddresses] = useState<AddressProps[]>([]);
  const [address, setAddress] = useState<AddressProps>({} as AddressProps);

  const fetchAddresses = useCallback(async () => {
    const response = await Address.getAll();

    setAddresses(response.data);
  }, []);

  const getAddress = useCallback(
    async (id: number) => {
      const response = await Address.get(id);

      if (response) {
        setAddress(response.data);
      }
    }, []
  );

  const createAddress = useCallback(
    async (data: CreateAddressInput) => {
      const { id_cidade, id_pessoa, cep, numero, complemento, referencia, logradouro } = data;

      const response = await Address.create(
        {
          id_cidade,
          id_pessoa,
          cep,
          numero,
          complemento,
          referencia,
          logradouro,
        }
      );

      setAddresses((state) => [response.data, ...state]);

      return response.data;
    }, []
  );

  const updateAddress = useCallback(
    async (data: UpdateAddressInput) => {
      const { id, id_cidade, id_pessoa, cep, numero, complemento, referencia, logradouro } = data;

      const response = await Address.update(
        {
          id,
          id_cidade,
          id_pessoa,
          cep,
          numero,
          complemento,
          referencia,
          logradouro,
        }
      );

      setAddresses((state) => state.map((address) => address.id === id ? response.data : address));
    }, []
  );

  const deleteAddress = async (id: number) => {
    Address.delete(id);

    setAddresses((state) => state.filter((address) => address.id !== id));
  }

  return (
    <AddressContext.Provider
      value={{
        address,
        addresses,
        getAddress,
        setAddress,
        fetchAddresses,
        createAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export const useAddresses = () => {
  const address = useContextSelector(AddressContext, (context) => context.address);
  const addresses = useContextSelector(AddressContext, (context) => context.addresses);
  const getAddress = useContextSelector(AddressContext, (context) => context.getAddress);
  const setAddress = useContextSelector(AddressContext, (context) => context.setAddress);
  const fetchAddresses = useContextSelector(AddressContext, (context) => context.fetchAddresses);
  const createAddress = useContextSelector(AddressContext, (context) => context.createAddress);
  const updateAddress = useContextSelector(AddressContext, (context) => context.updateAddress);
  const deleteAddress = useContextSelector(AddressContext, (context) => context.deleteAddress);

  return {
    address,
    addresses,
    setAddress,
    getAddress,
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
  };
}