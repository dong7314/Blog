import { style, styleVariants } from "@vanilla-extract/css";

export const outlineInput = style({
  display: "flex",
  position: "relative",
  minWidth: "100px",
  border: "2px solid transparent",
  borderRadius: "6px",
  boxSizing: "border-box",
  transition: "border .1s ease-out",
});

export const outlineFocus = style({
  border: "2px solid #66A3FF",
});

export const label = style({
  display: "inline-flex",
  position: "absolute",
  paddingInline: "4px",
  left: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#A5A5A5",
  fontSize: "0.875rem",
  fontFamily: "Pretendard",
  fontWeight: 400,
  transition: "all .1s ease-out",
  backgroundColor: "#fff",
  zIndex: 1,
});

export const labelFocus = style({
  color: "#66A3FF",
});

export const labelInValue = style({
  top: "0",
  fontSize: "0.75rem",
});

export const inlineInput = style({
  padding: "8px 12px",
  outline: "none",
  color: "#262626",
  border: "1px solid #dbdbdb",
  borderRadius: "4px",
  boxSizing: "border-box",
  fontFamily: "Pretendard",
  zIndex: 0,
});

export const size = styleVariants({
  s: {
    height: "32px",
    fontSize: "0.875rem",
  },
  m: {
    height: "36px",
    fontSize: "0.875rem",
  },
  l: {
    height: "40px",
    fontSize: "1rem",
  },
});
