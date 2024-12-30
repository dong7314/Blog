import { style, styleVariants } from "@vanilla-extract/css";

export const checkboxContainer = style({
  display: "flex",
  alignItems: "center",
});

export const checkbox = style({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
});

export const input = style({
  display: "none",
});

export const label = style({
  position: "relative",
  display: "inline-block",
  width: "100%",
  height: "100%",
  backgroundColor: "#fff",
  border: "1px solid #dbdbdb",
  borderRadius: "3px",
  boxSizing: "border-box",
  ":hover": {
    cursor: "pointer",
  },
});

export const checked = style({
  border: "1px solid #595959",
  backgroundColor: "#595959",
});

export const disabled = style({
  border: "1px solid #dbdbdb",
  backgroundColor: "#e6e6e6",
  ":hover": {
    cursor: "default",
  },
});

export const iconBox = style({
  position: "absolute",
  display: "inline-flex",
  left: "-1px",
});

export const childrenLabel = style({
  display: "inline-flex",
  marginLeft: "8px",
  ":hover": {
    cursor: "pointer",
  },
});

export const childrenLabelDisabled = style({
  ":hover": {
    cursor: "default",
  },
});

export const size = styleVariants({
  s: {
    width: "12px",
    height: "12px",
  },
  m: {
    width: "16px",
    height: "16px",
  },
  l: {
    width: "18px",
    height: "18px",
  },
});
