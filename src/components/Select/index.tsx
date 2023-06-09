import { RefCallBack } from 'react-hook-form';
import { CaretDown, CaretUp } from "phosphor-react";
import * as SelectRadix from '@radix-ui/react-select';

import {
  SelectIcon,
  SelectLabel,
  SelectTrigger,
  SelectContent,
  SelectViewport,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./styles";
import { SelectItem } from './SelectItem';

interface SelectProps {
  value: any,
  items: Array<any>;
  options: {
    title: string;
    value: string;
  };
  label: string;
  ref: RefCallBack;
  placeholder: string;
  onChangeValue: (value: any) => void;
}

export const Select = (props: SelectProps) => {
  const {
    ref,
    items,
    label,
    value,
    options,
    placeholder,
    onChangeValue,
  } = props;

  return (
    <SelectRadix.Root>
    <SelectTrigger aria-label={label}>
      <SelectRadix.Value placeholder={placeholder} />
      <SelectIcon>
        <CaretDown />
      </SelectIcon>
    </SelectTrigger>
    <SelectRadix.Portal>
      <SelectContent>
        <SelectScrollUpButton>
          <CaretUp />
        </SelectScrollUpButton>
        <SelectViewport>
          <SelectRadix.Group>
            <SelectLabel>{label}</SelectLabel>
              {items && items.map((item) => {
                console.log("item: ", item);

                return (
                  <SelectItem
                    ref={ref}
                    key={item[options["value"]]}
                    onChangeValue={onChangeValue}
                    value={value}
                  >
                    {item[options["title"]]}
                  </SelectItem>
                );
              })}
          </SelectRadix.Group>
        </SelectViewport>
        <SelectScrollDownButton>
          <CaretDown />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectRadix.Portal>
  </SelectRadix.Root>
  );
};