import * as z from "zod";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Row,
  Content,
  Overlay,
  CloseButton,
  MessageError,
} from "./styles";
import { useDrivers } from "../../../hooks/useDrivers";
import { useEffect } from "react";
import { Option, Select } from "../../../styles/components/select";
import { useVehicles } from "../../../hooks/useVehicles";

const newDriverFormSchema = z.object({
  nome: z.string().nonempty("O nome é obrigatório"),
  email: z.string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .toLowerCase(),
  nascimento: z.string().nonempty("A data de nascimento é obrigatória"),
  telefone: z.string().nonempty("O telefone é obrigatório"),
  senha: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),
  id_veiculo: z.number(),
});

type NewPessoaFormInputs = z.infer<typeof newDriverFormSchema>

export const DriverModal = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<NewPessoaFormInputs>({
    resolver: zodResolver(newDriverFormSchema),
  });
  const { vehicles, fetchVehicles } = useVehicles();
  const { driver, createDriver, updateDriver } = useDrivers();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  useEffect(() => {
    setValue("nome", driver.nome);
    setValue("email", driver.email);
    setValue("senha", driver.senha);
    setValue("telefone", driver.telefone);
    setValue("nascimento", driver.nascimento);
    setValue("id_veiculo", driver.id_veiculo);
  }, [driver]);

  const handleCreateNewPessoa = async (data: NewPessoaFormInputs) => {
    const { nome, email, nascimento, telefone, senha, id_veiculo } = data;

    if (!driver.id) {
      createDriver({
        nome,
        email,
        nascimento,
        telefone,
        senha,
        cargo: "motorista",
        id_veiculo,
      });

      reset();
    } else {
      updateDriver({
        id: driver.id,
        nome,
        email,
        nascimento,
        telefone,
        senha,
        cargo: "motorista",
        id_veiculo,
      });
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Motorista</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewPessoa)}>
          <Row>
            <input
              type="text"
              placeholder="Nome"
              {...register("nome")}
            />
            {errors.nome && <MessageError>{errors.nome.message}</MessageError>}
          </Row>
          <Row>
            <input
              type="text"
              placeholder="E-mail"
              {...register("email")}
            />
            {errors.email && <MessageError>{errors.email.message}</MessageError>}
          </Row>
          <Row>
            <input
              type="text"
              placeholder="Telefone"
              {...register("telefone")}
            />
            {errors.telefone && <MessageError>{errors.telefone.message}</MessageError>}
          </Row>
          <Row>
            <Select
              placeholder="Veículo"
              {...register("id_veiculo", { valueAsNumber: true })}
            >
              {vehicles.map((vehicle) => (
                <Option
                  key={vehicle.id}
                  value={vehicle.id}
                >
                  {vehicle.placa}
                </Option>
              ))}
            </Select>
            {errors.id_veiculo && <MessageError>{errors.id_veiculo.message}</MessageError>}
          </Row>
          <Row>
            <input
              type="date"
              placeholder="Data de nascimento"
              {...register("nascimento")}
            />
            {errors.nascimento && <MessageError>{errors.nascimento.message}</MessageError>}
          </Row>
          <Row>
            <input
              type="password"
              placeholder="Senha"
              {...register("senha")}
            />
            {errors.senha && <MessageError>{errors.senha.message}</MessageError>}
          </Row>

          {driver && driver.id ? (
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
    </Dialog.Portal>
  );
};