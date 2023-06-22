import { styled } from "../../styles";

export const SearchFormContainer = styled("form", {
  display: "flex",
  gap: "1rem",
  width: '35.5rem',

  input: {
    flex: "1",
    borderRadius: "6px",
    border: "0",
    background: "$gray800",
    color: "$gray300",
    padding: "1rem",

    "&::placeholder": {
      color: "$gray500",
    },
  },
});