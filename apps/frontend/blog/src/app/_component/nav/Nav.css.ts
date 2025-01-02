import { style } from "@vanilla-extract/css";

export const nav = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  boxSizing: "border-box",
});

export const navBox = style({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  borderBottom: "1px solid #e6e6e6",
});

export const navDefaultContent = style({
  display: "flex",
  alignItems: "center",
  width: "1400px",
});

export const header = style({
  justifyContent: "space-between",
  height: "70px",
});

export const bottom = style({
  height: "55px",
});
