import { style } from "@vanilla-extract/css";

export const button = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minWidth: "92px",
  height: "45px",
  border: "1px solid #dbdbdb",
  borderRadius: "12px",
  padding: "12px 18px",
  backgroundColor: "transparent",
  transition: "background-color 0.2s ease-out",
  boxSizing: "border-box",
  ":hover": {
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
});
