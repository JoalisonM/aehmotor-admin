import { styled } from "../../styles";

export const InputContainer = styled("div", {
  width: '100%',
  position: 'relative',

  input: {
    width: '100%',
    border: 0,
    backgroundColor: '$gray800',
  },

  button: {
    border: 0,
    position: 'absolute',
    top: '15px',
    right: '10px',
    color: '$gray100',
    backgroundColor: 'transparent',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});