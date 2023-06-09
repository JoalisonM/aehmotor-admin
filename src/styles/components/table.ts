import { styled } from "..";

export const Table = styled("table", {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 0.5rem",
  marginTop: "1.5rem",

  button: {
    background: "transparent",
    border: 0,
    color: "$gray100",

    svg: {
      cursor: "pointer",
      transition: "color 0.3s",

      "&:hover": {
        color: "$red500",
      },
    },
  },

  th: {
    textAlign: "left",
    padding: "0 1rem",
  },

  td: {
    padding: "1.25rem 1rem",
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