import { globalCss } from ".";

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  ':focus': {
    outline: 0,
    boxShadow: '$solidBlueShadow',
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400,
  },

  a: {
    textDecoration: 'none',
  },

  svg: {
    lineHeight: 0,
  },

  '.leaflet-container': {
    width: '100%',
    height: '30rem',
  }
});