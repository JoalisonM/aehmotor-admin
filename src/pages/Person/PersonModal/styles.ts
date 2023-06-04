import * as Dialog from "@radix-ui/react-dialog";

import { styled } from "../../../styles";

export const Overlay = styled(Dialog.Overlay,{
  position: "fixed",
  width: "100vw",
  height: "100vh",
  inset: "0", // top: 0, bottom: 0, right: 0, left: 0
  background: "rgba(0, 0, 0, 0.75)",
});

export const Content = styled(Dialog.Content, {
  minWidth: "32rem",
  borderRadius: "6px",
  padding: "2.5rem 3rem",
  background: "$gray800",

  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  form: {
    marginTop: "2rem",

    display: "flex",
    flexDirection: "column",
    gap: "1rem",

    input: {
      borderRadius: "6px",
      border: "0",
      background: "$gray900",
      color: "$gray300",
      padding: "1rem",

      "&::placeholder": {
        color: "$gray500",
      }
    },

    "button[type='submit']": {
      height: "50px",
      border: "0",
      background: "$blue500",
      color: "$gray100",
      fontWeight: "bold",
      padding: "0 1.25rem",
      borderRadius: "6px",
      marginTop: "1.5rem",
      cursor: "pointer",

      "&:disabled": {
        opacity: "0.6",
        cursor: "not-allowed",
      },

"      &:not(:disabled):hover": {
        filter: "brightness(0.8)",
        transition: "filter 0.2s",
      }
    }
  }
});

export const CloseButton = styled(Dialog.Close, {
  position: "absolute",
  background: "transparent",
  border: "0",
  top: "1.5rem",
  right: "1.5rem",
  lineHeight: "0",
  cursor: "pointer",
  color: "$gray500",
});

export const Row = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const MessageError = styled("span", {
  color: "$red300",
  marginTop: "0.4rem",
});