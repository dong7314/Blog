import { style } from "@vanilla-extract/css";

export const content = style({
  display: "flex",
  paddingLeft: "4px",
  marginBottom: "24px",
});

export const addButton = style({
  display: "flex",
  justifyContent: "space-between",
});

export const button = style({
  display: "inline-flex",
  alignItems: "center",
  ":hover": {
    cursor: "pointer",
  },
});

export const textButton = style({
  marginTop: "0.5px",
  marginLeft: "4px",
});

export const arrowIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "16px",
  height: "16px",
  padding: "1px",
  marginLeft: "4px",
  boxSizing: "border-box",
});
