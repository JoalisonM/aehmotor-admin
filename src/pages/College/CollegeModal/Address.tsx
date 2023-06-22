import { FieldErrors, UseFormRegister } from "react-hook-form";

import { NewAddressFormInputs } from ".";
import { Fieldset, MessageError } from "./styles";
import { Select, Option } from "../../../styles/components/select";
import { PersonProps } from "../../../api/person";
import { Label } from "../../../styles/components/label";

const cities = [
  {
    nome: "Sapé",
    codigoIbge: 2515302,
  },
  {
    nome: "Guarabira",
    codigoIbge: 2506301,
  },
  {
    nome: "Mari",
    codigoIbge: 2509107,
  },
];

interface AddressFieldsProps {
  register: UseFormRegister<NewAddressFormInputs>;
  errors: FieldErrors<NewAddressFormInputs>;
  people: Array<PersonProps>
}

export const AddressFields = ({ register, errors, people }: AddressFieldsProps) => {
  return (
    <>
      <Fieldset>
        <Label htmlFor="cep">Cep:</Label>
        <input
          id="cep"
          type="text"
          placeholder="Cep"
          {...register("endereco.cep")}
        />
        {errors.endereco?.cep && <MessageError>{errors.endereco.cep.message}</MessageError>}
      </Fieldset>
      <Fieldset>
        <Label htmlFor="logradouro">Logradouro:</Label>
        <input
          id="logradouro"
          type="text"
          placeholder="Logradouro"
          {...register("endereco.logradouro")}
        />
        {errors.endereco?.logradouro && <MessageError>{errors.endereco.logradouro.message}</MessageError>}
      </Fieldset>
      <Fieldset>
        <Label htmlFor="numero">Número:</Label>
        <input
          id="numero"
          type="text"
          placeholder="Número"
          {...register("endereco.numero", { valueAsNumber: true })}
        />
        {errors.endereco?.numero && <MessageError>{errors.endereco.numero.message}</MessageError>}
      </Fieldset>
      <Fieldset>
        <Label htmlFor="referencia">Referência:</Label>
        <input
          id="referencia"
          type="text"
          placeholder="Referência"
          {...register("endereco.referencia")}
        />
        {errors.endereco?.referencia && <MessageError>{errors.endereco.referencia.message}</MessageError>}
      </Fieldset>
      <Fieldset>
        <Label htmlFor="complemento">Complemento:</Label>
        <input
          id="complemento"
          type="text"
          placeholder="Complemento"
          {...register("endereco.complemento")}
        />
        {errors.endereco?.complemento && <MessageError>{errors.endereco.complemento.message}</MessageError>}
      </Fieldset>

      <Fieldset>
        <Label htmlFor="usuario">Usuário:</Label>
        <Select
          id="usuario"
          placeholder="Usuário"
          {...register("endereco.id_pessoa", { valueAsNumber: true })}
        >
          {people && people.map((person) => (
            <Option
              key={person.id}
              value={person.id}
            >
              {person.nome}
            </Option>
          ))}
        </Select>
        {errors.endereco?.id_pessoa && <MessageError>{errors.endereco.id_pessoa.message}</MessageError>}
      </Fieldset>
      <Fieldset>
        <Label htmlFor="cidade">Cidade:</Label>
        <Select
          id="cidade"
          placeholder="Cidade"
          {...register("endereco.id_cidade", { valueAsNumber: true })}
        >
          {cities.map((city) => (
            <Option
              key={city.codigoIbge}
              value={city.codigoIbge}
            >
              {city.nome}
            </Option>
          ))}
        </Select>
        {errors.endereco?.id_cidade && <MessageError>{errors.endereco.id_cidade.message}</MessageError>}
      </Fieldset>
    </>
  );
};