import { style } from "@vanilla-extract/css";

export const commentTextarea = style({
  position: "relative",
  display: "flex",
  width: "100%",
  height: "180px",
  marginBottom: "32px",
});

export const textarea = style({
  padding: "16px 20px 48px !important",
  scrollPadding: "48px",
});

export const textButton = style({
  position: "absolute",
  right: "20px",
  bottom: "14px",
  overflow: "hidden",
});
