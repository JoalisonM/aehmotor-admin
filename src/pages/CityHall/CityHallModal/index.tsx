import { useEffect } from "react";
import * as z from "zod";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Content,
  Overlay,
  Fieldset,
  CloseButton,
  MessageError,
} from "./styles";
import { useEmployees } from "../../../hooks/useEmployees";
import { useAddresses } from "../../../hooks/useAddresses";
import { AddressProps } from "../../../api/address";
import { AddressFields } from "./Address";
import { usePrefectures } from "../../../hooks/usePrefectures";
import { Option, Select } from "../../../styles/components/select";
import { usePeople } from "../../../hooks/usePeople";

const newCollegeFormSchema = z.object({
  secretario: z.string().nonempty("O secretário é obrigatório"),
  id_cidade: z.string().nonempty("A cidade é obrigatória"),
  id_pessoa: z.string().nonempty("O usuário é obrigatório"),
  cep: z.string().nonempty("O cep é obrigatório"),
  logradouro: z.string().nonempty("O logradouro é obrigatório"),
  numero: z.number(),
  complemento: z.string().nonempty("O complemento é obrigatório"),
  referencia: z.string().nonempty("O referência é obrigatória"),
});

export type NewAddressFormInputs = z.infer<typeof newCollegeFormSchema>

export const CityHallModal = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<NewAddressFormInputs>({
    resolver: zodResolver(newCollegeFormSchema),
  });
  const { people, fetchPeople } = usePeople();
  const { employees, fetchEmployees } = useEmployees();
  const { address, getAddress, createAddress, updateAddress } = useAddresses();
  const { cityHall, createCityHall, updateCityHall } = usePrefectures();

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    if (cityHall && cityHall.id_endereco) {
      getAddress(cityHall.id_endereco);
    }
  }, [cityHall]);

  useEffect(() => {
    if (cityHall.id) {
      setValue("secretario", String(cityHall.secretario));
      setValue("id_cidade", String(address.id_cidade));
      setValue("id_pessoa", String(address.id_pessoa));
      setValue("cep", address.cep);
      setValue("numero", address.numero);
      setValue("complemento", address.complemento);
      setValue("referencia", address.referencia);
      setValue("logradouro", address.logradouro);
    }
  }, [address]);

  const handleCreateNewAddress = async (data: NewAddressFormInputs) => {
    const { secretario, id_cidade, id_pessoa,
      cep, numero, complemento, referencia, logradouro } = data;

    let responseAddress: AddressProps;


    if (!address.id) {
      responseAddress = await createAddress({
        id_cidade: Number(id_cidade),
        id_pessoa: Number(id_pessoa),
        cep,
        numero,
        complemento,
        referencia,
        logradouro,
      });
    } else {
      updateAddress({
        id: address.id,
        id_cidade: Number(id_cidade),
        id_pessoa: Number(id_pessoa),
        cep,
        numero,
        complemento,
        referencia,
        logradouro,
      });
    }

    if (!cityHall.id) {
      createCityHall({
        secretario: Number(secretario),
        id_endereco: responseAddress.id,
      });

      reset();
    } else {
      updateCityHall({
        id: cityHall.id,
        secretario: Number(secretario),
        id_endereco: address.id,
      });
    }
  }

  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <Dialog.Title>Prefeitura</Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form onSubmit={handleSubmit(handleCreateNewAddress)}>
            <Fieldset>
              <Select
                placeholder="Secretário"
                {...register("secretario")}
              >
                {employees.map((employee) => (
                  <Option value={employee.id}>{employee.nome}</Option>
                ))}
              </Select>
              {errors.secretario && <MessageError>{errors.secretario.message}</MessageError>}
            </Fieldset>

            <AddressFields
              errors={errors}
              people={people}
              register={register}
            />

            {cityHall && cityHall.id ? (
              <button type="submit" disabled={isSubmitting}>
                Atualizar
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting}>
                Cadastrar
              </button>
            )}
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  );
};