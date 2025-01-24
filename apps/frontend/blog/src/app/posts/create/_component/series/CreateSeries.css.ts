import { style } from "@vanilla-extract/css";

export const createSeries = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "150px",
  border: "1px solid #dbdbdb",
  borderRadius: "6px",
  padding: "20px",
  boxSizing: "border-box",
});

export const seriesHeader = style({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "16px",
});

export const addSeries = style({
  display: "flex",
  alignItems: "center",
  padding: "18px 16px",
  borderRadius: "4px",
  backgroundColor: "rgba(0, 0, 0, 0.08)",
  boxSizing: "border-box",
});

export const addSeriesButton = style({
  width: "100px",
  marginLeft: "16px",
});

export const nonExist = style({
  marginTop: "8px",
});

export const series = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "50px",
  padding: "8px 16px",
  marginTop: "12px",
  border: "1px solid #dbdbdb",
  borderRadius: "6px",
  backgroundColor: "transparent",
  boxSizing: "border-box",
  transition: "background-color .2s ease-out",
  ":hover": {
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
});

export const checked = style({
  backgroundColor: "#EBF3FF",
  ":hover": {
    backgroundColor: "#EBF3FF",
  },
});
