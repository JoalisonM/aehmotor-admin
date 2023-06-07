import * as Select from '@radix-ui/react-select';
import { styled } from "../../styles";

export const SelectTrigger = styled(Select.SelectTrigger, {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '$sm',
  lineHeight: 1,
  padding: "1rem",
  gap: '1rem',
  borderRadius: 6,
  border: 0,
  background: "$gray900",
  color: "$gray400",
});

export const SelectIcon = styled(Select.SelectIcon, {
  color: "$blue300",
});

export const SelectContent = styled(Select.Content, {
  overflow: 'hidden',
  backgroundColor: '$gray100',
  borderRadius: 6,
});

export const SelectViewport = styled(Select.Viewport, {
  padding: 5,
});

export const StyledItem = styled(Select.Item, {
  lineHeight: 1,
  color: "$blue400",
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 35px 0 35px',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: "$gray300",
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: "$blue400",
    color: "$gray100",
  },
});

export const SelectSeparator = styled(Select.Separator, {
  height: 1,
  backgroundColor: "$blue400",
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
  backgroundColor: '$gray100',
  color: "$blue400",
  cursor: 'default',
};

export const SelectScrollUpButton = styled(Select.ScrollUpButton, scrollButtonStyles);

export const SelectScrollDownButton = styled(Select.ScrollDownButton, scrollButtonStyles);