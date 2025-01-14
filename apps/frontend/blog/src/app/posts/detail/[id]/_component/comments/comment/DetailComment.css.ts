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
  marginRight: "6px",
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

export const content = style({
  display: "flex",
  marginBottom: "24px",
});

export const addButton = style({
  display: "flex",
});

export const button = style({
  display: "inline-flex",
  alignItems: "center",
  ":hover": {
    cursor: "pointer",
  },
});

export const textButton = style({
  marginTop: "0.5px",
  marginLeft: "4px",
});

export const arrowIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "16px",
  height: "16px",
  padding: "1px",
  boxSizing: "border-box",
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
