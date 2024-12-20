import { style } from "@vanilla-extract/css";

export const logo = style({
  display: "inline-flex",
  marginBottom: "2rem",
  fontSize: "3rem",
  fontStyle: "normal",
  fontFamily: "Fredoka",
  color: "#262626",
  fontWeight: 500,
  ":hover": {
    cursor: "pointer",
  },
});
