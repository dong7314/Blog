import { style } from "@vanilla-extract/css";

export const toolbar = style({
  display: "flex",
  alignItems: "center",
});

export const searchBar = style({
  display: "inline-flex",
  marginRight: "35px",
  width: "270px",
});

export const loginButton = style({
  display: "inline-flex",
  marginLeft: "16px",
});

export const iconButton = style({
  display: "inline-flex",
  marginLeft: "8px",
});
