import { globalStyle, style } from "@vanilla-extract/css";

export const postContainer = style({
  padding: "10px",
  boxSizing: "border-box",
});

globalStyle(".slick-dots li button:before", {
  transition: "all .1s ease-out",
});
