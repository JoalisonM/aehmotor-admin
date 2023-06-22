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
import { useStudents } from "../../../hooks/useStudent";
import { useColleges } from "../../../hooks/useColleges";
import { Button, Label } from "../../../styles/components";
import { Select, Option } from "../../../styles/components/select";

const newStudentFormSchema = z.object({
  nome: z.string().nonempty("O nome é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  email: z.string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .toLowerCase(),
  nascimento: z.date()
    .max(new Date('2010-01-01'), { message: 'Novo demais para fazer faculdade' }),
  telefone: z.string().nonempty("O telefone é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  matricula: z.string().nonempty("A matrícula é obrigatória")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  curso: z.string().nonempty("O curso é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  turno: z.string().nonempty("O turno é obrigatório")
    .trim()
    .min(1, { message: "Deve ter mais de 1 caractere"}),
  id_instituicao_ensino: z.string().nonempty("A faculdade é obrigatória"),
  senha: z.string()
    .trim()
    .min(6, "A senha precisa de no mínimo 6 caracteres"),
});

type NewStudentFormInputs = z.infer<typeof newStudentFormSchema>

export const StudentModal = () => {
  const {
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewStudentFormInputs>({
    resolver: zodResolver(newStudentFormSchema),
  });
  const { colleges, fetchColleges } = useColleges();
  const { createStudent, student, updateStudent } = useStudents();

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  useEffect(() => {
    setValue("nome", student.nome);
    setValue("email", student.email);
    setValue("senha", student.senha);
    setValue("telefone", student.telefone);
    setValue("curso", student.curso);
    setValue("matricula", student.matricula);
    setValue("turno", student.turno);
    setValue("id_instituicao_ensino", String(student.id_instituicao_ensino));
    setValue("nascimento", new Date(student.nascimento));
  }, [student]);

  const handleCreateNewStudent = async (data: NewStudentFormInputs) => {
    const { nome, email, nascimento, telefone, senha,
      curso, matricula, turno, id_instituicao_ensino
    } = data;
    const formattedDateString = format(nascimento, "yyyy/MM/dd");


    if (!student.id) {
      createStudent({
        nome,
        email,
        nascimento: formattedDateString,
        telefone,
        senha,
        curso,
        matricula,
        turno,
        id_instituicao_ensino: Number(id_instituicao_ensino),
      });

      reset();
    } else {
      updateStudent({
        id: student.id,
        nome,
        email,
        nascimento: formattedDateString,
        telefone,
        senha,
        curso,
        matricula,
        turno,
        id_instituicao_ensino: Number(id_instituicao_ensino),
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
            <Label htmlFor="faculdade">Instituição de ensino:</Label>
            <Select
              id="faculdade"
              {...register("id_instituicao_ensino")}
            >
              {colleges && colleges.map((college) => (
                <Option
                  key={college.id}
                  value={college.id}
                >
                  {college.nome}
                </Option>
              ))}
            </Select>
            {errors.id_instituicao_ensino && <MessageError>{errors.id_instituicao_ensino.message}</MessageError>}
          </Fieldset>
          <Fieldset>
            <Label htmlFor="matricula">Matrícula:</Label>
            <input
              id="matricula"
              type="text"
              placeholder="Matrícula"
              {...register("matricula")}
            />
            {errors.matricula && <MessageError>{errors.matricula.message}</MessageError>}
          </Fieldset>
          <Fieldset>
            <Label htmlFor="curso">Curso:</Label>
            <input
              id="curso"
              type="text"
              placeholder="Curso"
              {...register("curso")}
            />
            {errors.curso && <MessageError>{errors.curso.message}</MessageError>}
          </Fieldset>
          <Fieldset>
            <Label htmlFor="turno">Turno:</Label>
            <input
              id="turno"
              type="text"
              placeholder="Turno"
              {...register("turno")}
            />
            {errors.turno && <MessageError>{errors.turno.message}</MessageError>}
          </Fieldset>
          <Fieldset>
            <Label htmlFor="senha">Senha:</Label>
            <input
              id="senha"
              type="password"
              placeholder="Senha"
              {...register("senha")}
            />
            {errors.senha && <MessageError>{errors.senha.message}</MessageError>}
          </Fieldset>

          {student && student.id ? (
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