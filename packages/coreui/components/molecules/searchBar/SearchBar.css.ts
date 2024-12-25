import { style, styleVariants } from "@vanilla-extract/css";

export const searchBar = style({
  display: "inline-flex",
  position: "relative",
});

export const iconButton = style({
  display: "inline-flex",
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
});

export const overrideInput = style({
  paddingRight: "40px !important",
});
