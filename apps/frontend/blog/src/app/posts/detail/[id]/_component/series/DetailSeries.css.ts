import { style } from "@vanilla-extract/css";

export const display = style({
  display: "inline-flex",
  alignItems: "center",
});

export const profileSeriesBox = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginBottom: "48px",
});

export const seriesContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  border: "1px solid #dbdbdb",
  borderRadius: "4px",
  padding: "24px 24px 14px",
  boxSizing: "border-box",
});

export const seriesButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "22px",
  height: "22px",
  marginLeft: "8px",
  border: "1px solid #262626",
  borderRadius: "50%",
  backgroundColor: "transparent",
  transition: "background-color .2s ease-out",
  paddingLeft: "0.4px",
  boxSizing: "border-box",
  ":hover": {
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
});

export const seriesTitle = style({
  display: "flex",
  flexDirection: "column",
  paddingBottom: "24px",
  marginBottom: "14px",
  borderBottom: "1px solid #dbdbdb",
});

export const seriesPostContainer = style({
  display: "flex",
  flexDirection: "column",
});

export const seriesPost = style({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingLeft: "8px",
  marginBlock: "2px",
  paddingBlock: "8px",
  borderRadius: "6px",
  backgroundColor: "transparent",
});

export const seriesOrder = style({
  minWidth: "22px",
});

export const active = style({
  backgroundColor: "rgba(0, 0, 0, 0.08)",
});
