import * as Dialog from "@radix-ui/react-dialog";

import { styled, keyframes } from "../../../styles";

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

export const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  inset: "0", // top: 0, bottom: 0, right: 0, left: 0
  background: "rgba(0, 0, 0, 0.75)",
  display: 'grid',
  placeItems: 'center',
  padding: '3rem',
  overflowY: 'auto',
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const Content = styled(Dialog.Content, {
  maxHeight: "38rem",
  minWidth: "32rem",
  borderRadius: "6px",
  padding: "2.5rem 3rem",
  background: "$gray800",
  overflowY: 'auto',

  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  "&:focus": { outline: "none" },

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
      marginTop: "1.5rem",
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

export const Fieldset = styled("div", {
  display: "flex",
  border: "0",
  flexDirection: "column",
});

export const MessageError = styled("span", {
  color: "$red300",
  marginTop: "0.4rem",
});