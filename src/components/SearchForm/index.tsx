import * as z from "zod";
import { useForm } from "react-hook-form";
import { MagnifyingGlass } from "phosphor-react"
import { zodResolver } from "@hookform/resolvers/zod";

import { SearchFormContainer } from "./styles";
import { Button } from "../../styles/components/button";

const filterFormSchema = z.object({
  filter: z.string(),
});

type FilterFormInputs = z.infer<typeof filterFormSchema>

interface SearchFormProps {
  placeholder: string;
  onSearchAll: () => Promise<void>;
  onSearchFilter: (filter: string) => void;
}

export const SearchForm = (props: SearchFormProps) => {
  const { placeholder, onSearchFilter, onSearchAll } = props;
  const {
    register,
    handleSubmit,
  } = useForm<FilterFormInputs>({
    resolver: zodResolver(filterFormSchema),
  });

  const handleSubmitFilter = async (value: FilterFormInputs) => {
    const { filter } = value;

    if (filter.length > 0) {
      await onSearchFilter(filter);
    } else {
      await onSearchAll();
    }
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSubmitFilter)}>
      <input
        type="text"
        placeholder={placeholder}
        {...register("filter")}
      />

      <Button
        type="submit"
        variant="outlined"
      >
        <MagnifyingGlass size={20} />
        Buscar
      </Button>
    </SearchFormContainer>
  )
}
