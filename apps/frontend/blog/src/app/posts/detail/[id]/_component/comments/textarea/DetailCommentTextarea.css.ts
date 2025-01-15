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
  padding: "6px 10px",
  right: "14px",
  bottom: "12px",
  overflow: "hidden",
  borderRadius: "6px",
  backgroundColor: "transparent",
  transition: "background-color .2s ease-out",
  ":hover": {
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
});
