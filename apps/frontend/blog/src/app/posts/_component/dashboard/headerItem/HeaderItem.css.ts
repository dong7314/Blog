import { style } from "@vanilla-extract/css";

export const headerItem = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: "20px 12px",
  ":hover": {
    cursor: "pointer",
  },
});
