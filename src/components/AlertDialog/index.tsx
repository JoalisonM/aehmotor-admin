import * as Toast from "@radix-ui/react-toast";
import * as AlertDialogRadix from '@radix-ui/react-alert-dialog';

import {
  Flex,
  Button,
  AlertDialogTitle,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogDescription,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from './styles';

interface AlertDialogProps {
  id: number;
  description: string;
  onClickAction: (value: number) => void;
}

export const AlertDialog = (props: AlertDialogProps) => {
  const {
    id,
    description,
    onClickAction,
  } = props;
  return (
    <AlertDialogRadix.Portal>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <Flex css={{ justifyContent: 'flex-end' }}>
          <AlertDialogRadix.Cancel asChild>
            <Button variant="white" css={{ marginRight: 25 }} >
              Cancelar
            </Button>
          </AlertDialogRadix.Cancel>
          <AlertDialogRadix.Action asChild>
            <Button
              variant="red"
              onClick={() => onClickAction(id)}
            >
              Sim, deletar
            </Button>
          </AlertDialogRadix.Action>
        </Flex>
      </AlertDialogContent>
    </AlertDialogRadix.Portal>
  );
};