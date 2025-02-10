import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  paddingBlock: "32px",
  boxSizing: "border-box",
});

export const postInfo = style({
  display: "flex",
  flexDirection: "column",
  width: "calc(50% - 54px)",
  paddingRight: "32px",
  marginRight: "32px",
  borderRight: "1px solid #dbdbdb",
  boxSizing: "border-box",
});

export const postInput = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginBottom: "16px",
  selectors: {
    "&:nth-last-of-type(1)": {
      marginBottom: "0",
    },
  },
});

export const postTextarea = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "130px",
});

export const postLabel = style({
  marginLeft: "2px",
  marginBottom: "6px",
});
