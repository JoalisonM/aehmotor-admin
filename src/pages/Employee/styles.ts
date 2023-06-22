import { styled } from "../../styles";

export const Container = styled("main", {
  padding: "2rem 3rem",

  display: "flex",
  flexDirection: "column",
  gap: "2rem",

  h1: {
    fontSize: "$xxl",
  },
});