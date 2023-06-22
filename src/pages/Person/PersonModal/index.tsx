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
import { useEffect } from "react";
import { Label } from "../../../styles/components/label";

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
    setValue,
  } = useForm<NewPessoaFormInputs>({
    resolver: zodResolver(newPessoaFormSchema),
  });
  const { createPerson, person, updatePerson } = usePeople();

  useEffect(() => {
    setValue("nome", person.nome);
    setValue("email", person.email);
    setValue("senha", person.senha);
    setValue("telefone", person.telefone);
    setValue("nascimento", person.nascimento);
  }, [person]);

  const handleCreateNewPessoa = async (data: NewPessoaFormInputs) => {
    const { nome, email, nascimento, telefone, senha } = data;

    if (!person.id) {
      createPerson({
        nome,
        email,
        nascimento,
        telefone,
        senha,
      });

      reset();
    } else {
      updatePerson({
        id: person.id,
        nome,
        email,
        nascimento,
        telefone,
        senha,
      });
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Pessoa</Dialog.Title>

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
            <Label htmlFor="nascimento">Data de nascimento:</Label>
            <input
              id="nascimento"
              type="date"
              placeholder="Data de nascimento"
              {...register("nascimento")}
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

          {person && person.id ? (
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