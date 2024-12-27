import { style } from "@vanilla-extract/css";

export const logo = style({
  display: "inline-flex",
  ":hover": {
    cursor: "pointer",
  },
});
