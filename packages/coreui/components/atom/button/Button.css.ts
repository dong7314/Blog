import { style, styleVariants } from "@vanilla-extract/css";

export const base = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderRadius: "4px",
  boxSizing: "border-box",
  transition: "all .2s ease-out",
  ":hover": {
    cursor: "pointer",
  },
  ":active": {
    filter: "brightness(0.9)",
  },
});

export const type = styleVariants({
  primary: {
    color: "#fff",
    backgroundColor: "#595959",
    ":hover": {
      backgroundColor: "#3f3f3f",
    },
  },
  secondary: {
    color: "#0066ff",
    backgroundColor: "#ebf3ff",
    ":hover": {
      backgroundColor: "#cce0ff",
    },
  },
  tertiary: {
    border: "1px solid #dbdbdb",
    color: "#595959",
    backgroundColor: "#fff",
    ":hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  negative: {
    color: "#fff",
    backgroundColor: "#fb3e3e",
    ":hover": {
      backgroundColor: "#e81919",
    },
  },
});

export const rounded = styleVariants({
  t: {
    borderRadius: "12px",
  },
  s: {
    borderRadius: "14px",
  },
  m: {
    borderRadius: "16px",
  },
  l: {
    borderRadius: "18px",
  },
  xl: {
    borderRadius: "20px",
  },
});

export const size = styleVariants({
  t: {
    height: "24px",
    padding: "0 8px",
  },
  s: {
    height: "28px",
    padding: "0 12px",
  },
  m: {
    height: "32px",
    padding: "0 16px",
  },
  l: {
    height: "36px",
    padding: "0 18px",
  },
  xl: {
    height: "40px",
    padding: "0 20px",
  },
});

export const defaultDisabled = style({
  cursor: "default !important",
  ":active": {
    filter: "brightness(1)",
  },
});

export const disabled = styleVariants({
  primary: [
    defaultDisabled,
    {
      backgroundColor: "#66A3FF",
      ":hover": {
        backgroundColor: "#66A3FF",
      },
    },
  ],
  secondary: [
    defaultDisabled,
    {
      ":hover": {
        backgroundColor: "#ebf3ff",
      },
    },
  ],
  tertiary: [
    defaultDisabled,
    {
      ":hover": {
        backgroundColor: "#fff",
      },
    },
  ],
  negative: [
    defaultDisabled,
    {
      backgroundColor: "#FEC3C3",
      ":hover": {
        backgroundColor: "#FEC3C3",
      },
    },
  ],
});
