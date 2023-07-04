import { useEffect } from "react";
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
import { useVehicles } from "../../../hooks/useVehicles";
import { useColleges } from "../../../hooks/useColleges";
import { Button, Label } from "../../../styles/components";
import { usePrefectures } from "../../../hooks/usePrefectures";
import { useCitiesRoutes } from "../../../hooks/useCitiesRoutes";
import { Option, Select } from "../../../styles/components/select";

const newCitiesRouteModalFormSchema = z.object({
  id_veiculo: z.number(),
  id_motorista: z.number(),
  id_prefeitura: z.number(),
  instituicoes_ensino: z.array(z.string()),
  cidade_origem: z.string()
    .nonempty("A cidade de origem é obrigatória")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  cidade_destino: z.string()
    .nonempty("A cidade de destino é obrigatória")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  qtd_alunos: z.number()
    .nonnegative("Digite um número maior que 0")
    .min(1, { message: "Deve ter mais de 1 caractere" }),
  horario_saida: z.string()
    .nonempty("o horário de saída é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  horario_chegada: z.string()
    .nonempty("o horário de chegada é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
});

type NewCitiesRouteFormInputs = z.infer<typeof newCitiesRouteModalFormSchema>

export const CitiesRouteModal = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<NewCitiesRouteFormInputs>({
    resolver: zodResolver(newCitiesRouteModalFormSchema),
  });
  const { vehicles, fetchVehicles } = useVehicles();
  const { drivers, fetchDrivers } = useDrivers();
  const { prefectures, fetchPrefectures } = usePrefectures();
  const { colleges, fetchColleges } = useColleges();
  const { citiesRoute, createCitiesRoute, updateCitiesRoute } = useCitiesRoutes();

  useEffect(() => {
    fetchPrefectures();
  }, [fetchPrefectures]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  useEffect(() => {
    let instituicoes = citiesRoute.instituicoes_ensino.split("")
    setValue("id_veiculo", citiesRoute.id_veiculo);
    setValue("id_motorista", citiesRoute.id_motorista);
    setValue("id_prefeitura", citiesRoute.id_prefeitura);
    setValue("instituicoes_ensino", [citiesRoute.instituicoes_ensino]);
    setValue("cidade_origem", citiesRoute.cidade_origem);
    setValue("cidade_destino", citiesRoute.cidade_destino);
    setValue("qtd_alunos", citiesRoute.qtd_alunos);
    setValue("horario_chegada", citiesRoute.horario_chegada);
    setValue("horario_saida", citiesRoute.horario_saida);
  }, [citiesRoute]);

  const handleCreateNewPessoa = async (data: NewCitiesRouteFormInputs) => {
    const { id_veiculo, id_motorista, id_prefeitura, instituicoes_ensino,
      cidade_origem, cidade_destino, qtd_alunos, horario_chegada,
      horario_saida,
    } = data;
    const instituicoes = citiesRoute.instituicoes_ensino.split("")

    if (!citiesRoute.id) {
      createCitiesRoute({
        id_veiculo,
        id_motorista,
        id_prefeitura,
        instituicoes_ensino: instituicoes,
        qtd_alunos,
        cidade_origem,
        cidade_destino,
        horario_saida,
        horario_chegada,
      });

      reset();
    } else {
      updateCitiesRoute({
        id: citiesRoute.id,
        id_veiculo,
        id_motorista,
        id_prefeitura,
        instituicoes_ensino,
        qtd_alunos,
        cidade_origem,
        cidade_destino,
        horario_saida,
        horario_chegada,
      });
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Rota</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewPessoa)}>
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
            <Label htmlFor="motorista">Motorista:</Label>
            <Select
              id="motorista"
              placeholder="Motorista"
              {...register("id_motorista", { valueAsNumber: true })}
            >
              {drivers.map((driver) => (
                <Option
                  key={driver.id}
                  value={driver.id}
                >
                  {driver.nome}
                </Option>
              ))}
            </Select>
            {errors.id_motorista && <MessageError>{errors.id_motorista.message}</MessageError>}
          </Row>
          <Row>
            <Label htmlFor="prefeitura">Prefeitura:</Label>
            <Select
              placeholder="prefeitura"
              {...register("id_prefeitura", { valueAsNumber: true })}
            >
              {prefectures.map((cityHall) => (
                <Option
                  key={cityHall.id}
                  value={cityHall.id}
                >
                  {cityHall.nome}
                </Option>
              ))}
            </Select>
            {errors.id_prefeitura && <MessageError>{errors.id_prefeitura.message}</MessageError>}
          </Row>
          <Row>
            <Label htmlFor="faculdade">Instituições de ensino</Label>
            <input
              id="faculdade"
              type="text"
              placeholder="Instituições de ensino"
              {...register("instituicoes_ensino")}
            />
            {errors.instituicoes_ensino && <MessageError>{errors.instituicoes_ensino.message}</MessageError>}
          </Row>
          <Row>
            <Label htmlFor="cidade_origem">Cidade origem:</Label>
            <input
              id="cidade_origem"
              type="text"
              placeholder="Cidade origem"
              {...register("cidade_origem")}
            />
            {errors.cidade_origem && <MessageError>{errors.cidade_origem.message}</MessageError>}
          </Row>
          <Row>
            <Label htmlFor="cidade_destino">Cidade destino:</Label>
            <input
              id="cidade_destino"
              type="text"
              placeholder="Cidade destino"
              {...register("cidade_destino")}
            />
            {errors.cidade_destino && <MessageError>{errors.cidade_destino.message}</MessageError>}
          </Row>
          <Row>
            <Label htmlFor="quantidade_alunos">Quantidade de alunos:</Label>
            <input
              id="quantidade_alunos"
              type="number"
              placeholder="Quantidade de alunos"
              {...register("qtd_alunos", { valueAsNumber: true })}
            />
            {errors.qtd_alunos && <MessageError>{errors.qtd_alunos.message}</MessageError>}
          </Row>
          <Row>
            <Label htmlFor="horario_saida">Horário de saída:</Label>
            <input
              id="horario_saida"
              type="time"
              placeholder="Horário de saída"
              {...register("horario_saida")}
            />
            {errors.horario_saida && <MessageError>{errors.horario_saida.message}</MessageError>}
          </Row>
          <Row>
            <Label htmlFor="horario_chegada">Horário de chegada:</Label>
            <input
              id="horario_chegada"
              type="time"
              placeholder="Horário de chegada"
              {...register("horario_chegada")}
            />
            {errors.horario_chegada && <MessageError>{errors.horario_chegada.message}</MessageError>}
          </Row>

          {citiesRoute && citiesRoute.id ? (
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