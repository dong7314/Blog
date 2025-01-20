import { keyframes, style } from "@vanilla-extract/css";

export const form = style({
  position: "relative",
});

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

export const heartIcon = style({
  display: "inline-flex",
});

export const favoritesNumber = style({
  marginTop: "1.5px",
});

export const preventButtonFilter = style({
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
});

const appear = keyframes({
  "0%": {
    transform: "scale(0)",
    transformOrigin: "center center",
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "center center",
  },
});

export const activeHeartIcon = style({
  animation: `${appear} 0.3s cubic-bezier(0.31, 1.76, 0.72, 0.76) 1`,
});
