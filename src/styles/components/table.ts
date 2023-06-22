import { styled } from "..";

export const Table = styled("table", {
  borderCollapse: "separate",
  borderSpacing: "0 0.5rem",
  padding: '2rem 0 0',

  th: {
    textAlign: "left",
    padding: "0 1rem",
  },

  td: {
    padding: "1.25rem 1rem",
    background: "$gray700",

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