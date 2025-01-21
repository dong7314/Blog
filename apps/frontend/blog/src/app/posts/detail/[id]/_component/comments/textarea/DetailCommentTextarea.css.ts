import { style } from "@vanilla-extract/css";

export const commentTextarea = style({
  position: "relative",
  display: "flex",
  width: "100%",
});

export const commentFilter = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
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

export const form = style({
  display: "inline-flex",
  ":hover": {
    cursor: "pointer",
  },
});

export const submitButton = style({
  margin: 0,
  padding: 0,
  border: "none",
  background: "transparent",
  ":hover": {
    cursor: "pointer",
  },
});

export const textButton = style({
  position: "absolute",
  display: "inline-flex",
  padding: "6px 10px",
  overflow: "hidden",
  borderRadius: "6px",
  backgroundColor: "transparent",
  transition: "background-color .2s ease-out",
  ":hover": {
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
});

export const first = style([
  textButton,
  {
    right: "60px",
    bottom: "12px",
  },
]);

export const firstButtonText = style({
  marginLeft: "4px",
  transition: "none !important",
});

export const second = style([
  textButton,
  {
    right: "14px",
    bottom: "12px",
  },
]);
