import { style, styleVariants } from "@vanilla-extract/css";

export const textButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid transparent",
  transition: "all .15s ease-out",
  ":hover": {
    cursor: "pointer",
  },
});

export const disabled = style({
  ":hover": {
    cursor: "default",
    borderColor: "transparent",
  },
});
