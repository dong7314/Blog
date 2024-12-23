import { style } from "@vanilla-extract/css";

export const menuLi = style({
  display: "inline-flex",
});

export const item = style({
  display: "flex",
  alignItems: "center",
  padding: "0.75rem",
  marginInline: "0.5rem",
  color: "#A5A5A5",
  fontSize: "1rem",
  fontFamily: "Pretendard",
  textDecoration: "none",
  transition: "all .15s ease-out",
  ":hover": {
    color: "#262626",
  },
});

export const active = style({
  color: "#262626",
  fontWeight: 700,
});
