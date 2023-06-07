import { createStitches } from "@stitches/react";

export const {
  css,
  theme,
  config,
  styled,
  globalCss,
  keyframes,
  getCssText,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      white: '#FFF',

      gray900: '#121214',
      gray800: '#202024',
      gray700: '#29292E',
      gray500: '#7C7C8A',
      gray300: '#c4c4cc',
      gray100: '#e1e1e6',

      blue300: '#596DB9',
      blue400: '#698DF6',
      blue500: '#3F61F1',
      blue900: '#0D1E31',

      red300: '#F75A68',
      red500: '#AB222E',
      red700: '#7A1921',
    },

    fontSizes: {
      sm: '0.875rem',
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
    }
  }
});