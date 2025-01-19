import { style } from "@vanilla-extract/css";

export const headerItem = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "52px",
  padding: "10px 16px",
  marginInline: "6px",
  border: "1px solid #dbdbdb",
  borderRadius: "20px",
  transition: "all .2s ease-out",
  ":hover": {
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
});

export const active = style({
  border: "1px solid #595959",
});
