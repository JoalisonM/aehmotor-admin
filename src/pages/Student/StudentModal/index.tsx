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
import { useStudents } from "../../../hooks/useStudent";

const newStudentFormSchema = z.object({
  nome: z.string().nonempty("O nome é obrigatório"),
  email: z.string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .toLowerCase(),
  nascimento: z.string().nonempty("A data de nascimento é obrigatória"),
  telefone: z.string().nonempty("O telefone é obrigatório"),
  matricula: z.string().nonempty("A matrícula é obrigatória"),
  curso: z.string().nonempty("O curso é obrigatório"),
  turno: z.string().nonempty("O turno é obrigatório"),
  idInstituicaoEnsino: z.number().nonnegative("O id tem que ser maior que 0"),
  senha: z.string().min(6, "A senha precisa de no mínimo 6 caracteres"),
});

type NewStudentFormInputs = z.infer<typeof newStudentFormSchema>

export const StudentModal = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<NewStudentFormInputs>({
    resolver: zodResolver(newStudentFormSchema),
  });
  const { createStudent, student, updateStudent } = useStudents();

  useEffect(() => {
    setValue("nome", student.nome);
    setValue("email", student.email);
    setValue("senha", student.senha);
    setValue("telefone", student.telefone);
    setValue("curso", student.curso);
    setValue("matricula", student.matricula);
    setValue("turno", student.turno);
    setValue("idInstituicaoEnsino", student.idInstituicaoEnsino);
    setValue("nascimento", student.nascimento);
  }, [student]);

  const handleCreateNewStudent = async (data: NewStudentFormInputs) => {
    const { nome, email, nascimento, telefone, senha,
      curso, matricula, turno, idInstituicaoEnsino
    } = data;

    console.log("nascimento: ", nascimento);

    if (!student.id) {
      createStudent({
        nome,
        email,
        nascimento,
        telefone,
        senha,
        curso,
        matricula,
        turno,
        idInstituicaoEnsino,
      });

      reset();
    } else {
      updateStudent({
        id: student.id,
        nome,
        email,
        nascimento,
        telefone,
        senha,
        curso,
        matricula,
        turno,
      });
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Aluno</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewStudent)}>
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
              type="date"
              placeholder="Data de nascimento"
              {...register("nascimento")}
            />
            {errors.nascimento && <MessageError>{errors.nascimento.message}</MessageError>}
          </Fieldset>
          <Fieldset>
            <input
              type="text"
              placeholder="Matrícula"
              {...register("matricula")}
            />
            {errors.matricula && <MessageError>{errors.matricula.message}</MessageError>}
          </Fieldset>
          <Fieldset>
            <input
              type="text"
              placeholder="Curso"
              {...register("curso")}
            />
            {errors.curso && <MessageError>{errors.curso.message}</MessageError>}
          </Fieldset>
          <Fieldset>
            <input
              type="text"
              placeholder="Turno"
              {...register("turno")}
            />
            {errors.turno && <MessageError>{errors.turno.message}</MessageError>}
          </Fieldset>
          <Fieldset>
            <input
              type="password"
              placeholder="Senha"
              {...register("senha")}
            />
            {errors.senha && <MessageError>{errors.senha.message}</MessageError>}
          </Fieldset>

          {student && student.id ? (
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