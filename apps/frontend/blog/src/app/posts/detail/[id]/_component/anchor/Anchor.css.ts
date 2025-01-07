import { style } from "@vanilla-extract/css";

export const anchorContainer = style({
  position: "sticky",
  top: "72px",
  display: "flex",
  flexDirection: "column",
  width: "300px",
  height: "70%",
  paddingLeft: "50px",
  boxSizing: "border-box",
});

export const anchor = style({
  display: "flex",
  paddingBlock: "3px",
  borderLeft: "1px solid #a5a5a5",
  boxSizing: "border-box",
  ":hover": {
    cursor: "pointer",
  },
});

export const h1 = style({
  paddingLeft: "10px",
});

export const h2 = style({
  paddingLeft: "22px",
});

export const h3 = style({
  paddingLeft: "34px",
});
