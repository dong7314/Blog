import { style, styleVariants } from "@vanilla-extract/css";

export const searchBar = style({
  position: "relative",
  display: "inline-flex",
  width: "100%",
});

export const iconButton = style({
  display: "inline-flex",
  position: "absolute",
  top: "50%",
  left: "10px",
  transform: "translateY(-50%)",
});

export const closeIconButton = style({
  display: "inline-flex",
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  opacity: 0,
  visibility: "hidden",
  transition: "all .1s ease-out",
});

export const active = style({
  opacity: 1,
  visibility: "visible",
});

export const overrideInput = style({
  paddingLeft: "40px !important",
});
