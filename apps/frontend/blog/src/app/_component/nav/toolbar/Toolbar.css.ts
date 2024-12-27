import { style } from "@vanilla-extract/css";

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "490px",
});

export const searchBar = style({
  display: "inline-flex",
  marginRight: "20px",
});

export const loginButton = style({
  display: "inline-flex",
  marginLeft: "8px",
});
