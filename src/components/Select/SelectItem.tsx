import React, { ReactNode } from "react";
import * as Select from '@radix-ui/react-select';
import { Check } from "phosphor-react";

import { StyledItem, StyledItemIndicator } from "./styles";

interface SelectItemProps {
  value: string;
  children: ReactNode;
}

export const SelectItem = React.forwardRef<HTMLInputElement, SelectItemProps>(({children, value}, ref) => {
  return (
    <StyledItem value={value} ref={ref}>
      <Select.ItemText>{children}</Select.ItemText>
      <StyledItemIndicator>
        <Check weight='bold' />
      </StyledItemIndicator>
    </StyledItem>
  );
});