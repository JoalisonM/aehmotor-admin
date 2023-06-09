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
import { useVehicles } from "../../../hooks/useVehicles";

const newVehicleFormSchema = z.object({
  placa: z.string().nonempty("A placa é obrigatória"),
  cidade: z.string().nonempty("A cidade é obrigatória"),
  tipo_veiculo: z.string().nonempty("O nome é obrigatório"),
  qtd_passageiros: z.number().nonnegative("A quantidade de passageiros tem que ser maior que 0"),
});

export type NewVehicleFormInputs = z.infer<typeof newVehicleFormSchema>

export const VehicleModal = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<NewVehicleFormInputs>({
    resolver: zodResolver(newVehicleFormSchema),
  });
  const { vehicle, createVehicle, updateVehicle } = useVehicles();

  useEffect(() => {
    if (vehicle.id) {
      setValue("placa", vehicle.placa);
      setValue("cidade", vehicle.cidade);
      setValue("tipo_veiculo", vehicle.tipo_veiculo);
      setValue("qtd_passageiros", vehicle.qtd_passageiros);
    }
  }, [vehicle]);

  const handleCreateNewVehicle = async (data: NewVehicleFormInputs) => {
    const { cidade, placa, tipo_veiculo, qtd_passageiros } = data;

    if (!vehicle.id) {
      createVehicle({
        cidade,
        placa,
        tipo_veiculo,
        qtd_passageiros: qtd_passageiros,
      });

      reset();
    } else {
      updateVehicle({
        id: vehicle.id,
        cidade,
        placa,
        tipo_veiculo,
        qtd_passageiros: qtd_passageiros,
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

          <form onSubmit={handleSubmit(handleCreateNewVehicle)}>
            <Fieldset>
              <input
                type="text"
                placeholder="Cidade"
                {...register("cidade")}
              />
              {errors.cidade && <MessageError>{errors.cidade.message}</MessageError>}
            </Fieldset>
            <Fieldset>
              <input
                type="text"
                placeholder="Placa"
                {...register("placa")}
              />
              {errors.placa && <MessageError>{errors.placa.message}</MessageError>}
            </Fieldset>
            <Fieldset>
              <input
                type="text"
                placeholder="Tipo do veículo"
                {...register("tipo_veiculo")}
              />
              {errors.tipo_veiculo && <MessageError>{errors.tipo_veiculo.message}</MessageError>}
            </Fieldset>
            <Fieldset>
              <input
                type="number"
                placeholder="Quantidade de passageiros"
                {...register("qtd_passageiros", { valueAsNumber: true })}
              />
              {errors.qtd_passageiros && <MessageError>{errors.qtd_passageiros.message}</MessageError>}
            </Fieldset>

            {vehicle && vehicle.id ? (
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