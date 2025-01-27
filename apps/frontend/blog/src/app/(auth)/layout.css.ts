import { style } from "@vanilla-extract/css";

export const authPage = style({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
});

export const authLayout = style({
  display: "flex",
  width: "380px",
});

export const backButton = style({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  paddingBlock: "6px",
  paddingLeft: "4px",
  paddingRight: "8px",
  top: "16px",
  left: "0px",
  backgroundColor: "transparent",
  borderRadius: "12px",
  transition: "background-color .2s ease-out",
  boxSizing: "border-box",
  ":hover": {
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
});

export const backButtonText = style({
  marginLeft: "6px",
});
