import { NavLink } from "react-router-dom";
import * as Tooltip from '@radix-ui/react-tooltip';

import { styled } from "../../styles"

export const Aside = styled("aside", {
  display: "flex",
  gap: '1.2rem',
  flexDirection: "column",

  height: "100vh",
  background: "$gray800",

  variants: {
    menuShown: {
      true: {
        padding: "2rem 3rem",
      },
      false: {
        padding: "2rem 1rem",
      }
    }
  }
});

export const Header = styled("div", {
  fontSize: '$xl',
  fontWeight: "700",
  display: 'flex',
  alignItems: 'center',

  button: {
    border: 0,
    cursor: "pointer",
    color: "$gray100",
    lineHeight: 0,
    backgroundColor: 'transparent',
  },

  variants: {
    menuShown: {
      true: {
        justifyContent: 'space-between',
      },
      false: {
        justifyContent: 'center',
      }
    }
  },
});

export const Item = styled(NavLink, {
  lineHeight: 0,
  textDecoration: "none",
  color: "$gray100",

  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',

  "&.active": {
    color: "$blue400",
  },

  variants: {
    menuShown: {
      false: {
        justifyContent: 'center',
      }
    }
  }
});

export const TooltipContent = styled(Tooltip.Content, {
  borderRadius: 4,
  padding: '10px 15px',
  lineHeight: 1,
  color: '$gray100',
  backgroundColor: '$blue400',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  userSelect: 'none',
});

export const TooltipArrow = styled(Tooltip.Arrow, {
  fill: '$blue400',
});