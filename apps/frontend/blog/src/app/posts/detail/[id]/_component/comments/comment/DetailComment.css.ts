import { style } from "@vanilla-extract/css";

export const detailCommentContainer = style({
  display: "flex",
  flexDirection: "column",
  paddingBlock: "24px",
  borderBottom: "1px solid #dbdbdb",
  selectors: {
    "&:nth-last-of-type(1)": {
      borderBottom: "none",
    },
  },
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "24px",
});

export const author = style({
  display: "flex",
  alignItems: "center",
});

export const profileIcon = style({
  marginRight: "10px",
});

export const lockIcon = style({
  width: "16px",
  height: "16px",
  marginTop: "-2px",
  marginLeft: "4px",
});

export const date = style({
  marginTop: "1px",
});

export const functions = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  paddingTop: "4px",
  boxSizing: "border-box",
});

export const authorFunctions = style({
  display: "flex",
  alignItems: "center",
  marginLeft: "12px",
});

export const status = style({
  display: "flex",
  alignItems: "center",
});

export const seperate = style({
  marginInline: "4px",
});

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
