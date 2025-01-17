import { style } from "@vanilla-extract/css";

export const headerItem = style({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  width: "52px",
  alignItems: "center",
  paddingBlock: "20px",
  marginInline: "6px",
  borderBottom: "2px solid transparent",
  transition: "border-bottom .2s ease-out",
  ":hover": {
    cursor: "pointer",
  },
});

export const active = style({
  borderBottom: "2px solid #262626",
});
