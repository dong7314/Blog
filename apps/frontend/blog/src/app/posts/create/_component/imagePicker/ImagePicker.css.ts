import { style } from "@vanilla-extract/css";

export const pickerContainer = style({
  display: "flex",
  width: "100%",
  height: "300px",
  border: "1px solid #dbdbdb",
  borderRadius: "4px",
});

export const fileLabel = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  ":hover": {
    cursor: "pointer",
  },
});

export const labelText = style({
  marginBottom: "4px",
});
