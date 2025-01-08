import { style } from "@vanilla-extract/css";

export const detailTag = style({
  display: "inline-flex",
  marginRight: "12px",
  padding: "6px 8px",
  backgroundColor: "#f2f2f2",
  borderRadius: "6px",
  transition: "background-color .2s ease-out",
  ":hover": {
    cursor: "pointer",
    backgroundColor: "#e6e6e6",
  },
});
