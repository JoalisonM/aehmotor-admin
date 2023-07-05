import { styled } from "../../styles";

export const HomeContainer = styled('main', {
  height: '100vh',
  maxWidth: "65rem",
  padding: '2rem 3rem',

  display: 'flex',
  flexDirection: 'column',

  h1: {
    color: '$gray100',
    fontSize: '$xxl',
    marginBottom: '2rem',
  },
});

export const CardContainer = styled('form', {
  maxWidth: '70rem',

  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '4rem',
});

export const Card = styled('form', {
  width: '20rem',
  padding: '1.5rem',
  borderRadius: 6,
  backgroundColor: '$gray700',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  h2: {
    fontSize: '$md',
    color: '$gray100',
  },

  div: {
    fontSize: '$sm',
    fontWeight: 700,
    color: '$blue400',
    marginBottom: '1rem',

    display: 'flex',
    justifyContent: 'space-between',
  },

  fieldset: {
    all: 'unset',
    border: 0,
    display: "flex",
    flexDirection: "column",

    '&+fieldset': {
      'marginTop': '1rem',
    },
  },
});

export const Button = styled('button', {
  border: 0,
  height: '2.5rem',
  borderRadius: 100,
  marginTop: '2rem',
  cursor: 'pointer',
  color: '$gray100',
  fontWeight: 700,

  variants: {
    variant: {
      default: {
        backgroundColor: '$red700',
        cursor: 'not-allowed',
      },
      blue: {
        background: '$blue500',
        transition: 'filter 0.2s',

        '&:hover': {
          filter: 'brightness(0.9)',
        },
      },
      red: {
        background: '$red500',
        transition: 'background 0.2s',

        '&:hover': {
          background: '$red700',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  }
});