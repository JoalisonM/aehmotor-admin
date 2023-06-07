import { MagnifyingGlass } from "phosphor-react"

import { SearchFormContainer } from "./styles";

interface SearchFormProps {
  placeholder: string;
}

export const SearchForm = ({ placeholder }: SearchFormProps) => {
  return (
    <SearchFormContainer>
      <input
        type="text"
        placeholder={placeholder}
      />

      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
