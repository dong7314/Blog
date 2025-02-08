import { style } from "@vanilla-extract/css";

export const labelContainer = style({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "6px",
  paddingInline: "2px",
});

export const labelContainerButton = style({
  display: "flex",
  alignItems: "center",
});

export const seperate = style({
  display: "inline-flex",
  fontSize: "0.75rem",
  paddingBottom: "4px",
  marginInline: "4px",
  color: "#262626",
});

export const hover = style({
  ":hover": {
    cursor: "pointer !important",
  },
});

export const pickerContainer = style({
  display: "flex",
  width: "100%",
  minHeight: "300px",
  border: "1px solid #dbdbdb",
  borderRadius: "4px",
  overflow: "hidden",
});

export const fileLabel = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  overflow: "hidden",
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

export const thumbnailImage = style({
  width: "100%",
});
