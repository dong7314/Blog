import { style, styleVariants } from "@vanilla-extract/css";

export const iconButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  borderRadius: "50%",
  transition: "all .2s ease-out",
  ":hover": {
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
});

export const disabled = style({
  ":hover": {
    cursor: "default",
    backgroundColor: "transparent",
  },
});

export const iconButtonSize = styleVariants({
  xs: {
    width: "1.25rem",
    height: "1.25rem",
  },
  s: {
    width: "1.375rem",
    height: "1.375rem",
  },
  m: {
    width: "1.5rem",
    height: "1.5rem",
  },
  l: {
    width: "1.75rem",
    height: "1.75rem",
  },
  xl: {
    width: "2rem",
    height: "2rem",
  },
  h: {
    width: "2.25rem",
    height: "2.25rem",
  },
});
