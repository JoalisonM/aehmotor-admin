import * as Select from '@radix-ui/react-select';
import { styled } from "../../styles";

export const SelectTrigger = styled(Select.SelectTrigger, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 14,
  lineHeight: 1,
  height: 35,
  gap: 5,
  backgroundColor: 'white',
  color: "$gray500",
});

export const SelectIcon = styled(Select.SelectIcon, {
  color: "$blue300",
});

export const SelectContent = styled(Select.Content, {
  overflow: 'hidden',
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
});

export const SelectViewport = styled(Select.Viewport, {
  padding: 5,
});

export const StyledItem = styled(Select.Item, {
  lineHeight: 1,
  color: "$blue300",
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: "$gray300",
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: "$blue300",
    color: "$gray100",
  },
});

export const SelectLabel = styled(Select.Label, {
  padding: '0 25px',
  fontSize: 12,
  lineHeight: '25px',
  color: "$blue300",
});

export const SelectSeparator = styled(Select.Separator, {
  height: 1,
  backgroundColor: "$blue300",
  margin: 5,
});

export const StyledItemIndicator = styled(Select.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  backgroundColor: 'white',
  color: "$blue300",
  cursor: 'default',
};

export const SelectScrollUpButton = styled(Select.ScrollUpButton, scrollButtonStyles);

export const SelectScrollDownButton = styled(Select.ScrollDownButton, scrollButtonStyles);