import { style } from "@vanilla-extract/css";

export const detail = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

export const content = style({
  display: "flex",
  width: "1100px",
  height: "100%",
  paddingTop: "64px",
  marginLeft: "300px",
});
