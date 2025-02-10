import { style } from "@vanilla-extract/css";

export const profileContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  paddingTop: "48px",
  marginBottom: "48px",
  borderTop: "1px solid #dbdbdb",
});

export const profileBox = style({
  display: "flex",
  justifyContent: "space-between",
});

export const profileDescription = style({
  display: "flex",
  padding: "12px 8px 0",
});

export const followButtonBox = style({
  display: "flex",
  alignItems: "center",
  marginRight: "16px",
});

export const profile = style({
  display: "flex",
});

export const profileIcon = style({
  marginRight: "16px",
});

export const profileUser = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
});

export const email = style({
  marginTop: "2px",
});
