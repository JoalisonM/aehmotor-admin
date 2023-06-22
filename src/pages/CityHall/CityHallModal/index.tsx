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
import { Button, Label } from "../../../styles/components";
import { useEmployees } from "../../../hooks/useEmployees";
import { usePrefectures } from "../../../hooks/usePrefectures";
import { Option, Select } from "../../../styles/components/select";

const newCollegeFormSchema = z.object({
  nome: z.string().nonempty("O nome é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  secretario: z.string().nonempty("O secretário é obrigatório")
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
  const { cityHall, createCityHall, updateCityHall } = usePrefectures();

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    if (cityHall.id) {
      setValue("nome", cityHall.nome);
      setValue("secretario", String(cityHall.secretario));
      setValue("endereco", cityHall.endereco);
    }
  }, [cityHall]);

  const handleCreateNewAddress = async (data: NewAddressFormInputs) => {
    const { nome, secretario, endereco } = data;

    console.log("endereco: ", endereco);

    if (!cityHall.id) {
      createCityHall({
        nome,
        secretario: Number(secretario),
        endereco,
      });

      reset();
    } else {
      updateCityHall({
        id: cityHall.id,
        nome,
        secretario: Number(secretario),
        endereco,
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
              <Label htmlFor="nome">Nome:</Label>
              <input
                id="nome"
                type="text"
                placeholder="Nome"
                {...register("nome")}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="secretario">Secretário:</Label>
              <Select
                id="secretario"
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