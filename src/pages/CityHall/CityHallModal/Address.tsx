import { FieldErrors, UseFormRegister } from "react-hook-form";

import { NewAddressFormInputs } from ".";
import { Fieldset, MessageError } from "./styles";
import { Select, Option } from "../../../styles/components/select";
import { EmployeeProps } from "../../../api/employee";
import { PersonProps } from "../../../api/person";

const cities = [
  {
    nome: "Sapé",
    codigoIbge: 2515302,
  },
  {
    nome: "Guarabira",
    codigoIbge: 2506301,
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
        <input
          type="text"
          placeholder="Cep"
          {...register("cep")}
        />
        {errors.cep && <MessageError>{errors.cep.message}</MessageError>}
      </Fieldset>
      <Fieldset>
        <input
          type="text"
          placeholder="Logradouro"
          {...register("logradouro")}
        />
        {errors.logradouro && <MessageError>{errors.logradouro.message}</MessageError>}
      </Fieldset>
      <Fieldset>
        <input
          type="number"
          placeholder="Número"
          {...register("numero", { valueAsNumber: true })}
        />
        {errors.numero && <MessageError>{errors.numero.message}</MessageError>}
      </Fieldset>
      <Fieldset>
        <input
          type="text"
          placeholder="Referência"
          {...register("referencia")}
        />
        {errors.referencia && <MessageError>{errors.referencia.message}</MessageError>}
      </Fieldset>
      <Fieldset>
        <input
          type="text"
          placeholder="Complemento"
          {...register("complemento")}
        />
        {errors.complemento && <MessageError>{errors.complemento.message}</MessageError>}
      </Fieldset>

      <Fieldset>
        <Select
          placeholder="Pessoa"
          {...register("id_pessoa")}
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
        {errors.id_pessoa && <MessageError>{errors.id_pessoa.message}</MessageError>}
      </Fieldset>
      <Fieldset>
        <Select
          placeholder="Cidade"
          {...register("id_cidade")}
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
        {errors.id_cidade && <MessageError>{errors.id_cidade.message}</MessageError>}
      </Fieldset>
    </>
  );
};