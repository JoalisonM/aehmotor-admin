import { ReactNode } from "react";
import * as ToastRadix from "@radix-ui/react-toast";

import {
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from "./styles";

interface ToastProps {
  id: number;
  icon: ReactNode;
  openToast: boolean;
  onOpenToast: (value: boolean) => void;
  onClickAction: (value?: number) => void;
}

export const Toast = (props: ToastProps) => {
  const { id, icon, openToast, onOpenToast, onClickAction } = props;

  return (
    <ToastRadix.Provider duration={3000}>
      <button onClick={() => onClickAction(id)}>
        {icon}
      </button>

      <ToastRoot open={openToast} onOpenChange={onOpenToast}>
        <ToastTitle>Veículo deletada com sucesso!</ToastTitle>
      </ToastRoot>
      <ToastViewport />
    </ToastRadix.Provider>
  );
};