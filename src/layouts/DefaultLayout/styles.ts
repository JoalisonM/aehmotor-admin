import { styled } from "../../styles"

export const LayoutContainer = styled("main", {
  margin: "0 auto",
  display: 'grid',
  gap: '2rem',
  alignItems: 'flex-start',

  variants: {
    menuShown: {
      true: {
        gridTemplateColumns: '256px 1fr',
      },
      false: {
        gridTemplateColumns: '80px 1fr',
      }
    }
  }
});
