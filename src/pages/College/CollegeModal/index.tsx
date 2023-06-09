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
import { useAddresses } from "../../../hooks/useAddresses";
import { useColleges } from "../../../hooks/useColleges";
import { AddressProps } from "../../../api/address";
import { AddressFields } from "./Address";

const newCollegeFormSchema = z.object({
  nome: z.string().nonempty("O nome é obrigatório"),
  telefone: z.string().nonempty("O telefone é obrigatório"),
  id_cidade: z.string().nonempty("A cidade é obrigatória"),
  id_pessoa: z.string().nonempty("O usuário é obrigatório"),
  cep: z.string().nonempty("O cep é obrigatório"),
  logradouro: z.string().nonempty("O logradouro é obrigatório"),
  numero: z.string().nonempty("O número é obrigatório"),
  complemento: z.string().nonempty("O complemento é obrigatório"),
  referencia: z.string().nonempty("O referência é obrigatória"),
});

export type NewAddressFormInputs = z.infer<typeof newCollegeFormSchema>

export const CollegeModal = () => {
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
  const { address, getAddress, createAddress, updateAddress } = useAddresses();
  const { college, createCollege, updateCollege } = useColleges();

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  useEffect(() => {
    if (college && college.id_endereco) {
      getAddress(college.id_endereco);
    }
  }, [college]);

  useEffect(() => {
    if (college.id) {
      setValue("nome", college.nome);
      setValue("telefone", college.telefone);
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
    const { nome, telefone, id_cidade, id_pessoa,
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

    if (!college.id) {
      createCollege({
        nome,
        telefone,
        id_endereco: responseAddress.id,
      });

      reset();
    } else {
      updateCollege({
        id: college.id,
        nome,
        telefone,
        id_endereco: address.id,
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
              <input
                type="text"
                placeholder="Nome"
                {...register("nome")}
              />
              {errors.nome && <MessageError>{errors.nome.message}</MessageError>}
            </Fieldset>
            <Fieldset>
              <input
                type="text"
                placeholder="Telefone"
                {...register("telefone")}
              />
              {errors.telefone && <MessageError>{errors.telefone.message}</MessageError>}
            </Fieldset>

            <AddressFields
              errors={errors}
              people={people}
              register={register}
            />

            {college && college.id ? (
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