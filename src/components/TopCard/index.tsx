import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { HeaderContainer } from "./styles";
import { Button } from "../../styles/components";

interface TopCardProps {
  title: string;
  buttonTitle: string;
  children: ReactNode;
  onShowModal: () => void;
}

export const TopCard = (props: TopCardProps) => {
  const {
    title,
    children,
    onShowModal,
    buttonTitle,
  } = props;
  return (
    <HeaderContainer>
      <h1>{title}</h1>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button onClick={() => onShowModal()} >
            {buttonTitle}
          </Button>
        </Dialog.Trigger>

        {children}
      </Dialog.Root>
    </HeaderContainer>
  );
};