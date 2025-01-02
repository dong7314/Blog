import { style } from "@vanilla-extract/css";

export const arrow = style({
  display: "flex !important",
  justifyContent: "center",
  alignItems: "center",
  width: "32px !important",
  height: "32px !important",
  border: "1px solid #dbdbdb !important",
  borderRadius: "50%",
  boxShadow: "none",
  transition: "all .15s ease-out",
  "::before": {
    display: "none",
  },
  ":hover": {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.08)",
  },
});

export const disabled = style({
  ":hover": {
    cursor: "default !important",
    boxShadow: "none",
  },
});

export const right = style({
  right: "-40px !important",
});

export const left = style({
  left: "-40px !important",
});

export const iconBox = style({
  display: "inline-flex",
});
