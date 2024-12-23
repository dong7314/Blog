import { style } from "@vanilla-extract/css";

export const logo = style({
  display: "inline-flex",
  marginBottom: "2px",
  ":hover": {
    cursor: "pointer",
  },
});
