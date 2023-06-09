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
import { usePeople } from "../../../hooks/usePeople";
import { Button, Label } from "../../../styles/components";
import { useAddresses } from "../../../hooks/useAddresses";
import { Select, Option } from "../../../styles/components/select";

const cities = [
  {
    nome: "Sapé",
    codigoIbge: 2515302,
  },
  {
    nome: "Guarabira",
    codigoIbge: 2506301,
  },
];

const newAddressFormSchema = z.object({
  id_cidade: z.string().nonempty("A cidade é obrigatória"),
  id_pessoa: z.string().nonempty("O usuário é obrigatório"),
  cep: z.string()
    .nonempty("O cep é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  logradouro: z.string()
    .nonempty("O logradouro é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  numero: z.string()
    .nonempty("O número é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  complemento: z.string()
    .nonempty("O complemento é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  referencia: z.string()
    .nonempty("O referência é obrigatória")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
});

type NewAddressFormInputs = z.infer<typeof newAddressFormSchema>

export const AddressModal = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<NewAddressFormInputs>({
    resolver: zodResolver(newAddressFormSchema),
  });
  const { people, fetchPeople } = usePeople();
  const { address, createAddress, updateAddress } = useAddresses();

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  useEffect(() => {
    if (address.id) {
      setValue("id_cidade", String(address.id_cidade));
      setValue("id_pessoa", String(address.id_pessoa));
      setValue("cep", address.cep);
      setValue("numero", String(address.numero));
      setValue("complemento", address.complemento);
      setValue("referencia", address.referencia);
      setValue("logradouro", address.logradouro);
    }
  }, [address]);

  const handleCreateNewAddress = async (data: NewAddressFormInputs) => {
    const { id_cidade, id_pessoa, cep, numero, complemento,
      referencia, logradouro,
    } = data;

    if (!address.id) {
      createAddress({
        id_cidade: Number(id_cidade),
        id_pessoa: Number(id_pessoa),
        cep,
        numero: Number(numero),
        complemento,
        referencia,
        logradouro,
      });

      reset();
    } else {
      updateAddress({
        id: address.id,
        id_cidade: Number(id_cidade),
        id_pessoa: Number(id_pessoa),
        cep,
        numero: Number(numero),
        complemento,
        referencia,
        logradouro,
      });
    }
  }

  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <Dialog.Title>Endereço</Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form onSubmit={handleSubmit(handleCreateNewAddress)}>
            <Fieldset>
              <Label htmlFor="cep">Cep:</Label>
              <input
                id="cep"
                type="text"
                placeholder="Cep"
                {...register("cep")}
              />
              {errors.cep && <MessageError>{errors.cep.message}</MessageError>}
            </Fieldset>
            <Fieldset>
              <Label htmlFor="logradouro">Logradouro:</Label>
              <input
                id="logradouro"
                type="text"
                placeholder="Logradouro"
                {...register("logradouro")}
              />
              {errors.logradouro && <MessageError>{errors.logradouro.message}</MessageError>}
            </Fieldset>
            <Fieldset>
              <Label htmlFor="numero">Número:</Label>
              <input
                id="numero"
                type="text"
                placeholder="Número"
                {...register("numero")}
              />
              {errors.numero && <MessageError>{errors.numero.message}</MessageError>}
            </Fieldset>
            <Fieldset>
              <Label htmlFor="referencia">Referência:</Label>
              <input
                id="referencia"
                type="text"
                placeholder="Referência"
                {...register("referencia")}
              />
              {errors.referencia && <MessageError>{errors.referencia.message}</MessageError>}
            </Fieldset>
            <Fieldset>
              <Label htmlFor="complemento">Complemento:</Label>
              <input
                id="complemento"
                type="text"
                placeholder="Complemento"
                {...register("complemento")}
              />
              {errors.complemento && <MessageError>{errors.complemento.message}</MessageError>}
            </Fieldset>

            <Fieldset>
              <Label htmlFor="usuario">Usuário:</Label>
              <Select
                id="usuario"
                placeholder="Usuário"
                {...register("id_pessoa")}
              >
                {people && people.map((person) => (
                  <Option
                    key={person.id}
                    value={person.id}
                  >
                    {person.nome}
                  </Option>
                ))}
              </Select>
              {errors.id_pessoa && <MessageError>{errors.id_pessoa.message}</MessageError>}
            </Fieldset>
            <Fieldset>
              <Label htmlFor="cidade">Cidade:</Label>
              <Select
                id="cidade"
                placeholder="Cidade"
                {...register("id_cidade")}
              >
                {cities.map((city) => (
                  <Option
                    key={city.codigoIbge}
                    value={city.codigoIbge}
                  >
                    {city.nome}
                  </Option>
                ))}
              </Select>
              {errors.id_cidade && <MessageError>{errors.id_cidade.message}</MessageError>}
            </Fieldset>

            {address && address.id ? (
              <Button type="submit" disabled={isSubmitting}>
                Atualizar
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                Cadastrar
              </Button>
            )}
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  );
};