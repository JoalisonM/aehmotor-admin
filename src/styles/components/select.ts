import { styled } from "..";

export const Select = styled('select', {
  fontSize: '$sm',
  padding: "1rem",
  borderRadius: 6,
  border: 0,
  cursor: 'pointer',
  background: "$gray900",
  color: "$gray400",
  // appearance: 'none',
});

export const Option = styled("option", {
  padding: '1rem !important',
  backgroundColor: '$gray100 !important',
});