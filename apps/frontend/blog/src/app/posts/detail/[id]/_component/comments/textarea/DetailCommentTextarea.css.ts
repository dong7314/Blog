import { style } from "@vanilla-extract/css";

export const commentTextarea = style({
  position: "relative",
  display: "flex",
  width: "100%",
});

export const comment = style({
  height: "180px",
  marginBottom: "32px",
});

export const reply = style({
  height: "120px",
});

export const textarea = style({
  padding: "16px 20px 48px !important",
  scrollPadding: "48px",
});

export const textButton = style({
  position: "absolute",
  display: "inline-flex",
  right: "20px",
  bottom: "14px",
  overflow: "hidden",
});

export const cancelTextButton = style({
  right: "90px",
  bottom: "14px",
});
