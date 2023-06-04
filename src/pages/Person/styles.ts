import {styled} from "../../styles"

export const Container = styled("section", {
  width: "100%",
  maxWidth: "1120px",
  margin: "4rem auto 0",
  padding: "0 1.5rem",

  display: "flex",
  flexDirection: "column",
  gap: "2rem",

  h1: {
    fontSize: "$xxl",
  },
});

export const Header = styled("div", {
  width: "100%",

  display: "flex",
  justifyContent: "space-between",
});

export const NewPersonButton = styled("button", {
  height: "40px",
  border: "0",
  background: "$blue500",
  color: "$gray100",
  fontWeight: "700",
  padding: "0 1.25rem",
  borderRadius: "6px",
  cursor: "pointer",
});

export const PersonTable = styled("table", {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 0.5rem",
  marginTop: "1.5rem",

  td: {
    padding: "1.25rem 2rem",
    background: "$gray700",

    svg: {
      cursor: "pointer",
      transition: "color 0.3s",

      "&:hover": {
        color: "$red500",
      },
    },

    "&:first-child": {
      borderTopLeftRadius: "6px",
      borderBottomLeftRadius: "6px",
    },

    "&:last-child": {
      borderTopRightRadius: "6px",
      borderBottomRightRadius: "6px",
    }
  },
});
