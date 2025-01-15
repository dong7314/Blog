import { style } from "@vanilla-extract/css";

export const loginSection = style({
  display: "flex",
  flexDirection: "column",
  paddingInline: "6px",
  width: "calc(100% - 12px)",
  height: "100%",
  alignItems: "center",
  justifyContent: "space-between",
});

export const emailLogin = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

export const loginLogo = style({
  marginBottom: "50px",
});

export const loginForm = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginBottom: "20px",
});

export const loginInput = style({
  display: "flex",
  width: "100%",
  marginBottom: "16px",
});

export const loginTextButton = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: "20px",
});

export const loginButton = style({
  display: "flex",
  flexDirection: "column",
  width: "calc(100% - 2px)",
  marginTop: "16px",
});

export const loginError = style({
  display: "flex",
  justifyContent: "center",
  marginTop: "8px",
});

export const seperator = style({
  display: "inline-block",
  paddingInline: "12px",
  color: "#A5A5A5",
  fontSize: "14px",
});

export const socialLogin = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const loginSeperatorBox = style({
  display: "flex",
  width: "100%",
  marginBottom: "20px",
});

export const loginSeperator = style({
  position: "relative",
  display: "inline-flex",
  justifyContent: "center",
  width: "100%",
  "::after": {
    content: "",
    position: "absolute",
    width: "40%",
    height: "0.3px",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#C9C9C9",
  },
  "::before": {
    content: "",
    position: "absolute",
    width: "40%",
    height: "0.3px",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#C9C9C9",
  },
});
