import { ReactNode } from "react";
import * as Select from '@radix-ui/react-select';
import { Check } from "phosphor-react";

import { StyledItem, StyledItemIndicator } from "./styles";

interface SelectItemProps {
  value: string;
  children: ReactNode;
}

export const SelectItem = ({ children, value }: SelectItemProps) => {
  return (
    <StyledItem value={value}>
      <Select.ItemText>{children}</Select.ItemText>
      <StyledItemIndicator>
        <Check />
      </StyledItemIndicator>
    </StyledItem>
  );
};