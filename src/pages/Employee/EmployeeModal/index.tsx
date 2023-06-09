import { useEffect } from "react";
import * as z from "zod";
import { X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Content,
  Overlay,
  Fieldset,
  CloseButton,
  MessageError,
} from "./styles";
import { InputPassword } from "../../../components/InputPassword";
import { useEmployees } from "../../../hooks/useEmployees";

const newEmployeeFormSchema = z.object({
  nome: z.string().nonempty("O nome é obrigatório"),
  email: z.string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .toLowerCase(),
  nascimento: z.string().nonempty("A data de nascimento é obrigatória"),
  telefone: z.string().nonempty("O telefone é obrigatório"),
  senha: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),
  cargo: z.string().nonempty("O cargo é obrigatório"),
});

type NewPessoaFormInputs = z.infer<typeof newEmployeeFormSchema>

export const EmployeeModal = () => {
  const {
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewPessoaFormInputs>({
    resolver: zodResolver(newEmployeeFormSchema),
  });
  const { employee ,createEmployee, updateEmployee } = useEmployees();

  useEffect(() => {
    setValue("nome", employee.nome);
    setValue("email", employee.email);
    setValue("senha", employee.senha);
    setValue("telefone", employee.telefone);
    setValue("nascimento", employee.nascimento);
    setValue("cargo", employee.cargo);
  }, [employee]);

  const handleCreateNewPessoa = async (data: NewPessoaFormInputs) => {
    const { nome, email, nascimento, telefone, senha, cargo } = data;

    if (!employee.id) {
      createEmployee({
        nome,
        email,
        nascimento,
        telefone,
        senha,
        cargo,
      });

      reset();
    } else {
      updateEmployee({
        id: employee.id,
        nome,
        email,
        nascimento,
        telefone,
        senha,
        cargo,
      });
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Funcionário</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewPessoa)}>
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
              placeholder="E-mail"
              {...register("email")}
            />
            {errors.email && <MessageError>{errors.email.message}</MessageError>}
          </Fieldset>
          <Fieldset>
            <input
              type="text"
              placeholder="Telefone"
              {...register("telefone")}
            />
            {errors.telefone && <MessageError>{errors.telefone.message}</MessageError>}
          </Fieldset>
          <Fieldset>
            <input
              type="text"
              placeholder="Cargo"
              {...register("cargo")}
            />
            {errors.cargo && <MessageError>{errors.cargo.message}</MessageError>}
          </Fieldset>
          <Fieldset>
            <input
              type="date"
              placeholder="Data de nascimento"
              {...register("nascimento")}
            />
            {errors.nascimento && <MessageError>{errors.nascimento.message}</MessageError>}
          </Fieldset>
          <Fieldset>
            <Controller
              name="senha"
              control={control}
              render={({ field }) => (
                <InputPassword
                  ref={field.ref}
                  value={field.value}
                  onChangeValue={field.onChange}
                />
              )}
            />
            {errors.senha && <MessageError>{errors.senha.message}</MessageError>}
          </Fieldset>

          {employee && employee.id ? (
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