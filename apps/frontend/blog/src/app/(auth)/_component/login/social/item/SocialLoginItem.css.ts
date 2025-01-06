import { style } from "@vanilla-extract/css";

export const item = style({
  display: "inline-flex",
  marginRight: "24px",
  borderRadius: "6px",
  boxShadow: "0 1px 2px 0 rgba(0,0,0,.2)",
  filter: "brightness(1)",
  overflow: "hidden",
  transition: "all .15s ease-out",
  ":hover": {
    cursor: "pointer",
    filter: "brightness(0.92)",
  },
  selectors: {
    "&:nth-last-of-type(1)": {
      marginRight: "0",
    },
  },
});
