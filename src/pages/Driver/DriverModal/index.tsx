import { useEffect } from "react";
import * as z from "zod";
import { format } from "date-fns";
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
import { useVehicles } from "../../../hooks/useVehicles";
import { Button, Label } from "../../../styles/components";
import { Option, Select } from "../../../styles/components/select";

const newDriverFormSchema = z.object({
  nome: z.string().nonempty("O nome é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  email: z.string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .toLowerCase(),
  nascimento: z.date()
    .max(new Date('2004-01-01'), { message: 'Novo demais para fazer faculdade' }),
  telefone: z.string().nonempty("O telefone é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  senha: z.string().min(6, "A senha precisa de no mínimo 6 caracteres")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  id_veiculo: z.number().nonnegative("Não é permitido número negativo")
    .min(1, { message: "Deve ter mais de 1 caractere"}),
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
    setValue("nascimento", new Date(driver.nascimento));
    setValue("id_veiculo", driver.id_veiculo);
  }, [driver]);

  const handleCreateNewPessoa = async (data: NewPessoaFormInputs) => {
    const { nome, email, nascimento, telefone, senha, id_veiculo } = data;
    const formattedDateString = format(nascimento, "yyyy/MM/dd");

    if (!driver.id) {
      createDriver({
        nome,
        email,
        nascimento: formattedDateString,
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
        nascimento: formattedDateString,
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
            <Label htmlFor="nome">Nome:</Label>
            <input
              id="nome"
              type="text"
              placeholder="Nome"
              {...register("nome")}
            />
            {errors.nome && <MessageError>{errors.nome.message}</MessageError>}
          </Row>
          <Row>
            <Label htmlFor="email">E-mail:</Label>
            <input
              id="email"
              type="text"
              placeholder="E-mail"
              {...register("email")}
            />
            {errors.email && <MessageError>{errors.email.message}</MessageError>}
          </Row>
          <Row>
            <Label htmlFor="telefone">Telefone:</Label>
            <input
              id="telefone"
              type="text"
              placeholder="Telefone"
              {...register("telefone")}
            />
            {errors.telefone && <MessageError>{errors.telefone.message}</MessageError>}
          </Row>
          <Row>
            <Label htmlFor="veiculo">Veículo:</Label>
            <Select
              id="veiculo"
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
            <Label htmlFor="nascimento">Data de nascimento:</Label>
            <input
              id="nascimento"
              type="date"
              placeholder="Data de nascimento"
              {...register("nascimento", { valueAsDate: true })}
            />
            {errors.nascimento && <MessageError>{errors.nascimento.message}</MessageError>}
          </Row>
          <Row>
            <Label htmlFor="senha">Senha:</Label>
            <input
              id="senha"
              type="password"
              placeholder="Senha"
              {...register("senha")}
            />
            {errors.senha && <MessageError>{errors.senha.message}</MessageError>}
          </Row>

          {driver && driver.id ? (
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
    </Dialog.Portal>
  );
};