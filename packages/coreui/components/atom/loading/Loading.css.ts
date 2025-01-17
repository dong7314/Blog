import { keyframes, style, styleVariants } from "@vanilla-extract/css";

const loadingAnimation = keyframes({
  "0%": {
    transform: "rotate(0)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

export const loadingContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const loading = style({
  animation: `${loadingAnimation} 2s linear infinite`,
});

export const loadingMessage = style({
  marginTop: "4px",
});
