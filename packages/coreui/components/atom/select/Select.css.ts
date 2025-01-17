import { style, styleVariants } from "@vanilla-extract/css";

export const selectContainer = style({
  display: "inline-flex",
  minWidth: "100px",
});

export const size = styleVariants({
  s: {
    height: "32px",
    fontSize: "0.875rem",
  },
  m: {
    height: "36px",
    fontSize: "0.875rem",
  },
  l: {
    height: "40px",
    fontSize: "1rem",
  },
});
