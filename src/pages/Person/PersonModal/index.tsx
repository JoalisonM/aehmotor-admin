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
import { usePeople } from "../../../hooks/usePeople";

const newPessoaFormSchema = z.object({
  nome: z.string().nonempty("O nome é obrigatório"),
  email: z.string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .toLowerCase(),
  nascimento: z.string().nonempty("A data de nascimento é obrigatória"),
  telefone: z.string().nonempty("O telefone é obrigatório"),
  senha: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),
});

type NewPessoaFormInputs = z.infer<typeof newPessoaFormSchema>

export const PersonModal = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<NewPessoaFormInputs>({
    resolver: zodResolver(newPessoaFormSchema),
  });
  const { createPerson } = usePeople();


  const handleCreateNewPessoa = async (data: NewPessoaFormInputs) => {
    const { nome, email, nascimento, telefone, senha } = data;

    createPerson({
      nome,
      email,
      nascimento,
      telefone,
      senha,
    });

    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Pessoa</Dialog.Title>

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

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
};