import { style } from "@vanilla-extract/css";

export const dashboard = style({
  display: "flex",
  flexDirection: "column",
  border: "1px solid #dbdbdb",
  borderRadius: "16px",
});

export const dashboardHeader = style({
  display: "flex",
  width: "100%",
  paddingInline: "16px",
  borderBottom: "1px solid #dbdbdb",
  boxSizing: "border-box",
});

export const dashboardSection = style({
  width: "100%",
  height: "100%",
});