import { style } from "@vanilla-extract/css";

export const signupSection = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  alignItems: "center",
});

export const signupTitle = style({
  marginBottom: "50px",
});

export const signupForm = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const signupInputLabel = style({
  marginLeft: "2px",
  marginBottom: "6px",
});

export const signupInput = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginBottom: "16px",
});

export const signupButtonBox = style({
  display: "flex",
  width: "calc(100% - 2px)",
  marginTop: "16px",
});

export const signupButton = style({
  width: "100%",
});
