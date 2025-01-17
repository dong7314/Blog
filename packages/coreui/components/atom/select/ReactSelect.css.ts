import { style, styleVariants } from "@vanilla-extract/css";

export const reactSelectContainer = style({
  position: "relative",
  display: "inline-flex",
  width: "100%",
  height: "100%",
});

export const reactSelect = style({
  width: "100%",
  height: "100%",
  minHeight: "32px",
  fontFamily: "Pretendard !important",
});

export const option = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 12px",
  color: "#595959",
  boxSizing: "border-box",
  transition: "all .2s ease-out",
  ":hover": {
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
});

export const size = styleVariants({
  s: {
    height: "32px",
    fontSize: "0.875rem",
  },
  m: {
    height: "36px",
    fontSize: "0.875rem",
  },
  l: {
    height: "40px",
    fontSize: "1rem",
  },
});
