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
  borderBottom: "1px solid #ededed",
});

export const navDefaultContent = style({
  display: "flex",
  alignItems: "center",
  width: "1400px",
});

export const header = style({
  height: "65px",
});

export const bottom = style({
  height: "55px",
});
