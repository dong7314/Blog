import { style } from "@vanilla-extract/css";

export const confirm = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
});

export const confirmButtonBox = style({
  display: "flex",
  justifyContent: "flex-end",
});

export const confirmButton = style({
  minWidth: "70px",
  marginLeft: "8px",
});
