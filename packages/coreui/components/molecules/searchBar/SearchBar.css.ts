import { style, styleVariants } from "@vanilla-extract/css";

export const searchBar = style({
  display: "inline-flex",
  position: "relative",
});

export const iconButton = style({
  display: "inline-flex",
  position: "absolute",
  left: "10px",
  top: "50%",
  transform: "translateY(-50%)",
});

export const overrideInput = style({
  paddingLeft: "40px !important",
});
