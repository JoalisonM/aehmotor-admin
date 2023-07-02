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
import { AddressFields } from "./Address";
import { usePeople } from "../../../hooks/usePeople";
import { useColleges } from "../../../hooks/useColleges";
import { useAddresses } from "../../../hooks/useAddresses";
import { Button, Label } from "../../../styles/components";

const newCollegeFormSchema = z.object({
  nome: z.string().nonempty("O nome é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  telefone: z.string().nonempty("O telefone é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  endereco: z.object({
    id_cidade: z.number(),
    id_pessoa: z.number(),
    cep: z.string().nonempty("O cep é obrigatório")
      .trim()
      .min(1, { message: "Deve ter mais de 1 caractere"}),
    logradouro: z.string().nonempty("O logradouro é obrigatório")
      .trim()
      .min(1, { message: "Deve ter mais de 1 caractere"}),
    numero: z.number().nonnegative("Número tem que ser maior que 0")
      .min(1, { message: "Deve ter mais de 1 caractere"}),
    complemento: z.string().nonempty("O complemento é obrigatório")
      .trim()
      .min(1, { message: "Deve ter mais de 1 caractere"}),
    referencia: z.string().nonempty("O referência é obrigatória")
      .trim()
      .min(1, { message: "Deve ter mais de 1 caractere"}),
  })
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
  const { college, createCollege, updateCollege } = useColleges();

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  useEffect(() => {
    if (college.id) {
      setValue("nome", college.nome);
      setValue("telefone", college.telefone);
      setValue("endereco", college.endereco);
    }
  }, [college]);

  const handleCreateNewAddress = async (data: NewAddressFormInputs) => {
    const { nome, telefone, endereco } = data;

    if (!college.id) {
      createCollege({
        nome,
        telefone,
        endereco,
      });

      reset();
    } else {
      updateCollege({
        id: college.id,
        nome,
        telefone,
        endereco,
      });
    }
  }

  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <Dialog.Title>Faculdade</Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form onSubmit={handleSubmit(handleCreateNewAddress)}>
            <Fieldset>
              <Label htmlFor="nome">Nome:</Label>
              <input
                id="nome"
                type="text"
                placeholder="Nome"
                {...register("nome")}
              />
              {errors.nome && <MessageError>{errors.nome.message}</MessageError>}
            </Fieldset>
            <Fieldset>
              <Label htmlFor="telefone">Telefone:</Label>
              <input
                id="telefone"
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