import { style } from "@vanilla-extract/css";

export const anchorItem = style({
  display: "flex",
  paddingBlock: "4px",
  borderLeft: "2px solid #dbdbdb",
  boxSizing: "border-box",
  transition: "all .2s ease-out",
  ":hover": {
    cursor: "pointer",
  },
});

export const active = style({
  borderLeft: "2px solid #262626",
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
