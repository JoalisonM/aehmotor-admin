import { useEffect } from "react";
import * as z from "zod";
import { format } from "date-fns";
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
import { Label } from "../../../styles/components/label";

const newEmployeeFormSchema = z.object({
  nome: z.string().nonempty("O nome é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  email: z.string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .toLowerCase(),
  nascimento: z.date()
    .max(new Date('2003-01-01'), { message: 'Novo demais para fazer faculdade' }),
  telefone: z.string().nonempty("O telefone é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  senha: z.string().min(6, "A senha precisa de no mínimo 6 caracteres")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  cargo: z.string().nonempty("O cargo é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
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
    setValue("nascimento", new Date(employee.nascimento));
    setValue("cargo", employee.cargo);
  }, [employee]);

  const handleCreateNewPessoa = async (data: NewPessoaFormInputs) => {
    const { nome, email, nascimento, telefone, senha, cargo } = data;
    const formattedDateString = format(nascimento, "yyyy/MM/dd");

    if (!employee.id) {
      createEmployee({
        nome,
        email,
        nascimento: formattedDateString,
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
        nascimento: formattedDateString,
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
            <Label htmlFor="email">E-mail:</Label>
            <input
              id="email"
              type="text"
              placeholder="E-mail"
              {...register("email")}
            />
            {errors.email && <MessageError>{errors.email.message}</MessageError>}
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
          <Fieldset>
            <Label htmlFor="cargo">Cargo:</Label>
            <input
              id="cargo"
              type="text"
              placeholder="Cargo"
              {...register("cargo")}
            />
            {errors.cargo && <MessageError>{errors.cargo.message}</MessageError>}
          </Fieldset>
          <Fieldset>
            <Label htmlFor="nascimento">Data de nascimento:</Label>
            <input
              id="nascimento"
              type="date"
              placeholder="Data de nascimento"
              {...register("nascimento", { valueAsDate: true })}
            />
            {errors.nascimento && <MessageError>{errors.nascimento.message}</MessageError>}
          </Fieldset>
          <Fieldset>
            <Label htmlFor="senha">Senha:</Label>
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