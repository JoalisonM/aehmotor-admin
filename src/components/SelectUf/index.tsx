import * as Select from '@radix-ui/react-select';
import { CaretDown, CaretUp } from "phosphor-react";

import {
  SelectTrigger,
  SelectIcon,
  SelectContent,
  SelectViewport,
  SelectLabel,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./styles";
import { SelectItem } from './SelectItem';
import { useUfs } from '../../hooks/useUfs';

export const SelectUf = () => {
  const { ufs } = useUfs();
  return (
    <Select.Root>
    <SelectTrigger aria-label="Uf">
      <Select.Value placeholder="Selecionar uma uf" />
      <SelectIcon>
        <CaretDown />
      </SelectIcon>
    </SelectTrigger>
    <Select.Portal>
      <SelectContent>
        <SelectScrollUpButton>
          <CaretUp />
        </SelectScrollUpButton>
        <SelectViewport>
          <Select.Group>
            <SelectLabel>Ufs</SelectLabel>
              {ufs && ufs.map((uf) => (
                <SelectItem
                  key={uf.codigoUf}
                  value={uf.uf}
                >
                  {`${uf.nome} - ${uf.uf}`}
                </SelectItem>
            ))}
          </Select.Group>
        </SelectViewport>
        <SelectScrollDownButton>
          <CaretDown />
        </SelectScrollDownButton>
      </SelectContent>
    </Select.Portal>
  </Select.Root>
  );
};