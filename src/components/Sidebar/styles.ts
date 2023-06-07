import { NavLink } from "react-router-dom";

import { styled } from "../../styles"

export const Aside = styled("aside", {
  display: "flex",
  flexDirection: "column",

  height: "100vh",
  padding: "2rem 3rem",
  background: "$gray800",
});

export const Header = styled("div", {
  fontSize: "$lg",
  fontWeight: "700",
  padding: "0 0 1rem",
});

export const Item = styled(NavLink, {
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",

  padding: "0.6rem 0",
  textDecoration: "none",
  color: "$gray100",

  svg: {
  },

  "&.active": {
    color: "$blue400",
  }
});
