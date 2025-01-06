import { style, styleVariants } from "@vanilla-extract/css";

export const inputBox = style({
  display: "flex",
  width: "100%",
  flexDirection: "column",
});

export const outlineInput = style({
  display: "flex",
  position: "relative",
  width: "100%",
  minWidth: "100px",
  border: "2px solid transparent",
  borderRadius: "6px",
  boxSizing: "border-box",
  transition: "border .1s ease-out",
});

export const outlineRounded = style({
  borderRadius: "18px",
});

export const outlineFocus = style({
  border: "2px solid #66A3FF",
});

export const outlineError = style({
  border: "2px solid #FC6969",
});

export const label = style({
  display: "inline-flex",
  color: "#A5A5A5",
  paddingInline: "4px",
  fontSize: "0.875rem",
  fontFamily: "Pretendard",
  fontWeight: 400,
  transition: "all .1s ease-out",
  backgroundColor: "#fff",
  zIndex: 1,
});

export const hasPlaceholder = style({
  color: "#262626",
  marginLeft: "2px",
  marginBottom: "4px",
});

export const withoutPlaceholder = style({
  position: "absolute",
  left: "10px",
  top: "50%",
  transform: "translateY(-50%)",
});

export const labelFocus = style({
  color: "#66A3FF",
});

export const labelError = style({
  color: "#FC6969",
});

export const labelInValue = style({
  top: "0",
  fontSize: "0.75rem",
});

export const inlineInput = style({
  width: "100%",
  padding: "8px 12px",
  outline: "none",
  color: "#262626",
  border: "1px solid #dbdbdb",
  borderRadius: "4px",
  boxSizing: "border-box",
  fontFamily: "Pretendard",
  zIndex: 0,
  "::placeholder": {
    color: "#a5a5a5",
  },
});

export const inlineRounded = style({
  borderRadius: "16px",
});

export const inlineInputPassword = style({
  paddingRight: "40px",
});

export const passwordIconButton = style({
  display: "inline-flex",
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
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

export const inputError = style({
  marginLeft: "2px",
  marginTop: "4px",
});
