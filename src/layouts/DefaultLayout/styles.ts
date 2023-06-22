import { styled } from "../../styles"

export const LayoutContainer = styled("div", {
  margin: "0 auto",
  display: 'grid',
  gap: '2rem',
  alignItems: 'flex-start',
  padding: '0 2rem 0 0',

  variants: {
    menuShown: {
      true: {
        gridTemplateColumns: '256px 1fr',
      },
      false: {
        gridTemplateColumns: '80px 1fr',
      }
    }
  },

  '@media(max-width: 768px)': {
    html: {
      fontsize: '$sm',
    },
  }
});
