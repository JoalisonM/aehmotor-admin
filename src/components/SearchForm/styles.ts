import { styled } from "../../styles";

export const SearchFormContainer = styled("form", {
  display: "flex",
  gap: "1rem",

  input: {
    flex: "1",
    borderRadius: "6px",
    border: "0",
    background: "$gray800",
    color: "$gray500",
    padding: "1rem",

    "&::placeholder": {
      color: "$gray300",
    },
  },

  button: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",

    padding: "0 1.3rem",
    background: "transparent",
    border: "1px solid $blue400",
    color: "$blue400",
    fontWeight: "700",
    borderRadius: "6px",
    cursor: "pointer",

    "&:disabled": {
      opacity: "0.6",
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      background: "$blue500",
      border: "1px solid $blue500",
      color: "$gray100",
      transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
    }
  },
});