import { style } from "@vanilla-extract/css";

export const menuBar = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

export const menu = style({
  display: "flex",
  margin: "0",
  padding: "0",
  listStyle: "none",
});

export const menuButtons = style({
  display: "flex",
  alignItems: "center",
});
