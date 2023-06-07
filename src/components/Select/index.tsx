import * as SelectRadix from '@radix-ui/react-select';
import { CaretDown, CaretUp } from "phosphor-react";

import {
  SelectTrigger,
  SelectIcon,
  SelectContent,
  SelectViewport,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./styles";
import { SelectItem } from './SelectItem';

interface SelectProps {
  items: Array<any>;
  options: {
    title: string;
    value: string;
  };
  placeholder: string;
}

export const Select = ({items, options, placeholder}: SelectProps) => {
  return (
    <select placeholder={placeholder}>
      {items.map((item) => (
        <option
          key={item[options["value"]]}
          value={item[options["value"]]}
        >
          {item[options["title"]]}
        </option>
      ))}
    </select>
  );
};