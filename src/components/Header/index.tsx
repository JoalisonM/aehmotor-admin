import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { HeaderContainer } from "./styles";
import { Button } from "../../styles/components";

interface HeaderProps {
  title: string;
  buttonTitle: string;
  children: ReactNode;
  onShowModal: () => void;
}

export const Header = (props: HeaderProps) => {
  const { title, buttonTitle, children, onShowModal } = props;
  return (
    <HeaderContainer>
      <h1>{title}</h1>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button
            variant="default"
            onClick={() => onShowModal()}
          >
            {buttonTitle}
          </Button>
        </Dialog.Trigger>

        {children}
      </Dialog.Root>
    </HeaderContainer>
  );
};