import { style, styleVariants } from "@vanilla-extract/css";

export const outlineInput = style({
  display: "flex",
  position: "relative",
  minWidth: "100px",
  border: "none",
});

export const label = style({
  display: "inline-flex",
  position: "absolute",
});

export const inlineInput = style({
  padding: "8px 12px",
  outline: "none",
  border: "1px solid #dbdbdb",
  borderRadius: "4px",
  boxSizing: "border-box",
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
