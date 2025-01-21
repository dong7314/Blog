import { style } from "@vanilla-extract/css";

export const subFunctions = style({
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  marginTop: "16px",
  borderRadius: "6px",
  backgroundColor: "rgba(0, 0, 0, 0.05)",
});

export const commentReplies = style({
  padding: "0",
  paddingInline: "24px",
});

export const message = style({
  flexDirection: "row",
});

export const repliesMessage = style({
  paddingBlock: "20px",
});

export const loading = style({
  marginLeft: "10px",
});
