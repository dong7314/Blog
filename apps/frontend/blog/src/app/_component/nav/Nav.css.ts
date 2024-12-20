import { style } from "@vanilla-extract/css";

export const nav = style({
  display: "flex",
  flexDirection: "column",
  width: "300px",
  height: "100%",
  paddingInline: "2rem",
  paddingBlock: "1.25rem",
  boxSizing: "border-box",
  borderRight: "1px solid #ededed",
  boxShadow: "0 4px 20px #0000000f",
});
