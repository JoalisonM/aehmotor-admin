import { styled } from "..";

export const Button = styled('button', {
  border: 0,
  fontWeight: 700,
  borderRadius: '6px',
  cursor: 'pointer',

  gap: '0.75rem',
  display: 'flex',
  alignItems: 'center',

  variants: {
    variant: {
      default: {
        height: '2.5rem',
        background: '$blue500',
        color: '$gray100',
        padding: '0 1.25rem',
        transition: 'filter 0.2s',

        '&:disabled': {
          opacity: '0.6',
          cursor: 'not-allowed',
        },

        '&:hover': {
          filter: 'brightness(0.9)',
        },
      },

      outlined: {
        color: '$blue400',
        padding: '0 1.3rem',
        background: 'transparent',
        border: '2px solid $blue400',
        transition: 'background 0.1s, color 0.1s, border 0.1s',

        '&:not(:disabled):hover': {
          background: '$blue500',
          border: '1px solid $blue500',
          color: '$gray100',
        }
      },

      icon: {
        color: '$gray100',
        background: 'transparent',
        transition: 'color 0.1s',

        '&:hover': {
          color: '$blue500',
        },
      },
    },

    hover: {
      danger: {
        transition: 'color 0.1s',

        '&:hover': {
          color: '$red500',
        },
      },
    },
  }
});