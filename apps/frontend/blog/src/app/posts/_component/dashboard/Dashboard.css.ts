import { style } from "@vanilla-extract/css";

export const dashboard = style({
  display: "flex",
  flexDirection: "column",
  border: "1px solid #dbdbdb",
  borderRadius: "10px",
});

export const dashboardHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingInline: "16px",
  borderBottom: "1px solid #dbdbdb",
  boxSizing: "border-box",
});

export const headerTabs = style({
  display: "flex",
});

export const period = style({
  display: "inline-flex",
  marginRight: "6px",
});

export const dashboardSection = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  minHeight: "200px",
});
