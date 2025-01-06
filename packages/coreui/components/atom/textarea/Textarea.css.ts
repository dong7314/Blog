import { style, styleVariants } from "@vanilla-extract/css";

export const textareaBox = style({
  display: "flex",
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  flexDirection: "column",
});

export const outlineTextarea = style({
  display: "flex",
  position: "relative",
  width: "100%",
  height: "100%",
  border: "2px solid transparent",
  borderRadius: "6px",
  boxSizing: "border-box",
  transition: "border .1s ease-out",
});

export const outlineFocus = style({
  border: "2px solid #66A3FF",
});

export const outlineError = style({
  border: "2px solid #FC6969",
});

export const label = style({
  display: "inline-flex",
  paddingInline: "4px",
  color: "#A5A5A5",
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
  top: "16px",
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

export const inlineTextarea = style({
  width: "100%",
  minWidth: "100%",
  maxWidth: "100%",
  minHeight: "64px",
  padding: "8px 12px",
  outline: "none",
  color: "#262626",
  border: "1px solid #dbdbdb",
  borderRadius: "4px",
  boxSizing: "border-box",
  fontSize: "0.875rem",
  fontFamily: "Pretendard",
  zIndex: 0,
  "::placeholder": {
    color: "#a5a5a5",
  },
});

export const textareaInfo = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const textareaError = style({
  display: "flex",
  width: "85%",
  marginLeft: "2px",
  marginTop: "4px",
});

export const textareaErrorText = style({
  display: "inline-block",
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const maxLength = style({
  marginRight: "6px",
  marginTop: "4px",
});
