import { style } from "@vanilla-extract/css";

export const terms = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginTop: "16px",
  padding: "1px",
});

export const termSeperate = style({
  width: "100%",
  height: "1px",
  marginBlock: "16px",
  backgroundColor: "#ededed",
});

export const checkbox = style({
  display: "flex",
  justifyContent: "space-between",
});

export const lastCheckbox = style({
  marginTop: "12px",
  marginBottom: "16px",
});

export const telegram = style({
  display: "inline-flex",
  alignItems: "center",
  ":hover": {
    cursor: "pointer",
  },
});
