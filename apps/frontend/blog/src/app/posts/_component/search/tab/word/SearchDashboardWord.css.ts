import { style } from "@vanilla-extract/css";

export const wordContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "80%",
});

export const countContainer = style({
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
  marginBottom: "24px",
});

export const count = style({
  color: "#262626",
  marginRight: "1px",
  fontWeight: 500,
});

export const postItemContainer = style({
  display: "flex",
  width: "100%",
  flexWrap: "wrap",
  justifyContent: "center",
});
