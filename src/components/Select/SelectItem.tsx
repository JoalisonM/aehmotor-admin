import { ReactNode } from "react";
import { Check } from "phosphor-react";
import { RefCallBack } from "react-hook-form";
import * as Select from '@radix-ui/react-select';

import { StyledItem, StyledItemIndicator } from "./styles";

interface SelectItemProps {
  value: string;
  ref: RefCallBack;
  children: ReactNode;
  onChangeValue: (value: any) => void;
}

export const SelectItem = (props: SelectItemProps) => {
  const {
    ref,
    value,
    children,
    onChangeValue,
  } = props;

  // const handleChangeValue = (value: any) => {
  //   console.log(value);
  // };

  return (
    <StyledItem
      ref={ref}
      value={value}
      onChange={(event) => handleChangeValue(event.target)}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <StyledItemIndicator>
        <Check weight='bold' />
      </StyledItemIndicator>
    </StyledItem>
  );
};