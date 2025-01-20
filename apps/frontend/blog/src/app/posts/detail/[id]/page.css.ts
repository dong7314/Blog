import { style } from "@vanilla-extract/css";

export const detail = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

export const header = style({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "800px",
  marginTop: "96px",
  marginBottom: "48px",
});

export const profileIcon = style({
  marginRight: "8px",
});

export const title = style({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  marginBottom: "64px",
});

export const by = style({
  color: "#262626",
  fontSize: "1rem",
  marginRight: "6px",
});

export const info = style({
  display: "flex",
  height: "24px",
  justifyContent: "space-between",
});

export const infoSpan = style({
  display: "flex",
});

export const tags = style({
  display: "flex",
  height: "32px",
  marginTop: "16px",
});

export const content = style({
  display: "flex",
  width: "1100px",
  height: "100%",
  marginLeft: "300px",
  marginBottom: "96px",
});

export const subContent = style({
  display: "flex",
  flexDirection: "column",
  width: "800px",
});

export const favorites = style({
  display: "flex",
  justifyContent: "center",
  marginBottom: "96px",
});
