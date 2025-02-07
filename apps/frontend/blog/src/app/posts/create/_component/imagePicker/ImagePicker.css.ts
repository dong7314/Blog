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
  backgroundColor: "transparent",
  transition: "background-color .2s ease-out",
  ":hover": {
    cursor: "pointer",
  },
});

export const fileLabelDragging = style({
  backgroundColor: "#EBF3FF",
});

export const labelText = style({
  marginBottom: "4px",
});
